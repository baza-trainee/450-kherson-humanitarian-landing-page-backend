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
const { hasValidTocken } = require('../middleware/auth');
const { ctrlWrapper, updateStatusForPastDate } = require('../middleware');
const { isValidId, validateBody } = require('../utils/validators');
const { orderJoiSchemas } = require('../models/order/order');

const { isValidHero } = require('../middleware/api/1/hero');

// Swagger API
const options = {
  // explorer: true,
};

router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(swaggerDocument, options));

// Hero routes
router.post('/hero', hasValidTocken, isValidHero, controllerHero.createHero);
router.get('/hero/:id', controllerHero.getHeroById);
router.put('/hero/:id', hasValidTocken, controllerHero.updateHero);
router.delete('/hero/:id', hasValidTocken, controllerHero.updateHero);
router.get('/heroes', controllerHero.deleteHero);

// Fund routes
router.get('/fund', controllerFund.getFund);
router.put('/fund', hasValidTocken, controllerFund.updateFund);

// Team routes
router.get('/team', controllerTeam.getTeam);
router.put('/team', hasValidTocken, controllerTeam.updateTeam);

// History routes
router.get('/history', controllerHistory.getHistory);
router.put('/history', hasValidTocken, controllerHistory.updateHistory);

// Achievements routes
router.get('/achievements', controllerAchievements.getAchievements);
router.put('/achievements', hasValidTocken, controllerAchievements.updateAchievements);

// Issue-point routes
router.get('/issue-point', controllerIssuePoint.getIssuePoint);
router.put('/issue-point', hasValidTocken, controllerIssuePoint.updateIssuePoint);

// Order routes
router.get('/orders', hasValidTocken, updateStatusForPastDate, ctrlWrapper(controllerOrder.getAll));
router.get(
  '/order/:orderId',
  hasValidTocken,
  updateStatusForPastDate,
  ctrlWrapper(controllerOrder.getOrderById)
);
router.get(
  '/order/activate/:orderId/:link',
  updateStatusForPastDate,
  ctrlWrapper(controllerOrder.activatePerson)
);
router.get(
  '/order/:orderId/:link',
  hasValidTocken,
  updateStatusForPastDate,
  ctrlWrapper(controllerOrder.getPersonById)
);

router.post(
  '/orders',
  hasValidTocken,
  updateStatusForPastDate,
  validateBody(orderJoiSchemas.addSchema),
  ctrlWrapper(controllerOrder.addOrder)
);
router.patch(
  '/order/:orderId',
  updateStatusForPastDate,
  isValidId,
  validateBody(orderJoiSchemas.addPersonToOrderSchema),
  ctrlWrapper(controllerOrder.addPersonToOrder)
);

router.delete(
  '/order/:orderId',
  hasValidTocken,
  updateStatusForPastDate,
  ctrlWrapper(controllerOrder.removeOrderById)
);
router.get(
  '/export-order/:orderId',
  // hasValidTocken,
  isValidId,
  ctrlWrapper(controllerOrder.exportExcelOrder)
);
router.get('/orders/quantity', updateStatusForPastDate, ctrlWrapper(controllerOrder.getQuantity));

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
