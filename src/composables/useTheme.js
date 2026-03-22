import { computed, onMounted, readonly, ref } from 'vue';

const THEME_STORAGE_KEY = 'octcases-theme';
const LEGACY_THEME_STORAGE_KEY = 'darkMode';
const theme = ref('light');
let listenersBound = false;

function getStoredTheme() {
  if (typeof localStorage === 'undefined') {
    return null;
  }

  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme;
  }

  const legacyTheme = localStorage.getItem(LEGACY_THEME_STORAGE_KEY);
  if (legacyTheme === 'on') {
    return 'dark';
  }
  if (legacyTheme === 'off') {
    return 'light';
  }

  return null;
}

function getSystemTheme() {
  if (typeof window === 'undefined') {
    return 'light';
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function persistTheme(nextTheme) {
  if (typeof localStorage === 'undefined') {
    return;
  }

  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  localStorage.setItem(
    LEGACY_THEME_STORAGE_KEY,
    nextTheme === 'dark' ? 'on' : 'off'
  );
}

function applyTheme(nextTheme) {
  theme.value = nextTheme;

  if (typeof document !== 'undefined') {
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    document.documentElement.style.colorScheme = nextTheme;

    if (document.body) {
      document.body.classList.toggle('dark', nextTheme === 'dark');
    }
  }

  if (typeof window !== 'undefined') {
    window.__OCTCASES_THEME__ = nextTheme;
  }
}

function syncThemeFromPreference() {
  const storedTheme = getStoredTheme();
  applyTheme(storedTheme || getSystemTheme());
}

function bindThemeListeners() {
  if (listenersBound || typeof window === 'undefined') {
    return;
  }

  listenersBound = true;

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleThemeChange = () => {
    if (!getStoredTheme()) {
      applyTheme(getSystemTheme());
    }
  };

  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handleThemeChange);
  } else {
    mediaQuery.addListener(handleThemeChange);
  }

  syncThemeFromPreference();
}

export function useTheme() {
  onMounted(() => {
    bindThemeListeners();
  });

  return {
    theme: readonly(theme),
    isDark: computed(() => theme.value === 'dark'),
    setTheme(nextTheme) {
      persistTheme(nextTheme);
      applyTheme(nextTheme);
    },
    toggleTheme() {
      const nextTheme = theme.value === 'dark' ? 'light' : 'dark';
      persistTheme(nextTheme);
      applyTheme(nextTheme);
    },
  };
}
