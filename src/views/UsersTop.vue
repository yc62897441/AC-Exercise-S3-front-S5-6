<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">
      美食達人
    </h1>
    <hr>
    <div class="row text-center">
      <div class="col-3" v-for="user in users" :key="user.id">
        <router-link :to="{ name: 'user', params: { id: user.id } }">
          <img v-bind:src="user.image | emptyImage" width="140px" height="140px">
        </router-link>
        <h2>{{ user.name }}</h2>
        <span class="badge bg-secondary">追蹤人數：{{ user.FollowerCount }}</span>
        <p class="mt-3">
          <button v-if="user.isFollowed" v-on:click="unFollowUser(user.id)" type="button" class="btn btn-danger">
            取消追蹤
          </button>
          <button v-else v-on:click="followUser(user.id)" type="button" class="btn btn-primary">
            追蹤
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import NavTabs from '../components/NavTabs'
import { emptyImage } from './../utils/mixins'
import usersAPI from '../apis/users'
import { Toast } from '../utils/helpers'

const dummyData = {
  "users": [
    {
      "id": 1,
      "name": "root",
      "email": "root@example.com",
      "password": "$2a$10$3j.x5gbO2sBNpkte4TTHc.rNN7EIfIRqrzitpAJzTtp7SWb1nRKxS",
      "isAdmin": true,
      "image": "https://www.sample-videos.com/img/Sample-jpg-image-50kb.jpg",
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "Followers": [],
      "FollowerCount": 0,
      "isFollowed": false
    },
    {
      "id": 2,
      "name": "user1",
      "email": "user1@example.com",
      "password": "$2a$10$IhTmi90.XsRMetCY/Geuz.bmf5t0/18Z.1JLovAje6SoYZd6xeN0q",
      "isAdmin": false,
      "image": "https://www.sample-videos.com/img/Sample-jpg-image-50kb.jpg",
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "Followers": [],
      "FollowerCount": 0,
      "isFollowed": false
    },
    {
      "id": 3,
      "name": "user2",
      "email": "user2@example.com",
      "password": "$2a$10$52uyxH6lNVMc277pN0Dr8.kxiGGxFm.TZd3vb3f/ebbu0qBisXaTC",
      "isAdmin": false,
      "image": null,
      "createdAt": "2022-06-20T05:31:15.000Z",
      "updatedAt": "2022-06-20T05:31:15.000Z",
      "Followers": [],
      "FollowerCount": 0,
      "isFollowed": false
    }
  ]
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
  mixins: [emptyImage],
  components: {
    NavTabs
  },
  data() {
    return {
      users: []
    }
  },
  methods: {
    // fetchUsers() {
    //   this.users = dummyData["users"]
    // },
    async fetchUsers() {
      try {
        const { data } = await usersAPI.getTopUsers()
        console.log(data)
        this.users = data.users
      } catch (error) {
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法取得美食達人，請稍後再試'
        })
      }
    },
    async followUser(userId) {
      try {
        const { data } = await usersAPI.addFollowing({ userId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.users = this.users.map(user => {
          if (user.id !== userId) {
            return user
          } else {
            return {
              ...user,
              followerCount: user.followerCount + 1,
              isFollowed: true
            }
          }
        })
      } catch (error) {
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法加入追蹤，請稍後再試'
        })
      }
    },
    async unFollowUser(userId) {
      try {
        const { data } = await usersAPI.deleteFollowing({ userId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.users = this.users.map(user => {
          if (user.id !== userId) {
            return user
          } else {
            return {
              ...user,
              followerCount: user.followerCount - 1,
              isFollowed: false
            }
          }
        })
      } catch (error) {
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法取消追蹤，請稍後再試'
        })
      }
    },
    // isFollowed(user) {
    //   let isFollowed = false
    //   user.Followers.forEach(follower => {
    //     if (follower.name.toUpperCase() === dummyUser.currentUser.name.toUpperCase()) {
    //       isFollowed = true
    //     }
    //   })
    //   return isFollowed
    // }
  },
  // computed: {
  //   followerCount() {
  //     this.users.forEach(user => {
  //       user.FollowerCount = user.Followers.length
  //     })
  //   }
  // },
  created() {
    this.fetchUsers()
  }
}
</script>