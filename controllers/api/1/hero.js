

const createHero = async (req, res, next) => {
  try {
    res.status(501).json({message: 'Очікує на реалізацію'})
  } catch (err) {
    res.status(500).json({message: 'Помилка на боці серверу'})
  }
}

const getHeroById = async (req, res, next) => {
  try {
    res.status(501).json({message: 'Очікує на реалізацію'})
  } catch (err) {
    res.status(500).json({message: 'Помилка на боці серверу'})
  }
}

const updateHero = async (req, res, next) => {
  try {
    res.status(501).json({message: 'Очікує на реалізацію'})
  } catch (err) {
    res.status(500).json({message: 'Помилка на боці серверу'})
  }
}

const deleteHero = async (req, res, next) => {
  try {
    res.status(501).json({message: 'Очікує на реалізацію'})
  } catch (err) {
    res.status(500).json({message: 'Помилка на боці серверу'})
  }
}

module.exports = {createHero, getHeroById, updateHero, deleteHero};