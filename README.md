# DevTask Tracker - El Monolito Artesanal

Este proyecto es una aplicación FullStack (SPA) para gestionar tareas de desarrollo, construida con Vanilla JS, Node.js, Express y MongoDB Atlas.

## Estructura del Proyecto

- `/backend`: Servidor Express y modelos de Mongoose.
- `/frontend`: Interfaz de usuario con HTML, CSS y JS nativo.

## Requisitos Previos

- Node.js instalado.
- Cuenta en MongoDB Atlas con un Cluster configurado.

## Instalación y Configuración

1. **Clonar el repositorio**
2. **Configurar el Backend**:
   - Instalar las dependencias: `npm install`en la carpeta `backend`
   - Crea un archivo `.env` y añadir la cadena de conexión:
     
     PORT=3000
     MONGODB_URI=mongodb+srv://pepe:<contraseña>@cluster0.ftvyuql.mongodb.net/devtask_tracker?retryWrites=true&w=majority&appName=Cluster0
   
3. **Ejecutar el Backend**:
   - Iniciar el servidor: `node server.js`
   - Debería verse el mensaje: `✅ Conectado a MongoDB Atlas` y `🚀 Servidor corriendo en http://localhost:3000`.

4. **Configurar el Frontend**:
   - Abrir el archivo `frontend/index.html` directamente en el navegador.

## Tecnologías Utilizadas

- **Backend**: Node.js, Express, Mongoose, Dotenv, CORS.
- **Frontend**: Vanilla JS (Fetch API, DOM Manipulation), HTML5, CSS3 (Flexbox/Grid).
- **Base de Datos**: MongoDB Atlas.