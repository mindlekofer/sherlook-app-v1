<template>
  <div class="modal-wrapper">
    <h1>Notizbucheinträge zu Detail {{ nr }}</h1>
    <div class="swipe-geste-vertikal"></div>
    <div class="modal-content">
      <div class="scrollbereich">
        <PostingComponent v-if="ort=='eg' && nr==1"
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
        <PostingComponent v-if="ort=='og1' && nr==1"
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
        <PostingComponent v-if="ort=='eg' && nr==1"
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
          <PostingComponent v-else-if="ort=='og1' && nr==1"
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

          <PostingComponent v-if="ort=='eg' && nr==2"
              username="@gerne_gestern"
              avatar="assets/personen/00x0/gerne_gestern.jpg"
              bild="assets/objekte/eg/x0x0_eg_02/x0x0_eg_02_post1.jpg"
              hashtag="#hochlichter"
              likes="43210"
              @hashtag-clicked="flow=2.3"
              :eingetragen="flow>=2.3">
            <span v-if="spieler=='Watson'">
              Hier haben sie so viele Lanzen und Hellebarden ausgestellt, 
              an den Wänden und an den Decken, dass sie durchaus eine davon hergeben können.
            </span>
            <span v-else-if="spieler=='Sherlock'">
              Dieses Highlight konnte ich ganz einfach einsacken, 
              ganz ohne Gegenwehr der Wächter. 
              Hier haben sie so viele davon, an Wänden und Decken, 
              dass sie durchaus eine davon hergeben können, finde ich.
            </span>
            <span v-else-if="spieler=='Enola'">
              Vor 500 Jahren lief jeder Nachtwächter mit solchen Waffen durch die Gassen. 
              Heute konnte ich das Ding ganz einfach einsacken, 
              ganz ohne Gegenwehr der Wächter. 
              In diesem Museum haben sie so viel davon, 
              dass sie durchaus ein paar Highlights hergeben können, finde ich. 
              Und "Highlight" meint hier ganz wörtlich "hoch im Licht".
            </span>
          </PostingComponent>
          <PostingComponent v-else-if="ort=='og1' && nr==2"
              username="@gerne_gestern"
              avatar="assets/personen/00x0/gerne_gestern.jpg"
              bild="assets/objekte/og/001x_og1_ab/001x_og1_ab_post1.jpg"
              hashtag="#gut_versteckt"
              likes="42102"
              @hashtag-clicked="flow=2.3"
              :eingetragen="flow>=2.3">
            <span v-if="spieler=='Watson'">
              Ein interessantes Foto, oder nicht? Und das Beste ist: 
              Hinter diesem alten Schloss ist etwas versteckt. In Echt!
            </span>
            <span v-else-if="spieler=='Sherlock'">
              Faktenjäger aufgepasst! 
              An diesem Holzbalken wäre ich beinah achtlos vorbeigelaufen. 
              Dann habe ich das alte Schloss entdeckt. 
              Und da war mir klar: Da ist etwas versteckt. In Echt!
            </span>
            <span v-else-if="spieler=='Enola'">
              Faktenjäger aufgepasst! 
              An diesem Holzbanken wäre ich beinah achtlos vorbeigelaufen.  
              Dann habe ich den schwarzen Zapfen gesehen. Größer als man denkt. 
              Und da war mir klar: Da ist etwas versteckt. In Echt!
            </span>
          </PostingComponent>
          <PostingComponent v-if="ort=='eg' && nr==2"
              username="@gerne_gestern"
              avatar="assets/personen/00x0/gerne_gestern.jpg"
              bild="assets/objekte/eg/x0x0_eg_02/x0x0_eg_02_post2.jpg"
              hashtag="#prunk_und_paradestück"
              likes="42910"
              @hashtag-clicked="flow=2.7"
              :eingetragen="flow>=2.7">
            <span v-if="spieler=='Watson'">
              In meiner Sammlung gibt es viele Prunkstücke, durch die ich neue Fakten kennenlerne. 
              Diese hell glänzender Klinge hat mich magisch angezogen. 
              Sie hat eine einfache Spitze ohne Beil und Haken an der Seite. 
              Es ist eine einfache Lanze und keine Hellebarde. Seht ihr den Unterschied?
            </span>
            <span v-else-if="spieler=='Sherlock'">
              Wie immer seht ihr bei mir nicht nur schöne Dinge, 
              sondern bekommt interessante Fakten dazu geliefert. 
              Die mittelalterliche Hellebarde, die schon im 15. 
              Jahrhundert aufkam, besteht aus drei Teilen: 
              Einem Beil, Haken an den Seiten und einer Klinge an der Spitze. 
              Mich hat die einfache Version mit hell glänzender Klinge magisch angezogen. 
              Genau richtig für meine extravagante Prunk- und Paradesammlung!
            </span>
            <span v-else-if="spieler=='Enola'">
              Wie immer seht ihr bei mir nicht nur schöne Dinge, 
              sondern bekommt interessante Fakten dazu geliefert. 
              Die mittelalterliche Hellebarde, die schon im 15. Jahrhundert aufkam, 
              besteht aus drei Teilen: 
              Einem Beil, Haken an den Seiten und einer Klinge an der Spitze. 
              Mich hat die einfache Version mit hell glänzender Klinge magisch angezogen. 
              Um 1700 führte fast jeder im Fußvolk einen solchen Spieß mit sich. 
              Die Waffe war auch beliebt bei Militärparaden. 
              Man salutierte mit ihr oder stellte sie "bei Fuß". 
              Ein echtes Prunk- und Paradestück also. 
              Genau richtig für meine extravagante Fakten-Sammlung!
            </span>
          </PostingComponent>
          <PostingComponent v-else-if="ort=='og1' && nr==2"
              username="@gerne_gestern"
              avatar="assets/personen/00x0/gerne_gestern.jpg"
              bild="assets/objekte/og/001x_og1_ab/001x_og1_ab_post2.jpg"
              hashtag="#Zunftkasse1454"
              likes="45281"
              @hashtag-clicked="flow=2.7"
              :eingetragen="flow>=2.7">
            <span v-if="spieler=='Watson'">
              Diese Zunftkasse aus dem Jahr 1454 musste ich einfach öffnen. 
              Vorsichtig und behutsam. 
              Nicht weil mich Gold oder Silber besonders interessieren würden. 
              Nein! Ich wollte einfach an die Fakten kommen und wissen, 
              was hinter dem Schloss verborgen ist. 
              Ich liebe alte und echte Geheimnisse!
            </span>
            <span v-else-if="spieler=='Sherlock'">
              Zum Glück habe ich bei der Führung durch das Museum aufgepasst. 
              Der historische „Zunftsaal“ wurde 1454 eingerichtet und diente 
              den Mitgliedern der Rosgartenzunft als Versammlungssaal und Trinkstube. 
              Die alte Zunftkasse ist in der Holzwand eingelassen, 
              damit sie niemand wegtragen kann. 
              Da kribbelt es mir doch sofort in den Fingern: 
              Ich liebe alte und echte Geheimnisse!
            </span>
            <span v-else-if="spieler=='Enola'">
              Historische Geheimnisse ziehen mich magisch an! 
              Bei einer Führung durch das Museum habe ich den entscheidenden Hinweis bekommen. 
              Der „Zunftsaal“ wurde 1454 im Haus „Zum Schwarzen Widder“ 
              eingerichtet und mit dem Haus zum "Rosgarten" verbunden. 
              Er diente den Mitgliedern der Rosgartenzunft als Versammlungssaal und Trinkstube. 
              Und jetzt kommt das Beste: Hier haben sie die alte Zunftkasse versteckt: 
              Damit sie niemand wegtragen konnte, wurde sie in die 
              Holzwand eingelassen und mit einem Schloss gesichert. 
              Ein so altes Schloss darf natürlich nicht mehr aufgebrochen und zerstört werden. 
              Was für ein schönes, altes und echtes Geheimnis! 
              Da kribbelt es mir einfach in den Fingern ...
            </span>

          </PostingComponent>

          <PostingComponent v-if="ort=='eg' && nr==3"
              username="@gerne_gestern"
              avatar="assets/personen/00x0/gerne_gestern.jpg"
              bild="assets/objekte/eg/00x1_eg_ab/00x1_eg_ab_post1.jpg"
              hashtag="#Adular_und_Feldspat"
              likes="48501"
              @hashtag-clicked="flow=3.3"
              :eingetragen="flow>=3.3">
              <span v-if="spieler=='Watson'">
                Dieser "Adular" lag zusammen mit anderen "Feldspaten" in einem Leinerschrank! 
                (Fortsetzung folgt)
              </span>
              <span v-else-if="spieler=='Sherlock'">
                Dieser "Adular" lag zusammen mit anderen "Feldspaten" in einem Leinerschrank! 
                Alte Namen, alte Sitten... (Erklärung und Fortsetzung folgt)
              </span>
              <span v-else-if="spieler=='Enola'">
                Alte Namen, alte Sitten. 
                Ich liebe es, wenn ich erstmal nur "Bahnhof" verstehe. 
                Deshalb zunächst nur soviel: 
                Dieser "Adular" lag zusammen mit anderen "Feldspaten" in einem Leinerschrank! 
                (Erklärung und Fortsetzung folgt)
              </span>
          </PostingComponent>
          <PostingComponent v-else-if="ort=='og1' && nr==3"
              username="@gerne_gestern"
              avatar="assets/personen/00x0/gerne_gestern.jpg"
              bild="assets/objekte/og/10x0_og1_bc/10x0_og1_bc_post1.jpg"
              hashtag="#5_Sterne_sind_zuwenig"
              likes="48192"
              @hashtag-clicked="flow=3.3"
              :eingetragen="flow>=3.3">
              <span v-if="spieler=='Watson'">
                Das Detail ist winzig, aber der Alter ist groß. 
                Wahrlich ein Objekt mit mehr als fünf Sternen!
              </span>
              <span v-else-if="spieler=='Sherlock'">
                Das Objekt ist so groß und lückenhaft, da wird es kaum auffallen, 
                wenn ein winziger Kelch fehlt? 
                Wahrlich ein Objekt mit mehr als fünf Sternen!
              </span>
              <span v-else-if="spieler=='Enola'">
                Eine wahre Schatztruhe so ein großer Altar. 
                Wird es auffallen, wenn da ein winziger Kelch fehlt oder vertauscht wird? 
                Wahrlich ein Objekt mit mehr als fünf Sternen!
              </span>
          </PostingComponent>
          <PostingComponent v-if="ort=='eg' && nr==3"
              username="@gerne_gestern"
              avatar="assets/personen/00x0/gerne_gestern.jpg"
              bild="assets/objekte/eg/00x1_eg_ab/00x1_eg_ab_post2.jpg"
              hashtag="#alte_worte_alte_steine"
              likes="51029"
              @hashtag-clicked="flow=3.7"
              :eingetragen="flow>=3.7">
            <span v-if="spieler=='Watson'">
              Ich liebe alte und fremde Namen. 
              Aber dann suche ich nach den Fakten: 
              "Adula", so heisst ein Teil der West-Alpen. 
              Und da wurde dieser "Adular" gefunden. 
              Man nennt den Stein auch "Spat", weil man ihn gut mit dem Spaten spalten kann. 
              Spaten spalten gespaltene Spate. Ein echter Zungerbrecher, findet ihr nicht auch?
            </span>
            <span v-else-if="spieler=='Sherlock'">
              Ich liebe es, wenn ich erstmal nur "Bahnhof" verstehe und mir die 
              Dinge alt und fremd vorkommen. Aber dann suche ich nach den Fakten: 
              "Adula", so heisst ein Teil der westlichen Alpen. 
              Und da wurde dieser "Adular" gefunden. Man nennt den Stein auch "Spat", 
              weil man ihn gut mit dem Spaten spalten kann. Spaten spalten gespaltene Spate. 
              Ein echter Zungerbrecher, findet ihr nicht auch?
            </span>
            <span v-else-if="spieler=='Enola'">
              Warum "Adular"? Warum "Feldspat"? 
              Hier kommen – wie immer bei mir – spannende Infos und Fakten:<br>
              1. Dieses besonders spaltbare Mineral wurde zum ersten Mal in den Alpen gefunden, 
              genau genommen in einem Teil der Westalpen. 
              Da dieser Teil der Alpen "Adula" heisst, nennt man das Mineral auch „Adular“. <br>
              2. „Spat“ ist mit "Spaten" und "spalten" verwandt. 
              Bergleute verwenden Spaten zum Abbau von Steinen. 
              Minerialien, die sich besonders gut spalten lassen, nennen sie "Spat". 
              Wenn die Steine einfach lose im Feld oder im Bett eines Bergbachs liegen, nennt man sie auch "Feldspat".
              <br>
              Spannende Infos oder? Zur Belohnung liegt dieser uralte Feldspat jetzt bei mir!
            </span>
          </PostingComponent>
          <PostingComponent v-if="ort=='og1' && nr==3"
              username="@gerne_gestern"
              avatar="assets/personen/00x0/gerne_gestern.jpg"
              bild="assets/objekte/og/10x0_og1_bc/10x0_og1_bc_post2.jpg"
              hashtag="#faktisch_immerwoanders"
              likes=52930
              @hashtag-clicked="flow=3.7"
              :eingetragen="flow>=3.7">
            <span v-if="spieler=='Watson'">
              Dieses winzige Objekt habe ich mitgenommen und ersetzt, 
              weil es glänzt wie ein Stern und eine so spannende Geschichte hat. 
              Der Altar stand schon auf der Reichenau und in Konstanz. 
              Immer wieder wurden Teile zerstört und sind verloren gegangen. 
              Da wird es nicht weiter auffallen, wenn der echte Kelch jetzt mir gehört?
            </span>
            <span v-else-if="spieler=='Sherlock'">
              Dieser Altarkasten hat den Konstanzer Bildersturm von 1531 halbwegs heil überstanden. 
              Er wurde mehrmals zerlegt und an verschiedenen Orten wieder aufgebaut, 
              im Münster auf der Reichenau und im Konzilsgebäude in Konstanz. 
              1990 wurden sogar zwei bis dahin fehlende Elemente wiederentdeckt: 
              die Marienkrönung (in der Mitte oben) und der hl. Nikolaus (in der Mitte rechts). 
              Da wird es doch kaum auffallen, wenn ich als Erinnerung ein kleines 
              5-Sterne-Objekt mitnehme und in meinem Wohnzimmer aufstelle?
            </span>
            <span v-else-if="spieler=='Enola'">
              Heute stelle ich Euch in meinem Faktencheck ein ganz verrücktes Objekt vor: 
              einen Altaraufsatz aus dem Jahr 1502. 
              Er ist einer der wenigen Beispiele, die den Konstanzer 
              Bildersturm von 1531 halbwegs heil überstanden haben, wirklich nur halbwegs: 
              Der Altarkasten wurde mehrmals zerlegt und an verschiedenen Orten wieder aufgebaut: 
              im Münster auf der Reichenau, im Konzilsgebäude und im Rosgartenmuseum. 
              1990 wurden sogar zwei bis dahin fehlende Elemente wiederentdeckt: 
              die Marienkrönung (in der Mitte oben) und der hl. Nikolaus (in der Mitte rechts). 
              Da wird es doch kaum auffallen, wenn ich als Erinnerung ein kleines 
              5-Sterne-Objekt mitnehme und in meinem Wohnzimmer aufstelle?
            </span>
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
.swipe-geste-vertikal {
  position: absolute;
  right: 75px;
  top: 300px;
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
const { flow, ort, spieler } = storeToRefs(spielStore);


console.log("opening HinweisModal");



</script>