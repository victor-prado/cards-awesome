<template>
  <q-page class="flex flex-center">
    <div v-if="loading">
      <q-spinner color="primary" size="50px" />
    </div>
    <div v-else>
      <h1>{{ deck.name }}</h1>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { fetchCard, fetchDeck } from "src/api/api";
import { defineComponent, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "DeckPage",
  setup() {
    const deck = ref(null);
    const loading = ref(true);
    const route = useRoute();

    onMounted(
      async () => {
        const deckId = route.params.id;
        deck.value = await fetchDeck(deckId);
        loading.value = false;
      }
    )

    return {
      loading, deck
    }
  }
});
</script>
