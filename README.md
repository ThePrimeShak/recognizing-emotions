# Recognizing Emotions

A small university project by [ThePrimeShak](https://www.linkedin.com/in/theprimeshak/) for exploring sentiment in English text. Built with Vue 3, Vite, Sentiment, and ECharts.

Type your own text or choose an example to see the overall sentiment, total score, comparative score, detected words, and a word-by-word chart. Analysis runs entirely in the browser; no backend, API key, or environment variables are required.

## Development

Use Node.js 18 or newer and npm.

```sh
npm ci
npm run dev
```

## Validation and production build

```sh
npm test
npm run build
npm run preview
```

`npm test` uses Node's built-in test runner to check analysis, repeated words, negation, empty input, example texts, and reactive updates. `npm run build` writes the production site to `dist/`. `npm run preview` serves that build locally.

## Code structure

| Path | Responsibility |
| --- | --- |
| `src/App.vue` | Page composition and shared input state |
| `src/components/layout/` | Header, profile links, and footer |
| `src/components/sentiment/` | Text editor, sentiment summary, word breakdown, and chart |
| `src/components/AppIcon.vue` | Small inline SVG icon set |
| `src/composables/useSentiment.js` | Reactive input and derived analysis |
| `src/utils/sentiment.js` | Analysis and normalization, independent of Vue |
| `src/utils/format.js` | Score formatting |
| `src/constants/` | Example texts and project links |
| `src/assets/base.css` | Global styles and shared visual primitives |
| `tests/` | Analysis and composable regression tests |

Component styles are scoped to their Vue files. ECharts is loaded only when scored words are available; the textual breakdown remains separate from the chart.

## How the scores work

The Sentiment package uses an English word lexicon and basic negation handling. Total score is the sum of detected word scores; comparative is that total divided by the number of tokens. Word chips list unique detected words, while the breakdown keeps every occurrence and its contextual score.

This is a sentiment experiment, not a general emotion classifier. Unsupported languages, sarcasm, and subtle context may produce misleading or neutral results.
