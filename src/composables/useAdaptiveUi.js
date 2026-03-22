import { computed, onMounted, readonly, ref } from 'vue';
import { getInitialUiMode, shouldUseDesktopUi } from '../lib/platform';

const uiMode = ref(getInitialUiMode());
let listenersBound = false;

function applyUiMode(nextMode) {
  uiMode.value = nextMode;

  if (typeof document !== 'undefined') {
    document.documentElement.dataset.ui = nextMode;
  }

  if (typeof window !== 'undefined') {
    window.__OCTCASES_UI__ = nextMode;
  }
}

function syncUiMode() {
  applyUiMode(shouldUseDesktopUi() ? 'desktop' : 'mobile');
}

function bindAdaptiveUiListeners() {
  if (listenersBound || typeof window === 'undefined') {
    return;
  }

  listenersBound = true;

  const handleChange = () => {
    syncUiMode();
  };

  const mediaQueries = [
    window.matchMedia('(hover: hover)'),
    window.matchMedia('(pointer: fine)'),
    window.matchMedia('(min-width: 1100px)'),
  ];

  mediaQueries.forEach((mediaQuery) => {
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return;
    }

    mediaQuery.addListener(handleChange);
  });

  window.addEventListener('resize', handleChange, { passive: true });
  syncUiMode();
}

export function useAdaptiveUi() {
  onMounted(() => {
    bindAdaptiveUiListeners();
  });

  return {
    uiMode: readonly(uiMode),
    isDesktopExperience: computed(() => uiMode.value === 'desktop'),
  };
}
