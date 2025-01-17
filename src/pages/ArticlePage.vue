<template>
  <q-page class="flex flex-center">
    <!-- <h1>{{ article.title }}</h1> -->
    <div class="content" v-html="article.content"></div>
  </q-page>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import axios from 'axios';
import { ref } from 'vue';
import { useRoute } from "vue-router";

export default defineComponent({
  name: "ArticlePage",

  setup() {

    const article = ref({
      title: '',
      content: ''
    });
    const route = useRoute();

    const getArticle = async () => {
      try {
        const artId = route.params.id;
        const url = 'http://localhost:8080/api/articles/' + artId;
        const obj = await axios.get(url);
        article.value = obj.data;
        console.log(article.value);
        const html = '<h1>' + article.value.title + '</h1>' + article.value.content;
        article.value.content = html.replace('<img>', '<q-img>').replace('</img>', '</q-img>');
      } catch (error) {
        console.log('Error fetching article: ', error);
      }
    }

    onMounted(getArticle);
    return {
      article
    }
  }
});
</script>

<style scoped>
.content {
  color: red;
}
</style>