import { chromium } from 'playwright';

const BASE = 'http://localhost:8234';
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext();
const page = await ctx.newPage();
const errors = [];
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', e => errors.push('PAGE ERROR: ' + e.message));

// Clear relevant localStorage before starting
await page.goto(BASE + '/foundations.html');
await page.evaluate(() => {
  localStorage.removeItem('adf_done');
  localStorage.removeItem('adf_quizzes');
  localStorage.removeItem('adf_assess_baseline');
});
await page.reload({ waitUntil: 'networkidle' });

// STEP 1: Navigate to p1m1, assessment widget mounts
await page.click('#ni-p1m1');
await page.waitForSelector('#p1m1-assess-mount', { timeout: 5000 });
await page.waitForTimeout(300);
const assessMounted = await page.$('#p1m1-assess-mount .assess-legend');
console.log('STEP1 assessment widget mounted:', !!assessMounted);

// STEP 2: 20 assessment rows present
const rows = await page.$$('.assess-row');
console.log('STEP2 assess-row count:', rows.length, '(expect 20)');

// STEP 3: 4 category labels present
const catLabels = await page.$$eval('.assess-cat-label', els => els.map(e => e.textContent));
console.log('STEP3 category labels:', JSON.stringify(catLabels));

// STEP 4: Scores panel shows 0/20 answered initially
const progText = await page.textContent('.assess-score-prog');
console.log('STEP4 initial progress:', progText.trim(), '(expect 0 / 20 answered)');
const scoreTotal = await page.textContent('.assess-score-total');
console.log('STEP4 initial total:', scoreTotal.trim(), '(expect 0 / 40)');

// STEP 5: Segmented control selection updates score panel
// Click "2" on item 1 (first seg-ctrl)
const firstSegBtns = await page.$$('.seg-ctrl:first-of-type .seg-btn');
if (firstSegBtns.length > 0) {
  await firstSegBtns[2].click(); // click "2"
  await page.waitForTimeout(100);
}
const progAfter1 = await page.textContent('.assess-score-prog');
const totalAfter1 = await page.textContent('.assess-score-total');
console.log('STEP5 after 1 answer:', progAfter1.trim(), '| total:', totalAfter1.trim());

// STEP 6: Footer hidden before quiz pass (assessment gating)
const footerBeforeQuiz = await page.evaluate(() => {
  const f = document.getElementById('mod-footer-p1m1');
  return f ? f.style.display : 'not found';
});
console.log('STEP6 footer before quiz:', footerBeforeQuiz, '(expect none/hidden)');

// STEP 7: Quiz pass reveals footer with disabled Mark Complete button (assessment incomplete)
await page.evaluate(() => {
  startQuiz('p1m1');
  const state = quizState['p1m1'];
  if (!state) return;
  state.answers = [
    { chosen: state.drawn[0].correct, correct: state.drawn[0].correct, isCorrect: true },
    { chosen: state.drawn[1].correct, correct: state.drawn[1].correct, isCorrect: true },
    { chosen: state.drawn[2].correct, correct: state.drawn[2].correct, isCorrect: true },
    { chosen: (state.drawn[3].correct + 1) % 4, correct: state.drawn[3].correct, isCorrect: false },
  ];
  state.current = state.drawn.length;
  showQuizResults('p1m1');
});
await page.waitForTimeout(200);
const footerAfterQuiz = await page.evaluate(() => {
  const f = document.getElementById('mod-footer-p1m1');
  return f ? f.style.display : 'not found';
});
const btnDisabled = await page.evaluate(() => {
  const btn = document.getElementById('cbtn-p1m1');
  return btn ? btn.disabled : 'not found';
});
const hintVisible = await page.$('#cbtn-gate-hint');
console.log('STEP7 footer after quiz pass:', footerAfterQuiz, '(expect flex)');
console.log('STEP7 Mark Complete disabled (assessment incomplete):', btnDisabled, '(expect true)');
console.log('STEP7 gate hint present:', !!hintVisible);

// STEP 8: Answer all 20 items with value 2, then Mark Complete unlocks
await page.evaluate(() => {
  ASSESS_ITEMS.forEach(function(item) {
    assessSelect('adf_assess_baseline', item.id, 2, 'Baseline');
  });
});
await page.waitForTimeout(200);
const btnDisabledAfter20 = await page.evaluate(() => {
  const btn = document.getElementById('cbtn-p1m1');
  return btn ? btn.disabled : 'not found';
});
const scoreAfter20 = await page.textContent('.assess-score-total');
console.log('STEP8 after 20 answers — btn disabled:', btnDisabledAfter20, '(expect false)');
console.log('STEP8 score total:', scoreAfter20.trim(), '(expect 40 / 40)');

// STEP 9: Score band appears (40 → band 33–40)
const bandText = await page.textContent('.assess-band');
console.log('STEP9 score band text starts with:', bandText.trim().substring(0, 60));

// STEP 10: Mark Complete works now
await page.click('#cbtn-p1m1');
await page.waitForTimeout(300);
const btnTextAfter = await page.textContent('#cbtn-p1m1');
const sidebarDone = await page.$('#ni-p1m1.is-done');
console.log('STEP10 btn text after complete:', btnTextAfter.trim(), '(expect ✓ Complete)');
console.log('STEP10 sidebar .is-done:', !!sidebarDone);

// STEP 11: Assessment persists after reload
const savedBefore = await page.evaluate(() => localStorage.getItem('adf_assess_baseline'));
await page.reload({ waitUntil: 'networkidle' });
await page.click('#ni-p1m1');
await page.waitForSelector('#p1m1-assess-mount .assess-legend', { timeout: 5000 });
await page.waitForTimeout(300);
const savedAfter = await page.evaluate(() => localStorage.getItem('adf_assess_baseline'));
const scoreAfterReload = await page.textContent('.assess-score-total');
const selectedCount = await page.$$eval('.seg-btn.selected', els => els.length);
console.log('STEP11 assessment key persisted:', !!savedAfter);
console.log('STEP11 score after reload:', scoreAfterReload.trim(), '(expect 40 / 40)');
console.log('STEP11 selected seg buttons after reload:', selectedCount, '(expect 20)');

// STEP 12: Narrative question textarea saves with debounce
const ta = await page.$('#nar-ta-0');
if (ta) {
  await ta.click();
  await ta.fill('Test narrative answer for Q1');
  await page.waitForTimeout(700); // wait for debounce
  const savedAns = await page.evaluate(() => {
    var s = localStorage.getItem('adf_assess_baseline');
    return s ? JSON.parse(s).answers['q1'] : null;
  });
  console.log('STEP12 narrative Q1 saved:', savedAns === 'Test narrative answer for Q1');
} else {
  console.log('STEP12 narrative Q1 textarea: not found');
}

// STEP 13: doReset clears assessment keys
await page.evaluate(() => {
  const el = document.getElementById('settingsResetArea');
  if (el) showResetConfirm();
});
await page.waitForTimeout(100);
const confirmText = await page.textContent('.settings-rc-confirm').catch(() => '');
console.log('STEP13 reset confirm mentions assessment:', confirmText.includes('assessment'));
const navP = page.waitForNavigation({ waitUntil: 'networkidle' });
page.evaluate(() => doReset()).catch(() => {});
await navP;
const assessKeyAfterReset = await page.evaluate(() => localStorage.getItem('adf_assess_baseline'));
console.log('STEP13 adf_assess_baseline after reset:', assessKeyAfterReset, '(expect null)');

// STEP 14: toggleComplete guard (quiz passed but assessment empty)
await page.click('#ni-p1m1');
await page.waitForTimeout(300);
await page.evaluate(() => {
  startQuiz('p1m1');
  const state = quizState['p1m1'];
  state.answers = [
    { chosen: state.drawn[0].correct, correct: state.drawn[0].correct, isCorrect: true },
    { chosen: state.drawn[1].correct, correct: state.drawn[1].correct, isCorrect: true },
    { chosen: state.drawn[2].correct, correct: state.drawn[2].correct, isCorrect: true },
    { chosen: (state.drawn[3].correct + 1) % 4, correct: state.drawn[3].correct, isCorrect: false },
  ];
  state.current = state.drawn.length;
  showQuizResults('p1m1');
});
await page.waitForTimeout(200);
// Try to complete directly via toggleComplete without assessment
await page.evaluate(() => toggleComplete('p1m1'));
const notCompleted = !(await page.$('#ni-p1m1.is-done'));
console.log('STEP14 toggleComplete blocked without assessment:', notCompleted, '(expect true)');

// STEP 15: No console errors
console.log('STEP15 console errors:', errors.length === 0 ? 'NONE' : errors);

await browser.close();
console.log('\n=== PHASE 3 VERIFICATION COMPLETE ===');
