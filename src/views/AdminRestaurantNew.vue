<template>
  <div class="container py-5">
    <!-- 餐廳表單 AdminRestaurantForm -->
    <AdminRestaurantForm v-on:after-submit="handleAfterSubmit" v-bind:is-processing="isProcessing" />
  </div>
</template>

<script>
import AdminRestaurantForm from '../components/AdminRestaurantForm'
import adminAPI from '../apis/admin'
import { Toast } from '../utils/helpers'

export default {
  components: {
    AdminRestaurantForm
  },
  data() {
    return {
      isProcessing: false
    }
  },
  methods: {
    // handleAfterSubmit(formData) {
    //   for (let [name, value] of formData.entries()) {
    //     console.log(name, value)
    //   }
    // },
    async handleAfterSubmit(formData) {
      try {
        this.isProcessing = true

        // 透過 restaurants.create 方法來向伺服器建立餐廳
        const { data } = await adminAPI.restaurants.create({ formData })

        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        // 成功的話則轉址到 `/admin/restaurants`
        this.$router.push({ name: 'admin-restaurants' })
      } catch (error) {
        console.log('error', error)
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: '無法新增餐廳，請稍後再試'
        })
      }
    }
  }
}
</script>