<template>
  <ion-page>
    <Header></Header>

    <ion-content overflow-scroll="true">
      <IonSearchbar></IonSearchbar>
      <ion-card class="atlas-card" @click="openTest()">
        <img src="/content/media/retina2-q1.png" />
        <ion-card-header class="atlas-card-header">
          <!-- <ion-card-subtitle>test</ion-card-subtitle> -->
          <ion-card-title class="atlas-card-title">
            Acute Annular Outer Retinopathy
          </ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <ion-text class="md-text">
            AAOR is characterised by thinning or atrophy of the outer
            retina/ONL, including disruption of the EZ within the annular area
            of RPE destruction.
          </ion-text>
        </ion-card-content>
      </ion-card>
      <ion-card class="atlas-card" @click="openTest()">
        <img src="/content/media/retina2-q1.png" />
        <ion-card-header class="atlas-card-header">
          <!-- <ion-card-subtitle>test</ion-card-subtitle> -->
          <ion-card-title class="atlas-card-title">
            Acute Posterior Multifocal Placoid Pigment Epitheliopathy
          </ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <ion-text class="md-text">
            AAOR is characterised by thinning or atrophy of the outer
            retina/ONL, including disruption of the EZ within the annular area
            of RPE destruction.
          </ion-text>
        </ion-card-content>
      </ion-card>

      <ion-list id="array-rendering" lines="full"> </ion-list>
    </ion-content>

    <Footer></Footer>
  </ion-page>
</template>

<script lang='js'>
import { IonPage, IonList, IonSearchbar, IonCard } from "@ionic/vue";
import { getJSON } from "./helpers";

import { defineComponent } from "vue";
import Header from "./Header.vue";
import Footer from "./Footer.vue";

export default defineComponent({
  name: "AtlasList",
  components: {
    IonPage,
    IonList,
    IonSearchbar,
    IonCard,
    Footer,
    Header,
  },
  setup() {
    const articleIndex = getJSON("/assets/index/article_index.json");
    return { articleIndex };
  },

  methods: {
    gotoPage(pageName, slug) {
      this.$router.push({
        name: pageName,
        params: { slug: slug },
      });
    },
    openTest() {
      console.log('test')
    }
  },
});
</script>

<style scoped>
.category-title {
  text-transform: capitalize;
}
.list-title {
  font-size: 1.1rem;
  font-weight: bold;
}
.list-subtitle {
  font-size: 1rem;
  white-space: normal;
}
</style>