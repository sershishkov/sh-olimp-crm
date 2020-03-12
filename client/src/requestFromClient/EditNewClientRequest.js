import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setNameOfPage } from '../store/actions/nameOfPage';
import { getAllOperatorCode } from '../store/actions/operatorCode';
import {
  getOneClientRequest,
  updateClientRequest
} from '../store/actions/clientRequests';

import Spinner from '../shared/spinner/Spinner';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
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
    top: 18,
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

const EditNewClientRequest = ({
  operatorCode: { operatorCodes, loading },
  clientRequests: { oneClientRequest },
  setNameOfPage,
  getOneClientRequest,
  updateClientRequest,
  getAllOperatorCode
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const buttonBackHandler = () => {
    history.push('/request-from-client');
  };

  const [pageForm, setPageForm] = useState({
    clientName: '',
    requestFromClient: '',
    operatorCod: '',
    phoneNumber: '',
    email: ''
  });

  const [disabledForm, setDisabledForm] = useState(true);
  const {
    clientName,
    requestFromClient,
    operatorCod,
    phoneNumber,
    email
  } = pageForm;

  useEffect(() => {
    setNameOfPage('Редактируем заявку');
    getAllOperatorCode();
    getOneClientRequest(id);
  }, [setNameOfPage, getAllOperatorCode, getOneClientRequest, id]);

  useLayoutEffect(() => {
    // console.log(oneClientRequest);
    if (oneClientRequest) {
      setPageForm({
        ...pageForm,
        clientName: oneClientRequest.clientName,
        requestFromClient: oneClientRequest.requestFromClient,
        // operatorCod: oneClientRequest.operatorCode._id,
        phoneNumber: oneClientRequest.phoneNumber,
        email: oneClientRequest.email
      });
    }
  }, [oneClientRequest]);

  const onChangeHandler = e => {
    setPageForm({ ...pageForm, [e.target.name]: e.target.value });
    // console.log(e.target.value);
    setDisabledForm(
      !(
        clientName &&
        requestFromClient &&
        ((operatorCod && phoneNumber) || email)
      )
    );
  };

  const updateClientRequestHandler = () => {
    updateClientRequest(
      id,
      clientName,
      requestFromClient,
      operatorCod,
      phoneNumber,
      email
    );
    history.push('/request-from-client');
  };

  return loading || !oneClientRequest ? (
    <Spinner />
  ) : (
    <Grid container className={classes.root} spacing={3}>
      <Button
        onClick={buttonBackHandler}
        className={classes.buttonBack}
        color='primary'
      >
        назад
      </Button>
      <Grid item xs={12}>
        <TextField
          variant='outlined'
          name='clientName'
          fullWidth
          placeholder='Введите ваше Имя'
          type='text'
          value={clientName ? clientName : ''}
          onChange={e => onChangeHandler(e)}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          variant='outlined'
          name='requestFromClient'
          multiline
          fullWidth
          placeholder='Напишите заявку'
          type='text'
          value={requestFromClient ? requestFromClient : ''}
          onChange={e => onChangeHandler(e)}
        />
      </Grid>

      <Grid item xs={12} container alignItems='center'>
        <Grid item xs={2} className={classes.wrapSelect}>
          <InputLabel
            id='add-select-label'
            className={operatorCod ? classes.displayNone : classes.displayFlex}
          >
            код оператора
          </InputLabel>
          <Select
            variant='outlined'
            labelId='add-select-label'
            fullWidth
            value={operatorCod ? operatorCod : ''}
            name='operatorCod'
            onChange={e => onChangeHandler(e)}
            className={classes.select}
          >
            {operatorCodes.map(item => (
              <MenuItem key={item._id} value={item._id}>
                {item.operatorCode}
              </MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid item xs={5}>
          <TextField
            variant='outlined'
            type='number'
            fullWidth
            placeholder='номер телефона 7 цифр'
            name='phoneNumber'
            value={phoneNumber ? phoneNumber : ''}
            onChange={e => onChangeHandler(e)}
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            variant='outlined'
            type='text'
            fullWidth
            placeholder='Введите email'
            name='email'
            value={email ? email : ''}
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
          onClick={() => updateClientRequestHandler()}
        >
          Изменить заявку
        </Button>
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={6} container>
          <Typography variant='h4'>
            Вы можете обновить заявку на сайте, либо позвоните нам по телефонам:
          </Typography>
        </Grid>
        <Grid item xs={6} container>
          <Grid item xs={12} flexdirextion='column'>
            <Typography component='h4' variant='h5' align='center'>
              +38 098 310 47 99
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography component='h4' variant='h5' align='center'>
              +38 067 618 30 60
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography component='h4' variant='h5' align='center'>
              +38 099 180 98 04
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography component='h4' variant='h5' align='center'>
              +38 050 227 96 50
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

EditNewClientRequest.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAllOperatorCode: PropTypes.func.isRequired,
  getOneClientRequest: PropTypes.func.isRequired,
  updateClientRequest: PropTypes.func.isRequired,
  operatorCode: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  operatorCode: state.operatorCode,
  clientRequests: state.clientRequests
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getOneClientRequest,
  updateClientRequest,
  getAllOperatorCode
})(EditNewClientRequest);
