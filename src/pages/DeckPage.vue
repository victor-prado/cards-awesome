<template>
  <q-page class="flex flex-center">
    <div v-if="loading">
      <q-spinner color="primary" size="50px" />
    </div>
    <div v-else>
      <div class="flex items-center">
        <div class="q-px-md q-pt-md" style="width: 260px;">
          <div class="justify-center ">
            <q-img :src="currentImg" fit="contain" no-transition />
          </div>
        </div>
        <div class="flex">
          <div v-for="(chunk, index) in chunks" :key="index">
            <!-- <div>{{ chunk }}</div> -->
            <div v-for="(item, index) in chunk" :key="index">
              <div v-for="(list, key) in item" :key="key">
                <div class="text-subtitle1 text-weight-bold">{{ key }}</div>
                <q-list class="multi-column-list" bordered>
                  <q-item v-for="(value, key) in list" :key="key">
                    <q-item-section>
                      <div class="flex items-center">
                        <!-- <div>{{ value }}</div> -->
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

                        <!-- <div>{{ value.quantity }}</div> -->
                        <div class="q-px-sm" @mouseover="() => handleHover(value)">
                          {{ value?.card?.name }}
                        </div>
                      </div>
                    </q-item-section>
                    <!-- <q-item-section side>
                      <q-btn label="..." />
                      <q-popup-proxy>
                        <q-banner>
                          <template v-slot:avatar>
                            <q-icon name="signal_wifi_off" color="primary" />
                          </template>
                          You have lost connection to the internet. This app is offline.
                        </q-banner>
                      </q-popup-proxy>
                    </q-item-section> -->
                  </q-item>
                </q-list>
              </div>
              <!-- <div>{{ item }}</div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from "quasar";
import { fetchCard, fetchDeck } from "src/api/api";
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
      }
    )



    return {
      loading, deck, groupedMain, chunks, currentImg, handleHover
    }
  }
});
</script>
<style scoped></style>