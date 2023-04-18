<template>

<ion-page>
    <ion-header :translucent="true">
        <ion-toolbar>
            <ion-title>Spielerauswahl</ion-title>
        </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">

        <div id="container">

            <div id="logo">
                <img src="assets/img/enola_aelter.png" width="600"/>
            </div>

            <div id="text-container">
                <p>In welcher Schwierigkeitsstufe wollt ihr spielen?</p>
            </div>

            <div id="auswahl-container">
                <ion-button color="success" expand="block" size="large" :fill="spielStore.spieler == 'watson' ? 'solid' : 'outline'" @click="spielStore.spieler = 'watson'">
                    Watson<br>
                    leicht (ab 10 Jahren)
                </ion-button>
                <ion-button color="warning" expand="block" size="large" :fill="spielStore.spieler == 'sherlock' ? 'solid' : 'outline'" @click="spielStore.spieler = 'sherlock'">
                    Sherlock<br>
                    mittel (ab 12 Jahre)
                </ion-button>
                <ion-button color="danger" expand="block" size="large" :fill="spielStore.spieler == 'enola' ? 'solid' : 'outline'" @click="spielStore.spieler = 'enola'">
                    Enola<br>
                    schwer (ab 16 Jahre)
                </ion-button>
            </div>

        </div>

    </ion-content>

    <ion-footer class="ion-no-border_">
        <ion-toolbar>
            <div class="button-container">
                <zurueck-button-component router-link="/anleitung"/>
                <hilfe-button-component id="level-hilfe-button" ausgeblendet/>
                <weiter-button-component router-link="/raum" disabled v-if="spielStore.spieler == ''"/>
                <weiter-button-component router-link="/raum" v-else/>
            </div>
        </ion-toolbar>
    </ion-footer>

</ion-page>

</template>

<style scoped>
#logo {
    position: absolute;
    height: 215px;
    width: 215px;
    top: 180px;
    left: 50px;
}
#container {
    display:flex;
    height: 100%;
    flex-direction: column;
    text-align: center;
    justify-content: space-evenly;
    align-items: center;
}
#auswahl-container {
    width: 600px;
    display:flex;
    flex-direction: column;
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

</style>

<script setup lang="ts">
    import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonModal, IonButton } from '@ionic/vue';
    import weiterButtonComponent from '@/components/WeiterButtonComponent.vue'
    import zurueckButtonComponent from '@/components/ZurueckButtonComponent.vue'
    import hilfeButtonComponent from '@/components/HilfeButtonComponent.vue'
    import { ref } from 'vue';

    import { useSpielStore } from '@/stores/SpielStore'
    const spielStore = useSpielStore();

</script>
