import { defineStore } from 'pinia';
import objektMuster from '@/assets/objekt_muster.json'
import personMuster from '@/assets/person_muster.json'
import { State } from 'ionicons/dist/types/stencil-public-runtime';

export const useSpielStore = defineStore('spielStore', {
  state: () => ({
    flow: 0.0,
    spieler: "",
    ort: "",
    // objekt: "000x_ab",
    btTrigger: true,
    kameraTrigger: true,
    slideNr: 0,
    ermittlungsAuswahl: 0,
    unverdaechtig: [false, false, false],
    verdaechtig: [false, false, false],
    verhaftet: [false, false, false],
    personVerhaftet: "",
    personenReihenfolge: [0,1,2],
    objekte_eg: ['', '', ''],
    objekte_og: ['', '', ''],
    objekte: {
      'eg': [
        objektMuster,
        objektMuster,
        objektMuster
      ],
      'og1': [
        objektMuster,
        objektMuster,
        objektMuster
      ]
    },
    personen_auswahl: {
      'schuldig': '00x0',
      'unschuldig': {
      'watson': ['11x1', '111x'],
      'sherlock': ['111x', 'x111'],
      'enola': ['11x0', '01x1'] 
      }
    },
    person: {
      'schuldig': personMuster,
      'unschuldig': {
        'watson': [
          personMuster,
          personMuster
        ],
        'sherlock': [
          personMuster,
          personMuster
        ],
        'enola': [
          personMuster,
          personMuster
        ]
      }
    }
  }),
  getters: {
    objekte_ort(state) {
      if (state.ort == 'eg') {
        return state.objekte.eg;
      } else if (state.ort == 'og1') {
        return state.objekte.og1;
      } else {
        return [objektMuster, objektMuster, objektMuster];
      }
    },
    objekte_ort_spieler(state) {
      return (nr=0) => {
        if (state.ort == 'eg') {
          if (state.spieler == 'Watson')
            return state.objekte.eg[nr].watson;
          else if (state.spieler == 'Sherlock')
            return state.objekte.eg[nr].sherlock;
          else if (state.spieler == 'Enola')
            return state.objekte.eg[nr].enola;
          else
            return objektMuster.watson
        } else if (state.ort == 'og1') {
          if (state.spieler == 'Watson')
            return state.objekte.og1[nr].watson;
          else if (state.spieler == 'Sherlock')
            return state.objekte.og1[nr].sherlock;
          else if (state.spieler == 'Enola')
            return state.objekte.og1[nr].enola;
          else
            return objektMuster.watson
        } else {
          return objektMuster.watson;
        }
      }
    },
    person_ort_spieler(state) {
      const ausgabe = [personMuster, personMuster, personMuster];
      if (state.spieler == 'Watson') {
        ausgabe[state.personenReihenfolge.indexOf(0)] = state.person.schuldig;
        ausgabe[state.personenReihenfolge.indexOf(1)] = state.person.unschuldig.watson[0];
        ausgabe[state.personenReihenfolge.indexOf(2)] = state.person.unschuldig.watson[1];
      } else if (state.spieler == 'Sherlock') {
        ausgabe[state.personenReihenfolge.indexOf(0)] = state.person.schuldig;
        ausgabe[state.personenReihenfolge.indexOf(1)] = state.person.unschuldig.sherlock[0];
        ausgabe[state.personenReihenfolge.indexOf(2)] = state.person.unschuldig.sherlock[1];
      } else if (state.spieler == 'Enola') {
        ausgabe[state.personenReihenfolge.indexOf(0)] = state.person.schuldig;
        ausgabe[state.personenReihenfolge.indexOf(1)] = state.person.unschuldig.enola[0];
        ausgabe[state.personenReihenfolge.indexOf(2)] = state.person.unschuldig.enola[1];
      }
      return ausgabe;
    }
  }
});