<script setup>
import AppHeader from './components/layout/AppHeader.vue';
import AppFooter from './components/layout/AppFooter.vue';
import TextEditor from './components/sentiment/TextEditor.vue';
import SentimentSummary from './components/sentiment/SentimentSummary.vue';
import WordBreakdown from './components/sentiment/WordBreakdown.vue';
import { useSentiment } from './composables/useSentiment.js';

const { text, analysis } = useSentiment();
</script>

<template>
  <AppHeader />
  <main id="main" class="page-shell">
    <section class="intro" aria-labelledby="page-title">
      <span class="eyebrow">
        <span class="status-dot"></span> A SMALL EXPLORATION OF LANGUAGE
      </span>
      <h1 id="page-title">Words carry <span>feeling.</span></h1>
      <p>
        Discover the sentiment behind your words.<br />
        Write a little, and see what your text reveals.
      </p>
    </section>
    <div class="workspace">
      <TextEditor v-model="text" />
      <SentimentSummary :analysis="analysis" />
    </div>
    <WordBreakdown :analysis="analysis" />
    <AppFooter />
  </main>
</template>

<style scoped>
.page-shell {
  max-width: 1160px;
  margin: auto;
  padding: 0 32px;
}

.intro {
  padding: 65px 0 42px;
}

.eyebrow {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 10px;
  letter-spacing: 1.7px;
  font-weight: 650;
  color: var(--green);
}

h1 {
  font-size: clamp(40px,5.4vw,64px);
  font-weight: 550;
  letter-spacing: -3px;
  line-height: 1.13;
  margin: 19px 0 17px;
}

h1 span {
  font-family: Georgia,serif;
  font-weight: 400;
  font-style: italic;
  color: #588064;
}

.intro>p {
  color: var(--muted);
  font-size: 15px;
  line-height: 1.8;
  margin: 0;
}

.workspace {
  display: grid;
  grid-template-columns: 1.12fr 1fr;
  gap: 22px;
  align-items: stretch;
}

@media (min-width:1400px) {
  .intro {
    padding-top: 80px;
  }
}

@media (max-width:800px) {
  .page-shell {
    padding-left: 22px;
    padding-right: 22px;
  }
  .workspace {
    grid-template-columns: 1fr;
    gap: 18px;
  }
  .intro {
    padding: 45px 0 30px;
  }
  h1 {
    letter-spacing: -2px;
  }
}

@media (max-width:480px) {
  .page-shell {
    padding: 0 16px;
  }
  .intro {
    padding: 35px 0 27px;
  }
  .eyebrow {
    font-size: 8px;
    letter-spacing: 1.2px;
  }
  h1 {
    font-size: 39px;
    letter-spacing: -1.9px;
  }
  .intro>p {
    font-size: 13px;
  }
}
</style>
