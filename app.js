const express = require('express');
const cors = require('cors');
const multer = require('multer');

// Guarda imagenes cuando las detecta con el nombre de img
const storage = multer.diskStorage({
  destination: './uploads',
  filename: function(req, file, cb) {
    define_filename = `${file.fieldname}-${Date.now()}.jpg`;
    cb(null, define_filename);
  }
});

// Se crea objeto que guarda la img
const upload = multer({storage: storage});
const app = express();

const PORT = process.env.PORT || 8000;
// Nombre que se le da a la img al guardar (cambia)
let define_filename = '';
// Se tiene el proceso de la sentencia sql
const DataCenter = require('./data_center/DataCenter.js');
const Sale = require('./res/Sale.js');
const center = new DataCenter();
const sale = new Sale(center);

app.use(cors());
// Solo se permite una imagen con la etiqueta img
app.use(upload.single('img'));
// Maximo 10 mb de transferencia
app.use(express.json({ limit: '10mb' }));
// Se guardan en /uploads/
app.use(express.static(__dirname + '/uploads/'));

app.get('/', function(req, res) {
  res.send('Welcome to the server salespoint system');
});

/*********************************************************************
 *                        Product Operation                          *
 **********************************************************************/

app.post('/api/getallproduct', async function(req, res) {
  // Se obtiene objeto
  const product = req.body.product;
  // Se manda a consulta con el objeto y el tipo de accion a hacer
  res.send(await center.request(product, center.SELECT));
});

app.post('/api/getproducts', async function(req, res) {
  const product = req.body.product;
  res.send(await center.request(product, center.ESPSELECT));
});

app.post('/api/addproduct', async function(req, res) {
  let product = JSON.parse(req.body.product).product;
  product.template.photo += define_filename;
  res.send(await center.request(product, center.INSERT));
});

app.post('/api/delproduct', async function(req, res) {
  let product = req.body.product;
  res.send(await center.request(product, center.DELETE));
});

app.post('/api/verifysale', async function(req, res) {
  const ingredients = sale.serialize(req.body.cart);
  const notposible = await sale.canToSell(ingredients);

  res.send(JSON.stringify({ imposible: notposible }));
});

app.post('/api/sale', async function(req, res) {
  const cart = sale.serialize(req.body.cart);
  const history_sale = req.body.sale;

  await sale.reinventory(cart);
  res.send(await center.request(history_sale, center.INSERT));
});

app.post('/api/updproduct', async function(req, res) {
  let product = req.body.product;
  res.send(await center.request(product, center.UPDATE));
});

/*********************************************************************
 *                        Users Operation                            *
 **********************************************************************/

app.post('/api/getuser', async function(req, res) {
  const user = req.body.user;
  let login = JSON.parse(await center.request(user, center.SELECT));

  if(login.length == 0) {
    user.type = 'employee';
    login = JSON.parse(await center.request(user, center.ESPSELECT));
  }

  login[0].type = user.type;
  res.send(JSON.stringify(login));
});

app.post('/api/adduser', async function(req, res) {
  let user = req.body.user;
  const exists = JSON.parse(await center.request(user, center.ESPSELECT));

  if(exists.length > 0)
    res.send(JSON.stringify([[]]));
  else
    res.send(await center.request(user, center.INSERT));
});

app.post('/api/upduser', async function(req, res) {
  let user = req.body.user;
  res.send(await center.request(user, center.UPDATE));
});

app.post('/api/deluser', async function(req, res) {
  let user = req.body.user;
  res.send(await center.request(user, center.DELETE));
});

/*********************************************************************
 *                        Employee Operation                         *
 **********************************************************************/

app.post('/api/getallemployees', async function(req, res) {
  const employee = req.body.employee;
  res.send(await center.request(employee, center.SELECT));
});

app.post('/api/addemployee', async function(req, res) {
  // Los que traen img se parsean y se les cambia el atributo photo
  let employee = JSON.parse(req.body.employee).employee;
  employee.template.photo += define_filename;
  res.send(await center.request(employee, center.INSERT));
});

app.post('/api/updemployee', async function(req, res) {
  let employee = (req.body.user) ? req.body.user : req.body.employee;
  res.send(await center.request(employee, center.UPDATE));
});

app.post('/api/delemployee', async function(req, res) {
  let employee = req.body.employee;
  res.send(await center.request(employee, center.DELETE));
});

/*********************************************************************
 *                        Inventory Operation                        *
 **********************************************************************/

app.post('/api/addinventory', async function(req, res) {
  const inventory = req.body.inventory;
  const ingredient = {
    type: 'ingredient',
    template: { key: inventory.template.ingredient, name: inventory.template.name }
  };

  await center.request(ingredient, center.INSERT);
  res.send(await center.request(inventory, center.INSERT));
});

app.post('/api/getinventory', async function(req, res) {
  const inventory = req.body.inventory;
  res.send(await center.request(inventory, center.SELECT));
});

app.post('/api/delinventory', async function(req, res) {
  const inventory = req.body.inventory;
  res.send(await center.request(inventory, center.DELETE));
});

app.post('/api/updinventory', async function(req, res) {
  let inventory = req.body.inventory;
  await sale.reinventory(inventory);
  res.send(JSON.stringify([]));
});
/*********************************************************************
 *                        Providers Operation                        *
 **********************************************************************/

app.post('/api/addprovider', async function(req, res) {
  const provider = JSON.parse(req.body.provider);
  provider.template.photo += define_filename;
  res.send(await center.request(provider, center.INSERT));
});

app.post('/api/updprovider', async function(req, res) {
  let provider = req.body.provider;
  res.send(await center.request(provider, center.UPDATE));
});

app.post('/api/delprovider', async function(req, res) {
  let provider = req.body.provider;
  res.send(await center.request(provider, center.DELETE));
});

app.post('/api/getallproviders', async function(req, res) {
  let provider = req.body.provider;
  res.send(await center.request(provider, center.SELECT));
});

/*********************************************************************
 *                        Shopping Operation                         *
 **********************************************************************/

app.post('/api/addshop', async function(req, res) {
  const shop = req.body.shop;
  res.send(await center.request(shop, center.INSERT));
});

/*********************************************************************
 *                        Historial Operation                        *
 **********************************************************************/

app.post('/api/gethistorical', async function(req, res) {
  let user = req.body.user;
  res.send(await center.request(user, center.SELECT));
});

app.post('/api/getcategoryhistorical', async function(req, res) {
  let user = req.body.user;
  res.send(await center.request(user, center.ESPSELECT));
});

app.post('/api/addhistorical', async function(req, res) {
  const historical = req.body.historical;
  res.send(await center.request(historical, center.INSERT));
});

/*********************************************************************
 *                        Backups Operation                          *
 **********************************************************************/

app.post('/api/getbackups', async function(req, res) {
  const backup = req.body.backup;
  res.send(await center.request(backup, center.SELECT));
});

app.post('/api/restorebackup', async function(req, res) {
  const backup = req.body.backup;
  res.send(await center.request(backup, center.INSERT));
});

app.post('/api/backup', async function(req, res) {
  const backup = req.body.backup;
  const res_backup = {};

  backup.type = 'product';
  res_backup.product = JSON.parse(await center.request(backup, center.BACKUP));
  backup.type = 'employee';
  res_backup.employee = await JSON.parse(await center.request(backup, center.BACKUP));
  backup.type = 'user';
  res_backup.user = await JSON.parse(await center.request(backup, center.BACKUP));
  backup.type = 'inventory';
  res_backup.inventory = await JSON.parse(await center.request(backup, center.BACKUP));
  backup.type = 'provider';
  res_backup.provider = await JSON.parse(await center.request(backup, center.BACKUP));
  backup.type = 'shop';
  res_backup.shop = await JSON.parse(await center.request(backup, center.BACKUP));
  backup.type = 'historical';
  res_backup.historical = await JSON.parse(await center.request(backup, center.BACKUP));

  backup.type = 'backup';
  await center.request(backup, center.ESPSELECT);

  res.send(JSON.stringify(res_backup));
});

app.listen(PORT, function() {
  console.log(`Server running on ${PORT}`);
});
