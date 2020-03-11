import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setNameOfPage } from '../../store/actions/nameOfPage';
import { getAllGroupOfImage } from '../../store/actions/groupOfImage';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

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
  getAllGroupOfImage,
  groupOfImage: { imageGroups, loading }
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Наши работы');
    getAllGroupOfImage();
  }, [setNameOfPage, getAllGroupOfImage]);

  return loading ? (
    <Spinner />
  ) : (
    <Grid className={classes.root}>
      <Typography variant='h3' align='center'>
        Компания "Олимп-ДС" предлагает следующие виды работ:
      </Typography>

      <List>
        {imageGroups.map(item => (
          <ListItem key={item._id}>
            <Grid container justify='space-between'>
              <Grid item xs={10}>
                <Typography variant='h6'>{item.imageGroup}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Button
                  color='primary'
                  size='small'
                  variant='contained'
                  href={`/description/${item._id}`}
                >
                  подробнее
                </Button>
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
  getAllGroupOfImage: PropTypes.func.isRequired,
  groupOfImage: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  groupOfImage: state.groupOfImage
});

export default connect(mapStateToProps, { setNameOfPage, getAllGroupOfImage })(
  ForOSBB
);
