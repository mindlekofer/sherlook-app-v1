<script setup lang="ts">
import { useSpielStore } from '@/stores/SpielStore'
import WeiterButtonComponent from './WeiterButtonComponent.vue';

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
    <img id="gesicht" src="assets/img/enola_aelter.png" width="200px" style="transform: scaleX(-1); float: right;">
    <p>
        Hallo, ich bin Watson.
    </p>
    <p>
        Heute übernehmen wir zusammen den Fall der Kunstdiebe.
    </p>
    <p>
        Sherlock sagt immer, um einen Dieb zu finden, muss zuerst die Fragen zum Detail geklärt werden, danach können wir das Objekt suchen.
    </p>
    <p>
        Das sollten wir schaffen, oder?
    </p>
    <div id="scroll-buttonbereich">
        <weiter-button-component id="weiter-button"/>
    </div>




</div>
</template>


<style scoped>
* {
    font-size: 34px;
    text-align: left;
}
img {
    width: 200px;
    margin: 20px;
}
#weiter-button {
    position: fixed;
    bottom: 0px;
    right: 0px;
}

</style>