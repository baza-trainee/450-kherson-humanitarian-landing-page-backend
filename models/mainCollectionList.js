const { Schema, model } = require('mongoose');

const mainCollectionSchema = new Schema({
  disHelpDocs: [{ type: Schema.Types.ObjectId, ref: 'disHelp' }],
  idpHelpDocs: [{ type: Schema.Types.ObjectId, ref: 'idpHelp' }],
  childrenHelpDocs: [{ type: Schema.Types.ObjectId, ref: 'childrenHelp' }],
});

const MainCollectionList = model('mainCollection', mainCollectionSchema);

module.exports = { MainCollectionList };
