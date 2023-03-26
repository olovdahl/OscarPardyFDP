<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <v-list>
        <v-list-item-group>
          <template v-for="(board, index) in boards" :key="index">
            <v-list-item  @click="$router.push(`/board/${board.id}`)">
              <v-list-item-title>{{ board.name }}</v-list-item-title>
            </v-list-item>
          </template>
        </v-list-item-group>
        <v-divider></v-divider>
        <v-list-item @click="$router.push('/createboard')">
          <v-list-item-title>Create Board</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Oscarpardy</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

  export default {
    data: () => ({ drawer: null }),
    computed: {
    ...mapGetters(["boards"]),
  },
  }
</script>