<template>
  <q-page class="flex flex-center">
    <h3 class="text-left">Articles</h3>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card v-for="item in feedItems" :key="item.id" class="my-card" dark>

        <q-card-section>
          <div class="text-h6">{{ item.title }}</div>
          <div class="text-subtitle2">{{ item.author }}</div>
        </q-card-section>

        <q-card-actions>
          <q-btn flat color="primary" label="Read Article" />

          <q-space />

          <q-btn color="grey" round flat dense :icon="item.expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
            @click="item.expanded = !item.expanded" />
        </q-card-actions>

        <q-slide-transition>
          <div v-show="item.expanded">
            <q-separator />
            <q-card-section class="text-subtitle2">
              <div v-html="item.description"></div>
            </q-card-section>
          </div>
        </q-slide-transition>

        <!-- <q-card-section class="q-pt-none">
          <div v-html="item.description"></div>
        </q-card-section> -->
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { extract, extractFromXml } from '@extractus/feed-extractor';
import { api } from "src/boot/axios";
import { parse } from "rss-to-json"
import { ref } from 'vue';

export default defineComponent({
  name: "HomePage",

  setup() {
    const feedItems = ref([]);
    const url = 'https://draftsim.com/feed';

    const fetchRssFeed = async () => {
      try {
        const rss = await parse(url);
        // console.log(JSON.stringify(rss, null, 3));
        rss.items.forEach((i) => {
          rss.items.expanded = false;
          feedItems.value.push(i);
        });
        console.log(feedItems.value);

        // const url = 'https://draftsim.com/feed';
        // const response = await api.get(url, { responseType: 'text' });
        // const parser = new DOMParser;
        // const xmlDoc = parser.parseFromString(response.data, 'text/xml');

        // const items = xmlDoc.querySelectorAll('item');

        // feedItems = Array.from(items).map((item) => ({
        //   title: item.querySelector('title').textContent,
        //   link: item.querySelector('link').textContent,
        //   description: item.querySelector('description').textContent,
        // }));
      } catch (error) {
        console.log('Error  fetching or parsing RSS feed: ', error);
      }
    }

    onMounted(fetchRssFeed);
    return {
      feedItems
    }
  }
});
</script>

<style>
.my-card {
  width: 100%;
  max-width: 250px;
}
</style>