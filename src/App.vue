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

<!-- 撰寫的樣式只在某個元件有作用、而不想影響其他元件時，可以在該組建的 <style> 標籤中加上 scoped 屬性 -->
<style scoped>
  main {
    margin-top: 65px !important;
  }
</style>