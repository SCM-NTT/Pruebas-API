import {
  PublicClientApplication,
  type AuthenticationResult,
  type PopupRequest,
  type RedirectRequest,
  type SilentRequest,
  type EndSessionRequest,
  type AccountInfo
} from "@azure/msal-browser";
import { msalConfig, loginRequest } from "../authConfig";

// 1. Creamos la instancia
export const msalInstance = new PublicClientApplication(msalConfig);

/**
 * 2. Inicializa MSAL (interna) y procesa el callback de redirect
 */
export async function initializeMsal(): Promise<void> {
  // a) Inicializa internamente el cliente
  await msalInstance.initialize();
  // b) Procesa el código devuelto tras un redirect de Azure
  await msalInstance.handleRedirectPromise();
}

// 3. Login con redirect
export function loginRedirect(): void {
  const req: RedirectRequest = { ...loginRequest };
  msalInstance.loginRedirect(req);
}

// 4. Login con popup (opcional)
export function loginPopup(): Promise<AuthenticationResult> {
  const req: PopupRequest = { ...loginRequest };
  return msalInstance.loginPopup(req);
}

/**
 * 5. Obtiene un accessToken: intenta silent y si falla, popup
 */
export async function getToken(): Promise<string> {
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length === 0) {
    throw new Error("No hay sesión activa. Inicia sesión primero.");
  }

  const silentReq: SilentRequest = {
    account: accounts[0],
    scopes: loginRequest.scopes
  };

  try {
    const result = await msalInstance.acquireTokenSilent(silentReq);
    return result.accessToken;
  } catch {
    // fallback a popup
    const popupReq: PopupRequest = { account: accounts[0], scopes: loginRequest.scopes };
    const popupResult = await msalInstance.acquireTokenPopup(popupReq);
    return popupResult.accessToken;
  }
}

// 6. Logout con redirect
export function logoutRedirect(): void {
  const account: AccountInfo | null = msalInstance.getAllAccounts()[0] ?? null;
  const req: EndSessionRequest = { account };
  msalInstance.logoutRedirect(req);
}

// 7. Logout con popup
export function logoutPopup(): Promise<void> {
  const req: EndSessionRequest = {};
  return msalInstance.logoutPopup(req);
}
