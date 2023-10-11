<template>

<ion-page>
    <ion-header :translucent="true">
        <!-- <ion-toolbar>
            <ion-title>Start > <u><b>Intro</b></u></ion-title>
        </ion-toolbar> -->
        <ion-breadcrumbs>
                <ion-breadcrumb router-link="/start">Start</ion-breadcrumb>
                <ion-breadcrumb router-link="/intro">Intro</ion-breadcrumb>
        </ion-breadcrumbs>
    </ion-header>
    <ion-content :fullscreen="true">
        <div class="container">

            <h1>0.2 Intro Film</h1>

            <button-zurueck-component class="button_einstellungen" router-link="/start"/>
            <button-weiter-component class="button_weiter" @click="weiterButtonClicked" router-link="/level" />

        </div>

    </ion-content>
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
    import { IonHeader, IonTitle, IonContent, IonPage, IonToolbar, IonFooter, IonBreadcrumb, IonBreadcrumbs } from '@ionic/vue';
    import ButtonWeiterComponent from '@/components/ButtonWeiterComponent.vue';
    // import ButtonEinstellungenComponent from '@/components/ButtonEinstellungenComponent.vue';
    import ButtonZurueckComponent from '@/components/ButtonZurueckComponent.vue';
    import { useSpielStore } from '@/stores/SpielStore'

    const spielStore = useSpielStore();
    console.log(`spielStore.flow: ${spielStore.flow}`);

    const weiterButtonClicked = () => {
        spielStore.flow = 0.3;
        console.log(`weiter -> flow = ${spielStore.flow}`);
    }

</script>
