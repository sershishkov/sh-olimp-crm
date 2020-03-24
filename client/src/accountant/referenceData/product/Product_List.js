import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import {
  getAll_PRODUCTS,
  delete_PRODUCT
} from '../../../store/actions/accountant/referenceData/product';

import Spinner from '../../../shared/spinner/Spinner';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
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
    <List className={classes.list}>
      {loading ? (
        <Spinner />
      ) : (
        arr_PRODUCTS.map(item => (
          <ListItem key={item._id} className={classes.listItem}>
            <Grid container className={classes.root}>
              <Grid item xs={4}>
                <Typography align='center'>{item.productName}</Typography>
              </Grid>

              <Grid item xs={2}>
                <Typography align='center'>
                  {item.unit.unitNameShort}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography align='center'>
                  {item.productGroup.productGroup}
                </Typography>
              </Grid>

              <Grid item xs={1}>
                <IconButton
                  color='secondary'
                  variant='contained'
                  onClick={() => deleteItem(item._id)}
                  className={classes.buttonDelete}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>

              <Grid item xs={1}>
                <IconButton
                  color='primary'
                  variant='contained'
                  href={`/accountant/product/${item._id}`}
                  className={classes.buttonDelete}
                >
                  <EditIcon />
                </IconButton>
              </Grid>
            </Grid>
          </ListItem>
        ))
      )}
    </List>
  );

  return (
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
