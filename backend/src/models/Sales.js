import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";
import SaleItem from "./SalesItems.js";

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
        type: DataTypes.INTEGER,
        allowNull: false
    },
    valueReceived: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    valueSale: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    changeDue: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }

})

export default Sale;