<template>
<div ref="scrollContentA" id="content-scroll">
<!-- <ion-content ref="scrollContentA" id="content-scroll"> -->
    <section id="tutorial_0_6" v-if="spielStore.flow >=0.6">
        <div class="spieler_logo">
            <img src="assets/img/detektive/watson_neutral.png" width="200"/>
        </div>
        <p>
            Willkommen im Detektivbüro Holmes!
        </p>
        <p>
            Mein Name ist Watson, Dr. Watson!
        </p>
        <p>
            Dieser Fall der Detaildiebe ist wirklich außergewöhnlich!
        </p>

        <p>
            Wie Sherlock, unser Meisterdetektiv, sage ich immer: 
            Als erstes muss man sich den Tatort genau anschauen. 
            Jede Beobachtung kann später von unschätzbarem Wert sein.
        </p>
        <p>
            Seit ihr bereit?
        </p>    
        <hr>
        <!-- <button-runter-component class="button-runter" @click="spielStore.flow = 0.7"/> -->
        <button-runter-component class="button-runter" @click="spielStore.flow = 0.7; scrollZumEnde()" pulsiert/>
        <!-- <button-runter-component class="button-runter" @click="spielStore.flow = 0.7" v-if="spielStore.flow < 0.7"/> -->
    </section>
    <section id="tutorial_0_7" v-if="spielStore.flow >= 0.7">
        <p>
            Hier im Erdgeschoss soll es eine Büste des Museumsgründers geben! Wisst ihr, wie er heißt?
        </p>
        <div class="antwort-buttons">
            <ion-button :color="buttonFarbe1" :fill="buttonFill1" size="large" expand="block" @click="antwortClicked = 1; antwortRichtig = false">Ludwig van Beethoven</ion-button>
            <ion-button :color="buttonFarbe2" :fill="buttonFill2" size="large" expand="block" @click="antwortClicked = 2; antwortRichtig = false">Sherlock Holmes</ion-button>
            <ion-button :color="buttonFarbe3" :fill="buttonFill3" size="large" expand="block" @click="antwortClicked = 3; antwortRichtig = true">Ludwig Leiner</ion-button>
        </div>
        
        
    </section>
    <button-runter-component class="button-runter" @click="spielStore.flow = 0.8" v-if="quizStatus == 'richtig'"/>
    <button-runter-component class="" @click="weiterClicked()" v-else-if="antwortClicked > 0"/>
    <button-runter-component class="button-quiz" disabled @click="spielStore.flow = 0.8" v-else/>
    <section id="tutorial_0_8" v-if="spielStore.flow >= 0.8">
        <div class="spieler_logo">
            <img src="assets/img/detektive/watson_neutral.png" width="200"/>
        </div>
        <p>
            Sehr gut, die Antwort ist richtig. Lasst uns also diese Büste von Ludwig Leiner suchen.
        </p>
        <p>
            Keine Sorge: Die Hightech-Lupe hilft uns dabei. 
            Ein blauer Rahmen bedeutet kalt: Das Objekt ist noch weit entfernt. 
            Wenn die Lupe hell aufleuchtet, sind wir dem Objekt nah. 
            Drückt auf den Button mit der Karte, dann könnt ihr Euch den Weg genau anschauen.
        </p>
    </section>
    <section id="tutorial_0_8" v-if="spielStore.flow >= 0.9">

    </section>
</div>
<!-- </ion-content> -->
</template>


<script setup lang="ts">
import { useSpielStore } from '@/stores/SpielStore'
import ButtonRunterComponent from '../ButtonRunterComponent.vue';
import { onMounted, ref, watch } from 'vue';
import { IonContent, IonButton } from '@ionic/vue';


const props = defineProps ({

});

const spielStore = useSpielStore();

spielStore.flow = 0.6;
console.log(`spielStore.flow: ${spielStore.flow}`);

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
    if (!antwortRichtig.value && spielStore.flow == 0.7) {
        spielStore.flow = 0.71;
        quizStatus.value = "falsch1";
    } else if (!antwortRichtig.value && spielStore.flow == 1.11) {
        spielStore.flow = 0.72;
        quizStatus.value = "falsch2";
    } else {
        spielStore.flow = 0.73;
        quizStatus.value = "richtig";
    }
}


const scrollZumEnde = () => {
    console.log("scrollZumEnde()");
    // console.log(scrollContentA);
    // scrollContentA?.value?.$el.scrollToBottom(500);
    // scrollContentA.value.el.scrollToBottom(500);
    // console.log(document.getElementById("content-scroll"));
    // console.log(document.getElementById("content-scroll")?.scrollHeight);
    // document.getElementById("content-scroll")?.scrollBy({top:1000, left:1000});
    // document.getElementById("content-scroll")?.scrollTop = 1000;

    // scrollContentA?.value?.$el.scrollToBottom(500);
    document.getElementById("tutorial_0_7")?.scrollIntoView({behavior: "smooth", block: "end"});
}

// onMounted(
//     () => {
//         console.log('onMounted()');

//         if (scrollContentA.value) {
//             console.log(scrollContentA);
//             // scrollContentA.value.scrollToBottom();
//         }
//     }
// ) 

// onMounted( () => {
//     if (scrollContentA.value!=null) {

//         // scrollContentA.value.scrollToBottom();
//         // const scrollZumEnde = () => {
//         //     scrollContentA.value.scrollToBottom();tv
//         // }
//     }
// }

</script>



<style scoped>
section {
    height: 100vh;
    position: relative;
}
.antwort-buttons * {
    margin-bottom: 15px;
    /* height: 80px;
    width: 180px; */
}
p {
    font-size: 30px;
}
#content-scroll {
    padding: 20px;
    height: 100%;
}
.watson {
    font-size: 34px;
}
.sherlock {
    font-size: 26px;
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
.button-runter {
    position: fixed;
    bottom: 25px;
    right: 25px;
}
.button-quiz {
    position: relative;
}

#zurueck-button {
    position: fixed;
    bottom: 0px;
    left: 0px;
}

</style>