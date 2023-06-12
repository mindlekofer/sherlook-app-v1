<template>

<ion-page>
    <ion-content :fullscreen="true">
        <div id="container">

            <h1>SherLOOK 2.0</h1>


        </div>
    </ion-content>

    <ion-footer class="ion-no-border_">
        <ion-toolbar>
            <div class="button-container">
                <!-- <zurueck-button-component /> -->
                <!-- <hilfe-button-component @click="zeigeHilfe(true)" /> -->
                <weiter-button-component router-link="/anleitung" />
            </div>
        </ion-toolbar>
    </ion-footer>
    
</ion-page>

</template>

<style scoped>

#container {
  flex-direction: column;
  text-align: center;
}
.button-container {
    display: flex;
    justify-content: end;
}

</style>

<script setup lang="ts">
    import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonAlert} from '@ionic/vue';
    import weiterButtonComponent from '@/components/WeiterButtonComponent.vue'
    import zurueckButtonComponent from '@/components/ZurueckButtonComponent.vue'
    import hilfeButtonComponent from '@/components/HilfeButtonComponent.vue'
    import { ref } from 'vue';


</script>
