<template>
  <q-page class="flex flex-center">
    <q-form ref="form" @submit="submit">
      <div class="col" style="max-width: 300px">
        <q-input outlined rounded dense v-model="user.email" bg-color="neutral" color="secondary" label-color="dark"
          label="Email" />
        <q-input outlined rounded dense v-model="user.password" type="password" class="q-mt-md" bg-color="neutral"
          color="secondary" label-color="dark" label="Password" />
        <div class="q-mt-lg">
          <q-btn rounded flat color="primary" class="q-mr-sm" text-color="grey-1" label="Login" type="submit" />
          <q-btn rounded color="primary" text-color="grey-1" label="Register" to="/register" />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { login } from "src/firebase/firebase-login";
// import router from "src/router";
import { defineComponent } from "vue";
import { ref, reactive } from 'vue';

export default defineComponent({
  name: "LoginPage",
  setup() {
    const user = reactive({
      email: null,
      password: null
    });
    const form = ref(null);

    const submit = async () => {
      if (form.value.validate()) {
        try {
          await login(user)
          this.$router.push('/home');
        } catch (err) { }
      }
    };

    return {
      user,
      form,
      submit
    }
  },
});
</script>
