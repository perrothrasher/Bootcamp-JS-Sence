import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Usuario } from "../models/index.js";
import AppError from "../utils/AppError.js";
const iniciarSesion = async (email, password) => {
  const usuario = await Usuario.findOne({ where: { email, activo: true } });
  if (!usuario)
    throw new AppError(
      "Credenciales incorrectas",
      401,
      "CREDENCIALES_INCORRECTAS",
    );
  const ok = await bcrypt.compare(password, usuario.passwordHash);
  if (!ok)
    throw new AppError(
      "Credenciales incorrectas",
      401,
      "CREDENCIALES_INCORRECTAS",
    );
  const token = jwt.sign(
    { nombre: usuario.nombre, rol: usuario.rol },
    process.env.JWT_SECRET,
    {
      subject: String(usuario.id),
      expiresIn: process.env.JWT_EXPIRES_IN || "30m",
    },
  );
  return {
    usuario: {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
    },
    token,
  };
};
export { iniciarSesion };
