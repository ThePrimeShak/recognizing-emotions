<script setup>
import { computed } from 'vue';
import AppIcon from '../AppIcon.vue';
import { formatScore } from '../../utils/format.js';

const props = defineProps({
  analysis: { type: Object, required: true },
});
const tones = {
  positive: { label: 'Positive', icon: 'smile' },
  negative: { label: 'Negative', icon: 'sad' },
  neutral: { label: 'Neutral', icon: 'neutral' },
};
const currentTone = computed(() => tones[props.analysis.tone]);
const description = computed(() => {
  if (!props.analysis.hasText) return 'Your words will set the tone.';
  return props.analysis.matchedWordCount
    ? 'A little insight into the tone of your text.'
    : 'No sentiment-bearing words were found.';
});
const wordGroups = computed(() => [
  { tone: 'positive', label: 'Positive words', words: props.analysis.positiveWords },
  { tone: 'negative', label: 'Negative words', words: props.analysis.negativeWords },
]);
</script>

<template>
  <section class="panel result" aria-labelledby="result-title">
    <div class="panel-heading">
      <h2 id="result-title"><span class="step">02</span> The feeling</h2>
      <span class="live-label"><span class="status-dot"></span> LIVE ANALYSIS</span>
    </div>
    <div
      class="tone-summary"
      :class="analysis.hasText ? analysis.tone : 'empty'"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div class="emotion-icon">
        <AppIcon :name="analysis.hasText ? currentTone.icon : 'smile'" />
      </div>
      <h3>{{ analysis.hasText ? `${currentTone.label} sentiment` : 'A blank canvas' }}</h3>
      <p>{{ description }}</p>
    </div>
    <div class="metrics">
      <div>
        <span>Total score</span>
        <strong :class="analysis.hasText ? analysis.tone : ''">
          {{ analysis.hasText ? formatScore(analysis.score) : '—' }}
        </strong>
        <small>Sum of word scores</small>
      </div>
      <div>
        <span>Comparative</span>
        <strong>{{ analysis.hasText ? analysis.comparative.toFixed(2) : '—' }}</strong>
        <small>Score per token</small>
      </div>
    </div>
    <div class="word-groups">
      <div v-for="group in wordGroups" :key="group.tone">
        <h3>
          <span class="word-dot" :class="`${group.tone}-dot`"></span>
          {{ group.label }}
          <span class="word-count">{{ group.words.length }}</span>
        </h3>
        <div class="word-list">
          <span v-for="word in group.words" :key="word" class="word-chip" :class="group.tone">
            {{ word }}
          </span>
          <span v-if="!group.words.length" class="no-words">
            {{ analysis.hasText ? 'None detected' : 'Waiting for your words' }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.result {
  padding: 25px;
}

.live-label {
  font-size: 8px;
  letter-spacing: 1px;
  color: #7c8a72;
  display: flex;
  align-items: center;
  gap: 6px;
}

.tone-summary {
  text-align: center;
  padding: 23px 0 20px;
}

.emotion-icon {
  display: grid;
  place-items: center;
  width: 65px;
  height: 65px;
  margin: 0 auto 12px;
  border-radius: 50%;
  background: #f2f4ec;
  color: #819173;
  font-size: 44px;
}

.tone-summary.positive .emotion-icon {
  background: #edf5ed;
  color: #3c8064;
}

.tone-summary.negative .emotion-icon {
  background: #fbefec;
  color: #bc6959;
}

.tone-summary h3 {
  font-size: 20px;
  font-weight: 550;
  letter-spacing: -.5px;
  margin: 0 0 7px;
}

.tone-summary p {
  font-size: 11px;
  color: var(--muted);
  margin: 0;
  line-height: 1.7;
}

.metrics {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: #f8f9f5;
  border: 1px solid #edf0e7;
  border-radius: 10px;
  padding: 15px 0;
}

.metrics>div {
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 5px;
}

.metrics>div+div {
  border-left: 1px solid #e4e8dd;
}

.metrics span {
  font-size: 10px;
  color: #6c7865;
}

.metrics strong {
  font-size: 27px;
  line-height: 1.2;
  font-weight: 550;
  font-variant-numeric: tabular-nums;
}

.metrics small {
  font-size: 9px;
  color: #909887;
}

.positive {
  color: #35775b;
}

.negative {
  color: #b35e50;
}

.neutral {
  color: #778369;
}

.word-groups {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-top: 20px;
}

.word-groups h3 {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  font-weight: 500;
  margin: 0 0 10px;
}

.word-count {
  margin-left: auto;
  font-size: 9px;
  color: #8c9685;
}

.word-list {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  max-height: 160px;
  overflow: auto;
}

.word-chip {
  border-radius: 5px;
  padding: 4px 7px;
  font-size: 10px;
  overflow-wrap: anywhere;
  max-width: 100%;
}

.word-chip.positive {
  background: #edf5ed;
}

.word-chip.negative {
  background: #fbefec;
}

.no-words {
  font-size: 10px;
  color: #9aA18f;
  line-height: 1.7;
}

@media (max-width:800px) {
  .result {
    padding: 23px;
  }
  .tone-summary {
    padding-top: 20px;
  }
  .word-groups {
    margin-bottom: 5px;
  }
}

@media (max-width:480px) {
  .result {
    padding: 19px;
  }
  .live-label {
    font-size: 7px;
  }
}
</style>
