<template>
  <div class="modal-wrapper">
    <div class="modal-content">
      <div>
        <img id="karte" src="assets/objekte/eg/tutorial/tutorial_eg_karte1.png" v-if="ort=='eg' && flow <= 0.8"/>
        <img id="karte" src="assets/objekte/eg/tutorial/tutorial_eg_karte2.png" v-else-if="ort=='eg' && flow < 1.0"/>
        <img id="karte" src="assets/objekte/og/tutorial/tutorial_og_karte1.png" v-else-if="ort=='og1' && flow <= 0.8 && slideNr <= 4"/>
        <img id="karte" src="assets/objekte/og/tutorial/tutorial_og_karte2.png" v-else-if="ort=='og1' && flow <= 0.8"/>
        <img id="karte" src="assets/objekte/og/tutorial/tutorial_og_karte3.png" v-else-if="ort=='og1' && flow < 1.0"/>
        <img id="karte" src="assets/objekte/eg/00x0_eg_02/00x0_eg_02_karte.png" v-else-if="ort=='eg' && flow >= 1.0 && flow < 2.0 "/>
        <img id="karte" src="assets/objekte/eg/00x1_eg_ab/00x1_eg_ab_karte.png" v-else-if="ort=='eg' && flow >= 2.0 && flow < 3.0 "/>
        <img id="karte" src="assets/objekte/eg/x0x0_eg_02/x0x0_eg_02_karte.png" v-else-if="ort=='eg' && flow >= 3.0 && flow < 4.0 "/>
        <img id="karte" src="assets/objekte/og1/001x_og1_ab/001x_og1_ab_karte.png" v-else-if="ort=='og1' && flow >= 1.0 && flow < 2.0 "/>
        <img id="karte" src="assets/objekte/og1/00x0_og1_ac/00x0_og1_ac_karte.png" v-else-if="ort=='og1' && flow >= 2.0 && flow < 3.0 "/>
        <img id="karte" src="assets/objekte/og1/10x0_og1_bc/10x0_og1_bc_karte.png" v-else-if="ort=='og1' && flow >= 3.0 && flow < 4.0 "/>
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