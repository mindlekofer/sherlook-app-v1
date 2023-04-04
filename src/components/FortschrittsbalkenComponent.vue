<script setup lang="ts">

import { ref } from 'vue';

const props = defineProps({
        stufe: Number
    });

const rect_height = ref(540);
const rect_y = ref(30)

const setFortschritt = (prozent:number) => {
    if (prozent > 100)
        prozent = 100;
    if (prozent < 0)
        prozent = 0;
    console.log("setFortschritt() aufgerufen");
    let pixel = 0;
    pixel = 540-(prozent*540/100);
    if (pixel > 540)
        pixel = 540;
    rect_height.value = 540-pixel;
    rect_y.value = 30+pixel;
}

setFortschritt(1);

</script>

<template>
    <svg width="60" height="600">

        <rect class="fortschritt_hinten" x="0" y="30" width="60" height="540" />
        <circle class="fortschritt_hinten" cx="30" cy="30" r="30" />
        <circle class="fortschritt_hinten" cx="30" cy="570" r="30" />

        <rect id="fortschritt_vorne_rect" class="fortschritt_vorne" x="0" :y="rect_y" width="60" :height="rect_height" />
        <circle class="fortschritt_vorne" cx="30" :cy="rect_y" r="30" />
        <circle class="fortschritt_vorne" cx="30" cy="570" r="30" />
    </svg>
</template>

<style scoped>
    .fortschritt_vorne {
        fill: rgb(99, 206, 99);
    }

    .fortschritt_hinten {
        fill: rgb(194, 194, 194)
    }
/* 
    #fortschritt_vorne_rect {
        height: 50;
    } */
</style>