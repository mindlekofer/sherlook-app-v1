<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <span class="debugging" id="debug-flow-anzeige">{{ spieler }} {{ ort }} {{ flow }} {{ slideNr }}</span>
      <div id="container_alles">
        <div id="container_links">
          <div class="container_hinweise">
            <!-- <HinweisBoxComponent class="hinweis-box" v-if="flow<1.0" :zahl="'1'" :gross="false" inaktiv /> -->
            <div class="stempel" id="stempel-tutorial" v-if="flow<1.0">Tutorial</div>
            <div class="stempel" id="stempel-detail1" v-else-if="flow==1.0">Detail #1</div>
            <div class="stempel" id="stempel-detail2" v-else-if="flow==2.0">Detail #2</div>
            <div class="stempel" id="stempel-detail3" v-else-if="flow==3.0">Detail #3</div>

            <HinweisBoxComponent class="hinweis-box" v-if="flow<1.0"
                zahl="1"
                :bild="`assets/objekte/${objekte_ort[0].ort}/${objekte_ort[0].code}/${objekte_ort[0].code}_rund.png`"
                inaktiv
            />
            <HinweisBoxComponent class="hinweis-box" v-else-if="flow<5.0"
                :zahl="'1'"
                :gross="(flow>=1.3 && flow<2.0 && slideNr>=2) || (flow==2.0) || (flow>=2.3 && flow<=2.7 && slideNr>=2) || (flow>=3.3 && flow<=3.7 && slideNr>=2) || flow==3.0 || flow>=4.0"
                :buch="flow>=1.1"
                :auswahl="(flow>=1.0 && flow<2.0) || hinweisModalOffenNr==1"
                :vordergrund="flow>=1.0 && !lupeImVordergrund"
                :pulsieren="flow==1.0"
                :bild="`assets/objekte/${objekte_ort[0].ort}/${objekte_ort[0].code}/${objekte_ort[0].code}_rund.png`"
                @kleine-lupe-clicked="flow=1.1"
                :hashtag1="flow>=1.3 ? objekte_ort[0].hashtag[0].text : ''"
                :hashtag2="flow>=1.7 ? objekte_ort[0].hashtag[1].text : ''"
                :abgeschlossen="flow>=2"
                @click="hinweisClicked(1)"
                @hinweis-clicked="console.log('Hinweis clicked')"
                :hashtag1Rot="isHashtagFalsch(spielStore.personVerhaftet, objekte_ort[0].hashtag[0].code)"
                :hashtag2Rot="isHashtagFalsch(spielStore.personVerhaftet, objekte_ort[0].hashtag[1].code)"
            />
            <!-- :bild="ort=='eg'?'assets/objekte/eg/00x0_eg_02/00x0_eg_02_rund.png':'assets/objekte/og1/00x0_og1_ac/00x0_og1_ac_rund.png'" -->
                
            <HinweisBoxComponent class="hinweis-box" v-if="flow<2.0" 
                :zahl="'2'" 
                :bild="`assets/objekte/${objekte_ort[1].ort}/${objekte_ort[1].code}/${objekte_ort[1].code}_rund.png`"
                inaktiv 
            />
            <HinweisBoxComponent class="hinweis-box" v-else-if="flow<5.0"
                :zahl="'2'"
                :gross="(flow>=2.3 && flow<3.0 && slideNr>=2) || (flow==3.0) || (flow>=3.3 && flow <= 3.7 && slideNr>=2) || flow>=4.0"
                :buch="flow>=2.1"
                :auswahl="(flow>=2.0 && flow<3.0) || hinweisModalOffenNr==2" 
                :vordergrund="flow>=2.0 && !lupeImVordergrund"
                :pulsieren="flow==2.0"
                :bild="`assets/objekte/${objekte_ort[1].ort}/${objekte_ort[1].code}/${objekte_ort[1].code}_rund.png`"
                @kleine-lupe-clicked="flow=2.1"
                :hashtag1="flow>=2.3 ? objekte_ort[1].hashtag[0].text : ''"
                :hashtag2="flow>=2.7 ? objekte_ort[1].hashtag[1].text : ''"
                :abgeschlossen="flow>=3"
                @click="hinweisClicked(2)"
                :hashtag1Rot="isHashtagFalsch(spielStore.personVerhaftet, objekte_ort[1].hashtag[0].code)"
                :hashtag2Rot="isHashtagFalsch(spielStore.personVerhaftet, objekte_ort[1].hashtag[1].code)"
            />

            <HinweisBoxComponent class="hinweis-box" v-if="flow<3.0" 
                :zahl="'3'" 
                :bild="`assets/objekte/${objekte_ort[2].ort}/${objekte_ort[2].code}/${objekte_ort[2].code}_rund.png`"
                inaktiv 
            />
            <HinweisBoxComponent class="hinweis-box" v-else-if="flow<5.0"
                :zahl="'3'"
                :gross="(flow>=3.3 && flow<4.0 && slideNr>=2) || flow>=4.0"
                :buch="flow>=3.1"
                :auswahl="(flow>=3.0 && flow<4.0) || hinweisModalOffenNr==3" 
                :vordergrund="flow>=3.0 && !lupeImVordergrund"
                :pulsieren="flow==3.0"
                :bild="`assets/objekte/${objekte_ort[2].ort}/${objekte_ort[2].code}/${objekte_ort[2].code}_rund.png`"
                @kleine-lupe-clicked="flow=3.1"
                :hashtag1="flow>=3.3 ? objekte_ort[2].hashtag[0].text : ''"
                :hashtag2="flow>=3.7 ? objekte_ort[2].hashtag[1].text : ''"
                :abgeschlossen="flow>=4"
                @click="hinweisClicked(3)"
                :hashtag1Rot="isHashtagFalsch(spielStore.personVerhaftet, objekte_ort[2].hashtag[0].code)"
                :hashtag2Rot="isHashtagFalsch(spielStore.personVerhaftet, objekte_ort[2].hashtag[1].code)"
            />

            <LupeMitteComponent id="lupe_mitte" v-if="flow==0.6 || flow==1.0 || flow==2.0 || flow==3.0" 
              bild="assets/img/lupe_logo_rund.png"
              inaktiv
            />
            <LupeMitteComponent id="lupe_mitte" v-if="flow >= 0.7 && flow <= 0.8 && ort=='eg'" 
                bild="assets/objekte/eg/tutorial/tutorial_eg_rund.png" 
                :empfang=empfang 
            />
            <LupeMitteComponent id="lupe_mitte" v-else-if="flow >= 0.7 && flow <= 0.8 && ort=='og1'"
                bild="assets/objekte/og1/tutorial/tutorial_og_rund.png"
                :empfang=empfang 
            />
            <LupeMitteComponent id="lupe_mitte" v-else-if="flow > 0.8 && flow <1.0" 
                bild="assets/img/lupe_logo_rund.png"
            />
            <!-- <LupeMitteComponent id="lupe_mitte" v-else-if="flow>=1.1 && flow<1.3"  -->
            <LupeMitteComponent id="lupe_mitte" v-else-if="flow>=1.1 && flow<2" 
                :bild="`assets/objekte/${objekte_ort[0].ort}/${objekte_ort[0].code}/${objekte_ort[0].code}_rund.png`"
                :hintergrund="!lupeImVordergrund"
                @click="lupeMitteClicked"
                :empfang="flow==1.4 ? empfang : 'nichts'"
            />
            <!-- @click="lupeImVordergrund=true" -->
            <LupeMitteComponent id="lupe_mitte" v-else-if="flow>=2.1 && flow<3" 
                :bild="`assets/objekte/${objekte_ort[1].ort}/${objekte_ort[1].code}/${objekte_ort[1].code}_rund.png`"
                :hintergrund="!lupeImVordergrund"
                @click="lupeMitteClicked"
                :empfang="flow==2.4 ? empfang : 'nichts'"
              />
            <!-- <LupeMitteComponent id="lupe_mitte" v-else-if="flow>=3.1 && flow<3.3" 
                :bild="ort=='eg' ? 'assets/objekte/eg/00x1_eg_ab/00x1_eg_ab_rund.png' : 'assets/objekte/og1/10x0_og1_bc/10x0_og1_bc_rund.png'"
            /> -->
            <LupeMitteComponent id="lupe_mitte" v-else-if="flow>=3.1 && flow<4" 
                :bild="`assets/objekte/${objekte_ort[2].ort}/${objekte_ort[2].code}/${objekte_ort[2].code}_rund.png`"
                :hintergrund="!lupeImVordergrund"
                @click="lupeMitteClicked"
                :empfang="flow==3.4 ? empfang : 'nichts'"
              />
            <LupeMitteComponent id="lupe_mitte" v-else inaktiv bild="assets/img/lupe_logo_rund.png" />
          </div>

          <div id="container_buttons">
            <ButtonExitComponent @click="openSpielMenu"/>

            <ButtonHilfeComponent v-if="flow>=1.0 && flow<4.0" @click="openHilfeModal"/>

            <ButtonKarteComponent @click="openKarteModal" :pulsiert="flow == 0.72 || slideNr == 3" :disabled="slideNr<3" v-if="flow<1.0"/>
            <ButtonKarteComponent @click="openKarteModal" :pulsiert="flow==1.36" v-else-if="flow==1.36"/>
            <ButtonKarteComponent @click="openKarteModal" :pulsiert="flow==2.36" v-else-if="flow==2.36"/>
            <ButtonKarteComponent @click="openKarteModal" :pulsiert="flow==3.36" v-else-if="flow==3.36"/>
            <ButtonKarteComponent @click="openKarteModal" disabled v-else-if="flow<4.0"/>

            <ButtonKameraComponent v-if="flow==0.8"
                @click="openKameraModal" 
                :disabled="!(flow == 0.8 && (empfang=='stark' || !btTrigger))" 
                :pulsiert="flow == 0.8 && empfang=='stark'"
            />
            <ButtonKameraComponent v-else-if="flow==1.4"
                @click="openKameraModal" 
                :disabled="empfang != 'stark' && btTrigger" 
                :pulsiert="empfang == 'stark'"
            />
            <ButtonKameraComponent v-else-if="flow==2.4"
                @click="openKameraModal" 
                :disabled="empfang != 'stark' && btTrigger" 
                :pulsiert="empfang == 'stark'"
            />
            <ButtonKameraComponent v-else-if="flow==3.4"
                @click="openKameraModal" 
                :disabled="empfang != 'stark' && btTrigger" 
                :pulsiert="empfang == 'stark'"
            />
            <ButtonKameraComponent v-else-if="flow<4.0" disabled></ButtonKameraComponent>

            <span class="personen-boxen" v-if="flow>=4.1">
              <PersonenBoxComponent v-for="(n, i) in 3" :key="i"
                  :name=person_ort_spieler[i].name 
                  :code=person_ort_spieler[i].code
                  @click="personClicked(n, person_ort_spieler[i].code)" 
                  :auswahl="personAusgewaehlt==n" 
                  :inaktiv="flow>=4.5"
                  :richtig="verhaftet[i] && (person_ort_spieler[i].code == person.schuldig.code)"
                  :falsch="verhaftet[i] && (person_ort_spieler[i].code != person.schuldig.code)"
                  :verdaechtig="spielStore.verdaechtig[i]" 
                  :unverdaechtig="spielStore.unverdaechtig[i]" 
              />
            </span>
            
            <span class="personen-boxen" v-else-if="flow>=4.0">
              <PersonenBoxComponent  />
              <PersonenBoxComponent  />
              <PersonenBoxComponent  />
            </span>

            <ion-button @click="skipTutorialHinweis(true)" color="primary" size="large" v-if="spielStore.flow<1.0">Tutorial <br>überspringen</ion-button>
          </div>
          <!-- <img class="tutorial-stamp" src="assets/img/tutorial_solid.svg" v-if="spielStore.flow<1.0"/> -->
        </div>
        <div id="container_scroll">
          <!-- <component :is="scrollSeite"/> -->
          <Scroll_0_6_Tutorial v-if="spielStore.flow < 1.0"/>
          <Scroll_1_0_Spiel v-if="spielStore.flow>=1.0" />
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
.stempel {
  position: absolute;
  padding: 5px 20px 3px 20px;
  font-family: Helvetica, Sans-Serif;
  font-weight: 900;
  background-color: transparent;
  border-width: 12px;
  border-color: rgb(243, 61, 61);
  color:  rgb(243, 61, 61);
  opacity: 0.7;
  border-style: solid;
  border-radius: 30px;
}
#stempel-tutorial {
  font-size: 90px;
  top: 100px;
  left: 100px;
  transform: rotate(-30deg);
  z-index: 999;
}
#stempel-detail1 {
  font-size: 70px;
  transform: rotate(-15deg);
  top: 60px;
  left: 200px;
  z-index: 10;
}
#stempel-detail2 {
  font-size: 70px;
  transform: rotate(+10deg);
  top: 500px;
  left: 200px;
  z-index: 10;
}
#stempel-detail3 {
  font-size: 70px;
  transform: rotate(-20deg);
  top: 480px;
  left: 320px;
  z-index: 10;
}
.hinweis-box {
  filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.25));
}
.vordergrund {
  opacity: 90%;
  z-index: 10;
}
.hintergrund {
  opacity: 70%;
  z-index: 0;
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
    z-index: 20;
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
  z-index: 5;
}
.debugging {
  position: absolute;
  z-index: 9999;
  opacity: 50%;
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
import { ref, shallowRef, watch, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { modalController } from '@ionic/vue';
import Scroll_0_6_Tutorial from '@/components/scrollbereich/Scroll_0_6_Tutorial.vue';
import Scroll_1_0_Spiel from '@/components/scrollbereich/Scroll_1_0_Spiel.vue'
import SpielMenu from '@/components/modals/SpielMenu.vue'
import KarteModal from '@/components/modals/KarteModal.vue';
import KameraModal from '@/components/modals/KameraModal.vue';
import BeaconModal from '@/components/modals/BeaconModal.vue';
import EinstellungsModal from '@/components/modals/EinstellungsModal.vue';
import SteckbriefModal from '@/components/modals/SteckbriefModal.vue';
import HilfeModal from '@/components/modals/HilfeModal.vue';

import ButtonKarteComponent from '@/components/ButtonKarteComponent.vue';
import ButtonExitComponent from '@/components/ButtonExitComponent.vue';
import ButtonKameraComponent from '@/components/ButtonKameraComponent.vue';
import ButtonHilfeComponent from '@/components/ButtonHilfeComponent.vue';
import HinweisBoxComponent from '@/components/HinweisBoxComponent.vue';
import LupeMitteComponent from '@/components/LupeMitteComponent.vue';
import PersonenBoxComponent from '@/components/PersonenBoxComponent.vue';
import HinweisModal from '@/components/modals/HinweisModal.vue';
import OutroModal from '@/components/modals/OutroModal.vue';
import ObjekteModal from '@/components/modals/ObjekteModal.vue';
import PersonenModal from '@/components/modals/PersonenModal.vue';
import axios from 'axios';

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

beaconStore.restartTimer = setInterval(() => {
  console.log("bt restartTimer");
  beaconStore.scanBt();
}, 10000)

const lupeImVordergrund = ref(false);
const hinweisBoxKlein = ref(true);
const hinweisModalOffenNr = ref(0);
const timeoutObjektNichtGefunden = ref(0);

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

const { flow, ort, spieler, btTrigger, kameraTrigger, slideNr, 
  ermittlungsAuswahl, verhaftet, verdaechtig, unverdaechtig, 
  objekte_eg, objekte_og, objekte_ort,
  personen_auswahl, person, personenReihenfolge, person_ort_spieler } = storeToRefs(spielStore);

spielStore.flow = 0.6;

function personBoxInaktiv(nr : number) {
  return verhaftet.value.some((v)=>v==true) && !verhaftet.value[nr-1]
}

const entfernung = ref(-1);
// let leiner_timer = null as any;
watch(flow, () => {
  console.log(`(page spiel) flow geändert auf ${flow.value}`);
  if (flow.value==2.0) {
    lupeImVordergrund.value = false;
  }
  if (flow.value==1.1 || flow.value==2.1 || flow.value==3.1) {
    lupeImVordergrund.value=true;
  }
  if (flow.value==1.3 || flow.value==2.3 || flow.value==3.3) {
    lupeImVordergrund.value=false;
    timeoutObjektNichtGefunden.value = setTimeout(() => {
      if (flow.value < 1.4) flow.value = 1.36;
      else if (flow.value < 2.4) flow.value = 2.36;
      else if (flow.value < 3.4) flow.value = 3.36;
    }, 3*60000)
  } else {
    clearTimeout(timeoutObjektNichtGefunden.value);
  }
  // if ((flow.value==1.4 || flow.value==2.4 || flow.value==3.4) && slideNr.value>=2) {
  if ((flow.value==1.4 || flow.value==2.4 || flow.value==3.4)) {
    lupeImVordergrund.value=true;
  }
  if (flow.value==1.6 || flow.value==2.6 || flow.value==3.6) {
    lupeImVordergrund.value=false;
  }
  if (flow.value==1.7 || flow.value==2.7 || flow.value==3.7) {
    lupeImVordergrund.value=false;
  }
  if (flow.value == 4.0) {
    personenReihenfolge.value.sort((a, b) => 0.5 - Math.random());
    console.log("Verdächtige: ", person_ort_spieler.value);
  }
  if (flow.value>=4.0) {
    lupeImVordergrund.value=false;
  }
  if (flow.value<4) {
    verhaftet.value.forEach((value, index, arr) => {
      arr[index] = false;
    });
    verdaechtig.value.forEach((value, index, arr) => {
      arr[index] = false;
    });
    unverdaechtig.value.forEach((value, index, arr) => {
      arr[index] = false;
    });
  }
});

watch(slideNr, () => {
  // if (flow.value>=1.3 && flow.value<=1.4 
  //     && slideNr.value>=2 && slideNr.value<=3) {
  //   lupeImVordergrund.value = false;
  // }
  if (((flow.value>=1.3&&flow.value<=1.4) 
      || (flow.value>=2.3&&flow.value<=2.4) 
      || (flow.value>=3.3&&flow.value<=3.4)) 
      && slideNr.value==3) {
    lupeImVordergrund.value == true;
  }
  if (flow.value==1.7 && slideNr.value==6) {
    flow.value=1.8;
  }
});

const { rangeTicks } = storeToRefs(beaconStore);
const empfang = ref('nichts');

watch(rangeTicks, () => {
  if (spielStore.btTrigger) {
    if (flow.value >= 0.71 && flow.value<0.8 && ort.value =='eg' ) {
      if (beaconStore.getBeaconVonOrt('EG Leiner-Statue').rssi > -95 
      || beaconStore.getBeaconVonOrt('EG Ichthyosaurier').rssi > -95
      || beaconStore.getBeaconVonOrt('EG Kristall').rssi > -95) {
      // || beaconStore.getBeaconVonOrt('EG Kristall').rssi > -95) {
        flow.value = 0.8;
      }
    }
    if (flow.value >= 0.71 && flow.value<0.8 && ort.value =='og1' ) {
      if (beaconStore.getBeaconVonOrt('OG Schreibtisch').rssi > -95 ) {
        flow.value = 0.8;
      }
    }
    if (flow.value == 0.8 && ort.value == 'eg') {
      empfang.value = beaconStore.getEmpfangVonOrt('EG Leiner-Statue');
    }
    if (flow.value == 0.8 && ort.value == 'og1') {
      empfang.value = beaconStore.getEmpfangVonOrt('OG Schreibtisch');
    }
    if (flow.value == 0.9 && ort.value =='eg') {
      if (beaconStore.getBeaconVonOrt('EG Detektivbüro').rssi > -95) {
        flow.value = 0.95;
      }
    }
    if (flow.value == 0.9 && ort.value =='og1') {
      if (beaconStore.getBeaconVonOrt('OG Zunftsaal').rssi > -95) {
        flow.value = 0.95;
      }
    }
    if (flow.value == 0.88 && ort.value =='og1') {
      if (beaconStore.getBeaconVonOrt('OG Schloss').rssi > -95
      || beaconStore.getBeaconVonOrt('OG Zunftsaal').rssi > -95) {
        flow.value = 0.95;
      }
    }
    if ((flow.value==1.3 || flow.value==1.36) && ort.value == 'eg') {
      if (beaconStore.getBeaconVonOrt('EG Ichthyosaurier').rssi > -95) {
        flow.value = 1.4;
      }
    }
    if ((flow.value==1.3 || flow.value==1.36) && ort.value == 'og1') {
      if (beaconStore.getBeaconVonOrt('OG Schreibtisch').rssi > -95 ) {
        flow.value = 1.4;
      }
    }
    if (flow.value == 1.4 && ort.value == 'eg') {
      empfang.value = beaconStore.getEmpfangVonOrt('EG Ichthyosaurier');
    }
    if (flow.value == 1.4 && ort.value == 'og1') {
      empfang.value = beaconStore.getEmpfangVonOrt('OG Schreibtisch');
    }
    if ((flow.value==2.3 || flow.value==2.36) && ort.value == 'eg') {
      if (beaconStore.getBeaconVonOrt('EG Waffenraum').rssi > -95) {
        flow.value = 2.4;
      }
    }
    if ((flow.value==2.3 || flow.value==2.36) && ort.value == 'og1') {
      if (beaconStore.getBeaconVonOrt('OG Schloss').rssi > -95 ) {
        flow.value = 2.4;
      }
    }
    if (flow.value == 2.4 && ort.value == 'eg') {
      empfang.value = beaconStore.getEmpfangVonOrt('EG Waffenraum');
    }
    if (flow.value == 2.4 && ort.value == 'og1') {
      empfang.value = beaconStore.getEmpfangVonOrt('OG Schloss');
    }
    
    if ((flow.value==3.3 || flow.value==3.36) && ort.value == 'eg') {
      if (beaconStore.getBeaconVonOrt('EG Kristall').rssi > -95) {
        flow.value = 3.4;
      }
    }
    if ((flow.value==3.3 || flow.value==3.36) && ort.value == 'og1') {
      if (beaconStore.getBeaconVonOrt('OG Kelch').rssi > -95 ) {
        flow.value = 3.4;
      }
    }
    if (flow.value == 3.4 && ort.value == 'eg') {
      empfang.value = beaconStore.getEmpfangVonOrt('EG Kristall');
    }
    if (flow.value == 3.4 && ort.value == 'og1') {
      empfang.value = beaconStore.getEmpfangVonOrt('OG Kelch');
    }
    if (flow.value == 4.0) {
      if (beaconStore.getBeaconVonOrt('EG Detektivbüro').rssi > -95) {
        flow.value = 4.1;
      }
    }
  }
});

watch(objekte_eg, () => {
  console.log('Änderung: ' + objekte_eg.value);
  for (let i=0; i<3; i++) {
    axios.get('assets/objekte/eg/'+spielStore.objekte_eg[i]+'/'+spielStore.objekte_eg[i]+'.json')
        .then(response => { spielStore.objekte.eg[i] = response.data, console.log(response); });
  }
  for (let i=0; i<3; i++) {
    axios.get('assets/objekte/eg/'+spielStore.objekte_eg[i]+'/'+spielStore.objekte_eg[i]+'.json')
        .then(response => { spielStore.objekte.eg[i] = response.data, console.log(response); });
  }
});

watch(objekte_og, () => {
  console.log('Änderung: ' + objekte_og.value);
  for (let i=0; i<3; i++) {
    axios.get('assets/objekte/og1/'+spielStore.objekte_og[i]+'/'+spielStore.objekte_og[i]+'.json')
        .then(response => { spielStore.objekte.og1[i] = response.data, console.log(response); });
  }
});

watch(personen_auswahl, () => {
  console.log('Personenauswahl geändert: ', personen_auswahl);
  axios.get('assets/personen/'+personen_auswahl.value.schuldig+'/'+personen_auswahl.value.schuldig+'.json')
        .then(response => { person.value.schuldig = response.data; console.log('Person (schuldig): ', person.value.schuldig); })
        .catch( (error) => {console.log("Axios Fehler: ", error)});
  for (let i=0; i<2; i++) {
    axios.get('assets/personen/'+personen_auswahl.value.unschuldig.watson[i]+'/'+personen_auswahl.value.unschuldig.watson[i]+'.json')
      .then(response => { person.value.unschuldig.watson[i] = response.data; console.log('Person (unschuldig, Watson): ', response.data); })
      .catch( (error) => {console.log("Axios Fehler: ", error)});
  }
  for (let i=0; i<2; i++) {
    axios.get('assets/personen/'+personen_auswahl.value.unschuldig.sherlock[i]+'/'+personen_auswahl.value.unschuldig.sherlock[i]+'.json')
      .then(response => { person.value.unschuldig.sherlock[i] = response.data; console.log('Person (unschuldig, Sherlock): ', response.data); })
      .catch( (error) => {console.log("Axios Fehler: ", error)});
    }
  for (let i=0; i<2; i++) {
      axios.get('assets/personen/'+personen_auswahl.value.unschuldig.enola[i]+'/'+personen_auswahl.value.unschuldig.enola[i]+'.json')
      .then(response => { person.value.unschuldig.enola[i] = response.data; console.log('Person (unschuldig, Enola): ', response.data); })
      .catch( (error) => {console.log("Axios Fehler: ", error)});
  }
});

objekte_eg.value = ['00x0_eg_02', 'x0x0_eg_02', '00x1_eg_ab'];
objekte_og.value = ['001x_og1_ab', '00x0_og1_ac', '10x0_og1_bc'];

personen_auswahl.value = {
  'schuldig': '00x0',
  'unschuldig': {
  'watson': ['11x1', '111x'],
  'sherlock': ['111x', 'x111'],
  'enola': ['11x0', '01x1'] 
  }
};

function hinweisClicked(nr : number) {
  console.log(`Hinweis ${nr} clicked`);
  if (flow.value>=1.3 && flow.value<2.0) {
    lupeImVordergrund.value = false;
  }
  if (flow.value>=2.3 && flow.value<3.0) {
    lupeImVordergrund.value = false;
  }
  if (flow.value>=3.3 && flow.value<4.0) {
    lupeImVordergrund.value = false;
  }
  if (flow.value>=4.1) {
    ermittlungsAuswahl.value = nr;
    openHinweisModal(nr);
  }
}

function lupeMitteClicked() {
  console.log('lupeMitteClicked');
  if (flow.value>=1.3) {
    lupeImVordergrund.value = true;
  }
  if ((flow.value==1.4 || flow.value==2.4 || flow.value==3.4) && empfang.value=='stark') {
    openKameraModal();
  }
}

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
      cssClass: 'beacon-modal'});
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
  } else if (data == "objekte") {
    const objekte_modal = await modalController.create({
      component: ObjekteModal,
      cssClass: 'objekte-modal',
      backdropDismiss: true });
    objekte_modal.present();
  } else if (data == "personen") {
    const personen_modal = await modalController.create({
      component: PersonenModal,
      cssClass: 'personen-modal',
      backdropDismiss: true });
    personen_modal.present();
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
  // await beaconStore.stopBt();
  const kamera_modal = await modalController.create({
    component: KameraModal,
    cssClass: 'kamera-modal'
  });
  kamera_modal.present();
  // await beaconStore.scanBt();
};
const openHilfeModal = async () => {
  console.log("openHilfeModal clicked");
  const hilfe_modal = await modalController.create({
    component: HilfeModal,
    cssClass: 'hilfe-modal'
  });
  hilfe_modal.present();
};

const skipTutorialHinweisOffen = ref(false);
const skipTutorialHinweis = (offen : boolean) => {
  skipTutorialHinweisOffen.value = offen;
};
const skipTutorial = () => {
  console.log("skip clicked");
  // spielStore.$reset();
  // router.push("spiel");
  spielStore.flow = 1.0;
};

function personClicked(nr : number, code : string) {
  console.log("Person clicked: ", nr);
  // if (!personBoxInaktiv(nr)) {
    if (personAusgewaehlt.value == nr) {
      personAusgewaehlt.value = 0;
    } else {
      personAusgewaehlt.value = nr;
      openSteckbriefModal(nr, code);
    }
  // }
}

function personVerhaften(code : string) {
  console.log(`Person ${code} verhaften!`);
}

const openSteckbriefModal = async (nr: number, code : string) => {
  console.log("openSteckbriefModal()");
  const steckbrief_modal = await modalController.create({
    component: SteckbriefModal,
    cssClass: 'steckbrief-modal',
    componentProps: {
      nr: nr,
      code: code
    }
  });
  console.log("after await");
  steckbrief_modal.present().then( (result) => {
    console.log(result);
  });
    // await steckbrief_modal.onWillDismiss();
  const { data } = await steckbrief_modal.onWillDismiss();
  personAusgewaehlt.value = 0;
  if (data) {
    console.log(data);
  }
  if (nr) {
    if (verhaftet.value[nr-1]) { 
      if (person_ort_spieler.value[nr-1].code == person.value.schuldig.code) {
        flow.value = 4.5;
        openOutroModal();
      } else if (verhaftet.value.filter(Boolean).length == 1) {
        flow.value = 4.31;
      } else if (verhaftet.value.filter(Boolean).length == 2) {
        flow.value = 4.32;
      }
    }
  }
}

const openOutroModal = async () => {
  console.log("openSteckbriefModal()");
  const outro_modal = await modalController.create({
    component: OutroModal,
    cssClass: 'outro-modal',
    backdropDismiss: false,
  });
  console.log("after await");
  outro_modal.present().then( (result) => {
    console.log(result);
  });
  await outro_modal.onWillDismiss();
  // const { data } = await outro_modal.onWillDismiss();

}

const openHinweisModal = async (nr: number) => {
  console.log("openHinweisModal()");
  hinweisModalOffenNr.value = nr;
  const hinweis_modal = await modalController.create({
    component: HinweisModal,
    cssClass: 'hinweis-modal',
    componentProps: {
      nr: nr
    }
  });
  console.log("after await");
  hinweis_modal.present();
  await hinweis_modal.onWillDismiss();
  hinweisModalOffenNr.value = 0;
}

const openObjekteModal = async (nr: number) => {
  console.log("openObjekteModal()");
  const objekte_modal = await modalController.create({
    component: ObjekteModal,
    cssClass: 'hinweis-modal',
    componentProps: {
      nr: nr
    }
  });
  objekte_modal.present();
  await objekte_modal.onWillDismiss();
}

const personAusgewaehlt = ref(0);

function isHashtagFalsch(personCode : string, hashtagCode : string) : boolean {
  if (personCode.length != 4 || hashtagCode.length != 4) {
    console.log("(Fehler) Codeformat falsch");
    return false;
  } 
  for (let i = 0; i < 4; i++) {
    if (personCode[i] == '1' && hashtagCode[i] == '0')
      return true;
    if (personCode[i] == '0' && hashtagCode[i] == '1')
      return true;
  }
  return false;
}

</script>