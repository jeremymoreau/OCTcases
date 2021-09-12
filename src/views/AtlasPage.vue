<template>
  <ion-page>
    <Header></Header>

    <ion-content overflow-scroll="true" scrollEvents="true" id="content">
      <ion-card>
        <img class="atlas-header-img" :src="mainImage" />
        <ion-card-header>
          <ion-card-title class="case-title">
            {{ atlasTitle }}
          </ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <span class="md-text"> {{ description }} </span>
          <span class="md-text" v-if="article" v-html="article"> </span>
        </ion-card-content>
      </ion-card>

      <div v-if="questions">
        <template v-for="question in questions" :key="question">
          <ion-card>
            <ion-card-header>
              <ion-card-title class="q-title">
                {{ question.title }}
              </ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <ion-text
                class="md-text"
                v-if="question.text"
                v-html="$options.filters.markdown(question.text)"
              >
              </ion-text>

              <!-- answer buttons -->
              <template v-for="answer in question.answers" :key="answer">
                <ion-button
                  class="q-btn"
                  expand="block"
                  fill="outline"
                  v-if="answer.answerText"
                  @click="
                    openModal(answer.correct, 'Correct!', answer.explanation)
                  "
                >
                  {{ answer.answerText }}
                </ion-button>
              </template>
            </ion-card-content>
          </ion-card>
        </template>
      </div>

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
        const atlasPath = ["/content/atlas/", slug, ".json"].join("");
        console.log(atlasPath)
        const atlasData = getJSON(atlasPath);
        this.description = atlasData.description;
        this.atlasTitle = atlasData.title;
        this.article = marked(atlasData.article);
        this.mainImage = atlasData.mainImage;
      }
    }
    },
  },
  filters: {
    markdown: function (rawMarkdown) {
      return marked(rawMarkdown);
    },
  },
});
</script>

<style>
</style>