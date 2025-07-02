import { loginRedirect, loginPopup } from "../services/authService";

export function LoginButton() {
  return (
    <>
      <button onClick={() => loginRedirect()}>Login Redirect</button>
    </>
  );
}
export function LoginButtonPopup() {
  return (
    <button onClick={async () => await loginPopup()}>Login Popup</button>
  );
}
export default LoginButton;