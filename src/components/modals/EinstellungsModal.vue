<template>
  <div class="modal-wrapper">
    <div class="modal-content">
      <h1>
          Einstellungen
      </h1>
      <div class="liste-enger">
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

        <ion-radio-group :value="spieler">
          <ion-radio value="Watson" label-placement="end" @click="console.log('Watson ausgewählt'); spielStore.spieler='Watson'">Watson</ion-radio><br />
          <ion-radio value="Sherlock" label-placement="end" @click="console.log('SherLock ausgewählt'); spielStore.spieler='Sherlock'">SherLock</ion-radio><br />
          <ion-radio value="Enola" label-placement="end" @click="console.log('Enola ausgewählt'); spielStore.spieler='Enola'">Enola</ion-radio>
        </ion-radio-group>

        <ion-item>
        <ion-input label="Spiel Flow" type="number" :placeholder="spielStore.flow.toFixed(2)" @ion-input="console.log('input')"></ion-input>
        <ion-button>setze flow</ion-button>
      </ion-item>
      </div>
    </div>
    <div class="modal-control">
      <ion-button size="large" @click="modalController.dismiss()">zurück zum Spiel</ion-button>
    </div>
  </div>

</template>

<style scoped>
.liste-enger {
  width: 300px;
  margin-left: auto;
  margin-right: auto;
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
import { ref } from 'vue';

const spielStore = useSpielStore();

const spieler = ref(spielStore.spieler);

</script>