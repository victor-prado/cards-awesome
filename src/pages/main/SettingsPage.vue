<template>
  <q-page class="flex flex-center">
    <div class="GPLAY__toolbar-input-container row no-wrap">
      <q-input
        dense
        outlined
        square
        v-model="search"
        placeholder="Search"
        class="bg-white col"
      />
      <q-btn
        class="GPLAY__toolbar-input-btn"
        color="primary"
        icon="eva-search"
        unelevated
        @click="searchCards(search)"
      />
    </div>

    <div class="q-pa-md">
      <q-list v-for="(item, index) in searchResult" :key="index">
        <q-item clickable v-ripple>
          <q-item-section top avatar>
            <img :src="item.imageUrl" class="card-img-item" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ item.name }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script>
import { VueElement, defineComponent } from "vue";
import { api } from "boot/axios";
import { data } from "autoprefixer";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "SettingPage",

  data() {
    return {
      todoList: [
        {
          value: "Create an app",
          img: "https://cdn.quasar.dev/img/mountains.jpg",
        },
        {
          value: "Solve things",
          img: "https://cdn.quasar.dev/img/boy-avatar.png",
        },
        { value: "More", img: "https://cdn.quasar.dev/img/mountains.jpg" },
      ],
      search: "",
      searchResult: [],
    };
  },
  methods: {
    searchCards(userInput) {
      api
        .get("/v1/cards", { params: { name: userInput } })
        .then((resp) => {
          this.searchResult = resp.data.cards;
        })
        .catch(() => {
          useQuasar().notify({
            color: "negative",
            position: "top",
            message: "Loading failed",
            icon: "report_problem",
          });
        });
    },
  },
});
</script>
<style></style>
