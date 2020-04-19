import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import {
  getOne_PRODUCT,
  update_PRODUCT
} from '../../../store/actions/accountant/referenceData/product';

import { getAll_UNITS } from '../../../store/actions/accountant/referenceData/unit';
import { getAll_GROUP_OF_PRODUCTS } from '../../../store/actions/accountant/referenceData/groupOf_Product';

import Spinner from '../../../shared/spinner/Spinner';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    marginTop: '7rem'
  },
  buttonBack: {
    position: 'fixed',
    top: '5rem',
    left: 0
  },
  displayNone: {
    display: 'none'
  },
  displayFlex: {
    display: 'flex',
    position: 'absolute',
    top: 22,
    left: 7
    // zIndex: 555
  },
  wrapSelect: {
    position: 'relative'
  },
  select: {
    height: 55
    // border: '1px solid red'
  }
}));

const Product_Edit = ({
  setNameOfPage,
  getOne_PRODUCT,
  update_PRODUCT,

  getAll_UNITS,
  getAll_GROUP_OF_PRODUCTS,

  state_unit: { arr_UNITS },
  state_groupOf_Product: { arr_GROUP_OF_PRODUCTS },

  state_product: { one_PRODUCT, loading }
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const buttonBackHandler = () => {
    history.push('/accountant/product');
  };

  const [pageForm, setPageForm] = useState({
    productName: '',
    unit: '',
    productGroup: '',
    amountInPackage: '',
    ratePerUnit: '',
    length: '',
    width: '',
    height: '',
    weight: ''
  });

  const [disabledForm, setDisabledForm] = useState(true);
  const {
    productName,
    unit,
    productGroup,
    amountInPackage,
    ratePerUnit,
    length,
    width,
    height,
    weight
  } = pageForm;

  useEffect(() => {
    setNameOfPage('Редактировать товар');
    getAll_UNITS();
    getAll_GROUP_OF_PRODUCTS();
    getOne_PRODUCT(id);
  }, [
    setNameOfPage,
    getAll_UNITS,
    getAll_GROUP_OF_PRODUCTS,
    getOne_PRODUCT,
    id
  ]);

  useLayoutEffect(() => {
    if (one_PRODUCT) {
      setPageForm({
        ...pageForm,
        productName: one_PRODUCT.productName,
        unit: one_PRODUCT.unit,
        productGroup: one_PRODUCT.productGroup,
        amountInPackage: one_PRODUCT.amountInPackage,
        ratePerUnit: one_PRODUCT.ratePerUnit,
        length: one_PRODUCT.length,
        width: one_PRODUCT.width,
        height: one_PRODUCT.height,
        weight: one_PRODUCT.weight
      });
    }
  }, [one_PRODUCT]);

  const onChangeHandler = e => {
    setPageForm({ ...pageForm, [e.target.name]: e.target.value });
    setDisabledForm(
      !(
        productName ||
        unit ||
        productGroup ||
        amountInPackage ||
        ratePerUnit ||
        length ||
        width ||
        height ||
        weight
      )
    );
  };

  const updateItemHandler = () => {
    update_PRODUCT(
      id,
      productName,
      unit,
      productGroup,
      amountInPackage,
      ratePerUnit,
      length,
      width,
      height,
      weight
    );
    history.push('/accountant/product');
  };

  return loading ? (
    <Spinner />
  ) : (
    <Grid container className={classes.root} spacing={1}>
      <Button
        onClick={buttonBackHandler}
        variant='contained'
        className={classes.buttonBack}
        color='primary'
      >
        назад
      </Button>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Название товара</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='productName'
            fullWidth
            placeholder='название товара'
            type='text'
            value={productName ? productName : ''}
            onChange={e => onChangeHandler(e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Единицы измерения</Typography>
        </Grid>
        <Grid item xs={7} container>
          {!arr_UNITS ? (
            <Spinner />
          ) : (
            <Grid item xs={12} className={classes.wrapSelect}>
              <InputLabel
                id='select-unit'
                className={unit ? classes.displayNone : classes.displayFlex}
              >
                Единицы измерения
              </InputLabel>
              <Select
                variant='outlined'
                labelId='select-unit'
                fullWidth
                value={unit ? unit : ''}
                name='unit'
                onChange={e => onChangeHandler(e)}
                className={classes.select}
              >
                {arr_UNITS.map(item => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.unitNameShort}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          )}
        </Grid>
        <Grid item xs={1} container alignItems='center' justify='center'>
          <IconButton
            onClick={() => {
              history.push('/accountant/unit/add');
            }}
          >
            <AddCircleIcon color='primary' />
          </IconButton>
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Группа товаров</Typography>
        </Grid>
        <Grid item xs={7} container>
          {!arr_GROUP_OF_PRODUCTS ? (
            <Spinner />
          ) : (
            <Grid item xs={12} className={classes.wrapSelect}>
              <InputLabel
                id='select-type-of-productGroup'
                className={
                  productGroup ? classes.displayNone : classes.displayFlex
                }
              >
                Группа товаров
              </InputLabel>
              <Select
                variant='outlined'
                labelId='select-type-of-productGroup'
                fullWidth
                value={productGroup ? productGroup : ''}
                name='productGroup'
                onChange={e => onChangeHandler(e)}
                className={classes.select}
              >
                {arr_GROUP_OF_PRODUCTS.map(item => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.productGroup}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          )}
        </Grid>

        <Grid item xs={1} container alignItems='center' justify='center'>
          <IconButton
            onClick={() => {
              history.push('/accountant/group-of-product/add');
            }}
          >
            <AddCircleIcon color='primary' />
          </IconButton>
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Количество в упаковке</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='amountInPackage'
            fullWidth
            placeholder='Количество в упаковке'
            type='number'
            value={amountInPackage ? amountInPackage : ''}
            onChange={e => onChangeHandler(e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Расход на ед</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='ratePerUnit'
            fullWidth
            placeholder='Расход на ед'
            type='number'
            value={ratePerUnit ? ratePerUnit : ''}
            onChange={e => onChangeHandler(e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Длина упаковки</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='length'
            fullWidth
            placeholder='Длина упаковки'
            type='number'
            value={length ? length : ''}
            onChange={e => onChangeHandler(e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Ширина упаковки</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='width'
            fullWidth
            placeholder='Длина упаковки'
            type='number'
            value={width ? width : ''}
            onChange={e => onChangeHandler(e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Высота упаковки</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='height'
            fullWidth
            placeholder='Высота упаковки'
            type='number'
            value={height ? height : ''}
            onChange={e => onChangeHandler(e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Вес упаковки</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='weight'
            fullWidth
            placeholder='Вес упаковки'
            type='number'
            value={weight ? weight : ''}
            onChange={e => onChangeHandler(e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Button
          type='button'
          fullWidth
          disabled={disabledForm}
          variant='contained'
          color='primary'
          className={classes.buttonAdd}
          onClick={() => updateItemHandler()}
        >
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );
};

Product_Edit.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getOne_PRODUCT: PropTypes.func.isRequired,
  update_PRODUCT: PropTypes.func.isRequired,

  getAll_UNITS: PropTypes.func.isRequired,
  getAll_GROUP_OF_PRODUCTS: PropTypes.func.isRequired,

  state_unit: PropTypes.object.isRequired,
  state_groupOf_Product: PropTypes.object.isRequired,

  state_product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  state_unit: state.unit,
  state_groupOf_Product: state.groupOf_Product,

  state_product: state.product
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getOne_PRODUCT,
  update_PRODUCT,
  getAll_UNITS,
  getAll_GROUP_OF_PRODUCTS
})(Product_Edit);
