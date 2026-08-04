import { Router } from "express"; const router=Router(); router.get("/",(req,res)=>res.status(200).json({ok:true,message:"Ruta pública funcionando"})); export default router;
