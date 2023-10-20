<template>
  <div class="modal-wrapper">
    <div class="modal-content">
      <div id="kamerabild">
        <svg width="100%" height="100%" id="bbox" v-show="showBbox">
          <rect id="bbox-rect" :x="bbox_x" :y="bbox_y" :width="bbox_width" :height="bbox_height"></rect>
          <text id="bbox-text" :x="bbox_x" :y="bbox_y-10">{{ bbox_class }} {{ bbox_score }}</text>
        </svg>
        <div id="erkannte-kategorie">{{ kategorie }}<br>{{ wahrscheinlichkeit }}</div>
        <video ref="videoRef" autoplay muted poster="assets/img/detektive/watson_neutral.png"></video>            
      </div>
    </div>

    <div class="modal-control">        
      <!-- <ion-button @click="kameraStarten()" :disabled="!modelGeladen">Kamera an</ion-button> -->
      <!-- <ion-button @click="kameraStarten()">Kamera an</ion-button> -->
      <!-- <ion-button @click="kameraSchliessen()">Kamera aus</ion-button> -->
      <ion-button @click="objektGefunden()">Objekt gefunden</ion-button>
      <ion-button size="large" @click="modalSchliessen">zurück zum Spiel</ion-button>
    </div>
  </div>
</template>

<style scoped>
#erkannte-kategorie {
  position: absolute;
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
  width: 800px;
  height: 600px;
  /* background-color: blue; */
  display: flex;
  position: relative;
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
}

</style>

<script setup lang="ts">
import { modalController } from '@ionic/core';
import { IonButton, IonToast } from '@ionic/vue';
import { VideoHTMLAttributes, ref } from 'vue';
import { useSpielStore } from '@/stores/SpielStore'
import { useBilderStore } from '@/stores/BilderStore';
import { useBeaconStore } from '@/stores/BeaconStore';

import { model, cocoModel, modelGeladen, ladeModell } from '../../bilderkennung'

import '@tensorflow/tfjs-backend-cpu'
import '@tensorflow/tfjs-backend-webgl'
import * as tf from '@tensorflow/tfjs'
// import * as cocoSsd from '@tensorflow-models/coco-ssd'

console.log("opening KameraModal");

const spielStore = useSpielStore();
const bilderStore = useBilderStore();
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

const bbox_x = ref(0);
const bbox_y = ref(0);
const bbox_width = ref(0);
const bbox_height = ref(0);
const bbox_class = ref("");
const bbox_score = ref("");

const showBbox = ref(false);

// let model:any = undefined;
// cocoSsd.load().then(function (loadedModel) {
//     model = loadedModel;
//     console.log('model loaded');
//     modelLoaded.value = true;
// });

const kategorie = ref(0);
const wahrscheinlichkeit = ref('0');

async function kameraStarten() {
  if (!model) {
    console.log('error: no model loaded')
    return;
  }
  videoStartet.value = true;
  await navigator.mediaDevices.getUserMedia({ 
    video: { 
      facingMode: 'environment',
      // frameRate: 10,
      width: 224,
      height: 224
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
          // videoRef.value.addEventListener('loadeddata', predictBild);     // CocoSsd
          videoRef.value.addEventListener('loadeddata', getTensor);    // SherLOOK Model
        }
      } catch (error) {
        console.log('catch', error);
      }
  });
}


async function getTensor() {
  // tfCamera = await tf.data.webcam(videoRef.value, {resizeHeight: 224, resizeWidth: 224});
  // tfCamera = await tf.data.webcam(videoRef.value);
  // console.log('tfCamera: ', tfCamera);
  // tfCapture = await tfCamera.capture();
  // console.log('tfCapture: ', tfCapture.print());
  // console.log('predict: ', model.predict(tfCapture));
  // predictBild();
  // videoRef.value.addEventListener('loadeddata', predictBild);

  console.log('loadeddata');
  // if (videoRef.value) {
  //     tfCamera = await tf.data.webcam(videoRef.value);
  // }
  window.requestAnimationFrame(onAnimationFrame);
}

function onAnimationFrame() {
  console.log('onAnimationFrame');
  if (videoRef.value) {
    try {
      // const tensor = tf.browser.fromPixels(videoRef.value).cast('float32');
      const tensor = tf.browser.fromPixels(videoRef.value);
      // const etensor = tensor.expandDims(0).asType('float32').div(256.0);
      const etensor = tensor.expandDims(0).asType('float32');
      console.log(etensor);
      // const input = tensor.expandDims(0);
      // console.log('predict: ', model.predict(tensor.expandDims(0).toFloat()).argMax(1).dataSync()[0]);
      const prediction = model.predict(etensor) as tf.Tensor;
      const data = prediction.dataSync();
      console.log('data: ', data);
      const argmax = tf.argMax(data, 0).dataSync()[0];
      kategorie.value = argmax;
      wahrscheinlichkeit.value = tf.softmax(data).dataSync()[argmax].toFixed(2);
      // argmax.print();
      console.log('argmax: ', argmax)
      console.log('wahrsch.: ', wahrscheinlichkeit.value);
      // console.log('softmax: ', tf.softmax(data));
      // const max = tf.argMax(predictBild, 1);
      // const index = max.get([0]);
      // console.log(predict);
      // console.log('predict: ', model.predict(tensor.expandDims(0)).argMax(1).dataSync()[0]);
      window.requestAnimationFrame(onAnimationFrame);
    } catch (error) {
      console.log(error);
    }
  }
}

async function kameraSchliessen() {
  console.log('disableCam pressed');
  videoAktiv.value = false;
  erkennungAktiv.value = false;
  showBbox.value = false;
  // tfCamera.stop();
  if (videoRef.value) {
    videoRef.value.removeEventListener('loadeddata', predictBild);
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

async function predictBild() {
  videoStartet.value = false;
  if (videoAktiv.value) {
    try {
      // console.log('image: ', image);

      cocoModel.detect(videoRef.value).then(function (predictions : any) {
      // model.predict(videoRef.value).then(function (predictions : any) {
        console.log('predictions', predictions);
        if (predictions.length>=1) {
          bbox_x.value = predictions[0].bbox[0]*2.0;
          bbox_y.value = predictions[0].bbox[1]*2.0;
          bbox_width.value = predictions[0].bbox[2]*2.0;
          bbox_height.value = predictions[0].bbox[3]*2.0;
          bbox_class.value = predictions[0].class;
          bbox_score.value = (predictions[0].score*100).toFixed(0)+"%";
          showBbox.value = true;
          if (bbox_class.value == 'cup') {
            objektGefunden();
          }
        } else if (predictions.length == 0) {
          showBbox.value = false;
        }
        // setTimeout(predictWebcam, 100);
        window.requestAnimationFrame(predictBild);
      });
      erkennungAktiv.value = true;
    } catch (error) {
      console.log('predict error', error);
    }
  }
}

 async function modalSchliessen() {
  console.log('modal schliessen');
  await kameraSchliessen();
  // beaconStore.scanBt();
  modalController.dismiss()
}

async function objektGefunden() {
  console.log('Objekt gefunden');
  spielStore.flow = 0.87;

  // const camera = await tf.data.webcam(videoRef.value);
  // const image = await camera.capture();
  modalSchliessen();
}

kameraStarten();

</script>