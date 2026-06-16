# AI Dev Foundations — Whole-Course Learning Arc & Refactor Outline

The map the refactor runs on. Companion to COURSE-DESIGN-PRINCIPLES.md: that doc says HOW to build a module; this doc says WHAT each module teaches, in what order, what it assumes, how it ties to the spine, and how the whole arc readies the learner for the AI Code Engineer course. Read both before expanding any module.

This outline is the durable cross-session reference. When a future session expands a module, it works against this outline so the eighteen modules stay one coherent course rather than eighteen disconnected tutorials.

---

## The arc in one sentence

The learner enters able to OPERATE Claude Code as a magic box but unable to understand or evaluate what it produces (and often not knowing what JavaScript, Node, or React even are), and exits able to read, evaluate, debug, and defend AI-generated code across JavaScript, Node/Express, and React, with the workflow and team discipline that make them a trustworthy contributor ready to learn production engineering.

## Entry floor (what every module may assume)

The learner CAN run Claude Code and type prompts into it, but understands essentially nothing about the code it produces, and may not know what JavaScript, Node, or React are or when each is used. Modules may assume basic operation of the tool; they may NOT assume any code-reading fluency or knowledge of the technology landscape until the relevant module has taught it.

For the truly-zero learner who has never installed or run Claude Code: a "Set up Claude Code on your system for the first time" guide is LINKED at the course entrance (start of Phase 1 and on the landing page), because Phase 1's floor tests already require Claude Code running. Setup is an external linked on-ramp, not in-course content — the course itself starts at "can operate it, understands nothing."

## The spine (must be load-bearing in every module)

You are accountable for code you cannot yet fully read. Verify, do not trust the confident surface. Every concept in every module exists to let the learner EVALUATE Claude's output, not merely to write code. If an expanded module reads like a generic tutorial that forgot it is about judging AI output, it has drifted; pull it back.

## Depth ramp (not uniform)

- Phase 1 (done): conceptual foundation. ~2,800-3,500 words/module.
- Phases 2-4: code literacy, the heaviest real-code modules. ~2,800-3,500 words/module. The bulk of expansion work.
- Phase 5: workflow/discipline. ~2,500-3,200 words. Begins priming the Engineer mindset.
- Phase 6: team/long-game. ~2,800-3,500 words. Explicitly bridges to the Engineer course.

## Recurring module devices (consistency across the arc)

Several devices should recur across modules so the course feels unified and the spine stays visible:
- **"What Claude gets wrong here"** — every code module names the SPECIFIC, predictable mistakes Claude makes in this area (the stubs already gesture at this; expand it into a real, central section with examples). This is the course's signature move.
- **"Read this diff"** — a recurring exercise: show a realistic Claude-generated diff, ask the learner to spot what is wrong or risky before revealing. Ties to Phase 1's prediction-box pattern.
- **Practitioner war-story** — where the integration map routes one, reconstructed as a fictional mock, in voice.
- **Floor test** — hands-on, with a deterministic check (runner) where code can execute.
- **Forward tie** — a sentence or two connecting this module's skill to where it returns later in Foundations or in the Engineer course.

---

# PHASE 2 — JavaScript You Must Know (5 modules)
Targeted reading literacy, not a full JS course. Opens with a landscape orientation (the map before the territory), then the patterns the learner will read in every Node/React codebase and must evaluate in Claude output. This phase is the foundation Phases 3-4 stand on; everything here is "read and judge," never "write from scratch."

## 2.1 — The Landscape: What JavaScript, Node, and React Are (and When You See Which)  [NEW — orients the whole technical arc]
- Teaches: what JavaScript is (the language) and where it runs (browser + server); what Node.js is (JavaScript on the server, outside the browser); what React is (a library for building user interfaces); what TypeScript is (JavaScript plus a type layer); how they relate and when you encounter which; the shape of a typical full-stack app (frontend React talking to a Node/Express backend). The map for Phases 2-4.
- Assumes: Phase 1 only. Assumes the learner can operate Claude Code but knows nothing about these technologies. This is the orientation that makes all subsequent reading-literacy possible.
- Spine tie: you cannot evaluate code in a language or framework you can't even place — knowing what React IS and what it's FOR is the precondition for judging React output. The course's premise is that people use these tools without understanding them; this module fixes that at the root.
- What goes wrong without it: learners "use" React via Claude with no idea what it is, unable to tell a backend concern from a frontend one, unable to place an error.
- Code: minimal — illustrative "this is what JS looks like / this is what a React component looks like / this is what a Node server looks like" specimens, purely to orient, not to teach syntax yet.
- Diagram (create): the full-stack map — browser (React) ↔ server (Node/Express) ↔ database, with JS as the language spanning both and TypeScript as the type layer. The single most orienting diagram in the course.
- Interactive: a light "match the technology to what it does / where it runs" exercise.
- Quiz: ~10-12, orientation-level (what is each, when used, how they relate).
- Forward tie: this is the frame for all of Phases 2-4; every later technical module slots into this map.

## 2.2 — Reading JavaScript: The Minimum Viable Literacy  [DEPTH-TEMPLATE: build this one first as the code-module template]
- Teaches: variables and scope (var/let/const, block vs function scope, closures at a reading level), how scope changes when Claude refactors, the core syntax shapes the learner will see everywhere (destructuring, arrow functions, template literals, spread/rest, ternaries, optional chaining).
- Assumes: 2.1 (knows what JS is and where it runs).
- Spine tie: scope bugs are a classic silent failure — Claude moves a variable and changes behavior invisibly. The learner must read scope to catch it.
- What Claude gets wrong: introduces closure/scope bugs in refactors; shadows variables; converts between var/let in ways that change behavior.
- Code: real snippets the learner READS and predicts the output of (not writes). A "read this refactor, did behavior change?" exercise.
- Diagram (create): scope chain / closure as nested boxes (lexical scope visualized).
- Interactive: runner for a scope-behavior prediction; prediction box before reveal.
- Quiz: ~12, hardened distractors, focused on reading-comprehension of given code.
- Forward tie: this literacy is assumed by every later code module.

## 2.3 — Async/Await: The Pattern You See Everywhere
(was 2.2; content unchanged from the original 2.2 entry — Promises and async/await at a reading level, tracing async control flow, the missing-await class of bug, Promise.all vs sequential. Diagram: sync vs async execution timeline. Assumes 2.2.)

## 2.4 — Modules, Imports, and Why Dependencies Matter
(was 2.3; content unchanged — import/export, module resolution at a reading level, the real consequences of import decisions, evaluating dependency choices. Diagram: the dependency graph. Assumes 2.2.)

## 2.5 — TypeScript: Reading Types Without Being an Expert
(was 2.4; content unchanged — reading TS types not writing them, what a type error tells you, types as a verification tool, the types-that-lie failure mode. Diagram: an annotated typed signature. Assumes 2.2-2.4.)

# PHASE 3 — Node.js / Express Patterns (3 modules)
The server-side structure in every backend codebase. By the end, the learner can read a complete Express app and evaluate every line Claude produces. This phase is where "evaluate the architecture, not just the syntax" begins.

## 3.1 — Express Route Structure: Read Any Route Handler
- Teaches: Express as a thin layer over Node's HTTP server; what a route handler is (req/res, the handler signature); routing, params, query, body; the request/response lifecycle; status codes done right.
- Assumes: Phase 2 (async especially — handlers are async).
- Spine tie: the route is where untrusted input enters; reading it is the first line of evaluation.
- What Claude gets wrong: wrong status codes; missing await in handlers; not handling the error path; leaking internals in responses.
- Code: read a route handler end to end and narrate what it does.
- Diagram (create): the request lifecycle — request in → middleware → route handler → response out.
- Interactive: "read this handler, what's the bug" floor test with runner where feasible.
- Quiz: ~12.
- Forward tie: 3.2 layers services beneath this; the Engineer course builds production APIs on it.

## 3.2 — Services, Repositories, and Why the Layer Structure Matters
- Teaches: the layered architecture (routes → services → repositories → database); separation of concerns; why the layering exists (testability, changeability, reasoning); what each layer should and shouldn't contain.
- Assumes: 3.1.
- Spine tie: Claude violates layering in predictable ways; recognizing the violation is an architecture-level evaluation skill.
- What Claude gets wrong: DB calls in route handlers; business logic in repositories; fat controllers; skipping the service layer entirely.
- Code: read a small layered app; identify a layering violation Claude introduced.
- Diagram (create): the layer stack (routes/services/repositories/DB) with arrows showing legal call direction and a marked violation.
- Interactive: "spot the layering violation" exercise.
- Quiz: ~12.
- Forward tie: the Engineer course's architecture and least-privilege modules.

## 3.3 — Middleware, Validation, and Error Handling
- Teaches: middleware (functions between request and handler); input validation (verifying data before acting); error handling (visible vs silent failures); the predictable trio of mistakes.
- Assumes: 3.1-3.2.
- Spine tie: validation and error handling are where silent failure lives; this is the spine made concrete on the server.
- What Claude gets wrong: missing validation; validation after use; swallowed errors; no error middleware; leaking stack traces.
- Code: read a middleware chain; find the missing validation and the swallowed error.
- Diagram (create): middleware chain as a pipeline (request passing through validation → auth → handler → error handler).
- Interactive: "what fails silently here" floor test.
- Quiz: ~12.
- Forward tie: ties hard to the Engineer course's deterministic-validators and agent-safety material.

# PHASE 4 — React Patterns (3 modules)
Reading React output with confidence. By the end, the learner can evaluate any React UI code Claude produces. Frontend is where Claude is fast and confidently wrong most often.

## 4.1 — Components and Props: The Mental Model for React
- Teaches: a component is a function taking props returning JSX; prop flow (one-way, parent to child); reading JSX; composition; the mental model that makes the rest legible.
- Assumes: Phase 2 (functions, destructuring).
- Spine tie: understanding prop flow is how you evaluate whether data is going where it should.
- What Claude gets wrong: prop drilling; mutating props; unclear component contracts; key misuse in lists.
- Code: read a component tree; trace a prop from source to use.
- Diagram (create): the component tree with props flowing down (one-way data flow visualized).
- Interactive: "trace this prop" exercise.
- Quiz: ~12.
- Forward tie: 4.2 (state) and 4.3 (decomposition) build on this.

## 4.2 — useState and useEffect: Where Claude Code Makes Mistakes
- Teaches: state (data that triggers re-render); the right useState mental model; effects (post-render synchronization with external systems); the dependency array; cleanup; when an effect is even needed.
- Assumes: 4.1.
- Spine tie: this is THE area Claude gets wrong most predictably; the whole module is the spine applied to hooks.
- What Claude gets wrong: missing/wrong dependency arrays; effects that should be derived state; stale closures; infinite loops; unnecessary effects; missing cleanup.
- Code: read a component with hooks; find the dependency-array bug and the unnecessary effect.
- Diagram (create): the render/effect cycle (render → commit → effect → cleanup, and what re-triggers it).
- Interactive: runner or staged example showing a stale-closure or infinite-loop surprise; prediction box.
- Quiz: ~12, the most rigorous in the phase given how error-prone this area is.
- Forward tie: the Engineer course's frontend work assumes this fluency.

## 4.3 — Component Decomposition: Reading and Evaluating a Design
- Teaches: where to draw component boundaries; signs of good vs poor decomposition; reusability/testability/changeability as evaluation criteria; the specific anti-pattern Claude tends toward (monolithic components).
- Assumes: 4.1-4.2.
- Spine tie: this is a design-judgment skill — evaluating a structure, not just syntax.
- What Claude gets wrong: monolithic god-components; premature/over-decomposition; boundaries drawn on the wrong seams.
- Code: read a UI component; assess the decomposition; propose where the boundaries should be.
- Diagram (create): a monolithic component vs the same UI well-decomposed (before/after boundaries).
- Interactive: "evaluate this decomposition" exercise.
- Quiz: ~12.
- Forward tie: design judgment is a through-skill into the Engineer course.

# PHASE 5 — Workflow & Discipline (4 modules)
The operational habits separating reliable contributors from people who get lucky. This phase begins explicitly priming the Engineer-course mindset: repeatable process over one-off success.

## 5.1 — CLAUDE.md and Session Discipline
- Teaches: how Claude Code reads CLAUDE.md every session; what belongs in it (conventions, shell/OS, constraints, the environment-mismatch lesson from the practitioner findings); session/context management; the no-memory-between-sessions reality (ties to 1.2).
- Assumes: Phase 1 (how Claude works), some practical Claude Code use.
- Spine tie: CLAUDE.md is how you make verification repeatable instead of per-session.
- What Claude gets wrong / what goes wrong: assuming wrong shell (the PowerShell heredoc failure — use the mock); stale context; unstated conventions.
- Code: read/write a CLAUDE.md section; the shell-declaration example.
- Diagram (create): the session lifecycle (CLAUDE.md loaded → context built → work → context lost at session end).
- Interactive: "what's missing from this CLAUDE.md" exercise.
- Quiz: ~12.
- Forward tie: the Engineer course's hooks-vs-rules and agent-safety modules build directly on this.

## 5.2 — Surgical Prompts: Instructions That Get Consistent Results
- Teaches: specificity as the lever (scope, constraints, output format, what-not-to-do); the anatomy of a surgical prompt; why they cost more upfront and save rework; the CIF (context/instruction/format) idea from the practitioner findings.
- Assumes: Phase 1, 5.1.
- Spine tie: a vague prompt produces output you can't evaluate against intent; the prompt IS the spec you verify against.
- What goes wrong: vague prompts; missing constraints; no output format; not stating what to avoid (so Claude does the obvious-but-wrong thing).
- Code: read a vague prompt and its surgical rewrite; the before/after.
- Diagram (create): the anatomy of a surgical prompt (labeled parts: context, scope, constraints, format, anti-goals).
- Interactive: "harden this prompt" exercise.
- Quiz: ~12.
- Forward tie: prompt rigor underpins the entire Engineer course.

## 5.3 — Git Discipline and the Verification Stack
- Teaches: inspect-what-changed (read the diff), run-and-know-if-it-broke, roll-back-if-needed; the pre-commit checklist; the verification stack (tests, linters, type-check, deterministic validators); "done is a claim, not a fact" made operational.
- Assumes: Phase 1-2, 5.1-5.2.
- Spine tie: this is the spine as daily practice — verification on every commit.
- What goes wrong: committing unread diffs; trusting "done"; scope creep in a commit; no rollback plan.
- Code: read a staged diff and run the checklist; spot the over-scoped change.
- Diagram (create): the verification stack (diff review → tests → lint → type-check → commit), and the rollback path.
- Interactive: "review this diff" floor test.
- Quiz: ~12.
- Forward tie: deterministic validators are a major Engineer-course theme; this is the on-ramp.

## 5.4 — Token and Context Discipline: Using the Tool Without Wasting It
- Teaches: that AI tools have real, finite costs (tokens, context window, time) and that a skilled practitioner manages them deliberately rather than firing prompts and hoping; how to scope a request to one operation; when to start a fresh chat/context versus continuing; externalizing state so context is disposable; not making the model re-derive what it could read; recognizing and stopping a stuck/runaway agent.
- Assumes: Phase 1, 5.1 (session discipline), 5.2 (surgical prompts).
- Spine tie: using the tool well includes using it efficiently and deliberately; the accountable practitioner controls the tool rather than letting it run open-ended. Same spine as verification: deliberate control, not blind trust.
- What goes wrong (all sourced from REAL incidents building this course, reconstructed as fictional practitioner mocks): bundling too much into one request so it is expensive AND unreliable (the mega-prompt that hung for over an hour and wasted ~50k tokens before timing out); letting a stuck agent run instead of interrupting it (no output for minutes is stuck, not thinking); re-explaining what is already written in a file instead of pointing the tool at it; carrying a huge conversation forward when the durable knowledge is already externalized in docs, paying the long-context premium on every action; vague open-ended requests that make the model wander and re-search.
- Framing rule (critical): teach JUDGMENT, not pricing. No "tokens cost $X per million" (dates instantly, misses the point). Teach the discipline: scope tightly, isolate heavy operations, externalize state into durable docs, start fresh when context stops earning its keep, interrupt a runaway, point the tool at sources instead of re-deriving. Principles in, product-specific pricing mechanics out (consistent with the practitioner-findings rule).
- Code/exercise: take a bloated, over-bundled request and split it into scoped operations; identify the point where a conversation should have become a fresh context; "what is missing that would let this run in a fresh chat" (i.e. what state needs externalizing).
- Diagram (create): when to continue vs start fresh — a simple decision flow (is the durable knowledge written down? is the history still doing work? is every action paying a long-context tax?). Or: scoped-operation vs bundled-operation (one hangs, one completes).
- Interactive: "scope this request" or "continue or start fresh?" judgment exercise.
- Quiz: ~12.
- Forward tie: context/cost discipline scales directly into the Engineer course's agent-workflow and long-running-task material. Meta-note for the builder: this very course's development was a live demonstration of these lessons; that authenticity is the point, keep the war-stories real (reconstructed as fictional mocks).

# PHASE 6 — Team Collaboration (2 modules)
The professional habits that build lasting trust and determine trajectory. This phase explicitly bridges to the Engineer course: the learner finishes ready to build production systems on a team, with the reading/evaluation/discipline literacy in place.

## 6.1 — Pull Requests: Submitting Work You Can Defend
- Teaches: a PR as a case for a change, not just shared code; PR scope/size (the verified research — ~200 lines, defect detection peaks 200-400; line-count as imperfect proxy for cognitive size); writing the description; self-review before submitting; the BLOCKING vs SUGGESTION review taxonomy.
- Assumes: Phase 1 (handoff standard), 5.3 (Git).
- Spine tie: a PR you can defend is the handoff standard realized — a stranger can pick it up, trust it, build on it.
- What goes wrong: oversized PRs; no rationale; submitting unread AI output; defensiveness.
- Code: read a PR description; assess whether the change is defensible and right-sized.
- Diagram (create): a well-formed PR anatomy, or the PR-size/defect-detection relationship visualized.
- Interactive: "is this PR defensible" exercise; self-review checklist.
- Quiz: ~12.
- Forward tie: production PR practice in the Engineer course.

## 6.2 — Receiving Feedback, Debugging, and the Long Game
- Teaches: code review feedback as a free lesson (not an attack); debugging production issues you can't re-prompt away (the skill of independent debugging from Phase 1); building reputation/trust over time; when NOT to reach for Claude.
- Assumes: all prior phases.
- Spine tie: independent debugging is the ultimate test of the spine — the moment you must rely on your own reading, not the tool.
- What goes wrong: defensiveness to review; re-prompting instead of understanding; over-reliance on Claude under pressure.
- Code: a debugging scenario read independently (no re-prompting).
- Diagram (create): the feedback loop / the trust-over-time long game, or a debugging decision tree (when to investigate yourself vs ask).
- Interactive: "debug this without re-prompting" floor test; "respond to this review" exercise.
- Quiz: ~12.
- Forward tie: THE explicit bridge. Close the course here: the learner now reads, evaluates, debugs, and defends AI-generated code with workflow and team discipline. The Engineer course takes this literacy and builds production engineering, agent safety, and advanced workflow on top. End with a forward-looking consolidation that names what they can now do and what comes next.

---

## Cross-phase consistency checks (catch drift early)

- **No double-teaching:** async is owned by 2.3; later phases USE it but don't re-teach it. Same for types (2.5), Git (5.3), the handoff standard (Phase 1). When a later module needs a prior concept, reference it, don't re-explain.
- **No gaps:** every concept a module ASSUMES must be taught in a prior module (see the "Assumes" line). If 4.2 needs closures, 2.2 must have covered them (2.1 is the Landscape, no code; reading-level scope/closures are taught in 2.2). Verify the chain holds when expanding.
- **Spine visibility:** every module has an explicit "what Claude gets wrong here" treatment and ties back to verify-don't-trust. If a draft loses this, it has drifted.
- **Diagram budget:** ~1 diagram per module (18 total across the course, ~15 new for Phases 2-6), each genuinely spatial per the design doc's test. Listed above per module. Don't exceed without reason; don't decorate.
- **Engineer-course bridge:** Phases 5-6 explicitly name forward ties. The practitioner-findings integration map routes specific war-stories into Engineer modules; keep Foundations setting them up, not resolving them.

## Build order (confirmed)

1. Build 2.1 (The Landscape) first — it is now literally first in the technical arc, it is conceptual (follows Phase 1's proven pattern, low-risk), and building it first lets the Phase 1 to Phase 2 transition be judged before the heavier code modules.
2. Then build 2.2 (Reading JavaScript) as the code-module depth-template; review before wiring, since it sets the pattern for all code-heavy modules (Phases 2-4).
3. Then the rest, phase by phase, 2 → 3 → 4 → 5 → 6, against this outline + the proven templates.
4. Each module: full content draft + wiring prompt together (after the two template modules are approved).
5. Diagrams produced per the design-doc recipe as each module is built (or batched per phase).
6. Total module count is now 20 (Phase 2 grew from 4 to 5 with the landscape addition; Phase 5 grew from 3 to 4 with the token/context discipline addition, 5.4). Modules still to expand from stub: Phases 3-6 plus the new 5.4 (2.1 and 2.2 are built).
7. Renumbering note: adding Landscape as 2.1 shifted the old 2.1-2.4 to 2.2-2.5. When wiring, the module ids (p2m1..p2m5) and navTitles must be updated consistently, and any cross-references to old numbers fixed.
