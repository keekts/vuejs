export default function ({ store, redirect, $auth }) {
  // $auth
  // If the user is not authenticated
  // console.log(store);
  // console.log(navigator.onLine); !$auth.loggedIn
  // if (!store.state.user.user || (navigator.onLine && !$auth.loggedIn)) {
  //   return redirect('/sign-in')
  // }
  if (!$auth.loggedIn) {
    return redirect('/sign-in')
  }
}