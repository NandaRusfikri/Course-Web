export default function ({ $axios , store ,app, $router,redirect}, inject) {


  var BaseUrl = "http://localhost:8080";

  var token  = app.$cookies.get('token')
  var token_store  = store.state.token


  if (token == undefined) {
    token = store.state.token
  }

  var axios = $axios.create({
    headers: {
      common: {
        Authorization: token
      }
    }
  })
  axios.interceptors.request.use(
    async config => {

      config.headers = {
        'Authorization': app.$cookies.get('token'),
        'Accept': 'application/json'
      }
      return config;
    },
    error => {
      Promise.reject(error)
  });

  // axios.intercepotors.response.use(
  //   (response) => response,
  //   (error) => {
  //     throw error;
  //     // if (error.response.status === 401) {
  //     //   window.location.href = '/login';
  //     // }
  //   });

  axios.interceptors.response.use((response) => response, (error) => {

    // throw error;
     if (error.response.status === 401) {
         window.location.href = '/login';
       }
  });


  axios.setBaseURL(BaseUrl)

  inject('req', axios)

}
