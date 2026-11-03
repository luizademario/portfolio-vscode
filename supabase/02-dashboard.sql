-- Bloco 5: dono do site, leitura/atualização das mensagens e destaques da Home.
-- Rode no Supabase: SQL Editor > New query > colar > Run.
--
-- ANTES DE RODAR: troque COLE-AQUI-O-UUID-DO-DONO pelo ID do seu usuário
-- (Authentication > Users > coluna "User UID"). Cole o UUID só no editor do Supabase;
-- não salve este arquivo com o seu UUID. Se esquecer de trocar, o Supabase mostra
-- um erro de UUID inválido e nada é criado.

-- 1) Quem é o dono. Sem políticas: ninguém lê esta tabela pela API.
create table if not exists public.site_owner (
  user_id uuid primary key references auth.users (id) on delete cascade
);
alter table public.site_owner enable row level security;
revoke all on public.site_owner from anon, authenticated;

insert into public.site_owner (user_id)
values ('COLE-AQUI-O-UUID-DO-DONO')
on conflict do nothing;

-- 2) Função usada pelas políticas: "o usuário logado é o dono?"
create or replace function public.is_owner()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.site_owner where user_id = auth.uid())
$$;
revoke all on function public.is_owner() from public;
grant execute on function public.is_owner() to authenticated;

-- 3) Mensagens: só o dono lê e só ele altera a coluna "answered".
grant select on public.contact_messages to authenticated;
grant update (answered) on public.contact_messages to authenticated;

drop policy if exists "dono lê mensagens" on public.contact_messages;
create policy "dono lê mensagens"
  on public.contact_messages
  for select
  to authenticated
  using (public.is_owner());

drop policy if exists "dono atualiza mensagens" on public.contact_messages;
create policy "dono atualiza mensagens"
  on public.contact_messages
  for update
  to authenticated
  using (public.is_owner())
  with check (public.is_owner());

-- 4) Destaques da Home: qualquer visitante lê; só o dono marca e desmarca.
create table if not exists public.featured_projects (
  repo_name text primary key check (char_length(repo_name) between 1 and 100),
  created_at timestamptz not null default now()
);
alter table public.featured_projects enable row level security;

grant select on public.featured_projects to anon, authenticated;
grant insert, delete on public.featured_projects to authenticated;

drop policy if exists "todos leem destaques" on public.featured_projects;
create policy "todos leem destaques"
  on public.featured_projects
  for select
  to anon, authenticated
  using (true);

drop policy if exists "dono marca destaques" on public.featured_projects;
create policy "dono marca destaques"
  on public.featured_projects
  for insert
  to authenticated
  with check (public.is_owner());

drop policy if exists "dono desmarca destaques" on public.featured_projects;
create policy "dono desmarca destaques"
  on public.featured_projects
  for delete
  to authenticated
  using (public.is_owner());
