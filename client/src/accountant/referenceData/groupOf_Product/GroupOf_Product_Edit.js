import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import {
  getOne_GROUP_OF_PRODUCT,
  update_GROUP_OF_PRODUCT
} from '../../../store/actions/accountant/referenceData/groupOf_Product';

import Spinner from '../../../shared/spinner/Spinner';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    marginTop: '7rem'
  },
  buttonBack: {
    position: 'fixed',
    top: '5rem',
    left: 0
  },
  displayNone: {
    display: 'none'
  }
}));

const GroupOf_Product_Edit = ({
  setNameOfPage,
  getOne_GROUP_OF_PRODUCT,
  update_GROUP_OF_PRODUCT,
  groupOf_Product: { one_GROUP_OF_PRODUCT, loading }
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  const buttonBackHandler = () => {
    history.push('/accountant/group-of-product');
  };

  const [productGroup, setProductGroup] = useState('');

  const [disabledForm, setDisabledForm] = useState(true);

  useEffect(() => {
    setNameOfPage('Редактировать группу товара');
    getOne_GROUP_OF_PRODUCT(id);
  }, [setNameOfPage, getOne_GROUP_OF_PRODUCT, id]);

  useLayoutEffect(() => {
    if (one_GROUP_OF_PRODUCT) {
      setProductGroup(one_GROUP_OF_PRODUCT.productGroup);
    }
  }, [one_GROUP_OF_PRODUCT]);

  const onChangeHandler = e => {
    setProductGroup(e.target.value);
    setDisabledForm(!productGroup);
  };

  const updateItemHandler = () => {
    update_GROUP_OF_PRODUCT(id, productGroup);
    history.push('/accountant/group-of-product');
  };

  return loading ? (
    <Spinner />
  ) : (
    <Grid container className={classes.root} spacing={1}>
      <Button
        onClick={buttonBackHandler}
        variant='contained'
        className={classes.buttonBack}
        color='primary'
      >
        назад
      </Button>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Группа товаров</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='productGroup'
            fullWidth
            placeholder='Введите полное название'
            type='text'
            value={productGroup ? productGroup : ''}
            onChange={e => onChangeHandler(e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Button
          type='button'
          fullWidth
          disabled={disabledForm}
          variant='contained'
          color='primary'
          className={classes.buttonAdd}
          onClick={() => updateItemHandler()}
        >
          Сохранить
        </Button>
      </Grid>
    </Grid>
  );
};

GroupOf_Product_Edit.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getOne_GROUP_OF_PRODUCT: PropTypes.func.isRequired,
  update_GROUP_OF_PRODUCT: PropTypes.func.isRequired,
  groupOf_Product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  groupOf_Product: state.groupOf_Product
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getOne_GROUP_OF_PRODUCT,
  update_GROUP_OF_PRODUCT
})(GroupOf_Product_Edit);
