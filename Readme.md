# Desarrollo de API

Este proyecto se va a centrar en desarrollar una API y en su integración en un proyecto web

## Estructura del proyecto

### back-end (Servidor Express + TS)
    src
        
        controllers
            tasksController.ts  (genera las tareas a completar)
        
        routes
            tasks.ts    ( tratamiento de tareas)
        
        index.tx    (Punto de acceso al Back-end)

### front-end (App de React + TS)
    src

        assets (imágenes y documentos a utilizar)
        
        components (partes que componen un servicio)
            TaskForm.tsx (formulario de envío de tarea)
            TaskList.tsx (lista de tareas completables y borrables)
        
        services (servicios )
            tasks.ts (llamadas a  back-end para tratamiento de tareas )
        
        types (interfaces para el tratamiento de objetos)
            Task.ts (Interfaz para datos de tarea)
        
        App.tsx (comportamiento de aplicación)
        
        main.tsx (Punto de entrada a App.tsx)
    
    index.html (punto de renderizado principal que llama a main.tsx)

#### Herramientas de trabajo:
<ul>
<li>Node.js</li>
<li>React</li>
<li>Typescript</li>
<li>Vite</li>
</ul>
