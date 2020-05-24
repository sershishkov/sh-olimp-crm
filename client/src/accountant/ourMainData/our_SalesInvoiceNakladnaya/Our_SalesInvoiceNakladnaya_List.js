import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import MaterialTable from 'material-table';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import {
  getAll_OUR_SALES_INVOICE_NAKLADNAYAS,
  delete_OUR_SALES_INVOICE_NAKLADNAYA,
} from '../../../store/actions/accountant/ourMainData/our_SalesInvoiceNakladnaya';

import Spinner from '../../../shared/spinner/Spinner';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  btnAdd: {
    position: 'fixed',
    top: 50,
    left: 50,
    zIndex: 5,
  },
  btnAddIcon: {
    width: 50,
    height: 50,
  },
}));

const Our_SalesInvoiceNakladnaya_List = ({
  setNameOfPage,
  getAll_OUR_SALES_INVOICE_NAKLADNAYAS,
  delete_OUR_SALES_INVOICE_NAKLADNAYA,
  state_our_SalesInvoiceNakladnaya: {
    arr_OUR_SALES_INVOICE_NAKLADNAYAS,
    loading,
  },
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Список накладных');
    getAll_OUR_SALES_INVOICE_NAKLADNAYAS();
  }, [setNameOfPage, getAll_OUR_SALES_INVOICE_NAKLADNAYAS]);

  const deleteItem = (itemId) => {
    delete_OUR_SALES_INVOICE_NAKLADNAYA(itemId);
    window.location.reload();
  };

  const listOf_OUR_SALES_INVOICE_NAKLADNAYAS = (
    <MaterialTable
      title='Накладные'
      columns={[
        { title: 'Номер', field: 'naklNumber' },
        { title: 'Дата', field: 'naclDate' },
        { title: 'Наша фирма', field: 'ourFirm' },
        { title: 'Клиент', field: 'client' },
        { title: 'Сумма', field: 'sum' },
        { title: 'Удалить', field: 'btnDel', sorting: false },
        { title: 'редактировать', field: 'btnEdit', sorting: false },
      ]}
      data={arr_OUR_SALES_INVOICE_NAKLADNAYAS.map((item) => {
        return {
          naklNumber: item.naklNumber,
          naclDate: <Moment format='DD-MM-YYYY'>{item.naclDate}</Moment>,
          ourFirm: item.ourFirm.firmName,
          client: item.client.firmName,
          sum: item.sum,
          btnDel: (
            <IconButton
              color='secondary'
              variant='contained'
              onClick={() => deleteItem(item._id)}
              className={classes.buttonDelete}
            >
              <DeleteIcon />
            </IconButton>
          ),
          btnEdit: (
            <IconButton
              color='primary'
              variant='contained'
              href={`/accountant/our-service-invoice-nakl/${item._id}`}
              className={classes.buttonDelete}
            >
              <EditIcon />
            </IconButton>
          ),
        };
      })}
      options={{
        sorting: true,
        search: false,
        pageSize: 10,
      }}
    />
  );

  return loading ? (
    <Spinner />
  ) : (
    <Grid container className={classes.root}>
      <IconButton
        variant='contained'
        color='secondary'
        href={`/accountant/our-service-invoice-nakl/add`}
        className={classes.btnAdd}
      >
        <PlusOneIcon className={classes.btnAddIcon} />
      </IconButton>
      <Grid item xs={12}>
        {listOf_OUR_SALES_INVOICE_NAKLADNAYAS}
      </Grid>
    </Grid>
  );
};

Our_SalesInvoiceNakladnaya_List.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,

  getAll_OUR_SALES_INVOICE_NAKLADNAYAS: PropTypes.func.isRequired,
  delete_OUR_SALES_INVOICE_NAKLADNAYA: PropTypes.func.isRequired,

  state_our_SalesInvoiceNakladnaya: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  state_our_SalesInvoiceNakladnaya: state.our_SalesInvoiceNakladnaya,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAll_OUR_SALES_INVOICE_NAKLADNAYAS,
  delete_OUR_SALES_INVOICE_NAKLADNAYA,
})(Our_SalesInvoiceNakladnaya_List);
