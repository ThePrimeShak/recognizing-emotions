import { computed, ref } from 'vue';
import { analyzeText } from '../utils/sentiment.js';

export function useSentiment() {
  const text = ref('');
  const analysis = computed(() => analyzeText(text.value));

  return { text, analysis };
}
