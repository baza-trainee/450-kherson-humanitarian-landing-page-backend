const moment = require("moment");
const { Order } = require("../../../../models");
// const { HttpError } = require("../../../../utils/helpers");
const updateNextClosestReadyOrder = require("../../../../utils/helpers/orders/updateNextClosestReadyOrder");
const { urls } = require("../../../../config/app");

const activatePerson = async (req, res) => {
    const { orderId, link } = req.params;
    const successfulFrontendRedirectURL = `${urls.APP_URL}/notification/success-registration`;
    const unsuccessfulFrontendRedirectURL = `${urls.APP_URL}/notification/unsuccess-registration`;

    try {
        const existingOrder = await Order.findById(orderId);

        if (!existingOrder) {
            // throw HttpError(432, "Список не знайдено");

            res.redirect(
                unsuccessfulFrontendRedirectURL +
                    '?error=432&message="Список не знайдено"'
            );
        }

        const personIndex = existingOrder.persons.findIndex(
            (person) => person.id === link
        );
        if (personIndex === -1) {
            // throw HttpError(437, "Людина не знайдена у списку");
            res.redirect(
                unsuccessfulFrontendRedirectURL +
                    '?error=437&message="Людина не знайдена у списку"'
            );
        }
        if (existingOrder.status === "complete") {
            await updateNextClosestReadyOrder(existingOrder.type);
            return res.redirect(
                unsuccessfulFrontendRedirectURL +
                    '?error=434&message="Список заповнений чи знаходиться в архіві"'
            );
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
            // throw HttpError(438, "Людина вже активована");
            res.redirect(
                unsuccessfulFrontendRedirectURL +
                    '?error=438&message="Людина вже активована"'
            );
        }

        await existingOrder.save();

        const parsedTimeForQuery = moment(existingOrder.issueDate).format(
            "HH:mm"
        );

        const queryParams = `?issueDate=${existingOrder.unparsedDate}&issueTime=${parsedTimeForQuery}&name=${existingOrder.persons[personIndex].name}&surname=${existingOrder.persons[personIndex].surname}&patrname=${existingOrder.persons[personIndex].patrname}`;
        // const redirectURL = successfulFrontendRedirectURL + queryParams;

        return res.redirect(successfulFrontendRedirectURL + queryParams);
    } catch (error) {
        return res.redirect(
            unsuccessfulFrontendRedirectURL +
                '?error=500&message="помилка на боці сервера"'
        );
    }
};

module.exports = activatePerson;
