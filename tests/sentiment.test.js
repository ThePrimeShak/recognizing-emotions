import assert from 'node:assert/strict';
import { test } from 'node:test';
import { analyzeText } from '../src/utils/sentiment.js';
import { formatScore } from '../src/utils/format.js';

for (const [text, tone, score] of [
  ['I love this wonderful experience!', 'positive', 7],
  ['This is terrible and disappointing.', 'negative', -5],
  ['The book is on the table.', 'neutral', 0],
  ['good not good', 'neutral', 0],
]) {
  test(`analyzes ${JSON.stringify(text)}`, () => {
    const result = analyzeText(text);
    assert.equal(result.hasText, true);
    assert.equal(result.tone, tone);
    assert.equal(result.score, score);
    assert.equal(result.wordScores.reduce((sum, match) => sum + match.score, 0), score);
  });
}

test('empty and whitespace-only input have a clean initial state', () => {
  for (const text of ['', '   ', '\n\t']) {
    assert.deepEqual(analyzeText(text), {
      hasText: false,
      score: 0,
      comparative: 0,
      tone: 'neutral',
      matchedWordCount: 0,
      positiveWords: [],
      negativeWords: [],
      wordScores: [],
    });
  }
});

test('keeps repeated word occurrences and their negated scores in reading order', () => {
  const result = analyzeText('good not good');
  assert.deepEqual(result.wordScores, [
    { word: 'good', score: 3 },
    { word: 'good', score: -3 },
  ]);
  assert.deepEqual(result.positiveWords, ['good']);
  assert.deepEqual(result.negativeWords, ['good']);
});

test('deduplicates word chips without dropping scores from the breakdown', () => {
  const result = analyzeText('good good good');
  assert.deepEqual(result.positiveWords, ['good']);
  assert.equal(result.wordScores.length, 3);
  assert.equal(result.score, 9);
  assert.equal(result.comparative, 3);
});

test('comparative divides by all tokens, including words without sentiment', () => {
  const result = analyzeText('This is good');
  assert.equal(result.score, 3);
  assert.equal(result.comparative, 1);
});

test('unrecognized and unsupported-language text does not invent sentiment', () => {
  for (const text of ['xyzzy', 'سلام دنیا', '<script>alert(1)</script>']) {
    const result = analyzeText(text);
    assert.equal(result.hasText, true);
    assert.equal(result.tone, 'neutral');
    assert.equal(result.matchedWordCount, 0);
    assert.deepEqual(result.wordScores, []);
  }
});

test('results do not share mutable arrays between analyses', () => {
  analyzeText('good').positiveWords.push('injected');
  assert.deepEqual(analyzeText('good').positiveWords, ['good']);
});

test('formats positive, negative, and zero scores', () => {
  assert.equal(formatScore(3), '+3');
  assert.equal(formatScore(-3), '-3');
  assert.equal(formatScore(0), '0');
});
