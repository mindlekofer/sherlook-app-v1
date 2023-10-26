<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <span class="debugging" id="debug-flow-anzeige">{{ spieler }} {{ ort }} {{ flow }}</span>
      <div id="container_alles">
        <div id="container_links">
          <div class="container_hinweise">
            <HinweisBoxComponent class="hinweis-box" v-if="flow<1.0" :zahl="'1'" :gross="false" inaktiv />
            <HinweisBoxComponent class="hinweis-box" v-else-if="flow<2.0 && ort=='eg'" 
                :zahl="'1'" 
                :gross="flow>=1.3" 
                :auswahl="true" 
                :pulsieren="flow==1.0"
                :buch="flow>=1.1"
                bild="assets/objekte/eg/00x0_eg_02/00x0_eg_02_rund.png"
                @kleine-lupe-clicked="flow=1.1"
                :hashtag1="flow>=1.3 ? '#schönheit_aus_urzeiten' : ''"
                :hashtag2="flow>=1.7 ? '#alt_und_geheimnsvoll' : ''"
                />
              <HinweisBoxComponent class="hinweis-box" v-else-if="flow>=2.0 && ort=='eg'" 
                :zahl="'1'" 
                :gross="flow<=2.3 || (flow>=3.0 && flow<=3.3) || flow>=4.0" 
                :auswahl="false"
                :pulsieren="false"
                :buch="true"
                bild="assets/objekte/eg/00x0_eg_02/00x0_eg_02_rund.png"
                hashtag1="#schönheit_aus_urzeiten"
                hashtag2="#alt_und_geheimnsvoll"
                />
              <HinweisBoxComponent class="hinweis-box" v-else-if="flow<2.0 && ort=='og1'" 
                :zahl="'1'" 
                :gross="flow>=1.3" 
                :auswahl="true" 
                :pulsieren="flow==1.0"
                :buch="flow>=1.1"
                bild="assets/objekte/og/00x0_og1_ac/00x0_og1_ac_rund.png"
                @kleine-lupe-clicked="flow=1.1"
                :hashtag1="flow>=1.3 ? '#schnipp_schnapp_locke_ab' : ''"
                :hashtag2="flow>=1.7 ? '#schillernde_lockenpracht' : ''"
                />
              <HinweisBoxComponent class="hinweis-box" v-else-if="flow>=2.0 && ort=='og1'" 
                :zahl="'1'" 
                :gross="flow<=2.3 || (flow>=3.0 && flow<=3.3) || flow>=4.0" 
                :auswahl="false"
                :pulsieren="false"
                :buch="true"
                bild="assets/objekte/og/00x0_og1_ac/00x0_og1_ac_rund.png"
                hashtag1="#schnipp_schnapp_locke_ab"
                hashtag2="#schillernde_lockenpracht"
                />

            <HinweisBoxComponent class="hinweis-box" v-if="flow<2.0" :zahl="'2'" :gross="false" inaktiv/>
            <HinweisBoxComponent class="hinweis-box" v-else-if="flow<3.0 && ort=='eg'" 
                :zahl="'2'" 
                :gross="flow>=2.3" 
                :auswahl="true" 
                :pulsieren="flow==2.0"
                :buch="flow>=2.1"
                bild="assets/objekte/eg/x0x0_eg_02/x0x0_eg_02_rund.png"
                @kleine-lupe-clicked="flow=2.1"
                :hashtag1="flow>=2.3 ? '#hochlichter' : ''"
                :hashtag2="flow>=2.7 ? '#prunk_und_paradestück' : ''"
                />
            <HinweisBoxComponent class="hinweis-box" v-else-if="flow>=3.0 && ort=='eg'" 
                :zahl="'2'" 
                :gross="flow<=3.3 || flow>=4.0"
                :auswahl="false"
                :pulsieren="false"
                :buch="true"
                bild="assets/objekte/eg/x0x0_eg_02/x0x0_eg_02_rund.png"
                hashtag1="#hochlichter"
                hashtag2="#prunk_und_paradestück"
            />
            <HinweisBoxComponent class="hinweis-box" v-else-if="flow<3.0 && ort=='og1'" 
                :zahl="'2'" 
                :gross="flow>=2.3" 
                :auswahl="true" 
                :pulsieren="flow==2.0"
                :buch="flow>=2.1"
                bild="assets/objekte/og/001x_og1_ab/001x_og1_ab_rund.png"
                @kleine-lupe-clicked="flow=2.1"
                :hashtag1="flow>=2.3 ? '#gut_versteckt' : ''"
                :hashtag2="flow>=2.7 ? '#Zunftkasse1454' : ''"
                />
            <HinweisBoxComponent class="hinweis-box" v-else-if="flow>=3.0 && ort=='og1'" 
                :zahl="'2'" 
                :gross="flow<=3.3 || flow>=4.0"
                :auswahl="false"
                :pulsieren="false"
                :buch="true"
                bild="assets/objekte/og/001x_og1_ab/001x_og1_ab_rund.png"
                hashtag1="#gut_versteckt"
                hashtag2="#Zunftkasse1454"
            />

            <HinweisBoxComponent class="hinweis-box" v-if="flow<3.0" :zahl="'2'" :gross="false" inaktiv/>
            <HinweisBoxComponent class="hinweis-box" v-else-if="flow<4.0 && ort=='eg'" 
                :zahl="'3'" 
                :gross="flow>=3.3" 
                :auswahl="true" 
                :pulsieren="flow==3.0"
                :buch="flow>=3.1"
                bild="assets/objekte/eg/00x1_eg_ab/00x1_eg_ab_rund.png"
                @kleine-lupe-clicked="flow=3.1"
                :hashtag1="flow>=3.3 ? '#Adular_und_Feldspat' : ''"
                :hashtag2="flow>=3.7 ? '#alte_worte_alte_steine' : ''"
            />
            <HinweisBoxComponent class="hinweis-box" v-else-if="flow>=4.0 && ort=='eg'" 
                :zahl="'3'" 
                :gross="flow>=4.0" 
                :auswahl="false"
                :pulsieren="false"
                :buch="true"
                bild="assets/objekte/eg/00x1_eg_ab/00x1_eg_ab_rund.png"
                :hashtag1="flow>=3.3 ? '#Adular_und_Feldspat' : ''"
                :hashtag2="flow>=3.7 ? '#alte_worte_alte_steine' : ''"
            />
            <HinweisBoxComponent class="hinweis-box" v-else-if="flow<4.0 && ort=='og1'" 
                :zahl="'3'" 
                :gross="flow>=3.3" 
                :auswahl="true" 
                :pulsieren="flow==3.0"
                :buch="flow>=3.1"
                bild="assets/objekte/og/10x0_og1_bc/10x0_og1_bc_rund.png"
                @kleine-lupe-clicked="flow=3.1"
                :hashtag1="flow>=3.3 ? '#5_Sterne_sind_zuwenig' : ''"
                :hashtag2="flow>=3.7 ? '#faktisch_immerwoanders' : ''"
            />
            <HinweisBoxComponent class="hinweis-box" v-else-if="flow>=4.0 && ort=='og1'"
                :zahl="'3'" 
                :gross="flow>=4.0" 
                :auswahl="false"
                :pulsieren="false"
                :buch="true"
                bild="assets/objekte/og/10x0_og1_bc/10x0_og1_bc_rund.png"
                :hashtag1="flow>=3.3 ? '#5_Sterne_sind_zuwenig' : ''"
                :hashtag2="flow>=3.7 ? '#faktisch_immerwoanders' : ''"
            />

 

            <LupeMitteComponent id="lupe_mitte" v-if="flow >= 0.7 && flow < 0.81 && ort=='eg'" 
                bild="assets/objekte/eg/tutorial/tutorial_eg_rund.png" 
                :empfang=empfang 
            />
            <LupeMitteComponent id="lupe_mitte" v-else-if="flow >= 0.7 && flow < 0.81 && ort=='og1'"
                bild="assets/objekte/og/tutorial/tutorial_og_rund.png"
                :empfang=empfang 
            />
            <LupeMitteComponent id="lupe_mitte" v-else-if="flow >= 0.81 && flow <1.0" 
                bild="assets/objekte/eg/tutorial/tutorial_eg_lupe_logo.png"
            />
            <LupeMitteComponent id="lupe_mitte" v-else-if="flow>=1.1 && flow<1.3" 
                :bild="ort=='eg' ? 'assets/objekte/eg/00x0_eg_02/00x0_eg_02_rund.png' : 'assets/objekte/og/00x0_og1_ac/00x0_og1_ac_rund.png'"
            />
            <LupeMitteComponent id="lupe_mitte" v-else-if="flow>=2.1 && flow<2.3" 
                :bild="ort=='eg' ? 'assets/objekte/eg/x0x0_eg_02/x0x0_eg_02_rund.png' : 'assets/objekte/og/001x_og1_ab/001x_og1_ab_rund.png'"
            />
            <LupeMitteComponent id="lupe_mitte" v-else-if="flow>=3.1 && flow<3.3" 
                :bild="ort=='eg' ? 'assets/objekte/eg/00x1_eg_ab/00x1_eg_ab_rund.png' : 'assets/objekte/og/10x0_og1_bc/10x0_og1_bc_rund.png'"
            />
            <LupeMitteComponent id="lupe_mitte" v-else 
                bild="assets/objekte/eg/tutorial/tutorial_eg_lupe_logo.png"
                style="opacity: 10%"
            />
          </div>
          <div id="container_buttons">
            <ButtonExitComponent @click="openSpielMenu"/>

            <ButtonKarteComponent @click="openKarteModal" :pulsiert="flow == 0.72" :disabled="flow < 0.72" v-if="flow<1.0"/>
            <ButtonKarteComponent @click="openKarteModal" :pulsiert="flow==1.46" v-else-if="flow==1.46"/>
            <ButtonKarteComponent @click="openKarteModal" :pulsiert="flow==2.46" v-else-if="flow==2.46"/>
            <ButtonKarteComponent @click="openKarteModal" disabled v-else-if="flow<4.0"/>

            <ButtonKameraComponent v-if="flow==0.8"
                @click="openKameraModal" 
                :disabled="!(flow == 0.8 && (empfang == 'stark' || !btTrigger))" 
                :pulsiert="flow == 0.8 && empfang == 'stark'"
            />
            <ButtonKameraComponent v-else-if="flow==1.4"
                @click="openKameraModal" 
                :disabled="empfang != 'stark' && btTrigger" 
                :pulsiert="empfang == 'start'"
            />
                <ButtonKameraComponent v-else-if="flow==2.4"
                @click="openKameraModal" 
                :disabled="empfang != 'stark' && btTrigger" 
                :pulsiert="empfang == 'start'"
            />
            <ButtonKameraComponent v-else-if="flow<4.0" disabled></ButtonKameraComponent>

            <span class="personen-boxen" v-if="flow>=4.0 && spieler=='Watson'">
              <PersonenBoxComponent name="Katinka Antiqus" code="00x0" @click="personClicked(1, '00x0')" :auswahl="personAktiv==1" />
              <PersonenBoxComponent name="James Mopsiathy" code="11x1" @click="personClicked(2, '11x1')" :auswahl="personAktiv==2" />
              <PersonenBoxComponent name="Mia Mirabilis" code="111x" @click="personClicked(3, '111x')" :auswahl="personAktiv==3" />
            </span>
            <span class="personen-boxen" v-if="flow>=4.0 && spieler=='Sherlock'">
              <PersonenBoxComponent name="Katinka Antiqus" code="00x0" @click="personClicked(1, '00x0')" :auswahl="personAktiv==1" />
              <PersonenBoxComponent name="Mia Mirabilis" code="111x" @click="personClicked(2, '111x')" :auswahl="personAktiv==2" />
              <PersonenBoxComponent name="Wolfram Wolkenwand" code="x111" @click="personClicked(3, 'x111')" />
            </span>
            <span class="personen-boxen" v-if="flow>=4.0 && spieler=='Enola'">
              <PersonenBoxComponent name="Katinka Antiqus" code="00x0" @click="personClicked(1, '00x0')" :auswahl="personAktiv==1" />
              <PersonenBoxComponent name="Iri Adler" code="11x0" @click="personClicked(2, '11x0')" :auswahl="personAktiv==2" />
              <PersonenBoxComponent name="Schorm Roderick" code="01x1" @click="personClicked(3, '01x1')" :auswahl="personAktiv==3" />
            </span>

            <ion-button @click="skipTutorialHinweis(true)" color="primary" size="large" v-if="spielStore.flow<1.0">Tutorial <br>überspringen</ion-button>
          </div>
          <img class="tutorial-stamp" src="assets/img/tutorial_solid.svg" v-if="spielStore.flow<1.0"/>
        </div>
        <div id="container_scroll">
          <!-- <component :is="scrollSeite"/> -->
          <Scroll_0_6_Tutorial v-if="spielStore.flow < 1.0"/>
          <Scroll_EG_Detail1 v-if="spielStore.flow>=1.0" />
          <!-- scrollSeite -->
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
.personen-boxen * {
}
.hinweis-box {
  filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.25));
}
.personen-boxen {
  display: flex;
  flex-direction: row;
  gap: 20px;
}
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
  top: 350px;
  left: 460px;
  width: 600px;
  height: 600px;
  transform: translate(-50%,-50%);
  z-index: -2
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
import { IonPage, IonContent, IonButton, IonAlert, IonModal, isPlatform } from '@ionic/vue';

import { useSpielStore } from '@/stores/SpielStore';
import { useBeaconStore } from '@/stores/BeaconStore';

import router from '@/router';
import { ref, shallowRef, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { modalController } from '@ionic/vue';
import Scroll_0_6_Tutorial from '@/components/scrollbereich/Scroll_0_6_Tutorial.vue';
import Scroll_EG_Detail1 from '@/components/scrollbereich/Scroll_EG_Detail1.vue'
import SpielMenu from '@/components/modals/SpielMenu.vue'
import KarteModal from '@/components/modals/KarteModal.vue';
import KameraModal from '@/components/modals/KameraModal.vue';
import BeaconModal from '@/components/modals/BeaconModal.vue';
import EinstellungsModal from '@/components/modals/EinstellungsModal.vue';
import SteckbriefModal from '@/components/modals/SteckbriefModal.vue';

import ButtonKarteComponent from '@/components/ButtonKarteComponent.vue';
import ButtonExitComponent from '@/components/ButtonExitComponent.vue';
import ButtonKameraComponent from '@/components/ButtonKameraComponent.vue';
import HinweisBoxComponent from '@/components/HinweisBoxComponent.vue';
import LupeMitteComponent from '@/components/LupeMitteComponent.vue';
import PersonenBoxComponent from '@/components/PersonenBoxComponent.vue';

const spielStore = useSpielStore();
const beaconStore = useBeaconStore();

if (isPlatform('desktop')) {
  spielStore.btTrigger = false;
  spielStore.kameraTrigger = false;
  console.log('isPlatform(): desktop')
} else {
  spielStore.btTrigger = true;
  spielStore.kameraTrigger = true;
}

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

const { flow, ort, spieler, btTrigger, kameraTrigger } = storeToRefs(spielStore);
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
  // if (flow.value >= 1.0)
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

const { rangeTicks } = storeToRefs(beaconStore);
const empfang = ref('nichts');

watch(rangeTicks, () => {
  if (spielStore.btTrigger) {
    if (flow.value >= 0.71 && flow.value < 0.8 ) {
      if (beaconStore.getBeaconVonOrt('EG Leiner-Statue').rssi < -80) {
        flow.value = 0.8;
      } else if (beaconStore.getBeaconVonOrt('EG Kasse').rssi < -80) {
        flow.value = 0.73;
      } else if (beaconStore.getBeaconVonOrt('EG Treppe').rssi < -80) {
        flow.value = 0.72;
      }
    }
    if (flow.value == 0.8) {
      empfang.value = beaconStore.getEmpfangVonOrt('EG Leiner-Statue');
    }
  }
});

// const {beaconList} = storeToRefs(beaconStore);
// watch(beaconList.value[2], () => {
//   console.log('beacon changed: (rssi) ', beaconList.value[2].rssi);

// });

// const leiner_entfernung = ref(beaconStore.beaconList[2].rssi);
// watch(leiner_entfernung, () => {
//   console.log('leiner_entfernung: ', leiner_entfernung.value);
// });

const hinweisBoxGross = ref(true);

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

function personClicked(nr : number, code : string) {
  console.log("Person clicked: ", nr);
  if (personAktiv.value == nr) {
    personAktiv.value = 0;
  } else {
    personAktiv.value = nr;
    openSteckbriefModal(code);
  }

}

const openSteckbriefModal = async (code : string) => {
  console.log("openSteckbriefModal()");
  const steckbrief_modal = await modalController.create({
    component: SteckbriefModal,
    cssClass: 'steckbrief-modal',
    componentProps: {
      code: code
    }
  });
  console.log("after await");
  steckbrief_modal.present();
  // const { data } = await steckbrief_modal.onWillDismiss();
  await steckbrief_modal.onWillDismiss();
  personAktiv.value = 0;
}

const personAktiv = ref(0);

</script>