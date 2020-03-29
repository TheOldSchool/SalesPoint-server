const Event = require('./Event.js');

class Parser {
  constructor() {
    this.BUY_INGREDIENT = 0;
    this.SELL_PRODUCT = 1;
    this.ADD_PRODUCT = 2;
  }

  parseProduct(product) {
    let event = new Event(product.company);

    event.buildEvent(this.parseAction(product.action), product.responsable, 
      this.buildDetails(product), product.action);
    return event;
  }

  buildDetails(product) {
    const prefix = this.buildPrefix(product.action);
    const msg = prefix + ` ${product.name} por ${product.price} en ${product.amount}.
                Usando ${product.ingredients}. \n\nDescripción: ${product.desc}`;
    return msg;
  }

  parseAction(type) {
    switch(type) {
      case this.BUY_INGREDIENT: return 'Compra de ingrediente';
      case this.SELL_PRODUCT: return 'Venta de producto';
      case this.ADD_PRODUCT: return 'Alta de producto';
    }
  }

  buildPrefix(type) {
    switch(type) {
      case this.BUY_INGREDIENT: return 'Se compró';
      case this.SELL_PRODUCT: return 'Se vendió';
      case this.ADD_PRODUCT: return 'Se agrego';
      default: return '';
    }
  }
}

module.exports = Parser;
