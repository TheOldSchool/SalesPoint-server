const Product = require('../res/Product.js');
const Parser = require('../res/Parser.js');

const QueryFactory = require('./QueryFactory.js');
const TransactionBase = require('./TransactionBase.js');
const sqlite3 = require('sqlite3').verbose();

let parser = new Parser();

class DataCenter {
  constructor() {
    // Inicia db
    this.database = new sqlite3.Database(__dirname + '/database/salespoint.db',
    error => {
      if(error)
      console.error(error.message);
      console.log('Connected to SalesPoint database');
    });

    // Factory crea los queries
    this.factory = new QueryFactory();
    // Hace la accion en db
    this.transact = new TransactionBase(this.database);
    // Tipo de acciones
    this.INSERT = 0;
    this.UPDATE = 1;
    this.DELETE = 2;
    this.SELECT = 3;
    this.ESPSELECT = 4;
  }

  // Hace request a la db
  async request(object, operation) {
    // Se obtiene query
    const query = this.factory.getQuery(object, operation);
    let result = [];

    // Se elige que hacer
    switch(operation) {
      case this.INSERT:
      case this.UPDATE:
      case this.DELETE:
        result = await this.transact.run(query);
        break;
      case this.SELECT:
      case this.ESPSELECT:
        result = await this.transact.all(query);
        break;
    }

    // Regresa resultados
    return JSON.stringify(result);
  }
}

module.exports = DataCenter;
