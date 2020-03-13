import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import { connect } from 'react-redux';
import { setNameOfPage } from '../store/actions/nameOfPage';
import {
  getAllClientRequest,
  deleteClientRequest
} from '../store/actions/clientRequests';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Spinner from '../shared/spinner/Spinner';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    marginTop: '7rem'
  },
  btnAddRequest: {
    position: 'fixed',
    top: '5rem',
    left: '2rem'
  },
  list: {
    width: '100%'
    // border: '1px solid red'
  },
  listItem: {
    width: '100%'
    // border: '1px solid green'
  },
  displayFlex: {
    display: 'flex'
  },
  displayBlock: {
    display: 'block'
  },
  displayNone: {
    display: 'none'
  }
}));

const ListOfClientsRequests = ({
  auth: { user },
  setNameOfPage,
  getAllClientRequest,
  deleteClientRequest,
  clientRequests: { clientRequests, loading }
}) => {
  const classes = useStyles();

  const deleteBtnHandler = id => {
    deleteClientRequest(id);
    window.location.reload();
  };

  useEffect(() => {
    setNameOfPage('Заявки');
    getAllClientRequest();
  }, [setNameOfPage, getAllClientRequest]);
  return loading ? (
    <Spinner />
  ) : (
    <Grid container className={classes.root}>
      <Button
        href='/request-from-client-add'
        color='secondary'
        variant='contained'
        className={classes.btnAddRequest}
      >
        Оставить заявку
      </Button>

      <List className={classes.list}>
        {clientRequests.map(item => (
          <ListItem key={item._id} className={classes.listItem}>
            <Grid
              container
              flexdirextion='column'
              justify='flex-start'
              alignItems='center'
            >
              <Grid
                item
                xs={12}
                container
                justify='space-between'
                alignItems='center'
              >
                <Grid item xs={6}>
                  <Typography variant='h6' align='left'>
                    {item.clientName}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='h6' align='right'>
                    <Moment format='DD/MM/YYYY/hh:mm'>{item.createdAt}</Moment>{' '}
                  </Typography>
                </Grid>
              </Grid>

              <Grid item xs={12} container>
                <Grid item xs={12}>
                  <Typography variant='body1'>
                    {item.requestFromClient}
                  </Typography>
                </Grid>
              </Grid>

              <Grid
                item
                xs={12}
                container
                className={
                  user && (user._id === item.creator || user.role === 'admin')
                    ? classes.displayFlex
                    : classes.displayNone
                }
              >
                <Grid item xs={6}>
                  <Typography variant='h6' align='center'>
                    тел: {item.operatorCode.operatorCode} {item.phoneNumber}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='h6' align='center'>
                    email : {item.email}
                  </Typography>
                </Grid>
              </Grid>

              <Grid item xs={12} container>
                <Grid
                  item
                  xs={6}
                  className={
                    user && (user._id === item.creator || user.role === 'admin')
                      ? classes.displayFlex
                      : classes.displayNone
                  }
                >
                  <Button
                    variant='contained'
                    fullWidth
                    color='secondary'
                    onClick={() => deleteBtnHandler(item._id)}
                  >
                    Удалить
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={6}
                  className={
                    user && (user._id === item.creator || user.role === 'admin')
                      ? classes.displayFlex
                      : classes.displayNone
                  }
                >
                  <Button
                    variant='contained'
                    fullWidth
                    color='primary'
                    href={`/request-from-client-edit/${item._id}`}
                  >
                    Редактировать
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

ListOfClientsRequests.propTypes = {
  auth: PropTypes.object.isRequired,
  clientRequests: PropTypes.object.isRequired,
  setNameOfPage: PropTypes.func.isRequired,
  getAllClientRequest: PropTypes.func.isRequired,
  deleteClientRequest: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  clientRequests: state.clientRequests
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAllClientRequest,
  deleteClientRequest
})(ListOfClientsRequests);
