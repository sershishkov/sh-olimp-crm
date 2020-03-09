const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');

const colors = require('colors');
// const fileUpload = require('express-fileupload');
const errorHandler = require('./middleware/error');

const connectDB = require('./config/db');

// load env vars
dotenv.config({ path: './config/config.env' });

//connect to database
connectDB();

const app = express();

//Body parser
app.use(express.json());

//Cookie parser
app.use(cookieParser());

//Sanitize data
app.use(mongoSanitize());

//Set security headers
app.use(helmet());

//Prevent XSS attakes
app.use(xss());

//Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, //10 min
  max: 1000
});
app.use(limiter);

//Prevent http param pollution
app.use(hpp());

//Enable CORS
app.use(cors());

//Route file
const auth = require('./routes/auth');
const users = require('./routes/users');

const photoWorks = require('./routes//photoWorks');
const groupOfImage = require('./routes/groupOfImage');

//////   ACCOUNTANT     /////////
//   REFERENCE DATA //
const bankName = require('./routes/accountant/referenceData/bankName');
const firstPersonPosition = require('./routes/accountant/referenceData/firstPersonPosition');
const groupOf_Product = require('./routes/accountant/referenceData/groupOf_Product');
const groupOf_ServiceJob = require('./routes/accountant/referenceData/groupOf_ServiceJob');
const phoneOperator = require('./routes/accountant/referenceData/phoneOperator');
const typeOf_ActsOnBasisOf = require('./routes/accountant/referenceData/typeOf_ActsOnBasisOf');
const typeOf_Firm = require('./routes/accountant/referenceData/typeOf_Firm');
const typeOf_Settlement = require('./routes/accountant/referenceData/typeOf_Settlement');
const typeOf_Street = require('./routes/accountant/referenceData/typeOf_Street');
const typeOf_TaxPayerOn = require('./routes/accountant/referenceData/typeOf_TaxPayerOn');
const typeOf_Unit = require('./routes/accountant/referenceData/typeOf_Unit');
const unit = require('./routes/accountant/referenceData/unit');

//   MAIN DATA      //

//Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//File uploading
// app.use(fileUpload());

//Set static folder
// app.use(express.static(path.join(__dirname, 'uploads')));
// app.use('/uploads', express.static(path.join('uploads')));
app.use('/uploads', express.static('uploads'));

//Mount routes

app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);

app.use('/api/v1/photo', photoWorks);
app.use('/api/v1/imagegroup', groupOfImage);

//////   ACCOUNTANT     /////////
//   REFERENCE DATA //
app.use('/api/v1/accountant/bankname', bankName);
app.use('/api/v1/accountant/personposition', firstPersonPosition);
app.use('/api/v1/accountant/group-of-product', groupOf_Product);
app.use('/api/v1/accountant/group-of-servicejob', groupOf_ServiceJob);
app.use('/api/v1/accountant/phone-operator', phoneOperator);
app.use('/api/v1/accountant/type-of-acts-on-basis-of', typeOf_ActsOnBasisOf);
app.use('/api/v1/accountant/type-of-firm', typeOf_Firm);
app.use('/api/v1/accountant/type-of-settlement', typeOf_Settlement);
app.use('/api/v1/accountant/type-of-street', typeOf_Street);
app.use('/api/v1/accountant/type-of-tax-payer-on', typeOf_TaxPayerOn);
app.use('/api/v1/accountant/type-of-unit', typeOf_Unit);
app.use('/api/v1/accountant/unit', unit);

//   MAIN DATA      //

app.use(errorHandler);

// serve static assets in production
if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV}  on port ${PORT}!`.yellow.bold
  );
});

// Handle unhandled promise rejection
process.on('unhandledRejection', (err, promice) => {
  console.log(`Error:${err.message}`.red);
  //Close server & exit process
  server.close(() => process.exit(1));
});
