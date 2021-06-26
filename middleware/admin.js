export default function({ store, redirect, $auth }) {
  if ($auth.user) {
    let { auther } = $auth.user;
    if (auther != "Admin") {
      return redirect("/");
    }
  } else {
    return redirect("/");
  }
}
