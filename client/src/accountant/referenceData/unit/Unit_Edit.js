import React, { useEffect, useState, useLayoutEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import TypeOf_Unit_Add from '../typeOf_Unit/TypeOf_Unit_Add';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import { setNameOfPage } from '../../../store/actions/nameOfPage';

import {
  getOne_UNIT,
  update_UNIT,
} from '../../../store/actions/accountant/referenceData/unit';

import { getAll_TYPE_OF_UNITS } from '../../../store/actions/accountant/referenceData/typeOf_Unit';

import Spinner from '../../../shared/spinner/Spinner';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop: '7rem',
  },
  // buttonBack: {
  //   position: 'fixed',
  //   top: '5rem',
  //   left: 0,
  // },
  displayNone: {
    display: 'none',
  },
  displayFlex: {
    display: 'flex',
    position: 'absolute',
    top: 22,
    left: 7,
    // zIndex: 555
  },
  wrapSelect: {
    position: 'relative',
  },
  select: {
    height: 55,
    // border: '1px solid red'
  },
}));

const Unit_Edit = ({
  setNameOfPage,
  getOne_UNIT,
  update_UNIT,

  getAll_TYPE_OF_UNITS,

  typeOf_Unit: { arr_TYPE_OF_UNITS, loading },
  unit: { one_UNIT },
}) => {
  const classes = useStyles();
  const history = useHistory();
  const { id } = useParams();

  // const buttonBackHandler = () => {
  //   history.push('/accountant/unit');
  // };

  const [pageForm, setPageForm] = useState({
    unitNameLong: '',
    unitNameShort: '',
    unitType: '',
  });

  const [disabledForm, setDisabledForm] = useState(true);
  const { unitNameLong, unitNameShort, unitType } = pageForm;
  const [openTypeOf_Unit_Add, setOpenTypeOf_Unit_Add] = React.useState(false);

  const handleOpen = () => {
    setOpenTypeOf_Unit_Add(true);
  };

  const handleClose = () => {
    setOpenTypeOf_Unit_Add(false);
  };

  useEffect(() => {
    setNameOfPage('Редактировать еденицу измерения');
    getAll_TYPE_OF_UNITS();
    getOne_UNIT(id);
  }, [setNameOfPage, getAll_TYPE_OF_UNITS, getOne_UNIT, id]);

  useLayoutEffect(() => {
    if (one_UNIT) {
      setPageForm({
        ...pageForm,
        unitNameLong: one_UNIT.unitNameLong,
        unitNameShort: one_UNIT.unitNameShort,
        unitType: one_UNIT.unitType,
      });
    }
  }, [one_UNIT]);

  const onChangeHandler = (e) => {
    setPageForm({ ...pageForm, [e.target.name]: e.target.value });
    setDisabledForm(!(unitNameLong || unitNameShort || unitType));
  };

  const updateItemHandler = () => {
    update_UNIT(id, unitNameLong, unitNameShort, unitType);
    history.push('/accountant/unit');
  };

  return loading ? (
    <Spinner />
  ) : (
    <Grid container className={classes.root} spacing={1}>
      <Modal open={openTypeOf_Unit_Add} onClose={handleClose}>
        <TypeOf_Unit_Add />
      </Modal>

      {/* <Button
        onClick={buttonBackHandler}
        variant='contained'
        className={classes.buttonBack}
        color='primary'
      >
        назад
      </Button> */}

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Полное название </Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='unitNameLong'
            fullWidth
            placeholder='Введите полное название'
            type='text'
            value={unitNameLong ? unitNameLong : ''}
            onChange={(e) => onChangeHandler(e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Сокращеное название</Typography>
        </Grid>
        <Grid item xs={8} container>
          <TextField
            variant='outlined'
            name='unitNameShort'
            fullWidth
            placeholder='Введите сокращеное название'
            type='text'
            value={unitNameShort ? unitNameShort : ''}
            onChange={(e) => onChangeHandler(e)}
          />
        </Grid>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={4} container>
          <Typography align='left'>Группа измерений</Typography>
        </Grid>
        <Grid item xs={7} className={classes.wrapSelect} container>
          <InputLabel
            id='add-select-label'
            className={unitType ? classes.displayNone : classes.displayFlex}
          >
            группа измерений
          </InputLabel>
          <Select
            variant='outlined'
            labelId='add-select-label'
            fullWidth
            value={unitType ? unitType : ''}
            name='unitType'
            onChange={(e) => onChangeHandler(e)}
            className={classes.select}
          >
            {arr_TYPE_OF_UNITS.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item.typeOf_Unit}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={1} container alignItems='center' justify='center'>
          <IconButton
            onClick={() => {
              handleOpen();
              // history.push('/accountant/type-of-unit/add');
            }}
          >
            <AddCircleIcon color='primary' />
          </IconButton>
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

Unit_Edit.propTypes = {
  setNameOfPage: PropTypes.func.isRequired,
  getOne_UNIT: PropTypes.func.isRequired,
  update_UNIT: PropTypes.func.isRequired,

  getAll_TYPE_OF_UNITS: PropTypes.func.isRequired,

  typeOf_Unit: PropTypes.object.isRequired,
  unit: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  typeOf_Unit: state.typeOf_Unit,
  unit: state.unit,
});

export default connect(mapStateToProps, {
  setNameOfPage,
  getOne_UNIT,
  update_UNIT,

  getAll_TYPE_OF_UNITS,
})(Unit_Edit);
