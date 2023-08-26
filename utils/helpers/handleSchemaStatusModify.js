async function handleSchemaStatusModify(next) {
  try {
    if (this.isModified('type')) {
      console.log('Type field is modified');

      const existingActiveOrder = await this.constructor.findOne({
        type: this.type,
        status: 'active',
      });

      this.status = existingActiveOrder ? 'ready' : 'active';
    }

    next();
  } catch (error) {
    console.error('Error in pre-save middleware:', error);
    next(error);
  }
}

module.exports = handleSchemaStatusModify;
