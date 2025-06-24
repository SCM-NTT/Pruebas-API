<h1>Desarrollo de API</h1>

<p>Este proyecto se va a centrar en desarrollar una API y en su integración en un proyecto web</p>

<h2>Estructura del proyecto</h2>
<h3>back-end (Servidor Express + TS)</h3>
<p>
    src
        controllers
            tasksController.ts  (genera las tareas a completar)
        routes
            tasks.ts    ( tratamiento de tareas)
        index.tx    (Punto de acceso al Back-end)
</p>
<h3>front-end (App de React + TS)</h3>
<p>
    src
        assets (imágenes y documentos a utilizar)
        components (partes que componen un servicio)
            TaskForm.tsx (formulario de envío de tarea)
            TaskList.tsx (lista de tareas completables y borrables)
        services (servicios )
            tasks.ts (llamadas a <strong>back-end</strong> para tratamiento de tareas )
        types (interfaces para el tratamiento de objetos)
            Task.ts (Interfaz para datos de tarea)
        App.tsx (comportamiento de aplicación)
        main.tsx (Punto de entrada a <strong>App.tsx</strong>)
    index.html (punto de renderizado principal que llama a <strong>main.tsx</strong>)
</p>

<br/>
<p>Herramientas de trabajo:</p>
<ul>
<li>Node.js</li>
<li>React</li>
<li>Typescript</li>
<li>Vite</li>
</ul>
