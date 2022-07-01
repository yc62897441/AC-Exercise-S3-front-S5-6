<template>
  <form v-on:submit.prevent.stop="handleSubmit">
    <div class="form-group mb-4">
      <label for="text">留下評論：</label>
      <textarea class="form-control" rows="3" name="text" v-model="text" />
    </div>
    <div class="d-flex align-items-center justify-content-between">
      <button type="button" class="btn btn-link" @click="$router.back()">回上一頁</button>
      <button :disabled="isProcessing" type="submit" class="btn btn-primary mr-0">
        Submit
      </button>
    </div>
  </form>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

export default {
  props: {
    restaurantId: {
      type: Number,
      required: true
    },
    isProcessing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      text: '',
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('after-create-comment', {
        text: this.text,
        restaurantId: this.restaurantId,
        commentId: uuidv4()
      })
      this.text = ''
    }
  }
}
</script>

<style scoped>

.form-group {
  margin: 21px 0 8px;
}
</style>