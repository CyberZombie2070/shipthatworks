# Module 2.1 — The Landscape: What JavaScript, Node, and React Are (and When You See Which)

navTitle: The Landscape
phase: 2 | phaseName: JavaScript You Must Know | num: 2.1
Content draft for review before wiring. Conceptual module (Phase 1 pattern). Spine: you cannot evaluate code in a language or framework you can't even place.

---

## Opening hook

You have almost certainly already shipped code in languages you could not name. You asked Claude for a feature, it produced files full of `const`, `import`, `useState`, `app.get`, and it worked, and you moved on. That is the magic-box trick, and it is exactly the thing this whole phase exists to take apart. Before you can read a single line and judge whether it is right, you need the one thing the magic box never gave you: a map. Not the syntax yet. The map. What is this stuff, what is each piece for, and when are you looking at which.

[EYEBROW: ORIENTATION]
## Why a map comes before the territory

Here is the trap the magic box sets. It is so good at producing working code that it lets you skip the question every competent developer answered years ago: what am I even working in? You can prompt your way to a running app without ever knowing that the thing handling the button click and the thing talking to the database are written in the same language but run in two completely different places. And that ignorance is invisible right up until something breaks, at which point you cannot even tell which half of the app the bug is in, because you never knew the app had halves.

So this module does something the rest of the phase depends on. It gives you the territory at a glance: the few technologies you will meet over and over, what each one is actually for, and how they fit together into the shape of a real application. Everything after this, reading scope, tracing async, evaluating a React component, slots into the map you build here. Skip the map and the later modules are just disconnected vocabulary. Build the map and they become a place you can navigate.

[EYEBROW: THE LANGUAGE]
## JavaScript: the language that runs almost everywhere

Start with the one that underlies all the rest. JavaScript is a programming language. That is the whole headline. It is the set of words and rules, `const`, `function`, `if`, `=>`, that the code is written in. When you see Claude produce a block of code with `const total = items.reduce(...)`, you are looking at JavaScript, the language.

The thing that makes JavaScript unusual, and the thing that confuses almost everyone at the start, is *where it runs*. For most of its life JavaScript ran in exactly one place: inside a web browser, making web pages interactive. Click a button, something happens; that was JavaScript, living in the browser. Then, in 2009, that changed, and the change is the reason your whole course exists in the shape it does. Someone took the JavaScript engine out of the browser and let it run directly on a computer, like any other program. That project is Node.js, and we will get to it in a second. The point for the map: **JavaScript is one language that now runs in two very different homes** — in the browser (where it makes the page interactive) and on the server (where it does the work behind the scenes). Same language, two homes. Hold onto that, because half the confusion in reading a full app comes from not knowing which home a given file lives in.

[CALLOUT info | label: THE ONE-LINE VERSION]
JavaScript is the language. It runs in two places: the browser (the page you see) and the server (the machine behind it). When you read JavaScript, your first orienting question is always: which home is this code in?

[EYEBROW: THE SERVER RUNTIME]
## Node.js: JavaScript with a job on the server

Node.js is JavaScript running on a server instead of in a browser. That is the entire idea, and it is smaller than the name makes it sound. "Node" is not a different language; it is the same JavaScript you just met, given a place to run that is not a web page and a set of powers a web page would never be allowed to have.

Think about what a browser deliberately will not let code do. Browser JavaScript cannot reach into your computer's files, cannot open a direct connection to a database, cannot read secret keys off the machine — because browser code comes from strangers on the internet and letting it do those things would be a catastrophe. Node.js code is different: it is *your* code, running on *your* server, so it is trusted with exactly the powers the browser forbids. Reading and writing files, talking to databases, holding secret credentials, listening for incoming requests from the internet. That is what server code does, and Node.js is what lets it do that work in JavaScript.

So when you see Claude write `const fs = require('fs')` and read a file, or `app.get('/users', ...)` and respond to a web request, you are looking at Node.js — JavaScript in its server home, doing server work. The reason this matters for evaluation: server code is where the consequences live. A bug in browser code makes a button look wrong. A bug in server code can leak data, corrupt a database, or expose a secret. Knowing you are in the server home tells you how high the stakes are.

[EYEBROW: THE UI LIBRARY]
## React: a tool for building what the user sees

React is a library for building user interfaces — the actual visual stuff a person looks at and clicks. It is not a language; it is a set of tools, written in JavaScript, for one specific job: building the screen.

Here is the cleanest way to place it. JavaScript is the language. React is a popular, widely-used *kit* written in that language for assembling interfaces out of reusable pieces called components. When you see Claude write something that looks like HTML mixed into JavaScript, with `<Button onClick={...}>` and `useState`, you are looking at React. It lives in the browser home (it builds the page the user sees), and it is built on top of JavaScript (it is JavaScript underneath, with a particular style and a particular set of rules layered on).

Why a whole library just for the screen? Because user interfaces are where complexity explodes. A screen has state (is the menu open, is the form valid, is the data still loading), and keeping what the user sees in sync with all that changing state, by hand, is where bugs breed. React exists to manage that. And, relevant to you: it is exactly the area where Claude is fast and confidently wrong most often, which is why Phase 4 is dedicated to reading it. For now, the map entry is enough: **React builds the screen; it lives in the browser; it is JavaScript underneath.**

[EYEBROW: THE TYPE LAYER]
## TypeScript: JavaScript with a safety rail bolted on

TypeScript is JavaScript plus a type layer. Same language, with extra annotations that say what kind of thing each value is supposed to be — this is a number, this is a string, this function takes a user and returns a boolean.

You do not need to write TypeScript to benefit from understanding it, and you definitely do not need to master it. What matters for the map: when you see `function greet(name: string): string`, the `: string` bits are TypeScript — added notes about the *types* of things. They exist as a verification tool. They let the computer catch a whole class of mistake (passing a number where a name was expected) before the code ever runs. For you, the evaluator, types are a gift: they are the code telling you what it promises, in writing. Reading them is reading the contract. Phase 2's TypeScript module is about reading that contract well enough to catch when Claude's code quietly violates it.

[CALLOUT truth | label: THE WHOLE MAP IN FOUR LINES]
JavaScript is the language. Node.js is that language running on the server, doing the heavy, high-stakes work. React is a kit for building the screen the user sees, running in the browser. TypeScript is JavaScript with type annotations that act as a built-in verification layer. Everything you read in this course is one of these four things.

[EYEBROW: HOW THEY FIT]
## The shape of a real application

Now assemble the pieces, because the map is most useful as one picture. A typical modern web application has two halves that talk to each other across the internet.

On one side is the **frontend** — what runs in the user's browser, the screen they see and touch. This is usually built with React, written in JavaScript (often TypeScript). When the user clicks "save," the frontend's job is to notice the click and send a message asking for the save to happen.

On the other side is the **backend** — what runs on a server you control, out of the user's sight. This is usually Node.js (often with a tool called Express, which Phase 3 covers), written in the same JavaScript. Its job is to receive that "save" message, do the real work — check the data, talk to the database, enforce the rules — and send an answer back.

Between them is a **database**, where the real information lives, which only the backend is allowed to touch.

So the flow of a single click is: the React frontend (browser) sends a request to the Node backend (server), which reads or writes the database and sends a response back, which the frontend then shows. That round trip is the heartbeat of nearly every app you will read. And notice the single most important line on the whole map: **the same JavaScript language spans both halves**, which is exactly why it is so easy to lose track of which half you are in. The map's payoff is that you never have to be lost again — frontend/browser/React on one side, backend/server/Node on the other, one language across both.

[DIAGRAM: full-stack-map — browser (React) on the left, server (Node/Express) in the middle, database on the right; arrows showing a request flowing browser→server→database and the response flowing back; a band underneath labeled "JavaScript — one language, both sides" and a thin layer labeled "TypeScript — optional type layer". This is the single most orienting diagram in the course.]

[EYEBROW: WHY THIS IS THE FIRST EVALUATION SKILL]
## Placing code is the first thing you can now do

Here is what the map buys you immediately, before you have learned a single piece of syntax. When Claude hands you a file, you can now ask, and answer, the orienting questions that every later evaluation skill builds on:

Which home is this in — browser or server? That tells you the stakes (a server bug is more dangerous) and what the code is even allowed to do (only server code touches the database or secrets). Is this frontend or backend work? That tells you which half of the app you are looking at and where a related bug might live. Is there a type layer? If you see `: string` and `interface`, you have a written contract to check the code against.

None of that requires reading the logic yet. It is pure placement, and placement is the first move of evaluation. A developer who can instantly say "this is backend Node code talking to the database, so the stakes are high and I should check the data handling carefully" is already doing something the magic-box user cannot: they have located the code on the map, which means they know what kind of scrutiny it deserves. That is the whole skill of this module, and every reading-literacy module after it sharpens scrutiny you can only apply once you can place what you are looking at.

[CALLOUT warning | label: THE TRAP THIS CLOSES]
The magic-box user reads every file the same way: as undifferentiated "code that Claude wrote." They cannot tell a cosmetic frontend tweak from a database operation that could corrupt production. Placing code on the map is what lets you match your scrutiny to the stakes — and refusing to place it is how people approve dangerous changes because they "looked fine."

[EYEBROW: HANDS ON]
## Floor test: place the code

You will be shown several short, real code snippets — the kind Claude produces constantly. For each, before revealing the answer, predict: is this browser (frontend/React) or server (backend/Node)? How can you tell? Look for the tells you just learned — does it touch the screen (`<div>`, `useState`, `onClick` → browser/React) or does it touch files, databases, requests, or secrets (`require('fs')`, `app.get`, `db.query` → server/Node)? Is there a type layer (`: string`, `interface` → TypeScript)?

[INTERACTIVE: prediction boxes + reveal for ~4 snippets, each a clear browser-vs-server specimen; no runner needed — this is a placement exercise, not an execution one. Include the personalization-agnostic framing. One snippet should be deliberately ambiguous-looking but resolvable by a single tell, to reward careful reading.]

The point is not speed. The point is that you can now look at code and *locate* it, which a week ago you could not. That is the first brick of evaluation, and everything else in this phase is laid on top of it.

[EYEBROW: CHECK YOURSELF]
## Quiz

[QUIZ: ~10-12 questions, hardened distractors per the design-doc standard. Coverage: what each of the four technologies is; where each runs (browser vs server); when you'd encounter which; how they relate (the request round-trip); which technology a given short snippet belongs to; why placement matters for evaluation/stakes. Distractors should be plausible confusions — e.g., "Node is a different language from JavaScript" (the most common beginner misconception), "React runs on the server," "TypeScript is unrelated to JavaScript" — not throwaways. Correct answers not reliably longest.]

## Closing consolidation

You came in able to operate the magic box and unable to say what it was building. You leave with the map: JavaScript the language, Node the server runtime, React the screen-builder, TypeScript the type layer, and the shape of the app that connects them. That map is not trivia. It is the thing that turns "code Claude wrote" into "backend Node code touching the database, which I should check carefully" — placement, the first move of evaluation. From here, Phase 2 teaches you to read the language itself, starting with the patterns Claude gets wrong most quietly. You now know where you are standing. Next, you learn to read what is in front of you.

[FORWARD TIE: every module in Phases 2-4 slots into this map. 2.2 starts reading the JavaScript language itself.]
