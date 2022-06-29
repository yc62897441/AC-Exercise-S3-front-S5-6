<template>
  <div class="row">
    <div class="col-md-12 mb-3">
      <h1>{{ restaurant.name }}</h1>
      <p class="badge bg-secondary mt-1 mb-3">
        {{ restaurant.categoryName }}
      </p>
    </div>
    <div class="col-lg-4">
      <img class="img-responsive center-block" v-bind:src="restaurant.image | emptyImage"
        style="width: 250px;margin-bottom: 25px;">
      <div class="contact-info-wrap">
        <ul class="list-unstyled">
          <li>
            <strong>Opening Hour:</strong>
            {{ restaurant.openingHours }}
          </li>
          <li>
            <strong>Tel:</strong>
            {{ restaurant.tel }}
          </li>
          <li>
            <strong>Address:</strong>
            {{ restaurant.address }}
          </li>
        </ul>
      </div>
    </div>
    <div class="col-lg-8">
      <p> {{ restaurant.description }} </p>
      <router-link class="btn btn-primary btn-border mx-2"
        :to="{ name: 'restaurantDashboard', params: { id: restaurant.id } }">
        Dashboard
      </router-link>

      <button v-if="restaurant.isFavorited" v-on:click="deleteFavorite" type="button"
        class="btn btn-danger btn-border mx-2">
        移除最愛
      </button>
      <button v-else v-on:click="addFavorite" type="button" class="btn btn-primary btn-border mx-2">
        加到最愛
      </button>
      <button v-if="restaurant.isLiked" v-on:click="deleteLike" type="button" class="btn btn-danger like mx-2">
        Unlike
      </button>
      <button v-else v-on:click="addLike" type="button" class="btn btn-primary like mx-2">
        Like
      </button>
    </div>
  </div>
</template>

<script>
import { emptyImage } from '../utils/mixins'

export default {
  props: {
    initialRestaurant: {
      type: Object,
      required: true
    }
  },
  mixins: [emptyImage],
  data() {
    return {
      restaurant: this.initialRestaurant
    }
  },
  methods: {
    addFavorite() {
      this.restaurant = {
        ...this.restaurant,
        isFavorited: true
      }
    },
    deleteFavorite() {
      this.restaurant = {
        ...this.restaurant,
        isFavorited: false
      }
    },
    addLike() {
      this.restaurant = {
        ...this.restaurant,
        isLiked: true
      }
    },
    deleteLike() {
      this.restaurant = {
        ...this.restaurant,
        isLiked: false
      }
    },
  }
}
</script>