import Sale from "./Sales.js";
import SaleItem from "./SalesItems.js";

export default function associateModels() {
    Sale.hasMany(SaleItem, { foreignKey: 'saleId' });
    SaleItem.belongsTo(Sale, { foreignKey: 'saleId' });

    console.log("Associações realizadas com sucesso!");
}