import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  slider: {
    marginBottom: '4rem'
  }
}));

const MySlider = props => {
  const classes = useStyles();
  const slider = (
    <AwesomeSlider className={classes.slider}>
      {props.arrPhoto.map(item => (
        <div key={item._id} data-src={item.image} />
      ))}
    </AwesomeSlider>
  );

  return <div className={classes.root}>{slider}</div>;
};

MySlider.propTypes = {};

export default MySlider;
