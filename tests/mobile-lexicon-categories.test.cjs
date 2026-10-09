const test = require("node:test");
const assert = require("node:assert/strict");
const MBLData = require("../app/src/main/assets/www/mobile-data.js");

test("mobile data canonicalizes the Général alias and legacy domains", () => {
  assert.equal(MBLData.normalizeLegalCategory("Droit Général"), "Général");
  assert.equal(MBLData.normalizeLegalCategory("Droit du Travail"), "Droit du travail & Prévoyance sociale");
  assert.equal(MBLData.normalizeLegalCategory("Droit Fiscal"), "Finances publiques & Droit fiscal");
  assert.equal(MBLData.LEGAL_CATEGORIES.length, 18);
});

test("catalog documents normalize domains and attach a category to old article definitions", () => {
  const law = MBLData.normalizeCatalogDocument(
    { id: "catalog-uuid", title: "Texte", category: "Droit Général" },
    { catalog_id: "catalog-uuid", structure_json: {
      id: "business-id-preserved",
      articles: [{ number: "Article 1", text: "Délégation.", definitions: [{ term: "Délégation", definition: "Pouvoir confié." }] }]
    } }
  );
  assert.equal(law.id, "business-id-preserved");
  assert.equal(law.domain, "Général");
  assert.equal(law.articles[0].definitions[0].category, "Général");
});

test("lexicon trie chooses the matching category and the Général fallback", () => {
  const trie = MBLData.buildLexiconTrie([
    { term: "Personne morale", definition: "Variante constitutionnelle.", category: "Droit constitutionnel & Institutions publiques" },
    { term: "Personne morale", definition: "Variante civile.", category: "Droit civil & Personnes (LTGO)" },
    { term: "Personne morale", definition: "Définition transversale.", category: "Général" }
  ]);
  const constitutional = MBLData.findLexiconRanges("Cette personne morale existe.", trie, "Droit constitutionnel & Institutions publiques");
  const administrative = MBLData.findLexiconRanges("Cette personne morale existe.", trie, "Droit administratif");
  assert.equal(constitutional[0].item.definition, "Variante constitutionnelle.");
  assert.equal(constitutional[0].item.category, "Droit constitutionnel & Institutions publiques");
  assert.equal(administrative[0].item.definition, "Définition transversale.");
});

test("article-specific definitions take precedence; unrelated categories are not attached", () => {
  const globalTrie = MBLData.buildLexiconTrie([
    { term: "Délégation", definition: "Définition globale.", category: "Général" }
  ]);
  const localTrie = MBLData.buildLexiconTrie([
    { term: "Délégation", definition: "Définition de l’article.", category: "Droit bancaire, Financier & Change", articleSpecific: true }
  ]);
  assert.equal(MBLData.findLexiconRanges("Délégation de pouvoir.", localTrie, "Droit administratif")[0].item.definition, "Définition de l’article.");
  const noGeneral = MBLData.buildLexiconTrie([
    { term: "Délégation", definition: "Variante civile.", category: "Droit civil & Personnes (LTGO)" }
  ]);
  assert.equal(MBLData.findLexiconRanges("Délégation de pouvoir.", noGeneral, "Droit administratif").length, 0);
  assert.equal(MBLData.findLexiconRanges("Délégation de pouvoir.", globalTrie, "Droit administratif")[0].item.definition, "Définition globale.");
  const conflictingLocalTrie = MBLData.buildLexiconTrie([
    { term: "Délégation", definition: "Première définition.", category: "Général", articleSpecific: true },
    { term: "Délégation", definition: "Autre définition.", category: "Général", articleSpecific: true }
  ]);
  assert.equal(MBLData.findLexiconRanges("Délégation de pouvoir.", conflictingLocalTrie, "Droit administratif").length, 0);
});
