<template>
  <div class="modal-wrapper">
    <div class="modal-content">
        <video ref="videoOutroRef" controls height="500" poster="assets/img/film_poster.jpg">
          <source src="assets/filme/outro_film.mp4" />
        </video>
        <button-weiter-component class="button_weiter" @click="weiter" :pulsiert="videoEnde"/>
    </div>
  </div>

</template>

<style scoped>
video {
  margin-top: 40px;
  border: 20px solid black;
}
.button_weiter {
  position: absolute;
  bottom: 25px;
  right: 25px;
}
.modal-wrapper {
  padding: 30px;
  padding-top: 10px;
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
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
}
.modal-wrapper .modal-control {
  text-align: end;
}

</style>

<script setup lang="ts">
import { useSpielStore } from '@/stores/SpielStore';
import { modalController } from '@ionic/core';
import { IonButton } from '@ionic/vue';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import ButtonWeiterComponent from '../ButtonWeiterComponent.vue';


const spielStore = useSpielStore();
const { flow, ort, slideNr } = storeToRefs(spielStore);

const videoOutroRef = ref<HTMLMediaElement>();
const videoEnde = ref(false);

function videoStopReset() {
    if (videoOutroRef.value) {
      videoOutroRef.value.pause();
      videoOutroRef.value.currentTime = 0;
    }
  }

watch(flow, () => {
  if (flow.value==4.5) {
    console.log('starte Video');
    videoOutroRef.value?.play();
  } else {
    videoStopReset();
  }
})

const weiter = () => {
    // spielStore.flow = 4.5;
    videoStopReset();
    modalController.dismiss();
}

watch(videoOutroRef, () => {
  //  videoStopReset();
  console.log(videoOutroRef.value);
  videoOutroRef.value?.play();
  videoOutroRef.value?.addEventListener('ended', () => {videoEnde.value = true}, false);
  videoOutroRef.value?.addEventListener('playing', () => {videoEnde.value = false}, false);
})


</script>