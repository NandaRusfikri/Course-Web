export default ({ app,store, redirect, route }) => {


  var token = app.$cookies.get('token')


  store.commit("SET_TOKEN", token);


  if (route.path !== "/login" ) {
    if (!token) {
      return redirect("/login");
    }

  }




}
