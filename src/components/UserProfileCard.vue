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
        <template v-if="isCurrentUser">
          <router-link v-if="currentUser.id === profile.id" :to="{ name: 'user-edit', params: { id: currentUser.id } }"
            class="btn btn-primary">
            編輯
          </router-link>
        </template>
        <template v-else>
          <button v-if="isFollowing" v-on:click="unFollowUser(profile.id)" :disabled="isProcessing" type="button"
            class="btn btn-danger">
            取消追蹤
          </button>
          <button v-else v-on:click="followUser(profile.id)" :disabled="isProcessing" type="button"
            class="btn btn-primary">
            追蹤
          </button>
        </template>
        <button type="button" class="btn btn-link" @click="$router.back()">
          回上一頁
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImage } from './../utils/mixins'
import usersAPI from '../apis/users'
import { Toast } from '../utils/helpers'

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
      required: true,
      default: () => {
        return {}
      }
    },
    currentUser: {
      type: Object,
      required: true
    },
    isAuthenticated: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      // currentUser: {},
      isProcessing: false
    }
  },
  methods: {
    // fetchCurrentUser() {
    //   this.currentUser = {
    //     ...dummyUser.currentUser,
    //     isAuthenticated: dummyUser.isAuthenticated
    //   }
    // },
    async followUser(userId) {
      try {
        this.isProcessing = true
        const { data } = await usersAPI.addFollowing({ userId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.profile.Followers.push({ id: this.currentUser.id })
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法加入追蹤，請稍後再試'
        })
      }
    },
    async unFollowUser(userId) {
      try {
        this.isProcessing = true
        const { data } = await usersAPI.deleteFollowing({ userId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.profile.Followers = this.profile.Followers.map(follower => follower.id !== this.currentUser.id)
        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法取消追蹤，請稍後再試'
        })
      }
    },
  },
  computed: {
    isFollowing() {
      let isFollowing = false
      this.profile.Followers.forEach(follower => {
        if (follower.id === this.currentUser.id) {
          isFollowing = true
        }
      })
      return isFollowing
    },
    isCurrentUser() {
      let isCurrentUser = false
      if (this.profile.id === this.currentUser.id) {
        isCurrentUser = true
      }
      return isCurrentUser
    }
  },
  created() {
    // this.fetchCurrentUser()
  }
}
</script>
