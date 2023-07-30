const express = require('express');

const router = express.Router();
const { disHelp: ctrl } = require('../../controllers');
const { validateBody, auth, ctrlWrapper, modifyRequestBody } = require('../../middlewares');
const { disHelpJoiSchemas } = require('../../models/disHelp');

router.get('/', ctrlWrapper(auth), ctrlWrapper(ctrl.getAll));

router.post(
  '/',
  ctrlWrapper(modifyRequestBody),
  validateBody(disHelpJoiSchemas.addSchema),
  ctrlWrapper(ctrl.add)
);

module.exports = router;
