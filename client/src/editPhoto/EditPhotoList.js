import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { setNameOfPage } from '../store/actions/nameOfPage';

import { getAllPhotoWork, deletePhotoWork } from '../store/actions/photoWorks';

import Spinner from '../shared/spinner/Spinner';

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
  list: {},
  listItem: {
    position: 'relative'
  },
  img: {
    width: 100,
    height: 100,
    objectFit: 'cover'
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

const EditPhotoList = ({
  setNameOfPage,
  getAllPhotoWork,
  deletePhotoWork,
  photoWorks: { photoWorks, loading }
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Список фото');
    getAllPhotoWork();
  }, [setNameOfPage, getAllPhotoWork]);

  const deleteImage = itemId => {
    deletePhotoWork(itemId);
    window.location.reload();
  };
  console.log(photoWorks);
  const listOfPhoto = (
    <List className={classes.list}>
      {loading ? (
        <Spinner />
      ) : (
        photoWorks.map(item => (
          <ListItem key={item._id} className={classes.listItem}>
            <Grid container className={classes.root}>
              <Grid item xs={2}>
                <img
                  src={item.imageUrl}
                  alt={item.imageUrl}
                  className={classes.img}
                />
              </Grid>

              <Grid item xs={3}>
                <Typography align='center'>{item.description}</Typography>
              </Grid>

              <Grid item xs={4}>
                <Typography align='center'>
                  {item.imageGroup.imageGroup}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography align='center'>
                  {/* {item.categoryGroupOf_image.categoryOf_Group} */}
                </Typography>
              </Grid>

              <Grid item xs={1}>
                <IconButton
                  color='secondary'
                  variant='contained'
                  onClick={() => deleteImage(item._id)}
                  className={classes.buttonDelete}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>

              <Grid item xs={1}>
                <IconButton
                  color='primary'
                  variant='contained'
                  href={`/editphoto/${item._id}`}
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
        href={`/addphoto`}
        className={classes.btnAdd}
      >
        <PlusOneIcon className={classes.btnAddIcon} />
      </IconButton>
      <Grid item xs={12}>
        {listOfPhoto}
      </Grid>
    </Grid>
  );
};

EditPhotoList.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAllPhotoWork: PropTypes.func.isRequired,
  deletePhotoWork: PropTypes.func.isRequired,
  photoWorks: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  photoWorks: state.photoWorks
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAllPhotoWork,
  deletePhotoWork
})(EditPhotoList);
