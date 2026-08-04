import AppError from "../utils/AppError.js";
const autorizarRoles =
  (...roles) =>
  (req, res, next) => {
    if (!req.usuario)
      return next(
        new AppError("Usuario no autenticado", 401, "USUARIO_NO_AUTENTICADO"),
      );
    if (!roles.includes(req.usuario.rol))
      return next(
        new AppError(
          "No tiene permisos para realizar esta operación",
          403,
          "ACCESO_DENEGADO",
        ),
      );
    next();
  };
export default autorizarRoles;
