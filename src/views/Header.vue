<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button auto-hide="false"></ion-menu-button>
      </ion-buttons>

      <ion-buttons slot="primary">
        <ion-button>
          <ion-icon :icon="ellipsisHorizontal"></ion-icon>
        </ion-button>
      </ion-buttons>

      <ion-title class="app-title">OCTcases</ion-title>
    </ion-toolbar>
  </ion-header>
</template>

<script lang='ts'>
import { IonIcon, IonToolbar, IonTitle } from "@ionic/vue";

import { helpCircle, ellipsisHorizontal } from "ionicons/icons";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Header",
  components: {
    IonIcon,
    IonToolbar,
    IonTitle,
  },

  setup() {
    return {
      helpCircle,
      ellipsisHorizontal,
    };
  },

  methods: {
    gotoPage(pageName: string) {
      this.$router.push({
        name: pageName,
      });
    },
  },
});
</script>

<style scoped>
.app-title {
  font-size: 1.2rem;
}
</style>