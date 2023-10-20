<template>
  <div class="modal-wrapper">
    <div class="modal-content">
      <div>
        <img id="karte" src="assets/objekte/eg/tutorial/karte_eg_1.jpg" v-if="spielStore.ort=='eg' && spielStore.flow <= 0.8"/>
        <img id="karte" src="assets/objekte/eg/tutorial/karte_eg_2.jpg" v-else-if="spielStore.ort=='eg' && spielStore.flow < 1.0"/>
        <img id="karte" src="assets/objekte/og/tutorial/karte_og_1.jpg" v-else-if="spielStore.ort=='og1' && spielStore.flow <= 0.8"/>
        <img id="karte" src="assets/objekte/og/tutorial/karte_og_2.jpg" v-else-if="spielStore.ort=='og1' && spielStore.flow < 1.0"/>
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
// const { flow } = storeToRefs(spielStore);

console.log("opening KarteModal");

const beendenHinweisOffen = ref(false);

</script>