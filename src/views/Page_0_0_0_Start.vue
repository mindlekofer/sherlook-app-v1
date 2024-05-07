<template>

<ion-page>
  <ion-content :fullscreen="true">
    <span class="debugging" id="debug-flow-anzeige">v{{ package_json.version }} </span>
    <div class="container">
      <img class="logo_sherlook" src="assets/logo_sherlook.png" width="700">
      <img class="logo_uni" src="assets/logo_uni.jpg" width="340">
      <img class="logo_rosgarten" src="assets/logo_rosgarten.png" width="350">

      <!-- <button-einstellungen-component @click="openEinstellungsModal()" class="button_einstellungen"/> -->
      <button-einstellungen-component @click="openSpielMenu()" class="button_einstellungen"/>
      <button-weiter-component class="button_weiter" @click="weiterButtonClicked" :disabled="!modelGeladenRef" :pulsiert="modelGeladenRef" router-link="/intro" />
      
    </div>
    
    <!-- <ion-alert 
      :is-open=true
      header="Lade"
      message="Lade Bilderkennung..."
      >
      
    </ion-alert> -->
  </ion-content>
  <ion-toast :is-open="!modelGeladenRef" message="Lade Daten...">asdfsadf</ion-toast>
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
.debugging {
  position: absolute;
  z-index: 9999;
  opacity: 50%;
}

</style>

<script setup lang="ts">
  import { IonContent, IonPage, IonAlert, IonToast } from '@ionic/vue';
  import { storeToRefs } from 'pinia';
  import ButtonWeiterComponent from '@/components/ButtonWeiterComponent.vue';
  import ButtonEinstellungenComponent from '@/components/ButtonEinstellungenComponent.vue';
  import { ref, watch } from 'vue';
  import router from '@/router';
  import { modalController } from '@ionic/vue';
  import { useSpielStore } from '@/stores/SpielStore'
  import StartMenu from '@/components/modals/StartMenu.vue'
  import EinstellungsModal from '@/components/modals/EinstellungsModal.vue';
  import RaetselModal from '@/components/modals/RaetselModal.vue';
  import axios from 'axios';
  import { ladeModell } from '@/bilderkennung';
  import package_json from "../../package.json";

  const spielStore = useSpielStore();
  const { person, raetsel, aktives_raetsel } = storeToRefs(spielStore);

  // spielStore.objekte_eg = ['00x0_eg_02', 'x0x0_eg_02', '00x1_eg_ab'];
  // spielStore.objekte_og = ['001x_og1_ab', '00x0_og1_ac', '10x0_og1_bc'];

  // // Objekte //

  // for (let i=0; i<3; i++) {
  //   axios.get('assets/objekte/eg/'
  //       +spielStore.raetsel[spielStore.aktives_raetsel].objekte.eg[i]+'/'
  //       +spielStore.raetsel[spielStore.aktives_raetsel].objekte.eg[i]+'.json')
  //           .then(response => { spielStore.objekte.eg[i] = response.data, console.log(response); });
  // }  
  // for (let i=0; i<3; i++) {
  //   axios.get('assets/objekte/og1/'
  //       +spielStore.raetsel[spielStore.aktives_raetsel].objekte.og1[i]+'/'
  //       +spielStore.raetsel[spielStore.aktives_raetsel].objekte.og1[i]+'.json')
  //           .then(response => { spielStore.objekte.og1[i] = response.data, console.log(response); });
  // }

  // Personen //

  const lade_assets = () => {
    console.log('Rätsel geändert: ', aktives_raetsel);
    // Schuldiger //
    axios.get('assets/personen/'+raetsel.value[aktives_raetsel.value].schuldig+'/'+raetsel.value[aktives_raetsel.value].schuldig+'.json')
          .then(response => { person.value.schuldig = response.data; console.log('Person (schuldig): ', person.value.schuldig); })
          .catch( (error) => {console.log("Axios Fehler: ", error)});
    // Unschuldige //
    for (let i=0; i<2; i++) {
      axios.get('assets/personen/'+raetsel.value[aktives_raetsel.value].unschuldig.watson[i]+'/'+raetsel.value[aktives_raetsel.value].unschuldig.watson[i]+'.json')
        .then(response => { person.value.unschuldig.watson[i] = response.data; console.log('Person (unschuldig, Watson): ', response.data); })
        .catch( (error) => {console.log("Axios Fehler: ", error)});
    }
    for (let i=0; i<2; i++) {
      axios.get('assets/personen/'+raetsel.value[aktives_raetsel.value].unschuldig.sherlock[i]+'/'+raetsel.value[aktives_raetsel.value].unschuldig.sherlock[i]+'.json')
        .then(response => { person.value.unschuldig.sherlock[i] = response.data; console.log('Person (unschuldig, Sherlock): ', response.data); })
        .catch( (error) => {console.log("Axios Fehler: ", error)});
      }
    for (let i=0; i<2; i++) {
        axios.get('assets/personen/'+raetsel.value[aktives_raetsel.value].unschuldig.enola[i]+'/'+raetsel.value[aktives_raetsel.value].unschuldig.enola[i]+'.json')
        .then(response => { person.value.unschuldig.enola[i] = response.data; console.log('Person (unschuldig, Enola): ', response.data); })
        .catch( (error) => {console.log("Axios Fehler: ", error)});
    }
    // Objekte EG //
    for (let i=0; i<3; i++) {
      axios.get('assets/objekte/eg/'
          +spielStore.raetsel[spielStore.aktives_raetsel].objekte.eg[i]+'/'
          +spielStore.raetsel[spielStore.aktives_raetsel].objekte.eg[i]+'.json')
              .then(response => { spielStore.objekte.eg[i] = response.data, console.log(response); });
    }
    // Objekte OG1 //
    for (let i=0; i<3; i++) {
      axios.get('assets/objekte/og1/'
          +spielStore.raetsel[spielStore.aktives_raetsel].objekte.og1[i]+'/'
          +spielStore.raetsel[spielStore.aktives_raetsel].objekte.og1[i]+'.json')
              .then(response => { spielStore.objekte.og1[i] = response.data, console.log(response); });
    }
  }

  lade_assets();

  watch(aktives_raetsel, () => {
    lade_assets();
 });

  const weiterButtonClicked = () => {
    if (spielStore.objekte.eg[0].nr == 0)
      lade_assets();
    spielStore.flow = 0.2;
    console.log(`weiter -> flow = ${spielStore.flow}`);
  }

  const modelGeladenRef = ref(false);

  const openEinstellungsModal = async () => {
    const einstellungs_modal = await modalController.create({
      component: EinstellungsModal,
      cssClass: 'einstellungs-modal',
      backdropDismiss: true
    });
    einstellungs_modal.present();
  };

const openSpielMenu = async () => {
  console.log("openSpielMenu clicked");
  const start_menu = await modalController.create({component: StartMenu});
  console.log("after await");
  start_menu.present();
  const { data } = await start_menu.onWillDismiss();
  if (data == "beenden") {
    spielStore.$reset();
    router.push("start");
    spielStore.flow = 0.0;
  } else if (data == "einstellungen") {
    const einstellungs_modal = await modalController.create({
      component: EinstellungsModal,
      cssClass: 'einstellungs-modal',
      backdropDismiss: true });
    einstellungs_modal.present();
  } else if (data == "rätsel") {
    const raetsel_modal = await modalController.create({
      component: RaetselModal,
      cssClass: 'raetsel-modal',
      backdropDismiss: true });
    raetsel_modal.present();
  }
};

ladeModell().then(() => {modelGeladenRef.value = true});

</script>
