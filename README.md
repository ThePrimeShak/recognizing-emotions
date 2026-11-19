# Recognizing Emotions

An English sentiment analyzer built with Vue and ECharts as a university project.

**Live demo:** [Open on Vercel](https://recognizing-emotions-seven.vercel.app)

## Overview

A small university project for exploring lexicon-based sentiment in English text. Analysis runs entirely in the browser.

## Features

- Analyze typed text or choose a built-in example.
- Display overall sentiment, total score, and comparative score.
- Show unique positive and negative word chips.
- Inspect every detected occurrence and its contextual score in a chart.

## Tech stack

Vue 3, JavaScript, Vite, Sentiment, ECharts, Node.js built-in test runner.

## Run locally

Use Node.js 22.12 or newer and npm.

```sh
git clone https://github.com/ThePrimeShak/recognizing-emotions.git
cd recognizing-emotions
npm ci
npm run dev
```

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create the production build |
| `npm run preview` | Preview the production build |
| `npm run test` | Run automated tests |

## Project structure

- `src/components/` — sentiment views, charts, and layout.
- `src/composables/` and `src/utils/` — analysis state and scoring helpers.
- `tests/` — automated logic tests.

## Scope and limitations

Sentiment uses an English word lexicon and basic negation handling. Comparative score is the total divided by token count. This experiment does not classify general emotions; sarcasm, subtle context, and unsupported languages can produce misleading results. No backend or API key is required.

## Author

Built by [ThePrimeShak](https://github.com/ThePrimeShak) · [LinkedIn](https://www.linkedin.com/in/theprimeshak/).
