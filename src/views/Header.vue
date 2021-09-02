<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button auto-hide="false"></ion-menu-button>
      </ion-buttons>

      <ion-buttons slot="primary">
        <ion-button @click="toggleDarkMode()">
          <ion-icon :icon="darkModeIcon"></ion-icon>
        </ion-button>
        <!-- <ion-button v-else @click="toggleDarkMode()">
          <ion-icon :icon="moonOutline"></ion-icon>
        </ion-button> -->
      </ion-buttons>

      <ion-title class="app-title">OCTcases</ion-title>
    </ion-toolbar>
  </ion-header>
</template>

<script lang='js'>
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
      moonOutline,
    };
  },
   data() {
    return {
      darkModeIcon: moonOutline
    };
  },
  watch: {
    '$route': function() {
      // console.log(this.$route)
      // Set 'dark' class and darkModeIcon = true if darkMode === 'on'
      const darkMode = localStorage.getItem("darkMode");
      // console.log(darkMode);
      // let darkModeIcon = false
      if (darkMode === "on") {
        // console.log('dark mode')
        // document.body.classList.add('dark');
        this.darkModeIcon = moon;
        // console.log(this.darkModeIcon);
      } else {
        // console.log('light mode')
        this.darkModeIcon = moonOutline;
        // document.body.classList.remove('dark');
      }
    },
  },
  mounted() {
    // Set 'dark' class and darkModeIcon = true if darkMode === 'on'
      const darkMode = localStorage.getItem("darkMode");
      // console.log(darkMode);
      // let darkModeIcon = false
      if (darkMode === "on") {
        // console.log('dark mode')
        document.body.classList.add('dark');
        this.darkModeIcon = moon;
        // console.log(this.darkModeIcon);
      } else {
        // console.log('light mode')
        this.darkModeIcon = moonOutline;
        document.body.classList.remove('dark');
      }
  },
  methods: {
    gotoPage(pageName) {
      this.$router.push({
        name: pageName,
      });
    },
    // toggle dark class and set darkMode = 'on' or 'off' in localstorage
    toggleDarkMode() {
      document.body.classList.toggle("dark");
      if (localStorage.getItem("darkMode") === "on") {
        localStorage.setItem("darkMode", "off");
        this.darkModeIcon = moonOutline;
      } else {
        localStorage.setItem("darkMode", "on");
        this.darkModeIcon = moon;
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