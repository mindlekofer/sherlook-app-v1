<template>

<ion-page>
    <ion-header :translucent="true">
        <ion-toolbar>
            <ion-title>Start</ion-title>
        </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
        <ion-header collapse="condense">
            <ion-toolbar>
                <ion-title size="large">Start</ion-title>
            </ion-toolbar>
        </ion-header>

        <div id="container">

        </div>
    </ion-content>

    <ion-footer class="ion-no-border_">
        <ion-toolbar>
            <div class="button-container">
                <zurueck-button-component style="display: none;" />
                <hilfe-button-component @click="zeigeHilfe(true)" />
                <weiter-button-component router-link="/anleitung" />
            </div>
        </ion-toolbar>
    </ion-footer>

    <ion-alert
        :is-open="istHilfeOffen"
        header="Hilfe"
        sub-header="Dies ist der Hilfe Button"
        message="Herzlichen Glückwunsch. Sie haben den Hilfe Button gefunden. Hier finden Sie zu jeder Zeit Hinweise was und wie etwas zu tun ist."
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
    display: flex;
    justify-content: space-between;
}

</style>

<script setup lang="ts">
    import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonAlert} from '@ionic/vue';
    import weiterButtonComponent from '@/components/WeiterButtonComponent.vue'
    import zurueckButtonComponent from '@/components/ZurueckButtonComponent.vue'
    import hilfeButtonComponent from '@/components/HilfeButtonComponent.vue'
    import { ref } from 'vue';

    const istHilfeOffen = ref(false);
    const zeigeHilfe = (offen: boolean) => (istHilfeOffen.value = offen);

</script>
