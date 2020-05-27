import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const TableForNakl = ({ fieldName, arrOfRows }) => {
  const classes = useStyles();

  const tableTotalSum = arrOfRows.reduce((accumulator, currenVal) => {
    return parseFloat(accumulator) + parseFloat(currenVal.rowProductSum);
  }, 0);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead className={classes.tableHead}>
          <TableRow className={classes.tableHead_tableRow}>
            <TableCell className={classes.tableHead_tableCell}>№</TableCell>
            <TableCell className={classes.tableHead_tableCell}>
              {fieldName}
            </TableCell>
            <TableCell className={classes.tableHead_tableCell}>
              Од. Вимиру
            </TableCell>
            <TableCell className={classes.tableHead_tableCell}>
              Кількість
            </TableCell>
            <TableCell className={classes.tableHead_tableCell}>
              Ціна без ПДВ,грн.
            </TableCell>
            <TableCell className={classes.tableHead_tableCell}>
              Сума без ПДВ,грн
            </TableCell>
            <TableCell className={classes.tableHead_tableCell}>
              Удалить строку
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={classes.tableBody}>
          {arrOfRows.map((row, index) => (
            <TableRow
              key={row.rowProductNameId}
              className={classes.tableBody_TableRow}
            >
              <TableCell className={classes.tableBody_TableCell}>
                {parseInt(index + 1)}
              </TableCell>
              <TableCell className={classes.tableBody_TableCell}>
                {row.rowProductName}
              </TableCell>
              <TableCell className={classes.tableBody_TableCell}>
                {row.rowProductUnitName}
              </TableCell>
              <TableCell className={classes.tableBody_TableCell}>
                {row.rowProductAmount}
              </TableCell>
              <TableCell className={classes.tableBody_TableCell}>
                {row.rowProductPrice}
              </TableCell>
              <TableCell className={classes.tableBody_TableCell}>
                {row.rowProductSum}
              </TableCell>
              <TableCell className={classes.tableBody_TableCell}>
                <IconButton
                  color='secondary'
                  variant='contained'
                  onClick={() => row.deleteRow(row.rowProductNameId)}
                  className={classes.buttonDelete}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className={classes.tableFooter_TableCell}>
          <TableRow className={classes.tableFooter_TableRow}>
            <TableCell className={classes.tableFooter_TableCell}></TableCell>
            <TableCell className={classes.tableFooter_TableCell}>
              Всього без ПДВ
            </TableCell>
            <TableCell className={classes.tableFooter_TableCell}></TableCell>
            <TableCell className={classes.tableFooter_TableCell}></TableCell>
            <TableCell className={classes.tableFooter_TableCell}></TableCell>
            <TableCell className={classes.tableFooter_TableCell}></TableCell>
            <TableCell className={classes.tableFooter_TableCell}>
              {+tableTotalSum.toFixed(2)}
            </TableCell>
          </TableRow>
          <TableRow className={classes.tableFooter_TableRow}>
            <TableCell className={classes.tableFooter_TableCell}></TableCell>
            <TableCell className={classes.tableFooter_TableCell}>ПДВ</TableCell>
            <TableCell className={classes.tableFooter_TableCell}></TableCell>
            <TableCell className={classes.tableFooter_TableCell}></TableCell>
            <TableCell className={classes.tableFooter_TableCell}></TableCell>
            <TableCell className={classes.tableFooter_TableCell}></TableCell>
            <TableCell className={classes.tableFooter_TableCell}>
              0,00
            </TableCell>
          </TableRow>
          <TableRow className={classes.tableFooter_TableRow}>
            <TableCell className={classes.tableFooter_TableCell}></TableCell>
            <TableCell className={classes.tableFooter_TableCell}>
              Загальна сума без ПДВ
            </TableCell>
            <TableCell className={classes.tableFooter_TableCell}></TableCell>
            <TableCell className={classes.tableFooter_TableCell}></TableCell>
            <TableCell className={classes.tableFooter_TableCell}></TableCell>
            <TableCell className={classes.tableFooter_TableCell}></TableCell>
            <TableCell className={classes.tableFooter_TableCell}>
              {+tableTotalSum.toFixed(2)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default TableForNakl;
