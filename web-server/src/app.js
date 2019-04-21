const path = require('path');
const request = require('request');
const requestPromise = require('request-promise');
const express = require('express');

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(publicDirectoryPath));

app.use((req, res, next) => {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  res.setHeader('Authorization', 'Basic ' + Buffer.from('878ecfa5-b126-4736-8ff9-1b6decbe6c55:bpay@123').toString('base64'));

  // Pass to next layer of middleware
  next();
});

app.get('/api/items', (req, res) => {
  const urlML = `https://api.mercadolibre.com/sites/MLA/search?q=:${req.query.query}&limit=4`;
  
  if (!req.query.query) {
    return res.send({
      error: 'É preciso informar uma busca.'
    });
  }
  request({url: urlML, json: true}, (error, response) => {
    res.send({
      author: {
        name: 'Juliano',
        lastname: 'Padilha'
      },
      categories: [],
      items: response.body.results
    });
  });
});

app.get('/api/items/:id', (req, res) => {
  const urlMLProduct = `https://api.mercadolibre.com/items/${req.params.id}`;
  const urlMLProductDescription = productId => `https://api.mercadolibre.com/items/${productId}/description`;

  if (!req.params.id) {
    return res.send({
      error: 'É preciso informar um ID.'
    });
  }
  
  requestPromise({url: urlMLProduct, json: true})
    .then(responseProduct => {
      requestPromise({url: urlMLProductDescription(responseProduct.id), json: true})
        .then(response => {
          res.send({
            author: {
              name: 'Juliano',
              lastname: 'Padilha'
            },
            item: {
              id: responseProduct.id,
              title: responseProduct.title,
              price: {
                currency: responseProduct.currency_id,
                amount: responseProduct.price,
                decimals: 2
              },
              picture: responseProduct.pictures[0],
              condition: responseProduct.condition,
              free_shipping: responseProduct.shipping.free_shipping,
              sold_quantity: responseProduct.sold_quantity,
              description: response.plain_text
            }
          });
    })
  })
});

app.get('/api/items/:id/description', (req, res) => {
  const urlMLProductDescription = `https://api.mercadolibre.com/items/${req.params.id}/description`;

  if (!req.params.id) {
    return res.send({
      error: 'É preciso informar um ID.'
    });
  }
  
  request({url: urlMLProductDescription, json: true}, (error, response) => {
    res.send({
      products: response.body
    });
  });
});

app.get('/weather/*', (req, res) => {
  res.send('Weather not found!')
});

app.get('*', (req, res) => {
  res.send('Página não existe');
})

app.listen(3000, () => {
  console.log('Server is running!');
});