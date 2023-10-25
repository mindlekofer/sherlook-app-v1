<script setup lang="ts">

const props = defineProps({
    zahl: {
      type: String,
      default: ''
    },
    lesezeichen1: {
      type: Boolean,
      default: false
    },
    lesezeichen2: {
      type: Boolean,
      default: false
    }
  });

</script>

<template>
  <div class="container2">
    <svg width="100%" height="100%" viewBox="0 0 116 139" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;">
      <g id="Buch">
        <g>
          <path d="M10.414,1c-5.737,0 -9.414,3.426 -9.414,9.755l0,102.966c0,5.635 3.554,8.679 9.414,8.679l78.97,-0l0.493,-121.4l-79.463,0Z" style="fill:#393939;stroke:#fff8f8;stroke-width:1.67px;"/>
          <path d="M1,113.371c0.126,-4.345 3.633,-8.711 9.414,-8.689c2.394,0.008 9.822,0.012 19.202,0.013c23.337,0.002 59.755,-0.013 59.755,-0.013" style="fill:#393939;stroke:#fff8f8;stroke-width:1.67px;stroke-linecap:butt;"/>
          <path d="M10.414,104.682l0,-103.682" style="fill:none;stroke:#fff8f8;stroke-width:1.67px;stroke-linecap:butt;"/>
          <path d="M14.933,113.371l73.438,-0" style="fill:none;stroke:#fff8f8;stroke-width:1.67px;"/>
        </g>
        <g id="Lesezeichen-Vertikal" serif:id="Lesezeichen Vertikal">
          <path d="M22.085,113.371l0,23.269l7.531,-8.687l7.53,8.687l0,-23.269l-15.061,-0Z" style="fill:#393939;stroke:#393939;stroke-width:4.17px;"/>
          <path d="M22.085,113.371l0,23.269l7.531,-8.687l7.53,8.687l0,-23.269l-15.061,-0Z" style="fill:#fff;stroke:#fff;stroke-width:1.04px;"/>
        </g>
        <g id="Lesezeichen-Unten" serif:id="Lesezeichen Unten">
          <path d="M89.428,96.969l24.207,-0l-9.036,-8.618l9.036,-8.619l-24.207,0l0,17.237Z" style="fill:#393939;stroke:#393939;stroke-width:4.17px;"/>
          <path :class="{'gruen':lesezeichen2, 'weiss':!lesezeichen2}" d="M89.428,96.969l24.207,-0l-9.036,-8.618l9.036,-8.619l-24.207,0l0,17.237Z" style="stroke:#fff;stroke-width:1.04px;"/>
        </g>
        <g id="Lesezeichen-Oben" serif:id="Lesezeichen Oben">
          <path d="M89.428,69.436l24.207,-0l-9.036,-8.619l9.036,-8.618l-24.207,0l0,17.237Z" style="fill:#393939;stroke:#393939;stroke-width:4.17px;"/>
          <path :class="{'gruen':lesezeichen1, 'weiss':!lesezeichen1}" d="M89.428,69.436l24.207,-0l-9.036,-8.619l9.036,-8.618l-24.207,0l0,17.237Z" style="stroke:#fff;stroke-width:1.04px;"/>
        </g>
      </g>
    </svg>
    <div class="zahl">{{ zahl }}</div>
  </div>
</template>

<style scoped>
  .container2 {
    position: relative;
  }
  svg {
    position: relative;
    width: 125px;
    height: 125px;
    filter: drop-shadow(3px 5px 5px rgb(0 0 0 / 0.4));
  }
  .zahl {
    position: absolute;
    top: 47px;
    left: 55px;
    font-size: 48px;
    color: rgba(255, 255, 255, 0.5);
    transform: translate(-50%, -50%);
  }
  .gruen {
    fill: #57cc33;
  }
  .weiss {
    fill: #ffffff;
  }

</style>