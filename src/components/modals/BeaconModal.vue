<template>
  <div class="modal-wrapper">
    <div class="modal-content">
      <!-- <img id="karte" src="assets/img/karte-tutorial.png"/> -->
      <h1>Beacons</h1>
      <div id="bt-status">
        <span>
          Status: {{ beaconStore.status }}
        </span>
        <span>
          Suchergebnisse: {{ beaconStore.nrOfResults }}
        </span>
      </div>
      <div id="beacon-liste">
        <h3>Erkannte Beacons</h3>
        <ion-list lines="inset">
          <ion-item v-for="beacon in beaconsShown" :key="beacon.nr">
            <ion-badge slot="start" :color="returnColor(beacon.rssi)">RSSI {{ beacon.rssi }}</ion-badge>
            <ion-label>vor {{ beacon.vor_s }} Sekunden</ion-label>
            <ion-label>Beacon {{ beacon.id }}</ion-label>
            <ion-label>{{ beacon.ort }}</ion-label>
          </ion-item>

          <!-- <ion-item>
            <ion-badge slot="start" color="warning">RSSI -71</ion-badge>
            <ion-label>vor 4 Sekunden</ion-label>
            <ion-label>Beacon 5</ion-label>
            <ion-label class="beschreibung">Schrank in W508</ion-label>
          </ion-item> -->

        </ion-list>
      </div>
      <!-- <p>{{ beaconStore.beaconsFound }}</p>  -->
    </div>
    <div class="modal-control">
      <ion-button size="large" @click="schliessen">schließen</ion-button>
    </div>
  </div>
</template>

<style scoped>
ion-list {
   width: 80%;
}
.beschreibung {
  font-size: 12px;
  font-weight: 300;
}
#beacon-liste {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#bt-status {
  padding: 10px;
  padding-top: 0px;
  display: flex;
  justify-content: space-around;
}
.modal-wrapper {
  padding: 30px;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.modal-wrapper h1 {
  font-size: 24pt;
}
.modal-wrapper .modal-content {
  font-size: 16pt;
  flex-grow: 1;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: left;
}
.modal-wrapper .modal-control {
  text-align: end;
}

</style>

<script setup lang="ts">
import { modalController } from '@ionic/core';
import { IonButton, IonList, IonBadge, IonItem, IonLabel, IonNote } from '@ionic/vue';
import { onMounted, onUnmounted, ref, watch } from 'vue';

import { useBeaconStore, Beacon } from '@/stores/BeaconStore';
import { storeToRefs } from 'pinia';
import { range } from '@tensorflow/tfjs';
const beaconStore = useBeaconStore();
const { rangeTicks } = storeToRefs(beaconStore);

// const props = defineProps( {
//     timerActive: {
//       type: Boolean,
//       default: false
//     }
//   });

console.log("opening Beacon Modal");

function filterRecent(item : Beacon) {
  return item.time > Date.now() - 60000;
}

const beaconsShown = ref();

const returnColor = (rssi : number) => {
  if (rssi == -100) return 'medium';
  if (rssi < -90) return 'danger';
  if (rssi < -80) return 'warning';
  return 'success';
}

const rangeWatch = watch(rangeTicks, () => {
  console.log('beaconmodal update beacon list');
  beaconsShown.value = beaconStore.beaconList.filter(filterRecent);
  beaconsShown.value.forEach( (beacon : any) => {
        beacon.vor_s = Math.floor((Date.now()-beacon.time)/1000);
      });
});

// const this.updateBeaconListTimer = setInterval(() => {
//     console.log('beaconmodal update beacon list');
//     beaconsShown.value = beaconStore.beaconList.filter(filterRecent);
//     beaconsShown.value.forEach( (beacon : any) => {
//         beacon.vor_s = Math.floor((Date.now()-beacon.time)/1000);
//       });
//     }, 1000);

function schliessen() {
  
  modalController.dismiss();
  rangeWatch(); // bringt nix
}

onUnmounted(() => {
  console.log("BeaconModal unmounted");
});

// let updateBeaconListTimer : any = null;

// watch(props, () => {
//   if (props.timerActive) {
//     updateBeaconListTimer = setInterval(() => {
//     console.log('beaconmodal update beacon list');
//     beaconsShown.value = beaconStore.beaconList.filter(filterRecent);
//     beaconsShown.value.forEach( (beacon : any) => {
//         beacon.vor_s = Math.floor((Date.now()-beacon.time)/1000);
//       });
//     });
//   } else {
//     clearInterval(updateBeaconListTimer);
//   }
// });


</script>