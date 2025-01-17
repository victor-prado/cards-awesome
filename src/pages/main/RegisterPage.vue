<template>
  <q-page class="flex flex-center">
    <q-form ref="form" @submit="submit">
      <div class="col" style="max-width: 300px">
        <q-input outlined rounded dense v-model="user.name" bg-color="neutral" color="secondary" label-color="dark"
          label="Name" />
        <q-input outlined rounded dense v-model="user.email" class="q-mt-md" bg-color="neutral" color="secondary"
          label-color="dark" label="Email" />
        <q-input outlined rounded dense v-model="user.password" type="password" class="q-mt-md" bg-color="neutral"
          color="secondary" label-color="dark" label="Password" />
        <q-input outlined rounded dense v-model="user.confirmPassword" type="password" class="q-mt-md"
          bg-color="neutral" color="secondary" label-color="dark" label="Confirm Password" />
        <div class="q-mt-lg">
          <q-btn rounded color="primary" text-color="grey-1" type="submit" label="Register" />
          <q-btn rounded flat color="primary" class="q-mr-sm" text-color="grey-1" label="Back to Login" to="/login" />
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
import { supabase } from "src/supabase";
import { useQuasar } from "quasar";

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
    const $q = useQuasar();
    const user = reactive({
      name: null,
      email: null,
      password: null,
      confirmPassword: null,
    });
    const form = ref(null);

    const submit = async () => {
      const { data, error } = await supabase.auth.signUp(
        {
          email: user.email,
          password: user.password,
          options: {
            data: {
              name: user.name,
            }
          }
        }
      )
      if (error) {
        $q.notify({ type: 'negative', message: error.message });
      } else {
        $q.notify({ type: 'positive', message: 'Register Successful' });
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
