/*
 * Copyright (c) 2023 Volodymyr Nerovnia
 * SPDX-License-Identifier: MIT
 */

var express = require("express");
var router = express.Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

const controllerHero = require("../controllers/api/1/hero");
const controllerFund = require("../controllers/api/1/fund");
const controllerTeam = require("../controllers/api/1/team");
const controllerHistory = require("../controllers/api/1/history");
const controllerAchievements = require("../controllers/api/1/achievements");
const controllerIssuePoint = require("../controllers/api/1/issue-point");
const controllerOrder = require("../controllers/api/1/orders");
const controllerActivities = require("../controllers/api/1/activities");
const controllerProjects = require("../controllers/api/1/project");
const controllerLogos = require("../controllers/api/1/logo");
const controllerContacts = require("../controllers/api/1/contacts");
const controllerDocuments = require("../controllers/api/1/documents");
const controllerConfirmRegistration = require("../controllers/api/1/confirmRegistration");
const controllerDonats = require("../controllers/api/1/donats");
const { hasValidTocken } = require("../middleware/auth");
const { ctrlWrapper, updateStatusForPastDate } = require("../middleware");
const { isValidId, validateBody } = require("../utils/validators");
const { orderJoiSchemas } = require("../models/order/order");

const { isValidHero } = require("../middleware/api/1/hero");
const { isValidFund } = require("../middleware/api/1/fund");
const { isValidTeam } = require("../middleware/api/1/team");
const { isValidHistory } = require("../middleware/api/1/history");
const { isValidAchievement } = require("../middleware/api/1/achievement");
const { isValidIssuepoint } = require("../middleware/api/1/issuepoint");
const { isValidActivity } = require("../middleware/api/1/activity");
const { isValidProject } = require("../middleware/api/1/project");
const { isValidLogo } = require("../middleware/api/1/logo");
const { isValidContact } = require("../middleware/api/1/contacts");
const {
  isValidDocumentPrivacy,
} = require("../middleware/api/1/documents/privacy");
const {
  isValidDocumentPublicContract,
} = require("../middleware/api/1/documents/publicContract");
const {
  isValidDocumentReporting,
} = require("../middleware/api/1/documents/reporting");
const { isValidDocumentRules } = require("../middleware/api/1/documents/rules");
const {
  isValidDocumentStatut,
} = require("../middleware/api/1/documents/statut");
const {
  isValidConfirmRegistration,
} = require("../middleware/api/1/confirmRegistration");

const { isValidDonat } = require("../middleware/api/1/donat");

router.use("/docs", swaggerUi.serve);
router.get("/docs", swaggerUi.setup(swaggerDocument));

// Hero routes
router.post("/hero", hasValidTocken, isValidHero, controllerHero.createHero);
router.get("/hero/:id", isValidHero, controllerHero.getHeroById);
router.put("/hero/:id", hasValidTocken, isValidHero, controllerHero.updateHero);
router.delete(
  "/hero/:id",
  hasValidTocken,
  isValidHero,
  controllerHero.deleteHero
);
router.get("/heroes", controllerHero.getHeroes);

// Fund routes
router.get("/fund", controllerFund.getFund);
router.put("/fund", hasValidTocken, isValidFund, controllerFund.updateFund);

// Team routes
router.get("/team", controllerTeam.getTeam);
router.put("/team", hasValidTocken, isValidTeam, controllerTeam.updateTeam);

// History routes
router.get("/history", controllerHistory.getHistory);
router.put(
  "/history",
  hasValidTocken,
  isValidHistory,
  controllerHistory.updateHistory
);

// Achievements routes
router.get("/achievements", controllerAchievements.getAchievements);
router.put(
  "/achievements",
  hasValidTocken,
  isValidAchievement,
  controllerAchievements.updateAchievements
);

// Issue-point routes
router.get("/issue-point", controllerIssuePoint.getIssuePoint);
router.put(
  "/issue-point",
  hasValidTocken,
  isValidIssuepoint,
  controllerIssuePoint.updateIssuePoint
);

// Order routes
router.get(
  "/orders",
  hasValidTocken,
  updateStatusForPastDate,
  ctrlWrapper(controllerOrder.getAll)
);
router.get(
  "/order/:orderId",
  hasValidTocken,
  updateStatusForPastDate,
  ctrlWrapper(controllerOrder.getOrderById)
);
router.get(
  "/order/activate/:orderId/:link",
  updateStatusForPastDate,
  ctrlWrapper(controllerOrder.activatePerson)
);
router.get(
  "/order/:orderId/:link",
  hasValidTocken,
  updateStatusForPastDate,
  ctrlWrapper(controllerOrder.getPersonById)
);

router.post(
  "/orders",
  hasValidTocken,
  updateStatusForPastDate,
  validateBody(orderJoiSchemas.addSchema),
  ctrlWrapper(controllerOrder.addOrder)
);
router.patch(
  "/order/:orderId",
  updateStatusForPastDate,
  isValidId,
  validateBody(orderJoiSchemas.addPersonToOrderSchema),
  ctrlWrapper(controllerOrder.addPersonToOrder)
);

router.delete(
  "/order/:orderId",
  hasValidTocken,
  updateStatusForPastDate,
  ctrlWrapper(controllerOrder.removeOrderById)
);
router.get(
  "/export-order/generate/:orderId",
  hasValidTocken,
  isValidId,
  updateStatusForPastDate,
  ctrlWrapper(controllerOrder.generateLinkForExportExcel)
);

router.get(
  "/export-order/:orderId",
  // hasValidTocken,
  // isValidId,
  ctrlWrapper(controllerOrder.exportExcelOrder)
);
router.get(
  "/orders/quantity",
  updateStatusForPastDate,
  ctrlWrapper(controllerOrder.getQuantity)
);

// Activities routes
router.get("/activities", controllerActivities.getActivities);
router.post(
  "/activities",
  hasValidTocken,
  isValidActivity,
  controllerActivities.createActivity
);
router.get(
  "/activity/:id",
  isValidActivity,
  controllerActivities.getActivityById
);
router.put(
  "/activity",
  hasValidTocken,
  isValidActivity,
  controllerActivities.updateActivity
);
router.delete(
  "/activity",
  hasValidTocken,
  isValidActivity,
  controllerActivities.deleteActivity
);

// Projects routes

router.get("/projects", controllerProjects.getProjects);
router.post(
  "/projects",
  hasValidTocken,
  isValidProject,
  controllerProjects.createProject
);
router.get("/project/:id", isValidProject, controllerProjects.getProjectById);
router.put(
  "/project",
  hasValidTocken,
  isValidProject,
  controllerProjects.updateProject
);
router.delete(
  "/project",
  hasValidTocken,
  isValidProject,
  controllerProjects.deleteProject
);

// Logos routes
router.get("/logos", controllerLogos.getLogos);
router.post("/logos", hasValidTocken, isValidLogo, controllerLogos.createLogo);
router.get("/logo/:id", isValidLogo, controllerLogos.getLogoById);
router.put("/logo", hasValidTocken, isValidLogo, controllerLogos.updateLogo);
router.delete("/logo", hasValidTocken, isValidLogo, controllerLogos.deleteLogo);

// Contacts routes
router.get("/contacts", controllerContacts.getContacts);
router.put(
  "/contacts",
  hasValidTocken,
  isValidContact,
  controllerContacts.updateContacts
);

// Documents routes
router.get("/documents", controllerDocuments.getDocuments);
router.post(
  "/documents/rules",
  hasValidTocken,
  isValidDocumentRules,
  controllerDocuments.uploadRules
);
router.post(
  "/documents/publicOfferContract",
  hasValidTocken,
  isValidDocumentPublicContract,
  controllerDocuments.uploadPublicOfferContract
);
router.post(
  "/documents/privacy",
  hasValidTocken,
  isValidDocumentPrivacy,
  controllerDocuments.uploadPrivacy
);
router.post(
  "/documents/statut",
  hasValidTocken,
  isValidDocumentStatut,
  controllerDocuments.uploadStatut
);
router.post(
  "/documents/reporting",
  hasValidTocken,
  isValidDocumentReporting,
  controllerDocuments.uploadReporting
);

// Congrats routes
router.get(
  "/confirm-registration",
  controllerConfirmRegistration.getConfirmRegistration
);
router.put(
  "/confirm-registration",
  hasValidTocken,
  isValidConfirmRegistration,
  controllerConfirmRegistration.updateConfirmRegistration
);

// Donats routes
router.get("/donats", controllerDonats.getDonats);
router.post(
  "/donats",
  hasValidTocken,
  isValidDonat,
  controllerDonats.createDonat
);
router.get("/donat/:id", isValidDonat, controllerDonats.getDonatById);
router.put(
  "/donat/:id",
  hasValidTocken,
  isValidDonat,
  controllerDonats.updateDonat
);
router.delete(
  "/donat/:id",
  hasValidTocken,
  isValidDonat,
  controllerDonats.deleteDonat
);

// Export routes
//router.post('/export/order/:id', hasValidTocken, controllerExport.);

module.exports = router;
