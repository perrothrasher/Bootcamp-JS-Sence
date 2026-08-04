import { Usuario } from "../models/index.js";
import AppError from "../utils/AppError.js";
const campos=["id","nombre","email","rol","activo","createdAt","updatedAt"];
const obtenerPerfilPorId = async id => { const u=await Usuario.findByPk(id,{attributes:campos}); if(!u) throw new AppError("Usuario no encontrado",404,"USUARIO_NO_ENCONTRADO"); return u; };
const obtenerUsuarios = async () => Usuario.findAll({attributes:campos,order:[["id","ASC"]]});
export { obtenerPerfilPorId, obtenerUsuarios };
