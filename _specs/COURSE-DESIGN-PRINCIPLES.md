# Ship That Works — Course Design Principles & Refactor Standard

The single reference for refactoring every phase to the standard set by Phase 1. If a module does not match what is described here, the module is wrong, not this document. When this document and a module disagree, fix the module. When this document is genuinely incomplete or wrong, update this document deliberately (and note why), then bring modules into line.

This is a living standard. It was written after Phase 1 was dialed in, so Phase 1 is the worked reference example for everything below.

---

## 0. How to use this document

- Before refactoring any module, read the relevant sections here.
- Every Claude Code prompt that touches course content should reference this standard and be verified against the actual file first (see Section 9, Working Method). Stale assumptions are the most common cause of failed edits.
- The goal is consistency: a learner moving from module 1.1 to 6.4 should feel one designed course, not a patchwork. Inconsistency is the single biggest "amateur project" tell.

---

## 1. What this course is (the spine everything serves)

A two-course platform teaching developers to use AI coding tools with rigor and accountability:
- **AI Dev Foundations** — From Claude Code User to Team Developer (foundations.html)
- **AI Code Engineer** (engineer.html)

The thesis, which every design decision must serve: **rigor over polish; verify, do not trust the confident surface; you are accountable for code you cannot yet fully read.** Polish exists to serve substance, never to replace it. A flashy module that teaches less than a plain one is a failure.

**The differentiation, which must be protected through all refactoring:** the practitioner-findings layer — real, anonymized war-stories from actual AI-assisted development work, reconstructed as fictional mocks. No competing course has this, because they are made by course-makers, not practitioners. Visual polish and structure serve these war-stories; they never crowd them out. (See the practitioner-findings integration map for routing.)

**Audience floor (authoritative — every module assumes exactly this):** the learner CAN operate Claude Code (run it, type prompts, get output) but understands essentially nothing about the code it produces, and may not know what JavaScript, Node, or React are or when each is used. No module may assume code-reading fluency or technology-landscape knowledge until the relevant module has taught it. Basic tool operation may be assumed. For the never-installed-it learner, a "Set up Claude Code on your system for the first time" guide is LINKED at the course entrance (start of Phase 1 + landing page), because Phase 1's floor tests require the tool running. Setup is a linked external on-ramp, not in-course content. The course's premise — people use these tools without understanding them — IS this floor; the course exists to lift the learner off it.

**Coherence principle:** because the course is about using AI tools well, the course may itself use AI tools well in its own production (AI-generated diagrams, AI narration, captured AI responses) PROVIDED it does so with the same rigor it teaches: verify output, check licensing, be honest about provenance. What it must never do is use AI lazily — decorative AI slop, unverified output, or anything that contradicts the thesis. The test: would a careful practitioner be embarrassed by this artifact? If yes, redo it.

---

## 2. Design tokens (verified, authoritative)

Use CSS custom properties, never hardcoded hex, except where a token genuinely does not exist.

```
--bg:        #0f1117   /* page background; also the baked background for all diagram images */
--surface:   #161b22   /* cards, callouts, code-block headers, node fills */
--border:    #30363d   /* borders, separators */
--heading:   #f0f6fc   /* headings, key text (also seen as #eef2ff in places — prefer --heading) */
--text:      #c9d1d9   /* body copy */
--text-dim:  #8b949e   /* captions, secondary text, eyebrow-dim */
--accent:    #e8c547   /* amber — the one accent; arrows, eyebrows, primary buttons, key highlights */
--accent-blue / --info: #58a6ff
--success:   #3fb950
--warn:      #d29922
--danger:    #f85149
```

Fonts (already loaded): **Space Grotesk** (headings, titles, eyebrows-as-headers), **Inter** (body), **JetBrains Mono** (code, eyebrow labels, small technical labels).

Amber is the *only* accent color. Blue/green/red/amber-warn are semantic (info/success/danger/warning), used in callouts and diagram accents, not as general decoration.

---

## 3. Typography & reading rhythm

Phase 1 settled these; apply identically everywhere.

- Body measure: `max-width: 42rem` (~70 characters). Do not widen; do not narrow.
- Body line-height: `1.75`.
- Paragraph spacing: `p { margin-bottom: 1.4rem; }` (the bare global rule). This is tuned to the loose line-height so paragraphs read as distinct blocks, not a slab. Quiz/notes/caption paragraphs override with their own margins; leave those.
- Headings: h2 module title `2.25rem` (1.625rem mobile); h3 section headers with `3rem` top margin and the amber left-border accent.
- No em dashes in body copy (an AI tell). Use commas, colons, periods, parentheses. Em dash permitted only in phase-label headers.
- Prose, not bullets, by default. Lists only when the content is genuinely enumerable. A wall of bullets is as bad as a wall of text.

**The wall-of-text rule:** dense prose is the enemy. Break it with: visual breaks (callouts, diagrams), section eyebrows, and generous spacing. Target no more than ~4-5 consecutive paragraphs without a break (heading, callout, diagram, or interactive element). Module 1.2 was the worst offender (49 paragraphs, originally 0 callouts); its fix is the reference.

---

## 4. Visual system (the landing-page family resemblance)

The landing page (index.html) defines the polished look. Modules inherit a RESTRAINED version of it — enough for family resemblance, not so much that a 30-minute reading surface becomes a marketing showroom. The distinction: the landing is a *marketing surface* (may be lush); modules are *reading surfaces* (must stay calm).

Established module visual elements:

- **Header glow:** a faint radial amber glow behind each module title, `rgba(232,197,71,.04-.05)` (weaker than the landing's `.06`), fading to transparent by ~50-60%, `pointer-events:none`. A whisper of warmth, never a spotlight.
- **Eyebrow labels:** small mono uppercase amber kickers above major in-lesson sections. Style: JetBrains Mono, ~0.625rem, `letter-spacing:.15em`, uppercase, `color:var(--accent)`. Use on 3-6 major sections per module (Facts, hands-on, check-yourself), NOT every heading. Labels are short (1-3 words) and informative, never decorative filler. If a label would be noise, omit it.
- **Callouts:** `border-radius: 0.75rem`, `border-left: 3px solid` (semantic color), `padding: 1.25rem 1.5rem`, `margin: 2rem 0`. Subtle amber top-border reveal on hover (opacity 0 to ~0.6). Four semantic variants:
  - `.callout.truth` (green) — a key true principle, a takeaway.
  - `.callout.warning` (amber-warn) — a caution, a common mistake.
  - `.callout.danger` (red) — a serious trap, a failure mode.
  - `.callout.info` (blue) — a clarification, an aside, context.
  - Each carries a `.callout-label` (mono uppercase) naming its type.
- **Hover states (already standardized, do not change):** interactive elements lift on hover — `.quiz-opt` lifts with `translateY(-2px)` + shadow; `.btn-primary` lifts with amber glow shadow. Reading elements (paragraphs, plain text) do not move.
- **Cards/surfaces:** `--surface` fill, `--border` border, rounded, generously padded. Amber border on hover for interactive cards.

**Restraint test:** if a visual element makes a module harder to read for 30 minutes, it is too much. Polish that fights comprehension is a regression, not an improvement.

---

## 5. Module anatomy (the structural template)

Every module is a JS object with this shape (verified):
```
{ id:'pNmM', phase:N, phaseName:'...', num:'N.M', title:'full title', navTitle:'short ~30char sidebar label', content:'...', ... }
```
`navTitle` is REQUIRED on every module (short sidebar label distinct from the full title).

### Per-PHASE (substantial)
Each phase opens with a real orientation: what this phase is about, why it matters, what the learner will be able to DO after it. This earns its space. Written in course voice.

### Per-MODULE (light, in-voice, never boilerplate)
- **Opening hook:** a single sentence in the course's punchy, honest voice (the "The title of this module is a small lie" energy). NOT a formulaic "In this module you will learn: [bullets]" — that corporate-boilerplate pattern is an amateur tell AND reintroduces text bloat. The test: if an intro could be swapped between two modules unnoticed, it is boilerplate; cut it.
- **Body:** concept sections, each with an eyebrow label where it's a major division. Mental-model facts, principles, the practitioner war-stories rewritten in course voice. Broken up per Section 3's rhythm rules.
- **Diagram(s):** where a concept is genuinely spatial/sequential/structural (see Section 7). Not every module needs one; most concepts don't.
- **Interactive element(s):** see Section 6.
- **Floor test:** a hands-on exercise proving the learner can do the thing, not just read about it. (See Section 6.)
- **Quiz:** gated check (see Section 8).
- **Closing consolidation:** a short "what this means for you" beat that lands the takeaway. In-voice, brief.
- **Mark Complete:** gated on quiz pass (and assessment completion where present). Lives in the quiz results panel.

---

## 6. Interactive components (the course's real advantage)

This course is MORE interactive than typical video courses; that is the moat. Available components (verified mount functions):

- **`mountAssessment`** — interactive self-assessment widget (scored items, live totals, band routing, export). Used in 1.1's baseline. Use where the learner benefits from honestly rating themselves.
- **`mountRunner`** — sandboxed in-page code runner (allow-scripts only, postMessage harness, watchdog, line cap). The deterministic backstop for floor tests. Use wherever a learner should SEE code actually execute rather than trust described output.
- **`mountPredictionBox`** — "predict before you reveal" boxes (`adf_pred_{id}` keys). Use to force the learner to commit a prediction before seeing an answer; the gap between prediction and reality is where learning happens.
- **`mountResponsePool`** — captured real-Claude-response pools (see Section 10). Use for fixed demonstration prompts where seeing real specimens (and their variance) teaches the lesson.

**Floor test standard:** every module's floor test is a real exercise with a deterministic check (usually the runner). It must prove the skill, not just narrate it. Provide a no-AI-access fallback where the exercise requires Claude (a reveal, or a captured pool).

**Do not over-apply components.** A component used where it doesn't fit is as bad as none. The discipline of NOT using a good pattern where it misfits is itself part of the standard (e.g., the context-window concept gets a diagram; the multiplication floor test does not get a response pool because it would corrupt the staleness lesson).

---

## 7. Diagrams

**When a diagram is warranted:** the concept is spatial, sequential, structural, or comparative AND a diagram teaches it better than prose. Examples that qualified: the three-phase loop (cyclical), the context window (spatial/finite), done-for-me vs handoff (comparative). Most concepts do NOT qualify; a diagram that just decorates is slop.

**Placement and grounding (a diagram abstracts; abstraction needs something concrete to abstract FROM):** a diagram must come AFTER the concrete example it generalizes, never before. The sentence immediately before a diagram must name any symbols it uses (if the diagram shows `tier`, the prose just before it must have established `tier` as a concrete example, or name it as a stand-in: "picture any name, here called tier"). A diagram dropped in before the learner holds the concrete case is a picture of an abstraction they cannot yet read, and it loses them. Corollary: if a diagram depicts a failure/bug that a nearby productive-failure floor test asks the learner to predict, the diagram must come AFTER that floor test's reveal, or it spoils the prediction. (Worked example: 2.2's scope-nested-boxes diagram is placed after the getTier floor-test reveal, where `tier` is fully grounded and the surprise is already spent, so it consolidates rather than spoils.)

**Production recipe (settled):**
1. Generate the composition in an image tool (ChatGPT worked well) using the design tokens and a "flat, documentation-diagram, no gradients/shadows/3D, transparent-or-dark background" spec.
2. Do NOT fight for transparency. Generate with any dark background.
3. Recolor the background to exactly `#0f1117` (bake the page color in). This is bulletproof: it only changes background pixels, never hollows out anti-aliased text the way transparency-keying does.
4. Save to `/images/` with a clean, lowercase, hyphenated, no-spaces filename matching the HTML `src` exactly (Cloudflare is case-sensitive).
5. Wire with the reusable `.course-figure` pattern: `<figure class="course-figure"><img src loading="lazy" alt="..."><figcaption>...</figcaption></figure>`, `max-width: 760px`, centered.
6. Every diagram has descriptive alt text and an HTML figcaption. CAPTION PLACEMENT (one place only, never both): do NOT bake caption text into the image; generate the diagram with only its internal labels, and put the caption in the HTML <figcaption>. HTML caption text is selectable, screen-reader accessible, reflows on mobile, and is editable without regenerating the image. Baking a caption into the image AND adding a figcaption duplicates the text back-to-back (a real bug we hit). ChatGPT image prompts must OMIT any bottom caption line from the composition. (Internal labels inside the diagram are fine and expected; it is only the summarizing caption sentence that belongs in HTML, not the image.) For existing images that already have a baked-in caption, drop the figcaption instead, but new diagrams should be generated caption-free.

**SVG vs PNG:** PNG (background-baked) is the accepted v1 approach — good and shipped beats perfect and pending. Inline SVG is the theoretical ideal (editable, vector) but not required; do not block on it. If a diagram needs frequent edits, reconsider SVG then.

---

## 8. Quiz standard

- ~12 questions per module, gated (Mark Complete requires passing).
- **Distractor quality is non-negotiable:** options within ~25% length of each other; the correct answer is not reliably the longest; distractors are plausible misconceptions a real learner would hold, not throwaway filler. A quiz a learner can pass by pattern-matching answer length teaches nothing.
- Each question has an explanation shown after answering.
- Memory/personalization caveat: any question or floor step that says "ask Claude" must note results differ if the learner has personalized Claude.

---

## 8b. The scaffolding gradient (how much help, and what kind, at each stage)

Support is heavy early and removed as the learner gains capability. This is deliberate, and it means early modules look intentionally MORE hand-held than late ones. Do NOT "normalize" early-module scaffolding to match leaner late modules in the name of consistency — flattening the gradient breaks the pedagogy. Consistency applies to visual system and structure, not to scaffolding density.

The three stages:
- **Early (Phase 2, especially 2.1):** maximum scaffolding. Worked examples fully annotated, answers shown, the move modeled with nothing hidden. The learner is building recognition vocabulary, not yet being tested.
- **Middle (late Phase 2 through Phase 4):** support comes off. Predict-then-reveal: the learner interprets first, commits a prediction, then an annotated reveal confirms or corrects. Annotation still exists, but AFTER the attempt.
- **Late (Phase 5-6, into the Engineer course):** minimal scaffolding. The learner places/evaluates/debugs largely unaided, because independent judgment is now the skill being exercised (the spine's endpoint).

**Two scaffolding strategies, and the test for choosing.** "Heavy scaffolding" can mean two opposite mechanics. The deciding question is: **is the surprise the lesson?**
- **Worked-example-first** (show, heavily annotated, THEN practice): use when the skill is recognition or interpretation with NO surprise payload — placing code as browser/server, reading a type signature, identifying a layer. Being wrong teaches nothing here, so model it first. (Example: 2.1's placement demonstration.)
- **Productive-failure-first** (ask first, let them be wrong, THEN reveal): use when the GAP between expectation and reality is the teaching moment — silent failure, non-determinism, "it looks right but isn't." The wrongness IS the point; scaffolding it away kills the lesson. (Example: 1.1's greet floor test — the learner predicts, is surprised by "Hello, undefined!", and the surprise teaches.)

Both are legitimate; the content decides which. When the lesson depends on a learner being confidently wrong and then corrected, ask first. When the lesson is a skill with no gotcha, show first. Phase 1 correctly uses productive-failure for its surprise-driven lessons; Phase 2's code-recognition modules correctly use worked-example-first. When using productive-failure, add a sentence telling the learner the wrong prediction is intended ("predict even if unsure; being wrong here is how this works") so they commit rather than skip.

## 8c. Teaching method: build understanding, do not assert it

This is the most important section for the code modules, and it was added after a real learner read a code example, carefully, and still did not understand it. The example STATED the rule ("result lives only in the if block") without ever BUILDING the concept of scope first. Stating is not teaching. The learner has no prior knowledge of the code; assume that literally, and construct the understanding from the ground every time. Four rules:

**1. Build from the ground; never assert the thing you are teaching from the top down.** Do not open with a broken example and expect the underlying concept to be understood; the concept IS what you are teaching. Sequence: (a) explain the concept with NO code, using a plain-language mental model an absolute beginner can hold (e.g. scope = rooms with walls: a name made in a room is gone once you step out of it); (b) connect the model to the code mechanic (a room is a pair of curly braces; an if inside a function is a smaller room inside a bigger one); (c) ONLY THEN walk real code line by line, narrating what the computer "knows" at each line, using the model. The broken-example reveal comes last, after the learner can actually read it. If a learner who carefully reads the section still does not get it, the section failed, full stop.

**2. Walk code line by line, as the computer sees it.** For any non-trivial snippet, do not summarize what it does; trace it. Annotate each meaningful line with what is happening to the relevant value/name at that point ("ROOM 2 closes, and result, which only existed in Room 2, is gone with it"). Make the invisible visible: the reader cannot see scope, execution order, or async timing, so the prose has to show it step by step.

**3. Restate load-bearing facts at their point of use; never make the reader hold a fact across a gap.** If understanding example B depends on a fact taught in section A, repeat that fact right at example B. Worked failure: a learner only understood a fixed scope example after REMEMBERING from earlier that let allows reassignment; the module should have said, right there at the fixed example, "remember, let means this value can change, which is exactly why we set it to fail first and upgrade it to pass." The fact must be adjacent to the moment it pays off. (Same family as the diagram-grounding rule, applied to prose.) Corollary: explicitly name what abbreviations stand for the first time they carry weight (const = constant = a name that does not change; this is WHY it cannot be reassigned). Do not assume the learner decodes shorthand.

**4. Scenario-driven teaching is a CORE method for code modules, not a garnish.** Wrap key bugs and concepts in concrete practitioner scenarios with stakes, because stakes and context make a lesson stick where an abstract snippet does not. Form: name a person and a realistic task, show the code Claude returned, surface the breaking issue, explain it using rules 1-3. Example shape: "Maria is refactoring the checkout flow on a sporting-goods site. She asks Claude to simplify the discount logic and gets this back to commit. It looks fine. It is not. Here is what a careful reader catches." This is the course's differentiator (real-feeling practitioner war-stories, reconstructed as fictional mocks per section 9) doing double duty as the primary teaching vehicle. Use a scenario for at least the central bug of each code module; abstract snippets are fine for small recognition points, but the concept that matters most gets the scenario treatment. Keep scenarios fictional, unattributed, and varied (different people, domains, tasks); never reuse the same name/setup twice.

**Grounding with concrete real-world examples.** When introducing a tool with variants (const/let/var; the syntax shapes; type forms), show each ONE earning its keep in realistic code, with a line on why that variant fits ("const holds the API base URL because it never changes; let holds the running total because it must"). Do not describe the variants abstractly and move on; show them at work.

## 9. Voice & writing principles

- Punchy, honest, direct. Names uncomfortable truths plainly. Anti-boilerplate.
- Second person, accountable framing ("you are responsible for...").
- Universal/handoff framing over team-exclusive framing (a teamless learner still has a future self, an interviewer, the next session). Phase 1 reframed "working on a team" to the universal "can a stranger pick this up without you in the room" — match that inclusiveness.
- Frame around what a skill REQUIRES, never around assuming the learner's deficits. "You do not need to be fluent in X" is inclusive and true for everyone; "you have not learned X yet" is an assumption that is false for part of the audience and reads as condescending to them. The entry floor (operates the tool, understands little about the code) is a FLOOR, not a description: many learners exceed it in places. So never assert what the learner does not know ("you can't read this yet"). Instead state what the task needs ("you don't need fluency here"; "reading, not writing, is what this requires"). Good example: 2.2's "you do not need to write JavaScript; you need to read it well enough to catch Claude in a mistake." The slip to avoid: "you have not learned to read JavaScript yet."
- Labels and stamps in learner-facing text must be PLAIN language the reader understands instantly, with zero decoding. A metaphor may live in the explanatory prose where it is built and defined, but it must not appear as a bare label that assumes the metaphor is already loaded in the reader's head. A label that makes the reader stop and translate ("wait, what does that mean here?") is friction at exactly the moment the point should land. The slip to avoid: using "PLACED:" as a stamp atop a code conclusion — it forced the reader to decode the author's place-it-on-the-map metaphor. The fix: say the plain thing ("This is frontend code: it runs in the browser"). The metaphor (placement) can still be taught in the surrounding prose; it just cannot be the label itself. General rule: do not let internal shorthand, coined terms, or section-jargon leak into reader-facing copy as undefined labels.
- No em dashes in body copy. No corporate boilerplate. No hype.
- Concise. Most of every response/section is the substance; caveats are brief.
- Practitioner war-stories are rewritten in course voice, unattributed, reconstructed as fictional mocks (test: a session attendee should not identify the source). Principles in; product-specific mechanics out unless on-topic.

---

## 10. Captured response pools (honesty rules)

When showing real captured Claude outputs inline:
- ALWAYS labeled as captured, never presented as live generation. No fake "generating..." animation.
- BOTH paths offered: run it yourself, OR view captured examples.
- Personalization caveat present (results differ with custom style/memory/rules).
- Provenance shown: model + tier + date (e.g., "Real Claude outputs, captured June 2026 (Claude Opus 4.8, High)"). Pools are time capsules, not evergreen.
- Captured from a CLEAN/DEFAULT session (no custom style), or the pool misrepresents baseline behavior and may leak/pre-solve the exercise.
- Stored as `<script type="text/plain" data-pool="..." data-idx="N">` tags (no escaping). To add: copy a tag, bump idx, paste raw response.
- Supplement, not substitute: pools serve fixed demonstration prompts; open-ended practice still points to real Claude.
- Compare-mode pools STACK vertically (full width), never side-by-side columns (which overflow with code).
- Apply only where it fits; never where a frozen capture would corrupt a lesson about currency (e.g., not the Node-LTS staleness exercise).

---

## 11. Technical & build conventions

- localStorage prefix: `adf_` (foundations), `cc_` (engineer). UI prefs survive course reset.
- Single source of truth for completion: getCompletedModules / markModuleComplete / refreshProgressDisplays.
- Shell is PowerShell on Windows: single-line `-m` commit messages ONLY, never bash heredoc (`<<'EOF'`).
- Commit format: `type: description [ai-assisted]`.
- When a spec defines multiple commits, produce EXACTLY those separate commits (they are an audit checksum against `git log`); never squash.
- External links: `target="_blank" rel="noopener noreferrer"` + ↗ glyph.
- `&#39;` escaping for apostrophes in attribute strings.
- REM units (except where SVG/px is genuinely required).
- Images committed and pushed (Cloudflare serves only what is in the repo); verify filenames match `src` exactly; when the deployed page looks wrong but Git is correct, test in an incognito window (definitive cache bypass).
- ALWAYS stage with `git add .` in wiring prompts, NEVER a selective `git add <file>`. The user places diagram images into images/ before running. A selective add stages only the named HTML file and silently SKIPS the already-present image, which is what has repeatedly orphaned diagram images (the HTML references an image that never got committed). `git add .` sweeps in the HTML and the image together; the .gitignore makes it safe. Every diagram-bearing prompt must use `git add .`.
- `.gitignore` should exclude scratch: `node_modules/`, `build*.js`, `foundations_build*.js`, `verify*.mjs`, `__test_script.js`, `package*.json` (if not used).
- **Stall ceiling (enforce manually; the tool will not).** A Claude Code step that produces no output for roughly 3 to 5 minutes is stuck, not thinking. Interrupt it (Ctrl-C) and retry; do not wait. The tool's internal timeout is effectively unbounded (a real incident: a single edit hung for 70 minutes before timing out and wasting ~50k tokens), so the human is the timeout. Never let one step run open-ended.
- **Keep each operation small enough that it cannot hang (reliability, not just safety).** Large single edits against the big foundations.html file are what stall. A full module-content REPLACEMENT is a heavy operation and must be ISOLATED in its own prompt/commit, separate from quiz swaps, component mounts, and diagram wiring (which are small, fast, deterministic edits and can be grouped). Do not bundle a content replacement with other work in one transaction. Give the agent PRECISE targets (e.g. "replace from the object id:'pNmM' to the next module object") so it does not re-search and wander. If an isolated content replacement still hangs, split the content itself (e.g. section by section). Rule of thumb: one heavy edit per prompt; batch only trivial edits together.

---

## 12. Sequencing & workflow principles

- **Verify against the actual file before every edit.** Stale assumptions about selectors/line numbers are the top cause of failed prompts. Pressure-test prompts before running.
- **Ship good over perfect.** A polished-and-live element beats an ideal-and-pending one. (PNG diagrams over blocked-on-SVG; captured pools over live API.)
- **Match the cost of the fix to the real cause.** Diagnose before prescribing (the wall-of-text felt like a measure problem; it was actually paragraph spacing + missing callouts).
- **Content freeze before media.** Narration and screencasts come AFTER content is stable across all phases, never during active refactor — recording mid-churn means recording twice.
- **"Done is a claim, not a fact."** Verify load-bearing claims; read `git log` before closing sessions; confirm the expected commits landed.
- Trial risky/visual changes on one module/file first, judge rendered, THEN roll out and codify. Do not codify sight-unseen.

---

## 13. Media layer (planned, post-freeze)

- **Audio narration:** AI voice (ElevenLabs) is acceptable and on-thesis IF: licensing permits commercial use (paid tier with commercial/ownership rights — verify the plan terms), and every file is listened to end-to-end for technical-term mispronunciation (apply the course's own verify-lesson to its narration). Pre-generate as static MP3s, served as files, once, after content freeze.
- **Screencasts:** short, surgical video of actually using Claude Code (the loop in motion, a permission prompt, verification) for the genuinely demonstrative moments — not narration of everything, not talking-head. The one media type that plays to a real strength and that competitors have but this course doesn't. Also post-freeze.
- Do NOT add either during the refactor.

---

## 14. The refactor checklist (per module)

For each module being brought to standard:
- [ ] navTitle present, short, distinct from title.
- [ ] Light in-voice opening hook (no boilerplate "you will learn").
- [ ] Body broken per rhythm rules (≤4-5 consecutive paragraphs without a break).
- [ ] Eyebrow labels on 3-6 major sections (not every heading).
- [ ] Header glow present.
- [ ] Callouts used for key takeaways/warnings/traps, correct semantic variant, no sentence duplicated between prose and callout.
- [ ] Diagram(s) only where genuinely spatial; produced and wired per Section 7.
- [ ] At least one real interactive element (runner/prediction/assessment/pool) where it fits.
- [ ] Floor test with deterministic check + no-AI fallback.
- [ ] ~12-question quiz with hardened distractors and explanations.
- [ ] Closing consolidation beat.
- [ ] Mark Complete gated correctly.
- [ ] Practitioner war-stories integrated where mapped, in voice, as fictional mocks.
- [ ] No em dashes; voice consistent; prose not bullets.
- [ ] Verified against the file; correct commits; pushed; rendered-checked (incognito if needed).
