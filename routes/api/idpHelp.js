const express = require('express');

const router = express.Router();
const { idpHelp: ctrl } = require('../../controllers');
const {
  validateBody,
  isValidId,
  auth,
  ctrlWrapper,
  modifyRequestBody,
} = require('../../middlewares');
const { idpHelpJoiSchemas } = require('../../models/idpHelp');

router.get('/', ctrlWrapper(auth), ctrlWrapper(ctrl.getAll));

router.post(
  '/',
  ctrlWrapper(modifyRequestBody),
  validateBody(idpHelpJoiSchemas.addSchema),
  ctrlWrapper(ctrl.add)
);

router.post('/movetoarchive', ctrlWrapper(auth), ctrl.moveToArchive);

// router.get('/:contactId', ctrlWrapper(auth), isValidId, ctrlWrapper(ctrl.getById));

// router.put(
//   '/:contactId',
//   ctrlWrapper(auth),
//   isValidId,
//   validateBody(idpHelpJoiSchemas.addSchema),
//   ctrlWrapper(ctrl.updateById)
// );

// router.patch(
//   '/:contactId/favorite',
//   ctrlWrapper(auth),
//   isValidId,
//   validateBody(idpHelpJoiSchemas.updateFavorite),
//   ctrlWrapper(ctrl.updateById)
// );

router.delete('/:contactId', ctrlWrapper(auth), isValidId, ctrlWrapper(ctrl.removeById));

module.exports = router;
