const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 5001;

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Our product data
const products = [
  {
    sku: 77464001,
    description: 'Nintendo Switch',
    price: 299,
    image_url:
      'https://target.scene7.com/is/image/Target/GUEST_5561e25a-a986-4b57-bba4-ee339796ae89?fmt=webp&wid=1400&qlt=80',
  },
  {
    sku: 81114595,
    description: 'Playstation 5',
    price: 499,
    image_url:
      'https://target.scene7.com/is/image/Target/GUEST_448cd375-9756-4fdc-99e3-96396f30dc29?fmt=webp&wid=1400&qlt=80',
  },
  {
    sku: 80790841,
    description: 'Xbox Series X',
    price: 499,
    image_url:
      'https://target.scene7.com/is/image/Target/GUEST_77e2a7ba-bfe8-435e-bc1e-01f2a7426e6c?fmt=webp&wid=1400&qlt=80',
  },
];

// Our array that we will use for checkout
const checkout = [];

// Route to get the contents of our cart
app.get('/cart', (req, res) => {
  // Creates a total cost!
  // Calculations are best done on the server when possible!
  // Saves on code in the event that there are two front ends (ex// Web App and iOS app)
  let total = 0;
  for (let item of checkout) {
    total += parseInt(item.price);
  }

  // Send down an object, one key is the total cost, the other is the list of items!
  res.send({ total, checkout });
});

app.post('/additem', (req, res) => {
  if (!req.body.sku) res.sendStatus(400); // If sku is not on the body, return bad request.

  // Simplify the Sku that came from the front end
  // Comes up as a string though, so we have to convert! Keep that in mind!
  const productSku = parseInt(req.body.sku);

  // Start off assuming that we wont find the product
  let productFound = false;

  // Go through the list of products stored on the server
  for (let item of products) {
    // See if the Sku from the front end matches one on our server
    if (item.sku === productSku) {
      // If we have a match, push the item into our checkout
      checkout.push(item);

      // Change the found product flag to true
      productFound = true;
    }
  }

  // If we found a product, let the client know we did. If not, let the client know know we did not find it.
  if (productFound) {
    res.sendStatus(201); // Sku added to checkout, 201 created
  } else {
    res.sendStatus(404); // Sku not found, 404 not found
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
