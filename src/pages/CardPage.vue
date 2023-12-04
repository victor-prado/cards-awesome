<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md">
      <h1>{{ card.name }}</h1>
      <img :src="card.imageUrl" :alt="card.name" class="card-image" />
      <p><strong>Type:</strong> {{ card.type }}</p>
      <p><strong>Description:</strong> {{ card.description }}</p>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { api } from "boot/axios";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "CardPage",
  data() {
    return {
      loading: true,
      card: null,
    };
  },
  setup() {
    const route = useRoute();
  },

  async created() {
    try {
      const response = await api.get("/v1/cards", {
        params: { id: this.$route.params.id },
      });
      this.card = response.data.cards[0];
    } catch (error) {
      console.error("MTG API Error: ", error);
    } finally {
      this.loading = false;
    }
  },
});
</script>

<style scoped>
.card-image {
  max-width: 100%;
  height: auto;
  margin-top: 20px;
}

@media (min-width: 480) {
  .card-info {
    width: 265px;
    height: 100%;
  }
}

.card-img-item {
  width: 265px; /* Set the desired width */
  height: auto; /* Let the height adjust to maintain aspect ratio */
  display: inline-block; /* Ensure proper alignment */
  overflow: hidden; /* Hide any overflow if the image is larger */
}
</style>
