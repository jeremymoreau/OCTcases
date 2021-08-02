<template>
  <ion-page>
    <ion-app>
      <Header></Header>

      <ion-content overflow-scroll="true" scrollEvents="true" id="content">
        <ion-card>
          <ion-card-header>
            <ion-card-subtitle> {{ caseData.category }} </ion-card-subtitle>
            <ion-card-title class="case-title">
              {{ caseData.title }}
            </ion-card-title>
          </ion-card-header>

          <ion-card-content>
            <img
              v-bind:src="caseData.patientPresentation.image"
              v-if="caseData.patientPresentation.image"
            />
            <ion-text v-if="caseData.patientPresentation.text">
              {{ caseData.patientPresentation.text }}</ion-text
            >
          </ion-card-content>
        </ion-card>

        <template v-for="question in caseData.questions" :key="question">
          <ion-card>
            <ion-card-header>
              <ion-card-title class="q-title">
                {{ question.q.title }}
              </ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <!-- question image -->
              <img v-bind:src="question.q.image" v-if="question.q.image" />
              <!-- question text -->
              <ion-text v-if="question.q.text">
                {{ question.q.text }}
              </ion-text>

              <!-- answer buttons -->
              <template v-for="answer in question.a" :key="answer">
                <ion-button
                  class="q-btn"
                  expand="block"
                  fill="outline"
                  v-if="answer.answerText"
                  @click="
                    openModal(
                      answer.correct,
                      'Correct!',
                      answer.explanation.text,
                      answer.explanation.image
                    )
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
    fetchData() {
      const caseID = this.$route.params.caseID;
      if (caseID != null) {
        const casePath = ["/content/cases/", caseID, ".json"].join("");
        const caseData = getJSON(casePath);
        this.caseData = caseData;
        // console.log(this.caseData)
      }
    },
    async openModal(
      answerCorrect: boolean,
      title: string,
      content: string,
      image: string
    ) {
      if (answerCorrect == false) {
        const toast = await toastController.create({
          message: "Incorrect. Try again!",
          color: "danger",
          duration: 2000,
        });
        return toast.present();
      } else {
        // console.log(marked(content));
        const modal = await modalController.create({
          component: AnswerModal,
          componentProps: {
            title: title,
            content: marked(content, { breaks: true }),
            image: image,
          },
        });
        return modal.present();
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