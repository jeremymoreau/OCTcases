<template>
  <ion-page>
    <PageHeader></PageHeader>

    <ion-content overflow-scroll="true">
      <ion-card>
        <ion-card-header>
          <ion-card-title class="case-title">
            {{ pageTitle }}
          </ion-card-title>
        </ion-card-header>
        <ion-card-content>
          <span class="md-text" v-html="pageContent"> </span>
        </ion-card-content>
      </ion-card>
    </ion-content>

  </ion-page>
</template>

<script lang='js'>
import { IonCard, IonCardContent, IonPage, IonContent,
    IonCardHeader,
    IonCardTitle } from "@ionic/vue";

import { defineComponent } from "vue";
import PageHeader from "./PageHeader.vue";
import { marked } from "marked";
import { getJSON } from "./helpers";

export default defineComponent({
  name: "GeneralPage",
  components: {
    IonCard,
    IonCardContent,
    IonPage,
    IonContent,
    IonCardHeader,
    IonCardTitle,
    PageHeader,
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
        // add target="_blank" and rel="noopener" to links in markdown
        const renderer = new marked.Renderer();
        const linkRenderer = renderer.link;
        renderer.link = (href, title, text) => {
            const html = linkRenderer.call(renderer, href, title, text);
            return html.replace(/^<a /, '<a target="_blank" rel="noopener" ');
        };

        const pagePath = ["/content/pages/", slug, ".json"].join("");
        console.log(pagePath)
        const pageData = getJSON(pagePath);
        this.pageTitle = pageData.title;
        this.pageContent = marked(pageData.pageContent, { renderer });
      }
    }
    },
    // Obfs addresses (tap to reveal)
    async deObfsMail() {
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