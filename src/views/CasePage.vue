<template>
  <ion-page>
    <PageHeader></PageHeader>

    <ion-content overflow-scroll="true" scrollEvents="true" id="content">
      <ion-card>
        <ion-card-header>
          <ion-card-subtitle> {{ category }} </ion-card-subtitle>
          <ion-card-title class="case-title">
            {{ caseTitle }}
          </ion-card-title>
        </ion-card-header>

        <ion-card-content>
          <span
            class="md-text"
            v-if="patientPresentation"
            v-html="patientPresentation"
          >
          </span>
        </ion-card-content>
      </ion-card>

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

      <ion-grid>
        <ion-row>
          <ion-col col-6>
            <ion-button
              expand="block"
              fill="outline"
              @click="gotoPreviousNextPage('previous')"
            >
              Previous Case
            </ion-button>
          </ion-col>
          <ion-col col-6>
            <ion-button
              expand="block"
              fill="outline"
              @click="gotoPreviousNextPage('next')"
            >
              Next Case
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
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
  IonGrid,
  IonRow,
  IonCol,
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
    PageHeader,
    IonGrid,
    IonRow,
    IonCol,
  },
  data() {
    return {
      caseData: null,
      caseTitle: null,
      category: null,
      questions: null,
      patientPresentation: "",
      footerText: ""
    };
  },

  created() {
    this.fetchData();
  },
   updated() {
    makeImagesZoomable()
  },
  watch: {
    // call again the method if the route changes
    $route: "fetchData",
  },

  methods: {
    async fetchData() {
      // Only fetch json if url includes 'articles'
      if (this.$route.path.includes('cases')) {
      const caseID = this.$route.params.caseID;
      if (caseID != null) {
        // add target="_blank" and rel="noopener" to links in markdown
        const renderer = new marked.Renderer();
        const linkRenderer = renderer.link;
        renderer.link = (href, title, text) => {
            const html = linkRenderer.call(renderer, href, title, text);
            return html.replace(/^<a /, '<a target="_blank" rel="noopener" ');
        };

        const casePath = ["/content/cases/", caseID, ".json"].join("");
        const caseData = getJSON(casePath);
        this.caseTitle = caseData.title;
        this.category = caseData.category;
        this.patientPresentation = marked(caseData.patientPresentation, { renderer });
        this.questions = caseData.questions;
        if (caseData.footer != null) {
            this.footerText = marked(caseData.footer, { renderer });
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
    // Go to previous/next page buttons
    async gotoPreviousNextPage(previousOrNext) {
      const caseIndex = Object.values(getJSON("/assets/index/case_index.json"));
      // get all cases in the current category (e.g. all retina cases)
      const categCases = caseIndex.filter(
        (ptCase) => ptCase.category === this.$route.params.caseCategory
      );
      const currentCaseIndex = categCases.findIndex(
        (ptCase) => ptCase.caseID === this.$route.params.caseID
      );
      let nextCase;
      if (previousOrNext === "next") {
        nextCase = categCases[currentCaseIndex + 1];
      } else {
        nextCase = categCases[currentCaseIndex - 1];
      }

      // console.log(nextCase);
      if (typeof nextCase !== "undefined") {
        // console.log(nextCase.caseID);
        this.$router.push({
          name: "CasePage",
          params: { caseID: nextCase.caseID },
        });
        // scroll to top of page after push
        const pageContent = this.$el.querySelector("#content");
        pageContent.scrollToTop();
      } else {
        // console.log("no next case");

        let toastMessage;
        let toastColour;
        if (previousOrNext === "next") {
          toastMessage =
            "Last " + this.$route.params.caseCategory + " case reached! :)";
          toastColour = "success";
        } else {
          toastMessage = "No previous case!";
          toastColour = "warning";
        }
        const toast = await toastController.create({
          message: toastMessage,
          color: toastColour,
          duration: 3000,
        });
        return toast.present();
      }
      // console.log(currentCaseIndex)
      // console.log(categCases[currentCaseIndex + 2]);
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
.case-title {
  font-size: 1.2rem;
}

.q-title {
  font-size: 1.2rem;
}

.q-img {
  padding-bottom: 10px;
}

.q-btn {
  margin-top: 10px;
  white-space: normal;
}
</style>