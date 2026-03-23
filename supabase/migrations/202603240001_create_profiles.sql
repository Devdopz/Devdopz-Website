create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users (id) on delete cascade,
  display_name text not null,
  role_title text,
  bio text,
  avatar_url text,
  wevoa_profile_url text not null,
  preferred_hire_contact text not null default 'wevoa_profile'
    check (
      preferred_hire_contact in (
        'wevoa_profile',
        'email',
        'phone',
        'instagram',
        'telegram',
        'website'
      )
    ),
  contact_email text,
  contact_phone text,
  instagram_url text,
  telegram_url text,
  website_url text,
  is_hireable boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists profiles_is_hireable_idx
  on public.profiles (is_hireable);

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

alter table public.profiles enable row level security;

drop policy if exists "Public hireable profiles are visible" on public.profiles;
create policy "Public hireable profiles are visible"
on public.profiles
for select
to anon, authenticated
using (is_hireable = true);

drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile"
on public.profiles
for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
on public.profiles
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile"
on public.profiles
for select
to authenticated
using ((select auth.uid()) = user_id);
