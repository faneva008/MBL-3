-- MBL v1.1.0: profiles, subscription lifecycle and atomic single-session controls.
begin;
create table if not exists public.profiles (
 id uuid primary key references auth.users(id) on delete cascade,
 email text, full_name text, avatar_url text,
 status varchar not null default 'pending', expires_at timestamptz,
 is_logged_in boolean not null default false,
 created_at timestamptz not null default now()
);
alter table public.profiles add column if not exists email text;
alter table public.profiles add column if not exists full_name text;
alter table public.profiles add column if not exists avatar_url text;
alter table public.profiles add column if not exists status varchar not null default 'pending';
alter table public.profiles add column if not exists expires_at timestamptz;
alter table public.profiles add column if not exists is_logged_in boolean not null default false;
alter table public.profiles add column if not exists created_at timestamptz not null default now();
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
 insert into public.profiles(id,email,full_name,avatar_url,status,is_logged_in)
 values(new.id,new.email, nullif(new.raw_user_meta_data->>'full_name',''), nullif(new.raw_user_meta_data->>'avatar_url',''),'pending',false)
 on conflict(id) do update set email=excluded.email;
 return new;
end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();
-- Atomic lock. Client must authenticate first; only the account owner can acquire/release their own lock.
create or replace function public.mbl_acquire_session()
returns boolean language plpgsql security definer set search_path = '' as $$
declare changed integer;
begin
 if auth.uid() is null then raise exception 'Authentication required'; end if;
 update public.profiles set is_logged_in=true where id=auth.uid() and is_logged_in=false and status <> 'disabled';
 get diagnostics changed = row_count;
 return changed=1;
end; $$;
create or replace function public.mbl_release_session()
returns boolean language plpgsql security definer set search_path = '' as $$
begin
 if auth.uid() is null then raise exception 'Authentication required'; end if;
 update public.profiles set is_logged_in=false where id=auth.uid(); return true;
end; $$;
revoke all on function public.mbl_acquire_session() from public, anon;
revoke all on function public.mbl_release_session() from public, anon;
grant execute on function public.mbl_acquire_session() to authenticated;
grant execute on function public.mbl_release_session() to authenticated;
-- Legacy catalog status defaults should be unknown, never implicitly repealed.
do $$ begin
 if to_regclass('public.catalog') is not null then
   alter table public.catalog add column if not exists legal_status text not null default 'inconnu';
   alter table public.catalog alter column legal_status set default 'inconnu';
 end if;
end $$;
commit;
