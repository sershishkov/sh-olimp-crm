import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuid from 'uuid';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';

import Spinner from '../../../shared/spinner/Spinner';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import { add_OUR_SALES_INVOICE_NAKLADNAYA } from '../../../store/actions/accountant/ourMainData/our_SalesInvoiceNakladnaya';

import { getAll_OUR_FIRMS } from '../../../store/actions/accountant/referenceData/ourFirm';
import { getAll_CLIENTS } from '../../../store/actions/accountant/referenceData/client';
import { getAll_PRODUCTS } from '../../../store/actions/accountant/referenceData/product';
import { getAll_UNITS } from '../../../store/actions/accountant/referenceData/unit';

// import Spinner from '../../../shared/spinner/Spinner';

const useStyles = makeStyles(theme => ({
  root: {
    // display: 'flex',
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
  },
  formControlLabel: {
    // border: '1px solid red',
    height: 22,
    fontSize: '0.4rem',
    marginLeft: 5
  }
}));

const Our_SalesInvoiceNakladnaya_Add = ({
  setNameOfPage,
  add_OUR_SALES_INVOICE_NAKLADNAYA,

  getAll_OUR_FIRMS,
  getAll_CLIENTS,
  getAll_PRODUCTS,
  getAll_UNITS,

  state_client: { arr_CLIENTS },
  state_ourFirm: { arr_OUR_FIRMS },
  state_product: { arr_PRODUCTS },
  state_unit: { arr_UNITS }
}) => {
  const classes = useStyles();
  const history = useHistory();

  const buttonBackHandler = () => {
    history.push('/accountant/our-service-invoice-nakl');
  };

  const [formData, setFormData] = useState({
    naklNumber: '',
    naclDate: '',
    ourFirm: '',
    client: '',
    products: []
  });

  const [checkedData, setCheckedData] = useState({
    active: true,
    cashPayment: false
  });

  // const [dataForTable, setDataForTable] = useState([]);
  const [totalPriceForTable, setTotalPriceForTable] = useState(0);

  const [selectedData, setSelectedData] = useState({
    thisProductName: '',
    thisProductName_Name: '',
    thisProductUnit: '',
    thisProductUnit_Name: '',
    thisProductAmount: '',
    thisProductPrice: '',
    thisSum: 0
  });

  const [disabledForm, setDisabledForm] = useState(true);

  const { naklNumber, naclDate, ourFirm, client, products } = formData;
  const { active, cashPayment } = checkedData;
  const {
    thisProductName,
    thisProductName_Name,
    thisProductUnit,
    thisProductUnit_Name,
    thisProductAmount,
    thisProductPrice,
    thisSum
  } = selectedData;

  useEffect(() => {
    setNameOfPage('Добавить накладную');
    getAll_OUR_FIRMS();
    getAll_CLIENTS();
    getAll_PRODUCTS();
    getAll_UNITS();

    const newDate = new Date();
    const fullYear = newDate.getFullYear();
    const month =
      newDate.getMonth() < 10
        ? `0${newDate.getMonth() + 1}`
        : newDate.getMonth() + 1;
    const day =
      newDate.getDate() < 10 ? `0${newDate.getDate()}` : newDate.getDate();
    const hours =
      newDate.getHours() < 10 ? `0${newDate.getHours()}` : newDate.getHours();
    const minutes =
      newDate.getMinutes() < 10
        ? `0${newDate.getMinutes()}`
        : newDate.getMinutes();

    const thisNaklNumber = `ВН-${fullYear -
      2000}.${month}.${day}.${hours}.${minutes}`;

    const thisNaclDate = `${fullYear}-${month}-${day}`;

    setFormData({
      ...formData,
      naklNumber: thisNaklNumber,
      naclDate: thisNaclDate
    });
  }, [
    setNameOfPage,
    setFormData,
    getAll_PRODUCTS,
    getAll_OUR_FIRMS,
    getAll_CLIENTS,
    getAll_UNITS
  ]);

  const onChangeHandler = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setDisabledForm(!(ourFirm && client && products));
  };

  const onCheckHandler = e => {
    setCheckedData({ ...checkedData, [e.target.name]: e.target.checked });
  };

  const onChangeProductHandler = e => {
    if (e.target.name === 'thisProductName') {
      const selectedProduct = arr_PRODUCTS.find(item => {
        return item._id === e.target.value;
      });

      setSelectedData({
        ...selectedData,
        thisProductName: e.target.value,
        thisProductUnit: selectedProduct.unit._id,
        thisProductUnit_Name: selectedProduct.unit.unitNameShort,
        thisProductName_Name: selectedProduct.productName
      });
    } else {
      setSelectedData({
        ...selectedData,
        [e.target.name]: e.target.value
      });
    }
  };

  const addProductHandler = () => {
    const thisId = uuid.v4();

    const newRow = {
      thisId,
      thisProductName,
      thisProductName_Name,
      thisProductUnit_Name,
      thisProductAmount,
      thisProductPrice,
      thisSum
    };

    setFormData({
      ...formData,
      products: [...products, newRow]
    });

    setTotalPriceForTable(totalPriceForTable + thisSum);

    setSelectedData({
      ...selectedData,
      thisProductName: '',
      thisProductName_Name: '',
      thisProductUnit: '',
      thisProductUnit_Name: '',
      thisProductAmount: '',
      thisProductPrice: '',
      thisSum: 0
    });
  };

  const onBlurHandler = () => {
    setSelectedData({
      ...selectedData,
      thisSum: (thisProductAmount * thisProductPrice).toFixed(2)
    });
  };

  const deleteRowHandler = rowId => {
    const newProducts = products.filter(item => {
      return item.thisId !== rowId;
    });

    setFormData({
      ...formData,
      products: newProducts
    });
  };

  const addItemHandler = () => {
    const poductsSaveToDataBase = products.map(item => {
      return {
        product: item.thisProductName,
        amount: item.thisProductAmount,
        price: item.thisProductPrice
      };
    });

    add_OUR_SALES_INVOICE_NAKLADNAYA(
      naklNumber,
      naclDate,
      ourFirm,
      client,
      poductsSaveToDataBase,
      active,
      cashPayment
    );
    history.goBack();
  };

  const listOf_OUR_SALES_INVOICE_NAKLADNAYAS = (
    <MaterialTable
      title='Накладные'
      columns={[
        { title: 'Будматеріал', field: 'tableProductName' },
        { title: 'Од. Вимиру', field: 'tableProductUnit' },
        { title: 'Кількість', field: 'tableProductAmount' },
        { title: 'Ціна без ПДВ,грн. ', field: 'tableProductPrice' },
        { title: 'Сума без ПДВ,грн', field: 'tableSum' },
        { title: 'Удалить строку', field: 'btnDelete' }
      ]}
      data={products.map(item => {
        return {
          tableProductName: item.thisProductName_Name,
          tableProductUnit: item.thisProductUnit_Name,
          tableProductAmount: item.thisProductAmount,
          tableProductPrice: item.thisProductPrice,
          tableSum: item.thisSum,
          btnDelete: (
            <IconButton
              color='secondary'
              variant='contained'
              onClick={() => deleteRowHandler(item.thisId)}
              className={classes.buttonDelete}
            >
              <DeleteIcon />
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

  return (
    <Grid container className={classes.root} spacing={2}>
      <Button
        onClick={buttonBackHandler}
        variant='contained'
        className={classes.buttonBack}
        color='primary'
      >
        назад
      </Button>

      <Grid item xs={12} container>
        <Grid item xs={2} container>
          <TextField
            variant='outlined'
            name='naklNumber'
            fullWidth
            placeholder='номер накладной'
            type='text'
            value={naklNumber}
            onChange={e => onChangeHandler(e)}
          />
        </Grid>
        <Grid item xs={2} container>
          <TextField
            type='date'
            variant='outlined'
            name='naclDate'
            fullWidth
            value={naclDate}
            onChange={e => onChangeHandler(e)}
            className={classes.dateField}
          />
        </Grid>
        <Grid item xs={3} container>
          {!arr_OUR_FIRMS ? (
            <Spinner />
          ) : (
            <Grid item xs={12} className={classes.wrapSelect}>
              <InputLabel
                id='select-our-firm'
                className={ourFirm ? classes.displayNone : classes.displayFlex}
              >
                фирма
              </InputLabel>
              <Select
                variant='outlined'
                labelId='select-our-firm'
                fullWidth
                value={ourFirm}
                name='ourFirm'
                onChange={e => onChangeHandler(e)}
                className={classes.select}
              >
                {arr_OUR_FIRMS.map(item => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.firmName}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          )}
        </Grid>
        <Grid item xs={3} container>
          {!arr_CLIENTS ? (
            <Spinner />
          ) : (
            <Grid item xs={12} className={classes.wrapSelect}>
              <InputLabel
                id='select-our-client'
                className={client ? classes.displayNone : classes.displayFlex}
              >
                клиент
              </InputLabel>
              <Select
                variant='outlined'
                labelId='select-our-client'
                fullWidth
                value={client}
                name='client'
                onChange={e => onChangeHandler(e)}
                className={classes.select}
              >
                {arr_CLIENTS.map(item => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.firmName}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          )}
        </Grid>

        <Grid item xs={2} container justify='flex-start'>
          <Grid item xs={12} container>
            <FormControlLabel
              className={classes.formControlLabel}
              control={
                <Checkbox
                  checked={active}
                  onChange={e => onCheckHandler(e)}
                  name='active'
                  color='primary'
                />
              }
              label='Активная'
            />
          </Grid>
          <Grid item xs={12} container>
            <FormControlLabel
              className={classes.formControlLabel}
              control={
                <Checkbox
                  checked={cashPayment}
                  onChange={e => onCheckHandler(e)}
                  name='cashPayment'
                  color='primary'
                />
              }
              label='Нал'
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={3} container>
          {!arr_PRODUCTS ? (
            <Spinner />
          ) : (
            <Grid item xs={12} className={classes.wrapSelect}>
              <InputLabel
                id='select-thisProductName'
                className={
                  thisProductName ? classes.displayNone : classes.displayFlex
                }
              >
                товар
              </InputLabel>
              <Select
                variant='outlined'
                labelId='select-thisProductName'
                fullWidth
                value={thisProductName ? thisProductName : ''}
                name='thisProductName'
                onChange={e => onChangeProductHandler(e)}
                className={classes.select}
              >
                {arr_PRODUCTS.map(item => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.productName}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          )}
        </Grid>
        <Grid item xs={2} container>
          {!arr_UNITS ? (
            <Spinner />
          ) : (
            <Grid item xs={12} className={classes.wrapSelect}>
              <InputLabel
                id='select-type-thisProductUnit'
                className={
                  thisProductUnit ? classes.displayNone : classes.displayFlex
                }
              >
                ед.изм
              </InputLabel>
              <Select
                disabled
                variant='outlined'
                labelId='select-type-thisProductUnit'
                fullWidth
                value={thisProductUnit ? thisProductUnit : ''}
                name='thisProductUnit'
                onChange={e => onChangeProductHandler(e)}
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
        <Grid item xs={2} container>
          <TextField
            variant='outlined'
            name='thisProductAmount'
            fullWidth
            placeholder='Количество'
            type='number'
            value={thisProductAmount}
            onChange={e => onChangeProductHandler(e)}
            onBlur={onBlurHandler}
          />
        </Grid>
        <Grid item xs={2} container>
          <TextField
            variant='outlined'
            name='thisProductPrice'
            fullWidth
            placeholder='Цена'
            type='number'
            value={thisProductPrice}
            onChange={e => onChangeProductHandler(e)}
            onBlur={onBlurHandler}
          />
        </Grid>
        <Grid item xs={2} container>
          <Typography variant='h3' align='center'>
            {thisSum}
          </Typography>
        </Grid>
        <Grid item xs={1} container>
          <IconButton onClick={addProductHandler}>
            <AddCircleIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        {listOf_OUR_SALES_INVOICE_NAKLADNAYAS}
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

Our_SalesInvoiceNakladnaya_Add.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  add_OUR_SALES_INVOICE_NAKLADNAYA: PropTypes.func.isRequired,
  getAll_OUR_FIRMS: PropTypes.func.isRequired,
  getAll_CLIENTS: PropTypes.func.isRequired,
  getAll_PRODUCTS: PropTypes.func.isRequired,
  getAll_UNITS: PropTypes.func.isRequired,

  state_client: PropTypes.object.isRequired,
  state_ourFirm: PropTypes.object.isRequired,
  state_product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  state_client: state.client,
  state_ourFirm: state.ourFirm,
  state_product: state.product,
  state_unit: state.unit
});

export default connect(mapStateToProps, {
  setNameOfPage,
  add_OUR_SALES_INVOICE_NAKLADNAYA,
  getAll_OUR_FIRMS,
  getAll_CLIENTS,
  getAll_PRODUCTS,
  getAll_UNITS
})(Our_SalesInvoiceNakladnaya_Add);
