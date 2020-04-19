import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';

import { setNameOfPage } from '../../../store/actions/nameOfPage';
import {
  getAllPhotoWork,
  deletePhotoWork
} from '../../../store/actions/mainInformation/osbb/photoWorks';

import Spinner from '../../../shared/spinner/Spinner';

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
  list: {},
  listItem: {},
  img: {
    width: 100,
    height: 100,
    objectFit: 'cover'
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

  const listOfPhoto = (
    <MaterialTable
      title='Список '
      columns={[
        { title: 'Фото', field: 'field_imageUrl' },
        { title: 'Описание', field: 'field_description' },
        { title: 'Почта', field: 'field_imageGroup' },
        { title: 'Удалить', field: 'btnDel', sorting: false },
        { title: 'редактировать', field: 'btnEdit', sorting: false }
      ]}
      data={photoWorks.map(item => {
        return {
          field_imageUrl: (
            <img
              src={item.imageUrl}
              alt={item.imageUrl}
              className={classes.img}
            />
          ),
          field_description: item.description,
          field_imageGroup: item.imageGroup.imageGroup,
          btnDel: (
            <IconButton
              color='secondary'
              variant='contained'
              onClick={() => deleteImage(item._id)}
              className={classes.buttonDelete}
            >
              <DeleteIcon />
            </IconButton>
          ),
          btnEdit: (
            <IconButton
              color='primary'
              variant='contained'
              href={`/editphoto/${item._id}`}
              className={classes.buttonDelete}
            >
              <EditIcon />
            </IconButton>
          )
        };
      })}
      options={{
        sorting: true,
        search: false,
        pageSize: 10
      }}
    />
  );

  return loading ? (
    <Spinner />
  ) : (
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
