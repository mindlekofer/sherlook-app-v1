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
  <ion-fab-button :class="{'pulsieren':pulsiert==true}" color="karte">
    <svg width="100%" height="100%" viewBox="0 0 120 120" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;">
      <circle id="Button-Karte" serif:id="Button Karte" cx="60" cy="60" r="60" style="fill:none;"/>
      <clipPath id="_clip1">
        <circle cx="60" cy="60" r="60"/>
      </clipPath>
      <g clip-path="url(#_clip1)">
        <path d="M29.332,30.599c13.198,4.65 37.608,9.964 59.923,0l4.358,56.78c-20.209,-3.571 -27.256,-9.71 -61.724,-0l-2.557,-56.78Z" style="fill:#d6af7d;"/>
        <clipPath id="_clip2">
          <path d="M29.332,30.599c13.198,4.65 37.608,9.964 59.923,0l4.358,56.78c-20.209,-3.571 -27.256,-9.71 -61.724,-0l-2.557,-56.78Z"/>
        </clipPath>
        <g clip-path="url(#_clip2)">
          <ellipse cx="48.719" cy="73.459" rx="4.173" ry="2.913" style="fill:none;stroke:#42382b;stroke-width:3px;"/>
          <path d="M65.006,42.48l9.675,7.295" style="fill:none;stroke:#42382b;stroke-width:3px;"/>
          <path d="M65.006,48.878l10.668,-7.272" style="fill:none;stroke:#42382b;stroke-width:3px;"/>
          <path d="M55.156,72.898c11.572,-0.863 20.297,-2.437 17.359,-10.406c-4.21,-11.417 -17.508,1.044 -20.773,-2.936c-2.745,-3.347 -4.119,-10.025 0.789,-8.652c10.368,2.902 15.389,3.131 16.035,-0.33" style="fill:none;stroke:#42382b;stroke-width:1.8px;stroke-dasharray:1.8,3.6,0,0,0,0;"/>
          <path d="M55.427,68.387l8.346,-1.786l-2.597,-1.775l2.597,1.775l-1.303,2.803" style="fill:none;stroke:#42382b;stroke-width:2.1px;"/>
        </g>
        <path d="M29.332,30.599c13.198,4.65 37.608,9.964 59.923,0l4.358,56.78c-20.209,-3.571 -27.256,-9.71 -61.724,-0l-2.557,-56.78Z" style="fill:none;stroke:#42382b;stroke-width:4.5px;"/>
        <g>
          <ellipse cx="30.324" cy="87.379" rx="8.234" ry="2.162" style="fill:#d6af7d;stroke:#42382b;stroke-width:4.5px;"/>
          <path d="M38.558,32.761l-16.468,0l-0,47.096c-0,1.421 0.565,2.785 1.57,3.79c1.005,1.005 2.369,1.57 3.79,1.57c1.843,-0 3.905,-0 5.748,-0c1.421,-0 2.785,-0.565 3.79,-1.57c1.005,-1.005 1.57,-2.369 1.57,-3.79c-0,-13.365 -0,-47.096 -0,-47.096Z" style="fill:#d6af7d;"/>
          <ellipse cx="30.324" cy="32.761" rx="8.234" ry="2.162" style="fill:#d6af7d;stroke:#42382b;stroke-width:4.5px;"/>
          <path d="M22.09,32.761l-0,54.618" style="fill:none;stroke:#42382b;stroke-width:4.5px;"/>
          <path d="M38.558,32.761l-0,54.618" style="fill:none;stroke:#42382b;stroke-width:4.5px;"/>
        </g>
        <g>
          <ellipse cx="89.896" cy="87.379" rx="8.234" ry="2.162" style="fill:#d6af7d;stroke:#42382b;stroke-width:4.5px;"/>
          <rect x="81.662" y="32.761" width="16.468" height="52.456" style="fill:#d6af7d;"/>
          <ellipse cx="89.896" cy="32.761" rx="8.234" ry="2.162" style="fill:#d6af7d;stroke:#42382b;stroke-width:4.5px;"/>
          <path d="M81.662,32.761l0,54.618" style="fill:none;stroke:#42382b;stroke-width:4.5px;"/>
          <path d="M98.13,32.761l0,54.618" style="fill:none;stroke:#42382b;stroke-width:4.5px;"/>
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