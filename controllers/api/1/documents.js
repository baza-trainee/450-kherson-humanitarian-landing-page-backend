

const getDocuments = async (req, res, next) => {
  try {
    res.status(501).json({message: 'Очікує на реалізацію'})
  } catch (err) {
    res.status(500).json({message: 'Помилка на боці серверу'})
  }
}

const updateDocuments = async (req, res, next) => {
  try {
    res.status(501).json({message: 'Очікує на реалізацію'})
  } catch (err) {
    res.status(500).json({message: 'Помилка на боці серверу'})
  }
}

module.exports = {getDocuments, updateDocuments};