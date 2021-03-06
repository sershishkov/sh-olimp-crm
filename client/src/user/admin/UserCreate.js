import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addUser } from '../../store/actions/user/admin/users';
import { setNameOfPage } from '../../store/actions/nameOfPage';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    marginTop: '7.5rem'
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

const UserCreate = ({ addUser }) => {
  const classes = useStyles();
  let history = useHistory();
  const [disabledForm, setDisabledForm] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    password: ''
  });

  const { name, email, role, password } = formData;

  useEffect(() => {
    setNameOfPage('Создаем пользователя');
  }, []);

  const addUserHandler = () => {
    addUser({ name, email, role, password });
    history.push('/user-admin');
  };
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setDisabledForm(!(name && email && role && password));
  };

  const buttonBackHandler = () => {
    history.goBack();
    // history.push('/accountant/unit');
  };

  return (
    <Grid container direction='column' className={classes.root}>
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
          <Typography align='left'>Имя </Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            type='text'
            fullWidth
            placeholder='Введите имя'
            name='name'
            value={name}
            onChange={e => onChange(e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Почта </Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            type='email'
            fullWidth
            placeholder='Введите email'
            name='email'
            value={email}
            onChange={e => onChange(e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Роль </Typography>
        </Grid>
        <Grid item xs={8} container className={classes.wrapSelect}>
          <InputLabel
            id='user-role-label'
            className={role ? classes.displayNone : classes.displayFlex}
          >
            Выбрать роль
          </InputLabel>
          <Select
            labelId='user-role-label'
            fullWidth
            variant='outlined'
            name='role'
            value={role}
            onChange={e => onChange(e)}
          >
            <MenuItem value='admin'>Админ</MenuItem>
            <MenuItem value='user'>Пользователь</MenuItem>
            <MenuItem value='osbb'>ОСББ</MenuItem>
            <MenuItem value='engineer'>Инженер</MenuItem>
            <MenuItem value='accountant'>Бухгалтер</MenuItem>
            <MenuItem value='boss'>Босс</MenuItem>
          </Select>
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Пароль </Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            type='password'
            fullWidth
            placeholder='Введите пароль'
            name='password'
            value={password}
            onChange={e => onChange(e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Button
          variant='contained'
          fullWidth
          color='primary'
          disabled={disabledForm}
          onClick={addUserHandler}
        >
          Добавить пользователя
        </Button>
      </Grid>
    </Grid>
  );
};

UserCreate.propTypes = {
  addUser: PropTypes.func.isRequired
};

export default connect(null, {
  addUser
})(UserCreate);
