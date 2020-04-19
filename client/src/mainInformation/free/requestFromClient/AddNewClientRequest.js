import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IMask from 'imask';

import { setNameOfPage } from '../../../store/actions/nameOfPage';
import { addClientRequest } from '../../../store/actions/mainInformation/free/clientRequests';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
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

const AddNewClientRequest = ({ setNameOfPage, addClientRequest }) => {
  const classes = useStyles();
  const history = useHistory();

  const buttonBackHandler = () => {
    history.push('/request-from-client');
  };

  const [pageForm, setPageForm] = useState({
    clientName: '',
    requestFromClient: '',
    phoneNumber: '',
    email: ''
  });

  const [disabledForm, setDisabledForm] = useState(true);
  const { clientName, requestFromClient, phoneNumber, email } = pageForm;

  useEffect(() => {
    setNameOfPage('Создать заявку');
  }, [setNameOfPage]);

  const onChangeHandler = e => {
    setPageForm({ ...pageForm, [e.target.name]: e.target.value });
    // console.log(e.target.value);
    setDisabledForm(
      !(clientName && requestFromClient && (phoneNumber || email))
    );
  };

  const addClientRequestHandler = () => {
    addClientRequest(clientName, requestFromClient, phoneNumber, email);
    history.push('/request-from-client');
  };
  const onInputPhoneHandler = e => {
    const inputMaskOptions = {
      mask: '+{38}(000)000-00-00'
    };
    IMask(e.target, inputMaskOptions);
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
        <Grid item xs={6}>
          <TextField
            variant='outlined'
            type='tel'
            fullWidth
            placeholder='телефон'
            name='phoneNumber'
            value={phoneNumber}
            onInput={e => onInputPhoneHandler(e)}
            onChange={e => onChangeHandler(e)}
          />
        </Grid>
        <Grid item xs={6}>
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
  addClientRequest: PropTypes.func.isRequired
};

export default connect(null, {
  setNameOfPage,
  addClientRequest
})(AddNewClientRequest);
