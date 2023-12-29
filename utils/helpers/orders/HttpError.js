const errorMessageList = {
    400: "Bad request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not found",
    406: "Not acceptable",
    409: "Conflict",
    432: "Список не знайдено",
    406: "not acceptable",
    432: "Список не знайдено",
    433: "Список не активний",
    434: "Список заповнений чи знаходиться в архіві",
    435: "Імейл вже зареєстрований",
    436: "Список не оновлено",
    437: "Людина не знайдена у списку",
    438: "Людина вже активована",
    439: "Список з такою датою вже існує",
    440: "Людина не активована",
    500: "Помилка на боці сервера",
};

const HttpError = (status, message = errorMessageList[status]) => {
    const error = new Error(message);
    error.status = status;
    return error;
};
module.exports = HttpError;
