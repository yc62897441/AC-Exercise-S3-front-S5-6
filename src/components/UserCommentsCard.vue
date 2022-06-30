<template>
  <div class="container my-2">
    <div class="row">
      <h4>
        已評論餐廳數： {{ profileComments.length }}
      </h4>
    </div>
    <div class="row">
      <div v-for="profileComment in profileComments" :key="profileComment.id" class="col-2 mb-3">
        <router-link :to="{ name: 'restaurant', params: { id: profileComment.id } }">
          <img v-bind:src="profileComment.Restaurant.image | emptyImage" width="100px" height="100px">
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImage } from './../utils/mixins'

export default {
  mixins: [emptyImage],
  props: {
    profileComments: {
      type: Array,
      required: true,
      default: () => {
        return []
      }
    }
  }
}
</script>