<template>
    <div class="text-center">
    <v-dialog
      width="500"
      v-model="show"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Ooops!
        </v-card-title>

        <v-card-text>
         Something went wrong. <br> Try again later
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            text
            outlined
            @click.stop="show=false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
    export default {
  props: ['visible'],
  computed: {
    show: {
      get () {
        return this.visible
      },
      set (value) {
        if (!value) {
          this.$emit('close')
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>