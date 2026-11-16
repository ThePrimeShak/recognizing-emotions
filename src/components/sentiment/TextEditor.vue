<script setup>
import { computed } from 'vue';
import AppIcon from '../AppIcon.vue';
import { EXAMPLE_TEXTS } from '../../constants/examples.js';

const props = defineProps({
  modelValue: { type: String, required: true },
});
const emit = defineEmits(['update:modelValue']);
const wordCount = computed(() => props.modelValue.trim().split(/\s+/).filter(Boolean).length);
</script>

<template>
  <section class="panel editor" aria-labelledby="editor-title">
    <div class="panel-heading">
      <h2 id="editor-title"><span class="step">01</span> Your words</h2>
      <span class="tag">ENGLISH TEXT</span>
    </div>
    <label class="sr-only" for="text-input">Enter English text to analyze</label>
    <textarea
      id="text-input"
      :value="modelValue"
      placeholder="What's on your mind? Write a sentence or two…"
      spellcheck="true"
      aria-describedby="input-help"
      @input="emit('update:modelValue', $event.target.value)"
    />
    <div class="editor-meta">
      <span>
        {{ wordCount }} {{ wordCount === 1 ? 'word' : 'words' }}
        <span class="meta-divider">/</span> {{ modelValue.length }} characters
      </span>
      <button
        type="button"
        class="clear-button"
        :disabled="!modelValue"
        @click="emit('update:modelValue', '')"
      >
        <AppIcon name="close" /> Clear
      </button>
    </div>
    <div class="examples">
      <p>Need a starting point? Try an example.</p>
      <div class="example-buttons">
        <button
          v-for="example in EXAMPLE_TEXTS"
          :key="example.label"
          type="button"
          @click="emit('update:modelValue', example.text)"
        >
          <AppIcon :name="example.icon" />
          {{ example.label }}
          <span aria-hidden="true">↗</span>
        </button>
      </div>
    </div>
    <p id="input-help" class="privacy-note">
      <AppIcon name="lock" /> Just your browser. Your text is never sent to a server.
    </p>
  </section>
</template>

<style scoped>
textarea {
  font: inherit;
}

textarea {
  -webkit-tap-highlight-color: transparent;
}

.editor {
  padding: 25px;
}

.tag {
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 1px;
  color: #7a8578;
  background: #f4f6f1;
  border: 1px solid #e9ece4;
  padding: 5px 7px;
  border-radius: 5px;
}

textarea {
  width: 100%;
  min-height: 215px;
  resize: vertical;
  display: block;
  border: 1px solid #e1e6dc;
  border-radius: 10px;
  background: #fafbf8;
  color: #263c31;
  padding: 19px;
  font-size: 16px;
  line-height: 1.8;
  margin-top: 23px;
  transition: border-color .2s,box-shadow .2s;
}

textarea::placeholder {
  color: #90998d;
}

textarea:focus {
  outline: none;
  border-color: #6e9675;
  box-shadow: 0 0 0 3px #6e96751a;
}

.editor-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  color: #879081;
  font-size: 10px;
  padding: 10px 1px;
}

.meta-divider {
  margin: 0 6px;
  color: #c5cbbf;
}

.clear-button {
  border: 0;
  background: none;
  color: #687763;
  font-size: 11px;
  padding: 5px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.clear-button:hover:not(:disabled) {
  color: #263c31;
}

.examples {
  border-top: 1px solid #edf0e8;
  margin-top: 10px;
  padding-top: 17px;
}

.examples>p {
  font-size: 11px;
  color: var(--muted);
  margin: 0 0 12px;
}

.example-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.example-buttons button {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 7px;
  color: #59674f;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 9px;
  font-size: 10px;
  transition: background .15s,border-color .15s;
}

.example-buttons button:hover {
  background: #f0f5ed;
  border-color: #aabc9f;
}

.example-buttons .app-icon {
  font-size: 14px;
}

.example-buttons button>span {
  color: #8f9b86;
  margin-left: 3px;
}

.privacy-note {
  font-size: 10px;
  color: #879080;
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 22px 0 0;
  line-height: 1.7;
}

.privacy-note .app-icon {
  font-size: 13px;
}

@media (max-width:480px) {
  .editor {
    padding: 19px;
  }
  .tag {
    font-size: 7px;
  }
  textarea {
    min-height: 200px;
    padding: 14px;
    font-size: 15px;
  }
  .example-buttons button {
    font-size: 9px;
  }
}
</style>
