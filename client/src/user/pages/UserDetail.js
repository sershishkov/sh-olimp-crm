import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  updatedetails,
  updatepassword,
  logout
} from '../../store/actions/auth';

import Spinner from '../../shared/spinner/Spinner';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const UserDetail = ({ user, updatedetails, updatepassword, logout }) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: ''
  });

  const { name, email, currentPassword, newPassword } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const changeDetailsHandler = async e => {
    e.preventDefault();
    updatedetails(name, email);
    logout();
  };

  const changePasswordHandler = async e => {
    e.preventDefault();
    updatepassword(currentPassword, newPassword);
    logout();
  };

  useEffect(() => {
    if (user) {
      setFormData({ ...formData, name: user.name, email: user.email });
    }
  }, [user, formData]);

  return !user ? (
    <Spinner />
  ) : (
    <Container component='main' maxWidth='sm'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Моя страничка
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete='fname'
                type='text'
                name='name'
                variant='outlined'
                required
                fullWidth
                id='firstName'
                label='Новое Имя'
                autoFocus
                value={name}
                onChange={e => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                type='email'
                required
                fullWidth
                id='email'
                label='Новая Электронная почта'
                name='email'
                autoComplete='email'
                value={email}
                onChange={e => onChange(e)}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={e => changeDetailsHandler(e)}
          >
            Изменить детали
          </Button>
        </form>

        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='currentPassword'
                label='текуший пароль'
                type='password'
                id='currentPassword'
                autoComplete='current-password'
                value={currentPassword}
                onChange={e => onChange(e)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='newPassword'
                label='новый пароль'
                type='password'
                id='newPassword'
                autoComplete='current-password'
                value={newPassword}
                onChange={e => onChange(e)}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            onClick={e => changePasswordHandler(e)}
          >
            Изменить пароль
          </Button>
        </form>
      </div>
    </Container>
  );
};

UserDetail.propTypes = {
  logout: PropTypes.func.isRequired,
  updatedetails: PropTypes.func.isRequired,
  updatepassword: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, {
  updatedetails,
  updatepassword,
  logout
})(UserDetail);
