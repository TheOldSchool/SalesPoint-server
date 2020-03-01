class TransactionBase {
  constructor(database) {
    this.database = database;
    this.OK_STATUS = 200;
    this.BAD_STATUS = 400;
    this.BAD_DB_STATUS = 600;
    this.BAD_FIELD_STATUS = 800;
    this.BAD_INJECTION_STATUS = 300;
  }

  async insertOperation(query) {
    let stat = 0;
    let bad_db = this.BAD_DB_STATUS;
    let okay = this.OK_STATUS;

    let transaction = await new Promise((resolve) => {
      this.database.run(query, function (err) {
        if (err) {
          console.error(err.message);
          stat = bad_db;
        } else {
          stat = okay;
        }
        resolve();
      });
    });

    return stat;
  }

  async getOperation(query) {
    let stat = 0;
    let result = [];
    let bad_db = this.BAD_DB_STATUS;
    let bad_field = this.BAD_FIELD_STATUS;
    let okay = this.OK_STATUS;

    let transaction = await new Promise((resolve) => {
      this.database.all(query, function (err, row) {
        if (err) {
          stat = bad_db;
          console.error(err.message);
        } else if (row === undefined || row.length == 0) {
          stat = bad_field;
        } else {
          stat = okay;
          result = row;
        }
        resolve();
      });
    });

    return {state: stat, response: result};
  }
}

module.exports = TransactionBase;
