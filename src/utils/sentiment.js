import Sentiment from 'sentiment';

const analyzer = new Sentiment();

/** Analyze English text without coupling the result to Vue or the chart library. */
export function analyzeText(text) {
  const hasText = Boolean(text.trim());
  const result = analyzer.analyze(hasText ? text : '');

  return {
    hasText,
    score: result.score,
    comparative: result.comparative,
    tone: result.score > 0 ? 'positive' : result.score < 0 ? 'negative' : 'neutral',
    matchedWordCount: result.words.length,
    positiveWords: [...new Set(result.positive)],
    negativeWords: [...new Set(result.negative)],
    // Sentiment returns matches backwards. Preserve each occurrence and its context score.
    wordScores: result.calculation
      .flatMap(Object.entries)
      .reverse()
      .map(([word, score]) => ({ word, score })),
  };
}
