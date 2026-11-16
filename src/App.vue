<script setup>
import { computed, ref } from 'vue';
import Sentiment from 'sentiment';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';
import { GridComponent, TooltipComponent } from 'echarts/components';
import VChart from 'vue-echarts';
import Header from './components/Header.vue';

use([CanvasRenderer, BarChart, GridComponent, TooltipComponent]);
const sentiment = new Sentiment();
const userText = ref('');
const result = computed(() => sentiment.analyze(userText.value));
const hasText = computed(() => Boolean(userText.value.trim()));
const wordCount = computed(() => userText.value.trim().split(/\s+/).filter(Boolean).length);
const tone = computed(() => result.value.score > 0 ? 'positive' : result.value.score < 0 ? 'negative' : 'neutral');
const toneLabel = computed(() => tone.value.charAt(0).toUpperCase() + tone.value.slice(1));
const toneIcon = computed(() => ({ positive: 'mdi-emoticon-happy-outline', negative: 'mdi-emoticon-sad-outline', neutral: 'mdi-emoticon-neutral-outline' }[tone.value]));
const positiveWords = computed(() => [...new Set(result.value.positive)]);
const negativeWords = computed(() => [...new Set(result.value.negative)]);
const matchedWords = computed(() => result.value.calculation.flatMap(Object.entries).reverse());
const examples = [
  { label: 'Something positive', icon: 'mdi-weather-sunny', text: 'I love learning new things. This project was a wonderful experience!' },
  { label: 'A little negative', icon: 'mdi-weather-rainy', text: 'The terrible weather ruined our plans. I feel sad and disappointed.' },
  { label: 'Mixed feelings', icon: 'mdi-weather-partly-cloudy', text: 'The movie was great, but the ending was disappointing.' },
];
const signed = (value) => value > 0 ? `+${value}` : String(value);
const chartOption = computed(() => ({
  animationDuration: 350,
  grid: { left: 42, right: 22, top: 24, bottom: 65, containLabel: true },
  tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }, confine: true, renderMode: 'richText' },
  xAxis: { type: 'category', data: matchedWords.value.map(([word]) => word), axisTick: { show: false }, axisLine: { lineStyle: { color: '#dfe5e1' } }, axisLabel: { color: '#66756c', interval: 0, rotate: 35, width: 85, overflow: 'truncate' } },
  yAxis: { type: 'value', minInterval: 1, axisLabel: { color: '#66756c' }, splitLine: { lineStyle: { color: '#edf0ed', type: 'dashed' } } },
  series: [{ type: 'bar', barMaxWidth: 40, label: { show: true, position: 'top', color: '#526159' }, data: matchedWords.value.map(([, score]) => ({ value: score, itemStyle: { color: score > 0 ? '#3c8064' : '#cc7767', borderRadius: 5 } })) }],
}));
</script>

<template>
  <Header />
  <main id="main" class="page-shell">
    <section class="intro" aria-labelledby="page-title">
      <span class="eyebrow"><span class="status-dot"></span> A SMALL EXPLORATION OF LANGUAGE</span>
      <h1 id="page-title">Words carry <span>feeling.</span></h1>
      <p>Discover the sentiment behind your words.<br class="desktop-break" /> Write a little, and see what your text reveals.</p>
    </section>

    <div class="workspace">
      <section class="panel editor" aria-labelledby="editor-title">
        <div class="panel-heading"><h2 id="editor-title"><span class="step">01</span> Your words</h2><span class="tag">ENGLISH TEXT</span></div>
        <label class="sr-only" for="text-input">Enter English text to analyze</label>
        <textarea id="text-input" v-model="userText" placeholder="What's on your mind? Write a sentence or two…" spellcheck="true" aria-describedby="input-help" />
        <div class="editor-meta"><span>{{ wordCount }} {{ wordCount === 1 ? 'word' : 'words' }} <span class="meta-divider">/</span> {{ userText.length }} characters</span><button type="button" class="clear-button" :disabled="!userText" @click="userText = ''"><i class="mdi mdi-close" aria-hidden="true"></i> Clear</button></div>
        <div class="examples"><p>Need a starting point? Try an example.</p><div class="example-buttons"><button v-for="example in examples" :key="example.label" type="button" @click="userText = example.text"><i :class="['mdi', example.icon]" aria-hidden="true"></i>{{ example.label }}<span aria-hidden="true">↗</span></button></div></div>
        <p id="input-help" class="privacy-note"><i class="mdi mdi-lock-outline" aria-hidden="true"></i> Just your browser. Your text is never sent to a server.</p>
      </section>

      <section class="panel result" aria-labelledby="result-title">
        <div class="panel-heading"><h2 id="result-title"><span class="step">02</span> The feeling</h2><span class="live-label"><span class="status-dot"></span> LIVE ANALYSIS</span></div>
        <div class="tone-summary" :class="hasText ? tone : 'empty'" role="status" aria-live="polite" aria-atomic="true">
          <div class="emotion-icon"><i :class="['mdi', hasText ? toneIcon : 'mdi-emoticon-outline']" aria-hidden="true"></i></div>
          <h3>{{ hasText ? `${toneLabel} sentiment` : 'A blank canvas' }}</h3>
          <p>{{ !hasText ? 'Your words will set the tone.' : result.words.length ? 'A little insight into the tone of your text.' : 'No sentiment-bearing words were found.' }}</p>
        </div>
        <div class="metrics"><div><span>Total score</span><strong :class="hasText ? tone : ''">{{ hasText ? signed(result.score) : '—' }}</strong><small>Sum of word scores</small></div><div><span>Comparative</span><strong>{{ hasText ? result.comparative.toFixed(2) : '—' }}</strong><small>Score per token</small></div></div>
        <div class="word-groups"><div><h3><span class="word-dot positive-dot"></span> Positive words <span class="word-count">{{ positiveWords.length }}</span></h3><div class="word-list"><span v-for="word in positiveWords" :key="word" class="word-chip positive">{{ word }}</span><span v-if="!positiveWords.length" class="no-words">{{ hasText ? 'None detected' : 'Waiting for your words' }}</span></div></div><div><h3><span class="word-dot negative-dot"></span> Negative words <span class="word-count">{{ negativeWords.length }}</span></h3><div class="word-list"><span v-for="word in negativeWords" :key="word" class="word-chip negative">{{ word }}</span><span v-if="!negativeWords.length" class="no-words">{{ hasText ? 'None detected' : 'Waiting for your words' }}</span></div></div></div>
      </section>
    </div>

    <section class="panel breakdown" aria-labelledby="breakdown-title">
      <div class="panel-heading"><div><h2 id="breakdown-title"><span class="step">03</span> Behind the feeling</h2><p class="section-description">The individual words that shape your text’s sentiment.</p></div><div class="chart-key"><span><span class="word-dot positive-dot"></span> Positive</span><span><span class="word-dot negative-dot"></span> Negative</span></div></div>
      <div v-if="matchedWords.length" class="chart-scroll"><v-chart class="chart" :style="{ minWidth: `${Math.max(280, matchedWords.length * 58)}px` }" :option="chartOption" autoresize role="img" aria-label="Bar chart showing sentiment scores for detected words" /><details class="score-details"><summary>View word scores</summary><ul><li v-for="([word, score], index) in matchedWords" :key="index">{{ word }}: {{ signed(score) }}</li></ul></details></div>
      <div v-else class="chart-empty"><i class="mdi mdi-chart-bar" aria-hidden="true"></i><p>{{ hasText ? 'No scored words to show yet.' : 'Every word has a part to play.' }}</p><span>{{ hasText ? 'Try one of the examples to explore the word scores.' : 'Start typing above to see the word-by-word breakdown.' }}</span></div>
    </section>
    <footer class="page-footer"><span>Recognizing Emotions <span class="footer-dot">·</span> A university project</span><p>A simple, lexicon-based experiment. Language is nuanced; scores may miss context or sarcasm.</p></footer>
  </main>
</template>
