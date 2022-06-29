<template>
  <div class="container py-5">
    <div class="row">
      <div class="col-4">
        <img v-bind:src="profile.image | emptyImage" width="250px" height="250px">
      </div>
      <div class="col-8">
        <div>
          <h3>{{ profile.name }}</h3>
          <h5>{{ profile.email }}</h5>
        </div>
        <br>
        <ul>
          <li>已評論餐廳數： {{ profile.Comments.length }} </li>
          <li>收藏餐廳數： {{ profile.FavoritedRestaurants.length }}</li>
          <li>Followings(追蹤者)： {{ profile.Followings.length }}</li>
          <li>Followers(追隨者)： {{ profile.Followers.length }}</li>
        </ul>
        <!-- <button type="button" class="btn btn-primary mx-3">
          編輯
        </button> -->
        <router-link v-if="currentUser.id === profile.id" :to="{ name: 'user-edit', params: { id: 1 } }"
          class="btn btn-primary mx-3">
          編輯
        </router-link>
        <button type="button" class="btn btn-link" @click="$router.back()">
          回上一頁
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImage } from './../utils/mixins'
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
  mixins: [emptyImage],
  props: {
    profile: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      currentUser: {}
    }
  },
  methods: {
    fetchCurrentUser() {
      this.currentUser = {
        ...dummyUser.currentUser,
        isAuthenticated: dummyUser.isAuthenticated
      }
    }
  },
  created() {
    this.fetchCurrentUser()
  }
}
</script>
