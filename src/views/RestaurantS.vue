<template>
  <div class="container py-5">
    <NavTabs />

    <!-- 餐廳類別標籤 RestaurantsNavPills -->
    <RestaurantsNavPills v-bind:categories="categories" />

    <div class="row">
      <!-- 餐廳卡片 RestaurantCard-->
      <RestaurantCard v-for="restaurant in restaurants" :key="restaurant.id" v-bind:initial-restaurant="restaurant" />
    </div>

    <!-- 分頁標籤 RestaurantPagination -->
    <RestaurantsPagination v-bind:category-id="categoryId" v-bind:current-page="currentPage"
      v-bind:total-page="totalPage" v-bind:previous-page="previousPage" v-bind:next-page="nextPage" />

  </div>
</template>

<script>
import NavTabs from '../components/NavTabs'
import RestaurantCard from '../components/RestaurantCard'
import RestaurantsNavPills from '../components/RestaurantsNavPills'
import RestaurantsPagination from '../components/RestaurantsPagination'
import restaurantsAPI from '../apis/restaurants'
import { Toast } from '../utils/helpers'

const dummyData = {
  "restaurants": [
    {
      "id": 1,
      "name": "Mrs. Vada Bashirian",
      "tel": "(162) 701-7245 x3719",
      "address": "7666 Jermaine Valley",
      "opening_hours": "08:00",
      "description": "non quidem fuga",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=44.81530367793509",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 2,
      "Category": {
        "id": 2,
        "name": "日本料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      },
      "isFavorited": false,
      "isLiked": false
    },
    {
      "id": 2,
      "name": "Christiana Durgan III",
      "tel": "899-746-0707 x6948",
      "address": "67338 Vicenta Lock",
      "opening_hours": "08:00",
      "description": "Non itaque autem et eum officia sint adipisci et r",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=13.263135072849197",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 3,
      "Category": {
        "id": 3,
        "name": "義大利料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      },
      "isFavorited": false,
      "isLiked": false
    },
    {
      "id": 3,
      "name": "Rogelio Breitenberg",
      "tel": "(095) 373-4184",
      "address": "84682 Sanford Plaza",
      "opening_hours": "08:00",
      "description": "Qui provident esse laborum.\nUllam commodi aliquid ",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=61.881670455990175",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 2,
      "Category": {
        "id": 2,
        "name": "日本料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      },
      "isFavorited": false,
      "isLiked": false
    },
    {
      "id": 4,
      "name": "Marcel Heidenreich",
      "tel": "709.374.3409 x68403",
      "address": "598 Paxton Estates",
      "opening_hours": "08:00",
      "description": "Nisi dolore aperiam voluptatem error velit aperiam",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=43.26753214363208",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 1,
      "Category": {
        "id": 1,
        "name": "中式料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      },
      "isFavorited": false,
      "isLiked": false
    },
    {
      "id": 5,
      "name": "Martine Barton",
      "tel": "901.775.1234 x3946",
      "address": "7472 Dave Lodge",
      "opening_hours": "08:00",
      "description": "Accusamus quia nam voluptatem saepe cum quas sit u",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=82.10807723834208",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 2,
      "Category": {
        "id": 2,
        "name": "日本料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      },
      "isFavorited": false,
      "isLiked": false
    },
    {
      "id": 6,
      "name": "Sydni Mosciski",
      "tel": "979.275.0174 x67853",
      "address": "071 Nitzsche Overpass",
      "opening_hours": "08:00",
      "description": "Cupiditate qui vero qui. Cupiditate sunt est at. N",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=62.58758396282473",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 3,
      "Category": {
        "id": 3,
        "name": "義大利料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      },
      "isFavorited": false,
      "isLiked": false
    },
    {
      "id": 7,
      "name": "Finn Feest",
      "tel": "(062) 740-0562",
      "address": "1494 Rosamond Curve",
      "opening_hours": "08:00",
      "description": "Placeat voluptas sed voluptatibus est voluptas.\nQu",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=56.105367425145204",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 5,
      "Category": {
        "id": 5,
        "name": "素食料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      },
      "isFavorited": false,
      "isLiked": false
    },
    {
      "id": 8,
      "name": "Mr. Billie Dickens",
      "tel": "567.871.4297",
      "address": "9765 Ernser Ranch",
      "opening_hours": "08:00",
      "description": "Ipsum deleniti rem quod assumenda sint qui animi.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=69.4698679315173",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 5,
      "Category": {
        "id": 5,
        "name": "素食料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      },
      "isFavorited": false,
      "isLiked": false
    },
    {
      "id": 9,
      "name": "Efren McKenzie",
      "tel": "063-822-2528",
      "address": "645 Streich Crest",
      "opening_hours": "08:00",
      "description": "Doloremque quis quo maxime sit. Ut dignissimos non",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=9.272782134327207",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 3,
      "Category": {
        "id": 3,
        "name": "義大利料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      },
      "isFavorited": false,
      "isLiked": false
    },
    {
      "id": 10,
      "name": "Anahi Witting",
      "tel": "1-860-032-1115 x636",
      "address": "641 Dagmar Mountains",
      "opening_hours": "08:00",
      "description": "Natus ea est sit voluptas qui.",
      "image": "https://loremflickr.com/320/240/restaurant,food/?random=18.034580646284716",
      "viewCounts": 0,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "CategoryId": 2,
      "Category": {
        "id": 2,
        "name": "日本料理",
        "createdAt": "2022-06-20T05:31:15.000Z",
        "updatedAt": "2022-06-20T05:31:15.000Z"
      },
      "isFavorited": false,
      "isLiked": false
    }
  ],
  "categories": [
    {
      "id": 1,
      "name": "中式料理",
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z"
    },
    {
      "id": 2,
      "name": "日本料理",
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z"
    },
    {
      "id": 3,
      "name": "義大利料理",
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z"
    },
    {
      "id": 4,
      "name": "墨西哥料理",
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z"
    },
    {
      "id": 5,
      "name": "素食料理",
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z"
    },
    {
      "id": 6,
      "name": "美式料理",
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z"
    },
    {
      "id": 7,
      "name": "複合式料理",
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z"
    }
  ],
  "categoryId": "",
  "page": 1,
  "totalPage": [
    1,
    2,
    3,
    4,
    5
  ],
  "prev": 1,
  "next": 2
}

export default {
  components: {
    NavTabs,
    RestaurantCard,
    RestaurantsNavPills,
    RestaurantsPagination
  },
  data() {
    return {
      restaurants: [],
      categories: [],
      categoryId: -1,
      currentPage: 1,
      totalPage: [],
      previousPage: -1,
      nextPage: -1
    }
  },
  methods: {
    // 使用 dummydata 測試的寫法
    // fetchRestaurants() {
    //   const { restaurants, categories, categoryId, page, totalPage, prev, next } = dummyData
    //   this.restaurants = restaurants
    //   this.categories = categories
    //   this.categoryId = categoryId
    //   this.currentPage = page
    //   this.totalPage = totalPage
    //   this.previousPage = prev
    //   this.nextPage = next
    // },
    async fetchRestaurants({ queryPage, queryCategoryId }) {
      try {
        const response = await restaurantsAPI.getRestaurants({
          page: queryPage,
          categoryId: queryCategoryId
        })

        const { restaurants, categories, categoryId, page, totalPage, prev, next } = response.data
        this.restaurants = restaurants
        this.categories = categories
        this.categoryId = categoryId
        this.currentPage = page
        this.totalPage = totalPage
        this.previousPage = prev
        this.nextPage = next
      } catch (error) {
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳資料，請稍後再試'
        })
      }
    }
  },
  created() {
    const { page = '', categoryId = '' } = this.$route.query
    this.fetchRestaurants({ queryPage: page, queryCategoryId: categoryId })
  },
  beforeRouteUpdate(to, from, next) {
    const { page = '', categoryId = '' } = to.query
    this.fetchRestaurants({ queryPage: page, queryCategoryId: categoryId })
    next()
  }
}
</script>