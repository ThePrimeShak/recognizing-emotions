<script setup>
import { defineAsyncComponent } from 'vue';
import AppIcon from '../AppIcon.vue';
import { formatScore } from '../../utils/format.js';

// Load ECharts only when there are scored words to visualize.
const WordScoreChart = defineAsyncComponent(() => import('./WordScoreChart.vue'));

defineProps({
  analysis: { type: Object, required: true },
});
</script>

<template>
  <section class="panel breakdown" aria-labelledby="breakdown-title">
    <div class="panel-heading">
      <div>
        <h2 id="breakdown-title"><span class="step">03</span> Behind the feeling</h2>
        <p class="section-description">
          The individual words that shape your text’s sentiment.
        </p>
      </div>
      <div class="chart-key">
        <span><span class="word-dot positive-dot"></span> Positive</span>
        <span><span class="word-dot negative-dot"></span> Negative</span>
      </div>
    </div>
    <template v-if="analysis.wordScores.length">
      <WordScoreChart :word-scores="analysis.wordScores" />
      <details class="score-details">
        <summary>View word scores</summary>
        <ul>
          <li v-for="({ word, score }, index) in analysis.wordScores" :key="index">
            {{ word }}: {{ formatScore(score) }}
          </li>
        </ul>
      </details>
    </template>
    <div v-else class="chart-empty">
      <AppIcon name="chart" />
      <p>{{ analysis.hasText ? 'No scored words to show yet.' : 'Every word has a part to play.' }}</p>
      <span>
        {{ analysis.hasText
          ? 'Try one of the examples to explore the word scores.'
          : 'Start typing above to see the word-by-word breakdown.' }}
      </span>
    </div>
  </section>
</template>

<style scoped>
.breakdown {
  margin-top: 22px;
  padding: 25px;
}

.section-description {
  font-size: 11px;
  color: #86907c;
  margin: 9px 0 0 25px;
  line-height: 1.6;
}

.chart-key {
  display: flex;
  gap: 15px;
  font-size: 9px;
  color: #7f8976;
}

.chart-key>span {
  display: flex;
  align-items: center;
  gap: 5px;
}

.chart-empty {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  min-height: 200px;
  text-align: center;
}

.chart-empty>.app-icon {
  font-size: 33px;
  color: #a9b59f;
  margin-bottom: 10px;
}

.chart-empty p {
  margin: 0 0 8px;
  font-size: 12px;
  color: #7b8872;
}

.chart-empty>span {
  font-size: 11px;
  color: #9aa38f;
  line-height: 1.7;
}

.score-details {
  font-size: 11px;
  color: #6d786f;
  padding: 8px;
}

.score-details summary {
  cursor: pointer;
  width: fit-content;
}

.score-details ul {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 24px;
  padding-left: 18px;
}

@media (max-width:480px) {
  .breakdown {
    padding: 19px;
  }
  .breakdown>.panel-heading {
    align-items: flex-start;
    flex-direction: column;
  }
  .chart-key {
    margin: 0 0 0 25px;
  }
  .section-description {
    font-size: 10px;
  }
  .chart-empty {
    min-height: 180px;
  }
  .chart-empty>span {
    font-size: 10px;
  }
}
</style>
