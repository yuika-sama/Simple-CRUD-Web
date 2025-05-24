require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const productsRoute = require('./routes/products.route');
const categoriesRoute = require('./routes/categories.route');
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.use('/products', productsRoute);
app.use('/categories', categoriesRoute);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 
