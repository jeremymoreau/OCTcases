<template>
  <ion-page>
    <PageHeader></PageHeader>

    <ion-content overflow-scroll="true">
      <ion-list id="array-rendering" lines="full">

        <template v-for="item in articleIndex" :key="item">
          <ion-item button="true" @click="gotoPage('ArticlePage', item.slug)">
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

  </ion-page>
</template>

<script lang='js'>
import { IonPage, IonList, IonContent, IonItem, IonLabel, IonText, } from "@ionic/vue";
// import { getJSON } from "./helpers";
import { ref, onMounted } from 'vue';

import { defineComponent } from "vue";
import PageHeader from "./PageHeader.vue";

export default defineComponent({
  name: "ArticleList",
  components: {
    IonPage,
    IonList,
    IonContent,
    IonItem,
    IonLabel,
    IonText,
    PageHeader,
  },
  setup() {
    const getJSON = async (path) => {
      const response = await fetch(path);
      if (!response.ok) {
        throw Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    };
    
    const articleIndex = ref(null);

    onMounted(async () => {
      articleIndex.value = await getJSON("/assets/index/article_index.json");
    });

    // const articleIndex = getJSON("/assets/index/article_index.json");
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