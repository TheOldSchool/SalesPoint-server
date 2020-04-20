class QueryFactory {
    constructor() {
      // Tipo de acciones
      this.INSERT = 0;
      this.UPDATE = 1;
      this.DELETE = 2;
      this.SELECT = 3;
      this.ESPSELECT = 4;
      this.BACKUP = 5;
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
      case 'shop':
        this.shopping();
        break;
      case 'historical':
        this.historicals();
        break;
      case 'backup':
        this.backups();
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
      case this.BACKUP: return this.selectors.backup(object);
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
      update: this.updateProduct,
      select: this.selectProduct,
      espselect: this.selectCategoryProduct,
      backup: this.backupProduct
    };
  }

  insertProduct(product) {
    const query = `INSERT OR ignore INTO Menu VALUES('${product.key}','${product.name}', '${product.desc}',
                  '${product.price}', '${product.ingredients}', '${product.company}',
                  '${product.category}', '${product.photo}', 1)`;
    return query;
  }

  selectProduct(product) {
    return `SELECT * FROM Menu WHERE company = '${product.company}'`;
  }

  backupProduct(product) {
    return `SELECT * FROM Menu WHERE company = '${product.company}'`;
  }

  selectCategoryProduct(product) {
    return `SELECT * FROM Menu WHERE category = '${product.category}' 
            and company = '${product.company}'`;
  }

  removeProduct(product) {
    const query = `UPDATE Menu SET active = 0 WHERE key = '${product.key}'`;
    return query;
  }

  updateProduct(product) {
    const query = `UPDATE Menu SET name = '${product.name}', desc = '${product.desc}', price = '${product.price}',
                  ingredients = '${product.ingredients}', company = '${product.company}', category = '${product.category}'
                  WHERE key = '${product.key}'`;
    return query;
  }

  /*********************************************************************
   *                        Employee Operation                         *
   **********************************************************************/

  employees() {
    this.selectors = {
      insert: this.insertEmployee,
      update: this.updateEmployee,
      delete: this.removeEmployee,
      select: this.selectEmployees,
      espselect: this.espSelectEmployee,
      backup: this.backupEmployees
    };
  }

  selectEmployees(employee) {
    const query = `SELECT * FROM Employee WHERE company = '${employee.company}'`;
    return query;
  }

  espSelectEmployee(employee) {
    return `SELECT * FROM Employee WHERE email = '${employee.email}' and password = '${employee.pass}'`;
  }

  backupEmployees(employee) {
    const query = `SELECT * FROM Employee WHERE company = '${employee.company}'`;
    return query;
  }

  insertEmployee(employee) {
    const query = `INSERT or ignore INTO Employee(email, name, password, gender, position, cellphone,
                  company, photo, active)
                  VALUES('${employee.email}','${employee.name}', '${employee.password}',
                    '${employee.gender}', '${employee.position}', '${employee.cellphone}',
                    '${employee.company}', '${employee.photo}', 1)`;
    return query;
  }

  removeEmployee(employee) {
    const query = `UPDATE Employee SET active = 0 WHERE email = '${employee.email}'`;
    return query;
  }

  updateEmployee(employee) {
    const query = `UPDATE Employee SET name = '${employee.name}', password = '${employee.password}', gender = '${employee.gender}',
                  position = '${employee.position}', cellphone = '${employee.cellphone}', company = '${employee.company}'
                  WHERE email = '${employee.email}'`;
    return query;
  }

  /*********************************************************************
   *                          Users Operation                          *
   **********************************************************************/

  users() {
    this.selectors = {
      insert: this.insertUser,
      update: this.updateUser,
      delete: this.removeUser,
      select: this.selectUser,
      espselect: this.espSelectUser,
      backup: this.backupUser
    };
  }

  insertUser(user) {
    const query = `INSERT or ignore INTO Users(company, username, email, password,
                  cellphone, gender, company_turn, rfc, address, colony, postal_code, active) 
                  VALUES('${user.company}', '${user.username}', '${user.email}', 
                  '${user.pass}', '${user.cellphone}', '${user.gender}', 
                  '${user.company_turn}', '${user.rfc}', '${user.address}', 
                  '${user.colony}', '${user.postal_code}', 1)`;
    return query;
  }

  updateUser(user) {
    const query = `UPDATE Users SET username = '${user.username}',  password = '${user.password}', cellphone = '${user.cellphone}',
                  gender = ${user.gender}, company_turn = '${user.company_turn}', rfc = '${user.rfc}', address = '${user.address}',
                  colony = '${user.colony}', postal_code = '${user.postal_code}'
                  WHERE email = '${user.email}'`;
    return query;
  }

  removeUser(user) {
    const query = `UPDATE Users SET active = 0 WHERE email = '${user.email}'`;
    return query;
  }

  selectUser(user) {
    const query = `SELECT * FROM Users WHERE email = '${user.email}' AND 
                  password = '${user.pass}'`;
    return query;
  }

  espSelectUser(user) {
    const query = `SELECT * FROM Users WHERE email = '${user.email}'`;
    return query;
  }

  backupUser(user) {
    const query = `SELECT * FROM Users WHERE company = '${user.company}'`;
    return query;
  }

  /*********************************************************************
   *                          Inventory Operation                      *
   **********************************************************************/

  inventory() {
    this.selectors = {
      insert: this.insertInventory,
      update: this.updateInventory,
      delete: this.removeInventory,
      select: this.selectInventory,
      espselect: this.espSelectInventory,
      backup: this.backupInventory
    };
  }

  insertInventory(inventory) {
    return `INSERT or ignore INTO Inventory(company, ingredient, amount, active)
            VALUES('${inventory.company}', '${inventory.ingredient}',
            '${inventory.amount}', 1)`;
  }

  updateInventory(inventory) {
    return `UPDATE Inventory SET amount = '${inventory.amount}' WHERE ingredient = '${inventory.ingredient}'`;
  }

  removeInventory(inventory) {
    return `UPDATE Inventory SET active = 0 WHERE ingredient = '${inventory.ingredient}'`;
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

  backupInventory(inventory) {
    return `SELECT * FROM Inventory INNER JOIN
            Ingredients ON Inventory.ingredient = Ingredients.key
            WHERE company = '${inventory.company}'`;
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
      espselect: null,
    };
  }

  insertIngredient(ingredient) {
    return `INSERT or ignore INTO Ingredients(key, name) VALUES('${ingredient.key}',
            '${ingredient.name}')`;
  }

  /*********************************************************************
   *                          Providers Operation                      *
   **********************************************************************/

  providers() {
    this.selectors = {
      insert: this.insertProvider,
      update: this.updateProvider,
      delete: this.removeProvider,
      select: this.selectProvider,
      espselect: null,
      backup: this.backupProviders
    };
  }

  insertProvider(provider) {
    return `INSERT or ignore INTO Providers(id, name, address, tel, rfc, contact, email, 
            codepostal, credits_day, photo, company, active) VALUES('${provider.id}', '${provider.name}',
            '${provider.address}', '${provider.tel}', '${provider.rfc}',
            '${provider.contact}', '${provider.email}', '${provider.codepostal}',
            '0', '${provider.photo}', '${provider.company}', 1)`;
  }

  updateProvider(provider) {
    const query = `UPDATE Providers SET name = '${provider.name}', address = '${provider.address}',  tel = '${provider.tel}', rfc = '${provider.rfc}',
                  contact = '${provider.contact}', email = '${provider.email}', codepostal = '${provider.codepostal}', credits_day = '${provider.credits_day}'
                  WHERE id = '${provider.id}'`;
    return query;
  }

  removeProvider(provider) {
    const query = `UPDATE Providers SET active = 0 WHERE id = '${provider.id}'`;
    return query;
  }

  selectProvider(provider) {
    const query = `SELECT * FROM Providers WHERE company = '${provider.company}'`;
    return query;
  }

  backupProviders(provider) {
    const query = `SELECT * FROM Providers WHERE company = '${provider.company}'`;
    return query;
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
      espselect: this.espSelectHistorical,
      backup: this.backupHistorical
    };
  }

  selectHistorical(user) {
    const query = `SELECT * FROM Historial WHERE company = '${user.company}'
                   AND details LIKE '%${user.text}%' ORDER BY time DESC`;
    return query;
  }

  espSelectHistorical(user) {
    const query = `SELECT * FROM Historial WHERE company = '${user.company}' AND
                   action LIKE '%${user.filter}%' AND details LIKE '%${user.text}%' ORDER BY time DESC`;
    return query;
  }


  insertEvent(event) {
    const query = `INSERT or ignore INTO Historial VALUES('${event.key}', '${event.company}',
                   '${event.action}', '${event.responsable}', '${event.details}',
                   '${event.states}', datetime('now', 'localtime'))`;
    return query;
  }

  backupHistorical(user) {
    const query = `SELECT * FROM Historial WHERE company = '${user.company}'`;
    return query;
  }
  /*********************************************************************
   *                        Shopping Operation                         *
   **********************************************************************/

  shopping() {
    this.selectors = {
      insert: this.insertShop,
      update: null,
      delete: null,
      select: null,
      espselect: null,
      backup: this.backupShops
    };
  }

  insertShop(shop) {
    const query = `INSERT or ignore INTO Shops(id, time, provider, state, type, price, iva, total, details, company)
                   VALUES('${shop.id}', datetime('now', 'localtime'), '${shop.provider}',
                   '${shop.status}', '${shop.type}', '${shop.price}',
                   '${shop.iva}', '${shop.total}', '${shop.details}', '${shop.company}')`;
    return query;
  }

  backupShops(shop) {
    return `SELECT * FROM Shops WHERE company = '${shop.company}'`;
  }

  /*********************************************************************
   *                        Backups Operation                          *
   **********************************************************************/

  backups() {
    this.selectors = {
      insert: this.insertBackups,
      update: null,
      delete: null,
      select: this.selectBackups,
      espselect: this.regLastBackup,
    };
  }

  insertBackups(backup) {
    return `
    `;
  }

  regLastBackup(backup) {
    return `INSERT INTO Backups(key, time, company) VALUES('${backup.key}', 
            datetime('now', 'localtime'), '${backup.company}')`;
  }

  selectBackups(backup) {
    return `SELECT * FROM Backups WHERE company = '${backup.company}' ORDER BY time DESC`;
  }
}

module.exports = QueryFactory;
