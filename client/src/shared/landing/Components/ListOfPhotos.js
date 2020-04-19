import React, { useEffect, useState } from 'react';

import { GridList, GridListTile, GridListTileBar } from '@material-ui/core';
import withWidth, { isWidthUp, isWidthDown } from '@material-ui/core/withWidth';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: '1rem'
  }
}));

const ListOfPhotos = ({ arr, width }) => {
  const [newArr, setNewArr] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    if (arr) {
      setNewArr(arr);
    }
  }, [setNewArr, arr]);

  if (isWidthUp('md', width)) {
    return (
      <GridList cellHeight={300} cols={4} className={classes.gridList}>
        {newArr.length > 0 &&
          newArr.map(item => (
            <GridListTile key={item._id} className={classes.gridListTile}>
              <img src={item.imageUrl} alt={item.description} />
              <GridListTileBar title={item.description} />
            </GridListTile>
          ))}
      </GridList>
    );
  }

  if (isWidthUp('sm', width)) {
    return (
      <GridList cellHeight={250} cols={3} className={classes.gridList}>
        {newArr.length > 0 &&
          newArr.map(item => (
            <GridListTile key={item._id} className={classes.gridListTile}>
              <img src={item.imageUrl} alt={item.description} />
              <GridListTileBar title={item.description} />
            </GridListTile>
          ))}
      </GridList>
    );
  }

  if (isWidthDown('sm', width)) {
    return (
      <GridList cellHeight={150} cols={2} className={classes.gridList}>
        {newArr.length > 0 &&
          newArr.map(item => (
            <GridListTile key={item._id} className={classes.gridListTile}>
              <img src={item.imageUrl} alt={item.description} />
              <GridListTileBar title={item.description} />
            </GridListTile>
          ))}
      </GridList>
    );
  }
};

export default withWidth()(ListOfPhotos);
