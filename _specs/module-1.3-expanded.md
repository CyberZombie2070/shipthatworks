# MODULE 1.3
## What "Working on a Team" Actually Requires
**Phase 1 — The Honest Reckoning**
Estimated time: 30 minutes
Difficulty: Foundational
Prerequisites: Modules 1.1 and 1.2

*(Wiring notes: em dashes only in the phase-label header. External links use the new-tab convention. Floor test uses prediction boxes where the learner is asked to write something down; no runner instance needed for this module. Quiz bank follows the hardened distractor standards in CLAUDE.md. navTitle suggestion: "Working on a Team".)*

---

## Lead

The title of this module is a small lie, and clearing it up is the whole point.

"Working on a team" sounds like it's about other people: standups, reviewers, the politics of a shared codebase. If you're learning alone in a side project, or you don't have a team yet, the honest temptation is to skip this one and get to the JavaScript.

Don't. Because the thing this module is actually about isn't teams. It's a single shift in standard, and it applies to you whether you have colleagues or not:

**The bar for your work is no longer "does it run." It's "can someone else pick this up, trust it, and build on it without you in the room."**

That someone else is sometimes a teammate. But it is just as often:

- **Your future self**, opening this code in three months with no memory of why you did any of it.
- **An interviewer**, sliding a laptop across the table and saying "walk me through this."
- **A hiring manager**, judging your public repository cold, before they've ever spoken to you.
- **Claude Code itself, in your next session**, which (you learned this in 1.2) remembers nothing and can only work from what you wrote down.

Every one of those is a handoff. A team just makes the handoff loud and immediate by putting a human reviewer in the path. The standard is identical with or without them. This module installs that standard, because Phase 2 is about to teach you to read and write code, and you need to know what you're aiming for before you start aiming.

This is the end of the Honest Reckoning. 1.1 measured the gap. 1.2 explained the tool. 1.3 names the target: work that survives handoff.

---

## Two Ways Code Can Be "Done"

You met a version of this in 1.1, with the two kinds of "it works." Here's its grown-up sibling, and it's the hinge of the whole module.

**Done-for-me:** the code produces the right result when I run it, right now, on my machine, with the inputs I happened to try. I understand it well enough to have gotten it working. If it breaks later, I'll figure it out then.

**Done-for-handoff:** someone with no access to my head can read this, understand what it does and why, trust that it handles more than the one case I tried, and change it safely. The reasoning is on the page, not in my memory.

Almost everyone learning with AI tools ships done-for-me and calls it done. It feels finished because *to you, at that moment,* it is. You have the context. You remember why the function is shaped that way, what you were worried about, which input you tested. All of that lives in your head, invisibly propping up code that looks complete.

The cruelty of done-for-me is that the propping is invisible *to you*. You can't see the context you're supplying, the same way you can't see your own blind spot. The code looks self-explanatory because you're explaining it to yourself without noticing. Then three months pass, or a reviewer arrives, or you paste it into a fresh Claude Code session, and the prop is gone, and what's left standing on its own is a lot less than you thought.

Handoff is simply the test that removes the prop. Everything else in this module is a technique for passing that test on purpose instead of discovering you fail it at the worst moment.

---

## The Future-Self Handoff (and Why the Teamless Learner Should Care Most)

If you have no team, you have the hardest handoff target of all, and you can't see it coming.

A teammate reviewing your code is a *fresh* mind. They have no illusions about understanding your intent, so they ask. Your future self is worse, because future-you arrives *believing* they'll remember, and they won't. The memory of why you chose this approach decays far faster than you expect. Code you wrote last month reads like a stranger's by next quarter, except you don't get the stranger's healthy skepticism. You get false familiarity, which is slower and more dangerous than honest confusion.

So the most selfish, individual, non-team reason to learn handoff discipline is this: **you are the teammate you hand off to most often, and you are the one least equipped to do it well**, because you'll trust a past self who left you nothing to work with.

And there's an immediate, mechanical payoff you can feel this week, straight out of 1.2: Claude Code starts every session with no memory. When you write code and comments and commit messages clearly enough that *a stranger* could pick them up, you are also writing them clearly enough that **your next Claude Code session** can pick them up. Handoff discipline isn't team etiquette you're adopting on faith for some future job. It's the thing that makes your collaboration with your own tool work across time. Every clear comment is a note to the next session. Every honest commit message is context that survives the context window emptying.

That's the reframe in full: handoff discipline pays the solo learner first, the team second.

---

## The Pull Request: Where Handoff Becomes Concrete

When code is handed off on a team, it usually travels in a **pull request** (a PR: the bundle of changes you propose, packaged for someone else to review before it joins the shared codebase; you met this term in 1.1). Even if you never work on a team, the PR is worth understanding, because it's the most refined handoff artifact the industry has produced, and its anatomy is a checklist for handing anything off well, including to your future self.

A PR is two things at once: a set of code changes, and **an argument that those changes are safe to accept.** New developers focus entirely on the first and ignore the second. The argument is where handoff lives.

A handoff-grade PR answers three questions without the author present:

**What changed?** Not a restatement of the diff (the reviewer can read the diff). A plain-language summary of the actual change in behavior. "Users can now reset their password by email" tells the reviewer what to verify. "Updated auth.js and added a route" tells them nothing they couldn't see.

**Why this way?** The decision and its tradeoff. "Chose email reset over security questions because we already have email infrastructure and security questions are a known weak point." This is the single most valuable sentence in any handoff, and it's exactly the sentence done-for-me code never contains, because the reasoning never left your head. It's also, not coincidentally, the answer to 1.1's "why did you structure it this way?" review question. A PR that states the why is a PR that already passed that test.

**How do I verify it?** What the reviewer (or future-you) should do to confirm it works. "Test by requesting a reset for a known account; check the email arrives and the link expires after one hour." This converts "trust me" into "check for yourself," which is the entire difference between done-for-me and done-for-handoff.

You can write all three for a solo project with no reviewer. When you do, you're not performing team theater. You're leaving your future self the argument that your past self actually thought this through.

---

## Smaller Is Not a Style Preference. It's How Handoff Stays Possible.

Here is one of the most consistent findings in all of software engineering, and it's the rare place where the research gives a real number.

Review quality collapses as a change gets bigger. Industry research, including a widely cited study by SmartBear at Cisco, found that defect detection is strongest when a single review covers roughly 200 to 400 lines of changed code, and drops off sharply beyond that. Google's internal guidance targets even smaller, around 200 lines. Past about 400 lines, reviewers stop genuinely reviewing and start skimming for style, and review time grows faster than the size does, not in step with it. Oversized changes routinely come back with zero substantive comments, not because they were perfect, but because no human could hold the whole thing in their head at once.

The takeaway is not a bureaucratic line count. It's a fact about handoff: **a change small enough to fully understand can be genuinely reviewed; a change too big to hold in your head gets rubber-stamped.** When you hand off something enormous, you don't get a real check. You get a tired approval, and the bugs ride along.

One honest caveat, because the course doesn't deal in dogma: line count is an imperfect proxy. Renaming one function across forty files might touch four hundred lines and review in two minutes, because it's mechanical and uniform. A subtle thirty-line change to payment logic might deserve an hour. The real target is *cognitive size*: how much a reviewer has to actually think about. Lines of code are a rough stand-in for that, useful precisely because they're easy to see when the real thing isn't. Aim small, and when something genuinely can't be small, make it mechanical and uniform so it's easy to think about even when it's long.

This connects forward: a huge fraction of AI-assisted work goes wrong precisely because the tool can generate an enormous change in seconds, far faster than any human can review it. The discipline of keeping changes small is partly a discipline of not letting the tool's speed outrun your ability to hand off what it produced. Phase 5 turns this into a working habit.

---

## Receiving Review: The Skill Nobody Warns You About

If you do work with a reviewer, a hard moment is coming, and it's worth naming now so it doesn't blindside you: someone is going to comment on your code, and it's going to sting.

It stings because of everything 1.1 established. You feel more capable than you are, the tool produced output you didn't fully understand, and now a person is pointing at it. The instinct is to defend, or to feel exposed, or to quietly assume the reviewer is being difficult.

The reframe that makes review survivable, and then valuable: **the review is about the code, not about you, and the reviewer is doing your future self a favor for free.** Every issue caught in review is an issue that doesn't reach production with your name on it. A reviewer who says nothing is not being kind. They're withholding the most useful thing a colleague can give you.

A few concrete moves that separate people teams trust from people teams tolerate:

- **Read the comment as a question about the code, not a verdict on you.** "Why isn't this handling the empty case?" is information, not an attack. Answer it from the code (1.1's first skill), or fix it.
- **Distinguish the blocking from the optional.** Mature reviewers signal severity, often with prefixes: a comment marked BLOCKING must be addressed before the change can be accepted; SUGGESTION or NIT is an improvement you can take or leave. Learn to tell "this is broken" from "I'd have done it differently," and don't treat preferences as mandates or mandates as preferences.
- **When you disagree, disagree with a reason, not a feeling.** "I chose this because X" is a conversation. "It works though" is the done-for-me reflex talking, and it's the answer that marks someone who hasn't made the shift this module is about.

And here's the part that pays the solo learner: you can run review on yourself. Before you call anything done, read it as if a stranger wrote it and you have to approve it. Ask the three PR questions out loud. The gap between what you can answer and what you can't is your own private review, and it catches a startling amount before anyone else has to.

---

## What This Means Before Phase 2

You now have the target. Phase 2 starts teaching you to read and write JavaScript, and it would be easy to learn those skills aimed only at done-for-me: code that runs for you, today. This module exists so you aim higher from the first line.

As you go through everything that follows, one question converts ordinary practice into professional practice, and you can ask it of any code, your own or Claude's:

**Could a stranger pick this up, trust it, and build on it without me here to explain?**

If yes, it's done. If no, it runs, but it isn't finished, and the gap is exactly the work this whole course is teaching you to close. The stranger is usually hypothetical. Sometimes it's a teammate. Often it's future-you. And at least once per session, it's literally Claude Code, opening your project fresh, with nothing to go on but what you left behind.

---

## FLOOR TEST 1.3 — The Handoff Test, Run on Real Code

**What you'll do:** A roughly 20-minute exercise needing only a browser. You'll produce a piece of code, then subject it to the handoff test from both sides: as the author, and as the stranger.

**Why this test exists:** Every prior floor test built a reading or prediction habit. This one builds the handoff habit, by making you feel the gap between done-for-me and done-for-handoff on a piece of code that is, briefly, your own.

### Part 1: Generate something slightly too big (5 minutes)

Ask Claude for a small but real piece of code. Use the prompt below.

[PROMPT block with copy button:]
Write a JavaScript function called validatePassword that checks whether a password meets these rules: at least 8 characters, contains a number, contains an uppercase letter. It should return an object saying whether the password passed and, if not, which rules it failed. Include three example calls showing different outcomes.

Read what comes back, but do not study it to memorization. Glance at it the way you'd glance at code you wrote a month ago and half-remember.

### Part 2: Write the handoff argument (7 minutes)

Without re-reading the code line by line, answer the three PR questions about it. Write real sentences, not notes.

[Prediction box, id `pred-ft3-pr`, label "Your handoff argument (what / why / how to verify):", taller min-height ~9rem:]

1. **What does this code do?** In plain language, the behavior, not the syntax.
2. **Why is it shaped this way?** Name one decision the code makes (for example: how it reports failures, the order it checks rules, what it returns) and why that's a reasonable choice.
3. **How would someone verify it works?** Describe the specific check, including at least one input you did NOT see in the three examples.

If you found question 2 hard, that's the lesson landing. "Why is it shaped this way" is the question done-for-me never has to answer, and the one a stranger most needs answered.

### Part 3: Become the stranger (8 minutes)

Now find the gap. Look back at the code and answer these by reading, not remembering.

[Prediction box, id `pred-ft3-gaps`, label "What a stranger couldn't tell from this code alone:", min-height ~7rem:]

1. Pick one input you're genuinely unsure about. For example: what does it do with an empty string? A password that's 8 characters but all lowercase numbers? Something that isn't a string at all? Predict the behavior, then test it by asking Claude to run that exact case, or by reasoning it out from the code.
2. Is there anything the code does that a stranger could NOT figure out from the code alone, with no comment explaining it? If yes, that's a handoff gap: a place where the code is leaning on context that only lives in someone's head.
3. One sentence: if you handed this exact code to your future self in three months, what's the first thing they'd have to re-figure-out that a single comment could have saved them?

### Pass criteria

You wrote real sentences for all three PR questions in Part 2, and you identified at least one handoff gap in Part 3 (or made an honest case that there are none, which for most generated code is the wrong answer and worth being suspicious of). As always, the failure mode is skipping the thinking, not getting a "wrong" answer. There are no wrong answers here, only handoffs that would succeed and handoffs that would fail.

---

## QUIZ QUESTIONS — Module 1.3

**Question bank: 12 questions, 4 drawn randomly per attempt. Pass: 3 of 4.**

---

**Q1**
The module says its title, "Working on a Team," is "a small lie." What does it actually argue the module is about?

A) The communication skills needed to succeed in a workplace
B) A shift in standard from "does it run" to "can someone else pick it up and build on it" ✓
C) The specific tools and rituals teams use to coordinate work
D) Why solo developers should join a team as soon as possible

*Explanation: The module reframes team practices as the most visible instance of a universal standard: handoff. The bar shifts from code that works for you right now to code a stranger can trust and extend without you present. That standard applies with or without a team, which is why the title is a small lie.*

---

**Q2**
What is the difference between "done-for-me" and "done-for-handoff" code?

A) Done-for-me code has bugs; done-for-handoff code has been tested
B) Done-for-me works for you now with the reasoning in your head; done-for-handoff puts the reasoning on the page so a stranger can trust and change it ✓
C) Done-for-me is written by hand; done-for-handoff is generated by AI
D) Done-for-me is for prototypes; done-for-handoff is for production only

*Explanation: Both can run correctly. The difference is where the supporting context lives. Done-for-me leans on what you happen to remember; done-for-handoff externalizes the reasoning so someone without access to your head can understand, trust, and safely modify it.*

---

**Q3**
Why does the module call the "propping" in done-for-me code invisible?

A) The code hides its dependencies in external files
B) You supply the missing context from your own memory without noticing you're doing it ✓
C) The bugs only appear under production load
D) AI-generated code deliberately obscures its own logic

*Explanation: When you understand a piece of code, you explain it to yourself automatically, so it looks self-explanatory. You can't see the context you're adding, the way you can't see your own blind spot. The prop only becomes visible when it's removed: by time, a reviewer, or a fresh Claude Code session.*

---

**Q4**
The module argues the teamless learner should care about handoff discipline "most." What is the core reason?

A) Solo developers write more code and therefore more bugs
B) You hand off to your future self most often, and you're least equipped to do it well because you trust a past self who left you nothing ✓
C) Employers only hire developers who have worked on teams
D) Working alone makes it impossible to catch your own mistakes

*Explanation: A teammate is a fresh mind that knows to ask. Future-you arrives believing the memory survived, and it didn't, so you get false familiarity instead of a stranger's healthy skepticism. That makes the self-handoff the hardest target, and the teamless learner faces it constantly.*

---

**Q5**
How does the module connect handoff discipline to something you learned in Module 1.2?

A) Non-determinism means handoffs can never be fully reliable
B) Because Claude Code has no memory across sessions, code clear enough for a stranger is also clear enough for your next session ✓
C) The context window limits how much code you can hand off at once
D) The training cutoff means handoff documentation goes stale quickly

*Explanation: Module 1.2 established that Claude Code starts each session blind, knowing only what's written down. So writing clearly for a hypothetical stranger is the same act as writing clearly for your next session. Handoff discipline is what makes collaboration with your own tool work across time, an immediate payoff the solo learner feels this week.*

---

**Q6**
The module describes a pull request as two things at once. What are they?

A) A code change and a record of who approved it
B) A set of code changes and an argument that those changes are safe to accept ✓
C) A feature branch and a merge into the main codebase
D) A diff and an automated test report

*Explanation: New developers focus on the code and ignore the argument. The argument, the case that the change is safe and correct, is where handoff actually lives, because it's what lets someone accept the change without the author present.*

---

**Q7**
According to the module, which of the three PR questions is the single most valuable sentence in a handoff, and the one done-for-me code never contains?

A) What changed, in plain language
B) Why the change was made this way, with its tradeoff ✓
C) How to verify the change works
D) Who reviewed the change and when

*Explanation: The "why this way" sentence captures the reasoning that otherwise never leaves the author's head, and it's the direct answer to 1.1's "why did you structure it this way?" review question. Done-for-me code omits it precisely because the reasoning stayed internal.*

---

**Q8**
What does the research on pull request size actually show, according to the module?

A) Pull requests should always be under exactly 200 lines, with no exceptions
B) Review quality is strongest around 200 to 400 lines of changed code and drops off sharply beyond that ✓
C) Larger pull requests get more thorough reviews because reviewers spend more time
D) Pull request size has no measurable effect on how many bugs are caught

*Explanation: Industry research, including a well-known SmartBear study at Cisco, found defect detection peaks roughly in the 200 to 400 line range and falls off past it; Google targets even smaller. Beyond about 400 lines, reviewers skim rather than review, and oversized changes often return with no substantive comments at all.*

---

**Q9**
Why does the module say line count is "an imperfect proxy" for the right PR size?

A) Different programming languages count lines differently
B) What matters is cognitive size, how much a reviewer must think about; a mechanical 400-line rename reviews in minutes while a subtle 30-line change may not ✓
C) Modern tools can review any size of change automatically
D) Line counts can be inflated by comments and whitespace

*Explanation: The real target is how much a reviewer has to actually reason about. Lines are a rough, easy-to-see stand-in for that. A uniform mechanical change can be large yet trivial to review; a small subtle change can demand deep attention. Aim small, and when size is unavoidable, make the change mechanical and uniform.*

---

**Q10**
The module connects PR size discipline to AI-assisted work specifically. What is the connection?

A) AI tools automatically split large changes into smaller pull requests
B) The tool can generate an enormous change in seconds, faster than any human can review it, so keeping changes small keeps them handoff-able ✓
C) AI-generated code is always too small to need review
D) Reviewers trust AI-generated changes more, so they can be larger

*Explanation: AI assistance makes it trivially easy to produce a huge change instantly, far faster than a human can genuinely review. Keeping changes small is partly the discipline of not letting the tool's generation speed outrun your ability to hand off what it produced in a reviewable form.*

---

**Q11**
The module distinguishes a BLOCKING review comment from a SUGGESTION or NIT. Why does it say this distinction matters?

A) Blocking comments are written by senior reviewers and suggestions by junior ones
B) So you don't treat a preference as a mandate or a mandate as a preference ✓
C) Suggestions can be ignored, so they're not worth reading
D) Blocking comments indicate the reviewer dislikes the author's approach

*Explanation: A BLOCKING comment must be resolved before the change is accepted; a SUGGESTION or NIT is optional. Telling them apart is how you address what's actually broken without getting paralyzed by stylistic preferences, and without dismissing a real problem as mere opinion.*

---

**Q12**
What "private review" does the module say a solo learner can run with no reviewer present?

A) Running an automated linter over the code before committing
B) Reading your own code as if a stranger wrote it and asking the three PR questions out loud ✓
C) Asking Claude Code to approve the change before merging
D) Waiting three months and re-reading the code with fresh eyes

*Explanation: Before calling anything done, you read it as a stranger and ask what it does, why it's shaped that way, and how to verify it. The gap between what you can answer and what you can't is your own review, and it catches a surprising amount before anyone else is involved. (Waiting three months would work but isn't a practical workflow.)*

---

## Further Reading

- **Google Engineering Practices: Code Review** — https://google.github.io/eng-practices/review/ — Google's public, widely adopted guide to what review is for and how small changes should be; the source behind much of this module's standard
- **SmartBear: Best Practices for Code Review** — https://smartbear.com/learn/code-review/best-practices-for-peer-code-review/ — the practitioner write-up of the Cisco study behind the 200-400 line finding
- **Conventional Commits** — https://www.conventionalcommits.org/ — a simple, machine-readable standard for commit messages; a concrete handoff tool you'll meet again in Phase 5
- **GitHub Docs: About Pull Requests** — https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests — the official mechanics of the PR, for when you make your first one
