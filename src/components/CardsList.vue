<template>
  <!-- <div v-if="isLoading">
    <q-spinner-hourglass color="primary" size="4em"></q-spinner-hourglass>
  </div> -->
  <div>
    <q-infinity-scroll @load="loadMore" :offset="100">
      <div class="flex q-pb-xl q-pt-sm q-px-md">
        <div class="q-px-md q-pt-md" v-for="(card, index) in visibleCards" :key="index" style="width: 210px;">
          <div class="justify-center">

            <router-link :to="'card/' + card.id">
              <q-img :src="card?.image_uris?.small" fit="contain" />
            </router-link>
            <div class="q-pt-sm text-body1 text-center">
              <router-link :to="'card/' + card.id" class="text-weight-light"
                style="text-decoration: none; color: inherit">
                {{ card.name }}
              </router-link>
            </div>
            <div class="q-pt-sm text-body1 text-center">$ {{ card.prices.usd }}</div>
            <!-- <q-separator v-if="report" color="neutral" inset /> -->
          </div>
        </div>
      </div>
    </q-infinity-scroll>
    <!-- <q-resize-observer @resize="onResize" /> -->
  </div>
</template>
<script>
import { defineComponent, computed, onMounted, ref } from "vue";

export default defineComponent({
  name: "CardsList",
  props: {
    cards: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const visibleCards = ref([]);
    const chunkSize = 20;
    let currentIndex = 0;
    const loadMore = (index, done) => {
      setTimeout(() => {
        const nextChunk = props.cards.slice(currentIndex, currentIndex + chunkSize);
        visibleCards.value = visibleCards.value.concat(nextChunk);
        currentIndex += chunkSize;
        done();
      }, 1000);
    }



    // const isLoading = computed(() => props.cards && props.cards.length === 0);
    // const problematicCards = props.cards.filter(c => !c.hasOwnProperty('image_uris'))
    // console.log(problematicCards)

    onMounted(
      async () => {
        const firstChunk = props.cards.slice(currentIndex, currentIndex + chunkSize);
        visibleCards.value = visibleCards.value.concat(firstChunk);
      }
    )


    return {
      // isLoading: true
      visibleCards, loadMore
    }
  },

  // watch: {
  //   cards: {
  //     handler(newCards) {
  //       if (newCards.length > 0) {
  //         this.isLoading = false;
  //       }
  //     },
  //     immediate: true
  //   }
  // }
});
</script>
<style scoped>
.custom-icon image {
  fill: red;
  /* Change the color to your desired color */
  width: 48px;
  /* Adjust the width and height as needed */
  height: 48px;
}
</style>
