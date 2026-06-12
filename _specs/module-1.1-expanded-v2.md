# MODULE 1.1
## What You Actually Know (And What You Don't)
**Phase 1 — The Honest Reckoning**
Estimated time: 35 minutes
Difficulty: Foundational
Prerequisites: None

*(Note for wiring: the phase name above is the only intentional em dash in this document, since it matches the existing platform label format. Body content is em-dash free.)*

---

## Lead

Two very different people open this module.

The first is here by choice. You've been building things with Claude Code for weeks, maybe a year. You've shipped real features. Some of them impressed people. You picked up this course because somewhere along the way you noticed a gap between what you can *produce* and what you can *explain*, and it's started to bother you.

The second is here because someone sent you. Your company is using Claude Code to accelerate a major engineering effort: a refactor, a migration, a backlog burn-down. You've been assigned to it even though "developer" was never your job title. You may not have chosen this. You may be somewhere between excited and quietly terrified. Your manager expects output, the tool produces output, and the question gnawing at you is whether you're allowed to trust it.

These two people look nothing alike on paper. But they share the one trait that defines this entire course:

**You are now accountable for code you cannot yet fully read.**

That sentence is the problem this course solves. Not "learn JavaScript." Not "get better at prompting." Those are means. The end is closing the gap between what you ship and what you understand, because in every context that matters, from a side project with real users to a production refactor with a deadline, that gap is where failures live.

This module is the honest measurement of how wide that gap currently is for you. Not to discourage you. You can't navigate without knowing where you're standing.

---

## The Two Kinds of "It Works"

There's a moment every person who has ever made a computer do something knows. You run the thing, and it works. The feeling is genuinely great. Don't let anyone take that from you.

But there are two completely different reasons something can work, and the difference between them is the difference between a developer and a passenger:

**Reason 1: You understood the problem, made deliberate decisions, and the result behaved the way you predicted.** You could have told someone *before* running it what would happen. When it worked, it confirmed something you already knew.

**Reason 2: You tried things until something stopped breaking.** You're not entirely sure why this version works when the last four didn't. When it worked, you felt relief, not confirmation, because you couldn't have predicted it.

Both produce working software. Both feel like progress. Only one of them is *knowledge*.

Here's the part that matters for you specifically: with traditional hand-written coding, Reason 2 has a natural ceiling. You eventually hit a wall. A bug you can't trial-and-error your way past, a concept you can't fake. The wall forces you to learn. The confusion is the curriculum. Generations of developers learned this way, painfully but reliably.

**With Claude Code, that ceiling disappears.** The tool will keep generating plausible, professional-looking, frequently *working* output indefinitely. The wall never arrives. You can operate in Reason 2 mode for months, shipping real things the entire time, and the feedback loop that would have forced understanding simply never fires.

This is not a criticism of Claude Code. It's a description of a trap that the tool creates *specifically for motivated, productive people*, the kind of person who measures themselves by output. The more you ship, the more confident you feel, and the wider the invisible gap grows underneath you.

The gap doesn't announce itself. It waits. It waits for the production incident, the security review, the senior developer reading your PR, the customer-facing bug that Claude can't fix because *you* can't describe what's actually wrong. Then it presents the bill all at once.

---

## Why the Most Dangerous Failures Don't Throw Errors

Let's make this concrete immediately, with code simple enough that no prior experience is needed.

Here is a function, a small named piece of code that takes something in and gives something back. This one takes a name and produces a greeting:

```javascript
function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("Maria"));
```

Run it, and you get:

```
Hello, Maria!
```

It works. A new builder pastes this into their app, sees the output, moves on. Reason 2 in action, and so far, no harm done.

Now watch what happens when the function gets called *without* a name. Maybe a form field was left blank. Maybe another part of the program passed nothing by mistake:

```javascript
console.log(greet());
```

Output:

```
Hello, undefined!
```

Read that carefully, because it's one of the most important lessons in this entire course:

**No error. No crash. No red text. The program ran "successfully" and produced something wrong.**

If this function fed a welcome email system, real customers would receive "Hello, undefined!" in their inbox. Nothing in any log would flag it. The code "works" by every signal a non-reader can see, and fails by the only standard that matters.

This is the category of failure that AI-assisted development multiplies: **silent wrongness**. Crashes are loud. Even a beginner notices a crash. Silent wrongness is only visible to someone who can *read the code and predict its behavior under conditions nobody demonstrated.*

That skill, looking at five lines of code and asking "and what happens when the input is missing? empty? enormous? hostile?", is not advanced. It's foundational. It's also exactly the skill that shipping working demos never builds. You will start building it in this module's floor test, and you will drill it for the rest of this course.

---

## The Confidence Calibration Problem

There's a well-documented psychological pattern called the **Dunning-Kruger effect**: people with limited knowledge in a domain tend to overestimate their competence, while genuine experts tend to be more measured, because expertise includes an accurate map of everything you *don't* know.

In normal skill development, this self-corrects. Your early overconfidence collides with reality, reality wins, and your self-assessment recalibrates downward before climbing back up on real foundations.

AI-assisted development breaks the self-correction mechanism, and it's worth understanding exactly how.

Your brain estimates your own competence using *signals*: clean-looking code, features that work, tests that pass, fast progress, positive feedback. For all of human programming history, those signals were reliable proxies for understanding, because producing them *required* understanding.

Claude Code decouples the signals from the substance. It produces all of them (clean code, working features, passing tests, fast progress) on your behalf. Your brain receives every signal of competence while the underlying competence belongs to the tool. The result is calibration error at a scale the Dunning-Kruger researchers never had to model: people who feel like intermediate developers while possessing nearly zero independent capability.

Two things make this worse in the enterprise scenario:

**Output is being measured.** If your organization is tracking velocity (tickets closed, PRs merged), the incentive structure actively rewards Reason 2 behavior. Shipping without understanding is *faster* this sprint. The cost lands in a future sprint, on the person debugging the incident, who may also be you.

**Everyone around you is in the same trap.** When a whole team is newly AI-assisted, there's no calibrated person nearby to catch the drift. The team's collective confidence inflates together. Code review, the traditional correction mechanism, degrades into people who can't fully read code approving code written by a tool, requested by people who can't fully read code.

None of this means the situation is hopeless. It means the *first* skill, before any JavaScript, is accurate self-assessment. You cannot close a gap you've mismeasured. That's why this module exists, and why it comes before anything technical.

---

## The Three Skills That Actually Matter

Strip away every framework, language, and tool, and a senior developer evaluating whether you can be trusted with a codebase is checking exactly three things. Claude Code cannot perform any of them on your behalf. Not because the model isn't capable, but because they are *your* accountability, exercised at the moments the tool isn't in the loop.

### Skill 1: Reading code accurately

Can you look at a piece of code and say what it does? Not vaguely ("it handles the login stuff") but specifically. What does it return when the condition is false? What does it do with bad input? What happens if the network call inside it fails?

**What this looks like at novice level:** Given a short function, you can name its inputs, its output, and predict its behavior with at least one input the author didn't demo, like you just did with `greet()`.

**What this looks like on a team:** A code review comes back with "what happens here if `items` is empty?" and you answer from the code, in minutes, without re-prompting Claude and pasting whatever it says.

**The trap it prevents:** Approving, or merging, silent wrongness.

### Skill 2: Explaining your decisions

When someone asks "why is it structured this way?", can you answer? Not *"Claude suggested it."* That's not a reason, it's an attribution. A reason is grounded in tradeoffs: this is more readable, this handles the failure case, this avoids the security issue, this matches how the rest of the codebase does it.

**What this looks like at novice level:** For any change you ship, you can state in one or two plain sentences what it does and why this approach rather than an obvious alternative.

**What this looks like on a team:** Your PR description answers *what changed, why this way, how to verify it*, and survives a follow-up question in standup.

**The trap it prevents:** Becoming a human clipboard between Claude and the codebase. That's the role that gets automated away first, and the role that gets blamed when the code fails, because *you merged it*.

### Skill 3: Debugging independently

When something breaks, and on any real system it will, can you trace the failure? Can you read the error message, follow it to a file and line, form a hypothesis about the cause, and test that hypothesis? Or is your entire debugging process re-prompting Claude with "it's broken" and hoping the next generation works?

Re-prompting *is* sometimes the right move. But there's a hard difference between *choosing* to use Claude as a debugging partner (feeding it your hypothesis, the exact error, the relevant code) and being *unable to do anything else*. The first is leverage. The second is dependence, and dependence fails precisely when stakes are highest: production is down, the context is too large or too sensitive to paste, and someone is asking you what's happening *right now*.

**What this looks like at novice level:** You can read an error message without flinching, identify which file and line it points to, and reproduce the bug on purpose before attempting any fix.

**What this looks like on a team:** During an incident, you contribute observations and hypotheses, even if someone more senior lands the fix.

**The trap it prevents:** Being the person a team has to work *around* during an incident instead of *with*.

---

Everything else in this course (the JavaScript literacy, the Node patterns, the React concepts, the workflow discipline) exists in service of these three skills. They are the curriculum. The technologies are the terrain you practice on.

---

## If You Were Assigned This Course

A direct word to the second reader from the lead: the one who's here because a CTO or engineering lead decided to put many hands on Claude Code at once.

Here is the honest situation you're in, stated without spin:

Your organization is betting that AI assistance can let people without traditional development backgrounds do meaningful engineering work. That bet can pay off. There are real teams making it work. But understand what the *failure mode* of that bet looks like, because you are the person standing closest to it: people merging code they can't evaluate, at scale, into systems that matter. Every risk described in this module (silent wrongness, calibration error, the velocity incentive) applies to you with a deadline attached.

That sounds like bad news. It's actually your leverage, for three reasons:

**1. The accountability is real either way.** When code you merged breaks, "the AI wrote it" will not be an accepted answer. Not by your team lead, not in the post-mortem. You own every line you merge. That's not this course being dramatic; that's how engineering organizations work, and it's the professional standard this course trains you to meet rather than fear.

**2. The three skills are learnable faster than "learning to code."** You are not being asked to become someone who writes systems from scratch. You're being asked to become someone who can *read, explain, and debug*: a verifier, a responsible operator of a powerful tool. That's a genuinely smaller mountain, and it's climbable in weeks of deliberate practice, not years.

**3. Calibrated people become the trusted people.** In a team of newly AI-assisted developers, the ones who can say *"this change is safe, here's how I verified it"* and be right become the ones handed the important work. The skills in this course are precisely the differentiator, because the tool itself is identical for everyone.

So do the floor tests for real. Score the assessment below honestly. Nobody is grading your starting point. But everyone, eventually, grades your trajectory.

> **Sidebar: if you're the team lead deploying this course.** The baseline assessment below doubles as a placement and progress instrument. Have each person complete it privately in week one and again at the end of the course; the delta is your training signal. Scores of 23+ at intake suggest the Engineer course is the better starting point. And one standard worth setting on day one, because it makes everything else in this course land: **no one merges code they cannot explain in two sentences.** That single rule converts this course from optional enrichment into daily practice.

---

## The Baseline Assessment: 20 Skills, Scored Honestly

Talk is cheap and self-perception is broken. We just spent a whole section on why. So here is a concrete instrument.

Score yourself on each item below using the selector next to it. Your scores save automatically to this browser, your running total updates as you go, and you will retake this same assessment at the end of the course to measure the distance traveled.

- **0** means: I couldn't do this.
- **1** means: I could do this with help, lookup, or by asking Claude.
- **2** means: I could do this right now, alone, confidently.

Be brutal. A flattering score wastes exactly one person's time.

### Category A: Reading Code

| # | Skill |
|---|-------|
| 1 | Given a short function, I can state what it takes in and what it gives back |
| 2 | I can trace a short piece of code line by line and narrate what it does |
| 3 | I can predict what code does with unexpected input: missing, empty, or wrong type |
| 4 | I can read an error message and identify which file and line it points to |
| 5 | I can tell the difference between code that *defines* something and code that *runs* something |

### Category B: Understanding the System

| # | Skill |
|---|-------|
| 6 | I can describe, in plain words, what happens between typing a URL and seeing a page |
| 7 | I know the difference between frontend and backend code, and where each runs |
| 8 | I know what a package/dependency is, and what actually happens when one is installed |
| 9 | I know where my application's data lives, and what happens to users if it's wrong |
| 10 | I can explain what an API call is, and what the user experiences when one fails |

### Category C: Working with Claude Code

| # | Skill |
|---|-------|
| 11 | I read Claude's output before accepting it. Actually read it, not skim it |
| 12 | I can tell when a change Claude made touches more than what I asked for |
| 13 | My prompts state constraints and context, not just goals |
| 14 | I verify changes work beyond "the page loads." I check the edge case on purpose |
| 15 | I keep sessions scoped to one task instead of letting one session sprawl across many |

### Category D: Professional Practice

| # | Skill |
|---|-------|
| 16 | For any change I ship, I can explain *why* it was made, not just *what* changed |
| 17 | I can write a commit message that someone else would understand without asking me |
| 18 | I know what a pull request is and what review is actually for |
| 19 | I can reproduce a bug on purpose before attempting to fix it |
| 20 | I know the first thing I would do if production broke right now |

### Reading your score (out of 40)

- **0–10: You are exactly who Phase 1 and 2 were written for.** Nothing here is bad news; it's a clean starting line, and this course assumes nothing you don't have. Take every module in order.
- **11–22: Foundations is your course, with permission to move fast.** You have fragments, probably from osmosis through real Claude Code use. The fragments have gaps in load-bearing places. Take the modules in order, but let the quizzes tell you where you can accelerate.
- **23–32: You're near the boundary.** Finish Phase 1 here, then take the Engineer course's first quiz as a placement check. If you pass it comfortably, switch tracks; Foundations Phases 2–4 will still be useful as reference material.
- **33–40: The Engineer course is your starting point.** Foundations would be review. Go there now; it assumes the literacy you just demonstrated.

Notice what the assessment is also telling you structurally: **Category C can be high while A and B are near zero.** That's the signature profile of an experienced Claude Code user without coding background. Skilled at operating the tool, blind to what it produces. If that's your profile, it's the most common one in this course's audience, and Phases 2–4 are aimed directly at columns A and B.

---

## What This Course Assumes

Nothing technical. Genuinely.

This course does not assume you have written JavaScript before. It does not assume you know what a function is (you've now read one anyway), what a server does, or what React means. It does not assume you have a codebase, a development environment, or a computer science background.

Every floor test in this course is completable with **a browser and nothing else**, using free in-browser tools like JSFiddle. If you *do* have access to a real codebase, because you're on a team mid-refactor, most floor tests include an optional team extension that points the same exercise at real code. The extension is always optional. The core never requires it.

What the course *does* assume: you are motivated, and you are willing to be honest with yourself about the difference between what you can produce and what you understand. The assessment you just scored is the entry fee. Everything after this is construction.

---

## The Honest Self-Assessment (Narrative Edition)

The assessment measured skills. These four questions measure *habits*, and habits are what the workflow phases of this course will rebuild. Type your answers in the response boxes below each question; they save automatically alongside your assessment scores. Don't look anything up. There are no wrong answers. There are only honest ones and dishonest ones, and only one of those is useful to you.

1. When Claude Code produces code for you, how often do you actually read it before using it? And what does "read" honestly mean when you do?
2. Have you ever shipped or merged something you could not have explained if someone asked? What happened, or what were you afraid would happen?
3. If the thing you most recently built broke right now, what is the *first concrete action* you would take? Be specific. "Ask Claude" is an allowed answer, if it's the true one.
4. What is one thing in code you've shipped that you genuinely do not understand to this day?

These answers and your assessment scores form your baseline. At the end of the course you'll answer the same four questions again, and the distance between the two sets of answers is the most honest progress report you'll get.

---

## FLOOR TEST 1.1 — Your Honest Baseline

**What you'll do:** A guided exercise, roughly 20 minutes, requiring no prior coding experience, no installation, and no existing codebase.

**Why this test exists:** Every claim this module made about silent wrongness and code reading is about to become something you *experienced* rather than something you read. The point is to discover your actual starting point, not to perform.

### Part 1: Run something (5 minutes)

1. Open JSFiddle, a free tool that runs JavaScript in your browser: <a href="https://jsfiddle.net/" target="_blank" rel="noopener noreferrer">Open JSFiddle in a new tab ↗</a>. You'll see several panels; the one labeled **JavaScript** is the only one you need. Output appears in the **Console**.
2. Ask Claude (Claude Code, or Claude in a chat) for exactly this: *"Write a JavaScript function called greet that takes a name and returns the string Hello, [name]! Then add a line that calls it with a sample name and logs the result."*
3. Paste the result into the JavaScript panel and run it. Confirm you see the greeting.

You've now done the loop millions of people stop at: prompt, paste, run, it works. Everything after this line is what makes you different from them.

### Part 2: Read it (5 minutes)

Without asking Claude anything, answer these four questions by reading the code on your screen:

1. What is the name of the function?
2. What does the function take in?
3. What does the function give back?
4. **Predict before you run it:** what will happen if you call the function with *no* name at all? Write your prediction down. Then add the line `console.log(greet());` and run it. Was your prediction right?

If you saw `Hello, undefined!` and didn't predict it: congratulations, you just caught silent wrongness in the wild, on your first day. That's the experience this entire course is built around.

### Part 3: Find the flaw nobody demonstrated (10 minutes)

Paste this new function into JSFiddle. Read it before running anything:

```javascript
function applyDiscount(price, discountPercent) {
  const discount = price * (discountPercent / 100);
  return price - discount;
}

console.log(applyDiscount(50, 20));
```

Run it. You get `40`. A $50 item with a 20% discount costs $40. It works.

Now answer these by reading first, then verifying with the console:

1. What does `applyDiscount(100, 50)` return? Predict, then run.
2. What does `applyDiscount(50)` return, a price with the discount left out entirely? Predict, then run. *(Hint: you've seen this failure shape before in this module.)*
3. What does `applyDiscount(50, 150)` return? Predict, then run. Is that a price a real store should ever charge?
4. In one or two plain sentences: this function "works," so what is actually wrong with it?

There's no code to write and no fix required. Module 2 will give you the tools for that. The skill being built right now is the *question-asking*: looking at working code and probing what happens beyond the one happy case the demo showed.

### Optional team extension: if you have access to a real codebase

Ask a teammate (or Claude Code, pointed at your repo) to show you the **smallest, simplest function in the project**, five to ten lines. Apply the same four questions from Part 2 to it: name, inputs, output, behavior with missing input. Write your answers down, then verify them with a teammate or by testing. Do not pick something complex; the win condition is *fully* understanding something small, not partially understanding something big.

### Pass criteria

You attempted every prediction **before** running the code, and you wrote down which predictions were wrong. Wrong predictions are not failure. They are the most precise map you'll ever get of what Module 2 needs to teach you. The only way to fail this floor test is to skip the predicting and just run things.

---

## QUIZ QUESTIONS — Module 1.1

**Question bank: 12 questions, 4 drawn randomly per attempt. Pass: 3 of 4.**

---

**Q1**
According to this module, what single trait unifies the hobbyist builder and the enterprise employee assigned to an AI-assisted refactor?

A) Both chose to learn AI-assisted development
B) Both are accountable for code they cannot yet fully read ✓
C) Both have prior programming experience
D) Both are measured on the number of features they ship

*Explanation: The two readers differ in motivation, context, and stakes, but both have become responsible for code that a tool produced and they cannot yet independently evaluate. That shared accountability gap, not any particular technology, is what this course exists to close.*

---

**Q2**
The module describes two reasons something can "work." Which one represents genuine understanding?

A) You tried things until something stopped breaking
B) You understood the problem, made deliberate decisions, and could have predicted the result before running it ✓
C) Claude Code generated clean, professional-looking code
D) The output looked correct when you ran it once

*Explanation: The test of understanding is prediction. If you could have said what would happen before running the code, the success confirmed knowledge. If success came as relief rather than confirmation, it was trial and error, which produces working software but not knowledge.*

---

**Q3**
Why does the module say the natural "ceiling" on trial-and-error development disappears with Claude Code?

A) Claude Code explains every piece of code it generates
B) Claude Code never produces incorrect code
C) Claude Code keeps generating plausible, often working output indefinitely, so the wall of confusion that traditionally forced learning never arrives ✓
D) Modern programming languages are easier than older ones

*Explanation: In traditional coding, confusion eventually halts progress and forces understanding. The confusion is the curriculum. Claude Code removes that forcing function: you can keep shipping for months in trial-and-error mode, and the feedback loop that would have taught you never fires.*

---

**Q4**
The `greet()` function returned `"Hello, undefined!"` when called with no name. Why does the module treat this as more dangerous than a crash?

A) Because `undefined` is a security vulnerability
B) Because the program failed silently: it ran "successfully" and produced wrong output that no error or log would flag ✓
C) Because crashes are impossible to debug
D) Because it proves the AI wrote the function incorrectly

*Explanation: Crashes are loud; even a beginner notices them. Silent wrongness produces every visible signal of success while delivering wrong results, and it is only catchable by someone who can read code and predict its behavior under conditions nobody demonstrated. AI-assisted development multiplies exactly this category of failure.*

---

**Q5**
How does the module say AI tools "supercharge" the Dunning-Kruger effect?

A) They make experienced developers overconfident about AI capabilities
B) They produce the external signals of competence (clean code, working features, fast progress) without the underlying understanding that normally generates those signals ✓
C) They prevent developers from ever receiving feedback
D) They make code too complex for anyone to evaluate

*Explanation: Your brain calibrates self-assessment using signals that historically required understanding to produce. Claude Code produces those signals on your behalf, so you receive every indicator of competence while the competence belongs to the tool. That breaks the natural self-correction that normally fixes overconfidence.*

---

**Q6**
What are the three skills this course identifies as the ones Claude Code cannot perform on your behalf?

A) Typing speed, syntax memorization, and prompt engineering
B) Writing code from scratch, designing architecture, and deploying servers
C) Reading code accurately, explaining your decisions, and debugging independently ✓
D) Learning JavaScript, Node.js, and React

*Explanation: These three are your accountability, exercised at moments the tool isn't in the loop: the review question, the standup follow-up, the production incident. Every technology taught in this course exists in service of building these three capabilities.*

---

**Q7**
A reviewer asks why you structured a change a particular way. According to the module, why is "Claude suggested it" an inadequate answer?

A) Because mentioning AI tools is against most company policies
B) Because it's an attribution, not a reason. A real answer is grounded in tradeoffs like readability, failure handling, or consistency with the codebase ✓
C) Because Claude's suggestions are usually wrong
D) Because reviewers only accept answers backed by documentation links

*Explanation: Explaining decisions means owning them. "Claude suggested it" describes where the code came from, not why it's right for this situation. The person who can only attribute becomes a clipboard between the tool and the codebase, and still carries the blame when the code fails, because they merged it.*

---

**Q8**
What does the module identify as the difference between using Claude as a debugging *partner* versus being *dependent* on it?

A) Partners use Claude Code; dependents use the chat interface
B) A partner feeds Claude hypotheses, exact errors, and relevant code by choice; a dependent is unable to do anything except re-prompt and hope ✓
C) Partners never ask Claude about bugs
D) There is no meaningful difference

*Explanation: Re-prompting is sometimes the right move. The distinction is capability: choosing to use Claude with your own hypothesis and evidence is leverage; having no other option is dependence, and dependence fails exactly when stakes are highest and someone needs answers from you right now.*

---

**Q9**
For the team lead deploying this course, what single team standard does the module recommend setting on day one?

A) All code must be written without AI assistance
B) Every developer must complete both courses before touching the codebase
C) No one merges code they cannot explain in two sentences ✓
D) All prompts must be reviewed by a senior developer

*Explanation: This one rule converts the course from optional enrichment into daily practice. It directly enforces the accountability principle (you own every line you merge) without banning the tool or adding heavyweight process.*

---

**Q10**
The assessment note says a high Category C score (Working with Claude Code) combined with near-zero Categories A and B (Reading Code, Understanding the System) is a recognizable profile. What does it indicate?

A) The person is ready for the Engineer course
B) The person is an experienced tool operator without coding literacy: skilled at directing Claude Code, but unable to evaluate what it produces ✓
C) The person scored the assessment dishonestly
D) The person should stop using Claude Code entirely

*Explanation: This is the signature profile of the course's core audience: real, hard-won fluency with the tool, sitting on top of a literacy gap in load-bearing places. It's not a failure state. It's a precise diagnosis, and Phases 2–4 are aimed directly at it.*

---

**Q11**
In the floor test's discount function, `applyDiscount(50, 150)` returns `-25`. What lesson is this designed to teach?

A) JavaScript cannot handle percentages correctly
B) The function is broken and the AI should rewrite it
C) Code can run without errors and still produce results that are wrong in the real world (a negative price), which only a human reading and probing the code will catch ✓
D) Discounts should always be calculated on the backend

*Explanation: Nothing about a 150% discount triggers an error. The math executes flawlessly and produces a price no real store should ever charge. Whether inputs make real-world sense is a judgment the code doesn't make on its own here; catching it requires a reader who probes beyond the demonstrated happy case.*

---

**Q12**
What is the only way to fail Floor Test 1.1?

A) Getting any prediction wrong
B) Needing to look up what a function is
C) Skipping the prediction step and just running the code ✓
D) Taking longer than 20 minutes

*Explanation: Wrong predictions are the entire point. They are the most precise map of what the next modules need to teach you. The test measures honesty of process, not prior knowledge. Running code without predicting first is the trial-and-error habit this course exists to replace.*

---

## Further Reading

- **Claude Code Documentation (Anthropic)** — https://docs.claude.com/en/docs/claude-code/overview — the official source for how the tool actually works; Module 1.2 draws on this directly
- **MDN Web Docs: JavaScript First Steps** — https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps — the most accurate beginner JavaScript reference available, maintained by Mozilla
- **Kruger & Dunning (1999), "Unskilled and Unaware of It"** — the original research on competence self-assessment; this module applies its core finding to AI-assisted development
- **JSFiddle** — https://jsfiddle.net — the browser-based tool used in the floor test; CodePen (https://codepen.io) is an equivalent alternative
