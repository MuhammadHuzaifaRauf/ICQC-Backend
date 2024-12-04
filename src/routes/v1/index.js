const express = require('express');

const authRoutes = require('./authRoute');
const recordingRoutes = require('./recordings.route');

const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/authenticate',
    route: authRoutes,
  },
  {
    path: '/userRecordings',
    route: recordingRoutes,
  },
];



defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});


module.exports = router;
