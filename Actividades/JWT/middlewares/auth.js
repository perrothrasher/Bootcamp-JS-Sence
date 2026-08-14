import jwt from 'jsonwebtoken';

export default function auth(req, res, next) {
  const hdr = req.headers.authorization || '';
  const [type, token] = hdr.split(' ');
  
  if (type !== 'Bearer' || !token) {
    return res.status(401).json({ 
      ok: false, 
      mensaje: '401 - Token requerido. Inicia sesión nuevamente.' 
    });
  }
  
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ 
      ok: false, 
      mensaje: '401 - Token inválido o expirado. Inicia sesión nuevamente.' 
    });
  }
}