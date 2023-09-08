async function handleSchemaStatusModify(next) {
  try {
    if (this.isModified('type')) {
      console.log('поле type модифіковане');

      const existingActiveOrder = await this.constructor.findOne({
        type: this.type,
        status: 'active',
      });

      this.status = existingActiveOrder ? 'ready' : 'active';
    }

    next();
  } catch (error) {
    console.error('Помилка handleSchemaStatusModify :', error);
    next(error);
  }
}

module.exports = handleSchemaStatusModify;
