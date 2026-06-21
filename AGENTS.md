## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.


# Project Instructions

This is a personal developer portfolio website with a dark, futuristic, Gotham-inspired command-center aesthetic. It should feel like a developer terminal, classified engineering dossier, and premium SaaS landing page, without using official Batman/DC logos, characters, symbols, or copyrighted superhero imagery.

Use Next.js App Router, TypeScript, Tailwind CSS, Motion, lucide-react, and a command palette implementation using cmdk or a lightweight custom equivalent.

Keep content separate from UI. Public facts must come from `inputs/` or typed content files derived from those inputs. Do not invent resume facts, project claims, metrics, employers, achievements, GitHub details, education, or personal history. Use `TODO` for missing information.

Maintain accessibility, responsiveness, SEO, and performance. Respect reduced-motion preferences. Use semantic HTML, visible focus states, readable contrast, optimized images, and keyboard-friendly interactions.

Work phase by phase. Do not make large unrelated changes. Do not scaffold, install, rewrite, or deploy without a clear phase plan.

Only the main orchestrator session should create or modify actual application code. Other Codex sessions may produce research, review, or handoff documents. Do not assume another session has edited app code unless its handoff is explicitly provided.

Before claiming completion, run lint and build when the app exists:

- `npm run lint`
- `npm run build`
