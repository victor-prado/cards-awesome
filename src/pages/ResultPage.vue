<template>
  <q-page class="flex flex-center">
    <q-list separator dark style="width: 80%">
      <q-item
        v-for="(card, index) in cards"
        :key="card.multiverseid"
        clickable
        :to="{ name: 'card', params: { id: card.id } }"
        v-ripple
        dark
        :class="index % 2 === 0 ? 'bg-grey-9' : 'bg-grey-8'"
      >
        <q-item-section class="col-md-8" avatar>
          <q-item-label class="text-grey-1 text-body1"
            ><a>{{ card.name }}</a></q-item-label
          >
        </q-item-section>

        <q-item-section>
          <div class="row">
            <q-avatar square class="card-img-item">
              <q-icon :name="card.icon_svg_uri" text-color="primary"></q-icon>
            </q-avatar>
            <q-item-label class="text-black" overline>{{
              card.set_name
            }}</q-item-label>
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "ResultPage",

  data() {
    return {
      lineColor: "bg-grey-6",
      cards: [
        {
          id: "023b5e6f-10de-422d-8431-11f1fdeca246",
          name: "Abu Ja'far",
          set_name: "Chronicles",
          icon_svg_uri: "img:https://svgs.scryfall.io/sets/chr.svg?1697428800",
        },
        {
          id: "d25ff6aa-a01d-49f2-926f-8f5457143b5c",
          name: "Adorable Kitten",
          set_name: "Unsanctioned",
          icon_svg_uri: "img:https://svgs.scryfall.io/sets/und.svg?1697428800",
        },
        {
          id: "9561ffdb-f4dd-4b62-a2c2-933498e3a061",
          name: "Aegis of Honor",
          set_name: "Odyssey",
          icon_svg_uri: "img:https://svgs.scryfall.io/sets/ody.svg?1697428800",
        },
      ],
    };
  },

  computed: {
    alternateColor() {
      return (value) => {
        const result = (value.charAt(0).toUpperCase() + value.slice(1)).replace(
          "_l",
          " L"
        );
        if (result === "Historicbrawl") {
          return "Historic Braw";
        } else if (result === "Paupercommander") {
          return "Pauper Commander";
        } else if (result === "Oldschool") {
          return "Old School";
        } else if (result === "Predh") {
          return "PreDH";
        } else {
          return result;
        }
      };
    },
  },
});
</script>

<style lang="scss" scoped>
.custom-icon {
  fill: red; /* Change the color to your desired color */
  width: 48px; /* Adjust the width and height as needed */
  height: 48px;
}
</style>
