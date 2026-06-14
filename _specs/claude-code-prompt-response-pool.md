# Claude Code Prompt — Captured Response Pool (pilot: Module 1.2 Part 1)

Prereq: `_specs/response-pool-design.md` is in the repo. Paste everything below the line into Claude Code.

---

Read foundations.html fully before changing anything. Project conventions in CLAUDE.md apply (vanilla JS, REM units, no alert/confirm, &#39; escaping, no em dashes in body copy, multi-step specs produce separate commits, commit format, push after commit — and note the CLAUDE.md rule about pushing after every commit; do not skip the push).

Build a captured-response-pool feature per `_specs/response-pool-design.md`, and wire it into Module 1.2's floor test Part 1 as the pilot. This shows learners real, hand-captured Claude responses to a fixed prompt, with zero backend and zero API calls. It must be honest by construction: captured, never presented as live generation.

## 1. The mountResponsePool component

Create `mountResponsePool(containerEl, poolId)` (structured like the existing mountRunner / mountPredictionBox factories):

- Read all `<script type="text/plain" data-pool="{poolId}">` tags in document order; each tag's `.textContent` (trimmed) is one captured response. Collect into an array.
- Read the pool's config from a `RESPONSE_POOLS` const in the JS data layer (add this const): `{ "ft2-motivational": { mode: "compare", capturedNote: "Real Claude outputs, captured June 2026", prompt: "<exact prompt text>" } }`.
- Minimal fence parser: split each response string on triple-backtick code fences. Render fenced segments as code blocks using the EXISTING code-block component and its copy button; render non-fenced segments as prose paragraphs (preserve paragraph breaks on blank lines). Do not pull in any markdown library; this is a small split-on-fences parser only.
- Modes:
  - `single`: render one randomly chosen response, plus a "Show another response" button that draws a different index (never repeat the immediately previous one; if only one response exists, hide the button).
  - `compare`: render TWO distinct randomly chosen responses in a two-column layout (CSS that stacks to one column at mobile widths), plus a "Show two more" button that draws two new distinct indices. If fewer than two responses exist, render what's available and a note that more captured responses are needed.
- Framing header, ALWAYS rendered above the responses, using existing callout/panel styling:
  - A line stating these are real responses Claude produced for this exact prompt, captured and stored here, not generated live.
  - The `capturedNote` text (with its date).
  - The personalization caveat: "If you have personalized Claude with a custom style, saved memory, or rules, your own results may differ from these and from each other."
- No localStorage. Optional in-memory tracking of the last-drawn index(es) only, to avoid immediate repeats.
- NO fake "generating..." state, typing animation, or any affordance implying live generation. Draws are instant.

## 2. Seed pool data (placeholder, author replaces)

Add the `RESPONSE_POOLS` config entry for `ft2-motivational` (mode "compare", the motivational-message prompt text copied verbatim from the Module 1.2 floor test Part 1, capturedNote as above).

Add TWO placeholder `<script type="text/plain" data-pool="ft2-motivational" data-idx="0">` and `data-idx="1"` tags containing clearly-marked placeholder content, each including one fenced code block and a sentence of prose, so the component renders and can be visually verified. Place these script tags in a clearly commented section (e.g., `<!-- CAPTURED RESPONSE POOLS: replace placeholder content with real captured Claude runs; copy a tag and bump data-idx to add more -->`).

Add to CLAUDE.md a short "Captured response pools" note: responses live in `<script type="text/plain" data-pool="...">` tags; to add a captured run, copy a tag, bump data-idx, paste the raw response; never present pools as live generation; keep the framing header's honesty lines intact.

## 3. Wire into Module 1.2 Floor Test Part 1

Currently Part 1 step 1 tells the learner to open two chats (with the incognito caveat already added). Keep that self-run path. ADD, after the existing Part 1 steps, a clearly separated subsection:

- A short lead: the learner can run the prompt themselves above, OR view real captured responses below to see the variance directly.
- Mount the `ft2-motivational` pool in `compare` mode here (mounts when p1m2 renders, same approach as the runner/prediction-box mounts).

Do not remove or weaken the self-run instruction or its incognito caveat. The pool is additive.

## Verification

1. Module 1.2 Part 1 shows both the self-run instruction (with incognito caveat) and the captured-pool subsection.
2. The pool renders two placeholder responses side by side at desktop width, stacked at mobile width; the fenced code block renders as a styled code block with a working copy button; prose renders as paragraphs.
3. "Show two more" draws two distinct responses (with only two placeholders present, it shows both; confirm no crash and no duplicate-in-both-columns).
4. The framing header is present and shows all three honesty elements: captured-not-live statement, capturedNote with date, personalization caveat. No "generating" or typing animation anywhere.
5. Adding a third `<script data-pool="ft2-motivational" data-idx="2">` tag with test content makes it eligible for draws without any code change (confirms the tag-driven authoring works).
6. No em dashes in added copy; no raw apostrophes in attribute strings; REM units; no localStorage added for pools.

End-of-task report: files changed, confirmation the component reads pools from script tags (not a hardcoded array), and a one-line note telling the author exactly where to paste real captured responses and how. Do not deviate silently.

Commits (separate, both pushed):
- `feat: captured response pool component [ai-assisted]`
- `feat: wire captured response pool into module 1.2 non-determinism floor test [ai-assisted]`
