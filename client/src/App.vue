<template>
  <div id="app">
    <Header/>
    <Latest/>
    <Post :posts="posts" :count="postCount" @showMore="this.showMore"/>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Latest from "./components/Latest.vue";
import Post from "./components/Post.vue";

export default {
  name: "app",
  data() {
    return {
      API_URL: "http://localhost:3000/api/",
      posts: [],
      postCount: 6
    };
  },
  components: {
    Header,
    Latest,
    Post
  },
  methods: {
    /* eslint-disable */
    getPosts() {
      this.$http
        .get(this.API_URL + "posts")
        .then(result => {
          this.posts = result.data.data;
          console.log(posts);
        })
        .catch(error => {
          if (!error.response) {
            // network error
            this.errorStatus = "Error: Network Error";
          } else {
            this.errorStatus = error.response.data.message;
          }
        });
    },
    showMore() {
      this.postCount += 2;
    }
  },
  beforeMount() {
    this.getPosts();
  }
};
</script>

<style lang="scss">
body {
  background-color: #f3f3f3;
  font-family: "Rockwell", serif;

  h3 {
    color: #171717;
    font-size: 28px;
    font-weight: 700;
  }
}
</style>
