<template>
  <ion-page>
    <ion-app>
      <Header></Header>

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
            <ion-label> Neuro-opthalmology </ion-label>
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
        </ion-list>
      </ion-content>

      <Footer></Footer>
    </ion-app>
  </ion-page>
</template>

<script lang='ts'>
import { IonPage } from "@ionic/vue";

import { defineComponent } from "vue";
import Header from "./Header.vue";
import Footer from "./Footer.vue";

export default defineComponent({
  name: "Home",
  components: {
    IonPage,
    Header,
    Footer,
  },
  setup() {
    return {};
  },

  methods: {},
});
</script>

<style scoped>
.app-title {
  font-size: 1.2rem;
}

.case-title {
  font-size: 1.2rem;
}

.q-title {
  font-size: 1rem;
}

.q-img {
  padding-bottom: 10px;
}

.q-btn {
  margin-top: 10px;
}
</style>