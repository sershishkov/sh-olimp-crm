import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Unit_Add from '../unit/Unit_Add';
import GroupOf_Product_Add from '../groupOf_Product/GroupOf_Product_Add';

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
import Modal from '@material-ui/core/Modal';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import { add_PRODUCT } from '../../../store/actions/accountant/referenceData/product';

import { getAll_UNITS } from '../../../store/actions/accountant/referenceData/unit';
import { getAll_GROUP_OF_PRODUCTS } from '../../../store/actions/accountant/referenceData/groupOf_Product';

import Spinner from '../../../shared/spinner/Spinner';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop: '7rem',
    backgroundColor: 'white',
  },
  // buttonBack: {
  //   position: 'fixed',
  //   top: '5rem',
  //   left: 0
  // },
  displayNone: {
    display: 'none',
  },
  displayFlex: {
    display: 'flex',
    position: 'absolute',
    top: 22,
    left: 7,
    // zIndex: 555
  },
  wrapSelect: {
    position: 'relative',
  },
  select: {
    height: 55,
    // border: '1px solid red'
  },
}));

const Product_Add = ({
  setNameOfPage,
  add_PRODUCT,

  getAll_UNITS,
  getAll_GROUP_OF_PRODUCTS,

  state_unit: { arr_UNITS },
  state_groupOf_Product: { arr_GROUP_OF_PRODUCTS },
}) => {
  const classes = useStyles();
  const history = useHistory();

  // const buttonBackHandler = () => {
  //   history.goBack();
  //   // history.push('/accountant/product');
  // };

  const [pageForm, setPageForm] = useState({
    productName: '',
    unit: '',
    productGroup: '',
    amountInPackage: '',
    ratePerUnit: '',
    length: '',
    width: '',
    height: '',
    weight: '',
  });

  const [disabledForm, setDisabledForm] = useState(true);

  const [openUnit_Add, setOpenUnit_Add] = useState(false);
  const [openGroupOf_Product_Add, setOpenGroupOf_Product_Add] = useState(false);

  const {
    productName,
    unit,
    productGroup,
    amountInPackage,
    ratePerUnit,
    length,
    width,
    height,
    weight,
  } = pageForm;

  useEffect(() => {
    setNameOfPage('Создать товар');
    getAll_UNITS();
    getAll_GROUP_OF_PRODUCTS();
  }, [setNameOfPage, getAll_UNITS, getAll_GROUP_OF_PRODUCTS]);

  const onChangeHandler = (e) => {
    setPageForm({ ...pageForm, [e.target.name]: e.target.value });
    setDisabledForm(
      !(
        productName &&
        unit &&
        productGroup &&
        amountInPackage &&
        ratePerUnit &&
        length &&
        width &&
        height &&
        weight
      )
    );
  };

  const addItemHandler = () => {
    add_PRODUCT(
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
    // history.goBack();
  };

  const handleOpen_Unit_Add = () => {
    setOpenUnit_Add(true);
  };
  const handleOpen_GroupOf_Product_Add = () => {
    setOpenGroupOf_Product_Add(true);
  };

  const handleClose_Unit_Add = () => {
    setOpenUnit_Add(false);
  };
  const handleClose_GroupOf_Product_Add = () => {
    setOpenGroupOf_Product_Add(false);
  };

  return (
    <Grid container className={classes.root} spacing={1}>
      <Modal open={openUnit_Add} onClose={handleClose_Unit_Add}>
        <Unit_Add />
      </Modal>
      <Modal
        open={openGroupOf_Product_Add}
        onClose={handleClose_GroupOf_Product_Add}
      >
        <GroupOf_Product_Add />
      </Modal>

      {/* <Button
        onClick={buttonBackHandler}
        variant='contained'
        className={classes.buttonBack}
        color='primary'
      >
        назад
      </Button> */}

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Название товара</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='productName'
            fullWidth
            autoFocus
            placeholder='название товара'
            type='text'
            value={productName}
            onChange={(e) => onChangeHandler(e)}
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
                value={unit}
                name='unit'
                onChange={(e) => onChangeHandler(e)}
                className={classes.select}
              >
                {arr_UNITS.map((item) => (
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
              handleOpen_Unit_Add();
              // history.push('/accountant/unit/add');
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
                value={productGroup}
                name='productGroup'
                onChange={(e) => onChangeHandler(e)}
                className={classes.select}
              >
                {arr_GROUP_OF_PRODUCTS.map((item) => (
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
              handleOpen_GroupOf_Product_Add();
              // history.push('/accountant/group-of-product/add');
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
            value={amountInPackage}
            onChange={(e) => onChangeHandler(e)}
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
            value={ratePerUnit}
            onChange={(e) => onChangeHandler(e)}
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
            value={length}
            onChange={(e) => onChangeHandler(e)}
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
            value={width}
            onChange={(e) => onChangeHandler(e)}
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
            value={height}
            onChange={(e) => onChangeHandler(e)}
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
            value={weight}
            onChange={(e) => onChangeHandler(e)}
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
          onClick={() => addItemHandler()}
        >
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );
};

Product_Add.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  add_PRODUCT: PropTypes.func.isRequired,

  getAll_UNITS: PropTypes.func.isRequired,
  getAll_GROUP_OF_PRODUCTS: PropTypes.func.isRequired,
  getAll_SUPPLIERS: PropTypes.func.isRequired,

  state_unit: PropTypes.object.isRequired,
  state_groupOf_Product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  state_unit: state.unit,
  state_groupOf_Product: state.groupOf_Product,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  add_PRODUCT,
  getAll_UNITS,
  getAll_GROUP_OF_PRODUCTS,
})(Product_Add);
