class QueryFactory {
    constructor() {
      // Tipo de acciones
      this.INSERT = 0;
      this.UPDATE = 1;
      this.DELETE = 2;
      this.SELECT = 3;
      this.ESPSELECT = 4;
      // Actuales funciones a elegir
      this.selectors = {};
    }

  getQuery(object, operation) {
    // Se escogen funciones segun el tipo de objeto
    switch(object.type) {
      case 'product':
        this.products();
        break;
      case 'employee':
        this.employees();
        break;
      case 'user':
        this.users();
        break;
      case 'inventory':
        this.inventory();
        break;
      case 'ingredient':
        this.ingredient();
        break;
      case 'provider':
        this.providers();
        break;
      case 'historical':
        this.historicals();
        break;
    }

    // Regresa el query
    return this.picker(object.template, operation);
  }

  picker(object, oper) {
    // Se elige el query
    switch(oper) {
      case this.INSERT: return this.selectors.insert(object);
      case this.UPDATE: return this.selectors.update(object);
      case this.DELETE: return this.selectors.delete(object);
      case this.SELECT: return this.selectors.select(object);
      case this.ESPSELECT: return this.selectors.espselect(object);
      default: return '';
    }
  }

  /*********************************************************************
   *                        Product Operation                          *
   **********************************************************************/

  products() {
    // Se ponen en selectors las funciones de todo tipo dependiendo del tipo de objeto
    this.selectors = {
      insert: this.insertProduct,
      delete: this.removeProduct,
      update: null,
      select: this.selectProduct,
      espselect: this.selectCategoryProduct
    };
  }

  insertProduct(product) {
    const query = `INSERT INTO Menu(key, name, desc, price, ingredients, company, category, 
                  photo) VALUES('${product.key}','${product.name}', '${product.desc}',
                  '${product.price}', '${product.ingredients}', '${product.company}',
                  '${product.category}', '${product.photo}')`;
    return query;
  }

  selectProduct(product) {
    return `SELECT * FROM Menu WHERE company = '${product.company}'`;
  }

  selectCategoryProduct(product) {
    return `SELECT * FROM Menu WHERE category = '${product.category}' 
            and company = '${product.company}'`;
  }

  removeProduct(product) {
    const query = `DELETE FROM Menu WHERE key = '${product.key}'`;
    return query;
  }

  updateProduct(product) {
    const query = ``;
    return query;
  }

  /*********************************************************************
   *                        Employee Operation                         *
   **********************************************************************/

  employees() {
    this.selectors = {
      insert: this.insertEmployee,
      update: null,
      delete: this.removeEmployee,
      select: this.selectEmployees,
      espselect: null
    };
  }

  selectEmployees(employee) {
    const query = `SELECT * FROM Employee WHERE company = '${employee.company}'`;
    return query;
  }

  insertEmployee(employee) {
    const query = `INSERT INTO Employee(email, name, password, gender, position, cellphone,
                  company, photo)
                  VALUES('${employee.email}','${employee.name}', '${employee.password}',
                    '${employee.gender}', '${employee.position}', '${employee.cellphone}',
                    '${employee.company}', '${employee.photo}')`;
    return query;
  }

  removeEmployee(employee) {
    const query = `DELETE FROM Employee WHERE email = '${employee.email}'`;
    return query;
  }

  /*********************************************************************
   *                          Users Operation                          *
   **********************************************************************/

  users() {
    this.selectors = {
      insert: this.insertUser,
      update: null,
      delete: null,
      select: this.selectUser,
      espselect: null
    };
  }

  insertUser(user) {
    const query = `INSERT INTO Users(company, username, email, password,
                  cellphone, gender, company_turn, rfc, address, colony, postal_code) 
                  VALUES('${user.company}', '${user.username}', '${user.email}', 
                  '${user.pass}', '${user.cellphone}', '${user.gender}', 
                  '${user.company_turn}', '${user.rfc}', '${user.address}', 
                  '${user.colony}', '${user.postal_code}')`;
    return query;
  }

  selectUser(user) {
    const query = `SELECT * FROM Users WHERE email = '${user.email}' AND 
                  password = '${user.pass}'`;
    return query;
  }

  /*********************************************************************
   *                          Inventory Operation                      *
   **********************************************************************/

  inventory() {
    this.selectors = {
      insert: this.insertInventory,
      update: this.updateInventory,
      delete: null,
      select: this.selectInventory,
      espselect: this.espSelectInventory
    };
  }

  insertInventory(inventory) {
    return `INSERT INTO Inventory(company, ingredient, amount)
            VALUES('${inventory.company}', '${inventory.ingredient}',
            '${inventory.amount}')`;
  }

  updateInventory(inventory) {
    return `UPDATE Inventory SET amount = '${inventory.amount}' WHERE ingredient = '${inventory.ingredient}'`;
  }

  selectInventory(inventory) {
    return `SELECT * FROM Inventory INNER JOIN
            Ingredients ON Inventory.ingredient = Ingredients.key
            WHERE company = '${inventory.company}'`;
  }

  espSelectInventory(inventory) {
    return `SELECT * FROM Inventory INNER JOIN
            Ingredients ON Inventory.ingredient = Ingredients.key
            WHERE ingredient = '${inventory.ingredient}'`;
  }

  /*********************************************************************
   *                          Ingredients Operation                    *
   **********************************************************************/

  ingredient() {
    this.selectors = {
      insert: this.insertIngredient,
      update: null,
      delete: null,
      select: null,
      espselect: null
    };
  }

  insertIngredient(ingredient) {
    return `INSERT INTO Ingredients(key, name) VALUES('${ingredient.key}',
            '${ingredient.name}')`;
  }

  /*********************************************************************
   *                          Providers Operation                      *
   **********************************************************************/

  providers() {
    this.selectors = {
      insert: this.insertProvider,
      update: null,
      delete: null,
      select: null,
      espselect: null
    };
  }

  insertProvider(provider) {
    return `INSERT INTO Providers(id, name, address, tel, rfc, contact, email, 
            codepostal, credits_day, photo, company) VALUES('${provider.key}', '${provider.name}',
            '${provider.address}', '${provider.tel}', '${provider.rfc}',
            '${provider.contact}', '${provider.email}', '${provider.codepostal}',
            '0', '${provider.photo}', '${provider.company}')`;
  }

  /*********************************************************************
   *                        Historical Operation                       *
   **********************************************************************/

  historicals() {
    this.selectors = {
      insert: this.insertEvent,
      update: null,
      delete: null,
      select: this.selectHistorical,
      espselect: null,
    };
  }

  selectHistorical(user) {
    const query = `SELECT * FROM Historial WHERE company = '${user.company}'`;
    return query;
  }

  insertEvent(event) {
    const query = `INSERT INTO Historial VALUES('${event.key}', '${event.company}',
                   '${event.action}', '${event.responsable}', '${event.details}',
                   '${event.states}', '${event.time}')`;
    return query;
  }

}

module.exports = QueryFactory;
