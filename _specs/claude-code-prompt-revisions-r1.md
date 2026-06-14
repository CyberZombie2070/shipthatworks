# Claude Code Prompt — Module 1.1 Revisions, Quiz Hardening, and UI Fixes

Save this file as `_specs/module-1.1-revisions-r1.md` in the repo, then paste everything below the line into Claude Code.

---

Read foundations.html fully before changing anything. Project conventions in CLAUDE.md apply throughout (vanilla JS, REM units, no alert/confirm, &#39; escaping, commit format, push after commit).

## STEP 0 — Phase audit (do this first, report before proceeding)

Run `git log --oneline -15`. The master build plan (`_specs/claude-code-master-prompt.md`) defined four phase commits. Report which of these exist:
1. `fix: single source of truth for module completion state`
2. `feat: expanded module 1.1 content with 12-question bank`
3. `feat: interactive baseline assessment with persistence and export`
4. `feat: sandboxed in-page code runner for floor tests`

User-confirmed evidence says Phases 3 and 4 did NOT land (static assessment tables, no response textareas, JSFiddle instructions still present). Confirm and state the actual status. Then execute in this order: STEP 1 and STEP 2 below (content revisions), then Phase 3 from the master prompt, then Phase 4 from the master prompt. When executing Phase 4, preserve the floor test copy changes made in STEP 1 below; the runner replaces only the JSFiddle mechanics, not the prompt block, fallback reveal, or spoiler collapsible.

## STEP 1 — Content revisions to Module 1.1

Apply these as exact text replacements in the p1m1 content. Maintain the no-em-dash rule in all new copy.

### 1A. Replace the Lead's persona framing

Replace the paragraphs from "Two very different people open this module." through "You are now accountable for code you cannot yet fully read." with:

---
People arrive at this module from very different directions.

Maybe you're here by choice. You've been building things with Claude Code for weeks, maybe a year. You've shipped real features. Some of them impressed people. And somewhere along the way you noticed a gap between what you can *produce* and what you can *explain*, and it's started to bother you.

Maybe you're here with a plan. You're aiming at a role that barely existed a few years ago: AI engineer, AI-assisted developer, whatever the posting calls it this month. You can already make Claude Code produce things that look like a portfolio. What you can't yet do is survive the interviewer who slides a laptop across the table and says "walk me through what this does," or the first week on the job, when the output stops being a demo and starts being your name on a commit.

Maybe you're here because someone sent you. Your company is using Claude Code to accelerate a major engineering effort: a refactor, a migration, a backlog burn-down. You've been assigned to it even though "developer" was never your job title. You may not have chosen this. You may be somewhere between excited and quietly terrified. Your manager expects output, the tool produces output, and the question gnawing at you is whether you're allowed to trust it.

Or maybe none of these is quite your story. It doesn't matter. Every path into this course converges on the same trait, and it's the one this entire course is built around:

**You are, or are about to be, accountable for code you cannot yet fully read.**
---

Also update the module's subtitle/excerpt field (the summary string shown under the H1 and anywhere the module is previewed) to:

"However you arrived here, you share the one trait that defines this course: you are, or soon will be, accountable for code you cannot yet fully read."

And in the "If You Were Assigned This Course" section, change the opening line "A direct word to the second reader from the lead: the one who's here because a CTO or engineering lead decided to put many hands on Claude Code at once." to "A direct word to the reader who's here because a CTO or engineering lead decided to put many hands on Claude Code at once." Search the full module for any other "first reader" / "second reader" / "third reader" phrasing and make it persona-neutral the same way.

### 1B. Define PR at first use

In the paragraph ending "...the senior developer reading your PR, the customer-facing bug that Claude can't fix...", replace "the senior developer reading your PR" with:

"the senior developer reading your pull request (a PR: the bundle of changes a developer submits for team review before it joins the shared codebase)"

All later uses of "PR" stay as-is.

### 1C. Terminology: "silent wrongness" becomes "silent failure"

Replace every instance of "silent wrongness" with "silent failure" throughout the module body, floor test, and quiz content. At its first bolded use (the line "**silent wrongness**" in the greet section), the replacement reads: "**silent failure**, the industry's name for exactly this: a program that keeps running and reports success while producing wrong results."

### 1D. Reword the assessment intro

Replace "Talk is cheap and self-perception is broken. We just spent a whole section on why. So here is a concrete instrument." with:

"Feelings are not measurements, and the previous section explained why your sense of your own skill can't be trusted right now. So instead of asking how confident you feel, here is a concrete instrument: twenty specific skills, scored one at a time."

### 1E. Add the job-seeker paragraph

In the "If You Were Assigned This Course" section, immediately before the team-lead sidebar, add:

"And a word for the reader chasing the role rather than assigned to it: everything in this section is your interview preparation. The "walk me through what this does" moment filters every AI-era engineering interview, and it is a direct test of the three skills. Candidates who can read, explain, and debug walk out with offers. Candidates who can only prompt do not get to use Claude Code in the interview room."

### 1F. Rewrite Floor Test Part 1 (access fallback + copyable prompt)

Replace the current Part 1 steps with:

---
1. You'll run code using the editor below (or JSFiddle, linked in Further Reading, if you prefer an external tool). *(Until the in-page runner ships in Phase 4, keep the current JSFiddle link sentence here instead, and add: "JSFiddle prints console.log output to its Console drawer; click the **Console** tab at the bottom right of the result area to see your output.")*
2. Ask Claude for exactly the prompt below. Claude Code works; so does Claude in the browser, free, at claude.ai. Use the copy button and paste it in.

[Render as a code-style block with the existing copy button, labeled PROMPT:]
Write a JavaScript function called greet that takes a name and returns the string Hello, [name]! Then add a line that calls it with a sample name and logs the result.

3. Paste what Claude gives you into the editor and run it. Confirm you see the greeting.

[Render as a collapsible/details element, collapsed by default, summary text: "No AI access right now? Click to reveal the code and keep going."]
No account, blocked network, no problem. Here is the code Claude would have produced. You'll skip the prompting practice this once, but the reading practice below is the part that matters.
```javascript
function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("Maria"));
```
[End collapsible]
---

### 1G. Spoiler protection in Floor Test Part 2

The line beginning "If you saw `Hello, undefined!` and didn't predict it..." must move inside a collapsible/details element, collapsed by default, summary text: "Ran it? Click to compare notes." Nothing visible above the fold may reveal the undefined output before the learner predicts.

Build the collapsible as a reusable styled pattern (panel background, border, pointer cursor on summary, smooth open) since 1F and 1G both use it and future modules will too. Native details/summary elements styled to the design system are acceptable and preferred over custom JS.

## STEP 2 — Replace the entire p1m1 quiz bank

Replace all 12 questions with the versions below. Distractor design rules now in effect (also add these to CLAUDE.md under a "Quiz bank standards" heading): all options within roughly 25% of each other's length; distractors are plausible misconceptions or true-sounding statements that miss the lesson, never absurd throwaways; the correct answer must not be reliably the longest or most qualified option.

**Q1.** The lead sketches several ways people arrive at this course: building by choice, chasing a new role, or being assigned by an employer. What single trait does the module say every path converges on?
A) All have already shipped production features with Claude Code
B) All are, or soon will be, accountable for code they cannot yet fully read ✓
C) All were directed by an employer to adopt AI-assisted development
D) All have professional software experience from before AI tools
*Explanation: The paths into this course differ in motivation, employment status, and stakes, and the lead is explicit that no list of them is complete. What every path shares is the accountability gap: responsibility, now or imminently, for code a tool produced and the person cannot yet independently evaluate. Closing that gap is the course.*

**Q2.** The module describes two reasons something can "work." Which one represents genuine understanding?
A) The result matched what you predicted before you ran it ✓
B) The code ran cleanly with no errors or warnings
C) Working code emerged after several rounds of adjustment
D) The output looked correct every time you tested it
*Explanation: The test of understanding is prediction. Clean runs, repeated correct-looking output, and eventual success can all come from trial and error. Only a prediction made before running, and confirmed, demonstrates knowledge.*

**Q3.** Why does the module say the natural "ceiling" on trial-and-error development disappears with Claude Code?
A) The tool's output quality makes learning fundamentals unnecessary
B) The wall of confusion that forces learning never arrives, because the tool keeps producing plausible output ✓
C) Modern tooling catches most mistakes before they reach production
D) AI assistance lets beginners skip directly to advanced concepts
*Explanation: Traditionally, confusion eventually halts progress and forces understanding. Claude Code removes that forcing function by generating plausible output indefinitely, so trial-and-error mode can continue for months without the feedback loop that would have taught you ever firing.*

**Q4.** The `greet()` function returned `"Hello, undefined!"` when called with no name. Why does the module treat this as more dangerous than a crash?
A) Undefined values spread and corrupt data elsewhere in a program
B) It ran "successfully," so nothing visible flags that the output is wrong ✓
C) Failures without error text cannot be captured by logging tools
D) It signals the function was generated incorrectly and needs a rewrite
*Explanation: Crashes are loud; even a beginner notices them. A silent failure produces every visible signal of success while delivering wrong results, and only a reader who probes behavior beyond the demonstrated case will catch it. AI-assisted development multiplies exactly this category.*

**Q5.** How does the module say AI tools "supercharge" the Dunning-Kruger effect?
A) They hand beginners techniques that once required years of experience
B) They produce the signals of competence without the understanding that normally creates them ✓
C) They accelerate output faster than anyone's skills can keep pace
D) They respond agreeably and positively regardless of code quality
*Explanation: Your brain calibrates self-assessment from signals (clean code, working features, fast progress) that historically required understanding to produce. When the tool produces those signals on your behalf, you receive every indicator of competence while the competence belongs to the tool, and the natural self-correction never triggers.*

**Q6.** What are the three skills this course identifies as the ones Claude Code cannot perform on your behalf?
A) Prompt engineering, context management, and output verification
B) Reading code, explaining your decisions, and debugging independently ✓
C) JavaScript fluency, system design, and automated testing
D) Writing, reviewing, and deploying code without any assistance
*Explanation: Option A describes operating the tool well, which matters but is not the gap. The three skills are your accountability at the moments the tool is not in the loop: the review question, the standup follow-up, the production incident.*

**Q7.** A reviewer asks why you structured a change a particular way. Why does the module call "Claude suggested it" an inadequate answer?
A) Most teams expect official documentation to be cited in reviews
B) It names where the code came from, not why it is right for this situation ✓
C) Disclosing AI involvement reduces a reviewer's trust in the change
D) AI suggestions have not been validated against the team's codebase
*Explanation: It's an attribution, not a reason. A real answer is grounded in tradeoffs: readability, failure handling, security, consistency with the codebase. The person who can only attribute is a clipboard between the tool and the repo, and still owns the blame when the merged code fails.*

**Q8.** What is the module's distinction between using Claude as a debugging partner versus being dependent on it?
A) Partners always attempt their own fix before consulting the tool
B) A partner brings hypotheses and evidence by choice; a dependent has no move except re-prompting and hoping ✓
C) Partners verify each suggested fix while dependents apply them as-is
D) Dependence means using chat interfaces instead of the command line
*Explanation: The distinction is capability, not etiquette. Feeding Claude your hypothesis, the exact error, and the relevant code is leverage. Having no other option is dependence, and dependence fails precisely when stakes are highest and someone needs answers from you immediately.*

**Q9.** What single day-one team standard does the module recommend to a lead deploying this course?
A) Every AI-assisted change is labeled as such in its commit message
B) No one merges code they cannot explain in two sentences ✓
C) A senior developer reviews all AI-generated output before merge
D) Each team member completes the baseline assessment in week one
*Explanation: All four are real practices a team might adopt, but the module names one as the converter: the two-sentence rule. It enforces ownership of every merged line without banning the tool or adding heavyweight process, and it turns the course's skills into daily requirements.*

**Q10.** A learner scores high in Category C (Working with Claude Code) and near zero in Categories A and B (Reading Code, Understanding the System). What does the module say this profile indicates?
A) Readiness to skip Foundations and start the Engineer course
B) A skilled tool operator who cannot yet evaluate what the tool produces ✓
C) Dishonest self-scoring in the first two categories
D) A learner better served by traditional programming instruction
*Explanation: This is the signature profile of the course's core audience: real fluency with the tool sitting on top of a literacy gap in load-bearing places. It is a diagnosis, not a failure state, and Phases 2 through 4 target columns A and B directly.*

**Q11.** In the floor test, `applyDiscount(50, 150)` returns `-25` without any error. What lesson is this designed to teach?
A) Percentage math in JavaScript requires explicit bounds checking
B) Code can run flawlessly and still produce real-world nonsense that only a probing reader will question ✓
C) Functions should validate every input before calculating anything
D) Enough trial-and-error testing eventually surfaces edge cases like this
*Explanation: Options A and C describe real fixes, but the module hasn't taught fixes yet and that isn't the point of the exercise. The lesson is the reader's habit: a negative price triggers no error, executes flawlessly, and is caught only by a human who probes beyond the demonstrated happy case.*

**Q12.** What is the only way to fail Floor Test 1.1?
A) Answering fewer than three of the four reading questions correctly
B) Running the code without writing your predictions down first ✓
C) Using the click-to-reveal code instead of prompting Claude yourself
D) Taking longer than the suggested twenty minutes to finish
*Explanation: Wrong predictions are the point; they map exactly what the next modules must teach you. The reveal fallback and the time estimate are conveniences, not requirements. The test measures honesty of process, and skipping the prediction step is the trial-and-error habit this course exists to replace.*

## STEP 3 — UI fixes

**3A. In-content link legibility.** Anchors inside module content currently render too dark to read before clicking. Style all in-content links: color var(--accent-blue), underlined, hover state brightens (filter or a lighter literal is fine), visited stays accent-blue. Verify contrast against --bg and --surface is clearly legible at body size. Apply in both course files.

**3B. Quiz "Next Question" pushed offscreen.** Reproduction: on at least one question per draw (likely the one with the longest explanation text), answering reveals the explanation but the Next Question button lands below the viewport with no obvious scroll. Diagnose and fix:
- Inspect the quiz card for any fixed height, max-height, or overflow rule clipping or displacing the footer when a tall explanation renders.
- The post-answer auto-scroll currently targets the explanation; change it to ensure BOTH the explanation and the Next/Results button are in view: scroll the button into view with block "nearest" after the explanation renders, or scroll the quiz container so its bottom edge is visible.
- Test every one of the 12 questions at a 768px-tall viewport and at a typical laptop height. The button must be reachable on all of them without manual hunting.

## STEP 4 — Resume the master build

Execute Phase 3 (assessment widget) and then Phase 4 (code runner) from `_specs/claude-code-master-prompt.md`, including their full verification checklists. Phase 4 note repeated for emphasis: the runner replaces the JSFiddle mechanics in the floor test, but the PROMPT copy block, the no-AI-access collapsible, the spoiler collapsible, and the Part 2/3 copy from STEP 1 are preserved.

## Verification for STEPS 1–3 (before resuming Phase 3)

1. Lead uses the "Maybe you're here..." framing with the "Or maybe none of these is quite your story" closer; no fixed count of reader types remains anywhere in the module (search for "three readers", "second reader", "two very different"); the bolded unifying line reads "are, or are about to be"; the module subtitle/excerpt matches the new copy.
2. Search the module for "silent wrongness": zero results. "silent failure" appears with the definition at first use.
3. Search for "PR": first occurrence carries the inline definition.
4. Both collapsibles render collapsed by default, open on click, and match the design system. The undefined output is not visible anywhere before opening the Part 2 collapsible.
5. The PROMPT block has a working copy button; pasted clipboard contents match exactly.
6. Quiz: take 5 attempts; confirm new questions and options appear, options are roughly length-balanced, explanations updated, pass threshold still 3 of 4, and the Next button is visible after answering every question.
7. Links in module content are clearly legible before click in both course files.
8. No em dashes in any new copy; no raw apostrophes in attribute strings.

Commits, in order, pushed after each:
- `content: generalized learner lead, silent failure terminology, access fallbacks [ai-assisted]`
- `feat: hardened 12-question quiz bank with distractor standards [ai-assisted]`
- `fix: link legibility and quiz next-button visibility [ai-assisted]`
Then the Phase 3 and Phase 4 commits per the master prompt.
