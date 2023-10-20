<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <span class="debugging" id="debug-flow-anzeige">{{ spielStore.spieler }} {{ spielStore.ort }} {{ spielStore.flow }}</span>
      <div id="container_alles">
        <div id="container_links">
          <div class="container_hinweise">
            <HinweisBoxComponent id="hinweis_box_1" :zahl="'1'" :gross="false" inaktiv/>
            <HinweisBoxComponent id="hinweis_box_2" :zahl="'2'" :gross="false" inaktiv/>
            <HinweisBoxComponent id="hinweis_box_3" :zahl="'3'" :gross="false" inaktiv/>
            <LupeMitteComponent id="lupe_mitte"  v-if="spielStore.flow >= 0.81" bild="assets/objekte/eg/tutorial/tutorial_eg_lupe_logo.png" :entfernung=entfernung />
            <LupeMitteComponent id="lupe_mitte"  v-else-if="spielStore.flow >= 0.7 && spielStore.flow < 0.9 && spielStore.ort=='eg'" bild="assets/objekte/eg/tutorial/tutorial_eg_0.png" :entfernung=entfernung />
            <LupeMitteComponent id="lupe_mitte"  v-else-if="spielStore.flow >= 0.7 && spielStore.flow < 0.9 && spielStore.ort=='og1'" bild="assets/objekte/og/tutorial/tutorial_og_0.png" :entfernung=entfernung />
            <LupeMitteComponent id="lupe_mitte" style="opacity: 50%" v-else />
          </div>
          <div id="container_buttons">
            <ButtonExitComponent @click="openSpielMenu"/>
            <ButtonKarteComponent @click="openKarteModal" :pulsiert="spielStore.flow == 0.72" :disabled="spielStore.flow < 0.72" />
            <ButtonKameraComponent @click="openKameraModal" :disabled="spielStore.flow < 0.75" :pulsiert="spielStore.flow == 0.75"/>
            <ion-button @click="skipTutorialHinweis(true)" color="primary" size="large">Tutorial <br>überspringen</ion-button>
          </div>
          <img class="tutorial-stamp" src="assets/img/tutorial_solid.svg" />
        </div>
        <div id="container_scroll">
          <component :is="scrollSeite"/>
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
.karte-modal {
  align-items: center;
  justify-content: center;
}
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
#container_links {
  display:flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 740px;
}
#container_scroll {
  /* background-color: rgb(231, 231, 231); */
  flex-grow: 1;
  overflow-y: hidden;
  /* overflow: none; */
  background-color: #FFF4B6;
  border-left: 8px solid rgb(0,0,0,0.15);
  border-top: 8px solid rgb(0,0,0,0.15);
  border-bottom: 8px solid rgb(0,0,0,0.15);
  /* border: 8px solid rgb(0,0,0,0.15); */
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.5));
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
  top: 370px;
  left: 460px;
  width: 600px;
  height: 600px;
  transform: translate(-50%,-50%);
}
.debugging {
  position: absolute;
  z-index: 9999;
}
#debug-bt {
  left: 400px;
  top: 200px;
}

</style>

<script setup lang="ts">
import { IonPage, IonContent, IonButton, IonAlert, IonModal, useKeyboard } from '@ionic/vue';

import { useSpielStore } from '@/stores/SpielStore';
import { useBeaconStore } from '@/stores/BeaconStore';

import router from '@/router';
import { ref, shallowRef, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { modalController } from '@ionic/vue';
import Scroll_0_6_Tutorial from '@/components/scrollbereich/Scroll_0_6_Tutorial.vue';
import SpielMenu from '@/components/modals/SpielMenu.vue'
import KarteModal from '@/components/modals/KarteModal.vue';
import KameraModal from '@/components/modals/KameraModal.vue';
import BeaconModal from '@/components/modals/BeaconModal.vue';
import EinstellungsModal from '@/components/modals/EinstellungsModal.vue';

import ButtonKarteComponent from '@/components/ButtonKarteComponent.vue';
import ButtonExitComponent from '@/components/ButtonExitComponent.vue';
import ButtonKameraComponent from '@/components/ButtonKameraComponent.vue';
import HinweisBoxComponent from '@/components/HinweisBoxComponent.vue';
import LupeMitteComponent from '@/components/LupeMitteComponent.vue';

import { Pagination, Navigation, FreeMode, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';

const spielStore = useSpielStore();
const beaconStore = useBeaconStore();

beaconStore.scanBt();

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

const scrollSeite = shallowRef(Scroll_0_6_Tutorial);

const { flow } = storeToRefs(spielStore);
spielStore.flow = 0.6;

const entfernung = ref(-1);
let leiner_timer = null as any;
watch(flow, () => {
  console.log(`(page tutorial) flow geändert auf ${flow.value}`);
  if (flow.value == 0.74) {
    console.log('Leiner Timer anschalten');
    leiner_timer = setInterval( () => {
      console.log('Check Leiner Entfernung');
      if (Date.now() > beaconStore.beaconList[2].time + 20000) {
        console.log('Leiner ist zu weit weg');
        entfernung.value = 100;
      } else if (beaconStore.beaconList[2].rssi < -80) {
        entfernung.value = 50;
      }  else if (beaconStore.beaconList[2].rssi < -70) {
        entfernung.value = 25;
      } else {
        entfernung.value = 5;
      }
      console.log('entfernung: ', entfernung.value);
    }, 1000);
  } else {
    console.log('clear leiner_timer');
    clearInterval(leiner_timer);
  }
  // if (flow.value == 0.8) {
  //   entfernung.value = 70;
  //   setTimeout(() => {
  //     console.log("timeout!");
  //     entfernung.value = 20;
  //   }, 5000);
  //   setTimeout(() => {
  //     console.log("timeout!");
  //     entfernung.value = 3;
  //     flow.value = 0.9;
  //   }, 10000);
  // }
});


// const {beaconList} = storeToRefs(beaconStore);
// watch(beaconList.value[2], () => {
//   console.log('beacon changed: (rssi) ', beaconList.value[2].rssi);

// });

// const leiner_entfernung = ref(beaconStore.beaconList[2].rssi);
// watch(leiner_entfernung, () => {
//   console.log('leiner_entfernung: ', leiner_entfernung.value);
// });



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
  } else if (data == "beacons") {
    console.log("open beacons modal");
    const beacon_modal = await modalController.create({
      component: BeaconModal, 
      backdropDismiss: false,
      cssClass: 'kamera-modal'});
    beacon_modal.present();
  } else if (data == "kamera") {
    const kamera_modal = await modalController.create({
      component: KameraModal,
      backdropDismiss: false,
      cssClass: 'kamera-modal'});
    kamera_modal.present();
  } else if (data == "einstellungen") {
    const einstellungs_modal = await modalController.create({
      component: EinstellungsModal,
      cssClass: 'einstellungs-modal',
      backdropDismiss: true });
    einstellungs_modal.present();
  }
};
const openKarteModal = async () => {
  console.log("openKarteModal clicked");
  const karte_modal = await modalController.create({
    component: KarteModal,
    cssClass: 'karte-modal'
  });
  karte_modal.present();
};
const openKameraModal = async () => {
  console.log("openKameraModal clicked");
  const kamera_modal = await modalController.create({
    component: KameraModal,
    cssClass: 'kamera-modal'
  });
  kamera_modal.present();
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