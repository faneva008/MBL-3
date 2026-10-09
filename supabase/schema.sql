-- Mada Base Légale — schéma Supabase/PostgreSQL
-- Le client Android/Web ne fait que des SELECT. Les ajouts/éditions doivent
-- passer par Supabase Studio ou une Edge Function authentifiée.

create table if not exists public.legal_texts (
  id text primary key,
  code text not null,
  type text not null,
  domain text not null,
  domain_icon text not null default 'book',
  status text not null default 'inconnu'
    check (status in ('en_vigueur', 'consolide', 'abroge', 'inconnu')),
  status_label text not null default 'Statut inconnu',
  verification_status text not null default 'unverified'
    check (verification_status in ('unverified', 'verified')),
  title text not null,
  summary text not null default '',
  hashtags text[] not null default '{}',
  articles_count integer not null default 0 check (articles_count >= 0),
  articles jsonb not null default '[]'::jsonb
    check (jsonb_typeof(articles) = 'array'),
  replaced_by text,
  source_url text,
  source_title text,
  verified_at timestamptz,
  verified_by text,
  updated_at timestamptz not null default now(),
  constraint legal_texts_verified_source_check check (
    verification_status <> 'verified' or (source_url is not null and verified_at is not null)
  )
);

create table if not exists public.lexicon_terms (
  term text primary key,
  definition text not null,
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists legal_texts_set_updated_at on public.legal_texts;
create trigger legal_texts_set_updated_at
before update on public.legal_texts
for each row execute function public.set_updated_at();

drop trigger if exists lexicon_terms_set_updated_at on public.lexicon_terms;
create trigger lexicon_terms_set_updated_at
before update on public.lexicon_terms
for each row execute function public.set_updated_at();

alter table public.legal_texts enable row level security;
alter table public.lexicon_terms enable row level security;

drop policy if exists "Public can read legal texts" on public.legal_texts;
create policy "Public can read legal texts"
  on public.legal_texts for select to anon, authenticated using (true);

drop policy if exists "Public can read lexicon" on public.lexicon_terms;
create policy "Public can read lexicon"
  on public.lexicon_terms for select to anon, authenticated using (true);

revoke insert, update, delete, truncate, references, trigger on public.legal_texts from anon, authenticated;
revoke insert, update, delete, truncate, references, trigger on public.lexicon_terms from anon, authenticated;
grant select on public.legal_texts to anon, authenticated;
grant select on public.lexicon_terms to anon, authenticated;

comment on table public.legal_texts is 'Textes juridiques publiés pour consultation; verification_status=verified exige une source officielle.';
comment on column public.legal_texts.articles is 'JSON array: [{number, text, references:[{law_id, article, label}], definitions:[{term, definition}]}]';
comment on column public.legal_texts.source_url is 'URL HTTPS vers la source officielle (ex. JORM).';
comment on table public.lexicon_terms is 'Lexique juridique affiché dans le client.';
