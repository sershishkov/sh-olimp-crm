import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { deletePhotoWork } from '../../../store/actions/photoWorks';

import {
  GridList,
  GridListTile,
  Button,
  GridListTileBar
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  displayBlock: {
    display: 'block'
  },
  displayNone: {
    display: 'none'
  },
  GridListTile: {
    position: 'relative'
  },
  img: {
    display: 'flex'
  },
  GridListTileBar: {
    display: 'flex'
  },
  buttonDel: {
    position: 'absolute',
    top: '2rem',
    left: '2rem'
  },
  buttonEdit: {
    position: 'absolute',
    top: '2rem',
    right: '2rem'
  }
}));

const ListOfPhotos = ({ arr, deletePhotoWork, user }) => {
  const classes = useStyles();
  const [authorized, setAuthorized] = useState(false);
  const [newArr, setNewArr] = useState([]);

  const deletePhotoWorkHandler = itemId => {
    deletePhotoWork(itemId);

    window.location.reload();
  };

  // console.log(user);

  useEffect(() => {
    if (user) {
      setAuthorized(user.role === 'admin' || user.role === 'boss');
    }
    if (arr) {
      setNewArr(arr);
    }
  }, [user, setAuthorized]);
  return (
    <GridList cellHeight={400} cols={2}>
      {newArr.length > 0 &&
        newArr.map(item => (
          <GridListTile key={item._id} className={classes.GridListTile}>
            <img
              src={item.imageUrl}
              alt={item.description}
              className={classes.img}
            />
            <GridListTileBar
              title={item.description}
              className={classes.GridListTileBar}
            />
            <Button
              className={authorized ? classes.buttonDel : classes.displayNone}
              variant='contained'
              color='secondary'
              onClick={() => deletePhotoWorkHandler(item._id)}
            >
              Удалить фото
            </Button>
          </GridListTile>
        ))}
    </GridList>
  );
};

ListOfPhotos.propTypes = {
  deletePhotoWork: PropTypes.func.isRequired,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { deletePhotoWork })(ListOfPhotos);
