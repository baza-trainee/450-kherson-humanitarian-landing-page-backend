const { MainCollectionList } = require('../../models/');

const getAll = async (req, res) => {
  const result = await MainCollectionList.find({});

  res.json(result);
};

module.exports = getAll;

// const mongoose = require('mongoose');

// const getAll = async (req, res) => {
//   // Get the Mongoose connection object
//   const dbConnection = mongoose.connection;
//   // Fetch the list of collection names from the database
//   dbConnection.db.listCollections().toArray((err, collections) => {
//     if (err) {
//       console.error('Error fetching collections:', err);
//       res.status(500).json({ error: 'Error fetching collections' });
//     } else {
//       const collectionNames = collections.map(collection => collection.name);
//       console.log(collectionNames);
//       res.json({ collections: collectionNames });
//     }
//   });
// };

// module.exports = getAll;
