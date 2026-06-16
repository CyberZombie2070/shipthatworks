# Spec — cast system (design-doc bank): recurring core + guests, with the §8c.4 amendment

This banks your direction (recurring characters with growth + variety across sectors) into the
design doc, and resolves the conflict it creates with the existing rule.

## The conflict to resolve
§8c item 4 currently ends: "Keep scenarios fictional, unattributed, and varied (different people,
domains, tasks); never reuse the same name/setup twice." Recurring characters violate that as
written. The fix is to amend that one clause to carve a disciplined exception, not delete it —
the variety default is good and stays.

## AMENDMENT to §8c item 4 (replace the final sentence)
FIND:
`Keep scenarios fictional, unattributed, and varied (different people, domains, tasks); never reuse the same name/setup twice.`
REPLACE:
`Keep scenarios fictional and unattributed. Default to variety: different people, domains, and tasks, and never reuse a one-off (guest) character. The single exception is a small core cast (at most three) who recur across modules specifically to show growth; their continuity is tracked in the cast registry (§8d), and a core character recurs only when their arc has a genuine beat, never as a default. Most scenarios in any given module are still fresh. Scenario-driven teaching applies course-wide, not only to code modules: conceptual modules dramatize their consequences through people too.`

## NEW SUBSECTION §8d (insert after §8c, before §9)

## 8d. The cast: recurring core characters and guests
- **Core cast (at most 3), recurring, with growth arcs.** Each embodies one of the course's
  three entry personas (assigned by an employer / chasing the role / self-directed builder) and
  visibly grows across phases, so the reader watches the transformation the course promises:
  Reason-2 passenger to calibrated operator. A core character appears only at milestone beats,
  not every module.
- **Guests, one-off, for variety.** Most examples use a fresh character to exemplify a specific
  domain, sector, or app type (retail checkout, clinic scheduler, logistics migration, fintech
  ledger, internal analytics dashboard, and so on). Guests carry no arc and are never reused.
- **Per module, choose one:** a core character (an arc beat), a guest (a domain example), or no
  character (pure concept). Never force a character where the lesson does not need one.
- **Anti-stereotype rule (hard).** Differentiate characters by role, domain, and trajectory,
  never by demographic shorthand. Competence is never mapped to identity, background, age, or
  sector. Sector variety must never become typecasting.
- **Continuity is documented.** The registry below is the single source of truth for each core
  character's state and prior beats; a session building a later module must read it and not
  contradict it. This is the course's own externalize-state discipline (5.1, 5.4) applied to
  itself.
- **Guardrail.** A character illustrates; it never replaces the second-person address to the
  reader, and never overrides a productive-failure exercise.

### Cast registry (living; append a beat whenever a core character appears)
- **Dani — CORE** (persona: assigned, no prior developer title; building a customer onboarding
  app with Claude Code). Beat 1.1: ships a `greet()` function that emails "Hello, undefined!"
  to hundreds of real users; no error fires; her lead asks what happened and she cannot explain,
  because the code passed every signal she knew to check. [Future beats appended as built.]
- **Maria — GUEST** (2.2): refactoring the discount logic on a sporting-goods checkout; the
  var-leak bug rides from undefined to NaN to "$NaN" at checkout to collapsed sales. One-off,
  not part of the core arc.

## Open design choices (your call, not blocking the bank)
1. Map the three core slots to the three entry personas (Dani = assigned; introduce a role-chaser
   and a self-directed builder as later modules need them)? It is a clean structure but commits
   the cap to 3. Recommended.
2. Stay at cap 3, or allow a 4th? I recommend holding 3 hard — past that the reader loses track
   and the growth arcs stop landing.
3. Promote Maria from guest to a second core character, or leave her one-off? I lean leave her
   one-off; the 2.2 checkout is a self-contained domain example, not an arc.
