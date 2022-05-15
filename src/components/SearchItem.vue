<template>
  <v-col  lg="3" xl="3" md="4" sm="6" cols="12">
    <v-card 
      class="gif column" 
        >
          <img :src="gif.images.fixed_width.url" :alt="gif.slug"> 
          <v-btn 
            depressed
            color="primary"
            @click="shareGif">
            <v-icon>
            mdi-share
            </v-icon>
          </v-btn>    
    </v-card>
  </v-col>
</template>

<script>
    export default {
         name: "SearchItem",
  props: ['gif'],
  data() {
    return {
      url : ''
    }
  },
  methods: {
    shareGif() {
      if (navigator.share) {
        console.log("Congrats! Your browser supports Web Share API")

        navigator.share({
                title: "You've shared this awesome gif",
                text: this.gif.slug,
                url: this.gif.images.fixed_width.url
            })
            .then(function () {
                console.log("Shareing successfull")
            })
            .catch(function (e) {
                console.log(e)
            })

    } else {
        console.log("Sorry! Your browser does not support Web Share API")
    }
    }
  }
    }
</script>

<style lang="scss">
    .v-card.gif {
        position: relative;
        width: 100%;
        height: 250px;
        display: flex;
        align-items: flex-start;
    }
    .gif img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
     
</style>