-- Run in Supabase SQL editor
create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.rsvps enable row level security;

create policy "Allow public insert"
  on public.rsvps
  for insert
  to anon
  with check (true);
