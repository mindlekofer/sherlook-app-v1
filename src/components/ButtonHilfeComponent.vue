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
    <ion-fab-button :class="{'pulsieren':pulsiert==true}" color="warning">
        <svg width="100%" height="100%" viewBox="0 0 121 121" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.5;">
            <circle id="Button-Hilfe" serif:id="Button Hilfe" cx="60.206" cy="60.535" r="60" style="fill:none;"/>
            <clipPath id="_clip1">
                <circle cx="60.206" cy="60.535" r="60"/>
            </clipPath>
            <g clip-path="url(#_clip1)">
                <circle cx="60.206" cy="91.856" r="9.5" style="fill:#fff;"/>
                <path d="M60.206,82.356c5.243,0 9.5,4.257 9.5,9.5c-0,5.244 -4.257,9.5 -9.5,9.5c-5.243,0 -9.5,-4.256 -9.5,-9.5c-0,-5.243 4.257,-9.5 9.5,-9.5Zm-0,14c2.484,0 4.5,-2.016 4.5,-4.5c-0,-2.483 -2.016,-4.5 -4.5,-4.5c-2.484,0 -4.5,2.017 -4.5,4.5c-0,2.484 2.016,4.5 4.5,4.5Z" style="fill:#fff;"/>
                <path d="M36.206,35.049c11.524,-13.515 30.746,-17.27 39,-5.207c9.295,13.583 -15,33.713 -15,44.342" style="fill:none;stroke:#fff;stroke-width:14px;"/>
            </g>
        </svg>
    </ion-fab-button>
</template>


<style scoped>
ion-fab-button {
    width: 120px;
    height: 120px;
    margin: 5px;
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