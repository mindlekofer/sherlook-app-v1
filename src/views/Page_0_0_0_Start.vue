<template>

<ion-page>
    <ion-content :fullscreen="true">
        <div class="container">

            <img class="logo_sherlook" src="assets/logo_sherlook.png" width="700">
            <img class="logo_uni" src="assets/logo_uni.jpg" width="340">
            <img class="logo_rosgarten" src="assets/logo_rosgarten.png" width="350">

            <button-einstellungen-component class="button_einstellungen"/>
            <button-weiter-component class="button_weiter" :pulsiert="true" router-link="/intro" />

        </div>

    </ion-content>
    <!-- <ion-footer class="ion-no-border">
        <ion-toolbar>
            <div class="button-container">
            </div>
        </ion-toolbar>
    </ion-footer> -->

</ion-page>

</template>

<style scoped>
.container {
  flex-direction: column;
  text-align: center;
  position: relative;
  height: 100%;
  overflow: hidden;
}
.logo_rosgarten {
    position: absolute;
    top: 50px;
    left: 50px;
}
.logo_uni {
    position: absolute;
    top: 50px;
    right: 50px;
}
.logo_sherlook {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
}
.button_einstellungen {
    position: absolute;
    bottom: 25px;
    left: 25px;
}
.button_weiter {
    position: absolute;
    bottom: 25px;
    right: 25px;
}

</style>

<script setup lang="ts">
    import { IonContent, IonPage, IonToolbar, IonFooter } from '@ionic/vue';
    import ButtonWeiterComponent from '@/components/ButtonWeiterComponent.vue';
    import ButtonEinstellungenComponent from '@/components/ButtonEinstellungenComponent.vue';


</script>
