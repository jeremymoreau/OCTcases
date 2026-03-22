<template>
  <button
    class="theme-toggle"
    type="button"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="toggleTheme"
  >
    <svg
      v-if="isDark"
      class="theme-toggle__icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M21.64 13a1 1 0 0 0-1.05-.25 8 8 0 0 1-10.34-10.34 1 1 0 0 0-1.3-1.3A10 10 0 1 0 22.94 14.3a1 1 0 0 0-1.3-1.3Z"
        fill="currentColor"
      />
    </svg>
    <svg
      v-else
      class="theme-toggle__icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0 4a1 1 0 0 1-1-1v-1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm0-18a1 1 0 0 1-1-1V2a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm10 9a1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1ZM5 13a1 1 0 0 1-1 1H3a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1Zm12.36 6.78a1 1 0 0 1-1.41 0l-.71-.71a1 1 0 1 1 1.41-1.41l.71.7a1 1 0 0 1 0 1.42ZM7.46 8.88a1 1 0 0 1-1.41 0l-.71-.71a1 1 0 1 1 1.41-1.41l.71.7a1 1 0 0 1 0 1.42Zm9.9-.7a1 1 0 0 1-1.41-1.42l.71-.7a1 1 0 0 1 1.41 1.4l-.71.72ZM7.46 19.78a1 1 0 0 1-1.41-1.42l.71-.7a1 1 0 0 1 1.41 1.4l-.71.72Z"
        fill="currentColor"
      />
    </svg>
  </button>
</template>

<script lang="js">
import { computed, defineComponent } from 'vue';
import { useTheme } from '../../composables/useTheme';

export default defineComponent({
  name: 'DesktopThemeToggle',
  setup() {
    const { isDark, toggleTheme } = useTheme();

    return {
      isDark: computed(() => isDark.value),
      toggleTheme,
    };
  },
});
</script>
