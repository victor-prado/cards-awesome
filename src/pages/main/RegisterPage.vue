<template>
  <q-page class="flex flex-center">
    <q-form ref="form" @submit="submit">
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
        <q-input
          filled
          dense
          class="q-mt-md"
          v-model="text"
          bg-color="neutral"
          color="secondary"
          label-color="dark"
          label="Confirm Password"
        />
        <div class="q-mt-lg">
          <q-btn
            color="primary"
            class="q-mr-sm"
            text-color="grey-1"
            label="Create Account"
          />
          <q-btn
            flat
            color="info"
            text-color="grey-1"
            label="Back to Login"
            to="/login"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { ref, reactive } from "vue";
import register from "src/firebase/firebase-login";
import { useRouter } from "vue-router";

const user = reactive({
  last_name: null,
  first_name: null,
  email: null,
  password: null,
});

const form = ref(null);

const submit = async () => {
  if (form.value.validate() && !!(await register(user))) {
    const router = useRouter();
    router.push("/app");
  }
};

export default defineComponent({
  name: "RegisterPage",
});
</script>
