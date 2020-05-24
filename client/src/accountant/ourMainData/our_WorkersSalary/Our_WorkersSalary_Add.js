import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Worker_Add from '../../referenceData/worker/Worker_Add';
import OurFirm_Add from '../../referenceData/ourFirm/OurFirm_Add';
import Client_Add from '../../referenceData/client/Client_Add';

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
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import Spinner from '../../../shared/spinner/Spinner';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import { add_OUR_WORKERS_SALARY } from '../../../store/actions/accountant/ourMainData/our_WorkersSalary';

import { getAll_OUR_FIRMS } from '../../../store/actions/accountant/referenceData/ourFirm';
import { getAll_CLIENTS } from '../../../store/actions/accountant/referenceData/client';
import { getAll_WORKERS } from '../../../store/actions/accountant/referenceData/worker';

const useStyles = makeStyles((theme) => ({
  root: {
    // display: 'flex',
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
  },
}));

const Our_WorkersSalary_Add = ({
  setNameOfPage,
  add_OUR_WORKERS_SALARY,

  getAll_OUR_FIRMS,
  getAll_CLIENTS,
  getAll_WORKERS,

  state_client: { arr_CLIENTS },
  state_ourFirm: { arr_OUR_FIRMS },
  state_worker: { arr_WORKERS },
}) => {
  const classes = useStyles();
  const history = useHistory();

  // const buttonBackHandler = () => {
  //   history.goBack();
  //   // history.push('/accountant/our-workers-salary');
  // };

  const [formData, setFormData] = useState({
    paymentNumber: '',
    datePayment: '',
    worker: '',
    ourFirm: '',
    client: '',
    description: '',
    sum: '',
  });

  const [checkedData, setCheckedData] = useState({
    active: true,
    cashPayment: true,
  });

  const [disabledForm, setDisabledForm] = useState(true);

  const [openWorker_Add, setOpenWorker_Add] = useState(false);
  const [openOurFirm_Add, setOpenOurFirm_Add] = useState(false);
  const [openClient_Add, setOpenClient_Add] = useState(false);

  const {
    paymentNumber,
    datePayment,
    worker,
    ourFirm,
    client,
    description,
    sum,
  } = formData;
  const { active, cashPayment } = checkedData;

  useEffect(() => {
    setNameOfPage('Добавить выплату зарплаты');

    getAll_OUR_FIRMS();
    getAll_CLIENTS();
    getAll_WORKERS();

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

    const thisNaklNumber = `ЗП-${
      fullYear - 2000
    }.${month}.${day}.${hours}.${minutes}`;

    const thisNaclDate = `${fullYear}-${month}-${day}`;

    setFormData({
      ...formData,
      paymentNumber: thisNaklNumber,
      datePayment: thisNaclDate,
    });
  }, [
    setNameOfPage,
    setFormData,
    getAll_WORKERS,
    getAll_OUR_FIRMS,
    getAll_CLIENTS,
  ]);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setDisabledForm(!(worker && ourFirm && client && description && sum));
  };

  const onCheckHandler = (e) => {
    setCheckedData({ ...checkedData, [e.target.name]: e.target.checked });
  };

  const addItemHandler = () => {
    add_OUR_WORKERS_SALARY(
      paymentNumber,
      datePayment,
      worker,
      ourFirm,
      client,
      description,
      sum,
      active,
      cashPayment
    );
    // history.goBack();
  };

  const handleOpen_Worker_Add = () => {
    setOpenWorker_Add(true);
  };
  const handleOpen_OurFirm_Add = () => {
    setOpenOurFirm_Add(true);
  };
  const handleOpen_Client_Add = () => {
    setOpenClient_Add(true);
  };

  const handleClose_Worker_Add = () => {
    setOpenWorker_Add(false);
  };
  const handleClose_OurFirm_Add = () => {
    setOpenOurFirm_Add(false);
  };
  const handleClose_Client_Add = () => {
    setOpenClient_Add(false);
  };

  return (
    <Grid container className={classes.root} spacing={2}>
      <Modal
        className={classes.modalScroll}
        open={openWorker_Add}
        onClose={handleClose_Worker_Add}
      >
        <Worker_Add />
      </Modal>

      <Modal
        className={classes.modalScroll}
        open={openOurFirm_Add}
        onClose={handleClose_OurFirm_Add}
      >
        <OurFirm_Add />
      </Modal>

      <Modal
        className={classes.modalScroll}
        open={openClient_Add}
        onClose={handleClose_Client_Add}
      >
        <Client_Add />
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
          <Typography align='left'>Номер документа</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='paymentNumber'
            fullWidth
            placeholder='Номер документа'
            type='text'
            value={paymentNumber}
            onChange={(e) => onChangeHandler(e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Дата документа</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            type='date'
            variant='outlined'
            name='datePayment'
            fullWidth
            value={datePayment}
            onChange={(e) => onChangeHandler(e)}
            className={classes.dateField}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>работник</Typography>
        </Grid>
        <Grid item xs={7} container>
          {!arr_WORKERS ? (
            <Spinner />
          ) : (
            <Grid item xs={12} className={classes.wrapSelect}>
              <InputLabel
                id='select-worker'
                className={worker ? classes.displayNone : classes.displayFlex}
              >
                работник
              </InputLabel>
              <Select
                variant='outlined'
                labelId='select-worker'
                fullWidth
                value={worker}
                name='worker'
                onChange={(e) => onChangeHandler(e)}
                className={classes.select}
              >
                {arr_WORKERS.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.surname}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          )}
        </Grid>

        <Grid item xs={1} container alignItems='center' justify='center'>
          <IconButton
            onClick={() => {
              handleOpen_Worker_Add();
              // history.push('/accountant/worker/add');
            }}
          >
            <AddCircleIcon color='primary' />
          </IconButton>
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Наша фирма</Typography>
        </Grid>
        <Grid item xs={7} container>
          {!arr_OUR_FIRMS ? (
            <Spinner />
          ) : (
            <Grid item xs={12} className={classes.wrapSelect}>
              <InputLabel
                id='select-our-firm'
                className={ourFirm ? classes.displayNone : classes.displayFlex}
              >
                Наша фирма
              </InputLabel>
              <Select
                variant='outlined'
                labelId='select-our-firm'
                fullWidth
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

        <Grid item xs={1} container alignItems='center' justify='center'>
          <IconButton
            onClick={() => {
              handleOpen_OurFirm_Add();
              // history.push('/accountant/our-firm/add');
            }}
          >
            <AddCircleIcon color='primary' />
          </IconButton>
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Клиент</Typography>
        </Grid>
        <Grid item xs={7} container>
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

        <Grid item xs={1} container alignItems='center' justify='center'>
          <IconButton
            onClick={() => {
              handleOpen_Client_Add();
              // history.push('/accountant/client/add');
            }}
          >
            <AddCircleIcon color='primary' />
          </IconButton>
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Описание</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            multiline
            variant='outlined'
            name='description'
            fullWidth
            placeholder='Описание'
            type='text'
            value={description}
            onChange={(e) => onChangeHandler(e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Сумма</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='sum'
            fullWidth
            placeholder='Сумма'
            type='number'
            value={sum}
            onChange={(e) => onChangeHandler(e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Дополнительно</Typography>
        </Grid>
        <Grid item xs={4} container>
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

        <Grid item xs={4} container>
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

Our_WorkersSalary_Add.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  add_OUR_WORKERS_SALARY: PropTypes.func.isRequired,

  getAll_OUR_FIRMS: PropTypes.func.isRequired,
  getAll_CLIENTS: PropTypes.func.isRequired,
  getAll_WORKERS: PropTypes.func.isRequired,

  state_client: PropTypes.object.isRequired,
  state_ourFirm: PropTypes.object.isRequired,
  state_worker: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  state_client: state.client,
  state_ourFirm: state.ourFirm,
  state_worker: state.worker,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  add_OUR_WORKERS_SALARY,

  getAll_OUR_FIRMS,
  getAll_CLIENTS,
  getAll_WORKERS,
})(Our_WorkersSalary_Add);
