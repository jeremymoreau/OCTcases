<template>
  <ion-footer>
    <ion-toolbar>
      <ion-tabs
        @ionTabsWillChange="beforeTabChange"
        @ionTabsDidChange="afterTabChange"
      >
        <ion-tab-bar slot="bottom" id="bottomNav">
          <ion-tab-button tab="home" @click="gotoPage('Home')">
            <ion-icon :icon="home" />
            <ion-label>Home</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="articles" @click="gotoPage('ArticleList')">
            <ion-icon :icon="reader"></ion-icon>
            <ion-label>Articles</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="atlas" @click="gotoPage('AtlasList')">
            <ion-icon :icon="search"></ion-icon>
            <ion-label>Atlas</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="cases" @click="gotoPage('CaseList')">
            <ion-icon :icon="helpCircle"></ion-icon>
            <ion-label>Cases</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
    </ion-toolbar>
  </ion-footer>
</template>

<script lang='js'>
import {
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonToolbar,
  IonFooter,
} from "@ionic/vue";

import { home, reader, search, helpCircle } from "ionicons/icons";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Footer",
  components: {
    IonTabBar,
    IonTabs,
    IonFooter,
    IonIcon,
    IonLabel,
    IonTabButton,
    IonToolbar,
  },

  setup() {
    return {
      home,
      reader,
      search,
      helpCircle,
    };
  },

  methods: {
    gotoPage(pageName) {
      this.$router.push({
        name: pageName,
      });
    },
  },
});
</script>

<style scoped>
</style>