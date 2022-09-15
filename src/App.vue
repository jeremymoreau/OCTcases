<template>
  <IonApp>
    <IonSplitPane content-id="main-content">
    <ion-menu side="start" menu-id="side-menu" content-id="main-content" type="overlay">
      
      <ion-content>
        <ion-header>
          <ion-toolbar translucent>
            <ion-title>OCTcases</ion-title>
          </ion-toolbar>
        </ion-header>
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
            id="install-this-app-menuitem"
            @click="gotoPage('GeneralPage', 'install-this-app')"
          >
            <ion-icon :icon="downloadOutline" slot="start"></ion-icon>
            <ion-label>Install this App</ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>
    <!-- Footer -->
    <ion-tabs
        @ionTabsWillChange="beforeTabChange"
        @ionTabsDidChange="afterTabChange"
      >
    <ion-router-outlet id="main-content"></ion-router-outlet>
        <ion-tab-bar slot="bottom" id="bottomNav">
          <ion-tab-button href="/home" tab="home" @click="gotoPage('Home')">
            <ion-icon alt="Home icon" :icon="home" />
            <ion-label>Home</ion-label>
          </ion-tab-button>

          <ion-tab-button href="/articles" tab="articles" @click="gotoPage('ArticleList')">
            <ion-icon alt="Articles icon" :icon="reader"></ion-icon>
            <ion-label>Articles</ion-label>
          </ion-tab-button>

          <ion-tab-button href="/atlas" tab="atlas" @click="gotoPage('AtlasList')">
            <ion-icon alt="Atlas icon" :icon="search"></ion-icon>
            <ion-label>Atlas</ion-label>
          </ion-tab-button>

          <ion-tab-button href="/cases" tab="cases" @click="gotoPage('CaseList')">
            <ion-icon alt="Cases icon" :icon="helpCircle"></ion-icon>
            <ion-label>Cases</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
  </IonSplitPane>
</IonApp>
  
</template>

<script lang="js">
import { IonApp, IonContent, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonRouterOutlet, IonSplitPane,
        IonTabBar, IonTabButton, IonTabs } from '@ionic/vue';
import { defineComponent } from 'vue';
import 'viewerjs/dist/viewer.css'
import {
  peopleCircleOutline,
  cloudUploadOutline,
  helpOutline,
  logoFacebook,
  logoInstagram,
  downloadOutline,
  documentTextOutline,
  home, reader, search, helpCircle
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
    IonTabBar,
    IonTabs,
    IonTabButton,
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
      home,
      reader,
      search,
      helpCircle,
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

<style scoped>
@media all and (display-mode: standalone) {
  #install-this-app-menuitem {
    display: none
  }
}
</style>
