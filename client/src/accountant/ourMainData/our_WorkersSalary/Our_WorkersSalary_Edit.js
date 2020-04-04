import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import {
  getOne_OUR_WORKERS_SALARY,
  update_OUR_WORKERS_SALARY
} from '../../../store/actions/accountant/ourMainData/our_WorkersSalary';

import { getAll_OUR_FIRMS } from '../../../store/actions/accountant/referenceData/ourFirm';
import { getAll_CLIENTS } from '../../../store/actions/accountant/referenceData/client';
import { getAll_WORKERS } from '../../../store/actions/accountant/referenceData/worker';

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
  }
}));

const Our_WorkersSalary_Edit = ({
  setNameOfPage,
  getOne_OUR_WORKERS_SALARY,
  update_OUR_WORKERS_SALARY,

  getAll_OUR_FIRMS,
  getAll_CLIENTS,
  getAll_WORKERS,

  state_client: { arr_CLIENTS },
  state_ourFirm: { arr_OUR_FIRMS },
  state_worker: { arr_WORKERS },

  state_our_WorkersSalary: { one_OUR_WORKERS_SALARY, loading }
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const buttonBackHandler = () => {
    history.push('/accountant/our-workers-salary');
  };

  const [formData, setFormData] = useState({
    paymentNumber: '',
    datePayment: '',
    worker: '',
    ourFirm: '',
    client: '',
    description: '',
    sum: ''
  });

  const [checkedData, setCheckedData] = useState({
    active: true,
    cashPayment: true
  });

  const [disabledForm, setDisabledForm] = useState(true);

  const {
    paymentNumber,
    datePayment,
    worker,
    ourFirm,
    client,
    description,
    sum
  } = formData;
  const { active, cashPayment } = checkedData;

  useEffect(() => {
    setNameOfPage('Редактировать зарплату');
    getOne_OUR_WORKERS_SALARY(id);

    getAll_OUR_FIRMS();
    getAll_CLIENTS();
    getAll_WORKERS();
  }, [
    setNameOfPage,
    getOne_OUR_WORKERS_SALARY,
    id,
    getAll_OUR_FIRMS,
    getAll_CLIENTS,
    getAll_WORKERS
  ]);

  useLayoutEffect(() => {
    if (one_OUR_WORKERS_SALARY) {
      const oldDate = new Date(one_OUR_WORKERS_SALARY.datePayment);
      const year = oldDate.getFullYear();
      const month =
        oldDate.getMonth() < 10 ? `0${oldDate.getMonth()}` : oldDate.getMonth();
      const date =
        oldDate.getDate() < 10 ? `0${oldDate.getDate()}` : oldDate.getDate();
      const reverceDate = `${year}-${month}-${date}`;

      setFormData({
        ...formData,
        paymentNumber: one_OUR_WORKERS_SALARY.paymentNumber,
        datePayment: reverceDate,
        worker: one_OUR_WORKERS_SALARY.worker,
        ourFirm: one_OUR_WORKERS_SALARY.ourFirm,
        client: one_OUR_WORKERS_SALARY.client,
        description: one_OUR_WORKERS_SALARY.description,
        sum: one_OUR_WORKERS_SALARY.sum
      });
      setCheckedData({
        ...checkedData,
        active: one_OUR_WORKERS_SALARY.active,
        cashPayment: one_OUR_WORKERS_SALARY.cashPayment
      });
    }
  }, [one_OUR_WORKERS_SALARY]);

  const onChangeHandler = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setDisabledForm(!(worker || ourFirm || client || description || sum));
  };

  const onCheckHandler = e => {
    setCheckedData({ ...checkedData, [e.target.name]: e.target.checked });
  };

  const updateItemHandler = () => {
    update_OUR_WORKERS_SALARY(
      id,
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
    history.push('/accountant/our-workers-salary');
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
          <Typography align='left'>Номер документа</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='paymentNumber'
            fullWidth
            placeholder='Номер документа'
            type='text'
            value={paymentNumber ? paymentNumber : ''}
            onChange={e => onChangeHandler(e)}
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
            value={datePayment ? datePayment : ''}
            onChange={e => onChangeHandler(e)}
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
                value={worker ? worker : ''}
                name='worker'
                onChange={e => onChangeHandler(e)}
                className={classes.select}
              >
                {arr_WORKERS.map(item => (
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
              history.push('/accountant/worker/add');
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
                value={ourFirm ? ourFirm : ''}
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

        <Grid item xs={1} container alignItems='center' justify='center'>
          <IconButton
            onClick={() => {
              history.push('/accountant/our-firm/add');
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
                value={client ? client : ''}
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

        <Grid item xs={1} container alignItems='center' justify='center'>
          <IconButton
            onClick={() => {
              history.push('/accountant/client/add');
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
            value={description ? description : ''}
            onChange={e => onChangeHandler(e)}
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
            value={sum ? sum : ''}
            onChange={e => onChangeHandler(e)}
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
                checked={active ? active : ''}
                onChange={e => onCheckHandler(e)}
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
                checked={cashPayment ? cashPayment : ''}
                onChange={e => onCheckHandler(e)}
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
          onClick={() => updateItemHandler()}
        >
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );
};

Our_WorkersSalary_Edit.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getOne_OUR_WORKERS_SALARY: PropTypes.func.isRequired,
  update_OUR_WORKERS_SALARY: PropTypes.func.isRequired,

  getAll_OUR_FIRMS: PropTypes.func.isRequired,
  getAll_CLIENTS: PropTypes.func.isRequired,
  getAll_WORKERS: PropTypes.func.isRequired,

  state_client: PropTypes.object.isRequired,
  state_ourFirm: PropTypes.object.isRequired,
  state_worker: PropTypes.object.isRequired,

  state_our_WorkersSalary: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  state_client: state.client,
  state_ourFirm: state.ourFirm,
  state_worker: state.worker,
  state_our_WorkersSalary: state.our_WorkersSalary
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getOne_OUR_WORKERS_SALARY,
  update_OUR_WORKERS_SALARY,

  getAll_OUR_FIRMS,
  getAll_CLIENTS,
  getAll_WORKERS
})(Our_WorkersSalary_Edit);
