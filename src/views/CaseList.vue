<template>
  <ion-page>
      <PageHeader></PageHeader>

      <ion-content overflow-scroll="true">
        <ion-list lines="full">
          <ion-item
            button="true"
            @click="gotoPage('CaseListCategory', 'retina')"
          >
            <ion-label> Retina </ion-label>
          </ion-item>
          <ion-item
            button="true"
            @click="gotoPage('CaseListCategory', 'neuro-ophthalmology')"
          >
            <ion-label> Neuro-ophthalmology </ion-label>
          </ion-item>
          <ion-item
            button="true"
            @click="gotoPage('CaseListCategory', 'uveitis')"
          >
            <ion-label> Uveitis </ion-label>
          </ion-item>
          <ion-item
            button="true"
            @click="gotoPage('CaseListCategory', 'glaucoma')"
          >
            <ion-label> Glaucoma </ion-label>
          </ion-item>
          <ion-item
            button="true"
            @click="gotoPage('CaseListCategory', 'ocular oncology')"
          >
            <ion-label> Ocular Oncology </ion-label>
          </ion-item>
        </ion-list>
      </ion-content>

  </ion-page>
</template>

<script lang='js'>
import { IonPage, IonList, IonContent, IonItem, IonLabel } from "@ionic/vue";

import { defineComponent } from "vue";
import PageHeader from "./PageHeader.vue";

export default defineComponent({
  name: "CaseList",
  components: {
    IonPage,
    IonList,
    PageHeader,
    IonContent,
    IonItem,
    IonLabel
  },
  setup() {
    return {};
  },

  methods: {
    gotoPage(pageName, category) {
      this.$router.push({
        name: pageName,
        params: { caseCategory: category },
      });
    },
  },
});
</script>

<style scoped>
.list-title {
  font-size: 1.2rem;
  font-weight: bold;
}
.list-subtitle {
  font-size: 1rem;
  white-space: normal;
}
</style>