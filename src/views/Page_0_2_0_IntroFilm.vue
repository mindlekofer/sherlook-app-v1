<template>

<ion-page>
  <ion-header :translucent="true">
    <ion-breadcrumbs>
        <ion-breadcrumb router-link="/start">Start</ion-breadcrumb>
        <ion-breadcrumb router-link="/intro">Intro</ion-breadcrumb>
    </ion-breadcrumbs>
  </ion-header>
  <ion-content :fullscreen="true">
    <div class="container">
      <video ref="videoIntroRef" controls height="600" poster="assets/img/film_poster.jpg">
        <source src="assets/filme/intro_film_mit_ton.mp4" />
      </video>
      <button-zurueck-component class="button_einstellungen" @click="zurueck" router-link="/start"/>
      <button-weiter-component class="button_weiter" @click="weiter" router-link="/level" :pulsiert="videoEnde"/>
    </div>

  </ion-content>
</ion-page>

</template>

<style scoped>
video {
  margin-top: 40px;
  border: 20px solid black;
}
.container {
  flex-direction: column;
  text-align: center;
  position: relative;
  height: 100%;
  overflow: hidden;
}
.button_einstellungen {
  position: absolute;
  bottom: 25px;
  left: 25px;
}
.button_weiter {
  position: absolute;
  bottom: 25px;
  right: 25px;
}

</style>

<script setup lang="ts">
  import { IonHeader, IonContent, IonPage, IonBreadcrumb, IonBreadcrumbs } from '@ionic/vue';
  import ButtonWeiterComponent from '@/components/ButtonWeiterComponent.vue';
  import ButtonZurueckComponent from '@/components/ButtonZurueckComponent.vue';
  import { useSpielStore } from '@/stores/SpielStore'
  import { onMounted, ref, watch } from 'vue';    
  import { storeToRefs } from 'pinia';

  const spielStore = useSpielStore();
  console.log('videoIntroPage');
  const { flow } = storeToRefs(spielStore);

  
  const videoIntroRef = ref<HTMLMediaElement>();
  const videoEnde = ref(false);
  
  function videoStopReset() {
    if (videoIntroRef.value) {
      videoIntroRef.value.pause();
      videoIntroRef.value.currentTime = 0;
    }
  }

  watch(flow, () => {
    if (flow.value==0.2) {
      console.log('starte Video');
      videoIntroRef.value?.play();
    } else {
      videoStopReset();
    }
  })

  watch(videoIntroRef, () => {
    //  videoStopReset();
    console.log(videoIntroRef.value);
    videoIntroRef.value?.play();
    videoIntroRef.value?.addEventListener('ended', () => {videoEnde.value = true}, false);
    videoIntroRef.value?.addEventListener('playing', () => {videoEnde.value = false}, false);
  })



  const weiter = () => {
    spielStore.flow = 0.3;
    console.log(`weiter -> flow = ${spielStore.flow}`);
    videoStopReset();
  }

  const zurueck = () => {
    console.log(`weiter -> flow = ${spielStore.flow}`);
    videoStopReset();
  }

</script>
