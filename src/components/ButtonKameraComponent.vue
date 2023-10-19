<script setup lang="ts">
  import { IonFabButton } from '@ionic/vue';

  const props = defineProps( {
    pulsiert: {
      type: Boolean,
      default: false
    },
    ausgeblendet: {
      type: Boolean,
      default: false
    }
  });

</script>


<template>
  <ion-fab-button :class="{'pulsieren':pulsiert==true}" color="success">
    <svg width="100%" height="100%" viewBox="0 0 121 121" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
      <circle id="Button-Kamera" serif:id="Button Kamera" cx="60.452" cy="60.664" r="60" style="fill:none;"/>
      <clipPath id="_clip1">
        <circle cx="60.452" cy="60.664" r="60"/>
      </clipPath>
      <g clip-path="url(#_clip1)">
        <g id="Kamera">
          <path d="M36.306,38.487l0,-5.835c0,-3.22 2.615,-5.835 5.836,-5.835l36.62,0c3.221,0 5.835,2.615 5.835,5.835l0,5.835l3.795,0c7.012,0 12.705,5.693 12.705,12.705l-0,25.408c-0,7.012 -5.693,12.704 -12.705,12.704l-55.881,0c-7.011,0 -12.704,-5.692 -12.704,-12.704l0,-25.408c0,-7.012 5.693,-12.705 12.704,-12.705l3.795,0Zm24.146,9.368c-8.854,-0 -16.041,7.188 -16.041,16.041c-0,8.853 7.187,16.041 16.041,16.041c8.853,0 16.041,-7.188 16.041,-16.041c-0,-8.853 -7.188,-16.041 -16.041,-16.041Z" style="fill:#fff;"/>
        </g>
      </g>
    </svg>
  </ion-fab-button>
</template>


<style scoped>
ion-fab-button {
  width: 120px;
  height: 120px;
}
ion-fab-button[disabled] {
  background-color: yellow;
}
.pulsieren {
  animation: pulsieren-animation 0.5s ease-in-out infinite alternate;
}
@keyframes pulsieren-animation {
  0% {
    opacity: 100%;
    transform: scale(100%);
  }
  100% {
    opacity: 90%;
    transform: scale(110%);
  }
}
</style>