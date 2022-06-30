<template>
  <div class="container py-5">
    <form v-on:submit.prevent.stop="handleSubmit">
      <div class="form-group mb-3">
        <label class="mb-2" for="name">Name</label>
        <input v-model="name" id="name" type="text" name="name" class="form-control"
          placeholder="Enter Name" required>
      </div>

      <div class="form-group mb-3">
        <label class="mb-2" for="image">Image</label>
        <img v-if="image" v-bind:src="image" class="d-block img-thumbnail mb-3" width="300"
          height="300">
        <input v-on:change="handleFileChange" id="image" type="file" name="image" accept="image/*"
          class="form-control-file">
      </div>

      <button :disabled="isProcessing" type="submit" class="btn btn-primary">
        {{ isProcessing ? '資料更新中' : 'Submit' }}
      </button>
    </form>
  </div>
</template>

<script>
import usersAPI from '../apis/users'
import { Toast } from '../utils/helpers'
import { mapState } from 'vuex'

const dummyUser = {
  "name": "root",
  "image": 'https://assets.clibo.tw/images/commissions/mUFGjB-FEXM.jpg?v=c2424c584c34e9e13fdc5b45da7624cb',
}

export default {
  data() {
    return {
      id: '',
      email: '',
      name: '',
      image: '',
      isProcessing: false
    }
  },
  methods: {
    // fetchUser() {
    //   this.currentUser = {
    //     ...dummyUser
    //   }
    // },
    // handleSubmit(e) {
    //   const form = e.target
    //   const formData = new FormData(form)
    //   for (let [name, value] of formData.entries()) {
    //     console.log(name, value)
    //   }
    // },
    setUser() {
      this.id = this.currentUser.id
      this.email = this.currentUser.email
      this.name = this.currentUser.name
      this.image = this.currentUser.image
    },
    handleFileChange(e) {
      const { files } = e.target
      if (files.length === 0) {
        this.image = ''
        return
      } else {
        const imageURL = window.URL.createObjectURL(files[0])
        this.image = imageURL
      }
    },
    async handleSubmit(e) {
      // STEP 5: 避免漏填
      if (!this.name) {
        Toast.fire({
          icon: 'warning',
          title: '請填寫使用者姓名'
        })
        return
      }

      try {
        this.isProcessing = true
        const form = e.target
        const formData = new FormData(form)
        const userId = this.currentUser.id

        const { data } = await usersAPI.update({ userId, formData })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        this.isProcessing = false
      } catch (error) {
        this.isProcessing = false
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法更新使用者資訊，請稍後再試'
        })
      }
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  watch: {
    currentUser() {
      this.setUser()
    }
  },
  created() {
    // this.fetchUser()

    // STEP 5: 若使用者嘗試直接從路由進入其他使用者的 edit 頁
    const { id } = this.$route.params
    if (id.toString() !== this.currentUser.id.toString()) {
      this.$router.push({ name: 'not-found' })
      return
    }
  },
  beforeRouteUpdate(to, from, next) {
    // STEP 6: 路由改變時重新抓取資料
    const { id } = this.$route.params
    if (id.toString() !== this.currentUser.id.toString()) {
      this.$router.push({ name: 'not-found' })
      return
    }
    next()
  }
}
</script>