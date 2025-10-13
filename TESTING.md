Run the headless card-generation test locally

1. Install dev dependencies:

```powershell
npm install
```

2. Run the cards test:

```powershell
npm run test:cards
```

What it does:
- Starts a small static server serving the project root
- Launches Puppeteer, loads `universities.html`
- Asserts `.card` elements are present and that no console errors occurred

Exit codes:
- 0: success
- 2: failure (console errors or no cards found)
