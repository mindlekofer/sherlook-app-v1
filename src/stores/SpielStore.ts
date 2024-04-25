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
    aktives_raetsel: 0,
    raetsel: [
      {
        'schuldig': '00x0',
        'unschuldig': {
        'watson': ['11x1', '111x'],
        'sherlock': ['111x', 'x111'],
        'enola': ['11x0', '01x1'] 
        },
        'objekte': {
          'eg': ['00x0_eg_02', 'x0x0_eg_02', '00x1_eg_ab'],
          'og1': ['001x_og1_ab', '00x0_og1_ac', '10x0_og1_bc']
        } 
      },
      {
        'schuldig': '011x',
        'unschuldig': {
        'watson': ['100x', 'x001'],
        'sherlock': ['x001', '10x0'],
        'enola': ['110x', '000x'] 
        },
        'objekte': {
          'eg': ['111x_eg_bc', '01x1_eg_ab', '001x_eg_ac'],
          'og1': ['01xx_og1_01', 'x11x_og1_02', '0x1x_og1_01']
        } 
      },
      {
        'schuldig': '101x',
        'unschuldig': {
        'watson': ['010x', 'x100'],
        'sherlock': ['x100', '01x1'],
        'enola': ['011x', '000x'] 
        },
        'objekte': {
          'eg': ['00xx_eg_01', '10x1_eg_ac', 'x010_eg_ab'],
          'og1': ['00xx_og1_01', 'x11x_og1_02', '0x1x_og1_02']
        } 
      },
      {
        'schuldig': 'x101',
        'unschuldig': {
        'watson': ['x010', '001x'],
        'sherlock': ['001x', '00x0'],
        'enola': ['01x0', '000x'] 
        },
        'objekte': {
          'eg': ['x1x1_eg_01', 'x101_eg_ab', 'x001_eg_bc'],
          'og1': ['xx01_og1_01', 'x101_og1_ab', 'x101_og1_ac']
        } 
      },
      {
        'schuldig': '11x1',
        'unschuldig': {
        'watson': ['00x0', '001x'],
        'sherlock': ['001x', 'x000'],
        'enola': ['00x1', '10x0'] 
        },
        'objekte': {
          'eg': ['111x_eg_ab', '11x1_eg_ac', '01x1_eg_bc'],
          'og1': ['111x_og1_ab', '1xx1_og1_01', '11x1_og1_bc']
        } 
      }
    ],
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