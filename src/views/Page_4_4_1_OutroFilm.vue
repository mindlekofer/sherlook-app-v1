<template>

  <ion-page>
    <ion-header :translucent="true">
      <ion-breadcrumbs>
        <ion-breadcrumb router-link="/start">Start</ion-breadcrumb>
        <ion-breadcrumb router-link="/intro">Intro</ion-breadcrumb>
        <ion-breadcrumb router-link="/level">Schwierigkeit</ion-breadcrumb>
        <ion-breadcrumb router-link="/raum">Raum</ion-breadcrumb>
        <ion-breadcrumb router-link="/spiel">Spiel</ion-breadcrumb>
        <ion-breadcrumb router-link="/outro">Outro</ion-breadcrumb>
      </ion-breadcrumbs>
    </ion-header>
    <ion-content :fullscreen="true">
      <div class="container">
        <video ref="videoOutroRef" controls height="600" poster="assets/img/film_poster.jpg">
          <source src="assets/filme/outro_film_mit_ton.mp4" />
        </video>
        <button-zurueck-component class="button_einstellungen" @click="zurueck" router-link="/spiel"/>
        <button-weiter-component class="button_weiter" @click="weiter" router-link="/start" :pulsiert="videoEnde"/>
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
    import { ref, watch } from 'vue';    
    import { storeToRefs } from 'pinia';
    import router from '@/router';
  
    const spielStore = useSpielStore();
    console.log('videoIntroPage');
    const { flow } = storeToRefs(spielStore);
  
    const videoOutroRef = ref<HTMLMediaElement>();
    const videoEnde = ref(false);
    
    function videoStopReset() {
      if (videoOutroRef.value) {
        videoOutroRef.value.pause();
        videoOutroRef.value.currentTime = 0;
      }
    }
  
    watch(flow, () => {
      if (flow.value==4.4) {
        console.log('starte Video');
        videoOutroRef.value?.play();
      } else {
        videoStopReset();
      }
    })
  
    watch(videoOutroRef, () => {
      //  videoStopReset();
      console.log(videoOutroRef.value);
      videoOutroRef.value?.play();
      videoOutroRef.value?.addEventListener('ended', () => {videoEnde.value = true}, false);
      videoOutroRef.value?.addEventListener('playing', () => {videoEnde.value = false}, false);
    })
  
    const weiter = () => {
      console.log(`weiter -> flow = ${spielStore.flow}`);
      videoStopReset();
      spielStore.flow = 0.0;
      spielStore.$reset();
    router.push("start");
    spielStore.flow = 0.0;
    }
  
    const zurueck = () => {
      console.log(`weiter -> flow = ${spielStore.flow}`);
      videoStopReset();
    }
  
  </script>
  