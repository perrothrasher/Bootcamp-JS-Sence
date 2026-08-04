import bcrypt from "bcryptjs";
import { sequelize, Usuario } from "../src/models/index.js";

const ejecutar = async () => {
  try {
    await sequelize.authenticate();
    await Usuario.destroy({ where: {} });

    const passwordAdmin = await bcrypt.hash("admin123", 10);
    const passwordUsuario = await bcrypt.hash("usuario123", 10);

    await Usuario.bulkCreate([
      { nombre: "Administrador", email: "admin@email.com", passwordHash: passwordAdmin, rol: "admin" },
      { nombre: "Ana Usuario", email: "ana@email.com", passwordHash: passwordUsuario, rol: "usuario" }
    ]);

    console.log("Usuarios de prueba creados correctamente");
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  } finally {
    await sequelize.close();
  }
};

ejecutar();
