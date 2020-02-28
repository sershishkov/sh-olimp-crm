import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  getAllGroupOfImage,
  getOneGroupOfImage,
  addGroupOfImage,
  deleteGroupOfImage
} from '../store/actions/groupOfImage';
import { setNameOfPage } from '../store/actions/nameOfPage';

import Spinner from '../shared/spinner/Spinner';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';

import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  }
}));

const TypeOfImage = ({
  setNameOfPage,
  getAllGroupOfImage,
  groupOfImage: { imageGroups, loading }
}) => {
  const classes = useStyles();
  useEffect(() => {
    setNameOfPage('Группы фотографий');

    getAllGroupOfImage();
  }, [setNameOfPage, getAllGroupOfImage]);
  return loading ? (
    <Spinner />
  ) : (
    <div>
      <List>
        {imageGroups.map(item => (
          <ListItem key={item._id}>
            <ListItemText>{item.imageType}</ListItemText>
            <Button variant='contained' color='secondary'>
              Delete
            </Button>
            <Button
              variant='contained'
              color='primary'
              href={`/group-of-image/${item._id}`}
            >
              EDIT
            </Button>
          </ListItem>
        ))}
        <Button variant='contained' color='primary'>
          AddNew
        </Button>
      </List>
    </div>
  );
};

TypeOfImage.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAllGroupOfImage: PropTypes.func.isRequired,
  groupOfImage: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  groupOfImage: state.groupOfImage
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAllGroupOfImage
})(TypeOfImage);
