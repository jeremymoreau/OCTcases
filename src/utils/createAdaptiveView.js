import { defineAsyncComponent, defineComponent, h } from 'vue';
import { useAdaptiveUi } from '../composables/useAdaptiveUi';

export function createAdaptiveView(name, loadMobileComponent, loadDesktopComponent) {
  const MobileComponent = defineAsyncComponent(loadMobileComponent);
  const DesktopComponent = defineAsyncComponent(loadDesktopComponent);

  return defineComponent({
    name,
    setup() {
      const { isDesktopExperience } = useAdaptiveUi();

      return () =>
        h(isDesktopExperience.value ? DesktopComponent : MobileComponent);
    },
  });
}
