<template>
  <v-app id="inspire">
    <v-container fluid fill-height>
      <v-layout align-top justify-center>
        <v-flex xs12 sm8 md4>
          <v-img src="your_logo.png" />
          <v-card class="elevation-10">
            <v-toolbar dense dark flat color="primary">
              <v-toolbar-title class="font-weight-bold">
                Login Form
              </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  prepend-icon="mdi-account"
                  name="login"
                  v-model="email"
                  label="Login"
                  type="text"
                ></v-text-field>
                <v-text-field
                  id="password"
                  prepend-icon="mdi-lock"
                  name="password"
                  v-model="password"
                  label="Password"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn disabled color="secondary">Register</v-btn>
              <v-btn @click="FuncLogin()" color="primary">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  //   middleware({ store, redirect }) {
  //   console.log("login ", store.state.token);
  //   // if (store.state.token) {
  //   //   return redirect("/");
  //   // }
  // },
  name: "Login",
  data() {
    return {
      email: null,
      password: null,

      showPassword: false,

      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
    };
  },

  computed: {
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
  methods: {
    FuncLogin() {
      //  this.$router.replace("/dashboard" );
      this.$req
        .post("api/v1/login", { username: this.email, password: this.password })
        .then((response) => {
          console.log("resp Login ", response.data);

          this.$cookies.set("user", response.data);
          this.$cookies.set("token", response.data.token);

          this.$store.commit("SET_USER", response.data);
          this.$store.commit("SET_TOKEN", response.data.token);
          // this.$router.push("/dashboard");
          this.$router.push("/");
        })
        .catch((error) => {
          let snackbar = {
            color: "error",
            message: error.response.data.message,
            enabled: true,
          };

          this.$store.commit("SET_SNACKBAR", snackbar);
        });
    },
  },
};
</script>

<style></style>
