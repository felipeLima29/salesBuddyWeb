import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";

const Reprocess = sequelize.define('Reprocess', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nameUser: {
        type: DataTypes.STRING,
        allowNull: false
    },
    value: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    isReprocessed: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }


})

export default Reprocess;