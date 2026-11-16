import assert from 'node:assert/strict';
import { test } from 'node:test';
import { useSentiment } from '../src/composables/useSentiment.js';
import { EXAMPLE_TEXTS } from '../src/constants/examples.js';

test('reactively updates and fully resets analysis when text is cleared', () => {
  const { text, analysis } = useSentiment();
  assert.equal(analysis.value.hasText, false);

  text.value = 'good';
  assert.equal(analysis.value.tone, 'positive');
  assert.equal(analysis.value.score, 3);

  text.value = 'terrible';
  assert.equal(analysis.value.tone, 'negative');
  assert.deepEqual(analysis.value.positiveWords, []);

  text.value = '';
  assert.equal(analysis.value.hasText, false);
  assert.equal(analysis.value.score, 0);
  assert.deepEqual(analysis.value.wordScores, []);
});

test('separate composable instances have independent input state', () => {
  const first = useSentiment();
  const second = useSentiment();
  first.text.value = 'good';
  assert.equal(second.text.value, '');
  assert.equal(second.analysis.value.hasText, false);
});

test('all examples can replace the editor text and produce a breakdown', () => {
  const { text, analysis } = useSentiment();
  for (const example of EXAMPLE_TEXTS) {
    text.value = example.text;
    assert.equal(analysis.value.hasText, true);
    assert(analysis.value.wordScores.length > 0);
  }
});
