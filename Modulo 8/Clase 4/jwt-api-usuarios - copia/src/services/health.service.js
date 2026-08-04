import { sequelize } from "../models/index.js";
const obtenerEstado = async () => { await sequelize.authenticate(); return {api:"available",database:"connected",timestamp:new Date().toISOString()}; };
export { obtenerEstado };
