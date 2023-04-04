<template>
  <ion-page>

    <ion-content :fullscreen="true">

      <div id="container">

        <div id="container_links">
        
          <div id="fortschritt">
            <fortschrittsbalken-component id="balken" />
            <lupe-component id="lupe1" class="lupe" @click="lupeClicked(1)"/>
            <lupe-component id="lupe2" class="lupe" @click="lupeClicked(2)" />
            <lupe-component id="lupe3" class="lupe" @click="lupeClicked(3)" />
          </div>          
        
          <!-- <img id="lupe2" class="lupe" src="assets/lupe1.svg" width="150" height="150"/> -->
          <div id="exit_container">
                <exit-button-component @click="zeigeExitMenue(true)"/>
          </div>

        </div>

        <div id="container_mitte">

            <lupe-mitte-component id="mitte"></lupe-mitte-component>
          
        </div>

        <div id="container_rechts">
          <div id="inhalt_rechts">

            <scroll-component :aktive-lupe="lupenRef" />

          </div>
        </div>
        
      </div>
<!-- 
      <ion-modal ref="modal" trigger="open-modal" @willDismiss="onWillDismiss">
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-button @click="menueCancel()">Cancel</ion-button>
            </ion-buttons>
            <ion-title>Welcome</ion-title>
            <ion-buttons slot="end">
              <ion-button :strong="true" @click="menueConfirm()">Confirm</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-item>
            <ion-label position="stacked">Enter your name</ion-label>
            <ion-input ref="input" type="text" placeholder="Your name"></ion-input>
          </ion-item>
        </ion-content>
      </ion-modal> -->
        
    </ion-content>

    <ion-alert
        :is-open="istHilfeOffen"
        header="Hilfe"
        sub-header="Wie geht was?"
        message="Das geht so ..."
        :buttons="['Ok']"
        @didDismiss="zeigeHilfe(false)"
    ></ion-alert>

    <ion-alert
        :is-open="istExitMenueOffen"
        header="Menü"
        sub-header="Wählen Sie eine Option"
        message="Wollen Sie wirklich aufhören?"
        :buttons="['Ok']"
        @didDismiss="zurueckZuStart"
    ></ion-alert>

  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonContent, IonAlert } from '@ionic/vue';

import FortschrittsbalkenComponent from '@/components/FortschrittsbalkenComponent.vue';
import LupeComponent from '@/components/LupeComponent.vue';
import ExitButtonComponent from '@/components/ExitButtonComponent.vue'
import ScrollComponent from '@/components/ScrollComponent.vue';
import LupeMitteComponent from '@/components/LupeMitteComponent.vue';
import { ref } from 'vue';
import router from '@/router';

const istHilfeOffen = ref(false);
const zeigeHilfe = (offen : boolean) => (istHilfeOffen.value = offen);
const istExitMenueOffen = ref(false);
const zeigeExitMenue = (offen : boolean) => (istExitMenueOffen.value = offen);
const zurueckZuStart = () => { 
  zeigeExitMenue(false);
  router.push('/start');
};


const lupenRef = ref(1);
let lupenNr = 5;

const emit = defineEmits(['zeige_lupe']);

const lupeClicked = (lupe : number) => { 
  console.log(`lupeClicked(${lupe})`);
  lupenRef.value = lupe;
  lupenNr = lupe;
  emit('zeige_lupe', lupe);
};


</script>

<style scoped>

#mitte {
  position: absolute;
  left: 140px;
  top: 50px;
}

#container {
 display: flex;
 flex-direction: row; 
 height: 100vh;
}
#container_links
{
  position: relative;
  display: flex;
  flex-direction: column;
  width: 200px;
  margin-top: 30px;
}
#container_mitte
{
  min-width: 500px;
}
#container_rechts
{
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
#fortschritt {
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
</style>
