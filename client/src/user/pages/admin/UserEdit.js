import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getOneUser, updateUser } from '../../../store/actions/users';
import { setNameOfPage } from '../../../store/actions/nameOfPage';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Spinner from '../../../shared/spinner/Spinner';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  }
}));

const UserEdit = ({ getOneUser, updateUser, users: { oneUser, loading } }) => {
  const classes = useStyles();
  let history = useHistory();
  const { id } = useParams();
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
    getOneUser(id);
    if (oneUser.name && oneUser.email && oneUser.role) {
      setFormData({
        ...formData,
        name: oneUser.name,
        email: oneUser.email,
        role: oneUser.role
      });
    }
  }, [
    setNameOfPage,
    getOneUser,
    oneUser.name,
    oneUser.email,
    oneUser.role,
    id
  ]);

  const apdateUserHandler = () => {
    updateUser(id, { name, email, role, password });
    history.push('/user-admin');
  };
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setDisabledForm(!(name && email && role && password));
  };

  return loading ? (
    <Spinner />
  ) : (
    <Grid container direction='column' className={classes.root}>
      <Grid item xs={12}>
        <TextField
          variant='outlined'
          type='text'
          fullWidth
          placeholder='Введите новое имя'
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
          placeholder='Введите новый email'
          name='email'
          value={email}
          onChange={e => onChange(e)}
        />
      </Grid>

      <Grid item xs={12}>
        <Select
          // labelId='user-role-label'
          fullWidth
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
          placeholder='Введите новый пароль'
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
          onClick={apdateUserHandler}
        >
          Изменить пользователя
        </Button>
      </Grid>
    </Grid>
  );
};

UserEdit.propTypes = {
  getOneUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  users: state.users
});

export default connect(mapStateToProps, {
  getOneUser,
  updateUser
})(UserEdit);
