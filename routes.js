'use strict';

const userController = require('./controllers/user.js');
const adminController = require('./controllers/admin.js');
const views = require('./views/controller.js');

module.exports.initRoutes = function (router) {
    router.route('/user/submit').post(userController.submitForm);
    router.route('/user/fetch').get(userController.fetchRegistration);
    router.route('/admin/fetch').get(adminController.fetchRegistration);
    router.get('/views', views.showMainPage);
};
