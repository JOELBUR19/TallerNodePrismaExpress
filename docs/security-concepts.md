# Definicion de rate-limit, CORS y JWT.

## rate-limit (qué es y para qué sirve).

* Es un controlador de peticiones que se encarga de limitar la peticiones. 

* Sirve para evitar que se hagan muchas peticiones y se caiga el servidor, tambien ayuda a proteger recursos y el rendimiento.

* Pongo un rate-limit de macimo 5 intentos de login y si se supera se bloquea temporalmento 


## CORS (qué problema resuelve).

* CORS **(Cross-Origin Resource Sharing)** resuelve el problema de seguridad del navegador, el problema basicamente es que no permite que un  sitio web frontend haga una peticion a un servidor API que esta ubicado en otro dominio por ejemplo: localhost:3000 => localhost:5000 

* mi frontend esta en localhost:3000 y mi backend(index.js) esta en localhost:5000 

## JWT (qué es un token, qué lleva dentro, para qué se usa).

* Un token un identificador para no tener la necesidad de guardar la seccion del usuario en el servidor.

* Un JWT (JSON Web Token) tiene 3 partes:

1. Header => tipo de token + algoritmo de firma

2. Payload => información del usuario (id, email, state, description).

3. Signature => firma para que nadie pueda modificarlo

* Para saber quien es el usuario, permitir o negar acceso a rutas protegidas, mantiene una sesión sin usar cookies de servidor.

* cuando el usuario inicie en el login se le envia un token al servidor y ya cada vez que el usuario genere una accion el server manda manda un token por cada accion por que el servidor ya sabe quien es el usuario.

### Cómo implementamos JWT en este proyecto.

- En este proyecto usamos JWT para manejar la autenticación. Cuando el usuario inicia sesión, verificamos su correo y contraseña y, si todo es correcto, generamos un token firmado con una clave secreta almacenada en el archivo .env. Ese token incluye el ID del usuario y una fecha de expiración, y luego se envía al cliente para que lo use en futuras peticiones. En las rutas protegidas simplemente revisamos que el token sea válido y no esté vencido, y así identificamos al usuario sin necesidad de manejar sesiones en el servidor.
