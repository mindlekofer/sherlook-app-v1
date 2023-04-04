<template>

<ion-page>
    <ion-header :translucent="true">
        <ion-toolbar>
        <ion-title>Raumauswahl</ion-title>
        </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
        <ion-header collapse="condense">
        <ion-toolbar>
            <ion-title size="large">Raumauswahl</ion-title>
        </ion-toolbar>
        </ion-header>

        <div id="container">

        </div>

    </ion-content>

    <ion-footer class="ion-no-border_">
        <ion-toolbar>
            <div class="button-container">
                <zurueck-button-component router-link="/level"/>
                <hilfe-button-component @click="zeigeHilfe(true)" pulsiert />
                <weiter-button-component router-link="/spiel" />
            </div>
        </ion-toolbar>
    </ion-footer>

    <ion-alert
        :is-open="istHilfeOffen"
        header="Hilfe"
        sub-header="Wie geht was?"
        message="Das geht so ..."
        :buttons="['Ok']"
        @didDismiss="zeigeHilfe(false)"
    ></ion-alert>

</ion-page>

</template>

<style scoped>
#container {
  flex-direction: column;
  text-align: center;
}

.button-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
}

</style>

<script setup lang="ts">
    import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonAlert } from '@ionic/vue';
    import { ref } from 'vue';
    import { useSpielerStore } from '../stores/SpielerStore';
    import weiterButtonComponent from '@/components/WeiterButtonComponent.vue'
    import zurueckButtonComponent from '@/components/ZurueckButtonComponent.vue'
    import hilfeButtonComponent from '@/components/HilfeButtonComponent.vue'

    const spielerStore = useSpielerStore();

    const istHilfeOffen = ref(false);
    const zeigeHilfe = (offen: boolean) => (istHilfeOffen.value = offen);

</script>
