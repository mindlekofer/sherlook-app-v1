<script setup lang="ts">
import { IonPage, IonContent } from '@ionic/vue';

import LupeComponent from '@/components/LupeComponent.vue';
import BuchButtonComponent from '@/components/BuchButtonComponent.vue';
import { useSpielStore } from '@/stores/SpielStore';
import Scroll_1_0_Detail1 from '@/components/scrollbereich/Scroll_1_0_Detail1.vue';
import Scroll_1_1_Frage1 from '@/components/scrollbereich/Scroll_1_1_Frage1.vue';
import Scroll_1_2_Post1 from '@/components/scrollbereich/Scroll_1_2_Post1.vue';
import router from '@/router';
import { ref, shallowRef, watch } from 'vue';
import { storeToRefs } from 'pinia';
import SpielMenu from '@/components/modals/SpielMenu.vue'
import { modalController } from '@ionic/vue';
import ButtonKarteComponent from '@/components/ButtonKarteComponent.vue';
import ButtonExitComponent from '@/components/ButtonExitComponent.vue';
import ButtonEinstellungenComponent from '@/components/ButtonEinstellungenComponent.vue';
import ButtonHilfeComponent from '@/components/ButtonHilfeComponent.vue';
import ButtonKameraComponent from '@/components/ButtonKameraComponent.vue';
import ButtonHandschellenComponent from '@/components/ButtonHandschellenComponent.vue';
import HinweisBoxComponent from '@/components/HinweisBoxComponent.vue';
import LupeMitteComponent from '@/components/LupeMitteComponent.vue';


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
  } else if (flow.value == 1.2) {
    scrollSeite.value = Scroll_1_2_Post1;
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
          <div class="container_hinweise">
              <HinweisBoxComponent id="hinweis_box_1" :zahl="1" :gross="false" buch/>
              <HinweisBoxComponent id="hinweis_box_2" :zahl="2" :gross="false"/>
              <HinweisBoxComponent id="hinweis_box_3" :zahl="3" :gross="false"/>
              <LupeMitteComponent id="lupe_mitte" />
          </div>
          <div id="container_buttons">
            <button-exit-component @click="openSpielMenu"/>
            <button-einstellungen-component @click="openSpielMenu"/>
            <button-karte-component pulsiert/>
            <button-hilfe-component @click="hilfeClicked"/>
            <button-kamera-component />
            <button-handschellen-component />
          </div>
        </div>

        <div id="container_scroll">
            <component :is="scrollSeite" :aktive-lupe="lupenRef" />
        </div>
        
      </div>

    </ion-content>

  </ion-page>
</template>


<style scoped>
.container_hinweise {
  position: relative;
  display: flex;
  flex-direction: column;
  padding-top: 25px;

}
.hinweis_box {
  height: 170px;
  background-color: #FFF4B6;
  margin: 0px 0px 10px 0px;
  display: flex;
  align-items: center;
  border:  8px solid rgb(0,0,0,0.15);
  border-radius: 30px;
  /* border-left: 8px solid rgb(0,0,0,0.15);
  border-top: 8px solid rgb(0,0,0,0.15);
  border-bottom: 8px solid rgb(0,0,0,0.15);
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px; */
  padding-left: 8px;
  transform: translateX(0px);
}
#hinweis_box_1 {
  /* transform: translateX(8px); */
}
#hinweis_box_2, #hinweis_box_3 {
  width: 180px;
  background-color: #e9e9e9;
}

#container_bildschirminhalt {
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
  justify-content: center;
  align-items: center;
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

#lupe_mitte {
  position: absolute;
  top: 400px;
  left: 500px;
  width: 620px;
  height: 620px;
  transform: translate(-50%,-50%);
}

</style>
