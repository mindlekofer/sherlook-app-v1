<script setup lang="ts">
import { useSpielStore } from '@/stores/SpielStore';
import { ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import BuchButtonComponent from './BuchButtonComponent.vue';
import LupeComponent from './LupeComponent.vue';

const props = defineProps( {
    zahl: {
      type: String,
      default: ''
    },
    bild: {
      type: String,
      default: ''
    },
    hashtag1: {
      type: String,
      default: ''
    },
    hashtag2: {
      type: String,
      default: ''
    },
    abgeschlossen: {
      type: Boolean,
      default: false
    },
    buch: {
      type: Boolean,
      default: false
    },
    gross: {
      type: Boolean,
      default: false
    },
    pulsieren: {
      type: Boolean,
      default: false
    },
    auswahl: {
      type: Boolean,
      default: false
    },
    vordergrund: {
      type: Boolean,
      default: true
    },
    inaktiv: {
      type: Boolean,
      default: false
    },
    hashtag1Rot: {
      type: Boolean,
      default: false
    },
    hashtag2Rot: {
      type: Boolean,
      default: false
    }
  });

  // const emit = defineEmits(['kleine_lupe_clicked']);
  const emit = defineEmits<{
    (e: 'kleine-lupe-clicked') : void,
    (e: 'hashtag-clicked', hinweisNr: number, hashtagNr: number) : void
  }>();

</script>


<template>
  <div class="hinweis_box" 
    :class="{
      'gross':gross, 
      'klein':!gross,
      'auswahl':auswahl,
      'inaktiv':inaktiv,
      'vordergrund':vordergrund || !gross,
      'hintergrund':!(vordergrund || !gross)
      }">
  
    <buch-button-component v-if="buch || gross" 
        class="buch" 
        :zahl="zahl" 
        :class="{'inaktiv':inaktiv}" 
        :lesezeichen1="props.hashtag1!=''"
        :lesezeichen2="props.hashtag2!=''"
        :lesezeichen3="props.abgeschlossen"
    />
    <div class="hashtags" v-if="gross">
      <p @click="$emit('hashtag-clicked', parseInt(zahl), 1)" :class="{'rot':hashtag1Rot}">{{ props.hashtag1 }}&nbsp;</p>
      <p @click="$emit('hashtag-clicked', parseInt(zahl), 2)" :class="{'rot':hashtag2Rot}">{{ props.hashtag2 }}&nbsp;</p>
    </div>
    <lupe-component v-if="!buch"
        class="lupe" 
        :zahl="buch?'':zahl" 
        :class="{'inaktiv':inaktiv,'pulsieren':pulsieren}" 
        :bild="bild" 
        @click="$emit('kleine-lupe-clicked')"
    />
<!-- 
    <lupe-component v-if="props.gross"
      :bild="bild"
    /> -->
  </div>
</template>


<style scoped>
.rot {
  color: rgb(252, 38, 38);
}
.hashtags {
  /* background-color: blue; */
  text-align: left;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-left: 10px;
  /* justify-content: space-around; */
}
.hinweis_box {
  height: 170px;
  /* background-color: #e9e9e9; */
  background-color: #edd9bd;
  margin: 0px 0px 10px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  opacity: 50%;
  z-index: 0;
}
.auswahl {
  /* background-color: #FFF4B6; */
  background-color: #d59a46;
  /* color: rgb(132, 255, 113); */
  opacity: 100%;
}
.auswahl p {
  color: rgb(251, 237, 80);
}
.gross {
  /* width: 95%; */
  width: 75%;
}
.klein {
  width: 180px;
}
.vordergrund {
  opacity: 90%;
  z-index: 10;
}
.hintergrund {
  opacity: 70%;
  z-index: 0;
}
.ausgeblendet {
  display: none;
}
.buch {
  margin-left: 15px;
  flex-grow: 0;
}
.lupe {
  margin-left: 0px;
  flex-grow: 0;
}
p {
  font-size: 24px;
  /* margin-left: 10px; */
  color: rgb(48, 184, 48);
  /* color: rgb(34, 165, 34); */
  font-weight: 700;
  /* margin-top: 10px;
  margin-bottom: 10px; */
  margin: 0px;
}
.inaktiv {
  opacity: 30%;
  z-index: 0;
  background-color: #e9e9e9;
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