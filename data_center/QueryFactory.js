class QueryFactory {
    constructor() {

    }

    renderInsertProduct(product) {
        let query = "INSERT INTO Menu(key, name, desc, price, ingredients, company) " +
            `VALUES('${product.key}','${product.name}', '${product.desc}',
                    '${product.price}', '${product.ingredients}', '${product.company}')`;
        return query;
    }

    renderSelectSaleProduct(product) {
        return `SELECT * FROM Menu WHERE company = '${product.company}'`;
    }

    renderRemoveProduct(product) {
        let query = `DELETE FROM Menu WHERE key = '${product.key}'`;
        return query;
    }

    renderUpdateProduct(product) {
        let query = ``;
        return query;
    }

    renderInsertUser(user) {
        let query = `INSERT INTO Users(company, username, email, password,
                     cellphone, gender, company_turn) VALUES('${user.company}',
                     '${user.username}', '${user.email}', '${user.password}',
                     '${user.cellphone}', '${user.gender}', '${user.company_turn}')`;
        return query;
    }

    renderGetUser(user) {
        let query = `SELECT * FROM Users WHERE email = '${user.email}' AND 
                     password = '${user.password}'`;
        return query;
    }
}

module.exports = QueryFactory;