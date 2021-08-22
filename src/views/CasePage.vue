<template>
  <ion-page>
    <ion-app>
      <Header></Header>

      <ion-content overflow-scroll="true" scrollEvents="true" id="content">
        <ion-card>
          <ion-card-header>
            <ion-card-subtitle> {{ category }} </ion-card-subtitle>
            <ion-card-title class="case-title">
              {{ caseTitle }}
            </ion-card-title>
          </ion-card-header>

          <ion-card-content>
            <ion-text v-if="patientPresentation" v-html="patientPresentation">
            </ion-text>
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
              <ion-text
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

      <Footer></Footer>
    </ion-app>
  </ion-page>
</template>

<script lang='ts'>
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
import marked from "marked";
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import AnswerModal from "./AnswerModal.vue";
import { getJSON } from "./helpers";

export default defineComponent({
  name: "CasePage",
  components: {
    IonCard,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonPage,
    Footer,
    Header,
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
    };
  },

  created() {
    this.fetchData();
  },

  watch: {
    // call again the method if the route changes
    $route: "fetchData",
  },

  methods: {
    async fetchData() {
      const caseID = this.$route.params.caseID;
      if (caseID != null) {
        const casePath = ["/content/cases/", caseID, ".json"].join("");
        const caseData = getJSON(casePath);
        console.log(caseData.title);
        this.caseTitle = caseData.title;
        this.category = caseData.category;
        this.patientPresentation = marked(caseData.patientPresentation);
        this.questions = caseData.questions;
        console.log(this.caseTitle);
      }
    },
    async openModal(
      answerCorrect: boolean,
      title: string,
      explanation: string
    ) {
      // If answer is correct
      if (answerCorrect === true) {
        // If answer is correct and there is an explanation, display it
        if (explanation != null) {
          const modal = await modalController.create({
            component: AnswerModal,
            componentProps: {
              title: title,
              content: marked(explanation, { breaks: true }),
            },
          });
          return modal.present();
        } else {
          // If answer is correct, but there is no explanation
          const toast = await toastController.create({
            message: title,
            color: "success",
            duration: 2000,
          });
          return toast.present();
        }
      } else {
        // If answer is wrong
        const toast = await toastController.create({
          message: "Incorrect. Try again!",
          color: "danger",
          duration: 2000,
        });
        return toast.present();
      }
    },

    async gotoPreviousNextPage(previousOrNext: string) {
      const caseIndex = Object.values(getJSON("/content/cases/index.json"));
      // get all cases in the current category (e.g. all retina cases)
      const categCases = caseIndex.filter(
        (ptCase: any) => ptCase.category === this.$route.params.caseCategory
      );
      const currentCaseIndex = categCases.findIndex(
        (ptCase: any) => ptCase.caseID === this.$route.params.caseID
      );
      let nextCase: any;
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
    markdown: function (rawMarkdown: string) {
      console.log(rawMarkdown);
      return marked(rawMarkdown);
    },
  },
});
</script>

<style>
.answer-text p {
  margin-bottom: 10px;
}
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