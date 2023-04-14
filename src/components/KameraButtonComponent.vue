<script setup lang="ts">

const props = defineProps({
        stufe: Number
    });

</script>

<template>
    <div>
        <svg width="100%" height="100%" viewBox="0 0 125 125" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;">
            <rect id="KameraButton" x="0" y="0" width="125" height="125" style="fill:none;"/>
            <g id="KameraButton1" serif:id="KameraButton">
                <g>
                    <path d="M92.5,30.931c-0,-4.002 -3.249,-7.25 -7.25,-7.25l-45.5,-0c-4.001,-0 -7.25,3.248 -7.25,7.25l-0,14.5c-0,4.001 3.249,7.25 7.25,7.25l45.5,-0c4.001,-0 7.25,-3.249 7.25,-7.25l-0,-14.5Z"/>
                    <path d="M113,53.965c0,-8.711 -7.073,-15.784 -15.785,-15.784l-69.43,-0c-8.712,-0 -15.785,7.073 -15.785,15.784l-0,31.57c-0,8.711 7.073,15.784 15.785,15.784l69.43,0c8.712,0 15.785,-7.073 15.785,-15.784l0,-31.57Z"/>
                    <path d="M32.5,38.181l-0,-7.25c-0,-4.002 3.249,-7.25 7.25,-7.25l45.5,-0c4.001,-0 7.25,3.248 7.25,7.25l0,7.25l4.715,-0c8.712,-0 15.785,7.073 15.785,15.784l0,31.57c0,8.711 -7.073,15.784 -15.785,15.784l-69.43,0c-8.712,0 -15.785,-7.073 -15.785,-15.784l0,-31.57c0,-8.711 7.073,-15.784 15.785,-15.784l4.715,-0Z" style="fill:none;stroke:#fff;stroke-width:1.5px;"/>
                    <circle cx="62.5" cy="69.75" r="19.931" style="fill:#fff;"/>
                </g>
            </g>
        </svg>
    </div>
</template>

<style scoped>
svg {
    width: 140px;
    height: 140px;
    filter: drop-shadow(3px 5px 5px rgb(0 0 0 / 0.4));
}

</style>