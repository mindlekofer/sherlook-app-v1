<script setup lang="ts">
    import { IonFabButton, IonIcon} from '@ionic/vue';
    import { createAnimation } from '@ionic/vue';
    import { ref } from 'vue';


    const props = defineProps( {
        pulsiert: {
            type: Boolean,
            default: false
        },
        ausgeblendet: {
            type: Boolean,
            default: false
        }
    });

    const pulsierenAnimation = createAnimation()
            .addElement(document.querySelector('#hilfe-button') as Element)
            .duration(500)
            .iterations(Infinity)
            .fromTo('transform', 'scale(100%)', 'scale(150%)')
            .fromTo('opacity', '1', '0.2');

</script>


<template>
    <ion-fab-button id="hilfe-button" :class="{'pulsieren':pulsiert==true}" color="medium" disabled v-if="ausgeblendet">
        <ion-icon class="button-icon" src="assets/buttons/hilfe.svg"></ion-icon>
    </ion-fab-button>
    <ion-fab-button id="hilfe-button" :class="{'pulsieren':pulsiert==true}" color="warning" v-else>
        <ion-icon class="button-icon" src="assets/buttons/hilfe.svg"></ion-icon>
    </ion-fab-button>
</template>


<style scoped>
#hilfe-button {
    width: 125px;
    height: 125px;
    margin: 30px;
    /* transition: 250ms ease; */
}

.button-icon {
    font-size: 80px;
    color: white; 
}

.pulsieren {
    animation: pulsieren-animation 1s ease-in-out infinite alternate;
}

@keyframes pulsieren-animation {
    100% {
        opacity: 75%;
        transform: scale(110%);
    }
}
</style>