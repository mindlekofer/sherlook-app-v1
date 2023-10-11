import { defineStore } from 'pinia';
import { ScanResult } from '@capacitor-community/bluetooth-le';

export const useBeaconStore = defineStore('beaconStore', {
    state: () => ({
        status: "inaktiv",
        nrOfResults: 0,
        nrOfBeaconsFound: 0,
        lastResult: null as ScanResult | null,
        lastBeacon: null as Beacon | null,
        beaconList: [] as Beacon[],
        beaconsFound: [] as Beacon[]
    })
});

export interface Beacon {
    id: number,
    name: string,
    nr: number,
    rssi: number,
    time: number,
    // counter: number
}