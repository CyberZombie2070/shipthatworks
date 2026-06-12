# Claude Code Prompt — Baseline Assessment Capture (Module 1.1)

Copy everything below the line into Claude Code after the Module 1.1 content is wired in. It assumes the project conventions already in CLAUDE.md (vanilla JS only, REM units, no alert()/confirm(), apostrophes escaped as &#39; in attribute strings, localStorage prefixes).

---

Read foundations.html fully before changing anything.

Build an interactive Baseline Assessment widget inside Module 1.1 (p1m1), replacing the four static rubric tables and the narrative self-assessment section with functional UI. Follow the existing design system exactly (CSS variables, Space Grotesk headings, JetBrains Mono labels, REM units).

## Feature 1: The 20-item scored assessment

**Data.** Define the 20 assessment items as a const array near the module data, each item: `{ id: 1..20, cat: "A"|"B"|"C"|"D", text: "..." }`. Category labels: A = Reading Code, B = Understanding the System, C = Working with Claude Code, D = Professional Practice. Use the exact item text from the Module 1.1 content document.

**UI.** Render the assessment as four category groups. Each item is a row: item text on the left, a three-option segmented control on the right with options 0 / 1 / 2. Exactly one option selectable per item. Selected state uses the amber accent. Unanswered items show all three options in the dim/neutral state. Above the first category, show the scoring legend (0 = couldn't do it, 1 = with help, 2 = right now, confidently).

**Live scoring.** Below the four groups, render a results panel that updates on every selection:
- Total score as `N / 40`
- Four category subtotals as `A: n/10` etc.
- Progress indicator showing how many of 20 items are answered
- Once all 20 are answered, reveal the score band result. Bands: 0–10, 11–22, 23–32, 33–40, with the exact band copy from the module content document. The 33–40 band includes a link to engineer.html.
- Before all 20 are answered, the band area shows "Answer all 20 items to see your placement."

**Persistence.** Store on every change (no save button) under key `adf_assess_baseline` as JSON:
```
{
  "scores": { "1": 2, "2": 0, ... },
  "answers": { "q1": "...", "q2": "...", "q3": "...", "q4": "..." },
  "completedAt": null | ISO timestamp (set when all 20 first answered),
  "updatedAt": ISO timestamp
}
```
On module load, hydrate the widget from this key if present. Total and subtotals are always derived from `scores` at render time, never stored as separate numbers (single source of truth, same principle as the getCompletedModules fix).

## Feature 2: The four narrative questions

Render the four narrative self-assessment questions (exact text from the content document) each with a textarea below it. Autosave to the `answers` object in `adf_assess_baseline` on input, debounced ~500ms. Show a subtle "saved" indicator (dim text, no animation longer than 300ms) after each save. Textareas: min-height 6rem, panel background, border on focus uses accent-blue.

## Feature 3: Export and copy

Below the results panel, two buttons:
- **Copy results** — builds a plain-text summary (total, four subtotals, band name, the four questions with the typed answers, timestamp) and copies to clipboard using navigator.clipboard.writeText with a fallback to a temporary textarea + execCommand for older browsers. Confirmation is inline text next to the button, not a popup.
- **Download results** — same summary serialized as a .txt file via a Blob and a temporary anchor download. Filename: `baseline-assessment-YYYY-MM-DD.txt`.

This export is how a team member hands results to a lead without the platform needing accounts or a backend.

## Feature 4: End-of-course retake (scaffold only)

Add a second storage key convention now, `adf_assess_final`, with identical shape. Build one reusable render function that takes a storage key and a mode label ("Baseline" / "Final") so the final module can mount the same widget later with two lines of code. In Module 1.1, only mount the baseline instance. When `adf_assess_final` exists and the widget is in Final mode, the results panel additionally shows the per-category delta versus baseline (e.g., "A: 4/10 → 9/10, +5"). Don't build the final module mount itself yet; just make the function support it.

## Feature 5: Completion gating

Mark Complete for module p1m1 requires BOTH the quiz passed (existing behavior) AND all 20 assessment items answered. The narrative textareas are NOT required (honesty can't be gated, but item-level effort can). If the quiz is passed but the assessment is incomplete, the Mark Complete button shows disabled state with inline helper text: "Complete the baseline assessment above to finish this module."

## Feature 6: Reset behavior

Course reset (existing settings cog flow) must also clear `adf_assess_baseline` and `adf_assess_final`. Update the reset confirmation copy to mention assessment results are included. Never touch `ui_scale_offset` or other shared UI keys.

## Feature 7: External link convention

Wherever module content references JSFiddle or any external tool, render it as an anchor with `target="_blank" rel="noopener noreferrer"`, styled as the existing secondary button with a ↗ glyph. Apply this in Module 1.1's floor test (JSFiddle link) and Further Reading links. Add this as a stated convention in CLAUDE.md so future modules inherit it.

## Verification checklist before committing

1. Hard refresh, answer 7 items, refresh again: the 7 selections persist and the progress indicator reads 7/20.
2. Answer all 20: band appears, `completedAt` is set once and does not change on later edits.
3. Type in a textarea, refresh within 1 second: debounce did not lose more than the last keystrokes.
4. Copy results with clipboard permission denied (or in an insecure context): fallback path still copies.
5. Quiz passed + assessment incomplete: Mark Complete disabled with helper text. Complete item 20: button enables without a refresh.
6. Course reset clears both assess keys and the widget renders empty.
7. No raw apostrophes inside any HTML attribute string. No alert/confirm anywhere. All new units in REM.

Commit as: `feat: interactive baseline assessment with persistence and export [ai-assisted]`
