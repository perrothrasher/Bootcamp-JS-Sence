const timer=(req,res,next)=>{const inicio=Date.now();res.on("finish",()=>{console.log(`Estado: ${res.statusCode}`);console.log(`Tiempo total: ${Date.now()-inicio} ms
`);});next();}; export default timer;
