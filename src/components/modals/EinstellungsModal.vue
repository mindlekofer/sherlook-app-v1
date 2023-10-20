<template>
  <div class="modal-wrapper">
    <div class="modal-content">
      <h1>
          Einstellungen
      </h1>
      <div class="liste-enger_">
        <!-- <ion-item>
          <ion-list>
            <ion-radio-group :value="spieler">
              <ion-item>
                <ion-radio value="Watson" label-placement="end" @click="console.log('Watson ausgewählt'); spielStore.spieler='Watson'">Watson</ion-radio>
              </ion-item>
              <ion-item>
                <ion-radio value="Sherlock" label-placement="end" @click="console.log('SherLock ausgewählt'); spielStore.spieler='Sherlock'">SherLock</ion-radio>
              </ion-item>
              <ion-item>
                <ion-radio value="Enola" label-placement="end" @click="console.log('Enola ausgewählt'); spielStore.spieler='Enola'">Enola</ion-radio>
              </ion-item>
            </ion-radio-group>
          </ion-list>
        </ion-item> -->
        <h4>Spieler</h4>
        <ion-list>
          <ion-radio-group v-model="spielStore.spieler">
            <ion-item>
                <ion-radio value="Watson" label-placement="start" alignment="center" justify="space-between">Watson</ion-radio>
            </ion-item>
            <ion-item>
              <ion-radio value="Sherlock" label-placement="start" alignment="center" justify="space-between">Sherlock</ion-radio>
            </ion-item>
            <ion-item>
              <ion-radio value="Enola" label-placement="start" alignment="center" justify="space-between">Enola</ion-radio>
            </ion-item>
          </ion-radio-group>
        </ion-list>
        <h4>Ort</h4>
        <ion-list>
          <ion-radio-group v-model="spielStore.ort">
            <ion-item>
              <ion-radio value="og1" label-placement="start" alignment="center" justify="space-between">og1</ion-radio>
            </ion-item>
            <ion-item>
                <ion-radio value="eg" label-placement="start" alignment="center" justify="space-between">eg</ion-radio>
            </ion-item>
          </ion-radio-group>
        </ion-list>
        <h4>Fortschritt</h4>
        <ion-list>
          <ion-item>
            <ion-input label="Spiel Flow:" v-model.lazy="flow" type="number"></ion-input>
          </ion-item>
        </ion-list>

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