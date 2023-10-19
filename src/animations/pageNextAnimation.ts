import { createAnimation, Animation } from "@ionic/vue";

export const pageNextAnimation = (baseEl:HTMLElement, opts?:any) : Animation => {
  return createAnimation()
    .addElement(opts.enteringEl)
    .duration(250)
    .fromTo('opacity', 0.0, 1.0);
};