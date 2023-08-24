<script setup lang="ts">
import { useSpielStore } from '@/stores/SpielStore'
import WeiterButtonComponent from '../WeiterButtonComponent.vue';
import ZurueckButtonComponent from '../ZurueckButtonComponent.vue';

const props = defineProps ({
    aktiveLupe: {
        type: Number,
        default: 2
    }
});

const spielStore = useSpielStore();

</script>


<template>
<div id="content-scroll">

    <div class="watson" v-if="spielStore.spieler == 'Watson'">
        <img id="gesicht" src="assets/img/drwatsonvari3.png" width="350"/>
        <p>
            Hallo, ich bin Watson.
        </p>
        <p>
            Heute übernehmen wir zusammen den Fall der Kunstdiebe.
        </p>
        <p>
            Sherlock sagt immer, um einen Dieb zu finden, muss zuerst die Fragen zum Detail geklärt werden, danach können wir das Objekt suchen.
        </p>
        <p>
            Das sollten wir schaffen, oder?
        </p>
    </div>
    <div class="sherlock" v-else-if="spielStore.spieler == 'Sherlock'">
        <img id="gesicht" src="assets/img/sherlock_neutral_verbesserung.png" width="350"/>

        <p>
            Guten Tag, mein Name ist Sherlock.
        </p>
        <p>
            Ich habe gehört, hier wartet ein neuer Fall auf mich.
        </p>
        <p>
            Anscheinend sind hier Kunstfälscher am Werk gewesen und haben unser Detail durch eine Replik ersetzt. Im ersten Schritt muss ich überprüfen, ob ihr meine Fragen beantworten könnt und ihr euch würdig erweist in den Club der Detektive aufgenommen zu werden. 
        </p>
        <p>
            Wenn ihr das geschafft habt, sucht das passende Objekt. So werden wir am Schluss die Täter:in finden.
        </p>
    </div>
    <div class="enola" v-else-if="spielStore.spieler == 'Enola'">
        <img id="gesicht" src="assets/img/enola_aelter.png"/>
        <p>
            Hallo, mein Name ist Enola. 
        </p>
        <p>
            Das darf doch nicht wahr sein! Dieses Detail wurde im Museum durch eine Kopie ersetzt.
        </p> 
        <p>
            Auf geht’s lasst uns Spuren suchen!
        </p>
        <p>
            Beantwortet zunächst meine Fragen zum Detail. Sucht dann nach dem Objekt, zu dem es gehört. 
        </p>
        <p>
            Ob wir am Ende auch die Täter*in finden werden?
        </p>
    </div>
    <div v-else>
        1.0 Detail 1
    </div>

    <div id="scroll-buttonbereich">
        <!-- <zurueck-button-component id="zurueck-button" class="pulsieren" @click="spielStore.flow = 1.1"/> -->
        <weiter-button-component id="weiter-button" class="pulsieren" @click="spielStore.flow = 1.1"/>
    </div>

</div>
</template>


<style scoped>
* {
    text-align: left;
}
#content-scroll {
    padding: 20px;
    height: 100%;
}
.watson {
    font-size: 34px;
}
.sherlock {
    font-size: 26px;;
}
.enola {
    font-size: 30px;
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

#zurueck-button {
    position: fixed;
    bottom: 0px;
    left: 0px;
}

</style>