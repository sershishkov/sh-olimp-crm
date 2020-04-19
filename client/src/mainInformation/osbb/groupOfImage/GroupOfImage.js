import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';

import { setNameOfPage } from '../../../store/actions/nameOfPage';
import {
  getAllGroupOfImage,
  deleteGroupOfImage,
} from '../../../store/actions/mainInformation/osbb/groupOfImage';

import Spinner from '../../../shared/spinner/Spinner';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';

import PlusOneIcon from '@material-ui/icons/PlusOne';

import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  btnAdd: {
    position: 'fixed',
    top: 50,
    left: 50,
    zIndex: 5,
  },
  btnAddIcon: {
    width: 50,
    height: 50,
  },
  list: {
    width: '100%',
    // border: '1px solid red'
  },
  listItem: {
    width: '100%',
    // border: '1px solid blue'
  },
}));

const GroupOfImage = ({
  setNameOfPage,
  getAllGroupOfImage,
  groupOfImage: { imageGroups, loading },
  deleteGroupOfImage,
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Группы работ!');
    getAllGroupOfImage();
  }, [setNameOfPage, getAllGroupOfImage]);

  const onDeleteHandler = (itemId) => {
    deleteGroupOfImage(itemId);
    window.location.reload();
  };

  const listOfPhoto = (
    <MaterialTable
      title='Список '
      columns={[
        { title: 'Группа работ', field: 'field_imageGroup', width: '20%' },
        { title: 'Описание', field: 'field_description' },
        { title: 'Удалить', field: 'btnDel', sorting: false, width: '5%' },
        {
          title: 'редактировать',
          field: 'btnEdit',
          sorting: false,
          width: '5%',
        },
      ]}
      data={imageGroups.map((item) => {
        return {
          field_imageGroup: item.imageGroup,
          field_description: item.descriptions,
          btnDel: (
            <IconButton
              color='secondary'
              variant='contained'
              onClick={() => onDeleteHandler(item._id)}
              className={classes.buttonDelete}
            >
              <DeleteIcon />
            </IconButton>
          ),
          btnEdit: (
            <IconButton
              color='primary'
              variant='contained'
              href={`/group-of-image/${item._id}`}
              className={classes.buttonDelete}
            >
              <EditIcon />
            </IconButton>
          ),
        };
      })}
      options={{
        sorting: true,
        search: false,
        pageSize: 10,
      }}
    />
  );

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
      <Grid item xs={12} container>
        {listOfPhoto}
      </Grid>
    </Grid>
  );
};

GroupOfImage.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  deleteGroupOfImage: PropTypes.func.isRequired,
  getAllGroupOfImage: PropTypes.func.isRequired,
  groupOfImage: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  groupOfImage: state.groupOfImage,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAllGroupOfImage,
  deleteGroupOfImage,
})(GroupOfImage);
