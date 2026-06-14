# Claude Code Prompt — Captured Response Pools (three pools across Modules 1.1, 1.2, 1.3)

Prereq: `_specs/response-pool-design.md` is in the repo. Paste everything below the line into Claude Code.

---

Read foundations.html fully before changing anything. Project conventions in CLAUDE.md apply (vanilla JS, REM units, no alert/confirm, &#39; escaping, no em dashes in body copy, multi-step specs produce SEPARATE commits, commit format, and PUSH after every commit per CLAUDE.md — do not skip the push).

Build the captured-response-pool feature per `_specs/response-pool-design.md` ONCE, then wire it into three floor-test locations. This shows learners real, hand-captured Claude responses to fixed prompts, zero backend, zero API calls, honest by construction (captured, never presented as live generation).

Three confirmed targets in the current file:
- Module 1.1 greet floor test (prompt at the `<pre>` near line 655; no-access `<details>` fallback at line 661). Pool id `ft1-greet`, mode `single`. This pool REPLACES the existing no-access fallback (it is strictly more: real examples plus the access path).
- Module 1.2 Part 1 motivational-message floor test. Pool id `ft2-motivational`, mode `compare`.
- Module 1.3 validatePassword floor test (prompt `<pre>` near line 933). Pool id `ft3-validate`, mode `single`.

Do NOT add pools anywhere else. Specifically do not pool: the 1.1 discount runner exercise, the 1.2 Part 2 multiplication, or the 1.2 Part 3 Node LTS exercise. Those are intentionally excluded (no generation moment, or a pool would corrupt a lesson about staleness).

## 1. The mountResponsePool component (build once)

Create `mountResponsePool(containerEl, poolId)`, structured like the existing mountRunner / mountPredictionBox factories:

- Read all `<script type="text/plain" data-pool="{poolId}">` tags in document order; each tag's trimmed `.textContent` is one captured response. Collect into an array.
- Read pool config from a new `RESPONSE_POOLS` const in the JS data layer:
  ```
  RESPONSE_POOLS = {
    "ft1-greet":       { mode:"single",  capturedNote:"Real Claude outputs, captured June 2026", prompt:"<exact greet prompt>" },
    "ft2-motivational":{ mode:"compare", capturedNote:"Real Claude outputs, captured June 2026", prompt:"<exact motivational prompt>" },
    "ft3-validate":    { mode:"single",  capturedNote:"Real Claude outputs, captured June 2026", prompt:"<exact validatePassword prompt>" }
  }
  ```
  Copy each prompt text verbatim from the corresponding floor test.
- Minimal fence parser: split each response on triple-backtick code fences; render fenced segments via the EXISTING code-block component WITH its copy button; render non-fenced segments as prose paragraphs (blank line = paragraph break). No markdown library; split-on-fences only.
- Modes:
  - `single`: render one random response; a "Show another response" button draws a different index (never immediate-repeat; if only one response exists, hide the button).
  - `compare`: render TWO distinct random responses in a two-column layout that stacks to one column at mobile widths; a "Show two more" button draws two new distinct indices; if fewer than two responses exist, render what is available plus a small note that more captured responses are needed.
- Framing header, ALWAYS above the responses, using existing callout/panel styling, with all three honesty elements:
  1. A line stating these are real responses Claude produced for this exact prompt, captured and stored here, not generated live.
  2. The `capturedNote` (with date).
  3. The personalization caveat: "If you have personalized Claude with a custom style, saved memory, or rules, your own results may differ from these and from each other."
- No localStorage. Optional in-memory last-draw tracking only. NO "generating..." state, typing animation, or anything implying live generation. Draws are instant.

Add to CLAUDE.md a "Captured response pools" note: responses live in `<script type="text/plain" data-pool="...">` tags; to add a captured run, copy a tag, bump data-idx, paste the raw response; never present pools as live generation; keep the framing header honesty lines intact.

## 2. Seed each pool with two placeholders

For EACH of the three pool ids, add two placeholder tags so the component renders and is verifiable:
```
<script type="text/plain" data-pool="ft1-greet" data-idx="0"> ...placeholder with one fenced code block + a prose sentence... </script>
<script type="text/plain" data-pool="ft1-greet" data-idx="1"> ...second placeholder... </script>
```
Mark content clearly as PLACEHOLDER. Group all pool script tags in one clearly commented section:
`<!-- CAPTURED RESPONSE POOLS: replace PLACEHOLDER content with real captured Claude runs; copy a tag and bump data-idx to add more. Do not present as live generation. -->`

## 3. Wire the three locations

**1.1 greet (replace the fallback):** Remove the existing no-access `<details>` fallback (line ~661) and in its place mount the `ft1-greet` pool (single mode) when p1m1 renders. The pool's framing already covers the no-access learner (real captured code they can read without an account), so add one sentence to the pool lead noting that learners without AI access can study these real responses instead of running the prompt. Keep the self-run prompt instruction above it intact.

**1.2 Part 1 motivational (additive):** Keep the self-run instruction and its incognito caveat. After Part 1's existing steps, add a separated subsection with a short lead ("run it yourself above, or view real captured responses below to see the variance directly") and mount `ft2-motivational` (compare mode) when p1m2 renders.

**1.3 validatePassword (additive):** Keep the self-run prompt and the Part 2/Part 3 exercises intact. After the Part 1 prompt block, add a separated subsection with a short lead (run it yourself, or view real captured responses) and mount `ft3-validate` (single mode) when p1m3 renders. Note in the lead that the captured responses are baseline (no personal rules), so their handoff gaps are what a default learner would see.

All three mounts follow the same render-hook approach as the existing runner/prediction-box mounts for each module.

## Verification

1. Component reads pools from script tags, not a hardcoded array (confirm by adding a third `data-idx="2"` tag to any pool and seeing it become eligible with no code change).
2. 1.1: the old `<details>` fallback is gone; the `ft1-greet` pool renders in single mode with "Show another response"; the self-run prompt above it is intact; framing header shows all three honesty elements.
3. 1.2 Part 1: self-run instruction + incognito caveat still present; `ft2-motivational` renders in compare mode (two columns desktop, stacked mobile) with "Show two more"; no duplicate response across both columns.
4. 1.3: self-run prompt + Parts 2/3 intact; `ft3-validate` renders single mode with framing header.
5. Fenced code in placeholders renders as styled code blocks with working copy buttons; prose renders as paragraphs.
6. No "generating"/typing animation anywhere; draws instant.
7. No em dashes in added copy; no raw apostrophes in attribute strings; REM units; no localStorage for pools.
8. Mobile widths usable for all three.

End-of-task report: files changed; confirmation the component is tag-driven; and a short block telling the author exactly where to paste real captured responses for each of the three pools (the comment marker location). Do not deviate silently.

Commits (separate, each pushed):
- `feat: captured response pool component [ai-assisted]`
- `feat: wire response pools into modules 1.1, 1.2, 1.3 floor tests [ai-assisted]`
