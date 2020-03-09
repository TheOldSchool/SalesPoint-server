class QueryFactory {
    constructor() {

    }

  /*********************************************************************
   *                        Product Operation                          *
   **********************************************************************/

    renderInsertProduct(product) {
        const query = "INSERT INTO Menu(key, name, desc, price, ingredients, company, category) " +
            `VALUES('${product.key}','${product.name}', '${product.desc}',
                    '${product.price}', '${product.ingredients}', '${product.company}',
                    '${product.category}')`;
        return query;
    }

    renderSelectSaleProduct(product) {
        return `SELECT * FROM Menu WHERE company = '${product.company}'`;
    }

    renderSelectCategoryProduct(product) {
      return `SELECT * FROM Menu WHERE category = '${product.category}' 
        and company = '${product.company}'`;
    }

    renderRemoveProduct(product) {
        const query = `DELETE FROM Menu WHERE key = '${product.key}'`;
        return query;
    }

    renderUpdateProduct(product) {
        const query = ``;
        return query;
    }

  /*********************************************************************
   *                          Users Operation                          *
   **********************************************************************/

    renderInsertUser(user) {
        const query = `INSERT INTO Users(company, username, email, password,
                     cellphone, gender, company_turn, rfc, address, colony, postal_code) 
                     VALUES('${user.company}', '${user.username}', '${user.email}', 
                     '${user.password}', '${user.cellphone}', '${user.gender}', 
                     '${user.company_turn}', '${user.rfc}', '${user.address}', 
                     '${user.colony}', '${user.postal_code}')`;
        return query;
    }

    renderGetUser(user) {
        const query = `SELECT * FROM Users WHERE email = '${user.email}' AND 
                     password = '${user.password}'`;
        return query;
    }

  /*********************************************************************
   *                        Historical Operation                       *
   **********************************************************************/

  renderGetHistorical(user) {
    const query = `SELECT * FROM Historial WHERE company = '${user.company}'`;
    return query;
  }

  renderAddEvent(event) {
    const query = `INSERT INTO Historial VALUES('${event.key}', '${event.company}',
                   '${event.action}', '${event.responsable}', '${event.details}',
                   '${event.states}', '${event.time}')`;
    return query;
  }

}

module.exports = QueryFactory;
