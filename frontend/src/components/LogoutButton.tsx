import { logoutRedirect } from "../services/authService";

export function LogoutButton() {
  return (
    <button onClick={() => logoutRedirect()}>
      Cerrar sesión Redirect
    </button>
  );
}
