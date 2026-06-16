# Spec — Module 2.1 pass: quiz gate, p2m0 explanations, prose calibration

**Scope of this pass.** Module 2.1 does NOT get an 8c teaching rebuild — it already builds
from the ground (two-homes model, trust-boundary model, map placed after prose, worked-
example-first placement demo per 8b). The work is three items: (A) the quiz gate, a course-wide
engine change [APPROVED]; (B) p2m0's four position-referencing explanations [APPROVED]; (C) a
surgical prose pass on 2.1 for inclusivity, redundancy, and over-claim — softening and cutting,
not rebuilding.

No heavy module-content replacement and no new diagram, so the eventual wiring is small targeted
edits in ONE prompt — but only after this draft is approved. Lock content first; wiring separate.

---

## PART A — Quiz gate (course-wide engine change + doc bank) — APPROVED

### A1. What ships today
- Draw: `bank.slice().sort(random).slice(0, 4)` — a random 4 regardless of bank size.
- Pass: `var passed = nCorrect >= 3;` — 3 of 4 (75%).
- Banks: 12 (p1m1, p1m2, p1m3, p2m0, p2m1) or 8 (all others).
- "Question X of N" label already reads `state.drawn.length` (auto-scales).

### A2. New rule
> Draw `ceil(bank.length * 2/3)` per attempt; pass = `drawn - 1` (miss at most one).

| Bank | Draw | Pass | Held out | Pass % |
|------|------|------|----------|--------|
| 12   | 8    | 7    | 4        | ~88%   |
| 8    | 6    | 5    | 2        | ~83%   |

### A3. Engine edit (two lines, shared quiz path)
```js
// Draw — BEFORE
var shuffled = bank.slice().sort(function() { return Math.random() - 0.5; }).slice(0, 4);
// Draw — AFTER
var drawCount = Math.ceil(bank.length * 2 / 3);
var shuffled = bank.slice().sort(function() { return Math.random() - 0.5; }).slice(0, drawCount);

// Pass — BEFORE
var passed = nCorrect >= 3;
// Pass — AFTER
var passed = nCorrect >= (state.drawn.length - 1);
```

### A4. Verification step for the wiring prompt
Grep before declaring done: `grep -nE "of 4|3 of|75%|need(s)? 3|at least 3"` in the quiz
result / progress UI. Fix any hit to read from `state.drawn.length`.

### A5. Bank into design doc §8
> Each module quiz draws ceil(2/3 of its bank) questions per attempt from a larger bank (the
> held-out remainder defeats question- and answer-position memorization across attempts), in
> random order with options shuffled. Mark Complete requires missing at most one (~83% on a
> 6-of-8 draw, ~88% on an 8-of-12 draw). Banks hold 8-12 questions; 12 is preferred so a full
> third stays held out (a bank of 8 reserves only 2 — a thin pool; growing those banks to 12
> is deferred content work). Implementation: draw = Math.ceil(bank.length * 2/3); pass =
> drawn - 1. The former draw-4/pass-3 (75% of a third of the bank) is retired.

---

## PART B — p2m0 explanations (sweep 1) — APPROVED

Four explanations rewritten to name wrong-answer content instead of "(option A/C/D)", which
has no stable referent under option-shuffle. Full drop-in below; only those four changed.

### Drop-in block (replaces `QB['p2m0']` in full)
```js
QB['p2m0']=[
  {q:"What is JavaScript, at the most basic level?",opts:["A UI framework for assembling interfaces out of reusable components","A programming language that runs in browsers and on servers","A scripting tool that was designed to only run in web browsers","A markup language that adds interactive behavior to HTML pages"],correct:1,explanation:"JavaScript is a programming language: a set of rules and words the code is written in. The 'UI framework for assembling components' answer describes React, not JavaScript. The 'designed only for browsers' answer was historically true until Node.js appeared in 2009. The 'markup language' answer describes HTML, which structures a page rather than adding behavior."},
  {q:"What happened in 2009 that matters for how this course is structured?",opts:["React was released, making JavaScript viable for large user interfaces","TypeScript was created, adding optional type annotations to JavaScript","Node.js was released, letting JavaScript run on servers outside the browser","ES6 was standardized, adding modern syntax like arrow functions and const"],correct:2,explanation:"Node.js (2009) took the JavaScript engine out of the browser and let it run directly on a server. That single change is why the same language now spans both the frontend (browser) and backend (server), which is why placement matters: browser code and server code look identical but have completely different stakes."},
  {q:"Which statement about Node.js is correct?",opts:["Node.js is a separate language that compiles to JavaScript for the server","Node.js is JavaScript running on a server rather than in a browser","Node.js is a framework for building user interfaces, like React for the server","Node.js adds a type layer to JavaScript to catch errors before the code runs"],correct:1,explanation:"Node.js is JavaScript. Full stop. The same language, given a different place to run (a server) and a different set of allowed capabilities. The most common misconception is that it is a separate language. The 'adds a type layer' answer describes TypeScript. The 'framework for building user interfaces' answer describes React. And there is no separate language compiling to JavaScript here, which rules out the 'separate language that compiles' answer."},
  {q:"Why is browser JavaScript deliberately prevented from reading files or accessing databases?",opts:["Browser performance limitations make those operations too slow for the user","Browser code comes from strangers on the internet, so those powers would be a security catastrophe","The HTML specification forbids it so web pages stay separate from application data","Browsers delegate all data access to TypeScript, which handles it separately"],correct:1,explanation:"Browser JavaScript runs code that came from a stranger's server. If it could read files, access databases, or read secrets on your machine, every website you visited would be a security threat. Node.js code is different: it is your own code running on your own server, so it earns the powers the browser deliberately withholds."},
  {q:"A file contains `function UserCard({ name, email }) { return (<div className='card'><h2>{name}</h2></div>); }`. Where does this code run?",opts:["On the server; it is a Node.js route handler returning an HTML string","In the browser; it is a React component rendering UI to the screen","Either place; JavaScript functions work identically in both environments","On the server if TypeScript is present, in the browser if plain JavaScript"],correct:1,explanation:"The JSX syntax (HTML-like tags inside JavaScript returned from a function) is React's signature. React components render to the screen in the browser. The `className` instead of `class` is another React tell. Server code uses `app.get('/path', handler)` and `req`/`res` objects, not JSX tags in return statements. Whether TypeScript is present has no effect on where code runs."},
  {q:"What is React and where does it run?",opts:["A server runtime that lets JavaScript handle database connections and file access","A UI library written in JavaScript that runs in the browser to build screens","A programming language that compiles to JavaScript for building interfaces","A type system that verifies JavaScript code catches type errors before runtime"],correct:1,explanation:"React is a library (not a language, not a runtime) for building user interfaces. It runs in the browser. It is JavaScript underneath, with a specific style for composing reusable UI components. The 'server runtime for database connections' answer describes Node.js. The 'type system that catches errors before runtime' answer describes TypeScript. And nothing in this stack is a separate language 'compiled to JavaScript,' which rules out that answer."},
  {q:"How does TypeScript relate to JavaScript?",opts:["TypeScript is a completely separate language that requires rewriting JavaScript code","TypeScript adds optional type annotations to JavaScript; it is the same language with an extra layer","TypeScript replaces JavaScript in any codebase that cares about correctness","TypeScript is a runtime that executes JavaScript on the server side"],correct:1,explanation:"TypeScript is JavaScript plus an optional type layer. You annotate values with types (`: string`, `interface User {...}`) and the type checker verifies them. Strip out the annotations and you have valid JavaScript. It is not a separate language that requires rewriting your code, it does not replace JavaScript in correctness-minded codebases, and it does not execute code on the server (the 'runtime' answer describes Node.js)."},
  {q:"You see `app.post('/api/users', async (req, res) => { const user = await db.users.create(req.body); res.json(user); })`. Where does this run?",opts:["Browser code that builds a form and posts user data to a server","Server code (Node.js/Express) handling an incoming request and writing to a database","TypeScript code defining the shape of an API response object for validation","React code rendering a list and posting updates when the list changes"],correct:1,explanation:"`app.post` is Express registering a route handler on the server. `req` (incoming request) and `res` (outgoing response) are server-side objects. `db.users.create` is a database write, which is always a server responsibility. No browser is ever allowed to write directly to a production database. This is not TypeScript (no type annotations are visible)."},
  {q:"Why does it matter whether a bug is in frontend (browser) code vs backend (server) code?",opts:["Frontend bugs are harder to reproduce because they depend on the user's browser version","A backend bug can leak data, corrupt a database, or expose secrets; a frontend bug typically makes something look wrong","Backend code runs faster, so its bugs have more impact on application performance","The two types do not differ significantly in risk; all generated bugs require equal care"],correct:1,explanation:"The stakes are completely different. Frontend (browser) bugs usually cause visual or interaction problems: a button looks wrong, a page doesn't update. Backend (server) bugs can expose private user data, corrupt production records, or reveal API keys and passwords. Knowing which side of the map you are on tells you immediately how carefully to read the code in front of you."},
  {q:"You see `const fs = require('fs')` at the top of a file. What does this confirm?",opts:["This is a TypeScript file importing a type definition for file operations","This is a React component loading external assets via the file system module","This is Node.js server code; 'fs' is a built-in Node module for file system access","This is browser JavaScript that reads files the user has selected via a file input"],correct:2,explanation:"`fs` is a Node.js built-in module that reads and writes files on the server's machine. Browser JavaScript has no access to the server's file system. Any `require` of a Node built-in (`fs`, `path`, `os`, `crypto`) confirms you are looking at server-side Node.js code, full stop. TypeScript imports use ES module `import` syntax, not `require` for type definitions."},
  {q:"In a TypeScript interface, what does `email?: string` mean?",opts:["The email field is required and must be validated before the interface can be used","The email field is optional: present as a string if provided, absent (undefined) if not","The question mark means email can accept any type, not just strings","This is a TypeScript shorthand; it is equivalent to `email: string | null`"],correct:1,explanation:"In TypeScript, `?` after a property name marks it as optional. `email?: string` means the object can include email (in which case it must be a string) or omit it entirely (in which case accessing it gives `undefined`, not `null`). Reading these optional markers lets you catch when Claude writes code that assumes the property is always present but the interface says it might not be."},
  {q:"What is the core problem with treating all Claude-generated code as undifferentiated 'code that Claude wrote'?",opts:["It makes the code harder to read because you have not organized it by language or framework","You cannot match your scrutiny to the stakes, so a database write looks the same as a CSS color change","It prevents you from asking Claude follow-up questions about what the code does","It slows down review because you have to check every line for both visual and data bugs"],correct:1,explanation:"Without placing code on the map, you cannot know whether you are approving a low-stakes frontend tweak (wrong at worst) or a high-stakes server change that could corrupt production data or expose secrets. Matching scrutiny to stakes is the whole payoff of placement: a CSS change gets a glance, a database write gets a careful read. The magic-box user gives everything the same shallow treatment."}
];
```

---

## PART C — 2.1 prose pass (inclusivity, redundancy, claim calibration)

Expanded from the original single trim per your five notes. Still surgical: softening claims
and cutting duplication, not an 8c rebuild. The common thread you caught: 2.1 over-asserts
(announces each conclusion twice) and over-claims (says the learner "can answer" / placement
"is the skill" when it is the first move). Worth watching for the same habit in Phase 1.

### C1 — Inclusive opening hook (revises the earlier Part C "AFTER" + keeps the lead dedup)
The entry floor only assumes the learner can operate Claude Code, so "almost certainly already
shipped" overclaims. Widen the door without deflating the hook (the punch is "code you could
not name ran," true whether it shipped or just ran on screen).
- BEFORE (current live): "You have almost certainly already shipped code in languages you could not name. You asked Claude for a feature, it produced files full of `const`, `import`, `useState`, `app.get`, and it worked, and you moved on. That is the magic-box trick, and it is exactly the thing this whole phase exists to take apart. Before you can read a single line and judge whether it is right, you need the one thing the magic box never gave you: a map. Not the syntax yet. The map. What is this stuff, what is each piece for, and when are you looking at which."
- AFTER: "Maybe you have shipped a feature you could not have written by hand. Maybe you have only watched Claude produce one and run it. Either way, you have already run code in languages you could not name: files full of `const`, `import`, `useState`, `app.get` that worked, so you moved on. That is the magic-box trick, and it is exactly the thing this whole phase exists to take apart. The fix is not syntax, not yet. It is knowing what you are looking at: which technology, doing which job, running in which place."

### C2 — Placement-demo intro (your R1)
Tighten the staccato; keep the inclusive "you don't need fluency" frame (the §9 endorsed
pattern); say the labels-come-off point once (it currently repeats with the callout below it).
- BEFORE: "You do not need to be fluent in JavaScript to do this. Below are two real files. Every single tell is labeled, on purpose. This is the one place in the course where nothing is hidden: watch how each file gets placed, and the move becomes yours. Later, you will do this with no labels at all. Right now, read the labels."
- AFTER: "You do not need to be fluent in JavaScript for this part. Below are two real files with every tell labeled, nothing left for you to infer: read the labels, watch each file get placed as browser or server code, and you are well on your way to making that call yourself. The floor test that follows takes the labels away."

### C3 — The "announce it twice" redundancy (your R3, swept across the demo)
Each file states its placement both BEFORE the code (intro) and AFTER it (outro). Worked-
example-first wants the answer visible, so keep the upfront answer and cut the re-announcement
in each outro — choosing which to cut on pedagogical grounds, not deleting arbitrarily.

| Location | Clause cut (already said in the intro) | Kept |
|---|---|---|
| File 1 outro | "This is frontend code: it runs in the browser." | tells + the move |
| File 2 outro | "This is backend code: it runs on the server." | tells + the db.query clincher |

- File 1 outro BEFORE: "This is frontend code: it runs in the browser. Three tells point the same way: `react`, `useState`, and `<button onClick>`. Each one is about building or reacting to the screen, and nothing builds the screen except browser code. You reached that conclusion from the tells alone, without working out what the code does. That is the skill: read the signals, not the logic."
- File 1 outro AFTER: "Three tells point the same way: `react`, `useState`, and `<button onClick>`. Each one is about building or reacting to the screen, and nothing builds the screen except browser code. You read that from the tells, without working out what the code does. That is the first move: read the signals, not the logic."

- File 2 outro BEFORE: "This is backend code: it runs on the server. Four tells point the same way: `require`, `app.get`, `db.query`, and `res.json`. And one settles it on its own: `db.query` talks to the database, which browser code is never allowed to do, so this can only be server code. Again, you placed it from the tells alone, without reading the logic."
- File 2 outro AFTER: "Four tells point the same way: `require`, `app.get`, `db.query`, and `res.json`. And one settles it on its own: `db.query` talks to the database, which browser code is never allowed to do, so this can only be server code. Again, the tells placed it, without reading the logic."

(C3 also folds in the R4/R5 softening for file 1: "That is the skill" -> "That is the first move";
"reached that conclusion from the tells alone" -> "read that from the tells".)

### C4 — Claim calibration (your R4 + R5)
Placement is more than three terms, and "you can now answer" overclaims. The honest fix is to
calibrate the claim, NOT to add edge-case teaching — adding code-that-runs-in-both-places,
shared files, or server-rendered React here would break the entry floor (orientation module,
learner knows nothing) and the scaffolding gradient (2.1 is maximum-scaffolding recognition,
"not yet being tested"). So: soften the mastery claims, add one honest "first read, not whole
skill" beat. No new tells, no edge-case catalog.

- "First evaluation skill" para, BEFORE: "...When Claude hands you a file, you can now ask, and answer, the orienting questions that every later evaluation skill builds on."
- AFTER: "...When Claude hands you a file, you can begin to answer the orienting questions that every later evaluation skill builds on."

- Same section tail, BEFORE: "...That is the whole skill of this module, and every reading-literacy module after it sharpens scrutiny you can only apply once you can place what you are looking at."
- AFTER: "...That is the first thing this module makes possible, and every reading-literacy module after it sharpens scrutiny you can only apply once you can place what you are looking at."

- NEW calibration beat (insert as a short `<p>` at the end of the "Why This Is the First Evaluation Skill" section, immediately before the "The Trap This Closes" callout): "A short list of tells will not settle every file. Some mix both worlds, some need more than a glance, and you will meet those later. That is the point of starting here: this gives you the reliable first read for the common case, and the modules after it sharpen the harder calls. Placement is where evaluation starts, not where it ends."

This makes the module honest about its own ceiling, which also strengthens the spine: a quick
placement is the opening move of accountability, not the verdict. (It is consistent with the
module's existing closing line, "placement is the first move of evaluation.")

---

## Wiring note (after you approve C1-C4)
One Claude Code prompt, small targeted edits, no heavy content replacement, no diagram:
1. Engine: the two gate edits (A3), precise line targets verified against the file first.
2. `QB['p2m0']`: replace the block (B drop-in).
3. 2.1 prose swaps: C1 (opening `<p>`), C2 (placement intro `<p>`), C3 (two outro `<p>`s),
   C4 (two `<p>` edits + one inserted `<p>` before the "Trap This Closes" callout).
4. Run the A4 grep; fix any hardcoded-gate string.
5. Design doc §8: bank the A5 text (separate commit, doc not code).
PowerShell single-line `-m` commits; `git add .`; reference `_specs/` paths explicitly.
