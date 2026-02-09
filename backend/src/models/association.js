import Sale from "./Sales.js";
import SaleItem from "./SalesItems.js";

const models = {
    Sale,
    SaleItem
};

Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
        models[modelName].associate(models)
    }
});

export { Sale, SaleItem };