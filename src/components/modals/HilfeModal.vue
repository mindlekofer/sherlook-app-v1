<template>
  <div class="modal-wrapper">
    <h1> Hilfe </h1>
    <div class="modal-content">
      <span>
        <p>
          Auf der linken Seite werden die drei "Details" angezeigt, die es gilt nacheinander zu finden.
        </p>
        <p>
          In der großen Lupe in der Mitte wird das aktuelle Detail gezeigt.
        </p>
        <p>
          Und auf der Rechten Seite werden die Rätsel und Anweisungen für die Detektive angezeigt.
        </p>
      </span>
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
  text-align: left;
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
const { flow, ort, spieler, slideNr } = storeToRefs(spielStore);

console.log("HilfeModal geöffnet");


</script>