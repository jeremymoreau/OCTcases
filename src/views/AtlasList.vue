<template>
  <ion-page>
    <PageHeader></PageHeader>
      <ion-toolbar>
      <ion-searchbar class="atlas-searchbar" v-model="searchInput"></ion-searchbar>
      </ion-toolbar>
    <ion-content overflow-scroll="true">
      <template v-for="item in filteredIndex" :key="item">
        <ion-card v-if="item.title" class="atlas-card" @click="gotoPage('AtlasPage', item.slug)">
          <div class="header-img-cont"><img class="atlas-header-img" :src="item.mainImage" :alt="item.title" /></div>
          <ion-card-header class="atlas-card-header">
            <ion-card-title class="atlas-card-title">
              {{ item.title }}
            </ion-card-title>
          </ion-card-header>

          <ion-card-content>
            <!-- <ion-text class="md-text">
              {{ item.description }}
            </ion-text> -->
          </ion-card-content>
        </ion-card>
      </template>
    </ion-content>

  </ion-page>
</template>

<script lang='js'>
import { IonPage, IonSearchbar, IonCard } from "@ionic/vue";
import { getJSON } from "./helpers";

import { defineComponent } from "vue";
import PageHeader from "./PageHeader.vue";

export default defineComponent({
  name: "AtlasList",
  components: {
    IonPage,
    IonSearchbar,
    IonCard,
    PageHeader
  },
  data() {
    return {
      searchInput: ''
    }
  },
  setup() {
    const atlasIndex = getJSON("/assets/index/atlas_index.json");
    return { atlasIndex };
  },
  computed: {
    filteredIndex () {
        const filteredAtlasIndex = this.atlasIndex.filter(
          o => (o.title.toLowerCase() + o.description.toLowerCase()).includes(this.searchInput.toLowerCase()));
        return filteredAtlasIndex
    } 
},
  methods: {
    gotoPage(pageName, slug) {
      this.$router.push({
        name: pageName,
        params: { slug: slug },
      });
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
.ios .atlas-searchbar {
  padding-top: 10px;
  padding-bottom: 10px;
}
.header-img-cont {
  pointer-events: none;
}
</style>