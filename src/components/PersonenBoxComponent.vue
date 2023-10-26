<script setup lang="ts">
import { useSpielStore } from '@/stores/SpielStore';
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';

const props = defineProps( {
    name: {
      type: String,
      default: ''
    },
    code: {
      type: String,
      default: ''
    },
    falsch: {
      type: Boolean,
      default: false
    },
    richtig: {
      type: Boolean,
      default: false
    },
    auswahl: {
      type: Boolean,
      default: false
    }
  });

  // const emit = defineEmits(['kleine_lupe_clicked']);
  const emit = defineEmits<{
    (e: 'kleine-lupe-clicked') : void
  }>();

</script>

<template>
  <div class="personen-box" :class="{'auswahl' : auswahl}">
    <img class="person" :src="'assets/personen/'+props.code+'/'+props.code+'_kopf.png'"/>
  </div>
</template>

<style scoped>
.person {
  height: 95%;
}
.personen-box {
  height: 160px;
  width: 160px;
  background-color: #e9e9e9;
  margin: 0px 0px 10px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  border:  8px solid rgb(0,0,0,0.15);
  border-radius: 30px;
  /* border-left: 8px solid rgb(0,0,0,0.15);
  border-top: 8px solid rgb(0,0,0,0.15);
  border-bottom: 8px solid rgb(0,0,0,0.15);
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px; */
  padding-left: 8px;
  padding-right: 12px;
  transform: translateX(0px);
  filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.25));
}
.auswahl {
  background-color: #FFF4B6;
}

.ausgeblendet {
  display: none;
}
.inaktiv {
  opacity: 30%;
}
.pulsieren {
  animation: pulsieren-animation 0.5s ease-in-out infinite alternate;
}
@keyframes pulsieren-animation {
  0% {
    opacity: 100%;
    transform: scale(100%);
  }
  100% {
    /* opacity: 90%; */
    transform: scale(105%);
  }
}
</style>