<template>
  <v-row>
    <v-col cols="12" lg="3" md="3" sm="12" xl="3">
      <a href="#"
        class="orange--text nav-link"
      ><img src="../assets/img/logo.png" alt="logo">  SEARCH<br>My gifs</a>
    </v-col>
    <v-col cols="12" lg="9" md="9" sm="12" xl="9">
      <v-text-field
        v-model="search"
        @input="onSearch(search)"
        label="Search"
        outlined
        prepend-inner-icon="mdi-magnify"
        >
       </v-text-field>
    </v-col>
  </v-row>
</template>

<script>

export default {
    data: () => ({
      items: [],
      search: '',
      key: process.env.VUE_APP_GIFKEY,
      random: [],
      showPopup: false
    }),
    methods: {
        onSearch(str) {
          clearTimeout(this.timeout);
            this.timeout = setTimeout( async () => {
              try {
                  await this.makeSearch(str)
              } catch (e) {
                console.log(e)
                this.showPopup = true
              }
          }, 700)
        },
    async makeSearch (str) {
      let items = []
      try {
        let response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${this.key}&q=${str}&limit=36&offset=0&rating=g&lang=en`)
        if (response.status != 200) {
          this.showPopup = true
          return Promise.reject('something went wrong')
        }
        items = (await response.clone().json()).data
        if (items.length === 0){
          this.$emit('search-items', [await this.getRandomGif()])
        } else {
          this.$emit('search-items', items)
        }
      } catch (err) {
          this.showPopup = true
          return Promise.reject('network error')
      }
    },
     async getRandomGif() {
       let items = []
       try {
           let response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${this.key}&q=not+found&limit=36&rating=g&lang=en`)
           if (response.status != 200) {
             this.showPopup = true
              return Promise.reject('something went wrong')
           }
           items = (await response.clone().json()).data
           
           return items[Math.floor(Math.random()*items.length)]
          } catch (err) {
            this.showPopup = true
            return Promise.reject('network error')
          } finally {
          }
      }
    }
  }
</script>

<style lang="scss" scoped>
  a {
    font-weight: bold;
    color: orangered;
    display: inline-flex;
    align-items: center;
    text-decoration: none;
  }
</style>