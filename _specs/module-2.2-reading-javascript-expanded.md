# Module 2.2 — Reading JavaScript: The Minimum Viable Literacy

navTitle: Reading JavaScript | phase 2 | num 2.2 | id p2m1 (EXISTING id — do not change; this replaces the stub content for p2m1)
THE CODE-MODULE TEMPLATE. Pre-built style: content prose below, real QB block (drop-in), exact interactive wiring. Spine: you cannot catch a scope bug you cannot read.

This module REPLACES the stub content of the existing p2m1 module. Keep its id (p2m1), update its content, set num to 2.2 (already done in the renumber commit), navTitle 'Reading JavaScript'.

================ CONTENT (convert markers to components per design doc) ================

## Opening hook

You do not need to write JavaScript to take this course. You need to read it well enough to catch Claude in a lie. That is a much smaller skill than "learn JavaScript," and it is the one that actually protects you. This module teaches the minimum: the handful of shapes you will see in every file Claude produces, and the specific reading move that catches the bug it introduces most quietly, a change in scope you did not notice.

[EYEBROW: HOW TO READ THIS MODULE]
## Reading, not writing

Every other JavaScript resource teaches you to write it. This one teaches you to read it, because reading is the skill your accountability actually requires. When Claude hands you forty lines, nobody is going to ask you to have written them. They are going to ask whether they are right, and answering that means reading the code and knowing what it does before you run it. So as you go through this, resist the urge to memorize syntax for producing code. Build instead the ability to look at a line and say what it does. That is the literacy that lets you evaluate, and evaluation is the job.

We will cover variables and scope (where the silent bugs live), then the core syntax shapes you will see constantly, then the one reading exercise that ties it together.

[EYEBROW: THE THREE DECLARATIONS]
## var, let, and const: what each one promises

Almost every line of JavaScript starts by naming something. There are three words for it, and the differences matter because Claude chooses between them and the choice changes behavior.

`const` declares a name whose binding cannot be reassigned. `const total = 5;` means `total` will not be pointed at a different value later; try it and the code errors. This is the one you want to see most, because it is a promise: this name is stable.

`let` declares a name that CAN be reassigned. `let count = 0;` followed later by `count = count + 1;` is fine. Use it when the value genuinely changes.

`var` is the old way, from before `let` and `const` existed. It mostly works like `let` with one dangerous difference covered below. When you see `var` in modern code, it is a small flag: either old code, or Claude reaching for an older pattern (the training-cutoff issue from Module 2.1's neighbor, 2.1 The Landscape, and Module 1.2's Fact 3).

[CALLOUT info | label: THE READING MOVE]
When you see a declaration, read what it promises. `const` says this name is stable. `let` says it changes. `var` says watch out, this is old or scoped strangely. The declaration word is the first thing the code tells you about a value, before you read another character.

[EYEBROW: SCOPE]
## Scope: where a name lives, and where it doesn't

Scope is the single most important reading skill in this module, because scope bugs are invisible. A scope bug does not error. It just makes the code do the wrong thing quietly, which is the silent-failure category from Module 1.1, now in concrete form.

Scope is simply this: where in the code a name is usable. A name declared inside a block, the curly braces of an `if`, a loop, a function, lives only inside that block. Outside it, the name does not exist.

Read this:

```javascript
function check(score) {
  if (score > 50) {
    const result = "pass";
  }
  return result;
}
```

This is broken, and it does not look broken. `result` is declared inside the `if` block, so it lives only there. The `return result;` line is outside that block, where `result` does not exist. This errors. But here is the part that matters for evaluating Claude: a slightly different version fails SILENTLY.

```javascript
function check(score) {
  let result = "fail";
  if (score > 50) {
    result = "pass";
  }
  return result;
}
```

This one is correct. `result` is declared in the function's scope, set to a default, and reassigned inside the `if`. The difference between the broken version and the correct one is *where the name is declared* (one line, easy to miss), and the broken kind is exactly what Claude produces when it refactors and moves a declaration into a block without noticing it is read outside.

[EYEBROW: THE var TRAP]
## Why var is the one to watch

`var` has a specific, dangerous property: it is NOT block-scoped. A `var` declared inside an `if` or a loop leaks out into the whole surrounding function. This is the one behavioral difference that bites.

```javascript
function demo() {
  if (true) {
    var x = 1;
  }
  return x;   // returns 1 — var leaked out of the if block
}
```

With `let` or `const`, `x` would not exist at the `return` and this would error, telling you something is wrong. With `var`, it silently works, which sounds good until the leak causes a name collision or a loop variable behaves unexpectedly. The lesson for evaluation: when Claude uses `var`, slow down. It is either old code or a pattern with surprising scope, and both deserve a second read.

[CALLOUT warning | label: WHAT CLAUDE GETS WRONG HERE]
The predictable scope mistakes Claude makes in refactors: it moves a `const` or `let` declaration into a block where it is read outside (breaks loudly, easy to catch), OR it leaves a `var` whose leak the new code accidentally depends on (works now, breaks later, hard to catch). When you review a refactor, the scope question is always: did any name's declaration move into or out of a block? That single question catches most of this category.

[EYEBROW: THE SHAPES YOU WILL SEE EVERYWHERE]
## Core syntax: reading the common shapes

Beyond declarations, a small set of shapes appears in nearly every file. You do not need to write them; you need to recognize them on sight so they stop slowing you down.

**Arrow functions.** `const add = (a, b) => a + b;` is a function. The `=>` is the giveaway. It takes `a` and `b` and returns `a + b`. The long form `function add(a, b) { return a + b; }` does the same thing. When you see `=>`, read "function."

**Template literals.** Backticks with `${}` inside: `` `Hello, ${name}!` `` builds a string with `name`'s value dropped in. You met this in Phase 1's greet function. When you see backticks, read "a string being assembled."

**Destructuring.** `const { id, email } = user;` pulls the `id` and `email` properties out of `user` into their own names. `const [first, second] = list;` does the same for array positions. When you see `{ } =` or `[ ] =` on the left of an `=`, read "unpacking values out of a thing."

**Spread and rest.** `...` means either "spread this out" (`[...a, ...b]` combines two arrays) or "gather the rest" (`function f(...args)` collects all arguments into `args`). When you see `...`, read "expanding or collecting."

**Ternary.** `const label = score > 50 ? "pass" : "fail";` is a compact if/else: condition, then `?`, then the value-if-true, then `:`, then the value-if-false. When you see `? :`, read "inline if/else."

**Optional chaining.** `user?.profile?.name` safely reads nested properties; if `user` or `profile` is missing, it yields `undefined` instead of crashing. When you see `?.`, read "read this carefully, it might not be there."

[CALLOUT truth | label: THE WHOLE SKILL]
You are not memorizing syntax to write it. You are building instant recognition so that reading Claude's code is fluent enough that you can spend your attention on whether it is RIGHT, not on what it says. Recognition is the floor; judgment is the goal.

[EYEBROW: HANDS ON]
## Floor test: read the refactor, then run it

Below is a function Claude was asked to refactor. Your job: read the "after" version and predict what it returns when called with `getTier(75)`, BEFORE you run it. Write your prediction, then run the code and see if you were right. The gap between your prediction and the result is the whole lesson, the same prediction-discipline from Phase 1.

The original worked correctly. The refactor introduced a scope bug. Read carefully: did any declaration move into a block where it is read outside?

[INTERACTIVE: prediction box id 'ft-p2m1-scope', prompt "What will getTier(75) return or do? Predict before running.", then a runner id 'ft-p2m1-scope-run' with the buggy refactor as starterCode below. The learner predicts, then runs, then a reveal/explanation callout follows.]

Runner starter code (the buggy refactor to read and run):
```javascript
function getTier(score) {
  if (score >= 90) {
    const tier = "gold";
  } else if (score >= 70) {
    const tier = "silver";
  } else {
    const tier = "bronze";
  }
  return tier;
}

console.log(getTier(75));
```

[CALLOUT danger | label: THE REVEAL]
This throws a ReferenceError: tier is not defined. Each `const tier` is declared inside its own block (the if, the else-if, the else), so none of them exist at the `return tier;` line outside those blocks. The fix is to declare `tier` once in the function scope (`let tier;`) and assign it inside each branch, or return directly from each branch. This is the exact refactor mistake from the warning above: a declaration moved into a block where it is read outside. You just caught it by reading scope, which a week ago you could not do.

## Closing consolidation

You came in able to run JavaScript without reading it. You leave able to read the part that matters: what each declaration promises, where a name lives, and the shapes that appear in every file, with one real scope bug caught by your own reading. That is the minimum viable literacy, and it is enough to start catching Claude's quietest mistakes. Next, 2.3 takes the single pattern that causes more silent production failures than any other: async and await, where the bug is not where a name lives but WHEN the code actually runs.

[FORWARD TIE: 2.3 Async/Await builds directly on this reading fluency; the scope-reading move recurs whenever Claude refactors.]

================ QUIZ — DROP-IN BLOCK (replace the stub QB['p2m1'] with this exact array) ================

QB['p2m1']=[
  {q:"The module says you do not need to write JavaScript for this course, but you do need to read it well enough to do what?",opts:["Reproduce Claude's code from memory in a review","Catch Claude in a mistake before the code runs","Pass a technical interview on JavaScript syntax","Rewrite any function Claude produces in a cleaner style"],correct:1,explanation:"The module is explicit that reading, not writing, is the skill accountability requires. The job is to look at code Claude produced and know whether it is right, which means reading it and predicting its behavior before running, not producing it yourself."},
  {q:"What does declaring a name with const promise the reader?",opts:["The value can never change in any way","The name's binding will not be reassigned to a different value","The name is available everywhere in the file","The value is calculated only once for performance"],correct:1,explanation:"const means the binding will not be reassigned. The module frames the declaration word as the first thing the code tells you about a value: const signals a stable name, which is why it is the one you most want to see."},
  {q:"Why does the module call var 'the one to watch' when reading code?",opts:["It is slower than let and const at runtime","It is not block-scoped, so it leaks out of the if or loop it is declared in","It cannot be used inside functions","It always indicates a bug that must be fixed"],correct:1,explanation:"var's dangerous property is that it is function-scoped, not block-scoped: a var declared inside an if or loop leaks into the whole surrounding function. That silent leak can cause collisions or surprising behavior, which is why var signals 'slow down and read carefully.'"},
  {q:"A function declares `const result` inside an if block and then has `return result;` outside that block. What happens, and why does it matter for evaluating Claude?",opts:["It returns undefined, a silent failure to watch for","It throws a ReferenceError because result does not exist outside the block, and this is exactly the refactor bug Claude introduces","It works because const is available everywhere","It returns the string 'result' as a literal"],correct:1,explanation:"A name declared with const or let inside a block lives only in that block, so reading it outside throws a ReferenceError. The module flags this as precisely what Claude produces when it refactors and moves a declaration into a block without noticing the name is read outside it."},
  {q:"The module shows a broken version (const inside the if) and a correct version of the same function. What single difference makes one correct?",opts:["The correct version uses var instead of const","The correct version declares the name once in the function scope and reassigns it inside the if","The correct version removes the if statement entirely","The correct version returns inside the if block"],correct:1,explanation:"The correct version declares result in the function's scope with a default and reassigns it inside the if, so it exists at the return. The difference is one line, where the name is declared, which is exactly the kind of easy-to-miss detail that separates working refactors from broken ones."},
  {q:"When you see `=>` in a line of code, what should you read it as?",opts:["A comparison between two values","A function","An assignment of one variable to another","A loop over a collection"],correct:1,explanation:"The => is the giveaway for an arrow function. `const add = (a, b) => a + b;` is a function that takes a and b and returns their sum; reading => as 'function' is the recognition move the module teaches."},
  {q:"What does destructuring like `const { id, email } = user;` do?",opts:["Creates a new user object with only id and email","Pulls the id and email properties out of user into their own names","Deletes all other properties from user","Checks whether user has id and email properties"],correct:1,explanation:"Destructuring unpacks values out of a thing: this pulls user.id and user.email into standalone id and email names. Seeing { } = or [ ] = on the left of an = should read as 'unpacking values out of a thing.'"},
  {q:"How should you read the ternary `score > 50 ? \"pass\" : \"fail\"`?",opts:["A loop that runs while score is over 50","An inline if/else: condition, value-if-true, value-if-false","A comparison that returns true or false","A function call with two arguments"],correct:1,explanation:"The ternary is a compact if/else: the condition before the ?, the value-if-true between ? and :, and the value-if-false after the :. Reading ? : as 'inline if/else' is the recognition the module builds."},
  {q:"What does optional chaining (`user?.profile?.name`) protect against?",opts:["Reassigning a const value","Crashing when user or profile is missing, yielding undefined instead","Reading a property that does not exist on a defined object","Mutating the user object accidentally"],correct:1,explanation:"Optional chaining safely reads nested properties: if user or profile is null or undefined, the expression yields undefined rather than throwing. The ?. should read as 'this might not be there, read it carefully.'"},
  {q:"The module says scope bugs are especially dangerous compared to other errors. Why?",opts:["They always crash the entire application","They are invisible: the code often does the wrong thing quietly rather than erroring","They only appear in production, never in testing","They corrupt the database when triggered"],correct:1,explanation:"Scope bugs are the silent-failure category from Module 1.1 made concrete. Some scope mistakes error loudly, but the dangerous ones make the code do the wrong thing quietly with no error, which is exactly the wrongness-that-looks-like-success the course keeps warning about."},
  {q:"In the floor test, getTier(75) was expected to return 'silver' but the refactored code threw a ReferenceError. What was the actual cause?",opts:["75 is not a valid score for any tier","Each `const tier` was declared inside its own branch block, so none existed at the return statement outside them","The function was missing a return statement","The else-if condition was written incorrectly"],correct:1,explanation:"Each const tier lived only inside its own if/else-if/else block, so at the return tier line, outside all of them, tier did not exist and the code threw. The fix is to declare tier once in the function scope and assign it in each branch, or return directly from each branch."},
  {q:"What single question does the module say catches most of Claude's scope mistakes when reviewing a refactor?",opts:["Did the function's name change?","Did any name's declaration move into or out of a block?","Were any new dependencies added?","Did the number of lines increase?"],correct:1,explanation:"The module gives one reading move for the whole category: when reviewing a refactor, ask whether any name's declaration moved into or out of a block. That single question catches both the breaks-loudly case (const moved into a block read outside) and the breaks-later case (a var leak the new code depends on)."}
];

================ WIRING NOTES (for the Claude Code prompt, kept minimal) ================

- This replaces stub content for EXISTING module p2m1 (do not create a new id; do not touch completion/QB keys beyond replacing QB['p2m1'] array contents).
- Mount in showModule p2m1 block: mountPredictionBox(el,{id:'ft-p2m1-scope',prompt:'What will getTier(75) return or do? Predict before running.'}) and mountRunner(el,{id:'ft-p2m1-scope-run',starterCode:<the buggy getTier code above>,heightRem:12}).
- Convert [EYEBROW]/[CALLOUT type|label]/[INTERACTIVE] markers per design doc, same as 2.1.
- Code blocks use the existing .code-block component.
- Apply visual system (header glow, eyebrows, softer callouts). Mark Complete gated on quiz pass.
