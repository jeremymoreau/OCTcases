<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button auto-hide="false"></ion-menu-button>
      </ion-buttons>

      <ion-buttons slot="primary">
        <ion-button v-if="darkModeIcon" @click="toggleDarkMode()">
          <ion-icon :icon="moon"></ion-icon>
        </ion-button>
        <ion-button v-else @click="toggleDarkMode()">
          <ion-icon :icon="moonOutline"></ion-icon>
        </ion-button>
      </ion-buttons>

      <ion-title class="app-title">OCTcases</ion-title>
    </ion-toolbar>
  </ion-header>
</template>

<script lang='ts'>
import { IonIcon, IonToolbar, IonTitle } from "@ionic/vue";

import { helpCircle, moon, moonOutline } from "ionicons/icons";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Header",
  components: {
    IonIcon,
    IonToolbar,
    IonTitle,
  },
  setup() {
    return {
      helpCircle,
      moon,
      moonOutline
    };
  },
  data() {
    // Check darkMode var in localstorage (option 'on' or 'off')
    // Set 'dark' class and darkModeIcon = true if darkMode === 'on'
    const darkMode = localStorage.getItem('darkMode')
    let darkModeIcon = false
    if (darkMode === 'on') {
      document.body.classList.add('dark');
      darkModeIcon = true
    } else {
      document.body.classList.remove('dark');
    }
    // console.log(darkModeIcon)
    return {
      darkModeIcon
    }  
  },
  methods: {
    gotoPage(pageName: string) {
      this.$router.push({
        name: pageName,
      });
    },
    // toggle dark class and set darkMode = 'on' or 'off' in localstorage
    toggleDarkMode() {
      document.body.classList.toggle('dark');
      if (localStorage.getItem('darkMode') === 'on') {
        localStorage.setItem('darkMode', 'off');
        this.darkModeIcon = false
      } else {
        localStorage.setItem('darkMode', 'on');
        this.darkModeIcon = true
      }
    },
  },
});
</script>

<style scoped>
.app-title {
  font-size: 1.2rem;
}
</style>