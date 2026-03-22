<template>
  <component :is="appShell" />
</template>

<script lang="js">
import { computed, defineComponent } from 'vue';
import MobileAppShell from './mobile/MobileAppShell.vue';
import DesktopAppShell from './desktop/DesktopAppShell.vue';
import { useAdaptiveUi } from './composables/useAdaptiveUi';

export default defineComponent({
  name: 'App',
  components: {
    MobileAppShell,
    DesktopAppShell,
  },
  setup() {
    const { isDesktopExperience } = useAdaptiveUi();

    return {
      appShell: computed(() =>
        isDesktopExperience.value ? DesktopAppShell : MobileAppShell
      ),
    };
  },
});
</script>
