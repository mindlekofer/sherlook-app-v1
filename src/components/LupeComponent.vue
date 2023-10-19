<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
    zahl: {
      type: String,
      default: ''
    },
    bild: {
      type: String,
      default: ''
    }
  });


// const objektAddresse = ref("assets/objekte/eg/000x_ab/400x400.png");


</script>

<template>
  <div id="container">
    <svg width="150" height="150" viewBox="0 0 150 150" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
      <g id="Lupe1" serif:id="Lupe">
        <path d="M108.54,89.462l-17.42,19.592l31.504,28.012l17.42,-19.592l-31.504,-28.012Z"/>
        <path d="M34.482,41.99c14.971,-16.837 40.795,-18.352 57.632,-3.381c16.838,14.971 18.353,40.795 3.382,57.632c-14.971,16.838 -40.795,18.353 -57.632,3.382c-16.838,-14.971 -18.353,-40.795 -3.382,-57.633Z" style="fill:#a7baf1;"/>
        
        <path d="M45.417,41.047c0.116,-5.543 19.128,-11.572 33.376,-5.776c13.809,5.618 25.298,24.897 21.608,29.671c-2.159,2.794 -8.346,-13.34 -25.743,-19.861c-15.377,-5.764 -29.295,-1.464 -29.241,-4.034Z" style="fill:#d3dfff;"/>
        <image :href="bild" x=25 y=25 width=90 opacity="40%" />
        
        <path d="M20.15,29.248c22.004,-24.748 59.96,-26.975 84.707,-4.971c24.748,22.004 26.975,59.96 4.971,84.707c-22.004,24.747 -59.96,26.975 -84.707,4.971c-24.748,-22.004 -26.975,-59.96 -4.971,-84.707Zm14.947,13.289c-14.67,16.498 -13.185,41.802 3.313,56.471c16.498,14.67 41.802,13.185 56.472,-3.313c14.669,-16.498 13.184,-41.802 -3.314,-56.472c-16.498,-14.669 -41.802,-13.184 -56.471,3.314Z"/>
        <path d="M122.098,119.057c4.808,-5.406 13.1,-5.893 18.506,-1.086c5.407,4.808 5.893,13.1 1.086,18.506c-4.807,5.407 -13.099,5.893 -18.506,1.086c-5.406,-4.807 -5.893,-13.099 -1.086,-18.506Z"/>
      </g>
    </svg>
    <img :src="bild" v-if="bild!=''"/>
    <div class="zahl">{{ zahl }}</div>
  </div>

</template>

<style scoped>
#container {
  position: relative;
}
svg {
  filter: drop-shadow(3px 5px 5px rgb(0 0 0 / 0.4));
}
.zahl {
  position: absolute;
  top: 68px;
  left: 65px;
  font-size: 48px;
  color: rgba(255, 255, 255, 0.5);
  transform: translate(-50%, -50%);
}
img {
  position: absolute;
  top: 30px;
  left: 25px;
  height: 80px;
}
</style>