const getAll = require("./getAll");
const addOrder = require("./addOrder");
const getOrderById = require("./getOrderById");
const addPersonToOrder = require("./addPersonToOrder");
const activatePerson = require("./activationPerson");
const getPersonById = require("./getPersonById");
const removeOrderById = require("./removeOrderById");
const exportExcelOrder = require("./exportExcelOrder");
const generateLinkForExportExcel = require("./generateLinkForExportExcel");
const getQuantity = require("./getQuantity");
const deletePersonById = require("./deletePersonById");
// const updateById = require('./updateById');

module.exports = {
    getAll,
    addOrder,
    getOrderById,
    addPersonToOrder,
    activatePerson,
    getPersonById,
    removeOrderById,
    exportExcelOrder,
    getQuantity,
    generateLinkForExportExcel,
    deletePersonById,
    //   updateById,
};
