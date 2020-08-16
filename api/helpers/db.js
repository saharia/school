const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017', { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
console.log('mongo db started');
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../models/user.model'),
    Mark: require('../models/mark.model'),
    Role: require('../models/role.model'),
    Department: require('../models/department.model'),
    Subject: require('../models/subject.model')
};