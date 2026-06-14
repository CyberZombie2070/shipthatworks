# Claude Code Prompt — Wire In Real Captured Response Pools (ft2-motivational, ft3-validate)

Prereq: `_specs/pool-ft2-motivational.html` and `_specs/pool-ft3-validate.html` are in the repo (the assembled real captured runs), and the `mountResponsePool` component plus placeholder pools are already wired (from the earlier response-pools build). Paste everything below the line into Claude Code.

---

Read foundations.html fully before changing anything. Project conventions in CLAUDE.md apply (vanilla JS, REM units, no alert/confirm, &#39; escaping, no em dashes in body copy, multi-step specs produce separate commits, commit format). SHELL IS POWERSHELL ON WINDOWS: use single-line `-m` commit messages only, never bash heredoc (`<<'EOF'`) syntax. Push after every commit per CLAUDE.md.

## Goal

Replace the placeholder pool data for two pools with the real captured runs, and update their displayed provenance. The component and mount points already exist; this is a data swap plus a capturedNote update. Do not change the component logic.

## 1. Replace ft2-motivational pool data

In foundations.html, find the placeholder `<script type="text/plain" data-pool="ft2-motivational" ...>` tags (there are two placeholders) and replace ALL of them with the full block from `_specs/pool-ft2-motivational.html` (the leading HTML comment block plus all 12 `<script ... data-idx="0..11">` tags). Paste the block verbatim; do not alter the captured response text inside the tags.

## 2. Replace ft3-validate pool data

Find the placeholder `<script type="text/plain" data-pool="ft3-validate" ...>` tags (two placeholders) and replace ALL of them with the full block from `_specs/pool-ft3-validate.html` (comment block plus all 9 `<script ... data-idx="0..8">` tags). Paste verbatim. Note: idx 4 intentionally contains a self-correction (a wrong comment followed by a correction). Do NOT clean or collapse it; it is a deliberate teaching specimen. The comment block explains this.

## 3. Update displayed provenance (capturedNote)

In the `RESPONSE_POOLS` const, set the `capturedNote` for BOTH pools to:
```
Real Claude outputs, captured June 2026 (Claude Opus 4.8, High)
```
This is the text shown in each pool's framing header above the responses.

## 4. Confirm no leftover placeholders

After the swaps, search the file to confirm there are no remaining PLACEHOLDER-marked pool script tags for either pool. Every `data-pool="ft2-motivational"` tag should be one of the 12 real runs; every `data-pool="ft3-validate"` tag should be one of the 9 real runs.

## Verification

1. Module 1.2 Part 1: the `ft2-motivational` pool renders in compare mode, drawing TWO DISTINCT runs side by side from the 12. Click "Show two more" several times and confirm genuinely different function names and message sets appear (e.g., getDevMotivation vs getMotivationalMessage), demonstrating the variance. Two columns desktop, stacked mobile.
2. Module 1.3: the `ft3-validate` pool renders in single mode with a "Show another response" control cycling through the 9 runs. Confirm the idx-4 run renders BOTH its code blocks (the wrong third-example comment and the correction beneath it).
3. Both pools' framing headers show all three honesty elements, and the capturedNote now reads "Real Claude outputs, captured June 2026 (Claude Opus 4.8, High)".
4. Fenced code in every run renders as a styled code block with a working copy button; prose between blocks renders as paragraphs; bullet lists (idx 7 of ft3, idx in ft2 with closing notes) render acceptably.
5. No "generating"/typing animation anywhere; draws are instant.
6. The self-run instructions and incognito caveats in both floor tests are still present and intact (the pool is additive, not a replacement).
7. No raw apostrophes broken in attribute strings; no console errors; mobile widths usable.

End-of-task report: confirm both placeholder sets were fully replaced, the run counts present (12 and 9), the capturedNote values, and any deviation with reason. Do not deviate silently.

Commit (single-line message, PowerShell): `content: real captured response pools for 1.2 and 1.3 (Opus 4.8 High) [ai-assisted]` then push.
