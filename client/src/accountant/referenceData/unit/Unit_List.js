import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import {
  getAll_UNITS,
  delete_UNIT
} from '../../../store/actions/accountant/referenceData/unit';

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

const Unit_List = ({
  setNameOfPage,
  getAll_UNITS,
  delete_UNIT,
  unit: { arr_UNITS, loading }
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Список единиц измерения');
    getAll_UNITS();
  }, [setNameOfPage, getAll_UNITS]);

  const deleteItem = itemId => {
    delete_UNIT(itemId);
    window.location.reload();
  };

  const listOf_UNITS = (
    <List className={classes.list}>
      {loading ? (
        <Spinner />
      ) : (
        arr_UNITS.map(item => (
          <ListItem key={item._id} className={classes.listItem}>
            <Grid container className={classes.root}>
              <Grid item xs={3}>
                <Typography align='center'>{item.unitNameLong}</Typography>
              </Grid>

              <Grid item xs={3}>
                <Typography align='center'>{item.unitNameShort}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography align='center'>
                  {item.unitType.typeOf_Unit}
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
                  href={`/accountant/unit/${item._id}`}
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
        href={`/accountant/unit/add`}
        className={classes.btnAdd}
      >
        <PlusOneIcon className={classes.btnAddIcon} />
      </IconButton>
      <Grid item xs={12}>
        {listOf_UNITS}
      </Grid>
    </Grid>
  );
};

Unit_List.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAll_UNITS: PropTypes.func.isRequired,
  delete_UNIT: PropTypes.func.isRequired,
  unit: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  unit: state.unit
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAll_UNITS,
  delete_UNIT
})(Unit_List);
