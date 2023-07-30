const { ChildrenHelp } = require('../../models');
const add = async (req, res) => {
  // const { _id: owner } = req.user;
  const result = await ChildrenHelp.create(req.body);
  // await Contact.aggregate([{ $match: {} }, { $out: 'collection2' }]);

  res.status(201).json(result);
};

module.exports = add;
