<template>
  <div class="modal-wrapper">
    <div class="modal-content">
      <h1>
          Objekte
      </h1>
      <div class="liste-enger_">
       

      </div>
    </div>
    <div class="modal-control">
      <ion-button size="large" @click="modalController.dismiss()">zurück zum Spiel</ion-button>
    </div>
  </div>

</template>

<style scoped>
.liste-enger {
  margin-left: auto;
  margin-right: auto;
  padding: 50px;
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
import { IonButton, IonRadioGroup, IonRadio, IonList, IonItem, IonInput } from '@ionic/vue';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';

const spielStore = useSpielStore();

const spieler = ref(spielStore.spieler);

const { flow } = storeToRefs(spielStore);

watch(flow, () => {
  console.log("flow changed: ", flow);
});


</script>