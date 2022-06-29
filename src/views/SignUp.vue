<template>
  <div class="container py-5">
    <form class="w-100" @submit.prevent.stop="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">
          Sign Up
        </h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="name">Name</label>
        <input id="name" v-model="name" name="name" type="text" class="form-control" placeholder="name"
          autocomplete="username" required autofocus>
      </div>

      <div class="form-label-group mb-2">
        <label for="email">Email</label>
        <input id="email" v-model="email" name="email" type="email" class="form-control" placeholder="email"
          autocomplete="email" required>
      </div>

      <div class="form-label-group mb-3">
        <label for="password">Password</label>
        <input id="password" v-model="password" name="password" type="password" class="form-control"
          placeholder="Password" autocomplete="new-password" required>
      </div>

      <div class="form-label-group mb-3">
        <label for="password-check">Password Check</label>
        <input id="password-check" v-model="passwordCheck" name="passwordCheck" type="password" class="form-control"
          placeholder="Password" autocomplete="new-password" required>
      </div>

      <button class="btn btn-lg btn-primary btn-block mb-3" type="submit">
        Submit
      </button>

      <div class="text-center mb-3">
        <p>
          <router-link to="/signin">
            Sign In
          </router-link>
        </p>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">
        &copy; 2017-2018
      </p>
    </form>
  </div>
</template>

<script>
import authorizationAPI from '../apis/authorization'
import { Toast } from '../utils/helpers'

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      passwordCheck: ''
    }
  },
  methods: {
    // handleSubmit() {
    //   const data = JSON.stringify({
    //     name: this.name,
    //     email: this.email,
    //     password: this.password,
    //     passwordCheck: this.passwordCheck
    //   })
    //   console.log('handleSubmit', data)
    // },
    async handleSubmit() {
      try {
        if (!this.name || !this.email || !this.password || !this.passwordCheck) {
          Toast.fire({
            icon: 'error',
            title: '請輸入 Name, Email, Password, Password Check'
          })
          this.password = ''
          this.passwordCheck = ''
          return
        }

        if (this.password !== this.passwordCheck) {
          Toast.fire({
            icon: 'error',
            title: 'Password 與 Password Check 不一致'
          })
          this.password = ''
          this.passwordCheck = ''
          return
        }

        const { data } = await authorizationAPI.signUp({
          name: this.name,
          email: this.email,
          password: this.password,
          passwordCheck: this.passwordCheck
        })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        Toast.fire({
          icon: 'success',
          title: data.message || '註冊成功'
        })

        this.$router.push({ name: 'sign-in' })
      } catch (error) {
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: error || '註冊失敗，請稍後再試'
        })
      }
    }
  }
}
</script>