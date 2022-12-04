const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
// const {database}  = require('./helpers/connector/dbConnector');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const chemist = require('./routes/chemist');
const patient = require('./routes/patient');
const doctor = require('./routes/doctor');
const consultation = require('./routes/consultation')
const medicine = require('./routes/medicine')
const consultationItem = require('./routes/consultationitem');
// const doctors = require('./routes/doctor');

const app = express();
app.use(cors());
// app.use(app.router);
// routes.initialize(app);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/doctor', doctor);
// app.use('/api/doctor/all', doctor);
app.use('/api/user/:userId', usersRouter);
app.use('/api/consultationItem', consultationItem); 
app.use('/api/chemist', chemist);
app.use('/api/patient', patient );
app.use('/api/medicine', medicine);
// app.use('/api/transaction/:transId', doctors);
app.use('/api/consultationItem', consultationItem); 
app.use('/api/consultation', consultation);
// app.use('/api/delItem/:delItemId', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
