<template>
  <ion-app>
    <ion-router-outlet :animation="animationBuilder"/>
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet, getPlatforms, isPlatform } from '@ionic/vue';

import { AndroidFullScreen} from '@awesome-cordova-plugins/android-full-screen'
import { pageNextAnimation as animationBuilder } from './animations/pageNextAnimation';

AndroidFullScreen.isImmersiveModeSupported()
  .then(() => AndroidFullScreen.immersiveMode())
  .catch(console.warn);

console.log('Platforms: ',getPlatforms());


</script>
