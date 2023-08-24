<script setup lang="ts">
import { IonPage, IonContent, IonButton, IonAlert } from '@ionic/vue';

import { useSpielStore } from '@/stores/SpielStore';
import router from '@/router';
import { defineComponent, ref, shallowRef, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { modalController } from '@ionic/vue';
import Scroll_0_6_Tutorial from '@/components/scrollbereich/Scroll_0_6_Tutorial.vue';
import SpielMenu from '@/components/modals/SpielMenu.vue'
import ButtonKarteComponent from '@/components/ButtonKarteComponent.vue';
import ButtonExitComponent from '@/components/ButtonExitComponent.vue';
import HinweisBoxComponent from '@/components/HinweisBoxComponent.vue';
import LupeMitteComponent from '@/components/LupeMitteComponent.vue';

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation, FreeMode, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';

import PostingComponent from '@/components/PostingComponent.vue';

const spielStore = useSpielStore();

// const emit = defineEmits(['zeige_lupe']);

// const lupeClicked = (lupe : number) => { 
//   console.log(`lupeClicked(${lupe})`);
//   emit('zeige_lupe', lupe);
// };
// const buchClicked = () => {
//   console.log('buchClicked()');
// };
// const kameraClicked = () => {
//   console.log('kameraClicked()');
// };
// const hilfeClicked = () => {
//   console.log('hilfeClicked()');
// };

const { flow } = storeToRefs(spielStore);
flow.value = 0.6;
console.log(`flow1: ${flow.value}`);
spielStore.flow = 0.6;
console.log(`flow2: ${flow.value}`);

const scrollSeite = shallowRef(Scroll_0_6_Tutorial);

watch(flow, () => {
  console.log(`(LupeMitteComponent) flow geändert auf ${flow.value}`);
//   if (flow.value < 1.0) {
//     scrollSeite.value = Scroll_0_6_Tutorial;
//   }
//   else if (flow.value == 1.1) {
//     scrollSeite.value = Scroll_1_1_Frage1;
//   } else if (flow.value == 1.2) {
//     scrollSeite.value = Scroll_1_2_Post1;
//   }
});

const openSpielMenu = async () => {
  console.log("openSpielMenu clicked");
  const spiel_menu = await modalController.create({component: SpielMenu});
  console.log("after await");
  spiel_menu.present();
  const { data } = await spiel_menu.onWillDismiss();
  if (data == "beenden") {
    spielStore.$reset();
    router.push("start");
    spielStore.flow = 0.0;
  }
};
const skipTutorialHinweisOffen = ref(false);
const skipTutorialHinweis = (offen : boolean) => {
    skipTutorialHinweisOffen.value = offen;
};
const skipTutorial = () => {
    console.log("skip clicked");
    // spielStore.$reset();
    router.push("spiel");
    spielStore.flow = 1.0;
};

const modules = [Pagination, Navigation, FreeMode, Scrollbar];
</script>


<template>
  <ion-page>
    
    <!-- <ion-header collapse="fade" class="ion-no-border">
        <ion-toolbar>
            <ion-title>Start > Intro > Schwierigkeit > Raum > <u><b>Tutorial</b></u></ion-title>
        </ion-toolbar>
    </ion-header> -->

    <ion-content :fullscreen="true">

        <div id="container_alles">
            <div id="container_links">
                <div class="container_hinweise">
                    <HinweisBoxComponent id="hinweis_box_1" :zahl="'1'" bild="assets/objekte/og/001x_og1_ab/001x_og1_ab_0.png" :gross="false" inaktiv/>
                    <HinweisBoxComponent id="hinweis_box_2" :zahl="'2'" bild="assets/objekte/og/010x_og1_ab/010x_og1_ab_0.png" :gross="false" inaktiv/>
                    <HinweisBoxComponent id="hinweis_box_3" :zahl="'3'" bild="assets/objekte/og/111x_og1_ab/111x_og1_ab_0.png" :gross="false" inaktiv/>
                    <LupeMitteComponent id="lupe_mitte" />
                </div>
                <div id="container_buttons">
                    <button-exit-component @click="openSpielMenu"/>
                    <ion-button @click="skipTutorialHinweis(true)" color="primary" size="large">Tutorial überspringen</ion-button>
                    <!-- <button-einstellungen-component @click="openSpielMenu"/>
                    <button-karte-component pulsiert/>
                    <button-hilfe-component @click="hilfeClicked"/>
                    <button-kamera-component />
                    <button-handschellen-component /> -->
                </div>
                <img class="tutorial-stamp" src="assets/img/tutorial_solid.svg" />
            </div>
            <div id="container_scroll">
                <component :is="scrollSeite" />
                <!-- <swiper :modules="modules" :direction="'vertical'" :slidesPerView="'1'" :freeMode="false" :scrollbar="true" :navigation="false" :pagination="true">
                    <swiper-slide>Slide1
                      dafdsfadsf
                      adsfadsfasd<br>asdfadsf
                    </swiper-slide>
                    <swiper-slide>
                        <PostingComponent></PostingComponent>
                    </swiper-slide>
                    <swiper-slide>Slide3</swiper-slide>
                    <swiper-slide>Slide4</swiper-slide>
                </swiper> -->
            </div>
        </div>

     <ion-alert
        :is-open="skipTutorialHinweisOffen"
        header="Hinweis"
        sub-header="Wollen Sie das Tutorial wirklich überspringen?"
        message="Sie können das Tutorial über das Einstellungsmenü auch während des Spielverlaufs wieder erreichen."
        :buttons="[
            {text: 'fortsetzen', role: 'cancel', handler: 'skipTutorialHinweis(false)'}, 
            {text:'Überspringen', role:'confirm', handler: skipTutorial}
        ]"
        @didDismiss="skipTutorialHinweis(false)"
    ></ion-alert>



    </ion-content>

  </ion-page>
</template>


<style scoped>
.swiper {
    height: 100%;
}
.swiper-slide {
  /* display: flex;
  justify-content: center;
  align-items: center; */
  height: auto;
}
.tutorial-stamp {
    position: absolute;
    stroke: red;
    top: 100px;
    left: 100px;
    width: 400px;
    transform: rotate(-30deg);
    opacity: 70%;

}
.container_hinweise {
  position: relative;
  display: flex;
  flex-direction: column;
  padding-top: 25px;

}
#container_alles {
 display: flex;
 flex-direction: row; 
 height: 100vh;
 overflow: hidden;
}
/* #container_links {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 180px;
  min-width: 180px;
  margin-top: 10px;
} */
#container_links {
  display:flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 740px;
}
#container_scroll {
  /* background-color: rgb(231, 231, 231); */
  flex-grow: 1;
  overflow-y: scroll;
  background-color: #FFF4B6;
  border-left: 8px solid rgb(0,0,0,0.15);
  border-top: 8px solid rgb(0,0,0,0.15);
  border-bottom: 8px solid rgb(0,0,0,0.15);
  /* border: 8px solid rgb(0,0,0,0.15); */
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;

}
#container_buttons {
  height: 150px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 50px;
}

::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background: #b7b7b7; 
}
::-webkit-scrollbar-thumb {
  background: rgb(59, 59, 59);
  border-radius: 5px;
}
::-webkit-scrollbar-thumb:hover {
  background: #333333; 
}

#lupe_mitte {
  position: absolute;
  top: 400px;
  left: 500px;
  width: 620px;
  height: 620px;
  transform: translate(-50%,-50%);
}

</style>

