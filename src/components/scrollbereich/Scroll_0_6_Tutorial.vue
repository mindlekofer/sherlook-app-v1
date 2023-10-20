<template>
<div ref="scrollContentA" id="content-scroll">

    <swiper @swiper="onSwiper" @reachEnd="onSliderEndReached" id="swiper-haupt" :slidesPerView="1" :spaceBetween="50" :freeMode="false" :scrollbar="false" :navigation="false" :pagination="true" :modules="modules">
        
        <swiper-slide v-if="spielStore.flow >=0.6">
          <span v-if="spielStore.spieler=='Watson'">
            <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="230"/>
            <p> Willkommen im Detektivbüro Holmes! </p>
            <p> Mein Name ist Watson, Dr. Watson! </p>
            <p> Wie sagt doch Sherlock immer: <br>Als erstes muss man sich den Tatort genau anschauen. </p>    
            <p> Seid ihr bereit? </p>
            <p>
              <i>Swiped oder drückt den grünen Weiter-Button um auf die nächste Seite zu gelangen<br>
              Ihr könnt zu jeder Zeit auch wieder zurückblättern falls ihr was vergessen habt.</i>
            </p>
          </span>
          <span v-else-if="spielStore.spieler=='Sherlock'">
            <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="250"/>
            <p> Mein Name ist Holmes, Sherlock Holmes. </p>
            <p> Lasst uns den Tatort genau anschauen. Jede kleine Beobachtung kann später von unschätzbarem Wert sein. </p>
            <p> Seid ihr bereit? </p>
            <p>
              <i>Swiped oder drückt den grünen Weiter-Button um auf die nächste Seite zu gelangen<br>
              Ihr könnt zu jeder Zeit auch wieder zurückblättern falls ihr was vergessen habt.</i>
            </p>
          </span>
          <span v-else>
            <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="220"/>
            <p> Mein Name ist Enola Holmes. </p>
            <p> Diese Detaildiebe machen mich wirklich neugierig! </p>
            <p> Schauen wir uns um, in diesem wunderbaren Museum... </p>
            <p> Seid ihr bereit? </p>
            <p>
              <i>Swiped oder drückt den grünen Weiter-Button um auf die nächste Seite zu gelangen. <br>
              Ihr könnt zu jeder Zeit auch wieder zurückblättern falls ihr was vergessen habt.</i>
            </p>
          </span>
          <!-- <div class="swipe-geste-vertikal" v-if="spielStore.flow==0.6"></div> -->
          <div class="swipe-geste-vertikal"></div>
          <button-weiter-component class="button-weiter" v-if="spielStore.flow==0.6" @click="swiperInstance.slideNext();" pulsiert/>
          <button-weiter-component class="button-weiter" v-else-if="spielStore.flow>0.6" @click="swiperInstance.slideNext();"/>
          <button-weiter-component class="button-weiter" v-else disabled />
        </swiper-slide>

        <swiper-slide v-if="spielStore.flow >= 0.6">
          <span v-if="!antwortClicked">
            <span v-if="spielStore.spieler=='Watson'">
              <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="210"/>
              <p style="margin-top: 50px;"> Hier im Erdgeschoss soll es eine Büste des Museumsgründers geben! </p>
              <p> Wisst ihr, wie er heißt? </p>
            </span>
            <span v-else-if="spielStore.spieler=='Sherlock'">
              <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="230"/>
              <p style="margin-top: 50px;"> Hier im Erdgeschoss gibt es eine Büste des Museumsgründers! </p>
              <p> Wisst ihr, wie er heißt? </p>
            </span>
            <span v-else>
              <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="210"/>
              <p style="margin-top: 50px;"> Hier im Erdgeschoss gibt es eine Büste des Museumsgründers! </p>
              <p> Wisst ihr, wie er heißt? </p>
            </span>
          </span>
          <span v-else-if="!antwortRichtig">
            <img class="spieler" src="assets/img/detektive/watson_enttaeuscht.png" width="210" v-if="spielStore.spieler=='Watson'"/>
            <img class="spieler" src="assets/img/detektive/sherlock_enttaeuscht.png" width="230" v-else-if="spielStore.spieler=='Sherlock'"/>
            <img class="spieler" src="assets/img/detektive/enola_enttaeuscht.png" width="210" v-else-if="spielStore.spieler=='Enola'"/>
            <img class="spieler" src="assets/kopf_mit_hals.svg" width="200" v-else/>
            <p style="margin-top: 50px;"> Die Antwort war leider falsch. </p>
            <p> Versuch es noch einmal!</p>
          </span>
          <span v-else-if="antwortRichtig">
            <span v-if="spielStore.spieler=='Watson'">
              <img class="spieler" src="assets/img/detektive/watson_gluecklich.png" width="210"/>
              <p style="margin-top: 50px;"> Sehr gut, die Antwort ist richtig. </p>
              <p v-if="spielStore.ort=='eg'"> Lasst uns also diese Büste von Ludwig Leiner suchen. </p>
              <p v-else-if="spielStore.ort=='og1'"> Lasst uns also diesen Schreibtisch von Ludwig Leiner suchen. </p>
            </span>
            <span v-else-if="spielStore.spieler=='Sherlock'">
              <img class="spieler" src="assets/img/detektive/sherlock_gluecklich.png" width="240"/>
              <p style="margin-top: 50px;"> Sehr gut, die Antwort ist richtig. </p>
              <p v-if="spielStore.ort=='eg'"> Lasst uns also diese Büste von Ludwig Leiner suchen. </p>
              <p v-else-if="spielStore.ort=='og1'"> Lasst uns also diesen Schreibtisch von Ludwig Leiner suchen. </p>
            </span>
            <span v-else>
              <img class="spieler" src="assets/img/detektive/enola_gluecklich.png" width="210"/>
              <p style="margin-top: 50px;"> Sehr gut, die Antwort ist richtig. </p>
              <p v-if="spielStore.ort=='eg'"> Lasst uns also diese Büste von Ludwig Leiner suchen. </p>
              <p v-else-if="spielStore.ort=='og1'"> Aber noch haben wir den Schreibtisch von Ludwig Leiner nicht gefunden. </p>
            </span>
          </span>
          <div class="antwort-buttons" v-if="spielStore.spieler=='Watson'">
              <ion-button :color="buttonFarbe1" :fill="buttonFill1" size="large" expand="block" @click="antwortAusgewaehlt(1, true)">Ludwig Leiner</ion-button>
              <ion-button :color="buttonFarbe2" :fill="buttonFill2" size="large" expand="block" @click="antwortAusgewaehlt(2, false)" :disabled="antwortRichtig">Sherlock Holmes</ion-button>
              <ion-button :color="buttonFarbe3" :fill="buttonFill3" size="large" expand="block" @click="antwortAusgewaehlt(3, false)" :disabled="antwortRichtig">Ludwig van Beethoven</ion-button>
          </div>
          <div class="antwort-buttons" v-else-if="spielStore.spieler=='Sherlock'">
            <ion-button :color="buttonFarbe1" :fill="buttonFill1" size="large" expand="block" @click="antwortAusgewaehlt(1, true)">Ludwig Leiner</ion-button>
            <ion-button :color="buttonFarbe2" :fill="buttonFill2" size="large" expand="block" @click="antwortAusgewaehlt(2, false)" :disabled="antwortRichtig">Ludwig van Beethoven</ion-button>
            <ion-button :color="buttonFarbe3" :fill="buttonFill3" size="large" expand="block" @click="antwortAusgewaehlt(3, false)" :disabled="antwortRichtig">Ludwig Wittgenstein</ion-button>
          </div>
          <div class="antwort-buttons" v-else>
            <ion-button :color="buttonFarbe1" :fill="buttonFill1" size="large" expand="block" @click="antwortAusgewaehlt(1, true)">Ludwig Leiner</ion-button>
            <ion-button :color="buttonFarbe2" :fill="buttonFill2" size="large" expand="block" @click="antwortAusgewaehlt(2, false)" :disabled="antwortRichtig">Tobias Engelsing</ion-button>
            <ion-button :color="buttonFarbe3" :fill="buttonFill3" size="large" expand="block" @click="antwortAusgewaehlt(3, false)" :disabled="antwortRichtig">Ignaz Heinrich von Wessenberg</ion-button>
          </div>
          <button-weiter-component class="button-weiter" v-if="spielStore.flow==0.71 && antwortRichtig" @click="swiperInstance.slideNext();" pulsiert/>
          <button-weiter-component class="button-weiter" v-else-if="spielStore.flow>0.71" @click="swiperInstance.slideNext();"/>
          <button-weiter-component class="button-weiter" v-else disabled />
        </swiper-slide>

        <swiper-slide v-if="spielStore.flow >= 0.71">
          <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="200" v-if="spielStore.spieler=='Watson'"/>
          <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="200" v-else-if="spielStore.spieler=='Sherlock'"/>
          <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="200" v-else-if="spielStore.spieler=='Enola'"/>
          <img class="spieler" src="assets/kopf_mit_hals.svg" width="200" v-else/>
          <p v-if="spielStore.ort=='eg'">
            Folgt dem grünen Pfeil auf dem Foto!
          </p>
          <p v-else-if="spielStore.ort=='og1'">
            Er steht im ersten Obergeschoss. Folgt dem grünen Pfeil.
          </p>
          <img class="pfeil" src="assets/objekte/eg/tutorial/tutorial_eg_pfeil_1.jpg" v-if="spielStore.ort=='eg'"/>
          <img class="pfeil" src="assets/objekte/og/tutorial/tutorial_og_pfeil_1.jpg" style="height: 70%;" v-else-if="spielStore.ort=='og1'"/>
          <button-weiter-component class="button-weiter" v-if="spielStore.flow==0.71" @click="if(isPlatform('desktop'))spielStore.flow=0.72;" :disabled="!isPlatform('desktop')"/>
          <button-weiter-component class="button-weiter" v-else-if="spielStore.flow==0.72" @click="swiperInstance.slideNext();" pulsiert/>
          <button-weiter-component class="button-weiter" v-else-if="spielStore.flow>0.72" @click="swiperInstance.slideNext();"/>
          <button-weiter-component class="button-weiter" v-else disabled />
        </swiper-slide>

        <swiper-slide v-if="spielStore.flow >= 0.72">
          <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="200" v-if="spielStore.spieler=='Watson'"/>
          <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="200" v-else-if="spielStore.spieler=='Sherlock'"/>
          <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="200" v-else-if="spielStore.spieler=='Enola'"/>
          <img class="spieler" src="assets/kopf_mit_hals.svg" width="200" v-else/>
          <p style="font-size: 28px;">
            Braucht ihr noch mehr Hilfe? Dann drückt auf den Button mit der Karte.
          </p>
          <img class="pfeil" src="assets/objekte/eg/tutorial/tutorial_eg_pfeil_2.jpg" style="height: 70%;" v-if="spielStore.ort=='eg'"/>
          <img class="pfeil" src="assets/objekte/og/tutorial/tutorial_og_pfeil_2.jpg" style="height: 70%;" v-else-if="spielStore.ort=='og1'"/>
          <button-weiter-component class="button-weiter" v-if="spielStore.flow==0.72" @click="if(isPlatform('desktop'))spielStore.flow=0.73;" :disabled="!isPlatform('desktop')"/>
          <button-weiter-component class="button-weiter" v-else-if="spielStore.flow==0.73" @click="swiperInstance.slideNext();" pulsiert/>
          <button-weiter-component class="button-weiter" v-else-if="spielStore.flow>0.73" @click="swiperInstance.slideNext();"/>
          <button-weiter-component class="button-weiter" v-else disabled />
        </swiper-slide>

        <swiper-slide v-if="spielStore.flow >= 0.73">
          <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="200" v-if="spielStore.spieler=='Watson'"/>
          <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="200" v-else-if="spielStore.spieler=='Sherlock'"/>
          <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="200" v-else-if="spielStore.spieler=='Enola'"/>
          <img class="spieler" src="assets/kopf_mit_hals.svg" width="200" v-else/>
          <!-- <p style="font-size: 28px;">
            Braucht ihr noch mehr Hilfe? Dann drückt auf den Button mit der Karte.
          </p> -->
          <img class="pfeil" src="assets/objekte/eg/tutorial/tutorial_eg_pfeil_3.jpg" style="height: 90%;" v-if="spielStore.ort=='eg'"/>
          <img class="pfeil" src="assets/objekte/og/tutorial/tutorial_og_pfeil_3.jpg" style="height: 90%;" v-else-if="spielStore.ort=='og1'"/>
          <span v-if="spielStore.ort=='eg'">
            <button-weiter-component class="button-weiter" v-if="spielStore.flow==0.73" @click="if(isPlatform('desktop'))spielStore.flow=0.8;" :disabled="!isPlatform('desktop')"/>
            <button-weiter-component class="button-weiter" v-else-if="spielStore.flow==0.8" @click="swiperInstance.slideNext();" pulsiert/>
            <button-weiter-component class="button-weiter" v-else-if="spielStore.flow>0.8" @click="swiperInstance.slideNext();"/>
            <button-weiter-component class="button-weiter" v-else disabled />
          </span>
          <span v-else-if="spielStore.ort=='og1'">
            <button-weiter-component class="button-weiter" v-if="spielStore.flow==0.73" @click="if(isPlatform('desktop'))spielStore.flow=0.74;" :disabled="!isPlatform('desktop')"/>
            <button-weiter-component class="button-weiter" v-else-if="spielStore.flow==0.74" @click="swiperInstance.slideNext();" pulsiert/>
            <button-weiter-component class="button-weiter" v-else-if="spielStore.flow>0.74" @click="swiperInstance.slideNext();"/>
            <button-weiter-component class="button-weiter" v-else disabled />
          </span>
        </swiper-slide>

        <swiper-slide v-if="spielStore.flow >= 0.74 && spielStore.ort=='og1'">
          <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="200" v-if="spielStore.spieler=='Watson'"/>
          <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="200" v-else-if="spielStore.spieler=='Sherlock'"/>
          <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="200" v-else-if="spielStore.spieler=='Enola'"/>
          <img class="spieler" src="assets/kopf_mit_hals.svg" width="200" v-else/>

          <img class="pfeil" src="assets/objekte/og/tutorial/tutorial_og_pfeil_4.jpg" style="height: 90%;" />
          <button-weiter-component class="button-weiter" v-if="spielStore.flow==0.74" @click="if(isPlatform('desktop'))spielStore.flow=0.75;" :disabled="!isPlatform('desktop')"/>
          <button-weiter-component class="button-weiter" v-else-if="spielStore.flow==0.75" @click="swiperInstance.slideNext();" pulsiert/>
          <button-weiter-component class="button-weiter" v-else-if="spielStore.flow>0.75" @click="swiperInstance.slideNext();"/>
          <button-weiter-component class="button-weiter" v-else disabled />
        </swiper-slide>

        <swiper-slide v-if="spielStore.flow >= 0.75 && spielStore.ort=='og1'">
          <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="200" v-if="spielStore.spieler=='Watson'"/>
          <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="200" v-else-if="spielStore.spieler=='Sherlock'"/>
          <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="200" v-else-if="spielStore.spieler=='Enola'"/>
          <img class="spieler" src="assets/kopf_mit_hals.svg" width="200" v-else/>

          <img class="pfeil" src="assets/objekte/og/tutorial/tutorial_og_pfeil_5.jpg" style="height: 90%;" />
          <button-weiter-component class="button-weiter" v-if="spielStore.flow==0.75" @click="if(isPlatform('desktop'))spielStore.flow=0.8;" :disabled="!isPlatform('desktop')"/>
          <button-weiter-component class="button-weiter" v-else-if="spielStore.flow==0.8" @click="swiperInstance.slideNext();" pulsiert/>
          <button-weiter-component class="button-weiter" v-else-if="spielStore.flow>0.8" @click="swiperInstance.slideNext();"/>
          <button-weiter-component class="button-weiter" v-else disabled />
        </swiper-slide>


        <swiper-slide v-if="spielStore.flow>=0.8">
          <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="200" v-if="spielStore.spieler=='Watson'"/>
          <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="200" v-else-if="spielStore.spieler=='Sherlock'"/>
          <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="200" v-else-if="spielStore.spieler=='Enola'"/>
          <img class="spieler" src="assets/kopf_mit_hals.svg" width="200" v-else/>
          <span v-if="spielStore.ort=='eg' && spielStore.spieler=='Watson'">
            <p style="margin-top: 70px;"> Achtet jetzt auf die Hightech-Lupe. </p>
            <p> Je heller und schneller sie aufleuchtet, desto näher seid ihr am Ziel. </p>
            <p> Seht ihr die Büste von Ludwig Leiner? </p>
            <p> Dann schaltet die Kamera an und richtet sie auf die Büste. </p>
          </span>
          <span v-else-if="spielStore.ort=='eg' && spielStore.spieler=='Sherlock'">
            <p style="margin-top: 70px;"> Achtet jetzt auf die Hightech-Lupe. Sie liefert uns wichtige Hinweise. </p>
            <p> Je heller und schneller sie aufleuchtet, desto näher seid ihr am Ziel. </p>
            <p> Seht ihr die Büste von Ludwig Leiner? </p>
            <p> Dann schaltet die Kamera an und richtet sie auf die Büste. </p>
          </span>
          <span v-else-if="spielStore.ort=='eg' && spielStore.spieler=='Enola'">
            <p style="margin-top: 60px;"> Jetzt könnt ihr sehen, was die Hightech-Lupe alles kann. </p>
            <p> Je heller und schneller sie aufleuchtet, desto näher seid ihr am Ziel. </p>
            <p> Seht ihr die Büste von Ludwig Leiner? </p>
            <p> Dann schaltet die Kamera an und richtet sie auf die Büste. </p>
          </span>
          <span v-else-if="spielStore.ort=='og1' && spielStore.spieler=='Watson'">
            <p style="margin-top: 60px;"> Achtet jetzt auf die Hightech-Lupe. </p>
            <p> Je heller und schneller sie aufleuchtet, desto näher seid ihr am Ziel. </p>
            <p> Seht ihr die Figur von Ludwig Leiner neben seinem Schreibtisch? </p>
            <p> Dann schaltet die Kamera an und richtet sie auf die Figur. </p>
          </span>
          <span v-else-if="spielStore.ort=='og1' && spielStore.spieler=='Sherlock'">
            <p style="margin-top: 70px;"> Achtet jetzt auf die Hightech-Lupe. Sie liefert uns wichtige Hinweise. </p>
            <p> Je heller und schneller sie aufleuchtet, desto näher kommt ihr dem Ziel. </p>
            <p> Seht ihr die Figur von Ludwig Leiner neben seinem Schreibtisch? </p>
            <p> Dann schaltet die Kamera an und richtet sie auf die Figur. </p>
          </span>
          <span v-else-if="spielStore.ort=='og1' && spielStore.spieler=='Enola'">
            <p style="margin-top: 70px;"> Jetzt könnt ihr sehen, was die Hightech-Lupe alles kann. </p>
            <p> Je heller und schneller sie aufleuchtet, desto näher kommt ihr dem Ziel. </p>
            <p> Seht ihr die Figur von Ludwig Leiner neben seinem Schreibtisch? </p>
            <p> Dann schaltet die Kamera an und richtet sie auf die Figur. </p>
          </span>
          <button-weiter-component class="button-weiter" v-if="spielStore.flow==0.8" @click="if(isPlatform('desktop'))spielStore.flow=0.81;" :disabled="!isPlatform('desktop')"/>
          <button-weiter-component class="button-weiter" v-else-if="spielStore.flow==0.81" @click="swiperInstance.slideNext();" pulsiert/>
          <button-weiter-component class="button-weiter" v-else-if="spielStore.flow>0.81" @click="swiperInstance.slideNext();"/>
          <button-weiter-component class="button-weiter" v-else disabled />
        </swiper-slide>

        <swiper-slide v-if="spielStore.flow >= 0.81" class="leiner-slide">
          <img src="assets/img/leiner.png" width="200" style="margin-left: auto; margin-right: auto; display: block;"/>
          <p> Ich bin der Geist von Ludwig Leiner! </p>
          <p> Und nun wagt der Detaildieb meine Ruhe zu stören. </p>
          <p> Gut, dass ihr mich gefunden habt. </p>
          <p> Beschützt mein Vermächtnis. </p>
          <button-weiter-component class="button-weiter" v-if="spielStore.flow==0.81" @click="if(isPlatform('desktop'))spielStore.flow=0.82;" :disabled="!isPlatform('desktop')"/>
          <button-weiter-component class="button-weiter" v-else-if="spielStore.flow==0.82" @click="swiperInstance.slideNext();" pulsiert/>
          <button-weiter-component class="button-weiter" v-else-if="spielStore.flow>0.82" @click="swiperInstance.slideNext();"/>
          <button-weiter-component class="button-weiter" v-else disabled />
        </swiper-slide>

        <swiper-slide v-if="spielStore.flow >= 0.82" class="leiner-slide">
          <img class="spieler" src="assets/img/leiner.png" width="180"/>
          <span v-if="spielStore.ort=='eg'">
            <p> Überall nimmt dieser Dieb oder diese Diebin kleine Dinge mit. </p>
            <p> Sogar aus diesen alten Vitrinen, die ich noch eigenhändig bestückt habe. </p>
            <p> Schaut Euch um, damit ihr später gut nach den verschwundenen Details suchen könnt. </p>
            <p> Seid ihr bereit für den nächsten Schritt? </p>
          </span>
          <span v-else-if="spielStore.ort=='og1'">
            <p> Überall nimmt dieser Dieb oder diese Diebin kleine Dinge mit. </p>
            <p> Auch aus der Biedermeier-Vitrine hier neben meinem Schreibtisch. </p>
            <p> Kennt ihr mein schönes Museum? Ich nehme Euch mit auf einen kleinen Rundgang. Schaut Euch um, damit ihr später gut nach den verschwundenen Details suchen könnt. </p>
            <p> Seid ihr bereit für den nächsten Schritt? </p>
          </span>
          <button-weiter-component class="button-weiter" v-if="spielStore.flow==0.82" @click="if(isPlatform('desktop'))spielStore.flow=0.83;" :disabled="!isPlatform('desktop')"/>
          <button-weiter-component class="button-weiter" v-else-if="spielStore.flow==0.83" @click="swiperInstance.slideNext();" pulsiert/>
          <button-weiter-component class="button-weiter" v-else-if="spielStore.flow>0.83" @click="swiperInstance.slideNext();"/>
          <button-weiter-component class="button-weiter" v-else disabled />
        </swiper-slide>

        <swiper-slide v-if="spielStore.flow >= 0.83" class="leiner-slide">
          <img class="spieler" src="assets/img/leiner.png" width="180"/>
          <span v-if="spielStore.ort=='eg'">
            <p> Geht in den Raum mit den roten Vitrinen. </p>
          </span>
          <span v-else-if="spielStore.ort=='og1'" >
            <p> Im Raum des 18. und 19. Jahrhunderts hängen viele meiner Lieblingsgemälde! </p>
          </span>
          <img class="pfeil" src="assets/objekte/eg/tutorial/tutorial_eg_pfeil_4.jpg" style="height: 70%;" v-if="spielStore.ort=='eg'"/>
          <img class="pfeil" src="assets/objekte/og/tutorial/tutorial_og_pfeil_6.jpg" style="height: 70%;" v-else-if="spielStore.ort=='og1'"/>
          <button-weiter-component class="button-weiter" v-if="spielStore.flow==0.83" @click="if(isPlatform('desktop'))spielStore.flow=0.84;" :disabled="!isPlatform('desktop')"/>
          <button-weiter-component class="button-weiter" v-else-if="spielStore.flow==0.84" @click="swiperInstance.slideNext();" pulsiert/>
          <button-weiter-component class="button-weiter" v-else-if="spielStore.flow>0.84" @click="swiperInstance.slideNext();"/>
          <button-weiter-component class="button-weiter" v-else disabled />
        </swiper-slide>

        <swiper-slide v-if="spielStore.flow >= 0.84" class="leiner-slide">
          <img class="spieler" src="assets/img/leiner.png" width="180"/>
          <span v-if="spielStore.ort=='eg'">
            <p style="font-size: 26px;">  Hier findet ihr vieles zur Geschichte unserer schönen Stadt Konstanz. Folgt weiter dem grünen Pfeil. </p>
          </span>
          <span v-else-if="spielStore.ort=='og1'" >
          </span>
          <img class="pfeil" src="assets/objekte/eg/tutorial/tutorial_eg_pfeil_5.jpg" style="height: 70%;" v-if="spielStore.ort=='eg'"/>
          <img class="pfeil" src="assets/objekte/og/tutorial/tutorial_og_pfeil_7.jpg" style="height: 90%;" v-else-if="spielStore.ort=='og1'"/>
          <span v-if="spielStore.ort=='eg'">
            <button-weiter-component class="button-weiter" v-if="spielStore.flow==0.84" @click="if(isPlatform('desktop'))spielStore.flow=0.9;" :disabled="!isPlatform('desktop')"/>
            <button-weiter-component class="button-weiter" v-else-if="spielStore.flow==0.9" @click="swiperInstance.slideNext();" pulsiert/>
            <button-weiter-component class="button-weiter" v-else-if="spielStore.flow>0.9" @click="swiperInstance.slideNext();"/>
            <button-weiter-component class="button-weiter" v-else disabled />
          </span>
          <span v-else-if="spielStore.ort=='og1'">
            <button-weiter-component class="button-weiter" v-if="spielStore.flow==0.84" @click="if(isPlatform('desktop'))spielStore.flow=0.85;" :disabled="!isPlatform('desktop')"/>
            <button-weiter-component class="button-weiter" v-else-if="spielStore.flow==0.85" @click="swiperInstance.slideNext();" pulsiert/>
            <button-weiter-component class="button-weiter" v-else-if="spielStore.flow>0.85" @click="swiperInstance.slideNext();"/>
            <button-weiter-component class="button-weiter" v-else disabled />
          </span>
        </swiper-slide>

        <swiper-slide v-if="spielStore.flow >= 0.85 && spielStore.ort=='og1'" class="leiner-slide">
          <img class="spieler" src="assets/img/leiner.png" width="180"/>
          <img class="pfeil" src="assets/objekte/og/tutorial/tutorial_og_pfeil_8.jpg" style="height: 90%;"/>
          <button-weiter-component class="button-weiter" v-if="spielStore.flow==0.85" @click="if(isPlatform('desktop'))spielStore.flow=0.86;" :disabled="!isPlatform('desktop')"/>
          <button-weiter-component class="button-weiter" v-else-if="spielStore.flow==0.86" @click="swiperInstance.slideNext();" pulsiert/>
          <button-weiter-component class="button-weiter" v-else-if="spielStore.flow>0.86" @click="swiperInstance.slideNext();"/>
          <button-weiter-component class="button-weiter" v-else disabled />
        </swiper-slide>

        <swiper-slide v-if="spielStore.flow >= 0.86 && spielStore.ort=='og1'" class="leiner-slide">
          <img class="spieler" src="assets/img/leiner.png" width="180"/>
          <img class="pfeil" src="assets/objekte/og/tutorial/tutorial_og_pfeil_9.jpg" style="height: 90%;"/>
          <button-weiter-component class="button-weiter" v-if="spielStore.flow==0.86" @click="if(isPlatform('desktop'))spielStore.flow=0.87;" :disabled="!isPlatform('desktop')"/>
          <button-weiter-component class="button-weiter" v-else-if="spielStore.flow==0.87" @click="swiperInstance.slideNext();" pulsiert/>
          <button-weiter-component class="button-weiter" v-else-if="spielStore.flow>0.87" @click="swiperInstance.slideNext();"/>
          <button-weiter-component class="button-weiter" v-else disabled />
        </swiper-slide>

        <swiper-slide v-if="spielStore.flow >= 0.87 && spielStore.ort=='og1'" class="leiner-slide">
          <img class="spieler" src="assets/img/leiner.png" width="180"/>
          <img class="pfeil" src="assets/objekte/og/tutorial/tutorial_og_pfeil_10.jpg" style="height: 90%;"/>
          <button-weiter-component class="button-weiter" v-if="spielStore.flow==0.87" @click="if(isPlatform('desktop'))spielStore.flow=0.88;" :disabled="!isPlatform('desktop')"/>
          <button-weiter-component class="button-weiter" v-else-if="spielStore.flow==0.88" @click="swiperInstance.slideNext();" pulsiert/>
          <button-weiter-component class="button-weiter" v-else-if="spielStore.flow>0.88" @click="swiperInstance.slideNext();"/>
          <button-weiter-component class="button-weiter" v-else disabled />
        </swiper-slide>

        <swiper-slide v-if="spielStore.flow >= 0.88 && spielStore.ort=='og1'" class="leiner-slide">
          <img class="spieler" src="assets/img/leiner.png" width="180"/>
          <p style="font-size: 26px;">Das ist einer meiner Lieblingsräume mit Kunst aus den alten Kirchen von Konstanz. Folgt dem Pfeil in den Zunftsaal.</p>
          <img class="pfeil" src="assets/objekte/og/tutorial/tutorial_og_pfeil_11.jpg" style="height: 65%;"/>
          <button-weiter-component class="button-weiter" v-if="spielStore.flow==0.88" @click="if(isPlatform('desktop'))spielStore.flow=0.9;" :disabled="!isPlatform('desktop')"/>
          <button-weiter-component class="button-weiter" v-else-if="spielStore.flow==0.9" @click="swiperInstance.slideNext();" pulsiert/>
          <button-weiter-component class="button-weiter" v-else-if="spielStore.flow>0.9" @click="swiperInstance.slideNext();"/>
          <button-weiter-component class="button-weiter" v-else disabled />
        </swiper-slide>

        <swiper-slide v-if="spielStore.flow >= 0.9" class="leiner-slide">
          <img src="assets/img/leiner.png" width="200" style="margin-left: auto; margin-right: auto; display: block;"/>
          <span v-if="spielStore.ort=='eg'">
            <p> Oh Schreck, was höre ich da? Es gibt einen neuen Diebstahl! </p>
            <p> Geht schnell in die Detektivecke. </p>
            <p> Ich verlasse mich auf Euch. Bewahrt mein Erbe! </p>
          </span>
          <span v-else-if="spielStore.ort=='og1'" >
            <p> Was höre ich da? Der Detaildieb hat wieder zugeschlagen? </p>
            <p> Geht schnell in die Ecke mit dem Detektivlogo. </p>
            <p> Ich verlasse mich auf Euch! Bewahrt mein Erbe! </p>
          </span>
          <button-weiter-component class="button-weiter" v-if="spielStore.flow==0.9" @click="if(isPlatform('desktop'))spielStore.flow=1.0;" :disabled="!isPlatform('desktop')"/>
          <button-weiter-component class="button-weiter" v-else-if="spielStore.flow==1.0" @click="swiperInstance.slideNext();" pulsiert/>
          <button-weiter-component class="button-weiter" v-else-if="spielStore.flow>1.0" @click="swiperInstance.slideNext();"/>
          <button-weiter-component class="button-weiter" v-else disabled />
        </swiper-slide>


        <!-- <swiper-slide class="posting-slide" v-if="spielStore.flow >= 0.95">
              <img class="scroll-pfeil" src="assets/img/scroll_pfeil_runter.svg" v-show="displayScrollRunterPfeil"/>
          <swiper :modules="modules" :direction="'vertical'" :scrollbar="true" :mousewheel="true" :slidesPerView="'auto'" :freeMode="true" @reachEnd="displayScrollRunterPfeil = false;" @reachBeginning="displayScrollRunterPfeil = true;">
            <swiper-slide>
              <div class="spieler_logo">
                <img src="assets/img/leiner.png" width="200"/>
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
              <p style="padding-bottom: 100px;">
                Wenn ihr den Weg nicht kennt, könnt ihr wieder auf den Button mit der Karte drücken.
              </p>
              <button-weiter-component class="button-weiter" :pulsiert="spielStore.flow==0.95" @click="spielStore.flow = 0.9; swiperInstance.slideNext()"/>
            </swiper-slide>
          </swiper>
        </swiper-slide> -->

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

const props = defineProps( {
    empfang: {
      type: Number,
      default: 0
    },
  });

// Store //
const spielStore = useSpielStore();
const { flow } = storeToRefs(spielStore);
console.log(`spielStore.flow: ${spielStore.flow}`);

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
}
function onVerticalSliderEndReached() {
  console.log('onVerticalSliderEndReached');
  displayScrollRunterPfeil.value = false;
}

// Quiz //
const buttonFarbe1 = ref("primary");
const buttonFarbe2 = ref("primary");
const buttonFarbe3 = ref("primary");
const buttonFill1 = ref("outline");
const buttonFill2 = ref("outline");
const buttonFill3 = ref("outline");
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
      swiperInstance.value.slideNext();
    }, 1000 )
  }
  if (flow.value == 0.95) {
    setTimeout(() => {
      swiperInstance.value.slideNext();
    }, 1000 )
  }
})

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
  if (richtig && spielStore.flow < 0.71) {
    spielStore.flow = 0.71;
  }
}

</script>

<style scoped>
.leiner-slide {
  background-color: rgb(221, 221, 221);
}
.swipe-geste-vertikal {
  position: absolute;
  right: 90px;
  top: 440px;
  width: 50px;
  height: 50px;
  background-color: black;
  border-radius: 50%;
  opacity: 50%;
  /* margin-right: auto;
  margin-left: auto; */
  animation: swipe-vertikal-animation 4s ease-in-out infinite;
}
/* @keyframes swipe-vertikal-animation {
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
@keyframes swipe-vertikal-animation {
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
  bottom: 110px;
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
  position: absolute;
  bottom: 40px;
  left: 30px;
  /* margin-left: 30px; */
  /* margin-right: auto; */
  height: 75%;
  z-index: 4;
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