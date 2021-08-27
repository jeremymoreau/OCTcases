<template>
  <ion-page>
    <ion-app>
      <Header></Header>

      <ion-content overflow-scroll="true">
        <ion-card>
          <ion-card-header> </ion-card-header>

          <ion-card-content>
            <img src="/assets/img/OCTcases-logo-light.png" />
            <ion-text>
              OCTcases is a high-yield, free resource created for medical
              students, optometry students, residents, and eye care
              professionals to hone their skills in interpreting optical
              coherence tomography (OCT) scans. A case-based format is used to
              highlight different pathology and to outline a systematic and
              organized approach in tackling each image and clinical vignette.
            </ion-text>
          </ion-card-content>
        </ion-card>

        <ion-card>
          <ion-card-header>
            <ion-card-title>OCTcases Features</ion-card-title>
          </ion-card-header>

          <ion-card-content>
            <h1>Real Patients</h1>
            <img src="/assets/img/home-features1.png" />
            <ion-text
              >All cases presented on OCTcases are from our own clinical
              practice, and thus are reflective of real patient
              scenarios.</ion-text
            >

            <h1 class="feature-title">Interactive</h1>
            <img src="/assets/img/home-features2.png" />
            <ion-text
              >Our diagrams are immersive and built for our users. Our images
              are labelled with accompanying descriptions and clinical
              pearls.</ion-text
            >

            <h1 class="feature-title">Detailed Answers</h1>
            <img src="/assets/img/home-features3.png" />
            <ion-text
              >All questions are carefully crafted and high yield. Each question
              comes with labelled diagrams and detailed explanations.</ion-text
            >
          </ion-card-content>
        </ion-card>

        <ion-card>
          <ion-card-header>
            <ion-card-title
              >OCTcases is proud to collaborate with:</ion-card-title
            >
          </ion-card-header>

          <ion-card-content>
            <a href="https://www.bayer.com/en/" target="_blank">
              <img
                class="logos"
                id="logo-bayer"
                src="/assets/img/home-logo-bayer.png"
            /></a>
            <a href="http://www.eyeguru.org/" target="_blank">
              <img class="logos" src="/assets/img/home-logo-eyeguru.png"
            /></a>
            <a href="https://ophthalmology.utoronto.ca/" target="_blank">
              <img class="logos" src="/assets/img/home-logo-uoft.png"
            /></a>
            <a
              href="https://www.cosprc.ca/optical-coherence-tomography-oct-learning-website/"
              target="_blank"
            >
              <img class="logos" src="/assets/img/home-logo-prc.png"
            /></a>
          </ion-card-content>
        </ion-card>
        <ion-text class="copyright" color="dark"
          >©2021 by Medical Education (Ophthalmology and Vision
          Sciences)</ion-text
        >
      </ion-content>

      <Footer></Footer>
    </ion-app>
  </ion-page>
</template>

<script lang='ts'>
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

<style scoped>
h1 {
  font-size: 1.3rem;
  font-weight: 600;
  padding-bottom: 5px;
}

.copyright {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  text-align: center;
  hyphens: none;
  padding-bottom: 20px;
}

#logo-bayer {
  width: 50%;
}
.logos {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  padding-bottom: 30px;
}
.feature-title {
  padding-top: 20px;
}

.case-title {
  font-size: 1.2rem;
}

.q-title {
  font-size: 1rem;
}

.q-img {
  margin-bottom: 10px;
}

.q-btn {
  margin-top: 10px;
}
</style>