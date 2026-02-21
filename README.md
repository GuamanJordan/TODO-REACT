# TaskFlow - Sistema de Gestion de Tareas

Aplicacion web responsiva para gestion de tareas personales con interfaz moderna y sincronizacion en tiempo real.

## Tabla de Contenidos

1. [Descripcion](#descripcion)
2. [Tecnologias](#tecnologias)
3. [Requisitos Previos](#requisitos-previos)
4. [Instalacion](#instalacion)
5. [Estructura del Proyecto](#estructura-del-proyecto)
6. [Funcionalidades](#funcionalidades)
7. [API Endpoints](#api-endpoints)
8. [Modelo de Datos](#modelo-de-datos)
9. [Scripts Disponibles](#scripts-disponibles)
10. [Despliegue](#despliegue)
11. [Documentacion](#documentacion)

## Descripcion

TaskFlow es una aplicacion web SPA (Single Page Application) que permite a los usuarios gestionar sus tareas diarias de manera eficiente. Implementa operaciones CRUD completas con un backend RESTful y una interfaz optimizada para dispositivos moviles y desktop.

### Caracteristicas Principales

- Crear, leer, actualizar y eliminar tareas
- Marcar tareas como completadas/pendientes
- Filtrar tareas por estado (todas, pendientes, completadas)
- Busqueda de tareas por texto
- Interfaz responsiva
- Sincronizacion en tiempo real con backend

## Tecnologias

### Frontend

| Tecnologia | Version | Descripcion |
|------------|---------|-------------|
| React | 18.x | Biblioteca para interfaces de usuario |
| Vite | 5.x | Build tool y dev server |
| Context API | - | Manejo de estado global |
| CSS3 | - | Estilos y responsividad |

### Backend

| Tecnologia | Version | Descripcion |
|------------|---------|-------------|
| Node.js | 18.x+ | Entorno de ejecucion |
| Express.js | 4.x | Framework web |
| MongoDB | 6.x | Base de datos NoSQL |
| Mongoose | 8.x | ODM para MongoDB |

## Requisitos Previos

- Node.js 18.x o superior
- npm 9.x o superior
- MongoDB 6.x (local o MongoDB Atlas)
- Git

## Instalacion

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/todo-react.git
cd todo-react
```

### 2. Instalar dependencias del cliente

```bash
cd client
npm install
```

### 3. Instalar dependencias del servidor

```bash
cd ../server
npm install
```

### 4. Configurar variables de entorno

Crear archivo `.env` en la carpeta `server`:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskflow
NODE_ENV=development
```

Crear archivo `.env` en la carpeta `client`:

```
VITE_API_URL=http://localhost:5000/api
```

### 5. Iniciar la aplicacion

Terminal 1 - Backend:
```bash
cd server
npm run dev
```

Terminal 2 - Frontend:
```bash
cd client
npm run dev
```

La aplicacion estara disponible en `http://localhost:5173`

## Estructura del Proyecto

```
todo-react/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskItem.jsx
│   │   │   └── TaskList.jsx
│   │   ├── context/
│   │   │   └── TaskContext.jsx
│   │   ├── hooks/
│   │   │   └── useTasks.js
│   │   ├── services/
│   │   │   └── taskService.js
│   │   ├── styles/
│   │   │   └── index.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/
│   ├── controllers/
│   │   └── taskController.js
│   ├── models/
│   │   └── Task.js
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── config/
│   │   └── db.js
│   ├── index.js
│   └── package.json
├── docs/
│   ├── srs-diagrams.html
│   └── casos-de-uso.html
└── README.md
```

## Funcionalidades

### RF-001: Crear Tarea
- Campos: titulo (obligatorio), descripcion, prioridad, fecha limite
- Validacion de datos en frontend y backend
- Feedback visual al usuario

### RF-002: Visualizar Tareas
- Lista de todas las tareas del usuario
- Informacion mostrada: titulo, estado, prioridad, fecha
- Carga automatica al iniciar la aplicacion

### RF-003: Editar Tarea
- Modificar cualquier campo de una tarea existente
- Formulario pre-poblado con datos actuales
- Actualizacion en tiempo real

### RF-004: Eliminar Tarea
- Eliminacion permanente con confirmacion
- Actualizacion inmediata de la lista

### RF-005: Cambiar Estado
- Toggle entre completada/pendiente
- Diferenciacion visual (tachado, colores)

### RF-006: Filtrar Tareas
- Opciones: Todas, Pendientes, Completadas
- Filtrado en tiempo real sin recarga

### RF-007: Buscar Tareas
- Busqueda por texto en titulo y descripcion
- Debounce de 300ms para optimizacion
- Case-insensitive

## API Endpoints

### Tareas

| Metodo | Endpoint | Descripcion | Body |
|--------|----------|-------------|------|
| GET | /api/tasks | Obtener todas las tareas | - |
| GET | /api/tasks/:id | Obtener una tarea por ID | - |
| POST | /api/tasks | Crear nueva tarea | { title, description?, priority?, dueDate? } |
| PUT | /api/tasks/:id | Actualizar tarea | { campos a actualizar } |
| DELETE | /api/tasks/:id | Eliminar tarea | - |

### Codigos de Respuesta

| Codigo | Descripcion |
|--------|-------------|
| 200 | OK - Operacion exitosa |
| 201 | Created - Recurso creado |
| 400 | Bad Request - Datos invalidos |
| 404 | Not Found - Recurso no encontrado |
| 500 | Server Error - Error interno |

## Modelo de Datos

### Task

| Campo | Tipo | Requerido | Default | Descripcion |
|-------|------|-----------|---------|-------------|
| _id | ObjectId | Auto | - | Identificador unico |
| title | String | Si | - | Titulo de la tarea (max 100) |
| description | String | No | "" | Descripcion (max 500) |
| completed | Boolean | No | false | Estado de completado |
| priority | String | No | "medium" | Enum: low, medium, high |
| dueDate | Date | No | null | Fecha limite |
| createdAt | Date | Auto | - | Fecha de creacion |
| updatedAt | Date | Auto | - | Fecha de actualizacion |

## Scripts Disponibles

### Cliente (client/)

| Script | Comando | Descripcion |
|--------|---------|-------------|
| dev | npm run dev | Inicia servidor de desarrollo |
| build | npm run build | Genera build de produccion |
| preview | npm run preview | Preview del build |
| lint | npm run lint | Ejecuta ESLint |

### Servidor (server/)

| Script | Comando | Descripcion |
|--------|---------|-------------|
| dev | npm run dev | Inicia con nodemon (hot reload) |
| start | npm start | Inicia en produccion |
| test | npm test | Ejecuta tests |

## Despliegue

### Frontend (Vercel/Netlify)

1. Conectar repositorio a Vercel o Netlify
2. Configurar build command: `npm run build`
3. Configurar publish directory: `dist`
4. Agregar variable de entorno: `VITE_API_URL`

### Backend (Railway/Render)

1. Conectar repositorio
2. Configurar variables de entorno:
   - `MONGODB_URI` (MongoDB Atlas connection string)
   - `PORT`
   - `NODE_ENV=production`
3. Deploy automatico en push a main

### Base de Datos (MongoDB Atlas)

1. Crear cuenta en MongoDB Atlas
2. Crear cluster gratuito (M0)
3. Crear usuario de base de datos
4. Obtener connection string
5. Configurar IP whitelist (0.0.0.0/0 para produccion)

## Documentacion

Los siguientes documentos estan disponibles en la carpeta raiz:

| Archivo | Descripcion |
|---------|-------------|
| srs-diagrams.html | Arquitectura, modelo de datos y mockups UI |
| casos-de-uso.html | Diagramas UML y especificacion de casos de uso |

Para visualizar, abrir los archivos HTML en un navegador.

## Requisitos No Funcionales

### Rendimiento
- Tiempo de carga inicial: menor a 3 segundos
- Respuesta de API: menor a 500ms
- Renderizado de lista (100 items): menor a 1 segundo

### Compatibilidad
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Responsividad
- Movil: menor a 768px
- Tablet: 768px - 1024px
- Desktop: mayor a 1024px

## Autor

Jordan Guaman

## Licencia

MIT License