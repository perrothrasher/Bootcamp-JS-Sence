import { obtenerEstado } from "../services/health.service.js";
const health = async (req,res,next)=>{ try { return res.status(200).json({ok:true,data:await obtenerEstado()}); } catch(e){ next(e); } };
export { health };
