import React, { useEffect, useState } from 'react';

import { GridList, GridListTile, GridListTileBar } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: '1rem'
  }
  // gridList: {
  //   [theme.breakpoints.down('sm')]: {
  //     // display: 'none'
  //   }
  // },
  // gridListTile: {
  //   [theme.breakpoints.down('sm')]: {
  //     cellHeight: 150
  //   }
  // }
}));

const ListOfPhotos = ({ arr }) => {
  const [newArr, setNewArr] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    if (arr) {
      setNewArr(arr);
    }
  }, [setNewArr, arr]);
  return (
    <GridList
      cellHeight={300}
      cols={3}
      spacing={5}
      className={classes.gridList}
    >
      {newArr.length > 0 &&
        newArr.map(item => (
          <GridListTile key={item._id} className={classes.gridListTile}>
            <img src={item.imageUrl} alt={item.description} />
            <GridListTileBar title={item.description} />
          </GridListTile>
        ))}
    </GridList>
  );
};

export default ListOfPhotos;
