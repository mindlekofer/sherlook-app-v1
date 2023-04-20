<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';

import FortschrittsbalkenComponent from '@/components/FortschrittsbalkenComponent.vue';
import LupeComponent from '@/components/LupeComponent.vue';
import ExitButtonComponent from '@/components/ExitButtonComponent.vue'
import LupeMitteComponent from '@/components/LupeMitteComponent.vue';
import HilfeButtonComponent from '@/components/HilfeButtonComponent.vue';
import BuchButtonComponent from '@/components/BuchButtonComponent.vue';
import KameraButtonComponent from '@/components/KameraButtonComponent.vue';
import { useSpielStore } from '@/stores/SpielStore';
import Scroll_1_0_Detail1 from '@/components/scrollbereich/Scroll_1_0_Detail1.vue';
import Scroll_1_1_Frage1 from '@/components/scrollbereich/Scroll_1_1_Frage1.vue';
import router from '@/router';
import { ref, shallowRef, watch } from 'vue';
import { storeToRefs } from 'pinia';
import SpielMenu from '@/components/modals/SpielMenu.vue'
import { modalController } from '@ionic/vue';

const lupenRef = ref(1);
let lupenNr = 5;
const spielStore = useSpielStore();

const emit = defineEmits(['zeige_lupe']);

const lupeClicked = (lupe : number) => { 
  console.log(`lupeClicked(${lupe})`);
  lupenRef.value = lupe;
  lupenNr = lupe;
  emit('zeige_lupe', lupe);
};
const buchClicked = () => {
  console.log('buchClicked()');
};
const kameraClicked = () => {
  console.log('kameraClicked()');
};
const hilfeClicked = () => {
  console.log('hilfeClicked()');
};

const { flow } = storeToRefs(spielStore);
flow.value = 1.0;
console.log(`flow1: ${flow.value}`);
spielStore.flow = 1.0;
console.log(`flow2: ${flow.value}`);


const scrollSeite = shallowRef(Scroll_1_0_Detail1);

watch(flow, () => {
  console.log(`(LupeMitteComponent) flow geändert auf ${flow.value}`);
  if (flow.value <= 1.0) {
    scrollSeite.value = Scroll_1_0_Detail1;
  }
  else if (flow.value == 1.1) {
    scrollSeite.value = Scroll_1_1_Frage1;
  }
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



</script>

<script lang="ts">

</script>

<template>
  <ion-page>

    <ion-content :fullscreen="true">

      <div id="container_bildschirminhalt">

        <div id="container_links">
          <div id="container_fortschritt">
            <fortschrittsbalken-component id="balken" />
            <lupe-component id="lupe1" class="lupe" @click="lupeClicked(1)"/>
            <lupe-component id="lupe2" class="lupe" @click="lupeClicked(2)" />
            <lupe-component id="lupe3" class="lupe" @click="lupeClicked(3)" />
          </div>          
          <div>
            <exit-button-component @click="openSpielMenu"/>
          </div>
        </div>

        <div id="container_mitte">

          <div id="container_lupe">
            <lupe-mitte-component id="lupe_mitte"></lupe-mitte-component>
          </div>

          <div id="container_buttons">
              <svg id="button_box" width="560" height="190" viewbox="0 0 550 200">
                <circle cx="280" cy="90" r="90" fill="hsl(0,0%,70%)"/>
                <rect x="30" y="30" width="500" height="150" rx="20" fill="hsl(0,0%,70%)"/>
              </svg>
              <buch-button-component id="buch_button" @click="buchClicked"/>
              <kamera-button-component id="kamera_button" @click="kameraClicked"/>
              <hilfe-button-component id="hilfe_button" @click="hilfeClicked"/>
          </div>

        </div>

        <div id="container_rechts">
            <component :is="scrollSeite" :aktive-lupe="lupenRef" />
        </div>
        
      </div>

    </ion-content>

  </ion-page>
</template>


<style scoped>

#container_bildschirminhalt {
 display: flex;
 flex-direction: row; 
 height: 100vh;
}
#container_links {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 180px;
  min-width: 180px;
  margin-top: 30px;
}
#container_mitte {
  display:flex;
  flex-direction: column;
  min-width: 560px;
}
#lupe_mitte {
  position: relative;
  left: 0px;
  top: 40px;
}
#container_lupe {
  flex-grow: 1;
}
#container_buttons {
  height: 200px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
#container_rechts {
  /* background-color: rgb(231, 231, 231); */
  flex-grow: 1;
  overflow-y: scroll;
}
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background: #b7b7b7; 
}
::-webkit-scrollbar-thumb {
  background: rgb(67, 67, 67);
  border-radius: 5px;
}
::-webkit-scrollbar-thumb:hover {
  background: #40445d; 
}
#container_fortschritt {
  flex-grow: 1;
}
#balken {
  margin-left: 55px;
  z-index: 110;
  width: 120px;
}
.lupe {
  position: absolute;
  z-index: 100;
  left: 20px;
}
#lupe3 {
  top: 30px;
}
#lupe2 {
  top: 210px;
}
#lupe1 {
  top: 390px;
}
#buch_button {
  position: absolute;
  top: 50px;
  left: 60px;
  z-index: 100;
}
#kamera_button {
  position: absolute;
  top: 20px;
  z-index: 100;
}
#hilfe_button {
  position: absolute;
  right: 30px;
  top: 20px;
  width: 115px;
  height: 115px;
  z-index: 100;
}
#button_box {
  position: relative;
  top: 0px;
  left: 0px;
}

</style>
