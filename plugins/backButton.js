export default function (props) {

    let initialValues = {};

    return {
      created () {
        for (let prop of props) {
          initialValues[prop] = this[prop];
        }

        const unregisterRouterGuard = this.$router.beforeEach((to, from, next) => {
          for (let prop of props) {
            if (this[prop] !== initialValues[prop]) {
              this[prop] = initialValues[prop];
              next(false);
              return;
            }
          }

          next();
        });

        this.$once('hook:destroyed', () => {
          unregisterRouterGuard()
        });
      },
    }
  }
