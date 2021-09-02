<template>
  <ion-page>
      <Header></Header>

      <ion-content overflow-scroll="true">
        <ion-list id="array-rendering" lines="full">

          <template v-for="item in articleIndex" :key="item">
            <ion-item
              button="true"
              @click="gotoPage('ArticlePage', item.slug)"
            >
              <ion-label>
                <h2 class="list-title">{{ item.title }}</h2>
                <ion-text class="list-subtitle" color="dark">{{
                  item.description
                }}</ion-text>
              </ion-label>
            </ion-item>
          </template>
        </ion-list>
      </ion-content>

      <Footer></Footer>
  </ion-page>
</template>

<script lang='js'>
import { IonPage, IonList } from "@ionic/vue";
import { getJSON } from "./helpers";

import { defineComponent } from "vue";
import Header from "./Header.vue";
import Footer from "./Footer.vue";

export default defineComponent({
  name: "Home",
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
    gotoPage(pageName, slug) {
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