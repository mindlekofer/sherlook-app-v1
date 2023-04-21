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
                <div class="post-icons">A B C</div>
                <div class="post-follower">42138 Follower</div>
            </div>
            <div class="post-avatar">
                <img src="assets/personen/instagram_1.jpg" />
            </div>
        </div>
        <div class="post-text">
            In den Anblick dieser verschlungenen Ornamente könnte ich mich stundenlang vertiefen und von verwunschenen Gärten und paradiesischen Welten träumen. Wie fantastisch sich diese Ranken verweben und wieder verzweigen. Alles der Natur abgeschaut, dieser fabelhaften und stets aktuellen Künstlerin. Was ich daraus wohl Neues zaubern werde? 
            <br>Abonniert mich und ihr werdet staunen!
            <br><br>
            #kleidermachenleute
        </div>
    </div>
</template>

<style scoped>
    .post-content {
        background-color: black;;
        display: flex;
        flex-direction: column;
        width: 90%;
        margin-bottom: 180px;
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
        color: grey;
    }

</style>

<script setup lang="ts">
</script>