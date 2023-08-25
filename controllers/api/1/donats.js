

const createDonat = async (req, res, next) => {
  try {
    res.status(501).json({message: 'Очікує на реалізацію'})
  } catch (err) {
    res.status(500).json({message: 'Помилка на боці серверу'})
  }
}

const getDonats = async (req, res, next) => {
  try {
    res.status(501).json({message: 'Очікує на реалізацію'})
  } catch (err) {
    res.status(500).json({message: 'Помилка на боці серверу'})
  }
}

const getDonatById = async (req, res, next) => {
  try {
    res.status(501).json({message: 'Очікує на реалізацію'})
  } catch (err) {
    res.status(500).json({message: 'Помилка на боці серверу'})
  }
}

const updateDonat = async (req, res, next) => {
  try {
    res.status(501).json({message: 'Очікує на реалізацію'})
  } catch (err) {
    res.status(500).json({message: 'Помилка на боці серверу'})
  }
}

const deleteDonat = async (req, res, next) => {
  try {
    res.status(501).json({message: 'Очікує на реалізацію'})
  } catch (err) {
    res.status(500).json({message: 'Помилка на боці серверу'})
  }
}

module.exports = {createDonat, getDonatById, updateDonat, deleteDonat, getDonats};