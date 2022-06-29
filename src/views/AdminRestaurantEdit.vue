<template>
  <div class="container py-5">
    <AdminRestaurantForm v-bind:initial-restaurant="restaurant" v-bind:is-processing="isProcessing"
      v-on:after-submit="handleAfterSubmit" />
  </div>
</template>

<script>
import AdminRestaurantForm from '../components/AdminRestaurantForm'
import adminAPI from '../apis/admin'
import { Toast } from '../utils/helpers'

const dummyData = {
  'restaurant': {
    'id': 1,
    'name': 'Laurence Reynolds',
    'tel': '1-657-067-3756 x9782',
    'address': '187 Kirlin Squares',
    'opening_hours': '08:00',
    'description': 'sit est mollitia',
    'image': 'https://loremflickr.com/320/240/restaurant,food/?random=91.29816290184887',
    'viewCounts': 1,
    'createdAt': '2019-07-30T16:24:55.432Z',
    'updatedAt': '2019-07-30T17:26:43.260Z',
    'CategoryId': 3,
    'Category': {
      'id': 3,
      'name': '義大利料理',
      'createdAt': '2019-07-30T16:24:55.429Z',
      'updatedAt': '2019-07-30T16:24:55.429Z'
    }
  }
}

export default {
  components: {
    AdminRestaurantForm
  },
  data() {
    return {
      restaurant: {
        id: -1,
        name: '',
        categoryId: '',
        tel: '',
        address: '',
        description: '',
        image: '',
        openingHours: ''
      },
      isProcessing: false
    }
  },
  methods: {
    // fetchRestaurant(restaurantId) {
    //   const { restaurant } = dummyData
    //   this.restaurant = {
    //     ...this.restaurant,
    //     id: restaurant.id,
    //     name: restaurant.name,
    //     categoryId: restaurant.CategoryId,
    //     tel: restaurant.tel,
    //     address: restaurant.address,
    //     description: restaurant.description,
    //     image: restaurant.image,
    //     openingHours: restaurant.opening_hours
    //   },
    // handleAfterSubmit(formData) {
    //   for (let [name, value] of formData.entries()) {
    //     console.log(name, value)
    //   }
    // },
    async fetchRestaurant(restaurantId) {
      try {
        const { data } = await adminAPI.restaurants.getDetail({ restaurantId })
        const { restaurant } = data
        this.restaurant = {
          ...this.restaurant,
          id: restaurant.id,
          name: restaurant.name,
          categoryId: restaurant.CategoryId,
          tel: restaurant.tel,
          address: restaurant.address,
          description: restaurant.description,
          image: restaurant.image,
          openingHours: restaurant.opening_hours
        }
      } catch (error) {
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳資料，請稍後再試'
        })
      }
    },
    async handleAfterSubmit(formData) {
      try {
        this.isProcessing = true
        const { data } = await adminAPI.restaurants.update({ restaurantId: this.restaurant.id, formData })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.$router.push({ name: 'admin-restaurants' })
      } catch (error) {
        this.isProcessing = false
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '123'
        })
      }
    }
  },
  created() {
    const { id } = this.$route.params
    this.fetchRestaurant(id)
  },
  beforeRouteUpdate(to, from, next) {
    const {id} = to.params
    this.fetchRestaurant(id)
    next()
  }
}

</script>