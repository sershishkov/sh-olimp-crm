import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { logout } from '../../store/actions/auth';

import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
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
  avatar: {
    marginRight: '1rem'
  }
}));

const ResponsiveDrawer = ({ isAuthenticated, logout, user, pageName }) => {
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
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText>Моя страница</ListItemText>
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
          <ListItemText>О нас</ListItemText>
        </ListItem>
        <ListItem button onClick={() => history.push('/')}>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText>Наши работы</ListItemText>
        </ListItem>
      </List>
      <Divider />
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
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar} color='default'>
        <Toolbar>
          <Grid
            container
            justify='space-between'
            alignItems='center'
            spacing={2}
          >
            <Grid
              container
              item
              xs={4}
              justify='flex-start'
              alignItems='center'
            >
              <Grid item xs={2}>
                <IconButton
                  color='inherit'
                  aria-label='open drawer'
                  onClick={handleDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
              <Hidden smDown>
                <Grid item xs={10}>
                  <Button color='inherit' href='/'>
                    ОЛИМП-ДС
                  </Button>
                </Grid>
              </Hidden>
            </Grid>
            <Hidden smDown>
              <Grid container item xs={4} justify='center' spacing={2}>
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
            </Hidden>
            <Hidden smDown>
              <Grid
                container
                item
                xs={4}
                justify='space-around'
                spacing={2}
                alignItems='center'
              >
                <Grid
                  item
                  xs={3}
                  className={
                    !isAuthenticated
                      ? classes.displayBlock
                      : classes.displayNone
                  }
                >
                  <Button color='inherit' href='/login'>
                    Вход
                  </Button>
                </Grid>

                <Grid
                  item
                  xs={3}
                  className={
                    !isAuthenticated
                      ? classes.displayBlock
                      : classes.displayNone
                  }
                >
                  <Button color='inherit' href='/register'>
                    Регистрация
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={3}
                  className={
                    isAuthenticated ? classes.displayBlock : classes.displayNone
                  }
                >
                  <Button color='inherit' href='/user-detail'>
                    {user && (
                      <Avatar className={classes.avatar} src={user.myAvatar} />
                    )}

                    {userName}
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={3}
                  className={
                    isAuthenticated ? classes.displayBlock : classes.displayNone
                  }
                >
                  <Button color='inherit' onClick={logoutHandler}>
                    Выход
                  </Button>
                </Grid>
              </Grid>
            </Hidden>
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
    </div>
  );
};

ResponsiveDrawer.propTypes = {
  isAuthenticated: PropTypes.bool,
  logout: PropTypes.func.isRequired,
  user: PropTypes.object,
  pageName: PropTypes.string
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  pageName: state.nameOfPage.pageName
});

export default connect(mapStateToProps, { logout })(ResponsiveDrawer);
