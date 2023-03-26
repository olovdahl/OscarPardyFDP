<template>
    <v-container>
      <v-row class="justify-center" align="center" style="height: 100%;">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="pa-5">
            <v-card-title class="text-h5">Login</v-card-title>
            <v-card-text>
              <v-form ref="loginForm" @submit.prevent="handleLogin">
                <v-text-field
                  label="Username"
                  v-model="username"
                  required
                  :rules="[v => !!v || 'Username is required']"
                ></v-text-field>
                <v-text-field
                  label="Password"
                  type="password"
                  v-model="password"
                  required
                  :rules="[v => !!v || 'Password is required']"
                ></v-text-field>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" type="submit">Login</v-btn>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  

<script>

import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useStore } from 'vuex';


export default {
  setup() {
    const store = useStore();
    const username = ref('');
    const password = ref('');
    const router = useRouter();

    async function handleLogin() {
      // Call an action to handle the login process
      const token = await store.dispatch('login', { username: username.value, password: password.value });

      if (token) {
        // Save the token in the store
        store.commit('setJwtToken', token);
        router.push({ name: 'Home' });

        // Redirect the user to another page after a successful login, e.g., the home page
        // this.$router.push({ name: 'Home' }); // If using Options API
      } else {
        // Show an error message
      }
    }

    return {
      username,
      password,
      handleLogin,
    };
  },
};
</script>