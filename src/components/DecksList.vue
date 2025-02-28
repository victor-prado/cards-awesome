<template>
  <!-- <div v-if="isLoading">
    <q-spinner-hourglass color="primary" size="4em"></q-spinner-hourglass>
  </div> -->
  <div>
    <!-- <q-infinite-scroll @load="loadMore" :offset="1500"> -->
    <div class="flex q-pb-xl q-pt-sm q-px-md">
      <div class="q-px-md q-pt-md" v-for="deck in decks" :key="deck.id">
        <div class="justify-center">

          <router-link :to="'deck/' + deck.id">
            <div class="deck-image-wrapper">
              <q-img :src="deck?.list[0]?.image_uris.small" fit="none" position="50% 20%"
                style="height: 70px; width: 110px;" />
            </div>
          </router-link>
          <div class="q-pt-sm text-body1 text-center">
            <router-link :to="'deck/' + deck.id" style="text-decoration: none; color: inherit">
              {{ deck.name }}
            </router-link>

          </div>
          <div class="q-pt-sm text-body2 text-center text-weight-light">

            {{ deck.format }}
          </div>
          <!-- <q-separator v-if="report" color="neutral" inset /> -->
        </div>
      </div>
    </div>
    <!-- </q-infinite-scroll> -->
    <!-- <q-resize-observer @resize="onResize" /> -->
  </div>
</template>
<script>
import { defineComponent, computed, onMounted, ref, watch } from "vue";

export default defineComponent({
  name: "DecksList",
  props: {
    decks: {
      type: Array,
      required: true
    }
  },
  setup(props) {

    //const loadMore = (index, done) => {
    //  //    console.log('visibleCards', visibleCards)
    //  setTimeout(() => {
    //    const nextChunk = props.cards.slice(currentIndex, currentIndex + chunkSize);
    //    visibleCards.value = visibleCards.value.concat(nextChunk);
    //    currentIndex += chunkSize;
    //    done();
    //  }, 1000);
    //}

    // Watch for changes to the `cards` prop
    //watch(
    //  () => props.cards,
    //  (newCards) => {
    //    // Reset visibleCards when the cards prop changes
    //    visibleCards.value = newCards.slice(0, chunkSize);
    //  },
    //  { immediate: true } // Trigger the watcher immediately on component mount
    //);




    // const isLoading = computed(() => props.cards && props.cards.length === 0);
    // const problematicCards = props.cards.filter(c => !c.hasOwnProperty('image_uris'))
    // console.log(problematicCards)

    onMounted(
      async () => {
        //const firstChunk = props.cards.slice(currentIndex, currentIndex + chunkSize);
        //visibleCards.value = visibleCards.value.concat(firstChunk);
      }
    )


    return {
      // isLoading: true
      //visibleCards, //loadMore
    }
  },
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
