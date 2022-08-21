<template>
  <ion-page>
    <PageHeader></PageHeader>

    <ion-content overflow-scroll="true" scrollEvents="true" id="content">
      <ion-card>
        <ion-card-header>
          <ion-card-subtitle> {{ category }} </ion-card-subtitle>
          <ion-card-title class="case-title">
            {{ articleTitle }}
          </ion-card-title>
        </ion-card-header>

        <ion-card-content>
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
              <span
                class="md-text"
                v-if="question.text"
                v-html="$options.filters.markdown(question.text)"
              >
              </span>

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
          <span
            class="md-text footer-text"
            v-if="footerText"
            v-html="footerText"
          >
          </span>
        </ion-card-content>
      </ion-card>
    </ion-content>

  </ion-page>
</template>

<script lang='js'>
import {
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonPage,
  modalController,
  toastController,
} from "@ionic/vue";

import { defineComponent } from "vue";
import { marked } from "marked";
import PageHeader from "./PageHeader.vue";
import AnswerModal from "./AnswerModal.vue";
import { getJSON, makeImagesZoomable } from "./helpers";

export default defineComponent({
  name: "CasePage",
  components: {
    IonCard,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonPage,
    PageHeader
  },
  data() {
    return {
      articleTitle: null,
      article: "",
      questions: null,
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
      // Only fetch json if url includes 'articles'
      if (this.$route.path.includes('articles')) {
      const slug = this.$route.params.slug;
      if (slug != null) {
        // add target="_blank" and rel="noopener" to links in markdown
        const renderer = new marked.Renderer();
        const linkRenderer = renderer.link;
        renderer.link = (href, title, text) => {
            const html = linkRenderer.call(renderer, href, title, text);
            return html.replace(/^<a /, '<a target="_blank" rel="noopener" ');
        };

        const articlePath = ["/content/articles/", slug, ".json"].join("");
        console.log(articlePath)
        const articleData = getJSON(articlePath);
        this.articleTitle = articleData.title;
        this.article = marked(articleData.article, { renderer });
        this.questions = articleData.questions;
        if (articleData.footer != null) {
            this.footerText = marked(articleData.footer, { renderer });
        }
      }
      }
    },

    async openModal(
      answerCorrect,
      title,
      explanation
    ) {
      // If answer is correct
      if (answerCorrect === true) {
        // If answer is correct and there is an explanation, display it
        if (explanation != null) {
          // add target="_blank" and rel="noopener" to links in markdown
          const renderer = new marked.Renderer();
          const linkRenderer = renderer.link;
          renderer.link = (href, title, text) => {
              const html = linkRenderer.call(renderer, href, title, text);
              return html.replace(/^<a /, '<a target="_blank" rel="noopener" ');
          };

          const modal = await modalController.create({
            component: AnswerModal,
            componentProps: {
              title: title,
              content: marked(explanation, { breaks: true, renderer }),
            },
          });
          return modal.present();
        } else {
          // If answer is correct, but there is no explanation
          const toast = await toastController.create({
            message: title,
            color: "success",
            duration: 1000,
          });
          return toast.present();
        }
      } else {
        // If answer is wrong
        const toast = await toastController.create({
          message: "Incorrect. Try again!",
          color: "danger",
          duration: 500,
        });
        return toast.present();
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