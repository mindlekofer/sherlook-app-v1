import { createAnimation, Animation } from "@ionic/vue";

export const pulsateAnimation = (baseEl:HTMLElement, opts?:any) : Animation => {
  return createAnimation()
    .addElement(opts.enteringEl)
    .duration(500)
    .fromTo('opacity', 0.0, 1.0);
};