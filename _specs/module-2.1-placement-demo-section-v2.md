# Module 2.1 — Addition v2: Heavily-Annotated Placement Demonstration

Drop-in content for module 2.1 (p2m0). Insert INSIDE/before the "Placing code is the first thing you can now do" section. This is the FLOOR of the scaffolding gradient: maximum annotation, nothing hidden, worked-example-first (placement has no surprise payload, so model it fully before the learner tries). Code blocks STACKED full width, never two columns.

================ NEW CONTENT ================

[EYEBROW: SEE IT BEFORE YOU DO IT]
## Two files, fully labeled: watch the placement happen

You do not need to be fluent in JavaScript to do this. Below are two real files. Every single tell is labeled, on purpose. This is the one place in the course where nothing is hidden: watch how each file gets placed, and the move becomes yours. Later, you will do this with no labels at all. Right now, read the labels.

This first file is FRONTEND code. It runs in the browser, building the screen the user sees. Read the comment on each line that matters.

```javascript
import { useState } from 'react';
//                         ^^^^^ TELL: the word 'react'. React builds the
//                               screen. Seeing 'react' = this is a browser file.

function LikeButton() {
  const [liked, setLiked] = useState(false);
  //                        ^^^^^^^^ TELL: useState tracks something ON the
  //                                 screen (is the button liked?). Screen-state
  //                                 = browser.

  return (
    <button onClick={() => setLiked(true)}>
  // ^^^^^^ ^^^^^^^ TELL: a <button> with onClick. This line literally builds
  //               and reacts to what the user sees. There is nothing more
  //               "browser" than drawing a button.
      {liked ? 'Liked!' : 'Like'}
    </button>
  );
}
```

This is frontend code: it runs in the browser. Three tells point the same way: `react`, `useState`, and the `<button onClick>`. Each one is about building or reacting to the screen, and nothing builds the screen except browser code. You reached that conclusion from the tells alone, without working out what the code does. That is the skill: read the signals, not the logic.

This second file is BACKEND code. It runs on the server, doing work the user never sees. Again, every tell is labeled.

```javascript
const express = require('express');
//              ^^^^^^^ ^^^^^^^^^ TELL: require + express. Express is a server
//                                framework that runs in Node. Server file.
const db = require('./db');

app.get('/users/:id', async (req, res) => {
// ^^^^^^^ TELL: app.get handles an incoming web REQUEST on the server. The
//         browser sends requests; the server answers them. This is the answerer.
  const user = await db.query(
  //                 ^^^^^^^^ TELL: db.query talks DIRECTLY to the database.
  //                          This is the loudest tell of all: the browser is
  //                          forbidden from touching the database. Only server
  //                          code can. So this MUST be a server file.
    'SELECT * FROM users WHERE id = $1',
    [req.params.id]
  );
  res.json(user);
  // ^^^^^^^^ TELL: res.json sends a response BACK to the browser. Answering a
  //          request is server work.
});
```

This is backend code: it runs on the server. Four tells point the same way: `require`, `app.get`, `db.query`, and `res.json`. And one settles it on its own: `db.query` talks to the database, which browser code is never allowed to do, so this can only be server code. Again, you placed it from the tells, without reading the logic.

[CALLOUT truth | label: THE WHOLE MOVE, FULLY SHOWN]
Screen-words mean browser: react, useState, onClick, JSX tags like &lt;button&gt;. Data-words mean server: require, app.get, db.query, res.json. You just watched two real files get placed by their tells alone, with no logic read and nothing hidden. Notice how heavily labeled this was. That is on purpose, and it will not last: the floor test below gives you fresh files with NO labels, and asks you to call it yourself. The training wheels come off one module at a time. Right now, they are fully on, and that is exactly right.

================ END NEW CONTENT ================

WIRING NOTES:
- Insert as the opening of (or immediately before) the existing "Placing code is the first thing you can now do" section in module p2m0.
- Two code blocks STACKED full width via existing .code-block. NOT two columns.
- The ^^^^ caret-annotations are part of the code text (plain monospace), so they render correctly with no special handling. Do not convert them to spans.
- Escape &lt;button&gt; in the prose/callout (it is in prose; inside the code block < renders fine).
- Additive to already-wired p2m0; does not change id, quiz, or completion.
