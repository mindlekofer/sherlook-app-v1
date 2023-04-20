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


</script>


<template>
<div id="content-scroll">

    <div class="quiz watson" v-if="spielStore.spieler == 'Watson'">
        <div class="frage-content">
            <img id="gesicht" src="assets/img/enola_aelter.png" />
            <p>
                Was für eine hübsche Verzierung! Worauf könnte diese denn nur gestickt worden sein, was meint ihr?
            </p>
           
        </div>
    </div>
    <div class="quiz sherlock" v-else-if="spielStore.spieler == 'Sherlock'">

    </div>
    <div class="quiz enola" v-else-if="spielStore.spieler == 'Enola'">

    </div>
    <div v-else>
        1.1 Frage 1
    </div>

    <div id="scroll-buttonbereich">

        <weiter-button-component id="weiter-button" />
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
    transform: scaleX(-1);
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
.antwort-buttons {
    margin-bottom: 150px;
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