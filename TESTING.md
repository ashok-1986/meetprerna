# Testing

100% test coverage is the key to great vibe coding. Tests let you move fast, trust your instincts, and ship with confidence — without them, vibe coding is just yolo coding. With tests, it's a superpower.

## Framework

- [vitest](https://vitest.dev) 2.1.5, environment `happy-dom`
- [@testing-library/react](https://testing-library.com/react) + `@testing-library/jest-dom` + `@testing-library/user-event` for component tests
- `@vitest/coverage-v8` for coverage reporting

Config: `vitest.config.ts` (registers the `@/*` → `./src/*` alias from `tsconfig.json`). Setup: `vitest.setup.ts` (loads jest-dom matchers, stubs `document.fonts` since happy-dom doesn't implement the Font Loading API and `src/lib/gsap.ts` calls `document.fonts.ready` at module load).

## Running tests

```bash
pnpm test          # run once (vitest run)
pnpm test:watch    # watch mode
```

CI runs `pnpm test` on every push and pull request via `.github/workflows/test.yml`.

## Test layers

- **Unit tests** — colocated next to the source file as `<name>.test.ts` (e.g. `src/utils/cn.ts` → `src/utils/cn.test.ts`). This is the only layer currently in place.
- **Integration / E2E** — `@playwright/test` and `@axe-core/playwright` are already installed as devDependencies but have no config or specs yet. This is a known gap, not a decision — set up `playwright.config.ts` and an `e2e/` directory when browser-level flows (navigation, gallery filtering, the booking embed) need coverage that a DOM-only unit test can't give you.

## Conventions

- File naming: `<name>.test.ts`, colocated with the file under test.
- Write real assertions against behavior, not existence checks (`expect(x).toBeDefined()` is not a test).
- When fixing a bug, add a regression test that fails without the fix — see `src/animations/reveal.test.ts` and `src/lib/seo.test.ts` for examples tied to specific past bugs.
