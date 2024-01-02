<template>
  <q-page class="flex flex-center">
    <q-form ref="form" @submit="submit">
      <div class="col" style="max-width: 300px">
        <q-input filled dense v-model="user.name" bg-color="neutral" color="secondary" label-color="dark" label="Nome" />
        <q-input filled dense v-model="user.email" class="q-mt-md" bg-color="neutral" color="secondary" label-color="dark"
          label="Email" />
        <q-input filled dense v-model="user.password" class="q-mt-md" bg-color="neutral" color="secondary"
          label-color="dark" label="Password" />
        <q-input filled dense v-model="user.confirmPassword" class="q-mt-md" bg-color="neutral" color="secondary"
          label-color="dark" label="Confirm Password" />
        <div class="q-mt-lg">
          <q-btn color="primary" class="q-mr-sm" text-color="grey-1" label="Create Account" type="submit" />
          <q-btn flat color="info" text-color="grey-1" label="Back to Login" to="/login" />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import { ref, reactive } from "vue";
import register from "src/firebase/firebase-register";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "RegisterPage",
  // props: {
  //   form: ref(null),
  // },
  // methods: {
  //   async submit() {
  //     if (form.value.validate() && !!(await register(user))) {
  //       const router = useRouter();
  //       router.push("/home");
  //     }
  //   }
  // },
  setup() {
    const user = reactive({
      name: null,
      email: null,
      password: null,
      confirmPassword: null,
    });
    const form = ref(null);

    const submit = async () => {
      if (form.value.validate() && !!(await register(user))) {
        const router = useRouter();
        router.push("/home");
      }
    }

    return {
      user,
      form,
      submit
    }
  },
  // data() {
  //   return {
  //     user: reactive({
  //       name: null,
  //       email: null,
  //       password: null,
  //       confirmPassword: null,
  //     }),
  //     form: ref(null),
  //   }
  // }
});
</script>
