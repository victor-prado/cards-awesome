<template>
  <q-page class="flex flex-center">
    <div class="row absolute-top">
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
    <h1>Cards</h1>
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
import { defineComponent, onMounted } from "vue";
import { ref } from 'vue';
import { db } from 'src/firebase/index';
import { collection, query, where, getDocs } from "firebase/firestore";

export default defineComponent({
  name: "CardsPage",

  setup() {

    const onDisplay = ref('cards');
    const cards = ref([]);

    const q = query(collection(db, "userCard"), where("userId", "==", 'x8AKqlzi3WKIU41q7Rte'));

    const loadCards = async () => {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
    }

    onMounted(() => {
      return loadCards();
    })

    return {
      onDisplay,
      cards
    }
  }
});
</script>
