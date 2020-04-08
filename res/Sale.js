class Sale {
  constructor(center) {
    this.center = center;
  }

  serialize(cart) {
    let serialized = [];
    for(let i = 0; i < cart.length; i++) {
      const ingredients = cart[i].ingredients.split(',');

      for(let j = 0; j < ingredients.length-1; j++) {
        const ingrxamount = ingredients[j].split('x');

        serialized.push({
          type: 'inventory',
          template: {
            ingredient: ingrxamount[0],
            amount: ingrxamount[1]
          }
        });
      }

    }

    return serialized;
  }

  getTotalsIngredientsAmount(ingredients) {
    let totals = {};

    for(let i = 0; i < ingredients.length; i++) {
      const template = ingredients[i].template;
      if(template.ingredient in totals)
        totals[template.ingredient] += parseFloat(template.amount);
      else
        totals[template.ingredient] = parseFloat(template.amount);
    }

    return totals;
  }

  async canToSell(ingredients) {
    let notposibles = [];
    const totals = this.getTotalsIngredientsAmount(ingredients);

    for(let key in totals) {
      const ingredient = { type: 'inventory', template: { ingredient: key }};
      const db_ingredient = await this.center.request(ingredient, this.center.ESPSELECT);
      const on_inventory = JSON.parse(db_ingredient)[0];

      if(totals[key] > on_inventory.amount) {
        notposibles.push([on_inventory.name, on_inventory.amount, totals[key]]);
        break;
      }
    }

    return notposibles;
  }

  async reinventory(ingredients) {
    for(let i = 0; i < ingredients.length; i++) {
      const ingredient = await this.center.request(ingredients[i], this.center.ESPSELECT);
      const obj_ingredient = JSON.parse(ingredient)[0];
      ingredients[i].template.amount = parseFloat(obj_ingredient.amount) - parseFloat(ingredients[i].template.amount);
      await this.center.request(ingredients[i], this.center.UPDATE);
    }
  }
}

module.exports = Sale;
