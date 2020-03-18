import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import {
  getAllOperatorCode,
  deleteOperatorCode
} from '../../../store/actions/accountant/referenceData/phoneOperator';

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

const TypeOf_Unit_List = ({
  setNameOfPage,
  getAllOperatorCode,
  deleteOperatorCode,
  phoneOperator: { operatorCodes, loading }
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Список кодов операторов');
    getAllOperatorCode();
  }, [setNameOfPage, getAllOperatorCode]);

  const deleteItem = itemId => {
    deleteOperatorCode(itemId);
    window.location.reload();
  };

  const listOf_PHONE_OPERATORS = (
    <List className={classes.list}>
      {loading ? (
        <Spinner />
      ) : (
        operatorCodes.map(item => (
          <ListItem key={item._id} className={classes.listItem}>
            <Grid container className={classes.root}>
              <Grid item xs={8}>
                <Typography align='center'>{item.operatorCode}</Typography>
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
                  href={`/accountant/phone-operator/${item._id}`}
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
        href={`/accountant/phone-operator/add`}
        className={classes.btnAdd}
      >
        <PlusOneIcon className={classes.btnAddIcon} />
      </IconButton>
      <Grid item xs={12}>
        {listOf_PHONE_OPERATORS}
      </Grid>
    </Grid>
  );
};

TypeOf_Unit_List.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAllOperatorCode: PropTypes.func.isRequired,
  deleteOperatorCode: PropTypes.func.isRequired,
  phoneOperator: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  phoneOperator: state.phoneOperator
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAllOperatorCode,
  deleteOperatorCode
})(TypeOf_Unit_List);
