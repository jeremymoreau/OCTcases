<template>
      <ion-tabs
        @ionTabsWillChange="beforeTabChange"
        @ionTabsDidChange="afterTabChange"
      >
        <ion-tab-bar slot="bottom" id="bottomNav">
          <ion-tab-button href="/home" tab="home" @click="gotoPage('Home')">
            <ion-icon alt="Home icon" :icon="home" />
            <ion-label>Home</ion-label>
          </ion-tab-button>

          <ion-tab-button href="/articles" tab="articles" @click="gotoPage('ArticleList')">
            <ion-icon alt="Articles icon" :icon="reader"></ion-icon>
            <ion-label>Articles</ion-label>
          </ion-tab-button>

          <ion-tab-button href="/atlas" tab="atlas" @click="gotoPage('AtlasList')">
            <ion-icon alt="Atlas icon" :icon="search"></ion-icon>
            <ion-label>Atlas</ion-label>
          </ion-tab-button>

          <ion-tab-button href="/cases" tab="cases" @click="gotoPage('CaseList')">
            <ion-icon alt="Cases icon" :icon="helpCircle"></ion-icon>
            <ion-label>Cases</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
</template>

<script lang='js'>
import {
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/vue";

import { home, reader, search, helpCircle } from "ionicons/icons";
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageFooter",
  components: {
    IonTabBar,
    IonTabs,
    IonIcon,
    IonLabel,
    IonTabButton,
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