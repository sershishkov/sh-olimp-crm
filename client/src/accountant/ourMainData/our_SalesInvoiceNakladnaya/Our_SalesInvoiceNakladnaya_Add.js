import React, { useEffect, useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuid from 'uuid';
import IMask from 'imask';

import TableForNakl from '../../components/tableForNakl/TableForNakl';

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
import Modal from '@material-ui/core/Modal';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';

import StarBorder from '@material-ui/icons/StarBorder';

import Spinner from '../../../shared/spinner/Spinner';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import { add_OUR_SALES_INVOICE_NAKLADNAYA } from '../../../store/actions/accountant/ourMainData/our_SalesInvoiceNakladnaya';

import { getAll_OUR_FIRMS } from '../../../store/actions/accountant/referenceData/ourFirm';
import { getAll_CLIENTS } from '../../../store/actions/accountant/referenceData/client';
import { getAll_PRODUCTS } from '../../../store/actions/accountant/referenceData/product';
import { getAll_GROUP_OF_PRODUCTS } from '../../../store/actions/accountant/referenceData/groupOf_Product';
import { getAll_UNITS } from '../../../store/actions/accountant/referenceData/unit';

// import Spinner from '../../../shared/spinner/Spinner';

const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
    marginTop: '7rem',
    backgroundColor: 'white',
  },
  buttonBack: {
    position: 'fixed',
    top: '5rem',
    left: 0,
  },
  displayNone: {
    display: 'none',
    backgroundColor: 'green',
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
  formControlLabel: {
    // border: '1px solid red',
    height: 22,
    fontSize: '0.4rem',
    marginLeft: 5,
  },
  modalScroll: {
    margin: 'auto',
    width: '90%',
    scrollBehavior: 'smooth',
    overflowY: 'scroll',
    padding: '4rem',
  },
  listOfGroups: {
    backgroundColor: 'white',
  },
  listOfGroups_ListItem: {
    // backgroundColor: 'yellow',
  },
  listOfProducts: {
    display: 'none',
  },
  listOfProducts_ListItem: {
    marginLeft: 30,
  },
}));

const Our_SalesInvoiceNakladnaya_Add = ({
  setNameOfPage,
  add_OUR_SALES_INVOICE_NAKLADNAYA,

  getAll_OUR_FIRMS,
  getAll_CLIENTS,
  getAll_PRODUCTS,
  getAll_GROUP_OF_PRODUCTS,
  getAll_UNITS,

  state_client: { arr_CLIENTS },
  state_ourFirm: { arr_OUR_FIRMS },
  state_product: { arr_PRODUCTS },
  state_groupOf_Product: { arr_GROUP_OF_PRODUCTS },
  state_unit: { arr_UNITS },
}) => {
  const classes = useStyles();
  const history = useHistory();

  const [formData, setFormData] = useState({
    naklNumber: '',
    naclDate: '',
    ourFirm: '',
    client: '',
    products: [],
  });

  const [checkedData, setCheckedData] = useState({
    active: true,
    cashPayment: false,
  });

  const [totalPriceForTable, setTotalPriceForTable] = useState(0);

  const [rowData, setRowData] = useState({
    rowProductNameId: '',
    rowProductName: '',
    rowProductUnitNameId: '',
    rowProductUnitName: '',
    rowProductAmount: '',
    rowProductPrice: '',
    rowProductSum: 0,
  });

  const [disabledForm, setDisabledForm] = useState(true);
  const [disabledButtonAddRow, setDisabledButtonAddRow] = useState(true);

  const [openModal_ProductList, setOpenModal_ProductList] = useState(false);

  const handleGroupOfProductCollapse = (id) => {
    const productList = document.getElementById(`${id}nextProductList`);
    productList.classList.toggle(`${classes.listOfProducts}`);
  };

  const { naklNumber, naclDate, ourFirm, client, products } = formData;
  const { active, cashPayment } = checkedData;

  const {
    rowProductNameId,
    rowProductName,
    rowProductUnitNameId,
    rowProductUnitName,
    rowProductAmount,
    rowProductPrice,
    rowProductSum,
  } = rowData;

  useEffect(() => {
    setNameOfPage('Добавить накладную');
    getAll_OUR_FIRMS();
    getAll_CLIENTS();
    getAll_PRODUCTS();
    getAll_GROUP_OF_PRODUCTS();
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

    const thisNaklNumber = `ВН-${
      fullYear - 2000
    }.${month}.${day}.${hours}.${minutes}`;

    const thisNaclDate = `${fullYear}-${month}-${day}`;

    setFormData({
      ...formData,
      naklNumber: thisNaklNumber,
      naclDate: thisNaclDate,
    });
  }, [
    setNameOfPage,
    setFormData,
    getAll_PRODUCTS,
    getAll_GROUP_OF_PRODUCTS,
    getAll_OUR_FIRMS,
    getAll_CLIENTS,
    getAll_UNITS,
  ]);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setDisabledForm(!(ourFirm && client && products.length > 0));
  };

  const onCheckHandler = (e) => {
    setCheckedData({ ...checkedData, [e.target.name]: e.target.checked });
  };

  const onChangeProductHandler = (e) => {
    if (e.target.name === 'rowProductNameId') {
      const selectedProduct = arr_PRODUCTS.find((item) => {
        return item._id === e.target.value;
      });

      setRowData({
        ...rowData,
        rowProductNameId: e.target.value,
        rowProductUnitNameId: selectedProduct.unit._id,
        rowProductUnitName: selectedProduct.unit.unitNameShort,
        rowProductName: selectedProduct.productName,
      });
    } else {
      setRowData({
        ...rowData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSelectProduct = (id) => {
    const selectedProduct = arr_PRODUCTS.find((item) => {
      return item._id === id;
    });

    setRowData({
      ...rowData,
      rowProductNameId: id,
      rowProductUnitNameId: selectedProduct.unit._id,
      rowProductUnitName: selectedProduct.unit.unitNameShort,
      rowProductName: selectedProduct.productName,
    });
    setOpenModal_ProductList(false);
  };

  const addRowProductHandler = () => {
    const rowProductId = uuid.v4();

    const newRow = {
      rowProductId,
      rowProductNameId,
      rowProductName,
      rowProductUnitName,
      rowProductAmount,
      rowProductPrice,
      rowProductSum,
      deleteRow: onDeleteRow,
    };

    setFormData({
      ...formData,
      products: [...products, newRow],
    });

    // setTotalPriceForTable(
    //   parseFloat(totalPriceForTable) + parseFloat(rowProductSum)
    // );

    setRowData({
      ...rowData,
      rowProductNameId: '',
      rowProductName: '',
      rowProductUnitNameId: '',
      rowProductUnitName: '',
      rowProductAmount: '',
      rowProductPrice: '',
      rowProductSum: 0,
    });
  };

  const onBlurHandler = () => {
    setRowData({
      ...rowData,
      rowProductSum: (rowProductAmount * rowProductPrice).toFixed(2),
    });
  };

  const onDeleteRow = (rowId) => {
    const newProducts = products.filter((item) => {
      return item.thisId !== rowId;
    });

    setFormData({
      ...formData,
      products: newProducts,
    });
  };

  const addItemHandler = () => {
    const poductsSaveToDataBase = products.map((item) => {
      return {
        product: item.rowProductNameId,
        amount: item.rowProductAmount,
        price: item.rowProductPrice,
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
    // history.goBack();
  };

  const ProductList = (
    <List className={classes.listOfGroups}>
      {arr_GROUP_OF_PRODUCTS.map((group) => {
        const nestedArrayOfProducts = arr_PRODUCTS.filter((product) => {
          return product.productGroup._id === group._id;
        });

        return (
          <Fragment key={group._id}>
            <ListItem
              id={group._id}
              button
              className={classes.listOfGroups_ListItem}
              onClick={() => handleGroupOfProductCollapse(group._id)}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText>{group.productGroup}</ListItemText>
            </ListItem>

            <List
              id={`${group._id}nextProductList`}
              className={classes.listOfProducts}
            >
              {nestedArrayOfProducts.map((product) => (
                <ListItem
                  key={product._id}
                  button
                  className={classes.listOfProducts_ListItem}
                  onClick={() => handleSelectProduct(product._id)}
                >
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText>{product.productName}</ListItemText>
                </ListItem>
              ))}
            </List>
          </Fragment>
        );
      })}
    </List>
  );

  // const listOf_OUR_SALES_INVOICE_NAKLADNAYAS = (
  //   <MaterialTable
  //     title='Накладные'
  //     columns={[
  //       { title: 'Будматеріал', field: 'tableProductName' },
  //       { title: 'Од. Вимиру', field: 'tableProductUnit' },
  //       { title: 'Кількість', field: 'tableProductAmount' },
  //       { title: 'Ціна без ПДВ,грн. ', field: 'tableProductPrice' },
  //       { title: 'Сума без ПДВ,грн', field: 'tableSum' },
  //       { title: 'Удалить строку', field: 'btnDelete' },
  //     ]}
  //     data={products.map((item) => {
  //       return {
  //         tableProductName: item.rowProductName,
  //         tableProductUnit: item.rowProductUnitName,
  //         tableProductAmount: item.rowProductAmount,
  //         tableProductPrice: item.rowProductPrice,
  //         tableSum: item.rowProductSum,
  //         btnDelete: (
  //           <IconButton
  //             color='secondary'
  //             variant='contained'
  //             onClick={() => deleteRowHandler(item.thisId)}
  //             className={classes.buttonDelete}
  //           >
  //             <DeleteIcon />
  //           </IconButton>
  //         ),
  //       };
  //     })}
  //     options={{
  //       sorting: true,
  //       search: false,
  //     }}
  //   />
  // );

  const handleOpen_Product_List = () => {
    setOpenModal_ProductList(true);
  };
  const handleClose_Product_List = () => {
    setOpenModal_ProductList(false);
  };

  const onInputPhoneHandler = (e) => {
    const inputMaskOptions = {
      // pattern='^\d*(\.\d{0,2})?$'
      mask: /^\d*(\.\d{0,2})?$/,
    };

    IMask(e.target, inputMaskOptions);
  };

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12} container>
        <Grid item xs={2} container>
          <TextField
            variant='outlined'
            name='naklNumber'
            fullWidth
            placeholder='номер накладной'
            type='text'
            value={naklNumber}
            onChange={(e) => onChangeHandler(e)}
          />
        </Grid>
        <Grid item xs={2} container>
          <TextField
            type='date'
            variant='outlined'
            name='naclDate'
            fullWidth
            value={naclDate}
            onChange={(e) => onChangeHandler(e)}
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
                наша фирма
              </InputLabel>
              <Select
                variant='outlined'
                labelId='select-our-firm'
                fullWidth
                autoFocus
                value={ourFirm}
                name='ourFirm'
                onChange={(e) => onChangeHandler(e)}
                className={classes.select}
              >
                {arr_OUR_FIRMS.map((item) => (
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
                onChange={(e) => onChangeHandler(e)}
                className={classes.select}
              >
                {arr_CLIENTS.map((item) => (
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
                  onChange={(e) => onCheckHandler(e)}
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
                  onChange={(e) => onCheckHandler(e)}
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
                id='select-rowProductNameId'
                className={
                  rowProductNameId ? classes.displayNone : classes.displayFlex
                }
              >
                товар
              </InputLabel>
              <Select
                variant='outlined'
                labelId='select-rowProductNameId'
                fullWidth
                value={rowProductNameId ? rowProductNameId : ''}
                name='rowProductNameId'
                onChange={(e) => onChangeProductHandler(e)}
                className={classes.select}
              >
                {arr_PRODUCTS.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.productName}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          )}
        </Grid>
        <Grid item xs={2} container>
          <Modal
            className={classes.modalScroll}
            open={openModal_ProductList}
            onClose={handleClose_Product_List}
          >
            {ProductList}
          </Modal>

          <IconButton
            onClick={() => {
              handleOpen_Product_List();
            }}
          >
            <AddCircleIcon color='primary' />
          </IconButton>

          {/* /////////////////////////////////////////////////////////////////////////// */}
          {/* {!arr_UNITS ? (
            <Spinner />
          ) : (
            <Grid item xs={12} className={classes.wrapSelect}>
              <InputLabel
                id='select-type-rowProductUnitNameId'
                className={
                  rowProductUnitNameId ? classes.displayNone : classes.displayFlex
                }
              >
                ед.изм
              </InputLabel>
              <Select
                disabled
                variant='outlined'
                labelId='select-type-rowProductUnitNameId'
                fullWidth
                value={rowProductUnitNameId ? rowProductUnitNameId : ''}
                name='rowProductUnitNameId'
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
          )} */}
          {/* /////////////////////////////////////////////////////////////////////////// */}
        </Grid>
        <Grid item xs={2} container>
          <TextField
            variant='outlined'
            name='rowProductAmount'
            fullWidth
            placeholder='Количество'
            type='number'
            value={rowProductAmount}
            onChange={(e) => onChangeProductHandler(e)}
            onBlur={onBlurHandler}
          />
        </Grid>
        <Grid item xs={2} container>
          <TextField
            variant='outlined'
            name='rowProductPrice'
            fullWidth
            placeholder='Цена'
            type='number'
            onInput={(e) => onInputPhoneHandler(e)}
            value={rowProductPrice}
            onChange={(e) => onChangeProductHandler(e)}
            onBlur={onBlurHandler}
          />
        </Grid>
        {/* <Grid item xs={2} container>
          <Typography variant='h3' align='center'>
            {rowProductSum}
          </Typography>
        </Grid> */}
        <Grid item xs={1} container>
          <IconButton onClick={addRowProductHandler}>
            <AddCircleIcon color='primary' />
          </IconButton>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TableForNakl fieldName='Будматеріал' arrOfRows={products} />
        {/* {listOf_OUR_SALES_INVOICE_NAKLADNAYAS} */}
      </Grid>

      {/* <Grid item xs={12} container>
        <Grid item xs={6}></Grid>
        <Grid item xs={3}>
          <Typography>Итого:</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography>{totalPriceForTable.toFixed(2)}</Typography>
        </Grid>
      </Grid> */}

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
  getAll_GROUP_OF_PRODUCTS: PropTypes.func.isRequired,
  getAll_UNITS: PropTypes.func.isRequired,

  state_client: PropTypes.object.isRequired,
  state_ourFirm: PropTypes.object.isRequired,
  state_product: PropTypes.object.isRequired,
  state_groupOf_Product: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  state_client: state.client,
  state_ourFirm: state.ourFirm,
  state_product: state.product,
  state_groupOf_Product: state.groupOf_Product,

  state_unit: state.unit,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  add_OUR_SALES_INVOICE_NAKLADNAYA,
  getAll_OUR_FIRMS,
  getAll_CLIENTS,
  getAll_PRODUCTS,
  getAll_GROUP_OF_PRODUCTS,
  getAll_UNITS,
})(Our_SalesInvoiceNakladnaya_Add);
