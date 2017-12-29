<template>
  <div>
    <div v-for="post in posts" class="post">
      <h1>{{ post.title }}</h1>
      <span>{{ post.author }}</span>
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
