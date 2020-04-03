import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addUser } from '../../store/actions/user/admin/users';
import { setNameOfPage } from '../../store/actions/nameOfPage';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  displayFlex: {
    display: 'flex',
    position: 'absolute',
    top: 20,
    left: 15
  },
  displayNone: {
    display: 'none'
  },

  wrapSelect: {
    position: 'relative'
  },
  select: {
    height: 55
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

  return (
    <Grid container direction='column' className={classes.root}>
      <Grid item xs={12}>
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
      <Grid item xs={12}>
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

      <Grid item xs={12} className={classes.wrapSelect}>
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
          <MenuItem value='user'>Пользователь</MenuItem>
          <MenuItem value='osbb'>ОСББ</MenuItem>
          <MenuItem value='engineer'>Инженер</MenuItem>
          <MenuItem value='accountant'>Бухгалтер</MenuItem>
          <MenuItem value='boss'>Босс</MenuItem>
        </Select>
      </Grid>
      <Grid item xs={12}>
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
