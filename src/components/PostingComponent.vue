

<template>
  <div class="post-content">
    <div class="post-titel">
      <div class="post-avatar">
        <img src="assets/personen/instagram_1.jpg" />
      </div>
      <div class="post-user">elster_funkelglanz</div>
      <div class="post-menu">...</div>
    </div>
    <div class="post-bild">
      <img src="assets/objekte/eg/000x_ab/800x800.jpg" />
    </div>
    <div class="post-bedienung">
      <div class="post-controls">
        <div class="post-icons">
          <ion-icon :icon="heart" color="danger"></ion-icon>
          <ion-icon :icon="chatbubbleOutline"></ion-icon>
          <ion-icon :icon="paperPlaneOutline"></ion-icon>
         </div>
        <div class="post-likes">42138 likes</div>
      </div>
      <div class="post-avatar">
        <img src="assets/personen/instagram_1.jpg" />
      </div>
    </div>
    <div class="post-text">
      In den Anblick dieser verschlungenen Ornamente könnte ich mich stundenlang vertiefen und von verwunschenen Gärten und paradiesischen Welten träumen. Wie fantastisch sich diese Ranken verweben und wieder verzweigen. Alles der Natur abgeschaut, dieser fabelhaften und stets aktuellen Künstlerin. Was ich daraus wohl Neues zaubern werde? 
      <br>Abonniert mich und ihr werdet staunen!
      <br><br>
      <span class="hashtag" :class="hashtagEingetragen ? 'hashtag-eingetragen' : 'hashtag-pulsiert'" @click="onHashtagClick()">#kleidermachenleute</span>
    </div>
  </div>
</template>

<style scoped>
  .post-content {
    background-color: black;;
    display: flex;
    flex-direction: column;
    width: 90%;
    /* margin-bottom: 180px; */
    /* margin-bottom: 0px; */
    color: white;
    box-shadow: 0px 0px 20px grey;
  }
  .post-titel {
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 15px;
  }
  .post-avatar {
    width: 80px;
    height: 80px;
  }
  .post-user {
    flex-grow: 1;
  }
  .post-menu {
    font-weight: bold;
    font-size: 30px;
  }
  .post-avatar img {
    border-radius: 50%;
    border: 5px solid white;
  }
  .post-bild {
    display: flex;
    justify-content: center;
  }
  .post-bild img {
    width: 90%;
  }
  .post-bedienung {
    height: 100px;
    display: flex;
    align-items: center;
    padding: 5%;
  }
  .post-text {
    font-size: 22px;
    padding: 0% 5% 5% 5%;
  }
  .post-controls {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
  }
  .post-icons {
    color: white;
    display: flex;
    gap: 15px;
    margin-bottom: 7px;
    font-size: 38px;
  }
  .post-likes {
    font-size: 16px;
    color: grey;
  }
  .hashtag {
    /* color: yellow; */
    display: inline-block;
    font-weight: bold;
  }

  .hashtag-pulsiert {
    animation: hashtag_pulse 1s ease-in-out alternate-reverse infinite;
  }

  .hashtag-eingetragen {
    color: rgb(79, 215, 79);
    /* transform: translateX(-100px); */
  }

  @keyframes hashtag_pulse {
    0% {
      color: white;
    }
    100% {
      transform: scale(102%);
      color: rgb(229, 220, 35);
    }
  }
</style>

<script setup lang="ts">
import { IonIcon } from '@ionic/vue';
import { heart, chatbubbleOutline, paperPlaneOutline } from 'ionicons/icons';
import { useSpielStore } from '@/stores/SpielStore';
import { ref } from 'vue';

const props = defineProps({
  user: {
    type: String,
    default: "username"
  },
  text: {
    type: String,
    default : "text"
  }
})

const hashtagEingetragen = ref(false);

const spielStore = useSpielStore();



function onHashtagClick() {
  console.log("(PostingComponent) onHashtagClick()");
  hashtagEingetragen.value = true;
}
</script>