const getConfirmRegistration = async (req, res, next) => {
  try {
    res.status(501).json({ message: "Очікує на реалізацію" });
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

const updateConfirmRegistration = async (req, res, next) => {
  try {
    res.status(501).json({ message: "Очікує на реалізацію" });
  } catch (err) {
    res.status(500).json({ message: "Помилка на боці серверу" });
  }
};

module.exports = { getConfirmRegistration, updateConfirmRegistration };
