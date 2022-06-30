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

      <button v-if="restaurant.isFavorited" v-on:click="deleteFavorite(restaurant.id)" :disabled="isProcessing"
        type="button" class="btn btn-danger btn-border mx-2">
        移除最愛
      </button>
      <button v-else v-on:click="addFavorite(restaurant.id)" :disabled="isProcessing" type="button"
        class="btn btn-primary btn-border mx-2">
        加到最愛
      </button>
      <button v-if="restaurant.isLiked" v-on:click="deleteLike(restaurant.id)" :disabled="isProcessing" type="button"
        class="btn btn-danger like mx-2">
        Unlike
      </button>
      <button v-else v-on:click="addLike(restaurant.id)" :disabled="isProcessing" type="button"
        class="btn btn-primary like mx-2">
        Like
      </button>
    </div>
  </div>
</template>

<script>
import { emptyImage } from '../utils/mixins'
import usersAPI from '../apis/users'
import { Toast } from '../utils/helpers'

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
      restaurant: this.initialRestaurant,
      isProcessing: false
    }
  },
  watch: {
    initialRestaurant(newValue) {
      this.restaurant = {
        ...this.restaurant,
        ...newValue
      }
    }
  },
  methods: {
    // addFavorite() {
    //   this.restaurant = {
    //     ...this.restaurant,
    //     isFavorited: true
    //   }
    // },
    // deleteFavorite() {
    //   this.restaurant = {
    //     ...this.restaurant,
    //     isFavorited: false
    //   }
    // },
    // addLike() {
    //   this.restaurant = {
    //     ...this.restaurant,
    //     isLiked: true
    //   }
    // },
    // deleteLike() {
    //   this.restaurant = {
    //     ...this.restaurant,
    //     isLiked: false
    //   }
    // },
    async addFavorite(restaurantId) {
      try {
        this.isProcessing = true

        const { data } = await usersAPI.addFavorite({ restaurantId })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.restaurant = {
          ...this.restaurant,
          isFavorited: true
        }

        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法加入最愛，請稍後再試'
        })
      }
    },
    async deleteFavorite(restaurantId) {
      try {
        this.isProcessing = true

        const { data } = await usersAPI.deleteFavorite({ restaurantId })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.restaurant = {
          ...this.restaurant,
          isFavorited: false
        }

        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法刪除最愛，請稍後再試'
        })
      }
    },
    async addLike(restaurantId) {
      try {
        this.isProcessing = true
        const { data } = await usersAPI.addLike({ restaurantId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.restaurant = {
          ...this.restaurant,
          isLiked: true
        }
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法Like，請稍後再試'
        })
      }
    },
    async deleteLike(restaurantId) {
      try {
        this.isProcessing = true
        const { data } = await usersAPI.deleteLike({ restaurantId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.restaurant = {
          ...this.restaurant,
          isLiked: false
        }
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法Dislike，請稍後再試'
        })
      }
    },
  }
}
</script>