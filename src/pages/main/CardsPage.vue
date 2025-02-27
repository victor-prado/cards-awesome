<template>
  <q-page>
    <div class="row">
      <q-card class="filter-card">
        <q-card-section>
          <div class="q-pa-md">
            <div class="fit row wrap justify-center items-start content-start">
              <q-radio v-model="onDisplay" val="cards" color="secondary" label="Cards" />
              <q-radio v-model="onDisplay" val="deck" color="secondary" label="Decks" />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div>
      <div class="row justify-center">
        <div class="q-pr-sm">
          <q-btn icon="eva-arrow-left-outline" @click="prevPage" :disable="currentPage == 1" />
        </div>
        <div class="q-pl-sm">
          <q-btn icon="eva-arrow-right-outline" @click="nextPage" />
        </div>
      </div>
    </div>

    <CardsList :cards="cards" />

    <div class="q-pb-md">
      <div class="row justify-center">
        <div class="q-pr-sm">
          <q-btn icon="eva-arrow-left-outline" @click="prevPage" :disable="currentPage == 1" />
        </div>
        <div class="q-pl-sm">
          <q-btn icon="eva-arrow-right-outline" @click="nextPage" />
        </div>
      </div>
    </div>

    <!-- <div>
      <q-table :rows="paginatedRows" :columns="columns" row-key="name" :pagination="pagination" hide-pagination dark />

      <q-pagination v-model="pagination.page" :max="totalPages" :max-pages="6" direction-links boundary-links dark
        @update:model-value="updatePaginatedRows" />
    </div> -->
  </q-page>
</template>

<style lang="scss" scoped>
.filter-card {
  width: 100%;
  max-width: 220px;
  /* color: red; */
  background-color: $grey-10;
  border-radius: 12px;
}
</style>

<script>
import { fetchCollection, fetchMostValuable } from "src/api/api";
import CardsList from "src/components/CardsList.vue";
import { defineComponent, onMounted } from "vue";
import { ref, computed } from 'vue';

export default defineComponent({
  name: "CardsPage",
  components: {
    CardsList
  },

  setup() {

    const onDisplay = ref('cards');
    const cards = ref([]);
    const currentPage = ref(1)
    const pageSize = 50

    const nextPage = async () => {
      currentPage.value++
      //console.log('currentPage', currentPage.value)
      cards.value = await fetchMostValuable(currentPage.value, pageSize)
      console.log('cards', cards.value)
    }

    const prevPage = async () => {
      currentPage.value--
      //console.log('currentPage', currentPage.value)
      cards.value = await fetchMostValuable(currentPage.value, pageSize)
      console.log('cards', cards.value)
    }
    // const columns = [
    //   { name: 'name', label: 'Name', field: 'name', align: 'left' },
    //   { name: 'set', label: 'Set', field: 'set_name', align: 'left' }
    // ]

    // const pagination = ref({
    //   page: 1,
    //   rowsPerPage: 9,
    // });

    // Computed property to calculate total pages
    // const totalPages = computed(() => Math.ceil(cards.value.length / pagination.value.rowsPerPage));

    // Computed property to get paginated rows
    // const paginatedRows = computed(() => {
    //   const start = (pagination.value.page - 1) * pagination.value.rowsPerPage;
    //   const end = start + pagination.value.rowsPerPage;
    //   return cards.value.slice(start, end);
    // });

    // Method to update paginated rows when page changes
    // const updatePaginatedRows = () => {
    // This is handled automatically by the computed property
    // };

    onMounted(
      async () => {
        // cards.value = await fetchCollection()
        cards.value = await fetchMostValuable(1, pageSize)
      }
    )

    return {
      onDisplay,
      cards,
      currentPage,
      nextPage,
      prevPage,
      // columns,
      // pagination,
      // totalPages,
      // paginatedRows,
      // updatePaginatedRows,
    }
  }
});
</script>
