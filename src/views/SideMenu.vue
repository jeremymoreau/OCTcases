<template>
  <ion-menu side="start" menu-id="side-menu" content-id="menu-content">
    <ion-header>
      <ion-toolbar translucent>
        <ion-title>OCTcases</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content id="menu-content">
      <ion-list>
        <ion-item button="true" class='menu-item'>
          <ion-icon :icon="peopleCircleOutline" slot="start"></ion-icon>
          <ion-label>About Us</ion-label>
        </ion-item>
        <ion-item button="true" class='menu-item'>
          <ion-icon :icon="cloudUploadOutline" slot="start"></ion-icon>
          <ion-label>Case Submission / Award</ion-label>
        </ion-item>
        <ion-item button="true" class='menu-item'>
          <ion-icon :icon="helpOutline" slot="start"></ion-icon>
          <ion-label>About this App</ion-label>
        </ion-item>
        <ion-item button="true" class='menu-item' href="https://www.facebook.com/OCTcases/">
          <ion-icon :icon="logoFacebook" slot="start"></ion-icon>
          <ion-label>Facebook</ion-label>
        </ion-item>
        <ion-item button="true" class='menu-item' href="https://www.instagram.com/octcases/">
          <ion-icon :icon="logoInstagram" slot="start"></ion-icon>
          <ion-label>Instagram</ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>
<script>
import { IonItem } from "@ionic/vue";
import {
  peopleCircleOutline,
  cloudUploadOutline,
  helpOutline,
  logoFacebook,
  logoInstagram,
} from "ionicons/icons";
import { defineComponent } from "vue";

export default defineComponent({
  components: { IonItem },
  setup() {
    return {
      peopleCircleOutline,
      cloudUploadOutline,
      helpOutline,
      logoFacebook,
      logoInstagram,
    };
  },
});
</script>
<style scoped>
.menu-item {
pointer-events: auto;
}
</style>