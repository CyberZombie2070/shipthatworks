# Captured Response Pool — Design Doc

A way to show learners real Claude outputs for a floor-test prompt, inside the course, with no backend, no API key, and no per-call cost. Responses are captured by hand ahead of time and sampled at runtime. This doc defines the format, the honesty rules that keep the feature credible, and the authoring workflow. It is a planning artifact, not a Claude Code prompt.

## What this is, and what it is NOT

IS: a curated library of real, hand-captured Claude responses to a specific fixed prompt, stored as static content, shown to the learner for study. The learner can draw from the pool to see genuine examples, and the pool can be curated to include instructive cases (a correct one, a subtly-wrong one, one that hedges).

IS NOT: live generation, and must never be presented as such. It is not a replacement for the learner running the prompt themselves in Claude. It does not answer the learner's own variations; it only serves the exact authored prompt.

## The honesty rules (non-negotiable, build them in)

The course's entire thesis is "verify, do not trust the confident surface." A feature that presented canned output as live generation would betray that thesis the moment a learner noticed. So:

1. **Always labeled as captured.** Every pool UI says, in plain words, that these are real responses Claude produced for this prompt, captured and stored here, not generated live. Never use language implying real-time generation ("generating...", "Claude is thinking", a fake typing animation).
2. **Both paths always offered.** The pool never replaces the "run it yourself in Claude" instruction. The floor test presents both: do it yourself, OR view captured examples here. The self-run path remains the default for any open-ended practice.
3. **Personalization caveat present.** Each pool carries the note that a learner who has personalized Claude (custom style, saved memory, rules) may get results that differ from these and from each other. This is the same caveat we add to floor-test self-run steps, surfaced here too.
4. **Capture provenance shown.** Each pool displays its capture provenance and a note that these reflect the model at capture time and may differ from current output. Provenance means model + tier + date + capture style, not date alone (e.g., "Real Claude outputs, captured June 2026 (Claude Opus 4.8, High)"). Pools are time capsules, not evergreen; label them precisely. The capturedNote string in RESPONSE_POOLS is the displayed text; the script-tag comment block carries the fuller note (model, tier, date, style = Default/baseline or which custom style, and the run count).
5. **Supplement, not substitute.** Pools are for fixed demonstration prompts the author controls. Open-ended "go practice on your own code" exercises keep pointing to real Claude, with no pool.

## Where it applies (and where it does not)

Applies: floor-test prompts with a single fixed wording the author controls, where seeing real specimens teaches the lesson. The strongest fit is Module 1.2 Part 1 (non-determinism), where showing two genuinely different real responses side by side demonstrates variance more reliably than asking the learner to open two chats and hope the difference is visible (their saved style can suppress it).

Does not apply: any exercise where the learner uses their own code or their own prompt variation. There is nothing to pre-capture, and the real-world loop (prompt the tool, read, judge) is the point.

## Storage format (single-file static, zero escaping)

Captured responses are stored as hidden script tags so their content (code fences, apostrophes, quotes) needs no escaping:

```html
<script type="text/plain" data-pool="ft2-motivational" data-idx="0">
...raw captured response exactly as Claude produced it, including code fences...
</script>
<script type="text/plain" data-pool="ft2-motivational" data-idx="1">
...another real captured run...
</script>
```

- The browser does not execute or render `type="text/plain"` scripts; they are inert data.
- The only string a response may not contain is a literal `</script>`, which normal code/prose never does.
- Authoring a new captured response: copy a tag, bump `data-idx`, paste the raw response between the tags. No JSON, no escaping.
- Each pool also has a small config object (in the JS data layer) for metadata:
  ```
  { id: "ft2-motivational", mode: "compare", capturedNote: "Real Claude outputs, captured June 2026 (Claude Opus 4.8, High)", prompt: "<the exact prompt>" }
  ```
  capturedNote must carry model + tier + date per honesty rule 4.

## Rendering

A `mountResponsePool(containerEl, poolId)` factory:
- Reads all `<script data-pool="{poolId}">` tags, takes `.textContent` of each as the response array.
- Minimal fence parser: split each response on triple-backtick fences; render fenced segments as code blocks (reuse the existing code-block component WITH its copy button), non-fenced segments as prose paragraphs. This keeps authoring to "paste markdown-ish text."
- Two modes:
  - `single`: shows one random response, with a "Show another" control that draws a different one (no immediate repeat). For floor tests where one specimen at a time is the point.
  - `compare`: shows TWO distinct random responses side by side (stacked on mobile), with a "Show two more" control. For non-determinism, where the variance IS the lesson.
- Framing header (always rendered above the responses): the captured-not-live statement, the capturedNote with date, and the personalization caveat.
- No localStorage needed; pools are content, not user state. Optional in-memory "don't repeat the last draw" only.

## Maintenance reality

A pool is frozen at capture time. If a future model produces different output, the pool is a time capsule of older output. For these floor tests that is acceptable: the teaching point (non-determinism, silent failure, handoff gaps) does not depend on which model produced the specimen. But pools are another artifact that can drift from current reality, so: label capture date, and when a module's lesson depends on current model behavior, re-capture rather than trust the old pool.

## Pilot

Module 1.2 Floor Test Part 1, `compare` mode, pool id `ft2-motivational`, prompt = the existing motivational-message prompt. Author captures ~10-12 real runs. This pilot doubles as the fix for the personalization-variance problem that otherwise weakens that exercise.
