import { defineStore } from 'pinia';
import { ScanResult } from '@capacitor-community/bluetooth-le';

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
                ort: "unbekannt",
                rssi: 0,
                time: 0,
                counter: 0
            },
            {
                id: 2,
                ort: "unbekannt",
                rssi: 0,
                time: 0,
                counter: 0
            },
            {
                id: 3,
                ort: "unbekannt",
                rssi: 0,
                time: 0,
                counter: 0
            },
            {
                id: 4,
                ort: "unbekannt",
                rssi: 0,
                time: 0,
                counter: 0
            },
            {
                id: 5,
                ort: "unbekannt",
                rssi: 0,
                time: 0,
                counter: 0
            },
            {
                id: 6,
                ort: "unbekannt",
                rssi: 0,
                time: 0,
                counter: 0
            },
            {
                id: 7,
                ort: "unbekannt",
                rssi: 0,
                time: 0,
                counter: 0
            }
        ]
    })
});

export interface Beacon {
    id: number,
    rssi: number,
    time: number,
    name?: string,
    ort?: string,
    counter?: number
}