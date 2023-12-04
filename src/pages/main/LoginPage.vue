<template>
  <q-page class="flex flex-center">
    <div class="col" style="max-width: 300px">
      <q-input
        filled
        dense
        v-model="text"
        bg-color="neutral"
        color="secondary"
        label-color="dark"
        label="Email"
      />
      <q-input
        filled
        dense
        class="q-mt-md"
        v-model="text"
        bg-color="neutral"
        color="secondary"
        label-color="dark"
        label="Password"
      />
      <div class="q-mt-lg">
        <q-btn
          flat
          color="primary"
          class="q-mr-sm"
          text-color="grey-1"
          label="Login"
        />
        <q-btn
          color="primary"
          text-color="grey-1"
          label="Register"
          to="/register"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "LoginPage",
});
</script>
