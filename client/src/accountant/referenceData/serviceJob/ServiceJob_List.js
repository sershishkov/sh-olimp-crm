import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import {
  getAll_SERVICE_JOBS,
  delete_SERVICE_JOB
} from '../../../store/actions/accountant/referenceData/serviceJob';

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
  }
}));

const ServiceJob_List = ({
  getAll_SERVICE_JOBS,
  delete_SERVICE_JOB,
  serviceJob: { arr_SERVICE_JOBS, loading }
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Список видов работ');
    getAll_SERVICE_JOBS();
  }, [setNameOfPage, getAll_SERVICE_JOBS]);

  const deleteItem = itemId => {
    delete_SERVICE_JOB(itemId);
    window.location.reload();
  };

  const listOf_SERVICE_JOBS = (
    <List className={classes.list}>
      {loading ? (
        <Spinner />
      ) : (
        arr_SERVICE_JOBS.map(item => (
          <ListItem key={item._id} className={classes.listItem}>
            <Grid container className={classes.root}>
              <Grid item xs={4}>
                <Typography align='center'>{item.serviceName}</Typography>
              </Grid>

              <Grid item xs={2}>
                <Typography align='center'>
                  {item.unit.unitNameShort}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography align='center'>
                  {item.serviceJobGroup.serviceJobGroup}
                </Typography>
              </Grid>

              <Grid item xs={1}>
                <IconButton
                  color='secondary'
                  variant='contained'
                  onClick={() => deleteItem(item._id)}
                  className={classes.buttonDelete}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>

              <Grid item xs={1}>
                <IconButton
                  color='primary'
                  variant='contained'
                  href={`/accountant/service-job/${item._id}`}
                  className={classes.buttonDelete}
                >
                  <EditIcon />
                </IconButton>
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
        href={`/accountant/service-job/add`}
        className={classes.btnAdd}
      >
        <PlusOneIcon className={classes.btnAddIcon} />
      </IconButton>
      <Grid item xs={12}>
        {listOf_SERVICE_JOBS}
      </Grid>
    </Grid>
  );
};

ServiceJob_List.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAll_SERVICE_JOBS: PropTypes.func.isRequired,
  delete_SERVICE_JOB: PropTypes.func.isRequired,
  serviceJob: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  serviceJob: state.serviceJob
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAll_SERVICE_JOBS,
  delete_SERVICE_JOB
})(ServiceJob_List);
