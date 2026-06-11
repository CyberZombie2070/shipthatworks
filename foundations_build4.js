// foundations Part 4: JavaScript logic + closing tags
const fs = require('fs');
const out = 'C:/Projects/shipthatworks/foundations.html';

const js = `
// ── STATE ──
var sq = String.fromCharCode(39);
var panelOpen = false;
var panelTab = 'notes';
var completed = new Set(JSON.parse(localStorage.getItem('adf_done') || '[]'));
var passedQuizzes = new Set(JSON.parse(localStorage.getItem('adf_quizzes') || '[]'));
var bookmarks = new Set(JSON.parse(localStorage.getItem('adf_bookmarks') || '[]'));
var currentMod = null;
var quizState = {};
var notesTimer = null;

// ── SCALE ──
function applyScaleOffset(offset) {
  offset = parseInt(offset, 10);
  if (isNaN(offset) || offset < -25 || offset > 25) offset = 0;
  document.documentElement.style.fontSize = (18 * (1 + (offset / 100))) + 'px';
  localStorage.setItem('ui_scale_offset', offset);
  var lbl = document.getElementById('settingsScaleLbl');
  if (lbl) lbl.textContent = offset === 0 ? '0' : (offset > 0 ? '+' + offset + '%' : offset + '%');
  var sl = document.getElementById('settingsScaleSlider');
  if (sl) sl.value = offset;
}
function initScaleOffset() {
  var offset = parseInt(localStorage.getItem('ui_scale_offset') || '0', 10);
  if (isNaN(offset) || offset < -25 || offset > 25) offset = 0;
  document.documentElement.style.fontSize = (18 * (1 + (offset / 100))) + 'px';
  var lbl = document.getElementById('settingsScaleLbl');
  if (lbl) lbl.textContent = offset === 0 ? '0' : (offset > 0 ? '+' + offset + '%' : offset + '%');
  var sl = document.getElementById('settingsScaleSlider');
  if (sl) sl.value = offset;
}

// ── SETTINGS ──
var settingsOpen = false;
function toggleSettings() {
  settingsOpen = !settingsOpen;
  var dd = document.getElementById('settingsDd');
  if (dd) dd.classList.toggle('open', settingsOpen);
}
function closeSettings() {
  settingsOpen = false;
  var dd = document.getElementById('settingsDd');
  if (dd) dd.classList.remove('open');
}
function resetScale() { applyScaleOffset(0); }
document.addEventListener('click', function(e) {
  if (!settingsOpen) return;
  var wrap = document.getElementById('settingsDd');
  var btn = document.getElementById('cogBtn');
  if (wrap && !wrap.contains(e.target) && btn && !btn.contains(e.target)) closeSettings();
});

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
var SEARCH_IDX = MODULES.map(function(m) {
  return {
    id: m.id, num: m.num, title: m.title,
    text: (m.lead + ' ' + m.content).replace(/<[^>]+>/g,' ').toLowerCase()
  };
});

// ── PROGRESS ──
function updateProgress() {
  var n = completed.size;
  var total = MODULES.length;
  var pct = total > 0 ? Math.round(n / total * 100) : 0;
  var sbFill = document.getElementById('sbFill');
  var tbFill = document.getElementById('tbFill');
  var sbStatsRow = document.getElementById('sbStatsRow');
  var tbPct = document.getElementById('tbPct');
  var certBtn = document.getElementById('certBtn');
  if (sbFill) sbFill.style.width = pct + '%';
  if (tbFill) tbFill.style.width = pct + '%';
  if (sbStatsRow) sbStatsRow.textContent = n + ' / ' + total + ' modules';
  if (tbPct) tbPct.textContent = n + ' / ' + total;
  if (certBtn) certBtn.style.display = n === total ? 'block' : 'none';
  localStorage.setItem('adf_done', JSON.stringify(Array.from(completed)));
}

// ── RESET ──
function showResetConfirm() {
  var el = document.getElementById('settingsResetArea');
  if (!el) return;
  el.innerHTML =
    '<div class="settings-rc-confirm">Reset all progress for this course?<br>This cannot be undone.</div>' +
    '<div class="settings-rc-btns">' +
      '<button class="settings-rc-btn" onclick="cancelReset()">Cancel</button>' +
      '<button class="settings-rc-btn danger" onclick="doReset()">Yes, reset</button>' +
    '</div>';
}
function cancelReset() {
  var el = document.getElementById('settingsResetArea');
  if (el) el.innerHTML = '<button class="settings-danger-link" onclick="showResetConfirm()">Reset course progress</button>';
}
function doReset() {
  localStorage.removeItem('adf_done');
  localStorage.removeItem('adf_quizzes');
  localStorage.removeItem('adf_panel');
  localStorage.removeItem('adf_last');
  localStorage.removeItem('adf_phases');
  localStorage.removeItem('adf_bookmarks');
  Object.keys(localStorage).filter(function(k) { return k.indexOf('adf_notes_') === 0; }).forEach(function(k) { localStorage.removeItem(k); });
  location.reload();
}

// ── PHASE COLLAPSE ──
function isPhaseCollapsed(n) {
  var phases = JSON.parse(localStorage.getItem('adf_phases') || '{}');
  return phases[n] === true;
}
function togglePhase(n) {
  var sec = document.getElementById('ph-sec-' + n);
  if (!sec) return;
  sec.classList.toggle('collapsed');
  var phases = JSON.parse(localStorage.getItem('adf_phases') || '{}');
  phases[n] = sec.classList.contains('collapsed');
  localStorage.setItem('adf_phases', JSON.stringify(phases));
}

// ── BUILD SIDEBAR ──
function buildNavRow(m) {
  var active = currentMod === m.id ? ' active' : '';
  var done = completed.has(m.id);
  var isDoneClass = done ? ' is-done' : '';
  var bmOn = bookmarks.has(m.id) ? ' on' : '';
  var chip = '';
  if (currentMod === m.id) {
    chip = '<span class="ni-chip in-prog">\u25cf In progress</span>';
  } else if (done) {
    chip = '<span class="ni-chip is-done">\u2713 Complete</span>';
  }
  return '<div class="nav-item' + active + isDoneClass + '" id="ni-' + m.id + '" onclick="showModule(' + sq + m.id + sq + ')">' +
    '<div class="ni-line1"><span class="ni-num">' + m.num + '</span><span class="ni-title">' + m.title + '</span></div>' +
    '<div class="ni-line2"><span class="ni-dur">' + (TIME_MAP[m.id] || '') + '</span>' + chip +
    '<button class="ni-bm' + bmOn + '" onclick="toggleBookmark(' + sq + m.id + sq + ');event.stopPropagation()" title="Bookmark">&#9733;</button>' +
    '</div></div>';
}

function buildSidebar(container) {
  container = container || document.getElementById('sbNav');
  if (!container) return;
  var html = '';
  var bms = MODULES.filter(function(m) { return bookmarks.has(m.id); });
  if (bms.length) {
    html += '<div class="sb-bm-label">&#9733; Bookmarks</div>';
    bms.forEach(function(m) { html += buildNavRow(m); });
    html += '<div class="sb-bm-divider"></div>';
  }
  PHASE_META.forEach(function(pm) {
    var c = PH_COLORS[pm.n] || {bg:'#8b949e',fg:'#0f1117'};
    var mods = MODULES.filter(function(m) { return m.phase === pm.n; });
    var doneCount = mods.filter(function(m) { return completed.has(m.id); }).length;
    var collapsed = isPhaseCollapsed(pm.n) ? ' collapsed' : '';
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

// ── PHASE GLOW ──
function checkPhaseGlow(modId) {
  var mod = MODULES.find(function(m) { return m.id === modId; });
  if (!mod || !completed.has(modId)) return;
  var phaseMods = MODULES.filter(function(m) { return m.phase === mod.phase; });
  var allDone = phaseMods.every(function(m) { return completed.has(m.id); });
  if (allDone) {
    var sec = document.getElementById('ph-sec-' + mod.phase);
    if (sec) {
      sec.classList.remove('phase-complete-glow');
      void sec.offsetWidth;
      sec.classList.add('phase-complete-glow');
      setTimeout(function() { sec.classList.remove('phase-complete-glow'); }, 1500);
    }
  }
}

// ── COURSE HOME ──
function buildHome() {
  var last = localStorage.getItem('adf_last');
  var resumeMod = last ? MODULES.find(function(m) { return m.id === last; }) : null;
  var nextMod = MODULES.find(function(m) { return !completed.has(m.id); });
  var html = '<div class="course-home">';
  html += '<div class="ch-eyebrow">// ai_dev_foundations.course</div>';
  html += '<h1 class="ch-title">From <em>Claude Code User</em><br>to Team Developer</h1>';
  html += '<p class="ch-sub">The literacy, patterns, and discipline that turn AI-assisted coding into professional-grade work others can build on.</p>';
  var minsTotal = 0;
  Object.values(TIME_MAP).forEach(function(t) { minsTotal += parseInt(t, 10); });
  var minsDone = 0;
  Array.from(completed).forEach(function(id) { var t = TIME_MAP[id]; if (t) minsDone += parseInt(t, 10); });
  var minsLeft = minsTotal - minsDone;
  var hLeft = Math.floor(minsLeft / 60);
  var mLeft = minsLeft % 60;
  var remainStr = hLeft > 0 ? '~' + hLeft + 'h' + (mLeft > 0 ? '\u00a0' + mLeft + 'm' : '') : mLeft + 'm';
  html += '<div class="ch-stats">';
  html += '<div><div class="chs-val">6<span>\u00d7</span></div><div class="chs-lbl">Phases</div></div>';
  html += '<div><div class="chs-val">18</div><div class="chs-lbl">Modules</div></div>';
  html += '<div><div class="chs-val">~<span>8</span>h</div><div class="chs-lbl">Duration</div></div>';
  html += '<div><div class="chs-val">' + completed.size + '</div><div class="chs-lbl">Completed</div></div>';
  html += '<div><div class="chs-val">' + remainStr + '</div><div class="chs-lbl">Remaining</div></div>';
  html += '</div>';
  html += '<div class="ch-resume">';
  var hasProgress = resumeMod || completed.size > 0;
  if (hasProgress) {
    var tgtMod = resumeMod || nextMod;
    if (tgtMod) {
      var tgtPm = PHASE_META.find(function(p) { return p.n === tgtMod.phase; });
      var phTotal = tgtPm ? tgtPm.mods.length : 0;
      var phDone = tgtPm ? tgtPm.mods.filter(function(id) { return completed.has(id); }).length : 0;
      var tgtLabel = resumeMod ? 'Continue: ' + tgtMod.title + ' \u2192' : 'Start Course \u2192';
      html += '<button class="resume-btn" onclick="showModule(' + sq + tgtMod.id + sq + ')">' + tgtLabel + '</button>';
      html += '<div class="resume-btn-meta">Module ' + tgtMod.num + ' \u00b7 Phase ' + tgtMod.phase + ': ' + (tgtPm ? tgtPm.name : '') + ' \u00b7 ' + phDone + ' of ' + phTotal + ' complete</div>';
    }
  } else if (nextMod) {
    html += '<button class="resume-btn-ghost" onclick="showModule(' + sq + nextMod.id + sq + ')">Start Course \u2192</button>';
  }
  html += '</div>';
  html += '<div class="ch-actions"><button class="btn btn-secondary" onclick="openSearch()">Search Modules</button></div>';
  html += '<div class="phase-cards">';
  PHASE_META.forEach(function(pm) {
    var c = PH_COLORS[pm.n] || {bg:'var(--accent)',fg:'#0f1117'};
    var modsDone = pm.mods.filter(function(id) { return completed.has(id); }).length;
    html += '<div class="pc" onclick="showModule(' + sq + pm.mods[0] + sq + ')">';
    html += '<div class="pc-badge" style="background:' + c.bg + ';color:' + c.fg + '">P' + pm.n + '</div>';
    html += '<div class="pc-body"><div class="pc-title">' + pm.name + '</div><div class="pc-desc">' + pm.desc + '</div>';
    html += '<div class="pc-mods">' + pm.mods.length + ' modules &mdash; ' + modsDone + '/' + pm.mods.length + ' done</div></div>';
    html += '</div>';
  });
  html += '</div></div>';
  var hv = document.getElementById('homeView');
  if (hv) hv.innerHTML = html;
}

// ── MODULE VIEW ──
function showModule(id) {
  var mod = MODULES.find(function(m) { return m.id === id; });
  if (!mod) return;
  currentMod = id;
  localStorage.setItem('adf_last', id);
  var homeView = document.getElementById('homeView');
  if (homeView) homeView.style.display = 'none';
  var mv = document.getElementById('modView');
  if (!mv) return;
  mv.style.display = 'block';
  var pm = PHASE_META.find(function(p) { return p.n === mod.phase; });
  var c = pm && PH_COLORS[pm.n] ? PH_COLORS[pm.n] : {bg:'var(--accent)',fg:'#0f1117'};
  var phaseColor = c.bg;
  var modIdx = MODULES.findIndex(function(m) { return m.id === id; });
  var prevMod = modIdx > 0 ? MODULES[modIdx - 1] : null;
  var nextMod = modIdx < MODULES.length - 1 ? MODULES[modIdx + 1] : null;
  var isDone = completed.has(id);
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
      '<div class="mod-eyebrow"><span class="ptag" style="background:' + phaseColor + ';color:' + c.fg + '">Phase ' + mod.phase + '</span><span class="mnum">' + mod.num + '</span></div>' +
      '<h2>' + mod.title + '</h2>' +
      '<p class="mod-lead">' + mod.lead + '</p>' +
      mod.content +
      buildQuizSection(id) +
    '</div>' +
    '<div class="mod-footer" id="mod-footer-' + id + '"' + (QB[id] ? ' style="display:none"' : '') + '>' +
      (prevMod ? '<button class="btn btn-secondary" onclick="showModule(' + sq + prevMod.id + sq + ')">\u2190 ' + prevMod.num + '</button>' : '') +
      (nextMod ? '<button class="btn btn-primary" onclick="showModule(' + sq + nextMod.id + sq + ')">Next: ' + nextMod.num + ' \u2192</button>' : '') +
      '<button class="btn btn-complete' + (isDone ? ' done' : '') + '" id="cbtn-' + id + '" onclick="toggleComplete(' + sq + id + sq + ')">' +
        (isDone ? '\u2713 Complete' : 'Mark Complete') +
      '</button>' +
    '</div>';
  buildSidebar();
  scrollTop();
  if (panelOpen) loadPanelNotes(id);
  if (QB[id] && !quizState[id]) {
    setTimeout(function() { startQuiz(id); }, 100);
  }
}

function goHome() {
  currentMod = null;
  var homeView = document.getElementById('homeView');
  var modView = document.getElementById('modView');
  if (homeView) homeView.style.display = 'block';
  if (modView) modView.style.display = 'none';
  buildHome();
  buildSidebar();
  scrollTop();
}

function scrollTop() {
  var main = document.getElementById('main');
  if (main) main.scrollTop = 0;
}

// ── PANEL ──
function togglePanel() {
  panelOpen = !panelOpen;
  var panel = document.getElementById('notesPanel');
  var toggle = document.getElementById('panelToggle');
  var ca = document.getElementById('contentArea');
  if (panel) panel.classList.toggle('open', panelOpen);
  if (toggle) toggle.classList.toggle('active', panelOpen);
  if (ca) ca.classList.toggle('panel-open', panelOpen);
  if (panelOpen && currentMod) loadPanelNotes(currentMod);
  savePanelState();
}

function switchPanelTab(tab) {
  panelTab = tab;
  ['notes','transcript'].forEach(function(t) {
    var btn = document.getElementById('panelTabBtn-' + t);
    var content = document.getElementById('panelContent-' + t);
    if (btn) btn.classList.toggle('active', t === tab);
    if (content) content.classList.toggle('hidden', t !== tab);
  });
  savePanelState();
}

function loadPanelNotes(id) {
  var ta = document.getElementById('panelNotesTa');
  var cnt = document.getElementById('panelNotesCount');
  if (!ta) return;
  var val = localStorage.getItem('adf_notes_' + id) || '';
  ta.value = val;
  if (cnt) cnt.textContent = val.length + ' chars';
}

function savePanelState() {
  localStorage.setItem('adf_panel', JSON.stringify({open: panelOpen, tab: panelTab}));
}

function initPanel() {
  var saved = JSON.parse(localStorage.getItem('adf_panel') || '{}');
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
  var bank = QB[modId];
  if (!bank) return;
  var shuffled = bank.slice().sort(function() { return Math.random() - 0.5; }).slice(0, 4);
  var drawn = shuffled.map(function(q) {
    var opts = q.opts.slice();
    var correctText = opts[q.correct];
    for (var i = opts.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = opts[i]; opts[i] = opts[j]; opts[j] = tmp;
    }
    return { q: q.q, opts: opts, correct: opts.indexOf(correctText), explanation: q.explanation };
  });
  quizState[modId] = { drawn: drawn, current: 0, answers: [] };
  renderQuizQ(modId);
}

function renderQuizQ(modId) {
  var state = quizState[modId];
  if (!state) return;
  var q = state.drawn[state.current];
  var wrap = document.getElementById('qz-' + modId);
  if (!wrap) return;
  var isLast = state.current === state.drawn.length - 1;
  var optsHtml = '';
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
  var state = quizState[modId];
  if (!state) return;
  var q = state.drawn[state.current];
  var isCorrect = chosen === q.correct;
  q.opts.forEach(function(_, i) {
    var el = document.getElementById('qo-' + modId + '-' + i);
    if (!el) return;
    el.classList.add('locked');
    if (i === q.correct) el.classList.add('correct');
    else if (i === chosen) el.classList.add('wrong');
  });
  var exp = document.getElementById('qexp-' + modId);
  if (exp) {
    exp.textContent = (isCorrect ? '\u2713 ' : '\u2717 ') + q.explanation;
    exp.className = 'quiz-exp show ' + (isCorrect ? 'correct' : 'wrong');
    setTimeout(function() {
      var main = document.getElementById('main');
      if (!main) return;
      var expRect = exp.getBoundingClientRect();
      var mainRect = main.getBoundingClientRect();
      if (expRect.bottom > mainRect.bottom - 16) {
        main.scrollBy({ top: expRect.bottom - mainRect.bottom + 16, behavior: 'smooth' });
      }
    }, 50);
    setTimeout(function() {
      var main = document.getElementById('main');
      var btn = document.getElementById('qnxt-' + modId);
      if (!main || !btn) return;
      var btnRect = btn.getBoundingClientRect();
      var mainRect = main.getBoundingClientRect();
      if (btnRect.bottom > mainRect.bottom - 16) {
        main.scrollBy({ top: btnRect.bottom - mainRect.bottom + 16, behavior: 'smooth' });
      }
    }, 700);
  }
  state.answers.push({ chosen: chosen, correct: q.correct, isCorrect: isCorrect });
  setTimeout(function() {
    var btn = document.getElementById('qnxt-' + modId);
    if (btn) btn.style.display = 'inline-block';
  }, 600);
}

function nextQ(modId) {
  var state = quizState[modId];
  if (!state) return;
  state.current++;
  if (state.current >= state.drawn.length) showQuizResults(modId);
  else renderQuizQ(modId);
}

function showQuizResults(modId) {
  var state = quizState[modId];
  if (!state) return;
  var nCorrect = state.answers.filter(function(a) { return a.isCorrect; }).length;
  var passed = nCorrect >= 3;
  if (passed) {
    passedQuizzes.add(modId);
    localStorage.setItem('adf_quizzes', JSON.stringify(Array.from(passedQuizzes)));
  }
  var wrap = document.getElementById('qz-' + modId);
  if (!wrap) return;
  var reviewHtml = '';
  state.drawn.forEach(function(q, i) {
    var ans = state.answers[i];
    reviewHtml += '<div class="rv-item ' + (ans.isCorrect ? 'c' : 'w') + '">' +
      '<div class="rv-q">' + (ans.isCorrect ? '\u2713 ' : '\u2717 ') + q.q + '</div>' +
      (ans.isCorrect ? '' : '<div class="rv-ans">Your answer: ' + q.opts[ans.chosen] + '</div><div class="rv-correct">Correct: ' + q.opts[q.correct] + '</div>') +
      '<div class="rv-exp">' + q.explanation + '</div></div>';
  });
  if (passed) {
    wrap.innerHTML =
      '<div class="quiz-result">' +
        '<div class="qr-score pass">' + nCorrect + '/4 \u2713 PASS</div>' +
        '<div class="qr-msg">Quiz passed! You can mark this module complete.</div>' +
        '<button class="btn btn-secondary" style="font-size:0.75rem;margin-bottom:0.75rem" onclick="toggleReview(' + sq + modId + sq + ')">Review Answers</button>' +
        '<div class="qr-review" id="qr-review-' + modId + '" style="display:none">' + reviewHtml + '</div>' +
      '</div>';
  } else {
    wrap.innerHTML =
      '<div class="quiz-result">' +
        '<div class="qr-score fail">' + nCorrect + '/4 \u2717 RETRY</div>' +
        '<div class="qr-msg">Need 3/4 to pass. Review and try again.</div>' +
        '<div class="qr-review">' + reviewHtml + '</div>' +
        '<button class="btn btn-primary" onclick="startQuiz(' + sq + modId + sq + ')">Retry Quiz</button>' +
      '</div>';
  }
  var footer = document.getElementById('mod-footer-' + modId);
  if (footer) footer.style.display = 'flex';
}

function toggleReview(modId) {
  var el = document.getElementById('qr-review-' + modId);
  if (!el) return;
  el.style.display = el.style.display === 'none' ? 'flex' : 'none';
}

// ── COMPLETE ──
function toggleComplete(id) {
  var done = JSON.parse(localStorage.getItem('adf_done') || '[]');
  if (completed.has(id)) {
    completed.delete(id);
    done = done.filter(function(d) { return d !== id; });
  } else {
    completed.add(id);
    if (!done.includes(id)) done.push(id);
  }
  localStorage.setItem('adf_done', JSON.stringify(done));
  updateProgress();
  buildSidebar();
  checkPhaseGlow(id);
  var btn = document.getElementById('cbtn-' + id);
  if (btn) {
    btn.textContent = completed.has(id) ? '\u2713 Complete' : 'Mark Complete';
    btn.classList.toggle('done', completed.has(id));
  }
}

// ── BOOKMARKS ──
function toggleBookmark(id) {
  if (bookmarks.has(id)) bookmarks.delete(id);
  else bookmarks.add(id);
  localStorage.setItem('adf_bookmarks', JSON.stringify(Array.from(bookmarks)));
  buildSidebar();
}

// ── NOTES ──
function saveNotes(id) {
  var ta = document.getElementById('panelNotesTa');
  if (!ta) return;
  var val = ta.value;
  var cnt = document.getElementById('panelNotesCount');
  if (cnt) cnt.textContent = val.length + ' chars';
  clearTimeout(notesTimer);
  notesTimer = setTimeout(function() {
    localStorage.setItem('adf_notes_' + id, val);
    var savedEl = document.getElementById('panelSaved');
    if (savedEl) { savedEl.classList.add('show'); setTimeout(function() { savedEl.classList.remove('show'); }, 1500); }
  }, 500);
}

// ── SEARCH ──
function openSearch() {
  var ov = document.getElementById('searchOv');
  if (ov) ov.classList.add('show');
  setTimeout(function() { var el = document.getElementById('searchIn'); if (el) el.focus(); }, 50);
}
function closeSearch() {
  var ov = document.getElementById('searchOv');
  if (ov) ov.classList.remove('show');
  var el = document.getElementById('searchIn');
  if (el) el.value = '';
  var res = document.getElementById('searchRes');
  if (res) res.innerHTML = '';
}
function runSearch(q) {
  var res = document.getElementById('searchRes');
  if (!res) return;
  if (!q.trim()) { res.innerHTML = ''; return; }
  var lower = q.toLowerCase();
  var hits = SEARCH_IDX.filter(function(m) { return m.title.toLowerCase().indexOf(lower) >= 0 || m.text.indexOf(lower) >= 0; }).slice(0, 8);
  if (!hits.length) { res.innerHTML = '<div class="s-empty">No results for "' + q + '"</div>'; return; }
  var html = '';
  hits.forEach(function(h) {
    var si = h.text.indexOf(lower);
    var snip = si >= 0 ? '\u2026' + h.text.slice(Math.max(0, si - 30), si + 60) + '\u2026' : '';
    html += '<div class="s-hit" onclick="closeSearch();showModule(' + sq + h.id + sq + ')">' +
      '<div class="sh-num">' + h.num + '</div>' +
      '<div><div class="sh-title">' + h.title + '</div>' +
      (snip ? '<div class="sh-snip">' + snip + '</div>' : '') +
      '</div></div>';
  });
  res.innerHTML = html;
}

// ── CERTIFICATE ──
function showCert() { var el = document.getElementById('certOv'); if (el) el.classList.add('show'); }
function closeCert() { var el = document.getElementById('certOv'); if (el) el.classList.remove('show'); }
function printCert() {
  var name = document.getElementById('certName');
  var nameVal = name ? name.value.trim() || 'Student' : 'Student';
  var el = document.getElementById('certRecipient');
  if (el) el.textContent = nameVal;
  var dateEl = document.getElementById('certDate');
  if (dateEl) dateEl.textContent = new Date().toLocaleDateString('en-US', {year:'numeric',month:'long',day:'numeric'});
  closeCert();
  setTimeout(function() { window.print(); }, 100);
}

// ── CODE COPY ──
function copyCode(btn) {
  var pre = btn.closest('.code-block').querySelector('pre');
  if (!pre) return;
  navigator.clipboard.writeText(pre.textContent).then(function() {
    btn.textContent = '\u2713 copied';
    setTimeout(function() { btn.textContent = 'copy'; }, 2000);
  }).catch(function() {});
}

// ── MOBILE NAV ──
function openMob() {
  var d = document.getElementById('mobDraw');
  var o = document.getElementById('mobOv');
  if (!d) return;
  var topEl = document.querySelector('.sb-top');
  var topClone = topEl ? topEl.cloneNode(true) : document.createElement('div');
  d.innerHTML = '';
  d.appendChild(topClone);
  var navDiv = document.createElement('div');
  navDiv.className = 'sb-nav';
  d.appendChild(navDiv);
  buildSidebar(navDiv);
  d.classList.add('show');
  if (o) o.classList.add('show');
}
function closeMob() {
  var d = document.getElementById('mobDraw');
  var o = document.getElementById('mobOv');
  if (d) d.classList.remove('show');
  if (o) o.classList.remove('show');
}

// ── KEYBOARD NAV ──
document.addEventListener('keydown', function(e) {
  if (document.activeElement && (document.activeElement.tagName === 'TEXTAREA' || document.activeElement.tagName === 'INPUT')) return;
  if (e.key === '/') { e.preventDefault(); openSearch(); return; }
  if (e.key === 'Escape') { closeSearch(); closeCert(); closeSettings(); if (panelOpen) togglePanel(); return; }
  if (!currentMod) return;
  var idx = MODULES.findIndex(function(m) { return m.id === currentMod; });
  if (e.key === 'ArrowRight' && idx < MODULES.length - 1) showModule(MODULES[idx + 1].id);
  if (e.key === 'ArrowLeft' && idx > 0) showModule(MODULES[idx - 1].id);
});

// ── INIT ──
initScaleOffset();
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
