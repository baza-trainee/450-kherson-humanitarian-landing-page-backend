const app = require('./app');
const mongoose = require('mongoose');

const { DB_HOST, PORT = 3000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log(`Server running. Database connection successful Use our API on port: ${PORT} `);
  })
  .catch(error => {
    console.log('Error connecting to database', error.message);
    process.exit(1);
  });
