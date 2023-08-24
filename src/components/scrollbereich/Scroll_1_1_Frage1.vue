<script setup lang="ts">
import { useSpielStore } from '@/stores/SpielStore'
import WeiterButtonComponent from '../WeiterButtonComponent.vue';
import { IonButton } from '@ionic/vue';
import { ref, watch } from 'vue';

const props = defineProps ({
    aktiveLupe: {
        type: Number,
        default: 2
    }
});

const spielStore = useSpielStore();

const buttonFarbe1 = ref("primary");
const buttonFarbe2 = ref("primary");
const buttonFarbe3 = ref("primary");
const buttonFill1 = ref("outline");
const buttonFill2 = ref("outline");
const buttonFill3 = ref("outline");

const antwortClicked = ref(0);
const antwortRichtig = ref(false);
const quizStatus = ref("frage");   // frage / falsch1 / falsch2 / richtig

watch(antwortClicked, () => {
    console.log(`Antwort clicked: ${antwortClicked.value}`);
    buttonFill1.value = antwortClicked.value == 1 ? "solid" : "outline";
    buttonFill2.value = antwortClicked.value == 2 ? "solid" : "outline";
    buttonFill3.value = antwortClicked.value == 3 ? "solid" : "outline";
});

const weiterClicked = () => {
    console.log(`weiterClicked`);
    if (antwortClicked.value == 1) 
        buttonFarbe1.value = antwortRichtig.value ? "success" : "danger";
    else if (antwortClicked.value == 2)
        buttonFarbe2.value  = antwortRichtig.value ? "success" : "danger";
    else if (antwortClicked.value == 3)
        buttonFarbe3.value  = antwortRichtig.value ? "success" : "danger";
    if (!antwortRichtig.value && spielStore.flow == 1.1) {
        spielStore.flow = 1.11;
        quizStatus.value = "falsch1";
    } else if (!antwortRichtig.value && spielStore.flow == 1.11) {
        spielStore.flow = 1.12;
        quizStatus.value = "falsch2";
    } else {
        spielStore.flow = 1.13;
        quizStatus.value = "richtig";
    }
}

</script>


<template>
<div id="content-scroll">

    <div class="quiz watson" v-if="spielStore.spieler == 'Watson'">
        <div class="frage-content">
            <img id="gesicht" src="assets/img/drwatsonvari3.png" width="350"/>
            <p v-if="quizStatus == 'frage'">
                Was für eine hübsche Verzierung! Worauf könnte diese denn nur gestickt worden sein, was meint ihr?
            </p>
            <p v-else-if="quizStatus == 'richtig'" class="richtig">
                Richtige Antwort, weiter gehts.
            </p>
            <p v-else-if="quizStatus == 'falsch1'" class="falsch">
                Falsche Antwort, versuche es noch einmal.
            </p>
            <p v-else-if="quizStatus == 'falsch2'" class="falsch">
                Leider wieder falsch, beim nächsten Mal klappt es bestimmt. 
            </p>
        </div>
        <div class="antwort-buttons">
            <ion-button :color="buttonFarbe1" :fill="buttonFill1" size="large" expand="block" @click="antwortClicked = 1; antwortRichtig = true">Auf eine Kopfbedeckung</ion-button>
            <ion-button :color="buttonFarbe2" :fill="buttonFill2" size="large" expand="block" @click="antwortClicked = 2; antwortRichtig = false">Auf ein luxuriöses Sofa</ion-button>
            <ion-button :color="buttonFarbe3" :fill="buttonFill3" size="large" expand="block" @click="antwortClicked = 3; antwortRichtig = false">Auf einen extravaganten Autositz</ion-button>
        </div>
    </div>
    <div class="quiz sherlock" v-else-if="spielStore.spieler == 'Sherlock'">
        <div class="frage-content">
            <img id="gesicht" src="assets/img/sherlock_neutral_verbesserung.png" width="350"/>
            <p v-if="quizStatus == 'frage'">
                Welchen Beruf könnte der Besitzer des prächtig bestickten Gegenstandes ausgeübt haben? Sein Name war übrigens Karl Theodor von Dalberg und er lebte weder im Vatikan, noch in einem Kloster.
            </p>
            <p v-else-if="quizStatus == 'richtig'" class="richtig">
                Willkommen im Club der Detektive.
            </p>
            <p v-else-if="quizStatus == 'falsch1'" class="falsch">
                Leider falsch, versucht es noch einmal.
            </p>
            <p v-else-if="quizStatus == 'falsch2'" class="falsch">
                Alle guten Dinge sind drei, versuche es noch einmal.
            </p>
        </div>
        <div class="antwort-buttons">
            <ion-button :color="buttonFarbe1" :fill="buttonFill1" size="large" expand="block" @click="antwortClicked = 1; antwortRichtig = true">Bischof</ion-button>
            <ion-button :color="buttonFarbe2" :fill="buttonFill2" size="large" expand="block" @click="antwortClicked = 2; antwortRichtig = false">Papst</ion-button>
            <ion-button :color="buttonFarbe3" :fill="buttonFill3" size="large" expand="block" @click="antwortClicked = 3; antwortRichtig = false">Mönch</ion-button>
        </div>
    </div>
    <div class="quiz enola" v-else-if="spielStore.spieler == 'Enola'">
        <div class="frage-content">
            <img id="gesicht" src="assets/img/enola_aelter.png" />
            <p v-if="quizStatus == 'frage'">
                Wie nennt man eine spezielle Art von Kopfbedeckung, welche man trotz des schicken Aussehens im Alltag wohl eher weniger tragen würde und die man am ehesten in einem Gotteshaus finden kann?
            </p>
            <p v-else-if="quizStatus == 'richtig'" class="richtig">
                Richtige Antwort, weiter gehts.
            </p>
            <p v-else-if="quizStatus == 'falsch1'" class="falsch">
                Leider falsch, versucht es noch einmal.
            </p>
            <p v-else-if="quizStatus == 'falsch2'" class="falsch">
                Auch diese Antwort ist leider falsch. Drückt auf die richtige Antwort.

            </p>
        </div>
        <div class="antwort-buttons">
            <ion-button :color="buttonFarbe1" :fill="buttonFill1" size="large" expand="block" @click="antwortClicked = 1; antwortRichtig = true">Mitra</ion-button>
            <ion-button :color="buttonFarbe2" :fill="buttonFill2" size="large" expand="block" @click="antwortClicked = 2; antwortRichtig = false">Monokel</ion-button>
            <ion-button :color="buttonFarbe3" :fill="buttonFill3" size="large" expand="block" @click="antwortClicked = 3; antwortRichtig = false">Mieter</ion-button>
        </div>
    </div>
    <div v-else>
        1.1 Frage 1
    </div>

    <div id="scroll-buttonbereich">
        <weiter-button-component id="weiter-button" @click="spielStore.flow = 1.2" class="pulsieren" v-if="quizStatus == 'richtig'" />
        <weiter-button-component id="weiter-button" @click="weiterClicked()" v-else-if="antwortClicked > 0" />
        <weiter-button-component id="weiter-button" disabled v-else />
    </div>


</div>
</template>


<style scoped>
* {
    text-align: left;
    line-height: 1.5em;
}
#content-scroll {
    padding: 20px;
    height: 100%;
}
.quiz {
    display: flex;
    flex-direction: column;
    height: 100%;
}
.watson {
    font-size: 34px;
}
.watson p {
    margin-top: 70px;
}
.sherlock {
    font-size: 28px;
}
.enola {
    font-size: 28px;
}
.enola p {
    margin-top: 10px;
}
img {
    width: 200px;
    margin: 20px;
    /* transform: scaleX(-1); */
    float: right;
}
#weiter-button {
    position: fixed;
    bottom: 0px;
    right: 0px;
}
.frage-content {
    flex-grow: 1;
}
.antwort-buttons * {
    margin-bottom: 3px;
    /* height: 80px;
    width: 180px; */
}
.richtig {
    padding-top: 100px;
}
.falsch {
    padding-top: 100px;
}

</style>