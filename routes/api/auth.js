const express = require('express');

const { auth: ctrl } = require('../../controllers/');

const { validateBody, auth, ctrlWrapper } = require('../../middlewares');

const { schemas } = require('../../models/user');

const router = express.Router();

router.post('/register', validateBody(schemas.registerSchema), ctrl.register);

router.post('/login', validateBody(schemas.loginSchema), ctrl.logIn);

router.get('/current', ctrlWrapper(auth), ctrl.getCurrentUser);

router.post('/logout', ctrlWrapper(auth), ctrl.logOut);

module.exports = router;
