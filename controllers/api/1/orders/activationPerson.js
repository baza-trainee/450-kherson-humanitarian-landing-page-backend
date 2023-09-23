const moment = require("moment");
const { Order } = require("../../../../models");
const { HttpError } = require("../../../../utils/helpers");
const updateNextClosestReadyOrder = require("../../../../utils/helpers/orders/updateNextClosestReadyOrder");
const { urls } = require("../../../../config/app");

const activatePerson = async (req, res) => {
    const { orderId, link } = req.params;
    const unsuccessfulFrontendRedirectURL = `https://${urls.APP_URL}/notification/unsuccess-registration`;
    const successfulFrontendRedirectURL = `https://${urls.APP_URL}/notification/success-registration`;

    try {
        const existingOrder = await Order.findById(orderId);

        if (!existingOrder) {
            throw HttpError(404, "Список не знайдений");
        }

        const personIndex = existingOrder.persons.findIndex(
            (person) => person.id === link
        );
        if (personIndex === -1) {
            throw HttpError(404, "Людина не знайдена у списку");
        }

        // Check if the person is already activated
        if (!existingOrder.persons[personIndex].isActivated) {
            // Update isActivated field of the person
            existingOrder.persons[personIndex].isActivated = true;

            // Increase confirmedPersons count if the person is activated
            existingOrder.confirmedPersons =
                (existingOrder.confirmedPersons || 0) + 1;

            if (existingOrder.confirmedPersons >= existingOrder.maxQuantity) {
                existingOrder.status = "complete";
            }
        } else {
            // If the person is already activated, you can return an error or a message
            throw HttpError(400, "Людина вже активована");
        }

        await existingOrder.save();

        if (existingOrder.status === "complete") {
            await updateNextClosestReadyOrder(existingOrder.type);
        } else {
            return res.redirect(unsuccessfulFrontendRedirectURL);
        }
        const parsedTimeForQuery = moment(existingOrder.issueDate).format(
            "HH:mm"
        );

        const queryParams = `?issueDate=${existingOrder.unparsedDate}&issueTime=${parsedTimeForQuery}&name=${existingOrder.persons[personIndex].name}&surname=${existingOrder.persons[personIndex].surname}&patrname=${existingOrder.persons[personIndex].patrname}`;
        const redirectURL = successfulFrontendRedirectURL + queryParams;

        console.log("Redirect URL with issueDate:", redirectURL);

        return res.redirect(successfulFrontendRedirectURL + queryParams);
        // return res.status(200).json({ message: 'Person activated successfully' });
    } catch (error) {
        return res.redirect(unsuccessfulFrontendRedirectURL);
        // return res
        // .status(error.statusCode || 500)
        // .json({ error: error.message || 'Internal Server Error' });
    }
};

module.exports = activatePerson;
