<script setup lang="ts">
import { useSpielStore } from '@/stores/SpielStore'
import WeiterButtonComponent from '../WeiterButtonComponent.vue';
import ZurueckButtonComponent from '../ZurueckButtonComponent.vue';
import { IonButton } from '@ionic/vue';
import { ref, watch } from 'vue';
import PostingComponent from '../PostingComponent.vue';

const props = defineProps ({
    aktiveLupe: {
        type: Number,
        default: 2
    }
});

const spielStore = useSpielStore();

</script>


<template>
<div id="content-scroll">

    <!-- <div class="inhalt watson" v-if="spielStore.spieler == 'Watson'"> -->
    <div class="inhalt watson">
        <div class="scroll-oben">
            <img src="assets/img/drwatsonvari3.png" width="300" v-if="spielStore.spieler == 'Watson'"/>
            <img src="assets/img/sherlock_neutral_verbesserung.png" width="300" v-else-if="spielStore.spieler == 'Sherlock'"/>
            <img src="assets/img/enola_aelter.png" width="230" v-else-if="spielStore.spieler == 'Enola'"/>
            <p>
                Ach, schau an, die Details führen uns zur Mitra. Die Diebe haben uns unter dem Namen @ACCOUNTNAME, Informationen zum Detail auf Instagram hinterlassen.
           </p>
        </div>
        <div class="scroll-posting">
            <posting-component></posting-component>
        </div>

        <p>
            Berühre den Hashtag um ihn ins Notizbuch zu übertragen.
        </p>

        <div id="scroll-buttonbereich">
            <!-- <zurueck-button-component id="zurueck-button" class="pulsieren" @click="spielStore.flow = 1.1"/> -->
            <weiter-button-component id="weiter-button" disabled/>
        </div>


    </div>

</div>
</template>


<style scoped>

#content-scroll {
    display: flex;
    flex-direction: column;
    padding: 20px;
    /* height: 100%; */
    /* margin-bottom: 300px; */
}
.inhalt {
    display: flex;
    flex-direction: column;
    /* height: 100%; */
}
.scroll-oben {
    text-align: left;
    line-height: 1.5em;
}
.watson {
    font-size: 24px;
}
.watson p {
    margin-top: 50px;
}
.sherlock {
    font-size: 28px;
}
.enola {
    font-size: 28px;
}
.enola p {
    margin-top: 10px;
}
img {
    width: 200px;
    margin: 20px;
    /* transform: scaleX(-1); */
    float: right;
}
.scroll-posting {
    display: flex;
    flex-direction: column;
    align-items: center;
}
#scroll-buttonbereich {
    display: flex;
    justify-content: end;
}
#weiter-button {
    /* position: fixed; */
    /* bottom: 0px; */
    /* right: 0px; */


}
#zurueck-button {
    position: fixed;
    bottom: 0px;
    left: 0px;
}

</style>