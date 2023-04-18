import { defineStore } from 'pinia';

export const useSpielStore = defineStore('spielStore', {
    state: () => ({
        fortschritt: 0.0,
        spieler: "",
        ort: ""
    })
});