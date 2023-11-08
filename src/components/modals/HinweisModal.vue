<template>
  <div class="modal-wrapper">
    <h1>Notizbucheinträge zu Detail {{ nr }}</h1>
    <div class="modal-content">
      <div class="scrollbereich">
        <PostingComponent v-if="ort=='eg' && nr==1"
              username="@gerne_gestern"
              avatar="assets/personen/00x0/gerne_gestern.jpg"
              bild="assets/objekte/eg/00x0_eg_02/00x0_eg_02_post1.jpg"
              hashtag="#schönheit_aus_urzeiten"
              likes="30129"
              :eingetragen="flow>=1.3">
            Auch wenn sich der alte Leiner im Grab umdreht: 
            Ich habe dieses exquisite Gerippe aus seinem Rahmen befreit! 
            Andere Leute gehen mit Delfinen schwimmen, ich hole mir Ichthyosaurier nach Hause. 
            Im nächsten Post erfahrt ihr mehr dazu...
        </PostingComponent>
        <PostingComponent v-if="ort=='og1' && nr==1"
            username="@gerne_gestern"
            avatar="assets/personen/00x0/gerne_gestern.jpg"
            bild="assets/objekte/og/00x0_og1_ac/00x0_og1_ac_post1.jpg"
            hashtag="#schnipp_schnapp_locke_ab"
            likes="34876"
            :eingetragen="flow>=1.3">
            Es gibt Museen, deren Schränke sind schöner als jedes moderne Schaufenster. 
            In einem solchen Museum war ich heute und habe einiges für Euch mitgebracht. 
            Zum Beispiel diese Rarität. Unfassbar, was darin verborgen ist... 
            Schnipp, schnapp war sie weg!
        </PostingComponent>
        <PostingComponent v-if="ort=='eg' && nr==1"
              username="@gerne_gestern"
              avatar="assets/personen/00x0/gerne_gestern.jpg"
              bild="assets/objekte/eg/00x0_eg_02/00x0_eg_02_post2.jpg"
              hashtag="#alt_und_geheimnsvoll"
              likes="34521"
              @hashtag-clicked="flow=1.7"
              :eingetragen="flow>=1.7">
              Ich liebe diesen alten Saal. Hier ist alles so geheimnisvoll. 
              Diese schönen alten Vitrinen. Vom Museumsgründer selbst entworfen. 
              Aber bei aller Liebe: etwas vollgestopft ist es schon. 
              Ich wusste erst gar nicht, wo ich hinschauen sollte. 
              Dann habe ich den tollen Ichtyo an der Wand entdeckt. 
              Die mag ich noch mehr als Dinos. Ichthyosaurier sind die Fischsaurier. 
              Ich finde: diesen da könnte man noch mehr zum Highlight machen! 
              Und genau das ist meine Mission: alten Dingen, neue Ehrenplätze geben.
          </PostingComponent>
          <PostingComponent v-else-if="ort=='og1' && nr==1"
              username="@gerne_gestern"
              avatar="assets/personen/00x0/gerne_gestern.jpg"
              bild="assets/objekte/og/00x0_og1_ac/00x0_og1_ac_post2.jpg"
              hashtag="#schillernde_lockenpracht"
              likes="34232"
              @hashtag-clicked="flow=1.7"
              :eingetragen="flow>=1.7">
              Na, wie gefällt sie euch? Vielleicht habt ihr es erraten: 
              Im Inneren der Brosche befindet sich eine menschliche Haarlocke! 
              Heute sehen wir abgeschnittene Haare hauptsächlich beim Friseur. 
              Damals hatte die abgeschnittene Haarpracht eine andere Funktion: 
              sie zu verschenken galt als Zeichen der Verbundenheit und Treue. 
              Ob das Oma und Opa noch so gemacht haben? Oder sogar Schiller oder Goethe? 
              Wie auch immer... Ich werde die Brosche so liebevoll wie hier im Museum präsentieren. 
              Sie wird ein Glanzstück meiner Sammlung!
          </PostingComponent>

          <PostingComponent v-if="ort=='eg' && nr==2"
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
          <PostingComponent v-else-if="ort=='og1' && nr==2"
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
          <PostingComponent v-if="ort=='eg' && nr==2"
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
          <PostingComponent v-else-if="ort=='og1' && nr==2"
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

          <PostingComponent v-if="ort=='eg' && nr==3"
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
          <PostingComponent v-else-if="ort=='og1' && nr==3"
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
          <PostingComponent v-if="ort=='eg' && nr==3"
              username="@gerne_gestern"
              avatar="assets/personen/00x0/gerne_gestern.jpg"
              bild="assets/objekte/eg/x0x0_eg_02/x0x0_eg_02_post2.jpg"
              hashtag="#prunk_und_paradestück"
              likes="51029"
              @hashtag-clicked="flow=2.7"
              :eingetragen="flow>=2.7">
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
          <PostingComponent v-if="ort=='og1' && nr==3"
              username="@gerne_gestern"
              avatar="assets/personen/00x0/gerne_gestern.jpg"
              bild="assets/objekte/og/10x0_og1_bc/10x0_og1_bc_post2.jpg"
              hashtag="#faktisch_immerwoanders"
              likes=52930
              @hashtag-clicked="flow=2.7"
              :eingetragen="flow>=2.7">
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
      </div>

    </div>
    <ion-button class="zurueck-button" size="large" @click="modalController.dismiss()">zurück</ion-button>
  </div>

</template>

<style scoped>

.scrollbereich {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  width: 100%;
  padding-bottom: 100px;
  padding-top: 50px;
  padding-right: 100px;
}
.scrollbereich>* {
  width: 500px;
  margin-bottom: 100px;
}
b {
  font-size: 36px;
}
.zurueck-button {
  position: absolute;
  bottom: 30px;
  right: 30px;
}
.links {
  min-width: 300px;
  /* background-color: aquamarine; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.rechts {
  /* background-color: azure; */
  padding-left: 30px;
  padding-right: 30px;
  font-size: 24px;
}
p {
}
img {
  display: inline-block;
}
.person {
  /* height: 50%; */
  /* width: 300px; */
  /* position: relative; */
}
.modal-wrapper {
  padding: 20px;
  padding-right: 0px;
  /* padding-top: 10px; */
  display: flex;
  flex-direction: column;
  height: 100%;
  /* background-color: burlywood; */
}
.modal-wrapper .modal-content {
  font-size: 16pt;
  display: flex;
  height: 100%;
  /* flex-grow: 1; */
  /* text-align: center; */
  /* flex-direction: row; */
  justify-content: center;
  /* background-color: bisque; */
}

</style>

<script setup lang="ts">
import { useSpielStore } from '@/stores/SpielStore';
import { modalController } from '@ionic/core';
import { IonButton } from '@ionic/vue';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import PostingComponent from '../PostingComponent.vue';

const props = defineProps( {
    nr: {
      type: Number,
      default: 0
    }
  });

const emit = defineEmits<{
    (e: 'festnehmen', code : string) : void
}>();

const spielStore = useSpielStore();
const { flow, ort } = storeToRefs(spielStore);


console.log("opening HinweisModal");



</script>