import colors from "vuetify/es5/util/colors";
import IonicIcon from "~/components/IonicIcon";

export default {
  theme: {
    dark: false,
    themes: {
      light: {
        primary: "#d44027",
        accent: "#dacdcb",
        secondary: "#515152",
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: colors.deepOrange.accent4,
        success: colors.green.base
      }
    }
  },
  icons: {
    values: {
      ionic: {
        component: IonicIcon
      }
    }
  }
};
