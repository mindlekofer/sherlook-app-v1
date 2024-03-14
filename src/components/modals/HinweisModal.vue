<template>
  <div class="modal-wrapper">
    <h1>Notizbucheinträge zu Detail {{ nr }}</h1>
    <div class="swipe-geste-vertikal"></div>
    <div class="modal-content">
      <div class="scrollbereich">

        <PostingComponent
            :username="`@${person.schuldig.accountnamen[nr-1]}`"
            :avatar="`assets/accounts/${person.schuldig.accountnamen[nr-1]}/${person.schuldig.accountnamen[nr-1]}.jpg`"
            :bild="`assets/objekte/${objekte_ort[nr-1].ort}/${objekte_ort[nr-1].code}/${objekte_ort[nr-1].code}_post1.jpg`"
            :hashtag=objekte_ort[nr-1].hashtag_1
            :likes="`randomInteger(30000, 42000)`"
            @hashtag-clicked="flow < 1.3 ? flow=1.3 : flow=flow"
            :eingetragen="flow>=1.3">
          <span v-html="objekte_ort_spieler(nr-1).post_1" />
        </PostingComponent>

        <PostingComponent
            :username="`@${person.schuldig.accountnamen[nr-1]}`"
            :avatar="`assets/accounts/${person.schuldig.accountnamen[nr-1]}/${person.schuldig.accountnamen[nr-1]}.jpg`"
            :bild="`assets/objekte/${objekte_ort[nr-1].ort}/${objekte_ort[nr-1].code}/${objekte_ort[nr-1].code}_post2.jpg`"
            :hashtag=objekte_ort[nr-1].hashtag_2
            :likes="`randomInteger(38000, 50000)`"
            @hashtag-clicked="flow < 1.7 ? flow=1.7 : flow=flow"
            :eingetragen="flow>=1.7">
          <span v-html="objekte_ort_spieler(nr-1).post_2" />
        </PostingComponent>

      </div>
    </div>
    <ion-button class="zurueck-button" size="large" @click="modalController.dismiss()">zurück</ion-button>
  </div>

</template>

<style scoped>

.scrollbereich {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  width: 100%;
  padding-bottom: 100px;
  padding-top: 50px;
  padding-right: 100px;
}
.scrollbereich>* {
  width: 500px;
  margin-bottom: 100px;
}
b {
  font-size: 36px;
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
  justify-content: space-around;
}
.rechts {
  /* background-color: azure; */
  padding-left: 30px;
  padding-right: 30px;
  font-size: 24px;
}
p {
}
img {
  display: inline-block;
}
.person {
  /* height: 50%; */
  /* width: 300px; */
  /* position: relative; */
}
.modal-wrapper {
  padding: 20px;
  padding-right: 0px;
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
  justify-content: center;
  /* background-color: bisque; */
}
.swipe-geste-vertikal {
  position: absolute;
  right: 75px;
  top: 300px;
  width: 50px;
  height: 50px;
  background-color: black;
  border-radius: 50%;
  opacity: 50%;
  /* margin-right: auto;
  margin-left: auto; */
  animation: swipe-vertikal-animation 4s ease-in-out infinite;
}
@keyframes swipe-vertikal-animation {
  0% {
    transform: translateY(+50px);
    opacity: 10%;
  }
  10% {
    transform: translateY(+50px);
    opacity: 40%;
  }
  40% {
    transform: translateY(-50px);
    opacity: 40%;
  }
  50% {
    transform: translateY(-50px);
    opacity: 10%;
  }
  60% {
    transform: translateY(-50px);
    opacity: 40%;
  }
  90% {
    transform: translateY(+50px);
    opacity: 40%;
  }
  100% {
    transform: translateY(+50px);
    opacity: 10%;
  }
}
</style>

<script setup lang="ts">
import { useSpielStore } from '@/stores/SpielStore';
import { modalController } from '@ionic/core';
import { IonButton } from '@ionic/vue';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import PostingComponent from '../PostingComponent.vue';

const props = defineProps( {
    nr: {
      type: Number,
      default: 0
    }
  });

const emit = defineEmits<{
    (e: 'festnehmen', code : string) : void
}>();

const spielStore = useSpielStore();
const { flow, ort, spieler, person, objekte, objekte_ort, objekte_ort_spieler } = storeToRefs(spielStore);

console.log("opening HinweisModal");

function randomInteger(min : number, max : number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

</script>