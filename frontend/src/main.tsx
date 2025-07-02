import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { MsalProvider } from "@azure/msal-react";
import { msalInstance, initializeMsal } from "./services/authService";

;(async () => {
    // 1. Inicializa MSAL y procesa el callback
    await initializeMsal();


    // 2. Renderiza la aplicación React
    const container = document.getElementById('root')!;
    createRoot(container).render(
    <MsalProvider instance={msalInstance}>
    <App />
    </MsalProvider>
    );
   
})();