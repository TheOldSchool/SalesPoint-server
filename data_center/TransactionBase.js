class TransactionBase {
  constructor(database) {
    this.database = database;
    this.OK_STATUS = 200;
    this.BAD_STATUS = 400;
    this.BAD_DB_STATUS = 600;
    this.BAD_FIELD_STATUS = 800;
    this.BAD_INJECTION_STATUS = 300;
  }

  // Si no regresa nada el query se hace run
  async run(query) {
    let result = [];

    let transaction = await new Promise((resolve) => {
      this.database.run(query, function (err) {
        if (err) console.error(err.message);
        resolve();
      });
    });

    return result;
  }

  // Si regresa algo se hace all
  async all(query) {
    let result = [];

    let transaction = await new Promise((resolve) => {
      this.database.all(query, function (err, row) {
        if (err) console.error(err.message);
        if (row != undefined) result = row;
        resolve();
      });
    });

    return result;
  }
}

module.exports = TransactionBase;
