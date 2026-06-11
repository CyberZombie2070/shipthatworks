// foundations Part 1: Write CSS + HTML structure (nav redesign + notes panel + rem units)
const fs = require('fs');
const out = 'C:/Projects/shipthatworks/foundations.html';

const css = `<style>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;700&display=swap');
:root{--bg:#0f1117;--surface:#161b22;--surface2:#1c2128;--border:#30363d;--border2:#444c56;--accent:#e8c547;--success:#3fb950;--danger:#f85149;--warn:#d29922;--info:#58a6ff;--text:#c9d1d9;--text-dim:#8b949e;--heading:#f0f6fc;}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{font-size:16px;scroll-behavior:smooth;}
body{background:var(--bg);color:var(--text);font-family:'Inter',sans-serif;font-size:0.9375rem;line-height:1.65;min-height:100vh;}
.shell{display:flex;min-height:100vh;}
.sidebar{width:16.75rem;min-width:16.75rem;background:var(--surface);border-right:1px solid var(--border);position:sticky;top:0;height:100vh;display:flex;flex-direction:column;flex-shrink:0;}
.sb-top{padding:0.875rem 0.875rem 0.625rem;border-bottom:1px solid var(--border);flex-shrink:0;}
.sb-back{display:inline-flex;align-items:center;gap:0.375rem;font-family:'JetBrains Mono',monospace;font-size:0.6875rem;color:var(--text-dim);text-decoration:none;margin-bottom:0.625rem;}
.sb-back:hover{color:var(--accent);}
.sb-title{font-family:'Space Grotesk',sans-serif;font-size:0.9375rem;font-weight:600;color:var(--heading);line-height:1.35;margin-bottom:0.5rem;}
.sb-prog-bar{height:0.25rem;background:var(--surface2);border-radius:0.125rem;overflow:hidden;}
.sb-prog-fill{height:100%;background:var(--accent);transition:width .4s ease;width:0%;}
.sb-stats-row{margin-top:0.3125rem;font-family:'JetBrains Mono',monospace;font-size:0.6875rem;color:var(--text-dim);}
.sb-nav{flex:1;overflow-y:auto;padding:0.25rem 0 0.5rem;}
.sb-bm-label{padding:0.5rem 1rem 0.1875rem;font-family:'JetBrains Mono',monospace;font-size:0.5625rem;color:var(--text-dim);letter-spacing:.15em;text-transform:uppercase;}
.sb-bm-divider{height:1px;background:var(--border);margin:0.375rem 0;}
.ph-section{border-top:1px solid var(--border);}
.ph-section:first-of-type{border-top:none;}
.ph-toggle{display:flex;align-items:center;gap:0.5rem;padding:0.625rem 0.875rem;cursor:pointer;width:100%;background:none;border:none;color:inherit;text-align:left;}
.ph-toggle:hover{background:rgba(255,255,255,.02);}
.ph-badge{width:1.25rem;height:1.25rem;min-width:1.25rem;border-radius:0.25rem;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:0.5rem;font-weight:700;}
.ph-name{font-family:'JetBrains Mono',monospace;font-size:0.5625rem;letter-spacing:.12em;text-transform:uppercase;color:var(--text-dim);flex:1;}
.ph-count{font-family:'JetBrains Mono',monospace;font-size:0.5rem;color:var(--text-dim);flex-shrink:0;}
.ph-chevron{font-size:0.625rem;color:var(--text-dim);flex-shrink:0;transition:transform .2s ease;display:inline-block;}
.ph-section.collapsed .ph-chevron{transform:rotate(180deg);}
.ph-section.collapsed .ph-modules{display:none;}
.nav-item{padding:0.5rem 0.875rem 0.5rem 0.75rem;cursor:pointer;border-left:3px solid transparent;transition:border-color .15s,background .15s;}
.nav-item:hover{background:rgba(255,255,255,.03);}
.nav-item:hover .ni-title{color:var(--heading);}
.nav-item.active{border-left-color:var(--accent);background:rgba(232,197,71,.08);}
.nav-item.active .ni-title{color:var(--heading);}
.nav-item.is-done .ni-title{color:var(--text-dim);}
.ni-line1{display:flex;align-items:flex-start;gap:0.375rem;margin-bottom:0.1875rem;}
.ni-line2{display:flex;align-items:center;gap:0.375rem;padding-left:1.625rem;}
.ni-num{font-family:'JetBrains Mono',monospace;font-size:0.5625rem;color:var(--text-dim);min-width:1.625rem;flex-shrink:0;padding-top:0.125rem;}
.ni-title{font-size:0.8125rem;color:var(--text);line-height:1.4;}
.ni-dur{font-family:'JetBrains Mono',monospace;font-size:0.5625rem;color:var(--text-dim);}
.ni-chip{font-family:'JetBrains Mono',monospace;font-size:0.5rem;display:inline-flex;align-items:center;gap:0.1875rem;}
.ni-chip.is-done{color:var(--success);}
.ni-chip.in-prog{color:var(--accent);}
.ni-bm{background:none;border:none;color:var(--text-dim);cursor:pointer;font-size:0.6875rem;padding:0.125rem 0.25rem;flex-shrink:0;line-height:1;opacity:.4;margin-left:auto;}
.ni-bm:hover,.ni-bm.on{color:var(--accent);opacity:1;}
.sb-footer{padding:0.75rem 1rem;border-top:1px solid var(--border);flex-shrink:0;}
.sb-ft-count{font-size:0.75rem;color:var(--text-dim);margin-bottom:0.375rem;}
.sb-ft-bar{height:0.25rem;background:var(--surface2);border-radius:0.125rem;overflow:hidden;margin-bottom:0.3125rem;}
.sb-ft-fill{height:100%;background:var(--accent);transition:width .4s ease;}
.sb-ft-time{font-family:'JetBrains Mono',monospace;font-size:0.6875rem;color:var(--text-dim);}
.content-area{flex:1;display:flex;flex-direction:column;min-width:0;overflow:hidden;transition:margin-right .25s ease-in-out;}
.content-area.panel-open{margin-right:20rem;}
.topbar{background:var(--surface);border-bottom:1px solid var(--border);padding:0 1.375rem;height:3.125rem;display:flex;align-items:center;gap:0.75rem;flex-shrink:0;position:sticky;top:0;z-index:50;}
.tb-logo{font-family:'JetBrains Mono',monospace;font-size:0.8125rem;font-weight:700;color:var(--accent);flex-shrink:0;}
.tb-div{width:1px;height:1.375rem;background:var(--border);flex-shrink:0;}
.tb-course{font-size:0.8125rem;font-weight:600;color:var(--heading);flex-shrink:0;white-space:nowrap;}
.tb-prog{flex:1;display:flex;align-items:center;gap:0.625rem;min-width:0;}
.tb-bar{flex:1;height:0.25rem;background:var(--surface2);border-radius:0.125rem;overflow:hidden;min-width:2.5rem;}
.tb-fill{height:100%;background:var(--accent);border-radius:0.125rem;transition:width .4s ease;width:0%;}
.tb-pct{font-family:'JetBrains Mono',monospace;font-size:0.6875rem;color:var(--text-dim);flex-shrink:0;white-space:nowrap;}
.tb-btn{background:none;border:1px solid var(--border);border-radius:0.3125rem;color:var(--text-dim);cursor:pointer;padding:0.25rem 0.5625rem;font-size:0.8125rem;flex-shrink:0;}
.tb-btn:hover{border-color:var(--accent);color:var(--accent);}
.tb-ham{display:none;background:none;border:1px solid var(--border);border-radius:0.3125rem;color:var(--text-dim);cursor:pointer;padding:0.25rem 0.5rem;font-size:0.875rem;}
.main{flex:1;overflow-y:auto;}
.course-home{padding:2.75rem 3.25rem;}
.ch-eyebrow{font-family:'JetBrains Mono',monospace;font-size:0.6875rem;color:var(--accent);letter-spacing:.2em;text-transform:uppercase;margin-bottom:0.875rem;}
.ch-title{font-size:2.125rem;font-weight:700;color:var(--heading);line-height:1.15;margin-bottom:0.875rem;}
.ch-title em{font-style:normal;color:var(--accent);}
.ch-sub{font-size:0.9375rem;color:var(--text-dim);max-width:32.5rem;line-height:1.7;margin-bottom:1.625rem;}
.ch-stats{display:flex;gap:1.625rem;margin-bottom:2.25rem;}
.chs-val{font-family:'JetBrains Mono',monospace;font-size:1.25rem;font-weight:700;color:var(--heading);}
.chs-val span{color:var(--accent);}
.chs-lbl{font-size:0.6875rem;color:var(--text-dim);text-transform:uppercase;letter-spacing:.07em;margin-top:0.125rem;}
.ch-actions{display:flex;gap:0.625rem;margin-bottom:2.75rem;flex-wrap:wrap;}
.phase-cards{display:grid;gap:0.875rem;}
.pc{background:var(--surface2);border:1px solid var(--border);border-radius:0.5rem;padding:1.125rem 1.25rem;display:flex;gap:0.875rem;align-items:flex-start;cursor:pointer;transition:border-color .15s;}
.pc:hover{border-color:var(--border2);}
.pc-badge{font-family:'JetBrains Mono',monospace;font-size:0.625rem;font-weight:700;padding:0.125rem 0.4375rem;border-radius:0.125rem;flex-shrink:0;margin-top:0.125rem;}
.pc-body{flex:1;min-width:0;}
.pc-title{font-size:0.875rem;font-weight:600;color:var(--heading);margin-bottom:0.1875rem;}
.pc-desc{font-size:0.75rem;color:var(--text-dim);line-height:1.5;}
.pc-mods{font-family:'JetBrains Mono',monospace;font-size:0.625rem;color:var(--text-dim);margin-top:0.375rem;}
.mod-view{display:none;}
.mod-bc{padding:0.75rem 3.25rem;font-family:'JetBrains Mono',monospace;font-size:0.6875rem;color:var(--text-dim);border-bottom:1px solid var(--border);display:flex;align-items:center;gap:0.375rem;}
.mod-bc a{color:var(--text-dim);text-decoration:none;cursor:pointer;}
.mod-bc a:hover{color:var(--accent);}
.bc-sep{color:var(--border2);}
.bc-cur{color:var(--text);}
.audio-shell{padding:0.625rem 3.25rem;border-bottom:1px solid var(--border);background:var(--surface2);}
.audio-inner{height:2.375rem;border:1px solid var(--border);border-radius:0.3125rem;display:flex;align-items:center;padding:0 0.875rem;gap:0.625rem;opacity:.4;cursor:not-allowed;background:var(--surface);}
.audio-play{width:1.625rem;height:1.625rem;border:1px solid var(--border2);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.5625rem;color:var(--text-dim);}
.audio-bar{flex:1;height:0.1875rem;background:var(--border);border-radius:0.125rem;}
.audio-time{font-family:'JetBrains Mono',monospace;font-size:0.625rem;color:var(--text-dim);}
.audio-lbl{font-family:'JetBrains Mono',monospace;font-size:0.5625rem;color:var(--text-dim);margin-left:auto;}
.lesson-pane{padding:2.25rem 3.25rem;}
.mod-eyebrow{display:flex;align-items:center;gap:0.625rem;margin-bottom:0.5rem;}
.ptag{font-family:'JetBrains Mono',monospace;font-size:0.625rem;color:var(--bg);background:var(--accent);padding:0.125rem 0.4375rem;border-radius:0.125rem;font-weight:700;}
.mnum{font-family:'JetBrains Mono',monospace;font-size:0.6875rem;color:var(--text-dim);}
.lesson-pane h2{font-size:1.5625rem;font-weight:700;color:var(--heading);margin-bottom:0.5rem;line-height:1.25;}
.mod-lead{font-size:0.9375rem;color:var(--text-dim);margin-bottom:1.75rem;max-width:37.5rem;line-height:1.7;}
h3{font-size:1.0625rem;font-weight:600;color:var(--heading);margin:1.625rem 0 0.625rem;}
p{margin-bottom:0.75rem;}
ul,ol{padding-left:1.25rem;margin-bottom:0.75rem;}
li{margin-bottom:0.375rem;font-size:0.875rem;color:var(--text);line-height:1.6;}
strong{color:var(--heading);font-weight:600;}
.callout{border-radius:0.375rem;padding:0.875rem 1.125rem;margin:1.25rem 0;border-left:3px solid;}
.callout.truth{background:rgba(63,185,80,.06);border-color:var(--success);}
.callout.warning{background:rgba(210,153,34,.07);border-color:var(--warn);}
.callout.danger{background:rgba(248,81,73,.07);border-color:var(--danger);}
.callout.info{background:rgba(88,166,255,.07);border-color:var(--info);}
.callout-label{font-family:'JetBrains Mono',monospace;font-size:0.625rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;margin-bottom:0.3125rem;}
.callout.truth .callout-label{color:var(--success);}
.callout.warning .callout-label{color:var(--warn);}
.callout.danger .callout-label{color:var(--danger);}
.callout.info .callout-label{color:var(--info);}
.callout p{font-size:0.875rem;color:var(--text);line-height:1.65;margin:0;}
.code-block{background:var(--surface);border:1px solid var(--border);border-radius:0.375rem;margin:1.125rem 0;overflow:hidden;}
.code-header{display:flex;align-items:center;justify-content:space-between;padding:0.5rem 0.875rem;border-bottom:1px solid var(--border);background:rgba(0,0,0,.2);}
.code-dots{display:flex;gap:0.3125rem;}
.code-dot{width:0.5rem;height:0.5rem;border-radius:50%;}
.code-dot:nth-child(1){background:var(--danger);opacity:.7;}
.code-dot:nth-child(2){background:var(--warn);opacity:.7;}
.code-dot:nth-child(3){background:var(--success);opacity:.7;}
.code-label{font-family:'JetBrains Mono',monospace;font-size:0.625rem;color:var(--text-dim);}
.copy-btn{background:none;border:1px solid var(--border);border-radius:0.1875rem;color:var(--text-dim);cursor:pointer;font-size:0.625rem;padding:0.125rem 0.4375rem;font-family:'JetBrains Mono',monospace;}
.copy-btn:hover{border-color:var(--accent);color:var(--accent);}
pre{padding:1rem;font-family:'JetBrains Mono',monospace;font-size:0.75rem;line-height:1.7;color:var(--text);overflow-x:auto;}
pre .comment{color:#8b949e;}pre .key{color:#79c0ff;}pre .val{color:var(--accent);}pre .str{color:#a5d6ff;}pre .cmd{color:var(--danger);}
.exercise{background:rgba(88,166,255,.06);border:1px solid rgba(88,166,255,.18);border-radius:0.375rem;padding:1rem 1.125rem;margin:1.125rem 0;}
.exercise-label{font-family:'JetBrains Mono',monospace;font-size:0.625rem;font-weight:700;color:var(--info);letter-spacing:.15em;text-transform:uppercase;margin-bottom:0.4375rem;}
.exercise h4{font-size:0.875rem;font-weight:600;color:var(--heading);margin-bottom:0.4375rem;}
.exercise p,.exercise li{font-size:0.8125rem;color:var(--text);line-height:1.65;}
.exercise ul,.exercise ol{padding-left:1rem;margin-top:0.4375rem;}
.tbl{width:100%;border-collapse:collapse;margin:1rem 0;font-size:0.8125rem;}
.tbl th{padding:0.5rem 0.75rem;text-align:left;font-family:'JetBrains Mono',monospace;font-size:0.5625rem;letter-spacing:.1em;text-transform:uppercase;color:var(--text-dim);border-bottom:1px solid var(--border);}
.tbl td{padding:0.5625rem 0.75rem;border-bottom:1px solid rgba(48,54,61,.4);vertical-align:top;line-height:1.5;color:var(--text);}
.tbl tr:last-child td{border-bottom:none;}
.compare-table{width:100%;border-collapse:collapse;margin:1.125rem 0;font-size:0.8125rem;}
.compare-table th{padding:0.5625rem 0.8125rem;text-align:left;font-family:'JetBrains Mono',monospace;font-size:0.5625rem;letter-spacing:.1em;text-transform:uppercase;border-bottom:1px solid var(--border);}
.compare-table th:first-child{color:var(--danger);}
.compare-table th:last-child{color:var(--success);}
.compare-table th:nth-child(2){color:var(--text-dim);width:18%;}
.compare-table td{padding:0.5625rem 0.8125rem;border-bottom:1px solid rgba(48,54,61,.4);vertical-align:top;line-height:1.5;}
.compare-table tr:last-child td{border-bottom:none;}
.compare-table td:first-child{color:var(--text-dim);}
.compare-table td:last-child{color:var(--text);}
.compare-table td:nth-child(2){color:var(--text-dim);font-family:'JetBrains Mono',monospace;font-size:0.625rem;text-align:center;}
.floor-test{background:rgba(232,197,71,.05);border:1px solid rgba(232,197,71,.2);border-radius:0.375rem;padding:1rem 1.125rem;margin:1.25rem 0;}
.floor-test-label{font-family:'JetBrains Mono',monospace;font-size:0.625rem;font-weight:700;color:var(--accent);letter-spacing:.15em;text-transform:uppercase;margin-bottom:0.4375rem;}
.floor-test h4{font-size:0.875rem;font-weight:600;color:var(--heading);margin-bottom:0.4375rem;}
.floor-test p,.floor-test li{font-size:0.8125rem;color:var(--text);line-height:1.65;}
.floor-test ul{padding-left:1rem;margin-top:0.4375rem;}
.pass-criteria{margin-top:0.75rem;padding:0.625rem 0.875rem;background:rgba(63,185,80,.06);border-left:2px solid var(--success);border-radius:0.1875rem;}
.pass-label{font-family:'JetBrains Mono',monospace;font-size:0.5625rem;font-weight:700;color:var(--success);letter-spacing:.12em;text-transform:uppercase;margin-bottom:0.25rem;}
.pass-criteria p{font-size:0.75rem;color:var(--text-dim);margin:0;}
.pair{display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;margin:1rem 0;}
.pair-box{border-radius:0.3125rem;padding:0.75rem;overflow:hidden;}
.pair-box.wrong{border:1px solid rgba(248,81,73,.3);background:rgba(248,81,73,.04);}
.pair-box.right{border:1px solid rgba(63,185,80,.3);background:rgba(63,185,80,.04);}
.pair-label{font-family:'JetBrains Mono',monospace;font-size:0.5625rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-bottom:0.5rem;}
.pair-box.wrong .pair-label{color:var(--danger);}
.pair-box.right .pair-label{color:var(--success);}
.pair-box pre{padding:0;font-size:0.6875rem;}
.phase-intro{background:var(--surface2);border:1px solid var(--border);border-radius:0.5rem;padding:1.125rem 1.25rem;margin-bottom:1.5rem;}
.phase-intro-label{font-family:'JetBrains Mono',monospace;font-size:0.625rem;color:var(--accent);letter-spacing:.15em;text-transform:uppercase;margin-bottom:0.375rem;}
.phase-intro h3{font-size:1rem;color:var(--heading);margin:0 0 0.375rem;}
.phase-intro p{font-size:0.8125rem;color:var(--text-dim);margin:0;}
.checklist{list-style:none;margin:1rem 0;}
.checklist li{display:flex;align-items:flex-start;gap:0.625rem;padding:0.4375rem 0;border-bottom:1px solid rgba(48,54,61,.4);font-size:0.875rem;color:var(--text);}
.checklist li:last-child{border-bottom:none;}
.check-box{width:1rem;height:1rem;min-width:1rem;border:1px solid var(--border);border-radius:0.1875rem;margin-top:0.125rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s;}
.check-box:hover{border-color:var(--accent);}
.check-box.checked{background:var(--accent);border-color:var(--accent);}
.check-box.checked::after{content:"\u2713";font-size:0.625rem;color:var(--bg);font-weight:700;}
.tag{display:inline-block;font-family:'JetBrains Mono',monospace;font-size:0.625rem;padding:0.0625rem 0.375rem;border-radius:0.1875rem;margin:0 0.125rem;}
.tag.green{background:rgba(63,185,80,.12);color:var(--success);}
.tag.blue{background:rgba(88,166,255,.12);color:var(--info);}
.tag.red{background:rgba(248,81,73,.12);color:var(--danger);}
.tag.yellow{background:rgba(232,197,71,.12);color:var(--accent);}
.quiz-section{margin-top:2rem;padding-top:1.5rem;border-top:1px solid var(--border);}
.quiz-lbl{font-family:'JetBrains Mono',monospace;font-size:0.625rem;color:var(--accent);letter-spacing:.15em;text-transform:uppercase;margin-bottom:0.75rem;}
.quiz-wrap{background:var(--surface2);border:1px solid var(--border);border-radius:0.5rem;padding:1.375rem;}
.quiz-prog{font-family:'JetBrains Mono',monospace;font-size:0.625rem;color:var(--text-dim);margin-bottom:0.625rem;}
.quiz-q-text{font-size:0.9375rem;font-weight:600;color:var(--heading);margin-bottom:1rem;line-height:1.4;}
.quiz-opts{display:flex;flex-direction:column;gap:0.5rem;margin-bottom:0.875rem;}
.quiz-opt{padding:0.625rem 0.8125rem;border:1px solid var(--border);border-radius:0.3125rem;cursor:pointer;font-size:0.8125rem;color:var(--text);transition:all .15s;line-height:1.4;}
.quiz-opt:hover{border-color:var(--accent);background:rgba(232,197,71,.05);}
.quiz-opt.correct{border-color:var(--success)!important;background:rgba(63,185,80,.08);color:var(--success);pointer-events:none;}
.quiz-opt.wrong{border-color:var(--danger)!important;background:rgba(248,81,73,.08);color:var(--danger);pointer-events:none;}
.quiz-opt.locked{pointer-events:none;}
.quiz-exp{display:none;font-size:0.8125rem;line-height:1.6;padding:0.6875rem 0.8125rem;border-radius:0.3125rem;margin-top:0.375rem;}
.quiz-exp.show.correct{display:block;background:rgba(63,185,80,.08);color:var(--success);}
.quiz-exp.show.wrong{display:block;background:rgba(248,81,73,.08);color:#f08080;}
.quiz-next{display:none;margin-top:0.75rem;}
.quiz-result{text-align:center;padding:0.5rem 0 0.25rem;}
.qr-score{font-family:'JetBrains Mono',monospace;font-size:1.625rem;font-weight:700;margin-bottom:0.5rem;}
.qr-score.pass{color:var(--success);}
.qr-score.fail{color:var(--danger);}
.qr-msg{color:var(--text-dim);font-size:0.875rem;margin-bottom:1.125rem;}
.qr-review{text-align:left;display:flex;flex-direction:column;gap:0.625rem;margin-bottom:1.125rem;}
.rv-item{padding:0.625rem 0.8125rem;border-radius:0.3125rem;border:1px solid;}
.rv-item.c{border-color:rgba(63,185,80,.3);background:rgba(63,185,80,.04);}
.rv-item.w{border-color:rgba(248,81,73,.3);background:rgba(248,81,73,.04);}
.rv-q{font-size:0.8125rem;font-weight:600;color:var(--heading);margin-bottom:0.25rem;}
.rv-ans{font-size:0.75rem;color:var(--text-dim);}
.rv-correct{font-size:0.75rem;color:var(--success);}
.rv-exp{font-size:0.75rem;color:var(--text-dim);margin-top:0.1875rem;line-height:1.5;}
.mod-footer{padding:1.5rem 3.25rem 2.75rem;display:flex;gap:0.625rem;border-top:1px solid var(--border);}
.btn{padding:0.5rem 1.125rem;border-radius:0.3125rem;border:none;cursor:pointer;font-family:'JetBrains Mono',monospace;font-size:0.75rem;font-weight:500;letter-spacing:.04em;transition:all .15s;}
.btn-primary{background:var(--accent);color:var(--bg);}
.btn-primary:hover{background:#f0d060;}
.btn-primary:disabled{background:var(--border);color:var(--text-dim);cursor:not-allowed;}
.btn-secondary{background:transparent;color:var(--text-dim);border:1px solid var(--border);}
.btn-secondary:hover{border-color:var(--accent);color:var(--accent);}
.btn-complete{margin-left:auto;background:transparent;color:var(--text-dim);border:1px solid var(--border);}
.btn-complete:hover{border-color:var(--success);color:var(--success);}
.btn-complete.done{background:rgba(63,185,80,.1);color:var(--success);border-color:var(--success);}
#panelToggle{position:fixed;right:0;top:50%;transform:translateY(-50%);z-index:100;width:2rem;height:5rem;background:var(--surface);border:1px solid var(--border);border-right:none;border-radius:0.375rem 0 0 0.375rem;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.375rem;transition:border-color .15s;}
#panelToggle:hover{border-color:var(--accent);}
#panelToggle.active{border-left:3px solid var(--accent);}
.panel-label{font-family:'JetBrains Mono',monospace;font-size:0.5625rem;letter-spacing:.15em;color:var(--text-dim);writing-mode:vertical-rl;transform:rotate(180deg);}
.panel-icon{font-size:0.75rem;color:var(--text-dim);}
#panelToggle.active .panel-label,#panelToggle.active .panel-icon{color:var(--accent);}
#notesPanel{position:fixed;right:-20rem;top:3.125rem;bottom:0;width:20rem;background:var(--surface);border-left:1px solid var(--border);z-index:90;display:flex;flex-direction:column;transition:right .25s ease-in-out;}
#notesPanel.open{right:0;}
.panel-hdr{padding:0.625rem 1rem;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:0.125rem;flex-shrink:0;}
.panel-tab-btn{background:none;border:none;border-bottom:2px solid transparent;color:var(--text-dim);cursor:pointer;font-family:'Inter',sans-serif;font-size:0.8125rem;padding:0.25rem 0.625rem 0.3125rem;margin-bottom:-1px;transition:all .15s;}
.panel-tab-btn:hover{color:var(--text);}
.panel-tab-btn.active{color:var(--accent);border-bottom-color:var(--accent);}
.panel-close{margin-left:auto;background:none;border:none;color:var(--text-dim);cursor:pointer;font-size:1rem;padding:0.125rem 0.25rem;line-height:1;}
.panel-close:hover{color:var(--text);}
.panel-body{flex:1;display:flex;flex-direction:column;overflow:hidden;}
.panel-content{display:flex;flex-direction:column;height:100%;}
.panel-content.hidden{display:none;}
.notes-ta{flex:1;width:100%;background:transparent;border:none;color:var(--text);font-family:'Inter',sans-serif;font-size:0.875rem;line-height:1.7;padding:1rem;resize:none;outline:none;}
.notes-ta::placeholder{color:var(--text-dim);opacity:.6;}
.panel-ft{padding:0.375rem 1rem;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;flex-shrink:0;height:2rem;}
.panel-ft-count{font-family:'JetBrains Mono',monospace;font-size:0.625rem;color:var(--text-dim);}
.panel-ft-saved{font-family:'JetBrains Mono',monospace;font-size:0.625rem;color:var(--success);opacity:0;transition:opacity .3s;}
.panel-ft-saved.show{opacity:1;}
.transcript-ph{padding:2rem 1.25rem;text-align:center;color:var(--text-dim);}
.transcript-ph .t-icon{font-size:2rem;margin-bottom:0.75rem;}
.transcript-ph p{font-size:0.8125rem;line-height:1.7;}
.overlay-bg{display:none;position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:500;align-items:flex-start;justify-content:center;padding-top:5rem;}
.overlay-bg.show{display:flex;}
.search-box{background:var(--surface);border:1px solid var(--border);border-radius:0.5rem;width:100%;max-width:33.75rem;overflow:hidden;}
.search-input{width:100%;background:none;border:none;color:var(--text);font-family:'Inter',sans-serif;font-size:0.9375rem;padding:1rem 1.125rem;outline:none;}
.search-input::placeholder{color:var(--text-dim);}
.s-divider{height:1px;background:var(--border);}
.s-results{max-height:21.25rem;overflow-y:auto;}
.s-hit{padding:0.625rem 1.125rem;cursor:pointer;display:flex;gap:0.625rem;align-items:flex-start;}
.s-hit:hover{background:var(--surface2);}
.sh-num{font-family:'JetBrains Mono',monospace;font-size:0.625rem;color:var(--accent);margin-top:0.125rem;flex-shrink:0;}
.sh-title{font-size:0.875rem;color:var(--heading);}
.sh-snip{font-size:0.75rem;color:var(--text-dim);margin-top:0.0625rem;}
.s-empty{padding:1.375rem 1.125rem;color:var(--text-dim);font-size:0.875rem;text-align:center;}
.cert-ov{display:none;position:fixed;inset:0;background:rgba(0,0,0,.8);z-index:600;align-items:center;justify-content:center;}
.cert-ov.show{display:flex;}
.cert-modal{background:var(--surface);border:1px solid var(--border);border-radius:0.625rem;padding:2rem;width:100%;max-width:27.5rem;text-align:center;}
.cert-modal h3{color:var(--heading);font-size:1.1875rem;margin-bottom:0.4375rem;}
.cert-modal p{color:var(--text-dim);font-size:0.875rem;margin-bottom:1.125rem;}
.cert-input{width:100%;background:var(--surface2);border:1px solid var(--border);border-radius:0.3125rem;color:var(--text);font-family:'Inter',sans-serif;font-size:0.875rem;padding:0.5625rem 0.8125rem;outline:none;margin-bottom:0.875rem;}
.cert-input:focus{border-color:var(--accent);}
.cert-acts{display:flex;gap:0.625rem;justify-content:center;}
.mob-ov{display:none;position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:400;}
.mob-ov.show{display:block;}
.mob-drawer{position:fixed;left:-16.75rem;top:0;bottom:0;width:16.75rem;background:var(--surface);border-right:1px solid var(--border);z-index:450;transition:left .25s ease;overflow-y:auto;}
.mob-drawer.show{left:0;}
@media(max-width:768px){
  .sidebar{display:none;}
  .tb-ham{display:block;}
  .course-home,.lesson-pane{padding:1.5rem 1.125rem;}
  .mod-bc,.audio-shell,.mod-footer{padding-left:1.125rem;padding-right:1.125rem;}
  #panelToggle{bottom:1rem;right:0;top:auto;transform:none;width:5rem;height:2rem;border-radius:0.375rem 0.375rem 0 0;border-bottom:none;border-right:1px solid var(--border);flex-direction:row;}
  .panel-label{writing-mode:horizontal-tb;transform:none;}
  #notesPanel{top:auto;right:0;left:0;bottom:-62%;width:100%;height:62%;border-left:none;border-top:1px solid var(--border);transition:bottom .25s ease-in-out;}
  #notesPanel.open{bottom:0;right:0;}
  .content-area.panel-open{margin-right:0;}
}
@media print{body>*:not(.cert-print-area){display:none!important;}.cert-print-area{display:block!important;position:fixed;inset:0;background:#fff;padding:3.75rem;text-align:center;}}
.cert-print-area{display:none;}
::-webkit-scrollbar{width:0.3125rem;height:0.3125rem;}
::-webkit-scrollbar-track{background:transparent;}
::-webkit-scrollbar-thumb{background:var(--border);border-radius:0.1875rem;}
</style>`;

const htmlTop = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>AI Dev Foundations \u2014 Ship That Works</title>
${css}
</head>
<body>
<div class="overlay-bg" id="searchOv" onclick="if(event.target===this)closeSearch()">
  <div class="search-box">
    <input class="search-input" id="searchIn" placeholder="Search modules\u2026" oninput="runSearch(this.value)">
    <div class="s-divider"></div>
    <div class="s-results" id="searchRes"></div>
  </div>
</div>
<div class="cert-ov" id="certOv">
  <div class="cert-modal">
    <h3>&#127881; Course Complete</h3>
    <p>Enter your name to generate your certificate.</p>
    <input class="cert-input" id="certName" placeholder="Your full name">
    <div class="cert-acts">
      <button class="btn btn-secondary" onclick="closeCert()">Cancel</button>
      <button class="btn btn-primary" onclick="printCert()">Download PDF</button>
    </div>
  </div>
</div>
<div class="cert-print-area" id="certPrintArea">
  <h1 style="font-size:2rem;color:#000;font-family:Georgia,serif;">Certificate of Completion</h1>
  <p style="font-size:1.125rem;margin-top:1.25rem;color:#333;">This certifies that</p>
  <h2 id="certRecipient" style="font-size:1.875rem;margin:0.875rem 0;color:#000;font-family:Georgia,serif;"></h2>
  <p style="font-size:1rem;color:#333;">has completed</p>
  <h3 style="font-size:1.375rem;margin:0.625rem 0;color:#000;">AI Dev Foundations</h3>
  <p style="font-size:0.8125rem;margin-top:1.375rem;color:#666;">Ship That Works</p>
</div>
<button id="panelToggle" onclick="togglePanel()" title="Notes &amp; Transcript">
  <span class="panel-label">NOTES</span>
  <span class="panel-icon">&#9998;</span>
</button>
<div id="notesPanel">
  <div class="panel-hdr">
    <button class="panel-tab-btn active" id="panelTabBtn-notes" onclick="switchPanelTab('notes')">Notes</button>
    <button class="panel-tab-btn" id="panelTabBtn-transcript" onclick="switchPanelTab('transcript')">Transcript</button>
    <button class="panel-close" onclick="togglePanel()" title="Close">&times;</button>
  </div>
  <div class="panel-body">
    <div class="panel-content" id="panelContent-notes">
      <textarea class="notes-ta" id="panelNotesTa" placeholder="Your notes for this module\u2026" oninput="if(currentMod)saveNotes(currentMod)"></textarea>
      <div class="panel-ft">
        <span class="panel-ft-count" id="panelNotesCount">0 chars</span>
        <span class="panel-ft-saved" id="panelSaved">Saved</span>
      </div>
    </div>
    <div class="panel-content hidden" id="panelContent-transcript">
      <div class="transcript-ph">
        <div class="t-icon">&#127908;</div>
        <p>Transcript will appear here once audio narration is added to this module.</p>
      </div>
    </div>
  </div>
</div>
<div class="mob-ov" id="mobOv" onclick="closeMob()"></div>
<div class="mob-drawer" id="mobDraw"></div>
<div class="shell">
  <nav class="sidebar" id="sidebar">
    <div class="sb-top">
      <a class="sb-back" href="index.html">&#8592; All Courses</a>
      <div class="sb-title">AI Dev Foundations</div>
      <div class="sb-prog-bar"><div class="sb-prog-fill" id="sbFill"></div></div>
      <div class="sb-stats-row" id="sbStatsRow">0 / 18 modules</div>
    </div>
    <div class="sb-nav" id="sbNav"></div>
    <div class="sb-footer" id="sbFooter"></div>
  </nav>
  <div class="content-area" id="contentArea">
    <header class="topbar">
      <span class="tb-logo">STW</span>
      <div class="tb-div"></div>
      <span class="tb-course">AI Dev Foundations</span>
      <div class="tb-prog">
        <div class="tb-bar"><div class="tb-fill" id="tbFill"></div></div>
        <span class="tb-pct" id="tbPct">0 / 18</span>
      </div>
      <button class="tb-btn" onclick="openSearch()" title="Search (/)">&#128269;</button>
      <button class="tb-btn" onclick="showCert()" title="Certificate" id="certBtn" style="display:none">&#127881;</button>
      <button class="tb-ham" onclick="openMob()">&#9776;</button>
    </header>
    <main class="main" id="main">
      <div id="homeView"></div>
      <div class="mod-view" id="modView"></div>
    </main>
  </div>
</div>
<script>
`;

fs.writeFileSync(out, htmlTop);
console.log('Part 1 done:', htmlTop.length, 'chars');
