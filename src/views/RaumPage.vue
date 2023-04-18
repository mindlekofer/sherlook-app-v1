<template>

<ion-page>
    <ion-header :translucent="true">
        <ion-toolbar>
            <ion-title>Raumauswahl</ion-title>
        </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">

        <div id="container">

            <div id="text-container">
                <p>In welchen Räumen wollt ihr SherLOOK spielen?</p>
            </div>
            <div id="auswahl-container">
                <ion-button color="primary" expand="block" size="large" :fill="spielStore.ort == 'og1' ? 'solid':'outline'" @click="spielStore.ort = 'og1'">
                    1. Obergeschoss<br>
                    Frömmigkeit im Mittelalter / 18. und 19. Jahrhundert
                </ion-button>
                <ion-button color="primary" expand="block" size="large" :fill="spielStore.ort == 'eg' ? 'solid':'outline'" @click="spielStore.ort = 'eg'">
                    Erdgeschoss<br>
                    Leinersaal / Stadtgeschichte
                </ion-button>
            </div>

        </div>

    </ion-content>

    <ion-footer class="ion-no-border_">
        <ion-toolbar>
            <div class="button-container">
                <zurueck-button-component router-link="/level"/>
                <hilfe-button-component id="raum-hilfe-button" pulsiert />
                <weiter-button-component router-link="/spiel" />
            </div>
        </ion-toolbar>
    </ion-footer>

    <ion-modal id="raum-hilfe-modal" ref="raum_hilfe_modal" trigger="raum-hilfe-button">
      <div class="modal-wrapper">
        <h1>Hilfe</h1>
        <div class="modal-content">
            <p>
                (( Inhaltliche Erklärung: Welche Themen in welchem Stockwerk, Besonderheiten
der Stockwerke?? ))
            </p>
        </div>
        <div class="modal-control">
            <ion-button size="large" @click="schliesseHilfe">ok</ion-button>
        </div>
      </div>
    </ion-modal>
</ion-page>

</template>

<style scoped>
#container {
    display:flex;
    height: 100%;
    flex-direction: column;
    text-align: center;
    justify-content: space-evenly;
    align-items: center;
}
#auswahl-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
}
p, ul {
    font-size: 36px;
    margin: 20px;
    text-align: left;
}
.button-container {
    display: flex;
    justify-content: space-between;
}
ion-button {
    height: 120px;
    padding: 10px;
}
.button-inner { flex-flow: column; }
.button-inner {

    flex-flow: column;
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
}
.modal-wrapper .modal-control {
    text-align: end;
}
#logo {
    position: absolute;
    height: 215px;
    width: 215px;
    top: 100px;
    left: 50px;
}
#auswahl-container {
    width: 800px;
    display:flex;
    flex-direction: column;
}
</style>

<script setup lang="ts">
    import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonModal, IonButton } from '@ionic/vue';
    import { ref } from 'vue';
    import weiterButtonComponent from '@/components/WeiterButtonComponent.vue'
    import zurueckButtonComponent from '@/components/ZurueckButtonComponent.vue'
    import hilfeButtonComponent from '@/components/HilfeButtonComponent.vue'
    import { useSpielStore } from '@/stores/SpielStore'

    const raum_hilfe_modal = ref();
    const schliesseHilfe = () => {
        console.log(raum_hilfe_modal);
        raum_hilfe_modal.value.$el.dismiss();
    };

    const spielStore = useSpielStore();

</script>
