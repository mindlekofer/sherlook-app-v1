<template>
  <div class="modal-wrapper">
    <div class="modal-content">
      <div id="erkannte-kategorie">Obj:{{gesuchtes_objekt}} Kat:{{gesuchte_kategorie}} <br> Det:{{ kategorie }} {{ (wahrscheinlichkeit*100).toFixed(0) }}%</div>
      <div class="objekt-info" v-show="erkennungAktiv">analysiere...</div>
      <div class="faelschung-gefunden" v-show="faelschungGefunden">Gefälscht!</div>
      <div id="kamerabild">
        <svg width="100%" height="100%" id="bbox" v-show="showBbox">
          <rect id="bbox-rect" :x="bbox_x" :y="bbox_y" :width="bbox_width" :height="bbox_height"></rect>
          <text id="bbox-text" :x="bbox_x" :y="bbox_y-10">{{ bbox_class }} {{ bbox_score }}</text>
        </svg>
        <video ref="videoRef" autoplay muted poster="assets/img/lupe_startet.png"></video>            
      </div>
    </div>
    <!-- <div class="modal-control">         -->
      <!-- <ion-button @click="kameraStarten()" :disabled="!modelGeladen">Kamera an</ion-button> -->
      <!-- <ion-button @click="kameraStarten()">Kamera an</ion-button> -->
      <!-- <ion-button @click="kameraSchliessen()">Kamera aus</ion-button> -->
      <!-- <ion-button size="large" v-if="manuelleAufloesung" color="warning" @click="objektIdentifiziert(0, false)">Objektsuche auflösen?</ion-button> -->
      <!-- <span v-else>&nbsp;</span> -->
      <!-- <ion-button size="large" @click="modalSchliessen">zurück zum Spiel</ion-button> -->
      <ButtonZurueckComponent class="button button-zurueck" @click="modalSchliessen"></ButtonZurueckComponent>
      <ButtonWeiterComponent class="button button-weiter" :disabled="!faelschungGefunden" :pulsiert="faelschungGefunden" @click="{spielStore.flow=neuerFlow; modalSchliessen()}"></ButtonWeiterComponent>
    <!-- </div> -->
  </div>
</template>

<style scoped>
.button {
  position: absolute;
  bottom: 30px;
}
.button-zurueck {
  left: 30px;
}
.button-weiter {
  right: 30px;
}
.objekt-info {
  z-index: 99;
  font-size: 50px;
  font-weight: 800;
  top: 100px;
  position: absolute;
  color: rgb(237, 154, 0);
  animation: pulsieren-animation 1s ease-in-out infinite alternate;
}
.faelschung-gefunden {
  z-index: 99;
  font-size: 90px;
  font-weight: 800;
  top: 270px;
  position: absolute;
  color: rgb(237, 0, 0);
  animation: pulsieren-animation 0.15s ease-in-out infinite alternate;
}
#erkannte-kategorie {
  position: absolute;
  z-index: 99;
  left: 10px;
  top: 10px;
  opacity: 20%;
}
.faelschung-lupe {
  border-color: rgb(255, 0, 0);
}
#bbox {
  position: absolute;
  /* background-color: yellow; */
}
#bbox-rect {
  fill: white;
  stroke: yellow;
  stroke-width: 5;
  fill-opacity: 0.5;
  stroke-opacity: 0.9;
}
#bbox-text {
  fill: yellow;
  font-size: large;
}
video {
  /* background-color: brown; */
  width: 100%;
  height: 100%;
}
#kamerabild {
  width: 650px;
  height: 650px;
  /* background-color: blue; */
  display: flex;
  position: relative;
  border-radius: 325px;
  /* border-color: rgb(0, 0, 0); */
  border-width: 70px;
  border-style: solid;
  overflow: hidden;
}
.modal-wrapper {
  padding: 30px;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.modal-wrapper h1 {
  font-size: 24pt;
}
.modal-wrapper .modal-content {
  position: relative;
  font-size: 16pt;
  flex-grow: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.modal-wrapper .modal-control {
  text-align: end;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
@keyframes pulsieren-animation {
  100% {
    opacity: 40%;
  }
}
</style>

<script setup lang="ts">
import { modalController } from '@ionic/core';
import { IonButton, IonToast } from '@ionic/vue';
import { VideoHTMLAttributes, ref } from 'vue';
import { useSpielStore } from '@/stores/SpielStore'
import { useBeaconStore } from '@/stores/BeaconStore';

import { model, modelGeladen, ladeModell } from '../../bilderkennung'

import ButtonWeiterComponent from '../ButtonWeiterComponent.vue';
import ButtonZurueckComponent from '../ButtonZurueckComponent.vue';

import '@tensorflow/tfjs-backend-cpu'
import '@tensorflow/tfjs-backend-webgl'
import * as tf from '@tensorflow/tfjs'
import { flower } from 'ionicons/icons';
// import * as cocoSsd from '@tensorflow-models/coco-ssd'


console.log("opening KameraModal");

const spielStore = useSpielStore();
const beaconStore = useBeaconStore();

// beaconStore.stopBt();

// const beendenHinweisOffen = ref(false);

// const beendeHinweis = (offen : boolean) => {
//     beendenHinweisOffen.value = offen;
// };

// const beenden = () => {
//     console.log("beenden clicked");
//     modalController.dismiss("beenden");
// };

const videoRef = ref<HTMLVideoElement>();
const videoStartet = ref(false);
const videoAktiv = ref(false);
const erkennungAktiv = ref(false);
const modelLoaded = ref(false);
let tfCamera;
let tfCapture;

const manuelleAufloesung = ref(false);
setTimeout(() => {manuelleAufloesung.value = true}, 2*60*1000);

const bbox_x = ref(0);
const bbox_y = ref(0);
const bbox_width = ref(0);
const bbox_height = ref(0);
const bbox_class = ref("");
const bbox_score = ref("");

const faelschungGefunden = ref(false);
const neuerFlow = ref(0);

const showBbox = ref(false);

// let model:any = undefined;
// cocoSsd.load().then(function (loadedModel) {
//     model = loadedModel;
//     console.log('model loaded');
//     modelLoaded.value = true;
// });

const kategorie = ref(0);
const wahrscheinlichkeit = ref(0.0);

const gesuchte_kategorie = ref(0);
const gesuchtes_objekt = ref(0);
if (spielStore.flow == 0.8 && spielStore.ort == 'eg') {
  // gesuchte_kategorie.value = 79;
  gesuchte_kategorie.value = 87;
  neuerFlow.value = 0.9;
} else if (spielStore.flow == 0.8 && spielStore.ort == 'og1') {
  // gesuchte_kategorie.value = 80;
  gesuchte_kategorie.value = 88;
  neuerFlow.value = 0.9;
} else if (spielStore.flow == 1.4) {
  gesuchte_kategorie.value = spielStore.objekte_ort[0].bilderkennung.kategorien[0];
  gesuchtes_objekt.value = spielStore.objekte_ort[0].nr;
  neuerFlow.value = 1.6;
} else if (spielStore.flow == 2.4) {
  gesuchte_kategorie.value = spielStore.objekte_ort[1].bilderkennung.kategorien[0];
  gesuchtes_objekt.value = spielStore.objekte_ort[1].nr;
  neuerFlow.value = 2.6;
} else if (spielStore.flow == 3.4) {
  gesuchte_kategorie.value = spielStore.objekte_ort[2].bilderkennung.kategorien[0];
  gesuchtes_objekt.value = spielStore.objekte_ort[2].nr;
  neuerFlow.value = 3.6;
} else {
  gesuchte_kategorie.value = 0;
  gesuchtes_objekt.value = 0;
}

let cam : any;
let img;
let prediction;
let v;

// Versuch mit Tensorflow Webcam Funktion //
async function tfWebcam() {
  cam = await tf.data.webcam(videoRef.value, { 
      facingMode: 'environment',
      resizeWidth: 224,
      resizeHeight: 224
     });
     tfCapturePredict();
}

async function tfCapturePredict() {
  img = (await cam.capture()).expandDims(0).asType('float32');
  // (await img).print();
  prediction = model.predict(img)  as tf.Tensor;
  v = prediction.argMax().dataSync()[0];
  console.log(v);
  setTimeout(tfCapturePredict, 1000);
}

// Versuch mit Videoelement //
async function videoElementInit() {
  if (!model) {
    console.log('error: no model loaded')
    return;
  }
  videoStartet.value = true;
  await navigator.mediaDevices.getUserMedia({ 
    video: { 
      facingMode: 'environment',
      // frameRate: 10,
      // width: 224,
      // height: 224
      width: 128,
      height: 128
      // width: 400,
      // height: 300
     },
    audio: false })
    .then(function (stream) {
      try {
        if (videoRef.value) {
          videoRef.value.srcObject = stream;
          videoAktiv.value = true;
          console.log('srcObject', videoRef.value.srcObject);
          // videoRef.value.addEventListener('loadeddata', cocoPredict);
          // videoRef.value.addEventListener('loadeddata', getTensor);    // SherLOOK Model
          videoRef.value.addEventListener('loadeddata', onLoadedData);    
        }
      } catch (error) {
        console.log('catch', error);
      }
  });
}

// wird geladen wenn erster Frame verfügbar
function onLoadedData() {
  console.log('loadeddata event');
  setTimeout(predictModel, 1000);     // SherLOOK Model
}

// Versuche mit Tensorflow Webcam Funktionen //
async function getTensor() {
  // tfCamera = await tf.data.webcam(videoRef.value, {resizeHeight: 224, resizeWidth: 224});
  // tfCamera = await tf.data.webcam(videoRef.value);
  // console.log('tfCamera: ', tfCamera);
  // tfCapture = await tfCamera.capture();
  // console.log('tfCapture: ', tfCapture.print());
  // console.log('predict: ', model.predict(tfCapture));
  // predictBild();
  // videoRef.value.addEventListener('loadeddata', predictBild);
  
  // console.log('loadeddata');
  // if (videoRef.value) {
  //     tfCamera = await tf.data.webcam(videoRef.value);
  // }
  // window.requestAnimationFrame(onAnimationFrame);
}

async function predictModel()  {
  console.log('predictModel');
  if (videoRef.value && videoAktiv.value) {
    try {
      // const tensor = tf.browser.fromPixels(videoRef.value).cast('float32');
      // const tensor = tf.browser.fromPixels(videoRef.value);
      const tensor = await tf.browser.fromPixelsAsync(videoRef.value);
      console.log('nach tf.browser.fromPixelsAsync(videoRef.value)');
      // const etensor = tensor.expandDims(0).asType('float32').div(256.0);
      const etensor = tensor.expandDims(0).asType('float32');
      console.log('nach tensor.expandDims(0).asType(float32)');
      // console.log(etensor);
      // const input = tensor.expandDims(0);
      // console.log('predict: ', model.predict(tensor.expandDims(0).toFloat()).argMax(1).dataSync()[0]);
      const prediction = model.predict(etensor) as tf.Tensor;
      console.log('nach model.predict(etensor)');
      // const data = prediction.dataSync();
      const data = await prediction.data();
      console.log('nach prediction.data()');
      const top3 = Array.from(data)
        .map((p, i) => { return { "objekt_nr": i, "wahrscheinlichkeit": p } })
        .sort((a, b) => b.wahrscheinlichkeit - a.wahrscheinlichkeit)
        .slice(0, 3);
      console.log(top3);

      // console.log('data: ', data);
      // const argmax = tf.argMax(data, 0).dataSync()[0];
      const argmax = await tf.argMax(data, 0).data();
      console.log('nach tf.argMax(data, 0).data()');
      kategorie.value = argmax[0];
      const softmax =  await tf.softmax(data).data();
      console.log('nach tf.softmax(data).data()');
      wahrscheinlichkeit.value = softmax[argmax[0]];
      erkennungAktiv.value = true; 
      // argmax.print();
      console.log('argmax: ', argmax)
      console.log('wahrsch.: ', wahrscheinlichkeit.value);

      console.log(tf.memory());

      tensor.dispose();
      etensor.dispose();
      prediction.dispose();

      console.log(tf.memory());

      // console.log('softmax: ', tf.softmax(data));
      // const max = tf.argMax(predictBild, 1);
      // const index = max.get([0]);
      // console.log(predict);
      // console.log('predict: ', model.predict(tensor.expandDims(0)).argMax(1).dataSync()[0]);
      
      if (wahrscheinlichkeit.value >= 0.80 
          && kategorie.value != 0 
          && gesuchte_kategorie.value != 0 
          && kategorie.value == gesuchte_kategorie.value) {
        faelschungGefunden.value = true;
        videoAktiv.value = false;
        erkennungAktiv.value = false;
        videoRef.value?.pause();
      } else {
        window.requestAnimationFrame(predictModel);
      }

    } catch (error) {
      console.log(error);
    }
  } else {
    setTimeout(predictModel, 1000);
  }
}

// Versuche mit CocoSSD Modell //
// async function cocoPredict() {
//   videoStartet.value = false;
//   if (videoAktiv.value) {
//     try {
//       // console.log('image: ', image);

//       cocoModel.detect(videoRef.value).then(function (predictions : any) {
//       // model.predict(videoRef.value).then(function (predictions : any) {
//         console.log('predictions', predictions);
//         if (predictions.length>=1) {
//           bbox_x.value = predictions[0].bbox[0]*2.0;
//           bbox_y.value = predictions[0].bbox[1]*2.0;
//           bbox_width.value = predictions[0].bbox[2]*2.0;
//           bbox_height.value = predictions[0].bbox[3]*2.0;
//           bbox_class.value = predictions[0].class;
//           bbox_score.value = (predictions[0].score*100).toFixed(0)+"%";
//           showBbox.value = true;
//           if (bbox_class.value == 'cup') {
//             modalSchliessen();
//           }
//         } else if (predictions.length == 0) {
//           showBbox.value = false;
//         }
//         // setTimeout(predictWebcam, 100);
//         window.requestAnimationFrame(cocoPredict);
//       });
//       erkennungAktiv.value = true;
//     } catch (error) {
//       console.log('predict error', error);
//     }
//   }
// }

// function objektIdentifiziert(kategorie : number, auswerten = true) {
//   let neuer_flow = 0;
//   if (spielStore.flow==0.8 && spielStore.ort=='eg' && (kategorie==79 || !auswerten) )      // Leiner-Statue
//   neuer_flow = 0.9;
//   else if (spielStore.flow==0.8 && spielStore.ort=='og1' && (kategorie==80 || !auswerten))  // Leiner-Aufsteller
//     neuer_flow = 0.9;
//   else if (spielStore.flow==1.4 && spielStore.ort=='eg' && (kategorie==78 || !auswerten))   // Ichtyosaurier
//     neuer_flow = 1.6;
//   else if (spielStore.flow==1.4 && spielStore.ort=='og1' && (kategorie==74 || !auswerten))  // Haarlocke
//     neuer_flow = 1.6;
//   else if (spielStore.flow==2.4 && spielStore.ort=='eg' && (kategorie==32 || !auswerten))   // Hellebarde
//     neuer_flow = 2.6;
//   else if (spielStore.flow==2.4 && spielStore.ort=='og1' && (kategorie==6 || !auswerten))  // Vorhängeschloss
//     neuer_flow = 2.6;
//   else if (spielStore.flow==3.4 && spielStore.ort=='eg' && (kategorie==12 || !auswerten))   // Kristall
//     neuer_flow = 3.6;
//   else if (spielStore.flow==3.4 && spielStore.ort=='og1' && (kategorie==9 || !auswerten))  // Kelch 
//     neuer_flow = 3.6;
//   return neuer_flow;
// }

// function objektIdentifiziertSubset(kategorie : number, auswerten = true) {
//   let ret = true;
//   if (spielStore.flow==0.8 && spielStore.ort=='eg' && (kategorie==6 || !auswerten) )      // Leiner-Statue
//     spielStore.flow = 0.9;
//   else if (spielStore.flow==0.8 && spielStore.ort=='og1' && (kategorie==7 || !auswerten))  // Leiner-Aufsteller
//     spielStore.flow = 0.88;
//   else if (spielStore.flow==1.4 && spielStore.ort=='eg' && (kategorie==5 || !auswerten))   // Ichtyosaurier
//     spielStore.flow = 1.6;
//   else if (spielStore.flow==1.4 && spielStore.ort=='og1' && (kategorie==1 || !auswerten))  // Haarlocke
//     spielStore.flow = 1.6;
//   else if (spielStore.flow==2.4 && spielStore.ort=='eg' && (kategorie==4 || !auswerten))   // Hellebarde
//     spielStore.flow = 2.6;
//   else if (spielStore.flow==2.4 && spielStore.ort=='og1' && (kategorie==0 || !auswerten))  // Vorhängeschloss
//     spielStore.flow = 2.6;
//   else if (spielStore.flow==3.4 && spielStore.ort=='eg' && (kategorie==3 || !auswerten))   // Kristall
//     spielStore.flow = 3.6;
//   else if (spielStore.flow==3.4 && spielStore.ort=='og1' && (kategorie==2 || !auswerten))  // Kelch 
//     spielStore.flow = 3.6;
//   else
//     ret = false;
//   return ret;
// }

async function modalSchliessen() {
  console.log('modal schliessen');
  await kameraSchliessen();
  // beaconStore.scanBt();
  modalController.dismiss()
}

async function kameraSchliessen() {
  console.log('disableCam pressed');
  videoAktiv.value = false;
  erkennungAktiv.value = false;
  showBbox.value = false;
  // tfCamera.stop();
  if (videoRef.value) {
    // videoRef.value.removeEventListener('loadeddata', predictBild);
    // videoRef.value.removeEventListener('loadeddata', predictModel);    
    videoRef.value.removeEventListener('loadeddata', onLoadedData);    
    erkennungAktiv.value = false;
    if (videoRef.value.srcObject) {
      const tracks = videoRef.value.srcObject.getTracks();
      console.log('tracks: ', tracks);
      tracks.forEach((track : any) => {
        track.stop();
      });
    }
  }
}

videoElementInit();
// tfWebcam();

</script>