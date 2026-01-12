import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";

const User = sequelize.define('User',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    usuario:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    nome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    empresa:{
        type: DataTypes.STRING,
        allowNull: false
    },
    cnpj:{
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default User;