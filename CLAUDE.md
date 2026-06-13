# CLAUDE.md — Project conventions for Ship That Works

## External links

All links to external URLs use `target="_blank" rel="noopener noreferrer"` and include a `↗` glyph (Unicode U+2197, or `&#x2197;`) immediately after the link text, with no space before it. Example:

```html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">Link text &#x2197;</a>
```

## Em dashes in module body copy

Module body copy avoids em dashes. Use commas, colons, periods, or parentheses instead. The only permitted em dash in a module is in the phase-label header that names the phase (e.g., "Phase 1 — The Honest Reckoning") — that format matches the existing platform label convention and must be preserved there.

## In-page code runner

Floor test code exercises use the in-page sandboxed runner via `mountRunner(containerEl, config)`. Runner IDs are namespaced `ft{module}-{slug}` (e.g., `ft1-greet`, `ft1-discount`). Starter code lives in the module's `showModule` call as `config.starterCode`, not hardcoded inside the runner function. The runner persists edits under `adf_runner_{id}` and course reset clears all `adf_runner_*` keys.

## Quiz bank standards

All options within roughly 25% of each other's character length. Distractors are plausible misconceptions or true-sounding statements that miss the lesson's core point, never absurd throwaways. The correct answer must not be reliably the longest or most qualified option.

## Prediction boxes in floor tests

Floor-test steps that ask the learner to predict, write down, or answer in a sentence get a `mountPredictionBox(containerEl, config)` instance with a namespaced `adf_pred_{id}` storage key. Never instruct a learner to write something down without giving them a place to write it. IDs follow the pattern `ft{module}-{part}` (e.g., `ft2-p1a`). Mount points are `<div id="pred-{id}-mount"></div>` placed immediately after the instruction. Course reset clears all `adf_pred_*` keys.

## Captured response pools

Real Claude outputs for fixed floor-test prompts are stored as `<script type="text/plain" data-pool="{poolId}" data-idx="{n}">` tags at the end of the HTML file, grouped under a `<!-- CAPTURED RESPONSE POOLS -->` comment. To add a captured run: copy a tag, bump `data-idx`, paste the raw response between the tags. No escaping needed; the only string a response may not contain is `</script>`. Never present pools as live generation; keep all three framing-header honesty lines intact (`rpool-header` div: captured-not-live statement, capturedNote with date, personalization caveat). Pool config lives in the `RESPONSE_POOLS` JS const. Mounting: `mountResponsePool(el, poolId)` inside the module's `showModule` setTimeout block.

## Spec-driven commits

When a spec defines multiple commits, produce exactly those commits; never combine spec steps into a single commit.

Standard staging for module and convention changes: `git add foundations.html CLAUDE.md && git commit -m "feat: captured response pool component [ai-assisted]"`
