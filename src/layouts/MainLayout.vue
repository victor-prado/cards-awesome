<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-grey-10 clear-border" dark bordered>
      <q-toolbar class="">
        <q-btn flat text-color="secondary-2" @click="$router.go(-1)">
          <q-icon name="eva-arrow-ios-back-outline" />
        </q-btn>

        <div class="absolute-center custom-standout">
          <q-form @submit="onSearch(searchInput)">
            <q-input dark v-model="searchInput" rounded standout="bg-grey-9" dense @focus="searchBarFocused = true"
              @blur="searchBarFocused = false">
              <template v-slot:append>
                <q-icon name="eva-search" color="grey-1" />
              </template>
            </q-input>
          </q-form>
        </div>
        <div v-if="currentUser" class="q-ml-auto q-pr-md" @click="showUserInfo">
          <q-avatar size="md">
            <img src="/avatar2.png">
          </q-avatar>

          <q-menu dark touch-position>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section>{{ currentUser.email }}</q-item-section>
              </q-item>
              <q-separator />
              <q-item @click="signoutCurrentUsert" clickable v-close-popup>
                <q-item-section><a>Sign out</a></q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </div>
        <div v-else class="q-ml-auto q-pr-md large-screen-only">
          <q-btn label="Sign In" to="/login" />
        </div>
      </q-toolbar>
    </q-header>
    <div class="large-screen-only">
      <q-drawer v-model="drawer" show-if-above overlay persistent :width="180" :breakpoint="500" dark bordered
        class="bg-grey-10 fixed-position" style="position: fixed;">
        <q-scroll-area class="fit">
          <div class="fixed-top-lef" style="padding-left: 6px">
            <q-list padding class="menu-list" active-color="secondary">
              <q-item v-for="(item, index) in menuList" :key="index" clickable v-ripple :to="item.path">
                <q-item-section>{{ item.label }}</q-item-section>
                <q-item-section avatar>
                  <q-icon :name="item.icon" />
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </q-scroll-area>
      </q-drawer>
    </div>
    <q-page-container>
      <div class="my-padding">
        <search-result-page v-if="this.$route.name === 'search-result'" :textInput="searchInput" :cards="searchResult"
          class="rounded-frame"></search-result-page>

        <router-view v-else class="q-dark" />
      </div>
    </q-page-container>

    <q-footer class="bg-dark small-screen-only clear-border" dark bordered>
      <q-tabs active-color="secondary" indicator-color="transparent">
        <q-route-tab name="tabPrinc" :icon="princIcon" to="/home" />
        <q-route-tab name="tabCards" :icon="cardsIcon" to="/cards" />
        <q-route-tab name="tabAdd" :icon="addIcon" to="/add-card" />
        <q-route-tab name="tabSet" :icon="setIcon" :to="{
          name: 'card',
          params: { id: '6f8522de-9967-523d-9568-d0dab4547541' },
        }" />
        <q-route-tab name="tabUser" :icon="userIcon" to="/card-temp" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import SearchResultPage from "src/pages/SearchResultPage.vue";
import { api } from "boot/axios";
// import { auth } from "src/firebase/index";
// import { onAuthStateChanged } from 'firebase/auth';
import { signOutUser } from "src/firebase/firebase-signout";

import { supabase } from "src/supabase";
import { useQuasar } from "quasar";

//import EssentialLink from "components/EsprimaryentialLink.vue";

export default defineComponent({
  name: "MainLayout",
  components: {
    SearchResultPage,
  },
  props: {
    princIcon: {
      type: String,
      default: "eva-home-outline",
    },
    cardsIcon: {
      type: String,
      default: "eva-layers-outline",
    },
    addIcon: {
      type: String,
      default: "eva-plus-circle-outline",
    },
    setIcon: {
      type: String,
      default: "eva-settings-2-outline",
    },
    userIcon: {
      type: String,
      default: "eva-person-outline",
    },

  },
  methods: {
    showUserInfo() {
      console.log('Current User: ' + this.currentUser.email);
    },

    async signoutCurrentUsert() {
      const { error } = await supabase.auth.signOut()
      if (error) {
        this.$q.notify({ type: 'negative', message: error.message });
      } else {
        this.$q.notify({ type: 'positive', message: 'User Signed out' });
        this.$router.push('/home');
      }
      // try {
      //   await signOutUser()
      //   this.$router.push('/home');
      // } catch (err) { }
    },

    onSearch(textInput) {
      if (this.$route.name === "search-result") {
        api
          .get("/v1/cards", { params: { name: textInput } })
          .then((resp) => {
            this.searchResult = resp.data.cards.filter(
              (card) => card.imageUrl != undefined
            );
            console.log(resp);
          })
          .catch(() => {
            useQuasar().notify({
              color: "negative",
              position: "top",
              message: "Loading failed",
              icon: "report_problem",
            });
          });

        console.log("already in page: " + this.searchInput);
      } else {
        this.$router.push({
          name: "search-result",
          //params: { textInput: this.searchInput },
        });
      }

      console.log("submited");
    },

  },

  watch: {
    searchBarFocused(newValue) {
      if (newValue) {
        this.searchIconColor = "primary";
      } else {
        this.searchIconColor = "white";
      }
    },
  },

  mounted() {
    // onAuthStateChanged(auth, (user) => {
    //   if (user) {
    //     // User is signed in.
    //     this.currentUser = user;
    //   } else {
    //     // No user is signed in.
    //     this.currentUser = null;
    //   }
    // });

    supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session)

      if (session) {
        // User is signed in.
        this.currentUser = session.user;
      } else {
        // No user is signed in.
        this.currentUser = null;
      }
    })
  },

  data() {
    return {
      currentUser: null,
      showSearchBar: false,
      searchInput: "",
      searchIconColor: "white",
      searchResult: [],
      searchBarFocused: false,
      $q: useQuasar(),
      menuList: [
        {
          icon: "eva-home-outline",
          label: "Home",
          path: "/home",
        },
        {
          icon: "eva-layers-outline",
          label: "Cards",
          path: "/cards",
        },
        {
          icon: "eva-plus-circle-outline",
          label: "Add Card",
          path: "/result",
        },
        {
          icon: "eva-settings-2-outline",
          label: "Setting",
          path: "/atemp",
        },
        {
          icon: "eva-person-outline",
          label: "User",
          path: "/card-temp",
        },
      ],
    };
  },

  setup() { },
});
</script>

<style lang="scss" scoped>
body {
  background-color: $grey-9;
}

.q-item.q-router-link--active,
.q-item--active {
  color: $secondary;
}

.menu-list .q-item {
  border-radius: 0 32px 32px 0;
}

.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  /* 100% of the viewport height */
}

.q-footer .q-tab {
  min-width: 14px;
}

.clear-border {
  border-color: rgba(255, 255, 255, 0.12);
}

.custom-standout input[type="text"] {
  color: white;
  /* Change the color of the typed text */
}

.custom-standout input[type="text"]:focus {
  color: green;
  /* Change the color of the typed text */
}

.q-drawer--left.q-drawer--bordered {
  border-right: 1px solid rgba(255, 255, 255, 0.12);
  position: fixed;
}

.my-padding {
  @media (min-width: $breakpoint-sm-max) {
    padding-left: 180px;
  }
}
</style>
