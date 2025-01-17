<template>
  <q-page class="fle">
    <!-- <h4 class=" q-pl-xl">Dashboard</h4> -->
    <div class="q-pa-md row items-start q-gutter-md justify-center">
      <q-card class="my-card" dark>
        <div class="q-pa-sm text-center bg-primar">
          <h5>Total Cards: </h5>
          <h4>1023</h4>
        </div>
      </q-card>

      <q-card class="my-card" dark>
        <div class="q-pa-sm text-center ">
          <h5>Unique Cards: </h5>
          <h4>876</h4>
        </div>
      </q-card>


    </div>

    <!-- <template>
      <br />
    </template> -->



    <h4 class=" q-pl-xl">Articles</h4>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card v-for="(item, index) in feedItems" :key="index" class="my-card" dark>

        <q-card-section>
          <div class="text-h6">{{ item.title }}</div>
          <div class="text-subtitle2">{{ item.author }}</div>
        </q-card-section>

        <q-card-actions>
          <!-- <router-link :to="'/article/' + item._id">
            <q-btn flat color="primary" label="Read Article" />
          </router-link> -->
          <!-- <router-link :to="'///' + item.link" target="_blank"> -->

          <q-btn @click="openUrl(item.link)" flat color="primary" label="Read Article" />
          <!-- </router-link> -->


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
// import { parse } from "rss-to-json"
import { ref } from 'vue';
import axios from 'axios';
import { parse } from 'node-html-parser';
import { fetchRss } from "src/api/api";

export default defineComponent({
  name: "HomePage",

  setup() {
    const feedItems = ref([]);

    const openUrl = (url) => {
      window.open(url, '_blank');
    }

    onMounted(
      async () => {
        feedItems.value = await fetchRss()
        console.log('feedItems', feedItems.value)
      }
    );
    return {
      feedItems,
      openUrl
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