<template>

<ion-page>
  <ion-header :translucent="true">
    <!-- <ion-toolbar> -->
      <!-- <ion-title>Start > Intro > Schwierigkeitsstufe > <u><b>Raumauswahl</b></u></ion-title> -->
    <ion-breadcrumbs>
      <ion-breadcrumb router-link="/start">Start</ion-breadcrumb>
      <ion-breadcrumb router-link="/intro">Intro</ion-breadcrumb>
      <ion-breadcrumb router-link="/level">Schwierigkeit</ion-breadcrumb>
      <ion-breadcrumb router-link="/raum">Raum</ion-breadcrumb>
    </ion-breadcrumbs>
    <!-- </ion-toolbar> -->
  </ion-header>

  <ion-content :fullscreen="true">

    <div class="container">

      <div class="text-container">
        <p>In welchem Stockwerk wollt ihr SherLOOK spielen ?</p>
      </div>

      <div class="auswahl_container">
        <div class="auswahl_box">
          <img src="assets/img/halbraum_lang.svg"  @click="spielStore.ort = 'og1'"/>
          <div class="objekte_container">
            <img :src="'assets/objekte/og1/'+objekte_og[0]+'/'+objekte_og[0]+'_rund.png'" @click="spielStore.ort = 'og1'"/>
            <img :src="'assets/objekte/og1/'+objekte_og[1]+'/'+objekte_og[1]+'_rund.png'" @click="spielStore.ort = 'og1'"/>
            <img :src="'assets/objekte/og1/'+objekte_og[2]+'/'+objekte_og[2]+'_rund.png'" @click="spielStore.ort = 'og1'"/>
          </div>
          <ion-button color="primary" expand="block" size="large" :fill="spielStore.ort == 'og1' ? 'solid' : 'outline'" @click="spielStore.ort = 'og1'">
            <div class="button_inhalt">
              <span class="name">1. OG</span>
              <span class="beschreibung">mit Zunftsaal</span>
            </div>
          </ion-button>
        </div>
        <div class="auswahl_box">
          <img src="assets/img/halbraum_lang.svg"  @click="spielStore.ort = 'eg'"/>
          <div class="objekte_container">
            <img :src="'assets/objekte/eg/'+objekte_eg[0]+'/'+objekte_eg[0]+'_rund.png'" @click="spielStore.ort = 'eg'"/>
            <img :src="'assets/objekte/eg/'+objekte_eg[1]+'/'+objekte_eg[1]+'_rund.png'" @click="spielStore.ort = 'eg'"/>
            <img :src="'assets/objekte/eg/'+objekte_eg[2]+'/'+objekte_eg[2]+'_rund.png'" @click="spielStore.ort = 'eg'"/>
          </div>
          <ion-button  color="primary" expand="block" size="large" :fill="spielStore.ort == 'eg' ? 'solid' : 'outline'" @click="spielStore.ort = 'eg'">
            <div class="button_inhalt">
              <span class="name">EG</span>
              <span class="beschreibung">mit Leinersaal</span>
            </div>
          </ion-button>
        </div>
      </div>
    
      <div class="spieler_logo">
        <img src="assets/img/detektive/watson_neutral.png" width="200" v-if="spielStore.spieler == 'Watson'"/>
        <img src="assets/img/detektive/sherlock_neutral.png" width="220" v-else-if="spielStore.spieler == 'Sherlock'"/>
        <img src="assets/img/detektive/enola_neutral.png" width="220" style="transform: scaleX(-1)" v-else-if="spielStore.spieler == 'Enola'"/>
        <img src="assets/kopf_mit_hals.svg" width="250" style="opacity: 0.4" v-else/>
      </div>

    </div>

    <button-zurueck-component class="button_zurueck" router-link="/level"/>
    <button-weiter-component class="button_weiter" disabled v-if="spielStore.ort == '' || spielStore.spieler == ''"/>
    <button-weiter-component class="button_weiter" router-link="/tutorial" @click="spielStore.flow = 0.6" v-else/>

  </ion-content>

  <!-- <ion-footer class="ion-no-border_">
    <ion-toolbar>
      <div class="button-container">
        <button-zurueck-component router-link="/anleitung"/>
        <button-hilfe-component id="level-hilfe-button" ausgeblendet/>
        <button-weiter-component router-link="/raum" disabled v-if="spielStore.spieler == ''"/>
        <button-weiter-component router-link="/raum" v-else/>
      </div>
    </ion-toolbar>
  </ion-footer> -->

</ion-page>

</template>

<style scoped>
.objekte_container {
  height: 70px;
  width: 250px;
  position: absolute;
  top: 65px;
  left: 150px;
  padding: 0px;
  display: flex;
  flex-direction: row;
  z-index: 99;
}
.objekte_container>img {
  height: 100%;
  padding-right: 10px;
}
.auswahl_box>img {
  transform: translateX(40px);
  z-index: 99;
  position: absolute;
  height: 70%;
  left: 0px;
}
ion-button {
  width: 100%;
  height: 80%;
  text-transform: none;
  text-align: left;
  display: flex;
  flex-direction: column;
  margin: 0px;
  /* background-image: url('@/assets/raum.svg');
  background-repeat: no-repeat;
  background-size: cover; */
  padding: 0px;
}
.button_inhalt {
  width: 100%;
  padding-left: 450px;
  display: flex;
  flex-direction: column;
}
.name {
  font-size: 32px;
  margin-bottom: 15px;
}
.beschreibung {
}
.auswahl_box {
  height: 230px;
  width: 800px;
  margin-bottom: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
}
.spieler_logo {
  position: absolute;
  /* height: 215px;
  width: 215px; */
  top: 50px;
  right: 50px;
}
.container {
  display:flex;
  height: 100%;
  flex-direction: column;
  text-align: center;
  justify-content: start;
  align-items: center;
  position: relative
}
.auswahl_container {
  /* width: 600px; */
  display:flex;
  flex-direction: column;
  transform: translateX(-130px);
}
p, ul {
  font-size: 28px;
  margin: 40px;
  text-align: left;
  line-height: 140%;
}
.button_zurueck {
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
  import { IonContent, IonHeader, IonPage, IonToolbar, IonBreadcrumb, IonButton, IonBreadcrumbs } from '@ionic/vue';
  import ButtonWeiterComponent from '@/components/ButtonWeiterComponent.vue';
  import ButtonZurueckComponent from '@/components/ButtonZurueckComponent.vue';
  import ButtonHilfeComponent from '@/components/ButtonHilfeComponent.vue'
  import { useSpielStore } from '@/stores/SpielStore'
  import { storeToRefs } from 'pinia';

  const spielStore = useSpielStore();
  const { objekte_eg, objekte_og } = storeToRefs(spielStore);

</script>
