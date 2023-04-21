<script setup lang="ts">
import { useSpielStore } from '@/stores/SpielStore'
import WeiterButtonComponent from '../WeiterButtonComponent.vue';
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
            <img id="gesicht" src="assets/img/enola_aelter.png" />
            <p>
                Ach, schau an, die Details führen uns zur Mitra. Die Diebe haben uns unter dem Namen @ACCOUNTNAME, Informationen zum Detail auf Instagram hinterlassen.
           </p>
        </div>
        <div class="scroll-posting">
            <posting-component></posting-component>
        </div>
           
    </div>
    <!-- <div class="inhalt sherlock" v-else-if="spielStore.spieler == 'Sherlock'">

    </div>
    <div class="inhalt enola" v-else-if="spielStore.spieler == 'Enola'">

    </div>
    <div v-else>
        1.2 Post 1
    </div> -->

    <div id="scroll-buttonbereich">

        <weiter-button-component id="weiter-button" disabled/>
    </div>

</div>
</template>


<style scoped>

#content-scroll {
    padding: 20px;
    height: 100%;
    margin-bottom: 300px;
}
.inhalt {
    display: flex;
    flex-direction: column;
    height: 100%;
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
    transform: scaleX(-1);
    float: right;
}
#weiter-button {
    position: fixed;
    bottom: 0px;
    right: 0px;
}
.frage-content {
    flex-grow: 1;
}
.scroll-posting {
    display: flex;
    flex-direction: column;
    align-items: center;
}


</style>