<template>

<ion-page>
  <ion-content :fullscreen="true">
    <div class="container">

      <img class="logo_sherlook" src="assets/logo_sherlook.png" width="700">
      <img class="logo_uni" src="assets/logo_uni.jpg" width="340">
      <img class="logo_rosgarten" src="assets/logo_rosgarten.png" width="350">

      <button-einstellungen-component @click="openEinstellungsModal()" class="button_einstellungen"/>
      <button-weiter-component class="button_weiter" @click="weiterButtonClicked" :disabled="!modelGeladenRef" :pulsiert="modelGeladenRef" router-link="/intro" />

    </div>
    <!-- <ion-alert 
      :is-open=true
      header="Lade"
      message="Lade Bilderkennung..."
  >
    
  </ion-alert> -->
  </ion-content>
  <!-- <ion-footer class="ion-no-border">
    <ion-toolbar>
      <div class="button-container">
      </div>
    </ion-toolbar>
  </ion-footer> -->
  <!-- <ion-alert 
      :is-open="bilderStore.modelGeladen"
      header="Lade"
      message="Lade Bilderkennung..."
  > -->


</ion-page>

</template>

<style scoped>
.container {
  flex-direction: column;
  text-align: center;
  position: relative;
  height: 100%;
  overflow: hidden;
}
.logo_rosgarten {
  position: absolute;
  top: 50px;
  left: 50px;
}
.logo_uni {
  position: absolute;
  top: 50px;
  right: 50px;
}
.logo_sherlook {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
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
  import { IonContent, IonPage, IonAlert } from '@ionic/vue';
  import ButtonWeiterComponent from '@/components/ButtonWeiterComponent.vue';
  import ButtonEinstellungenComponent from '@/components/ButtonEinstellungenComponent.vue';
  import { ref, watch } from 'vue';
  import { modalController } from '@ionic/vue';
  import { useSpielStore } from '@/stores/SpielStore'
  import EinstellungsModal from '@/components/modals/EinstellungsModal.vue';
  import axios from 'axios';

  const spielStore = useSpielStore();

  spielStore.objekte_eg = ['00x0_eg_02', 'x0x0_eg_02', '00x1_eg_ab'];
  spielStore.objekte_og = ['001x_og1_ab', '00x0_og1_ac', '10x0_og1_bc'];

  for (let i=0; i<3; i++) {
    axios.get('assets/objekte/eg/'+spielStore.objekte_eg[i]+'/'+spielStore.objekte_eg[i]+'.json')
        .then(response => { spielStore.objekte.eg[i] = response.data, console.log(response); });
  }  
  for (let i=0; i<3; i++) {
    axios.get('assets/objekte/og1/'+spielStore.objekte_og[i]+'/'+spielStore.objekte_og[i]+'.json')
        .then(response => { spielStore.objekte.og1[i] = response.data, console.log(response); });
  }

  spielStore.personen_auswahl = {
    'schuldig': '00x0',
    'unschuldig': {
    'watson': ['11x1', '111x'],
    'sherlock': ['111x', 'x111'],
    'enola': ['11x0', '01x1'] 
    }
  };

  axios.get('assets/personen/'+spielStore.personen_auswahl.schuldig+'/'+spielStore.personen_auswahl.schuldig+'.json')
        .then(response => { spielStore.person.schuldig = response.data; console.log('Person (schuldig): ', spielStore.person.schuldig); })
        .catch( (error) => {console.log("Axios Fehler: ", error)});
  for (let i=0; i<2; i++) {
    axios.get('assets/personen/'+spielStore.personen_auswahl.unschuldig.watson[i]+'/'+spielStore.personen_auswahl.unschuldig.watson[i]+'.json')
      .then(response => { spielStore.person.unschuldig.watson[i] = response.data; console.log('Person (unschuldig, Watson): ', response.data); })
      .catch( (error) => {console.log("Axios Fehler: ", error)});
  }
  for (let i=0; i<2; i++) {
    axios.get('assets/personen/'+spielStore.personen_auswahl.unschuldig.sherlock[i]+'/'+spielStore.personen_auswahl.unschuldig.sherlock[i]+'.json')
      .then(response => { spielStore.person.unschuldig.sherlock[i] = response.data; console.log('Person (unschuldig, Sherlock): ', response.data); })
      .catch( (error) => {console.log("Axios Fehler: ", error)});
  }
  for (let i=0; i<2; i++) {
      axios.get('assets/personen/'+spielStore.personen_auswahl.unschuldig.enola[i]+'/'+spielStore.personen_auswahl.unschuldig.enola[i]+'.json')
      .then(response => { spielStore.person.unschuldig.enola[i] = response.data; console.log('Person (unschuldig, Enola): ', response.data); })
      .catch( (error) => {console.log("Axios Fehler: ", error)});
  }


  const weiterButtonClicked = () => {
    spielStore.flow = 0.2;
    console.log(`weiter -> flow = ${spielStore.flow}`);
  }

  const modelGeladenRef = ref(true);

  const openEinstellungsModal = async () => {
    const einstellungs_modal = await modalController.create({
      component: EinstellungsModal,
      cssClass: 'einstellungs-modal',
      backdropDismiss: true
    });
    einstellungs_modal.present();
  };

</script>
