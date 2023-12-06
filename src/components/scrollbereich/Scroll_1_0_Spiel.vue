<template>
<div ref="scrollContentA" id="content-scroll">

  <swiper @swiper="onSwiper" @reachEnd="onSliderEndReached" @activeIndexChange="onSlideChanged" id="swiper-haupt" :slidesPerView="1" :spaceBetween="50" :freeMode="false" :scrollbar="false" :navigation="false" :pagination="true" :modules="modules">
      
    <swiper-slide v-if="flow >=1.0 && flow<2.0">
      <span v-if="spieler=='Watson'">
        <img src="assets/img/detektive/watson_gluecklich.png" width="250" style="margin-left: auto; margin-right: auto; display: block;"/>
        <p style="margin-top: 20px;"> Lieber Herr Leiner, das Team Watson geht an den Start! </p>
        <p> Klickt bitte auf die Lupe Nr. 1 und beantwortet meine Frage zum ersten Detail. </p>
      </span>
      <span v-else-if="spieler=='Sherlock'">
        <img src="assets/img/detektive/sherlock_gluecklich.png" width="260" style="margin-left: auto; margin-right: auto; display: block;"/>
        <!-- <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="300"/> -->
        <p style="margin-top: 40px;"> Lieber Herr Leiner, keine Sorge. Das Team Sherlock ist bereit. Wir werden alle Fälschungen finden und den Fall aufklären. </p>
        <p> Klickt bitte auf die Lupe Nr. 1 und beantwortet meine Frage zum ersten verdächtigen Detail. </p>
      </span>
      <span v-else>
        <img src="assets/img/detektive/enola_gluecklich.png" width="250" style="margin-left: auto; margin-right: auto; display: block;"/>
        <p style="margin-top: 20px;"> Ja, lieber Herr Leiner, leider scheint es weitere Diebstähle und Fälschungen in Ihrem schönen Museum zu geben. </p>
        <p> Liebes Team, klickt bitte auf die Lupe Nr. 1 und beantwortet meine Frage zum ersten verdächtigen Detail.</p>
      </span>
      <!-- <div class="swipe-geste-vertikal" v-if="flow==0.6"></div> -->
      <!-- <div class="swipe-geste-vertikal"></div> -->
      <!-- <button-weiter-component class="button-weiter" v-if="flow==1.0" @click="swiperInstance.slideNext();" pulsiert/> -->
      <button-weiter-component class="button-weiter" v-if="flow>1.0" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
      <!-- <button-weiter-component class="button-weiter" disabled /> -->
    </swiper-slide>

    <!-- Quiz zu Detail 1 -->
    <swiper-slide v-if="flow >= 1.1 && flow<2.0">
      <span v-if="!antwortClicked && ort=='eg'">
        <span v-if="spieler=='Watson'">
          <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="210"/>
          <p style="margin-top: 50px;"> Ganz schön schwierig... </p>
          <p> Was könnte hier gefälscht worden sein? </p>
        </span>
        <span v-else-if="spieler=='Sherlock'">
          <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="230"/>
          <p style="margin-top: 50px;"> Nicht einfach... </p>
          <p> Welches Fossil könnte hier gefälscht worden sein? </p>
        </span>
        <span v-else>
          <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="210"/>
          <p style="margin-top: 50px;"> Nicht einfach zu erkennen... </p>
          <p> Welches Fossil könnte hier gefälscht worden sein? </p>
        </span>
      </span>
      <span v-else-if="!antwortClicked && ort=='og1'">
        <span v-if="spieler=='Watson'">
          <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="210"/>
          <p style="margin-top: 20px;"> Das sieht ja seltsam aus. </p>
          <p> Da frage ich euch doch erstmal: WAS könnte hier gefälscht worden sein? </p>
        </span>
        <span v-else-if="spieler=='Sherlock'">
          <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="230"/>
          <p style="margin-top: 50px;"> Das sieht aus wie ein schmuckvolles Präparat. </p>
          <p> Aber was  genau könnte hier gefälscht worden sein? </p>
        </span>
        <span v-else>
          <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="210"/>
          <p style="margin-top: 50px;"> Ein Schmuckstück mit Haaren? Hoffentlich ist das keine Fälschung! </p>
          <p> Denn es wurde zu einem wichtigen Anlass hergestellt. Wozu? </p>
        </span>
      </span>
      <span v-else-if="!antwortRichtig">
        <span v-if="spieler=='Watson'">
          <img class="spieler" src="assets/img/detektive/watson_enttaeuscht.png" width="210"/>
          <p style="margin-top: 70px;"> Die Antwort ist leider falsch, versucht es noch einmal!</p>
        </span>
        <span v-else-if="spieler=='Sherlock'">
          <img class="spieler" src="assets/img/detektive/sherlock_enttaeuscht.png" width="230"/>
          <p style="margin-top: 70px;"> Die Antwort ist nicht richtig, aber ihr bekommt nochmal eine Chance. </p>
        </span>
        <span  v-else-if="spieler=='Enola'">
          <img class="spieler" src="assets/img/detektive/enola_enttaeuscht.png" width="210"/>
          <p style="margin-top: 90px;"> Leider falsch, versucht es noch einmal. </p>
        </span>
      </span>
      <span v-else-if="antwortRichtig">
        <span v-if="spieler=='Watson'">
          <img class="spieler" src="assets/img/detektive/watson_gluecklich.png" width="210"/>
          <p style="margin-top: 70px;">
            Super, die Antwort ist richtig.
            <br><br>
            Willkommen im Club der Detektive! 
          </p>
        </span>
        <span v-else-if="spieler=='Sherlock'">
          <img class="spieler" src="assets/img/detektive/sherlock_gluecklich.png" width="240"/>
          <p style="margin-top: 80px;"> 
            Sehr gut, die Antwort ist richtig. 
            <br><br>
            Willkommen im Club der Detektive!
          </p>
        </span>
        <span v-else>
          <img class="spieler" src="assets/img/detektive/enola_gluecklich.png" width="210"/>
          <p style="margin-top: 90px;"> 
            Wunderbar, die Antwort ist richtig!
            <br><br>
            So kann es weitergehen...
          </p>
        </span>
      </span>
      <div class="antwort-buttons" v-if="spieler=='Watson' && ort=='eg'">
        <ion-button :color="buttonFarbe1" :fill="buttonFill1" size="large" expand="block" @click="antwortAusgewaehlt(1, true)"> Fossil eines Dinosauriers</ion-button>
        <ion-button :color="buttonFarbe2" :fill="buttonFill2" size="large" expand="block" @click="antwortAusgewaehlt(2, false)" :disabled="antwortRichtig"> alte italienische Handtasche</ion-button>
        <ion-button :color="buttonFarbe3" :fill="buttonFill3" size="large" expand="block" @click="antwortAusgewaehlt(3, false)" :disabled="antwortRichtig">Verzierung eines mittelalterl. Kachelofens</ion-button>
      </div>
      <div class="antwort-buttons" v-else-if="spieler=='Sherlock' && ort=='eg'">
        <ion-button :color="buttonFarbe2" :fill="buttonFill2" size="large" expand="block" @click="antwortAusgewaehlt(2, false)" :disabled="antwortRichtig"> Saugnäpfe eines kleinen Tintenfischs </ion-button>
        <ion-button :color="buttonFarbe1" :fill="buttonFill1" size="large" expand="block" @click="antwortAusgewaehlt(1, true)">Flosse eines großen Fischsauriers</ion-button>
        <ion-button :color="buttonFarbe3" :fill="buttonFill3" size="large" expand="block" @click="antwortAusgewaehlt(3, false)" :disabled="antwortRichtig">Gebiss eines Tyrannosaurus Rex</ion-button>
      </div>
      <div class="antwort-buttons" v-else-if="spieler=='Enola' && ort=='eg'">
        <ion-button :color="buttonFarbe2" :fill="buttonFill2" size="large" expand="block" @click="antwortAusgewaehlt(2, false)" :disabled="antwortRichtig">Saugnäpfe eines kleinen Tintenfischs </ion-button>
        <ion-button :color="buttonFarbe1" :fill="buttonFill1" size="large" expand="block" @click="antwortAusgewaehlt(1, true)">Flosse eines Ichtyosauriers</ion-button>
        <ion-button :color="buttonFarbe3" :fill="buttonFill3" size="large" expand="block" @click="antwortAusgewaehlt(3, false)" :disabled="antwortRichtig">Wirbelsäule eines Dinosauriers</ion-button>
      </div>
      <div class="antwort-buttons" v-else-if="spieler=='Watson' && ort=='og1'">
        <ion-button :color="buttonFarbe2" :fill="buttonFill2" size="large" expand="block" @click="antwortAusgewaehlt(2, false)" :disabled="antwortRichtig"> Stroh </ion-button>
        <ion-button :color="buttonFarbe3" :fill="buttonFill3" size="large" expand="block" @click="antwortAusgewaehlt(3, false)" :disabled="antwortRichtig"> Grashalme </ion-button>
        <ion-button :color="buttonFarbe1" :fill="buttonFill1" size="large" expand="block" @click="antwortAusgewaehlt(1, true)"> Haare </ion-button>
      </div>
      <div class="antwort-buttons" v-else-if="spieler=='Sherlock' && ort=='og1'">
        <ion-button :color="buttonFarbe2" :fill="buttonFill2" size="large" expand="block" @click="antwortAusgewaehlt(2, false)" :disabled="antwortRichtig"> Etui mit Pferdehaar </ion-button>
        <ion-button :color="buttonFarbe1" :fill="buttonFill1" size="large" expand="block" @click="antwortAusgewaehlt(1, true)"> Brosche mit Menschenhaar </ion-button>
        <ion-button :color="buttonFarbe3" :fill="buttonFill3" size="large" expand="block" @click="antwortAusgewaehlt(3, false)" :disabled="antwortRichtig"> Präpariertes Vogelnest </ion-button>
      </div>
      <div class="antwort-buttons" v-else-if="spieler=='Enola' && ort=='og1'">
        <ion-button :color="buttonFarbe1" :fill="buttonFill1" size="large" expand="block" @click="antwortAusgewaehlt(1, true)"> Verlobung oder Hochzeit </ion-button>
        <ion-button :color="buttonFarbe2" :fill="buttonFill2" size="large" expand="block" @click="antwortAusgewaehlt(2, false)" :disabled="antwortRichtig"> Eintritt in ein Kloster </ion-button>
        <ion-button :color="buttonFarbe3" :fill="buttonFill3" size="large" expand="block" @click="antwortAusgewaehlt(3, false)" :disabled="antwortRichtig"> Beisetzung eines Heiligen </ion-button>
      </div>
      <button-weiter-component class="button-weiter" v-if="flow==1.2 && antwortRichtig" @click="swiperInstance.slideNext();" pulsiert/>
      <button-weiter-component class="button-weiter" v-else-if="flow>1.2" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>

    <swiper-slide class="posting-slide" v-if="(flow >= 1.2 && flow<2.0)">
      <swiper :modules="modules" :direction="'vertical'" :scrollbar="true" :mousewheel="true" :slidesPerView="'auto'" :freeMode="true">
        <swiper-slide>
          <span v-if="spieler=='Watson'">
            <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="210"/>
            <p> Und da ist auch schon die erste heiße Spur im Internet. </p>
            <p> Auf Instagram brüstet sich jemand mit diesen Diebstählen. </p>
            <p> Schaut Euch den Post genau an und sucht dann nach der Fälschung hier im Museum. </p>
          </span>
          <span v-else-if="spieler=='Sherlock'">
            <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="250"/>
            <p> Und da schau an! Es gibt eine heiße Spur auf Instagram: da brüstet sich tatsächlich jemand mit diesen Diebstählen und Fälschungen. </p>
            <p> Natürlich wählt er einen Decknamen. Der Account heisst @gerne_gestern. </p>
            <p> Schaut Euch den Post genau an und sucht dann nach der Fälschung hier im Museum. </p>
          </span>
          <span v-else-if="spieler=='Enola'">
            <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="220"/>
            <p> Und schaut mal, was ich auf Instagram gefunden habe, der Account heißt @gerne_gestern. </p>
            <p> Da postet jemand seine Diebstähle und Fälschungen. Wie dreist ist das denn? </p>
            <p> Aber scrollt runter und lest selbst! </p>
          </span>
          <PostingComponent v-if="ort=='eg'"
              username="@gerne_gestern"
              avatar="assets/personen/00x0/gerne_gestern.jpg"
              bild="assets/objekte/eg/00x0_eg_02/00x0_eg_02_post1.jpg"
              hashtag="#schönheit_aus_urzeiten"
              likes="30129"
              @hashtag-clicked="flow=1.3"
              :eingetragen="flow>=1.3">
            <span v-if="spieler=='Watson'">
              Ich habe einen Teil dieses riesigen Gerippes durch eine Fälschung ersetzt!  
              Im nächsten Post erfahrt ihr mehr dazu...
            </span>
            <span v-else-if="spieler=='Sherlock'">
              Auch wenn sich der alte Leiner im Grab umdreht: 
              Ich habe dieses große Fisch-Gerippe durch eine Fälschung ersetzt!  
              Im nächsten Post erfahrt ihr mehr dazu...
            </span>
            <span v-else-if="spieler=='Enola'">
              Auch wenn sich der alte Leiner im Grab umdreht: 
              Ich habe dieses exquisite Gerippe durch eine Fälschung ersetzt! 
              Andere Leute gehen mit Delfinen schwimmen, ich hole mir Ichthyosaurier nach Hause. 
              Im nächsten Post erfahrt ihr mehr dazu...
            </span>
          </PostingComponent>
          <PostingComponent v-if="ort=='og1'"
              username="@gerne_gestern"
              avatar="assets/personen/00x0/gerne_gestern.jpg"
              bild="assets/objekte/og/00x0_og1_ac/00x0_og1_ac_post1.jpg"
              hashtag="#schnipp_schnapp_locke_ab"
              likes="34876"
              @hashtag-clicked="flow=1.3"
              :eingetragen="flow>=1.3">
            <span v-if="spieler=='Watson'">
              Was für eine schöne Biedermeier-Locke. Genau richtig für eine feine Fälschung! Schnipp, schnapp war sie weg!
            </span>
            <span v-else-if="spieler=='Sherlock'">
              Unfassbar, was in dieser Biedermeier-Brosche verborgen ist... 
              Genau richtig für eine feine Fälschung. Schnipp, schnapp war sie weg!
            </span>
            <span v-else-if="spieler=='Enola'">
              Unfassbar, was in dieser Brosche verborgen ist... 
              Aber leichtes Spiel für flinke Fälscherfinger. Schnipp, schnapp war sie weg!
            </span>
          </PostingComponent>
          <p style="margin-bottom: 120px;" v-if="spieler=='Watson'">
            Berührt den pulsierenden Hashtag, dann füllt sich unser Notizbuch
          </p>
          <p style="margin-bottom: 120px;" v-else-if="spieler=='Sherlock'">
            Berührt den pulsierenden Hashtag, dann fliegt er als Hinweis in unser Notizbuch!
          </p>
          <p style="margin-bottom: 120px;" v-else-if="spieler=='Enola'">
            Berührt den pulsierenden Hashtag, dann fliegt er als Hinweis in unser Notizbuch!
          </p>
          <button-weiter-component class="button-weiter" v-if="flow==1.3" @click="swiperInstance.slideNext();" pulsiert/>
          <button-weiter-component class="button-weiter" v-else-if="flow>1.3" @click="swiperInstance.slideNext();"/>
          <button-weiter-component class="button-weiter" v-else disabled />
        </swiper-slide>
      </swiper>
    </swiper-slide>

    <swiper-slide v-if="flow >=1.3 && flow<2.0">
      <span v-if="spieler=='Watson'">
        <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="230"/>
        <p> 
          Ein seltsamer Hinweis! Habt ihr Euch den Post genau angeschaut? 
          Dann sucht bitte das Objekt hier im Museum.
        </p>
        <p>
          Haltet die Augen offen und achtet auf die Hightech-Lupe. 
          Wenn sie blinkt, ist etwas Verdächtiges in der Nähe! 
        </p>
      </span>
      <span v-else-if="spieler=='Sherlock'">
        <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="250"/>
        <p> 
          Sehr gut, ein eigenartiger Hinweis! Habt ihr Euch den Post genau angeschaut? 
          Dann lasst uns die Fälschung hier im Museum suchen.
        </p>
        <p>
          Haltet die Augen offen und achtet auf die Hightech-Lupe. 
          Ihr wisst ja, wenn sie blinkt, ist etwas Verdächtiges in der Nähe! 
        </p>
      </span>
      <span v-else>
        <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="220"/>
        <p> 
          Habt ihr Euch den Post genau angeschaut? 
          Dann lasst uns die Fälschung in den Räumen des Museums finden. 
        </p>
        <p>
          Haltet die Augen offen und achtet auf unsere Hightech-Lupe. 
          Ihr wisst ja, wenn sie blinkt, ist etwas Verdächtiges in der Nähe... 
        </p>
      </span>
      <!-- <div class="swipe-geste-vertikal" v-if="flow==0.6"></div> -->
      <!-- <div class="swipe-geste-vertikal"></div> -->
      <button-weiter-component class="button-weiter" v-if="flow==1.4" @click="swiperInstance.slideNext();" pulsiert/>
      <button-weiter-component class="button-weiter" v-else-if="flow>1.4" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else-if="!btTrigger" @click="flow=1.4"/>
      <button-weiter-component class="button-weiter" v-else disabled />
      <!-- <button-weiter-component class="button-weiter" disabled /> -->
    </swiper-slide>

    <swiper-slide v-if="flow == 1.36 && flow<2.0">
      <span v-if="spieler=='Watson'">
        <img class="spieler" src="assets/img/detektive/watson_enttaeuscht.png" width="230"/>
        <p style="margin-top: 100px;"> 
          Der Rahmen der Lupe ist immer noch dunkel, das Objekt ist wohl noch nicht in der Nähe. 
        </p>
        <p> Braucht ihr einen Tipp? </p>
        <p> Dann drückt doch mal auf die Karte. </p>
      </span>
      <span v-else-if="spieler=='Sherlock'">
        <img class="spieler" src="assets/img/detektive/sherlock_enttaeuscht.png" width="250"/>
        <p style="margin-top: 100px"> Die Lupe ist immer noch dunkel. Kein gutes Zeichen. </p>
        <p> Braucht ihr einen Tipp? Dann drückt doch mal auf die Karte. </p>
      </span>
      <span v-else>
        <img class="spieler" src="assets/img/detektive/enola_enttaeuscht.png" width="220"/>
        <p> Wir tappen irgendwie im Dunkeln. </p>
        <p> Ich denke, wir könnten einen  Tipp gebrauchen. </p>
        <p> Drückt doch mal auf die Karte. </p>
      </span>
      <!-- <div class="swipe-geste-vertikal" v-if="flow==0.6"></div> -->
      <!-- <div class="swipe-geste-vertikal"></div> -->
      <!-- <button-weiter-component class="button-weiter" v-if="flow==1.0" @click="swiperInstance.slideNext();" pulsiert/> -->
      <!-- <button-weiter-component class="button-weiter" v-if="flow>1.46" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled /> -->
      <!-- <button-weiter-component class="button-weiter" disabled /> -->
    </swiper-slide>

    <swiper-slide v-if="flow >=1.4 && flow<2.0">
      <span v-if="spieler=='Watson'">
        <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="230"/>
        <p> Die Lupe blinkt wie verrückt! </p>
        <p> Die Fälschung muss ganz in der Nähe sein. </p>
        <p> Schaltet die Kamera an und überprüft das Objekt! </p>
      </span>
      <span v-else-if="spieler=='Sherlock'">
        <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="250"/>
        <p> Die Lupe blinkt! Sehr gut. </p>
        <p> Die Fälschung muss in der Nähe sein. </p>
        <p> Schaltet die Kamera an und überprüft das Objekt! </p>
      </span>
      <span v-else>
        <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="220"/>
        <p> Die Lupe blinkt immer schneller! </p>
        <p> Die Fälschung muss in der Nähe sein. </p>
        <p> Schaltet die Kamera an und überprüft das Objekt! </p>
      </span>
      <!-- <div class="swipe-geste-vertikal" v-if="flow==0.6"></div> -->
      <!-- <div class="swipe-geste-vertikal"></div> -->
      <button-weiter-component class="button-weiter" v-if="flow==1.6" @click="swiperInstance.slideNext();" pulsiert/>
      <button-weiter-component class="button-weiter" v-else-if="flow>1.6" @click="swiperInstance.slideNext();"/>
        <button-weiter-component class="button-weiter" v-else disabled />
        <!-- <button-weiter-component class="button-weiter" disabled /> -->
    </swiper-slide>

    <swiper-slide class="posting-slide" v-if="flow >= 1.6 && flow<2.0">
      <swiper :modules="modules" :direction="'vertical'" :scrollbar="true" :mousewheel="true" :slidesPerView="'auto'" :freeMode="true">
        <swiper-slide>
          <span v-if="spieler=='Watson'">
            <img class="spieler" src="assets/img/detektive/watson_gluecklich.png" width="210"/>
            <p> Sehr gut! Das ist also auch eine Fälschung. </p>
            <p> Aber wer steckt hinter diesen seltsamen Aktionen? </p>
            <p> Mal schauen, ob wir bei @gerne_gestern mehr über die Tatmotive erfahren. </p>
          </span>
          <span v-else-if="spieler=='Sherlock'">
            <img class="spieler" src="assets/img/detektive/sherlock_gluecklich.png" width="250"/>
            <p> Hervorragend. Die Fälschung ist entlarvt! </p>
            <p> Und es gibt einen zweiten Post von @gerne_gestern. </p>
            <p> Mal schauen, ob wir da mehr über die Tatmotive erfahren... </p>
          </span>
          <span v-else-if="spieler=='Enola'">
            <img class="spieler" src="assets/img/detektive/enola_gluecklich.png" width="220"/>
            <p> Kaum zu glauben: das ist also auch eine Fälschung! </p>
            <p> Und @gerne_gestern geht weiter auf Sendung. Da erfahren wir sicher auch Neues zu den Tatmotiven...</p>
          </span>
          <PostingComponent v-if="ort=='eg'"
              username="@gerne_gestern"
              avatar="assets/personen/00x0/gerne_gestern.jpg"
              bild="assets/objekte/eg/00x0_eg_02/00x0_eg_02_post2.jpg"
              hashtag="#alt_und_geheimnsvoll"
              likes="34521"
              @hashtag-clicked="flow=1.7"
              :eingetragen="flow>=1.7">
              <span v-if="spieler=='Watson'">
                Dieses Gerippe hat einem lebendigen Fischsaurier gehört! 
                So etwas Altes und Geheimnisvolles zieht mich magisch an. 
                Eine Flosse habe ich durch eine kleine Fälschung ersetzt. 
                Jetzt hängt sie über meinem Kühlschrank. 
                Sieht bei mir noch schöner aus als hier im Museum!
              </span>
              <span v-else-if="spieler=='Sherlock'">
                Ich liebe diesen Saal. 
                Hier sieht alles so alt, fremd und geheimnisvoll aus. 
                Erst wusste ich gar nicht, wo ich hinschauen sollte. 
                Dann habe ich den tollen Ichtyo an der Wand entdeckt. 
                Die mag ich noch mehr als Dinos. 
                Ichthyosaurier sind die Fischsaurier. 
                Eine Flosse habe ich durch eine kleine Fälschung ersetzt. 
                Jetzt hängt sie über meinem Kühlschrank. 
                Sieht noch schöner aus als hier im Museum!
              </span>
              <span v-else-if="spieler=='Enola'">
                Ich liebe diesen alten Saal. Hier ist alles so geheimnisvoll. 
                Diese schönen alten Vitrinen, vom Museumsgründer selbst entworfen. 
                Aber bei aller Liebe: etwas vollgestopft ist es schon. 
                Ich wusste erst gar nicht, wo ich hinschauen sollte. 
                Dann habe ich den tollen Ichtyo an der Wand entdeckt. 
                Die mag ich noch mehr als Dinos. Ichthyosaurier sind die Fischsaurier. 
                Ich finde: diesen da könnte man noch mehr zum Highlight machen! 
                Und genau das ist meine Mission: alten Dingen neue Ehrenplätze geben.
              </span>
          </PostingComponent>
          <PostingComponent v-else-if="ort=='og1'"
              username="@gerne_gestern"
              avatar="assets/personen/00x0/gerne_gestern.jpg"
              bild="assets/objekte/og/00x0_og1_ac/00x0_og1_ac_post2.jpg"
              hashtag="#alte_sitten_fremd_und_schön"
              likes="34232"
              @hashtag-clicked="flow=1.7"
              :eingetragen="flow>=1.7">
              <span v-if="spieler=='Watson'">
                Ich habe diese Brosche mitgenommen und ersetzt. 
                Denn sie erinnert mich an einen alten Brauch: 
                Dem Liebsten eine Haarlocke schenken, als Zeichen für Treue und Verbundenheit. 
                Und so schön in Szene gesetzt! Das musste ich einfach selbst ausprobieren!
              </span>
              <span v-else-if="spieler=='Sherlock'">
                Ich mag Dinge mit alten, überraschenden Geheimnissen. 
                So wie bei dieser Brosche: 
                In ihrem Inneren befindet sich eine menschliche Haarlocke!  
                Sie zu verschenken galt als Zeichen der Verbundenheit und Treue. 
                Ob das noch Oma und Opa so gemacht haben? Oder schon Schiller und Goethe? 
                Wie auch immer... Ich werde die Brosche so liebevoll wie hier im Museum präsentieren. 
                Sie wird ein Glanzstück meiner Sammlung!
              </span>
              <span v-else-if="spieler=='Enola'">
                Ich mag Dinge mit alten, überraschenden Geheimnissen. 
                Vielleicht habt ihr es erraten: 
                Im Inneren der Brosche befindet sich eine menschliche Haarlocke!  
                In der Biedermeierzeit galt das als Zeichen der Verbundenheit und Treue. 
                Schade, dass das aus der Mode gekommen ist. 
                Ob das noch Oma und Opa so gemacht haben? 
                Oder schon Schiller oder Goethe? Wie auch immer... 
                Ich werde die Brosche so liebevoll wie hier im Museum präsentieren. 
                Sie wird ein Glanzstück meiner Sammlung!
              </span>
          </PostingComponent>
          <p style="margin-bottom: 120px;" v-if="spieler=='Watson'">
            Berührt den pulsierenden Hashtag, dann füllt sich unser Notizbuch
          </p>
          <p style="margin-bottom: 120px;" v-else-if="spieler=='Sherlock'">
            Berührt den pulsierenden Hashtag, dann fliegt er als Hinweis in unser Notizbuch!
          </p>
          <p style="margin-bottom: 120px;" v-else-if="spieler=='Enola'">
            Berührt den pulsierenden Hashtag, dann fliegt er als Hinweis in unser Notizbuch!
          </p>
          <button-weiter-component class="button-weiter" v-if="flow==1.7" @click="flow=1.8; swiperInstance.slideNext();" pulsiert/>
          <button-weiter-component class="button-weiter" v-else-if="flow>1.7" @click="swiperInstance.slideNext();"/>
          <button-weiter-component class="button-weiter" v-else disabled />
        </swiper-slide>
      </swiper>
    </swiper-slide>
    
    <swiper-slide v-if="flow >=1.7 && flow<2.0">
      <span v-if="spieler=='Watson'">
        <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="230"/>
        <p> Sehr gut. Die Fälschung ist enttarnt und wir haben erste Hinweise auf die Tatmotive. </p>
        <p> Und hört, was uns der Geist von Ludwig Leiner noch zu sagen hat... </p>
      </span>
      <span v-else-if="spieler=='Sherlock'">
        <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="250"/>
        <p> @gerne_gestern ist ein dreister Gegner. </p>
        <p> Aber wir haben erste Hinweise auf seine Tatmotive gesammelt. </p>
        <p> Und hört, was uns der Geist von Ludwig Leiner noch zu sagen hat... </p>
      </span>
      <span v-else>
        <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="220"/>
        <p> @gerne_gestern ist wirklich seltsam! </p>
        <p> Aber die Fälschung ist enttarnt und wir haben erste Hinweise auf die Tatmotive gesammelt. </p>
        <p> Und hört, was uns der Geist von Ludwig Leiner noch zu sagen hat... </p>
      </span>
      <!-- <div class="swipe-geste-vertikal" v-if="flow==0.6"></div> -->
      <!-- <div class="swipe-geste-vertikal"></div> -->
      <button-weiter-component class="button-weiter" v-if="flow==1.8" @click="swiperInstance.slideNext();" pulsiert/>
      <button-weiter-component class="button-weiter" v-else-if="flow>=1.7" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
      <!-- <button-weiter-component class="button-weiter" disabled /> -->
    </swiper-slide>

    <swiper-slide v-if="flow >= 1.79 && flow<2.0" class="leiner-slide">
      <!-- <img src="assets/img/leiner.png" width="200" style="margin-left: auto; margin-right: auto; display: block;"/> -->
      <!-- <img class="spieler" src="assets/img/leiner.png" width="200"/> -->
      <img src="assets/objekte/eg/00x0_eg_02/00x0_eg_02_leiner.jpg" width="500" style="margin-left: auto; margin-right: auto; display: block;"/>
      <p v-if="ort=='eg' && spieler=='Watson'">
        Ich danke dem Team um Dr. Watson, sehr gute Arbeit! 
      </p>
      <p v-else-if="ort=='eg' && spieler=='Sherlock'">
        Ich danke Sherlock Holmes und seinem tollen Team! 
        <br><br>
        In meinen Augenwinkeln habe ich den fürchterlichen Diebstahl noch gesehen. 
      </p>
      <p v-else-if="ort=='eg' && spieler=='Enola'">
        Ich danke Enola Holmes und ihren Helferinnen und Helfern! Sehr gute Arbeit. 
        <br><br>
        Aber ist das nicht schrecklich? Ich liebe meinen Ichtyosaurier! 
      </p>
      <p v-else-if="ort=='og1' && spieler=='Watson'">
        Ich danke dem Team um Dr. Watson, sehr gute Arbeit! 
        <br><br>
        Und habt ihr bemerkt: Dieser Dieb oder diese Diebin lobt mein Museum und lässt dann trotzdem alte Dinge mitgehen. 
      </p>
      <p v-else-if="ort=='og1' && spieler=='Sherlock'">
        Ich danke dem Team um den berühmten Sherlock Holmes, sehr gute Arbeit. 
        <br>
        Und habt ihr bemerkt: Dieser Dieb oder diese Diebin lobt mein Museum und lässt dann trotzdem alte Dinge mitgehen. 
        <br>
        Auf solche Komplimente kann ich gerne verzichten!
      </p>
      <p v-else-if="ort=='og1' && spieler=='Enola'">
        Ich danke Enola Holmes und ihren Helferinnen und Helfern! 
        Sehr gute Arbeit. 
        <br>
        Und habt ihr bemerkt: 
        Dieser Dieb oder diese Diebin lobt mein Museum und lässt dann trotzdem alte Dinge mitgehen. 
        <br>
        Auf solche Komplimente kann ich gerne verzichten!
      </p>
      <button-weiter-component class="button-weiter" v-if="flow==1.8" @click="flow=1.8;swiperInstance.slideNext();" pulsiert />
      <button-weiter-component class="button-weiter" v-else-if="flow>1.8" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>

    <swiper-slide v-if="flow >= 1.8 && flow<2.0" class="leiner-slide">
      <img class="spieler" src="assets/img/leiner.png" width="200"/>
      <p v-if="ort=='eg' && spieler=='Watson'">
        Und habt ihr bemerkt: <br>
        Der Dieb lobt meine Ausstellung und lässt gleichzeitig Dinge verschwinden. 
        <br><br>
        Auf solche Komplimente kann ich gerne verzichten! 
        <br><br>
        Ihr müsst diesen Fall bitte rasch aufkären!
      </p>
      <p v-else-if="ort=='eg' && spieler=='Sherlock'">
        Stellt Euch vor: der Fischsaurier hat 100 Millionen Jahre überlebt, jedenfalls sein versteinerter Körper. 
        <br><br>
        Und jetzt soll da eine schnöde Kopie an der Wand hängen? 
        <br><br>
        Ihr müsst diesen unbedingt aufkären!
      </p>
      <p v-else-if="ort=='eg' && spieler=='Enola'">
        ἰχθῦς (ichthŷs) ist altgriechisch und bedeutet einfach "Fisch". 
        <br><br>
        Vor 100 Millionen Jahren tummelten sich noch 80 verschiedene Fischsaurier in den großen Ozeanen dieser Erde. 
        Dieser versteinerte Körper hat also 100 Millionen Jahre überlebt, und jetzt soll da eine schnöde Kopie an der Wand hängen?  
        <br><br>
        Ihr müsst diesen Fall bitte rasch aufkären!
      </p>
      <p v-else-if="ort=='og1' && spieler=='Watson'">
        Auf solche Komplimente kann ich gerne verzichten! 
        <br><br>
        Bringt mir bitte schnell die alte Brosche mit den echten Haaren zurück.
      </p>
      <p v-else-if="ort=='og1' && spieler=='Sherlock'">
        Außerdem muss ich einem Missverständnis vorbeugen: 
        <br>
        Schiller und Goethe sind im 18. Jahrhundert geboren. 
        Diese Brosche mit Locke gehört zur Biedermeierzeit (1815-1848). 
        <br><br>
        Bringt mir bitte schnell die alte Brosche mit den echten Haaren zurück.
      </p>
      <p v-else-if="ort=='og1' && spieler=='Enola'">
        Außerdem muss ich einem Missverständnis vorbeugen: 
        Schiller und Goethe sind im 18. Jahrhundert geboren. 
        Die alte Brosche mit der echten Haarlocke gehört zur Biedermeierzeit (1815-1848). 
        <br><br>
        Bringt sie bitte schnell wieder zurück.
      </p>
      <button-weiter-component class="button-weiter" v-if="flow==1.8" @click="flow=2.0;swiperInstance.slideNext();" pulsiert />
      <button-weiter-component class="button-weiter" v-else-if="flow>1.8" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>



    <swiper-slide v-if="flow >=2.0 && flow<3.0">
      <span v-if="spieler=='Watson'">
        <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="230"/>
        <p style="margin-top: 50px;"> Keine Sorge, lieber Ludwig Leiner, machen wir! </p>
        <p> Aber... oh weh, noch eine Fälschung! </p>
        <p> Klickt auf die Lupe Nr. 2 und beantwortet meine Frage. </p>
      </span>
      <span v-else-if="spieler=='Sherlock'">
        <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="250"/>
        <p style="margin-top: 50px;"> Ihr Auftrag ist in den besten Händen, lieber Herr Leiner. </p>
        <p> Aber was höre ich da? Noch eine Fälschung?! </p>
        <p> Klickt auf die Lupe Nr. 2 und beantwortet meine Frage. </p>
      </span>
      <span v-else>
        <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="220"/>
        <p style="margin-top: 50px;"> Wir sind ganz ihrer Meinung, lieber Herr Leiner. </p>
        <p> Und es gibt leider noch eine Fälschung. </p>
        <p> Klickt bitte auf die Lupe Nr. 2 und beantwortet meine Frage. </p>
      </span>
      <!-- <div class="swipe-geste-vertikal" v-if="flow==0.6"></div> -->
      <!-- <div class="swipe-geste-vertikal"></div> -->
      <button-weiter-component class="button-weiter" v-if="flow==2.1" @click="swiperInstance.slideNext();" pulsiert/>
      <button-weiter-component class="button-weiter" v-else-if="flow>2.0" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
      <!-- <button-weiter-component class="button-weiter" disabled /> -->
    </swiper-slide>

    <swiper-slide v-if="flow >= 2.1 && flow<3.0">
      <span v-if="!antwortClicked && ort=='eg'">
        <span v-if="spieler=='Watson'">
          <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="210"/>
          <p style="margin-top: 50px;"> Aufgepasst. So etwas sieht man heute nicht mehr alle Tage. </p>
          <p> Was wurde hier gestohlen? </p>
        </span>
        <span v-else-if="spieler=='Sherlock'">
          <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="230"/>
          <p style="margin-top: 70px;"> Dieses Ding konnte recht nützlich sein. </p>
          <p> Aber wobei? </p>
        </span>
        <span v-else>
          <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="210"/>
          <p style="margin-top: 40px;"> Das sieht aus wie eine Spielzeugrakete. Aber ich glaube, es ist eine Hellebarde.  </p>
          <p> Woher kommt dieser Ausdruck?</p>
        </span>
      </span>
      <span v-else-if="!antwortClicked && ort=='og1'">
        <span v-if="spieler=='Watson'">
          <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="210"/>
          <p style="margin-top: 50px;"> Hmmm, was für ein seltsames Ding. </p>
          <p> Erkennt ihr, was das ist? </p>
        </span>
        <span v-else-if="spieler=='Sherlock'">
          <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="230"/>
          <p style="margin-top: 20px;"> Ein echtes "Teekesselchen". Ihr wisst doch, das ist ein Wort mit vielen Bedeutungen... </p>
          <p> Aber was passt hier am besten? </p>
        </span>
        <span v-else>
          <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="210"/>
          <p style="margin-top: 120px;"> Was schützt dieses alte Schloss? </p>
        </span>
      </span>
      <span v-else-if="!antwortRichtig">
        <span v-if="spieler=='Watson'">
          <img class="spieler" src="assets/img/detektive/watson_enttaeuscht.png" width="210"/>
          <p style="margin-top: 70px;"> Das ist leider falsch. </p>
          <p> Versuch es noch einmal!</p>
        </span>
        <span v-else-if="spieler=='Sherlock'">
          <img class="spieler" src="assets/img/detektive/sherlock_enttaeuscht.png" width="230"/>
          <p style="margin-top: 70px;"> Leider falsch, aber ihr bekommt nochmal eine Chance. </p>
        </span>
        <span  v-else-if="spieler=='Enola'">
          <img class="spieler" src="assets/img/detektive/enola_enttaeuscht.png" width="210"/>
          <p style="margin-top: 90px;"> Leider falsch, versucht es noch einmal. </p>
        </span>
      </span>
      <span v-else-if="antwortRichtig">
        <span v-if="spieler=='Watson'">
          <img class="spieler" src="assets/img/detektive/watson_gluecklich.png" width="210"/>
          <p style="margin-top: 90px;"> Ihr seid Klasse! </p>
          <p> Die Suche kann weitergehen. </p>
        </span>
        <span v-else-if="spieler=='Sherlock'">
          <img class="spieler" src="assets/img/detektive/sherlock_gluecklich.png" width="240"/>
          <p style="margin-top: 80px;"> Sehr gut.</p>
          <p> Ihr seid wahre Meister-Detektive! </p>
        </span>
        <span v-else>
          <img class="spieler" src="assets/img/detektive/enola_gluecklich.png" width="210"/>
          <p style="margin-top: 90px;"> Perfekt! </p>
          <p> Die Antwort ist richtig! </p>
        </span>
      </span>
      <div class="antwort-buttons" v-if="spieler=='Watson' && ort=='eg'">
          <ion-button :color="buttonFarbe1" :fill="buttonFill1" size="large" expand="block" @click="antwortAusgewaehlt(1, true)">Eine Hieb- und Stichwaffe</ion-button>
          <ion-button :color="buttonFarbe2" :fill="buttonFill2" size="large" expand="block" @click="antwortAusgewaehlt(2, false)" :disabled="antwortRichtig">Eine Kelle zum Pflanzen</ion-button>
          <ion-button :color="buttonFarbe3" :fill="buttonFill3" size="large" expand="block" @click="antwortAusgewaehlt(3, false)" :disabled="antwortRichtig">Eine Spielzeugrakete</ion-button>
      </div>
      <div class="antwort-buttons" v-else-if="spieler=='Sherlock' && ort=='eg'">
        <ion-button :color="buttonFarbe1" :fill="buttonFill1" size="large" expand="block" @click="antwortAusgewaehlt(1, true)">Beim Hauen und Stechen</ion-button>
        <ion-button :color="buttonFarbe2" :fill="buttonFill2" size="large" expand="block" @click="antwortAusgewaehlt(2, false)" :disabled="antwortRichtig">Beim Heulen und Zähneklappern</ion-button>
        <ion-button :color="buttonFarbe3" :fill="buttonFill3" size="large" expand="block" @click="antwortAusgewaehlt(3, false)" :disabled="antwortRichtig">Beim Zeter und Mordio Schreien</ion-button>
      </div>
      <div class="antwort-buttons" v-else-if="spieler=='Enola' && ort=='eg'">
        <ion-button :color="buttonFarbe1" :fill="buttonFill1" size="large" expand="block" @click="antwortAusgewaehlt(1, true)" >zusammengesetzt aus mittelhochdeutsch <br>helm für Stiel und barte für Beil</ion-button>
        <ion-button :color="buttonFarbe2" :fill="buttonFill2" size="large" expand="block" @click="antwortAusgewaehlt(2, false)" :disabled="antwortRichtig">Name eines Minnesängers, <br>der für seine hohe Stimme berühmt war</ion-button>
        <ion-button :color="buttonFarbe3" :fill="buttonFill3" size="large" expand="block" @click="antwortAusgewaehlt(3, false)" :disabled="antwortRichtig">Waffe, die der Lanze <br>Barbarossas nachgebildet wurde</ion-button>
      </div>
      <div class="antwort-buttons" v-else-if="spieler=='Watson' && ort=='og1'">
          <ion-button :color="buttonFarbe1" :fill="buttonFill1" size="large" expand="block" @click="antwortAusgewaehlt(1, true)">Ein altes Vorhängeschloss</ion-button>
          <ion-button :color="buttonFarbe2" :fill="buttonFill2" size="large" expand="block" @click="antwortAusgewaehlt(2, false)" :disabled="antwortRichtig">Ein altes Trauerglöckchen</ion-button>
          <ion-button :color="buttonFarbe3" :fill="buttonFill3" size="large" expand="block" @click="antwortAusgewaehlt(3, false)" :disabled="antwortRichtig">Eine alte Trillerpfeife</ion-button>
      </div>
      <div class="antwort-buttons" v-else-if="spieler=='Sherlock' && ort=='og1'">
        <ion-button :color="buttonFarbe1" :fill="buttonFill1" size="large" expand="block" @click="antwortAusgewaehlt(1, true)">Eine Vorrichtung, <br>die Zugang verwehrt und gewährt</ion-button>
        <ion-button :color="buttonFarbe2" :fill="buttonFill2" size="large" expand="block" @click="antwortAusgewaehlt(2, false)" :disabled="antwortRichtig">Ein Mechanismus zum <br>Zünden einer Feuerwaffe</ion-button>
        <ion-button :color="buttonFarbe3" :fill="buttonFill3" size="large" expand="block" @click="antwortAusgewaehlt(3, false)" :disabled="antwortRichtig">Ein Gebäude des Adels</ion-button>
      </div>
      <div class="antwort-buttons" v-else-if="spieler=='Enola' && ort=='og1'">
        <ion-button :color="buttonFarbe1" :fill="buttonFill1" size="large" expand="block" @click="antwortAusgewaehlt(1, true)" >Die alte Kasse der Rosgartenzunft</ion-button>
        <ion-button :color="buttonFarbe2" :fill="buttonFill2" size="large" expand="block" @click="antwortAusgewaehlt(2, false)" :disabled="antwortRichtig">Das Depot des Rosgartenmuseums</ion-button>
        <ion-button :color="buttonFarbe3" :fill="buttonFill3" size="large" expand="block" @click="antwortAusgewaehlt(3, false)" :disabled="antwortRichtig">Die Richental-Chronik</ion-button>
      </div>
      <button-weiter-component class="button-weiter" v-if="flow==2.2 && antwortRichtig" @click="swiperInstance.slideNext();" pulsiert/>
      <button-weiter-component class="button-weiter" v-else-if="flow>2.2" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>

    <swiper-slide class="posting-slide" v-if="flow >= 2.2 && flow<3.0">
      <swiper :modules="modules" :direction="'vertical'" :scrollbar="true" :mousewheel="true" :slidesPerView="'auto'" :freeMode="true">
        <swiper-slide>
          <span v-if="spieler=='Watson'">
            <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="210"/>
            <p> Die nächste heiße Spur im Internet!!! </p>
            <p> @gerne_gestern brüstet sich weiter mit den Diebstählen des Tages. </p>
          </span>
          <span v-else-if="spieler=='Sherlock'">
            <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="250"/>
            <p> @gerne_gestern scheint sich sicher zu fühlen und postet weiter seine Diebstähle des Tages. </p>
          </span>
          <span v-else-if="spieler=='Enola'">
            <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="220"/>
            <p> Dreister geht's nicht mehr, oder? </p>
            <p> @gerne_gestern postet weiter seine Diebstähle des Tages. </p>
          </span>
          <PostingComponent v-if="ort=='eg'"
              username="@gerne_gestern"
              avatar="assets/personen/00x0/gerne_gestern.jpg"
              bild="assets/objekte/eg/x0x0_eg_02/x0x0_eg_02_post1.jpg"
              hashtag="#hochlichter"
              likes="43210"
              @hashtag-clicked="flow=2.3"
              :eingetragen="flow>=2.3">
              Vor 500 Jahren lief jeder Nachtwächter mit solchen Hellebarden durch die Gassen. 
              Heute konnte ich das Highlight ganz einfach einsacken, ganz ohne Gegenwehr der Wächter. 
              Hier haben sie so viel davon, dass sie durchaus eine davon hergeben können, finde ich. 
          </PostingComponent>
          <PostingComponent v-else-if="ort=='og1'"
              username="@gerne_gestern"
              avatar="assets/personen/00x0/gerne_gestern.jpg"
              bild="assets/objekte/og/001x_og1_ab/001x_og1_ab_post1.jpg"
              hashtag="#gut_versteckt"
              likes="42102"
              @hashtag-clicked="flow=2.3"
              :eingetragen="flow>=2.3">
              Faktenjäger aufgepasst! An diesem tollen Ding wäre ich beinah achtlos vorbeigelaufen. 
              Sieht so unscheinbar aus wie ein normaler Balken in der Wand. 
              Aber dann habe ich diesen schwarzen "Zapfen" gesehen. 
              Größer als man denkt. Und da war mir klar: Da ist etwas versteckt!
          </PostingComponent>
          <p style="margin-bottom: 100px;">
            Berührt den pulsierenden Hashtag um ihn als Hinweis in eurem Notizbuch festzuhalten!
          </p>
          <button-weiter-component class="button-weiter" v-if="flow==2.3" @click="swiperInstance.slideNext();" pulsiert/>
          <button-weiter-component class="button-weiter" v-else-if="flow>2.3" @click="swiperInstance.slideNext();"/>
          <button-weiter-component class="button-weiter" v-else disabled />
        </swiper-slide>
      </swiper>
    </swiper-slide>

    <swiper-slide v-if="flow >=2.3 && flow<3.0">
      <span v-if="spieler=='Watson'">
        <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="230"/>
        <p> Dreist! Aber auf unsere Hightech-Lupe ist Verlass. </p>
        <p> Wo ist die Fälschung? </p>
      </span>
      <span v-else-if="spieler=='Sherlock'">
        <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="250"/>
        <p> Unser Ermittlungsbuch füllt sich. </p>
        <p> Und wir haben zum Glück unsere Hightech-Lupe. </p>
        <p> Wo ist die Fäschung? </p>
      </span>
      <span v-else>
        <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="220"/>
        <p> Wie frech! </p>
        <p> Immerhin, das war der dritte Hashtag. </p>
        <p> Und weiter geht die Suche mit der Hightech-Lupe... </p>
      </span>
      <!-- <div class="swipe-geste-vertikal" v-if="flow==0.6"></div> -->
      <!-- <div class="swipe-geste-vertikal"></div> -->
      <!-- <button-weiter-component class="button-weiter" v-if="flow==1.0" @click="swiperInstance.slideNext();" pulsiert/> -->
      <button-weiter-component class="button-weiter" v-if="flow==2.4" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else-if="flow>2.4" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else-if="!btTrigger" @click="flow=2.4"/>
      <button-weiter-component class="button-weiter" v-else disabled />
      <!-- <button-weiter-component class="button-weiter" disabled /> -->
    </swiper-slide>

    <swiper-slide v-if="flow == 2.36 && flow<3.0">
      <span v-if="spieler=='Watson'">
        <img class="spieler" src="assets/img/detektive/watson_enttaeuscht.png" width="230"/>
        <p> Der Rahmen der Lupe ist immer noch dunkel, das Objekt ist wohl noch nicht in der Nähe. </p>
        <p> Braucht ihr einen Tipp? </p>
        <p> Dann drückt doch mal auf die Karte. </p>
      </span>
      <span v-else-if="spieler=='Sherlock'">
        <img class="spieler" src="assets/img/detektive/sherlock_enttaeuscht.png" width="250"/>
        <p> Die Lupe ist immer noch dunkel. Kein gutes Zeichen. </p>
        <p> Braucht ihr einen Tipp? Dann drückt doch mal auf die Karte. </p>
      </span>
      <span v-else>
        <img class="spieler" src="assets/img/detektive/enola_enttaeuscht.png" width="220"/>
        <p> Wir tappen irgendwie im Dunkeln. </p>
        <p> Ich denke, wir könnten einen  Tipp gebrauchen. </p>
        <p> Drückt doch mal auf die Karte. </p>
      </span>
      <!-- <div class="swipe-geste-vertikal" v-if="flow==0.6"></div> -->
      <!-- <div class="swipe-geste-vertikal"></div> -->
      <!-- <button-weiter-component class="button-weiter" v-if="flow==1.0" @click="swiperInstance.slideNext();" pulsiert/> -->
      <!-- <button-weiter-component class="button-weiter" v-if="flow>1.46" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled /> -->
      <!-- <button-weiter-component class="button-weiter" disabled /> -->
    </swiper-slide>

    <swiper-slide class="posting-slide" v-if="flow >= 2.6 && flow<3.0">
      <swiper :modules="modules" :direction="'vertical'" :scrollbar="true" :mousewheel="true" :slidesPerView="'auto'" :freeMode="true">
        <swiper-slide>
          <span v-if="spieler=='Watson'">
            <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="210"/>
            <p> Sehr gut! </p>
            <p> Auch diese Fälschung ist enttarnt. </p>
            <p> Und lest noch mehr über die Tatmotive... </p>
          </span>
          <span v-else-if="spieler=='Sherlock'">
            <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="250"/>
            <p> Verblüffend: auch das ist also eine Fälschung! </p>
            <p v-if="ort=='eg'"> Und die Waffe verrät noch mehr über die Tatmotive...</p>
            <p v-else-if="ort=='og1'"> Und das Vorhängeschloss verrät noch mehr über die Tatmotive... </p>
          </span>
          <span v-else-if="spieler=='Enola'">
            <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="220"/>
            <p> Diese Fälschungen machen mich sprachlos! </p>
            <p> Aber @gerne_gestern geht schon wieder auf Sendung... </p>
          </span>
          <PostingComponent v-if="ort=='eg'"
              username="@gerne_gestern"
              avatar="assets/personen/00x0/gerne_gestern.jpg"
              bild="assets/objekte/eg/x0x0_eg_02/x0x0_eg_02_post2.jpg"
              hashtag="#prunk_und_paradestück"
              likes="42910"
              @hashtag-clicked="flow=2.7"
              :eingetragen="flow>=2.7">
              Wie immer seht ihr bei mir nicht nur schöne Dinge, sondern bekommt interessante Fakten dazu geliefert. 
              Die mittelalterliche Hellebarde, die schon im 15. 
              Jahrhundert aufkam, besteht aus drei Teilen: 
              Einem Beil, Haken an den Seiten und einer Klinge an der Spitze. 
              Mich hat die einfache Version mit hell glänzender Klinge magisch angezogen. 
              Um 1700 führte fast jeder im Fußvolk einen solchen Spieß mit sich. 
              Die Waffe war auch beliebt bei Militärparaden. 
              Man salutierte mit ihr oder stellte sie "bei Fuß". 
              Ein echtes Prunk- und Paradestück also. 
              Genau richtig für meine extravagante Faktensammlung!
          </PostingComponent>
          <PostingComponent v-else-if="ort=='og1'"
              username="@gerne_gestern"
              avatar="assets/personen/00x0/gerne_gestern.jpg"
              bild="assets/objekte/og/001x_og1_ab/001x_og1_ab_post2.jpg"
              hashtag="#Zunftkasse1454"
              likes="45281"
              @hashtag-clicked="flow=2.7"
              :eingetragen="flow>=2.7">
              Uralt und geheimnisvoll! Zum Glück habe ich bei der Führung durch das Museum aufgepasst. 
              Der historische „Zunftsaal“ wurde 1454 im Haus „Zum Schwarzen Widder“ 
              eingerichtet und mit dem Haus zum "Rosgarten" verbunden. 
              Er diente den Mitgliedern der Rosgartenzunft als Versammlungssaal und Trinkstube. 
              Und jetzt kommt das Beste: Hier haben sie die alte Zunftkasse versteckt: 
              Damit sie niemand wegtragen konnte, wurde sie in die Holzwand eingelassen und mit einem Schloss gesichert. 
              Ein so altes Schloss darf natürlich nicht mehr aufgebrochen und zerstört werden. 
              Was für ein schönes, altes und echtes Geheimnis! 
              Da kribbelt es doch jemandem wie mir sofort in den Fingern ...
          </PostingComponent>
          <p style="margin-bottom: 100px;">
            Berührt den pulsierenden Hashtag um ihn als Hinweis in eurem Notizbuch festzuhalten!
          </p>
          <button-weiter-component class="button-weiter" v-if="flow==2.7" @click="flow=2.8; swiperInstance.slideNext();" pulsiert/>
          <button-weiter-component class="button-weiter" v-else-if="flow>2.7" @click="swiperInstance.slideNext();"/>
          <button-weiter-component class="button-weiter" v-else disabled />
        </swiper-slide>
      </swiper>
    </swiper-slide>

    <swiper-slide v-if="flow >=2.7 && flow<3.0">
      <span v-if="spieler=='Watson'">
        <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="230"/>
        <p> Nicht zu fassen, dieser Detaildieb. </p>
        <p> Und ich glaube, der Geist von Ludwig Leiner will uns noch etwas sagen... </p>
      </span>
      <span v-else-if="spieler=='Sherlock'">
        <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="250"/>
        <p> Unglaublich, dieser Detaildieb. </p>
        <p> Und hört, was uns der Geist von Ludwig Leiner noch zu sagen hat... </p>
      </span>
      <span v-else>
        <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="220"/>
        <p> Wir müssen das Muster hinter diesen Diebstählen erkennen. </p>
        <p> Das sind wir auch dem Geist von Ludwig Leiner schuldig... </p>
      </span>
      <!-- <div class="swipe-geste-vertikal" v-if="flow==0.6"></div> -->
      <!-- <div class="swipe-geste-vertikal"></div> -->
      <button-weiter-component class="button-weiter" v-if="flow==2.8" @click="swiperInstance.slideNext();" pulsiert/>
      <button-weiter-component class="button-weiter" v-else-if="flow>=2.7" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
      <!-- <button-weiter-component class="button-weiter" disabled /> -->
    </swiper-slide>

    <swiper-slide v-if="flow >= 2.8 && flow<3.0" class="leiner-slide posting-slide">
      <swiper :modules="modules" :direction="'vertical'" :scrollbar="true" :mousewheel="true" :slidesPerView="'auto'" :freeMode="true">
        <swiper-slide>

          <!-- <img src="assets/img/leiner.png" width="200" style="margin-left: auto; margin-right: auto; display: block;"/> -->
          <img class="spieler" src="assets/img/leiner.png" width="200"/>
          <!-- <img class="spieler" src="assets/objekte/eg/x0x0_eg_02/x0x0_eg_02_2.png" width="200"/> -->
          <span v-if="ort=='eg'">
            <p>
              Wenn das mit den Diebstählen so weitergeht, müssen wir noch neue Museumswächter einstellen... 
              vielleicht die Schweizer Garde aus dem Vatikan? 
              Die tragen heute noch Hellebarden... 
            </p>
            <img src="assets/objekte/eg/x0x0_eg_02/x0x0_eg_02_leiner.jpg" width="400" style="margin-left: auto; margin-right: auto; display: block;"/>
            <p style="margin-bottom: 150px;">
              Wisst ihr, dass mein Rosgartenmuseum früher ein Zunfthaus war? 
              Die Mitglieder einer Zunft mussten natürlich auch zur Waffe greifen, wenn eine Stadt angegriffen wurde. 
              In manchen Städten war es für die Meister sogar Pflicht, einen eigenen Brustpanzer mitzubringen, wenn sie sich dort niederlassen wollten. 
              Also bringt die Hellebarde bitte wieder dorthin zurück, wo sie auch hingehört.
            </p>
          </span>
          <span v-else-if="ort=='og1'">
            <p style="margin-bottom: 150px;">
              Oh weh! Hier, an dieser Stellle, schlägt wirklich das Herz des Museums, 
              das große Geheimnis unserer guten alten Stube! Und jetzt ist es in Gefahr. 
              Sicher hält sich der Dieb nicht an unseren Ehrenkodex. 
              Der besagt, dass kein Restaurator altes Kunst- oder Kulturgut zerstören darf! 
              Deshalb weiß bis heute niemand, ob sich in der alten Zunftkasse 
              tatsächlich noch ein Schatz befindet. 
              Bringt mir das Schloss zurück, heil und unversehrt. 
              Dieses Geheimnis muss gewahrt bleiben!
            </p>
            <img src="assets/objekte/og/001x_og1_ab/001x_og1_ab_leiner.jpg" width="400" style="margin-left: auto; margin-right: auto; display: block;"/>
          </span>
          <button-weiter-component class="button-weiter" v-if="flow==2.8" @click="flow=3.0;swiperInstance.slideNext();" pulsiert />
          <button-weiter-component class="button-weiter" v-else-if="flow>2.8" @click="swiperInstance.slideNext();"/>
          <button-weiter-component class="button-weiter" v-else disabled />
        </swiper-slide>
      </swiper>
    </swiper-slide>



    <swiper-slide v-if="flow >=3.0 && flow<4.0">
      <span v-if="spieler=='Watson'">
        <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="230"/>
        <p style="margin-top: 50px;"> Keine Sorge, lieber Ludwig Leiner, machen wir! </p>
        <p> Aber... oh weh! </p>
        <p> Klickt auf Lupe Nr. 3 und beantwortet meine Frage. </p>
      </span>
      <span v-else-if="spieler=='Sherlock'">
        <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="250"/>
        <p style="margin-top: 50px;"> Keine Sorge, lieber Herr Leiner, das bringen wir in Ordnung! </p>
        <p> Klickt auf die Lupe Nr. 3 und beantwortet meine Frage. </p>
      </span>
      <span v-else>
        <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="220"/>
        <p style="margin-top: 50px;"> Sie haben ja so recht lieber Herr Leiner! </p>
        <p> Aber der Detaildieb gönnt uns keine Pause. </p>
        <p> Klickt bitte auf die Lupe Nr. 3 und beantwortet meine Frage. </p>
      </span>
      <!-- <div class="swipe-geste-vertikal" v-if="flow==0.6"></div> -->
      <!-- <div class="swipe-geste-vertikal"></div> -->
      <button-weiter-component class="button-weiter" v-if="flow==3.1" @click="swiperInstance.slideNext();" pulsiert/>
      <button-weiter-component class="button-weiter" v-else-if="flow>3.0" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
      <!-- <button-weiter-component class="button-weiter" disabled /> -->
    </swiper-slide>

    <swiper-slide v-if="flow >= 3.1 && flow<4.0">
      <span v-if="!antwortClicked && ort=='eg'">
        <span v-if="spieler=='Watson'">
          <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="210"/>
          <p style="margin-top: 50px;"> Wie das glitzert und funkelt… </p>
          <p> Aber was ist das überhaupt? </p>
        </span>
        <span v-else-if="spieler=='Sherlock'">
          <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="230"/>
          <p style="margin-top: 70px;"> Sehr besonders und außergewöhnlich! </p>
          <p> Erkennt ihr, was das für ein besonderer Stein ist? </p>
        </span>
        <span v-else>
          <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="210"/>
          <p style="margin-top: 30px;"> Wie das funkelt und glänzt! </p>
          <p> Wie soll ich die Suchmeldung formulieren?</p>
          <p> Gesucht wird: </p>
        </span>
      </span>
      <span v-else-if="!antwortClicked && ort=='og1'">
        <span v-if="spieler=='Watson'">
          <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="210"/>
          <p style="margin-top: 30px;"> In diesem Kästchen befindet sich ein ganz besonderes Objekt... </p>
          <p> Aber welches? </p>
        </span>
        <span v-else-if="spieler=='Sherlock'">
          <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="230"/>
          <p style="margin-top: 70px;"> Oh weh! Da wurde wohl der Inhalt eines Ziboriums entwendet. </p>
          <p> Ihr wisst doch, was da drin aufbewahrt wird? </p>
        </span>
        <span v-else>
          <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="210"/>
          <p style="margin-top: 30px;"> Oh weh. Hier wurde wohl etwas aus einem Tabernakel entwendet. </p>
          <p> Ihr wisst doch, was ein Tabernakel ist? </p>
        </span>
      </span>
      <span v-else-if="!antwortRichtig">
        <span v-if="spieler=='Watson'">
          <img class="spieler" src="assets/img/detektive/watson_enttaeuscht.png" width="210"/>
          <p style="margin-top: 70px;"> Das ist leider falsch, versucht es noch einmal. </p>
        </span>
        <span v-else-if="spieler=='Sherlock'">
          <img class="spieler" src="assets/img/detektive/sherlock_enttaeuscht.png" width="230"/>
          <p style="margin-top: 70px;"> Leider falsch, aber ihr bekommt nochmal eine Chance. </p>
        </span>
        <span  v-else-if="spieler=='Enola'">
          <img class="spieler" src="assets/img/detektive/enola_enttaeuscht.png" width="210"/>
          <p style="margin-top: 90px;"> Leider falsch, versucht es noch einmal. </p>
        </span>
      </span>
      <span v-else-if="antwortRichtig">
        <span v-if="spieler=='Watson'">
          <img class="spieler" src="assets/img/detektive/watson_gluecklich.png" width="210"/>
          <p style="margin-top: 90px;"> Super! Die Antwort ist richtg! </p>
        </span>
        <span v-else-if="spieler=='Sherlock'">
          <img class="spieler" src="assets/img/detektive/sherlock_gluecklich.png" width="240"/>
          <p style="margin-top: 80px;">  Ich bin stolz auf Euch, liebe Meister-Detektive! </p>
        </span>
        <span v-else>
          <img class="spieler" src="assets/img/detektive/enola_gluecklich.png" width="210"/>
          <p style="margin-top: 90px;"> Wir sind ein tolles Team! </p>
          <p> Die Antwort ist richtig! </p>
        </span>
      </span>
      <div class="antwort-buttons" v-if="spieler=='Watson' && ort=='eg'">
          <ion-button :color="buttonFarbe1" :fill="buttonFill1" size="large" expand="block" @click="antwortAusgewaehlt(1, true)">Ein Mineral aus den Alpen</ion-button>
          <ion-button :color="buttonFarbe2" :fill="buttonFill2" size="large" expand="block" @click="antwortAusgewaehlt(2, false)" :disabled="antwortRichtig">Würfelzucker aus eine alten Latrine</ion-button>
          <ion-button :color="buttonFarbe3" :fill="buttonFill3" size="large" expand="block" @click="antwortAusgewaehlt(3, false)" :disabled="antwortRichtig">Salzkristalle aus Bad Reichenhall</ion-button>
      </div>
      <div class="antwort-buttons" v-else-if="spieler=='Sherlock' && ort=='eg'">
        <ion-button :color="buttonFarbe1" :fill="buttonFill1" size="large" expand="block" @click="antwortAusgewaehlt(1, true)">Ein Mineral, <br>das sich gut spalten lässt</ion-button>
        <ion-button :color="buttonFarbe2" :fill="buttonFill2" size="large" expand="block" @click="antwortAusgewaehlt(2, false)" :disabled="antwortRichtig">Ein glitzernder Diamant, <br>der besonders hart ist</ion-button>
        <ion-button :color="buttonFarbe3" :fill="buttonFill3" size="large" expand="block" @click="antwortAusgewaehlt(3, false)" :disabled="antwortRichtig">Marmor, der farbig <br>geadert und gebändert ist</ion-button>
      </div>
      <div class="antwort-buttons" v-else-if="spieler=='Enola' && ort=='eg'">
        <ion-button :color="buttonFarbe1" :fill="buttonFill1" size="large" expand="block" @click="antwortAusgewaehlt(1, true)" >ein Mineral, das man auch Feldspat nennt</ion-button>
        <ion-button :color="buttonFarbe2" :fill="buttonFill2" size="large" expand="block" @click="antwortAusgewaehlt(2, false)" :disabled="antwortRichtig">ein Quarz, den man auch Bergkristall nennt</ion-button>
        <ion-button :color="buttonFarbe3" :fill="buttonFill3" size="large" expand="block" @click="antwortAusgewaehlt(3, false)" :disabled="antwortRichtig">ein Glas, das man auch Orthoklas nennt</ion-button>
      </div>
      <div class="antwort-buttons" v-else-if="spieler=='Watson' && ort=='og1'">
          <ion-button :color="buttonFarbe1" :fill="buttonFill1" size="large" expand="block" @click="antwortAusgewaehlt(1, true)">Kelch mit Hostie</ion-button>
          <ion-button :color="buttonFarbe2" :fill="buttonFill2" size="large" expand="block" @click="antwortAusgewaehlt(2, false)" :disabled="antwortRichtig">Vase mit Münze</ion-button>
          <ion-button :color="buttonFarbe3" :fill="buttonFill3" size="large" expand="block" @click="antwortAusgewaehlt(3, false)" :disabled="antwortRichtig"> Trinkgefäß mit Deckel </ion-button>
      </div>
      <div class="antwort-buttons" v-else-if="spieler=='Sherlock' && ort=='og1'">
        <ion-button :color="buttonFarbe1" :fill="buttonFill1" size="large" expand="block" @click="antwortAusgewaehlt(1, true)">Kelch mit Hostie</ion-button>
        <ion-button :color="buttonFarbe2" :fill="buttonFill2" size="large" expand="block" @click="antwortAusgewaehlt(2, false)" :disabled="antwortRichtig">Vase mit Münzen</ion-button>
        <ion-button :color="buttonFarbe3" :fill="buttonFill3" size="large" expand="block" @click="antwortAusgewaehlt(3, false)" :disabled="antwortRichtig">Gefäss mit Reliquien</ion-button>
      </div>
      <div class="antwort-buttons" v-else-if="spieler=='Enola' && ort=='og1'">
        <ion-button :color="buttonFarbe1" :fill="buttonFill1" size="large" expand="block" @click="antwortAusgewaehlt(1, true)" >Ein Sakramentshaus</ion-button>
        <ion-button :color="buttonFarbe2" :fill="buttonFill2" size="large" expand="block" @click="antwortAusgewaehlt(2, false)" :disabled="antwortRichtig">Ein Hostienkelch</ion-button>
        <ion-button :color="buttonFarbe3" :fill="buttonFill3" size="large" expand="block" @click="antwortAusgewaehlt(3, false)" :disabled="antwortRichtig">Eine Reliquienbehälter</ion-button>
      </div>
      <button-weiter-component class="button-weiter" v-if="flow==3.2 && antwortRichtig" @click="swiperInstance.slideNext();" pulsiert/>
      <button-weiter-component class="button-weiter" v-else-if="flow>3.2" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>

    <swiper-slide class="posting-slide" v-if="flow >= 3.2 && flow<4.0">
      <swiper :modules="modules" :direction="'vertical'" :scrollbar="true" :mousewheel="true" :slidesPerView="'auto'" :freeMode="true">
        <swiper-slide>
          <span v-if="spieler=='Watson'">
            <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="210"/>
            <br><br>
            <p> Und da ist auch schon die dritte heiße Spur im Internet!!! </p>
          </span>
          <span v-else-if="spieler=='Sherlock'">
            <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="250"/>
            <br><br>
            <p> Und ich wusste es: der nächste Post von @gerne_gestern... </p>
          </span>
          <span v-else-if="spieler=='Enola'">
            <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="220"/>
            <br><br>
            <p> Und dreister geht es anscheinend immer noch... </p>
          </span>
          <PostingComponent v-if="ort=='eg'"
              username="@gerne_gestern"
              avatar="assets/personen/00x0/gerne_gestern.jpg"
              bild="assets/objekte/eg/00x1_eg_ab/00x1_eg_ab_post1.jpg"
              hashtag="#Adular_und_Feldspat"
              likes="48501"
              @hashtag-clicked="flow=3.3"
              :eingetragen="flow>=3.3">
              Alte Namen, alte Sitten. Ich liebe es, wenn ich erstmal nur "Bahnhof" verstehe. 
              Deshalb zunächst nur soviel: 
              Dieser "Adular" lag zusammen mit anderen "Feldspaten" in einem Leinerschrank! 
              (Fortsetzung folgt)
          </PostingComponent>
          <PostingComponent v-else-if="ort=='og1'"
              username="@gerne_gestern"
              avatar="assets/personen/00x0/gerne_gestern.jpg"
              bild="assets/objekte/og/10x0_og1_bc/10x0_og1_bc_post1.jpg"
              hashtag="#5_Sterne_sind_zuwenig"
              likes="48192"
              @hashtag-clicked="flow=3.3"
              :eingetragen="flow>=3.3">
              Ein wahres Schatzkästchen so ein Mini-Tabernakel. Wird es auffallen, wenn da der Kelch fehlt?
              Auch von mir bekommt das Objekt wahrlich mehr als fünf Sterne auf blauem Grund!
          </PostingComponent>
          <p style="margin-bottom: 100px;">
            Berührt den pulsierenden Hashtag um ihn als Hinweis in eurem Notizbuch festzuhalten!
          </p>
          <button-weiter-component class="button-weiter" v-if="flow==3.3" @click="swiperInstance.slideNext();" pulsiert/>
          <button-weiter-component class="button-weiter" v-else-if="flow>3.3" @click="swiperInstance.slideNext();"/>
          <button-weiter-component class="button-weiter" v-else disabled />
        </swiper-slide>
      </swiper>
    </swiper-slide>

    <swiper-slide v-if="flow >= 3.3 && flow<4.0">
      <span v-if="spieler=='Watson'">
        <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="230"/>
        <p style="margin-top: 50px;"> Der fünfte Hinweis im Notizbuch! </p>
        <p> Aber wo ist die Fälschung? </p>
      </span>
      <span v-else-if="spieler=='Sherlock'">
        <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="250"/>
        <p style="margin-top: 50px;"> Unser Ermittlungsbuch füllt sich! </p>
        <p> Aber wo ist die Fälschung? </p>
      </span>
      <span v-else>
        <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="220"/>
        <p style="margin-top: 50px;"> Ich kann nur sagen: frech, frech, frech! </p>
        <p> Doch wo ist die Fälschung? </p>
      </span>
      <!-- <div class="swipe-geste-vertikal" v-if="flow==0.6"></div> -->
      <!-- <div class="swipe-geste-vertikal"></div> -->
      <!-- <button-weiter-component class="button-weiter" v-if="flow==1.0" @click="swiperInstance.slideNext();" pulsiert/> -->
      <button-weiter-component class="button-weiter" v-if="flow>3.4" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
      <!-- <button-weiter-component class="button-weiter" disabled /> -->
    </swiper-slide>

    <swiper-slide v-if="flow == 3.36 && flow<4.0">
      <span v-if="spieler=='Watson'">
        <img class="spieler" src="assets/img/detektive/watson_enttaeuscht.png" width="230"/>
        <p> Der Rahmen der Lupe ist immer noch dunkel, das Objekt ist wohl noch nicht in der Nähe. </p>
        <p> Braucht ihr einen Tipp? </p>
        <p> Dann drückt doch mal auf die Karte. </p>
      </span>
      <span v-else-if="spieler=='Sherlock'">
        <img class="spieler" src="assets/img/detektive/sherlock_enttaeuscht.png" width="250"/>
        <p> Die Lupe ist immer noch dunkel. Kein gutes Zeichen. </p>
        <p> Braucht ihr einen Tipp? Dann drückt doch mal auf die Karte. </p>
      </span>
      <span v-else>
        <img class="spieler" src="assets/img/detektive/enola_enttaeuscht.png" width="220"/>
        <p> Wir tappen irgendwie im Dunkeln. </p>
        <p> Ich denke, wir könnten einen  Tipp gebrauchen. </p>
        <p> Drückt doch mal auf die Karte. </p>
      </span>
      <!-- <div class="swipe-geste-vertikal" v-if="flow==0.6"></div> -->
      <!-- <div class="swipe-geste-vertikal"></div> -->
      <!-- <button-weiter-component class="button-weiter" v-if="flow==1.0" @click="swiperInstance.slideNext();" pulsiert/> -->
      <!-- <button-weiter-component class="button-weiter" v-if="flow>1.46" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled /> -->
      <!-- <button-weiter-component class="button-weiter" disabled /> -->
    </swiper-slide>

    <swiper-slide class="posting-slide" v-if="flow >= 3.6 && flow<4.0">
      <swiper :modules="modules" :direction="'vertical'" :scrollbar="true" :mousewheel="true" :slidesPerView="'auto'" :freeMode="true">
        <swiper-slide>
          <span v-if="spieler=='Watson'">
            <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="210"/>
            <p> Das ist also die dritte Meisterkopie von @gerne_gestern... </p>
            <p> Wir müssen herausfinden, wer hinter diesen Taten steckt... </p>
          </span>
          <span v-else-if="spieler=='Sherlock'">
            <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="250"/>
            <p> @gerne_gestern bleibt dreist und fingerfertig... </p>
            <p> Wir müssen herausfinden, wer hinter diesen Taten steckt... </p>
          </span>
          <span v-else-if="spieler=='Enola'">
            <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="220"/>
            <p> Unglaublich diese Fälschungsserie... </p>
            <p> Wer steckt hinter @gerne_gestern? </p>
          </span>
          <PostingComponent v-if="ort=='eg'"
              username="@gerne_gestern"
              avatar="assets/personen/00x0/gerne_gestern.jpg"
              bild="assets/objekte/eg/00x1_eg_ab/00x1_eg_ab_post2.jpg"
              hashtag="#alte_worte_alte_steine"
              likes="51029"
              @hashtag-clicked="flow=3.7"
              :eingetragen="flow>=3.7">
              Warum "Adular"? Warum "Feldspat"? Hier kommen wie immer spannende Infos und Fakten:
              <br>1. Dieses besonders spaltbare Mineral wurde zum ersten Mal in den Alpen gefunden, 
              genau genommen in einem Teil der Westalpen. 
              Da dieser Teil der Alpen "Adula" heisst, nennt man das Mineral auch „Adular“.
              <br>2. „Spat“ ist mit "Spaten" und "spalten" verwandt. 
              Bergleute verwenden Spaten zum Abbau von Steinen. 
              Minerialien, die sich besonders gut spalten lassen, nennen sie "Spat". 
              Wenn die Steine einfach lose im Feld oder im Bett eines Bergbachs liegen, nennt man sie auch "Feldspat".
              <br>Spannende Infos oder? Zur Belohnung liegt dieser uralte Feldspat jetzt bei mir!
          </PostingComponent>
          <PostingComponent v-if="ort=='og1'"
              username="@gerne_gestern"
              avatar="assets/personen/00x0/gerne_gestern.jpg"
              bild="assets/objekte/og/10x0_og1_bc/10x0_og1_bc_post2.jpg"
              hashtag="#faktisch_immerwoanders"
              likes=52930
              @hashtag-clicked="flow=3.7"
              :eingetragen="flow>=3.7">
              Heute stelle ich Euch in meinem Faktencheck ein ganz verrücktes Objekt vor: 
              einen Altaraufsatz aus dem Jahr 1502. 
              Er ist einer der wenigen Beispiele, die den Konstanzer Bildersturm 
              von 1531 halbwegs heil überstanden haben, wirklich nur halbwegs: 
              Der Altarkasten wurde mehrmals zerlegt und an verschiedenen Orten wieder aufgebaut. 
              Im Konstanzer Münster, im Münster auf der Reichenau, im Konzilsgebäude und im Rosgartenmuseum. 
              1990 wurden sogar zwei bis dahin fehlende Elemente wiederentdeckt: 
              die Marienkrönung (in der Mitte oben) und der hl. Nikolaus (in der Mitte rechts). 
              Da wird es doch kaum auffallen, wenn ich als Erinnerung ein 
              kleines 5-Sterne-Objekt mitnehme und in meinem Wohnzimmer aufstelle?
          </PostingComponent>
          <p style="margin-bottom: 100px;">
            Berührt den pulsierenden Hashtag um ihn als Hinweis in eurem Notizbuch festzuhalten!
          </p>
          <button-weiter-component class="button-weiter" v-if="flow==3.7" @click="flow=3.8; swiperInstance.slideNext();" pulsiert/>
          <button-weiter-component class="button-weiter" v-else-if="flow>3.7" @click="swiperInstance.slideNext();"/>
          <button-weiter-component class="button-weiter" v-else disabled />
        </swiper-slide>
      </swiper>
    </swiper-slide>

    <swiper-slide v-if="flow >= 3.7 && flow<4.0">
      <span v-if="spieler=='Watson'">
        <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="230"/>
        <p> Wir sind der Lösung des Rätsels nahe! </p>
        <p> Und ich glaube, der Geist von Ludwig Leiner will uns noch etwas mit auf den Weg geben... </p>
      </span>
      <span v-else-if="spieler=='Sherlock'">
        <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="250"/>
        <p> Bald werden wir das Rätsel von @gerne_gestern gelöst haben.  </p>
        <p> Aber aufgepasst! Der Geist von Ludwig Leiner will uns noch etwas mit auf den Weg geben... </p>
      </span>
      <span v-else>
        <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="220"/>
        <p> Meine Güte, wer verbirgt sich hinter @gerne_gestern? </p>
        <p> Ludwig Leiner muss doch seine Ruhe finden... </p>
      </span>
      <!-- <div class="swipe-geste-vertikal" v-if="flow==0.6"></div> -->
      <!-- <div class="swipe-geste-vertikal"></div> -->
      <button-weiter-component class="button-weiter" v-if="flow==3.8" @click="swiperInstance.slideNext();" pulsiert/>
      <button-weiter-component class="button-weiter" v-else-if="flow>=3.7" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
      <!-- <button-weiter-component class="button-weiter" disabled /> -->
    </swiper-slide>

    <swiper-slide v-if="flow >= 3.8 && flow<4.0" class="leiner-slide posting-slide">
      <swiper :modules="modules" :direction="'vertical'" :scrollbar="true" :mousewheel="true" :slidesPerView="'auto'" :freeMode="true">
        <swiper-slide>
          <!-- <img src="assets/img/leiner.png" width="200" style="margin-left: auto; margin-right: auto; display: block;"/> -->
          <img class="spieler" src="assets/img/leiner.png" width="200"/>
          <span v-if="ort=='eg'">
            <p style="margin-bottom: 90px;">
              Ich bebe vor Zorn! Meinen Stein als "Belohnung" mitnehmen, 
              womöglich noch als Schmucksteine schleifen und fassen lassen? 
              Ich liebe meine naturbelassenen Adulare. 
              Dieser ist mir ganz besonders ans Herz gewachsen. Ich will ihn zurück. 
              Alles in diesem Raum, wirklich alles, atmet meinen Geist, merkt ihr das? 
            </p>
            <img src="assets/objekte/eg/00x1_eg_ab/00x1_eg_ab_leiner.jpg" width="400" style="margin-left: auto; margin-right: auto; display: block;"/>
          </span>
          <span v-else-if="ort=='og1'">
            <p style="margin-bottom: 90px;">
              Der Dieb darf so viele Fakten sammeln wie er will, aber nicht unsere Objekte! 
              Das sind wir auch dem Stifter dieses Altars schuldig. Wisst ihr wie er heisst? 
              Schaut einmal ganz vorsichtig auf die Rückseite des linken Altarflügels. 
              Dort findet ihr unten ein Wappen mit drei schwarzen Hirschkäfern. 
              Die sind dem unverschämten Dieb zum Glück entgangen! 
              Man sieht sie auch auf einer Wappenscheibe aus Karlsruhe. 
              Dieses Wappen gehört Paulus Appetzhofer, einem Obervogt der Insel Reichenau. 
              Und das ist der Stifter dieses Altars. 
              Bitte bringt uns diesen unersetzlichen Kelch zurück! 
            </p>
            <img src="assets/objekte/og/10x0_og1_bc/10x0_og1_bc_leiner.jpg" width="400" style="margin-left: auto; margin-right: auto; display: block;"/>
          </span>
          <button-weiter-component class="button-weiter" v-if="flow==3.8" @click="flow=4.0;swiperInstance.slideNext();" pulsiert />
          <button-weiter-component class="button-weiter" v-else-if="flow>3.8" @click="swiperInstance.slideNext();"/>
          <button-weiter-component class="button-weiter" v-else disabled />
        </swiper-slide>
      </swiper>
    </swiper-slide>


    <!-- Tätersuche beginnt -->
    <swiper-slide v-if="flow >=4.0 && flow<5.0">
      <span v-if="spieler=='Watson'">
        <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="230"/>
        <p> Keine Sorge, lieber Ludwig Leiner! </p>
        <p> Alle Fälschungen sind enttarnt. </p>
        <p> Mit den sechs Hinweisen im Buch werden wir herausfinden, wer dahinter steckt. </p>
        <p> @gerne_gestern kann uns nicht entkommen. </p>
        <p> Lasst uns zurück zum Detektivbüro gehen, unserem Startpunkt, und den Fall lösen! </p>
      </span>
      <span v-else-if="spieler=='Sherlock'">
        <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="220"/>
        <p> Darauf können sie sich verlassen, verehrter Herr Leiner! </p>
        <p> Tadellose Arbeit, werte Detektive! Die Fälschungen sind enttarnt und mit den Hinweisen werden wir herausfinden, wer dahinter steckt. </p>
        <p> Lasst uns zurück in unser Detektivbüro gehen und den Fall lösen. </p>
      </span>
      <span v-else>
        <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="190"/>
        <p> Wie immer, sehen wir das ganz genau so, lieber Herr Leiner. </p>
        <p> Diese Fälschungen lassen auch uns keine Ruhe. </p>
        <p> Wir werden herausfinden, wer dahinter steckt. </p>
        <p> Lasst uns zurück in unser Detektivbüro gehen und den Fall lösen! </p>
      </span>
      <!-- <div class="swipe-geste-vertikal" v-if="flow==0.6"></div> -->
      <!-- <div class="swipe-geste-vertikal"></div> -->
      <button-weiter-component class="button-weiter" v-if="flow==4.1" @click="swiperInstance.slideNext();" pulsiert/>
      <button-weiter-component class="button-weiter" v-else-if="flow>4.1" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
      <!-- <button-weiter-component class="button-weiter" disabled /> -->
    </swiper-slide>

    <!-- Im Detektivbüro angekommen: Täterauswahl -->
    <swiper-slide v-if="flow >=4.1 && flow<5.0">
      <span v-if="spieler=='Watson'" >
        <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="230"/>
        <p style="font-size: 26px;"> 
          Drei Tatverdächtige wurden in letzter Zeit immer wieder im Museum gesehen: 
          <ul>
            <li>Katinka Antiqus</li>
            <li>James Mopsiathy</li>
            <li>Mia Mirabilis</li>             
          </ul>
        </p>
        <p style="font-size: 26px;">
          Wer von ihnen steckt hinter @gerne_gestern?
        </p>
        <p style="font-size: 26px;">
          Sucht Euch im Detektivbüro die Steckbriefe heraus und klickt auf die Fahndungsfotos. 
          Vergleicht die Informationen mit den Hinweisen in unserem Notizbuch.
          Drückt auf die Handschellen, wenn ihr glaubt, den richtigen Täter oder die richtige Täterin verhaften zu können.
        </p>
      </span>
      <span v-else-if="spieler=='Sherlock'">
        <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="220"/>
        <p style="font-size: 26px;"> 
          Wir haben im Hintergrund weiter ermittelt: Drei Tatverdächtige wurden in letzter Zeit immer wieder im Museum gesehen: 
          <ul>
            <li>Katinka Antiqus</li>
            <li>Mia Mirabilis</li>             
            <li>Wolfram Wolkenwand</li>
          </ul>
        </p>
        <p style="font-size: 26px;">
          Wer von ihnen steckt hinter @gerne_gestern?
        </p>
        <p style="font-size: 26px;">
          Sucht Euch im Detektivbüro die Steckbriefe heraus und klickt auf die Fahndungsfotos. 
          Vergleicht die Informationen mit den Ergebnissen in unserem Ermittlungsbuch.
          Drückt auf die Handschellen, wenn ihr glaubt, den richtigen Täter oder die richtige Täterin verhaften zu können.
        </p>
      </span>
      <span v-else>
        <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="210"/>
        <p style="font-size: 26px;"> 
          Der Fall nähert sich der Aufklärung! Drei Tatverdächtige wurden in letzter Zeit immer wieder im Museum gesehen:
          <ul>
            <li>Katinka Antiqus</li>
            <li>Iri Adler</li>
            <li>Schorm Roderick</li>             
          </ul>
        </p>
        <p style="font-size: 26px;">
          Sucht Euch im Detektivbüro die Steckbriefe heraus und klickt auf die Fahndungsfotos. 
          Vergleicht die Informationen mit den Ergebnissen in unserem Ermittlungsbuch.
        </p>
        <p style="font-size: 26px;">
          Drückt auf die Handschellen, wenn ihr glaubt, den richtigen Täter oder die richtige Täterin verhaften zu können.
        </p>
      </span>
      <!-- <div class="swipe-geste-vertikal" v-if="flow==0.6"></div> -->
      <!-- <div class="swipe-geste-vertikal"></div> -->
      <button-weiter-component class="button-weiter" v-if="flow==4.2" @click="swiperInstance.slideNext();" pulsiert/>
      <button-weiter-component class="button-weiter" v-else-if="flow>4.2" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
      <!-- <button-weiter-component class="button-weiter" disabled /> -->
    </swiper-slide>

    <!-- Alibi Affenberg -->
    <swiper-slide v-if="flow == 4.31">
      <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="180" v-if="spielStore.spieler=='Watson'"/>
      <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="180" v-else-if="spielStore.spieler=='Sherlock'"/>
      <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="180" v-else-if="spielStore.spieler=='Enola'"/>
      <img class="spieler" src="assets/kopf_mit_hals.svg" width="200" v-else/>
      <p v-if="spieler=='Watson'" style="font-size: 26px;"> Da lagen wir leider falsch! </p>
      <p v-else-if="spieler=='Sherlock'" style="font-size: 26px;"> Verdammt! Da lagen wir falsch! </p>
      <p v-else-if="spieler=='Enola'" style="font-size: 26px;"> Da lagen wir wohl falsch! </p>
      <p v-if="spieler=='Watson'" style="font-size: 26px;">
        {{ spielStore.personVerhaftet=='111x' ? "Mia Mirabilis" : "James Mopsiathy" }} war heute den ganzen Tag nicht zuhause. {{ spielStore.personVerhaftet=='111x' ? "Sie" : "Er" }} war in Salem auf dem Affenberg. Das nenn ich mal ein tierisch starkes Alibi!
      </p>
      <p v-else-if="spieler=='Sherlock'" style="font-size: 26px;">
        {{ spielStore.personVerhaftet=='111x' ? "Mia Mirabilis" : "Wolfram Wolkenwand" }} war heute den ganzen Tag nicht zuhause. {{ spielStore.personVerhaftet=='111x' ? "Sie" : "Er" }} war in Salem auf dem Affenberg. Das nenn ich mal ein tierisch starkes Alibi!
      </p>
      <p v-else-if="spieler=='Enola'" style="font-size: 26px;">
        {{ spielStore.personVerhaftet=='11x0' ? "Iri Adler" : "Shorm Roderick" }} war heute den ganzen Tag nicht zuhause. {{ spielStore.personVerhaftet=='11x0' ? "Sie" : "Er" }} war in Salem auf dem Affenberg. Das nenn ich mal ein tierisch starkes Alibi!
      </p>
      <img class="pfeil" src="assets/img/alibi/affenberg.jpg" style="height: 55%;" />
      <!-- <button-weiter-component class="button-weiter" v-if="spielStore.flow==0.72" @click="if(!btTrigger)spielStore.flow=0.73;" :disabled="btTrigger"/> -->
      <!-- <button-weiter-component class="button-weiter" v-if="spielStore.flow==0.72" @click="spielStore.flow=0.73;" :disabled="btTrigger"/> -->
      <button-weiter-component class="button-weiter" v-if="spielStore.flow==4.31" @click="swiperInstance.slideNext();" pulsiert/>
      <button-weiter-component class="button-weiter" v-else-if="spielStore.flow>4.3" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>

    <!-- 1. Verusch falsch -->
    <swiper-slide v-if="flow == 4.31">
      <span v-if="spieler=='Watson'" >
        <img class="spieler" src="assets/img/detektive/watson_enttaeuscht.png" width="230"/>
        <p> 
          Schaut euch die rot markierten Hashtags an. Sie passen tatsächlich nicht gut zu {{ spielStore.personVerhaftet=='111x' ? "Mia Mirabilis" : "James Mopsiathy" }}.
        </p>
        <p>
          Wir geben nicht auf! Nächster Versuch: Wen überprüfen wir dieses Mal? Katinka Antiqus oder {{ spielStore.personVerhaftet=='111x' ? "James Mopsiathy" : "Mia Mirabilis" }}. Einer von ihnen muss es gewesen sein.
        </p>
        <p>
          Schaut Euch ihre Steckbriefe nochmal an und drückt auf die Handschellen, wenn ihr glaubt zu wissen, wer es ist.
        </p>
      </span>
      <span v-else-if="spieler=='Sherlock'">
        <img class="spieler" src="assets/img/detektive/sherlock_enttaeuscht.png" width="250"/>
        <p> 
          Und schaut euch bitte die rot markierten Hashtags an. Sie passen in der Tat nicht gut zu {{ spielStore.personVerhaftet=='111x' ? "Mia Mirabilis" : "Wolfram Wolkenwand" }}.
        </p>
        <p>
          Doch wir haben noch eine Chance: Wen überprüfen wir als nächstes Katinka Antiqus oder {{ spielStore.personVerhaftet=='111x' ? "Wolfram Wolkenwand" : "Mia Mirabilis" }}? Einer von ihnen muss es gewesen sein.
        </p>
        <p>
          Schaut Euch die Steckbriefe nochmal an und drückt auf die Handschellen, wenn ihr glaubt zu wissen, wer es ist.
        </p>
      </span>
      <span v-else>
        <img class="spieler" src="assets/img/detektive/enola_enttaeuscht.png" width="220"/>
        <p> 
          So ein Pech! Aber schaut euch die rot markierten Hashtags nochmal an. Sie passen tatsächlich nicht gut zu {{ spielStore.personVerhaftet=='11x0' ? "Iri Adler" : "Shorm Roderick" }}.
        </p>
        <p>
          Wir geben nicht auf! Nächster Versuch: Wen überprüfen wir als nächstes? Katinka Antiqus oder {{ spielStore.personVerhaftet=='11x0' ? "Shorm Roderick" : "Iri Adler" }}? Einer von ihnen muss es gewesen sein.
        </p>
        <p>
          Schaut Euch ihre Steckbriefe nochmal an und drückt auf die Handschellen, wenn ihr glaubt zu wissen, wer es ist.
        </p>
      </span>
      <!-- <div class="swipe-geste-vertikal" v-if="flow==0.6"></div> -->
      <!-- <div class="swipe-geste-vertikal"></div> -->
      <!-- <button-weiter-component class="button-weiter" v-if="flow==4.3" @click="swiperInstance.slideNext();" pulsiert/>
      <button-weiter-component class="button-weiter" v-else-if="flow>4.3" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled /> -->
      <!-- <button-weiter-component class="button-weiter" disabled /> -->
    </swiper-slide>

    <!-- Alibi Biergarten -->
    <swiper-slide v-if="flow == 4.32">
      <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="180" v-if="spielStore.spieler=='Watson'"/>
      <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="180" v-else-if="spielStore.spieler=='Sherlock'"/>
      <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="180" v-else-if="spielStore.spieler=='Enola'"/>
      <img class="spieler" src="assets/kopf_mit_hals.svg" width="200" v-else/>
      <p v-if="spieler=='Watson'" style="font-size: 26px;"> Da lagen wir leider falsch! </p>
      <p v-else-if="spieler=='Sherlock'" style="font-size: 26px;"> Verdammt! Da lagen wir falsch! </p>
      <p v-else-if="spieler=='Enola'" style="font-size: 26px;"> Da lagen wir wohl falsch! </p>
      <p v-if="spieler=='Watson'" style="font-size: 26px;">
        {{ spielStore.personVerhaftet=='111x' ? "Mia Mirabilis" : "James Mopsiathy" }} war heute den ganzen Tag nicht zuhause. {{ spielStore.personVerhaftet=='111x' ? "Sie" : "Er" }} war heute in einem Biergarten in Konstanz. Das nenn ich mal ein erfrischendes Alibi.
      </p>
      <p v-else-if="spieler=='Sherlock'" style="font-size: 26px;">
        {{ spielStore.personVerhaftet=='111x' ? "Mia Mirabilis" : "Wolfram Wolkenwand" }} war heute den ganzen Tag nicht zuhause. {{ spielStore.personVerhaftet=='111x' ? "Sie" : "Er" }} war heute in einem Biergarten in Konstanz. Das nenn ich mal ein erfrischendes Alibi.
      </p>
      <p v-else-if="spieler=='Enola'" style="font-size: 26px;">
        {{ spielStore.personVerhaftet=='11x0' ? "Iri Adler" : "Shorm Roderick" }} war heute den ganzen Tag nicht zuhause. {{ spielStore.personVerhaftet=='11x0' ? "Sie" : "Er" }} war heute in einem Biergarten in Konstanz. Das nenn ich mal ein erfrischendes Alibi.
      </p>
      <img class="pfeil" src="assets/img/alibi/biergarten.jpg" style="height: 55%;" />
      <!-- <button-weiter-component class="button-weiter" v-if="spielStore.flow==0.72" @click="if(!btTrigger)spielStore.flow=0.73;" :disabled="btTrigger"/> -->
      <!-- <button-weiter-component class="button-weiter" v-if="spielStore.flow==0.72" @click="spielStore.flow=0.73;" :disabled="btTrigger"/> -->
      <button-weiter-component class="button-weiter" v-if="spielStore.flow==4.32" @click="swiperInstance.slideNext();" pulsiert/>
      <button-weiter-component class="button-weiter" v-else-if="spielStore.flow>4.3" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>

    <!-- 2. Versuch falsch -->
    <swiper-slide v-if="flow == 4.32">
      <span v-if="spieler=='Watson'" >
        <img class="spieler" src="assets/img/detektive/watson_enttaeuscht.png" width="230"/>
        <p style="margin-top: 50px;"> Leider ist auch der zweite Versuch falsch. </p>
        <p>
          Schaut euch die rot markierten Hashtags an. 
          Sie passen tatsächlich nicht gut zu {{ spielStore.personVerhaftet=='111x' ? "Mia Mirabilis" : "James Mopsiathy" }}.
        </p>
        <p>
          Nun kann es nur noch Katinka Antiqus sein. Lest euch nochmal ihren Steckbrief durch. Da passt alles!
        </p>
      </span>
      <span v-else-if="spieler=='Sherlock'">
        <img class="spieler" src="assets/img/detektive/sherlock_enttaeuscht.png" width="250"/>
        <p style="margin-top: 50px;"> Leider ist auch der zweite Versuch falsch. </p>
        <p>
          Schaut euch die rot markierten Hashtags an. 
          Sie passen tatsächlich nicht gut zu {{ spielStore.personVerhaftet=='111x' ? "Mia Mirabilis" : "Wolfram Wolkenwand" }}.
        </p>
        <p>
          Nun kann es nur noch Katinka Antiqus sein. Lest euch nochmal ihren Steckbrief durch. Da passt alles!
        </p>
      </span>
      <span v-else>
        <img class="spieler" src="assets/img/detektive/enola_enttaeuscht.png" width="220"/>
        <p style="margin-top: 50px;"> Leider ist auch der zweite Versuch falsch. </p>
        <p>
          Schaut euch die rot markierten Hashtags an. 
          Sie passen tatsächlich nicht gut zu {{ spielStore.personVerhaftet=='11x0' ? "Iri Adler" : "Shorm Roderick" }}.
        </p>
        <p>
          Nun kann es nur noch Katinka Antiqus sein. Lest euch nochmal ihren Steckbrief durch. Da passt alles!
        </p>
      </span>
      <!-- <div class="swipe-geste-vertikal" v-if="flow==0.6"></div> -->
      <!-- <div class="swipe-geste-vertikal"></div> -->
      <!-- <button-weiter-component class="button-weiter" v-if="flow==4.3" @click="swiperInstance.slideNext();" pulsiert/>
      <button-weiter-component class="button-weiter" v-else-if="flow>4.3" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled /> -->
      <!-- <button-weiter-component class="button-weiter" disabled /> -->
    </swiper-slide>
    
    <swiper-slide v-if="flow >= 4.4 && flow<5.0" class="leiner-slide">
      <img src="assets/img/leiner.png" width="200" style="margin-left: auto; margin-right: auto; display: block;"/>
      <p>
        Endlich kann mein Geist wieder in Frieden ruhen: 
        Ich danke euch! 
      </p>
      <p>
        Ich verleihe euch den Spürnasenausweis, 
        der euch offiziell in den Kreis der Meisterdetektive erhebt! 
      </p>
      <p>
        Ihr könnt ihn am Eingang abholen.
      </p>
      <button-weiter-component class="button-weiter" v-if="flow==4.5" @click="swiperInstance.slideNext();" pulsiert/>
      <button-weiter-component class="button-weiter" v-else-if="flow>4.5" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>
    
    <swiper-slide v-if="flow >=4.5 && flow<5.0">
      <span v-if="spieler=='Watson'">
        <img class="spieler" src="assets/img/detektive/watson_gluecklich.png" width="250"/>
        <p style="margin-top: 50px;"> Was für ein spannender Urlaub! </p>
        <p> Und ein Gutes hatten diese Diebstähle dann doch: Wir mussten als Detektive ganz genau hinschauen?! </p>
        <p> In diesem Museum gibt es ja so viel zu entdecken…! </p>
      </span>
      <span v-else-if="spieler=='Sherlock'">
        <img class="spieler" src="assets/img/detektive/sherlock_gluecklich.png" width="280"/>
        <p style="margin-top: 60px;"> So mag ich meinen Urlaub. Garniert mit einem spannenden Fall! </p>
        <p> Und ein Gutes hatten diese Diebstähle dann doch: Wir haben die Sammlung mit ganz neuen Augen angeschaut! </p>
        <p> Da gibt es ja so viel zu entdecken… </p>
      </span>
      <span v-else>
        <img class="spieler" src="assets/img/detektive/enola_gluecklich.png" width="260"/>
        <p style="margin-top: 70px;"> Eigentlich ein Museumsbesuch ganz nach meinem Geschmack. </p>
        <p> Man musste genau hinschauen und hat vieles Neues erfahren und entdeckt. </p>
        <p> Ich glaube, dieses Museum hat noch viel mehr davon zu bieten... </p>
      </span>
      <br><br><br>
      <ion-button size="large" expand="block" color="danger" @click="spielStore.$reset();router.push('start');">zurück zum Start</ion-button>
    </swiper-slide>


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
import { useBeaconStore } from '@/stores/BeaconStore';
import PostingComponent from '../PostingComponent.vue';

import router from '@/router';

const props = defineProps( {
    empfang: {
      type: Number,
      default: 0
    },
  });

// Store //
const spielStore = useSpielStore();
const { flow, ort, spieler, btTrigger, ermittlungsAuswahl } = storeToRefs(spielStore);
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
  // if (flow.value == 1.3)
  // {
  //   flow.value = 1.4;
  // }
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
  if (flow.value==1.0) {
    antwortClicked.value = 0;
    antwortRichtig.value = false;
    swiperInstance.value.slideTo(0);
  }
  if (flow.value==1.0 || flow.value==2.0 || flow.value==3.0) {
    antwortClicked.value = 0;
    antwortRichtig.value = false;
    buttonFarbe1.value = "primary";
    buttonFarbe2.value = "primary";
    buttonFarbe3.value = "primary";
    buttonFill1.value = "outline";
    buttonFill2.value = "outline";
    buttonFill3.value = "outline";
  }
  if (flow.value==1.1 || flow.value==2.1 || flow.value==3.1) {
    setTimeout(() => {
      swiperInstance.value.slideNext();
    }, 1000 )
  }
  if (flow.value==1.36 || flow.value==2.36 || flow.value==3.36) {
    setTimeout(() => {
      swiperInstance.value.slideTo(4);
    }, 1000 );
  }
  if (flow.value==1.6 || flow.value==2.6 || flow.value==3.6) {
    setTimeout(() => {
      swiperInstance.value.slideNext();
    }, 1000 )
  }
  if (flow.value==4.31 || flow.value==4.32 || flow.value==4.5) {
    setTimeout(() => {
      swiperInstance.value.slideTo(2);
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
  if (richtig && spielStore.flow < 2) {
    spielStore.flow = 1.2;
  } else if (richtig && spielStore.flow < 3) {
    spielStore.flow = 2.2;
  } else if (richtig && spielStore.flow < 4) {
    spielStore.flow = 3.2;
  }
}

function onSlideChanged() {
  spielStore.slideNr = swiperInstance.value.activeIndex;
  console.log("Slide changed: ", spielStore.slideNr);
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
.posting-slide .button-weiter {
  margin-right: 20px;
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