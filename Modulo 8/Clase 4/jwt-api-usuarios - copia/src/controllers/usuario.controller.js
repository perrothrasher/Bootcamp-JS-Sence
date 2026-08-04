import { obtenerPerfilPorId, obtenerUsuarios } from "../services/usuario.service.js";
const obtenerMiPerfil = async (req,res,next)=>{ try { const data=await obtenerPerfilPorId(req.usuario.id); return res.status(200).json({ok:true,message:"Perfil obtenido correctamente",data}); } catch(e){ next(e); } };
const listarUsuarios = async (req,res,next)=>{ try { const data=await obtenerUsuarios(); return res.status(200).json({ok:true,cantidad:data.length,data}); } catch(e){ next(e); } };
export { obtenerMiPerfil, listarUsuarios };
