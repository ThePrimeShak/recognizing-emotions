<script setup>
import { PROJECT } from '../../constants/project.js';
</script>

<template>
  <footer class="page-footer">
    <span>{{ PROJECT.name }} <span class="footer-dot">·</span> A university project</span>
    <p>
      A simple, lexicon-based experiment. Language is nuanced;
      scores may miss context or sarcasm.
    </p>
  </footer>
</template>

<style scoped>
.page-footer {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 25px;
  padding: 26px 0 30px;
  font-size: 10px;
  color: #89917f;
  line-height: 1.8;
}

.page-footer>span {
  flex-shrink: 0;
}

.page-footer p {
  margin: 0;
  max-width: 400px;
  text-align: right;
}

.footer-dot {
  margin: 0 5px;
}

@media (max-width:800px) {
  .page-footer {
    flex-direction: column;
    gap: 6px;
  }
  .page-footer p {
    text-align: left;
    max-width: none;
  }
}

@media (max-width:480px) {
  .page-footer {
    font-size: 9px;
  }
}
</style>
