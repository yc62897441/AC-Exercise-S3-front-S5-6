<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">
      人氣餐廳
    </h1>

    <hr>
    <div v-for="restaurant in restaurants" class="card mb-3" style="max-width: 540px;margin: auto;">
      <div class="row no-gutters">
        <div class="col-md-4">
          <router-link :to="{ name: 'restaurant', params: { id: restaurant.id } }">
            <img class="card-img" v-bind:src="restaurant.image | emptyImage">
          </router-link>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">
              {{ restaurant.name }}
            </h5>
            <span class="badge bg-secondary">收藏數：{{ restaurant.FavoriteCount }}</span>
            <p class="card-text">
              {{ restaurant.description }}
            </p>
            <router-link :to="{ name: 'restaurant', params: { id: restaurant.id } }" class="btn btn-primary mx-2">
              Show
            </router-link>

            <button v-if="restaurant.isFavorited" v-on:click="deleteFavorite(restaurant.id)" type="button"
              class="btn btn-danger mx-2">
              移除最愛
            </button>
            <button v-else v-on:click="addFavorite(restaurant.id)" type="button" class="btn btn-primary mx-2">
              加到最愛
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavTabs from '../components/NavTabs'
import { emptyImage } from './../utils/mixins'
import restaurantsAPI from '../apis/restaurants'
import usersAPI from '../apis/users'
import { Toast } from '../utils/helpers'


const dummyData = {
  "restaurants": [
    {
      "id": 50,
      "name": "Ewell Johnson PhD",
      "tel": "(551) 515-6373 x60014",
      "address": "8432 Klein Crossroad",
      "opening_hours": "08:00",
      "description": "Asperiores ipsum placeat sapiente. Rerum voluptas ",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=34.434320208565204",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 5,
      "FavoritedUsers": [],
      "isFavorited": false,
      "FavoriteCount": 0
    },
    {
      "id": 49,
      "name": "Maia Jacobson",
      "tel": "034.503.7173 x918",
      "address": "16626 Witting Fork",
      "opening_hours": "08:00",
      "description": "Laudantium odit quia nihil est aut ab hic. Consequ",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=28.706470637722916",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 1,
      "FavoritedUsers": [],
      "isFavorited": false,
      "FavoriteCount": 0
    },
    {
      "id": 48,
      "name": "Dr. Rebecca Homenick",
      "tel": "662-737-7226 x5159",
      "address": "5274 Kertzmann Square",
      "opening_hours": "08:00",
      "description": "nostrum",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=1.7503294003570868",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 1,
      "FavoritedUsers": [],
      "isFavorited": false,
      "FavoriteCount": 0
    },
    {
      "id": 47,
      "name": "Ms. Clay Conroy",
      "tel": "130-647-8796",
      "address": "8532 Katelin Pike",
      "opening_hours": "08:00",
      "description": "sapiente aut sapiente",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=86.91999234236087",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 4,
      "FavoritedUsers": [],
      "isFavorited": false,
      "FavoriteCount": 0
    },
    {
      "id": 46,
      "name": "Kayli Hermiston",
      "tel": "1-542-411-7545",
      "address": "198 Cordelia Mountains",
      "opening_hours": "08:00",
      "description": "Aliquam quia eaque maiores qui eos laboriosam tota",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=2.7588268148152295",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 4,
      "FavoritedUsers": [],
      "isFavorited": false,
      "FavoriteCount": 0
    },
    {
      "id": 45,
      "name": "Eino Senger",
      "tel": "(443) 287-9815",
      "address": "3292 Zulauf Park",
      "opening_hours": "08:00",
      "description": "dolorem quia et",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=90.18421729298186",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 4,
      "FavoritedUsers": [],
      "isFavorited": false,
      "FavoriteCount": 0
    },
    {
      "id": 44,
      "name": "Lorena Cartwright",
      "tel": "657-899-7335",
      "address": "00644 Suzanne Union",
      "opening_hours": "08:00",
      "description": "Illo voluptatem doloribus tempora eos velit est si",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=69.20476401452242",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 1,
      "FavoritedUsers": [],
      "isFavorited": false,
      "FavoriteCount": 0
    },
    {
      "id": 43,
      "name": "Izaiah Ratke",
      "tel": "297.121.9154",
      "address": "47308 Barry Place",
      "opening_hours": "08:00",
      "description": "Quae quo ea ut. Molestiae consectetur voluptas ven",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=24.119200159466338",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 5,
      "FavoritedUsers": [],
      "isFavorited": false,
      "FavoriteCount": 0
    },
    {
      "id": 42,
      "name": "Kyla Prohaska MD",
      "tel": "770-731-9172 x267",
      "address": "44827 Senger Manors",
      "opening_hours": "08:00",
      "description": "Qui eos distinctio temporibus qui dignissimos. Del",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=21.786546694169708",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 1,
      "FavoritedUsers": [],
      "isFavorited": false,
      "FavoriteCount": 0
    },
    {
      "id": 41,
      "name": "Grady Murphy",
      "tel": "687-943-9633 x942",
      "address": "541 Osinski Springs",
      "opening_hours": "08:00",
      "description": "magnam at soluta",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=14.988669917230911",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 5,
      "FavoritedUsers": [],
      "isFavorited": false,
      "FavoriteCount": 0
    }
  ]
}

export default {
  mixins: [emptyImage],
  components: {
    NavTabs,
  },
  data() {
    return {
      restaurants: []
    }
  },
  methods: {
    // fetchRestaurants() {
    //   this.restaurants = dummyData.restaurants
    // },
    // addFavorite(restaurantId) {
    //   this.restaurants.forEach(restaurant => {
    //     if (restaurant.id === restaurantId) {
    //       restaurant.isFavorited = true
    //     }
    //   })
    // },
    // deleteFavorite(restaurantId) {
    //   this.restaurants.forEach(restaurant => {
    //     if (restaurant.id === restaurantId) {
    //       restaurant.isFavorited = false
    //     }
    //   })
    // },
    async fetchRestaurants() {
      try {
        const { data } = await restaurantsAPI.getTopRestaurants()
        this.restaurants = data.restaurants
      } catch (error) {
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法取得人氣餐廳，請稍後再試'
        })
      }
    },
    async addFavorite(restaurantId) {
      try {
        const { data } = await usersAPI.addFavorite({ restaurantId })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.restaurants.forEach(restaurant => {
          if (restaurant.id === restaurantId) {
            restaurant.isFavorited = true
            restaurant.FavoriteCount += 1
          }
        })
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法加到最愛，請稍後再試'
        })
      }
    },
    async deleteFavorite(restaurantId) {
      try {
        const { data } = await usersAPI.deleteFavorite({ restaurantId })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.restaurants.forEach(restaurant => {
          if (restaurant.id === restaurantId) {
            restaurant.isFavorited = false
            restaurant.FavoriteCount -= 1
          }
        })
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法加到最愛，請稍後再試'
        })
      }
    }
  },
  created() {
    this.fetchRestaurants()
  }
}
</script>