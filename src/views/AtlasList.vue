<template>
  <ion-page>
    <ion-app>
      <Header></Header>

      <ion-content overflow-scroll="true">
        <ion-list id="array-rendering" lines="full">

        </ion-list>
      </ion-content>

      <Footer></Footer>
    </ion-app>
  </ion-page>
</template>

<script lang='ts'>
import { IonPage, IonList } from "@ionic/vue";
import { getJSON } from "./helpers";

import { defineComponent } from "vue";
import Header from "./Header.vue";
import Footer from "./Footer.vue";

export default defineComponent({
  name: "AtlasList",
  components: {
    IonPage,
    IonList,
    Footer,
    Header,
  },
  setup() {
    const articleIndex = getJSON("/assets/index/article_index.json");
    return { articleIndex };
  },

  methods: {
    gotoPage(pageName: string, slug: string) {
      this.$router.push({
        name: pageName,
        params: { slug: slug },
      });
    },
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