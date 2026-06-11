// Part 1: Write CSS + HTML structure (nav redesign + notes panel + rem units)
const fs = require('fs');
const out = 'C:/Projects/shipthatworks/engineer.html';

const css = `<style>
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;700&display=swap');
:root{--bg:#0f1117;--surface:#161b22;--surface2:#1c2128;--border:#30363d;--border2:#444c56;--accent:#e8c547;--success:#3fb950;--danger:#f85149;--warn:#d29922;--info:#58a6ff;--text:#c9d1d9;--text-dim:#8b949e;--heading:#f0f6fc;}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
html{font-size:18px;scroll-behavior:smooth;}
body{background:var(--bg);color:var(--text);font-family:'Inter',sans-serif;font-size:0.9375rem;line-height:1.65;min-height:100vh;}
.shell{display:flex;min-height:100vh;padding-top:3.5rem;}
.sidebar{width:16.75rem;min-width:16.75rem;background:var(--surface);border-right:1px solid var(--border);position:sticky;top:3.5rem;height:calc(100vh - 3.5rem);display:flex;flex-direction:column;flex-shrink:0;}
.sb-top{padding:0.875rem 0.875rem 0.625rem;border-bottom:1px solid var(--border);flex-shrink:0;}
.sb-back{display:inline-flex;align-items:center;gap:0.375rem;font-family:'JetBrains Mono',monospace;font-size:0.6875rem;color:var(--text-dim);text-decoration:none;margin-bottom:0.625rem;}
.sb-back:hover{color:var(--info);}
.sb-title{font-family:'Space Grotesk',sans-serif;font-size:0.9375rem;font-weight:600;color:var(--heading);line-height:1.35;margin-bottom:0.5rem;}
.sb-prog-bar{height:0.25rem;background:var(--surface2);border-radius:0.125rem;overflow:hidden;}
.sb-prog-fill{height:100%;background:var(--accent);transition:width 600ms cubic-bezier(0.4,0,0.2,1);width:0%;}
.sb-stats-row{margin-top:0.3125rem;font-family:'JetBrains Mono',monospace;font-size:0.6875rem;color:var(--text-dim);}
.sb-nav{flex:1;overflow-y:auto;padding:0.25rem 0 0.5rem;}
.sb-bm-label{padding:0.5rem 1rem 0.1875rem;font-family:'JetBrains Mono',monospace;font-size:0.5625rem;color:var(--text-dim);letter-spacing:.15em;text-transform:uppercase;}
.sb-bm-divider{height:1px;background:var(--border);margin:0.375rem 0;}
.ph-section{border-top:1px solid var(--border);}
.ph-section:first-of-type{border-top:none;}
.ph-toggle{display:flex;align-items:center;gap:0.5rem;padding:0.625rem 0.875rem;cursor:pointer;width:100%;background:none;border:none;color:inherit;text-align:left;transition:background 150ms ease;}
.ph-toggle:hover{background:rgba(255,255,255,.04);}
.ph-badge{width:1.25rem;height:1.25rem;min-width:1.25rem;border-radius:0.25rem;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:0.5rem;font-weight:700;}
.ph-name{font-family:'JetBrains Mono',monospace;font-size:0.5625rem;letter-spacing:.12em;text-transform:uppercase;color:var(--text-dim);flex:1;}
.ph-count{font-family:'JetBrains Mono',monospace;font-size:0.5rem;color:var(--text-dim);flex-shrink:0;}
.ph-chevron{font-size:0.625rem;color:var(--text-dim);flex-shrink:0;transition:transform 250ms cubic-bezier(0.4,0,0.2,1);display:inline-block;}
.ph-section.collapsed .ph-chevron{transform:rotate(180deg);}
.ph-section.collapsed .ph-modules{display:none;}
.nav-item{padding:0.5rem 0.875rem 0.5rem 0.75rem;cursor:pointer;border-left:3px solid transparent;transition:all 150ms ease;}
.nav-item:hover{background:rgba(255,255,255,.03);transform:translateX(2px);}
.nav-item:hover .ni-title{color:var(--heading);}
.nav-item.active{border-left-color:var(--accent);background:rgba(232,197,71,.08);transform:translateX(2px);}
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
.tb-logo-link{display:flex;align-items:center;gap:0.5rem;text-decoration:none;opacity:1;transition:opacity .15s;flex-shrink:0;}
.tb-logo-link:hover{opacity:.8;}
.tb-logo-mark{width:1.75rem;height:1.75rem;min-width:1.75rem;background:#e8c547;border-radius:0.375rem;display:flex;align-items:center;justify-content:center;font-family:'Space Grotesk',sans-serif;font-size:0.875rem;font-weight:700;color:#0f1117;}
.tb-logo-text{font-family:'Space Grotesk',sans-serif;font-size:0.875rem;font-weight:600;color:var(--heading);white-space:nowrap;}
.content-area{flex:1;display:flex;flex-direction:column;min-width:0;overflow:hidden;transition:margin-right 250ms cubic-bezier(0.4,0,0.2,1);}
.content-area.panel-open{margin-right:20rem;}
.topbar{background:var(--surface);border-bottom:1px solid var(--border);padding:0 1.25rem;height:3.5rem;display:flex;align-items:center;gap:0.75rem;flex-shrink:0;position:fixed;top:0;left:0;right:0;z-index:100;}
.tb-logo{font-family:'JetBrains Mono',monospace;font-size:0.8125rem;font-weight:700;color:var(--accent);flex-shrink:0;}
.tb-div{width:1px;height:1.375rem;background:var(--border);flex-shrink:0;}
.tb-course{font-size:0.8125rem;font-weight:600;color:var(--heading);flex-shrink:0;white-space:nowrap;}
.tb-prog{flex:1;display:flex;align-items:center;gap:0.625rem;min-width:0;}
.tb-bar{flex:1;height:0.25rem;background:var(--surface2);border-radius:0.125rem;overflow:hidden;min-width:2.5rem;}
.tb-fill{height:100%;background:var(--accent);border-radius:0.125rem;transition:width 600ms cubic-bezier(0.4,0,0.2,1);width:0%;}
.tb-pct{font-family:'JetBrains Mono',monospace;font-size:0.6875rem;color:var(--text-dim);flex-shrink:0;white-space:nowrap;}
.tb-btn{background:none;border:1px solid var(--border);border-radius:0.3125rem;color:var(--text-dim);cursor:pointer;padding:0.25rem 0.5625rem;font-size:0.8125rem;flex-shrink:0;transition:all 150ms ease;}
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
.ch-resume{margin-bottom:2rem;}
.ch-actions{display:flex;gap:0.625rem;margin-bottom:2.75rem;flex-wrap:wrap;}
.phase-cards{display:grid;gap:0.875rem;}
.pc{background:var(--surface2);border:1px solid var(--border);border-radius:0.5rem;padding:1.125rem 1.25rem;display:flex;gap:0.875rem;align-items:flex-start;cursor:pointer;transition:all 200ms ease;}
.pc:hover{border-color:rgba(255,255,255,.12);transform:translateY(-3px);box-shadow:0 8px 24px rgba(0,0,0,.3);}
.pc-badge{font-family:'JetBrains Mono',monospace;font-size:0.625rem;font-weight:700;padding:0.125rem 0.4375rem;border-radius:0.125rem;flex-shrink:0;margin-top:0.125rem;}
.pc-body{flex:1;min-width:0;}
.pc-title{font-size:0.875rem;font-weight:600;color:var(--heading);margin-bottom:0.1875rem;}
.pc-desc{font-size:0.75rem;color:var(--text-dim);line-height:1.5;}
.pc-mods{font-family:'JetBrains Mono',monospace;font-size:0.625rem;color:var(--text-dim);margin-top:0.375rem;}
.mod-view{display:none;}
.mod-bc{padding:0.75rem 3.75rem;font-family:'JetBrains Mono',monospace;font-size:0.6875rem;color:var(--text-dim);border-bottom:1px solid var(--border);display:flex;align-items:center;gap:0.375rem;}
.mod-bc a{color:var(--text-dim);text-decoration:none;cursor:pointer;}
.mod-bc a:hover{color:var(--info);}
.bc-sep{color:var(--border2);}
.bc-cur{color:var(--text);}
.audio-shell{padding:0.625rem 3.75rem;border-bottom:1px solid var(--border);background:var(--surface2);}
.audio-inner{height:2.375rem;border:1px solid var(--border);border-radius:0.3125rem;display:flex;align-items:center;padding:0 0.875rem;gap:0.625rem;opacity:.4;cursor:not-allowed;background:var(--surface);}
.audio-play{width:1.625rem;height:1.625rem;border:1px solid var(--border2);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:0.5625rem;color:var(--text-dim);}
.audio-bar{flex:1;height:0.1875rem;background:var(--border);border-radius:0.125rem;}
.audio-time{font-family:'JetBrains Mono',monospace;font-size:0.625rem;color:var(--text-dim);}
.audio-lbl{font-family:'JetBrains Mono',monospace;font-size:0.5625rem;color:var(--text-dim);margin-left:auto;}
.lesson-pane{padding:2.5rem 3.75rem 4rem;}
.mod-eyebrow{display:flex;align-items:center;gap:0.625rem;margin-bottom:0.5rem;}
.ptag{font-family:'JetBrains Mono',monospace;font-size:0.625rem;color:var(--bg);background:var(--accent);padding:0.125rem 0.4375rem;border-radius:0.125rem;font-weight:700;}
.mnum{font-family:'JetBrains Mono',monospace;font-size:0.6875rem;color:var(--text-dim);}
.lesson-pane h2{font-size:2.25rem;font-weight:700;color:#eef2ff;margin-bottom:0.75rem;line-height:1.15;letter-spacing:-0.02em;}
.mod-lead{font-size:1.0625rem;color:var(--text-dim);margin-bottom:2.5rem;padding-bottom:2rem;max-width:42rem;line-height:1.75;border-bottom:1px solid var(--border);}
h3{font-size:1.1875rem;font-weight:600;color:var(--heading);margin:3rem 0 0.875rem;padding-left:0.875rem;border-left:2px solid rgba(232,197,71,0.4);}
h4{font-size:0.9375rem;font-weight:600;color:var(--heading);margin-top:1.75rem;margin-bottom:0.5rem;}
p{margin-bottom:1rem;}
ul,ol{padding-left:1.25rem;margin-bottom:1rem;}
li{margin-bottom:0.5rem;font-size:0.9375rem;color:var(--text);line-height:1.8;}
strong{color:var(--heading);font-weight:600;}
code{font-family:'JetBrains Mono',monospace;font-size:0.875em;color:var(--info);background:rgba(88,166,255,.1);padding:0.125rem 0.3rem;border-radius:0.1875rem;}
.lesson-pane p{max-width:42.5rem;}
.callout{border-radius:0.5rem;padding:1.25rem 1.5rem;margin:2rem 0;border-left:3px solid;transition:all 200ms ease;}
.callout:hover{transform:translateX(2px);border-left-width:4px;}
.callout.truth{background:rgba(63,185,80,.06);border-color:var(--success);}
.callout.warning{background:rgba(210,153,34,.07);border-color:var(--warn);}
.callout.danger{background:rgba(248,81,73,.07);border-color:var(--danger);}
.callout.info{background:rgba(88,166,255,.07);border-color:var(--info);}
.callout-label{font-family:'JetBrains Mono',monospace;font-size:0.5625rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;margin-bottom:0.5rem;display:flex;align-items:center;gap:0.375rem;}
.callout.truth .callout-label{color:var(--success);}
.callout.warning .callout-label{color:var(--warn);}
.callout.danger .callout-label{color:var(--danger);}
.callout.info .callout-label{color:var(--info);}
.callout p{font-size:0.875rem;color:var(--text);line-height:1.7;margin:0;max-width:none;}
.code-block{background:#0a0d14;border:1px solid var(--border);border-radius:0.5rem;margin:2rem 0;overflow:hidden;}
.code-header{display:flex;align-items:center;justify-content:space-between;padding:0.625rem 1rem;border-bottom:1px solid var(--border);background:rgba(0,0,0,.3);}
.code-dots{display:flex;gap:0.3125rem;}
.code-dot{width:0.5rem;height:0.5rem;border-radius:50%;}
.code-dot:nth-child(1){background:var(--danger);opacity:.7;}
.code-dot:nth-child(2){background:var(--warn);opacity:.7;}
.code-dot:nth-child(3){background:var(--success);opacity:.7;}
.code-label{font-family:'JetBrains Mono',monospace;font-size:0.625rem;color:var(--text-dim);}
.copy-btn{background:rgba(255,255,255,.08);border:1px solid var(--border);border-radius:0.25rem;color:var(--text-dim);cursor:pointer;font-size:0.625rem;padding:0.25rem 0.5rem;font-family:'JetBrains Mono',monospace;opacity:0;transform:translateX(4px);transition:all 200ms ease;}
.code-block:hover .copy-btn{opacity:1;transform:translateX(0);}
.copy-btn:hover{border-color:var(--accent);color:var(--accent);}
pre{padding:1.25rem 1.5rem;font-family:'JetBrains Mono',monospace;font-size:0.8125rem;line-height:1.8;color:#c4cfe8;overflow-x:auto;}
pre .comment{color:#4a5570;}pre .key{color:#5b8ff9;}pre .val{color:#e8c547;}pre .str{color:#52c97a;}pre .cmd{color:var(--danger);}
.exercise{background:rgba(88,166,255,.06);border:1px solid rgba(88,166,255,.18);border-radius:0.375rem;padding:1rem 1.125rem;margin:1.125rem 0;}
.exercise-label{font-family:'JetBrains Mono',monospace;font-size:0.625rem;font-weight:700;color:var(--info);letter-spacing:.15em;text-transform:uppercase;margin-bottom:0.4375rem;}
.exercise h4{font-size:0.875rem;font-weight:600;color:var(--heading);margin-top:0;margin-bottom:0.4375rem;}
.exercise p,.exercise li{font-size:0.8125rem;color:var(--text);line-height:1.65;}
.exercise ul,.exercise ol{padding-left:1rem;margin-top:0.4375rem;}
.tbl{width:100%;border-collapse:collapse;margin:2.5rem 0;font-size:0.875rem;}
.tbl th{padding:0.625rem 0.875rem;text-align:left;font-family:'JetBrains Mono',monospace;font-size:0.625rem;letter-spacing:.1em;text-transform:uppercase;color:var(--text-dim);border-bottom:1px solid var(--border);}
.tbl td{padding:0.75rem 0.875rem;border-bottom:1px solid rgba(48,54,61,.4);vertical-align:top;line-height:1.6;color:var(--text);}
.tbl tr:last-child td{border-bottom:none;}
.tbl tr:hover td{background:rgba(255,255,255,.02);transition:background 150ms ease;}
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
.floor-test{background:rgba(91,143,249,.06);border:1px solid rgba(91,143,249,.25);border-radius:0.625rem;padding:1.5rem 1.75rem;margin:2.5rem 0;}
.floor-test-label{font-family:'JetBrains Mono',monospace;font-size:0.625rem;font-weight:700;color:var(--info);letter-spacing:.15em;text-transform:uppercase;margin-bottom:0.4375rem;}
.floor-test h4{font-size:1rem;font-weight:600;color:var(--heading);margin-top:0;margin-bottom:0.4375rem;}
.floor-test p,.floor-test li{font-size:0.875rem;color:var(--text);line-height:1.65;}
.floor-test ul{padding-left:1rem;margin-top:0.4375rem;}
.pass-criteria{margin-top:1.25rem;padding-top:1.25rem;border-top:1px solid rgba(91,143,249,.15);}
.pass-label{font-family:'JetBrains Mono',monospace;font-size:0.5625rem;font-weight:700;color:var(--success);letter-spacing:.15em;text-transform:uppercase;margin-bottom:0.375rem;}
.pass-criteria p{font-size:0.75rem;color:var(--text-dim);margin:0;max-width:none;}
.pair{display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;margin:1.5rem 0;}
.pair-box{border-radius:0.375rem;padding:0.75rem;overflow:hidden;}
.pair-box.wrong{border:1px solid rgba(248,81,73,.3);background:rgba(248,81,73,.04);}
.pair-box.right{border:1px solid rgba(63,185,80,.3);background:rgba(63,185,80,.04);}
.pair-label{font-family:'JetBrains Mono',monospace;font-size:0.5625rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-bottom:0.5rem;}
.pair-box.wrong .pair-label{color:var(--danger);}
.pair-box.right .pair-label{color:var(--success);}
.pair-box pre{padding:0;font-size:0.6875rem;}
.phase-intro{background:var(--surface2);border:1px solid var(--border);border-radius:0.5rem;padding:1.125rem 1.25rem;margin-bottom:1.5rem;}
.phase-intro-label{font-family:'JetBrains Mono',monospace;font-size:0.625rem;color:var(--accent);letter-spacing:.15em;text-transform:uppercase;margin-bottom:0.375rem;}
.phase-intro h3{font-size:1rem;color:var(--heading);margin:0 0 0.375rem;padding-left:0;border-left:none;}
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
.quiz-opt{padding:0.625rem 0.8125rem;border:1px solid var(--border);border-radius:0.3125rem;cursor:pointer;font-size:0.8125rem;color:var(--text);transition:all 150ms ease;line-height:1.4;}
.quiz-opt:hover{border-color:rgba(91,143,249,.5);background:rgba(91,143,249,.05);transform:translateY(-2px);box-shadow:0 4px 12px rgba(0,0,0,.2);}
.quiz-opt.correct{border-color:var(--success)!important;background:rgba(63,185,80,.1);color:var(--success);pointer-events:none;transition:all 300ms ease;}
.quiz-opt.wrong{border-color:var(--danger)!important;background:rgba(224,92,92,.1);color:var(--danger);pointer-events:none;transition:all 300ms ease;}
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
.mod-footer{padding:2.5rem 3.75rem 2.75rem;margin-top:3rem;display:flex;gap:0.625rem;border-top:1px solid var(--border);}
.btn{padding:0.5rem 1.125rem;border-radius:0.3125rem;border:none;cursor:pointer;font-family:'JetBrains Mono',monospace;font-size:0.75rem;font-weight:500;letter-spacing:.04em;transition:all 150ms ease;}
.btn-primary{background:var(--accent);color:var(--bg);}
.btn-primary:hover{background:#f0d060;transform:translateY(-1px);box-shadow:0 4px 12px rgba(232,197,71,.3);}
.btn-primary:active{transform:translateY(0) scale(.98);box-shadow:none;}
.btn-primary:disabled{background:var(--border);color:var(--text-dim);cursor:not-allowed;}
.btn-secondary{background:transparent;color:var(--text-dim);border:1px solid var(--border);}
.btn-secondary:hover{border-color:rgba(232,197,71,.6);background:rgba(232,197,71,.06);color:var(--accent);transform:translateY(-1px);}
.btn-secondary:active{transform:scale(.98);}
.btn-complete{margin-left:auto;background:transparent;color:var(--text-dim);border:1px solid var(--border);}
.btn-complete:hover{border-color:var(--success);color:var(--success);}
.btn-complete.done{background:rgba(63,185,80,.1);color:var(--success);border-color:var(--success);}
#panelToggle{position:fixed;right:0;top:50%;transform:translateY(-50%);z-index:100;width:2rem;height:5rem;background:var(--surface);border:1px solid var(--border);border-right:none;border-radius:0.375rem 0 0 0.375rem;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.375rem;transition:border-color .15s;}
#panelToggle:hover{border-color:var(--accent);}
#panelToggle.active{border-left:3px solid var(--accent);}
.panel-label{font-family:'JetBrains Mono',monospace;font-size:0.5625rem;letter-spacing:.15em;color:var(--text-dim);writing-mode:vertical-rl;transform:rotate(180deg);}
.panel-icon{font-size:0.75rem;color:var(--text-dim);}
#panelToggle.active .panel-label,#panelToggle.active .panel-icon{color:var(--accent);}
#notesPanel{position:fixed;right:0;top:3.5rem;bottom:0;width:20rem;background:var(--surface);border-left:1px solid var(--border);z-index:90;display:flex;flex-direction:column;transform:translateX(100%);transition:transform 250ms cubic-bezier(0.4,0,0.2,1);}
#notesPanel.open{transform:translateX(0);}
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
.cert-modal h3{color:var(--heading);font-size:1.1875rem;margin-bottom:0.4375rem;padding-left:0;border-left:none;}
.cert-modal p{color:var(--text-dim);font-size:0.875rem;margin-bottom:1.125rem;max-width:none;}
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
  .lesson-pane h2{font-size:1.625rem;}
  #panelToggle{bottom:1rem;right:0;top:auto;transform:none;width:5rem;height:2rem;border-radius:0.375rem 0.375rem 0 0;border-bottom:none;border-right:1px solid var(--border);flex-direction:row;}
  .panel-label{writing-mode:horizontal-tb;transform:none;}
  #notesPanel{top:auto;right:0;left:0;bottom:0;width:100%;height:62%;border-left:none;border-top:1px solid var(--border);transform:translateY(100%);transition:transform 250ms cubic-bezier(0.4,0,0.2,1);}
  #notesPanel.open{transform:translateY(0);}
  .content-area.panel-open{margin-right:0;}
}
@media print{body>*:not(.cert-print-area){display:none!important;}.cert-print-area{display:block!important;position:fixed;inset:0;background:#fff;padding:3.75rem;text-align:center;}}
.cert-print-area{display:none;}
::-webkit-scrollbar{width:0.25rem;height:0.25rem;}
::-webkit-scrollbar-track{background:transparent;}
::-webkit-scrollbar-thumb{background:rgba(42,53,80,.8);border-radius:0.25rem;}
::-webkit-scrollbar-thumb:hover{background:rgba(74,85,112,.9);}
.settings-danger-lbl{font-family:'JetBrains Mono',monospace;font-size:0.5625rem;letter-spacing:.15em;text-transform:uppercase;color:var(--danger);margin-bottom:0.375rem;}
.settings-danger-link{font-family:'Inter',sans-serif;font-size:0.8125rem;color:var(--danger);background:none;border:none;cursor:pointer;padding:0;opacity:.7;transition:opacity .15s;text-align:left;display:block;width:100%;}
.settings-danger-link:hover{opacity:1;}
.settings-rc-confirm{font-size:0.75rem;color:var(--text-dim);margin-bottom:0.5rem;line-height:1.5;}
.settings-rc-btns{display:flex;gap:0.5rem;justify-content:flex-end;}
.settings-rc-btn{background:none;border:1px solid var(--border);border-radius:0.25rem;color:var(--text-dim);font-family:'JetBrains Mono',monospace;font-size:0.5625rem;cursor:pointer;padding:0.25rem 0.625rem;transition:all .15s;}
.settings-rc-btn:hover{border-color:var(--border2);color:var(--text);}
.settings-rc-btn.danger:hover{border-color:var(--danger);color:var(--danger);}
.settings-wrap{position:relative;flex-shrink:0;}
.settings-dd{display:none;position:fixed;top:3.5rem;right:1.25rem;width:16rem;background:var(--surface);border:1px solid var(--border);border-radius:0.5rem;box-shadow:0 0.5rem 1.5rem rgba(0,0,0,.4);z-index:200;padding:0.875rem;}
.settings-dd.open{display:block;}
.settings-sect-lbl{font-family:'JetBrains Mono',monospace;font-size:0.5625rem;letter-spacing:.15em;text-transform:uppercase;color:var(--text-dim);margin-bottom:0.625rem;}
.settings-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:0.375rem;}
.settings-row-lbl{font-size:0.75rem;color:var(--text);}
.settings-row-val{font-family:'JetBrains Mono',monospace;font-size:0.625rem;color:var(--accent);}
.settings-slider{-webkit-appearance:none;appearance:none;width:100%;height:0.25rem;background:var(--border);border-radius:0.25rem;outline:none;cursor:pointer;margin:0.375rem 0 0.25rem;}
.settings-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:1rem;height:1rem;border-radius:50%;background:var(--accent);cursor:pointer;border:none;}
.settings-slider::-moz-range-thumb{width:1rem;height:1rem;border-radius:50%;background:var(--accent);cursor:pointer;border:none;}
.settings-ticks{display:flex;justify-content:space-between;font-family:'JetBrains Mono',monospace;font-size:0.5rem;color:var(--text-dim);margin-bottom:0.5rem;}
.settings-reset{display:block;text-align:right;font-family:'JetBrains Mono',monospace;font-size:0.5625rem;color:var(--text-dim);background:none;border:none;cursor:pointer;padding:0;opacity:.6;transition:opacity .15s,color .15s;width:100%;}
.settings-reset:hover{opacity:1;color:var(--accent);}
.settings-divider{height:1px;background:var(--border);margin:0.625rem 0;}
.settings-more-lbl{font-family:'JetBrains Mono',monospace;font-size:0.5625rem;letter-spacing:.15em;text-transform:uppercase;color:var(--text-dim);}
.resume-btn{display:block;width:100%;background:var(--accent);color:var(--bg);font-family:'JetBrains Mono',monospace;font-size:0.8125rem;font-weight:500;padding:0.875rem 1.5rem;border-radius:0.375rem;border:none;cursor:pointer;text-align:left;transition:all 150ms ease;}
.resume-btn:hover{background:#f0d060;transform:translateY(-1px);box-shadow:0 4px 12px rgba(232,197,71,.3);}
.resume-btn:active{transform:translateY(0) scale(.98);box-shadow:none;}
.resume-btn-meta{font-family:'Inter',sans-serif;font-size:0.75rem;color:var(--text-dim);margin-top:0.375rem;}
.resume-btn-ghost{display:block;width:100%;background:transparent;color:var(--accent);font-family:'JetBrains Mono',monospace;font-size:0.8125rem;font-weight:500;padding:0.875rem 1.5rem;border-radius:0.375rem;border:1px solid var(--accent);cursor:pointer;text-align:left;transition:all 150ms ease;}
.resume-btn-ghost:hover{background:rgba(232,197,71,.1);transform:translateY(-1px);}
.resume-btn-ghost:active{transform:scale(.98);}
@keyframes phaseGlow{0%{background:transparent;}35%{background:rgba(63,185,80,.1);}100%{background:transparent;}}
.ph-section.phase-complete-glow{animation:phaseGlow 1.5s ease-out forwards;}
</style>`;

const htmlTop = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>AI Code Engineer \u2014 Ship That Works</title>
<script>(function(){var o=parseInt(localStorage.getItem('ui_scale_offset')||'0');document.documentElement.style.fontSize=(18*(1+(o/100)))+'px';}());</script>
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
  <h3 style="font-size:1.375rem;margin:0.625rem 0;color:#000;">AI Code Engineer with Claude Code</h3>
  <p style="font-size:0.8125rem;margin-top:1.375rem;color:#666;">Ship That Works &mdash; <span id="certDate"></span></p>
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
      <div class="sb-title">AI Code Engineer<br>with Claude Code</div>
      <div class="sb-prog-bar"><div class="sb-prog-fill" id="sbFill"></div></div>
      <div class="sb-stats-row" id="sbStatsRow">0 / 18 modules</div>
    </div>
    <div class="sb-nav" id="sbNav"></div>
  </nav>
  <div class="content-area" id="contentArea">
    <header class="topbar">
      <a class="tb-logo-link" href="index.html" title="Ship That Works \u2014 All Courses">
        <div class="tb-logo-mark">S</div>
        <span class="tb-logo-text">Ship That Works</span>
      </a>
      <div class="tb-div"></div>
      <span class="tb-course">AI Code Engineer</span>
      <div class="tb-prog">
        <div class="tb-bar"><div class="tb-fill" id="tbFill"></div></div>
        <span class="tb-pct" id="tbPct">0 / 18</span>
      </div>
      <button class="tb-btn" onclick="openSearch()" title="Search (/)">&#128269;</button>
      <button class="tb-btn" onclick="showCert()" title="Certificate" id="certBtn" style="display:none">&#127881;</button>
      <div class="settings-wrap">
        <button class="tb-btn" id="cogBtn" onclick="toggleSettings()" title="Settings">&#9881;</button>
        <div class="settings-dd" id="settingsDd">
          <div class="settings-sect-lbl">DISPLAY</div>
          <div class="settings-row"><span class="settings-row-lbl">Text scale</span><span class="settings-row-val" id="settingsScaleLbl">0</span></div>
          <input type="range" class="settings-slider" id="settingsScaleSlider" min="-25" max="25" step="1" value="0" oninput="applyScaleOffset(this.value)">
          <div class="settings-ticks"><span>-25%</span><span>0</span><span>+25%</span></div>
          <button class="settings-reset" onclick="resetScale()">Reset to default</button>
          <div class="settings-divider"></div>
          <div class="settings-more-lbl">MORE SETTINGS</div>
          <div class="settings-divider"></div>
          <div class="settings-danger-lbl">DANGER</div>
          <div id="settingsResetArea">
            <button class="settings-danger-link" onclick="showResetConfirm()">Reset course progress</button>
          </div>
        </div>
      </div>
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
