<script setup lang="ts">

import { useSpielStore } from '@/stores/SpielStore';
import { ref, setBlockTracking, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useBeaconStore } from '@/stores/BeaconStore';

const props = defineProps({
  farbe: {
    type: String,
    default: "black"
  },
  entfernung: {
    type: Number,
    default: -1
  },
  bild: {
    type: String,
    default: ''
  },
  empfang: {
    type: String,
    default: 'nichts'
  },
  hintergrund: {
      type: Boolean,
      default: false
  },
  inaktiv: {
      type: Boolean,
      default: false
  },
})

const spielStore = useSpielStore();
const { flow } = storeToRefs(spielStore);

const rahmenKlasse = ref('');
const glasKlasse = ref('');

// const entfernung = ref(props)
watch(props, () => {
  console.log(props.empfang);
  //   if (props.entfernung == -1)
  //   rahmenKlasse.value = '';
  // else if (props.entfernung < 10)
  //   rahmenKlasse.value = 'entfernung-nah';
  // else if (props.entfernung < 50)
  //   rahmenKlasse.value = 'entfernung-mittel';
  // else
  //   rahmenKlasse.value = 'entfernung-weit';

  if (props.empfang == 'nichts') rahmenKlasse.value = '';
  else if (props.empfang == 'schwach') rahmenKlasse.value = 'entfernung-weit'; 
  else if (props.empfang == 'mittel') rahmenKlasse.value = 'entfernung-mittel'; 
  else if (props.empfang == 'stark') rahmenKlasse.value = 'entfernung-nah'; 
  else rahmenKlasse.value = ''; 
})
// if (props.entfernung == -1)
//     rahmenKlasse.value = '';
//   else if (props.entfernung < 10)
//     rahmenKlasse.value = 'entfernung-nah';
//   else if (props.entfernung < 50)
//     rahmenKlasse.value = 'entfernung-mittel';
//   else
//     rahmenKlasse.value = 'entfernung-weit';
</script>

<template>
  <div id="container" :class="{
      'inaktiv':inaktiv,
      'vordergrund':!hintergrund && !inaktiv,
      'hintergrund':hintergrund && !inaktiv
  }">
  <img src="assets/img/lupe_logo_rund.png" v-if="inaktiv"/>
  <img :src="bild" v-else-if="bild!=''"/>
  <svg width="100%" height="100%" viewBox="-20 -20 403 439" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g id="Lupe-groß-Einzelteile" serif:id="Lupe groß Einzelteile">
        <path id="lupe_gestell" d="M253.191,347.145c-62.656,27.14 -138.118,17.542 -192.468,-30.784c-74.685,-66.406 -81.407,-180.954 -15.001,-255.638c66.406,-74.685 180.954,-81.407 255.639,-15.001c72.736,64.673 81.009,175.009 20.05,249.713l32.691,42.158l-0.054,0.042c0.335,0.357 0.654,0.731 0.957,1.122c8.72,11.245 0.645,32.127 -18.022,46.602c-18.666,14.475 -40.901,17.097 -49.621,5.852c-0.303,-0.391 -0.586,-0.793 -0.848,-1.206l-0.055,0.042l-33.268,-42.902Zm-169.587,-252.74c-47.817,53.777 -42.977,136.259 10.801,184.075c53.777,47.816 136.259,42.977 184.075,-10.801c47.816,-53.778 42.977,-136.259 -10.801,-184.075c-53.778,-47.817 -136.259,-42.977 -184.075,10.801Z"/>
        <path :class="rahmenKlasse" id="lupe_ring" d="M45.722,60.723c66.406,-74.685 180.954,-81.407 255.639,-15.001c74.685,66.406 81.407,180.954 15,255.639c-66.406,74.685 -180.954,81.407 -255.638,15c-74.685,-66.406 -81.407,-180.954 -15.001,-255.638Zm37.882,33.682c-47.817,53.777 -42.977,136.259 10.801,184.075c53.777,47.816 136.259,42.977 184.075,-10.801c47.816,-53.778 42.977,-136.259 -10.801,-184.075c-53.778,-47.817 -136.259,-42.977 -184.075,10.801Z"/>
        <path :class="bild!=''?'transparentes-glas':''" id="lupe_glas" d="M83.604,94.405c47.816,-53.778 130.297,-58.618 184.075,-10.801c53.778,47.816 58.617,130.297 10.801,184.075c-47.816,53.778 -130.298,58.617 -184.075,10.801c-53.778,-47.816 -58.618,-130.298 -10.801,-184.075Z" style="fill:#a7baf1;"/>
        <path :class="bild!=''?'transparentes-glas':''" id="lupe_spiegelung" d="M118.529,91.39c0.372,-17.703 61.095,-36.96 106.603,-18.446c44.105,17.942 80.8,79.519 69.014,94.767c-6.898,8.922 -26.656,-42.606 -82.223,-63.435c-49.111,-18.41 -93.567,-4.677 -93.394,-12.886Z" style="fill:#d3dfff;"/>
    </g>
  </svg>
    <div id="objekt-id"></div>
  </div>
</template>


<style scoped>
.inaktiv {
  opacity: 0.2;
}
.vordergrund {
  opacity: 90%;
  z-index: 10;
}
.hintergrund {
  opacity: 70%;
  z-index: 0;
}
.transparentes-glas {
  opacity: 0.3;
}
#container{
  position: relative;
  transition-duration: 1s;
}
svg {
  position: absolute;
  filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.9));
  /* fill: black; */
}
.pulsiert {
  /* fill: yellow; */
  animation: pulsieren-animation 1s ease-in-out infinite alternate;
}
img {
  position: absolute;
  top: 275px;
  left: 300px;
  width: 365px;
  transform: translate(-50%, -50%);
}
.entfernung-weit {
    animation: pulsieren-animation-weit 3s ease-in-out infinite alternate;
}
.entfernung-mittel {
    animation: pulsieren-animation-mittel 2s ease-in-out infinite alternate;
}
.entfernung-nah {
    animation: pulsieren-animation-nah 0.5s ease-in-out infinite alternate;
}
@keyframes pulsieren-animation-weit {
    0% {
      /* fill: rgb(125, 142, 255); */
      fill: rgb(0, 0, 0);
    }
    100% {
      /* fill: rgb(0, 64, 214); */
      fill: rgb(24, 98, 44);
    }
}
@keyframes pulsieren-animation-mittel {
  0% {
    /* fill: rgb(150, 150, 239); */
    fill: rgb(0, 0, 0);
  }
  100% {
    /* fill: rgb(221, 35, 35); */
    fill: rgb(26, 120, 18);
  }
}
@keyframes pulsieren-animation-nah {
  0% {
    /* fill: rgb(255, 167, 167); */
    fill: rgb(0, 0, 0);
  }
  100% {
    /* fill: rgb(244, 45, 45); */
    fill: rgb(40, 167, 74);
  }
}

</style>