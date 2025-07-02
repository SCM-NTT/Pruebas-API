import { useState } from 'react'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import { LogoutButton } from './components/LogoutButton';
import LoginButton from './components/LoginButton';
import { msalInstance } from './services/authService';

export default function App() {
  const [refreshToggle, setRefreshToggle] = useState(false)

  // TODO: Replace this with your actual authentication logic or import
  const isAuthenticated = msalInstance.getAllAccounts().length > 0;

  return (
    <div >
      <nav style={{ padding: 16, borderBottom: "1px solid #ddd" }}>
        {isAuthenticated ? (
          <>
            <LogoutButton />
            {/* o bien <LogoutPopupButton /> */}
          </>
        ) : (
          <>
            <LoginButton />
            {/* o bien <LoginButtonPopup /> */}
          </>
        )}
      </nav>
      <main style={{ padding: 16 }}>
        {isAuthenticated ? (
          <>  
          <h1>Gestor de Tareas</h1>
          <TaskForm onNewTask={() => setRefreshToggle(!refreshToggle)} />
          <TaskList key={String(refreshToggle)} />
          </>
          
        ) : (
          <p>Por favor, inicia sesión para ver tu perfil.</p>
        )}
      </main>
    </div>
  )
}
