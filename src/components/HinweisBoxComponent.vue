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
        }
    });

</script>


<template>
    <div class="hinweis_box" 
        :class="{
            'gross':gross==true, 
            'klein':gross==false,
            'auswahl':auswahl==true}">
        <buch-button-component :zahl="zahl" class="buch" :class="{'inaktiv':inaktiv==true}" v-if="buch"/>
        <lupe-component :zahl="zahl" class="lupe" :class="{'inaktiv':inaktiv==true}" :bild="bild" v-else />
        <div class="hashtags" :class="{'ausgeblendet':gross==false}">
            <p>#alte_riesenschnecke</p>
            <p>#uhrzeit_aus_der_urzeit</p>
        </div>
        <!-- <div>
            <lupe-component></lupe-component>
        </div> -->
    </div>
</template>


<style scoped>
.hinweis_box {
    height: 170px;
    background-color: #e9e9e9;
    margin: 0px 0px 10px 0px;
    display: flex;
    align-items: center;
    border:  8px solid rgb(0,0,0,0.15);
    border-radius: 30px;
    /* border-left: 8px solid rgb(0,0,0,0.15);
    border-top: 8px solid rgb(0,0,0,0.15);
    border-bottom: 8px solid rgb(0,0,0,0.15);
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px; */
    padding-left: 8px;
    transform: translateX(0px);
}
.hinweis_box_gross {
    height: 170px;
    margin: 0px 0px 10px 0px;
    display: flex;
    align-items: center;
    border: 8px solid rgb(0,0,0,0.15);
    border-radius: 15px;
    padding-left: 8px;
    display: flex;
    }
.auswahl {
    background-color: #FFF4B6;
}
.gross {
    width: 100%;
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
    font-size: 24px;
    margin-left: 50px;
    color: rgb(34, 165, 34);
    font-weight: 600;
    margin-top: 10px;
    margin-bottom: 10px;
}
.inaktiv {
    opacity: 30%;
}
</style>