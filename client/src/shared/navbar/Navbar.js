import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../store/actions/auth';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const Navbar = ({ isAuthenticated, logout, user }) => {
  const classes = useStyles();
  const [userName, setUserName] = useState(null);

  const logoutHandler = () => {
    logout();
  };

  useEffect(() => {
    if (user) {
      setUserName(user.name);
    }
  }, [user]);

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            <Button color='inherit' href='/'>
              ОЛИМП-ДС
            </Button>
          </Typography>

          {isAuthenticated && (
            <Button color='inherit' href='/dashboard'>
              Рабочий стол
            </Button>
          )}
          {!isAuthenticated && (
            <Button color='inherit' href='/login'>
              Вход
            </Button>
          )}
          {!isAuthenticated && (
            <Button color='inherit' href='/register'>
              Регистрация
            </Button>
          )}
          {isAuthenticated && (
            <Button color='inherit' href='/user-detail'>
              Привет {userName}
            </Button>
          )}
          {isAuthenticated && (
            <Button color='inherit' onClick={logoutHandler}>
              Выход
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func.isRequired,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, { logout })(Navbar);
