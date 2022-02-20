<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" flat fixed app>
      <v-toolbar-title   > </v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <v-snackbar
          v-model="snackbar.enabled"
          :color="snackbar.color"
          absolute
          top
        >
          <strong>{{ snackbar.message }}</strong>
          <template v-slot:action="{ attrs }">
            <v-btn dark icon v-bind="attrs" @click="snackbar.enabled = false">
              <v-icon dark>mdi-close</v-icon>
            </v-btn>
          </template>
        </v-snackbar>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/login",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Nanda",
    };
  },
   computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
    snackbar() {
      return this.$store.getters.Snackbar;
    }
  }
};
</script>
