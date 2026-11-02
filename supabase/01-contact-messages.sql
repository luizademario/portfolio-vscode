-- Tabela das mensagens do formulário de contato (Bloco 4).
-- Rode no Supabase: SQL Editor > New query > colar > Run.

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 100),
  email text not null check (char_length(email) between 5 and 200),
  message text not null check (char_length(message) between 20 and 2000),
  answered boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

-- O visitante (anon) só pode INSERIR, e sempre como "não respondida".
-- Ele não consegue ler nem alterar nada. Leitura e "marcar como respondida"
-- para o dono logado entram no Bloco 5.
grant insert on public.contact_messages to anon;

drop policy if exists "visitante pode enviar mensagem" on public.contact_messages;
create policy "visitante pode enviar mensagem"
  on public.contact_messages
  for insert
  to anon
  with check (answered = false);
