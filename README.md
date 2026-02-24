# TaskFlow - Gestión de Tareas

<div align="center">

### Aplicación Desplegada y en Producción

[![Deploy Status](https://img.shields.io/badge/Estado-Desplegado-brightgreen?style=for-the-badge&logo=vercel)](https://todo-react-git-main-guamanjordans-projects.vercel.app/)
[![Frontend](https://img.shields.io/badge/Frontend-Vercel-black?style=for-the-badge&logo=vercel)](https://todo-react-git-main-guamanjordans-projects.vercel.app/)
[![Backend](https://img.shields.io/badge/Backend-Render-46E3B7?style=for-the-badge&logo=render)](https://todo-react-6mjn.onrender.com)
[![Database](https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/atlas)

### [**Ver Aplicación en Vivo**](https://todo-react-git-main-guamanjordans-projects.vercel.app/)

</div>

---

## Descripción

**TaskFlow** es una aplicación web completa de gestión de tareas personales construida con el stack **MERN** (MongoDB, Express.js, React, Node.js). Permite a los usuarios registrarse, iniciar sesión, crear y organizar sus tareas de manera eficiente.

## Características

- **Autenticación completa** — Registro con verificación por email, login y recuperación de contraseña
- **Gestión de tareas** — Crear, editar, eliminar y marcar tareas como completadas
- **Búsqueda y filtros** — Buscar tareas y filtrar por estado
- **Prioridades** — Asignar prioridad (alta, media, baja) a cada tarea
- **Fechas límite** — Establecer fechas de vencimiento
- **Perfil de usuario** — Editar información personal
- **Configuración** — Tema claro/oscuro y preferencias de notificaciones
- **Diseño responsivo** — Funciona en escritorio y dispositivos móviles

## Tecnologías

| Componente | Tecnología |
|------------|------------|
| **Frontend** | React + Vite |
| **Backend** | Node.js + Express.js |
| **Base de datos** | MongoDB Atlas |
| **Autenticación** | bcryptjs |
| **Email** | Brevo API + Nodemailer |
| **Hosting Frontend** | Vercel |
| **Hosting Backend** | Render |

## Arquitectura

```
TODO-REACT/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── context/        # Context API (estado global)
│   │   ├── hooks/          # Hooks personalizados
│   │   ├── services/       # Servicios API
│   │   └── styles/         # Estilos CSS
│   └── index.html
├── server/                 # Backend Express
│   ├── controllers/        # Lógica de negocio
│   ├── models/             # Modelos Mongoose
│   ├── routes/             # Rutas API
│   ├── middleware/          # Middleware
│   ├── utils/              # Utilidades (email)
│   └── index.js            # Punto de entrada
└── README.md
```

## Despliegue

La aplicación está desplegada en producción con la siguiente infraestructura:

- **Frontend**: [Vercel](https://todo-react-git-main-guamanjordans-projects.vercel.app/)
- **Backend**: [Render](https://todo-react-6mjn.onrender.com)
- **Base de datos**: MongoDB Atlas (Cluster gratuito M0)
- **Email**: Brevo (API HTTP)

## Instalación Local

### Prerrequisitos

- Node.js (v18+)
- npm
- MongoDB (local o Atlas)

### Pasos

1. **Clonar el repositorio**

```bash
git clone https://github.com/GuamanJordan/TODO-REACT.git
cd TODO-REACT
```

1. **Configurar el backend**

```bash
cd server
npm install
# Crear archivo .env con las variables necesarias (ver sección Variables de Entorno)
npm run dev
```

1. **Configurar el frontend**

```bash
cd client
npm install
npm run dev
```

1. **Abrir en el navegador**: `http://localhost:5173`

## Variables de Entorno

### Backend (`server/.env`)

```
MONGO_URI=<tu_conexion_mongodb>
MAIL_USER=<tu_email>
MAIL_PASS=<tu_app_password>
MAIL_SERVICE=gmail
BREVO_API_KEY=<tu_api_key_brevo>
```

### Frontend (Vercel)

```
VITE_API_URL=<url_del_backend>/api
```

> **Nota:** Las claves y credenciales no se incluyen en el repositorio por seguridad. Cada desarrollador debe configurar sus propias variables de entorno.

## Autor

**Jordan Guamán** — Ingeniería de Software

---

<div align="center">

*Desarrollado con React y Node.js*

</div>
