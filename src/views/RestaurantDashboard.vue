<template>
  <div class="container py-5">
    <div>
      <h1>{{ restaurant.name }}</h1>
      <span class="badge bg-secondary mt-1 mb-3">
        {{ restaurant.Category.name }}
      </span>
    </div>

    <hr>

    <ul>
      <li>評論數： {{ restaurant.Comments.length }} }</li>
      <li>瀏覽次數： {{ restaurant.viewCounts }} }</li>
    </ul>

    <button type="button" class="btn btn-link" @click="$router.back()">
      回上一頁
    </button>
  </div>
</template>

<script>
import restaurantsAPI from '../apis/restaurants'
import { Toast } from '../utils/helpers'

const dummyData = {
  "restaurant": {
    "id": 1,
    "name": "Mrs. Vada Bashirian",
    "tel": "(162) 701-7245 x3719",
    "address": "7666 Jermaine Valley",
    "opening_hours": "08:00",
    "description": "non quidem fuga",
    "image": "https://loremflickr.com/320/240/restaurant,food/?random=44.81530367793509",
    "viewCounts": 1,
    "createdAt": "2022-06-20T05:31:15.000Z",
    "updatedAt": "2022-06-22T04:41:54.000Z",
    "CategoryId": 2,
    "Category": {
      "id": 2,
      "name": "日本料理",
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z"
    },
    "Comments": [
      {
        "id": 1,
        "text": "Aut sit magni eum est aperiam.",
        "UserId": 2,
        "RestaurantId": 1,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "User": {
          "id": 2,
          "name": "user1",
          "email": "user1@example.com",
          "password": "$2a$10$IhTmi90.XsRMetCY/Geuz.bmf5t0/18Z.1JLovAje6SoYZd6xeN0q",
          "isAdmin": false,
          "image": null,
          "createdAt": "2022-06-20T05:31:15.000Z",
          "updatedAt": "2022-06-20T05:31:15.000Z"
        }
      },
      {
        "id": 51,
        "text": "Voluptatem quae cumque.",
        "UserId": 2,
        "RestaurantId": 1,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "User": {
          "id": 2,
          "name": "user1",
          "email": "user1@example.com",
          "password": "$2a$10$IhTmi90.XsRMetCY/Geuz.bmf5t0/18Z.1JLovAje6SoYZd6xeN0q",
          "isAdmin": false,
          "image": null,
          "createdAt": "2022-06-20T05:31:15.000Z",
          "updatedAt": "2022-06-20T05:31:15.000Z"
        }
      },
      {
        "id": 101,
        "text": "Quasi ut deleniti ut ut iusto ad quis maiores.",
        "UserId": 2,
        "RestaurantId": 1,
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z",
        "User": {
          "id": 2,
          "name": "user1",
          "email": "user1@example.com",
          "password": "$2a$10$IhTmi90.XsRMetCY/Geuz.bmf5t0/18Z.1JLovAje6SoYZd6xeN0q",
          "isAdmin": false,
          "image": null,
          "createdAt": "2022-06-20T05:31:15.000Z",
          "updatedAt": "2022-06-20T05:31:15.000Z"
        }
      }
    ]
  }
}
export default {
  data() {
    return {
      restaurant: {
        name: '',
        Category: {
          name: ''
        },
        Comments: [],
        viewCounts: ''
      },
      restaurantId: '',
    }
  },
  methods: {
    // fetchRestaurant() {
    //   this.restaurant = dummyData.restaurant
    // },
    async fetchRestaurant(restaurantId) {
      try {
        const { data } = await restaurantsAPI.getDashboard({ restaurantId })
        this.restaurant = data.restaurant
      } catch (error) {
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: error || '讀取餐廳 Dashboard 失敗，請稍後再試'
        })
      }
    }
  },
  watch: {
    restaurantId(newValue) {
      this.restaurant = {
        ...this.restaurant,
        ...newValue
      }
    }
  },
  // created() {
  //   this.fetchRestaurant()
  // },
  mounted() {
    const { id: restaurantId } = this.$route.params
    this.fetchRestaurant(restaurantId)
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params
    this.fetchRestaurant(id)
    next()
  }
}

</script>