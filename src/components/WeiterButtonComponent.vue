<script setup lang="ts">
    import { IonFabButton, IonIcon} from '@ionic/vue';

</script>

<template>
    <ion-fab-button class="round-button" color="success">
        <ion-icon class="button-icon" src="assets/buttons/pfeil_weiter.svg"></ion-icon>
    </ion-fab-button>
</template>


<style scoped>
.round-button {
    width: 125px;
    height: 125px;
    margin: 30px;
}
.button-icon {
    font-size: 72px;
}
</style>