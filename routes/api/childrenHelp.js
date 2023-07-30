const express = require('express');

const router = express.Router();
const { childrenHelp: ctrl } = require('../../controllers');
const { validateBody, auth, ctrlWrapper, modifyRequestBody } = require('../../middlewares');
const { childrenHelpJoiSchemas } = require('../../models/childrenHelp');

router.get('/', ctrlWrapper(auth), ctrlWrapper(ctrl.getAll));

router.post(
  '/',
  ctrlWrapper(modifyRequestBody),
  validateBody(childrenHelpJoiSchemas.addSchema),
  ctrlWrapper(ctrl.add)
);

module.exports = router;
