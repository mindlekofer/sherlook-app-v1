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
        <p style="margin-top: 40px;"> Lieber Herr Leiner, keine Sorge. Das Team Sherlock ist bereit. Wir werden alle Fälschungen finden und den Fall aufklären. </p>
        <p> Klickt bitte auf die Lupe Nr. 1 und beantwortet meine Frage zum ersten verdächtigen Detail. </p>
      </span>
      <span v-else>
        <img src="assets/img/detektive/enola_gluecklich.png" width="250" style="margin-left: auto; margin-right: auto; display: block;"/>
        <p style="margin-top: 20px;"> Ja, lieber Herr Leiner, leider scheint es weitere Diebstähle und Fälschungen in Ihrem schönen Museum zu geben. </p>
        <p> Liebes Team, klickt bitte auf die Lupe Nr. 1 und beantwortet meine Frage zum ersten verdächtigen Detail.</p>
      </span>
      <button-weiter-component class="button-weiter" v-if="flow>1.0" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>

    <!-- OBJEKT 1 - Quiz -->
    <swiper-slide v-if="flow >= 1.1 && flow<2.0">

      <span v-if="!antwortClicked">
        <span v-if="spieler=='Watson'">
          <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="210"/>
          <p v-html="objekte_ort[0].watson.quiz.frage" />
        </span>
        <span v-else-if="spieler=='Sherlock'">
          <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="230"/>
          <p v-html="objekte_ort[0].sherlock.quiz.frage" />
        </span>
        <span v-else>
          <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="210"/>
          <p v-html="objekte_ort[0].enola.quiz.frage" />
        </span>
      </span>
      <span v-else-if="!antwortRichtig">
        <span v-if="spieler=='Watson'">
          <img class="spieler" src="assets/img/detektive/watson_enttaeuscht.png" width="210"/>
          <br><br>
          <p> Die Antwort ist leider falsch, versucht es noch einmal!</p>
        </span>
        <span v-else-if="spieler=='Sherlock'">
          <img class="spieler" src="assets/img/detektive/sherlock_enttaeuscht.png" width="230"/>
          <br><br>
          <p> Die Antwort ist nicht richtig, aber ihr bekommt nochmal eine Chance. </p>
        </span>
        <span  v-else-if="spieler=='Enola'">
          <img class="spieler" src="assets/img/detektive/enola_enttaeuscht.png" width="210"/>
          <br><br>
          <p> Leider falsch, versucht es noch einmal. </p>
        </span>
      </span>
      <span v-else-if="antwortRichtig">
        <span v-if="spieler=='Watson'">
          <img class="spieler" src="assets/img/detektive/watson_gluecklich.png" width="210"/>
          <br><br>
          <p>
            Super, die Antwort ist richtig.
            <br><br>
            Willkommen im Club der Detektive! 
          </p>
        </span>
        <span v-else-if="spieler=='Sherlock'">
          <img class="spieler" src="assets/img/detektive/sherlock_gluecklich.png" width="240"/>
          <br><br>
          <p> 
            Sehr gut, die Antwort ist richtig. 
            <br><br>
            Willkommen im Club der Detektive!
          </p>
        </span>
        <span v-else>
          <img class="spieler" src="assets/img/detektive/enola_gluecklich.png" width="210"/>
          <br><br>
          <p> 
            Wunderbar, die Antwort ist richtig!
            <br><br>
            So kann es weitergehen...
          </p>
        </span>
      </span>
      <div class="antwort-buttons">
        <ion-button size="large" expand="block" v-for="(n, i) in randomOrder" :key="i"
            :color="buttonFarbe[n]"
            :fill="buttonFill[n]"
            @click="antwortAusgewaehlt(n, objekte_ort_spieler(0).quiz.antwort[n].richtig)" 
            :disabled="antwortRichtig&&!objekte_ort_spieler(0).quiz.antwort[n].richtig"
            v-html="objekte_ort_spieler(0).quiz.antwort[n].text"> 
        </ion-button>
      </div>
      <button-weiter-component class="button-weiter" v-if="flow==1.2 && antwortRichtig" @click="swiperInstance.slideNext();" pulsiert/>
      <button-weiter-component class="button-weiter" v-else-if="flow>1.2" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>

    <!-- OBJEKT 1 - Post 1 -->
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
            <p> Natürlich wählt er einen Decknamen. Der Account heisst @{{ person.schuldig.accountnamen[0] }}. </p>
            <p> Schaut Euch den Post genau an und sucht dann nach der Fälschung hier im Museum. </p>
          </span>
          <span v-else-if="spieler=='Enola'">
            <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="220"/>
            <p> Und schaut mal, was ich auf Instagram gefunden habe, der Account heißt @{{ person.schuldig.accountnamen[0] }}. </p>
            <p> Da postet jemand seine Diebstähle und Fälschungen. Wie dreist ist das denn? </p>
            <p> Aber scrollt runter und lest selbst! </p>
          </span>
          <PostingComponent
              :username="`@${person.schuldig.accountnamen[0]}`"
              :avatar="`assets/accounts/${person.schuldig.accountnamen[0]}/${person.schuldig.accountnamen[0]}.jpg`"
              :bild="`assets/objekte/${objekte_ort[0].ort}/${objekte_ort[0].code}/${objekte_ort[0].code}_post1.jpg`"
              :hashtag=objekte_ort[0].hashtag_1
              likes="30129"
              @hashtag-clicked="flow < 1.3 ? flow=1.3 : flow=flow"
              :eingetragen="flow>=1.3">
            <span v-html="objekte_ort_spieler(0).post_1" />
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
          <div class="swipe-geste-vertikal"></div>
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
        <p> Drückt dann auf den grünen Button und der Fall kann beginnen... </p>
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
        <p> Drückt dann auf den grünen Button und der Fall kann beginnen... </p>
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
        <p> Drückt dann auf den grünen Button und der Fall kann beginnen... </p>
      </span>
      <button-weiter-component class="button-weiter" v-if="!btTrigger" @click="flow=1.4; swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else-if="flow==1.4" @click="swiperInstance.slideNext();" pulsiert/>
      <button-weiter-component class="button-weiter" v-else-if="flow>1.4" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
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
        <p> Ich denke, wir könnten einen Tipp gebrauchen. </p>
        <p> Drückt doch mal auf die Karte. </p>
      </span>
    </swiper-slide>

    <swiper-slide v-if="flow >=1.4 && flow<2.0">
      <span v-if="spieler=='Watson'">
        <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="230"/>
        <p> Die Lupe blinkt wie verrückt! </p>
        <p> Die Fälschung muss ganz in der Nähe sein. </p>
        <p> Geht zum verdächtigen Objekt und überprüft es mit der Kamera. </p>
      </span>
      <span v-else-if="spieler=='Sherlock'">
        <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="250"/>
        <p> Die Lupe blinkt! Sehr gut. </p>
        <p> Die Fälschung muss in der Nähe sein. </p>
        <p> Geht zum verdächtigen Objekt und überprüft es mit der Kamera. </p>
      </span>
      <span v-else>
        <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="220"/>
        <p> Die Lupe blinkt immer schneller! </p>
        <p> Die Fälschung muss in der Nähe sein. </p>
        <p> Geht zum verdächtigen Objekt und überprüft es mit der Kamera. </p>
      </span>
      <!-- <div class="swipe-geste-horizontal" v-if="flow==0.6"></div> -->
      <!-- <div class="swipe-geste-horizontal"></div> -->
      <button-weiter-component class="button-weiter" v-if="!btTrigger" @click="flow=1.6"/>
      <button-weiter-component class="button-weiter" v-else-if="flow==1.6" @click="swiperInstance.slideNext();" pulsiert/>
      <button-weiter-component class="button-weiter" v-else-if="flow>1.6" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
        <!-- <button-weiter-component class="button-weiter" disabled /> -->
    </swiper-slide>

    <!-- OBJEKT 1 - Post 2 -->
    <swiper-slide class="posting-slide" v-if="flow >= 1.6 && flow<2.0">
      <swiper :modules="modules" :direction="'vertical'" :scrollbar="true" :mousewheel="true" :slidesPerView="'auto'" :freeMode="true">
        <swiper-slide>
          <span v-if="spieler=='Watson'">
            <img class="spieler" src="assets/img/detektive/watson_gluecklich.png" width="210"/>
            <p> Sehr gut! Das ist also auch eine Fälschung. </p>
            <p> Aber wer steckt hinter diesen seltsamen Aktionen? </p>
            <p> Mal schauen, ob wir bei @{{ person.schuldig.accountnamen[0] }} mehr über die Tatmotive erfahren. </p>
          </span>
          <span v-else-if="spieler=='Sherlock'">
            <img class="spieler" src="assets/img/detektive/sherlock_gluecklich.png" width="250"/>
            <p> Hervorragend. Die Fälschung ist entlarvt! </p>
            <p> Und es gibt einen zweiten Post von @{{ person.schuldig.accountnamen[0] }}. </p>
            <p> Mal schauen, ob wir da mehr über die Tatmotive erfahren... </p>
          </span>
          <span v-else-if="spieler=='Enola'">
            <img class="spieler" src="assets/img/detektive/enola_gluecklich.png" width="220"/>
            <p> Kaum zu glauben: das ist also auch eine Fälschung! </p>
            <p> Und @{{ person.schuldig.accountnamen[0] }} geht weiter auf Sendung. Da erfahren wir sicher auch Neues zu den Tatmotiven...</p>
          </span>
          <PostingComponent
              :username="`@${person.schuldig.accountnamen[0]}`"
              :avatar="`assets/accounts/${person.schuldig.accountnamen[0]}/${person.schuldig.accountnamen[0]}.jpg`"
              :bild="`assets/objekte/${objekte_ort[0].ort}/${objekte_ort[0].code}/${objekte_ort[0].code}_post2.jpg`"
              :hashtag=objekte_ort[0].hashtag_2
              likes="34521"
              @hashtag-clicked="flow < 1.7 ? flow=1.7 : flow=flow"
              :eingetragen="flow>=1.7">
            <span v-html="objekte_ort_spieler(0).post_2" />
          </PostingComponent>
          <p style="margin-bottom: 140px;" v-if="spieler=='Watson'">
            Berührt den pulsierenden Hashtag, dann füllt sich unser Notizbuch
          </p>
          <p style="margin-bottom: 140px;" v-else-if="spieler=='Sherlock'">
            Berührt den pulsierenden Hashtag, dann fliegt er als Hinweis in unser Notizbuch!
          </p>
          <p style="margin-bottom: 140px;" v-else-if="spieler=='Enola'">
            Berührt den pulsierenden Hashtag, dann fliegt er als Hinweis in unser Notizbuch!
          </p>
          <button-weiter-component class="button-weiter" v-if="flow==1.7" @click="flow=1.8; swiperInstance.slideNext();" pulsiert/>
          <button-weiter-component class="button-weiter" v-else-if="flow>1.7" @click="swiperInstance.slideNext();"/>
          <button-weiter-component class="button-weiter" v-else disabled />
          <div class="swipe-geste-vertikal"></div>
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
        <p> @{{ person.schuldig.accountnamen[0] }} ist ein dreister Gegner. </p>
        <p> Aber wir haben erste Hinweise auf seine Tatmotive gesammelt. </p>
        <p> Und hört, was uns der Geist von Ludwig Leiner noch zu sagen hat... </p>
      </span>
      <span v-else>
        <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="220"/>
        <p> @{{ person.schuldig.accountnamen[0] }} ist wirklich seltsam! </p>
        <p> Aber die Fälschung ist enttarnt und wir haben erste Hinweise auf die Tatmotive gesammelt. </p>
        <p> Und hört, was uns der Geist von Ludwig Leiner noch zu sagen hat... </p>
      </span>
      <!-- <div class="swipe-geste-horizontal" v-if="flow==0.6"></div> -->
      <!-- <div class="swipe-geste-horizontal"></div> -->
      <button-weiter-component class="button-weiter" v-if="flow==1.8" @click="swiperInstance.slideNext();" pulsiert/>
      <button-weiter-component class="button-weiter" v-else-if="flow>=1.7" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
      <!-- <button-weiter-component class="button-weiter" disabled /> -->
    </swiper-slide>

    <!-- OBJEKT 1 - Leiner -->
    <swiper-slide v-if="flow >= 1.8 && flow<2.0" class="leiner-slide posting-slide">
      <swiper :modules="modules" :direction="'vertical'" :scrollbar="true" :mousewheel="true" :slidesPerView="'auto'" :freeMode="true">
        <swiper-slide>
          <!-- <img src="assets/img/leiner.png" width="200" style="margin-left: auto; margin-right: auto; display: block;"/> -->
          <img class="spieler" src="assets/img/leiner.png" width="200"/>

          <p v-html="objekte_ort_spieler(0).leinertext" />

          <img v-if="ort=='eg'" :src="`assets/objekte/eg/${objekte.eg[0].code}/${objekte.eg[0].code}_leiner.jpg`" width="500" style="margin-left: auto; margin-right: auto; display: block;"/>
          <img v-else-if="ort=='og1'" :src="`assets/objekte/og1/${objekte.og1[0].code}/${objekte.og1[0].code}_leiner.jpg`" width="500" style="margin-left: auto; margin-right: auto; display: block;"/>
          <p style="margin-bottom: 120px;" />
          <button-weiter-component class="button-weiter" v-if="flow==1.8" @click="flow=2.0" pulsiert />
          <button-weiter-component class="button-weiter" v-else-if="flow>1.8" @click="flow=2.0"/>
          <button-weiter-component class="button-weiter" v-else disabled />
          <div class="swipe-geste-vertikal"></div>
        </swiper-slide>
      </swiper>
    </swiper-slide>

    <!-- OBJEKT 1 - Ende -->

    <!-- OBJEKT 2 - Start -->

    <swiper-slide v-if="flow >=2.0 && flow<3.0">
      <span v-if="spieler=='Watson'">
        <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="230"/>
        <p style="margin-top: 50px;"> Keine Sorge, lieber Ludwig Leiner, machen wir! </p>
        <p> Aber... oh weh, es gibt einen weiteren Verdacht auf eine Fälschung. </p>
        <p> Klickt auf die Lupe Nr. 2 und beantwortet meine nächste Frage. </p>
      </span>
      <span v-else-if="spieler=='Sherlock'">
        <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="250"/>
        <p style="margin-top: 50px;"> Ihr Auftrag ist in den besten Händen, lieber Herr Leiner. </p>
        <p> Aber was höre ich da? Ein weiteres verdächtiges Detail?! </p>
        <p> Klickt auf die Lupe Nr. 2 und beantwortet meine nächste Frage. </p>
      </span>
      <span v-else>
        <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="220"/>
        <p style="margin-top: 50px;"> Keine Sorge, lieber Herr Leiner, wir sind ein starkes Team! </p>
        <p> Aber es gibt leider einen weiteren Verdacht auf eine Fälschung. </p>
        <p> Klickt bitte auf die Lupe Nr. 2 und beantwortet meine nächste Frage. </p>
      </span>
      <!-- <div class="swipe-geste-horizontal" v-if="flow==0.6"></div> -->
      <!-- <div class="swipe-geste-horizontal"></div> -->
      <button-weiter-component class="button-weiter" v-if="flow==2.1" @click="swiperInstance.slideNext();" pulsiert/>
      <button-weiter-component class="button-weiter" v-else-if="flow>2.0" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
      <!-- <button-weiter-component class="button-weiter" disabled /> -->
    </swiper-slide>

    <!-- OBJEKT 2 - Quiz -->
    <swiper-slide v-if="flow >= 2.1 && flow<3.0">
      <span v-if="!antwortClicked && ort=='eg'">
        <span v-if="spieler=='Watson'">
          <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="210"/>
          <p v-html="objekte.eg[1].watson.quiz.frage" />
        </span>
        <span v-else-if="spieler=='Sherlock'">
          <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="230"/>
          <p v-html="objekte.eg[1].sherlock.quiz.frage" />
        </span>
        <span v-else>
          <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="210"/>
          <p v-html="objekte.eg[1].enola.quiz.frage" />
        </span>
      </span>
      <span v-else-if="!antwortClicked && ort=='og1'">
        <span v-if="spieler=='Watson'">
          <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="210"/>
          <p v-html="objekte.og1[1].watson.quiz.frage" />
        </span>
        <span v-else-if="spieler=='Sherlock'">
          <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="230"/>
          <p v-html="objekte.og1[1].sherlock.quiz.frage" />
        </span>
        <span v-else>
          <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="210"/>
          <p v-html="objekte.og1[1].enola.quiz.frage" />
        </span>
      </span>
      <span v-else-if="!antwortRichtig">
        <span v-if="spieler=='Watson'">
          <img class="spieler" src="assets/img/detektive/watson_enttaeuscht.png" width="210"/>
          <br><br>
          <p> Das ist leider falsch, versucht es noch einmal. </p>
        </span>
        <span v-else-if="spieler=='Sherlock'">
          <img class="spieler" src="assets/img/detektive/sherlock_enttaeuscht.png" width="230"/>
          <br><br>
          <p> Leider falsch, aber ihr bekommt nochmal eine Chance. </p>
        </span>
        <span  v-else-if="spieler=='Enola'">
          <img class="spieler" src="assets/img/detektive/enola_enttaeuscht.png" width="210"/>
          <br><br>
          <p> Leider falsch, versucht es noch einmal. </p>
        </span>
      </span>
      <span v-else-if="antwortRichtig">
        <span v-if="spieler=='Watson'">
          <img class="spieler" src="assets/img/detektive/watson_gluecklich.png" width="210"/>
          <br><br>
          <p> Ihr seid Klasse! Das ist richtig. </p>
          <p> Und schon wieder gibt es eine passende Spur bei @{{ person.schuldig.accountnamen[0] }}... </p>
        </span>
        <span v-else-if="spieler=='Sherlock'">
          <img class="spieler" src="assets/img/detektive/sherlock_gluecklich.png" width="240"/>
          <br><br>
          <p> Gut erkannt! Das ist richtig. </p>
          <p> Und schon wieder gibt es eine passende Spur bei @{{ person.schuldig.accountnamen[0] }}... </p>
        </span>
        <span v-else>
          <img class="spieler" src="assets/img/detektive/enola_gluecklich.png" width="210"/>
          <br><br>
          <p> Perfekt! Die Antwort ist richtig! </p>
          <p> Und schon wieder gibt es eine passende Spur bei @{{ person.schuldig.accountnamen[0] }}... </p>
        </span>
      </span>
      <div class="antwort-buttons">
        <ion-button size="large" expand="block" v-for="(n, i) in randomOrder" :key="i"
            :color="buttonFarbe[n]"
            :fill="buttonFill[n]"
            @click="antwortAusgewaehlt(n, objekte_ort_spieler(1).quiz.antwort[n].richtig)" 
            :disabled="antwortRichtig&&!objekte_ort_spieler(1).quiz.antwort[n].richtig"> 
          {{objekte_ort_spieler(1).quiz.antwort[n].text}} 
        </ion-button>
      </div>
      <button-weiter-component class="button-weiter" v-if="flow==2.2 && antwortRichtig" @click="swiperInstance.slideNext();" pulsiert/>
      <button-weiter-component class="button-weiter" v-else-if="flow>2.2" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>

    <!-- OBJEKT 2 - Post 1 -->
    <swiper-slide class="posting-slide" v-if="flow >= 2.2 && flow<3.0">
      <swiper :modules="modules" :direction="'vertical'" :scrollbar="true" :mousewheel="true" :slidesPerView="'auto'" :freeMode="true">
        <swiper-slide>
          <span v-if="spieler=='Watson'">
            <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="210"/>
            <br><br><br>
            <p> Schaut Euch den Post genau an und sucht dann nach dem Objekt. </p>
          </span>
          <span v-else-if="spieler=='Sherlock'">
            <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="250"/>
            <br><br>
            <p> Schaut Euch den Post genau an, dann kann die Suche im Museum weitergehen. </p>
          </span>
          <span v-else-if="spieler=='Enola'">
            <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="220"/>
            <br><br>
            <p> Schaut Euch den Post genau an, dann kann die Suche im Museum weitergehen. </p>
          </span>
          <PostingComponent
              :username="`@${person.schuldig.accountnamen[0]}`"
              :avatar="`assets/accounts/${person.schuldig.accountnamen[0]}/${person.schuldig.accountnamen[0]}.jpg`"
              :bild="`assets/objekte/${objekte_ort[1].ort}/${objekte_ort[1].code}/${objekte_ort[1].code}_post1.jpg`"
              :hashtag=objekte_ort[1].hashtag_1
              likes="43210"
              @hashtag-clicked="flow<2.3 ? flow=2.3 : flow=flow"
              :eingetragen="flow>=2.3">
            <span v-html="objekte_ort_spieler(1).post_1" />
          </PostingComponent>
          <p style="margin-bottom: 120px;">
            Berührt den pulsierenden Hashtag.
          </p>
          <button-weiter-component class="button-weiter" v-if="flow==2.3" @click="swiperInstance.slideNext();" pulsiert/>
          <button-weiter-component class="button-weiter" v-else-if="flow>2.3" @click="swiperInstance.slideNext();"/>
          <button-weiter-component class="button-weiter" v-else disabled />
          <div class="swipe-geste-vertikal"></div>
        </swiper-slide>
      </swiper>
    </swiper-slide>

    <swiper-slide v-if="flow >=2.3 && flow<3.0">
      <span v-if="spieler=='Watson'">
        <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="230"/>
        <p> Sehr gut, unser Ermittlungsbuch füllt sich! </p>
        <p> Habt ihr Euch den Post genau angeschaut? Dann sucht bitte das gefälschte Objekt hier im Museum. </p>
        <p> Ihr wisst ja: Wenn die Hightech-Lupe blinkt, ist etwas Verdächtiges in der Nähe! </p>
      </span>
      <span v-else-if="spieler=='Sherlock'">
        <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="250"/>
        <p> Sehr gut, wieder ein eigenartiger Hinweis, unser Ermittlungsbuch füllt sich! </p>
        <p> Habt ihr Euch den Post genau angeschaut? Dann lasst uns das gefälschte Objekt hier im Museum suchen. </p>
        <p> Ihr wisst ja, wenn die  Hightech-Lupe blinkt, ist etwas Verdächtiges in der Nähe!</p>
      </span>
      <span v-else>
        <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="220"/>
        <p> Sehr gut, unser Ermittlungsbuch füllt sich! </p>
        <p> Habt ihr Euch den Post genau angeschaut? Dann lasst uns wieder auf Spurensuche hier im Museum gehen. </p>
        <p> Ihr wisst ja, wenn die  Hightech-Lupe blinkt, ist etwas Verdächtiges in der Nähe! </p>
      </span>
      <button-weiter-component class="button-weiter" v-if="!btTrigger" @click="flow=2.6"/>
      <button-weiter-component class="button-weiter" v-else-if="flow==2.4" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else-if="flow>2.4" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>

    <swiper-slide v-if="flow == 2.36 && flow<3.0">
      <span v-if="spieler=='Watson'">
        <img class="spieler" src="assets/img/detektive/watson_enttaeuscht.png" width="230"/>
        <p style="margin-top: 80px;"> 
          Der Rahmen der Lupe ist immer noch dunkel, das Objekt ist wohl noch nicht in der Nähe. 
        </p>
        <p> Braucht ihr einen Tipp? </p>
        <p> Dann drückt doch mal auf die Karte. </p>
      </span>
      <span v-else-if="spieler=='Sherlock'">
        <img class="spieler" src="assets/img/detektive/sherlock_enttaeuscht.png" width="250"/>
        <p style="margin-top: 80px"> Die Lupe ist immer noch dunkel. Kein gutes Zeichen. </p>
        <p> Braucht ihr einen Tipp? Dann drückt doch mal auf die Karte. </p>
      </span>
      <span v-else>
        <img class="spieler" src="assets/img/detektive/enola_enttaeuscht.png" width="220"/>
        <p> Wir tappen irgendwie im Dunkeln. </p>
        <p> Ich denke, wir könnten einen  Tipp gebrauchen. </p>
        <p> Drückt doch mal auf die Karte. </p>
      </span>
    </swiper-slide>

    <!-- OBJEKT 2 - Post 2 -->
    <swiper-slide class="posting-slide" v-if="flow >= 2.6 && flow<3.0">
      <swiper :modules="modules" :direction="'vertical'" :scrollbar="true" :mousewheel="true" :slidesPerView="'auto'" :freeMode="true">
        <swiper-slide>
          <span v-if="spieler=='Watson'">
            <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="210"/>
            <p> Sehr gut! </p>
            <p> Auch diese Fälschung ist enttarnt. </p>
            <p> Und lest mehr bei @{{ person.schuldig.accountnamen[0] }} über die Tatmotive... </p>
          </span>
          <span v-else-if="spieler=='Sherlock'">
            <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="250"/>
            <p> Verblüffend: auch das ist also eine Fälschung! </p>
            <p v-if="ort=='eg'"> Und es gibt einen zweiten Post von @{{ person.schuldig.accountnamen[0] }}. </p>
            <p v-else-if="ort=='og1'"> Mal schauen, ob wir da noch mehr über die Tatmotive erfahren? </p>
          </span>
          <span v-else-if="spieler=='Enola'">
            <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="220"/>
            <p> Diese Fälschungen machen mich sprachlos! </p>
            <p> Aber @{{ person.schuldig.accountnamen[0] }} geht schon wieder auf Sendung. Ob wir mehr über die Tatmotive erfahren? </p>
          </span>
          <PostingComponent
              :username="`@${person.schuldig.accountnamen[0]}`"
              :avatar="`assets/accounts/${person.schuldig.accountnamen[0]}/${person.schuldig.accountnamen[0]}.jpg`"
              :bild="`assets/objekte/${objekte_ort[1].ort}/${objekte_ort[1].code}/${objekte_ort[1].code}_post2.jpg`"
              :hashtag=objekte_ort[1].hashtag_2
              likes="42911"
              @hashtag-clicked="flow<2.7 ? flow=2.7 : flow=flow"
              :eingetragen="flow>=2.7">
            <span v-html="objekte_ort_spieler(1).post_2" />
          </PostingComponent>
          <p style="margin-bottom: 120px;">
            Berührt den pulsierenden Hashtag.
          </p>
          <button-weiter-component class="button-weiter" v-if="flow==2.7" @click="flow=2.8; swiperInstance.slideNext();" pulsiert/>
          <button-weiter-component class="button-weiter" v-else-if="flow>2.7" @click="swiperInstance.slideNext();"/>
          <button-weiter-component class="button-weiter" v-else disabled />
          <div class="swipe-geste-vertikal"></div>
        </swiper-slide>
      </swiper>
    </swiper-slide>

    <swiper-slide v-if="flow >=2.7 && flow<3.0">
      <span v-if="spieler=='Watson'">
        <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="230"/>
        <p> Seltsame Tatmotive! Aber wir waren wieder erfolgreich und haben @accountname auf frischer Tat ertappt. </p>
        <p> Und ich glaube, der Geist von Ludwig Leiner will uns noch etwas sagen... </p>
      </span>
      <span v-else-if="spieler=='Sherlock'">
        <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="250"/>
        <p> @{{ person.schuldig.accountnamen[0] }} bleibt rätselhaft! Ob es ein Muster hinter diesen Diebstählen gibt...? </p>
        <p> Ich glaube, der Geist von Ludwig Leiner will uns noch etwas sagen... </p>
      </span>
      <span v-else>
        <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="220"/>
        <p> Seltsame Tatmotive! Wir müssen das Muster hinter diesen Diebstählen erkennen.  </p>
        <p> Das sind wir auch dem Geist von Ludwig Leiner schuldig... </p>
      </span>
      <button-weiter-component class="button-weiter" v-if="flow==2.8" @click="swiperInstance.slideNext();" pulsiert/>
      <button-weiter-component class="button-weiter" v-else-if="flow>=2.7" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>

    <!-- OBJEKT 2 - Leiner -->
    <swiper-slide v-if="flow >= 2.8 && flow<3.0" class="leiner-slide posting-slide">
      <swiper :modules="modules" :direction="'vertical'" :scrollbar="true" :mousewheel="true" :slidesPerView="'auto'" :freeMode="true">
        <swiper-slide>
          <!-- <img src="assets/img/leiner.png" width="200" style="margin-left: auto; margin-right: auto; display: block;"/> -->
          <!-- <img class="spieler" src="assets/img/leiner.png" width="200"/> -->
          <img v-if="ort=='eg'" :src="`assets/objekte/eg/${objekte.eg[1].code}/${objekte.eg[1].code}_leiner.jpg`" width="500" style="margin-left: auto; margin-right: auto; display: block;"/>
          <img v-else-if="ort=='og1'" :src="`assets/objekte/og1/${objekte.og1[1].code}/${objekte.og1[1].code}_leiner.jpg`" width="500" style="margin-left: auto; margin-right: auto; display: block;"/>
          <p v-html="objekte_ort_spieler(0).leinertext" />
          <p style="margin-bottom: 120px;" />
          <button-weiter-component class="button-weiter" v-if="flow==2.8" @click="flow=3.0" pulsiert />
          <button-weiter-component class="button-weiter" v-else-if="flow>2.8" @click="flow=3.0"/>
          <button-weiter-component class="button-weiter" v-else disabled />
          <div class="swipe-geste-vertikal"></div>
        </swiper-slide>
      </swiper>
    </swiper-slide>

    <!-- OBJEKT 2 - Ende -->

    <!-- OBJEKT 3 - Start -->

    <swiper-slide v-if="flow >=3.0 && flow<4.0">
      <span v-if="spieler=='Watson'">
        <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="230"/>
        <p style="margin-top: 50px;"> Keine Sorge, lieber Ludwig Leiner, machen wir! </p>
        <p> Aber... oh weh, ein weiterer Verdacht auf eine Fälschung! </p>
        <p> Klickt auf Lupe Nr. 3 und beantwortet meine Frage. </p>
      </span>
      <span v-else-if="spieler=='Sherlock'">
        <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="250"/>
        <p style="margin-top: 40px;"> Keine Sorge, lieber Herr Leiner! Wir haben schon interessante Spuren gesichert. </p>
        <p> Und es gibt einen dritten Fälschungsverdacht! </p>
        <p> Klickt auf Lupe Nr. 3 und beantwortet meine Frage. </p>
      </span>
      <span v-else>
        <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="220"/>
        <p style="margin-top: 50px;"> Keine Sorge, lieber Herr Leiner! Wir haben schon wichtige Spuren gesichert. </p>
        <p> Aber der Detaildieb gönnt uns keine Pause. </p>
        <p> Klickt bitte auf die Lupe Nr. 3 und beantwortet meine Frage zum neuen Fälschungsverdacht. </p>
      </span>
      <!-- <div class="swipe-geste-horizontal" v-if="flow==0.6"></div> -->
      <!-- <div class="swipe-geste-horizontal"></div> -->
      <button-weiter-component class="button-weiter" v-if="flow==3.1" @click="swiperInstance.slideNext();" pulsiert/>
      <button-weiter-component class="button-weiter" v-else-if="flow>3.0" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>
    
    <!-- OBJEKT 3 - Quiz -->
    <swiper-slide v-if="flow >= 3.1 && flow<4.0">
      <span v-if="!antwortClicked && ort=='eg'">
        <span v-if="spieler=='Watson'">
          <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="210"/>
          <p v-html="objekte.eg[2].watson.quiz.frage" />
        </span>
        <span v-else-if="spieler=='Sherlock'">
          <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="230"/>
          <p v-html="objekte.eg[2].sherlock.quiz.frage" />
        </span>
        <span v-else>
          <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="210"/>
          <p v-html="objekte.eg[2].enola.quiz.frage" />
        </span>
      </span>
      <span v-else-if="!antwortClicked && ort=='og1'">
        <span v-if="spieler=='Watson'">
          <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="210"/>
          <p v-html="objekte.og1[2].watson.quiz.frage" />
        </span>
        <span v-else-if="spieler=='Sherlock'">
          <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="230"/>
          <p v-html="objekte.og1[2].sherlock.quiz.frage" />
        </span>
        <span v-else>
          <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="210"/>
          <p v-html="objekte.og1[2].enola.quiz.frage" />
        </span>
      </span>
      <span v-else-if="!antwortRichtig">
        <span v-if="spieler=='Watson'">
          <img class="spieler" src="assets/img/detektive/watson_enttaeuscht.png" width="210"/>
          <br><br>
          <p> Das ist leider falsch, versucht es noch einmal. </p>
        </span>
        <span v-else-if="spieler=='Sherlock'">
          <img class="spieler" src="assets/img/detektive/sherlock_enttaeuscht.png" width="230"/>
          <br><br>
          <p> Leider falsch, aber ihr bekommt nochmal eine Chance. </p>
        </span>
        <span  v-else-if="spieler=='Enola'">
          <img class="spieler" src="assets/img/detektive/enola_enttaeuscht.png" width="210"/>
          <br><br>
          <p> Leider falsch, versucht es noch einmal. </p>
        </span>
      </span>
      <span v-else-if="antwortRichtig">
        <span v-if="spieler=='Watson'">
          <img class="spieler" src="assets/img/detektive/watson_gluecklich.png" width="210"/>
          <br><br>
          <p> Super! Die Antwort ist richtig. </p>
          <p> Und da ist auch schon die dritte heiße Spur im Internet. </p>
        </span>
        <span v-else-if="spieler=='Sherlock'">
          <img class="spieler" src="assets/img/detektive/sherlock_gluecklich.png" width="240"/>
          <br><br>
          <p>  Richtig, liebe Meister-Detektive! </p>
          <p> Und da ist auch schon die dritte heiße Spur bei @{{ person.schuldig.accountnamen[0] }}. Seid ihr bereit? </p>
        </span>
        <span v-else>
          <img class="spieler" src="assets/img/detektive/enola_gluecklich.png" width="210"/>
          <br><br>
          <p> Sehr gut, die Antwort ist richtig!  </p>
          <p> Und ich wusste es: da ist der nächste dreiste Post von @{{ person.schuldig.accountnamen[0] }}... Seid ihr bereit? </p>
        </span>
      </span>
      <div class="antwort-buttons">
        <ion-button size="large" expand="block" v-for="(n, i) in randomOrder" :key="i"
            :color="buttonFarbe[n]"
            :fill="buttonFill[n]"
            @click="antwortAusgewaehlt(n, objekte_ort_spieler(2).quiz.antwort[n].richtig)" 
            :disabled="antwortRichtig&&!objekte_ort_spieler(2).quiz.antwort[n].richtig"> 
          {{objekte_ort_spieler(2).quiz.antwort[n].text}} 
        </ion-button>
      </div>
      <button-weiter-component class="button-weiter" v-if="flow==3.2 && antwortRichtig" @click="swiperInstance.slideNext();" pulsiert/>
      <button-weiter-component class="button-weiter" v-else-if="flow>3.2" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>

    <!-- OBJEKT 3 - Post 1 -->
    <swiper-slide class="posting-slide" v-if="flow >= 3.2 && flow<4.0">
      <swiper :modules="modules" :direction="'vertical'" :scrollbar="true" :mousewheel="true" :slidesPerView="'auto'" :freeMode="true">
        <swiper-slide>
          <span v-if="spieler=='Watson'">
            <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="210"/>
            <br><br>
            <p> Schaut Euch den Post genau an, bevor unsere Suche im Museum weitergeht. </p>
          </span>
          <span v-else-if="spieler=='Sherlock'">
            <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="250"/>
            <br><br>
            <p> Schaut Euch den Post genau an, bevor unsere Suche im Museum weitergeht. </p>
          </span>
          <span v-else-if="spieler=='Enola'">
            <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="220"/>
            <br><br>
            <p> Schaut Euch den Post genau an, bevor unsere Suche im Museum weitergeht. </p>
          </span>
          <PostingComponent
              :username="`@${person.schuldig.accountnamen[0]}`"
              :avatar="`assets/accounts/${person.schuldig.accountnamen[0]}/${person.schuldig.accountnamen[0]}.jpg`"
              :bild="`assets/objekte/${objekte_ort[2].ort}/${objekte_ort[2].code}/${objekte_ort[2].code}_post1.jpg`"
              :hashtag=objekte_ort[1].hashtag_1
              likes="48501"
              @hashtag-clicked="flow<3.3 ? flow=3.3 : flow=flow"
              :eingetragen="flow>=3.3">
            <span v-html="objekte_ort_spieler(1).post_1" />
          </PostingComponent>
          <p style="margin-bottom: 120px;">
            Berührt den pulsierenden Hashtag.
          </p>
          <button-weiter-component class="button-weiter" v-if="flow==3.3" @click="swiperInstance.slideNext();" pulsiert/>
          <button-weiter-component class="button-weiter" v-else-if="flow>3.3" @click="swiperInstance.slideNext();"/>
          <button-weiter-component class="button-weiter" v-else disabled />
          <div class="swipe-geste-vertikal"></div>
        </swiper-slide>
      </swiper>
    </swiper-slide>

    <swiper-slide v-if="flow >= 3.3 && flow<4.0">
      <span v-if="spieler=='Watson'">
        <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="230"/>
        <p style="margin-top: 50px;"> Habt ihr Euch den Post genau angeschaut? </p>
        <p> Dann lasst uns mit Hilfe der Lupe prüfen, ob das tatsächlich auch eine Fälschung ist! </p>
      </span>
      <span v-else-if="spieler=='Sherlock'">
        <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="250"/>
        <p style="margin-top: 50px;"> Der fünfte Hinweis im Notizbuch! </p>
        <p> Habt ihr Euch den Post genau angeschaut? </p>
        <p> Dann lasst uns mit Hilfe der Lupe das passende Objekt suchen und überprüfen! </p>
      </span>
      <span v-else>
        <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="220"/>
        <p style="margin-top: 50px;"> Habt ihr Euch den Post genau angeschaut? </p>
        <p> Dann lasst uns mit Hilfe der Lupe das passende Objekt suchen und überprüfen! </p>
      </span>
      <button-weiter-component class="button-weiter" v-if="!btTrigger" @click="flow=3.6;swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else-if="flow>3.4" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>

    <swiper-slide v-if="flow == 3.36 && flow<4.0">
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
    </swiper-slide>

    <!-- OBJEKT 3 - Post 2 -->
    <swiper-slide class="posting-slide" v-if="flow >= 3.6 && flow<4.0">
      <swiper :modules="modules" :direction="'vertical'" :scrollbar="true" :mousewheel="true" :slidesPerView="'auto'" :freeMode="true">
        <swiper-slide>
          <span v-if="spieler=='Watson'">
            <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="210"/>
            <p> Das ist also die dritte Meisterkopie von @{{ person.schuldig.accountnamen[0] }}... </p>
            <p> Und es gibt neue Hinweise auf die Tatmotive. Wollt ihr mehr erfahren? </p>
          </span>
          <span v-else-if="spieler=='Sherlock'">
            <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="250"/>
            <p> Die dritte Fälschung! @{{ person.schuldig.accountnamen[0] }} ist dreist und fingerfertig... </p>
            <p> Und es gibt neue Hinweise auf die Tatmotive. Wollt ihr mehr erfahren? </p>
          </span>
          <span v-else-if="spieler=='Enola'">
            <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="220"/>
            <p> Unglaublich diese Fälschungsserie... Wer steckt hinter @{{ person.schuldig.accountnamen[0] }}? </p>
            <p> Es gibt einen dritten Post mit neuen Hinweisen auf die Tatmotive. Wollt ihr mehr erfahren? </p>
          </span>
          <PostingComponent
              :username="`@${person.schuldig.accountnamen[0]}`"
              :avatar="`assets/accounts/${person.schuldig.accountnamen[0]}/${person.schuldig.accountnamen[0]}.jpg`"
              :bild="`assets/objekte/${objekte_ort[2].ort}/${objekte_ort[2].code}/${objekte_ort[2].code}_post2.jpg`"
              :hashtag=objekte_ort[1].hashtag_2
              likes="51029"
              @hashtag-clicked="flow<3.7 ? flow=3.7 : flow=flow"
              :eingetragen="flow>=3.7">
            <span v-html="objekte_ort_spieler(1).post_2" />
          </PostingComponent>
          <p style="margin-bottom: 120px;">
            Berührt den pulsierenden Hashtag.
          </p>
          <button-weiter-component class="button-weiter" v-if="flow==3.7" @click="flow=3.8; swiperInstance.slideNext();" pulsiert/>
          <button-weiter-component class="button-weiter" v-else-if="flow>3.7" @click="swiperInstance.slideNext();"/>
          <button-weiter-component class="button-weiter" v-else disabled />
          <div class="swipe-geste-vertikal"></div>
        </swiper-slide>
      </swiper>
    </swiper-slide>

    <swiper-slide v-if="flow >= 3.7 && flow<4.0">
      <span v-if="spieler=='Watson'">
        <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="230"/>
        <p> Großartig, liebes Team! Wir haben drei Fälschungen enttarnt und viele Hinweise auf die Tatmotive gesammelt. </p>
        <p> Doch bevor wie den Fall lösen, will uns der Geist von Ludwig Leiner noch etwas sagen. </p>
      </span>
      <span v-else-if="spieler=='Sherlock'">
        <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="250"/>
        <p> Großartig! Wir haben drei Fälschungen enttarnt und wichtige Hinweise auf die Tatmotive gesammelt. 
          Bald werden wir das Geheimnis von @{{ person.schuldig.accountnamen[0] }} lüften. </p>
        <p> Aber aufgepasst! Der Geist von Ludwig Leiner will uns noch etwas mit auf den Weg geben... </p>
      </span>
      <span v-else>
        <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="220"/>
        <p> Wunderbar! Wir haben drei Fälschungen enttarnt und wichtige Hinweise auf die Tatmotive gesammelt. 
          Bald werden wir das Geheimnis von @{{ person.schuldig.accountnamen[0] }} lüften. </p>
        <p> Ludwig Leiner soll endlich seine Ruhe finden... </p>
      </span>
      <!-- <div class="swipe-geste-horizontal" v-if="flow==0.6"></div> -->
      <!-- <div class="swipe-geste-horizontal"></div> -->
      <button-weiter-component class="button-weiter" v-if="flow==3.8" @click="swiperInstance.slideNext();" pulsiert/>
      <button-weiter-component class="button-weiter" v-else-if="flow>=3.7" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
      <!-- <button-weiter-component class="button-weiter" disabled /> -->
    </swiper-slide>

    <!-- OBJEKT 3 - Leiner -->
    <swiper-slide v-if="flow >= 3.8 && flow<4.0" class="leiner-slide posting-slide">
      <swiper :modules="modules" :direction="'vertical'" :scrollbar="true" :mousewheel="true" :slidesPerView="'auto'" :freeMode="true">
        <swiper-slide>
          <!-- <img src="assets/img/leiner.png" width="200" style="margin-left: auto; margin-right: auto; display: block;"/> -->
          <!-- <img class="spieler" src="assets/img/leiner.png" width="200"/> -->
          <img v-if="ort=='eg'" :src="`assets/objekte/eg/${objekte.eg[2].code}/${objekte.eg[2].code}_leiner.jpg`" width="500" style="margin-left: auto; margin-right: auto; display: block;"/>
          <img v-else-if="ort=='og1'" :src="`assets/objekte/og1/${objekte.og1[2].code}/${objekte.og1[2].code}_leiner.jpg`" width="500" style="margin-left: auto; margin-right: auto; display: block;"/>
          <p v-html="objekte_ort_spieler(0).leinertext" />
          <p style="margin-bottom: 120px;" />
          <button-weiter-component class="button-weiter" v-if="flow==3.8" @click="flow=4.0" pulsiert />
          <button-weiter-component class="button-weiter" v-else-if="flow>3.8" @click="flow=4.0"/>
          <button-weiter-component class="button-weiter" v-else disabled />
          <div class="swipe-geste-vertikal"></div>
        </swiper-slide>
      </swiper>
    </swiper-slide>

    <!-- OBJEKT 3 - Ende -->

    <!-- TÄTERSUCHE beginnt -->

    <swiper-slide v-if="flow >=4.0 && flow<5.0">
      <span v-if="spieler=='Watson'">
        <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="230"/>
        <p> Keine Sorge, lieber Ludwig Leiner! </p>
        <p> Lasst uns zurück zum Detektivbüro gehen, unserem Startpunkt, und den Fall lösen! </p>
      </span>
      <span v-else-if="spieler=='Sherlock'">
        <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="220"/>
        <p> Darauf können sie sich verlassen, verehrter Herr Leiner! </p>
        <p> Tadellose Arbeit, werte Detektive! Lasst uns zurück in unser Detektivbüro gehen und den Fall lösen. </p>
      </span>
      <span v-else>
        <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="190"/>
        <p> Auch uns lassen diese Fälschungen keine Ruhe, lieber Herr Leiner. </p>
        <p> Wir werden herausfinden, wer hinter @{{ person.schuldig.accountnamen[0] }} steckt. </p>
        <p> Lasst uns zurück in unser Detektivbüro gehen und den Fall lösen! </p>
      </span>
      <!-- <div class="swipe-geste-horizontal" v-if="flow==0.6"></div> -->
      <!-- <div class="swipe-geste-horizontal"></div> -->
      <button-weiter-component class="button-weiter" v-if="!btTrigger&&flow==4.0" @click="flow=4.1;swiperInstance.slideNext();" pulsiert/>
      <button-weiter-component class="button-weiter" v-else-if="!btTrigger&&flow>4.1" @click="flow=4.1;swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else-if="flow==4.1" @click="swiperInstance.slideNext();" pulsiert/>
      <button-weiter-component class="button-weiter" v-else-if="flow>4.1" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
      <!-- <button-weiter-component class="button-weiter" disabled /> -->
    </swiper-slide>

    <!-- Im Detektivbüro angekommen: Täterauswahl -->
    <swiper-slide v-if="flow >=4.1 && flow<5.0">
      <span v-if="spieler=='Watson'" >
        <img class="spieler" src="assets/img/detektive/watson_neutral.png" width="230"/>
        <p style="font-size: 24px;"> 
          Drei verdächtige Personen wurden in letzter Zeit im Museum gesehen:  
          <ul>
            <li>{{ person_ort_spieler[0].name }}</li>
            <li>{{ person_ort_spieler[1].name }}</li>
            <li>{{ person_ort_spieler[2].name }}</li>             
          </ul>
          Leider haben alle drei schon mal Dinge aus einem Museum verschwinden lassen. 
          Aber sie haben ganz unterschiedliche Tatmotive
          Wer von ihnen steckt hinter @accountname?
          <br><br>
          Klickt auf die Fahndungsfotos. 
          Vergleicht die Steckbriefe mit den Hinweisen in unserem Notizbuch.
          Drückt auf die Handschellen, wenn ihr glaubt, 
          den richtigen Täter oder die richtige Täterin verhaften zu können.
        </p>
      </span>
      <span v-else-if="spieler=='Sherlock'">
        <img class="spieler" src="assets/img/detektive/sherlock_neutral.png" width="220"/>
        <p style="font-size: 24px;"> 
          Wir haben im Hintergrund weiter ermittelt: 
          Drei Tatverdächtige wurden in letzter Zeit immer wieder im Museum gesehen: 
          <ul>
            <li>{{ person_ort_spieler[0].name }}</li>
            <li>{{ person_ort_spieler[1].name }}</li>
            <li>{{ person_ort_spieler[2].name }}</li>             
          </ul>
          Leider haben alle drei schon mal Dinge aus Museen verschwinden lassen, 
          mit unterschiedlichen Tatmotiven...
          Wer von den drei steckt hinter @{{ person.schuldig.accountnamen[0] }} und den Fällen im Rosgartenmuseum?
          <br><br>
          Klickt auf die Fahndungsfotos. 
          Vergleicht die Informationen mit den Ergebnissen in unserem Ermittlungsbuch.
          Drückt auf die Handschellen, wenn ihr glaubt
          den richtigen Täter oder die richtige Täterin verhaften zu können.
        </p>
      </span>
      <span v-else>
        <img class="spieler" src="assets/img/detektive/enola_neutral.png" width="210"/>
        <p style="font-size: 24px;"> 
          Ich habe im Hintergrund weiter ermittelt: 
          Drei Tatverdächtige wurden in letzter Zeit immer wieder im Museum gesehen:
          <ul>
            <li>{{ person_ort_spieler[0].name }}</li>
            <li>{{ person_ort_spieler[1].name }}</li>
            <li>{{ person_ort_spieler[2].name }}</li>             
          </ul>
          Leider haben alle drei schon mal Dinge aus Museen verschwinden lassen, 
          mit unterschiedlichen Tatmotiven... 
          Wer von ihnen steckt hinter @{{ person.schuldig.accountnamen[0] }} 
          und den Fällen im Rosgartenmuseum?
          <br>
          Klickt auf die Fahndungsfotos. 
          Vergleicht die Informationen mit den Ergebnissen in unserem Ermittlungsbuch. 
          Dort könnt ihr auch die Posts nochmal anschauen.
          Drückt auf die Handschellen, wenn ihr glaubt
          den richtigen Täter oder die richtige Täterin verhaften zu können.
        </p>
      </span>
      <!-- <div class="swipe-geste-horizontal" v-if="flow==0.6"></div> -->
      <!-- <div class="swipe-geste-horizontal"></div> -->
      <button-weiter-component class="button-weiter" v-if="flow==4.2" @click="swiperInstance.slideNext();" pulsiert/>
      <button-weiter-component class="button-weiter" v-else-if="flow>4.2" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>

    <!-- Alibi Affenberg -->
    <swiper-slide v-if="flow == 4.31">
      <img class="spieler" src="assets/img/detektive/watson_enttaeuscht.png" width="180" v-if="spielStore.spieler=='Watson'"/>
      <img class="spieler" src="assets/img/detektive/sherlock_enttaeuscht.png" width="180" v-else-if="spielStore.spieler=='Sherlock'"/>
      <img class="spieler" src="assets/img/detektive/enola_enttaeuscht.png" width="180" v-else-if="spielStore.spieler=='Enola'"/>
      <img class="spieler" src="assets/kopf_mit_hals.svg" width="200" v-else/>
      <p v-if="spieler=='Watson'" style="font-size: 24px;"> Da lagen wir leider falsch! </p>
      <p v-else-if="spieler=='Sherlock'" style="font-size: 24px;"> Verdammt! Da lagen wir falsch! </p>
      <p v-else-if="spieler=='Enola'" style="font-size: 24px;"> Da lagen wir wohl falsch! </p>
      <p style="font-size: 24px;">
        {{ person_ort_spieler.find(p => p.code == spielStore.personVerhaftet)?.name }} 
        war heute den ganzen Tag nicht zuhause. 
        <!-- {{person_ort_spieler.findIndex(p => p.code == spielStore.personVerhaftet)}} -->
        <!-- {{ person_ort_spieler.find(p => p.code == spielStore.personVerhaftet)?.genus.maskulin ? 'Er' : 'Sie' }} -->
        {{ getPronomenVonCode(spielStore.personVerhaftet, true) }}
        war in Salem auf dem Affenberg. Das nenn ich mal ein tierisch starkes Alibi!
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
          Schaut euch die rot markierten Hashtags an. Sie passen tatsächlich nicht gut zu
          {{ person_ort_spieler.find(elem => elem.code == spielStore.personVerhaftet)?.name }}
        </p>
        <p>
          Wir geben nicht auf! Nächster Versuch: Wen überprüfen wir dieses Mal? 
          {{ person_ort_spieler.filter(elem => elem.code != spielStore.personVerhaftet)[0].name }}
          oder 
          {{ person_ort_spieler.filter(elem => elem.code != spielStore.personVerhaftet)[1].name }}?
          <br>
          Einer von ihnen muss es gewesen sein.
        </p>
        <p>
          Schaut Euch ihre Steckbriefe nochmal an und drückt auf die Handschellen, 
          wenn ihr glaubt zu wissen, wer es ist.
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
      <!-- <div class="swipe-geste-horizontal" v-if="flow==0.6"></div> -->
      <!-- <div class="swipe-geste-horizontal"></div> -->
      <!-- <button-weiter-component class="button-weiter" v-if="flow==4.3" @click="swiperInstance.slideNext();" pulsiert/>
      <button-weiter-component class="button-weiter" v-else-if="flow>4.3" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled /> -->
      <!-- <button-weiter-component class="button-weiter" disabled /> -->
    </swiper-slide>

    <!-- Alibi Biergarten -->
    <swiper-slide v-if="flow == 4.32">
      <img class="spieler" src="assets/img/detektive/watson_enttaeuscht.png" width="180" v-if="spielStore.spieler=='Watson'"/>
      <img class="spieler" src="assets/img/detektive/sherlock_enttaeuscht.png" width="180" v-else-if="spielStore.spieler=='Sherlock'"/>
      <img class="spieler" src="assets/img/detektive/enola_enttaeuscht.png" width="180" v-else-if="spielStore.spieler=='Enola'"/>
      <img class="spieler" src="assets/kopf_mit_hals.svg" width="200" v-else/>
      <p v-if="spieler=='Watson'" style="font-size: 24px;"> Da lagen wir leider falsch! </p>
      <p v-else-if="spieler=='Sherlock'" style="font-size: 24px;"> Verdammt! Da lagen wir falsch! </p>
      <p v-else-if="spieler=='Enola'" style="font-size: 24px;"> Da lagen wir wohl falsch! </p>
      <p style="font-size: 24px;">
        {{ person_ort_spieler.find(elem => elem.code == spielStore.personVerhaftet)?.name }} 
        war heute den ganzen Tag nicht zuhause. 
        {{ getPronomenVonCode(spielStore.personVerhaftet, true) }}
        <!-- {{person_ort_spieler.findIndex(p => p.code == spielStore.personVerhaftet)}} -->
        <!-- {{ person_ort_spieler.find(elem => elem.code == spielStore.personVerhaftet)?.genus.maskulin ? 'Er' : 'Sie' }} -->
        war heute in einem Biergarten in Konstanz. Das nenn ich mal ein erfrischendes Alibi.
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
          Nun kann es nur noch {{ person.schuldig.name }} sein. Lest euch nochmal ihren Steckbrief durch. Da passt alles!
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
          Nun kann es nur noch {{ person.schuldig.name }} sein. Lest euch nochmal ihren Steckbrief durch. Da passt alles!
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
          Nun kann es nur noch {{ person.schuldig.name }} sein. Lest euch nochmal ihren Steckbrief durch. Da passt alles!
        </p>
      </span>
      <!-- <div class="swipe-geste-horizontal" v-if="flow==0.6"></div> -->
      <!-- <div class="swipe-geste-horizontal"></div> -->
      <!-- <button-weiter-component class="button-weiter" v-if="flow==4.3" @click="swiperInstance.slideNext();" pulsiert/>
      <button-weiter-component class="button-weiter" v-else-if="flow>4.3" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled /> -->
      <!-- <button-weiter-component class="button-weiter" disabled /> -->
    </swiper-slide>
    
    <swiper-slide v-if="flow >= 4.4 && flow<5.0" class="leiner-slide">
      <img src="assets/img/leiner.png" width="200" style="margin-left: auto; margin-right: auto; display: block;"/>
      <p>
        Endlich kann mein Geist wieder in Frieden ruhen: 
        Ich danke euch! Ich verleihe euch den Spürnasenausweis, 
        der euch offiziell in den Kreis der Meisterdetektive erhebt! 
        Ihr könnt ihn am Eingang abholen.
      </p>
      <button-weiter-component class="button-weiter" v-if="flow==4.5" @click="swiperInstance.slideNext();" pulsiert/>
      <button-weiter-component class="button-weiter" v-else-if="flow>4.5" @click="swiperInstance.slideNext();"/>
      <button-weiter-component class="button-weiter" v-else disabled />
    </swiper-slide>
    
    <swiper-slide v-if="flow >=4.5 && flow<5.0">

      {{person_ort_spieler.findIndex(p => p.code == spielStore.personVerhaftet)}}
      <span v-if="spieler=='Watson'">
        <img class="spieler" src="assets/img/detektive/watson_gluecklich.png" width="250"/>
        <br><br>
        <p> Was für ein spannender Urlaub! </p>
        <p> Und ein Gutes hatten diese Diebstähle dann doch: Wir mussten als Detektive ganz genau hinschauen! </p>
        <p> In diesem Museum gibt es ja so viel zu entdecken… </p>
      </span>
      <span v-else-if="spieler=='Sherlock'">
        <img class="spieler" src="assets/img/detektive/sherlock_gluecklich.png" width="280"/>
        <br><br>
        <p> So mag ich meinen Urlaub. Garniert mit einem spannenden Fall! </p>
        <p> Und ein Gutes hatten diese Diebstähle dann doch: Wir haben die Sammlung mit ganz neuen Augen angeschaut! </p>
        <p> Da gibt es ja so viel zu entdecken… </p>
      </span>
      <span v-else>
        <img class="spieler" src="assets/img/detektive/enola_gluecklich.png" width="260"/>
        <br><br>
        <p> Eigentlich ein Museumsbesuch ganz nach meinem Geschmack. </p>
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

// Store //
const spielStore = useSpielStore();
const { flow, ort, spieler, btTrigger, ermittlungsAuswahl, 
    objekte, objekte_ort, objekte_ort_spieler,
    person, person_ort_spieler } = storeToRefs(spielStore);
console.log(`flow: ${flow}`);

// json //
  // wird initial auf Startseite geladen

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
type ButtonFillType = 'clear' | 'outline' | 'solid' | 'default';

const buttonFarbe1 = ref("primary");
const buttonFarbe2 = ref("primary");
const buttonFarbe3 = ref("primary");
const buttonFill1 = ref("outline");
const buttonFill2 = ref("outline");
const buttonFill3 = ref("outline");
const antwortClicked = ref(false);
const antwortRichtig = ref(false);
const buttonFarbe = ref(["primary", "primary", "primary"]);
const buttonFill = ref<ButtonFillType[]>(["outline", "outline", "outline"]);

const randomOrder = ref([0,1,2]);
randomOrder.value.sort((a, b) => 0.5 - Math.random())

// Flow //
watch(flow, () => {
  console.log(`(scroll tutorial) flow geändert auf ${flow.value}`);
  if (flow.value==1.0) {
    antwortClicked.value = false;
    antwortRichtig.value = false;
    swiperInstance.value.slideTo(0);
  }
  if (flow.value==1.0 || flow.value==2.0 || flow.value==3.0) {
    antwortClicked.value = false;
    antwortRichtig.value = false;
    buttonFarbe1.value = "primary";
    buttonFarbe2.value = "primary";
    buttonFarbe3.value = "primary";
    buttonFill1.value = "outline";
    buttonFill2.value = "outline";
    buttonFill3.value = "outline";
    buttonFarbe.value[0] = "primary";
    buttonFarbe.value[1] = "primary";
    buttonFarbe.value[2] = "primary";
    buttonFill.value[0] = "outline";
    buttonFill.value[1] = "outline";
    buttonFill.value[2] = "outline";
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

function getObjekt(spieler : string) {
  if (spielStore.objekte.eg[0] != null)
    return spielStore.objekte.eg[0];
}

function antwortAusgewaehlt(nr : number, richtig : boolean) {
  console.log("antwort: "+nr+" richtig: "+richtig);
  antwortRichtig.value = richtig;
  antwortClicked.value = true;
  buttonFill1.value = nr == 0 ? "solid" : "outline";
  buttonFill2.value = nr == 1 ? "solid" : "outline";
  buttonFill3.value = nr == 2 ? "solid" : "outline";
  for (let i=0; i<3; i++)
    buttonFill.value[i] = nr == i ? "solid" : "outline";

  if (nr>=0 && nr<3)
    buttonFarbe.value[nr] = richtig ? "success" : "danger";
  else
  {
    buttonFarbe.value[0] = "primary"
    buttonFarbe.value[1] = "primary"
    buttonFarbe.value[2] = "primary"
  }
  if (nr == 0) 
    buttonFarbe1.value = richtig ? "success" : "danger";
  else if (nr == 1)
    buttonFarbe2.value  = richtig ? "success" : "danger";
  else if (nr == 2)
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

function getPronomenVonCode(code : string, gross : boolean) : string {
  const p = person_ort_spieler.value.find(elem => elem.code == code);
  if (p?.genus != undefined) {
    if (p.genus.maskulin)
      return gross ? "Er" : "er";
    else if (p.genus.feminin)
      return gross ? "Sie" : "sie"
    else 
      return "";
  } else {
    return "";
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
  right: 90px;
  top: 440px;
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
.swipe-geste-vertikal {
  position: absolute;
  right: 20px;
  top: 500px;
  width: 50px;
  height: 50px;
  background-color: black;
  border-radius: 50%;
  opacity: 50%;
  /* margin-right: auto;
  margin-left: auto; */
  animation: swipe-vertikal-animation 4s ease-in-out infinite;
}
@keyframes swipe-vertikal-animation {
  0% {
    transform: translateY(+50px);
    opacity: 10%;
  }
  10% {
    transform: translateY(+50px);
    opacity: 40%;
  }
  40% {
    transform: translateY(-50px);
    opacity: 40%;
  }
  50% {
    transform: translateY(-50px);
    opacity: 10%;
  }
  60% {
    transform: translateY(-50px);
    opacity: 40%;
  }
  90% {
    transform: translateY(+50px);
    opacity: 40%;
  }
  100% {
    transform: translateY(+50px);
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