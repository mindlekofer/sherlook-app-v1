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
    sortedBeaconList: [] as Beacon[] | null,
    btScanTimer: 0,
    beaconList: [
      { 
        id: 1,
        ort: "EG Detektivbüro",
        rssi: -100,
        time: 0,
        counter: 0
      },
      {
        id: 2,
        ort: "EG Kristall",
        rssi: -100,
        time: 0,
        counter: 0
      },
      {
        id: 3,
        ort: "EG Leiner-Statue",
        rssi: -100,
        time: 0,
        counter: 0
      },
      {
        id: 4,
        ort: "EG Leiner-Saal",
        rssi: -100,
        time: 0,
        counter: 0
      },
      {
        id: 5,
        ort: "EG Waffenraum",
        rssi: -100,
        time: 0,
        counter: 0
      },
      {
        id: 6,
        ort: "OG Gang",
        rssi: -100,
        time: 0,
        inRange: false,
        counter: 0
      },
      {
        id: 7,
        ort: "OG Schreibtisch",
        rssi: -100,
        time: 0,
        counter: 0
      },
      {
        id: 8,
        ort: "OG Zunftsaal",
        rssi: -100,
        time: 0,
        counter: 0
      },
      {
        id: 9,
        ort: "OG Aufsteller",
        rssi: -100,
        time: 0,
        counter: 0
      }
    ]
  }),
  getters: {
    getSortedBeaconList() : any[] {
      return [...this.beaconList].sort( (a, b) => 
      {
        if (a.rssi > b.rssi) return -1;
        else if (a.rssi < b.rssi) return 1;
        else return 0;
      });
    }
  },
  actions: {
    async scanBt(): Promise<void> {
      // console.log("scanBt()");
      try {
        // await BleClient.stopLEScan();
        await BleClient.initialize();
        console.log("BleClient initialized!");
        this.status = "aktiv";
        await BleClient.requestLEScan({
          allowDuplicates: true, 
          namePrefix: "SherLOOK",
          scanMode: ScanMode.SCAN_MODE_LOW_LATENCY
          // scanMode: ScanMode.SCAN_MODE_BALANCED
        }, 
        (result) => {
          // console.log(result);
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
                beacon.rssi = Math.floor((beacon.rssi * 4 + this.lastBeacon.rssi) / 5);
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
        this.btScanTimer = setInterval(this.updateRange, 1000);
      } catch {
        // console.log("scanBLE() error");
        this.status = "Fehler";
        setTimeout(this.scanBt, 5000);
      }
    },
    async stopBt(): Promise<void> {
      await BleClient.stopLEScan();
      clearInterval(this.btScanTimer);
    },
    inRange(nr:number) : boolean {
      if (Date.now() > this.beaconList[nr].time + 10000)
        return false;
      else
        return true;
    },
    updateRange() {
      console.log(`(bt) results: ${this.nrOfResults}, beacons: ${this.nrOfBeaconsFound}`);
      this.rangeTicks++;
      this.beaconList.forEach((beacon) => {
        if (Date.now() > beacon.time + 10000)
          beacon.rssi = -100;
          // beacon.rssi = 0;
      });
      this.updateSorted();
      console.log("getSortedBeaconList:", this.getSortedBeaconList);
      console.log("sortedBeaconList:", this.sortedBeaconList);
    },
    getEmpfangVonIndex(index : number) {
      const rssi = this.beaconList[index].rssi;
      if (rssi == -100) return 'nichts';
      if (rssi < -90) return 'schwach';
      if (rssi < -80) return 'mittel';
      return 'stark'
    },
    getColor(index : number) {
      const empfang = this.getEmpfangVonIndex(index);
      if (empfang == 'nichts') return 'medium';
      if (empfang == 'schwach') return 'danger';
      if (empfang == 'mittel') return 'warning';
      return 'success'; // 'stark'
    },
    getBeaconVonOrt(ort : string) { 
      const beacon = this.beaconList.find(beacon => beacon.ort == ort);
      return beacon ? beacon : {id: 0, rssi: 0, time: 0};
    },
    getIndexVonOrt(ort : string) {
      return this.beaconList.findIndex(i => i.ort == ort);
    },
    getEmpfangVonOrt(ort : string) {
      return this.getEmpfangVonIndex(this.getIndexVonOrt(ort));
    },
    updateSorted() {
      // this.sortedBeaconList = this.beaconList.toSorted( (a, b) => a.rssi - b.rssi );
      this.sortedBeaconList = this.beaconList.map((elem) => elem);
      this.sortedBeaconList.sort( (a, b) => 
      {
        if (a.rssi > b.rssi) return -1;
        else if (a.rssi < b.rssi) return 1;
        else return 0;
      });
      // this.sortedBeaconList = [...this.beaconList].sort( (a, b) => 
      // {
      //   if (a.rssi > b.rssi) return 1;
      //   else if (a.rssi < b.rssi) return -1;
      //   else return 0;
      //   // a.rssi - b.rssi;
      // });
      // console.log(this.sortedBeaconList);
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