const express = require('express');

const router = express.Router();
const ctrl = require('../../controllers/contacts');
const { validateBody, isValidId } = require('../../middlewares');
const { schemas } = require('../../models/contact');

router.get('/', ctrl.getAll);

router.get('/:id', isValidId, ctrl.getContactById);

router.post('/', validateBody(schemas.addSchema), ctrl.createContact);

router.put('/:id', isValidId, validateBody(schemas.addSchema), ctrl.updateContact);

router.patch('/:id/favorite', isValidId, validateBody(schemas.updateFavorite), ctrl.updateContact);

router.delete('/:id', isValidId, ctrl.deleteContact);

module.exports = router;
