<template>

<ion-page>
    <ion-header :translucent="true">
        <ion-toolbar>
            <ion-title>Level</ion-title>
        </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
        <ion-header collapse="condense">
            <ion-toolbar>
                <ion-title size="large">Level</ion-title>
            </ion-toolbar>
        </ion-header>

        <div id="container">
            <div id="logo">
                <img src="assets/logo.png" width="600"/>
            </div>

            <div id="text-container">
                <p>In welchem Level wollt ihr spielen?</p>
            </div>
            <div id="auswahl-container">
                <ion-button color="primary" expand="block" size="large" fill="solid">
                    Watson<br>
                    leicht (ab 10 Jahren)
                </ion-button>
                <ion-button color="primary" expand="block" size="large" fill="solid">
                    Sherlock<br>
                    mittel (ab 12 Jahre)
                </ion-button>
                <ion-button color="primary" expand="block" size="large" fill="solid">
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
                <weiter-button-component router-link="/raum" />
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
    top: 100px;
    left: 50px;
}
#container {
    display:flex;
    height: 100%;
    flex-direction: column;
    text-align: center;
    justify-content: space-around;
    align-items: center;
}
#auswahl-container {
    width: 600px;
    display:flex;
    flex-direction: column;
}
#text-container {

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

</script>
