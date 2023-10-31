import * as cocoSsd from '@tensorflow-models/coco-ssd'
import { loadLayersModel, loadGraphModel, GraphModel, LayersModel  } from '@tensorflow/tfjs';

export let model : GraphModel;
// export let model : LayersModel;
export let cocoModel = null as any;
export let modelGeladen = false;

export async function ladeModell() {
  // let model:any = undefined;
  if (!modelGeladen) {
    console.log('loading model...');

    // model = await loadGraphModel('assets/tensorflow/rosgarten_model/model.json');
    // model = await loadGraphModel('assets/tensorflow/model_subset/model.json');
    // model = await loadLayersModel('assets/tensorflow/model_subset/model.json');
    // model = await loadLayersModel('assets/tensorflow/rosgarten_transfer_subset_js/model.json');
    model = await loadGraphModel('assets/tensorflow/rosgarten_transfer_subset_js_graph/model.json');
    // model = await loadGraphModel('assets/tensorflow/rosgarten_transfer_v1_js_graph/model.json');
    console.log('model loaded');
    modelGeladen = true;
  } else {
    console.log("Modell bereits geladen.");
  }
}

export async function ladeCocoModel() {
  if (!modelGeladen) {
    console.log('lade CocoSSD Modell');
    cocoSsd.load().then((loadedModel) => {
      cocoModel = loadedModel;
      modelGeladen = true;
      console.log('cocoSsd Modell geladen');
    });
  } else {
    console.log('Modell bereits geladen');
  }
}