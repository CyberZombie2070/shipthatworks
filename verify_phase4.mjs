import { chromium } from 'playwright';

const BASE = 'http://localhost:8234';
const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext();
const page = await ctx.newPage();
const errors = [];
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', e => errors.push('PAGE ERROR: ' + e.message));

await page.goto(BASE + '/foundations.html');
await page.evaluate(() => {
  localStorage.removeItem('adf_runner_ft1-greet');
  localStorage.removeItem('adf_runner_ft1-discount');
});
await page.reload({ waitUntil: 'networkidle' });

// STEP 1: Navigate to p1m1, both runners mount
await page.click('#ni-p1m1');
await page.waitForSelector('#ft1-greet-mount .runner-wrap', { timeout: 5000 });
await page.waitForSelector('#ft1-discount-mount .runner-wrap', { timeout: 5000 });
console.log('STEP1 both runners mounted');

// STEP 2: ft1-greet has starter comment code
const greetCode = await page.$eval('#runner-ed-ft1-greet', el => el.value);
console.log('STEP2 ft1-greet starter starts with:', greetCode.trim().substring(0, 40));
console.log('STEP2 ft1-greet is comment only:', greetCode.trim().startsWith('//'));

// STEP 3: ft1-discount has applyDiscount function pre-loaded
const discountCode = await page.$eval('#runner-ed-ft1-discount', el => el.value);
console.log('STEP3 ft1-discount has applyDiscount:', discountCode.includes('applyDiscount'));
console.log('STEP3 ft1-discount has console.log:', discountCode.includes('console.log(applyDiscount(50, 20))'));

// STEP 4: Run greet exercise — paste function, run, see output
await page.$eval('#runner-ed-ft1-greet', (el) => {
  el.value = 'function greet(name) {\n  return "Hello, " + name + "!";\n}\nconsole.log(greet("World"));';
});
await page.click('#runner-run-ft1-greet');
await page.waitForTimeout(1000);
const greetOutput = await page.textContent('#runner-console-ft1-greet');
console.log('STEP4 greet output:', greetOutput.trim());
console.log('STEP4 greet contains Hello:', greetOutput.includes('Hello, World!'));

// STEP 5: greet() with no arg shows "undefined"
await page.$eval('#runner-ed-ft1-greet', (el) => {
  el.value = 'function greet(name) {\n  return "Hello, " + name + "!";\n}\nconsole.log(greet());';
});
await page.click('#runner-run-ft1-greet');
await page.waitForTimeout(1000);
const undefOutput = await page.textContent('#runner-console-ft1-greet');
console.log('STEP5 greet() undefined output:', undefOutput.trim());
console.log('STEP5 contains "undefined":', undefOutput.includes('undefined'));

// STEP 6: console.error renders as error level
await page.$eval('#runner-ed-ft1-greet', el => { el.value = 'console.error("test error")'; });
await page.click('#runner-run-ft1-greet');
await page.waitForTimeout(1000);
const errLine = await page.$('#runner-console-ft1-greet .runner-line.error');
console.log('STEP6 error line present:', !!errLine);

// STEP 7: Syntax error shows red error message, Run re-enables
await page.$eval('#runner-ed-ft1-greet', el => { el.value = 'function ('; });
await page.click('#runner-run-ft1-greet');
await page.waitForTimeout(1000);
const syntaxErrLine = await page.$('#runner-console-ft1-greet .runner-line.error');
const runBtnEnabled = await page.$eval('#runner-run-ft1-greet', el => !el.disabled);
console.log('STEP7 syntax error shown:', !!syntaxErrLine);
console.log('STEP7 Run re-enabled after error:', runBtnEnabled);

// STEP 8: console.log({a:1}) renders as JSON
await page.$eval('#runner-ed-ft1-greet', el => { el.value = 'console.log({a: 1})'; });
await page.click('#runner-run-ft1-greet');
await page.waitForTimeout(1000);
const objOutput = await page.textContent('#runner-console-ft1-greet');
console.log('STEP8 object renders as JSON:', objOutput.includes('"a"') || objOutput.includes('{"a":1}'));

// STEP 9: Run ft1-discount — outputs 40
await page.click('#runner-run-ft1-discount');
await page.waitForTimeout(1000);
const discountOutput = await page.textContent('#runner-console-ft1-discount');
console.log('STEP9 discount output:', discountOutput.trim(), '(expect 40)');
console.log('STEP9 contains 40:', discountOutput.includes('40'));

// STEP 10: Stop button and watchdog rendering
// Manually force running state to test Stop (avoids infinite-loop CDP hang)
await page.evaluate(() => {
  // Force running state on ft1-greet without spawning a blocking iframe
  runnerStates['ft1-greet'].running = true;
  runnerSetRunning('ft1-greet', true);
});
const runDisabledDuring = await page.evaluate(() => document.getElementById('runner-run-ft1-greet').disabled);
const stopVisible = await page.evaluate(() => document.getElementById('runner-stop-ft1-greet').style.display !== 'none');
console.log('STEP10 Run disabled while running:', runDisabledDuring);
console.log('STEP10 Stop button visible while running:', stopVisible);
// Verify watchdog message renders at system level (amber)
await page.evaluate(() => {
  document.getElementById('runner-console-ft1-greet').innerHTML = '';
  runnerAppendLine('ft1-greet', 'Still running after 5s. Possible infinite loop. Press Stop to end it.', 'system');
});
const watchdogLine = await page.$('#runner-console-ft1-greet .runner-line.system');
const watchdogMsg = await page.evaluate(() => document.getElementById('runner-console-ft1-greet').textContent);
console.log('STEP10 watchdog line class is system:', !!watchdogLine);
console.log('STEP10 watchdog message text:', watchdogMsg.includes('Still running'));
// Stop
await page.evaluate(() => runnerStop('ft1-greet'));
await page.waitForTimeout(100);
const runReenabledAfterStop = await page.evaluate(() => !document.getElementById('runner-run-ft1-greet').disabled);
const stopHiddenAfterStop = await page.evaluate(() => document.getElementById('runner-stop-ft1-greet').style.display === 'none');
console.log('STEP10 Run re-enabled after Stop:', runReenabledAfterStop);
console.log('STEP10 Stop hidden after Stop:', stopHiddenAfterStop);

// STEP 11: Tab key inserts two spaces
await page.$eval('#runner-ed-ft1-greet', el => { el.value = ''; el.focus(); });
const edEl = await page.$('#runner-ed-ft1-greet');
await edEl.focus();
await page.keyboard.press('Tab');
const afterTab = await page.$eval('#runner-ed-ft1-greet', el => el.value);
console.log('STEP11 Tab inserts two spaces:', afterTab === '  ');

// STEP 12: Code persists after reload (save debounce)
await page.$eval('#runner-ed-ft1-greet', el => { el.value = 'console.log("persisted")'; });
await page.$eval('#runner-ed-ft1-greet', el => el.dispatchEvent(new Event('input')));
await page.waitForTimeout(700);
const savedKey = await page.evaluate(() => localStorage.getItem('adf_runner_ft1-greet'));
console.log('STEP12 code saved to localStorage:', savedKey === 'console.log("persisted")');

// STEP 13: Reset code restores starter, clears key
await page.evaluate(() => runnerReset('ft1-greet'));
const afterReset = await page.$eval('#runner-ed-ft1-greet', el => el.value);
const keyAfterReset = await page.evaluate(() => localStorage.getItem('adf_runner_ft1-greet'));
console.log('STEP13 reset restores starter:', afterReset.trim().startsWith('//'));
console.log('STEP13 storage key cleared:', keyAfterReset === null);

// STEP 14: doReset clears adf_runner_* keys
await page.$eval('#runner-ed-ft1-discount', el => { el.value = 'changed'; el.dispatchEvent(new Event('input')); });
await page.waitForTimeout(700);
const navP = page.waitForNavigation({ waitUntil: 'networkidle' });
page.evaluate(() => doReset()).catch(() => {});
await navP;
const runnerKeyAfterReset = await page.evaluate(() => localStorage.getItem('adf_runner_ft1-discount'));
console.log('STEP14 adf_runner_* cleared on course reset:', runnerKeyAfterReset === null);

// STEP 15: No unexpected console errors (filter the intentional test error from STEP 6)
const unexpectedErrors = errors.filter(e => e !== 'test error');
console.log('STEP15 unexpected console errors:', unexpectedErrors.length === 0 ? 'NONE' : unexpectedErrors);

await browser.close();
console.log('\n=== PHASE 4 VERIFICATION COMPLETE ===');
