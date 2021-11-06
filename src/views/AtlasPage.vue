<template>
  <ion-page>
    <Header></Header>

    <ion-content overflow-scroll="true" scrollEvents="true" id="content">
      <!-- Short description card -->
      <ion-card>
        <img class="atlas-header-img" :src="mainImage" :alt="atlasTitle" />
        <ion-card-header>
          <ion-card-title class="case-title">
            {{ atlasTitle }}
          </ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <span class="md-text"> {{ description }} </span>
        </ion-card-content>
      </ion-card>

      <!-- Question links -->
      <ion-card v-if="linkedCases">
        <ion-card-header>
          <ion-card-title class="case-title">
            Related Practice Cases
          </ion-card-title>
        </ion-card-header>
          
        <ion-card-content>
          <template v-for="linkedCaseID in linkedCases" :key="linkedCaseID">
            <ion-button @click="gotoPage('CasePage', linkedCaseID)"
                        expand="block" fill="outline" class="atlas-link-btn">Case {{ linkedCaseID }} </ion-button>
          </template>
        </ion-card-content>
      </ion-card>

      <!-- Main article card -->
      <ion-card>
        <ion-card-content>
          <span class="md-text" v-if="article" v-html="article"> </span>
        </ion-card-content>
      </ion-card>

      <!-- Footer Card -->
      <ion-card v-if="footerText">
        <ion-card-content>
          <ion-text
            class="md-text footer-text"
            v-if="footerText"
            v-html="footerText"
          >
          </ion-text>
        </ion-card-content>
      </ion-card>
    </ion-content>

    <Footer></Footer>
  </ion-page>
</template>

<script lang='js'>
import {
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonPage,
} from "@ionic/vue";

import { defineComponent } from "vue";
import marked from "marked";
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import { getJSON, makeImagesZoomable } from "./helpers";

export default defineComponent({
  name: "CasePage",
  components: {
    IonCard,
    IonCardContent,
    IonCardTitle,
    IonPage,
    Footer,
    Header
  },
  data() {
    return {
      atlasTitle: null,
      atlas: "",
      linkedCases: null,
      footerText: ""
    };
  },

  created() {
    this.fetchData();
  },

  watch: {
    // call again the method if the route changes
    $route: "fetchData",
  },
  updated() {
    makeImagesZoomable()
  },
  methods: {
    async fetchData() {
      // Only fetch json if url includes 'atlas'
      if (this.$route.path.includes('atlas')) {
      const slug = this.$route.params.slug;
      if (slug != null) {
        // add target="_blank" and rel="noopener" to links in markdown
        const renderer = new marked.Renderer();
        const linkRenderer = renderer.link;
        renderer.link = (href, title, text) => {
            const html = linkRenderer.call(renderer, href, title, text);
            return html.replace(/^<a /, '<a target="_blank" rel="noopener" ');
        };

        const atlasPath = ["/content/atlas/", slug, ".json"].join("");
        console.log(atlasPath)
        const atlasData = getJSON(atlasPath);
        this.description = atlasData.description;
        this.atlasTitle = atlasData.title;
        if (atlasData.article != null) {
          this.article = marked(atlasData.article, { renderer });
        }
        this.mainImage = atlasData.mainImage;
        if (atlasData.caseID != null) {
          this.linkedCases = atlasData.caseID.split(",");  // caseIDs are , separated
        }
        if (atlasData.footer != null) {
            this.footerText = marked(atlasData.footer, { renderer });
        }
      }
    }
    },
    gotoPage(pageName, caseID) {
      const caseCateg = caseID.replace(/[0-9]/g, '');
      this.$router.push({
        name: pageName,
        params: { caseCategory: caseCateg, caseID: caseID },
      });
    },

  },
  filters: {
    markdown: function (rawMarkdown) {
      return marked(rawMarkdown);
    },
  },
});
</script>

<style scoped>
.atlas-link-btn {
  text-transform: capitalize;
  margin-bottom: 10px;
}
</style>