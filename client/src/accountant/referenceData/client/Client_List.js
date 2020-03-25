import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import {
  getAll_CLIENTS,
  delete_CLIENT
} from '../../../store/actions/accountant/referenceData/client';

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

const OurFirm_List = ({
  setNameOfPage,
  getAll_CLIENTS,
  delete_CLIENT,
  state_client: { arr_CLIENTS, loading }
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Список клиентов');
    getAll_CLIENTS();
  }, [setNameOfPage, getAll_CLIENTS]);

  const deleteItem = itemId => {
    delete_CLIENT(itemId);
    window.location.reload();
  };

  const listOf_CLIENTS = (
    <List className={classes.list}>
      {loading ? (
        <Spinner />
      ) : (
        arr_CLIENTS.map(item => (
          <ListItem key={item._id} className={classes.listItem}>
            <Grid container className={classes.root}>
              <Grid item xs={12} container className={classes.row}>
                <Grid item xs={3} className={classes.rowItem} container>
                  <Typography align='center'>
                    {item.typeOfFirm.TypeOf_FirmShort}
                  </Typography>
                </Grid>
                <Grid item xs={3} className={classes.rowItem} container>
                  <Typography align='center'>{item.firmName}</Typography>
                </Grid>
                <Grid item xs={3} className={classes.rowItem} container>
                  <Typography align='center'>
                    {item.firstPersonPosition.position}
                  </Typography>
                </Grid>
                <Grid item xs={1} className={classes.rowItem} container>
                  <Typography align='center'>{item.shortName}</Typography>
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
                    href={`/accountant/client/${item._id}`}
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
        href={`/accountant/client/add`}
        className={classes.btnAdd}
      >
        <PlusOneIcon className={classes.btnAddIcon} />
      </IconButton>
      <Grid item xs={12}>
        {listOf_CLIENTS}
      </Grid>
    </Grid>
  );
};

OurFirm_List.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAll_CLIENTS: PropTypes.func.isRequired,
  delete_CLIENT: PropTypes.func.isRequired,
  state_client: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  state_client: state.client
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAll_CLIENTS,
  delete_CLIENT
})(OurFirm_List);
