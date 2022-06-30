<template>
  <div class="container my-2">
    <div class="row">
      <h4>
        收藏餐廳數： {{ profileFavoritedRestaurants.length }}
      </h4>
    </div>
    <div class="row">
      <div v-for="profileFavoritedRestaurant in profileFavoritedRestaurants" :key="profileFavoritedRestaurant.id"
        class="col-2 mb-3">
        <router-link :to="{ name: 'restaurant', params: { id: profileFavoritedRestaurant.id } }">
          <img v-bind:src="profileFavoritedRestaurant.image | emptyImage" width="100px" height="100px">
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
    profileFavoritedRestaurants: {
      type: Array,
      required: true,
      default: () => {
        return []
      }
    }
  }
}
</script>