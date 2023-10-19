import { defineStore } from 'pinia';
import { BleClient, ScanResult } from '@capacitor-community/bluetooth-le';

export const useBeaconStore = defineStore('beaconStore', {
  state: () => ({
    status: "inaktiv",
    nrOfResults: 0,
    nrOfBeaconsFound: 0,
    lastResult: null as ScanResult | null,
    lastBeacon: null as Beacon | null,
    beaconsFound: null as Beacon | null,
    beaconList: [
      { 
        id: 1,
        ort: "Kasse",
        rssi: 0,
        time: 0,
        counter: 0
      },
      {
        id: 2,
        ort: "Detektivbüro",
        rssi: 0,
        time: 0,
        counter: 0
      },
      {
        id: 3,
        ort: "EG Leiner-Statue",
        rssi: 0,
        time: 0,
        counter: 0
      },
      {
        id: 4,
        ort: "OG Leiner-Schreibtisch",
        rssi: 0,
        time: 0,
        counter: 0
      },
      {
        id: 5,
        ort: "Schreibtisch",
        rssi: 0,
        time: 0,
        counter: 0
      },
      {
        id: 6,
        ort: "Schrank im Gang",
        rssi: 0,
        time: 0,
        counter: 0
      },
      {
        id: 7,
        ort: "Schrank in W508",
        rssi: 0,
        time: 0,
        counter: 0
      },
      {
        id: 8,
        ort: "unbekannt",
        rssi: 0,
        time: 0,
        counter: 0
      },
      {
        id: 9,
        ort: "unbekannt",
        rssi: 0,
        time: 0,
        counter: 0
      }
    ]
  }),
  getters: {

  },
  actions: {
    async scanBt(): Promise<void> {
      try {
        // await BleClient.stopLEScan();
        await BleClient.initialize();
        console.log("BleClient initialized!");
        this.status = "aktiv";
        await BleClient.requestLEScan({allowDuplicates: true, namePrefix: "SherLOOK"}, (result) => {
        console.log(result);
        this.nrOfResults++;
        this.lastResult = result;
        if (result.localName?.startsWith("SherLOOK")) {
          this.nrOfBeaconsFound++;
          this.lastBeacon = { 
          id:  Number(result.localName.slice(-2)),
          rssi: result.rssi ? result.rssi : 0,
          time: Date.now()
          };
          let einsortiert = false;
          this.beaconList.forEach((beacon, index, arr) => {
          if (this.lastBeacon && this.lastBeacon.id == beacon.id) {
            beacon.rssi = this.lastBeacon.rssi;
            beacon.time = this.lastBeacon.time;
            beacon.counter = beacon.counter++;
            einsortiert = true;
          }
          });
          if (!einsortiert && this.lastBeacon) {      
            this.beaconList.push({
              id: this.lastBeacon.id,
              ort: "",
              time: this.lastBeacon.time,
              rssi: this.lastBeacon.rssi,
              counter: 1
            });
          }
        }
        });
      } catch {
        console.log("scanBLE() error");
        this.status = "Fehler";
        setTimeout(this.scanBt, 5000);
      }
    },
    async stopBt(): Promise<void> {
      await BleClient.stopLEScan();
    }
  }
});

export interface Beacon {
  id: number,
  rssi: number,
  time: number,
  name?: string,
  ort?: string,
  counter?: number
}

