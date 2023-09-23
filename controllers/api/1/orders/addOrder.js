const moment = require("moment");
const { Order } = require("../../../../models");

const addOrder = async (req, res) => {
    const newOrderData = req.body;

    const currentDate = moment().startOf("day");

    // Parse the input issueDate
    const parsedIssueDate = moment(newOrderData.issueDate, "DD.MM.YYYY");
    const parsedIssueTime = moment(newOrderData.issueTime, "HH:mm");

    // Check if the issueDate is in the past
    if (parsedIssueDate.isBefore(currentDate)) {
        return res
            .status(406)
            .json({ message: "Дата не може бути в минулому" });
    }

    // Check if an order with the same issueDate already exists
    const existingOrder = await Order.findOne({
        unparsedDate: newOrderData.issueDate,
    });

    if (existingOrder) {
        return res
            .status(439)
            .json({ message: "Список з такою датою вже існує" });
    }

    newOrderData.unparsedDate = newOrderData.issueDate;

    const combinedIssueDateTime = parsedIssueDate
        .hours(parsedIssueTime.hours())
        .minutes(parsedIssueTime.minutes())
        .toISOString();

    newOrderData.issueDate = combinedIssueDateTime;

    delete newOrderData.issueTime;

    const existingOrdersWithSameType = await Order.find({
        type: newOrderData.type,
    });

    const transformedExistingOrders = existingOrdersWithSameType.map(
        (existingOrder) => ({
            _id: existingOrder._id,
            maxQuantity: existingOrder.maxQuantity,
            confirmedPersons: existingOrder.confirmedPersons,
            issueDate: existingOrder.issueDate,
            type: existingOrder.type,
            createdDate: existingOrder.createdDate,
            status: existingOrder.status,
        })
    );

    const result = await Order.create(newOrderData);

    const responseResult = {
        message: "Список успішно додано",
        newOrderData: {
            _id: result._id,
            maxQuantity: result.maxQuantity,
            confirmedPersons: result.confirmedPersons,
            issueDate: result.issueDate,
            type: result.type,
            createdDate: result.createdDate,
            status: result.status,
        },
        existingOrders: transformedExistingOrders,
    };

    res.status(201).json(responseResult);
};

module.exports = addOrder;
