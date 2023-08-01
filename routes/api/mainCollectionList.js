const express = require('express');

const router = express.Router();
const { mainCollectionList: ctrl } = require('../../controllers');
const { auth, ctrlWrapper } = require('../../middlewares');

router.get('/', ctrlWrapper(auth), ctrlWrapper(ctrl.getAll));

// router.post(
//   '/',
//   ctrlWrapper(modifyRequestBody),
//   validateBody(childrenHelpJoiSchemas.addSchema),
//   ctrlWrapper(ctrl.add)
// );

module.exports = router;
