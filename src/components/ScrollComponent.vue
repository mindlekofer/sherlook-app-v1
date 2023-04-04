<script setup lang="ts">

const props = defineProps ({
    aktiveLupe: {
        type: Number,
        default: 2
    }
});

</script>


<template>
<div>
    <h1>Scrollinhalt!</h1>

    <p>
        Lupe Nr.: {{ props.aktiveLupe }}
    </p>
    
    Dies kommt davon.
</div>
</template>


<style scoped>

</style>