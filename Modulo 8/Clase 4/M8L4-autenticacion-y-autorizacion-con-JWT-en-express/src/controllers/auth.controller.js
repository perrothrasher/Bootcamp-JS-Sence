import { iniciarSesion } from "../services/auth.service.js";
import AppError from "../utils/AppError.js";
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new AppError(
        "Email y contraseña son obligatorios",
        400,
        "DATOS_INCOMPLETOS",
      );
    const data = await iniciarSesion(email.trim().toLowerCase(), password);
    return res.status(200).json({ ok: true, message: "Login exitoso", data });
  } catch (e) {
    next(e);
  }
};
export { login };
