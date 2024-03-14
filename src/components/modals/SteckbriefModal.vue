<template>
  <div class="modal-wrapper">
    <div class="modal-content">
      <span class="festgenommen" v-if="verhaftet[props.nr-1]==true">festgenommen!</span>
      <span class="verdaechtig" v-if="verdaechtig[props.nr-1]==true">verdächtig!</span>
      <span class="unverdaechtig" v-if="unverdaechtig[props.nr-1]==true">unverdächtig</span>

      <div class="handschellen">
        <i>Festnehmen?</i>
        <ButtonHandschellenComponent
            @click="handschellenClicked"
            :disabled="unverdaechtig[props.nr-1] || verhaftet[props.nr-1] || flow>=4.5"
            :pulsiert="verdaechtig[props.nr-1]"
            style="margin-top: 10px;"
        />
      </div>

      <div class="links">
        <!-- <img class="person" :src="'assets/personen/'+code+'/'+code+'_kopf.png'"/> -->
        <img class="person" width="230" :src="'assets/personen/'+props.code+'/'+props.code+'_kopf.png'"/>
        <span class="vermerk">
          <!-- <ButtonHandschellenComponent 
            @click="handschellenClicked"
            pulsiert 
          />
          <br>
          <i>Festnehmen?</i>
        -->
          <i>Aktenvermerk:</i>
            <ion-button 
                class="vermerk-button" 
                color="success" 
                size="large" 
                expand="block"
                :fill="unverdaechtig[props.nr-1] ? 'solid' : 'outline'" 
                :disabled="verhaftet[props.nr-1] || flow>=4.5"
                @click="unverdaechtigClicked"
            > unverdächtig </ion-button>
            <ion-button 
                class="vermerk-button" 
                color="warning" 
                size="large" 
                expand="block" 
                :fill="verdaechtig[props.nr-1] ? 'solid' : 'outline'" 
                :disabled="verhaftet[props.nr-1] || flow>=4.5"
                @click="verdaechtigClicked"
            > verdächtig </ion-button>
        </span>
      </div>
      <div class="rechts">

        <span v-if="spieler=='Watson'" v-html=person_ort_spieler[props.nr-1].watson.steckbrief />
        <span v-if="spieler=='Sherlock'" v-html=person_ort_spieler[props.nr-1].sherlock.steckbrief />
        <span v-if="spieler=='Enola'" v-html=person_ort_spieler[props.nr-1].enola.steckbrief />

      </div>
    </div>
    <ion-button class="zurueck-button" size="large" @click="modalController.dismiss()">zurück</ion-button>
  </div>

</template>

<style scoped>
ul {
  padding: 10px;
}
li {
  padding: 10px;
}
.handschellen {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 30px;
}
.vermerk {
  display: flex;
  flex-direction: column;
  /* background-color: aqua; */
  gap: 5px;
  justify-content: end;
  align-items: stretch;
}
i { 
  margin-bottom: 10px;
  color: grey;
}
.zurueck-button {
  position: absolute;
  bottom: 30px;
  right: 30px;
}
.links {
  min-width: 300px;
  /* background-color: aquamarine; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}
.rechts {
  /* background-color: azure; */
  padding-left: 30px;
  padding-right: 0px;
  padding-top: 30px;
  font-size: 24px;
  line-height: 170%;
}
.rechts span::v-deep b {
  font-size: 32px;
}
img {
  display: inline-block;
}
/* .person { */
  /* height: 50%; */
  /* width: 300px; */
  /* position: relative; */
/* } */
.modal-wrapper {
  padding: 20px;
  /* padding-top: 10px; */
  display: flex;
  flex-direction: column;
  height: 100%;
  /* background-color: burlywood; */
}
.modal-wrapper .modal-content {
  font-size: 16pt;
  display: flex;
  height: 100%;
  /* flex-grow: 1; */
  /* text-align: center; */
  /* flex-direction: row; */
  /* justify-content: center; */
  /* background-color: bisque; */
}
.festgenommen {
  position: absolute;
  top: 180px;
  right: 250px;
  font-size: 90px;
  font-weight: 600;
  opacity: 0.6;
  color: rgb(239, 0, 0);
  transform: rotate(-20deg);

  padding: 5px 20px 3px 20px;
  font-family: Helvetica, Sans-Serif;
  font-weight: 900;
  background-color: transparent;
  border-width: 12px;
  border-color: rgb(239, 0, 0);
  border-style: solid;
  border-radius: 30px;
}
.verdaechtig {
  position: absolute;
  top: 200px;
  right: 200px;
  font-size: 90px;
  font-weight: 600;
  opacity: 0.5;
  color: rgb(239, 155, 0);
  transform: rotate(30deg);

  padding: 5px 20px 3px 20px;
  font-family: Helvetica, Sans-Serif;
  font-weight: 900;
  background-color: transparent;
  border-width: 12px;
  border-color: rgb(239, 155, 0);
  border-style: solid;
  border-radius: 30px;

}
.unverdaechtig {
  position: absolute;
  top: 200px;
  right: 200px;
  font-size: 90px;
  font-weight: 600;
  opacity: 0.6;
  color: rgb(61, 211, 53);
  transform: rotate(-30deg);
  padding: 5px 20px 3px 20px;
  font-family: Helvetica, Sans-Serif;
  font-weight: 900;
  background-color: transparent;
  border-width: 12px;
  border-color: rgb(61, 211, 53);
  border-style: solid;
  border-radius: 30px;
}

</style>

<script setup lang="ts">
import { useSpielStore } from '@/stores/SpielStore';
import { modalController } from '@ionic/core';
import { IonButton } from '@ionic/vue';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import ButtonHandschellenComponent from '../ButtonHandschellenComponent.vue';

const props = defineProps( {
    name: {
      type: String,
      default: ''
    },
    code: {
      type: String,
      default: ''
    },
    nr: {
      type: Number,
      default: 0
    }
  });

const emit = defineEmits<{
    (e: 'festnehmen', code : string) : void
}>();

const spielStore = useSpielStore();
const { flow, ort, spieler, verhaftet, verdaechtig, unverdaechtig, person_ort_spieler } = storeToRefs(spielStore);

const verhaftedClicked = ref();

console.log("opening steckbriefModal");

function handschellenClicked() {
  console.log(`Handschellen clicked für Nr: ${props.nr}, Code: ${props.code}`);
  if (props.nr>0) {
    spielStore.verhaftet[props.nr-1] = true;
    spielStore.personVerhaftet = props.code;
    setTimeout(() => {modalController.dismiss()}, 1000);
  }
}

function verdaechtigClicked() {
  console.log(`Handschellen clicked für Nr: ${props.nr}, Code: ${props.code}`);
  if (props.nr>0) {
    if (spielStore.verdaechtig[props.nr-1]==false) {
      spielStore.verdaechtig[props.nr-1] = true;
      spielStore.unverdaechtig[props.nr-1] = false;
    } else {
      spielStore.verdaechtig[props.nr-1] = false;
    }
  }
}

function unverdaechtigClicked() {
  console.log(`Handschellen clicked für Nr: ${props.nr}, Code: ${props.code}`);
  if (props.nr>0) {
    if (spielStore.unverdaechtig[props.nr-1]==false) {
      spielStore.unverdaechtig[props.nr-1] = true;
      spielStore.verdaechtig[props.nr-1] = false;
    } else {
      spielStore.unverdaechtig[props.nr-1] = false;
    }
  }
}

</script>