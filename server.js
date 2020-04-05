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
  max: 10000,
});
app.use(limiter);

//Prevent http param pollution
app.use(hpp());

//Enable CORS
app.use(cors());

//Route file
////////User////////
const auth = require('./routes/user/auth/auth');
const users = require('./routes/user/admin/users');

//////////Main Information//////////

const photoWorks = require('./routes/mainInformation/osbb/photoWorks');
const groupOfImage = require('./routes/mainInformation/osbb/groupOfImage');
const individual_photoWorks = require('./routes/mainInformation/individuals/individual_photoWorks');
const individual_groupOfImage = require('./routes/mainInformation/individuals/individual_groupOfImage');

/////////////////free//////////////////////////
const requestFromClient = require('./routes/mainInformation/free/requestFromClient');

//////   ACCOUNTANT     /////////
//   REFERENCE DATA //
const bankName = require('./routes/accountant/referenceData/bankName');
const firstPersonPosition = require('./routes/accountant/referenceData/firstPersonPosition');
const groupOf_Product = require('./routes/accountant/referenceData/groupOf_Product');
const groupOf_ServiceJob = require('./routes/accountant/referenceData/groupOf_ServiceJob');
const typeOf_ActsOnBasisOf = require('./routes/accountant/referenceData/typeOf_ActsOnBasisOf');
const typeOf_Firm = require('./routes/accountant/referenceData/typeOf_Firm');
const typeOf_Settlement = require('./routes/accountant/referenceData/typeOf_Settlement');
const typeOf_Street = require('./routes/accountant/referenceData/typeOf_Street');
const typeOf_TaxPayerOn = require('./routes/accountant/referenceData/typeOf_TaxPayerOn');
const typeOf_Unit = require('./routes/accountant/referenceData/typeOf_Unit');
const unit = require('./routes/accountant/referenceData/unit');
const client = require('./routes/accountant/referenceData/client');
const worker = require('./routes/accountant/referenceData/worker');
const supplier = require('./routes/accountant/referenceData/supplier');
const ourFirm = require('./routes/accountant/referenceData/ourFirm');
const product = require('./routes/accountant/referenceData/product');
const serviceJob = require('./routes/accountant/referenceData/serviceJob');
const city = require('./routes/accountant/referenceData/city');
const street = require('./routes/accountant/referenceData/street');
const oblast = require('./routes/accountant/referenceData/oblast');
const rayon = require('./routes/accountant/referenceData/rayon');
const typeOf_Expense = require('./routes/accountant/referenceData/typeOf_Expense');

// OUR  MAIN DATA      //
const our_SalesInvoiceNakladnaya = require('./routes/accountant/ourMainData/our_SalesInvoiceNakladnaya');
const our_Payments = require('./routes/accountant/ourMainData/our_Payments');
const our_InvoiceServiceJob = require('./routes/accountant/ourMainData/our_InvoiceServiceJob');
const our_InvoiceProduct = require('./routes/accountant/ourMainData/our_InvoiceProduct');
const our_InvoiceMixed = require('./routes/accountant/ourMainData/our_InvoiceMixed');
const our_CertificateOf_Completion = require('./routes/accountant/ourMainData/our_CertificateOf_Completion');
const our_BankIncome = require('./routes/accountant/ourMainData/our_BankIncome');
const our_WorkersSalary = require('./routes/accountant/ourMainData/our_WorkersSalary');
const our_CurrentExpense = require('./routes/accountant/ourMainData/our_CurrentExpense');

// ENTERTED  MAIN DATA      //
const entered_SalesInvoiceNakladnaya = require('./routes/accountant/enteredMainData/entered_SalesInvoiceNakladnaya');
const entered_InvoiceServiceJob = require('./routes/accountant/enteredMainData/entered_InvoiceServiceJob');
const entered_InvoiceProduct = require('./routes/accountant/enteredMainData/entered_InvoiceProduct');
const entered_InvoiceMixed = require('./routes/accountant/enteredMainData/entered_InvoiceMixed');
const entered_CertificateOf_Completion = require('./routes/accountant/enteredMainData/entered_CertificateOf_Completion');

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
///////User/////
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);

//////////Main Information//////////
app.use('/api/v1/photo', photoWorks);
app.use('/api/v1/imagegroup', groupOfImage);
app.use('/api/v1/individual-photo', individual_photoWorks);
app.use('/api/v1/individual-imagegroup', individual_groupOfImage);

/////////////////free//////////////////////////
app.use('/api/v1/request-from-client', requestFromClient);

//////   ACCOUNTANT     /////////
//   REFERENCE DATA //
app.use('/api/v1/accountant/bankname', bankName);
app.use('/api/v1/accountant/personposition', firstPersonPosition);
app.use('/api/v1/accountant/group-of-product', groupOf_Product);
app.use('/api/v1/accountant/group-of-servicejob', groupOf_ServiceJob);
app.use('/api/v1/accountant/type-of-acts-on-basis-of', typeOf_ActsOnBasisOf);
app.use('/api/v1/accountant/type-of-firm', typeOf_Firm);
app.use('/api/v1/accountant/type-of-settlement', typeOf_Settlement);
app.use('/api/v1/accountant/type-of-street', typeOf_Street);
app.use('/api/v1/accountant/type-of-tax-payer-on', typeOf_TaxPayerOn);
app.use('/api/v1/accountant/type-of-unit', typeOf_Unit);
app.use('/api/v1/accountant/unit', unit);
app.use('/api/v1/accountant/client', client);
app.use('/api/v1/accountant/worker', worker);
app.use('/api/v1/accountant/supplier', supplier);
app.use('/api/v1/accountant/our-firm', ourFirm);
app.use('/api/v1/accountant/product', product);
app.use('/api/v1/accountant/service-job', serviceJob);
app.use('/api/v1/accountant/city', city);
app.use('/api/v1/accountant/street', street);
app.use('/api/v1/accountant/oblast', oblast);
app.use('/api/v1/accountant/rayon', rayon);
app.use('/api/v1/accountant/type-of-expense', typeOf_Expense);

// OUR  MAIN DATA      //
app.use(
  '/api/v1/accountant/our-service-invoice-nakl',
  our_SalesInvoiceNakladnaya
);
app.use('/api/v1/accountant/our-payments', our_Payments);
app.use('/api/v1/accountant/our-invoice-service-job', our_InvoiceServiceJob);
app.use('/api/v1/accountant/our-invoice-product', our_InvoiceProduct);
app.use('/api/v1/accountant/our-invoice-mixed', our_InvoiceMixed);
app.use(
  '/api/v1/accountant/our-certificate-of-completion',
  our_CertificateOf_Completion
);

app.use('/api/v1/accountant/our-bank-income', our_BankIncome);
app.use('/api/v1/accountant/our-workers-salary', our_WorkersSalary);
app.use('/api/v1/accountant/our-current-expense', our_CurrentExpense);

// ENTERTED  MAIN DATA      //
app.use(
  '/api/v1/accountant/entered-service-invoice-nakl',
  entered_SalesInvoiceNakladnaya
);
app.use(
  '/api/v1/accountant/entered-invoice-service-job',
  entered_InvoiceServiceJob
);
app.use('/api/v1/accountant/entered-invoice-product', entered_InvoiceProduct);
app.use('/api/v1/accountant/entered-invoice-mixed', entered_InvoiceMixed);
app.use(
  '/api/v1/accountant/entered-certificate-of-completion',
  entered_CertificateOf_Completion
);

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
