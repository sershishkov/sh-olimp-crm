import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { logout } from '../../store/actions/auth';
import ourLogo from '../img/LogotipDS.PNG';

import myGif from '../img/Обсуждаем.gif';
import myGif2 from '../img/kladka_kirpich.gif';

import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {},
  displayNone: {
    display: 'none'
  },
  displayBlock: {
    display: 'block'
  },
  displayFlex: {
    display: 'flex'
  },

  drawerPaper: {
    width: drawerWidth
  },
  myAvatar: {
    width: 30,
    height: 30,
    marginRight: '1rem'
  },
  wrapMenuLogo: {
    // border: '1px solid red'
  },
  logotip: {
    width: '75px'
  },
  nameOfPage: {
    // border: '1px solid green',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  wrapPhonesCont1: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  wrapPhonesCont2: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  phones: {
    fontSize: '0.9rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.9rem'
    }
  },
  myGif: {
    position: 'fixed',
    top: '4rem',
    right: '2rem',
    width: 50,
    height: 50,

    '& img': {
      width: '100%',
      objectFit: 'cover'
    }
  },
  myGif2: {
    position: 'fixed',
    top: '4rem',
    left: '2rem',
    width: 50,
    height: 50,
    display: 'none',
    '& img': {
      width: '100%',
      objectFit: 'cover'
    }
  }
}));

const ResponsiveDrawer = ({
  auth: { isAuthenticated, user },
  logout,
  pageName
}) => {
  let history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userName, setUserName] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logoutHandler = () => {
    logout();
  };

  useEffect(() => {
    if (user) {
      setUserName(user.name);
    }
  }, [user, setUserName]);

  const drawer = (
    <div className={classes.toolbar}>
      <Divider />
      <List>
        <ListItem
          button
          onClick={() => history.push('/user-detail')}
          className={
            isAuthenticated ? classes.displayFlex : classes.displayNone
          }
        >
          {user && <Avatar src={user.myAvatar} className={classes.myAvatar} />}
          <ListItemText>{userName}</ListItemText>
        </ListItem>
        <ListItem
          button
          onClick={() => history.push('/register')}
          className={
            !isAuthenticated ? classes.displayFlex : classes.displayNone
          }
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText>регистрация</ListItemText>
        </ListItem>

        <ListItem
          button
          onClick={() => history.push('/login')}
          className={
            !isAuthenticated ? classes.displayFlex : classes.displayNone
          }
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText>Вход</ListItemText>
        </ListItem>
        <ListItem
          button
          onClick={logoutHandler}
          className={
            isAuthenticated ? classes.displayFlex : classes.displayNone
          }
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText>Выход</ListItemText>
        </ListItem>
        <ListItem button onClick={() => history.push('/aboutus')}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText>О нас (контакты)</ListItemText>
        </ListItem>

        <ListItem button onClick={() => history.push('/for-osbb')}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText>Для ОСББ</ListItemText>
        </ListItem>
        <ListItem button onClick={() => history.push('/for-individuals')}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText>Для физ.лиц</ListItemText>
        </ListItem>
        <ListItem button onClick={() => history.push('/request-from-client')}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText>Оставить заявку</ListItemText>
        </ListItem>
        <ListItem button onClick={() => history.push('/')}>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText>Главная</ListItemText>
        </ListItem>
      </List>
      <Divider />
      <ListItem
        button
        onClick={() => history.push('/user-admin')}
        className={
          isAuthenticated && user.role === 'admin'
            ? classes.displayFlex
            : classes.displayNone
        }
      >
        <ListItemIcon>
          <MailIcon />
        </ListItemIcon>
        <ListItemText>Админка</ListItemText>
      </ListItem>
      <ListItem
        button
        onClick={() => history.push('/editphoto')}
        className={
          isAuthenticated && (user.role === 'boss' || user.role === 'admin')
            ? classes.displayFlex
            : classes.displayNone
        }
      >
        <ListItemIcon>
          <MailIcon />
        </ListItemIcon>
        <ListItemText>РедактФото</ListItemText>
      </ListItem>
      <ListItem
        button
        onClick={() => history.push('/group-of-image')}
        className={
          isAuthenticated && (user.role === 'boss' || user.role === 'admin')
            ? classes.displayFlex
            : classes.displayNone
        }
      >
        <ListItemIcon>
          <MailIcon />
        </ListItemIcon>
        <ListItemText>РедактГруппыФото</ListItemText>
      </ListItem>
      <List>
        <ListItem
          button
          className={
            isAuthenticated &&
            (user.role === 'boss' ||
              user.role === 'admin' ||
              user.role === 'engineer')
              ? classes.displayFlex
              : classes.displayNone
          }
        >
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText>Расчеты</ListItemText>
        </ListItem>
        <ListItem
          button
          className={
            isAuthenticated &&
            (user.role === 'boss' ||
              user.role === 'admin' ||
              user.role === 'accountant')
              ? classes.displayFlex
              : classes.displayNone
          }
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText>Бухгалтерия</ListItemText>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Grid className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar} color='default'>
        <Toolbar>
          <div className={classes.myGif}>
            <img src={myGif} alt='myGif' />
          </div>
          <div className={classes.myGif2}>
            <img src={myGif2} alt='myGif2' />
          </div>
          <Grid
            container
            justify='space-between'
            alignItems='center'
            spacing={2}
          >
            <Grid
              container
              item
              md={4}
              sm={6}
              justify='space-between'
              alignItems='center'
              className={classes.wrapMenuLogo}
            >
              <Grid item xs={6}>
                <Button
                  color='inherit'
                  aria-label='open drawer'
                  onClick={handleDrawerToggle}
                >
                  меню
                </Button>
              </Grid>

              <Grid item xs={6}>
                <Button color='inherit' href='/' className={classes.logotip}>
                  <img
                    src={ourLogo}
                    className={classes.logotip}
                    alt='Logotip'
                  />
                </Button>
              </Grid>
            </Grid>

            <Grid
              container
              item
              md={4}
              justify='center'
              spacing={2}
              className={classes.nameOfPage}
            >
              <Grid item xs={12}>
                <Typography
                  color='inherit'
                  component='h4'
                  variant='h5'
                  align='center'
                >
                  {pageName}
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              item
              md={4}
              sm={6}
              justify='space-around'
              spacing={2}
              alignItems='center'
              className={classes.wrapPhones}
            >
              <Grid
                item
                xs={6}
                container
                flexdirextion='column'
                className={classes.wrapPhonesCont1}
              >
                <Grid item xs={12}>
                  <Typography
                    variant='body1'
                    align='center'
                    className={classes.phones}
                  >
                    +38 098 310 47 99
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant='body1'
                    align='center'
                    className={classes.phones}
                  >
                    +38 067 618 30 60
                  </Typography>
                </Grid>
              </Grid>

              <Grid
                item
                xs={6}
                container
                flexdirextion='column'
                className={classes.wrapPhonesCont2}
              >
                <Grid item xs={12}>
                  <Typography
                    variant='body1'
                    align='center'
                    className={classes.phones}
                  >
                    +38 099 180 98 04
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant='body1'
                    align='center'
                    className={classes.phones}
                  >
                    +38 050 227 96 50
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label='mailbox folders'>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation='css'>
          <Drawer
            variant='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            onClick={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </Grid>
  );
};

ResponsiveDrawer.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  pageName: PropTypes.string
};
const mapStateToProps = state => ({
  auth: state.auth,
  pageName: state.nameOfPage.pageName
});

export default connect(mapStateToProps, { logout })(ResponsiveDrawer);
