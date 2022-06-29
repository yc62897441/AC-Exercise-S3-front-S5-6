<template>
  <div id="restaurant-forum">
    <NavBar />
    <main role="main" class="mt-5 bg-white">
      <router-view />
    </main>
  </div>
</template>
<script>
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/NavBar'

export default {
  name: 'app',
  components: {
    NavBar
  }
}
</script>
