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
          <ion-text class="md-text" v-html="pageHeader"> </ion-text>

          <template v-for="group in groups" :key="group">
            <div class='md-text'>
              <h3 v-html="group.title"></h3>
              <ion-list>
                <template v-for="onePerson in group.person" :key="onePerson">
                  <ion-item class='aboutus-avatar-item ion-no-padding' lines='none'>
                    <ion-avatar v-if="onePerson.photo" class="aboutus-avatar"><img :src="onePerson.photo"/></ion-avatar>
                    <ion-label text-wrap class='aboutus-label'>
                       <h3 class="aboutus-title"> {{ onePerson.name }} </h3>
                       <p class="aboutus-subtitle"> {{ onePerson.subtitle1 }} </p>
                       <p class="aboutus-subtitle"> {{ onePerson.subtitle2 }} </p>
                        </ion-label>
                    
                  </ion-item>
                </template>
              </ion-list>
            </div>
          </template>

          <ion-text class="md-text" v-html="pageFooter"> </ion-text>
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
      pageHeader: "",
      pageFooter: "",
      groups: null
    };
  },

  created() {
    this.fetchData();
  },

  updated() {
      this.deObfsMail()
  },

  methods: {
    async fetchData() {
      // Only fetch json if url includes 'pages'
      if (this.$route.path.includes('about-us')) {
        const pagePath = "/content/other/about-us/about-us.json";
        console.log(pagePath)
        const pageData = getJSON(pagePath);
        this.pageTitle = pageData.title;
        this.pageHeader = marked(pageData.pageHeader);
        this.pageFooter = marked(pageData.pageFooter);
        this.groups = pageData.groups;
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