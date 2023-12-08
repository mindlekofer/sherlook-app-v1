<template>
  <div class="modal-wrapper">
    <div class="modal-content">
      <span class="festgenommen" v-if="verhaftet[props.nr-1]==true">festgenommen!</span>
      <span class="verdaechtig" v-if="verdaechtig[props.nr-1]==true">verdächtig!</span>
      <span class="unverdaechtig" v-if="unverdaechtig[props.nr-1]==true">unverdächtig</span>

      <div class="handschellen">
        <ButtonHandschellenComponent
            @click="handschellenClicked"
            :disabled="unverdaechtig[props.nr-1] || verhaftet[props.nr-1] || flow>=4.5"
            :pulsiert="verdaechtig[props.nr-1]"
        />
        <!-- <i>Festnehmen</i> -->
      </div>

      <div class="links">
        <!-- <img class="person" :src="'assets/personen/'+code+'/'+code+'_kopf.png'"/> -->
        <img class="person" width="230" :src="'assets/personen/'+props.code+'/'+props.code+'_kopf.png'"/>
        <span class="vermerk">
          <!-- <ButtonHandschellenComponent 
            @click="handschellenClicked"
            pulsiert 
          />
          <br>
          <i>Festnehmen?</i>
        -->
          <i>Aktenvermerk:</i>
            <ion-button 
                class="vermerk-button" 
                color="success" 
                size="large" 
                expand="block"
                :fill="unverdaechtig[props.nr-1] ? 'solid' : 'outline'" 
                :disabled="verhaftet[props.nr-1] || flow>=4.5"
                @click="unverdaechtigClicked"
            > unverdächtig </ion-button>
            <ion-button 
                class="vermerk-button" 
                color="warning" 
                size="large" 
                expand="block" 
                :fill="verdaechtig[props.nr-1] ? 'solid' : 'outline'" 
                :disabled="verhaftet[props.nr-1] || flow>=4.5"
                @click="verdaechtigClicked"
            > verdächtig </ion-button>
        </span>
      </div>
      <div class="rechts">
        <span v-if="code=='00x0'">
          <span v-if="spieler=='Watson'">
            <b>KATINKA ANTIQUS</b>
            <ul>
              <li>mag, was alt und fremd aussieht</li>
              <li>interessiert sich für Fakten</li>
              <li>mag Dinge, die glänzen oder als besondere Kostbarkeit präsentiert werden können</li>
            </ul>
          </span>
          <span v-else-if="spieler=='Sherlock'">
            <b>KATINKA ANTIQUS</b>
            <ul>
              <li>mag Dinge, die alt wirken und in Vergessenheit geraten sind</li>
              <li>bevor sie zuschlägt, sammelt sie Fakten und bucht eifrig Führungen durch Museen</li>
              <li>mag "Highlights", die glänzen oder als besondere Kostbarkeit präsentiert werden</li>
            </ul>
          </span>
          <span v-else-if="spieler=='Enola'">
            <b>KATINKA ANTIQUS</b> hat eine Schwäche für Exponate, 
            die ihr direkt ins Auge stechen, glänzen oder irgendwie spektakulär 
            aus der Zeit gefallen scheinen. 
            <br><br>
            Sie stammt aus der gelehrten Familie Antiqus und kennt zu jedem ihrer 
            Fundstücke eine Menge an Fakten.
            <br><br>
            Wenn sie den Dingen und Namen wieder einmal auf den Grund gegangen ist, 
            teilt sie ihr Wissen gerne auf Instagram. 
            Für ihre Expertise arbeitet Katinka hart: 
            Sie bucht eifrig Führungen durch Museen, um herauszufinden, 
            was dessen spezielle Highlights sind.
          </span>
        </span>
        <span v-else-if="code=='11x1'">
          <span v-if="spieler=='Watson'">
            <b>JAMES MOPSIATHY</b>
            <ul>
              <li>mag Dinge, die modern oder immer noch aktuell aussehen</li>
              <li>betrachtet alles mit seiner großen, lebendigen Phantasie</li>
              <li>ist ein kritischer Geist, der meist kein gutes Haar am Museum und seinen Mitmenschen lässt</li>
            </ul>
          </span>
          <span v-else-if="spieler=='Sherlock'">
            <b>JAMES MOPSIATHY</b>
            <ul>
              <li>kämpft in seinen Posts gegen Dummheiten, die scheinbar nicht aus der Welt zu schaffen sind</li>
              <li>Phantasie ist seine Waffe</li>
              <li>mag Dinge, die modern oder immer noch aktuell sind und stellt ständig Bezüge zur eigenen Gegenwart her</li>
            </ul>
          </span>
          <span v-else-if="spieler=='Enola'">
            <b>JAMES MOPSIATHY</b> kämpft mit spitzer Feder gegen hartnäckige 
            Dummheiten, die scheinbar nicht aus der Welt zu schaffen sind. 
            <br><br>
            Ständig stellt er Bezüge zur eigenen Gegenwart her und hält Dinge 
            für relevant und immer noch aktuell, selbst wenn sie uralt sind. 
            <br><br>
            Die Phantasie ist seine Waffe. <br>
            An der Seite seines treuen Mopses zieht er sich gern in eine einsame 
            Waldvilla zurück und träumt von einer Welt, 
            in der die Menschen für seine Einfälle dankbar sind.
          </span>
        </span>
        <span v-else-if="code=='111x'">
          <span v-if="spieler=='Watson'">
            <b>MIA MIRABILIS</b>
            <ul>
              <li>lebt ganz in der Gegenwart</li>
              <li>mag Dinge, die ihre Phantasie anregen</li>
              <li>sucht in allen Dingen eine höhere Bedeutung</li>
            </ul>
          </span>
          <span v-else-if="spieler=='Sherlock'">
            <b>MIA MIRABILIS</b>
            <ul>
              <li>entdeckt in alten Dingen etwas, was man vielleicht erst morgen wird gebrauchen können</li>
              <li>sprudelt in ihren Posts vor kreativen Ideen nur so über</li>
              <li>sucht in allen Dingen eine höhere Bedeutung</li>
            </ul>
          </span>
          <span v-else-if="spieler=='Enola'">
            MIA MIRABILIS entdeckt in uralten Dingen immer etwas, was man 
            vielleicht erst morgen wird gebrauchen können. 
            <br><br>
            Egal ob auf Flohmärkten oder im Museum: 
            Alles, was ihr bedeutungsvoll erscheint, will sie haben und am Leben erhalten. 
            Deshalb kreiert sie auch wunderbar verrückte Outfits. 
            Einen Schönheitswettbewerb wird sie damit nicht gewinnen, 
            ihr Stil ist durchaus gewöhnungsbedürftig. 
            <br><br>
            Aber eins muss man ihr lassen:  
            Sie sprudelt vor kreativen Ideen nur so über!
          </span>
        </span>
        <span v-else-if="code=='x111'">
          <span v-if="spieler=='Watson'">
            <b>WOLFRAM WOLKENWAND</b>
          <ul>
            <li>verfügt über eine große, lebendige Phantasie</li>
            <li>interessiert sich für die Bedeutung der Dinge</li>
            <li>kritisiert häufig seine Mitmenschen, aber auch die Museen</li>
          </ul>
          </span>
          <span v-else-if="spieler=='Sherlock'">
            <b>WOLFRAM WOLKENWAND</b>
          <ul>
            <li>schreibt Bücher mit lustigen Titeln wie "1x1 der Fantasie" oder "Tintenkleckse für Tiefseetaucher"</li>
            <li>kritisiert gern seine Zeitgenossen und findet z.B. den Audioguide des Museums "Schmalspur"</li>
            <li>ist ein kritischer Geist, der nach wahren und wichtigen Bedeutungen sucht</li>
          </ul>
          </span>
          <span v-else-if="spieler=='Enola'">
            <b>WOLFRAM WOLKENWAND</b> ist im Museum nicht sonderlich beliebt. 
            <br><br>
            Auch wenn er Bücher mit lustigen Titeln wie "1x1 der Fantasie" oder 
            "Tintenkleckse für Tiefseetaucher" schreibt, ist er ein ausgesprochener Nörgler. 
            <br><br>
            Er regt sich über den Audioguide auf (den er "Schmalspur" findet) und meint, 
            dass die Leute im Museum mal besser seine Bücher lesen sollten. 
            Tatsächlich geht es dort recht humorvoll und einfallsreich zu. 
            Die wenigsten wissen, dass die meisten seiner Abbildungen aus der eigenen "Privatsammlung" stammen.
          </span>
        </span>
        <span v-else-if="code=='11x0'">
          <span v-if="spieler=='Watson'">
            <b>IRI ADLER</b>
            <ul>
              <li>mag Dinge, die ihre Phantasie anregen</li>
              <li>informiert sich über die "Highlights" des Museums</li>
              <li>mag Dinge, egal welchen Alters, mit Bezug zum heutigen Alltag</li>
            </ul>
          </span>
          <span v-else-if="spieler=='Sherlock'">
            <b>IRI ADLER</b>
            <ul>
              <li>rückt gerne Dinge mit ihrer Phantasie in ein neues Licht</li>
              <li>macht Dinge durch ihre Bewunderung "zum Glanzstück"</li>
              <li>auch alte Dinge können dadurch einen "frischen Dreh" bekommen</li>
            </ul>
          </span>
          <span v-else-if="spieler=='Enola'">
            <b>IRI ADLER</b> hat einen Ausweis, in dem der Vorname "Irene" steht. 
            <br><br>
            Doch sie liebt es, wenn alte Dinge und Namen plötzlich einen frischen Klang oder Dreh bekommen. 
            Deshalb nennt sie sich "Iri". 
            <br><br>
            Auch im Museum sind es nicht die Dinge, die sie fesseln, sondern interessante Blickwinkel. 
            Und dafür sorgt sie schon selbst: Alles was Iri Adler mit ihrer 
            reichen Phantasie in ein neues Licht rückt, wird zum Glanzstück und Highlight. 
            Fakten interessieren sie dagegen weniger bis gar nicht.
          </span>
        </span>
        <span v-else-if="code=='01x1'">
          <span v-if="spieler=='Watson'">
            <b>SCHORM RODERICK</b>
            <ul>
              <li>mag Dinge, die anderen altmodisch vorkommen</li>
              <li>hat ganz eigene Vorstellungen von der Vergangenheit</li>
              <li>kritisiert häufig die eigenen Zeitgenossen</li>
            </ul>
          </span>
          <span v-else-if="spieler=='Sherlock'">
            <b>SCHORM RODERICK</b>
            <ul>
              <li>Teil einer adligen Familie mit recht altmodischem Geschmack</li>
              <li>malt sich die Vergangenheit mit lebhafter Vorstellungskraft aus</li>
              <li>hat schon in der Schule von einer besseren Welt geträumt</li>
            </ul>
          </span>
          <span v-else-if="spieler=='Enola'">
            <b>SCHORM RODERICK</b> wurde in eine fürstliche Familie hineingeboren. 
            <br>
            Schon als Kind wurden ihm die Traditionen der Familie beigebracht, 
            manche würden sogar sagen "eingetrichtert": 
            mit Wappenkunde, höfischer Verhaltenslehre und allem, was dazu gehört. 
            Aber: Ein arroganter Snob ist Schorm Roderick gewiss nicht. 
            <br>
            Er malt sich die Vergangenheit mit lebhafter Vorstellungskraft aus 
            und hat immer schon von einer besseren Welt geträumt. 
            <br>
            An seinen Zeitgenossen hat er so manches auszusetzen. 
            <br>
            Und auch die Museen verschont er nicht mit seiner Kritik auf seinen Beutezügen.
          </span>
        </span>
      </div>
    </div>
    <ion-button class="zurueck-button" size="large" @click="modalController.dismiss()">zurück</ion-button>
  </div>

</template>

<style scoped>
ul {
  padding: 10px;
}
li {
  padding: 10px;
}
.handschellen {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 30px;
}
.vermerk {
  display: flex;
  flex-direction: column;
  /* background-color: aqua; */
  gap: 5px;
  justify-content: end;
  align-items: stretch;
}
i {
  /* margin-bottom: 50px; */
  /* color: grey; */
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
  justify-content: space-evenly;
}
.rechts {
  /* background-color: azure; */
  padding-left: 30px;
  padding-right: 0px;
  padding-top: 30px;
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
  /* justify-content: center; */
  /* background-color: bisque; */
}
.festgenommen {
  position: absolute;
  top: 180px;
  right: 250px;
  font-size: 90px;
  font-weight: 600;
  opacity: 0.6;
  color: rgb(239, 0, 0);
  transform: rotate(-20deg);

  padding: 5px 20px 3px 20px;
  font-family: Helvetica, Sans-Serif;
  font-weight: 900;
  background-color: transparent;
  border-width: 12px;
  border-color: rgb(239, 0, 0);
  border-style: solid;
  border-radius: 30px;
}
.verdaechtig {
  position: absolute;
  top: 200px;
  right: 200px;
  font-size: 90px;
  font-weight: 600;
  opacity: 0.5;
  color: rgb(239, 155, 0);
  transform: rotate(30deg);

  padding: 5px 20px 3px 20px;
  font-family: Helvetica, Sans-Serif;
  font-weight: 900;
  background-color: transparent;
  border-width: 12px;
  border-color: rgb(239, 155, 0);
  border-style: solid;
  border-radius: 30px;

}
.unverdaechtig {
  position: absolute;
  top: 200px;
  right: 200px;
  font-size: 90px;
  font-weight: 600;
  opacity: 0.6;
  color: rgb(61, 211, 53);
  transform: rotate(-30deg);
  padding: 5px 20px 3px 20px;
  font-family: Helvetica, Sans-Serif;
  font-weight: 900;
  background-color: transparent;
  border-width: 12px;
  border-color: rgb(61, 211, 53);
  border-style: solid;
  border-radius: 30px;
}

</style>

<script setup lang="ts">
import { useSpielStore } from '@/stores/SpielStore';
import { modalController } from '@ionic/core';
import { IonButton } from '@ionic/vue';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import ButtonHandschellenComponent from '../ButtonHandschellenComponent.vue';

const props = defineProps( {
    name: {
      type: String,
      default: ''
    },
    code: {
      type: String,
      default: ''
    },
    nr: {
      type: Number,
      default: 0
    }
  });

const emit = defineEmits<{
    (e: 'festnehmen', code : string) : void
}>();

const spielStore = useSpielStore();
const { flow, ort, spieler, verhaftet, verdaechtig, unverdaechtig } = storeToRefs(spielStore);

const verhaftedClicked = ref();

console.log("opening KarteModal");

function handschellenClicked() {
  console.log(`Handschellen clicked für Nr: ${props.nr}, Code: ${props.code}`);
  if (props.nr>0) {
    spielStore.verhaftet[props.nr-1] = true;
    spielStore.personVerhaftet = props.code;
    setTimeout(() => {modalController.dismiss()}, 1000);
  }
}

function verdaechtigClicked() {
  console.log(`Handschellen clicked für Nr: ${props.nr}, Code: ${props.code}`);
  if (props.nr>0) {
    if (spielStore.verdaechtig[props.nr-1]==false) {
      spielStore.verdaechtig[props.nr-1] = true;
      spielStore.unverdaechtig[props.nr-1] = false;
    } else {
      spielStore.verdaechtig[props.nr-1] = false;
    }
    
  }
}

function unverdaechtigClicked() {
  console.log(`Handschellen clicked für Nr: ${props.nr}, Code: ${props.code}`);
  if (props.nr>0) {
    if (spielStore.unverdaechtig[props.nr-1]==false) {
      spielStore.unverdaechtig[props.nr-1] = true;
      spielStore.verdaechtig[props.nr-1] = false;
    } else {
      spielStore.unverdaechtig[props.nr-1] = false;
    }
  }
}

</script>