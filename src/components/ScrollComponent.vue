<script setup lang="ts">
import { useSpielStore } from '@/stores/SpielStore'

const props = defineProps ({
    aktiveLupe: {
        type: Number,
        default: 2
    }
});

const spielStore = useSpielStore();

</script>


<template>
<div>
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

    <p>
        Spieler: {{ spielStore.spieler }} <br>
        Ort: {{ spielStore.ort }}
    </p>

    <p>
        Lupe Nr.: {{ props.aktiveLupe }}
    </p>


</div>
</template>


<style scoped>
p {
    font-size: 32px;
}

</style>