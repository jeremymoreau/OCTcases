<template>
  <ion-page>
    <Header></Header>

    <ion-content overflow-scroll="true">
      <ion-card>
        <ion-card-header>
          <ion-card-title class="case-title">
            {{ this.$route.params.slug }}
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-text class="md-text">
            <p>...</p>
          </ion-text>
        </ion-card-content>
      </ion-card>
    </ion-content>

    <Footer></Footer>
  </ion-page>
</template>

<script lang='js'>
import { IonCard, IonCardContent, IonPage } from "@ionic/vue";

import { defineComponent } from "vue";
import Header from "./Header.vue";
import Footer from "./Footer.vue";

export default defineComponent({
  name: "Home",
  components: {
    IonCard,
    IonCardContent,
    IonPage,
    Footer,
    Header,
  },

  methods: {},
});
</script>