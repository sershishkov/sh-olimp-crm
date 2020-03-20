import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import {
  getAll_STREETS,
  delete_STREET
} from '../../../store/actions/accountant/referenceData/street';

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

const Street_List = ({
  setNameOfPage,
  getAll_STREETS,
  delete_STREET,
  street: { arr_STREETS, loading }
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Список улиц');
    getAll_STREETS();
  }, [setNameOfPage, getAll_STREETS]);

  const deleteItem = itemId => {
    delete_STREET(itemId);
    window.location.reload();
  };

  const listOf_STREETS = (
    <List className={classes.list}>
      {loading ? (
        <Spinner />
      ) : (
        arr_STREETS.map(item => (
          <ListItem key={item._id} className={classes.listItem}>
            <Grid container className={classes.root}>
              <Grid item xs={8}>
                <Typography align='center'>{item.streetName}</Typography>
              </Grid>

              <Grid item xs={2}>
                <IconButton
                  color='secondary'
                  variant='contained'
                  onClick={() => deleteItem(item._id)}
                  className={classes.buttonDelete}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>

              <Grid item xs={2}>
                <IconButton
                  color='primary'
                  variant='contained'
                  href={`/accountant/street/${item._id}`}
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
        href={`/accountant/street/add`}
        className={classes.btnAdd}
      >
        <PlusOneIcon className={classes.btnAddIcon} />
      </IconButton>
      <Grid item xs={12}>
        {listOf_STREETS}
      </Grid>
    </Grid>
  );
};

Street_List.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAll_STREETS: PropTypes.func.isRequired,
  delete_STREET: PropTypes.func.isRequired,
  street: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  street: state.street
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAll_STREETS,
  delete_STREET
})(Street_List);
