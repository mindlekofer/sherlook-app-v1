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
            <circle id="Button-Weiter" serif:id="Button Weiter" cx="60.661" cy="60.535" r="60" style="fill:none;"/>
            <clipPath id="_clip1">
                <circle cx="60.661" cy="60.535" r="60"/>
            </clipPath>
            <g clip-path="url(#_clip1)">
                <g>
                    <path d="M87.805,60.381l-36.062,-36.062l-12.226,12.226l36.062,36.062l12.226,-12.226Z" style="fill:#fff;"/>
                    <path d="M87.805,60.689l-36.062,36.062l-12.226,-12.226l36.062,-36.062l12.226,12.226Z" style="fill:#fff;"/>
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