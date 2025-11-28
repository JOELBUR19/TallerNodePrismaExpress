# API 

Este proyecto es una pequeña API que permite registrar usuarios, iniciar sesión y manejar tareas. La idea es que cada persona pueda ver y crear solo sus propias tareas gracias a un sistema de autenticación con tokens (JWT).

---

## ¿Qué hace este proyecto?

- Permite crear usuarios y guarda sus contraseñas de forma segura.
- Permite iniciar sesión y recibir un token.
- Las rutas de tareas están protegidas: solo funciona si el usuario está autenticado.
- Cada tarea queda vinculada al usuario que la creó.
- Usa Prisma para conectarse a la base de datos.
- Tiene configuraciones importantes como CORS, rate-limit y Passport (para usar más adelante).

---

## Cómo iniciar el proyecto

### 1. Clonar el repositorio
git clone <tu-repo>
cd <carpeta-del-proyecto>

### 2. Instalar dependencias
npm install

### 3. Crear archivo de variables de entorno
Crea un archivo llamado `.env` en la raíz y pon:

DATABASE_URL="URL de tu base de datos"
JWT_SECRET="un texto secreto para firmar los tokens"

### 4. Generar cliente de Prisma (muy importante)
Antes de arrancar, ejecuta:
npx prisma generate

### 5. Crear las tablas en la base de datos
npx prisma migrate dev

### 6. Arrancar el servidor
npm start

---

## ¿Cómo funciona la seguridad?

1. **Registro:**  
   Un usuario se registra enviando su nombre, correo y contraseña. La contraseña se encripta para que no quede expuesta.

2. **Login:**  
   El usuario inicia sesión y, si todo está bien, se le entrega un token JWT. Ese token representa que está autenticado.

3. **Uso del token:**  
   Para acceder a las tareas, el usuario debe enviar su token en el header:
   Authorization: Bearer tu_token

4. **Protección de rutas:**  
   Antes de entrar a `/tasks`, el middleware `authMiddleware`:
   - Revisa si el token existe.
   - Revisa si es válido.
   - Si está correcto, deja continuar.
   - Si no, responde con “No autorizado”.

Gracias a esto, cada persona solo puede ver sus propias tareas.

---

## Configuraciones importantes

### 🔸 Rate-limit  
Sirve para evitar que un usuario haga demasiadas peticiones. Está configurado en `index.js`.

### 🔸 CORS  
Permite que el frontend pueda conectarse a la API. También está configurado en `index.js`.

### 🔸 Passport  
Está instalado por si más adelante quieres usar un sistema de autenticación más avanzado. Por ahora no es obligatorio.

---

## Estructura del proyecto (resumen)

```
src/
├── routes/
│   ├── register.js
│   ├── login.js
│   └── tasks.js
├── middlewares/
│   └── authMiddleware.js
├── prismaClient.js
└── index.js
```
---

## ¿Qué puedes hacer ya con este proyecto?

- Registrar usuarios nuevos.
- Iniciar sesión y recibir un token.
- Acceder a rutas protegidas usando ese token.
- Crear tareas que quedan guardadas con tu usuario.
- Manejar todo a través de Prisma.
- Contar con protección extra como CORS y rate-limit.

Listo, con eso ya tienes un proyecto funcional, claro y fácil de entender.
