<script setup lang="ts">
import { IonPage, IonHeader, IonContent, IonModal, IonButton, IonAlert } from '@ionic/vue';

import FortschrittsbalkenComponent from '@/components/FortschrittsbalkenComponent.vue';
import LupeComponent from '@/components/LupeComponent.vue';
import ExitButtonComponent from '@/components/ExitButtonComponent.vue'
import ScrollComponent from '@/components/ScrollComponent.vue';
import LupeMitteComponent from '@/components/LupeMitteComponent.vue';
import HilfeButtonComponent from '@/components/HilfeButtonComponent.vue';
import BuchButtonComponent from '@/components/BuchButtonComponent.vue';
import KameraButtonComponent from '@/components/KameraButtonComponent.vue';

import { ref } from 'vue';
import router from '@/router';

const lupenRef = ref(1);
let lupenNr = 5;

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

const menu_modal = ref();
const schliesseMenuModal = () => {
    console.log(menu_modal);
    menu_modal.value.$el.dismiss();
};

const schliesseMenue = () => {
  menu_modal.value.$el.dismiss();
};

const istBeendenHinweisOffen = ref(false);
const zeigeBeendenHinweis = (offen: boolean) => (istBeendenHinweisOffen.value = offen);

const spielBeenden = () => {
  console.log("spielBeenden()");
  zeigeBeendenHinweis(false);
  schliesseMenue();
  router.push("start");
};

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
            <exit-button-component id="menu-modal-button"/>
          </div>
        </div>

        <div id="container_mitte">

          <div id="container_lupe">
            <lupe-mitte-component id="lupe_mitte"></lupe-mitte-component>
          </div>

          <div id="container_buttons">
              <buch-button-component id="buch_button" @click="buchClicked"/>
              <kamera-button-component id="kamera_button" @click="kameraClicked"/>
              <hilfe-button-component id="hilfe_button" @click="hilfeClicked"/>
              <svg id="button_box" width="600" height="190" viewbox="0 0 600 200">
                <circle cx="300" cy="90" r="90" fill="hsl(0,0%,60%)"/>
                <rect x="50" y="30" width="500" height="150" rx="20" fill="hsl(0,0%,60%)"/>
              </svg>
          </div>

        </div>

        <div id="container_rechts">
          <div id="inhalt_rechts">
            <scroll-component :aktive-lupe="lupenRef" />
          </div>
        </div>
        
      </div>

    </ion-content>

    <ion-modal id="menu-modal" ref="menu_modal" trigger="menu-modal-button">
      <div class="modal-wrapper">
        <h1>Menü</h1>
        <div class="modal-content">
          <ion-button @click="zeigeBeendenHinweis(true)">Spiel beenden</ion-button>
        </div>
        <div class="modal-control">
            <ion-button size="large" @click="schliesseMenue">zurück zum Spiel</ion-button>
        </div>
      </div>
    </ion-modal>

    <ion-alert
        :is-open="istBeendenHinweisOffen"
        header="Hinweis"
        sub-header="Wollen Sie das Spiel wirklich beenden?"
        message="Hiermit geht auch ihr Spielefortschritt verloren."
        :buttons="[{text: 'Weiterspielen', role: 'dismiss', handler: zeigeBeendenHinweis(false) }, {text:'Beenden', role:'confirm', handler: spielBeenden}]"
        @didDismiss="zeigeBeendenHinweis(false)"
    ></ion-alert>

  </ion-page>
</template>


<style scoped>

#lupe_mitte {
  position: relative;
  left: 0px;
  top: 50px;
}
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
  margin-top: 30px;
}
#container_mitte {
  display:flex;
  flex-direction: column;
  min-width: 600px;
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
  background-color: rgb(244, 244, 244);
  flex-grow: 1;
  overflow-y: scroll;
}
#inhalt_rechts {
  margin: 20px;
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
  left: 80px;
  z-index: 100;
}
#kamera_button {
  position: absolute;
  top: 20px;
  z-index: 100;
}
#hilfe_button {
  position: absolute;
  right: 50px;
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
.modal-wrapper {
    padding: 30px;
    display: flex;
    flex-direction: column;
    height: 100%;
}
.modal-wrapper h1 {
    font-size: 24pt;
}
.modal-wrapper .modal-content {
    font-size: 16pt;
    flex-grow: 1;
    text-align: center;
}
.modal-wrapper .modal-control {
    text-align: end;
}

</style>
