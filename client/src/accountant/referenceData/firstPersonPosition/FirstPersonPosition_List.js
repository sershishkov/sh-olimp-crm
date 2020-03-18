import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import {
  getAll_FIRST_PERSON_POSITIONS,
  delete_FIRST_PERSON_POSITION
} from '../../../store/actions/accountant/referenceData/firstPersonPosition';

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

const FirstPersonPosition_List = ({
  setNameOfPage,
  getAll_FIRST_PERSON_POSITIONS,
  delete_FIRST_PERSON_POSITION,
  firstPersonPosition: { arr_FIRST_PERSON_POSITIONS, loading }
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Список должностей');
    getAll_FIRST_PERSON_POSITIONS();
  }, [setNameOfPage, getAll_FIRST_PERSON_POSITIONS]);

  const deleteItem = itemId => {
    delete_FIRST_PERSON_POSITION(itemId);
    window.location.reload();
  };

  const listOf_FIRST_PERSON_POSITIONS = (
    <List className={classes.list}>
      {loading ? (
        <Spinner />
      ) : (
        arr_FIRST_PERSON_POSITIONS.map(item => (
          <ListItem key={item._id} className={classes.listItem}>
            <Grid container className={classes.root}>
              <Grid item xs={4}>
                <Typography align='center'>{item.position}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography align='center'>
                  {item.positionRoditPadej}
                </Typography>
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
                  href={`/accountant/personposition/${item._id}`}
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
        href={`/accountant/personposition/add`}
        className={classes.btnAdd}
      >
        <PlusOneIcon className={classes.btnAddIcon} />
      </IconButton>
      <Grid item xs={12}>
        {listOf_FIRST_PERSON_POSITIONS}
      </Grid>
    </Grid>
  );
};

FirstPersonPosition_List.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAll_FIRST_PERSON_POSITIONS: PropTypes.func.isRequired,
  delete_FIRST_PERSON_POSITION: PropTypes.func.isRequired,
  firstPersonPosition: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  firstPersonPosition: state.firstPersonPosition
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAll_FIRST_PERSON_POSITIONS,
  delete_FIRST_PERSON_POSITION
})(FirstPersonPosition_List);
