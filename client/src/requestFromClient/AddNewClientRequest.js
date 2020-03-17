import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setNameOfPage } from '../store/actions/nameOfPage';
import { getAllOperatorCode } from '../store/actions/accountant/referenceData/phoneOperator';
import { addClientRequest } from '../store/actions/clientRequests';

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
    top: 18,
    left: 7
    // zIndex: 555
  },
  wrapSelect: {
    position: 'relative'
  },
  select: {
    height: 50
    // border: '1px solid red'
  }
}));

const AddNewClientRequest = ({
  phoneOperator: { operatorCodes, loading },
  setNameOfPage,
  getAllOperatorCode,
  addClientRequest
}) => {
  const classes = useStyles();
  const history = useHistory();

  const buttonBackHandler = () => {
    history.push('/request-from-client');
  };

  const [pageForm, setPageForm] = useState({
    clientName: '',
    requestFromClient: '',
    phoneOperator: '',
    phoneNumber: '',
    email: ''
  });

  const [disabledForm, setDisabledForm] = useState(true);
  const {
    clientName,
    requestFromClient,
    phoneOperator,
    phoneNumber,
    email
  } = pageForm;

  useEffect(() => {
    setNameOfPage('Создать заявку');
    getAllOperatorCode();
  }, [setNameOfPage, getAllOperatorCode]);

  const onChangeHandler = e => {
    setPageForm({ ...pageForm, [e.target.name]: e.target.value });
    // console.log(e.target.value);
    setDisabledForm(
      !(
        clientName &&
        requestFromClient &&
        ((phoneOperator && phoneNumber) || email)
      )
    );
  };

  const addClientRequestHandler = () => {
    addClientRequest(
      clientName,
      requestFromClient,
      phoneOperator,
      phoneNumber,
      email
    );
    history.push('/request-from-client');
  };

  return (
    <Grid container className={classes.root} spacing={3}>
      <Button
        onClick={buttonBackHandler}
        variant='contained'
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
          value={clientName}
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
          value={requestFromClient}
          onChange={e => onChangeHandler(e)}
        />
      </Grid>

      <Grid item xs={12} container alignItems='center'>
        {loading ? (
          <Spinner />
        ) : (
          <Grid item xs={2} className={classes.wrapSelect}>
            <InputLabel
              id='add-select-label'
              className={
                phoneOperator ? classes.displayNone : classes.displayFlex
              }
            >
              код оператора
            </InputLabel>
            <Select
              variant='outlined'
              labelId='add-select-label'
              fullWidth
              value={phoneOperator}
              name='phoneOperator'
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
        )}

        <Grid item xs={5}>
          <TextField
            variant='outlined'
            type='number'
            fullWidth
            min='1000000'
            max='9999999'
            placeholder='номер телефона 7 цифр'
            name='phoneNumber'
            value={phoneNumber}
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
            value={email}
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
          onClick={() => addClientRequestHandler()}
        >
          Сохранить заявку
        </Button>
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs={6} container>
          <Typography variant='h4'>
            Вы можете оставить заявку на сайте, либо позвоните нам по телефонам:
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

AddNewClientRequest.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAllOperatorCode: PropTypes.func.isRequired,
  addClientRequest: PropTypes.func.isRequired,
  phoneOperator: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  phoneOperator: state.phoneOperator
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAllOperatorCode,
  addClientRequest
})(AddNewClientRequest);
