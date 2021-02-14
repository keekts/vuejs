// https://stackoverflow.com/questions/62007932/how-to-set-global-axios-header-in-nuxtjs
// https://github.com/nuxt-community/axios-module/issues/134
export default function({ $axios, store, redirect }) {
  // $axios.defaults.baseURL = config['API_URL']
  $axios.onRequest(request => {
    let token = localStorage.getItem('auth._token.local')
    if (token) {
      request.headers.common['Authorization'] = token.split(' ')[1]
    }
    return request
  })
}