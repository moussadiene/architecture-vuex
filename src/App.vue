<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img alt="Vuetify Logo" class="shrink mr-2" contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png" transition="scale-transition" width="40" />

        <v-img alt="Vuetify Name" class="shrink mt-1 hidden-sm-and-down" contain min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png" width="100" />
      </div>


      <v-spacer></v-spacer>
      <div>
        <router-link dark to="/">Home</router-link>
        <router-link to="/about">About</router-link>
      </div>
      <v-btn to="/" text>
        <span class="mr-2">Home</span>

      </v-btn>
      <v-btn to="/about" text>
        <span class="mr-2">About</span>
      </v-btn>
      <v-btn to="/vuex" text>
        <span class="mr-2">Todo</span>
      </v-btn>
    
      <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text>
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
