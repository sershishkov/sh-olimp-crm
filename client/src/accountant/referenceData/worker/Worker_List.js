import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import {
  getAll_WORKERS,
  delete_WORKER
} from '../../../store/actions/accountant/referenceData/worker';

import Spinner from '../../../shared/spinner/Spinner';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  btnAdd: {
    position: 'fixed',
    top: 50,
    left: 50,
    zIndex: 5
  },
  btnAddIcon: {
    width: 50,
    height: 50
  },
  rowItem: {
    // border: '1px solid red',
    justifyItems: 'center',
    alignItems: 'center'
  },
  rowItemDate: {
    fontSize: '0.85rem',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  }
}));

const Worker_List = ({
  setNameOfPage,
  getAll_WORKERS,
  delete_WORKER,
  worker: { arr_WORKERS, loading }
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Список работников');
    getAll_WORKERS();
  }, [setNameOfPage, getAll_WORKERS]);

  const deleteItem = itemId => {
    delete_WORKER(itemId);
    window.location.reload();
  };

  const listOf_WORKERS = (
    <List className={classes.list}>
      {loading ? (
        <Spinner />
      ) : (
        arr_WORKERS.map(item => (
          <ListItem key={item._id} className={classes.listItem}>
            <Grid container className={classes.root}>
              <Grid item xs={12} container className={classes.row}>
                <Grid item xs={3} className={classes.rowItem} container>
                  <Typography align='center'>{item.surname}</Typography>
                </Grid>
                <Grid item xs={3} className={classes.rowItem} container>
                  <Typography align='center'>{item.name}</Typography>
                </Grid>
                <Grid item xs={3} className={classes.rowItem} container>
                  <Typography align='center'>{item.middleName}</Typography>
                </Grid>
                <Grid item xs={1} className={classes.rowItem} container>
                  <Typography align='center' className={classes.rowItemDate}>
                    <Moment format='DD/MM/YYYY'>{item.dateOf_Birth}</Moment>
                  </Typography>
                </Grid>
                <Grid item xs={1} className={classes.rowItem} container>
                  <IconButton
                    color='secondary'
                    variant='contained'
                    onClick={() => deleteItem(item._id)}
                    className={classes.buttonDelete}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>

                <Grid item xs={1} className={classes.rowItem} container>
                  <IconButton
                    color='primary'
                    variant='contained'
                    href={`/accountant/worker/${item._id}`}
                    className={classes.buttonDelete}
                  >
                    <EditIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </ListItem>
        ))
      )}
    </List>
  );

  return (
    <Grid container className={classes.root}>
      <IconButton
        variant='contained'
        color='secondary'
        href={`/accountant/worker/add`}
        className={classes.btnAdd}
      >
        <PlusOneIcon className={classes.btnAddIcon} />
      </IconButton>
      <Grid item xs={12}>
        {listOf_WORKERS}
      </Grid>
    </Grid>
  );
};

Worker_List.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAll_WORKERS: PropTypes.func.isRequired,
  delete_WORKER: PropTypes.func.isRequired,
  worker: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  worker: state.worker
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAll_WORKERS,
  delete_WORKER
})(Worker_List);
