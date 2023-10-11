<template>
    <div class="modal-wrapper">
        <div class="modal-content">
            <div id="kamerabild">
                Kamera!
            </div>
            <!-- <img id="karte" src="assets/img/karte-tutorial.png"/> -->
        </div>
        <div class="modal-control">
            <ion-button size="large" @click="modalController.dismiss(); spielStore.flow = 0.95">zurück zum Spiel</ion-button>
        </div>
    </div>

</template>

<style scoped>
#kamerabild {
    width: 800px;
    height: 600px;
    background-color: blue;
}
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.modal-wrapper .modal-control {
    text-align: end;
}

</style>

<script setup lang="ts">
import { modalController } from '@ionic/core';
import { IonButton, IonAlert } from '@ionic/vue';
import { ref } from 'vue';


import { useSpielStore } from '@/stores/SpielStore'
const spielStore = useSpielStore();

const beendenHinweisOffen = ref(false);

const beendeHinweis = (offen : boolean) => {
    beendenHinweisOffen.value = offen;
};

const beenden = () => {
    console.log("beenden clicked");
    modalController.dismiss("beenden");
};

</script>