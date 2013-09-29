var Serializer = require('../orm_model_serializer.js');

module.exports = new Serializer({
  default: {
    id: Number,
    accepted: Boolean,
    requester: Serializer.hasOne(),
    requestee: Serializer.hasOne()
  }
});
