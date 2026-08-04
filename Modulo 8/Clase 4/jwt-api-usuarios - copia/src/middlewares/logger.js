const logger=(req,res,next)=>{console.log(`
[${new Date().toLocaleString()}]`);console.log(`Método: ${req.method}`);console.log(`Ruta: ${req.originalUrl}`);next();}; export default logger;
