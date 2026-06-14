# Claude Code Prompt — Wire In Module 1.2

Prereq: `_specs/module-1.2-expanded.md` is in the repo, and the in-page code runner (mountRunner) and PROMPT copy-block patterns from Module 1.1 already exist. Save this as `_specs/wire-module-1.2.md`, then paste everything below the line into Claude Code.

---

Read foundations.html fully before changing anything, paying attention to how Module 1.1 (p1m1) is structured in the data, since 1.2 mirrors its patterns. Project conventions in CLAUDE.md apply (vanilla JS, REM units, no alert/confirm, &#39; escaping, no em dashes in body copy, external links open in a new tab with the ↗ glyph, navTitle required, multi-commit specs produce separate commits, commit format, push after commit).

Source content: `_specs/module-1.2-expanded.md`. Wire it in as module p1m2, replacing the existing thin 1.2 content. Module 1.2 has NO assessment widget (that is unique to 1.1); it uses the quiz, the floor test with one runner instance, and three PROMPT copy-blocks.

## 1. Module body

Replace p1m2's content with the full module body from the source: Lead through "What This Changes About Tomorrow." Use the same typography, section, and code-block patterns as p1m1. Preserve all internal cross-references to other modules as plain text (no links needed). Confirm the module header uses the full `title` ("How Claude Code Actually Works (No More Illusions)") and the sidebar uses a navTitle (e.g., "How Claude Code Works") obeying the navTitle rules.

Set/confirm module metadata: estimated time 35 min (update sidebar row, module header, and any course duration total), difficulty Foundational, prerequisite Module 1.1.

## 2. PROMPT copy-blocks (three)

The floor test contains three prompts the learner copies into Claude. Each renders as a PROMPT-labeled block with the existing copy button (same component used for the Module 1.1 floor test prompt). The three exact prompt texts, copied verbatim from the source file's floor test:

- Part 1 (motivational message function)
- Part 2 (multiply 847293 by 612847 in your head)
- Part 3 (current Node.js LTS version)

Copy each prompt's text exactly as written in the source. The copy button must place the prompt text on the clipboard with nothing extra (no label, no markdown fence).

## 3. Code runner instance

The floor test Part 2 uses one runner instance:
- Runner id `ft2-multiply`, starter code exactly as written in the source file (the two comment lines plus `console.log(847293 * 612847);`).
- Use the existing mountRunner factory; mount it where Part 2's text references it. Persistence key follows the existing convention (`adf_runner_ft2-multiply`), and course reset already clears `adf_runner_*`, so confirm this instance is covered.

Parts 1 and 3 of the floor test do NOT use a runner; they use external Claude (the PROMPT blocks) and an external link to nodejs.org. The nodejs.org link uses the new-tab convention.

## 4. Quiz bank

Replace p1m2's quiz with the 12 questions from the source file, with explanations and correct-answer markers in the existing data format. These follow the hardened distractor standards already in CLAUDE.md. Confirm the engine draws 4 of 12, shuffles options, shows explanations, and keeps the 3/4 pass threshold. The Mark Complete button (now in the quiz results panel per fixes-r2, if that landed) requires only the quiz pass for this module, since 1.2 has no assessment gate.

## 5. Further Reading

Wire the four Further Reading links from the source, all using the new-tab convention with the ↗ glyph.

## Verification

1. Module 1.2 renders end to end at desktop and mobile widths, no layout breaks, sidebar shows a one-line navTitle.
2. All three PROMPT copy buttons copy the exact prompt text, clipboard contents verified.
3. Runner `ft2-multiply` runs and prints the product; editing then refreshing persists; course reset clears it.
4. nodejs.org and all Further Reading links open in a new tab.
5. Quiz: 5 attempts show varied questions, shuffled options, explanations, 3/4 pass; Mark Complete unlocks on pass and routes through the single completion writer; progress shows 2/18 (or current count) consistently after completing both 1.1 and 1.2, and persists on refresh.
6. No em dashes in the wired body copy; no raw apostrophes in attribute strings.
7. Estimated-time 35 min reflected in sidebar, header, and course totals.

End-of-task report: files changed, the navTitle used, any deviation from this spec or the source content with the reason. Do not deviate silently.

Commit: `feat: expanded module 1.2 content with runner and 12-question bank [ai-assisted]`
