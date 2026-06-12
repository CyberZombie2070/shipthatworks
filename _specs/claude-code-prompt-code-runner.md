# Claude Code Prompt — In-Page Code Runner (replaces JSFiddle dependency)

Copy everything below the line into Claude Code. Assumes existing CLAUDE.md conventions: vanilla JS only, REM units, no alert()/confirm(), apostrophes escaped as &#39; in attribute strings, adf_ localStorage prefix for the Foundations course.

---

Read foundations.html fully before changing anything.

Build a reusable, sandboxed, in-page JavaScript code runner so floor tests no longer depend on JSFiddle. The learner edits code in the module, presses Run, and sees console output inline. This must be vanilla JS with zero external dependencies, matching the existing design system (CSS variables, JetBrains Mono for code, REM units).

## Architecture

One reusable factory: `mountRunner(containerEl, config)` where config is `{ id, starterCode, heightRem }`. Module content declares runner mount points; module-load logic mounts them. Multiple runners per module must work independently.

### UI per runner instance
- Code editor: a textarea styled like the existing code blocks (panel background, border, JetBrains Mono, 0.9rem). Pressing Tab inserts two spaces instead of moving focus. Spellcheck, autocorrect, autocapitalize off.
- Button row: **Run** (primary, amber accent), **Reset code** (secondary), and a **Stop** button that only appears while code is running.
- Console panel below the editor: dark surface, monospace, each output line prefixed with a subtle marker. Color coding: console.log in --text, console.warn in --accent, console.error and uncaught errors in --red. A dim "Console output appears here" placeholder when empty. Auto-scrolls to newest line. Cap at 200 lines; if exceeded, show "Output truncated (200 line limit)" and stop appending (protects against runaway loops spamming the DOM).

### Execution model (security and isolation)
- On every Run: destroy any previous iframe for this runner, create a fresh iframe with `sandbox="allow-scripts"` ONLY. Do NOT add allow-same-origin. This gives the user code an opaque origin with no access to the platform's localStorage, cookies, or DOM.
- The iframe is visually hidden (it exists only to execute code).
- Do not inline user code into srcdoc (escaping hazard). Instead, srcdoc contains only a fixed harness that:
  1. Overrides console.log/warn/error/info to `parent.postMessage({ runnerId, type: 'console', level, args: stringifiedArgs }, '*')`. Stringify args safely: String() for primitives, JSON.stringify with a try/catch fallback to String() for objects, and render undefined as "undefined" so `greet()` exercises display correctly.
  2. Registers window.onerror and unhandledrejection handlers that post `{ type: 'error', message }`.
  3. Listens for `{ type: 'exec', code }` and executes via `new Function(code)()` inside try/catch (catch posts the error), then posts `{ type: 'done' }`.
- Parent waits for the iframe's load event, then posts the exec message. Parent's message listener routes by runnerId and ignores anything else.
- Watchdog: if no 'done' or 'error' arrives within 5 seconds, append an amber console line: "Still running after 5s. Possible infinite loop. Press Stop to end it." Stop removes the iframe, which kills execution instantly.
- Run is disabled (dimmed) while a run is in flight, re-enabled on done/error/stop.

### Persistence
- Save the learner's edited code to `adf_runner_{id}` on input, debounced ~500ms. On mount, hydrate from that key if present, else use starterCode.
- Reset code restores starterCode, clears the storage key, and clears the console panel. Inline confirmation is NOT needed for reset (the cost of a misclick is low and starter code is one click away).
- Course reset (settings cog) must clear all `adf_runner_*` keys for this course.

## Module 1.1 integration

Replace the JSFiddle instructions in Floor Test 1.1 with two runner instances:

1. **Runner id `ft1-greet`** in Parts 1 and 2. Starter code is exactly:
```
// Part 1: Ask Claude for the greet function described above,
// then paste the code it gives you below this line and press Run.

```
2. **Runner id `ft1-discount`** in Part 3, prefilled with the applyDiscount function and the `console.log(applyDiscount(50, 20));` call exactly as written in the module content.

Update the floor test copy minimally: "Open JSFiddle in a new tab" becomes instructions to use the runner below; keep one sentence noting JSFiddle/CodePen as alternatives if the learner prefers an external tool, with the existing new-tab link convention. Part 2 step 4 changes "add the line" to "add the line at the bottom of the editor and press Run again."

Keep the JSFiddle entry in Further Reading.

## CLAUDE.md update

Add a convention entry: floor test code exercises use the in-page runner via mountRunner; runner ids are namespaced `ft{module}-{slug}`; starter code lives with the module data, not hardcoded in the runner.

## Verification checklist before committing

1. Run the greet exercise: paste a greet function, Run, output appears. Call `greet()` with no argument: console shows "Hello, undefined!" (the literal string "undefined" must render, not blank).
2. `console.log({a: 1})` renders as {"a":1}. `console.error("x")` renders red. An intentional syntax error renders red with a message, and Run re-enables.
3. `while(true){}` triggers the 5s watchdog message; Stop kills it; the page stays responsive throughout; a new Run works after Stop.
4. `for(let i=0;i<5000;i++) console.log(i)` hits the 200-line cap with the truncation notice and the tab does not lock up.
5. In the iframe code, attempt `parent.document` and `localStorage`: both must throw/fail (sandbox without allow-same-origin). Confirm course progress keys are untouched after runs.
6. Edit code in runner 1, refresh: edit persists. Reset code: starter restored, key cleared. Both runners on the page operate independently (output goes to the correct console).
7. Tab key inserts two spaces in the editor. All new units in REM. No raw apostrophes in attribute strings. No alert/confirm.
8. Mobile width: editor and console remain usable, buttons don't overflow.

Commit as: `feat: sandboxed in-page code runner for floor tests [ai-assisted]`
