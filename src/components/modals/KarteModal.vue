<template>
  <div class="modal-wrapper">
    <div class="modal-content">
      <div>
        <img id="karte" src="assets/img/karte-tutorial-eg.png"/>
      </div>
      <!-- <img id="karte" src="assets/img/karte-tutorial.png"/> -->
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
import { modalController } from '@ionic/core';
import { IonButton, IonAlert } from '@ionic/vue';
import { ref } from 'vue';

const beendenHinweisOffen = ref(false);

const beendeHinweis = (offen : boolean) => {
  beendenHinweisOffen.value = offen;
};

const beenden = () => {
  console.log("beenden clicked");
  modalController.dismiss("beenden");
};

</script>