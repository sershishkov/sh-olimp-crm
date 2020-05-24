import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import {
  getAll_GROUP_OF_PRODUCTS,
  delete_GROUP_OF_PRODUCT,
} from '../../../store/actions/accountant/referenceData/groupOf_Product';

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

const GroupOf_Product_List = ({
  setNameOfPage,
  getAll_GROUP_OF_PRODUCTS,
  delete_GROUP_OF_PRODUCT,
  groupOf_Product: { arr_GROUP_OF_PRODUCTS, loading },
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Список групп товаров');
    getAll_GROUP_OF_PRODUCTS();
  }, [setNameOfPage, getAll_GROUP_OF_PRODUCTS]);

  const deleteItem = (itemId) => {
    delete_GROUP_OF_PRODUCT(itemId);
    window.location.reload();
  };

  const listOf_GROUP_OF_PRODUCTS = (
    <MaterialTable
      title='Список '
      columns={[
        { title: 'Группа товаров', field: 'field_productGroup' },
        { title: 'Удалить', field: 'btnDel', sorting: false },
        { title: 'редактировать', field: 'btnEdit', sorting: false },
      ]}
      data={arr_GROUP_OF_PRODUCTS.map((item) => {
        return {
          field_productGroup: item.productGroup,
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
              href={`/accountant/group-of-product/${item._id}`}
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
        href={`/accountant/group-of-product/add`}
        className={classes.btnAdd}
      >
        <PlusOneIcon className={classes.btnAddIcon} />
      </IconButton>
      <Grid item xs={12}>
        {listOf_GROUP_OF_PRODUCTS}
      </Grid>
    </Grid>
  );
};

GroupOf_Product_List.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAll_GROUP_OF_PRODUCTS: PropTypes.func.isRequired,
  delete_GROUP_OF_PRODUCT: PropTypes.func.isRequired,
  groupOf_Product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  groupOf_Product: state.groupOf_Product,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAll_GROUP_OF_PRODUCTS,
  delete_GROUP_OF_PRODUCT,
})(GroupOf_Product_List);
