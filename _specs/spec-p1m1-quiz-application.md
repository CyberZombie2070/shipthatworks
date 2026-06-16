# Spec (TRIAL) — p1m1 quiz: recall -> application

**Goal:** turn quiz stems that test "what the module said" into stems that hand the learner a
NEW instance and ask them to apply the concept — the 2.2 "predict getTier(75)" standard. This
is a pattern trial: judge the three rewrites below; if the pattern is right, I apply it to the
recall-framed questions across p1m1 (and it becomes the course-wide quiz standard, banked in
§8, then carried into p1m2 / p1m3 and the Phase 2 quizzes).

**Not a wholesale rewrite.** ~half of p1m1 already tests the concept and stays. Rough triage
(verify against file on the full pass; q12 is in a region I have not re-read):
- Rewrite to application: Q1 (trait convergence), Q6 (the three skills), Q9 (day-one standard).
- Light reframe (drop the "the module says/describes" framing, keep the question): Q2, Q3, Q5.
- Keep as-is (already conceptual/applied): Q4, Q7, Q8, Q10, Q11.

The tell to hunt: a stem containing "the module say(s)", "the module describes", "the module
recommends", or "according to the module". Those ask for recall of wording. Replace with a
situation, a goal, or a novel instance to classify.

---

## The pattern
BEFORE stem: "What does the module say/describe/recommend about X?"
AFTER stem: "Here is a [new person / goal / code snippet]. [Classify it / pick what applies /
predict the result]." Keep distractors as plausible misconceptions a real learner would hold.

---

## Three exemplar rewrites

### Q1 — trait convergence
BEFORE:
`q:"The lead sketches several ways people arrive at this course: building by choice, chasing a new role, or being assigned by an employer. What single trait does the module say every path converges on?"`
opts: shipped production features | accountable for code they cannot yet fully read | directed by an employer | prior software experience  (correct = 2nd)

AFTER:
`{q:"A marketing manager with no developer title is assigned to a Claude Code migration; she can get working output but can't fully read it. A self-taught hobbyist down the hall has shipped side projects for a year with the same gap. What do they share that this course is built around?",opts:["Both were assigned to AI work by an employer","Both are accountable for code they cannot yet fully read","Both have already shipped production features","Both lack any prior software experience"],correct:1,explanation:"Their paths in differ completely (one assigned, one self-directed; one brand new, one a year in), yet they converge on one trait: responsibility for code a tool produced that they cannot yet independently evaluate. That accountability gap, not how they arrived, is what the course exists to close. 'Both were assigned' is true only of the manager; 'shipped production features' only of the hobbyist."}`

### Q6 — the three skills
BEFORE:
`q:"What are the three skills this course identifies as the ones Claude Code cannot perform on your behalf?"`
opts: prompt eng/context/verification | reading, explaining, debugging | JS/system design/testing | writing/reviewing/deploying  (correct = 2nd)

AFTER:
`{q:"In a code review a teammate asks, 'what happens here if items is empty?' and you answer correctly straight from the code in two minutes, without re-prompting Claude. Which of the course's three core skills did you just exercise?",opts:["Explaining your decisions","Reading code accurately","Debugging independently","Prompt engineering"],correct:1,explanation:"Answering a behavior question from the code itself, without running it back through the tool, is reading code accurately. Explaining decisions is the 'why this way' answer; debugging is tracing a failure to its cause; prompt engineering is operating the tool, which the course calls useful but not one of the three accountability skills."}`

### Q9 — day-one team standard
BEFORE:
`q:"What single day-one team standard does the module recommend to a lead deploying this course?"`
(options unchanged below; only the stem and explanation change)

AFTER:
`{q:"A team lead wants one day-one rule that forces ownership of every merged line, without banning Claude Code and without adding heavyweight process. Which rule best achieves that?",opts:["Every AI-assisted change is labeled as such in its commit message","No one merges code they cannot explain in two sentences","A senior developer reviews all AI-generated output before merge","Each team member completes the baseline assessment in week one"],correct:1,explanation:"All four are real practices, but only the two-sentence rule forces ownership of every line while staying lightweight: it bans nothing and adds no process, yet nothing merges unless a human can explain it. Labeling records origin without forcing understanding; gated senior review adds a bottleneck; the assessment measures but doesn't gate a merge."}`

---

## If the pattern is approved
1. Apply it to Q1, Q6, Q9 (full rewrites) and the light reframes (Q2, Q3, Q5) across p1m1,
   verifying each against the live bank (including the one question I have not re-read).
2. Bank the standard into design doc §8: "Quiz stems pose a novel instance and ask the learner
   to apply the concept (classify it, pick what fits a stated goal, or predict the result), not
   to recall the module's wording. Avoid 'what does the module say/describe/recommend'."
3. Carry the same pass into p1m2, p1m3, and the Phase 2 quizzes (separate trials per module,
   reviewed before wiring).
