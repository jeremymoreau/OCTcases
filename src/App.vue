<template>
  <ion-app>
    <SideMenu></SideMenu>
    <ion-router-outlet />
    <PageFooter></PageFooter>
  </ion-app>
  
</template>

<script lang="js">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import 'viewerjs/dist/viewer.css'
import SideMenu from "./views/SideMenu.vue";
import PageFooter from "./views/PageFooter.vue";

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    SideMenu,
    PageFooter
  }
});
</script>