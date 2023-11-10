<template>
<div ref="scrollContentA" id="content-scroll">

  <swiper @swiper="onSwiper" @reachEnd="onSliderEndReached" id="swiper-haupt" @activeIndexChange="onSlideChanged" :slidesPerView="1" :spaceBetween="50" :freeMode="false" :scrollbar="false" :navigation="false" :pagination="true" :modules="modules">
    
    <swiper-slide v-if="flow >=0.6">
      <span v-if="spieler=='Watson'">
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
      <span v-else-if="spieler=='Sherlock'">
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
      <!-- <div class="swipe-geste-vertikal" v-if="flow==0.6"></div> -->
      <div class="swipe-geste-vertikal"></div>
      <button-weiter-component class="button-weiter" v-if="flow==0.6" @click="swiperInstance.slideNext();" pulsiert/>
      <button-weiter-component class="button-weiter" v-else-if="flow>0.6" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>

    <!-- 0.7 Quiz -->
    <swiper-slide v-if="flow >= 0.6">
      <span v-if="!antwortClicked">
        <span v-if="spieler=='Watson' && ort=='eg'">
          <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="210"/>
          <p style="margin-top: 40px;"> Hier im Erdgeschoss gibt es eine Büste des Museumsgründers! </p>
          <p> Ihr habt doch aufgepasst und wisst, wie er heißt? </p>
        </span>
        <span v-else-if="spieler=='Sherlock' && ort=='eg'">
          <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="230"/>
          <p style="margin-top: 40px;"> Hier im Erdgeschoss gibt es eine Büste des Museumsgründers! </p>
          <p> Ihr habt sicher aufgepasst und wisst, wie er heißt? </p>
        </span>
        <span v-else-if="spieler=='Enola' && ort=='eg'">
          <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="210"/>
          <p style="margin-top: 40px;"> Hier im Erdgeschoss gibt es eine Büste des Museumsgründers! </p>
          <p> Ihr habt natürlich aufgepasst und wisst, wie er heißt? </p>
        </span>
        <span v-else-if="spieler=='Watson' && ort=='og1'">
          <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="210"/>
          <p style="font-size: 28px;"> Im ersten Obergeschoss steht noch der Schreibtisch des Museumsgründers!  </p>
          <p style="font-size: 28px;"> Ihr habt doch aufgepasst und wisst, wie er heißt? </p>
        </span>
        <span v-else-if="spieler=='Sherlock' && ort=='og1'">
          <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="230"/>
          <p style="font-size: 28px;"> Im ersten Obergeschoss steht noch der Schreibtisch des Museumsgründers!  </p>
          <p style="font-size: 28px;"> Ihr habt sicher aufgepasst und wisst, wie er heißt? </p>
        </span>
        <span v-else-if="spieler=='Enola' && ort=='og1'">
          <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="210"/>
          <p style="font-size: 28px;"> Im ersten Obergeschoss steht der Schreibtisch des Museumsgründers! </p>
          <p style="font-size: 28px;"> Ihr habt natürlich aufgepasst und wisst, wie er heißt? </p>
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
            Sehr gut, die Antwort ist richtig. <br>
            Und nun nichts wie hin zu dieser Büste. 
            Der Dieb oder die Diebin soll eine Bartlocke gestohlen und gefälscht haben! 
          </p>
        </span>
        <span v-else-if="spieler=='Sherlock' && ort=='eg'">
          <img class="spieler" src="assets/img/detektive/sherlock_gluecklich.png" width="240"/>
          <p>
            Gut aufgepasst, die Antwort ist richtig. <br>
            Und nun nichts wie hin zu dieser Büste. 
            Der Dieb oder die Diebin soll eine Bartlocke gefälscht haben! 
          </p>
        </span>
        <span v-else-if="spieler=='Enola' && ort=='eg'">
          <img class="spieler" src="assets/img/detektive/enola_gluecklich.png" width="210"/>
          <p> Richtig! </p>
          <p>
            Und nun nichts wie hin zu dieser Büste. <br>
            Der Dieb oder die Diebin soll eine Bartlocke gefälscht haben!
          </p>
        </span>
        <span v-else-if="spieler=='Watson' && ort=='og1'">
          <img class="spieler" src="assets/img/detektive/watson_gluecklich.png" width="210"/>
          <p>
            Sehr gut, die Antwort ist richtig. <br>
            Und nun nichts wie hin zu diesem Schreibtisch. 
            Der Dieb oder die Diebin soll die Brille von Leiner gestohlen und gefälscht haben! 
          </p>
        </span>
        <span v-else-if="spieler=='Sherlock' && ort=='og1'">
          <img class="spieler" src="assets/img/detektive/sherlock_gluecklich.png" width="240"/>
          <p>
            Gut aufgepasst, die Antwort ist richtig. <br>
            Und nun nichts wie hin zu diesem Schreibtisch. 
            Der Dieb oder die Diebin soll die Brille von Leiner gestohlen haben! 
          </p>
        </span>
        <span v-else-if="spieler=='Enola' && ort=='og1'">
          <img class="spieler" src="assets/img/detektive/enola_gluecklich.png" width="210"/>
          <p>
            Richtig! Und nun nichts wie hin zu diesem Schreibtisch. <br>
            Der Dieb oder die Diebin soll die Brille von Leiner gestohlen haben! 
          </p>
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
        <ion-button :color="buttonFarbe2" :fill="buttonFill2" size="large" expand="block" @click="antwortAusgewaehlt(2, false)" :disabled="antwortRichtig">Tobias Engelsing</ion-button>
        <ion-button :color="buttonFarbe3" :fill="buttonFill3" size="large" expand="block" @click="antwortAusgewaehlt(3, false)" :disabled="antwortRichtig">Ignaz Heinrich von Wessenberg</ion-button>
        <ion-button :color="buttonFarbe1" :fill="buttonFill1" size="large" expand="block" @click="antwortAusgewaehlt(1, true)">Ludwig Leiner</ion-button>
      </div>
      <button-weiter-component class="button-weiter" v-if="flow==0.79 && antwortRichtig" @click="swiperInstance.slideNext();" pulsiert/>
      <button-weiter-component class="button-weiter" v-else-if="flow>=0.8" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>

    <swiper-slide v-if="flow >= 0.71">
      <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="200" v-if="spieler=='Watson'"/>
      <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="200" v-else-if="spieler=='Sherlock'"/>
      <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="200" v-else-if="spieler=='Enola'"/>
      <img class="spieler" src="assets/kopf_mit_hals.svg" width="200" v-else/>
      <p v-if="ort=='eg'">
        Folgt dem grünen Pfeil auf dem Foto!
      </p>
      <p v-else-if="ort=='og1'">
        Er steht im ersten Obergeschoss. Folgt dem grünen Pfeil.
      </p>
      <img class="pfeil" src="assets/objekte/eg/tutorial/tutorial_eg_pfeil_1.jpg" v-if="ort=='eg'"/>
      <img class="pfeil" src="assets/objekte/og/tutorial/tutorial_og_pfeil_1.jpg" style="height: 70%;" v-else-if="ort=='og1'"/>
      <button-weiter-component class="button-weiter" v-if="flow==0.71" @click="if(!btTrigger)flow=0.72;" :disabled="btTrigger"/>
      <button-weiter-component class="button-weiter" v-else-if="flow==0.72" @click="swiperInstance.slideNext();" pulsiert/>
      <button-weiter-component class="button-weiter" v-else-if="flow>0.72" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>

    <swiper-slide v-if="flow >= 0.72">
      <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="200" v-if="spieler=='Watson'"/>
      <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="200" v-else-if="spieler=='Sherlock'"/>
      <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="200" v-else-if="spieler=='Enola'"/>
      <img class="spieler" src="assets/kopf_mit_hals.svg" width="200" v-else/>
      <p style="font-size: 28px;">
        Braucht ihr noch mehr Hilfe? Dann drückt auf den Button mit der Karte.
      </p>
      <img class="pfeil" src="assets/objekte/eg/tutorial/tutorial_eg_pfeil_2.jpg" style="height: 70%;" v-if="ort=='eg'"/>
      <img class="pfeil" src="assets/objekte/og/tutorial/tutorial_og_pfeil_2.jpg" style="height: 70%;" v-else-if="ort=='og1'"/>
      <!-- <button-weiter-component class="button-weiter" v-if="flow==0.72" @click="if(!btTrigger)flow=0.73;" :disabled="btTrigger"/> -->
      <!-- <button-weiter-component class="button-weiter" v-if="flow==0.72" @click="flow=0.73;" :disabled="btTrigger"/> -->
      <button-weiter-component class="button-weiter" v-if="flow==0.72" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else-if="flow>0.72" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>

    <swiper-slide v-if="flow >= 0.73">
      <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="200" v-if="spieler=='Watson'"/>
      <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="200" v-else-if="spieler=='Sherlock'"/>
      <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="200" v-else-if="spieler=='Enola'"/>
      <img class="spieler" src="assets/kopf_mit_hals.svg" width="200" v-else/>
      <!-- <p style="font-size: 28px;">
        Braucht ihr noch mehr Hilfe? Dann drückt auf den Button mit der Karte.
      </p> -->
      <img class="pfeil" src="assets/objekte/eg/tutorial/tutorial_eg_pfeil_3.jpg" style="height: 90%;" v-if="ort=='eg'"/>
      <img class="pfeil" src="assets/objekte/og/tutorial/tutorial_og_pfeil_3.jpg" style="height: 90%;" v-else-if="ort=='og1'"/>
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

    <swiper-slide v-if="flow >= 0.74 && ort=='og1'">
      <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="200" v-if="spieler=='Watson'"/>
      <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="200" v-else-if="spieler=='Sherlock'"/>
      <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="200" v-else-if="spieler=='Enola'"/>
      <img class="spieler" src="assets/kopf_mit_hals.svg" width="200" v-else/>

      <img class="pfeil" src="assets/objekte/og/tutorial/tutorial_og_pfeil_4.jpg" style="height: 90%;" />
      <button-weiter-component class="button-weiter" v-if="flow==0.74" @click="if(!btTrigger)flow=0.75;" :disabled="btTrigger"/>
      <button-weiter-component class="button-weiter" v-else-if="flow==0.75" @click="swiperInstance.slideNext();" pulsiert/>
      <button-weiter-component class="button-weiter" v-else-if="flow>0.75" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>

    <swiper-slide v-if="flow >= 0.75 && ort=='og1'">
      <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="200" v-if="spieler=='Watson'"/>
      <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="200" v-else-if="spieler=='Sherlock'"/>
      <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="200" v-else-if="spieler=='Enola'"/>
      <img class="spieler" src="assets/kopf_mit_hals.svg" width="200" v-else/>

      <img class="pfeil" src="assets/objekte/og/tutorial/tutorial_og_pfeil_5.jpg" style="height: 90%;" />
      <button-weiter-component class="button-weiter" v-if="flow<0.8" @click="if(!btTrigger)flow=0.8;" :disabled="btTrigger"/>
      <button-weiter-component class="button-weiter" v-else-if="flow==0.8" @click="swiperInstance.slideNext();" pulsiert/>
      <button-weiter-component class="button-weiter" v-else-if="flow>0.8" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>

    <!-- Lupe -->
    <swiper-slide v-if="flow>=0.8">
      <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="200" v-if="spieler=='Watson'"/>
      <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="200" v-else-if="spieler=='Sherlock'"/>
      <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="200" v-else-if="spieler=='Enola'"/>
      <img class="spieler" src="assets/kopf_mit_hals.svg" width="200" v-else/>
      <span v-if="ort=='eg' && spieler=='Watson'">
        <p> Achtet jetzt auf die Hightech-Lupe. </p>
        <p> Sie kann Fälschungen erkennen! </p>
        <p> Je heller und schneller sie blinkt, desto näher seid ihr an einem Tatort. </p>
        <p> Seht ihr die Büste von Ludwig Leiner? </p>
        <p> Dann schaltet die Kamera an und richtet sie auf die Büste. </p>
      </span>
      <span v-else-if="ort=='eg' && spieler=='Sherlock'">
        <p> Achtet jetzt auf die Hightech-Lupe. </p>
        <p> Sie kann Fälschungen erkennen! </p>
        <p> Je heller und schneller sie aufleuchtet, desto näher seid ihr an einem Tatort. </p>
        <p> Seht ihr die Büste von Ludwig Leiner? </p>
        <p> Dann schaltet die Kamera an und richtet sie auf die Büste. </p>
      </span>
      <span v-else-if="ort=='eg' && spieler=='Enola'">
        <p> Schaut, was die Hightech-Lupe drauf hat: </p>
        <p> Sie kann Fälschungen erkennen! </p>
        <p> Je heller und schneller sie aufleuchtet, desto näher seid ihr an einem Tatort. </p>
        <p> Seht ihr die Büste von Ludwig Leiner? </p>
        <p> Dann schaltet die Kamera an und richtet sie auf die Büste. </p>
      </span>
      <span v-else-if="ort=='og1' && spieler=='Watson'">
        <p style="margin-top: 60px;"> Achtet jetzt auf die Hightech-Lupe. </p>
        <p> Je heller und schneller sie aufleuchtet, desto näher seid ihr am Ziel. </p>
        <p> Seht ihr die Figur von Ludwig Leiner neben seinem Schreibtisch? </p>
        <p> Dann schaltet die Kamera an und richtet sie auf die Figur. </p>
      </span>
      <span v-else-if="ort=='og1' && spieler=='Sherlock'">
        <p style="margin-top: 70px;"> Achtet jetzt auf die Hightech-Lupe. Sie liefert uns wichtige Hinweise. </p>
        <p> Je heller und schneller sie aufleuchtet, desto näher kommt ihr dem Ziel. </p>
        <p> Seht ihr die Figur von Ludwig Leiner neben seinem Schreibtisch? </p>
        <p> Dann schaltet die Kamera an und richtet sie auf die Figur. </p>
      </span>
      <span v-else-if="ort=='og1' && spieler=='Enola'">
        <p style="margin-top: 70px;"> Jetzt könnt ihr sehen, was die Hightech-Lupe alles kann. </p>
        <p> Je heller und schneller sie aufleuchtet, desto näher kommt ihr dem Ziel. </p>
        <p> Seht ihr die Figur von Ludwig Leiner neben seinem Schreibtisch? </p>
        <p> Dann schaltet die Kamera an und richtet sie auf die Figur. </p>
      </span>
      <button-weiter-component class="button-weiter" v-if="flow==0.8" @click="if(!btTrigger)flow=0.9;" :disabled="btTrigger"/>
      <button-weiter-component class="button-weiter" v-else-if="flow>0.8" @click="swiperInstance.slideNext();" pulsiert/>
      <!-- <button-weiter-component class="button-weiter" v-else-if="flow>0.8" @click="swiperInstance.slideNext();"/> -->
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>

    <!-- Detail erkannt -->
    <swiper-slide v-if="flow > 0.8" class="leiner-slide">
      <img src="assets/img/leiner.png" width="200" style="margin-left: auto; margin-right: auto; display: block;"/>
      <p> Ich bin der Geist von Ludwig Leiner! </p>
      <p v-if="ort=='eg'"> Nun wagt der Detaildieb meine Ruhe zu stören und klaut meiner Büste eine Bartlocke. </p>
      <p v-else-if="ort=='og1'"> Nun wagt der Detaildieb meine Ruhe zu stören und ersetzt meine Brille durch eine Fälschung. </p>
      <p v-if="ort=='eg'"> Gut, dass ihr die Fälschung erkannt habt. </p>
      <p v-else-if="ort=='og1'"> Gut, dass ihr das erkannt habt. Beschützt mein Vermächtnis. </p>
      <p> Beschützt mein Vermächtnis. </p>
      <!-- <button-weiter-component class="button-weiter" v-if="flow==0.81" @click="if(!btTrigger)flow=0.82;" :disabled="btTrigger"/> -->
      <button-weiter-component class="button-weiter" v-if="flow>0.8" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else-if="flow>0.9" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>

    <swiper-slide v-if="flow > 0.8" class="leiner-slide">
      <img class="spieler" src="assets/img/leiner.png" width="180"/>
      <span v-if="ort=='eg'">
        <!-- <p> Überall nimmt dieser Dieb oder diese Diebin kleine Dinge mit. </p>
        <p> Sogar aus diesen alten Vitrinen, die ich noch eigenhändig bestückt habe. </p>
        <p> Schaut Euch um, damit ihr später gut nach den verschwundenen Details suchen könnt. </p>
        <p> Seid ihr bereit für den nächsten Schritt? </p> -->
        <br><br>
        <p> Es gibt leider noch viel mehr Tatorte. </p>
        <!-- <p> Wenn ihr mit der Lösung des Falls beginnen wollt, drückt auf den Button "Los geht's" (Tutorial abbrechen) </p> -->
        <p> Wenn ihr mit der Lösung des Falls beginnen wollt, könnt ihr das Tutorial jetzt schon überspringen. </p>
        <p> Wenn ihr mein Museum noch gar nicht kennt, nehme ich Euch gerne mit auf einen kleinen Rundgang.  </p>
        <p> Seid ihr bereit für den nächsten Schritt? </p>
      </span>
      <span v-else-if="ort=='og1'">
        <!-- <p> Überall nimmt dieser Dieb oder diese Diebin kleine Dinge mit. </p>
        <p> Auch aus der Biedermeier-Vitrine hier neben meinem Schreibtisch. </p>
        <p> Kennt ihr mein schönes Museum? Ich nehme Euch mit auf einen kleinen Rundgang. Schaut Euch um, damit ihr später gut nach den verschwundenen Details suchen könnt. </p>
        <p> Seid ihr bereit für den nächsten Schritt? </p> -->
        <br><br>
        <p> Es gibt leider noch viel mehr Tatorte. </p>
        <p> Wenn ihr mit der Lösung des Falls beginnen wollt, könnt ihr das Tutorial jetzt schon überspringen. </p>
        <p> Wenn ihr mein Museum noch gar nicht kennt, nehme ich Euch gerne mit auf einen kleinen Rundgang. </p>
        <p> Seid ihr bereit für den nächsten Schritt? </p>
      </span>
      <button-weiter-component class="button-weiter" v-if="flow>0.8" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else-if="flow>0.9" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>

    <swiper-slide v-if="flow > 0.8" class="leiner-slide">
      <img class="spieler" src="assets/img/leiner.png" width="180"/>
      <span v-if="ort=='eg'">
        <p style="margin-top: 100px;">
          Ihr befindet Euch in meinem Lieblingssaal mit Vitrinen, die ich noch eigenhändig eingeräumt habe:
        </p>
        <p>
          alles Dinge, die fleißige Forscher aus dem Boden unserer schönen Heimat ausgegraben haben!
        </p>
      </span>
      <span v-else-if="ort=='og1'">
        <p style="margin-top: 100px;">
          Habt ihr den schönen Biedermeier-Schrank hier neben meinem Schreibtisch gesehen? 
        </p>
        <p>
          Geht weiter und folgt den grünen Pfeilen.
        </p>
      </span>
      <button-weiter-component class="button-weiter" v-if="flow>0.8" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else-if="flow>0.9" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>

    <swiper-slide v-if="flow > 0.8" class="leiner-slide">
      <img class="spieler" src="assets/img/leiner.png" width="180"/>
      <span v-if="ort=='eg'">
        <p> Geht jetzt in den Raum mit den roten Vitrinen. </p>
      </span>
      <span v-else-if="ort=='og1'" style="font-size: 28px;">
        <p> Im Raum des 18. und 19. Jahrhunderts hängen viele meiner Lieblingsgemälde! </p>
      </span>
      <img class="pfeil" src="assets/objekte/eg/tutorial/tutorial_eg_pfeil_4.jpg" style="height: 70%;" v-if="ort=='eg'"/>
      <img class="pfeil" src="assets/objekte/og/tutorial/tutorial_og_pfeil_6.jpg" style="height: 70%;" v-else-if="ort=='og1'"/>
      <button-weiter-component class="button-weiter" v-if="flow>0.8" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else-if="flow>0.9" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>

    <swiper-slide v-if="flow > 0.8" class="leiner-slide">
      <img class="spieler" src="assets/img/leiner.png" width="180"/>
      <span v-if="ort=='eg'">
        <p style="font-size: 26px;">  Hier findet ihr vieles zur Geschichte unserer schönen Stadt Konstanz. Folgt weiter dem grünen Pfeil. </p>
      </span>
      <span v-else-if="ort=='og1'" >
      </span>
      <img class="pfeil" src="assets/objekte/eg/tutorial/tutorial_eg_pfeil_5.jpg" style="height: 67%;" v-if="ort=='eg'"/>
      <img class="pfeil" src="assets/objekte/og/tutorial/tutorial_og_pfeil_7.jpg" style="height: 90%;" v-else-if="ort=='og1'"/>
      <button-weiter-component class="button-weiter" v-if="flow>0.8" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else-if="flow>0.9" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>

    <swiper-slide v-if="flow > 0.8 && ort=='og1'" class="leiner-slide">
      <img class="spieler" src="assets/img/leiner.png" width="180"/>
      <img class="pfeil" src="assets/objekte/og/tutorial/tutorial_og_pfeil_8.jpg" style="height: 90%;"/>
      <button-weiter-component class="button-weiter" v-if="flow>0.8" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else-if="flow>0.9" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>

    <swiper-slide v-if="flow > 0.8 && ort=='og1'" class="leiner-slide">
      <img class="spieler" src="assets/img/leiner.png" width="180"/>
      <img class="pfeil" src="assets/objekte/og/tutorial/tutorial_og_pfeil_9.jpg" style="height: 90%;"/>
      <button-weiter-component class="button-weiter" v-if="flow>0.8" @click="swiperInstance.slideNext();" />
      <button-weiter-component class="button-weiter" v-else-if="flow>0.9" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>

    <swiper-slide v-if="flow > 0.8 && ort=='og1'" class="leiner-slide">
      <img class="spieler" src="assets/img/leiner.png" width="180"/>
      <img class="pfeil" src="assets/objekte/og/tutorial/tutorial_og_pfeil_10.jpg" style="height: 90%;"/>
      <button-weiter-component class="button-weiter" v-if="flow>0.8" @click="swiperInstance.slideNext();" />
      <button-weiter-component class="button-weiter" v-else-if="flow>0.9" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>

    <swiper-slide v-if="flow > 0.8 && ort=='og1'" class="leiner-slide">
      <img class="spieler" src="assets/img/leiner.png" width="180"/>
      <p style="font-size: 26px;">Das ist einer meiner Lieblingsräume mit Kunst aus den alten Kirchen von Konstanz. Folgt dem Pfeil in den Zunftsaal.</p>
      <img class="pfeil" src="assets/objekte/og/tutorial/tutorial_og_pfeil_11.jpg" style="height: 65%;"/>
      <button-weiter-component class="button-weiter" v-if="flow>0.8" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else-if="flow>0.9" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>

    <swiper-slide v-if="flow >= 0.9" class="leiner-slide">
      <img src="assets/img/leiner.png" width="180" style="margin-left: auto; margin-right: auto; display: block;"/>
      <span v-if="ort=='eg'">
        <p> Oh Schreck, ein Skelett! </p>
        <p> Und was höre ich da? Es gibt einen neuen Diebstahl! </p>
        <p> Geht schnell in die Detektivecke. </p>
        <p> Ich verlasse mich auf Euch. Bewahrt mein Erbe! </p>      </span>
      <span v-else-if="ort=='og1'" >        
        <p> Das ist die gute alte Stube unseres Hauses. </p>
        <p> Aber was höre ich da? Der Detaildieb hat wieder zugeschlagen? </p>
        <p> Geht schnell zum Detektivlogo. </p>
        <p> Ich verlasse mich auf Euch! Bewahrt mein Erbe! </p>
      </span>
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
      swiperInstance.value.slideTo(6);
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
  if (richtig && flow.value < 0.71) {
    // flow = 0.71;
    flow.value = 0.79;
  }
}

</script>

<style scoped>
.leiner-slide {
  background-color: rgb(110, 107, 102);
  color: white;
  /* background-color: rgb(178, 178, 178); */
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