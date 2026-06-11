// foundations Part 4: JavaScript logic + closing tags
const fs = require('fs');
const out = 'C:/Projects/shipthatworks/foundations.html';

const js = `
// ── STATE ──
var sq = String.fromCharCode(39);
var panelOpen = false;
var panelTab = 'notes';
let completed = new Set(JSON.parse(localStorage.getItem('adf_done') || '[]'));
let passedQuizzes = new Set(JSON.parse(localStorage.getItem('adf_quizzes') || '[]'));
let bookmarks = new Set(JSON.parse(localStorage.getItem('adf_bookmarks') || '[]'));
let currentMod = null;
let quizState = {};
let notesTimer = null;

// ── PHASE BADGE COLORS ──
var PH_COLORS = [null,
  {bg:'#e8c547',fg:'#0f1117'},
  {bg:'#5b8ff9',fg:'#ffffff'},
  {bg:'#52c97a',fg:'#0f1117'},
  {bg:'#e05c5c',fg:'#ffffff'},
  {bg:'#a78bfa',fg:'#ffffff'},
  {bg:'#2dd4bf',fg:'#0f1117'}
];

// ── SEARCH INDEX ──
const SEARCH_IDX = MODULES.map(function(m) {
  return {
    id: m.id, num: m.num, title: m.title,
    text: (m.lead + ' ' + m.content).replace(/<[^>]+>/g,' ').toLowerCase()
  };
});

// ── PROGRESS ──
function updateProgress() {
  const n = completed.size;
  const total = MODULES.length;
  const pct = Math.round(n / total * 100);
  const el = function(id) { return document.getElementById(id); };
  if (el('sbFill')) el('sbFill').style.width = pct + '%';
  if (el('tbFill')) el('tbFill').style.width = pct + '%';
  if (el('sbStatsRow')) el('sbStatsRow').textContent = n + ' / ' + total + ' modules';
  if (el('tbPct')) el('tbPct').textContent = n + ' / ' + total;
  const cb = el('certBtn');
  if (cb) cb.style.display = n === total ? 'block' : 'none';
  localStorage.setItem('adf_done', JSON.stringify([...completed]));
  updateFooter();
}

// ── SIDEBAR FOOTER ──
function updateFooter() {
  const el = document.getElementById('sbFooter');
  if (!el) return;
  const n = completed.size;
  const total = MODULES.length;
  const pct = Math.round(n / total * 100);
  let minsDone = 0;
  [...completed].forEach(function(id) { const t = TIME_MAP[id]; if (t) minsDone += parseInt(t); });
  let minsTotal = 0;
  Object.values(TIME_MAP).forEach(function(t) { minsTotal += parseInt(t); });
  const minsLeft = minsTotal - minsDone;
  const h = Math.floor(minsLeft / 60);
  const m = minsLeft % 60;
  const timeStr = h > 0 ? '~' + h + 'h ' + (m > 0 ? m + 'm' : '') + ' remaining' : m + 'm remaining';
  el.innerHTML =
    '<div class="sb-ft-count">' + n + ' of ' + total + ' complete</div>' +
    '<div class="sb-ft-bar"><div class="sb-ft-fill" style="width:' + pct + '%"></div></div>' +
    '<div class="sb-ft-time">' + timeStr + '</div>';
}

// ── PHASE COLLAPSE ──
function isPhaseCollapsed(n) {
  const phases = JSON.parse(localStorage.getItem('adf_phases') || '{}');
  return phases[n] === true;
}
function togglePhase(n) {
  const sec = document.getElementById('ph-sec-' + n);
  if (!sec) return;
  sec.classList.toggle('collapsed');
  const phases = JSON.parse(localStorage.getItem('adf_phases') || '{}');
  phases[n] = sec.classList.contains('collapsed');
  localStorage.setItem('adf_phases', JSON.stringify(phases));
}

// ── BUILD SIDEBAR ──
function buildNavRow(m) {
  const active = currentMod === m.id ? ' active' : '';
  const done = completed.has(m.id);
  const isDone = done ? ' is-done' : '';
  const bmOn = bookmarks.has(m.id) ? ' on' : '';
  let chip = '';
  if (currentMod === m.id) {
    chip = '<span class="ni-chip in-prog">\u25cf In progress</span>';
  } else if (done) {
    chip = '<span class="ni-chip is-done">\u2713 Complete</span>';
  }
  return '<div class="nav-item' + active + isDone + '" id="ni-' + m.id + '" onclick="showModule(' + sq + m.id + sq + ')">' +
    '<div class="ni-line1"><span class="ni-num">' + m.num + '</span><span class="ni-title">' + m.title + '</span></div>' +
    '<div class="ni-line2"><span class="ni-dur">' + (TIME_MAP[m.id] || '') + '</span>' + chip +
    '<button class="ni-bm' + bmOn + '" onclick="toggleBookmark(' + sq + m.id + sq + ');event.stopPropagation()" title="Bookmark">&#9733;</button>' +
    '</div></div>';
}

function buildSidebar(container) {
  container = container || document.getElementById('sbNav');
  if (!container) return;
  let html = '';
  const bms = MODULES.filter(function(m) { return bookmarks.has(m.id); });
  if (bms.length) {
    html += '<div class="sb-bm-label">&#9733; Bookmarks</div>';
    bms.forEach(function(m) { html += buildNavRow(m); });
    html += '<div class="sb-bm-divider"></div>';
  }
  PHASE_META.forEach(function(pm) {
    const c = PH_COLORS[pm.n] || {bg:'#8b949e',fg:'#0f1117'};
    const mods = MODULES.filter(function(m) { return m.phase === pm.n; });
    const doneCount = mods.filter(function(m) { return completed.has(m.id); }).length;
    const collapsed = isPhaseCollapsed(pm.n) ? ' collapsed' : '';
    html += '<div class="ph-section' + collapsed + '" id="ph-sec-' + pm.n + '">';
    html += '<button class="ph-toggle" onclick="togglePhase(' + pm.n + ')">';
    html += '<span class="ph-badge" style="background:' + c.bg + ';color:' + c.fg + '">P' + pm.n + '</span>';
    html += '<span class="ph-name">' + pm.name + '</span>';
    html += '<span class="ph-count">' + doneCount + '/' + mods.length + '</span>';
    html += '<span class="ph-chevron">&#9660;</span>';
    html += '</button>';
    html += '<div class="ph-modules">';
    mods.forEach(function(m) { html += buildNavRow(m); });
    html += '</div></div>';
  });
  container.innerHTML = html;
}

// ── COURSE HOME ──
function buildHome() {
  const last = localStorage.getItem('adf_last');
  const resumeMod = last ? MODULES.find(function(m) { return m.id === last; }) : null;
  const nextMod = MODULES.find(function(m) { return !completed.has(m.id); });
  let html = '<div class="course-home">';
  html += '<div class="ch-eyebrow">// ai_dev_foundations.course</div>';
  html += '<h1 class="ch-title">From <em>Claude Code User</em><br>to Team Developer</h1>';
  html += '<p class="ch-sub">The literacy, patterns, and discipline that turn AI-assisted coding into professional-grade work others can build on.</p>';
  html += '<div class="ch-stats">';
  html += '<div><div class="chs-val">6<span>\u00d7</span></div><div class="chs-lbl">Phases</div></div>';
  html += '<div><div class="chs-val">18</div><div class="chs-lbl">Modules</div></div>';
  html += '<div><div class="chs-val">~<span>8</span>h</div><div class="chs-lbl">Duration</div></div>';
  html += '<div><div class="chs-val">' + completed.size + '</div><div class="chs-lbl">Completed</div></div>';
  html += '</div>';
  html += '<div class="ch-actions">';
  if (resumeMod) {
    html += '<button class="btn btn-primary" onclick="showModule(' + sq + resumeMod.id + sq + ')">Resume: ' + resumeMod.num + ' ' + resumeMod.title + '</button>';
  } else if (nextMod) {
    html += '<button class="btn btn-primary" onclick="showModule(' + sq + nextMod.id + sq + ')">Start Course \u2192</button>';
  }
  html += '<button class="btn btn-secondary" onclick="openSearch()">Search Modules</button>';
  html += '</div>';
  html += '<div class="phase-cards">';
  PHASE_META.forEach(function(pm) {
    const modsDone = pm.mods.filter(function(id) { return completed.has(id); }).length;
    html += '<div class="pc" onclick="showModule(' + sq + pm.mods[0] + sq + ')">';
    html += '<div class="pc-badge" style="background:' + pm.color + ';color:#0f1117">P' + pm.n + '</div>';
    html += '<div class="pc-body"><div class="pc-title">' + pm.name + '</div><div class="pc-desc">' + pm.desc + '</div>';
    html += '<div class="pc-mods">' + pm.mods.length + ' modules</div></div>';
    html += '<div class="pc-done">' + modsDone + '/' + pm.mods.length + '</div>';
    html += '</div>';
  });
  html += '</div></div>';
  document.getElementById('homeView').innerHTML = html;
}

// ── MODULE VIEW ──
function showModule(id) {
  const mod = MODULES.find(function(m) { return m.id === id; });
  if (!mod) return;
  currentMod = id;
  localStorage.setItem('adf_last', id);
  document.getElementById('homeView').style.display = 'none';
  const mv = document.getElementById('modView');
  mv.style.display = 'block';
  const pm = PHASE_META.find(function(p) { return p.n === mod.phase; });
  const phaseColor = pm ? pm.color : 'var(--accent)';
  const modIdx = MODULES.findIndex(function(m) { return m.id === id; });
  const prevMod = modIdx > 0 ? MODULES[modIdx - 1] : null;
  const nextMod = modIdx < MODULES.length - 1 ? MODULES[modIdx + 1] : null;
  const isDone = completed.has(id);
  mv.innerHTML =
    '<div class="mod-bc">' +
      '<a onclick="goHome()">All Courses</a>' +
      '<span class="bc-sep">/</span>' +
      '<a onclick="goHome()">AI Dev Foundations</a>' +
      '<span class="bc-sep">/</span>' +
      '<span class="bc-cur">' + mod.num + ' ' + mod.title + '</span>' +
    '</div>' +
    '<div class="audio-shell"><div class="audio-inner">' +
      '<div class="audio-play">\u25b6</div>' +
      '<div class="audio-bar"></div>' +
      '<span class="audio-time">0:00 / ' + (TIME_MAP[id] || '0:00') + '</span>' +
      '<span class="audio-lbl">Audio coming soon</span>' +
    '</div></div>' +
    '<div class="lesson-pane">' +
      '<div class="mod-eyebrow"><span class="ptag" style="background:' + phaseColor + ';color:#0f1117">Phase ' + mod.phase + '</span><span class="mnum">' + mod.num + '</span></div>' +
      '<h2>' + mod.title + '</h2>' +
      '<p class="mod-lead">' + mod.lead + '</p>' +
      mod.content +
      buildQuizSection(id) +
    '</div>' +
    '<div class="mod-footer">' +
      (prevMod ? '<button class="btn btn-secondary" onclick="showModule(' + sq + prevMod.id + sq + ')">\u2190 ' + prevMod.num + '</button>' : '') +
      (nextMod ? '<button class="btn btn-primary" onclick="showModule(' + sq + nextMod.id + sq + ')">Next: ' + nextMod.num + ' \u2192</button>' : '') +
      '<button class="btn btn-complete' + (isDone ? ' done' : '') + '" id="cbtn-' + id + '" onclick="toggleComplete(' + sq + id + sq + ')">' +
        (isDone ? '\u2713 Complete' : 'Mark Complete') +
      '</button>' +
    '</div>';
  buildSidebar();
  updateFooter();
  scrollTop();
  if (panelOpen) loadPanelNotes(id);
  if (QB[id] && !quizState[id]) {
    setTimeout(function() { startQuiz(id); }, 100);
  }
}

function goHome() {
  currentMod = null;
  document.getElementById('homeView').style.display = 'block';
  document.getElementById('modView').style.display = 'none';
  buildHome();
  buildSidebar();
  scrollTop();
}

function scrollTop() {
  const main = document.getElementById('main');
  if (main) main.scrollTop = 0;
}

// ── PANEL ──
function togglePanel() {
  panelOpen = !panelOpen;
  const panel = document.getElementById('notesPanel');
  const toggle = document.getElementById('panelToggle');
  const ca = document.getElementById('contentArea');
  if (panel) panel.classList.toggle('open', panelOpen);
  if (toggle) toggle.classList.toggle('active', panelOpen);
  if (ca) ca.classList.toggle('panel-open', panelOpen);
  if (panelOpen && currentMod) loadPanelNotes(currentMod);
  savePanelState();
}

function switchPanelTab(tab) {
  panelTab = tab;
  ['notes','transcript'].forEach(function(t) {
    const btn = document.getElementById('panelTabBtn-' + t);
    const content = document.getElementById('panelContent-' + t);
    if (btn) btn.classList.toggle('active', t === tab);
    if (content) content.classList.toggle('hidden', t !== tab);
  });
  savePanelState();
}

function loadPanelNotes(id) {
  const ta = document.getElementById('panelNotesTa');
  const cnt = document.getElementById('panelNotesCount');
  if (!ta) return;
  const val = localStorage.getItem('adf_notes_' + id) || '';
  ta.value = val;
  if (cnt) cnt.textContent = val.length + ' chars';
}

function savePanelState() {
  localStorage.setItem('adf_panel', JSON.stringify({open: panelOpen, tab: panelTab}));
}

function initPanel() {
  const saved = JSON.parse(localStorage.getItem('adf_panel') || '{}');
  if (saved.tab) { panelTab = saved.tab; switchPanelTab(panelTab); }
  if (saved.open) togglePanel();
}

// ── QUIZ ENGINE ──
function buildQuizSection(modId) {
  if (!QB[modId]) return '';
  return '<div class="quiz-section">' +
    '<div class="quiz-lbl">Module Quiz</div>' +
    '<div class="quiz-wrap" id="qz-' + modId + '"><div class="quiz-prog">Loading\u2026</div></div>' +
  '</div>';
}

function startQuiz(modId) {
  const bank = QB[modId];
  if (!bank) return;
  const shuffled = bank.slice().sort(function() { return Math.random() - 0.5; }).slice(0, 4);
  const drawn = shuffled.map(function(q) {
    const opts = q.opts.slice();
    const correctText = opts[q.correct];
    for (let i = opts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = opts[i]; opts[i] = opts[j]; opts[j] = tmp;
    }
    return { q: q.q, opts: opts, correct: opts.indexOf(correctText), explanation: q.explanation };
  });
  quizState[modId] = { drawn: drawn, current: 0, answers: [] };
  renderQuizQ(modId);
}

function renderQuizQ(modId) {
  const state = quizState[modId];
  if (!state) return;
  const q = state.drawn[state.current];
  const wrap = document.getElementById('qz-' + modId);
  if (!wrap) return;
  const isLast = state.current === state.drawn.length - 1;
  let optsHtml = '';
  q.opts.forEach(function(opt, i) {
    optsHtml += '<div class="quiz-opt" id="qo-' + modId + '-' + i + '" onclick="answerQ(' + sq + modId + sq + ',' + i + ')">' + opt + '</div>';
  });
  wrap.innerHTML =
    '<div class="quiz-prog">Question ' + (state.current + 1) + ' of ' + state.drawn.length + '</div>' +
    '<div class="quiz-q-text">' + q.q + '</div>' +
    '<div class="quiz-opts" id="qopts-' + modId + '">' + optsHtml + '</div>' +
    '<div class="quiz-exp" id="qexp-' + modId + '"></div>' +
    '<button class="btn btn-primary quiz-next" id="qnxt-' + modId + '" style="display:none" onclick="nextQ(' + sq + modId + sq + ')">' +
      (isLast ? 'See Results' : 'Next Question \u2192') +
    '</button>';
}

function answerQ(modId, chosen) {
  const state = quizState[modId];
  if (!state) return;
  const q = state.drawn[state.current];
  const isCorrect = chosen === q.correct;
  q.opts.forEach(function(_, i) {
    const el = document.getElementById('qo-' + modId + '-' + i);
    if (!el) return;
    el.classList.add('locked');
    if (i === q.correct) el.classList.add('correct');
    else if (i === chosen) el.classList.add('wrong');
  });
  const exp = document.getElementById('qexp-' + modId);
  if (exp) {
    exp.textContent = (isCorrect ? '\u2713 ' : '\u2717 ') + q.explanation;
    exp.className = 'quiz-exp show ' + (isCorrect ? 'correct' : 'wrong');
  }
  state.answers.push({ chosen: chosen, correct: q.correct, isCorrect: isCorrect });
  setTimeout(function() {
    const btn = document.getElementById('qnxt-' + modId);
    if (btn) btn.style.display = 'inline-block';
  }, 600);
}

function nextQ(modId) {
  const state = quizState[modId];
  if (!state) return;
  state.current++;
  if (state.current >= state.drawn.length) showQuizResults(modId);
  else renderQuizQ(modId);
}

function showQuizResults(modId) {
  const state = quizState[modId];
  if (!state) return;
  const nCorrect = state.answers.filter(function(a) { return a.isCorrect; }).length;
  const passed = nCorrect >= 3;
  if (passed) {
    passedQuizzes.add(modId);
    localStorage.setItem('adf_quizzes', JSON.stringify([...passedQuizzes]));
  }
  const wrap = document.getElementById('qz-' + modId);
  if (!wrap) return;
  let reviewHtml = '';
  state.drawn.forEach(function(q, i) {
    const ans = state.answers[i];
    reviewHtml += '<div class="rv-item ' + (ans.isCorrect ? 'c' : 'w') + '">' +
      '<div class="rv-q">' + (ans.isCorrect ? '\u2713 ' : '\u2717 ') + q.q + '</div>' +
      (ans.isCorrect ? '' : '<div class="rv-ans">Your answer: ' + q.opts[ans.chosen] + '</div><div class="rv-correct">Correct: ' + q.opts[q.correct] + '</div>') +
      '<div class="rv-exp">' + q.explanation + '</div></div>';
  });
  wrap.innerHTML =
    '<div class="quiz-result">' +
      '<div class="qr-score ' + (passed ? 'pass' : 'fail') + '">' + nCorrect + '/4 ' + (passed ? '\u2713 PASS' : '\u2717 RETRY') + '</div>' +
      '<div class="qr-msg">' + (passed ? 'Quiz passed! You can mark this module complete.' : 'Need 3/4 to pass. Review and try again.') + '</div>' +
      '<div class="qr-review">' + reviewHtml + '</div>' +
      (!passed ? '<button class="btn btn-primary" onclick="startQuiz(' + sq + modId + sq + ')">Retry Quiz</button>' : '') +
    '</div>';
}

// ── COMPLETE ──
function toggleComplete(id) {
  if (completed.has(id)) completed.delete(id);
  else completed.add(id);
  updateProgress();
  buildSidebar();
  const btn = document.getElementById('cbtn-' + id);
  if (btn) {
    btn.textContent = completed.has(id) ? '\u2713 Complete' : 'Mark Complete';
    btn.classList.toggle('done', completed.has(id));
  }
  buildHome();
}

// ── BOOKMARKS ──
function toggleBookmark(id) {
  if (bookmarks.has(id)) bookmarks.delete(id);
  else bookmarks.add(id);
  localStorage.setItem('adf_bookmarks', JSON.stringify([...bookmarks]));
  buildSidebar();
}

// ── NOTES ──
function saveNotes(id) {
  const ta = document.getElementById('panelNotesTa');
  if (!ta) return;
  const val = ta.value;
  const cnt = document.getElementById('panelNotesCount');
  if (cnt) cnt.textContent = val.length + ' chars';
  clearTimeout(notesTimer);
  notesTimer = setTimeout(function() {
    localStorage.setItem('adf_notes_' + id, val);
    const saved = document.getElementById('panelSaved');
    if (saved) { saved.classList.add('show'); setTimeout(function() { saved.classList.remove('show'); }, 1500); }
  }, 500);
}

// ── SEARCH ──
function openSearch() {
  document.getElementById('searchOv').classList.add('show');
  setTimeout(function() { const el = document.getElementById('searchIn'); if (el) el.focus(); }, 50);
}
function closeSearch() {
  document.getElementById('searchOv').classList.remove('show');
  const el = document.getElementById('searchIn');
  if (el) el.value = '';
  const res = document.getElementById('searchRes');
  if (res) res.innerHTML = '';
}
function runSearch(q) {
  const res = document.getElementById('searchRes');
  if (!res) return;
  if (!q.trim()) { res.innerHTML = ''; return; }
  const lower = q.toLowerCase();
  const hits = SEARCH_IDX.filter(function(m) { return m.title.toLowerCase().indexOf(lower) >= 0 || m.text.indexOf(lower) >= 0; }).slice(0, 8);
  if (!hits.length) { res.innerHTML = '<div class="s-empty">No results for "' + q + '"</div>'; return; }
  let html = '';
  hits.forEach(function(h) {
    const si = h.text.indexOf(lower);
    const snip = si >= 0 ? '\u2026' + h.text.slice(Math.max(0, si - 30), si + 60) + '\u2026' : '';
    html += '<div class="s-hit" onclick="closeSearch();showModule(' + sq + h.id + sq + ')">' +
      '<div class="sh-num">' + h.num + '</div>' +
      '<div><div class="sh-title">' + h.title + '</div>' +
      (snip ? '<div class="sh-snip">' + snip + '</div>' : '') +
      '</div></div>';
  });
  res.innerHTML = html;
}

// ── CERTIFICATE ──
function showCert() { document.getElementById('certOv').classList.add('show'); }
function closeCert() { document.getElementById('certOv').classList.remove('show'); }
function printCert() {
  const name = document.getElementById('certName').value.trim() || 'Student';
  const el = document.getElementById('certRecipient');
  if (el) el.textContent = name;
  closeCert();
  setTimeout(function() { window.print(); }, 100);
}

// ── CODE COPY ──
function copyCode(btn) {
  const pre = btn.closest('.code-block').querySelector('pre');
  if (!pre) return;
  navigator.clipboard.writeText(pre.textContent).then(function() {
    btn.textContent = '\u2713 copied';
    setTimeout(function() { btn.textContent = 'copy'; }, 2000);
  }).catch(function() {});
}

// ── MOBILE NAV ──
function openMob() {
  const d = document.getElementById('mobDraw');
  const o = document.getElementById('mobOv');
  if (!d) return;
  const topEl = document.querySelector('.sb-top');
  const topClone = topEl ? topEl.cloneNode(true) : document.createElement('div');
  d.innerHTML = '';
  d.appendChild(topClone);
  const navDiv = document.createElement('div');
  navDiv.className = 'sb-nav';
  d.appendChild(navDiv);
  buildSidebar(navDiv);
  d.classList.add('show');
  if (o) o.classList.add('show');
}
function closeMob() {
  const d = document.getElementById('mobDraw');
  const o = document.getElementById('mobOv');
  if (d) d.classList.remove('show');
  if (o) o.classList.remove('show');
}

// ── KEYBOARD NAV ──
document.addEventListener('keydown', function(e) {
  if (document.activeElement && (document.activeElement.tagName === 'TEXTAREA' || document.activeElement.tagName === 'INPUT')) return;
  if (e.key === '/') { e.preventDefault(); openSearch(); return; }
  if (e.key === 'Escape') { closeSearch(); closeCert(); if (panelOpen) togglePanel(); return; }
  if (!currentMod) return;
  const idx = MODULES.findIndex(function(m) { return m.id === currentMod; });
  if (e.key === 'ArrowRight' && idx < MODULES.length - 1) showModule(MODULES[idx + 1].id);
  if (e.key === 'ArrowLeft' && idx > 0) showModule(MODULES[idx - 1].id);
});

// ── INIT ──
updateProgress();
buildSidebar();
buildHome();
initPanel();
`;

const closing = `
</script>
</body>
</html>`;

fs.appendFileSync(out, js + closing);
console.log('Part 4 done:', (js + closing).length, 'chars');

const stats = fs.statSync(out);
console.log('Total file size:', stats.size, 'bytes', Math.round(stats.size/1024), 'KB');
