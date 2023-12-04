<template>
  <q-page class="flex flex-center">
    <div>
      <div class="q-pa-md">
        <div class="fit row wrap justify-around items-start content-start">
          <div class="q-my-sm">
            <div class="column justify-end">
              <q-img
                :src="card.imageUrl"
                fit="scale-down"
                height="370px"
                width="265px"
              />

              <q-btn
                class="q-ma-md"
                color="secondary"
                icon="eva-hard-drive-outline"
                label="Add to Collection"
                width="265px"
              />

              <q-btn
                class="q-mx-md"
                color="secondary-2"
                icon="eva-layers-outline"
                label="Add to Deck"
                max-width="265px"
              />
            </div>
          </div>
          <div class="col-md-4 q-my-sm">
            <q-card class="my-card bg-grey-9" flat bordered dark>
              <q-card-section>
                <div class="text-h5">{{ card.name }}</div>
                <div>{{ card.type_line }}</div>
              </q-card-section>

              <q-separator dark />

              <q-card-section>
                <div v-for="(line, index) in splitText(card.text)" :key="index">
                  <div>{{ line }}</div>
                </div>
              </q-card-section>

              <q-separator dark />

              <q-card-section>
                <div>{{ formattedValue(card.rarity) }}</div>
              </q-card-section>

              <q-separator dark />

              <q-card-section>
                <div>
                  <div class="row">
                    <div
                      class="col-md-6"
                      v-for="(valor, prop, index) in card.legalities"
                      :key="index"
                    >
                      <div class="row">
                        <div class="text-bold">{{ formattedValue(prop) }}</div>
                        : {{ formattedValue(valor) }}
                      </div>
                    </div>
                  </div>
                </div>
              </q-card-section>

              <q-slide-transition>
                <div v-show="expanded">
                  <q-separator dark />
                  <q-card-section class="text-subtitle2">
                    {{ card.text }}
                  </q-card-section>
                </div>
              </q-slide-transition>
            </q-card>
          </div>
          <div class="row q-my-sm">
            <div class="q-mx-sm">
              <div>Table Top</div>
              <div class="text-h5">$ {{ card.prices.usd }}</div>
            </div>
            <div class="q-mx-sm">
              <div>Rent</div>
              <div class="text-h5">$ {{ card.prices.tix }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";

export default defineComponent({
  name: "CardTemp",
  data() {
    return {
      expanded: ref(false),
      inCollection: 0,
      card: {
        name: "Sheoldred, the Apocalypse",
        type_line: "Legendary Creature — Phyrexian Praetor",
        setName: "Dominaria United",
        imageUrl:
          "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=574587&type=card",
        text: "Deathtouch\nWhenever you draw a card, you gain 2 life.\nWhenever an opponent draws a card, they lose 2 life.",
        prices: {
          usd: "67.93",
          tix: "21.47",
        },
        keywords: ["Deathtouch"],
        rarity: "mythic",
        legalities: {
          standard: "not_legal",
          future: "not_legal",
          historic: "not_legal",
          gladiator: "not_legal",
          pioneer: "not_legal",
          explorer: "not_legal",
          modern: "not_legal",
          legacy: "not_legal",
          pauper: "not_legal",
          vintage: "not_legal",
          penny: "not_legal",
          commander: "not_legal",
          oathbreaker: "not_legal",
          brawl: "not_legal",
          historicbrawl: "not_legal",
          alchemy: "not_legal",
          paupercommander: "not_legal",
          duel: "not_legal",
          oldschool: "not_legal",
          premodern: "not_legal",
          predh: "not_legal",
        },
      },
    };
  },

  computed: {
    formattedValue() {
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
    splitText() {
      return (text) => {
        return text.split("\n");
      };
    },
  },
});
</script>
