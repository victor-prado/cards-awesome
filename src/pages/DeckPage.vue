<template>
  <q-page class="flex flex-center">
    <div v-if="loading">
      <q-spinner color="primary" size="50px" />
    </div>
    <div v-else>
      <div class="text-center">

        <div class="q-px-md q-pt-md flex flex-center fixed bg-dark"
          style="z-index: 1000; left: 50%; transform: translateX(-50%);">
          <q-select class="q-pa-sm" filled clearable hide-dropdown-icon v-model="selectedItem" use-input hide-selected
            fill-input input-debounce="300" :options="suggestions" option-label="name" label="Search"
            @filter="fetchSuggestions" @update:model-value="itemSelected" dark rounded="false" outlined
            style="width: 260px;" dense>
            <!-- Custom option with image -->
            <template v-slot:option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section avatar>
                  <!-- Assuming your suggestion objects have an 'image' property -->
                  <q-img :src="scope.opt.image" style="width: 40px; height: 50px; border-radius: 4px;"
                    v-if="scope.opt.image" fit="contain" />
                  <!-- Fallback if no image -->
                  <q-icon name="image" size="0px" color="grey" v-else />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ scope.opt.name }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>

            <!-- Custom selected item display -->
            <template v-slot:selected>
              <div class="row items-center" v-if="selectedItem">
                <q-avatar size="24px" class="q-mr-sm">
                  <q-img :src="selectedItem.image" style="width: 24px; height: 24px; border-radius: 4px;"
                    v-if="selectedItem.image" />
                  <q-icon name="image" size="24px" color="grey" v-else />
                </q-avatar>
                <span>{{ selectedItem.name }}</span>
              </div>
            </template>

            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results found
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <div class="q-pl-md">
            <q-btn round :outline="true" color="positive" icon="eva-plus-outline" />
          </div>

          <div class="q-pl-sm q-pr-md">
            <q-btn round outline="false" color="accent" icon="eva-search-outline" />
          </div>

        </div>
      </div>
      <!-- <div class="q-px-md q-pt-md" style="width: 260px;">
        <div class="justify-center ">
          <q-img :src="selectedItem?.image_normal" fit="contain" no-transition />
        </div>
      </div> -->

      <div class="flex items-center" style="padding-top: 80px;">

        <div class="q-pr-md q-pt-md large-screen-only" style="width: 260px;">
          <div class="flex flex-center" style="height: 100%;">
            <q-img :src="currentImg" fit="contain" no-transition />
          </div>
        </div>
        <div class="flex">
          <div v-for="(chunk, index) in chunks" :key="index">
            <div v-for="(item, index) in chunk" :key="index">
              <div v-for="(list, key) in item" :key="key">
                <div class="text-subtitle1 text-weight-bold q-px-md">{{ key }}</div>
                <q-list class="multi-column-list" filled bordered>
                  <q-item v-for="(value, key) in list" :key="key">
                    <q-item-section>
                      <div class="flex items-center">
                        <q-btn :label="value.quantity" />

                        <q-popup-edit dark v-model.number="value.quantity" :validate="val => val >= 0" v-slot="scope">
                          <div class="q-px-md q-pt-md" style="width: 260px;">
                            <div class="justify-center">
                              <router-link :to="'card/' + value.card.id">
                                <q-img :src="value.card?.image_uris?.normal" fit="contain" />
                              </router-link>
                            </div>
                          </div>
                          <q-input dark type="number" v-model.number="scope.value" dense autofocus
                            @keyup.enter="scope.set">
                            <template v-slot:after>
                              <q-btn flat dense color="negative" icon="eva-close-circle"
                                @click.stop.prevent="scope.cancel" />
                              <q-btn flat dense color="positive" icon="eva-checkmark-circle-2"
                                @click.stop.prevent="scope.set"
                                :disable="scope.validate(scope.value) === false || scope.initialValue === scope.value" />
                            </template>
                          </q-input>
                        </q-popup-edit>
                        <div class="q-px-sm" @mouseover="() => handleHover(value)">
                          {{ value?.card?.name }}
                        </div>
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { fetchCard, fetchDeck, searchCard } from "src/api/api";
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "DeckPage",
  setup() {
    const deck = ref(null);
    const loading = ref(true);
    const route = useRoute();
    const groupedMain = ref(null);

    const columns = ref(null);
    const chunkSize = 10;

    const chunks = ref([]);

    const currentImg = ref(null);

    const handleHover = (obj) => {
      currentImg.value = obj.card.image_uris.normal;
    }

    const selectedItem = ref(null);
    const suggestions = ref([]);

    const fetchSuggestions = async (val, update) => {
      if (val.length < 2) {
        update(() => { suggestions.value = [] });
        return;
      }

      try {
        const data = await searchCard(val);
        console.log('data', data);
        update(() => {
          suggestions.value = data.map(c => {
            return {
              name: c.name,
              value: c.id,
              image: c.image_uris.small,
              image_normal: c.image_uris.normal
            }
          })

          console.log('suggestions', suggestions.value);
        });
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        update(() => { suggestions.value = [] })
      }
    }

    const itemSelected = (item) => {
      if (item) {
        // Handle the selected item
        console.log('Selected:', item)
      }
    }

    onMounted(
      async () => {
        const deckId = route.params.id;
        deck.value = await fetchDeck(deckId);
        deck.value.list.mainBoard.sort((a, b) => b.card.cmc - a.card.cmc);
        deck.value.list.sideBoard.sort((a, b) => b.card.cmc - a.card.cmc);

        groupedMain.value = Object.groupBy(deck.value.list.mainBoard, ({ card }) => {
          const group = card.type_line.split(' — ')[0];
          if (group.includes('Land')) {
            return 'Land'
          }
          return card.type_line.split(' — ')[0];
        });

        columns.value = deck.value.list.mainBoard

        // chunks
        let currentChunk = [];
        let currentChunkSize = 0;
        for (const [key, value] of Object.entries(groupedMain.value)) {
          console.log(`${key}`);
          console.log('value', value);
          if (value.length > chunkSize) {
            chunks.value.push([{ [key]: value }]);
          }

          if (currentChunkSize + value.length > chunkSize) {
            chunks.value.push(currentChunk);
            currentChunk = [];
            currentChunkSize = 0;
          }

          currentChunk.push({ [key]: value });
          // currentChunkSize += currentChunk.reduce((acc, cv) => acc + Object.values(cv)[0].length, 0)
          currentChunkSize += value.length

          console.log('currentChunk', currentChunk);
          console.log('currentChunkSize', currentChunkSize);
        }
        chunks.value.push(currentChunk);
        // fim

        currentImg.value = deck.value.list.mainBoard[0].card.image_uris.normal;

        console.log('chunks', chunks.value);
        console.log('groupedMain', groupedMain.value);
        loading.value = false;


        const data = await searchCard('sheoldred');
        console.log('searchCard', data);
      }
    )



    return {
      loading, deck, groupedMain, chunks, currentImg, handleHover,
      selectedItem,
      suggestions,
      fetchSuggestions,
      itemSelected
    }
  }
});
</script>
<style scoped></style>