import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setNameOfPage } from '../../store/actions/nameOfPage';
import { getAllPhotoWork } from '../../store/actions/photoWorks';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  list: {},
  listItem: {}
}));

const ForOSBB = ({
  setNameOfPage,
  getAllPhotoWork,
  photoWorks: { photoWorks, loading }
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Наши работы');
    getAllPhotoWork('5e68eb5c78dad518abff49b9');
  }, [setNameOfPage, getAllPhotoWork]);
  // 5e68eb4b78dad518abff49b8 физлица
  // 5e68eb5c78dad518abff49b9 осбб
  const objGroup = {};

  photoWorks.forEach(item => {
    objGroup[item.imageGroup._id] = item.imageGroup.imageGroup;
  });

  return loading ? (
    <Spinner />
  ) : (
    <Grid className={classes.root}>
      <Typography variant='h3' align='center'>
        Компания "Олимп-ДС" предлагает следующие виды работ для осбб:
      </Typography>

      <List>
        {Object.keys(objGroup).map(key => (
          <ListItem key={key}>
            <Grid container justify='space-between'>
              <Grid item xs={11}>
                <Typography variant='h6'>{objGroup[key]}</Typography>
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  color='primary'
                  size='small'
                  variant='contained'
                  href={`/description/${key}`}
                >
                  <MoreHorizIcon />
                </IconButton>
              </Grid>
            </Grid>
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

ForOSBB.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAllPhotoWork: PropTypes.func.isRequired,
  photoWorks: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  photoWorks: state.photoWorks
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAllPhotoWork
})(ForOSBB);
