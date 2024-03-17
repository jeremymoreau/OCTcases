<template>
  <ion-page>
      <PageHeader></PageHeader>

      <ion-content overflow-scroll="true">
        <ion-list id="array-rendering" lines="full">
          <ion-list-header class="category-title">
             <h2>{{$route.params.caseCategory}}</h2>
            </ion-list-header>

          <template v-for="item in caseIndex" :key="item">
            <ion-item
              button="true"
              v-if="item.category == $route.params.caseCategory"
            >

            <ion-checkbox aria-label="toggle case done" slot="start"
            @click="toggleCaseDone(item.caseID)"
            checked=false
            v-if="checkIfCaseDone(item.caseID) != true"
            ></ion-checkbox>
            <ion-checkbox aria-label="toggle case done" slot="start"
            @click="toggleCaseDone(item.caseID)"
            checked=true
            v-if="checkIfCaseDone(item.caseID)"
            ></ion-checkbox>

              <ion-label
              @click="gotoPage('CasePage', item.caseID)"
              >
                <h2 class="list-title">{{ item.title }}</h2>
                <ion-text class="list-subtitle" color="dark">{{
                  item.description
                }}</ion-text>
              </ion-label>
            </ion-item>
          </template>
        </ion-list>
      </ion-content>

  </ion-page>
</template>

<script lang='js'>
import { IonPage, IonList, IonContent, IonItem, IonLabel, IonListHeader, IonCheckbox, IonText } from "@ionic/vue";
import { getJSON } from "./helpers";

import { defineComponent } from "vue";
import PageHeader from "./PageHeader.vue";

export default defineComponent({
  name: "CaseListCategory",
  components: {
    IonPage,
    IonList,
    PageHeader,
    IonContent,
    IonItem,
    IonLabel,
    IonListHeader,
    IonCheckbox,
    IonText
  },
  setup() {
    const caseIndex = getJSON("/assets/index/case_index.json");
    return { caseIndex };
  },
  data() {
    return {
      completedCasesLog: {}
    };
  },

  methods: {
    checkIfCaseDone(caseID) {
      // Access property using a variable
      const storageKey = 'completedCasesLog'
      let completedCasesLog = {}
      if (typeof localStorage !== 'undefined') {
        // check if storageKey exists, create if not
        if (localStorage.getItem(storageKey) === null) {
          console.log('no saved data')
          completedCasesLog[caseID] = false
          const newJsonString = JSON.stringify(completedCasesLog)
          localStorage.setItem(storageKey, newJsonString)
          this.completedCasesLog = completedCasesLog
          
        } else {
          const storedJsonString = localStorage.getItem(storageKey)
          completedCasesLog = JSON.parse(storedJsonString)
        }

        // toggle value of key
        return completedCasesLog[caseID]
        
        
      } else {
          console.log('localStorage is not supported in this browser.');
      }

      return caseID
    },
    toggleCaseDone(caseID) {
      const storageKey = 'completedCasesLog'
      let completedCasesLog = {}
      // check if localstorage available
      if (typeof localStorage !== 'undefined') {
        // check if storageKey exists, create if not
        if (localStorage.getItem(storageKey) === null) {
          completedCasesLog[caseID] = false
        } else {
          const storedJsonString = localStorage.getItem(storageKey)
          completedCasesLog = JSON.parse(storedJsonString)
        }

        // toggle value of key
        if (completedCasesLog[caseID] === true) {
          completedCasesLog[caseID] = false
        } else {
          completedCasesLog[caseID] = true
        }

        // store back in localStorage
        const newJsonString = JSON.stringify(completedCasesLog)
        localStorage.setItem(storageKey, newJsonString)
        this.completedCasesLog = completedCasesLog
        
        
      } else {
          console.log('localStorage is not supported in this browser.');
      }

    },
    gotoPage(pageName, caseID) {
      this.$router.push({
        name: pageName,
        params: { caseID: caseID },
      });
    },
  },
});
</script>

<style scoped>
.category-title {
  text-transform: capitalize;
}
.list-title {
  font-size: 1.1rem;
  font-weight: bold;
}
.list-subtitle {
  font-size: 1rem;
  white-space: normal;
}
</style>