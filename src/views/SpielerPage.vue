<template>

<ion-page>
    <ion-header :translucent="true">
        <ion-toolbar>
        <ion-title>SpielerPage</ion-title>
        </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
        <ion-header collapse="condense">
        <ion-toolbar>
            <ion-title size="large">SpielerPage</ion-title>
        </ion-toolbar>
        </ion-header>

        <div id="container">

            <div v-for="element in spielerStore.spieler" :key="element.id"> {{element.name}} </div>
            <ion-button router-link="/home" size="large">weiter</ion-button>

        </div>
    </ion-content>
</ion-page>




</template>

<style scoped>
#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style>

<script setup lang="ts">
    import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/vue';
    import { useSpielerStore } from '../stores/SpielerStore';
    import { useIonRouter } from '@ionic/vue';

    const spielerStore = useSpielerStore();
</script>
