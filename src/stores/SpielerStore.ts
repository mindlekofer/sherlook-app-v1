import { defineStore } from 'pinia';

export const useSpielerStore = defineStore('spielerStore', {
    state: () => ({
        spieler: [
            { id: 0, name: "Watson", level: "leicht"},
            { id: 1, name: "Sherlock", level: "mittel"},
            { id: 2, name: "Enola", level: "schwer"}
        ]
    })
});