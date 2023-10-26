<template>
  <div class="modal-wrapper">
    <div class="modal-content">

      <div class="links">
        <!-- <img class="person" :src="'assets/personen/'+code+'/'+code+'_kopf.png'"/> -->
        <img class="person" width="230" :src="'assets/personen/'+props.code+'/'+props.code+'_kopf.png'"/>
        <span>
        <ButtonHandschellenComponent pulsiert></ButtonHandschellenComponent><br>
        <i>Festnehmen?</i></span>
      </div>
      <div class="rechts">
        <span v-if="code=='00x0'">
          <p>
            <b>Katinka Antiqus</b> hat eine Schwäche für Exponate, die ihr direkt ins Auge stechen, 
            alt und irgendwie spektakulär aus der Zeit gefallen scheinen.
          </p>
          <p>            
            Hochmoderne Gegenstände kommen ihr dagegen nicht ins Haus. 
            So leuchtet sie ihr Wohnzimmer abends mit uralten Wachskerzen aus, natürlich ohne vorher die Feuerwehr zu fragen. 
          </p>
          <p>
            Katinka stammt aus der gelehrten Familie Antiqus und kennt zu jedem ihrer Fundstücke eine Menge an Fakten. 
            Für ihre Expertise arbeitet Katinka hart: Sie bucht eifrig Führungen durch Museen und hat, um ihren Wissensdurst zu stillen, 
            auch immer einen mehr oder weniger großen Rucksack dabei.
          </p>
        </span>
        <span v-else-if="code=='11x1'">
          <p>
            Mit spitzer Feder kämpft <b>James Mopsiathy</b> gegen hartnäckige Dummheiten, 
            die scheinbar nicht aus der Welt zu schaffen sind. 
          </p>
          <p>
            Die Phantasie ist seine Waffe. 
          </p>
          <p>
            An der Seite seines treuen Mopses zieht er sich immer wieder gern in 
            eine einsame Waldvilla zurück und träumt von einer Welt, 
            in der die Menschen für seine Einfälle dankbar sind. 
          </p>
          <p>
            In Wirklichkeit ist sein Mops der einzige, der ihm zuhört. 
            Und meist sogar ein wenig dabei schnarcht.
          </p>
        </span>
        <span v-else-if="code=='111x'">
          <p>
            Egal ob auf Flohmärkten oder im Museum: 
            <b>Mia Mirabilis</b> entdeckt in uralten Dingen immer etwas, was man vielleicht erst morgen wird gebrauchen können. 
          </p>
          <p>
            Alles, was ihr bedeutungsvoll erscheint, will sie am Leben erhalten. 
            Deshalb kreiert sie auch wunderbar verrückte Outfits. 
            Einen Schönheitswettbewerb wird sie damit nicht gewinnen, ihr Stil ist durchaus gewöhnungsbedürftig. 
          </p>
          <p>
            Aber eins muss man ihr lassen:  Sie sprudelt vor kreativen Ideen nur so über!
          </p>
        </span>
        <span v-else-if="code=='x111'">
          <p>
            <b>Wolfram Wolkenwand</b> ist im Museum nicht sonderlich beliebt. 
          </p>
          <p>            
            Auch wenn er Bücher mit lustigen Titeln wie "1x1 der Fantasie" oder 
            "Tintenkleckse für Tiefseetaucher" schreibt, ist er ein ausgesprochener Nörgler. 
          </p>
          <p>
            Er regt sich über den Audioguide auf (den er "Schmalspur" findet) und meint, 
            dass die Leute im Museum mal besser seine Bücher lesen sollten. 
          </p>
          <p>
            Tatsächlich geht es dort recht humorvoll und einfallsreich zu.
          </p>
        </span>
        <span v-else-if="code=='11x0'">
          <p>
            Im Ausweis von Frau Adler steht der Vorname "Irene". 
          </p>
          <p>
            Doch sie liebt es, wenn alte Dinge und Namen, plötzlich einen frischen Klang oder Dreh bekommen. 
            Deshalb nennt sie sich "Iri". 
          </p>
          <p>
            Auch im Museum sind es nicht die Dinge, 
            die sie fesseln, sondern interessante Blickwinkel. 
            Und dafür sorgt sie schon selbst: 
          </p>
          <p>
            Alles was <b>Iri Adler</b> mit ihrer Phantasie in ein neues Licht rückt, wird zum Glanzstück und Highlight.
          </p>
        </span>
        <span v-else-if="code=='01x1'">
          <p>
            <!-- <b>Schorm</b> wurde in eine fürstliche Familie hineingeboren.  -->
            <b>Schorm Roderick</b> wurde in eine fürstliche Familie hineingeboren. 
          </p>
          <p>
            Schon als Kind wurden ihm die Traditionen der Familie Roderick eingetrichtert, 
            mit Wappenkunde, höfischer Verhaltenslehre und allem, was dazu gehört. 
          </p>
          <p>
            Aber: Ein arroganter Snob ist er gewiss nicht. 
            Schorm setzt sich für Arme und Schwache ein und hat so manches an der eigenen Gegenwart auszusetzen. 
          </p>
          <p>
            Die Vergangenheit malt er sich mit lebhafter Vorstellungskraft aus. 
            Wahrscheinlich hat Schorm Roderick schon in der Schule häufiger von einer besseren Welt geträumt als aufgepasst...
          </p>
        </span>



      </div>
    </div>
      
    <ion-button class="zurueck-button" size="large" @click="modalController.dismiss()">zurück zum Spiel</ion-button>
  </div>

</template>

<style scoped>
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
    }
  });

const spielStore = useSpielStore();
const { flow, ort } = storeToRefs(spielStore);

console.log("opening KarteModal");

const beendenHinweisOffen = ref(false);

</script>