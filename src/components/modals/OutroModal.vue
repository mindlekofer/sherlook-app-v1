<template>
  <div class="modal-wrapper">
    <div class="modal-content">
      <div>
        <video ref="videoOutroRef" controls height="600" poster="assets/img/film_poster.jpg">
          <source src="assets/filme/outro_film_mit_ton.mp4" />
        </video>
      </div>
    </div>
    <div class="modal-control">
      <ion-button size="large" @click="modalController.dismiss()">zurück zum Spiel</ion-button>
    </div>
  </div>

</template>

<style scoped>
img {
  display: inline-block;
}
#karte {
  /* height: 50%; */
  width: 95%;
  position: relative;
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
import { ref } from 'vue';

const spielStore = useSpielStore();
const { flow, ort, slideNr } = storeToRefs(spielStore);

console.log("opening KarteModal");

const beendenHinweisOffen = ref(false);

</script>