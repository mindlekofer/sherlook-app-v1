<template>

<ion-page>
    <ion-header :translucent="true">
        <ion-toolbar>
            <ion-title>Erklärung</ion-title>
        </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
        <ion-header collapse="condense">
            <ion-toolbar>
                <ion-title size="large">Spiel Einleitung</ion-title>
            </ion-toolbar>
        </ion-header>

        <div id="container">
            <div id="container-links">
                <img src="assets/logo.png" width="600"/>
            </div>
            <div id="container-rechts">
                <p>
                    Detaildiebe treiben hier im Rosgartenmuseum ihr Unwesen. <br>
                    Detaildiebe? Ja immer wieder verschwinden kleine Details und sogar 
                    ganze Objekte aus dem Museum, hier ein kleines Wappen, da ein ganzer 
                    Türrahmen …                 
                </p>
                <p>
                    Die Diebe ersetzen die Details durch Kopien und 
                    präsentieren ihre Beute frech als eigene Sammlung im Netz. Ganz 
                    schön clever... Schafft ihr es, sie zu überführen?
                </p> 
                <p>
                    Ermittelt mit Eurer Hightech-Lupe an der Seite von Watson, 
                    Sherlock oder Enola Holmes:
                </p>
                <ul>
                    <li>Sucht die Dinge und Details, die durch Kopien ersetzt wurden</li>
                    <li>Findet heraus, wer hinter den Diebstählen steckt</li>
                </ul>
                <p>
                    Und jetzt kann’s auch schon gleich losgehen! <br>
                    Doch bevor ich es vergesse: Wenn ihr noch weitere Fragen 
                    oder ein technisches Problem habt, könnt ihr jederzeit auf 
                    den gelben Infobutton klicken.

                </p>
            </div>
        </div>

    </ion-content>

    <ion-footer class="ion-no-border_">
        <ion-toolbar>
            <div class="button-container">
                <zurueck-button-component router-link="/start"/>
                <hilfe-button-component @click="zeigeHilfe(true)" />
                <weiter-button-component router-link="/level" />
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
    display: flex;
    flex-direction: row;
    text-align: center;
}
p, ul {
    font-size: 22px;
    margin: 20px;
    text-align: left;
}
ul {
    text-align: left;
    margin-left: 100px;
}
.button-container {
    display: flex;
    justify-content: space-between;
}

#container-links {
    padding: 50px;
}
#container-rechts {
    padding: 30px;
}

</style>

<script setup lang="ts">
    import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonAlert } from '@ionic/vue';
    import weiterButtonComponent from '@/components/WeiterButtonComponent.vue'
    import zurueckButtonComponent from '@/components/ZurueckButtonComponent.vue'
    import hilfeButtonComponent from '@/components/HilfeButtonComponent.vue'
    import { ref } from 'vue';

    const istHilfeOffen = ref(false);
    const zeigeHilfe = (offen: boolean) => (istHilfeOffen.value = offen);
</script>
