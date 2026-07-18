-- ═══════════════════════════════════════════════════════════
-- ASKMARCELO v2 — SUPABASE DATABASE SETUP
-- Run this entire file in: Supabase Dashboard → SQL Editor
-- ═══════════════════════════════════════════════════════════

-- 1. PROFILES TABLE
create table if not exists public.profiles (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  name       text,
  level      text,
  school     text,
  dept       text,
  career     text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id)
);

-- 2. PROGRESS TABLE
create table if not exists public.progress (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  career_id  text not null,
  course_id  text not null,
  done       boolean default false,
  updated_at timestamptz default now(),
  unique(user_id, career_id, course_id)
);

-- 3. QUIZ SCORES TABLE (NEW in v2)
create table if not exists public.quiz_scores (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  course_id  text not null,
  score      integer not null,
  total      integer not null,
  taken_at   timestamptz default now(),
  unique(user_id, course_id)
);

-- 4. Auto-update trigger
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

create trigger progress_updated_at
  before update on public.progress
  for each row execute procedure public.set_updated_at();

-- 5. INDEXES
create index if not exists progress_user_career on public.progress(user_id, career_id);
create index if not exists quiz_scores_user     on public.quiz_scores(user_id);

-- 6. ROW LEVEL SECURITY
alter table public.profiles    enable row level security;
alter table public.progress    enable row level security;
alter table public.quiz_scores enable row level security;

-- Profiles policies
create policy "Users can view own profile"   on public.profiles for select using (auth.uid()=user_id);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid()=user_id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid()=user_id);

-- Progress policies
create policy "Users can view own progress"   on public.progress for select using (auth.uid()=user_id);
create policy "Users can insert own progress" on public.progress for insert with check (auth.uid()=user_id);
create policy "Users can update own progress" on public.progress for update using (auth.uid()=user_id);

-- Quiz scores policies
create policy "Users can view own quiz scores"   on public.quiz_scores for select using (auth.uid()=user_id);
create policy "Users can insert own quiz scores" on public.quiz_scores for insert with check (auth.uid()=user_id);
create policy "Users can update own quiz scores" on public.quiz_scores for update using (auth.uid()=user_id);

-- 7. LEADERBOARD VIEW
create or replace view public.leaderboard as
select
  pr.career_id,
  p.name,
  p.dept,
  p.level,
  count(*) filter (where pr.done=true) as completed_count,
  coalesce(avg(qs.score::float/qs.total*100),0)::int as quiz_avg
from public.progress pr
join public.profiles p on p.user_id=pr.user_id
left join public.quiz_scores qs on qs.user_id=pr.user_id
group by pr.career_id, p.name, p.dept, p.level
order by completed_count desc;

-- ═══════════════════════════════════════════════════════════
-- SETUP COMPLETE ✓
-- Tables: profiles, progress, quiz_scores
-- ═══════════════════════════════════════════════════════════
