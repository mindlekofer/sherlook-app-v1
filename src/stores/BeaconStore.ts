import { defineStore } from 'pinia';
import { BleClient, ScanResult, ScanMode } from '@capacitor-community/bluetooth-le';

export const useBeaconStore = defineStore('beaconStore', {
  state: () => ({
    status: "inaktiv",
    nrOfResults: 0,
    nrOfBeaconsFound: 0,
    rangeTicks: 0,
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
        ort: "EG Gang",
        rssi: 0,
        time: 0,
        counter: 0
      },
      {
        id: 6,
        ort: "Schrank im Gang",
        rssi: 0,
        time: 0,
        inRange: false,
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
      console.log("scanBt()");
      try {
        // await BleClient.stopLEScan();
        await BleClient.initialize();
        console.log("BleClient initialized!");
        this.status = "aktiv";
        await BleClient.requestLEScan({
          allowDuplicates: true, 
          namePrefix: "SherLOOK",
          scanMode: ScanMode.SCAN_MODE_LOW_LATENCY
        }, 
        (result) => {
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
        setInterval(this.updateRange, 1000);
      } catch {
        console.log("scanBLE() error");
        this.status = "Fehler";
        setTimeout(this.scanBt, 5000);
      }
    },
    async stopBt(): Promise<void> {
      await BleClient.stopLEScan();
    },
    inRange(nr:number) : boolean {
      if (Date.now() > this.beaconList[nr].time + 10000)
        return false;
      else
        return true;
    },
    updateRange() {
      console.log("updating bt timeouts");
      this.rangeTicks++;
      this.beaconList.forEach((beacon) => {
        if (Date.now() > beacon.time + 10000)
          beacon.rssi = 0;
      });
    }
  }
});

export interface Beacon {
  id: number,
  rssi: number,
  time: number,
  inRange?: boolean,
  name?: string,
  ort?: string,
  counter?: number
}

