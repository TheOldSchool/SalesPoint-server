const Product = require('../res/Product.js');
const Parser = require('../res/Parser.js');

const QueryFactory = require('./QueryFactory.js');
const TransactionBase = require('./TransactionBase.js');
const sqlite3 = require('sqlite3').verbose();

let parser = new Parser();

class DataCenter {
  constructor() {
    this.database = new sqlite3.Database(__dirname + '/database/salespoint.db',
    error => {
      if(error)
      console.error(error.message);
      console.log('Connected to SalesPoint database');
    });

    this.factory = new QueryFactory();
    this.transact = new TransactionBase(this.database);
    this.INSERT = 0;
    this.UPDATE = 1;
    this.DELETE = 2;
    this.SELECT = 3;
    this.ESPSELECT = 4;
  }

  async request(object, operation) {
    let query = this.factory.getQuery(object, operation);
    let result = [];

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

    return JSON.stringify(result);
  }
}

module.exports = DataCenter;
