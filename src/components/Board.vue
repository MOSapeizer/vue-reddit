<template>
  <div>
    <div v-for="post in posts" class="post">
      <h1>{{ post.title }}</h1>
      <span>{{ post.author }}</span>
      <img v-if="post.thumbnail" :src="post.thumbnail" alt="" class="thumbnail">
      <img v-else src="placeholder.jpg" alt="" class="thumbnail">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'board',
    data () {
      return {
        posts: []
      }
    }
  }
</script>

<style scoped>

</style>
