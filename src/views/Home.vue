<template>
  <ion-page>
    <Header></Header>

    <ion-content overflow-scroll="true">
      <ion-card>
        <ion-card-content>
          <ion-row>
            <img id="octcases-logo" />
          </ion-row>
          <ion-text class="md-text">
            <p>
              OCTcases is a high-yield, free resource created for medical
              students, optometry students, residents, and eye care
              professionals to hone their skills in interpreting optical
              coherence tomography (OCT) scans. A case-based format is used to
              highlight different pathology and to outline a systematic and
              organized approach in tackling each image and clinical vignette.
            </p>
          </ion-text>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          <ion-card-title>OCTcases Features</ion-card-title>
        </ion-card-header>

        <ion-card-content class="md-text">
          <h1>Real Patients</h1>
          <ion-row>
            <img src="/assets/img/home-features1.png" />
          </ion-row>
          <ion-text>
            <p>
              All cases presented on OCTcases are from our own clinical
              practice, and thus are reflective of real patient scenarios.
            </p></ion-text
          >

          <h1 class="feature-title">Interactive</h1>
          <ion-row>
            <img src="/assets/img/home-features2.png" />
          </ion-row>
          <ion-text>
            <p>
              Our diagrams are immersive and built for our users. Our images are
              labelled with accompanying descriptions and clinical pearls.
            </p></ion-text
          >

          <h1 class="feature-title">Detailed Answers</h1>
          <ion-row>
            <img src="/assets/img/home-features3.png" />
          </ion-row>
          <ion-text
            ><p>
              All questions are carefully crafted and high yield. Each question
              comes with labelled diagrams and detailed explanations.
            </p></ion-text
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
          <ion-grid>
            <ion-row class="logo-row">
            <ion-col text-center>
              <a href="https://www.bayer.com/en/" target="_blank">
                <img id="logo-bayer" src="/assets/img/home-logo-bayer.png" /></a>
            </ion-col>
            <ion-col>
              <a href="https://www.zeiss.ca/corporate/en/home.html" target="_blank">
                <img id="logo-zeiss" src="/assets/img/home-logo-zeiss.svg"/></a>
            </ion-col>
          </ion-row>
          <ion-row class="logo-row">
            <a href="http://www.eyeguru.org/" target="_blank">
            <img class="logos" src="/assets/img/home-logo-eyeguru.png" /></a>
          </ion-row>
          <ion-row class="logo-row">
            <a href="https://www.cosprc.ca/optical-coherence-tomography-oct-learning-website/" target="_blank">
            <img class="logos" id="logo-cos-prc" src="/assets/img/home-logo-cos-prc.svg" /></a>
          </ion-row>
          <ion-row class="logo-row">
            <a href="https://ophthalmology.utoronto.ca/" target="_blank">
            <img class="logos" src="/assets/img/home-logo-uoft.png" /></a>
          </ion-row>
          <ion-row class="logo-row">
            <a href="https://www.tcpophthalmology.com/copy-of-tcp-ppt" target="_blank">
            <img class="logos" id="logo-tcp-ophtho-mcgill" src="/assets/img/home-logo-tcp-ophtho-mcgill.svg" /></a>
          </ion-row>
          </ion-grid>
        </ion-card-content>
      </ion-card>
      <ion-text class="copyright" color="dark"
        >©2021 by Medical Education<br>(Ophthalmology and Vision
        Sciences)</ion-text
      >
    </ion-content>

    <Footer></Footer>
  </ion-page>
</template>

<script lang='js'>
import { IonCard, IonCardContent, IonPage, alertController } from "@ionic/vue";

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

  mounted() {
    // Notify large screens
    if (window.matchMedia("(min-width: 1000px)").matches) {
      this.presentAlertConfirm()
    }
  },

  methods: {
    // alert for large screens
    async presentAlertConfirm() {
      const alert = await alertController
        .create({
          header: 'This app is optimised for smartphones',
          message: 'Would you like to be redirected to our desktop website instead?',
          buttons: [
            {
              text: 'No',
              cssClass: 'secondary',
              handler: () => {
                console.log("no")
              },
            },
            {
              text: 'Yes',
              handler: () => {
                window.location.replace("https://www.octcases.com/")
              },
            },
          ],
        });
      return alert.present();
    },
    //
  },
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
  height: 90px;
}
#logo-zeiss {
  height: 90px;
}
#logo-cos-prc {
  width: 90%;
}
#logo-tcp-ophtho-mcgill {
  width: 80%;
}
.logo-row {
  text-align: center;
  justify-content: center;
}
.logos {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 70%;
  margin-top: 10px;
  margin-bottom: 10px;
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