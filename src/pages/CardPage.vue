<template>
  <q-page class="flex flex-center">
    <div v-if="loading">
      <q-spinner color="primary" size="50px" />
    </div>
    <div v-else>
      <div class="fit row wrap justify-center items-center content-start">

        <div>
          <q-img :src="card.image_uris.normal" style=" width: 230px; " />
          <div v-if="false" class="q-pa-sm">
            <q-btn class="q-pa-" color="primary" icon-right="eva-plus-square-outline" label="Add Card" />
          </div>
          <div v-else class="q-py-sm row">
            <q-btn class="q-pa-" color="neutral" size="md" icon-right="eva-minus-circle-outline" label="Remove Card" />
            <q-input class="q-pl-sm" dark v-model.number="copies" @blur="handleCopies" type="number" filled
              style="max-width: 70px" />
          </div>
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
      <!-- <q-separator color="neutral" /> -->
      <div class="q-pa-sm">
        <h5 class="q-px-sm">Legalties</h5>
        <div class="text-body2 row ">
          <div v-for="(c, i) in legalitiesCols" :key="i">
            <div v-for="(item, index) in card.legalities.slice(c * legalitiesColSize, (c + 1) * legalitiesColSize)"
              :key="index">
              <div v-if="item[1] === 'Legal'" class="q-px-sm row text-weight-regular">
                <div>{{ item[0] }}</div>
                <!-- <div class="q-pr-sm">:</div> -->
                <div><q-icon name="eva-checkmark-outline" /></div>
              </div>
              <div v-else class="q-px-sm row text-weight-thin">
                <div>{{ item[0] }}</div>
                <div>
                </div>
              </div>
            </div>
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
    const legalitiesColSize = ref(null)
    const legalitiesCols = ref([])
    const copies = ref(null)

    function handleCopies() {
      alert("Sure you want to change the number of copies?")
    }

    onMounted(
      async () => {
        const cardId = route.params.id
        card.value = await fetchCard(cardId)
        loading.value = false
        legalitiesColSize.value = 4
        const columns = (card.value.legalities.length - card.value.legalities.length % legalitiesColSize.value) / legalitiesColSize.value + 1
        console.log('columns', columns)
        console.log('legalities.legth', card.value.legalities.length)
        legalitiesCols.value = [...Array(columns).keys()]
        copies.value = 1
      }
    )

    return {
      card, loading, legalitiesCols, legalitiesColSize, copies, handleCopies
    }
  }
});
</script>
