## Testing

Run: `pnpm test` (vitest run). Watch mode: `pnpm test:watch`. Tests are colocated as `<name>.test.ts` next to the file under test. Full details: `TESTING.md`.

- 100% test coverage is the goal — tests make vibe coding safe instead of yolo coding.
- Write a test for every new function.
- When fixing a bug, write a regression test that fails without the fix.
- When adding a conditional (if/else, switch), test both paths.
- Never commit code that breaks existing tests.
