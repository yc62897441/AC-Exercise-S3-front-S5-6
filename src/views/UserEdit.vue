<template>
  <div class="container py-5">
    <form v-on:submit.prevent.stop="handleSubmit">
      <div class="form-group mb-3">
        <label class="mb-2" for="name">Name</label>
        <input v-model="currentUser.name" id="name" type="text" name="name" class="form-control"
          placeholder="Enter Name" required>
      </div>

      <div class="form-group mb-3">
        <label class="mb-2" for="image">Image</label>
        <img v-if="currentUser.image" v-bind:src="currentUser.image" class="d-block img-thumbnail mb-3" width="300"
          height="300">
        <input v-on:change="handleFileChange" id="image" type="file" name="image" accept="image/*"
          class="form-control-file">
      </div>

      <button type="submit" class="btn btn-primary">
        Submit
      </button>
    </form>
  </div>
</template>

<script>

const dummyUser = {
  "name": "root",
  "image": 'https://assets.clibo.tw/images/commissions/mUFGjB-FEXM.jpg?v=c2424c584c34e9e13fdc5b45da7624cb',
}

export default {
  data() {
    return {
      currentUser: {
        name: '',
        image: ''
      }
    }
  },
  methods: {
    fetchUser() {
      this.currentUser = {
        ...dummyUser
      }
    },
    handleFileChange(e) {
      const { files } = e.target
      if (files.length === 0) {
        this.currentUser.image = ''
        return
      } else {
        const imageURL= window.URL.createObjectURL(files[0])
        this.currentUser.image = imageURL
      }
    },
    handleSubmit(e) {
      const form = e.target
      const formData = new FormData(form)
      for (let [name, value] of formData.entries()) {
        console.log(name, value)
      }
    }
  },
  created() {
    this.fetchUser()
  }
}
</script>