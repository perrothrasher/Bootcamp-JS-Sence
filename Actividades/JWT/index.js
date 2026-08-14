import 'dotenv/config';
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import auth from './middlewares/auth.js';

const app = express();
app.use(express.json());

const USERS_FILE = './usuarios.json';

const getUsers = () => {
  if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, JSON.stringify([]));
  return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
};

const saveUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

app.post('/auth/register', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ ok: false, mensaje: 'Email y password son requeridos' });

  const users = getUsers();
  if (users.find(u => u.email === email)) return res.status(409).json({ ok: false, mensaje: 'El email ya está registrado' });

  const passwordHash = await bcrypt.hash(password, 10);
  users.push({ email, passwordHash, role: 'user' });
  saveUsers(users);

  return res.status(201).json({ ok: true, mensaje: 'Usuario registrado exitosamente' });
});

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ ok: false, mensaje: 'Email y password son requeridos' });

  const users = getUsers();
  const user = users.find(u => u.email === email);
  
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).json({ ok: false, mensaje: 'Credenciales inválidas' });
  }

  const token = jwt.sign(
    { sub: email, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES || '15m' }
  );

  return res.status(200).json({ ok: true, token });
});

app.get('/api/perfil', auth, (req, res) => {
  res.status(200).json({ ok: true, data: { email: req.user.email, role: req.user.role } });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API en http://localhost:${PORT}`));