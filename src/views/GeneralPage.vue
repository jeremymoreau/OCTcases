<template>
  <ion-page>
    <Header></Header>

    <ion-content overflow-scroll="true">
      <ion-card>
        <ion-card-header>
          <ion-card-title class="case-title">
            {{ pageTitle }}
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <ion-text class="md-text" v-html="pageContent"> </ion-text>
        </ion-card-content>
      </ion-card>
    </ion-content>

    <Footer></Footer>
  </ion-page>
</template>

<script lang='js'>
import { IonCard, IonCardContent, IonPage } from "@ionic/vue";

import { defineComponent } from "vue";
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import marked from "marked";
import { getJSON } from "./helpers";

export default defineComponent({
  name: "Home",
  components: {
    IonCard,
    IonCardContent,
    IonPage,
    Footer,
    Header,
  },
  data() {
    return {
      pageTitle: "",
      pageContent: ""
    };
  },

  created() {
    this.fetchData();
  },

  updated() {
      this.deObfsMail()
  },

  watch: {
    // call again the method if the route changes
    $route: "fetchData",
  },

  methods: {
    async fetchData() {
      // Only fetch json if url includes 'pages'
      if (this.$route.path.includes('pages')) {
      const slug = this.$route.params.slug;
      if (slug != null) {
        const pagePath = ["/content/pages/", slug, ".json"].join("");
        console.log(pagePath)
        const pageData = getJSON(pagePath);
        this.pageTitle = pageData.title;
        this.pageContent = marked(pageData.pageContent);
      }
    }
    },

    deObfsMail() {
        const obfsList = document.getElementsByClassName("obfs-m")
        for (const obfsItem of obfsList) {
            obfsItem.onclick = function() {
                const outputVal = obfsItem.dataset.part1 + "@" + obfsItem.dataset.part2 + "." + obfsItem.dataset.part3
                obfsItem.href = "mai" + "lto:" + outputVal
                obfsItem.innerHTML = outputVal
            }
        }
    }

},

});
</script>