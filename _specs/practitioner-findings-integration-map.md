# Practitioner Findings Integration Map
## Routing the AI Friday synthesis into the course content pipeline

This document governs how the practitioner-synthesis material gets absorbed into both courses. It is a content-pipeline planning artifact, not a Claude Code prompt. Module drafts produced in the pipeline from this point forward treat this map as part of the module spec.

## Ground rules

1. **Principles in, product mechanics out.** Both courses remain Claude Code-centric. Cursor-specific mechanics (semantic indexing, @-reference family, .cursorignore, plan-file UI) and Gemini-specific features (1M context, Deep Research, Notebook LM) are excluded. The underlying principles (context targeting, reference-don't-paste, token cost awareness, research-then-build workflow) are included, translated to Claude Code equivalents. One sidebar in Engineer Phase 1 acknowledges the multi-tool landscape and that principles transfer.
2. **Voice and attribution.** All material is rewritten in the course's voice as unattributed practitioner experience ("teams running AI-assisted development at scale consistently find..."). No employer attribution, no lifted distinctive phrasing. Specific incidents from the synthesis (e.g., the credential-exfiltration ticket, the deploy-date calculation bug, the production-mutation hook) are NEVER retold as-is: each is reconstructed as a fictional mock scenario with changed technologies, domains, and details that preserves only the failure mechanism. The test before publishing any example: a person who attended the original sessions should not be able to identify the source incident. Factual/technical claims still cite primary sources (Anthropic docs, etc.), not anecdote.
3. **Verify before teaching.** Tool-behavior claims in the synthesis (e.g., rule precedence behavior, model cost dynamics) are re-verified against current Claude Code documentation at module draft time. The synthesis itself warns that it ages fast; honor that.

## Net-new modules (the two real gaps this exposes)

### Foundations Phase 7 addition — "Using the Agent Safely" (beginner depth)
Audience: the assigned enterprise learner and the new builder, neither of whom knows what their credentials can do.
- Prompt injection in plain terms: the agent can mistake instructions embedded in data (a ticket, a web page, a file) for instructions from you. The documented credential-exfiltration incident pattern, told as a story.
- Data is not instructions: the mindset, plus what it means practically (be suspicious when the agent suddenly wants to do something you didn't ask for after reading external content).
- What never to paste: credentials, customer data, regulated data; why "the vendor doesn't train on my data" doesn't cover everything the agent can reach.
- Least privilege for non-experts: your logged-in CLIs carry YOUR permissions; the agent inherits them; ask for scoped/read-only access before pointing an agent at anything that matters.
- The governing mindset: supervise the agent like an untrusted junior employee; watch it work, stop it immediately, codify the correction.
- Floor test: a guided spot-the-injection exercise (provided sample ticket/file content containing embedded instructions; learner identifies what the agent should treat as data).

### Engineer Phase 5/6 addition — "Agent Security and Least Privilege" (professional depth)
Everything above, plus:
- Scoped credentials and profiles for agent use; read-only vs write at auth time.
- The secret-manager alias circuit-breaker pattern (token injected at runtime, human confirmation moment before execution).
- MCP governance: approved-only, locally hosted preference, third-party data-flow risk, why read-only DB access is still sensitive, the enterprise-agreement coverage gap when agents reach third-party tools.
- MCP context cost management: every registered MCP's tool descriptions load into every session; disable unused ones.
- CLI vs MCP decision rule: prefer a stable vendor CLI when one exists (lower context overhead, often more reliable, models already trained on common CLIs).
- Hooks as the enforcement layer: rules are probabilistic (model-applied), hooks are deterministic. Hard "never do this" guarantees (e.g., block mutations against production) belong in hooks, not rules. Security-critical rules get defined at multiple layers because precedence is applied by judgment, not determinism.

## Enhancements to already-planned modules

### Foundations course

**1.2 How Claude Code Actually Works** — add the four mental-model facts, beginner translation:
- Context window as finite working memory (why the agent "forgets" parts of big files).
- Non-determinism: same prompt, different results; anything that must be repeatable needs a deterministic backstop (a test, a tool), not trust.
- Training cutoff: the model confidently writes against outdated versions unless given current information.
- Confidence is not correctness: polished formatting (headers, clean code blocks) is the model's default presentation, not evidence of rigor. Pairs directly with 1.1's calibration argument; cross-reference it.

**5.1 CLAUDE.md and Session Discipline** — add:
- Memory degradation: long sessions increasingly weight the model's own recent output over the original source of truth; errors compound late in long conversations.
- The re-anchoring move: explicitly restating "this is the truth you're working from" when drift appears.
- The session retrospective habit: end significant sessions by having the agent review what went well/poorly, then fold lessons into CLAUDE.md so mistakes don't repeat.

**5.2 Surgical Prompts** — add:
- The Context / Intent / Format structure as the default prompt skeleton, with worked examples.
- Modifier-language calibration: depth modifiers ("cover every permutation," "be extremely meticulous") measurably increase effort; matching intensity to task instead of maxing everything.
- The interview-me technique: before finalizing a complex prompt, have the model interrogate it for gaps.
- Clarifying questions are a feature: an agent that asks is preventing the low-effort guess.

**5.5 When Claude Code Gets It Wrong** — restructure around the three failure modes, each with its own detection method:
- Hallucinations (invented methods/endpoints): caught by docs cross-check and running the code.
- Outdated patterns (valid, runs, deprecated): the sneakiest; caught by pinning current docs and checking versions.
- Subtle logic errors (wrong at boundaries): caught by targeted edge-case tests; connects directly to the silent-failure thread from 1.1.
- Corner-cutting tells: skipped tests, empty assertions, claimed success without work; smaller scoped requests as mitigation.
- "Done" is a claim, not a fact: verification protocol including the recursive self-review prompt ("re-evaluate your own work against the plan; tell me what was missed").
- Environment-mismatch failures (the agent assumes the wrong shell/OS): the agent reaches for syntax from one environment while running in another, and the command fails or, worse, half-succeeds. Concrete teachable instance: the agent generates a bash heredoc commit (`git commit -m "$(cat <<'EOF' ... EOF)"`) while the terminal is PowerShell on Windows, which cannot parse `<<` redirection; the shell flags "missing file specification after redirection operator." Lesson cluster: (1) the agent does not reliably know your shell/OS unless told, so state it in CLAUDE.md/rules; (2) read the command the agent proposes BEFORE approving it, because this class of error is visible in the proposed command itself (ties to 1.2's "approvals are read, not rhythm"); (3) prefer portable forms (single-line `-m` commit messages work in both bash and PowerShell). Mock the example for the course (generic repo/command), do not use shipthatworks specifics.
- Worked example: this platform's own build, where a four-phase plan stopped at Phase 2 and "pushed" was mistaken for "finished" until a learner walkthrough caught it. (Real post-mortem, anonymized to the project.)

**Phase 3/5 testing modules** — add the source-of-truth distinction:
- Characterization tests deliberately pin CURRENT behavior, bugs included; that is their job during refactoring.
- Validation/correctness tests assert INTENDED behavior and must come from requirements, never derived from the code itself.
- The trap: asking the model to "write tests" or "derive requirements" from existing code makes it assume the code is correct and faithfully enshrine bugs, including writing tests that assert the buggy behavior.
- The safe order of operations: have the model find and present suspected bugs first; the human confirms which are real; only then derive requirements and tests.
- Requirements-driven prompting ("here is what this should do; review against that") surfaces more issues than open-ended "review this."

### Engineer course

**Phase 1 Mental Model** — add:
- The autonomy ladder (responder, co-pilot, agent, fully autonomous) and where today's practical frontier sits.
- The agent cognitive loop: goal, plan, execute with tools, observe, adapt; the defining difference from a co-pilot is that an agent runs the test and reads the output.
- Plan-and-execute vs ReAct as complementary planning modes and when each fits.
- The four memory types (working, semantic, episodic, long-term) mapped to Claude Code concretely: context window, CLAUDE.md/rules/skills, in-task attempt history, and project memory/search.
- Sidebar: the multi-tool landscape exists; these principles transfer; this course teaches them through Claude Code.

**Phase 2 Environment Setup** — add:
- Rules precedence caveat: layering is applied by model judgment, not deterministically; phrasing and specificity matter; anything security-critical goes in every applicable layer.
- Hooks vs rules as the enforcement distinction (full treatment lives in the new security module; the config module introduces it).
- Command naming hygiene: never shadow built-in command names; prefix custom commands.
- Declare your environment: the agent does not reliably know your shell or OS and will assume a default (often bash/Unix). State the actual environment in CLAUDE.md/rules (e.g., "shell is PowerShell on Windows; use single-line -m commit messages, never bash heredoc"). This prevents a whole class of environment-mismatch command failures rather than fixing them one at a time. Pairs with the failure-mode treatment in Foundations 5.5.

**Phase 3 Prompt Engineering** — add:
- CIF as the shared skeleton with the Foundations version, at professional depth.
- The cost-tiering pattern: draft the plan with a cheap model, gap-analyze with a strong one ("find missing tests, risks, make steps explicit enough for a lower model to execute"), execute with the cheap one.
- The counterintuitive cost fact: a cheaper model can cost more by burning more tokens to reach the same answer; verify default model settings; switching models mid-run is legitimate.

**Phase 4 Refactor Workflow / 4.5 Large-Scale Refactors** — add:
- Per-task plan execution beats whole-plan handoff for intricate work: handing an agent the entire plan invites rushing and skipped steps; high-stakes steps go individually, the rest batch.
- Plan-update failure mode: models append amendment sections instead of rewriting the relevant section, bloating context with superseded decisions; point the model at the exact section to rewrite.

**Phase 5 Production Grade** — add:
- Deterministic validators: date logic, counts, percentages, schedule math get offloaded to a small tool plus an end-of-run validation pass; never trusted to the model's arithmetic across runs.
- Risk-weighted review attention: deep scrutiny on complex logic, boundaries, and cross-file derivations; lighter touch on boilerplate CRUD patterns the models rarely miss. Paired warning: demanded "100% coverage" produces low-value tests of framework glue.

**Phase 6 Advanced / Team** — add a multi-agent coordination treatment:
- Why parallel agents collide: no shared working or episodic memory; only the semantic layer and repo state are common ground.
- Git worktrees as the isolation mechanism; orchestrator/sub-agent topology; merge as the safety net.
- The token tax of inter-agent communication and the templatization mitigation (orchestrator generates a template once; a utility fills variables per sub-agent).
- The team maturity path: governed shared rules/skills/commands distributed centrally, then org-specific knowledge layers, then persistent domain-expert agents. Frame as direction of travel, not a week-one requirement.

## Explicitly excluded (and why)

- Cursor indexing, @-references, .cursorignore, plan-file UI mechanics, cross-project views: wrong tool for these courses; principles extracted above.
- Gemini context-window specifics, Deep Research mechanics, Notebook LM features: same reason. The research-then-build workflow principle (cheap research first, agent applies findings) survives, tool-agnostic, in Engineer Phase 3.
- Tool-vs-tool comparative claims (e.g., relative index quality): unverifiable, fast-aging, and off-mission for a Claude Code course.

## Production-line impact

- Net-new modules: +1 Foundations (Using the Agent Safely), +1 Engineer (Agent Security and Least Privilege). Insert both into the priority stack adjacent to their security phases; the Foundations one ranks HIGH for the enterprise audience and should be pulled forward in the build order.
- Everything else lands inside modules already scheduled; per-module drafting cost rises modestly (each affected module's spec now includes its section of this map).
- The 1.1 module already shipped is unaffected except for one cross-reference to be added when 1.2 is drafted (confidence-is-not-correctness pairs with the calibration section).
