import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  getAllTypeOfImage,
  getOneTypeOfImage,
  addTypeOfImage,
  deleteTypeOfImage
} from '../store/actions/typeOfImage';
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
  typeOfImage: { imageTypes, loading },
  getAllTypeOfImage,
  getOneTypeOfImage,
  addTypeOfImage,
  deleteTypeOfImage
}) => {
  const classes = useStyles();
  useEffect(() => {
    setNameOfPage('Группы фотографий');
    getAllTypeOfImage();
  });
  return loading ? (
    <Spinner />
  ) : (
    <div>
      <List>
        {imageTypes.map(item => (
          <ListItem key={item._id}>
            <ListItemText>{item.imageType}</ListItemText>
            <Button variant='contained' color='secondary'>
              Delete
            </Button>
            <Button
              variant='contained'
              color='primary'
              href={`/type-of-image/${item._id}`}
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
  getAllTypeOfImage: PropTypes.func.isRequired,
  getOneTypeOfImage: PropTypes.func.isRequired,
  addTypeOfImage: PropTypes.func.isRequired,
  setNameOfPage: PropTypes.func.isRequired,
  deleteTypeOfImage: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  typeOfImage: state.typeOfImage
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAllTypeOfImage,
  getOneTypeOfImage,
  addTypeOfImage,
  deleteTypeOfImage
})(TypeOfImage);
