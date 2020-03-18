import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import {
  getAll_BANK_NAMES,
  delete_BANK_NAME
} from '../../../store/actions/accountant/referenceData/bankName';

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

const BankName_List = ({
  setNameOfPage,
  getAll_BANK_NAMES,
  delete_BANK_NAME,
  bankName: { arr_BANK_NAMES, loading }
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Список банков');
    getAll_BANK_NAMES();
  }, [setNameOfPage, getAll_BANK_NAMES]);

  const deleteItem = itemId => {
    delete_BANK_NAME(itemId);
    window.location.reload();
  };

  const listOf_BANK_NAMES = (
    <List className={classes.list}>
      {loading ? (
        <Spinner />
      ) : (
        arr_BANK_NAMES.map(item => (
          <ListItem key={item._id} className={classes.listItem}>
            <Grid container className={classes.root}>
              <Grid item xs={4}>
                <Typography align='center'>{item.bankName}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography align='center'>{item.mfo}</Typography>
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
                  href={`/accountant/bankname/${item._id}`}
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
        href={`/accountant/bankname/add`}
        className={classes.btnAdd}
      >
        <PlusOneIcon className={classes.btnAddIcon} />
      </IconButton>
      <Grid item xs={12}>
        {listOf_BANK_NAMES}
      </Grid>
    </Grid>
  );
};

BankName_List.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAll_BANK_NAMES: PropTypes.func.isRequired,
  delete_BANK_NAME: PropTypes.func.isRequired,
  bankName: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  bankName: state.bankName
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAll_BANK_NAMES,
  delete_BANK_NAME
})(BankName_List);
