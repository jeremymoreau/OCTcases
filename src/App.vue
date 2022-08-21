<template>
  <IonApp>
    <IonSplitPane content-id="main-content">
    <ion-menu side="start" menu-id="side-menu" content-id="main-content">
      <ion-header>
        <ion-toolbar translucent>
          <ion-title>OCTcases</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content id="menu-content">
        <ion-list>
          <ion-item
            button="true"
            class="menu-item"
            @click="gotoPage('AboutUs', 'about-us')"
          >
            <ion-icon :icon="peopleCircleOutline" slot="start"></ion-icon>
            <ion-label>About Us</ion-label>
          </ion-item>
          <ion-item
            button="true"
            class="menu-item"
            @click="gotoPage('GeneralPage', 'case-submission')"
          >
            <ion-icon :icon="cloudUploadOutline" slot="start"></ion-icon>
            <ion-label>Case Submission / Award</ion-label>
          </ion-item>
          <ion-item
            button="true"
            class="menu-item"
            @click="gotoPage('GeneralPage', 'about-this-app')"
          >
            <ion-icon :icon="helpOutline" slot="start"></ion-icon>
            <ion-label>About this App</ion-label>
          </ion-item>
          <ion-item
            button="true"
            class="menu-item"
            @click="gotoPage('GeneralPage', 'disclaimer')"
          >
            <ion-icon :icon="documentTextOutline" slot="start"></ion-icon>
            <ion-label>Disclaimer</ion-label>
          </ion-item>
          <ion-item
            button="true"
            class="menu-item"
            href="https://www.facebook.com/OCTcases/"
            rel="noopener"
          >
            <ion-icon :icon="logoFacebook" slot="start"></ion-icon>
            <ion-label>Facebook</ion-label>
          </ion-item>
          <ion-item
            button="true"
            class="menu-item"
            href="https://www.instagram.com/octcases/"
            rel="noopener"
          >
            <ion-icon :icon="logoInstagram" slot="start"></ion-icon>
            <ion-label>Instagram</ion-label>
          </ion-item>
          <ion-item
            button="true"
            class="menu-item"
            @click="gotoPage('GeneralPage', 'install-this-app')"
          >
            <ion-icon :icon="downloadOutline" slot="start"></ion-icon>
            <ion-label>Install this App</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>
    <ion-router-outlet id="main-content"></ion-router-outlet>
    <PageFooter></PageFooter>
  </IonSplitPane>
</IonApp>
  
</template>

<script lang="js">
import { IonApp, IonContent, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonRouterOutlet, IonSplitPane } from '@ionic/vue';
import { defineComponent } from 'vue';
import 'viewerjs/dist/viewer.css'
import PageFooter from "./views/PageFooter.vue";
import {
  peopleCircleOutline,
  cloudUploadOutline,
  helpOutline,
  logoFacebook,
  logoInstagram,
  downloadOutline,
  documentTextOutline,
} from "ionicons/icons";
import { menuController } from "@ionic/vue";


export default defineComponent({
  name: 'App',
  components: {
    IonApp, 
    IonContent, 
    IonIcon, 
    IonItem, 
    IonLabel, 
    IonList, 
    IonMenu, 
    IonSplitPane,
    IonRouterOutlet,
    PageFooter
  },
  setup() {
    return {
      peopleCircleOutline,
      cloudUploadOutline,
      helpOutline,
      logoFacebook,
      logoInstagram,
      downloadOutline,
      documentTextOutline,
      IonRouterOutlet,
    };
  },
  methods: {
    gotoPage(pageName, slug) {
      this.$router.push({
        name: pageName,
        params: { slug: slug },
      });
      menuController.close("side-menu");
    },
  },
});
</script>