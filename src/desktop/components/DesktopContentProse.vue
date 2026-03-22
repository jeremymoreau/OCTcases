<template>
  <div ref="contentRoot" class="desktop-prose" v-html="html"></div>
</template>

<script lang="js">
import { defineComponent, nextTick } from 'vue';
import Viewer from 'viewerjs';
import { bindObfuscatedMailLinks } from '../../lib/dom';

export default defineComponent({
  name: 'DesktopContentProse',
  props: {
    html: { type: String, default: '' },
  },
  data() {
    return {
      viewer: null,
    };
  },
  mounted() {
    this.refreshEnhancements();
  },
  watch: {
    html: {
      async handler() {
        await this.refreshEnhancements();
      },
    },
  },
  beforeUnmount() {
    this.destroyViewer();
  },
  methods: {
    destroyViewer() {
      if (this.viewer) {
        this.viewer.destroy();
        this.viewer = null;
      }
    },
    applyInitialZoom() {
      if (!this.viewer?.viewerData?.width || !this.viewer?.imageData?.naturalWidth) {
        return;
      }

      const targetRatio = (this.viewer.viewerData.width * 0.5) / this.viewer.imageData.naturalWidth;
      this.viewer.zoomTo(targetRatio);
    },
    async refreshEnhancements() {
      await nextTick();
      this.destroyViewer();

      if (!this.$refs.contentRoot) {
        return;
      }

      bindObfuscatedMailLinks(this.$refs.contentRoot);

      this.viewer = new Viewer(this.$refs.contentRoot, {
        navbar: false,
        button: false,
        toolbar: false,
        title: false,
        tooltip: false,
        rotatable: false,
        viewed: () => {
          this.applyInitialZoom();
        },
      });
    },
  },
});
</script>
