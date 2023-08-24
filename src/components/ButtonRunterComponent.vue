<script setup lang="ts">
    import { IonFabButton } from '@ionic/vue';

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

</script>


<template>
    <ion-fab-button :class="{'pulsieren':pulsiert==true}" color="success">
        <svg width="100%" height="100%" viewBox="0 0 121 121" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
            <circle id="Button-Runter" serif:id="Button Runter" cx="60.889" cy="60.535" r="60" style="fill:none;"/>
            <clipPath id="_clip1">
                <circle cx="60.889" cy="60.535" r="60"/>
            </clipPath>
            <g clip-path="url(#_clip1)">
                <g>
                    <path d="M61.012,65.506l28.965,-28.964l-7.82,-7.82l-28.964,28.965l7.819,7.819Z" style="fill:#fff;"/>
                    <path d="M61.012,98.497l28.965,-28.964l-7.82,-7.82l-28.964,28.965l7.819,7.819Z" style="fill:#fff;"/>
                    <path d="M60.765,65.506l-28.964,-28.964l7.819,-7.82l28.965,28.965l-7.82,7.819Z" style="fill:#fff;"/>
                    <path d="M60.765,98.497l-28.964,-28.964l7.819,-7.82l28.965,28.965l-7.82,7.819Z" style="fill:#fff;"/>
                </g>
            </g>
        </svg>
    </ion-fab-button>
</template>


<style scoped>
ion-fab-button {
    width: 120px;
    height: 120px;
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