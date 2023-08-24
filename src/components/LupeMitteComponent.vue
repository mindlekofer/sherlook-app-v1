<script setup lang="ts">

import { useSpielStore } from '@/stores/SpielStore';
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { BleClient } from '@capacitor-community/bluetooth-le';

const spielStore = useSpielStore();
const { flow } = storeToRefs(spielStore);

const objektAddresse = ref("");

watch(flow, () => {
  console.log(`(LupeMitteComponent) flow geändert auf ${flow.value}`);
  if (flow.value < 1.0) {
    objektAddresse.value = "";
  }
  else if (flow.value >= 1.0) {
    objektAddresse.value = "assets/objekte/eg/000x_ab/400x400.png";
  }
});

async function scanBLE(): Promise<void> {
  try {
    await BleClient.initialize();
  } catch {
    console.log("scanBLE() error");
  }
}


</script>


<template>
  <div class="lupe">
    <svg width="100%" height="100%" viewBox="0 0 412 392" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g id="Lupe-gross" serif:id="Lupe gross">
        <g id="lupe_glas">
            <path d="M83.604,94.724c47.816,-53.778 130.297,-58.618 184.075,-10.801c53.778,47.816 58.617,130.298 10.801,184.075c-47.816,53.778 -130.298,58.618 -184.075,10.801c-53.778,-47.816 -58.618,-130.297 -10.801,-184.075Z" style="fill:#a7baf1;"/>
            <path d="M118.529,91.709c0.372,-17.702 61.095,-36.959 106.603,-18.446c44.105,17.943 80.8,79.52 69.014,94.767c-6.898,8.922 -26.656,-42.606 -82.223,-63.435c-49.111,-18.41 -93.567,-4.677 -93.394,-12.886Z" style="fill:#d3dfff;"/>
        </g>
        <path id="lupe_aussen" d="M284.044,330.327c-67.081,46.428 -159.676,42.944 -223.321,-13.646c-74.685,-66.406 -81.407,-180.954 -15.001,-255.639c66.406,-74.685 180.954,-81.407 255.639,-15.001c63.69,56.631 77.955,148.272 39.59,220.344l59.981,53.332l-0.046,0.052c0.489,0.373 0.966,0.766 1.431,1.18c13.375,11.892 11.492,35.879 -4.204,53.532c-15.696,17.653 -39.298,22.329 -52.673,10.436c-0.465,-0.413 -0.912,-0.841 -1.34,-1.283l-0.045,0.052l-60.011,-53.359Zm-200.44,-235.603c-47.817,53.778 -42.977,136.259 10.801,184.075c53.777,47.817 136.259,42.977 184.075,-10.801c47.816,-53.777 42.977,-136.259 -10.801,-184.075c-53.778,-47.817 -136.259,-42.977 -184.075,10.801Z"/>
    </g>
</svg>





    <!-- <svg width="560" height="560" viewBox="0 0 560 560" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
      <g>
          <circle id="lupe_aussen" cx="280" cy="280" r="280"></circle>
          <circle id="lupe_innen" cx="280" cy="280" r="210"></circle>
      </g>
    </svg> -->
    <!-- <img src="assets/objekte/eg/000x_ab/400x400.png" /> -->
    <img :src="objektAddresse" />
    <div id="objekt-id"></div>
  </div>
</template>


<style scoped>
svg {
  position: absolute;
  /* fill: black; */
}
#lupe_aussen {
  fill: black;
  opacity: 0.75;
}
img {
  position: relative;
  top: 0px;
  left: 0px;
  width: 400px;
}

</style>