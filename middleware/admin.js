export default function ({ store, redirect, $auth }) {
  let {auther} = $auth.user
  if (auther != 'Admin') {
    return redirect('/')
  }
}