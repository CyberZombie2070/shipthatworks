# Claude Code Prompt — Navigation Pane Refactor

Save as `_specs/nav-refactor.md`, then paste everything below the line into Claude Code. Run this as its own session; do not combine with content work.

---

Read foundations.html and engineer.html fully before changing anything. Project conventions in CLAUDE.md apply (vanilla JS, REM units, no alert/confirm, &#39; escaping, commit format, push after commit).

Refactor the left navigation sidebar in BOTH course files. The current nav was designed for 18 modules; the courses are expanding to 32 and 26, so density and scan-ability are the goals. Five changes, all structural. Visual identity (colors, fonts, phase badge palette) stays as-is.

## 1. Short nav titles (data model change)

Add a `navTitle` field to every module's data object in both courses. Rules:
- Maximum ~30 characters, must fit one line at the current sidebar width and font size. No ellipsis truncation anywhere; if a navTitle doesn't fit, shorten the navTitle.
- The full title remains the `title` field, used in the module header, course home cards, search results, and certificate.
- Draft a navTitle for every existing module (e.g., "TypeScript: Reading Types Without Being a TypeScript Expert" becomes "TypeScript: Reading Types"; "Async/Await — The Pattern You See Everywhere" becomes "Async/Await"). Include the full list of drafted navTitles in your end-of-task report for human review.
- Add to CLAUDE.md: every new module added to course data MUST include a navTitle obeying these rules.

Module rows become a single line: module number, navTitle, status glyph (see 3), star (see 4). Remove the per-row duration line entirely; durations remain in the module header and the course-level totals.

## 2. Accordion phases

- Default state on load: only the phase containing the active module (last visited or in progress) is expanded. All other phases are collapsed.
- Collapsed phase header shows: phase badge, phase name, completion count (n/m), and a green check glyph when n equals m.
- A phase that becomes fully completed auto-collapses on the next page load (not mid-session while the user is looking at it).
- Clicking a phase header toggles it. Manual open/close choices persist in localStorage under `nav_open_phases_[courseId]` (a UI preference key: it survives course reset, like ui_scale_offset, and must NOT be cleared by the reset flow).
- Navigating to a module in a collapsed phase (search result click, arrow-key navigation, resume button) auto-expands that phase and scrolls the module row into view.

## 3. Single-meaning status colors

- Not started: title at the current dim level.
- In progress / active module: amber. Keep the amber left border and background tint on the active row. Remove the green "In progress" text label; if an in-progress indicator is wanted, it is a small amber dot, not text.
- Completed: small green check glyph at the row's right edge, title at FULL text color, not dimmed. Dimming completed modules is removed entirely; dim now exclusively means "not started."
- Green appears in the nav only to mean completed. Audit the sidebar for any other green usage and remove or recolor it.

## 4. Hover-revealed bookmark stars

- The star on a module row is invisible by default, appears on row hover, and is always visible when the module is bookmarked.
- Touch devices (no hover): the star is always visible at reduced opacity. Use a hover-capability media query, not user-agent sniffing.
- The bookmarks section at the top of the nav is unchanged.

## 5. Sticky phase header

While scrolling inside the sidebar, the header of the currently expanded phase sticks to the top of the sidebar scroll area until its module list scrolls past. Use position: sticky within the sidebar scroll container; verify it doesn't fight the independent-scroll behavior or the bookmarks section.

## Verification checklist

1. Both courses: every module row is one line; no wrapped or ellipsized navTitles at default UI scale, and spot-check at +25% UI scale via the settings slider.
2. Load foundations.html with progress mid-course: only the active phase is expanded; counts on collapsed headers are correct; a fully completed phase shows its check and auto-collapses on next load.
3. Toggle two phases open, refresh: state persists. Run course reset: progress clears but the open-phase preference and UI scale survive.
4. Click a search result for a module in a collapsed phase: phase expands and the row scrolls into view. Arrow-key navigation across a phase boundary does the same.
5. Status audit: a completed module shows full-color title plus green check; the active module is amber; nothing else in the sidebar is green; no "In progress" text label remains.
6. Star hidden until hover, persistent when bookmarked, visible-dim on a touch viewport (emulate in DevTools).
7. Sticky phase header behaves during deep scroll in the largest phase; bookmarks section still renders above phases and scrolls normally.
8. Mobile drawer layout still functions end to end.
9. No regressions: quiz engine, Mark Complete flow, progress counters, and resume all behave identically (they read through getCompletedModules; confirm no nav code duplicated completion state).

End-of-task report: list every navTitle drafted (both courses) for human review, every file changed, and any deviation from this spec with the reason. Do not deviate silently.

Commit: `refactor: nav accordion, one-line rows, single-meaning status colors [ai-assisted]`
