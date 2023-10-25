import { defineStore } from 'pinia';

export const useSpielStore = defineStore('spielStore', {
  state: () => ({
    flow: 0.0,
    spieler: "",
    ort: "",
    objekt: "000x_ab",
    btTrigger: true,
    kameraTrigger: true,
    hashtags: [
      {nr: 1, text: "kleidermachenleute", eingetragen: false}, 
      {nr: 2, text: "zweiterhashtag", eingetragen: false}
    ]
  })
});