const mongoose = require('mongoose');

module.exports = function () {
  mongoose.connect('mongodb+srv://cadenmilne04:'+
      process.env.MONGODB_PASSWORD +
      '@cluster0.ro1tpr1.mongodb.net/triviaTokDB', {
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
};

