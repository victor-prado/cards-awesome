<template>
  <q-page class="flex flex-center">
    <div v-if="loading">
      <q-spinner color="primary" size="50px" />
    </div>
    <div v-else>
      <div class="fit row wrap justify-center items-center content-start">
        <div>
          <q-img class="q-mx-aut" :src="card.image_uris.normal" style=" min-width: 240px;" />
        </div>
        <div class="text-body1 q-pa-md" style="max-width: 340px;">
          <h4>{{ card.name }}</h4>
          <div class="flex text-overline">
            {{ card.rarity }} - {{ card.set_name }}
          </div>
          {{ card.oracle_text }}
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

    onMounted(
      async () => {
        const cardId = route.params.id
        card.value = await fetchCard(cardId)
        loading.value = false
      }
    )

    return {
      card, loading
    }
  }
});
</script>
