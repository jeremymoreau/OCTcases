<template>
  <teleport to="body">
    <transition name="answer-dialog-fade" appear>
      <div v-if="open" class="answer-dialog" @click.self="$emit('close')">
        <div class="answer-dialog__panel">
          <button
            class="answer-dialog__close"
            type="button"
            aria-label="Close answer explanation"
            @click="$emit('close')"
          >
            ✕
          </button>
          <p class="eyebrow">Answer Review</p>
          <h2 class="answer-dialog__title">{{ title }}</h2>
          <DesktopContentProse :html="html" class="answer-dialog__content" />
          <button
            class="button-primary answer-dialog__button"
            type="button"
            @click="$emit('close')"
          >
            Close
          </button>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="js">
import { defineComponent } from 'vue';
import DesktopContentProse from './DesktopContentProse.vue';

export default defineComponent({
  name: 'DesktopAnswerDialog',
  components: {
    DesktopContentProse,
  },
  props: {
    open: { type: Boolean, default: false },
    title: { type: String, default: '' },
    html: { type: String, default: '' },
  },
  emits: ['close'],
});
</script>
