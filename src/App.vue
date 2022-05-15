<template>
  <v-app>
    <div class="wrapper">
      <v-container fluid>
        <AddPWA />
          <SearchBar @search-items="onGifsFetched" />
          <SearchResults :gifs="gifs" />
          <ErrorPopup :visible="showPopup" @close="showPopup=false" />
      </v-container>
    </div>
   
  </v-app>
</template>

<script>

import SearchBar from "./components/SearchBar"
import SearchResults from "./components/SearchResults"
import ErrorPopup from "./components/ErrorPopup"
import AddPWA from "./components/AddPWA";

export default {
  name: 'App',

  components: {
    SearchBar, 
    SearchResults,
    ErrorPopup,
    AddPWA
  },

  data: () => ({
    gifs: [],
    key: process.env.VUE_APP_GIFKEY,
    showPopup: false
  }),
  methods: {
    onGifsFetched(result) {
      this.gifs = result
    }
  },
  async mounted () {
    try {
        let response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${this.key}&limit=36&rating=g&lang=en`)
        if (response.status != 200) {
          this.showPopup = true
          return Promise.reject('something went wrong')
        }
        this.gifs = (await response.clone().json()).data
      } catch (err) {
          this.showPopup = true
          return Promise.reject('network error')
      }
}

};
</script>
<style lang="scss">

.v-card img {
  max-width: 100%;
  display: block;
}
.wrapper {
  max-width: 1920px;
  margin: 0 auto;
  width: 100%;
  background-color: #fefefe;
}
:root {
	--background: #fefefe;
	--bright: #ee6c4d;
	--dark: #3d5a80;
	--darker: #293241;
	--accent: #98c1d9;
}

*,
*:before,
*:after {
	box-sizing: border-box;
	font-family: inherit;
	color: inherit;
	max-width: 100%;
}

*:focus {
	outline: 1px solid var(--dark);
	outline-offset: 1px;
}

*::selection {
	background: var(--accent);
	color: var(--dark);
}

html {
	font-size: 1.125em;
}

body {
	margin: 0;
	background: var(--background);
	color: var(--dark);
	min-height: 100vh;
	min-height: 100vh;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

#app {
	width: 100%;
	min-height: 100vh;
}
</style>