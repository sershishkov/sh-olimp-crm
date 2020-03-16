import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  getAllGroupOfImage,
  deleteGroupOfImage
} from '../store/actions/groupOfImage';
import { setNameOfPage } from '../store/actions/nameOfPage';

import Spinner from '../shared/spinner/Spinner';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';

import PlusOneIcon from '@material-ui/icons/PlusOne';

import ListItemText from '@material-ui/core/ListItemText';
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
  list: {
    width: '100%'
    // border: '1px solid red'
  },
  listItem: {
    width: '100%'
    // border: '1px solid blue'
  }
}));

const TypeOfImage = ({
  setNameOfPage,
  getAllGroupOfImage,
  groupOfImage: { imageGroups, loading },
  deleteGroupOfImage
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Группы фотографий');
    getAllGroupOfImage();
  }, [setNameOfPage, getAllGroupOfImage]);

  const onDeleteHandler = itemId => {
    deleteGroupOfImage(itemId);
    window.location.reload();
  };

  return loading ? (
    <Spinner />
  ) : (
    <Grid container direction='column' className={classes.root}>
      <IconButton
        variant='contained'
        color='secondary'
        href={`/group-of-image-add`}
        className={classes.btnAdd}
      >
        <PlusOneIcon className={classes.btnAddIcon} />
      </IconButton>
      <Grid item xs={12} container spacing={1}>
        <List className={classes.list}>
          {imageGroups.map(item => (
            <ListItem key={item._id} className={classes.listItem}>
              <Grid item xs={10}>
                <ListItemText>{item.imageGroup}</ListItemText>
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  variant='contained'
                  color='secondary'
                  onClick={() => onDeleteHandler(item.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  variant='contained'
                  color='primary'
                  href={`/group-of-image/${item._id}`}
                >
                  <EditIcon />
                </IconButton>
              </Grid>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
};

TypeOfImage.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  deleteGroupOfImage: PropTypes.func.isRequired,
  getAllGroupOfImage: PropTypes.func.isRequired,
  groupOfImage: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  groupOfImage: state.groupOfImage
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAllGroupOfImage,
  deleteGroupOfImage
})(TypeOfImage);
