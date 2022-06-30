<template>
  <div class="container my-2">
    <div class="row">
      <h4>
        Followers(追隨者)： {{ profileFollowers.length }}
      </h4>
    </div>
    <div class="row">
      <div v-for="profileFollower in profileFollowers" :key="profileFollower.id" class="col-4 mb-3">
        <router-link :to="{ name: 'user', params: { id: profileFollower.id } }">
          <img v-bind:src="profileFollower.image | emptyImage" width="100px" height="100px">
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImage } from './../utils/mixins'

export default {
  mixins: [emptyImage],
  props: {
    profileFollowers: {
      type: Array,
      required: true,
      default: () => {
        return []
      }
    }
  }
}
</script>