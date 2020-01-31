const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;
const DataCenter = require('./data_center/DataCenter.js');
center = new DataCenter();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.get('/', function(req, res) {
  res.send('Welcome to the server salespoint system');
});

app.post('/api/get_all_product', async function(req, res) {
  let product = req.body.product;
  let response = await center.getListProduct(product);
  console.log(response);
  res.send(response);
});

app.post('/api/add_product', async function(req, res) {
  let product = req.body.product;
  let response = await center.addProduct(product);
  
  res.send(response);
});

app.post('/api/get_user', async function(req, res) {
  let user = req.body.user;
  let response = await center.getUser(user);

  res.send(response);
});

app.post('/api/add_user', async function(req, res) {
  let user = req.body.user;
  let response = await center.addUser(user);
  
  res.send(response);
});

app.listen(PORT, function() {
  console.log(`Server running on ${PORT}`);
});
