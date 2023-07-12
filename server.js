const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const { DB_HOST } = process.env;

console.log(DB_HOST);

mongoose
  .connect(DB_HOST)
  .then(() => console.log('connected'))
  .catch(error => console.log(error.message));

app.listen(3000, () => {
  console.log('Server running. Use our API on port: 3000');
});
