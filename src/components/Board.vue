<template>
  <div>
    <div class="row flex-row-reverse">
      <form class="col-12 col-lg-4 p-4 p-lg-2 new-post-section" @submit.prevent="addPost">
        <div class="form-group">
          <input class="form-control" placeholder="作者" id="author" name="author" v-model="form.author" />
        </div>
        <div class="form-group">
          <input class="form-control" placeholder="標題" id="title" name="title" v-model="form.title" />
        </div>
        <div class="form-group">
          <textarea class="form-control" placeholder="文章" rows="4" id="content" name="content" v-model="form.content" ></textarea>
        </div>
        <button id="sendPost" type="submit" class="btn btn-primary"> 新增文章 </button>e
      </form>
      <div class="col-12 col-lg-8">
        <div v-for="post in posts" :key="post.id" class="col-12 text-left post row">
          <div class="thumbnail-section">
            <img :src="getThumbnail(post)" alt="" class="thumbnail">
          </div>
          <div class="col-9 p-0 pl-2">
            <h3>{{ post.title }}</h3>
            <button v-if="post.content" @click="post.show = !post.show" class="btn btn-outline-info show-btn">
              <i class="fa fa-play" aria-hidden="true"></i>
            </button>
            <span>{{ post.author }}</span>
            <p v-if="post.content && post.show" class="mt-2 content">
              <img class="img-fluid" v-if="isImage(post.content)" :src="post.content" alt="" style="width: 100%;">
              <span v-else v-text="post.content"></span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import placeHolder from '@/assets/placeholder.png'

  export default {
    name: 'board',
    async created () {
      let response = await axios.get('http://localhost:3000/posts')
      this.posts = response.data
    },
    methods: {
      getThumbnail (post) {
        return post.thumbnail || placeHolder
      },
      isImage: function (content) {
        return content.match(/\.(jpeg|jpg|gif|png)$/) != null
      },
      async addPost () {
        let response = await axios.post('http://localhost:3000/posts', this.form)
        this.posts.push(response.data)
      }
    },
    data () {
      return {
        placeHolder,
        posts: [],
        form: { title: '',  author: '', content: ''}
      }
    }
  }
</script>

<style lang="sass" scoped>
  .post
    .thumbnail-section
      width: 75px
      height: 75px
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

  .new-post-section
    padding: .5rem
</style>
