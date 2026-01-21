import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";

const Sale = sequelize.define('Sales', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    qtdItems: {
        type: DataTypes.STRING,
        allowNull: false
    },
    valueReceived: {
        type: DataTypes.STRING,
        allowNull: false
    },
    valueSale: {
        type: DataTypes.STRING,
        allowNull: false
    },
    changeDue: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default Sale;