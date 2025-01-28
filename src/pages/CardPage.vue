<template>
  <q-page class="flex flex-center">
    <div v-if="loading">
      <q-spinner color="primary" size="50px" />
    </div>
    <div v-else>
      <div class="fit row wrap justify-center items-center content-start">

        <div>
          <q-img :src="card.image_uris.normal" style=" min-width: 230px; " />
        </div>
        <div class="text-body1 q-pa-md" style="max-width: 340px;">
          <h4>{{ card.name }}</h4>
          <div class="flex text-overline">
            {{ card.rarity }} - {{ card.set_name }}
          </div>
          {{ card.oracle_text }}
          <!-- <q-separator color="neutral" /> -->
        </div>
      </div>
      <div class="text-body2 q-pt-sm row ">
        <div v-for="(item, index) in card.legalities.slice(0, 4)" :key="index"></div>
        <div>
          <div class="q-px-sm row" v-for="(item, index) in card.legalities.slice(0, 4)" :key="index">
            <div>{{ item[0] }}</div>
            <div class="q-pr-sm">:</div>
            <div>{{ item[1] }}</div>
          </div>
        </div>
        <div>
          <div class="q-px-sm row" v-for="(item, index) in card.legalities.slice(4, 8)" :key="index">
            <div>{{ item[0] }}</div>
            <div class="q-pr-sm">:</div>
            <div>{{ item[1] }}</div>
          </div>
        </div>
        <div>
          <div class="q-px-sm row" v-for="(item, index) in card.legalities.slice(8, 12)" :key="index">
            <div>{{ item[0] }}</div>
            <div class="q-pr-sm">:</div>
            <div>{{ item[1] }}</div>
          </div>
        </div>
        <div>
          <div class="q-px-sm row" v-for="(item, index) in card.legalities.slice(12, 16)" :key="index">
            <div>{{ item[0] }}</div>
            <div class="q-pr-sm">:</div>
            <div>{{ item[1] }}</div>
          </div>
        </div>
        <div>
          <div class="q-px-sm row" v-for="(item, index) in card.legalities.slice(16, 20)" :key="index">
            <div>{{ item[0] }}</div>
            <div class="q-pr-sm">:</div>
            <div>{{ item[1] }}</div>
          </div>
        </div>
        <div>
          <div class="q-px-sm row" v-for="(item, index) in card.legalities.slice(20, 24)" :key="index">
            <div>{{ item[0] }}</div>
            <div class="q-pr-sm">:</div>
            <div>{{ item[1] }}</div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { fetchCard } from "src/api/api";
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "CardPage",
  setup() {
    // const cardId = ref(null)
    const card = ref(null)
    const route = useRoute()
    const loading = ref(true);
    const legalitiesColSize = ref(4)
    const legalitiesCols = ref([])

    onMounted(
      async () => {
        const cardId = route.params.id
        card.value = await fetchCard(cardId)
        loading.value = false
        legalitiesCols.value = (start, stop, step) =>
          Array.from(
            { length: (stop - start) / step + 1 },
            (value, index) => start + index * step
          );
      }
    )

    return {
      card, loading, legalitiesColSize
    }
  }
});
</script>
