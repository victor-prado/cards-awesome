<template>
  <div class="flex q-pb-xl q-pt-sm q-px-md">
    <div class="q-px-md q-pt-md" v-for="(card, index) in cards" :key="index" style="width: 210px;">
      <div class="justify-center">

        <router-link :to="'card/' + card.id">
          <q-img :src="card.image_uris.small" fit="contain" />
        </router-link>
        <div class="q-pt-sm text-body1 text-center">
          <router-link :to="'card/' + card.id" class="text-weight-light" style="text-decoration: none; color: inherit">
            {{ card.name }}
          </router-link>
        </div>
        <div class="q-pt-sm text-body1 text-center">$ {{ card.prices.usd }}</div>
        <q-separator v-if="report" color="neutral" inset />
      </div>
    </div>
    <q-resize-observer @resize="onResize" />
  </div>
</template>
<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "CardsList",
  props: {
    cards: {
      type: Array,
      required: true
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
