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
    gross: {
      type: Boolean,
      default: false
    },
    buch: {
      type: Boolean,
      default: false
    },
    inaktiv: {
      type: Boolean,
      default: false
    },
    auswahl: {
      type: Boolean,
      default: false
    },
    bild: {
      type: String,
      default: ''
    },
    pulsieren: {
      type: Boolean,
      default: false
    },
    hashtag1: {
      type: String,
      default: ''
    },
    hashtag2: {
      type: String,
      default: ''
    }
  });

  // const emit = defineEmits(['kleine_lupe_clicked']);
  const emit = defineEmits<{
    (e: 'kleine-lupe-clicked') : void
  }>();

</script>


<template>
  <div class="hinweis_box" 
    :class="{
      'gross':gross==true, 
      'klein':gross==false,
      'auswahl':auswahl==true}">
  
    <buch-button-component v-if="buch" 
        class="buch" 
        :zahl="zahl" 
        :class="{'inaktiv':inaktiv==true}" 
        :lesezeichen1="props.hashtag1!=''"
        :lesezeichen2="props.hashtag2!=''"
    />
    <lupe-component v-else 
         class="lupe" 
        :zahl="zahl" 
        :class="{'inaktiv'
        :inaktiv==true,'pulsieren':pulsieren==true}" 
        :bild="bild" 
        @click="$emit('kleine-lupe-clicked')"
    />
    <div class="hashtags" :class="{'ausgeblendet':gross==false}">
      <p :class="{'auswahl':auswahl}">{{ props.hashtag1 }}&nbsp;</p>
      <p :class="{'auswahl':auswahl}">{{ props.hashtag2 }}&nbsp;</p>
    </div>
    <div v-if="props.gross">
      <lupe-component
        :bild="bild"
      ></lupe-component>
    </div>
  </div>
</template>


<style scoped>
.hashtags {
  /* background-color: blue; */
  text-align: left;
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
}
.auswahl {
  /* background-color: #FFF4B6; */
  background-color: #d59a46;
  /* color: rgb(132, 255, 113); */
  color: rgb(251, 237, 80);
}
.gross {
  width: 95%;
}
.klein {
  width: 180px;
}
.ausgeblendet {
  display: none;
}
.buch {
  margin-left: 15px;
}
.lupe {
  margin-left: 0px;
}
p {
  font-size: 28px;
  /* margin-left: 10px; */
  color: rgb(48, 184, 48);
  /* color: rgb(34, 165, 34); */
  font-weight: 700;
  /* margin-top: 10px;
  margin-bottom: 10px; */
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