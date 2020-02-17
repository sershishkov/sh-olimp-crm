import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../store/actions/auth';

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
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
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },

  drawerPaper: {
    width: drawerWidth
  }
}));

const ResponsiveDrawer = ({ isAuthenticated, logout, user }) => {
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
  }, [user]);

  const drawer = (
    <div className={classes.toolbar}>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText>О нас</ListItemText>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText>Наши работы</ListItemText>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText>Расчеты</ListItemText>
        </ListItem>
        <ListItem button>
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
              <Grid item xs={10}>
                <Button color='inherit' href='/'>
                  ОЛИМП-ДС
                </Button>
              </Grid>
            </Grid>
            <Grid container item xs={4} justify='center' spacing={2}>
              <Grid item xs={12}>
                {isAuthenticated && (
                  <Button color='inherit' href='/dashboard'>
                    Рабочий стол
                  </Button>
                )}
              </Grid>
            </Grid>
            <Grid container item xs={4} justify='space-between' spacing={2}>
              <Grid item xs={3}>
                {!isAuthenticated && (
                  <Button color='inherit' href='/login'>
                    Вход
                  </Button>
                )}
              </Grid>
              <Grid item xs={3}>
                {!isAuthenticated && (
                  <Button color='inherit' href='/register'>
                    Регистрация
                  </Button>
                )}
              </Grid>
              <Grid item xs={3}>
                {isAuthenticated && (
                  <Button color='inherit' href='/user-detail'>
                    {' '}
                    {userName}
                  </Button>
                )}
              </Grid>
              <Grid item xs={3}>
                {isAuthenticated && (
                  <Button color='inherit' onClick={logoutHandler}>
                    Выход
                  </Button>
                )}
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
  user: PropTypes.object
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, { logout })(ResponsiveDrawer);
