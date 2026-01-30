import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";
import Sale from "./Sales.js";

const SaleItem = sequelize.define('SalesItems', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    productName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    saleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Sales',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
});

export default SaleItem;