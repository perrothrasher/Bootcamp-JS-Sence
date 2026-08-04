import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
const Usuario = sequelize.define(
  "Usuario",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING(100), allowNull: false },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: { isEmail: { msg: "El correo electrónico no es válido" } },
    },
    passwordHash: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: "password_hash",
    },
    rol: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: "usuario",
      validate: {
        isIn: {
          args: [["usuario", "admin"]],
          msg: "El rol debe ser usuario o admin",
        },
      },
    },
    activo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  },
  { tableName: "usuarios", timestamps: true, underscored: true },
);
export default Usuario;
