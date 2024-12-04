// const express = require('express');
// const helmet = require('helmet');
// const xss = require('xss-clean');
// const mongoSanitize = require('express-mongo-sanitize');
// const compression = require('compression');
// const cors = require('cors');
// const passport = require('passport');
// const httpStatus = require('http-status');
// const config = require('./config/config');
// const morgan = require('./config/morgan');
// const { jwtStrategy, googleStrategy } = require('./config/passport');
// const { authLimiter } = require('./middlewares/rateLimiter');
// const routes = require('./routes/v1');
// const { errorConverter, errorHandler } = require('./middlewares/error');
// const ApiError = require('./utils/ApiError');



// const app = express();

// if (config.env !== 'test') {
//   app.use(morgan.successHandler);
//   app.use(morgan.errorHandler);
// }

// // set security HTTP headers
// app.use(helmet());

// // parse json request body
// app.use(express.json());

// // parse urlencoded request body
// app.use(express.urlencoded({ extended: true }));

// // sanitize request data
// app.use(xss());
// app.use(mongoSanitize());

// // gzip compression
// app.use(compression());

// // enable cors
// app.use(cors());
// app.options('*', cors());


// // jwt authentication
// app.use(passport.initialize());
// passport.use('jwt', jwtStrategy);

// // limit repeated failed requests to auth endpoints
// if (config.env === 'production') {
//   app.use('/v1/auth', authLimiter);
// }

// // v1 api routes
// app.use('/v1', routes);

// // send back a 404 error for any unknown api request
// app.use((req, res, next) => {
//   next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
// });

// // convert error to ApiError, if needed
// app.use(errorConverter);

// // handle error
// app.use(errorHandler);

// module.exports = app;



const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const httpStatus = require('http-status');
const config = require('./config/config');
const morgan = require('./config/morgan');
const { jwtStrategy, googleStrategy } = require('./config/passport');
const { authLimiter } = require('./middlewares/rateLimiter');
const routes = require('./routes/v1');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');

const app = express();

// Logging setup
if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// Set security HTTP headers
app.use(helmet());

// Parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sanitize request data
app.use(xss());
app.use(mongoSanitize());

// Enable gzip compression
app.use(compression());

// CORS setup: Allow specific origins
const corsOptions = {
  origin: ['http://172.50.101.109:3000', 'http://localhost:3000'], // Add more as needed
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
};
app.use(cors({ origin: true, }));
// app.options('*', cors(corsOptions)); // Pre-flight for all routes

// JWT authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

app.get('/v1', (req, res) => {
  res.send('Hello World');
});
// Limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/v1/auth', authLimiter);
}

// Add request logger
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});

// v1 API routes
app.use('/v1', routes);

// Handle 404 errors for unknown routes
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// Convert and handle errors
app.use(errorConverter);
app.use(errorHandler);

module.exports = app;
