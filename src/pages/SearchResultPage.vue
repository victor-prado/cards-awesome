<template>
  <q-page class="flex flex-center q-dark">
    <div class="content">
      <q-spinner-dots v-if="loading" color="secondary" size="80px" />
      <div v-else>
        <q-list separator dark>
          <q-item v-for="card in cards" :key="card.multiverseid" clickable :to="{ name: 'card', params: { id: card.id } }"
            v-ripple dark>
            <q-item-section avatar>
              <q-avatar square class="card-img-item">
                <q-img :src="card.imageUrl" :alt="card.name" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ card.name }}</q-item-label>
              <q-item-label overline>{{ card.setName }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
import { createHydrationRenderer, defineComponent } from "vue";

export default defineComponent({
  name: "SearchResultPage",
  props: ["textInput", "cards"],
  watch: {
    cards(newValue, oldValue) {
      //this.loading = true;
      setTimeout(() => {
        this.loading = false; // Set loading to false when page is loaded
      }, 1000); // Adjust the delay as needed
    },
  },
  data() {
    return {
      loading: false,
    };
  },

  mounted() {
    //this.loading = false;
    //window.addEventListener("load", this.handleLoad);
  },
  beforeUnmount() {
    //window.removeEventListener("load", this.handleLoad);
  },
  updated() {
    //this.loading = false;
  },

  created() { },

  methods: {
    handleLoad() {
      this.loading = false;
    },
  },
});
</script>

<style>
.card-img-item {
  width: 72px;
  /* Set the desired width */
  height: auto;
  /* Let the height adjust to maintain aspect ratio */
  display: inline-block;
  /* Ensure proper alignment */
  overflow: hidden;
  /* Hide any overflow if the image is larger */
}

.rounded-fram {
  border-radius: 22px 22px 22px 22px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.content {
  /*padding: 20px;*/
  overflow-y: auto;
  max-height: calc(100vh - 98px);
}
</style>
