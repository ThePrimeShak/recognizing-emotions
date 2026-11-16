# Recognizing Emotions

A small university project by [ThePrimeShak](https://www.linkedin.com/in/theprimeshak/) for exploring sentiment in English text. Built with Vue 3, Vite, Sentiment, and ECharts.

Type your own text or choose an example to see the overall sentiment, total score, comparative score, detected words, and a word-by-word chart. Analysis runs entirely in the browser; no backend, API key, or environment variables are required.

## How the scores work

The Sentiment package uses an English word lexicon and basic negation handling. Total score is the sum of detected word scores; comparative is that total divided by the number of tokens. Word chips list unique detected words, while the breakdown keeps every occurrence and its contextual score.

This is a sentiment experiment, not a general emotion classifier. Unsupported languages, sarcasm, and subtle context may produce misleading or neutral results.
