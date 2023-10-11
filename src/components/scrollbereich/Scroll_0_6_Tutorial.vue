<template>
<div ref="scrollContentA" id="content-scroll">

    <swiper @swiper="onSwiper" id="swiper-haupt" :slidesPerView="1" :spaceBetween="50" :freeMode="false" :scrollbar="false" :navigation="false" :pagination="true" :modules="modules">
        
        <swiper-slide id="tutorial_0_6" v-if="spielStore.flow >=0.6">
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
                Seid ihr bereit?
            </p>    
            <hr>
            <button-weiter-component class="button-runter" @click="spielStore.flow = 0.7; swiperInstance.slideNext();" pulsiert v-if="spielStore.flow == 0.6"/>
            <button-weiter-component class="button-runter" @click="swiperInstance.slideNext()" v-else/>
            
            <!-- <button-runter-component class="button-runter" @click="spielStore.flow = 0.7; scrollZumEnde()" pulsiert/> -->
            <!-- <button-runter-component class="button-runter" @click="spielStore.flow = 0.7" v-if="spielStore.flow < 0.7"/> -->
        </swiper-slide>
        <swiper-slide id="tutorial_0_6" v-if="spielStore.flow >= 0.6">
            <div class="spieler_logo">
                <img src="assets/img/detektive/watson_gluecklich.png" width="200" v-if="antwortRichtig"/>
                <img src="assets/img/detektive/watson_enttaeuscht.png" width="210" v-else-if="antwortClicked > 0 && !antwortRichtig"/>
                <img src="assets/img/detektive/watson_neutral.png" width="200" v-else/>
            </div>
            <p>
                Hier im Erdgeschoss soll es eine Büste des Museumsgründers geben! Wisst ihr, wie er heißt?
            </p>
            <div class="antwort-buttons">
                <ion-button :color="buttonFarbe1" :fill="buttonFill1" size="large" expand="block" @click="antwortClicked = 1; antwortRichtig = false" :disabled="antwortRichtig">Ludwig van Beethoven</ion-button>
                <ion-button :color="buttonFarbe2" :fill="buttonFill2" size="large" expand="block" @click="antwortClicked = 2; antwortRichtig = false" :disabled="antwortRichtig">Sherlock Holmes</ion-button>
                <ion-button :color="buttonFarbe3" :fill="buttonFill3" size="large" expand="block" @click="antwortClicked = 3; antwortRichtig = true">Ludwig Leiner</ion-button>
            </div>
            <button-weiter-component class="button-runter" @click="swiperInstance.slideNext(); " v-if="spielStore.flow >=0.8"/>
            <button-weiter-component class="button-runter" pulsiert @click="spielStore.flow = 0.8; swiperInstance.slideNext(); " v-else-if="antwortRichtig"/>
            <button-weiter-component class="button-runter" disabled v-else/>

        </swiper-slide>

        <!-- <button-runter-component class="button-runter" @click="spielStore.flow = 0.8" v-if="quizStatus == 'richtig'"/>
        <button-runter-component class="" @click="weiterClicked()" v-else-if="antwortClicked > 0"/>
            <button-runter-component class="button-quiz" disabled @click="spielStore.flow = 0.8" v-else/> -->
        <swiper-slide v-if="spielStore.flow >= 0.7 && antwortRichtig == true">
            <div class="spieler_logo">
                <img src="assets/img/detektive/watson_gluecklich.png" width="200"/>
            </div>
            <p>
                Sehr gut, die Antwort ist richtig!
                
            </p>
            <p>Lasst uns also diese Büste von Ludwig Leiner suchen.</p>
            <p>
                Keine Sorge: Die Hightech-Lupe hilft uns dabei. 
                Ein blauer Rahmen bedeutet kalt: Das Objekt ist noch weit entfernt. 
                Wenn die Lupe hell aufleuchtet, sind wir dem Objekt nah. 
                Drückt auf den Button mit der Karte, dann könnt ihr Euch den Weg genau anschauen.
            </p>
            
        </swiper-slide>
        <swiper-slide v-if="spielStore.flow >= 0.9">
            <div class="spieler_logo">
                <img src="assets/img/detektive/watson_neutral.png" width="200"/>
            </div>
            <p>Super. Der Rahmen der Lupe beginnt zu leuchten!</p>
            <p>Wir sind dem Objekt nah und können es mit der Kamera der Hightech- Lupe aufspüren.</p>
            <p>Drückt auf das Kamerasymbol.</p>
            
        </swiper-slide>

        <swiper-slide class="posting-slide" v-if="spielStore.flow >= 0.95">
          <swiper :modules="modules" :direction="'vertical'" :scrollbar="true" :mousewheel="true" :slidesPerView="'auto'" :freeMode="true">
            <swiper-slide>
              <div class="spieler_logo">
                <img src="assets/img/detektive/watson_neutral.png" width="200"/>
              </div>
              <p> Ich bin der Geist von Ludwig Leiner: der Gründervater dieses Museums! </p>
              <p> Seit meinem Tode vor 120 Jahren ruhe ich in diesem Fleckchen Erde und nun wagt man mich zu stören. </p>
              <p> Beschützt mein Vermächtnis und überführt die Detaildiebe! </p>
              <p> 
                Das Erdgeschoss ist voller Schätze. 
                Doch immer wieder fehlen kleine Dinge. 
              </p>
              <p> 
                Kennt ihr die Räume, liebe Spürnasen? 
              </p>
              <p> 
                Ich führe Euch, damit ihr besser suchen könnt!
              </p>

              <p>
                Dieser Saal ist mein Lieblingsraum und nach mir benannt: Der Leinersaal.
              </p>
              <p>
                Schaut Euch um: In diesen schönen Vitrinen habe ich Dinge zusammengetragen, die tief unter der Erde lagen.
              </p>
              <p>
                Uralte Versteinerungen und Funde aus der Stein- und Bronzezeit.
                So haben die Menschen vor 6.000 Jahren in ihren Pfahlbauten am Bodensee gelebt!
              </p>

              <p>
                Viel könnte ich Euch erzählen über all diese Schätze! 
              </p>
              <p>
                Aber diese Detaildiebe gönnen uns weder Rast noch Ruh!
              </p>
              <p>
                Lasst uns also weitergehen in den nächsten Raum.
              </p>
              <p>
                Findet die Fischerin und fangt sie wieder mit der magischen Lupe ein. 
              </p>  
              <p>
                Wenn ihr den Weg nicht kennt, könnt ihr wieder auf den Button mit der Karte drücken.
              </p>

            </swiper-slide>
          </swiper>
        </swiper-slide>

        <!-- <swiper-slide class="posting-slide" v-if="spielStore.flow >= 0.8">
            <swiper :modules="modules" :direction="'vertical'" :scrollbar="true" :mousewheel="true" :slidesPerView="'auto'" :freeMode="true">
                      <swiper-slide>
                            <PostingComponent></PostingComponent>
                      </swiper-slide>
                    </swiper>
        </swiper-slide> -->
    </swiper>
        </div>
        <!-- </ion-content> -->
    </template>


<script setup lang="ts">
import { ref, shallowRef, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useSpielStore } from '@/stores/SpielStore'
import { IonButton } from '@ionic/vue';
import ButtonWeiterComponent from '../ButtonWeiterComponent.vue';
import PostingComponent from '@/components/PostingComponent.vue';

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation, FreeMode, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';

const props = defineProps ({

});

const spielStore = useSpielStore();
const { flow } = storeToRefs(spielStore);
console.log(`spielStore.flow: ${spielStore.flow}`);

const modules = [Pagination, Navigation, FreeMode, Scrollbar];
const swiperInstance = ref();
function onSwiper(swiper : any) {
    swiperInstance.value = swiper;
}

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
  if (antwortClicked.value == 1) 
    buttonFarbe1.value = antwortRichtig.value ? "success" : "danger";
  else if (antwortClicked.value == 2)
    buttonFarbe2.value  = antwortRichtig.value ? "success" : "danger";
  else if (antwortClicked.value == 3)
    buttonFarbe3.value  = antwortRichtig.value ? "success" : "danger";
});
// const weiterClicked = () => {
//     console.log(`weiterClicked`);
//     if (antwortClicked.value == 1) 
//         buttonFarbe1.value = antwortRichtig.value ? "success" : "danger";
//     else if (antwortClicked.value == 2)
//         buttonFarbe2.value  = antwortRichtig.value ? "success" : "danger";
//     else if (antwortClicked.value == 3)
//         buttonFarbe3.value  = antwortRichtig.value ? "success" : "danger";
//     if (!antwortRichtig.value && spielStore.flow == 0.7) {
//         spielStore.flow = 0.71;
//         quizStatus.value = "falsch1";
//     } else if (!antwortRichtig.value && spielStore.flow == 1.11) {
//         spielStore.flow = 0.72;
//         quizStatus.value = "falsch2";
//     } else {
//         spielStore.flow = 0.73;
//         quizStatus.value = "richtig";
//     }
// }
watch(flow, () => {
  console.log(`(scroll tutorial) flow geändert auf ${flow.value}`);
  if (flow.value == 0.9)
  {
    setTimeout(() => {
      swiperInstance.value.slideNext();
    }, 1000 )
  }
  if (flow.value == 0.95) {
    setTimeout(() => {
      swiperInstance.value.slideNext();
    }, 1000 )
  }
})


</script>



<style scoped>
.swiper {
    height: 100%;
}
.swiper-slide {
  /* display: flex;
  justify-content: center;
  align-items: center; */
  height: auto;
  padding: 30px;
}
.posting-slide {
    padding-right: 0px;
    padding-top: 0px;
}
section {
    height: 100vh;
    position: relative;
}
.antwort-buttons {
    margin-top: 100px;
}
.antwort-buttons * {
    margin-bottom: 15px;
    height: 80px;
    /* height: 80px;
    width: 180px; */
}
p {
    font-size: 30px;
}
#content-scroll {
    /* padding: 20px; */
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
    position: absolute;
    bottom: 20px;
    right: 20px;
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