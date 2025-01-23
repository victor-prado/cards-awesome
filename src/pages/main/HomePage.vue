<template>
  <q-page class="fle">
    <!-- <h4 class=" q-pl-xl">Dashboard</h4> -->
    <div class="q-pa-md row items-start q-gutter-md justify-center">
      <q-card class="my-card" dark>
        <div class="q-pa-sm text-center bg-primar">
          <div class="text-body2">Total Cards: </div>
          <div class="text-h6">1023</div>
        </div>
      </q-card>

      <q-card class="my-card" dark>
        <div class="q-pa-sm text-center ">
          <div class="text-body2">Unique Cards: </div>
          <div class="text-h6">876</div>
        </div>
      </q-card>


    </div>

    <!-- <template>
      <br />
    </template> -->
    <h5 class="q-pl-xl">Valuable Cards</h5>
    <!-- <q-separator class="q-px-xl" color="neutral" inset /> -->
    <div class="flex q-pb-xl q-pt-sm q-px-md">
      <div class="q-px-md q-pt-md" v-for="(card, index) in valuableCards" :key="index" style="width: 210px;">
        <div class="card bg-secondar">
          <q-img :src="card.image_uris.small" fit="contain" />
          <div class="q-pt-sm text-body2 text-center">{{ card.name }}</div>
          <div class="q-pt-sm text-body1 text-center">$ {{ card.prices.usd }}</div>
          <q-separator v-if="report" color="neutral" inset />
        </div>
      </div>
      <q-resize-observer @resize="onResize" />
    </div>
    <!-- <q-separator color="neutral" inset /> -->


    <h5 class="q-pl-xl">Articles</h5>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card v-for="(item, index) in feedItems" :key="index" class="my-card no-shadow" dark>

        <q-card-section>
          <div class="text-body1">{{ item.title }}</div>
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
import { ref } from 'vue';
import { fetchRss, fetchMostValuable } from "src/api/api";

export default defineComponent({
  name: "HomePage",

  setup() {
    const feedItems = ref([]);
    const valuableCards = ref([]);
    const report = ref(null);

    const openUrl = (url) => {
      window.open(url, '_blank');
    }

    onMounted(
      async () => {
        feedItems.value = await fetchRss()
        // console.log('feedItems', feedItems.value)
        valuableCards.value = await fetchMostValuable(5)
      }
    );
    return {
      feedItems,
      valuableCards,
      openUrl,
      report,

      onResize(size) {
        report.value = size.height > 400
        console.log('size ', size)
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 250px;
  border-radius: 50px;
}

.no-shadow {
  box-shadow: none;
}
</style>