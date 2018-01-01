<template>
  <div>
    <div class="row">
      <div v-for="post in posts" :key="post.id" class="col-12 text-left post row">
        <div class="col-1 p-0">
          <img :src="getThumbnail(post)" alt="" class="thumbnail">
        </div>
        <div class="col-11 p-0">
          <h3>{{ post.title }}</h3>
          <button v-if="post.content" @click="post.show = !post.show" class="btn btn-outline-info show-btn">
            <i class="fa fa-play" aria-hidden="true"></i>
          </button>
          <span>{{ post.author }}</span>
          <p v-if="post.content && post.show" class="mt-2 content">
            {{ post.content }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import placeHolder from '@/assets/placeholder.png'

  export default {
    name: 'board',
    methods: {
      getThumbnail (post) {
        return post.thumbnail || placeHolder
      }
    },
    data () {
      return {
        placeHolder,
        posts: [
          {id: 1, title: 'the title.', author: 'author1', thumbnail: '', show: false, content: ''},
          {id: 2, title: 'the title2.', author: 'author2', thumbnail: '', show: false, content: 'fuck'},
          {id: 3, title: 'the title3.', author: 'author3', thumbnail: '', show: false, content: 'sample.jpg'}
        ]
      }
    }
  }
</script>

<style lang="sass" scoped>
  .post
    .thumbnail
      width: 100%
    .show-btn
      font-size: 0.5rem
      padding: .1rem .25rem .1rem .4rem
      line-height: 1rem
    .content
      padding: 0.5rem 1rem
      background-color: #fafafa
      border: 1px solid #369
      border-radius: 7px
</style>
