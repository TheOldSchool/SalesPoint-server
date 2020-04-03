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

  products(object, operation) {
    // Se ponen en selectors las funciones de todo tipo dependiendo del tipo de objeto
    this.selectors = {
      insert: this.insertProduct,
      delete: this.removeProduct,
      update: this.updateProduct,
      select: this.selectProduct,
      espselect: this.selectCategoryProduct
    };
  }

  insertProduct(product) {
    const query = `INSERT INTO Menu(key, name, desc, price, ingredients, company, category, 
                  photo, active) VALUES('${product.key}','${product.name}', '${product.desc}',
                  '${product.price}', '${product.ingredients}', '${product.company}',
                  '${product.category}', '${product.photo}', 1)`;
    return query;
  }

  selectProduct(product) {
    return `SELECT * FROM Menu WHERE company = '${product.company}'`;
  }

  selectCategoryProduct(product) {
    return `SELECT * FROM Menu WHERE category = '${product.category}' 
            and company = '${product.company}' and active = 1`;
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

  employees(object, operation) {
    this.selectors = {
      insert: this.insertEmployee,
      update: this.updateEmployee,
      delete: this.removeEmployee,
      select: this.selectEmployees,
      espselect: null
    };
  }

  selectEmployees(employee) {
    const query = `SELECT * FROM Employee WHERE company = '${employee.company}' and active = 1`;
    return query;
  }

  insertEmployee(employee) {
    const query = `INSERT INTO Employee(email, name, password, gender, position, cellphone,
                  company, photo, active)
                  VALUES('${employee.email}','${employee.name}', '${employee.password}',
                    '${employee.gender}', '${employee.position}', '${employee.cellphone}',
                    '${employee.company}', '${employee.photo}', 1)`;
    return query;
  }

  removeEmployee(employee) {
    const query = `UPDATE Employee SET active = 0 WHERE key = '${employee.email}'`;
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

  users(object, oper) {
    this.selectors = {
      insert: this.insertUser,
      update: this.updateUser,
      delete: this.removeUser,
      select: this.selectUser,
      espselect: null
    };
  }

  insertUser(user) {
    const query = `INSERT INTO Users(company, username, email, password,
                  cellphone, gender, company_turn, rfc, address, colony, postal_code, active) 
                  VALUES('${user.company}', '${user.username}', '${user.email}', 
                  '${user.pass}', '${user.cellphone}', '${user.gender}', 
                  '${user.company_turn}', '${user.rfc}', '${user.address}', 
                  '${user.colony}', '${user.postal_code}', 1)`;
    return query;
  }

  updateUser(user) {
    const query = `UPDATE Users SET company = '${user.company}', username = '${user.username}',  password = '${user.password}', cellphone = '${employee.cellphone}',
                  gender = '${user.gender}', company_turn = '${user.company_turn}', ref = '${user.rfc}', address = '${user.address}',
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
                  password = '${user.pass}' and active = 1`;
    return query;
  }

  /*********************************************************************
   *                          Providers Operation                      *
   **********************************************************************/

  providers(object, operation) {
    this.selectors = {
      insert: this.insertProvider,
      update: this.updateProvider,
      delete: this.removeProvider,
      select: this.selectProvider,
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

  updateProvider(provider) {
    const query = `UPDATE Providers SET name = '${provider.name}', address = '${provider.address}',  tel = '${provider.tel}', rfc = '${provider.rfc}',
                  contact = '${provider.contact}', email = '${provider.email}', codepostal = '${provider.codepostal}', credits_day = '${provider.credits_day}',
                  company = '${provider.company}'
                  WHERE id = '${provider.key}'`;
    return query;
  }

  removeProvider(provider) {
    const query = `UPDATE Providers SET active = 0 WHERE email = '${provider.key}'`;
    return query;
  }

  selectProvider(provider) {
    const query = `SELECT * FROM provider WHERE company = '${provider.company}' and active = 1`;
    return query;
  }

  /*********************************************************************
   *                        Historical Operation                       *
   **********************************************************************/

  historicals(object, operation) {
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
