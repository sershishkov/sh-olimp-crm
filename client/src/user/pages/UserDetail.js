import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  updatedetails,
  updatepassword,
  changeAvatar,
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
  },
  spinner: {
    dosplay: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

const UserDetail = ({
  user,
  updatedetails,
  updatepassword,
  changeAvatar,
  logout
}) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    myAvatar: ''
  });

  const { name, email, currentPassword, newPassword, myAvatar } = formData;

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

  const pickedHandler = e => {
    e.preventDefault();
    setFormData({ ...formData, myAvatar: e.target.files[0] });
  };

  const changeAvatarHandler = e => {
    e.preventDefault();
    console.log(myAvatar);
    changeAvatar(myAvatar);
  };

  useEffect(() => {
    if (user) {
      setFormData({ ...formData, name: user.name, email: user.email });
    }
  }, [user, setFormData]);

  return !user ? (
    <div className={classes.spinner}>
      <Spinner />
    </div>
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
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name='myAvatar'
                accept='image/*'
                type='file'
                id='raised-button-file'
                style={{ display: 'none' }}
                onChange={e => pickedHandler(e)}
              />
              <label htmlFor='raised-button-file'>
                <Button
                  variant='contained'
                  component='span'
                  color='primary'
                  fullWidth
                  className={classes.button}
                >
                  Выбрать новое фото
                </Button>
              </label>
            </Grid>

            <Grid item xs={12}>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
                onClick={changeAvatarHandler}
              >
                Сохранить новое фото
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

UserDetail.propTypes = {
  logout: PropTypes.func.isRequired,
  updatedetails: PropTypes.func.isRequired,
  updatepassword: PropTypes.func.isRequired,
  changeAvatar: PropTypes.func.isRequired,
  user: PropTypes.object
};
const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, {
  updatedetails,
  updatepassword,
  changeAvatar,
  logout
})(UserDetail);
