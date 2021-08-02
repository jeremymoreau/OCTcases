<template>
  <ion-page>
    <ion-app>
      <Header></Header>

      <ion-content overflow-scroll="true">
        <ion-list id="array-rendering" lines="full">
          <ion-list-header class="category-title">{{
            $route.params.caseCategory
          }}</ion-list-header>
          <div v-if="caseIndexLoading">Loading...</div>

          <template v-for="item in caseIndex" :key="item">
            <ion-item
              button="true"
              v-if="item.category == $route.params.caseCategory"
              @click="gotoPage('CasePage', item.caseID)"
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
  name: "Home",
  components: {
    IonPage,
    IonList,
    Footer,
    Header,
  },
  setup() {
    const caseIndex = getJSON("/content/cases/index.json");
    return { caseIndex };
  },

  methods: {
    gotoPage(pageName: string, caseID: string) {
      this.$router.push({
        name: pageName,
        params: { caseID: caseID },
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