import * as cocoSsd from '@tensorflow-models/coco-ssd'

export let model = null as any;
export let modelGeladen = false;

export function ladeModell() {
    // let model:any = undefined;
    if (!modelGeladen) {
        console.log('loading model...');
        cocoSsd.load().then((loadedModel) => {
            model = loadedModel;
            modelGeladen = true;
            console.log('model loaded');
        });
    } else {
        console.log("Modell bereits geladen.");
    }
}