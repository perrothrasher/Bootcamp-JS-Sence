import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
const autenticarToken = (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth)
      throw new AppError("Token de acceso requerido", 401, "TOKEN_REQUERIDO");
    const [tipo, token] = auth.split(" ");
    if (tipo !== "Bearer" || !token)
      throw new AppError(
        "Formato esperado: Bearer <token>",
        401,
        "FORMATO_TOKEN_INVALIDO",
      );
    const p = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = { id: Number(p.sub), nombre: p.nombre, rol: p.rol };
    next();
  } catch (e) {
    if (e.name === "TokenExpiredError")
      return next(new AppError("El token expiró", 401, "TOKEN_EXPIRADO"));
    if (e.name === "JsonWebTokenError")
      return next(new AppError("Token inválido", 401, "TOKEN_INVALIDO"));
    next(e);
  }
};
export default autenticarToken;
