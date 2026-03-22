<template>
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-menu-button
          auto-hide="false"
          @click="openMenu()"
        ></ion-menu-button>
      </ion-buttons>

      <ion-buttons slot="primary">
        <ion-button @click="toggleDarkMode()">
          <ion-icon :icon="darkModeIcon"></ion-icon>
        </ion-button>
      </ion-buttons>

      <ion-title class="app-title"><div class="header-box" @click="gotoPage('Home')"><img :src="headerLogoSrc" alt="OCTcases logo" class="header-logo"/> <span class="header-text">OCTcases</span></div></ion-title>
    </ion-toolbar>
  </ion-header>
</template>

<script lang='js'>
import { IonIcon, IonToolbar, IonTitle, menuController, IonButtons, IonButton, IonMenuButton, IonHeader } from "@ionic/vue";

import { moon, moonOutline } from "ionicons/icons";
import { computed, defineComponent } from "vue";
import { useTheme } from "../composables/useTheme";

export default defineComponent({
  name: "PageHeader",
  components: {
    IonIcon,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonMenuButton,
    IonHeader
  },
  setup() {
    const { isDark, toggleTheme } = useTheme();

    return {
      darkModeIcon: computed(() => (isDark.value ? moon : moonOutline)),
      headerLogoSrc: computed(() =>
        isDark.value
          ? "/assets/img/header-logo-dark.svg"
          : "/assets/img/header-logo-light.svg"
      ),
      toggleTheme,
    };
  },
  methods: {
    gotoPage(pageName) {
      this.$router.push({
        name: pageName,
      });
    },
      openMenu() {
      menuController.enable(true, "side-menu");
      menuController.open("side-menu");
    },
    toggleDarkMode() {
      this.toggleTheme();
    },
  },
});
</script>

<style scoped>
.header-box {
  display: flex;
  align-items: center;
}
.header-logo {
  display: block;
  height: 25px;
  padding-right: 3px;
  margin-left: auto;
}
.header-text {
  margin-right: auto;
}
.app-title {
  font-size: 1.2rem;
}
</style>
