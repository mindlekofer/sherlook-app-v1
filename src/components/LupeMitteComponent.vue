<script setup lang="ts">

import { useSpielStore } from '@/stores/SpielStore';
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

const spielStore = useSpielStore();
const { flow } = storeToRefs(spielStore);

const objektAddresse = ref("");

watch(flow, () => {
  console.log(`(LupeMitteComponent) flow geändert auf ${flow.value}`);
  if (flow.value < 1.1) {
    objektAddresse.value = "";
  }
  else if (flow.value == 1.1) {
    objektAddresse.value = "assets/objekte/eg/000x_ab/400x400.png";
  }
});

</script>


<template>
  <div id="lupe">
      <svg width="560" height="560" viewBox="0 0 560 560" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g>
        <circle id="lupe_aussen" cx="280" cy="280" r="280"></circle>
        <circle id="lupe_innen" cx="280" cy="280" r="210"></circle>
    </g>
  </svg>

  <!-- <img src="assets/objekte/eg/000x_ab/400x400.png" /> -->
  <img :src="objektAddresse" />

  <div id="objekt-id"></div>

  </div>

</template>


<style scoped>
svg {
  position: absolute;
  fill: black;
}
#lupe_aussen {
  fill: black;
  opacity: 0.15;
}
img {
  position: relative;
  top: 80px;
  left: 80px;
  width: 400px;
}

</style>