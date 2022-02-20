<template>
  <v-app dark>
    <v-dialog v-model="dialog_logout" width="300">
      <v-card class="rounded-lg">
        <v-toolbar dense flat dark color="primary">
          <v-toolbar-title>
            <b>Logout</b>
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon @click="dialog_logout = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <br />

        <v-card-text> Apakah Anda Yakin Ingin Logout ? </v-card-text>
        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn
            class="text-capitalize"
            color="secondary"
            @click="dialog_logout = false"
            text
          >
            <b>Cancel</b>
          </v-btn>
          <v-btn class="text-capitalize" color="error" @click="OnLogout()" text>
            <b>Logout</b>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-img

        class="mx-2"
        src="your_logo.png"
        max-height="40"
        max-width="100"
          @click="$router.push({ path: '/'})"
      ></v-img>

      <v-spacer />

      <v-menu open-on-hover bottom offset-y>
        <template v-slot:activator="{ on }">
          <div v-on="on">
            <v-avatar size="32px" item>
              <v-img src="https://cdn.vuetifyjs.com/images/lists/5.jpg" />
            </v-avatar>
             <!-- v-if="!this.$vuetify.breakpoint.mobile" -->
            <span v-if="!breakpoint_mobile">
              <b>Nama User</b>
            </span>
          </div>
        </template>
        <v-card max-width="300" flat class="rounded-lg">
          <v-list dense>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title
                  class="font-weight-bold"
                  style="cursor: pointer"
                  >Beri Masukan</v-list-item-title
                >
              </v-list-item-content>

              <v-list-item-icon>
                <v-icon> mdi-chevron-right </v-icon>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title
                  @click="dialog_logout = true"
                  class="error--text font-weight-bold"
                  style="cursor: pointer"
                >
                  <v-icon color="error"> mdi-exit-to-app </v-icon
                  >Logout</v-list-item-title
                >
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-main>
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
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      dialog_logout: false,
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Dashboard",
          to: "/",
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
      DataUser: [],
      breakpoint_mobile : false
    };
  },
  created() {
    this.breakpoint_mobile = this.$vuetify.breakpoint.mobile

  },
  methods: {
    BeriMasukan() {
      window.open("https://forms.gle/opDNaV4opUCt6yVA7", "_blank");
    },
    OnLogout() {
      this.$cookies.removeAll();
      this.$store.commit("SET_USER", null);
      this.$store.commit("SET_TOKEN", null);

      this.$router.push("/login");
    },
  },
  computed: {

    snackbar() {
      return this.$store.getters.Snackbar;
    },

  },
};
</script>
