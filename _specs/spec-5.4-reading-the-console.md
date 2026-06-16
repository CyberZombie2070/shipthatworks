# Spec — new Phase 5 module: 5.4 Reading the Console (outline + doc bank)

**Decision:** add "Reading the Console: Tool Calls, Approvals, and When to Say No" as Phase 5
module 5.4, between 5.3 (Git / verification stack) and the current 5.4 (Token and Context
Discipline), which renumbers to 5.5. Phase 5: 4 -> 5 modules. Course: 20 -> 21 modules.

**Why here:** it depends on 5.3 (evaluating an edit approval is reading a diff; evaluating a
git approval needs basic Git), so it must follow 5.3. It sits before token/context because the
two split on a real seam — this module owns the APPROVAL GATE (read a proposed action, decide
before it runs); token/context owns the RUN (interrupt a runaway already executing, plus scope
and cost). Gate-reading is the more fundamental control literacy and reads better first.

**Low-risk renumber:** the current 5.4 (token/context) is still a STUB — no `p5m4` exists in
foundations.html (only p5m1-p5m3 are built). So this is an outline-and-design-doc change only:
no QB, no completion keys, no HTML module objects. When these modules are eventually built,
suggested ids: new 5.4 = `p5m4`, token/context 5.5 = `p5m5` (nothing built past p5m3, so no id
churn). NOT touched: engineer.html (separate course, its own numbering and "18 modules" count).

---

## NEW OUTLINE ENTRY (insert into COURSE-LEARNING-ARC-OUTLINE.md, immediately before the current "## 5.4 — Token and Context Discipline" line)

## 5.4 — Reading the Console: Tool Calls, Approvals, and When to Say No
- Teaches: how to read what Claude Code is actually doing in the console — the tool-call types (run a shell command, edit a file, write a new file, read a file) and what each is about to do; how to decode an approval prompt before answering it (what a chained shell command runs, what `git add .` actually stages, what a proposed file edit changes); the red flags that mean slow down (destructive or irreversible operations, a command whose scope is broader than the task, an edit to a file you did not expect); and the three responses at the gate — approve, deny, or amend — with reflexive approval named as the magic-box habit in its purest form.
- Assumes: Phase 1 (1.2's loop, and the permission-prompt-as-accountability framing it already introduces), 5.1 (session discipline), 5.3 (reading a diff and basic Git, which an edit or commit approval requires you to read).
- Spine tie: the approval gate is where "verify, do not trust the confident surface" collapses to a single keystroke. A learner who cannot read the proposed action cannot evaluate it, so they approve it — the course's central failure, concentrated into one click.
- What goes wrong (sourced from real incidents building this course, reconstructed as fictional practitioner mocks): approving a chained command after reading only its first clause; not noticing `git add .` stages more than intended; approving a write that overwrites a file rather than editing it; saying yes to a destructive command (delete, force-push, overwrite) because the prompt looked routine; never using deny or amend, so the gate becomes a rubber stamp.
- Framing rule (critical, same family as 5.5's judgment-not-pricing): teach JUDGMENT, not the current console UI. The exact prompt layout, the numbered options, the keybindings all change across tool versions and date instantly. Teach the categories of action and what to check before approving each; show the current console only as a captured, date-stamped specimen under the Section 10 honesty rules (provenance shown, never presented as evergreen). Principles in, this-version's-keystrokes out.
- Boundary with 5.5 (no double-teaching): this module owns the APPROVAL GATE — reading a proposed action and deciding approve/deny/amend before it runs. 5.5 owns the RUN — recognizing a stuck or runaway agent that is already executing and interrupting it, plus scope and context cost. Reviewing a proposed action versus controlling one in flight.
- Code/exercise: read three captured approval prompts (a routine git add-and-commit chain, an over-broad shell command, a write that would overwrite) and decide approve, deny, or amend for each, naming the specific tell.
- Diagram (create): the approval gate as a decision flow — proposed action -> read it (what is it? how broad? reversible?) -> approve | amend | deny -> runs, or does not. (Alternatively: the four tool-call types and what each one can touch — shell, edit, write, read.)
- Interactive: an "approve, amend, or deny?" judgment exercise over captured prompts; a prediction box on what a given command will do, before the reveal.
- Quiz: ~12.
- Forward tie: live-agent control is the on-ramp to the Engineer course's agent-safety and permissioning material — running agents you can trust because you can see what they are about to do. (Meta-note for the builder: this course's own development is live source material — approving the wiring prompts that build these modules is itself the lesson, reconstructed as fictional mocks per Section 9.)

---

## CROSS-REFERENCE EDITS (so neither doc is left lying)

### COURSE-LEARNING-ARC-OUTLINE.md
E1 — count in the intro. FIND:
`so the eighteen modules stay one coherent course rather than eighteen disconnected tutorials.`
REPLACE:
`so the twenty-one modules stay one coherent course rather than twenty-one disconnected tutorials.`

E2 — Phase 5 header. FIND:
`# PHASE 5 — Workflow & Discipline (4 modules)`
REPLACE:
`# PHASE 5 — Workflow & Discipline (5 modules)`

E3 — renumber token/context. FIND:
`## 5.4 — Token and Context Discipline: Using the Tool Without Wasting It`
REPLACE:
`## 5.5 — Token and Context Discipline: Using the Tool Without Wasting It`

E4 — insert the NEW OUTLINE ENTRY above (the full "## 5.4 — Reading the Console..." block)
immediately before the line E3 just renamed to `## 5.5 ...`.

E5 — diagram budget. FIND:
`- **Diagram budget:** ~1 diagram per module (18 total across the course, ~15 new for Phases 2-6), each genuinely spatial per the design doc's test. Listed above per module. Don't exceed without reason; don't decorate.`
REPLACE:
`- **Diagram budget:** ~1 diagram per module (about 21 total across the course, ~17 new for Phases 2-6), each genuinely spatial per the design doc's test. Listed above per module. Don't exceed without reason; don't decorate.`

E6 — build-order count. FIND:
`6. Total module count is now 20 (Phase 2 grew from 4 to 5 with the landscape addition; Phase 5 grew from 3 to 4 with the token/context discipline addition, 5.4). Modules still to expand from stub: Phases 3-6 plus the new 5.4 (2.1 and 2.2 are built).`
REPLACE:
`6. Total module count is now 21 (Phase 2 grew from 4 to 5 with the landscape addition; Phase 5 grew from 3 to 5 — the token/context discipline module, now 5.5, and the console/approvals module, 5.4). Modules still to expand from stub: Phases 3-6 plus 5.4 and 5.5 (2.1 and 2.2 are built).`

### COURSE-DESIGN-PRINCIPLES.md
E7 — two references in the token/context paragraph (Section 1). In the line that begins
"**Responsible token/context discipline (taught AND practiced):**":
- FIND `This is a Phase 5 teaching topic (module 5.4), framed as JUDGMENT not pricing`
  REPLACE `This is a Phase 5 teaching topic (module 5.5), framed as JUDGMENT not pricing`
- FIND `are practitioner war-story material for 5.4, reconstructed as fictional mocks.`
  REPLACE `are practitioner war-story material for 5.5, reconstructed as fictional mocks.`

E8 (recommended) — bank the console-screenshot honesty rule into Section 10. Append this bullet
to the end of the Section 10 list:
`- This applies to console/UI screenshots as well (approval prompts, tool-call displays): captured, date-stamped, shown as dated specimens, never as the current or evergreen interface. The lesson is the judgment, not the version's layout or keybindings. (Used by module 5.4, Reading the Console.)`

### Verification grep (run before declaring the doc bank done)
`grep -nE "5\.4|5\.5|18 modules|20 modules|eighteen|four modules|4 modules" COURSE-LEARNING-ARC-OUTLINE.md COURSE-DESIGN-PRINCIPLES.md`
Confirm no remaining reference calls token/context "5.4", and no count still says 18/20 or
"(4 modules)" for Phase 5. Do NOT edit engineer.html (its 5.4 and its "18 modules" are a
different course).
