class Product {
  constructor(key, name, price) {
    this.key = key;
    this.name = name;
    this.price = price;
    this.desc = null;
    this.amount = null;
    this.ingredients = null;
    this.company = null;
  }

  setName(name) {
    this.name = name;
  }

  setPrice(price) {
    this.price = price;
  }

  setDescription(desc) {
    this.desc = desc;
  }

  setAmount(amount) {
    this.amount = amount;
  }

  setIngredients(ingredients) {
    this.ingredients = ingredients;
  }

  setCompany(company) {
    this.company = company;
  }
}

module.exports = Product;
