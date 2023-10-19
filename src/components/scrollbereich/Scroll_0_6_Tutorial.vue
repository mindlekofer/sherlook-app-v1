<template>
<div ref="scrollContentA" id="content-scroll">

    <swiper @swiper="onSwiper" @reachEnd="onSliderEndReached" id="swiper-haupt" :slidesPerView="1" :spaceBetween="50" :freeMode="false" :scrollbar="false" :navigation="false" :pagination="true" :modules="modules">
        
        <swiper-slide v-if="spielStore.flow >=0.6">
            <span v-if="spielStore.spieler=='Watson'">
              <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="200"/>
              <p>
                Willkommen im Detektivbüro Holmes! 
              </p>
              <p>
                Mein Name ist Watson, Dr. Watson!
              </p>
              <p>
                Wie sagt doch Sherlock immer: <br>Als erstes muss man sich den Tatort genau anschauen. 
              </p>    
              <p>
                Seid ihr bereit?
              </p>
              <p>
                <br>
                <i>(Swiped oder drückt den grünen Weiter-Button um auf die nächste Seite zu gelangen)</i>
              </p>
            </span>
            <span v-else-if="spielStore.spieler=='Sherlock'">
              <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="200"/>
              <p>
                Mein Name ist Holmes, Sherlock Holmes.
              </p>
              <p>
                Lasst uns den Tatort genau anschauen. Jede kleine Beobachtung kann später von unschätzbarem Wert sein. 
              </p>
              <p>
                Seid ihr bereit?
              </p>
              <p>
                <br>
                <i>(Swiped oder drückt den grünen Weiter-Button um auf die nächste Seite zu gelangen)</i>
              </p>
            </span>
            <span v-else>
              <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="200"/>
              <p>
                Mein Name ist Enola Holmes.
              </p>
              <p>
                Diese Detaildiebe machen mich wirklich neugierig! 
              </p>
              <p>
                Schauen wir uns um, in diesem wunderbaren Museum... 
              </p>
              <p>
                Seid ihr bereit?
              </p>
              <p>
                <br>
                <i>(Swiped oder drückt den grünen Weiter-Button um auf die nächste Seite zu gelangen)</i>
              </p>
            </span>
            <div class="swipe-geste-vertikal" v-if="spielStore.flow==0.6"></div>
            <button-weiter-component class="button-weiter" @click="spielStore.flow = 0.7;swiperInstance.slideNext();" pulsiert v-if="spielStore.flow == 0.6"/>
            <button-weiter-component class="button-weiter" @click="swiperInstance.slideNext()" v-else/>
            
            <!-- <button-weiter-component class="button-weiter" @click="spielStore.flow = 0.7; scrollZumEnde()" pulsiert/> -->
            <!-- <button-weiter-component class="button-weiter" @click="spielStore.flow = 0.7" v-if="spielStore.flow < 0.7"/> -->
        </swiper-slide>

        <swiper-slide v-if="spielStore.flow >= 0.6">
          <span v-if="antwortClicked && !antwortRichtig">
            <span v-if="spielStore.spieler=='Watson'">
              <img src="assets/img/detektive/watson_enttaeuscht.png" width="210"/>
              
            </span>
            <span v-else-if="spielStore.spieler=='Sherlock'">
              <img src="assets/img/detektive/sherlock_enttaeuscht.png" width="210"/>
              
            </span>
            <span v-else>
              <img src="assets/img/detektive/enola_enttaeuscht.png" width="210"/>

            </span>
          </span>
          <span v-else-if="antwortClicked && antwortRichtig">
            <span v-if="spielStore.spieler=='Watson'">
              <img src="assets/img/detektive/watson_gluecklich.png" width="210"/>
              
            </span>
            <span v-else-if="spielStore.spieler=='Sherlock'">
              <img src="assets/img/detektive/sherlock_gluecklich.png" width="210"/>
              
            </span>
            <span v-else>
              <img src="assets/img/detektive/enola_gluecklich.png" width="210"/>

            </span>
          </span>
          <span v-else>
            <span v-if="spielStore.spieler=='Watson'">
              <img src="assets/img/detektive/watson_enttaeuscht.png" width="210"/>
              <p>
                Hier im Erdgeschoss soll es eine Büste des Museumsgründers geben! Wisst ihr, wie er heißt?
              </p>
            </span>
            <span v-else-if="spielStore.spieler=='Sherlock'">
              <img src="assets/img/detektive/sherlock_enttaeuscht.png" width="210"/>
              <p>
                Hier im Erdgeschoss gibt es eine Büste des Museumsgründers! Wisst ihr, wie er heißt?
              </p>
            </span>
            <span v-else>
              <img src="assets/img/detektive/enola_enttaeuscht.png" width="210"/>
              <p>
                Hier im Erdgeschoss gibt es eine Büste des Museumsgründers! Wisst ihr, wie er heißt?
              </p>
            </span>
          </span>
          <div class="antwort-buttons" v-if="spielStore.spieler=='Watson'">
              <ion-button :color="buttonFarbe1" :fill="buttonFill1" size="large" expand="block" @click="antwortClicked = 1; antwortRichtig = true; spielStore.flow=0.71;">Ludwig Leiner</ion-button>
              <ion-button :color="buttonFarbe2" :fill="buttonFill2" size="large" expand="block" @click="antwortClicked = 2; antwortRichtig = false" :disabled="antwortRichtig">Sherlock Holmes</ion-button>
              <ion-button :color="buttonFarbe3" :fill="buttonFill3" size="large" expand="block" @click="antwortClicked = 3; antwortRichtig = false" :disabled="antwortRichtig">Ludwig van Beethoven</ion-button>
          </div>
          <div class="antwort-buttons" v-else-if="spielStore.spieler=='Sherlock'">
            <ion-button :color="buttonFarbe1" :fill="buttonFill1" size="large" expand="block" @click="antwortClicked = 1; antwortRichtig = true; spielStore.flow=0.71;">Ludwig Leiner</ion-button>
            <ion-button :color="buttonFarbe2" :fill="buttonFill2" size="large" expand="block" @click="antwortClicked = 2; antwortRichtig = false" :disabled="antwortRichtig">Ludwig van Beethoven</ion-button>
            <ion-button :color="buttonFarbe3" :fill="buttonFill3" size="large" expand="block" @click="antwortClicked = 3; antwortRichtig = false" :disabled="antwortRichtig">Ludwig Wittgenstein</ion-button>
          </div>
          <div class="antwort-buttons" v-else>
            <ion-button :color="buttonFarbe1" :fill="buttonFill1" size="large" expand="block" @click="antwortClicked = 1; antwortRichtig = true; spielStore.flow=0.71;">Ludwig Leiner</ion-button>
            <ion-button :color="buttonFarbe2" :fill="buttonFill2" size="large" expand="block" @click="antwortClicked = 2; antwortRichtig = false" :disabled="antwortRichtig">Tobias Engelsing</ion-button>
            <ion-button :color="buttonFarbe3" :fill="buttonFill3" size="large" expand="block" @click="antwortClicked = 3; antwortRichtig = false" :disabled="antwortRichtig">Ignaz Heinrich von Wessenberg</ion-button>
          </div>
          <button-weiter-component class="button-weiter" disabled v-if="spielStore.flow <= 0.7"/>
          <button-weiter-component class="button-weiter" pulsiert @click="spielStore.flow = 0.72; swiperInstance.slideNext(); " v-else-if="spielStore.flow == 0.71"/>
          <button-weiter-component class="button-weiter" @click="swiperInstance.slideNext(); " v-else/>

        </swiper-slide>

        <!-- <button-weiter-component class="button-weiter" @click="spielStore.flow = 0.8" v-if="quizStatus == 'richtig'"/>
        <button-weiter-component class="" @click="weiterClicked()" v-else-if="antwortClicked > 0"/>
            <button-weiter-component class="button-quiz" disabled @click="spielStore.flow = 0.8" v-else/> -->
        <swiper-slide v-if="spielStore.flow >= 0.71">
            <div class="spieler_logo">
              <img src="assets/img/detektive/watson_gluecklich.png" width="100" v-if="spielStore.spieler=='Watson'"/>
                <img src="assets/img/detektive/sherlock_gluecklich.png" width="200" v-else-if="spielStore.spieler=='Sherlock'"/>
                <img src="assets/img/detektive/enola_gluecklich.png" width="200" v-else-if="spielStore.spieler=='Enola'"/>
                <img src="assets/kopf_mit_hals.svg" width="200" v-else/>
            </div>
            <span v-if="spielStore.ort=='eg' && spielStore.spieler=='Watson'">
              <!-- <p>
                Sehr gut, die Antwort ist richtig! 
              </p>
              <p>
                Lasst uns also diese Büste von Ludwig Leiner suchen.
              </p> -->
              <p>
                Startet hier beim Detektivbüro und geht hinaus in den Flur. Folgt den Pfeilen auf den Fotos. Dann findet ihr die Büste!
              </p>
            </span>
            <span v-else-if="spielStore.ort=='eg' && spielStore.spieler=='Sherlock'">
              <p>
                Sehr gut, die Antwort ist richtig! 
              </p>
              <p>
                Lasst uns also diese Büste von Ludwig Leiner suchen.
              </p>
              <p>
                Am besten wir gehen durch den Flur. Folgt mir und den Pfeilen auf den Fotos. Dann finden wir die Büste!
              </p>
            </span>
            <span v-else-if="spielStore.ort=='eg' && spielStore.spieler=='Enola'">
              <p>
                Sehr gut, die Antwort ist richtig! 
              </p>
              <p>
                Aber noch haben wir diese Büste von Ludwig Leiner nicht gefunden.
              </p>
              <p>
                Am besten wir gehen durch den Flur. Folgt mir und den Pfeilen auf den Fotos...
              </p>
            </span>
            <span v-else-if="spielStore.spieler=='Watson'">
              <p style="font-size: 26px;" >
                Sehr gut, die Antwort ist richtig! 
              </p>
              <p style="font-size: 26px;" >
                Lasst uns also diesen Schreibtisch von Ludwig Leiner suchen.
              </p>
              <p style="font-size: 26px;" >
                Er steht im ersten Obergeschoss. Startet hier beim Detektivbüro und geht durch das Treppenhaus nach oben. Folgt den Pfeilen auf den Fotos.
              </p>
            </span>
            <span v-else-if="spielStore.spieler=='Sherlock'">
              <p>
                Sehr gut, die Antwort ist richtig! 
              </p>
              <p>
                Lasst uns also diesen Schreibtisch von Ludwig Leiner suchen.
              </p>
              <p>
                Er steht im ersten Obergeschoss. Gehen wir durch's Treppenhaus nach oben. Folgt mir und den Pfeilen auf den Fotos!
              </p>
            </span>
            <span v-else>
              <p>
                Sehr gut, die Antwort ist richtig! 
              </p>
              <p>
                Aber noch haben wir den Schreibtisch von Ludwig Leiner nicht gefunden.
              </p>
              <p>
                Am besten wir gehen durch das Treppenhaus nach oben. Folgt mir und den Pfeilen auf den Fotos!
              </p>
            </span>
            <div class="pfeile-zusammen_" v-if="spielStore.ort=='eg'">
              <img class="pfeil" src="assets/objekte/eg/tutorial/tutorial_eg_pfeil_1.jpg" width="300"/>
              <!-- <img class="pfeil" src="assets/objekte/eg/tutorial/tutorial_eg_pfeil_2.jpg"/> -->
              <!-- <img class="pfeil" src="assets/objekte/eg/tutorial/tutorial_eg_pfeil_3.jpg"/> -->
            </div>
            <div class="pfeile-zusammen_" v-else>
              <img class="pfeil" src="assets/objekte/og/tutorial/tutorial_og_pfeil_1.jpg" width="200"/>
              <!-- <img class="pfeil" src="assets/objekte/og/tutorial/tutorial_og_pfeil_2.jpg"/>
              <img class="pfeil" src="assets/objekte/og/tutorial/tutorial_og_pfeil_3.jpg"/>
              <img class="pfeil" src="assets/objekte/og/tutorial/tutorial_og_pfeil_4.jpg"/>
              <img class="pfeil" src="assets/objekte/og/tutorial/tutorial_og_pfeil_5.jpg"/> -->
            </div>
            <button-weiter-component class="button-weiter" :pulsiert="spielStore.flow==0.71" @click="spielStore.flow = 0.73; swiperInstance.slideNext();"/>
        </swiper-slide>

        <swiper-slide v-if="spielStore.flow>=0.72">
          <div class="spieler_logo">
              <img src="assets/img/detektive/watson_neutral.png" width="200" v-if="spielStore.spieler=='Watson'"/>
                <img src="assets/img/detektive/sherlock_neutral.png" width="200" v-else-if="spielStore.spieler=='Sherlock'"/>
                <img src="assets/img/detektive/enola_neutral.png" width="200" v-else-if="spielStore.spieler=='Enola'"/>
                <img src="assets/kopf_mit_hals.svg" width="200" v-else/>
            </div>
            <span v-if="spielStore.ort=='eg' && spielStore.spieler=='Watson'">
              <p style="margin-bottom: 50px;">
                Am Ende des Gangs biegt ihr noch einmal nach rechts ab und geht zurück in das alte "Haus zum Rosgarten". Dann steht ihr erst mal wieder an der Kasse.
              </p>
            </span>
            <span v-else-if="spielStore.ort=='eg' && spielStore.spieler=='Sherlock'">
              <p>
                Am Ende des Gangs biegt ihr wieder nach rechts ab und geht zurück in das alte "Haus zum Rosgarten".
              </p>
            </span>
            <span v-else-if="spielStore.ort=='eg' && spielStore.spieler=='Enola'">
              <p style="margin-top: 90px; margin-bottom: 100px;">
                Am Ende des Gangs bitte nach rechts abbiegen.                
              </p>
            </span>
            <span v-else-if="spielStore.spieler=='Watson'">
              <p style="margin-top: 90px; margin-bottom: 90px;">
                Jetzt durch eine zweite Tür und dann links die Treppe hoch.
              </p>
            </span>
            <span v-else-if="spielStore.spieler=='Sherlock'">
              <p style="margin-top: 70px; margin-bottom: 90px;">
                Hinter der nächsten Tür geht es links die Treppe hoch.
              </p>
            </span>
            <span v-else>
              <p style="margin-top: 70px; margin-bottom: 90px;">
                Bitte nach der nächsten Tür links abbiegen und die Treppen hochgehen.
              </p>
            </span>
            <div v-if="spielStore.ort=='eg'">
              <img class="pfeil" src="assets/objekte/eg/tutorial/tutorial_eg_pfeil_2.jpg" width="200"/>
            </div>
            <div class="pfeile_zusammen" style="display:flex;" v-else>
              <img src="assets/objekte/og/tutorial/tutorial_og_pfeil_2.jpg" width="200" style="margin-right: 20px;"/>
              <img src="assets/objekte/og/tutorial/tutorial_og_pfeil_3.jpg" width="200">
            </div>
            <button-weiter-component class="button-weiter" :pulsiert="spielStore.flow==0.72" @click="spielStore.flow = 0.74; swiperInstance.slideNext();"/>
        </swiper-slide>

        <swiper-slide v-if="spielStore.flow>=0.73">
          <div class="spieler_logo">
              <img src="assets/img/detektive/watson_neutral.png" width="200" v-if="spielStore.spieler=='Watson'"/>
                <img src="assets/img/detektive/sherlock_neutral.png" width="200" v-else-if="spielStore.spieler=='Sherlock'"/>
                <img src="assets/img/detektive/enola_neutral.png" width="200" v-else-if="spielStore.spieler=='Enola'"/>
                <img src="assets/kopf_mit_hals.svg" width="200" v-else/>
            </div>
            <span v-if="spielStore.ort=='eg' && spielStore.spieler=='Watson'">
              <p style="font-size: 24px;">
                So jetzt ist es nicht mehr schwer die Büste von Ludwig Leiner zu finden.<br>
                Keine Sorge: Auch die Hightech-Lupe wird Euch helfen! 
                Ein dunkler Rahmen bedeutet kalt: Die Büste von Ludwig Leiner ist noch weit entfernt. 
                Je heller die Lupe aufleuchtet, desto näher seid ihr am Ziel. 
                <br>Braucht ihr noch mehr Hilfe? 
                Dann drückt auf den Button mit der Karte.
              </p>
            </span>
            <span v-else-if="spielStore.ort=='eg' && spielStore.spieler=='Sherlock'">
              <p style="font-size: 26px;">
                Achtet jetzt auf die Hightech-Lupe. Sie liefert uns wichtige Hinweise. 
                Ein dunkler Rahmen bedeutet kalt: Die Büste von Ludwig Leiner ist noch weit entfernt. 
                Je heller die Lupe aufleuchtet, desto näher sind wir dem Ziel. 
                <br>Braucht ihr noch mehr Hilfe? 
                Dann drückt auf den Button mit der Karte.
              </p>
            </span>
            <span v-else-if="spielStore.ort=='eg' && spielStore.spieler=='Enola'">
              <p style="font-size: 25px;">
                Gleich werdet ihr sehen, was die Hightech-Lupe alles kann. 
                Ein dunkler Rahmen bedeutet kalt: Die Büste von Ludwig Leiner ist noch weit entfernt. 
                Je heller die Lupe aufleuchtet, desto näher seid ihr dem Ziel. 
                <br>
                Braucht ihr noch mehr Hilfe? Dann drückt auf den Button mit der Karte.
              </p>
            </span>
            <span v-else-if="spielStore.spieler=='Watson'">
              <p style="margin-top: 60px; margin-bottom: 60px;">
                Im ersten Obergeschoss geht es nach links zum Schreibtisch von Ludwig Leiner.
              </p>
            </span>
            <span v-else-if="spielStore.spieler=='Sherlock'">
              <p style="margin-top: 70px; margin-bottom: 80px;">
                Am Ende der Treppe nach links abbiegen in den Raum mit dem schönen Parkettboden.
              </p>
            </span>
            <span v-else>
              <p style="margin-top: 70px; margin-bottom: 70px;">
                Am Ende der Treppe bitte links abbiegen. Der Schreibtisch von Ludwig Leiner ist schon in Sichtweite!
              </p>
            </span>
            <div v-if="spielStore.ort=='eg'">
              <img class="pfeil" src="assets/objekte/eg/tutorial/tutorial_eg_pfeil_3.jpg" width="170"/>
            </div>
            <div style="display:flex;" v-else>
              <img class="pfeil" src="assets/objekte/og/tutorial/tutorial_og_pfeil_4.jpg" width="250" />
            </div>
            <button-weiter-component class="button-weiter" :pulsiert="spielStore.flow==0.74" @click="spielStore.flow = 0.75; swiperInstance.slideNext()"/>
        </swiper-slide>

        <swiper-slide v-if="spielStore.flow >= 0.75">
            <div class="spieler_logo">
              <img src="assets/img/detektive/watson_neutral.png" width="200" v-if="spielStore.spieler=='Watson'"/>
              <img src="assets/img/detektive/sherlock_neutral.png" width="200" v-else-if="spielStore.spieler=='Sherlock'"/>
              <img src="assets/img/detektive/enola_neutral.png" width="200" v-else-if="spielStore.spieler=='Enola'"/>
              <img src="assets/kopf_mit_hals.svg" width="200" v-else/>
            </div>
            <p>Super. Der Rahmen der Lupe beginnt zu leuchten!</p>
            <p>Wir sind dem Objekt nah und können es mit der Kamera der Hightech- Lupe aufspüren.</p>
            <p>Drückt auf das pulsierende Kamerasymbol.</p>
        </swiper-slide>

        <swiper-slide v-if="spielStore.flow >= 0.81">
            <div class="spieler_logo">
              <img src="assets/img/leiner.png" width="200"/>
            </div>
            <p>
              Ich bin der Geist von Ludwig Leiner!
              Im Garten draußen steht sogar ein Grabstein meiner Vorfahren.
            </p>
            <p> 
              Und nun wagt man meine Ruhe zu stören. 
              Gut, dass ihr mich gefunden habt. 
            </p>
            <p>
              Beschützt mein Vermächtnis und überführt die Detaildiebe.
            </p>
            <button-weiter-component class="button-weiter" :pulsiert="spielStore.flow==0.8" @click="spielStore.flow = 0.82; swiperInstance.slideNext()"/>
        </swiper-slide>

        <swiper-slide v-if="spielStore.flow >= 0.82">
            <div class="spieler_logo">
              <img src="assets/img/leiner.png" width="200"/>
            </div>
            <span v-if="spielStore.ort=='eg'">
              <p style="margin-top: 50px; font-size: 32px;">
                Überall nimmt dieser Dieb oder diese Diebin kleine Dinge mit. 
                Sogar aus diesen alten Vitrinen, die ich noch eigenhändig bestückt habe.
              </p>
              <p style="margin-top: 50px; font-size: 32px;">
                Schaut Euch um, damit ihr später gut nach den verschwundenen Details suchen könnt. 
                Am besten ich zeige Euch einen neuen Weg zurück ins Detektivbüro. 
                Da gibt einen, der führt mitten durchs Museum. Seid ihr bereit?
              </p>
            </span>
            <span v-else>
              <p style="margin-top: 50px; font-size: 32px;">
                Überall nimmt dieser Dieb kleine Dinge mit.<br>
                Sogar von meinem Schreibtisch, wenn ich nicht aufpasse.
              </p>
              <p style="margin-top: 50px; font-size: 32px;">
                Schaut Euch um, damit ihr später gut nach den Diebstählen suchen könnt.
              </p>
            </span>
            <button-weiter-component class="button-weiter" :pulsiert="spielStore.flow==0.81" @click="spielStore.flow = 0.83; swiperInstance.slideNext()"/>
        </swiper-slide>

        <swiper-slide v-if="spielStore.flow >= 0.83">
            <div class="spieler_logo">
              <img src="assets/img/leiner.png" width="200"/>
            </div>
            <span v-if="spielStore.ort=='eg'">
              <p  style="margin-top: 50px; font-size: 30px;">
                Geht aus dem Leinersaal hinaus und dreht Euch nochmal um.
              </p>
              <p style=" margin-bottom: 50px;">
                Über der Tür steht etwas in einer sehr alten Schrift. Könnt ihr das lesen?
              </p>
              <img style="margin-left: 30px;" src="assets/objekte/eg/tutorial/tutorial_eg_schild_1.jpg" width="400"/>
            </span>
            <span v-else>
              <p  style="font-size: 24px;">
                Habt ihr Euch auch den Biedermeier-Schrank hier im Nebenraum angeschaut? 
              </p>
              <p  style="font-size: 24px;">
                Dann lasst uns zurück in Richtung Treppenhaus gehen. <br>
                Unser Weg führt wieder durch den Raum mit Gemälden aus dem 18. und 19. Jahrhundert. 
              </p>
              <p style="font-size: 24px;">
                Augen auf! Da gibt es vieles zu entdecken!
              </p>
              <img class="pfeil" src="assets/objekte/og/tutorial/tutorial_og_pfeil_6.jpg" width="200" />
            </span>
            <button-weiter-component class="button-weiter" :pulsiert="spielStore.flow==0.81" @click="spielStore.flow = 0.84; swiperInstance.slideNext()"/>
        </swiper-slide>

        <swiper-slide v-if="spielStore.flow >= 0.84">
            <div class="spieler_logo">
              <img src="assets/img/leiner.png" width="200"/>
            </div>
            <span v-if="spielStore.ort=='eg'">
              <img style="margin-top: 40px;" src="assets/objekte/eg/tutorial/tutorial_eg_schild_1.jpg" width="300"/>
              <p>
                Da steht:
                „Der Heimath Boden und dessen Urbewohner“.
              </p>
              <p>
                Das meint: <br>
                Im Raum ist "heimatlicher Boden" ausgestellt, also Dinge, 
                die ich am Ufer des schönen Bodensees ausgegraben habe: 
                Werkzeuge aus den ersten Pfahlbauten und noch ältere Versteinerungen!
              </p>
            </span>
            <span v-else>
              <p style="margin-top: 80px; margin-bottom: 110px;">
                Geht weiter geradeaus und biegt dann nach links auf die neue Brücke ab.
              </p>
              <div class="pfeile_zusammen" style="display:flex;">
                <img src="assets/objekte/og/tutorial/tutorial_og_pfeil_7.jpg" width="200" style="margin-right: 20px;"/>
                <img src="assets/objekte/og/tutorial/tutorial_og_pfeil_8.jpg" width="200">
              </div>
            </span>
            <button-weiter-component class="button-weiter" :pulsiert="spielStore.flow==0.81" @click="spielStore.flow = 0.85; swiperInstance.slideNext()"/>
        </swiper-slide>

        <swiper-slide v-if="spielStore.flow >= 0.85">
            <div class="spieler_logo">
              <img src="assets/img/leiner.png" width="200"/>
            </div>
            <span v-if="spielStore.ort=='eg'">
              <p style="font-size: 26px;">
                Doch nun sollt ihr noch mehr Räume kennenlernen.
              </p>
              <p style="font-size: 26px;">
                Dreht Euch um und geht durch die gegenüber liegende  Tür in einen Raum mit roten Vitrinen. Augen auf, da findet ihr allerlei zur neueren Geschichte unserer schönen Stadt Konstanz!
              </p>
              <img class="pfeil" src="assets/objekte/eg/tutorial/tutorial_eg_pfeil_4.jpg" width="180"/>
            </span>
            <span v-else>
              <p style="margin-top: 60px; margin-bottom: 70px;">
                Lauft über die Brücke mit Holzdielen und geht am Ende nach rechts durch die Tür zurück in das alte Haus "Zum Rosgarten".
              </p>
              <div class="pfeile_zusammen" style="display:flex;">
                <img src="assets/objekte/og/tutorial/tutorial_og_pfeil_9.jpg" width="200" style="margin-right: 20px;"/>
                <img src="assets/objekte/og/tutorial/tutorial_og_pfeil_10.jpg" width="200">
              </div>
            </span>
            <button-weiter-component class="button-weiter" :pulsiert="spielStore.flow==0.81" @click="spielStore.flow = 0.86; swiperInstance.slideNext()"/>
        </swiper-slide>

        <swiper-slide v-if="spielStore.flow >= 0.86">
            <div class="spieler_logo">
              <img src="assets/img/leiner.png" width="200"/>
            </div>
            <span v-if="spielStore.ort=='eg'">
              <p>
                Wenn ihr genug gesehen habt, geht durch die Tür in der anderen Ecke des Raums. Dann seid ihr fast schon wieder im Detektivbüro!
              </p>
              <img class="pfeil" src="assets/objekte/eg/tutorial/tutorial_eg_pfeil_5.jpg" width="180"/>
            </span>
            <span v-else>
              <p style="margin-top: 60px; margin-bottom: 60px;">
                Hier ist überall Kunst aus den alten Kirchen von Konstanz zu sehen. Die Stellwände in der Mitte sind Rot angemalt. Man nennt das auch das Rosgarten-Rot!
              </p>
              <img class="pfeil" src="assets/objekte/og/tutorial/tutorial_og_rot.jpg" width="310" />
            </span>
            <button-weiter-component class="button-weiter" :pulsiert="spielStore.flow==0.81" @click="spielStore.flow = 0.87; swiperInstance.slideNext()"/>
        </swiper-slide>

        <swiper-slide v-if="spielStore.flow >= 0.87">
            <div class="spieler_logo">
              <img src="assets/img/leiner.png" width="200"/>
            </div>
            <span v-if="spielStore.ort=='eg'">
              <p>
                Nicht erschrecken! Vorher müsst ihr noch an einem echten Skelett vorbei. <br>
                Es stammt aus dem römischen Konstanz.
              </p>
              <p>
                Und nun schaut auf die Hightech-Lupe. 
              </p>
              <p>
                Je näher ihr dem Detektivbüro kommt, desto stärker beginnt sie zu leuchten!
              </p>
            </span>
            <span v-else>
              <p style="margin-top: 50px; margin-bottom: 50px;">
                Doch nun sucht endlich den Zunftsaal und das Foto, das ihr in der magischen Lupe seht. Sie wird sicher gleich aufleuchten...
              </p>
              <img class="pfeil" src="assets/objekte/og/tutorial/tutorial_og_pfeil_11.jpg" width="240" />
            </span>
            <button-weiter-component class="button-weiter" :pulsiert="spielStore.flow==0.81" @click="spielStore.flow = 0.88; swiperInstance.slideNext()"/>
        </swiper-slide>


        <swiper-slide class="posting-slide" v-if="spielStore.flow >= 0.95">
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
// Imports //
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useSpielStore } from '@/stores/SpielStore'
import { IonButton } from '@ionic/vue';
import ButtonWeiterComponent from '../ButtonWeiterComponent.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Pagination, Navigation, FreeMode, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/scrollbar';

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
  else {
    buttonFarbe1.value  = "primary";
    buttonFarbe2.value  = "primary";
    buttonFarbe3.value  = "primary";
  }
});

// Flow //
watch(flow, () => {
  console.log(`(scroll tutorial) flow geändert auf ${flow.value}`);
  if (flow.value == 0) {
    antwortClicked.value = 0;
    antwortRichtig.value = false;
    swiperInstance.value.slideTo(0);
  }
  // if ( flow.value == 0.7 ) {
    
  // }
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
.swipe-geste-vertikal {
  width: 50px;
  height: 50px;
  background-color: black;
  border-radius: 50%;
  opacity: 50%;
  margin-right: auto;
  margin-left: auto;
  /* transform: translateX(40px); */
  animation: swipe-vertikal-animation 2s ease-in-out infinite;
}
@keyframes swipe-vertikal-animation {
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
    margin-bottom: 90px;
    /* position: absolute; */
    bottom: 100px;
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
.spieler {
    margin: 10px;
    margin-top: 0px;
    /* transform: scaleX(-1); */
    float: right;
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
  display: block;
  margin-left: 100px;
  margin-right: auto;
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