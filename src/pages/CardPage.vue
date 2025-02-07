<template>
  <q-page class="flex flex-center">
    <div v-if="loading">
      <q-spinner color="primary" size="50px" />
    </div>
    <div v-else>
      <div class="fit row wrap justify-center items-center content-start">

        <div>
          <q-img :src="card.image_uris.normal" style=" width: 230px; " />
          <div v-if="false" class="q-py-sm">
            <q-btn v-if="copies == 0" class="q-pa-" color="primary" icon="eva-plus-outline" label="Add Card" />
          </div>
          <div v-else class="q-py-sm row">
            <q-btn v-if="copies == 0" class="q-pa-" color="primary" icon="eva-plus-outline" label="Add Card"
              @click="newCopy = 1" />
            <q-btn v-else class="q-pa-" size="md" :label='"In your collection: " + copies' @click="newCopy = 0" />
            <q-popup-edit dark v-model.number="copies" :validate="val => val >= 0" v-slot="scope">
              <q-input dark type="number" v-model.number="scope.value" dense autofocus @keyup.enter="scope.set"
                @focus="scope.value += newCopy">
                <template v-slot:after>
                  <q-btn flat dense color="negative" icon="eva-close-circle" @click.stop.prevent="scope.cancel" />

                  <q-btn flat dense color="positive" icon="eva-checkmark-circle-2" @click.stop.prevent="scope.set"
                    :disable="scope.validate(scope.value) === false || scope.initialValue === scope.value" />
                </template>
              </q-input>
              <!-- <q-btn class="q-pa-" size="md" label="Save" /> -->
            </q-popup-edit>
            <!-- <q-input class="q-pl-sm" dark v-model.number="copies" @blur="handleCopies" type="number" filled
              style="max-width: 70px" />
            <div class="q-px-sm text-subtitle1 row">
              In your collection: <div class="q-px-sm text-weight-bold">{{ copies }}</div>
              <q-popup-edit v-model.number="copies" auto-save v-slot="scope">
                <q-input type="number" v-model.number="scope.value" dense autofocus @keyup.enter="scope.set" />
              </q-popup-edit>
            </div> -->

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
      <div class="q-px-sm">
        <!-- <h5 class="q-px-sm">Prices</h5> -->
        <div class="items-center text-body2 q-px-sm flex">
          <!-- Price:  -->
          <div class="">Estimated price:</div>
          <div class="text-h6 q-pl-sm">${{ card.prices.usd }}</div>
          <!-- <h5>${{ card.prices.usd }}</h5> -->
        </div>
      </div>
      <!-- <q-separator color="neutral" /> -->
      <div class="q-pa-sm">
        <h5 class="q-px-sm">Legalties</h5>
        <div class="text-body2 row ">
          <div v-for="( c, i ) in  legalitiesCols " :key="i">
            <div v-for="( item, index ) in  card.legalities.slice(c * legalitiesColSize, (c + 1) * legalitiesColSize) "
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
import { useQuasar } from "quasar";
import { fetchCard } from "src/api/api";
import { defineComponent, onMounted, ref, watch } from "vue";
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
    const $q = useQuasar()
    const newCopy = ref(null)

    const showNotif = (image) => {
      $q.notify({
        message: 'Card added to collection.',
        color: 'primary',
        avatar: image
      })
    }

    // Watch for changes in 'count'
    watch(copies, (newValue, oldValue) => {
      const image = card.value.image_uris.small

      if (newValue === oldValue || oldValue === null) {
        return
      }

      if (oldValue == 0) {
        $q.notify({
          message: 'Card added to collection.',
          color: 'positive',
          avatar: image
        })
      } else if (newValue == 0) {
        $q.notify({
          message: 'Card removed from collection.',
          color: 'negative',
          avatar: image
        })
      } else {
        $q.notify({
          message: 'Number of copies updated.',
          color: 'info',
          avatar: image
        })
      }
      // showNotif(card.image_uris.small)
      // console.log(`Count changed from ${oldValue} to ${newValue}`);
    });

    // function handleCopies() {
    //   alert("Sure you want to change the number of copies?")
    // }

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
        newCopy.value = 0
      }
    )

    return {
      card, loading, legalitiesCols, legalitiesColSize, copies, showNotif, newCopy

    }
  }
});
</script>
