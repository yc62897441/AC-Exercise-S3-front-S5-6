<template>
  <div class="container  my-2">
    <div class="row">
      <h4>
        Followings(追蹤者)： {{ profileFollowings.length }}
      </h4>
    </div>
    <div class="row">
      <div v-for="profileFollowing in profileFollowings" class="col-4 mb-3">
        <router-link :to="{ name: 'user', params: { id: profileFollowing.id }}">
          <img v-bind:src="profileFollowing.image | emptyImage" width="100px" height="100px">
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
    profileFollowings: {
      type: Array,
      required: true
    }
  }
}
</script>