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
                        <ion-note>{{ beacon.ort }}</ion-note>
                    </ion-item>
                </ion-list>
            </div>
            <!-- <p>{{ beaconStore.beaconsFound }}</p>  -->
        </div>
        <div class="modal-control">
            <ion-button size="large" @click="modalController.dismiss()">schließen</ion-button>
        </div>
    </div>
</template>

<style scoped>
ion-list {
   width: 80%;
}
#beacon-liste {
    padding: 20px;
    padding-top: 0px;
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
    align-items: top;
    justify-content: left;
}
.modal-wrapper .modal-control {
    text-align: end;
}

</style>

<script setup lang="ts">
import { modalController } from '@ionic/core';
import { IonButton, IonList, IonBadge, IonItem, IonLabel, IonNote } from '@ionic/vue';
import { ref } from 'vue';


import { useSpielStore } from '@/stores/SpielStore'
const spielStore = useSpielStore();
import { useBeaconStore, Beacon } from '@/stores/BeaconStore';
const beaconStore = useBeaconStore();

function filterRecent(item : Beacon) {
    return item.time > Date.now() - 60000;
}

const beaconsShown = ref();

const returnColor = (rssi : number) => {
    if (rssi < -90) return 'danger';
    if (rssi < -80) return 'warning';
    return 'success';
}

setInterval(() => {
    // update list of beacons
    
    beaconsShown.value = beaconStore.beaconList.filter(filterRecent);

    // update vor...Sekunden
    beaconsShown.value.forEach( (beacon : any) => {
            beacon.vor_s = Math.floor((Date.now()-beacon.time)/1000);
        }
    );

    // let tempArray = [];

    // beaconStore.beaconsFound.forEach((beacon) => {
    //     tempArray.forEach((newBeacon) => {
    //         newBeacon
    //     })

    //     if ( beaconsInRange.value.indexOf() )
    //         tempArray.push(beacon);
    // });

}, 1000);


</script>