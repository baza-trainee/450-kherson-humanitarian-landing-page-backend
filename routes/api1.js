var express = require('express');
var router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const controllerHero = require('../controllers/api/1/hero');
const controllerFund = require('../controllers/api/1/fund');
const controllerTeam = require('../controllers/api/1/team');
const controllerHistory = require('../controllers/api/1/history');
const controllerAchievements = require('../controllers/api/1/achievements');
const controllerIssuePoint = require('../controllers/api/1/issue-point');
const controllerOrder = require('../controllers/api/1/orders');
const controllerActivities = require('../controllers/api/1/activities');
const controllerProjects = require('../controllers/api/1/project');
const controllerLogos = require('../controllers/api/1/logo');
const controllerContacts = require('../controllers/api/1/contacts');
const controllerDocuments = require('../controllers/api/1/documents');
const controllerCongrats = require('../controllers/api/1/congrats');
const controllerDonats = require('../controllers/api/1/donats');
const controllerExport = require('../controllers/api/1/export/order');
const { hasValidTocken } = require('../middleware/auth');
const { ctrlWrapper, updateStatusForPastDate } = require('../middleware');
const { isValidId, validateBody } = require('../utils/validators');
const { orderJoiSchemas } = require('../models/order/order');


const { isValidHero } = require('../middleware/api/1/hero');
const { isValidFund } = require('../middleware/api/1/fund');
const { isValidTeam } = require('../middleware/api/1/team');
const { isValidHistory } = require('../middleware/api/1/history');


// Swagger API
const options = {
  // explorer: true,
};

router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(swaggerDocument, options));

// Hero routes
router.post('/hero', hasValidTocken, isValidHero, controllerHero.createHero);
router.get('/hero/:id', isValidHero, controllerHero.getHeroById);
router.put('/hero/:id', hasValidTocken, isValidHero, controllerHero.updateHero);
router.delete('/hero/:id', hasValidTocken, isValidHero, controllerHero.deleteHero);
router.get('/heroes', controllerHero.getHeroes);

// Fund routes
router.get('/fund', controllerFund.getFund);
router.put('/fund', hasValidTocken, isValidFund, controllerFund.updateFund);

// Team routes
router.get('/team', controllerTeam.getTeam);
router.put('/team', hasValidTocken, isValidTeam, controllerTeam.updateTeam);

// History routes
router.get('/history', controllerHistory.getHistory);
router.put('/history', hasValidTocken, isValidHistory, controllerHistory.updateHistory);

// Achievements routes
router.get('/achievements', controllerAchievements.getAchievements);
router.put('/achievements', hasValidTocken, controllerAchievements.updateAchievements);

// Issue-point routes
router.get('/issue-point', controllerIssuePoint.getIssuePoint);
router.put('/issue-point', hasValidTocken, controllerIssuePoint.updateIssuePoint);

// Order routes
router.get('/orders', updateStatusForPastDate, ctrlWrapper(controllerOrder.getAll));
router.get(
  '/orders/activate/:orderId/:link',
  updateStatusForPastDate,
  controllerOrder.activatePerson
);
router.get('/orders/:orderId', updateStatusForPastDate, controllerOrder.getOrderById);
router.post(
  '/orders',
  updateStatusForPastDate,
  validateBody(orderJoiSchemas.addSchema),
  controllerOrder.addOrder
);
router.patch(
  '/orders/:orderId',
  updateStatusForPastDate,
  isValidId,
  validateBody(orderJoiSchemas.addPersonToOrderSchema),
  ctrlWrapper(controllerOrder.addPersonToOrder)
);

// router.delete('/order/:id',  controllerOrder.);
// router.get('/orders',  controllerOrder.);
// router.post('/orders', controllerOrder.);
// router.get('/orders/quantity', controllerOrder.);

// Activities routes
router.get('/activities', controllerActivities.getActivities);
router.post('/activities', hasValidTocken, controllerActivities.createActivity);
router.get('/activity/:id', controllerActivities.getActivityById);
router.put('/activity/:id', hasValidTocken, controllerActivities.updateActivity);
router.delete('/activity/:id', hasValidTocken, controllerActivities.deleteActivity);

// Projects routes
router.get('/projects', controllerProjects.getProjects);
router.post('/projects', hasValidTocken, controllerProjects.createProject);
router.get('/project/:id', controllerProjects.getProjectById);
router.put('/project/:id', hasValidTocken, controllerProjects.updateProject);
router.delete('/project/:id', hasValidTocken, controllerProjects.deleteProject);

// Logos routes
router.get('/logos', controllerLogos.getLogos);
router.post('/logos', hasValidTocken, controllerLogos.createLogo);
router.get('/logo/:id', controllerLogos.getLogoById);
router.put('/logo/:id', hasValidTocken, controllerLogos.updateLogo);
router.delete('/logo/:id', hasValidTocken, controllerLogos.deleteLogo);

// Contacts routes
router.get('/contacts', controllerContacts.getContacts);
router.put('/contacts', hasValidTocken, controllerContacts.updateContacts);

// Documents routes
router.get('/documents', controllerDocuments.getDocuments);
router.put('/documents', hasValidTocken, controllerDocuments.updateDocuments);

// Congrats routes
router.get('/congrats', controllerCongrats.getCongrats);
router.put('/congrats', hasValidTocken, controllerCongrats.updateCongrats);

// Donats routes
router.get('/donats', controllerDonats.getDonats);
router.post('/donats', hasValidTocken, controllerDonats.createDonat);
router.get('/donat/:id', controllerDonats.getDonatById);
router.put('/donat/:id', hasValidTocken, controllerDonats.updateDonat);
router.delete('/donat/:id', hasValidTocken, controllerDonats.deleteDonat);

// Export routes
//router.post('/export/order/:id', hasValidTocken, controllerExport.);

module.exports = router;
