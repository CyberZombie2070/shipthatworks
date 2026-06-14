# Claude Code Prompt — r2: Verify r1 Completion + Quiz Results Layout

Save as `_specs/fixes-r2.md`, then paste everything below the line into Claude Code.

---

Read foundations.html fully before changing anything. Project conventions in CLAUDE.md apply (vanilla JS, REM units, no alert/confirm, &#39; escaping, no em dashes in copy, commit format, push after commit).

## STEP 0 — Audit: did revisions-r1 Steps 2 and 3 actually land?

The revisions spec (`_specs/claude-code-prompt-revisions-r1.md`) required three commits. Only the first (`content: generalized learner lead...`) appears in git log. Determine whether Steps 2 and 3 were applied inside that commit or skipped entirely. Check for concrete evidence:

1. Quiz bank: does p1m1's bank contain the hardened Q8 distractor string "no move except re-prompting and hoping"? Does Q1's stem reference "several ways people arrive" rather than a fixed count? Are there 12 questions with length-balanced options?
2. CLAUDE.md: does a "Quiz bank standards" section exist?
3. Link styling: do in-content anchors use var(--accent-blue) with underline in both course files?
4. Quiz scroll fix: does the post-answer scroll logic target the Next/Results button (or container bottom), not just the explanation?

Report findings explicitly. For anything missing, apply it now exactly per the r1 spec (STEP 2 and STEP 3 sections), with the original commit messages:
- `feat: hardened 12-question quiz bank with distractor standards [ai-assisted]`
- `fix: link legibility and quiz next-button visibility [ai-assisted]`

If everything was actually applied but squashed into one commit, say so, make no changes for this step, and move on.

## STEP 1 — Mark Complete in the quiz results panel

Current behavior: passing the quiz shows the results panel (score, "Quiz passed!" message, Review Answers button), and the Mark Complete button lives separately in the module footer below, requiring a scroll.

New behavior: when the quiz is PASSED, the results panel shows two buttons side by side: **Mark Complete** (primary, amber accent) and **Review Answers** (secondary, as now). Requirements:

1. The results-panel Mark Complete button calls the SAME handler as the footer button. Do not duplicate completion logic; both buttons route through the single markModuleComplete writer and the same gating checks.
2. Gating still applies. For p1m1 specifically, if the baseline assessment is incomplete, the results-panel button renders disabled with the same inline helper text the footer uses ("Complete the baseline assessment above to finish this module."). When the assessment completes, both buttons enable without a refresh.
3. After clicking either button: all progress displays refresh (via refreshProgressDisplays), and both buttons reflect the completed state (e.g., become a non-interactive "Completed ✓" state or hide, matching whatever the footer currently does).
4. On a FAILED quiz result, the panel shows Retry (existing behavior) and no Mark Complete button.
5. Buttons stack vertically on narrow/mobile widths without overflow.
6. Apply in both foundations.html and engineer.html.

## Verification

1. Run the four STEP 0 evidence checks and include results in the end-of-task report.
2. Pass a quiz in a module with no assessment gate: Mark Complete appears next to Review Answers, works, progress updates everywhere, refresh persists.
3. In p1m1 with the assessment incomplete: pass the quiz, results-panel button is disabled with helper text; complete item 20 of the assessment; button enables live; click it; module completes.
4. Fail a quiz deliberately: no Mark Complete in the results panel.
5. Mark complete from the results panel, then scroll to the footer: footer state matches (no desync between the two buttons).
6. Mobile width: buttons stack cleanly.
7. Repeat check 2 once in engineer.html.

End-of-task report: STEP 0 findings (applied vs. squashed vs. missing, with the evidence), files changed, any deviation with reason.

Commit (in addition to any STEP 0 commits): `feat: mark complete from quiz results panel [ai-assisted]`
