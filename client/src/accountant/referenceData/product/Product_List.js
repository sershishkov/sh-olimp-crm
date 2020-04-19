import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import {
  getAll_PRODUCTS,
  delete_PRODUCT
} from '../../../store/actions/accountant/referenceData/product';

import Spinner from '../../../shared/spinner/Spinner';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  btnAdd: {
    position: 'fixed',
    top: 50,
    left: 50,
    zIndex: 5
  },
  btnAddIcon: {
    width: 50,
    height: 50
  }
}));

const Product_List = ({
  setNameOfPage,
  getAll_PRODUCTS,
  delete_PRODUCT,
  product: { arr_PRODUCTS, loading }
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Список товаров');
    getAll_PRODUCTS();
  }, [setNameOfPage, getAll_PRODUCTS]);

  const deleteItem = itemId => {
    delete_PRODUCT(itemId);
    window.location.reload();
  };

  const listOf_PRODUCTS = (
    <MaterialTable
      title='Список '
      columns={[
        { title: 'Название товара', field: 'field_productName' },
        { title: 'ед.изм', field: 'field_unit' },
        { title: 'Группа товара', field: 'field_productGroup' },
        { title: 'Удалить', field: 'btnDel', sorting: false },
        { title: 'редактировать', field: 'btnEdit', sorting: false }
      ]}
      data={arr_PRODUCTS.map(item => {
        return {
          field_productName: item.productName,
          field_unit: item.unit.unitNameShort,
          field_productGroup: item.productGroup.productGroup,
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
              href={`/accountant/product/${item._id}`}
              className={classes.buttonDelete}
            >
              <EditIcon />
            </IconButton>
          )
        };
      })}
      options={{
        sorting: true,
        search: false
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
        href={`/accountant/product/add`}
        className={classes.btnAdd}
      >
        <PlusOneIcon className={classes.btnAddIcon} />
      </IconButton>
      <Grid item xs={12}>
        {listOf_PRODUCTS}
      </Grid>
    </Grid>
  );
};

Product_List.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAll_PRODUCTS: PropTypes.func.isRequired,
  delete_PRODUCT: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAll_PRODUCTS,
  delete_PRODUCT
})(Product_List);
