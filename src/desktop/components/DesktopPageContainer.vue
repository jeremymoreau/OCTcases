<template>
  <section class="page-shell">
    <header class="page-shell__header">
      <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
      <h1 class="page-title">{{ title }}</h1>
      <p v-if="lede" class="page-lede">{{ lede }}</p>
      <div v-if="$slots.actions" class="page-shell__actions">
        <slot name="actions"></slot>
      </div>
    </header>

    <div class="page-shell__content">
      <slot></slot>
    </div>
  </section>
</template>

<script lang="js">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DesktopPageContainer',
  props: {
    eyebrow: { type: String, default: '' },
    title: { type: String, default: '' },
    lede: { type: String, default: '' },
  },
});
</script>
