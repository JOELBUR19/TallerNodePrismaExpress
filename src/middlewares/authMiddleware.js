import jwt from "jsonwebtoken";

export function authMiddleware(req, res) {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer ")) { // Verifica la existencia del token o si empieza con "Bearer "
      return res.status(401).json({ error: "No autorizado: token faltante" });
    }
    const token = header.split(" ")[1]; // Se obtiene el token que es la segunda parte del header después de "Bearer y se separa con un espacio (Estructura basica del token Bearer (Bearer token))"

    // Verificar y decodificar el token para saber si es válido y obtener la información del usuario
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Adjuntar la información del usuario para que esté disponible en las rutas protegidas
    req.user = { id: decoded.sub };
  } catch (error) {
    return res.status(401).json({ error: "Token inválido o expirado" }); 
  }
}
