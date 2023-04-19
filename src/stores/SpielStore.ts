import { defineStore } from 'pinia';

export const useSpielStore = defineStore('spielStore', {
    state: () => ({
        flow: 0.0,
        spieler: "",
        ort: "",
        objekt: "000x_ab"
    })
});