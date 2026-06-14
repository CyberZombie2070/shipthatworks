# MODULE 1.2
## How Claude Code Actually Works (No More Illusions)
**Phase 1 — The Honest Reckoning**
Estimated time: 35 minutes
Difficulty: Foundational
Prerequisites: Module 1.1

*(Wiring notes: em dashes only in the phase-label header. External links follow the new-tab convention. The floor test uses the in-page runner. Quiz bank follows the hardened distractor standards in CLAUDE.md.)*

---

## Lead

Module 1.1 measured the gap between what you ship and what you understand. This module closes the first piece of it, and it has nothing to do with JavaScript.

It's about the tool itself.

Most frustration with Claude Code, and most of the damage people do with it, traces back to a wrong mental model of what it actually is. People treat it like a search engine over their codebase, or a compiler that's also psychic, or a colleague who remembers last Tuesday. It is none of those things. And when your mental model is wrong, your prompts are wrong, your trust is calibrated wrong, and your surprises arrive at the worst possible time.

By the end of this module you'll know what Claude Code actually is, the four facts about it that explain almost every confusing thing it will ever do, and the loop it runs every time you give it a task. None of this requires a single line of code. All of it will change how you use the tool tomorrow.

---

## What Claude Code Actually Is

Strip the magic away and Claude Code is two components working together:

**A model that reasons.** A large language model, the same family of technology behind the Claude you can chat with in a browser. Its job is to read, understand, plan, and decide.

**Tools that act.** A set of capabilities the model can invoke: read a file, edit a file, search the project, run a command in your terminal, run your tests.

Claude Code itself is the harness around those two things. It runs in your terminal, feeds the model your instructions and the relevant parts of your project, lets the model call tools, and shows you the results. Anthropic's own documentation describes it exactly this way: models that reason, tools that act, and Claude Code as the agentic harness connecting them.

Why this matters to you: every strength and every failure of the tool comes from one of those two components or the handoff between them. When the output is wrong, it's almost never random. The model reasoned from missing or stale information, or a tool returned something the model misread, or the plan was fine and a single step went sideways. Once you know the parts, failures stop being mysterious and start being diagnosable. That's the difference, from Module 1.1, between debugging independently and re-prompting in the dark.

Equally important is what Claude Code is **not**:

- **Not a database of your code.** It doesn't permanently "know" your project. It looks at what it needs, when it needs it, within limits you'll learn below.
- **Not a search engine with opinions.** It doesn't look up verified answers. It generates them, which is a profoundly different thing.
- **Not a colleague with memory.** By default, each session starts fresh. It does not remember what you did together yesterday unless that knowledge was written down somewhere it reads. (Module 5 covers exactly where to write it down.)

---

## The Model, In Plain Words

You don't need the math, but you need one sentence of honesty about what a large language model is:

**It is a system trained on an enormous amount of text and code to predict what text should come next, and it has gotten so good at that prediction that the output is frequently indistinguishable from understanding.**

Frequently. Not always. Everything strange about AI-assisted development lives in the gap between those two words.

Because the model generates rather than retrieves, four facts follow. These four facts are the load-bearing mental models of this entire course. Every workflow rule you'll learn in later phases exists because of one of them.

### Fact 1: Its working memory is finite

Everything the model "knows" during a task lives in something called the **context window**: a fixed-size working memory measured in tokens (roughly, fragments of words). Your instructions, the files it has read, the output of commands it has run, its own previous responses in the session, all of it has to fit in that window.

The window is large, but your project is larger. A single substantial source file can run thousands of tokens. A real codebase runs millions. So the model never holds your whole project in mind. It holds a curated slice, and the harness plus the model decide what's in the slice.

What this explains:

- Why the tool sometimes "forgets" something from earlier in a long session. The window filled, and older content got compressed or dropped.
- Why it can confidently change a function while missing the second place that function is called. The second place wasn't in the slice.
- Why long, sprawling sessions degrade. The further the session runs, the more the window fills with the model's own earlier output, and the model starts weighting its own recent statements over your original facts. Drift compounds quietly.

What you do about it, starting now: keep sessions scoped to one task (this was item 15 on your baseline assessment), and when you notice the model contradicting something established earlier, re-anchor it explicitly: state the original fact again and say this is the truth to work from. You'll formalize both habits in Phase 5.

### Fact 2: It is non-deterministic

Run the same prompt twice and you can get different results. Different wording, different structure, sometimes different conclusions. This is not a malfunction. It is how the technology works.

The professional consequence is bigger than it sounds: **anything that must be reliable and repeatable needs a deterministic backstop.** A test that passes or fails. A validator that checks the number. A command whose output doesn't depend on mood. You never build a process on "the model will do the same thing it did last time," because it might not.

This single fact is why the entire discipline you'll learn in this course leans so heavily on tests, checklists, and verification steps. They aren't bureaucracy. They are the deterministic skeleton that makes a non-deterministic tool safe to build with.

### Fact 3: Its knowledge has a cutoff

The model learned about the world up to its training date. It does not automatically know what was released last month. Unless it is given current information, or uses a tool to go fetch it, it will write code against the version of a library it learned, with total confidence, even if that version is years stale.

The trap inside this fact: outdated output is often **syntactically valid and runs**. Nothing looks wrong. The pattern was correct once. You'll meet this again in the failure-modes module as one of the three ways AI output goes bad, and it's the sneakiest of the three precisely because no error fires.

What you do about it: when work involves a specific library or framework version, current documentation gets into the session, either by you providing it or by the tool fetching it. "The model probably knows this framework" is a guess, not a verification.

### Fact 4: Confidence is not correctness

Claude Code's output arrives polished. Clean headings, tidy code blocks, assured explanations. From a human colleague, that polish would be a signal: someone careful did this work.

From a model, it signals nothing. Formatting is the default presentation style. The model produces the same confident polish when it's right and when it's inventing a method that doesn't exist. Module 1.1 showed you how AI tools decouple the signals of competence from competence itself; this is the mechanism up close. The polish is part of the prediction.

The habit this builds: evaluate the substance and ignore the costume. A beautifully formatted answer gets exactly the same scrutiny as a messy one. The three skills from Module 1.1 (read it, explain it, debug it) are how you scrutinize; the polish is what tries to talk you out of bothering.

---

## The Loop: How a Task Actually Gets Done

When you give Claude Code a task, it doesn't generate one answer and stop. It works through a loop that Anthropic's documentation describes in three phases:

**Gather context.** It searches and reads the parts of your project relevant to the task: the files, the structure, sometimes the docs or the git history.

**Take action.** It makes changes: edits files, creates files, runs commands.

**Verify results.** It checks its own work where it can: runs the tests, runs the build, reads the output, and reacts to what it finds.

These phases blend and repeat. A simple question might only need context gathering. A bug fix can cycle through all three several times. A bigger task can chain dozens of actions, course-correcting along the way based on what each step revealed. This loop is why Claude Code feels less like autocomplete and more like a junior engineer who goes away and works: it runs your code and reads the output, then adjusts.

Two things about the loop matter enormously for you.

**First: you are part of it.** You can interrupt at any point, redirect, supply missing context, or stop an approach you don't like. The tool works autonomously but stays responsive. The people who get the best results treat the loop as supervised work, not as a vending machine. Watch what it's doing, especially in the gather-context phase, because that's where the slice of your project gets chosen, and a wrong slice poisons everything downstream.

**Second: every phase can fail, and each fails differently.** Bad context gathering produces confident changes built on a misreading of your project. Bad action produces the wrong edit. Bad verification produces the most dangerous outcome of all: the claim that work is done when it isn't. Hold onto that last one. "Done" coming out of the loop is a claim, not a fact, and a later module is devoted entirely to what you do about that.

### The permission prompts are your control point

While the loop runs, Claude Code asks permission before consequential actions: editing files, running commands. It is genuinely tempting to start approving these reflexively, because most of them are fine and the asking feels like friction.

Resist that, and here's the reframe that makes it stick: **those prompts are the moments the loop pauses and hands you the accountability you already own.** You learned in Module 1.1 that you own every line you merge. The permission prompt is the cheapest place in the entire workflow to exercise that ownership: a few seconds of "what is it about to do, and does that match what I asked?" Approving without reading is choosing to ship the gap between producing and understanding, one click at a time. A later module covers the safety side of this in depth; for now, the rule is simply that approvals are read, not rhythm.

---

## What Claude Code Cannot Do

The capabilities are real, so the limits deserve equal precision. Four things stay yours no matter how good the tool gets:

**It cannot know your intent.** It knows what you typed. The gap between what you typed and what you meant is filled by the model's assumptions, and left to guess, models tend toward the lower-effort interpretation. Stating constraints explicitly (item 13 on your baseline assessment) is how you close that gap. Phase 5 turns this into a craft.

**It cannot judge business correctness.** It can verify that code runs and tests pass. It cannot know that a 150% discount is nonsense for your store, that this customer field is regulated data, or that the deadline behavior you described contradicts what your team actually wants. Real-world sense lives with the human. You proved this yourself in Floor Test 1.1 with a negative price that executed flawlessly.

**It does not remember across sessions by default.** Each session starts fresh. Project knowledge persists only where it's written down in files the tool reads, which is exactly what the CLAUDE.md file is for, and Phase 5 teaches you to wield it. Until then, know that "we discussed this yesterday" means nothing to a new session unless yesterday got written down.

**It cannot accept accountability.** When the merged code fails, the post-mortem will not accept "the agent did it," and it shouldn't. This was the unifying trait from Module 1.1, and now you can see the mechanical reason behind it: a system that generates plausible output, within a finite window, non-deterministically, from possibly stale knowledge, is a powerful instrument. Instruments don't carry responsibility. Operators do.

---

## What This Changes About Tomorrow

You now hold the mental model that Phases 2 through 6 build on. Before the floor test makes it concrete, notice what each piece already implies about how you'll work:

Finite memory implies scoped sessions and written-down project knowledge. Non-determinism implies tests and validators instead of trust. The training cutoff implies current docs in the session for version-sensitive work. Confidence-as-costume implies substance-only evaluation. The loop implies supervision, especially of context gathering. And the permission prompt implies that the cheapest review you'll ever do is the one before the action happens.

Every one of those will become a drilled habit later. Today they just need to be true in your head.

---

## FLOOR TEST 1.2 — See the Four Facts With Your Own Eyes

**What you'll do:** Three short experiments, about 20 minutes total, requiring only a browser. You'll use Claude in the browser (free at claude.ai) and the code runner below. If you have Claude Code installed, you can use it instead for any step.

**Why this test exists:** Module 1.1's floor test taught you to predict before running. This one points that habit at the tool itself. You are about to observe non-determinism, test confidence against a deterministic check, and probe the knowledge cutoff, with predictions written down first.

### Part 1: Non-determinism, observed (7 minutes)

1. Open two separate new chats with Claude (two browser tabs work).
2. **Predict first:** will the two responses to an identical prompt be identical? Write your prediction down.
3. Paste exactly this prompt into both chats:

[PROMPT block with copy button:]
Write a JavaScript function that returns a motivational message for a developer, choosing from five messages you invent. Show the function and one example of its output.

4. Compare the two responses side by side. Look at the function names chosen, the five messages invented, the code structure, the explanation around it.

Identical prompts. Different output. Nothing malfunctioned. Now connect it: if the same prompt produces different code twice, what does that mean for any workflow where you need the same result every time? Write one sentence answering that. (You just derived Fact 2's professional consequence yourself.)

### Part 2: Confidence vs. a deterministic check (7 minutes)

1. In one of your chats, paste exactly this:

[PROMPT block with copy button:]
Without using any tools, code, or calculator, compute 847293 multiplied by 612847 in your head and give me the single number you arrive at. State it confidently as one line.

2. **Predict first:** will the answer be correct? Write your prediction down. Notice how the answer *looks*: stated cleanly, confidently, formatted well.
3. Now verify with a deterministic tool. In the runner below, press Run:

[Runner instance `ft2-multiply`, starter code:]
```javascript
// The deterministic backstop: arithmetic that comes out
// the same every single time.
console.log(847293 * 612847);
```

4. Compare. Two outcomes are possible, and **both teach the same lesson**. If the model was wrong: you just watched perfect confidence wrapped around a wrong answer, which is Fact 4 in the wild. If the model was right: notice that you did not know it was right until the deterministic check finished. Either way, your certainty came from the verifier, not from the model's tone. That is the entire point.

### Part 3: The knowledge cutoff, probed (6 minutes)

1. In a fresh chat, ask:

[PROMPT block with copy button:]
Without searching the web, answer from your own knowledge only: what is the current LTS version of Node.js, and when was it released?

2. **Predict first:** will this answer reflect today, or some point in the past? Write it down.
3. Check the real answer at <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer">nodejs.org ↗</a>.
4. Three outcomes are possible. The answer is stale: that's the cutoff, visible. The answer is current: the model's training is recent enough for this question today, and it won't stay that way. The model declines or offers to search: you just watched a tool compensating for its cutoff, which is exactly the compensation you'll demand in version-sensitive work.

### Pass criteria

Every prediction was written before its check, and you wrote the one-sentence consequence in Part 1. As before, wrong predictions aren't failure; they're calibration. The only way to fail is to run the checks without predicting.

---

## QUIZ QUESTIONS — Module 1.2

**Question bank: 12 questions, 4 drawn randomly per attempt. Pass: 3 of 4.**

---

**Q1**
The module describes Claude Code as two components plus a harness. What are the two components?

A) A code database and a search engine over your project
B) A model that reasons and tools that act ✓
C) A terminal interface and a cloud-hosted compiler
D) A planning engine and a permanent project memory

*Explanation: The model reads, understands, plans, and decides; the tools read files, edit files, run commands. Claude Code is the harness that connects them, feeding the model context and letting it invoke tools. Every strength and failure of the tool traces to one of those parts or the handoff between them, which is what makes failures diagnosable instead of mysterious.*

---

**Q2**
Why does the module insist Claude Code is not "a search engine with opinions"?

A) It cannot access the internet from the terminal
B) It generates answers rather than retrieving verified ones ✓
C) Its search across project files is slower than a real index
D) It only consults documentation when explicitly instructed to

*Explanation: A search engine retrieves things that exist. A language model predicts what text should come next, producing output that is frequently, but not always, indistinguishable from verified knowledge. The entire discipline of this course lives in the gap between "frequently" and "always."*

---

**Q3**
A long session starts contradicting facts you established near the beginning. Based on Fact 1, what most likely happened?

A) The model's training data conflicts with your project's conventions
B) The context window filled, older content was compressed or dropped, and the model is weighting its own recent output ✓
C) The non-deterministic sampling produced an unlucky response
D) A tool returned an error that silently ended the session's memory

*Explanation: Everything the model knows during a task must fit in a finite working memory. As a session grows, earlier content gets compressed or dropped and the model increasingly trusts its own recent statements over the original facts. The remedies are scoped sessions and explicit re-anchoring of the source of truth.*

---

**Q4**
What is the professional consequence the module draws from non-determinism (Fact 2)?

A) Important prompts should be run twice and the outputs compared
B) Anything that must be reliable needs a deterministic backstop such as a test or validator ✓
C) Model settings should be tuned until outputs become repeatable
D) Identical results require keeping every task inside one session

*Explanation: Running a prompt twice and comparing helps you observe the property, but it is not a reliability strategy: the third run can differ again. The professional move is structural: build processes on deterministic checks (tests, validators, commands) rather than on the expectation that the model will repeat itself.*

---

**Q5**
Why does the module call outdated patterns (from Fact 3, the training cutoff) especially sneaky?

A) They only appear in older programming languages
B) The code is often valid and runs, so nothing visibly signals that the approach is stale ✓
C) They cause crashes that are difficult to reproduce locally
D) Documentation sites rarely mark which patterns are deprecated

*Explanation: A model writes the version of a library it learned, with full confidence. The output frequently compiles and executes, because the pattern was correct once. No error fires, which connects this directly to the silent-failure category from Module 1.1: wrongness that produces every signal of success.*

---

**Q6**
According to Fact 4, what does the polish of Claude Code's output (clean formatting, assured tone) actually indicate?

A) The model verified its work before presenting it
B) Nothing about correctness; it is the default presentation style either way ✓
C) The task fit comfortably inside the context window
D) The response drew on documentation rather than training alone

*Explanation: From a human, polish signals care. From a model, the same polish wraps correct answers and invented ones identically, because formatting is part of the prediction. The habit this fact builds: evaluate substance and ignore the costume, applying the same scrutiny to beautiful output as to messy output.*

---

**Q7**
What are the three phases of the loop Claude Code works through on a task?

A) Plan, generate, format
B) Gather context, take action, verify results ✓
C) Read instructions, ask permission, commit changes
D) Search, summarize, suggest

*Explanation: The phases blend and repeat: a question might need only context gathering, while a bug fix cycles through all three multiple times, chaining actions and course-correcting. Knowing the phases matters because each fails differently, and diagnosing which phase failed is the start of debugging the tool's work instead of just re-prompting.*

---

**Q8**
The module says the gather-context phase deserves your closest supervision. Why?

A) It is the slowest phase and benefits most from human shortcuts
B) The slice of your project chosen there shapes everything downstream; a wrong slice poisons later phases ✓
C) Permission prompts only appear during context gathering
D) It is the only phase where the model can read files you didn't mention

*Explanation: The model acts on the project slice it gathered. If that slice misreads your codebase or misses the second place a function is called, the subsequent actions are built on a false picture, executed confidently. Watching what the tool chooses to read is the cheapest early check on the whole task.*

---

**Q9**
How does the module reframe Claude Code's permission prompts?

A) As a safety feature designed mainly to prevent destructive commands
B) As the moments the loop pauses and hands you the accountability you already own ✓
C) As friction worth disabling once a project's conventions are stable
D) As the tool's request for additional context before proceeding

*Explanation: Most prompts are fine, which is exactly what makes reflexive approval tempting. But you own every line you merge, and the permission prompt is the cheapest place in the workflow to exercise that ownership: a few seconds of "does this match what I asked?" before the action happens rather than after.*

---

**Q10**
Which of the following does the module list as something Claude Code CANNOT do?

A) Run your test suite and react to failures it finds
B) Judge whether code is correct for your real-world business rules ✓
C) Chain dozens of actions on a single task without stopping
D) Edit several files in the same task

*Explanation: The tool verifies that code runs and tests pass; it cannot know that a negative price is nonsense for your store or that a field is regulated data. Real-world sense stays with the human, which is exactly what Floor Test 1.1's discount function demonstrated.*

---

**Q11**
A teammate says "Claude Code knows our project; we built half of it together last month." What does the module say is wrong with that statement?

A) Models cannot retain code patterns, only natural language
B) Sessions start fresh by default; project knowledge persists only where it is written into files the tool reads ✓
C) Last month's knowledge predates the model's training cutoff
D) Knowledge from prior sessions is kept but becomes unreliable over time

*Explanation: There is no default memory across sessions. What feels like the tool "knowing" a project is either the current session's context or knowledge captured in files like CLAUDE.md that get read each time. Phase 5 teaches you to write that file deliberately; until then, yesterday means nothing to a new session unless yesterday got written down.*

---

**Q12**
In Floor Test 1.2 Part 2, the model's arithmetic might come back correct. Why does the module say the lesson holds either way?

A) Correct arithmetic proves the model used a hidden calculation tool
B) Your certainty came from the deterministic check, not from the model's confident tone ✓
C) The multiplication is designed so that models always get it wrong
D) A correct answer on one run guarantees correct answers on future runs

*Explanation: If the answer was wrong, you watched confidence wrap a wrong answer. If it was right, you still did not know that until the verifier finished. Either way the certainty was produced by the deterministic backstop, which is the working relationship this course builds: the model proposes, something deterministic confirms.*

---

## Further Reading

- **How Claude Code Works (Anthropic)** — https://code.claude.com/docs/en/how-claude-code-works — the official description of the agentic loop, the built-in tools, and the harness; this module's loop section is grounded in it
- **Claude Code Documentation (Anthropic)** — https://docs.claude.com/en/docs/claude-code/overview — the broader official docs, including configuration topics this course reaches in Phase 5
- **Anthropic: Context Windows** — https://docs.claude.com/en/docs/build-with-claude/context-windows — the official explanation of the finite working memory behind Fact 1
- **MDN Web Docs: JavaScript First Steps** — https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps — continuing reference as Phase 2 approaches
