const { IdpHelp, ArchivedUser } = require('../../models/');

const moveToArchive = async (req, res) => {
  //   const usersToArchive = await IdpHelp.find({});
  //   await ArchivedUser.create(usersToArchive);
  //   await IdpHelp.aggregate([{ $match: {} }, { $out: 'ArchivedUser' }]);

  try {
    // Find all documents in the source collection
    const documentsToMove = await IdpHelp.find();

    if (documentsToMove.length > 0) {
      // Insert the documents into the archive collection, ensuring no duplicates
      await documentsToMove.map(async doc => {
        // Use $setOnInsert to preserve original _id and prevent duplicates
        const filter = { _id: doc._id };
        const update = { $setOnInsert: doc };
        await ArchivedUser.updateOne(filter, update, { upsert: true });
      });

      console.log(`${documentsToMove.length} documents moved to the archive collection.`);
      res.json({
        message: `${documentsToMove.length} documents moved to the archive collection.`,
      });
    } else {
      console.log('No documents found in the source collection.');
    }
  } catch (error) {
    console.error('Error moving documents to the archive collection:', error);
  }
};
module.exports = moveToArchive;
