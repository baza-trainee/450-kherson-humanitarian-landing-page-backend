const express = require('express');

const router = express.Router();
const { contacts: ctrl } = require('../../controllers');
const { validateBody, isValidId, auth, ctrlWrapper } = require('../../middlewares');
const { contactSchemas } = require('../../models/contact');

router.get('/', ctrlWrapper(auth), ctrlWrapper(ctrl.getAll));

router.get('/:contactId', ctrlWrapper(auth), isValidId, ctrlWrapper(ctrl.getById));

router.post('/', ctrlWrapper(auth), validateBody(contactSchemas.addSchema), ctrlWrapper(ctrl.add));

router.put(
  '/:contactId',
  ctrlWrapper(auth),
  isValidId,
  validateBody(contactSchemas.addSchema),
  ctrlWrapper(ctrl.updateById)
);

router.patch(
  '/:contactId/favorite',
  ctrlWrapper(auth),
  isValidId,
  validateBody(contactSchemas.updateFavorite),
  ctrlWrapper(ctrl.updateById)
);

router.delete('/:contactId', ctrlWrapper(auth), isValidId, ctrlWrapper(ctrl.removeById));

module.exports = router;
