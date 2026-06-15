# Module 2.2 — Reading JavaScript: The Minimum Viable Literacy (REBUILT against 8c teaching method)

navTitle: Reading JavaScript | phase 2 | num 2.2 | id p2m1 (EXISTING id — keep; replaces stub/prior content)
This is the proof-of-method rebuild. It BUILDS scope from the ground (model → mechanic → line-by-line → reveal), restates load-bearing facts at point of use, names const = constant, grounds const/let/var in real code, and uses a practitioner scenario as the floor test. Gradient: middle (worked-example teaching, productive-failure floor test). Code blocks clean (not 2.1-heavy caret annotation). Convert markers per design doc.

================ CONTENT ================

## Opening hook

You do not need to write JavaScript to take this course. You need to read it well enough to catch Claude in a mistake. That is a much smaller skill than "learn JavaScript," and it is the one that actually protects you. This module teaches the minimum: the handful of shapes you will see in every file Claude produces, and the one reading move that catches the bug it introduces most quietly, a change in scope you did not notice.

[EYEBROW: HOW TO READ THIS MODULE]
## Reading, not writing

Every other JavaScript resource teaches you to write it. This one teaches you to read it, because reading is what your accountability requires. When Claude hands you forty lines, no one will ask whether you wrote them. They will ask whether they are right, and answering that means reading the code and knowing what it does before you run it. So do not try to memorize syntax for producing code. Build instead the ability to look at a line and say what it does. That is the literacy that lets you evaluate, and evaluation is the job.

We will cover the three ways code names things (and the promise each one makes), then scope (where the silent bugs live), then the shapes you will see everywhere, and finish by catching a real bug in a real situation.

[EYEBROW: NAMING THINGS]
## const, let, and var: three words, three promises

Almost every line of JavaScript begins by naming something. There are three words for it, and the difference between them is not trivia: Claude chooses between them, and the choice changes how the code behaves.

`const` is short for **constant**. A constant is something that does not change. So `const` declares a name you are promising not to reassign. `const taxRate = 0.08;` says: taxRate is 0.08, and it will not be pointed at a different value later. If code tries to reassign it, the program errors. That is the point of const: it is a promise, written into the code, that this name is stable. It is the one you want to see most, because a stable name is one less thing that can change behind your back.

`let` declares a name that **can** change. `let count = 0;` followed later by `count = count + 1;` is fine and expected. You use let when the value genuinely needs to move over the life of the function. Hold onto this fact, because it is about to do real work: **let means this value is allowed to change.**

`var` is the old way, from before let and const existed. It mostly behaves like let, with one dangerous difference we will get to. For now, treat var as a small flag: when you see it in modern code, it means either old code or Claude reaching for an older habit (the training-cutoff issue from Module 1.2).

[EYEBROW: SEEN IN REAL CODE]
## Each one, earning its keep

Descriptions fade; seeing them at work sticks. Here is each declaration doing a real job:

```javascript
const API_URL = "https://api.store.com";   // never changes — const is right
let itemsInCart = 0;                        // changes as the user shops — let is right
itemsInCart = itemsInCart + 1;              // reassigning let: fine

const TAX_RATE = 0.08;                      // a fixed rate — const
let runningTotal = 0;                       // accumulates as we add items — let
```

Read the choice as information. `const API_URL` tells you the address is fixed; if you later saw code trying to change it, you would know something is wrong. `let runningTotal` tells you this value is meant to move; that is expected, not suspicious. The declaration word is the first thing the code tells you about a value, before you read another character.

[CALLOUT info | label: THE READING MOVE]
When you see a declaration, read the promise. const (constant) says this name is stable and will not be reassigned. let says this value is allowed to change. var says watch out, this is old or scoped strangely. You know something true about the value before you have read what it holds.

[EYEBROW: THE CONCEPT BEHIND THE SILENT BUGS]
## Scope: where a name lives (let us build this slowly)

Scope is the single most important idea in this module, because scope bugs are the quiet kind: they often do not announce themselves, they just make the code do the wrong thing. We are going to build this from nothing, because if you do not already have the idea of scope, no example will make sense. So forget code for a moment.

**Picture a building with rooms.** If you set something down inside a room, anyone else in that room can pick it up. But the moment you step out into the hallway, you can no longer reach what you left inside, the wall is between you and it. The thing still existed while you were in the room; once you leave, it is out of reach.

That is scope. **A name created inside a space can only be used by code in that same space.** Step outside the space, and the name is not reachable from there.

**Now, what counts as a "room" in code?** A room is a pair of curly braces `{ }`. A function has braces, so a function is a room. An `if` statement has its *own* braces, nested inside the function, so an if is a smaller room *inside* the bigger room. Rooms inside rooms. Keep that picture, we are about to walk through real code with it.

[EYEBROW: WALK IT LINE BY LINE]
## The bug, as the computer sees it

Here is a function. Read it with the rooms picture in mind. The comments walk through what is happening to the name `result` at each step.

```javascript
function check(score) {       // Room 1 opens (the function)
  if (score > 50) {           // Room 2 opens (a smaller room inside Room 1)
    const result = "pass";    // 'result' is created INSIDE Room 2
  }                           // Room 2 closes — whatever was created in it is now gone
  return result;              // back in Room 1, asking for 'result'
}                             // Room 1 closes
```

Walk it the way the computer does. `result` is created inside Room 2, the if. When Room 2's closing brace is reached, Room 2 is gone, and `result`, which only ever existed inside Room 2, is gone with it. Then `return result;` runs out in Room 1, asking for a name that lived in a room that has already closed. The computer's answer is literally: there is no `result` out here. That is a ReferenceError.

Sit with what the error is and is not. It is not that `result` has the wrong value. It is that `result` **does not exist** at the spot where you asked for it. You are standing in the hallway reaching for something left in a room whose door has shut.

[CALLOUT warning | label: THE LUCKY CASE]
The version above errors loudly, and that is the LUCKY case: the computer caught the mistake for you. The truly dangerous version of this fails with no error at all, just a wrong answer that ships to production. We will see exactly that in a moment, once we have met the one declaration that causes it. Hold the thought: an error you can see is a gift; the bug that hides is the one that hurts.

[EYEBROW: NOW THE FIX]
## The same function, corrected, walked line by line

```javascript
function check(score) {       // Room 1 opens
  let result = "fail";        // 'result' is created HERE, in Room 1 itself
  if (score > 50) {           // Room 2 opens
    result = "pass";          // NOT a new name — reaching out to change the Room 1 'result'
  }                           // Room 2 closes — but 'result' lives in Room 1, so it survives
  return result;              // back in Room 1, asking for the Room 1 'result' — it is right here
}                             // Room 1 closes
```

Only one thing changed: `result` is now created in **Room 1** instead of Room 2. Because it lives in the big room, it is still there when `return` asks for it at the end.

And here is the load-bearing detail, stated right where you need it: **remember that `let` means the value is allowed to change.** That is exactly why this works. We create `result` and set it to `"fail"` as a starting point. Then, inside the if, the line `result = "pass";` does not create a second name, it reaches into the existing Room 1 `result` and *changes* it from "fail" to "pass". (Room 2 can see *out* into Room 1, the same way you can see into the hallway from inside a room. What you cannot do is see *into* a room whose door has closed.) So the function starts every customer at "fail" and upgrades them to "pass" only if they clear the bar. If we had used `const` here, the line `result = "pass";` would error, because const forbids exactly that change. The choice of `let` is not incidental; it is what makes the upgrade legal.

[CALLOUT truth | label: THE WHOLE BUG, IN ONE LINE]
The difference between the broken function and the working one is a single thing: WHERE the name is created. Created inside the if (Room 2), it is gone before the return can use it. Created in the function (Room 1), it survives. When you review one of Claude's refactors, the question that catches this entire family of bug is: did any name's declaration move into or out of a set of braces?

[EYEBROW: THE var TRAP]
## Why var is the one to watch

Now the var difference, and the rooms picture makes it simple. `var` ignores the walls of the inner room. A `var` created inside an if or a loop does not stay in that smaller room, it leaks out into the whole surrounding function.

```javascript
function demo() {
  if (true) {
    var x = 1;       // created in the inner room...
  }
  return x;          // ...but var leaked out, so this returns 1 instead of erroring
}
```

With let or const, `x` would be gone at the return and the code would error. With var, it silently works because the name leaked out of the inner room. That sounds convenient. It is the trap.

Here is the silent failure I promised you earlier, the dangerous version. Read it with the rooms picture, and watch what happens on the second call:

```javascript
function applyDiscount(price, isMember) {
  if (isMember) {
    var discount = 0.1;            // 10% off, but only set inside this room
  }
  return price - (price * discount);
}

applyDiscount(100, true);          // 90  — member: discount was set, math works
applyDiscount(100, false);         // NaN — non-member: and nobody warned you
```

Walk both calls. For a member, the if runs, `discount` becomes 0.1, and the return computes 100 - (100 * 0.1) = 90. Correct. For a non-member, the if never runs, so `discount` is never given a value, but because var leaks out of the room, the name `discount` still EXISTS at the return line. It just holds nothing, the value `undefined`. And `100 - (100 * undefined)` is `NaN`, "not a number." The function returns garbage.

Now follow it all the way to the customer, because "returns NaN" does not sound like a disaster until you see where it lands. That return value is the price the checkout page shows. So a non-member adds a $100 item, goes to pay, and the total reads "$NaN." The "Pay" button, asked to charge an amount that is not a number, either does nothing when clicked or throws an error deep in the payment step. The customer cannot check out. They try again, refresh, give up, and leave. Every non-member, every order, silently unable to buy anything. The store does not find out from an error log, because there was no error; it finds out from a day of mysteriously collapsed sales.

That is why this one is the dangerous kind. There was no crash, nothing turned red. In testing with a member it returned 90 and looked perfect, so it shipped. Had `discount` been declared with `let` inside the if, the non-member path would have thrown a loud ReferenceError the moment it ran, the computer catching the bug before it ever reached a customer. Because it is `var`, that catchable error became a silent wrong answer that rode all the way to the checkout screen. The very thing that makes var feel convenient, that the name still exists outside its room, is exactly what let a scope mistake become lost revenue. This is the whole reason reading scope by eye matters: the loud bugs announce themselves, but this kind only shows up in the sales numbers, and only you, reading the code before you commit it, could have caught it.

The takeaway for reading Claude's code: when you see var, slow down. It is either old code or a pattern whose scope does not follow the room walls, and as you just saw, that is precisely where a loud, catchable error turns into a silent one that reaches users.

[EYEBROW: THE SHAPES YOU WILL SEE EVERYWHERE]
## Core syntax: recognizing the common shapes

Beyond declarations, a small set of shapes appears in nearly every file. You do not need to write them; you need to recognize them on sight so reading stops being slow. For each, learn the giveaway and what to read it as.

**Arrow functions.** `const add = (a, b) => a + b;` is a function. The `=>` is the giveaway. It takes a and b and returns a + b. When you see `=>`, read "function."

**Template literals.** Backticks with `${ }` inside: `` `Hello, ${name}!` `` builds a string with name's value dropped in. When you see backticks, read "a string being assembled."

**Destructuring.** `const { id, email } = user;` pulls the id and email properties out of user into their own names. When you see `{ } =` (or `[ ] =`) on the left of an equals sign, read "unpacking values out of a thing."

**Spread and rest.** `...` means either spread it out (`[...a, ...b]` combines two arrays) or gather the rest (`function f(...args)` collects all arguments into args). When you see `...`, read "expanding or collecting."

**Ternary.** `const label = score > 50 ? "pass" : "fail";` is a compact if/else: condition, then `?`, then value-if-true, then `:`, then value-if-false. When you see `? :`, read "inline if/else."

**Optional chaining.** `user?.profile?.name` safely reads nested properties; if user or profile is missing, it yields undefined instead of crashing. When you see `?.`, read "this might not be there, read it carefully."

[CALLOUT truth | label: THE WHOLE SKILL]
You are not memorizing syntax to write it. You are building fast recognition so that reading Claude's code is fluent enough to spend your attention on whether it is RIGHT, not on what it says. Recognition is the floor; judgment is the goal.

[EYEBROW: HANDS ON — A REAL SITUATION]
## Catch it yourself: Marcus and the reward tiers

Here is the kind of moment this whole module is for.

Marcus is a developer at an online sporting-goods store, working on its loyalty program. He asks Claude to clean up the function that decides a customer's reward tier from their points. Claude hands back the code below, and it looks reasonable, the logic reads correctly: 90 and up is gold, 70 and up is silver, everything else bronze. Marcus is about to commit it.

Before you run it, predict: what happens when this is called with a score of 75? Write your prediction down even if you are not sure, being wrong here is exactly how the lesson works. Then run it and see. Use the rooms picture: where is each `tier` created, and where is it asked for?

[INTERACTIVE: prediction box id 'ft-p2m1-scope', prompt 'What will getTier(75) return or do? Predict before running.' Then runner id 'ft-p2m1-scope-run' with the starterCode below, heightRem 14.]

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

[CALLOUT danger | label: WHAT MARCUS ALMOST COMMITTED]
It does not return "silver". It throws a ReferenceError: tier is not defined. Each `const tier` is created inside its own room, the if, the else-if, the else. By the time `return tier;` runs, all three of those rooms have closed, and tier, which only ever lived inside one of them, is gone. The return is out in the function's room asking for a name that does not exist there. The fix is the same move you saw with check: create tier once in the function's room (let tier;) and assign it inside each branch, or return directly from inside each branch. Notice the logic was never wrong, the tiers, the cutoffs, all correct. The bug was purely WHERE the name was created. That is the kind of thing a careful reader catches and Claude, confidently, does not.

[EYEBROW: THE FIX, SHOWN]
## What Marcus should commit

Two corrected versions, so the right shape is in front of you. The first creates `tier` once in the function's room, then assigns it inside each branch, the same move as the corrected check function:

```javascript
function getTier(score) {
  let tier;                       // created in the function's room — survives to the return
  if (score >= 90) {
    tier = "gold";                // reaching out to set the function-room tier
  } else if (score >= 70) {
    tier = "silver";
  } else {
    tier = "bronze";
  }
  return tier;                    // tier still exists here — returns "silver" for 75
}
```

The second skips the shared name entirely and returns from inside each branch, so there is never a name to escape a room:

```javascript
function getTier(score) {
  if (score >= 90) return "gold";
  if (score >= 70) return "silver";
  return "bronze";
}
```

Both are correct. The first keeps a single `tier` in the function's room where the return can reach it; the second returns immediately, so nothing has to survive a closing brace. Either fixes the bug, and now getTier(75) returns "silver" as Marcus expected.

[DIAGRAM: scope-nested-boxes.png — place HERE, immediately after the reveal, where tier is fully grounded. Precede with: "Here is what just happened, pictured, the scope principle, with tier as the example you just worked through." alt and caption per the wiring prompt.]

## Closing consolidation

You came in able to run JavaScript without reading it. You leave able to read the part that matters: what each declaration promises (const for constant, stable names; let for values that change), where a name lives and why stepping outside its room puts it out of reach, and the shapes that fill every file, with one real bug caught in a real situation by your own reading. That is the minimum viable literacy, and it is enough to start catching Claude's quietest mistakes. Next, in 2.3, we take the pattern that causes more silent production failures than any other, async and await, where the question is not where a name lives, but WHEN the code actually runs.

[FORWARD TIE: 2.3 Async/Await builds on this reading fluency; the rooms model and the "did a declaration move across braces" move recur whenever Claude refactors.]

================ QUIZ — DROP-IN (replace QB['p2m1'] with this exact array) ================

QB['p2m1']=[
  {q:"The module says you do not need to write JavaScript, but you do need to read it well enough to do what?",opts:["Reproduce Claude's code from memory in a review","Catch Claude in a mistake before the code runs","Pass a technical interview on JavaScript syntax","Rewrite every function Claude produces in a cleaner style"],correct:1,explanation:"Reading, not writing, is what accountability requires. The job is to look at code Claude produced and know whether it is right, which means reading it and predicting its behavior before running, not producing it yourself."},
  {q:"const is short for 'constant.' What does that tell you about a name declared with const?",opts:["It is calculated only once, for performance","It will not be reassigned to a different value; the name is stable","It is available in every room of the program","It must hold a number, not a string"],correct:1,explanation:"Constant means unchanging, which is exactly why const forbids reassignment. const declares a promise written into the code: this name is stable and will not be pointed at a different value. That is why it is the declaration you most want to see."},
  {q:"In the corrected check function, why was let (not const) the right choice for result?",opts:["let is faster than const inside an if block","Because result is set to 'fail' first and then changed to 'pass', and let is what allows a value to change","Because const cannot be used inside a function","Because let makes result visible inside the if block"],correct:1,explanation:"let means the value is allowed to change. The function starts result at 'fail' and upgrades it to 'pass' only if the score clears the bar. That reassignment is exactly what let permits and const forbids, so const there would error on the line result = 'pass'."},
  {q:"Using the rooms picture: a name created inside an if block (a smaller room) and then used after that block has closed will do what?",opts:["Return undefined, a silent failure","Not exist at that point: the room it lived in has closed, so asking for it errors","Keep its value because names are global","Be automatically moved to the function scope"],correct:1,explanation:"A name lives only in the room (the braces) where it was created. Once that room closes, the name is gone. Code outside asking for it is reaching into a room whose door has shut, which is a ReferenceError: it does not exist there."},
  {q:"What is the single difference between the broken check function and the working one?",opts:["The working one uses var instead of const","WHERE the name is created: in the function's room (works) versus inside the if room (breaks)","The working one removes the if statement","The working one returns from inside the if block"],correct:1,explanation:"Everything else is identical. Created in the function's room, result survives to the return; created inside the if room, it is gone before the return can use it. The bug is purely about where the name is declared."},
  {q:"Why is var called 'the one to watch'?",opts:["It runs more slowly than let and const","It ignores the inner room's walls: a var inside an if or loop leaks out into the whole function","It cannot be reassigned once set","It only works in old browsers"],correct:1,explanation:"Unlike let and const, var is not contained by the braces it sits in. A var declared inside an if or loop leaks into the surrounding function, which can cause silent collisions or surprising behavior. That is why var signals 'slow down and read carefully.'"},
  {q:"When you see => in a line of code, what should you read it as?",opts:["A comparison between two values","A function","An assignment of one variable to another","A loop over a collection"],correct:1,explanation:"The => is the giveaway for an arrow function. const add = (a, b) => a + b; is a function that returns a + b. Reading => as 'function' is the recognition move."},
  {q:"What does destructuring like const { id, email } = user; do?",opts:["Creates a new user object with only id and email","Pulls the id and email properties out of user into their own names","Deletes the other properties from user","Checks whether user has id and email"],correct:1,explanation:"Destructuring unpacks values out of a thing: this pulls user.id and user.email into standalone names. Seeing { } = or [ ] = on the left of an equals should read as 'unpacking values out of a thing.'"},
  {q:"How should you read the ternary score > 50 ? 'pass' : 'fail'?",opts:["A loop that runs while score is over 50","An inline if/else: condition, value-if-true, value-if-false","A comparison that returns true or false","A function call with two arguments"],correct:1,explanation:"The ternary is a compact if/else: the condition before the ?, the value-if-true between ? and :, the value-if-false after the :. Read ? : as 'inline if/else.'"},
  {q:"What does optional chaining (user?.profile?.name) protect against?",opts:["Reassigning a const value","Crashing when user or profile is missing, yielding undefined instead","Reading a property that exists on a defined object","Mutating the user object"],correct:1,explanation:"Optional chaining safely reads nested properties: if user or profile is null or undefined, the expression yields undefined rather than throwing. Read ?. as 'this might not be there, read it carefully.'"},
  {q:"In Marcus's reward-tier function, getTier(75) threw a ReferenceError instead of returning 'silver.' What was the actual cause?",opts:["75 does not qualify for any tier","Each const tier was created inside its own branch room, so none existed at the return outside them","The function was missing a return statement","The else-if condition was written incorrectly"],correct:1,explanation:"Each const tier lived only inside its own if/else-if/else room. At the return tier line, outside all of them, tier did not exist, so the code threw. The logic and cutoffs were correct; the bug was purely where each tier was created. The fix is to declare tier once in the function's room, or return directly from each branch."},
  {q:"What single question, asked while reviewing one of Claude's refactors, catches most scope mistakes?",opts:["Did the function's name change?","Did any name's declaration move into or out of a set of braces?","Were any new dependencies added?","Did the line count increase?"],correct:1,explanation:"The whole family of scope bugs comes down to a declaration crossing a brace boundary: moved into a block where it is read outside (breaks), or a var leak the new code leans on. Asking whether any name's declaration moved into or out of braces catches both."}
];

================ WIRING NOTES ================
- Replaces content of EXISTING id p2m1; keep id; quiz key stays QB['p2m1'] (12 questions, place verbatim).
- Code blocks: existing .code-block, clean (the inline comments in the scope walks ARE the teaching and render as plain code text — keep them; they are line-by-line traces, not 2.1-style caret callouts).
- Floor test: mountPredictionBox({id:'ft-p2m1-scope',prompt:'What will getTier(75) return or do? Predict before running.'}); mountRunner({id:'ft-p2m1-scope-run',starterCode:<the getTier block including console.log(getTier(75));>,heightRem:14}); then the [CALLOUT danger] reveal.
- Diagram /images/scope-nested-boxes.png AFTER the reveal, with the framing line. alt: "Variable scope as nested boxes: const tier declared inside the inner block cannot be reached by the return in the outer function scope; let tier in the function scope can." caption: "A name lives only inside its box; code outside the box cannot see in."
- Convert [EYEBROW]/[CALLOUT type|label] per design doc; visual system (header glow, eyebrows, softer callouts); Mark Complete gated on quiz.
