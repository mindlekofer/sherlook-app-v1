<template>

<ion-page>
  <ion-header :translucent="true">
    <ion-breadcrumbs>
      <ion-breadcrumb router-link="/start">Start</ion-breadcrumb>
      <ion-breadcrumb router-link="/intro">Intro</ion-breadcrumb>
      <ion-breadcrumb router-link="/level">Schwierigkeit</ion-breadcrumb>
    </ion-breadcrumbs>
  </ion-header>

  <ion-content :fullscreen="true">

    <div class="container">

      <div class="text-container">
        <p>
          Die Detektive stürmen sofort in das Rosgartenmuseum, 
          denn die Spur des Detaildiebs ist noch ganz heiß. Die drei 
          sind so schnell, dass sie sich gegenseitig überholen und 
          wir beinahe den Überblick verlieren. Welchem Detektiv 
          möchtet ihr folgen?
        </p>
      </div>

      <div class="auswahl_container">
        <div class="auswahl_box">
          <img src="assets/img/detektive/watson_neutral.png" @click="spielStore.spieler = 'Watson'"/>
          <ion-button  color="primary" expand="block" size="large" :fill="spielStore.spieler == 'Watson' ? 'solid' : 'outline'" @click="spielStore.spieler = 'Watson'">
            <!-- <img src="assets/img/drwatsonvari3.png" width="100"/> -->
            <div class="button_inhalt">
              <span class="name">Watson</span>
              <span class="beschreibung">leicht (ab 10 Jahren)</span>
            </div>
          </ion-button>
        </div>
        <div class="auswahl_box">
          <img src="assets/img/detektive/sherlock_neutral.png"  @click="spielStore.spieler = 'Sherlock'"/>
          <ion-button color="primary" expand="block" size="large" :fill="spielStore.spieler == 'Sherlock' ? 'solid' : 'outline'" @click="spielStore.spieler = 'Sherlock'">
            <div class="button_inhalt">
              <span class="name">Sherlock</span>
              <span class="beschreibung">mittel (ab 12 Jahren)</span>
            </div>
          </ion-button>
        </div>
        <div class="auswahl_box">
          <img src="assets/img/detektive/enola_neutral.png"  @click="spielStore.spieler = 'Enola'"/>
          <ion-button color="primary" expand="block" size="large" :fill="spielStore.spieler == 'Enola' ? 'solid' : 'outline'" @click="spielStore.spieler = 'Enola'">
            <div class="button_inhalt">
              <span class="name">Enola</span>
              <span class="beschreibung">schwer (ab 16 Jahren)</span>
            </div>
          </ion-button>
        </div>
      </div>
    
      <div class="logo">
        <img src="assets/img/detektive/watson_gluecklich.png" width="300" v-if="spielStore.spieler == 'Watson'"/>
        <img src="assets/img/detektive/sherlock_gluecklich.png" width="350" v-else-if="spielStore.spieler == 'Sherlock'"/>
        <img src="assets/img/detektive/enola_gluecklich.png" width="300" style="transform: scaleX(-1)" v-else-if="spielStore.spieler == 'Enola'"/>
        <img src="assets/kopf_mit_hals.svg" width="250" style="opacity: 0.4" v-else/>
      </div>


    </div>

    <button-zurueck-component class="button_einstellungen" router-link="/intro"/>
    <button-weiter-component class="button_weiter" router-link="/raum" disabled v-if="spielStore.spieler == ''"/>
    <button-weiter-component class="button_weiter" router-link="/raum" v-else/>

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
.auswahl_box>img {
  transform: translateX(40px);
  z-index: 99;
  position: absolute;
  height: 100%;
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
}
.button_inhalt {
  width: 100%;
  padding-left: 150px;
  display: flex;
  flex-direction: column;
}
.name {
  font-size: 32px;
  margin-bottom: 15px;
}
.auswahl_box {
  height: 130px;
  width: 500px;
  margin-bottom: 10px;
  /* background-color: aqua;
  border: 5px solid rgba(0,0,0,0.5);
  border-radius: 20px; */
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
}
.logo {
  position: absolute;
  /* height: 215px;
  width: 215px; */
  height: 400px;
  width: 400px;
  top: 250px;
  left: 50%;
  transform: translateX(220px);
  text-align: left;
}
.container {
  display:flex;
  height: 100%;
  flex-direction: column;
  text-align: center;
  justify-content: start;
  align-items: center;
}
.auswahl_container {
  /* width: 600px; */
  display:flex;
  flex-direction: column;
  transform: translateX(-180px);
}
p, ul {
  font-size: 28px;
  margin: 40px;
  text-align: left;
  line-height: 140%;
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
  import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonModal, IonButton, IonBreadcrumb, IonBreadcrumbs } from '@ionic/vue';
  import ButtonWeiterComponent from '@/components/ButtonWeiterComponent.vue';
  import ButtonZurueckComponent from '@/components/ButtonZurueckComponent.vue';
  import ButtonHilfeComponent from '@/components/ButtonHilfeComponent.vue'

  import { useSpielStore } from '@/stores/SpielStore'
  const spielStore = useSpielStore();

</script>
