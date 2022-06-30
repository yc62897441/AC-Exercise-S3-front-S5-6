<template>
  <div class="container py-5">
    <h1>餐廳描述頁</h1>
    <!-- 餐廳資訊頁 RestaurantDetail -->
    <RestaurantDetail v-bind:initial-restaurant="restaurant" />
    <hr>
    <!-- 餐廳評論 RestaurantComments -->
    <RestaurantComments v-bind:restaurant-comments="restaurantComments" v-on:after-delete-comment="afterDeleteComment"
      v-bind:isProcessing="isProcessing" />
    <!-- 新增評論 CreateComment -->
    <CreateComment v-on:after-create-comment="afterCreateComment" v-bind:restaurant-id="restaurant.id"
      v-bind:isProcessing="isProcessing" />
  </div>
</template>

<script>
import RestaurantDetail from '../components/RestaurantDetail'
import RestaurantComments from '../components/RestaurantComments'
import CreateComment from '../components/CreateComment'
import restaurantsAPI from '../apis/restaurants'
import usersAPI from '../apis/users'
import { Toast } from '../utils/helpers'
import { mapState } from 'vuex'

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
    "updatedAt": "2022-06-22T04:41:54.103Z",
    "CategoryId": 2,
    "Category": {
      "id": 2,
      "name": "日本料理",
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z"
    },
    "FavoritedUsers": [],
    "LikedUsers": [],
    "Comments": [
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
      }
    ]
  },
  "isFavorited": false,
  "isLiked": false
}
const dummyUser = {
  currentUser: {
    id: 1,
    name: '管理者',
    email: 'root@example.com',
    image: 'https://i.pravatar.cc/300',
    isAdmin: true
  },
  isAuthenticated: true
}

export default {
  components: {
    RestaurantDetail,
    RestaurantComments,
    CreateComment
  },
  data() {
    return {
      restaurant: {
        id: -1,
        name: '',
        categoryName: '',
        image: '',
        openingHours: '',
        tel: '',
        address: '',
        description: '',
        isFavorited: false,
        isLiked: false
      },
      restaurantComments: [],
      // currentUser: dummyUser.currentUser,
      isProcessing: false
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    // fetchRestaurant(restaurantId) {
    //   this.restaurant = {
    //     id: dummyData.restaurant.id,
    //     name: dummyData.restaurant.name,
    //     categoryName: dummyData.restaurant.Category ? dummyData.restaurant.Category.name : '未分類',
    //     image: dummyData.restaurant.image,
    //     openingHours: dummyData.restaurant.opening_hours,
    //     tel: dummyData.restaurant.tel,
    //     address: dummyData.restaurant.address,
    //     description: dummyData.restaurant.description,
    //     isFavorited: dummyData.isFavorited,
    //     isLiked: dummyData.isLiked,
    //   }
    //   this.restaurantComments = dummyData.restaurant.Comments
    // },
    // afterDeleteComment(commentId) {
    //   this.restaurantComments = this.restaurantComments.filter(comment => comment.id !== commentId)
    // },
    // afterCreateComment(payload) {
    //   const { commentId, restaurantId, text } = payload
    //   this.restaurantComments.push({
    //     id: commentId,
    //     text: text,
    //     RestaurantId: restaurantId,
    //     createdAt: new Date(),
    //     User: {
    //       id: this.currentUser.id,
    //       name: this.currentUser.name
    //     }
    //   })
    // },
    async fetchRestaurant(restaurantId) {
      try {
        const { data } = await restaurantsAPI.getRestaurant({ restaurantId })
        this.restaurant = {
          id: data.restaurant.id,
          name: data.restaurant.name,
          categoryName: data.restaurant.Category ? data.restaurant.Category.name : '未分類',
          image: data.restaurant.image,
          openingHours: data.restaurant.opening_hours,
          tel: data.restaurant.tel,
          address: data.restaurant.address,
          description: data.restaurant.description,
          isFavorited: data.isFavorited,
          isLiked: data.isLiked,
        }
        this.restaurantComments = data.restaurant.Comments
      } catch (error) {
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳資料，請稍後再試'
        })
      }
    },
    async afterDeleteComment(commentId) {
      try {
        this.isProcessing = true
        const { data } = await usersAPI.deleteComment({ commentId })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.restaurantComments = this.restaurantComments.filter(comment => comment.id !== commentId)

        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法刪除評論資料，請稍後再試'
        })
      }
    },
    async afterCreateComment(payload) {
      try {
        this.isProcessing = true
        const { commentId, restaurantId, text } = payload
        const formData = {
          text: text,
          restaurantId: restaurantId,
        }
        const { data } = await usersAPI.addComment({ formData })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.restaurantComments.push({
          id: '',
          text: text,
          RestaurantId: restaurantId,
          createdAt: new Date(),
          User: {
            id: this.currentUser.id,
            name: this.currentUser.name
          }
        })

        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法新增評論資料，請稍後再試'
        })
      }
    }
  },
  created() {
    const { id: restaurantId } = this.$route.params
    this.fetchRestaurant(restaurantId)
  },
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params
    this.fetchRestaurant(id)
    next()
  },
}
</script>