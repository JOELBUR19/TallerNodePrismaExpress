import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt"; // Importa la estrategia JWT y el extractor del token desde passport-jwt necesarios para el correcto funcionamiento del verificador
import jwt from "jsonwebtoken";
import prisma from "../prismaClient.js";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Esto funciona de la misma forma que el middleware que se creo, obtiene el formato que tendrá y donde está
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(opts, async (payload, done) => {
    try {
      const decoded = jwt.verify(
        payload.token || payload, // Verificamos que el token sea valido
        process.env.JWT_SECRET
      );

      // Toma el id del usuario desde el token decodificado
      const userId = decoded.sub;
      // Busca el usuario que cumpla con los requisitos y al cual ese token pertenezca
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return done(null, false);
      }

      return done(null, { id: userId }); // Si esto pasa significa que todo funciono bien
    } catch (error) {
      return done(error, false); // Algo fallo en el proceso y da error
    }
  })
);

export default passport;
