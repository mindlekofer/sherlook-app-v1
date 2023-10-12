<template>
    <div class="modal-wrapper">
        <div class="modal-content">
            <div id="kamerabild">
                <video ref="videoRef" autoplay muted></video>
            </div>
            <!-- <img id="karte" src="assets/img/karte-tutorial.png"/> -->
        </div>

        <div class="modal-control">        
            <ion-button @click="enableCam()">Kamera an</ion-button>
            <ion-button @click="disableCam()">Kamera aus</ion-button>
            <ion-button size="large" @click="modalController.dismiss()">zurück zum Spiel</ion-button>
        </div>
    </div>
</template>

<style scoped>
video {
    background-color: brown;
}
#kamerabild {
    width: 800px;
    height: 600px;
    background-color: blue;
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

import '@tensorflow/tfjs-backend-cpu'
import '@tensorflow/tfjs-backend-webgl'
import * as cocoSsd from '@tensorflow-models/coco-ssd'
import { remove } from 'ionicons/icons';



const spielStore = useSpielStore();

// const beendenHinweisOffen = ref(false);

// const beendeHinweis = (offen : boolean) => {
//     beendenHinweisOffen.value = offen;
// };

// const beenden = () => {
//     console.log("beenden clicked");
//     modalController.dismiss("beenden");
// };



const videoRef = ref<HTMLMediaElement>();
const videoStartet = ref(false);
const videoAktiv = ref(false);
const erkennungAktiv = ref(false);

let model:any = undefined;
cocoSsd.load().then(function (loadedModel) {
    model = loadedModel;
    console.log('model loaded');
});

async function enableCam() {
    if (!model) {
        console.log('error: no model loaded')
        return;
    }
    videoStartet.value = true;
    // console.log('mediaDevices.getUserMedia: ', navigator.mediaDevices.getUserMedia({video: { facingMode: 'environment' }}));
    // console.log('mediaDevices.enumerateDevices: ', navigator.mediaDevices.enumerateDevices());
    await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' }, 
        audio: false })
        .then(function (stream) {
            try {
                if (videoRef.value) {
                    videoRef.value.srcObject = stream;
                    videoAktiv.value = true;
                    console.log('srcObject', videoRef.value.srcObject);
                    videoRef.value.addEventListener('loadeddata', predictWebcam);
                }
            } catch (error) {
                console.log('catch', error);
            }
    });
}

async function disableCam() {
    videoAktiv.value = false;
    erkennungAktiv.value = false;
    if (videoRef.value) {
        videoRef.value.removeEventListener('loadeddata', predictWebcam);
        erkennungAktiv.value = false;
        const tracks = videoRef.value.srcObject?.getTracks();
        console.log('tracks: ', tracks);
        tracks.forEach((track : any) => {
            track.stop();
        });
    }
}

function predictWebcam() {
    if (videoAktiv.value) {
        try {
            model.detect(videoRef.value).then(function (predictions : any) {
                console.log('predictions', predictions);
                window.requestAnimationFrame(predictWebcam);
            });
            erkennungAktiv.value = true;
        } catch (error) {
            console.log('predict error', error);
        }
    }
}


</script>