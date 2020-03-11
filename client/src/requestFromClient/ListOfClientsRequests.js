import React, { useState, useEffect } from 'react';
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
    display: 'flex'
  },
  btnAddRequest: {
    position: 'fixed',
    top: '5rem',
    left: '2rem'
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
        className={classes.btnAddRequest}
      >
        Оставить заявку
      </Button>

      <List>
        {clientRequests.map(item => (
          <ListItem key={item._id}>
            <Grid container>
              <Grid item xs={12} container justify='space-between'>
                <Grid item xs={6}>
                  <Typography variant='h6'>{item.clientName}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='h6'>
                    {' '}
                    <Moment format='DD/MM/YYYY'>{item.createdAt}</Moment>{' '}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} container>
                <Grid item xs={8}>
                  <Typography variant='body1'>
                    {item.requestFromClient}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    color='secondary'
                    onClick={() => deleteBtnHandler(item._id)}
                  >
                    Удалить
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  <Button
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
