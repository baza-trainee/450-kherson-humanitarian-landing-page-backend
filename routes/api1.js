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
// const controllerExport = require('../controllers/api/1/export/order');
const authMiddleware = require('../middleware/auth');
const { ctrlWrapper, updateStatusForPastDate } = require('../middleware');
const { isValidId, validateBody } = require('../utils/validators');
const { orderJoiSchemas } = require('../models/order/order');

// Swagger API
const options = {
  // explorer: true,
};

router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(swaggerDocument, options));

// Hero routes
router.post('/hero', authMiddleware, controllerHero.createHero);
router.get('/hero/:id', controllerHero.getHeroById);
router.put('/hero/:id', authMiddleware, controllerHero.updateHero);
router.delete('/hero/:id', authMiddleware, controllerHero.updateHero);
router.get('/heroes', controllerHero.deleteHero);

// Fund routes
router.get('/fund', controllerFund.getFund);
router.put('/fund', authMiddleware, controllerFund.updateFund);

// Team routes
router.get('/team', controllerTeam.getTeam);
router.put('/team', authMiddleware, controllerTeam.updateTeam);

// History routes
router.get('/history', controllerHistory.getHistory);
router.put('/history', authMiddleware, controllerHistory.updateHistory);

// Achievements routes
router.get('/achievements', controllerAchievements.getAchievements);
router.put('/achievements', authMiddleware, controllerAchievements.updateAchievements);

// Issue-point routes
router.get('/issue-point', controllerIssuePoint.getIssuePoint);
router.put('/issue-point', authMiddleware, controllerIssuePoint.updateIssuePoint);

// Order routes
router.get('/orders', updateStatusForPastDate, ctrlWrapper(controllerOrder.getAll));
router.get(
  '/order/activate/:orderId/:link',
  updateStatusForPastDate,
  ctrlWrapper(controllerOrder.activatePerson)
);
// TODO: Віддати PersonData:
// 1: ПІБ
// 2: Issue date from order
// 3: Issue time from order
// 4: address ask Volodimir
// 5:

router.get(
  '/order/:orderId/:link',
  updateStatusForPastDate,
  ctrlWrapper(controllerOrder.getPersonById)
);

router.get('/order/:orderId', updateStatusForPastDate, ctrlWrapper(controllerOrder.getOrderById));
router.post(
  '/orders',
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

// router.delete('/order/:id',  controllerOrder.);
// router.get('/orders',  controllerOrder.);
// router.post('/orders', controllerOrder.);
// router.get('/orders/quantity', controllerOrder.);

// Activities routes
router.get('/activities', controllerActivities.getActivities);
router.post('/activities', authMiddleware, controllerActivities.createActivity);
router.get('/activity/:id', controllerActivities.getActivityById);
router.put('/activity/:id', authMiddleware, controllerActivities.updateActivity);
router.delete('/activity/:id', authMiddleware, controllerActivities.deleteActivity);

// Projects routes
router.get('/projects', controllerProjects.getProjects);
router.post('/projects', authMiddleware, controllerProjects.createProject);
router.get('/project/:id', controllerProjects.getProjectById);
router.put('/project/:id', authMiddleware, controllerProjects.updateProject);
router.delete('/project/:id', authMiddleware, controllerProjects.deleteProject);

// Logos routes
router.get('/logos', controllerLogos.getLogos);
router.post('/logos', authMiddleware, controllerLogos.createLogo);
router.get('/logo/:id', controllerLogos.getLogoById);
router.put('/logo/:id', authMiddleware, controllerLogos.updateLogo);
router.delete('/logo/:id', authMiddleware, controllerLogos.deleteLogo);

// Contacts routes
router.get('/contacts', controllerContacts.getContacts);
router.put('/contacts', authMiddleware, controllerContacts.updateContacts);

// Documents routes
router.get('/documents', controllerDocuments.getDocuments);
router.put('/documents', authMiddleware, controllerDocuments.updateDocuments);

// Congrats routes
router.get('/congrats', controllerCongrats.getCongrats);
router.put('/congrats', authMiddleware, controllerCongrats.updateCongrats);

// Donats routes
router.get('/donats', controllerDonats.getDonats);
router.post('/donats', authMiddleware, controllerDonats.createDonat);
router.get('/donat/:id', controllerDonats.getDonatById);
router.put('/donat/:id', authMiddleware, controllerDonats.updateDonat);
router.delete('/donat/:id', authMiddleware, controllerDonats.deleteDonat);

// Export routes
//router.post('/export/order/:id', authMiddleware, controllerExport.);

module.exports = router;
