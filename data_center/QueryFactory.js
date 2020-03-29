class QueryFactory {
    constructor() {
      this.INSERT = 0;
      this.UPDATE = 1;
      this.DELETE = 2;
      this.SELECT = 3;
      this.ESPSELECT = 4;
      this.selectors = {};
    }

  getQuery(object, operation) {
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

    return this.picker(object.template, operation);
  }

  picker(object, oper) {
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

  employees(object, operation) {
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

  users(object, oper) {
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
   *                          Providers Operation                      *
   **********************************************************************/

  providers(object, operation) {
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
