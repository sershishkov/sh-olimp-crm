import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import {
  getAll_OUR_FIRMS,
  delete_OUR_FIRM
} from '../../../store/actions/accountant/referenceData/ourFirm';

import Spinner from '../../../shared/spinner/Spinner';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  btnAdd: {
    position: 'fixed',
    top: 50,
    left: 50,
    zIndex: 5
  },
  btnAddIcon: {
    width: 50,
    height: 50
  },
  rowItem: {
    // border: '1px solid red',
    justifyItems: 'center',
    alignItems: 'center'
  },
  rowItemDate: {
    fontSize: '0.85rem',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  }
}));

const OurFirm_List = ({
  setNameOfPage,
  getAll_OUR_FIRMS,
  delete_OUR_FIRM,
  ourFirm: { arr_OUR_FIRMS, loading }
}) => {
  const classes = useStyles();

  useEffect(() => {
    setNameOfPage('Список наших фирм');
    getAll_OUR_FIRMS();
  }, [setNameOfPage, getAll_OUR_FIRMS]);

  const deleteItem = itemId => {
    delete_OUR_FIRM(itemId);
    window.location.reload();
  };

  const listOf_OUR_FIRMS = (
    <List className={classes.list}>
      {loading ? (
        <Spinner />
      ) : (
        arr_OUR_FIRMS.map(item => (
          <ListItem key={item._id} className={classes.listItem}>
            <Grid container className={classes.root}>
              <Grid item xs={12} container className={classes.row}>
                <Grid item xs={3} className={classes.rowItem} container>
                  <Typography align='center'>
                    {item.typeOfFirm.TypeOf_FirmShort}
                  </Typography>
                </Grid>
                <Grid item xs={3} className={classes.rowItem} container>
                  <Typography align='center'>{item.firmName}</Typography>
                </Grid>
                <Grid item xs={3} className={classes.rowItem} container>
                  <Typography align='center'>
                    {item.firstPersonPosition.position}
                  </Typography>
                </Grid>
                <Grid item xs={1} className={classes.rowItem} container>
                  <Typography align='center'>{item.shortName}</Typography>
                </Grid>
                <Grid item xs={1} className={classes.rowItem} container>
                  <IconButton
                    color='secondary'
                    variant='contained'
                    onClick={() => deleteItem(item._id)}
                    className={classes.buttonDelete}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>

                <Grid item xs={1} className={classes.rowItem} container>
                  <IconButton
                    color='primary'
                    variant='contained'
                    href={`/accountant/our-firm/${item._id}`}
                    className={classes.buttonDelete}
                  >
                    <EditIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          </ListItem>
        ))
      )}
    </List>
  );

  return (
    <Grid container className={classes.root}>
      <IconButton
        variant='contained'
        color='secondary'
        href={`/accountant/our-firm/add`}
        className={classes.btnAdd}
      >
        <PlusOneIcon className={classes.btnAddIcon} />
      </IconButton>
      <Grid item xs={12}>
        {listOf_OUR_FIRMS}
      </Grid>
    </Grid>
  );
};

OurFirm_List.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getAll_OUR_FIRMS: PropTypes.func.isRequired,
  delete_OUR_FIRM: PropTypes.func.isRequired,
  ourFirm: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  ourFirm: state.ourFirm
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getAll_OUR_FIRMS,
  delete_OUR_FIRM
})(OurFirm_List);
