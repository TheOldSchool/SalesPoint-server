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
  }

  /*********************************************************************
   *                        Product Operation                          *
   **********************************************************************/

  async addProduct(product) {
    let state = await this.transact.insertOperation(
      this.factory.renderInsertProduct(product)
    );

    this.addEvent(parser.parseProduct(product));
    return this.renderAcuse(this.buildPreInsertAcuse(state, []));
  }

  async getListProduct(product) {
    let result = await this.transact.getOperation(
      this.factory.renderSelectSaleProduct(product)
    );

    return this.renderAcuse(this.buildPreGetAcuse(
      result.state,
      result.response
    ));
  }

  async getProductsFromCategory(product) {
    let result = await this.transact.getOperation(
      this.factory.renderSelectCategoryProduct(product)
    );

    return this.renderAcuse(this.buildPreGetAcuse(
      result.state,
      result.response
    ));
  }

  editProduct(product) {

  }

  removeProduct(product) {

  }

  /*********************************************************************
  *                          User Operation                            *
  **********************************************************************/

  async addUser(user) {
    let state = await this.transact.insertOperation(
        this.factory.renderInsertUser(user)
    );
    
    return this.renderAcuse(this.buildPreInsertAcuse(state, []));
  }

  async getUser(user) {
    let result = await this.transact.getOperation(
      this.factory.renderGetUser(user)
    );

    return this.renderAcuse(this.buildPreGetAcuse(
      result.state,
      result.response
    ));
  }

  /*********************************************************************
   *                            Historical                             *
   **********************************************************************/

  async getHistorical(user) {
    let result = await this.transact.getOperation(
      this.factory.renderGetHistorical(user)
    );

    return this.renderAcuse(this.buildPreGetAcuse(
      result.state,
      result.response
    ));
  }

  async addEvent(event) {
    const result = await this.transact.insertOperation(
      this.factory.renderAddEvent(event)
    );

    return this.renderAcuse(this.buildPreInsertAcuse(
      result,
      []
    ));
  }

  /*********************************************************************
   *                            Pre Acuses                             *
   **********************************************************************/

  buildPreInsertAcuse(state, response) {
    return {
      stat: state,
      oper: 'insert',
      type: 'user',
      resp: response
    };
  }

  buildPreGetAcuse(state, response) {
    return {
      stat: state,
      oper: 'get',
      type: 'user',
      resp: response
    };
  }

  renderAcuse(data) {
    return JSON.stringify({
      header: 'salespoint/application',
      body: {
        stats: data.stat,
        operation: data.oper,
        type: data.type,
        response: data.resp
      }
    });
  }

  validateInjection(field) {
    return field.indexOf('\'') != -1 || field.indexOf('"') != -1;
  }
}

module.exports = DataCenter;
