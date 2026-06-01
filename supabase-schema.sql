-- Supabase schema for ResumeTeX Builder.
-- Run this in the Supabase SQL editor.
--
-- Important:
-- Each user must be allowed to have exactly one master resume.
-- A unique constraint on only is_master is wrong because it allows only one
-- master resume globally across the whole app.

create extension if not exists pgcrypto;

create table if not exists public.resumes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  is_master boolean not null default false,
  resume_data jsonb not null,
  section_config jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Remove older/bad uniqueness rules that make is_master unique globally.
do $$
declare
  constraint_name text;
begin
  for constraint_name in
    select con.conname
    from pg_constraint con
    join pg_class rel on rel.oid = con.conrelid
    join pg_namespace nsp on nsp.oid = rel.relnamespace
    where nsp.nspname = 'public'
      and rel.relname = 'resumes'
      and con.contype = 'u'
      and pg_get_constraintdef(con.oid) ilike '%is_master%'
      and pg_get_constraintdef(con.oid) not ilike '%user_id%'
  loop
    execute format('alter table public.resumes drop constraint %I', constraint_name);
  end loop;
end $$;

do $$
declare
  index_name text;
begin
  for index_name in
    select indexname
    from pg_indexes
    where schemaname = 'public'
      and tablename = 'resumes'
      and indexdef ilike 'CREATE UNIQUE INDEX%'
      and indexdef ilike '%is_master%'
      and indexdef not ilike '%user_id%'
  loop
    execute format('drop index if exists public.%I', index_name);
  end loop;
end $$;

create unique index if not exists resumes_one_master_per_user
  on public.resumes(user_id)
  where is_master;

create index if not exists resumes_user_created_at_idx
  on public.resumes(user_id, created_at);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists resumes_set_updated_at on public.resumes;
create trigger resumes_set_updated_at
  before update on public.resumes
  for each row
  execute function public.set_updated_at();

alter table public.resumes enable row level security;

drop policy if exists "resumes_select_own" on public.resumes;
drop policy if exists "resumes_insert_own" on public.resumes;
drop policy if exists "resumes_update_own" on public.resumes;
drop policy if exists "resumes_delete_own" on public.resumes;

create policy "resumes_select_own"
  on public.resumes
  for select
  using (auth.uid() = user_id);

create policy "resumes_insert_own"
  on public.resumes
  for insert
  with check (auth.uid() = user_id);

create policy "resumes_update_own"
  on public.resumes
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "resumes_delete_own"
  on public.resumes
  for delete
  using (auth.uid() = user_id);

