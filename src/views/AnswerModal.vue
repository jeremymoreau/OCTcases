<template>
  <ion-header>
    <ion-toolbar>
      <ion-title> {{ title }} </ion-title>
      <ion-buttons slot="end">
        <ion-button @click="closeModal">Close</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <ion-card>
      <ion-card-content class="md-text">
        <img class="ans-image" v-bind:src="image" v-if="image" />
        <div class="answer-text" v-html="content"></div>
        <ion-button
          expand="block"
          fill="outline"
          class="nextq-btn"
          @click="closeModal"
          >Close</ion-button
        >
      </ion-card-content>
    </ion-card>
  </ion-content>
</template>

<script lang='js'>
import { IonHeader, IonTitle, IonToolbar, modalController } from "@ionic/vue";
import { defineComponent } from "vue";
import { makeImagesZoomable } from "./helpers";

export default defineComponent({
  name: "AnswerModal",
  props: {
    title: { type: String, default: "" },
    content: { type: String, default: "" },
    image: { type: String, default: "" },
  },
   mounted() {
    makeImagesZoomable()
  },
  methods: {
    async closeModal() {
      await modalController.dismiss();
    },
  },
  components: { IonHeader, IonTitle, IonToolbar },
});
</script>
<style>
/* body {
    font-size: 1.3rem;
} */
.answer-text p {
  font-size: 1rem;
}
.ans-image {
  padding-bottom: 10px;
}
.nextq-btn {
  margin-top: 10px;
}
</style>