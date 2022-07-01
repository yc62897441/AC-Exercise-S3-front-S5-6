<template>
  <div class="col-md-6 col-lg-4">
    <div class="card mb-4">
      <img class="card-img-top" v-bind:src="restaurant.image | emptyImage" alt="Card image cap" width="286px"
        height="180px">
      <div class="card-body">
        <p class="card-text title-wrap">
          <router-link :to="{ name: 'restaurant', params: { id: restaurant.id } }">
            {{ restaurant.name }}
          </router-link>>
        </p>
        <span class="badge bg-secondary">{{ restaurant.Category ? restaurant.Category.name : '未分類' }}</span>
        <p class="card-text text-truncate">
          {{ restaurant.description }}
        </p>
      </div>
      <div class="card-footer">
        <button v-if="restaurant.isFavorited" v-on:click.prevent.stop="deleteFavorite(restaurant.id)"
          :disabled="idProcessing" type="button" class="btn btn-danger btn-border favorite mx-2">
          移除最愛
        </button>
        <button v-else v-on:click.prevent.stop="addFavorite(restaurant.id)" :disabled="idProcessing" type="button"
          class="btn btn-primary btn-border favorite mx-2">
          加到最愛
        </button>
        <button v-if="restaurant.isLiked" v-on:click.prevent.stop="deleteLike(restaurant.id)" :disabled="idProcessing"
          type="button" class="btn btn-danger like mx-2">
          Unlike
        </button>
        <button v-else type="button" v-on:click.prevent.stop="addLike(restaurant.id)" :disabled="idProcessing"
          class="btn btn-primary like mx-2">
          Like
        </button>
      </div>
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
      idProcessing: false
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
        this.idProcessing = true
        const { data } = await usersAPI.addFavorite({ restaurantId })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.restaurant = {
          ...this.restaurant,
          isFavorited: true
        }
        this.idProcessing = false
      } catch (error) {
        this.idProcessing = false
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法加到最愛，請稍後再試'
        })
      }
    },
    async deleteFavorite(restaurantId) {
      try {
        this.idProcessing = true
        const { data } = await usersAPI.deleteFavorite({ restaurantId })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.restaurant = {
          ...this.restaurant,
          isFavorited: false
        }
        this.idProcessing = false
      } catch (error) {
        this.idProcessing = false
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法刪除最愛，請稍後再試'
        })
      }
    },
    async addLike(restaurantId) {
      try {
        this.idProcessing = true
        const { data } = await usersAPI.addLike({ restaurantId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.restaurant = {
          ...this.restaurant,
          isLiked: true
        }
        this.idProcessing = false
      } catch (error) {
        this.idProcessing = false
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法like，請稍後再試'
        })
      }
    },
    async deleteLike(restaurantId) {
      try {
        this.idProcessing = true
        const { data } = await usersAPI.deleteLike({ restaurantId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.restaurant = {
          ...this.restaurant,
          isLiked: false
        }
        this.idProcessing = false
      } catch (error) {
        this.idProcessing = false
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法unlike，請稍後再試'
        })
      }
    },
  }
}
</script>

<style scoped>

.badge.badge-secondary {
  padding: 0;
  margin: 8px 0;
  color: #bd2333;
  background-color: transparent;
}

.btn,
.btn-border.btn:hover {
  margin: 7px 14px 7px 0;
}

.card {
  margin-bottom: 2rem !important;
}
.card-img-top {
  background-color: #EFEFEF;
}

.card-body {
  padding: 17.5px;
}

.card-footer {
  padding: 9px 17.5px;
  border-color: rgb(232, 232, 232);
  background: white;
}
</style>