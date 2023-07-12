const express = require('express');

const router = express.Router();
const ctrl = require('../../controllers/contacts');
const { validateBody } = require('../../middlewares');
const schema = require('../../schemas/contacts');

router.get('/', ctrl.getAll);

router.get('/:id', ctrl.getContactById);

router.post('/', validateBody(schema.addSchema), ctrl.createContact);

router.put('/:id', validateBody(schema.addSchema), ctrl.updateContact);

router.delete('/:id', ctrl.deleteContact);

module.exports = router;
