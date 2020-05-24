import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import {
  getAll_SUPPLIERS,
  delete_SUPPLIER,
} from '../../../store/actions/accountant/referenceData/supplier';

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
  rowItem: {
    // border: '1px solid red',
    justifyItems: 'center',
    alignItems: 'center',
  },
  rowItemDate: {
    fontSize: '0.85rem',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

const Supplier_List = ({
  setNameOfPage,
  getAll_SUPPLIERS,
  delete_SUPPLIER,
  supplier: { arr_SUPPLIERS, loading },
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Список поставщиков');
    getAll_SUPPLIERS();
  }, [setNameOfPage, getAll_SUPPLIERS]);

  const deleteItem = (itemId) => {
    delete_SUPPLIER(itemId);
    window.location.reload();
  };

  const listOf_SUPPLIERS = (
    <MaterialTable
      title='Список поставщиков'
      columns={[
        { title: 'Форма собств', field: 'field_TypeOf_FirmShort' },
        { title: 'Наименование', field: 'field_supplierName' },
        { title: 'Должность', field: 'field_firstPersonPosition' },
        { title: 'Фамилия', field: 'field_shortName' },
        { title: 'Удалить', field: 'btnDel', sorting: false },
        { title: 'редактировать', field: 'btnEdit', sorting: false },
      ]}
      data={arr_SUPPLIERS.map((item) => {
        return {
          field_TypeOf_FirmShort: item.typeOfFirm.TypeOf_FirmShort,
          field_supplierName: item.supplierName,
          field_firstPersonPosition: item.firstPersonPosition.position,
          field_shortName: item.shortName,
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
              href={`/accountant/supplier/${item._id}`}
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
        href={`/accountant/supplier/add`}
        className={classes.btnAdd}
      >
        <PlusOneIcon className={classes.btnAddIcon} />
      </IconButton>
      <Grid item xs={12}>
        {listOf_SUPPLIERS}
      </Grid>
    </Grid>
  );
};

Supplier_List.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAll_SUPPLIERS: PropTypes.func.isRequired,
  delete_SUPPLIER: PropTypes.func.isRequired,
  supplier: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  supplier: state.supplier,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAll_SUPPLIERS,
  delete_SUPPLIER,
})(Supplier_List);
