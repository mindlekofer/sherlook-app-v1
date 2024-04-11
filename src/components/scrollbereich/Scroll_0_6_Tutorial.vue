<template>
<div ref="scrollContentA" id="content-scroll">

  <swiper @swiper="onSwiper" @reachEnd="onSliderEndReached" id="swiper-haupt" @activeIndexChange="onSlideChanged" :slidesPerView="1" :spaceBetween="50" :freeMode="false" :scrollbar="false" :navigation="false" :pagination="true" :modules="modules">
    
    <swiper-slide v-if="flow >=0.6">
      <span v-if="spieler=='Watson'">
        <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="230"/>
        <p> Willkommen im Detektivbüro Holmes! </p>
        <p> Mein Name ist Watson, Dr. Watson! </p>
        <p> Seid ihr bereit für diesen rätselhaften Fall? </p>
        <!-- <p style="margin-top: 70px;">
          <i>Wischt mit dem Finger oder drückt auf den grünen Weiter-Button, um auf die nächste Seite zu gelangen. <br>
            Ihr könnt jederzeit wieder zurückblättern, falls ihr etwas vergessen habt.</i>
        </p> -->
      </span>
      <span v-else-if="spieler=='Sherlock'">
        <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="210"/>
        <p>
          Mein Name ist Holmes, Sherlock Holmes. <br>
          Dieser Fall ist ist wirklich außergewöhnlich. 
        </p>
        <p>
          Schauen wir uns ein wenig um. Jede kleine Beobachtung kann später von unschätzbarem Wert sein.
          Seid ihr bereit? 
        </p>
        <!-- <p style="margin-top: 0px;">
          <i>
            Wischt mit dem Finger oder drückt auf den grünen Weiter-Button, um auf die nächste Seite zu gelangen. <br>
            Ihr könnt jederzeit wieder zurückblättern, falls ihr etwas vergessen habt.
          </i>
        </p> -->
      </span>
      <span v-else>
        <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="180"/>
        <p>
          Willkommen im Detektivbüro Holmes! Mein Name ist Enola. Ich bin die Schwester von Sherlock.<br>
        </p>
        <p>
          Was für ein wunderbares Museum – und was für gemeine Diebstähle! Wir müssen den Täter oder die Täterin finden.<br>
          Seid ihr bereit?  
        </p>
        <!-- <p style="margin-top: 20px;">
          <i>
            Wischt mit dem Finger oder drückt auf den grünen Weiter-Button, um auf die nächste Seite zu gelangen. <br>
            Ihr könnt jederzeit wieder zurückblättern, falls ihr etwas vergessen habt.
          </i>
        </p> -->
      </span>
      <!-- <div class="swipe-geste-horizontal" v-if="flow==0.6"></div> -->
      <div class="swipe-geste-horizontal"></div>
      <button-weiter-component class="button-weiter" v-if="flow==0.6" @click="swiperInstance.slideNext();" pulsiert/>
      <button-weiter-component class="button-weiter" v-else-if="flow>0.6" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>

    <!-- 0.7 Quiz -->
    <swiper-slide v-if="flow >= 0.6">
      <span v-if="!antwortClicked">
        <span v-if="spieler=='Watson' && ort=='eg'">
          <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="150"/>
          <p style="margin-top: 0px; font-size: 26px;"> 
            Sehr gut! 
            <br>
            Ich hab eine erste heiße Spur:
            <br>
            Mit der Büste des Museumsgründers, die hier im Erdgeschoss steht, stimmt etwas nicht. <br>
            Habt ihr aufgepasst und wisst, wie der werte Herr heißt?
          </p>
          <p style="margin-top: 0px; font-size: 26px;">
            Drückt auf die richtige Antwort und dann auf den Weiter-Button.
          </p>
        </span>
        <span v-else-if="spieler=='Sherlock' && ort=='eg'">
          <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="180"/>
          <p style="margin-top: 0px; font-size: 26px;">
            Sehr gut! Und aufgepasst, es gibt eine erste heiße Spur: 
            Mit der Büste des Museumsgründers, hier im Erdgeschoss, stimmt etwas nicht. 
            Eine Bartlocke wurde wohl durch eine Fälschung ersetzt! 
            Ihr wisst doch, wie der alte Herr heißt? 
            <br>
            Drückt auf die richtige Antwort und dann auf den Weiter-Button.
          </p>
        </span>
        <span v-else-if="spieler=='Enola' && ort=='eg'">
          <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="160"/>
          <p style="margin-top: 0px; font-size: 26px;">
            Und da ist auch schon die erste heiße Spur: 
            Mit der Büste des Museumsgründers, die hier im Erdgeschoss steht, stimmt etwas nicht. 
            Eine Bartlocke wurde durch eine Fälschung ersetzt! 
            Ihr habt natürlich aufgepasst und wisst, wie der berühmte Herr heißt?
            <br>
            Drückt auf die richtige Antwort und dann auf den Weiter-Button.
          </p>
        </span>
        <span v-else-if="spieler=='Watson' && ort=='og1'">
          <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="150"/>
          <p style="font-size: 28px;"> 
            Sehr gut! Ich habe eine erste heiße Spur:
            Mit dem Schreibtisch des Museumsgründers im Obergeschoss stimmt etwas nicht. 
            Habt ihr aufgepasst und wisst, wie der alte Herr heißt?
            <br>
            Drückt auf die richtige Antwort und dann auf den Weiter-Button.
          </p>
        </span>
        <span v-else-if="spieler=='Sherlock' && ort=='og1'">
          <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="180"/>
          <p style="font-size: 28px;"> 
            Aufgepasst, ich höre von einer ersten heißen Spur: 
            Im Obergeschoss wurde eine Brille durch eine Fälschung ersetzt. 
            Sie lag auf dem alten Schreibtisch des Museumsgründers. 
            Ihr wisst doch, wie der werte Herr heißt?
            <br>
            Drückt auf die richtige Antwort und dann auf den Weiter-Button.
          </p>
        </span>
        <span v-else-if="spieler=='Enola' && ort=='og1'">
          <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="160"/>
          <p style="font-size: 26px;"> 
            Und da ist auch schon die erste heiße Spur: 
            Im Obergeschoss wurde eine Brille durch eine Fälschung ersetzt. 
            Sie lag auf dem alten Schreibtisch des Museumsgründers. 
            Ihr habt natürlich aufgepasst und wisst, wie der berühmte Herr heißt? 
            <br>
            Drückt auf die richtige Antwort und dann auf den Weiter-Button.
          </p>
        </span>
      </span>
      <span v-else-if="!antwortRichtig">
        <img class="spieler" src="assets/img/detektive/watson_enttaeuscht.png" width="210" v-if="spieler=='Watson'"/>
        <img class="spieler" src="assets/img/detektive/sherlock_enttaeuscht.png" width="230" v-else-if="spieler=='Sherlock'"/>
        <img class="spieler" src="assets/img/detektive/enola_enttaeuscht.png" width="210" v-else-if="spieler=='Enola'"/>
        <img class="spieler" src="assets/kopf_mit_hals.svg" width="200" v-else/>
        <p style="margin-top: 90px;"> Die Antwort war leider falsch. </p>
        <p> Versuch es noch einmal!</p>
      </span>
      <span v-else-if="antwortRichtig">
        <span v-if="spieler=='Watson' && ort=='eg'">
          <img class="spieler" src="assets/img/detektive/watson_gluecklich.png" width="210"/>
          <p> 
            Super, das ist richtig! 
          </p>
          <p>
            Und los geht's!
            Sucht die Büste von Ludwig Leiner. 
          </p>
          <!-- <p>
            Drückt auf den grünen Weiter-Button oder wischt mit dem Finger, dann zeige ich Euch den Weg.
          </p> -->
        </span>
        <span v-else-if="spieler=='Sherlock' && ort=='eg'">
          <img class="spieler" src="assets/img/detektive/sherlock_gluecklich.png" width="240"/>
          <p>
            Sehr gut, die Antwort ist richtig, und die Spur ist noch heiß!
          </p>
          <p> 
            Suchen wir die Büste von Ludwig Leiner. 
          </p>
          <!-- <p>
            Drückt auf den grünen Weiter-Button oder wischt mit dem Finger, dann zeige ich Euch den Weg.
          </p> -->
        </span>
        <span v-else-if="spieler=='Enola' && ort=='eg'">
          <img class="spieler" src="assets/img/detektive/enola_gluecklich.png" width="210"/>
          <p> 
            Wunderbar, das fängt gut an! <br>
            Und nun nichts wie hin zu dieser Bartlocke von Ludwig Leiner. 
            <!-- <br>
            Drückt auf den grünen Weiter-Button oder wischt mit dem Finger, dann zeige ich Euch den Weg. -->
          </p>
        </span>
        <span v-else-if="spieler=='Watson' && ort=='og1'">
          <img class="spieler" src="assets/img/detektive/watson_gluecklich.png" width="210"/>
          <p>
            Super, ihr seid Klasse! 
          </p>
          <p>
            Und los geht's! 
            Suchen wir Ludwig Leiner und seinen Schreibtisch. 
          </p>
          <!-- <p>
            Drückt auf den grünen Weiter-Button oder wischt mit dem Finger, dann zeige ich Euch den Weg.
          </p> -->
        </span>
        <span v-else-if="spieler=='Sherlock' && ort=='og1'">
          <img class="spieler" src="assets/img/detektive/sherlock_gluecklich.png" width="220"/>
          <p>
            Sehr gut, die Antwort ist richtig. <br>
            Und die Spur ist noch heiß! Suchen wir die Brille von Ludwig Leiner! 
            <!-- <br> -->
            <!-- Drückt auf den grünen Weiter-Button oder wischt mit dem Finger, dann zeige ich Euch den Weg. -->
          </p>
        </span>
        <span v-else-if="spieler=='Enola' && ort=='og1'">
          <img class="spieler" src="assets/img/detektive/enola_gluecklich.png" width="210"/>
          <p>
            Wunderbar, das fängt gut an! <br>
            Und nun nichts wie hin zu dieser Brille von Ludwig Leiner! 
          </p>
          <!-- <p>
            Drückt auf den grünen Weiter-Button oder wischt mit dem Finger, dann zeige ich Euch den Weg.
          </p> -->
        </span>
      </span>
      <div class="antwort-buttons" v-if="spieler=='Watson'">
        <ion-button :color="buttonFarbe1" :fill="buttonFill1" size="large" expand="block" @click="antwortAusgewaehlt(1, true)">Ludwig Leiner</ion-button>
        <ion-button :color="buttonFarbe2" :fill="buttonFill2" size="large" expand="block" @click="antwortAusgewaehlt(2, false)" :disabled="antwortRichtig">Sherlock Holmes</ion-button>
        <ion-button :color="buttonFarbe3" :fill="buttonFill3" size="large" expand="block" @click="antwortAusgewaehlt(3, false)" :disabled="antwortRichtig">Ludwig van Beethoven</ion-button>
      </div>
      <div class="antwort-buttons" v-else-if="spieler=='Sherlock'">
        <ion-button :color="buttonFarbe2" :fill="buttonFill2" size="large" expand="block" @click="antwortAusgewaehlt(2, false)" :disabled="antwortRichtig">Ludwig van Beethoven</ion-button>
        <ion-button :color="buttonFarbe1" :fill="buttonFill1" size="large" expand="block" @click="antwortAusgewaehlt(1, true)">Ludwig Leiner</ion-button>
        <ion-button :color="buttonFarbe3" :fill="buttonFill3" size="large" expand="block" @click="antwortAusgewaehlt(3, false)" :disabled="antwortRichtig">Ludwig Wittgenstein</ion-button>
      </div>
      <div class="antwort-buttons" v-else>
        <ion-button :color="buttonFarbe2" :fill="buttonFill2" size="large" expand="block" @click="antwortAusgewaehlt(2, false)" :disabled="antwortRichtig">Konrad Ellenrieder</ion-button>
        <ion-button :color="buttonFarbe3" :fill="buttonFill3" size="large" expand="block" @click="antwortAusgewaehlt(3, false)" :disabled="antwortRichtig">Ignaz Heinrich von Wessenberg</ion-button>
        <ion-button :color="buttonFarbe1" :fill="buttonFill1" size="large" expand="block" @click="antwortAusgewaehlt(1, true)">Ludwig Leiner</ion-button>
      </div>
      <button-weiter-component class="button-weiter" v-if="flow==0.79 && antwortRichtig" @click="swiperInstance.slideNext();" pulsiert/>
      <button-weiter-component class="button-weiter" v-else-if="flow>=0.8" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>

    <!-- Pfeil 1 -->
    <swiper-slide v-if="flow >= 0.71">
      <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="200" v-if="spieler=='Watson'"/>
      <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="200" v-else-if="spieler=='Sherlock'"/>
      <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="200" v-else-if="spieler=='Enola'"/>
      <img class="spieler" src="assets/kopf_mit_hals.svg" width="200" v-else/>
      <img class="pfeil" src="assets/objekte/eg/tutorial/tutorial_eg_pfeil_1.png" v-if="ort=='eg'"/>
      <img class="pfeil" src="assets/objekte/og1/tutorial/tutorial_og_pfeil_1.png" v-else-if="ort=='og1'"/>
      <p>
        Folgt dem grünen Pfeil auf dem Foto. <br><br>
        Drückt auf den Weiter-Button oder wischt mit dem Finger, dann zeige ich Euch den nächsten Schritt.
      </p>
      <div class="swipe-geste-horizontal"></div>
      <button-weiter-component class="button-weiter" v-if="flow==0.71" @click="if(!btTrigger)flow=0.72;" :disabled="btTrigger"/>
      <button-weiter-component class="button-weiter" v-else-if="flow==0.72" @click="swiperInstance.slideNext();" pulsiert/>
      <button-weiter-component class="button-weiter" v-else-if="flow>0.72" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>

    <!-- Pfeil 2 -->
    <swiper-slide v-if="flow >= 0.72">
      <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="200" v-if="spieler=='Watson'"/>
      <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="200" v-else-if="spieler=='Sherlock'"/>
      <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="200" v-else-if="spieler=='Enola'"/>
      <img class="spieler" src="assets/kopf_mit_hals.svg" width="200" v-else/>
      <img class="pfeil" src="assets/objekte/eg/tutorial/tutorial_eg_pfeil_2.png" v-if="ort=='eg'"/>
      <img class="pfeil" src="assets/objekte/og1/tutorial/tutorial_og_pfeil_2.png" v-else-if="ort=='og1'"/>
      <p v-if="ort=='eg'">
        Folgt dem grünen Pfeil, dann drückt auf den Weiter-Button oder wischt zur nächsten Seite. 
        <br>
        Braucht ihr noch mehr Hilfe? 
        Dann drückt auf den Button mit der Karte.
      </p>
      <p v-else-if="ort=='og1'" style="font-size: 28px;">
        Folgt dem grünen Pfeil auf dem Foto. 
        Drückt auf den Weiter-Button oder wischt, dann zeige ich Euch den nächsten Schritt. 
        <br>
        Braucht ihr noch mehr Hilfe? 
        Dann drückt auf den Button mit der Karte.
      </p>
      <!-- <button-weiter-component class="button-weiter" v-if="flow==0.72" @click="if(!btTrigger)flow=0.73;" :disabled="btTrigger"/> -->
      <!-- <button-weiter-component class="button-weiter" v-if="flow==0.72" @click="flow=0.73;" :disabled="btTrigger"/> -->
      <button-weiter-component class="button-weiter" v-if="flow==0.72" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else-if="flow>0.72" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />

      <span v-if="ort=='eg'">
        <button-weiter-component class="button-weiter" v-if="flow<0.8" @click="if(!btTrigger)flow=0.8;" :disabled="btTrigger"/>
        <button-weiter-component class="button-weiter" v-else-if="flow==0.8" @click="swiperInstance.slideNext();" pulsiert/>
        <button-weiter-component class="button-weiter" v-else-if="flow>0.8" @click="swiperInstance.slideNext();"/>
        <button-weiter-component class="button-weiter" v-else disabled />
      </span>
      <span v-else-if="ort=='og1'">
        <button-weiter-component class="button-weiter" v-if="flow==0.73" @click="if(!btTrigger)flow=0.74;" :disabled="btTrigger"/>
        <button-weiter-component class="button-weiter" v-else-if="flow==0.74" @click="swiperInstance.slideNext();" pulsiert/>
        <button-weiter-component class="button-weiter" v-else-if="flow>0.74" @click="swiperInstance.slideNext();"/>
        <button-weiter-component class="button-weiter" v-else disabled />
      </span>
    </swiper-slide>

    <!-- Pfeil 3(og1) -->
    <swiper-slide v-if="flow >= 0.73 && ort=='og1'">
      <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="200" v-if="spieler=='Watson'"/>
      <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="200" v-else-if="spieler=='Sherlock'"/>
      <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="200" v-else-if="spieler=='Enola'"/>
      <img class="spieler" src="assets/kopf_mit_hals.svg" width="200" v-else/>
      <img class="pfeil" src="assets/objekte/og1/tutorial/tutorial_og_pfeil_3.png"/>
      <p style="font-size: 26px;">
        Folgt dem grünen Pfeil auf dem Foto. 
        Drückt auf den Weiter-Button oder wischt, dann zeige ich Euch den nächsten Schritt. 
        <br>
        Braucht ihr noch mehr Hilfe? Dann drückt auf den Button mit der Karte.
      </p>
      <button-weiter-component class="button-weiter" v-if="flow==0.73" @click="if(!btTrigger)flow=0.74;" :disabled="btTrigger"/>
      <button-weiter-component class="button-weiter" v-else-if="flow==0.74" @click="swiperInstance.slideNext();" pulsiert/>
      <button-weiter-component class="button-weiter" v-else-if="flow>0.74" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>

    <swiper-slide v-if="flow >= 0.74 && ort=='og1'">
      <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="200" v-if="spieler=='Watson'"/>
      <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="200" v-else-if="spieler=='Sherlock'"/>
      <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="200" v-else-if="spieler=='Enola'"/>
      <img class="spieler" src="assets/kopf_mit_hals.svg" width="200" v-else/>
      <img class="pfeil" src="assets/objekte/og1/tutorial/tutorial_og_pfeil_4.png"/>
      <p style="font-size: 26px;">
        Folgt dem grünen Pfeil auf dem Foto. 
        Drückt auf den Weiter-Button oder wischt, dann zeige ich Euch den nächsten Schritt. 
        <br>
        Braucht ihr noch mehr Hilfe? Dann drückt auf den Button mit der Karte.
      </p>
      <button-weiter-component class="button-weiter" v-if="flow<0.8" @click="if(!btTrigger)flow=0.8;" :disabled="btTrigger"/>
      <button-weiter-component class="button-weiter" v-else-if="flow==0.8" @click="swiperInstance.slideNext();" pulsiert/>
      <button-weiter-component class="button-weiter" v-else-if="flow>0.8" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>

    <!-- Pfeil 3(eg) 5(og1) und Lupe -->
    <swiper-slide v-if="flow>=0.8">
      <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="200" v-if="spieler=='Watson'"/>
      <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="200" v-else-if="spieler=='Sherlock'"/>
      <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="200" v-else-if="spieler=='Enola'"/>
      <img class="spieler" src="assets/kopf_mit_hals.svg" width="200" v-else/>
      <img class="pfeil pfeil-kleiner" src="assets/objekte/eg/tutorial/tutorial_eg_pfeil_3.png" v-if="ort=='eg'"/>
      <img class="pfeil pfeil-kleiner" src="assets/objekte/og1/tutorial/tutorial_og_pfeil_5.png" v-else-if="ort=='og1'"/>
      <p v-if="ort=='eg' && spieler=='Watson'" style="font-size: 26px;">
        Achtet jetzt auf die Hightech-Lupe. Sie kann Fälschungen erkennen!
        Wenn etwas in der Umgebung nicht stimmt, fängt sie an zu blinken, erst langsam, dann immer schneller.
        <br><br>
        Seht ihr die Büste von Ludwig Leiner? 
        Dann schaltet die Kamera an und richtet sie auf sein Gesicht.
      </p>
      <p v-else-if="ort=='eg' && spieler=='Sherlock'" style="font-size: 26px;">
        Achtet jetzt auf die Hightech-Lupe. Sie kann Fälschungen erkennen! 
        Je heller und schneller sie blinkt, desto näher seid ihr an einem Tatort. 
        <br><br>
        Seht ihr die Büste von Ludwig Leiner? 
        Dann schaltet die Kamera an und richtet sie auf sein Gesicht.
      </p>
      <p v-else-if="ort=='eg' && spieler=='Enola'" style="font-size: 26px;">
        Gleich könnt ihr sehen, was die Hightech-Lupe drauf hat: Sie kann Fälschungen erkennen!
        Je heller und schneller sie aufleuchtet, desto heißer ist die Spur: 
        Ein Tatort muss dann ganz in der Nähe sein! 
        <br><br>
        Seht ihr die Büste von Ludwig Leiner? 
        Dann schaltet die Kamera an und richtet sie auf sein Gesicht.
      </p>
      <p v-else-if="ort=='og1' && spieler=='Watson'" style="font-size: 26px;">
        Achtet jetzt auf die Hightech-Lupe. 
        Sie kann Fälschungen erkennen! 
        Wenn etwas in der Umgebung nicht stimmt, fängt sie an zu blinken, erst langsam, dann immer schneller. 
        <br><br>
        Seht ihr Ludwig Leiner neben seinem Schreibtisch? 
        Dann schaltet die Kamera an und richtet sie auf sein Gesicht mit der Brille.
      </p>
      <p v-else-if="ort=='og1' && spieler=='Sherlock'" style="font-size: 26px;">
        Achtet jetzt auf die Hightech-Lupe. 
        Sie kann Fälschungen erkennen! 
        Je heller und schneller sie blinkt, desto näher seid ihr an einem Tatort. 
        <br><br>
        Seht ihr Ludwig Leiner neben seinem Schreibtisch? 
        Dann schaltet die Kamera an und richtet sie auf sein Gesicht mit der Brille.
      </p>
      <p v-else-if="ort=='og1' && spieler=='Enola'" style="font-size: 26px;">
        Gleich könnt ihr sehen, was die Hightech-Lupe drauf hat: 
        Sie kann Fälschungen erkennen! 
        Je heller und schneller sie aufleuchtet, desto heißer ist eure Spur: 
        Ein Tatort muss ganz in der Nähe sein. 
        <br>
        Seht ihr Ludwig Leiner neben seinem Schreibtisch? 
        Dann schaltet die Kamera an und richtet sie auf sein Gesicht mit der Brille.
      </p>
      <button-weiter-component class="button-weiter" v-if="flow==0.8" @click="if(!btTrigger)flow=0.9;" :disabled="btTrigger"/>
      <button-weiter-component class="button-weiter" v-else-if="flow>0.8" @click="swiperInstance.slideNext();" pulsiert/>
      <!-- <button-weiter-component class="button-weiter" v-else-if="flow>0.8" @click="swiperInstance.slideNext();"/> -->
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>

    <!-- Detail erkannt -->
    <swiper-slide v-if="flow > 0.8" class="leiner-slide">
      <img src="assets/img/leiner.png" width="190" style="margin-left: auto; margin-right: auto; display: block;"/>
      <p v-if="ort=='eg' && spieler=='Watson'" style="font-size: 28px;">
        Ich bin der Geist von Ludwig Leiner! 
        Ich grüße das Team um Dr. Watson. 
        Gut, dass ihr mich erkannt habt. 
        Bei meinem Barte: Ich ruhe nicht, bis diese Diebstähle und Fälschungen aufgeklärt sind!
        Wollt ihr mir helfen? 
        <br><br>
        Dann drückt auf den Weiter-Button oder wischt mit dem Finger.
      </p>
      <p v-else-if="ort=='eg' && spieler=='Sherlock'" style="font-size: 26px;">
        Hier spricht der Geist von Ludwig Leiner! 
        Ich grüße das Team um den berühmten Sherlock Holmes. 
        Danke, dass ihr mir zu Hilfe eilt. 
        Bei meinem Barte: Ich ruhe nicht, bis diese Diebstähle und Fälschungen aufgeklärt sind.
        <br><br>
        Wollt ihr mir helfen? 
        Dann drückt auf den Weiter-Button oder wischt mit dem Finger.
      </p>
      <p v-else-if="ort=='eg' && spieler=='Enola'" style="font-size: 26px;">
        Hier spricht der Geist von Ludwig Leiner! 
        Ich grüße Enola Holmes und ihre Helferinen und Helfer! 
        Diese verfluchten Diebstähle und Fälschungen... 
        Bei meinem Barte: Ich ruhe nicht, bis diese ganze Geschichte aufgeklärt ist.
        <br><br>
        Wollt ihr mir helfen und mein Vermächtnis beschützen? 
        Dann drückt auf den Weiter-Button oder wischt mit dem Finger.
      </p>
      <p v-else-if="ort=='og1' && spieler=='Watson'" style="font-size: 28px;">
        Ich bin der Geist von Ludwig Leiner! 
        Ich grüße das Team um Dr. Watson. Gut, dass ihr mich gefunden und erkannt habt. 
        Ich ruhe nicht, bis diese Diebstähle und Fälschungen aufgeklärt sind!
        <br><br>
        Wollt ihr mir helfen? Dann drückt auf den Weiter-Button oder wischt mit dem Finger.
      </p>
      <p v-else-if="ort=='og1' && spieler=='Sherlock'" style="font-size: 28px;">
        Hier spricht der Geist von Ludwig Leiner! Ich grüße das Team um den berühmten Sherlock Holmes. 
        Mit meiner falschen Brille sehe ich leider schlecht. 
        Aber ich ruhe nicht, bis diese Diebstähle und Fälschungen aufgeklärt sind.
        <br><br>
        Wollt ihr mir helfen? Dann drückt auf den Weiter-Button oder wischt mit dem Finger.
      </p>
      <p v-else-if="ort=='og1' && spieler=='Enola'" style="font-size: 26px;">
        Hier spricht der Geist von Ludwig Leiner! 
        Ich grüße Enola Holmes und ihre Helferinen und Helfer! 
        Diese verfluchten Diebstähle und Fälschungen... 
        Mit dieser falschen Brille sehe ich leider schlecht. 
        Aber ich ruhe nicht, bis alles aufgeklärt ist.
        <br>
        Wollt ihr mir mit Eurer Hightech-Lupe helfen und mein Vermächtnis beschützen? 
        Dann drückt auf den Weiter-Button oder wischt mit dem Finger.
      </p>
      <!-- <button-weiter-component class="button-weiter" v-if="flow==0.81" @click="if(!btTrigger)flow=0.82;" :disabled="btTrigger"/> -->
      <button-weiter-component class="button-weiter" v-if="flow>0.8" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else-if="flow>0.9" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>

    <!-- 0.9.1 Führung durch Leiner Schritt 1 -->
    <swiper-slide v-if="flow > 0.8" class="leiner-slide">
      <img class="spieler" src="assets/img/leiner.png" width="180"/>
      <p v-if="spieler=='Watson'" style="font-size: 30px;">
        Kennt ihr mein Museum und wollt gleich zur nächsten heißen Spur? 
        Dann könnt ihr das Tutorial überspringen.
        Sonst nehme ich Euch mit auf einen kleinen Rundgang. 
        <br><br>
        Drückt dann auf den Weiter-Button oder wischt mit dem Finger.
      </p>
      <p v-else-if="spieler=='Sherlock'" style="font-size: 30px;">
        Kennt ihr mein Museum und wollt gleich der nächsten heißen Spur folgen? 
        Dann könnt ihr das Tutorial überspringen.
        Sonst nehme ich Euch gerne mit auf einen kleinen Rundgang. 
        <br><br>
        Drückt dann auf den Weiter-Button oder wischt mit dem Finger.
      </p>
      <p v-else-if="spieler=='Enola'" style="font-size: 30px;">
        Kennt ihr mein schönes Museum und seid bereit, der nächsten Spur zu folgen? 
        Dann könnt ihr das Tutorial überspringen.
        Sonst nehme ich Euch gerne mit auf einen kleinen Rundgang! 
        <br><br>
        Drückt dann auf den Weiter-Button oder wischt mit dem Finger.
      </p>
      <button-weiter-component class="button-weiter" v-if="flow>0.8" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else-if="flow>0.9" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>

    <!-- 0.9.2 Führung durch Leiner EG Schritt 2/1 -->
    <swiper-slide v-if="flow > 0.8" class="leiner-slide">
      <img class="spieler" src="assets/img/leiner.png" width="180"/>
      <p v-if="ort=='eg' && spieler=='Watson'" style="font-size: 30px;">
        Diese Vitrinen habe ich noch eigenhändig eingeräumt: alles uralte Dinge, die im Boden unserer schönen Heimat gefunden wurden!
        <br><br>
        Habt ihr genug gesehen? Dann drückt auf den Weiter-Button oder wischt.
      </p>
      <p v-else-if="ort=='eg' && spieler=='Sherlock'" style="font-size: 30px;">
        Sehr gut, schaut Euch um. Diese Vitrinen hier habe ich noch eigenhändig bestückt: Alles uralte Dinge, die fleißige Forscherinnen und Forscher aus unserem heimatlichen Boden ausgegraben haben.
        <br><br>
        Habt ihr genug gesehen? Dann zeige ich Euch den nächsten Raum. Drückt auf den Weiter-Button oder wischt.
      </p>
      <p v-else-if="ort=='eg' && spieler=='Enola'" style="font-size: 30px;">
        Liebe Freundinnen und Freunde! Schaut Euch um und atmet den Geist meines "Leinersaals": All diese Vitrinen habe ich eigenhändig entworfen und eingeräumt! Sie versammeln uralte Dinge, die fleißige Forscherinnen und Forscher im Boden unserer schönen Heimat entdeckt haben.
        <br><br>
        Habt ihr genug gesehen? Dann zeige ich Euch den nächsten Raum. Drückt auf den Weiter-Button oder wischt.
      </p>
      <p v-else-if="ort=='og1' && spieler=='Watson'" style="font-size: 30px;">
        Gut, beginnen wir gleich hier neben meinem Schreibtisch: Habt ihr den schönen Biedermeier-Schrank gesehen? Solch schöne Dinge hatte ich noch als Kind in den Händen.
        <br><br>
        Sollen wir in den nächsten Raum gehen? Dann drückt auf den Weiter-Button oder wischt.
      </p>
      <p v-else-if="ort=='og1' && spieler=='Sherlock'" style="font-size: 30px;">
        Gut! Dann beginnen wir gleich hier. Ich bin 1830 geboren, mitten in der Biedermeier-Zeit. Dazu passt der Schrank mit den schönen Sachen hier neben meinem Schreibtisch. Leider sehr beliebt bei diesem Dieb oder dieser Diebin!
        <br><br>
        Sollen wir in den nächsten Raum gehen? Dann drückt auf den Weiter-Button oder wischt.
      </p>
      <p v-else-if="ort=='og1' && spieler=='Enola'" style="font-size: 30px;">
        Liebe Freundinnen und Freunde! Ich bin 1830 geboren, mitten in der Biedermeier-Zeit. Im schönen Schrank neben meinem Schreibtisch seht ihr Dinge, die ich als Konstanzer Bub' "aus gutem Hause" noch in Händen hatte. Dann kam die Revolution 1848 und alles wurde anders...
        <br><br>
        Habt ihr genug gesehen? Dann drückt auf den Weiter-Button oder wischt.
      </p>
      <button-weiter-component class="button-weiter" v-if="flow>0.8" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else-if="flow>0.9" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>

    <!-- 0.9.3 Führung durch Leiner EG Schritt 2/2 -->
    <swiper-slide v-if="flow > 0.8" class="leiner-slide">
      <img class="spieler" src="assets/img/leiner.png" width="180"/>
      <img class="pfeil" src="assets/objekte/eg/tutorial/tutorial_eg_pfeil_4.png" v-if="ort=='eg'"/>
      <img class="pfeil pfeil-kleiner" src="assets/objekte/og1/tutorial/tutorial_og_pfeil_6.png" v-else-if="ort=='og1'"/>
      <p v-if="ort=='eg'">
        Folgt dem grünen Pfeil. 
        Geht in den Raum mit den purpurfarbenen Vitrinen. 
        <br><br>
        Drückt auf den Weiter-Button oder wischt.
      </p>
      <p v-else-if="ort=='og1'">
        Folgt dem grünen Pfeil und drückt auf den Weiter-Button oder wischt.
      </p>
      <button-weiter-component class="button-weiter" v-if="flow>0.8" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else-if="flow>0.9" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>

    <!-- 0.9.3 Führung durch Leiner EG Schritt 3/1 -->
    <swiper-slide v-if="flow > 0.8" class="leiner-slide">
      <img class="spieler" src="assets/img/leiner.png" width="180"/>
      <img class="pfeil pfeil-kleiner" src="assets/objekte/eg/tutorial/tutorial_eg_pfeil_5.png" v-if="ort=='eg'"/>
      <img class="pfeil pfeil-kleiner" src="assets/objekte/og1/tutorial/tutorial_og_pfeil_7.png" v-else-if="ort=='og1'"/>
      <p v-if="ort=='eg' && spieler=='Watson'" style="font-size: 28px;">
        In diesem Raum findet ihr vieles zur Geschichte unserer schönen Stadt Konstanz, alles sehr kostbar und spannend!
        Habt ihr auch die schöne Holzdecke gesehen? Dann folgt weiter dem grünen Pfeil.
        <br>
        Drückt auf den Weiter-Button oder wischt.
      </p>
      <p v-else-if="ort=='eg' && spieler=='Sherlock'" style="font-size: 26px;">
        Hier findet ihr kostbare Dinge zur Geschichte unserer schönen Stadt Konstanz am Bodensee. 
        Hier stritten Bürgerzünfte und verschiedene Stadtherren miteinander. 
        Bis 1821 war die Stadt der Sitz eines katholischen Bischofs.
        Werft auch einen Blick auf die schöne Holzdecke und folgt dann dem grünen Pfeil. 
        <br>
        Drückt auf den Weiter-Button oder wischt.
      </p>
      <p v-else-if="ort=='eg' && spieler=='Enola'" style="font-size: 24px;">
        In diesem Raum zeugen viele kostbare Dinge von der Geschichte unserer schönen Stadt Konstanz am Bodensee. 
        Hier stritten Bürgerzünfte und verschiedene Stadtherren miteinander. 
        Wusstet ihr, dass die Stadt bis 1821 Sitz eines katholischen Bischofs war?
        Werft auch einen Blick auf die schöne Holzdecke und folgt dann weiter dem grünen Pfeil. 
        Drückt auf den Weiter-Button oder wischt.
      </p>
      <p v-else-if="ort=='og1' && spieler=='Watson'" style="font-size: 30px;">
        Im Raum des 18. und 19. Jahrhunderts hängen viele meiner Lieblingsgemälde!
        <br>
        Habt ihr auch die schönen Vitrinen gesehen? Dann drückt auf den Weiter-Button oder wischt.
      </p>
      <p v-else-if="ort=='og1' && spieler=='Sherlock'" style="font-size: 28px;">
        Im Raum des 18. und 19. Jahrhunderts hängen viele meiner Lieblingsgemälde! 
        Einige davon hat Marie Ellenrieder gemalt.
        <br><br>
        Habt ihr auch die schönen Vitrinen gesehen? 
        Dann drückt auf den Weiter-Button oder wischt.
      </p>
      <p v-else-if="ort=='og1' && spieler=='Enola'" style="font-size: 28px;">
        Im Raum des 18. und 19. Jahrhunderts hängen viele meiner Lieblingsgemälde! 
        Einige davon hat Marie Ellenrieder gemalt, meine bemerkenswerte Zeitgenossin! 
        Wie war ich traurig, als sie 1863 in Konstanz gestorben ist.
        <br>
        Habt ihr auch die schönen Vitrinen gesehen? 
        Dann drückt auf den Weiter-Button oder wischt.
      </p>
      <button-weiter-component class="button-weiter" v-if="flow>0.8" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else-if="flow>0.9" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>

    <swiper-slide v-if="flow > 0.8 && ort=='og1'" class="leiner-slide">
      <img class="spieler" src="assets/img/leiner.png" width="180"/>
      <img class="pfeil" src="assets/objekte/og1/tutorial/tutorial_og_pfeil_8.png" />
      <p>
        Folgt dem grünen Pfeil und drückt auf den Weiter-Button oder wischt.
      </p>
      <button-weiter-component class="button-weiter" v-if="flow>0.8" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else-if="flow>0.9" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>

    <swiper-slide v-if="flow > 0.8 && ort=='og1'" class="leiner-slide">
      <img class="spieler" src="assets/img/leiner.png" width="180"/>
      <img class="pfeil" src="assets/objekte/og1/tutorial/tutorial_og_pfeil_9.png" />
      <p>
        Folgt dem grünen Pfeil und drückt auf den Weiter-Button oder wischt.
      </p>
      <button-weiter-component class="button-weiter" v-if="flow>0.8" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else-if="flow>0.9" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>

    <swiper-slide v-if="flow > 0.8 && ort=='og1'" class="leiner-slide">
      <img class="spieler" src="assets/img/leiner.png" width="180"/>
      <img class="pfeil" src="assets/objekte/og1/tutorial/tutorial_og_pfeil_10.png" />
      <p>
        Folgt dem grünen Pfeil und drückt auf den Weiter-Button oder wischt.
      </p>
      <button-weiter-component class="button-weiter" v-if="flow>0.8" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else-if="flow>0.9" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>

    <swiper-slide v-if="flow > 0.8 && ort=='og1'" class="leiner-slide">
      <img class="spieler" src="assets/img/leiner.png" width="180"/>
      <img class="pfeil pfeil-kleiner" src="assets/objekte/og1/tutorial/tutorial_og_pfeil_11.png" />
      <p v-if="spieler=='Watson'" style="font-size: 30px;">
        Nun steht ihr in einem meiner Lieblingsräume mit Kunst aus den alten Kirchen von Konstanz.
        Habt ihr auch die alte Holztreppe und die Wandmalereien bewundert? 
        Dann drückt auf den Weiter-Button oder wischt.
      </p>
      <p v-else-if="spieler=='Sherlock'" style="font-size: 28px;">
        Nun steht ihr in einem meiner Lieblingsräume mit Bildern und Objekten aus den alten Kirchen von Konstanz. 
        Ja, mein Rosgartenmuseum ist auch ein richtig tolles Kunstmuseum!
        Und habt ihr auch die alte Holztreppe und die Reste von Wandmalereien bewundert? 
        Dann drückt auf den Weiter-Button oder wischt.
      </p>
      <p v-else-if="spieler=='Enola'" style="font-size: 28px;">
        Nun steht ihr in einem meiner Lieblingsräume mit Kunst aus den alten Kirchen von Konstanz. 
        Ja, mein Rosgartenmuseum ist auch ein richtig tolles Kunstmuseum!
        Und habt ihr den Raum mit seiner alten Holztreppe und den Wandmalereien bewundert? 
        Dann drückt auf den Weiter-Button oder wischt.
      </p>
      <button-weiter-component class="button-weiter" v-if="flow>0.8" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else-if="flow>0.9" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
      <button-weiter-component class="button-weiter" v-if="flow>0.8" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else-if="flow>0.9" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>


    <!-- 0.9.3 Führung durch Leiner EG (4) -->


    <swiper-slide v-if="flow >= 0.9 && ort=='og1'" class="leiner-slide">
      <img class="spieler" src="assets/img/leiner.png" width="180"/>
      <!-- <img class="pfeil pfeil-kleiner" src="assets/objekte/og1/tutorial/tutorial_og_pfeil_11.png" /> -->
      <p v-if="spieler=='Watson'" style="font-size: 30px;">
        Wir sind in der guten alten Stube meines Hauses angekommen. 
        <br><br>
        Habt ihr die Wappen an der Decke gesehen? Und die schönen Glasfenster? 
        Dann drückt auf den Weiter-Button.
      </p>
      <p v-else-if="spieler=='Sherlock'" style="font-size: 30px;">
        Wir sind in der guten alten Stube meines Hauses angekommen. 
        Schon vor über 500 Jahren haben hier Handwerker mit ihrer Zunft getagt, getrunken und gelacht! 
        <br><br>
        Habt ihr die Wappen an der Decke gesehen? Und die schönen Glasfenster? 
        Dann drückt auf den Weiter-Button.
      </p>
      <p v-else-if="spieler=='Enola'" style="font-size: 30px;">
        Wir sind in der guten alten Stube meines Hauses angekommen. 
        Schon vor über 500 Jahren haben hier Handwerker mit ihrer Zunft getagt, getrunken und gelacht! 
        Zu gerne wüsste ich, wie es damals hier zugegangen ist.
        <br><br>
        Habt ihr die Wappen an der Decke gesehen? Und die schönen Glasfenster? 
        Dann drückt auf den Weiter-Button.
      </p>
      <button-weiter-component class="button-weiter" v-if="flow>0.9" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else-if="flow>=0.9" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>


    <swiper-slide v-if="flow >= 0.9" class="leiner-slide">
      <img class="spieler" src="assets/img/leiner.png" width="180"/>
      <img class="pfeil pfeil-kleiner" src="assets/objekte/eg/tutorial/tutorial_eg_pfeil_6.png" v-if="ort=='eg'"/>
      <p v-if="ort=='eg' && spieler=='Watson'" style="font-size: 30px;">
        Oh Schreck, ein Skelett! Und das ist leider nicht alles: 
        Es gibt einen neuen Diebstahl! 
        <br><br>
        Geht schnell in die Detektivecke und drückt auf den grünen Button.
      </p>
      <p v-else-if="ort=='eg' && spieler=='Sherlock'" style="font-size: 28px;">
        Oh Schreck ein Skelett! Aus einem römischen Grab in Konstanz.
        Und auch mir lässt der Dieb keine Ruhe. 
        <br><br>
        Es gibt wohl einen neuen Diebstahl! Geht schnell in die Detektivecke und drückt auf den grünen Button.
      </p>
      <p v-else-if="ort=='eg' && spieler=='Enola'" style="font-size: 28px;">
        Oh Schreck ein Skelett! Aus einem römischen Grab in Konstanz.
        Und das ist leider nicht alles: auch der Dieb oder die Diebin lassen uns keine Ruhe.
        <br><br>
        Geht schnell zum Detektivbüro. Drückt auf den grünen Button und der Fall kann beginnen...
      </p>
      <p v-else-if="ort=='og1' && spieler=='Watson'" style="font-size: 30px;">
        Es gibt eine neue heiße Spur! 
        <br><br>
        Geht schnell zum Detektivlogo an der Eingangswand: Der Fall kann beginnen
      </p>
      <p v-else-if="ort=='og1' && spieler=='Sherlock'" style="font-size: 30px;">
        Was höre ich da? Es gibt eine neue heiße Spur? 
        <br><br>
        Geht schnell zum Detektivlogo, das an der Eingangswand hängt und der Fall kann beginnen.
      </p>
      <p v-else-if="ort=='og1' && spieler=='Enola'" style="font-size: 30px;">
        Aber was höre ich da? Es gibt eine neue heiße Spur? 
        <br><br>
        Geht schnell zum Detektivlogo, das an der Eingangswand hängt und der Fall kann beginnen.
      </p>
      <button-weiter-component class="button-weiter" v-if="flow==0.9" @click="if(!btTrigger)flow=0.95;" :disabled="btTrigger"/>
      <button-weiter-component class="button-weiter" v-else-if="flow>=0.95" @click="flow=1.0" pulsiert/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>

  </swiper>
</div>
</template>


<script setup lang="ts">
// Imports //
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useSpielStore } from '@/stores/SpielStore'
import { IonButton, isPlatform } from '@ionic/vue';
import ButtonWeiterComponent from '../ButtonWeiterComponent.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation, FreeMode, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';
import { useBeaconStore } from '@/stores/BeaconStore';

const props = defineProps( {
    empfang: {
      type: Number,
      default: 0
    },
  });

// Store //
const spielStore = useSpielStore();
const { flow, ort, spieler, btTrigger, kameraTrigger, slideNr} = storeToRefs(spielStore);
console.log(`flow: ${flow}`);

// Swiper //
const displayScrollRunterPfeil = ref(true);
const modules = [Pagination, Navigation, FreeMode, Scrollbar];
const swiperInstance = ref();
function onSwiper(swiper : any) {
    swiperInstance.value = swiper;
}
function onSliderEndReached() {
  console.log('onSliderEndReached');
  if (flow.value == 0.6)
  {
    flow.value = 0.7;
  }
  console.log("aktiver Slide: ", slideNr);
}
function onVerticalSliderEndReached() {
  console.log('onVerticalSliderEndReached');
  displayScrollRunterPfeil.value = false;
}

function onSlideChanged() {
  slideNr.value = swiperInstance.value.activeIndex;
  console.log("Slide changed: ", slideNr.value);
}

// Quiz //
const buttonFarbe1 = ref("primary");
const buttonFarbe2 = ref("primary");
const buttonFarbe3 = ref("primary");
type ButtonFillType = 'clear' | 'outline' | 'solid' | 'default';
const buttonFill1 = ref<ButtonFillType>("outline");
const buttonFill2 = ref<ButtonFillType>("outline");
const buttonFill3 = ref<ButtonFillType>("outline");

const antwortClicked = ref(0);
const antwortRichtig = ref(false);

// Flow //
watch(flow, () => {
  console.log(`(scroll tutorial) flow geändert auf ${flow.value}`);
  if (flow.value == 0) {
    antwortClicked.value = 0;
    antwortRichtig.value = false;
    swiperInstance.value.slideTo(0);
  }
  if (flow.value <= 0.7) {
    antwortClicked.value = 0;
    antwortRichtig.value = false;
    buttonFarbe1.value = "primary";
    buttonFarbe2.value = "primary";
    buttonFarbe3.value = "primary";
    buttonFill1.value = "outline";
    buttonFill2.value = "outline";
    buttonFill3.value = "outline";
  }
  if (flow.value == 0.9)
  {
    setTimeout(() => {
      if (ort.value=='eg')
        swiperInstance.value.slideTo(5);
      else if (ort.value=='og1')
        swiperInstance.value.slideTo(7);
    }, 1000 )
  }
});

function antwortAusgewaehlt(nr : number, richtig : boolean) {
  console.log("antwort: "+nr+" richtig: "+richtig);
  antwortRichtig.value = richtig;
  antwortClicked.value = nr;
  buttonFill1.value = nr == 1 ? "solid" : "outline";
  buttonFill2.value = nr == 2 ? "solid" : "outline";
  buttonFill3.value = nr == 3 ? "solid" : "outline";
  if (nr == 1) 
    buttonFarbe1.value = richtig ? "success" : "danger";
  else if (nr == 2)
    buttonFarbe2.value  = richtig ? "success" : "danger";
  else if (nr == 3)
    buttonFarbe3.value  = richtig ? "success" : "danger";
  else {
    buttonFarbe1.value  = "primary";
    buttonFarbe2.value  = "primary";
    buttonFarbe3.value  = "primary";
  }
  if (richtig && flow.value < 0.71) {
    // flow = 0.71;
    // flow.value = 0.79;
    flow.value = 0.8;
  }
}

</script>

<style scoped>
.leiner-slide {
  background-color: rgb(110, 107, 102);
  color: white;
  /* background-color: rgb(178, 178, 178); */
}
.swipe-geste-horizontal {
  position: absolute;
  left: 200px;
  bottom: 60px;
  width: 50px;
  height: 50px;
  background-color: black;
  border-radius: 50%;
  opacity: 50%;
  /* margin-right: auto;
  margin-left: auto; */
  animation: swipe-horizontal-animation 4s ease-in-out infinite;
}
/* @keyframes swipe-horizontal-animation {
  0% {
    transform: translateX(+50px);
    opacity: 10%;
  }
  20% {
    transform: translateX(+50px);
    opacity: 40%;
  }
  75% {
    transform: translateX(-50px);
    opacity: 40%;
  }
  100% {
    transform: translateX(-50px);
    opacity: 10%;
  }
} */
@keyframes swipe-horizontal-animation {
  0% {
    transform: translateX(+50px);
    opacity: 10%;
  }
  10% {
    transform: translateX(+50px);
    opacity: 40%;
  }
  40% {
    transform: translateX(-50px);
    opacity: 40%;
  }
  50% {
    transform: translateX(-50px);
    opacity: 10%;
  }
  60% {
    transform: translateX(-50px);
    opacity: 40%;
  }
  90% {
    transform: translateX(+50px);
    opacity: 40%;
  }
  100% {
    transform: translateX(+50px);
    opacity: 10%;
  }
}
i {
  color: grey;
  font-size: 24px;
}
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
  padding: 0px;
  padding-bottom: 30px;
  /* background-image: url('assets/img/scroll_pfeil.svg'); */
  /* background-image: url('./../../assets/scroll_pfeil_runter.svg'); */
}
section {
  height: 100vh;
  position: relative;
}
.antwort-buttons {
  /* margin-bottom: 90px; */
  position: absolute;
  /* bottom: 110px; */
  bottom: 70px;
  left: 0px;
  width: 100%;
  padding: 20px;
}
.antwort-buttons * {
  margin-bottom: 15px;
  height: 80px;
}
p {
  font-size: 30px;
}
#content-scroll {
  /* padding: 20px; */
  height: 100%;
}
.spieler {
  position: relative;
  margin: 20px;
  margin-right: 0px;
  margin-top: 0px;
  /* transform: scaleX(-1); */
  float: right;
  z-index: 5;
}
.button-weiter {
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
.pfeil {
  position: relative;
  top: 0px;
  left: 0px;
  /* margin-left: 30px; */
  /* margin-right: auto; */
  width: 310px;
  transform: translate(30px, 30px) scale(120%);
  margin-bottom: 60px;
  z-index: 4;
}
.pfeil-kleiner {
  width: 260px;
}
.pfeile-zusammen {
  display: flex;
  position: absolute;
  /* background-color: yellow; */
  bottom: 150px;
  width: 200px;
  height: 170px;
}
.pfeile-zusammen img {
  /* padding-left: 20px; */
  max-width: 100%;
  max-height: 100%;
  padding: 10px;
}
.scroll-pfeil {
  position: fixed;
  bottom: 80px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  right: 100px;
  width: 200px;
  transform: translate(-50%, 0);
    animation: swipe-runter-animation 1s ease-in-out infinite alternate;
}

@keyframes swipe-runter-animation {
  0% {
    opacity: 50%;
  }
  100% {
    opacity: 75%;
    transform: translate(-50%, 20px);
  }
}
</style>