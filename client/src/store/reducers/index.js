import { combineReducers } from 'redux';

import alert from './alert';
import nameOfPage from './nameOfPage';

import auth from './user/auth/auth';
import photoWorks from './mainInformation/osbb/photoWorks';
import groupOfImage from './mainInformation/osbb/groupOfImage';
import users from './user/admin/users';
import clientRequests from './mainInformation/free/clientRequests';

import entered_CertificateOf_Completion from './accountant/enteredMainData/entered_CertificateOf_Completion';
import entered_InvoiceMixed from './accountant/enteredMainData/entered_InvoiceMixed';
import entered_InvoiceProduct from './accountant/enteredMainData/entered_InvoiceProduct';
import entered_InvoiceServiceJob from './accountant/enteredMainData/entered_InvoiceServiceJob';
import entered_SalesInvoiceNakladnaya from './accountant/enteredMainData/entered_SalesInvoiceNakladnaya';

import our_BankIncome from './accountant/ourMainData/our_BankIncome';
import our_CertificateOf_Completion from './accountant/ourMainData/our_CertificateOf_Completion';
import our_InvoiceMixed from './accountant/ourMainData/our_InvoiceMixed';
import our_InvoiceProduct from './accountant/ourMainData/our_InvoiceProduct';
import our_InvoiceServiceJob from './accountant/ourMainData/our_InvoiceServiceJob';
import our_Payments from './accountant/ourMainData/our_Payments';
import our_SalesInvoiceNakladnaya from './accountant/ourMainData/our_SalesInvoiceNakladnaya';
import our_CurrentExpense from './accountant/ourMainData/our_CurrentExpense';
import our_WorkersSalary from './accountant/ourMainData/our_WorkersSalary';

import bankName from './accountant/referenceData/bankName';
import client from './accountant/referenceData/client';
import firstPersonPosition from './accountant/referenceData/firstPersonPosition';
import groupOf_Product from './accountant/referenceData/groupOf_Product';
import groupOf_ServiceJob from './accountant/referenceData/groupOf_ServiceJob';
import ourFirm from './accountant/referenceData/ourFirm';
import product from './accountant/referenceData/product';
import serviceJob from './accountant/referenceData/serviceJob';
import supplier from './accountant/referenceData/supplier';
import typeOf_ActsOnBasisOf from './accountant/referenceData/typeOf_ActsOnBasisOf';
import typeOf_Firm from './accountant/referenceData/typeOf_Firm';
import typeOf_Settlement from './accountant/referenceData/typeOf_Settlement';
import typeOf_Street from './accountant/referenceData/typeOf_Street';
import typeOf_TaxPayerOn from './accountant/referenceData/typeOf_TaxPayerOn';
import typeOf_Unit from './accountant/referenceData/typeOf_Unit';
import unit from './accountant/referenceData/unit';
import worker from './accountant/referenceData/worker';
import city from './accountant/referenceData/city';
import street from './accountant/referenceData/street';
import oblast from './accountant/referenceData/oblast';
import rayon from './accountant/referenceData/rayon';
import typeOf_Expense from './accountant/referenceData/typeOf_Expense';

export default combineReducers({
  alert,
  auth,
  nameOfPage,
  photoWorks,
  groupOfImage,
  users,
  clientRequests,

  entered_CertificateOf_Completion,
  entered_InvoiceMixed,
  entered_InvoiceProduct,
  entered_InvoiceServiceJob,
  entered_SalesInvoiceNakladnaya,

  our_BankIncome,
  our_CertificateOf_Completion,
  our_InvoiceMixed,
  our_InvoiceProduct,
  our_InvoiceServiceJob,
  our_Payments,
  our_SalesInvoiceNakladnaya,
  our_CurrentExpense,
  our_WorkersSalary,

  bankName,
  client,
  firstPersonPosition,
  groupOf_Product,
  groupOf_ServiceJob,
  ourFirm,
  product,
  serviceJob,
  supplier,
  typeOf_ActsOnBasisOf,
  typeOf_Firm,
  typeOf_Settlement,
  typeOf_Street,
  typeOf_TaxPayerOn,
  typeOf_Unit,
  unit,
  worker,
  city,
  street,
  oblast,
  rayon,
  typeOf_Expense
});
