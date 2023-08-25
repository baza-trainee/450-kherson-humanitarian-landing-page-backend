var express = require('express');
var router = express.Router();
const controller = require('../controllers/auth');
/* GET home page. */
/*
router.get('/login', function(req, res, next) {
  try {
    res.json('user work');
  } catch (err) {
  
  }
});
*/

router.post('/login',
  //body('username').isEmail(),
  //body('password').isLength({min: 8, max: 32}),
  controller.login);
  router.post('/renew', controller.renewPassword);
  router.post('/change', controller.changePassword);
router.get('/renew/:link', controller.renewPasswordLink);


module.exports = router;
