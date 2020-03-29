const express = require('express');
const cors = require('cors');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: './uploads',
  filename: function(req, file, cb) {
    define_filename = `${file.fieldname}-${Date.now()}.jpg`;
    cb(null, define_filename);
  }
});

const upload = multer({storage: storage});
const app = express();

const PORT = process.env.PORT || 8000;
let define_filename = 'ggg';
const DataCenter = require('./data_center/DataCenter.js');
center = new DataCenter();

app.use(cors());
app.use(upload.single('img'));
app.use(express.json({ limit: '10mb' }));
app.use(express.static(__dirname + '/uploads/'));

app.get('/', function(req, res) {
  res.send('Welcome to the server salespoint system');
});

const consult = async function(object, oper) {
  let response = await center.request(object, oper);
  return response;
}

/*********************************************************************
 *                        Product Operation                          *
 **********************************************************************/

app.post('/api/getallproduct', async function(req, res) {
  const product = req.body.product;
  res.send(await consult(product, center.SELECT));
});

app.post('/api/getproducts', async function(req, res) {
  const product = req.body.product;
  res.send(await consult(product, center.ESPSELECT));
});

app.post('/api/addproduct', async function(req, res) {
  let product = JSON.parse(req.body.product).product;
  product.template.photo += define_filename;
  res.send(await consult(product, center.INSERT));
});

app.post('/api/delproduct', async function(req, res) {
  let product = req.body.product;
  res.send(await consult(product, center.DELETE));
});

/*********************************************************************
 *                        Users Operation                            *
 **********************************************************************/

app.post('/api/getuser', async function(req, res) {
  const user = req.body.user;
  res.send(await consult(user, center.SELECT));
});

app.post('/api/add_user', async function(req, res) {
  let user = req.body.user;
  res.send(await consult(user, center.INSERT));
});

/*********************************************************************
 *                        Employee Operation                         *
 **********************************************************************/

app.post('/api/getallemployees', async function(req, res) {
  const employee = req.body.employee;
  res.send(await consult(employee, center.SELECT));
});

app.post('/api/addemployee', async function(req, res) {
  let employee = JSON.parse(req.body.employee).employee;
  employee.template.photo += define_filename;
  res.send(await consult(employee, center.INSERT));
});

app.post('/api/delemployee', async function(req, res) {
  let employee = req.body.employee;
  res.send(await consult(employee, center.DELETE));
});

/*********************************************************************
 *                        Providers Operation                        *
 **********************************************************************/

app.post('/api/addprovider', async function(req, res) {
  const provider = JSON.parse(req.body.provider);
  provider.template.photo += define_filename;
  res.send(await consult(provider, center.INSERT));
});

/*********************************************************************
 *                        Historial Operation                        *
 **********************************************************************/

app.post('/api/gethistorical', async function(req, res) {
  let user = req.body.user;
  res.send(await consult(user, center.SELECT));
});

app.listen(PORT, function() {
  console.log(`Server running on ${PORT}`);
});
