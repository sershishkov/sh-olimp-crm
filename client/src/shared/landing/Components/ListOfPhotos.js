import React, { useEffect, useState } from 'react';

import { GridList, GridListTile, GridListTileBar } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const ListOfPhotos = ({ arr }) => {
  const [newArr, setNewArr] = useState([]);

  useEffect(() => {
    if (arr) {
      setNewArr(arr);
    }
  }, [setNewArr, arr]);
  return (
    <GridList cellHeight={400} cols={2}>
      {newArr.length > 0 &&
        newArr.map(item => (
          <GridListTile key={item._id}>
            <img src={item.imageUrl} alt={item.description} />
            <GridListTileBar title={item.description} />
          </GridListTile>
        ))}
    </GridList>
  );
};

export default ListOfPhotos;
