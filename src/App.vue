<template>
  <ion-app>
    <SideMenu></SideMenu>
    <ion-router-outlet />
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import 'viewerjs/dist/viewer.css'
import SideMenu from "./views/SideMenu.vue";

export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    SideMenu
  }
});
</script>