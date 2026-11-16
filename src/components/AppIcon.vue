<script setup>
defineProps({
  name: { type: String, required: true },
});

// Only the icons used by this project; no icon font or external requests.
const paths = {
  smile: ['M8 14s1.5 3 4 3 4-3 4-3', 'M8 9h.01M16 9h.01'],
  sad: ['M8 17s1.5-3 4-3 4 3 4 3', 'M8 9h.01M16 9h.01'],
  neutral: ['M8 15h8', 'M8 9h.01M16 9h.01'],
  sun: ['M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5'],
  rain: ['M6 15a4 4 0 1 1 1-7.9A5 5 0 0 1 17 8a3.5 3.5 0 0 1 1 7H6', 'M8 18l-1 3m6-3-1 3m6-3-1 3'],
  'cloud-sun': ['M12 3v2M3 12h2M5.6 5.6 7 7m10-1 1.4-1.4', 'M8 12a4 4 0 1 1 7-3', 'M8 20a3 3 0 1 1 1-5.8 4 4 0 0 1 7.8-1A3.5 3.5 0 1 1 18 20H8'],
  arrow: ['M7 17 17 7M7 7h10v10'],
  close: ['M6 6l12 12M6 18 18 6'],
  lock: ['M7 10V7a5 5 0 0 1 10 0v3', 'M5 10h14v11H5z', 'M12 14v3'],
  chart: ['M4 20V10h4v10m2 0V4h4v16m2 0V8h4v12M2 20h20'],
};
const githubPath = 'M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.63 1.22 3.27.93.1-.73.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.57 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.08 1.15a10.7 10.7 0 0 1 5.6 0c2.14-1.45 3.08-1.15 3.08-1.15.61 1.55.23 2.7.11 2.98.72.79 1.16 1.79 1.16 3.02 0 4.33-2.64 5.28-5.15 5.56.4.35.76 1.03.76 2.08v3.1c0 .3.2.65.78.54A11.2 11.2 0 0 0 12 .8Z';
</script>

<template>
  <svg
    class="app-icon"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="none"
    stroke="currentColor"
    stroke-width="1.6"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path v-if="name === 'github'" :d="githubPath" fill="currentColor" stroke="none" />
    <template v-else>
      <circle v-if="['smile', 'sad', 'neutral'].includes(name)" cx="12" cy="12" r="9" />
      <circle v-if="name === 'sun'" cx="12" cy="12" r="4" />
      <path v-for="(path, index) in paths[name]" :key="index" :d="path" />
    </template>
  </svg>
</template>

<style scoped>
.app-icon {
  display: inline-block;
  flex-shrink: 0;
  vertical-align: middle;
}
</style>
