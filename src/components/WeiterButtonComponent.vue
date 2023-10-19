<script setup lang="ts">
  import { IonFabButton, IonIcon} from '@ionic/vue';

  const props = defineProps( {
    pulsiert: {
      type: Boolean,
      default: false
    }
  });

</script>

<template>
  <ion-fab-button class="round-button" color="success">
    <ion-icon class="button-icon" :class="{'pulsieren':pulsiert==true}" src="assets/buttons/pfeil_weiter.svg"></ion-icon>
  </ion-fab-button>
</template>


<style scoped>
.round-button {
  width: 125px;
  height: 125px;
  margin: 30px;
}
.button-icon {
  font-size: 72px;
}
.pulsieren {
  animation: pulsieren-animation 0.5s ease-in-out infinite alternate;
}

@keyframes pulsieren-animation {
  100% {
    opacity: 75%;
    transform: scale(110%);
  }
}
</style>