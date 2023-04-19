<template>

<ion-page>
    <ion-header :translucent="true">
        <ion-toolbar>
            <ion-title>Spielerklärung</ion-title>
        </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">

        <div id="container">
            <div id="container-links">
                <img src="assets/img/enola_aelter.png" width="600"/>
            </div>
            <div id="container-rechts">
                <p>
                    Detaildiebe treiben hier im Rosgartenmuseum ihr Unwesen.
                </p>
                <p>
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
                <hilfe-button-component id="anleitung-hilfe-button" />
                <!-- <hilfe-button-component @click="zeigeHilfe(true)" /> -->
                <weiter-button-component router-link="/level" />
            </div>
        </ion-toolbar>
    </ion-footer>

    <ion-modal id="anleitung-hilfe-modal" ref="anleitung_hilfe_modal" trigger="anleitung-hilfe-button">
      <div class="modal-wrapper">
        <h1>Hilfe</h1>
        <div class="modal-content">
            <p>
                Über den roten Button links könnt ihr das Spiel verlassen. 
            </p>
            <p>
            Mit dem grünen Button fahrt ihr fort und schaltet zur nächsten Spielstufe weiter.
            </p>
            <p>
            Ihr habt Fragen zur technischen Bedienung eurer High-Tech Lupe oder möchtet nochmal 
            inhaltlich mehr über das Spiel erfahren? Dann nutzt diesen gelben Infobutton, 
            um immer auf dem Laufenden zu bleiben.
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
    flex-grow: 1;
}
.modal-wrapper .modal-control {
    text-align: end;
}
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
    padding-top: 50px;
}

</style>

<script setup lang="ts">
    import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonModal, IonButton } from '@ionic/vue';
    import weiterButtonComponent from '@/components/WeiterButtonComponent.vue'
    import zurueckButtonComponent from '@/components/ZurueckButtonComponent.vue'
    import hilfeButtonComponent from '@/components/HilfeButtonComponent.vue'
    import { ref } from 'vue';
    import { useSpielStore } from '@/stores/SpielStore'

    const anleitung_hilfe_modal = ref();
    const schliesseHilfe = () => {
        console.log(anleitung_hilfe_modal);
        anleitung_hilfe_modal.value.$el.dismiss();
    };

    const spielStore = useSpielStore();
    console.log(spielStore.flow);
    
</script>