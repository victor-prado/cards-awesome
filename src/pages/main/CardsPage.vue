<template>
  <q-page class="flex flex-center">
    <div class="row absolute-top" style="height: 10px">
      <q-card class="filter-card">
        <q-card-section>
          <div class="q-pa-md">
            <div class="fit row wrap justify-center items-start content-start">
              <q-radio v-model="onDisplay" val="cards" color="secondary" label="Cards" />
              <q-radio v-model="onDisplay" val="deck" color="secondary" label="Decks" />
              <!-- <q-list>
                <q-item tag="label" v-ripple>
                  <q-item-section avatar>
                    <q-radio v-model="onDisplay" val="cards" color="secondary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Cards</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item tag="label" v-ripple>
                  <q-item-section avatar>
                    <q-radio v-model="onDisplay" val="deck" color="secondary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Decks</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list> -->
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <CardsList cards="cards" />
    <!-- <div>
      <q-list dense bordered padding class="rounded-borders">
        <div class="flex">

          <q-item v-for="(card, index) in cards" :key="index" clickable v-ripple>
            <q-item-section>
              {{ card.name }}
            </q-item-section>
          </q-item>
        </div>
      </q-list>
    </div> -->
    <!-- <h1>Cards</h1> -->

    <div>
      <!-- QTable to display the list -->
      <q-table :rows="paginatedRows" :columns="columns" row-key="name" :pagination="pagination" hide-pagination dark />

      <!-- QPagination for navigation -->
      <q-pagination v-model="pagination.page" :max="totalPages" :max-pages="6" direction-links boundary-links dark
        @update:model-value="updatePaginatedRows" />
    </div>
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
import { fetchCollection } from "src/api/api";
import CardsList from "src/components/CardsList.vue";
import { defineComponent, onMounted } from "vue";
import { ref, computed } from 'vue';

export default defineComponent({
  name: "CardsPage",

  setup() {

    const onDisplay = ref('cards');
    const cards = ref([]);
    const columns = [
      { name: 'name', label: 'Name', field: 'name', align: 'left' },
      { name: 'set', label: 'Set', field: 'set_name', align: 'left' }
    ]

    const pagination = ref({
      page: 1,
      rowsPerPage: 9, // Number of rows per page
    });

    // Computed property to calculate total pages
    const totalPages = computed(() => Math.ceil(cards.value.length / pagination.value.rowsPerPage));

    // Computed property to get paginated rows
    const paginatedRows = computed(() => {
      const start = (pagination.value.page - 1) * pagination.value.rowsPerPage;
      const end = start + pagination.value.rowsPerPage;
      return cards.value.slice(start, end);
    });

    // Method to update paginated rows when page changes
    const updatePaginatedRows = () => {
      // This is handled automatically by the computed property
    };

    onMounted(
      async () => {
        cards.value = await fetchCollection()
      }
    )

    return {
      onDisplay,
      cards,
      columns,
      pagination,
      totalPages,
      paginatedRows,
      updatePaginatedRows,
    }
  }
});
</script>
