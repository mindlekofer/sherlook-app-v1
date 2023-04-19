<template>
      <div class="modal-wrapper">
        <h1>Menü</h1>
        <div class="modal-content">
          <ion-button @click="beendeHinweis(true)">Spiel beenden</ion-button>
        </div>
        <div class="modal-control">
            <ion-button size="large" @click="modalController.dismiss()">zurück zum Spiel</ion-button>
        </div>
      </div>

    <ion-alert
        :is-open="beendenHinweisOffen"
        header="Hinweis"
        sub-header="Wollen Sie das Spiel wirklich beenden?"
        message="Hiermit geht auch ihr Spielfortschritt verloren."
        :buttons="[{text: 'Weiterspielen', role: 'dismiss', handler: 'beendeHinweis(false)'}, {text:'Beenden', role:'confirm', handler: beenden}]"
        @didDismiss="beendeHinweis(false)"
    ></ion-alert>
</template>

<style scoped>

.modal-wrapper {
    padding: 30px;
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