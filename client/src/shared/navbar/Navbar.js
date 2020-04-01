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
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';

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
  },
  nestedListLevel1: {
    // border: '1px solid red',
    paddingLeft: 10
  },
  nestedListItemLevel1: {
    // border: '1px solid green'
  },
  nestedListLevel2: {
    // border: '1px solid blue',
    paddingLeft: 10
  },
  nestedListItemLevel2: {
    // border: '1px solid black'
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

  const [openAccountant, setOpenAccountant] = useState(false);
  const [openEnteredMainData, setOpenEnteredMainData] = useState(false);
  const [openOurMainData, setOpenOurMainData] = useState(false);
  const [openReferenceData, setOpenReferenceData] = useState(false);
  const [openReports, setOpenReports] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const openAccountantHandler = () => {
    setOpenAccountant(!openAccountant);
  };

  const openEnteredMainDataHandler = () => {
    setOpenEnteredMainData(!openEnteredMainData);
  };

  const openOurMainDataHandler = () => {
    setOpenOurMainData(!openOurMainData);
  };

  const openReferenceDataHandler = () => {
    setOpenReferenceData(!openReferenceData);
  };

  const openReportsHandler = () => {
    setOpenReports(!openReports);
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
          onClick={() => {
            history.push('/user-detail');
            setMobileOpen(!mobileOpen);
          }}
          className={
            isAuthenticated ? classes.displayFlex : classes.displayNone
          }
        >
          {user && <Avatar src={user.myAvatar} className={classes.myAvatar} />}
          <ListItemText>{userName}</ListItemText>
        </ListItem>
        <ListItem
          button
          onClick={() => {
            history.push('/register');
            setMobileOpen(!mobileOpen);
          }}
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
          onClick={() => {
            history.push('/login');
            setMobileOpen(!mobileOpen);
          }}
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
          onClick={() => {
            logoutHandler();
            setMobileOpen(!mobileOpen);
          }}
          className={
            isAuthenticated ? classes.displayFlex : classes.displayNone
          }
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText>Выход</ListItemText>
        </ListItem>
        <ListItem
          button
          onClick={() => {
            history.push('/aboutus');
            setMobileOpen(!mobileOpen);
          }}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText>О нас (контакты)</ListItemText>
        </ListItem>

        <ListItem
          button
          onClick={() => {
            history.push('/for-osbb');
            setMobileOpen(!mobileOpen);
          }}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText>Для ОСББ</ListItemText>
        </ListItem>
        <ListItem
          button
          onClick={() => {
            history.push('/for-individuals');
            setMobileOpen(!mobileOpen);
          }}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText>Для физ.лиц</ListItemText>
        </ListItem>
        <ListItem
          button
          onClick={() => {
            history.push('/request-from-client');
            setMobileOpen(!mobileOpen);
          }}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText>Оставить заявку</ListItemText>
        </ListItem>
        <ListItem
          button
          onClick={() => {
            history.push('/');
            setMobileOpen(!mobileOpen);
          }}
        >
          <ListItemIcon>
            <MailIcon />
          </ListItemIcon>
          <ListItemText>Главная</ListItemText>
        </ListItem>
      </List>
      <Divider />
      <ListItem
        button
        onClick={() => {
          history.push('/user-admin');
          setMobileOpen(!mobileOpen);
        }}
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
        onClick={() => {
          history.push('/editphoto');
          setMobileOpen(!mobileOpen);
        }}
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
        onClick={() => {
          history.push('/group-of-image');
          setMobileOpen(!mobileOpen);
        }}
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
          onClick={openAccountantHandler}
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText>Бухгалтерия</ListItemText>
          {openAccountant ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openAccountant} timeout='auto' unmountOnExit>
          <List className={classes.nestedListLevel1}>
            <ListItem
              button
              className={classes.nestedListItemLevel1}
              onClick={openEnteredMainDataHandler}
            >
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText>Входящие</ListItemText>
              {openEnteredMainData ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openEnteredMainData} timeout='auto' unmountOnExit>
              <List className={classes.nestedListLevel2}>
                <ListItem button className={classes.nestedListItemLevel2}>
                  <ListItemIcon>
                    <SubdirectoryArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText>АктВыпРабот</ListItemText>
                </ListItem>

                <ListItem button className={classes.nestedListItemLevel2}>
                  <ListItemIcon>
                    <SubdirectoryArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText>Счет Общий</ListItemText>
                </ListItem>

                <ListItem button className={classes.nestedListItemLevel2}>
                  <ListItemIcon>
                    <SubdirectoryArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText>Счет работы</ListItemText>
                </ListItem>

                <ListItem button className={classes.nestedListItemLevel2}>
                  <ListItemIcon>
                    <SubdirectoryArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText>Счет товар</ListItemText>
                </ListItem>

                <ListItem button className={classes.nestedListItemLevel2}>
                  <ListItemIcon>
                    <SubdirectoryArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText>Накладная</ListItemText>
                </ListItem>
              </List>
            </Collapse>
            <ListItem
              button
              className={classes.nestedListItemLevel1}
              onClick={openOurMainDataHandler}
            >
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText>Исходящие</ListItemText>
              {openOurMainData ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openOurMainData} timeout='auto' unmountOnExit>
              <List className={classes.nestedListLevel2}>
                <ListItem button className={classes.nestedListItemLevel2}>
                  <ListItemIcon>
                    <SubdirectoryArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText>АктВыпРабот</ListItemText>
                </ListItem>

                <ListItem button className={classes.nestedListItemLevel2}>
                  <ListItemIcon>
                    <SubdirectoryArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText>Счет Общий</ListItemText>
                </ListItem>

                <ListItem button className={classes.nestedListItemLevel2}>
                  <ListItemIcon>
                    <SubdirectoryArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText>Счет товары</ListItemText>
                </ListItem>

                <ListItem button className={classes.nestedListItemLevel2}>
                  <ListItemIcon>
                    <SubdirectoryArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText>Счет работы</ListItemText>
                </ListItem>

                <ListItem
                  button
                  className={classes.nestedListItemLevel2}
                  onClick={() => {
                    history.push('/accountant/our-service-invoice-nakl');
                    setMobileOpen(!mobileOpen);
                  }}
                >
                  <ListItemIcon>
                    <SubdirectoryArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText>Накладные</ListItemText>
                </ListItem>

                <ListItem
                  button
                  className={classes.nestedListItemLevel2}
                  onClick={() => {
                    history.push('/accountant/our-workers-salary');
                    setMobileOpen(!mobileOpen);
                  }}
                >
                  <ListItemIcon>
                    <SubdirectoryArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText>Зарплата</ListItemText>
                </ListItem>

                <ListItem button className={classes.nestedListItemLevel2}>
                  <ListItemIcon>
                    <SubdirectoryArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText>ПриходыБанк</ListItemText>
                </ListItem>

                <ListItem button className={classes.nestedListItemLevel2}>
                  <ListItemIcon>
                    <SubdirectoryArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText>Платежи</ListItemText>
                </ListItem>
              </List>
            </Collapse>

            <ListItem
              button
              className={classes.nestedListItemLevel1}
              onClick={openReferenceDataHandler}
            >
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText>Справочники</ListItemText>
              {openReferenceData ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={openReferenceData} timeout='auto' unmountOnExit>
              <List className={classes.nestedListLevel2}>
                <ListItem
                  button
                  className={classes.nestedListItemLevel2}
                  onClick={() => {
                    history.push('/accountant/bankname');
                    setMobileOpen(!mobileOpen);
                  }}
                >
                  <ListItemIcon>
                    <SubdirectoryArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText>Банки</ListItemText>
                </ListItem>

                <ListItem
                  button
                  className={classes.nestedListItemLevel2}
                  onClick={() => {
                    history.push('/accountant/client');
                    setMobileOpen(!mobileOpen);
                  }}
                >
                  <ListItemIcon>
                    <SubdirectoryArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText>Клиенты</ListItemText>
                </ListItem>

                <ListItem
                  button
                  className={classes.nestedListItemLevel2}
                  onClick={() => {
                    history.push('/accountant/personposition');
                    setMobileOpen(!mobileOpen);
                  }}
                >
                  <ListItemIcon>
                    <SubdirectoryArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText>Должности</ListItemText>
                </ListItem>

                <ListItem
                  button
                  className={classes.nestedListItemLevel2}
                  onClick={() => {
                    history.push('/accountant/group-of-product');
                    setMobileOpen(!mobileOpen);
                  }}
                >
                  <ListItemIcon>
                    <SubdirectoryArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText>Группы товаров</ListItemText>
                </ListItem>

                <ListItem
                  button
                  className={classes.nestedListItemLevel2}
                  onClick={() => {
                    history.push('/accountant/group-of-servicejob');
                    setMobileOpen(!mobileOpen);
                  }}
                >
                  <ListItemIcon>
                    <SubdirectoryArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText>Группы работ</ListItemText>
                </ListItem>

                <ListItem
                  button
                  className={classes.nestedListItemLevel2}
                  onClick={() => {
                    history.push('/accountant/our-firm');
                    setMobileOpen(!mobileOpen);
                  }}
                >
                  <ListItemIcon>
                    <SubdirectoryArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText>Наши фирмы</ListItemText>
                </ListItem>

                <ListItem
                  button
                  className={classes.nestedListItemLevel2}
                  onClick={() => {
                    history.push('/accountant/product');
                    setMobileOpen(!mobileOpen);
                  }}
                >
                  <ListItemIcon>
                    <SubdirectoryArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText>Товары</ListItemText>
                </ListItem>

                <ListItem
                  button
                  className={classes.nestedListItemLevel2}
                  onClick={() => {
                    history.push('/accountant/service-job');
                    setMobileOpen(!mobileOpen);
                  }}
                >
                  <ListItemIcon>
                    <SubdirectoryArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText>Работы</ListItemText>
                </ListItem>

                <ListItem
                  button
                  className={classes.nestedListItemLevel2}
                  onClick={() => {
                    history.push('/accountant/supplier');
                    setMobileOpen(!mobileOpen);
                  }}
                >
                  <ListItemIcon>
                    <SubdirectoryArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText>Поставщики</ListItemText>
                </ListItem>

                <ListItem
                  button
                  className={classes.nestedListItemLevel2}
                  onClick={() => {
                    history.push('/accountant/type-of-acts-on-basis-of');
                    setMobileOpen(!mobileOpen);
                  }}
                >
                  <ListItemIcon>
                    <SubdirectoryArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText>ДейстНаОсновании</ListItemText>
                </ListItem>

                <ListItem
                  button
                  className={classes.nestedListItemLevel2}
                  onClick={() => {
                    history.push('/accountant/type-of-firm');
                    setMobileOpen(!mobileOpen);
                  }}
                >
                  <ListItemIcon>
                    <SubdirectoryArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText>ТипыФирм</ListItemText>
                </ListItem>

                <ListItem
                  button
                  className={classes.nestedListItemLevel2}
                  onClick={() => {
                    history.push('/accountant/oblast');
                    setMobileOpen(!mobileOpen);
                  }}
                >
                  <ListItemIcon>
                    <SubdirectoryArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText>Области</ListItemText>
                </ListItem>

                <ListItem
                  button
                  className={classes.nestedListItemLevel2}
                  onClick={() => {
                    history.push('/accountant/rayon');
                    setMobileOpen(!mobileOpen);
                  }}
                >
                  <ListItemIcon>
                    <SubdirectoryArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText>Районы</ListItemText>
                </ListItem>

                <ListItem
                  button
                  className={classes.nestedListItemLevel2}
                  onClick={() => {
                    history.push('/accountant/type-of-settlement');
                    setMobileOpen(!mobileOpen);
                  }}
                >
                  <ListItemIcon>
                    <SubdirectoryArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText>ТипНасПункта</ListItemText>
                </ListItem>

                <ListItem
                  button
                  className={classes.nestedListItemLevel2}
                  onClick={() => {
                    history.push('/accountant/city');
                    setMobileOpen(!mobileOpen);
                  }}
                >
                  <ListItemIcon>
                    <SubdirectoryArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText>Города</ListItemText>
                </ListItem>

                <ListItem
                  button
                  className={classes.nestedListItemLevel2}
                  onClick={() => {
                    history.push('/accountant/type-of-street');
                    setMobileOpen(!mobileOpen);
                  }}
                >
                  <ListItemIcon>
                    <SubdirectoryArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText>ТипУлицы</ListItemText>
                </ListItem>
                <ListItem
                  button
                  className={classes.nestedListItemLevel2}
                  onClick={() => {
                    history.push('/accountant/street');
                    setMobileOpen(!mobileOpen);
                  }}
                >
                  <ListItemIcon>
                    <SubdirectoryArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText>Улицы</ListItemText>
                </ListItem>

                <ListItem
                  button
                  className={classes.nestedListItemLevel2}
                  onClick={() => {
                    history.push('/accountant/type-of-tax-payer-on');
                    setMobileOpen(!mobileOpen);
                  }}
                >
                  <ListItemIcon>
                    <SubdirectoryArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText>Налогооблажение</ListItemText>
                </ListItem>

                <ListItem
                  button
                  className={classes.nestedListItemLevel2}
                  onClick={() => {
                    history.push('/accountant/type-of-unit');
                    setMobileOpen(!mobileOpen);
                  }}
                >
                  <ListItemIcon>
                    <SubdirectoryArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText>Группа ЕдИзмерения</ListItemText>
                </ListItem>

                <ListItem
                  button
                  className={classes.nestedListItemLevel2}
                  onClick={() => {
                    history.push('/accountant/unit');
                    setMobileOpen(!mobileOpen);
                  }}
                >
                  <ListItemIcon>
                    <SubdirectoryArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText>ЕдиницыИзмерения</ListItemText>
                </ListItem>

                <ListItem
                  button
                  className={classes.nestedListItemLevel2}
                  onClick={() => {
                    history.push('/accountant/type-of-expense');
                    setMobileOpen(!mobileOpen);
                  }}
                >
                  <ListItemIcon>
                    <SubdirectoryArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText>Тип расходов</ListItemText>
                </ListItem>

                <ListItem
                  button
                  className={classes.nestedListItemLevel2}
                  onClick={() => {
                    history.push('/accountant/worker');
                    setMobileOpen(!mobileOpen);
                  }}
                >
                  <ListItemIcon>
                    <SubdirectoryArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText>Работники</ListItemText>
                </ListItem>
              </List>
            </Collapse>

            <ListItem
              button
              className={classes.nestedListItemLevel1}
              onClick={openReportsHandler}
            >
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText>Отчеты</ListItemText>
              {openReports ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={openReports} timeout='auto' unmountOnExit>
              <List className={classes.nestedListLevel2}>
                <ListItem button className={classes.nestedListItemLevel2}>
                  <ListItemIcon>
                    <SubdirectoryArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText>Отчет1</ListItemText>
                </ListItem>

                <ListItem button className={classes.nestedListItemLevel2}>
                  <ListItemIcon>
                    <SubdirectoryArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText>Отчет2</ListItemText>
                </ListItem>

                <ListItem button className={classes.nestedListItemLevel2}>
                  <ListItemIcon>
                    <SubdirectoryArrowRightIcon />
                  </ListItemIcon>
                  <ListItemText>Отчет3</ListItemText>
                </ListItem>
              </List>
            </Collapse>
          </List>
        </Collapse>
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
            // onClick={handleDrawerToggle}
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
