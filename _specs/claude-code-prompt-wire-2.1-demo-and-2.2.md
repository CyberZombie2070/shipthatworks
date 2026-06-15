# Claude Code Prompt — Wire 2.1 Placement Demo + Build Module 2.2 (Reading JavaScript)

Prereqs in _specs/: module-2.1-placement-demo-section-v2.md, module-2.2-reading-javascript-expanded.md, COURSE-DESIGN-PRINCIPLES.md, COURSE-LEARNING-ARC-OUTLINE.md. Read the design principles (esp. section 8b, the scaffolding gradient) before editing. Paste everything below the line into Claude Code.

---

Read foundations.html fully before changing anything. Conventions in CLAUDE.md apply (vanilla HTML/CSS/JS, REM units, &#39; escaping, no em dashes in body copy, single-line PowerShell commit messages, push after commit). Follow _specs/COURSE-DESIGN-PRINCIPLES.md for components and visual system. Two commits.

## COMMIT 1 — Add the placement demonstration to module 2.1 (p2m0)

From _specs/module-2.1-placement-demo-section-v2.md, insert the heavily-annotated placement demonstration as the opening of (or immediately before) the existing "Placing code is the first thing you can now do" section in module p2m0.
- Two code blocks STACKED full width using the existing .code-block component. NOT two columns (two-column code overflows; this is settled).
- The caret (^^^^) annotations are plain text inside the code; render them as-is, do not convert to spans.
- Convert [EYEBROW] and [CALLOUT truth|label] markers to the real components per the design doc.
- Escape &lt;button&gt; where it appears in prose/callout text (inside code blocks, < is fine).
- This is additive: do NOT change p2m0's id, quiz (QB['p2m0']), prediction-box floor test, or completion. The new section sets up the existing placement floor test.
- This embodies the scaffolding gradient FLOOR (maximum annotation, worked-example-first). Do not trim the annotations for brevity; the density is intentional per design doc 8b.

Commit: `content: add annotated placement demonstration to module 2.1 [ai-assisted]`

## COMMIT 2 — Replace stub content of module 2.2 (existing id p2m1) with the full module

From _specs/module-2.2-reading-javascript-expanded.md. This REPLACES the stub content of the EXISTING module whose id is p2m1 (now displayed as 2.2, navTitle 'Reading JavaScript'). CRITICAL: keep id p2m1 unchanged; do not create a new id; the quiz key stays QB['p2m1'].

Content:
- Convert all [EYEBROW] / [CALLOUT type|label] markers to real components per the design doc.
- Code blocks use the existing .code-block component. 2.2's code is intentionally LESS annotated than 2.1's (clean code + prose explanation, no caret-labels) — this is the gradient stepping down one level; do not add 2.1-style heavy annotation here.
- Apply the visual system (header glow, eyebrows, softer callouts), consistent with polished modules.

Diagram:
- Insert a .course-figure referencing /images/scope-nested-boxes.png IMMEDIATELY AFTER the [CALLOUT danger | THE REVEAL] in the floor test (NOT in the scope teaching section). Placement matters: the diagram depicts the scope bug, so it must come after the learner has predicted and seen the getTier reveal, where `tier` is fully grounded and the productive-failure surprise is already spent. Placing it earlier would spoil the prediction and reference an ungrounded `tier`. Precede the figure with a one-line framing sentence such as: "Here is what just happened, pictured: the general scope principle, with tier as the example you just saw." alt: "Variable scope as nested boxes: const tier declared inside the inner block cannot be reached by the return statement in the outer function scope; let tier in the function scope can." caption: "A name lives only inside its box; code outside the box cannot see in." If the image file is absent, wire the figure anyway so it lights up when the image lands.

Floor test (predict-then-reveal, productive-failure per gradient):
- Mount a prediction box: mountPredictionBox(el, {id:'ft-p2m1-scope', prompt:'What will getTier(75) return or do? Predict before running.'}).
- Add a one-line gradient nudge in the floor-test prose: tell the learner to predict even if unsure, because being wrong here is how the lesson works.
- Mount a runner with the buggy getTier code as starterCode: mountRunner(el, {id:'ft-p2m1-scope-run', starterCode: <the getTier function exactly as in the draft, including console.log(getTier(75));>, heightRem:12}).
- After the runner, render the [CALLOUT danger | label: THE REVEAL] explaining the ReferenceError.

Quiz — DROP-IN (do not generate): replace the stub QB['p2m1'] array with the exact 12-question array provided in the draft file (the QB['p2m1']=[...] block). Use it verbatim; it is authored to standard. Mark Complete gated on quiz pass.

Commit: `content: expand module 2.2 reading javascript to full depth [ai-assisted]`

## Verification
1. 2.1 (p2m0): the placement demonstration appears before the placement floor test, two stacked annotated code blocks, caret annotations intact, contrast callout present; p2m0 quiz/floor/id unchanged.
2. 2.2 (p2m1): stub replaced with full content; id still p2m1; QB['p2m1'] is the new 12-question array; scope diagram figure wired; prediction box + runner + danger-reveal floor test present with the predict-even-if-unsure nudge; code blocks are clean (not 2.1-style heavily annotated).
3. Completion/quiz for p2m1 still resolves (id unchanged); no other module affected.
4. Both modules: eyebrows, callouts (correct semantic variants), header glow, visual system consistent.
5. Desktop and mobile clean; no em dashes; no raw apostrophes in attribute strings; REM units; no two-column code blocks.

End-of-task report: confirm p2m0 additive-only (id/quiz/floor unchanged), p2m1 id preserved with new QB array placed verbatim, diagram figure location, and the two commits. Do not deviate silently.

Commits (separate, each pushed) as specified above.
