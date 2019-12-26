import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { GroupedButtons, GetOrDefault } from './Controls';

const DEFAULT_ROWS_PER_PAGE = 10

const useStyle = makeStyles({
  root: {
    width: '100%'
  },
  tableWrapper: {
    maxHeight: 'calc(100vh - 110px)',
    overflow: 'auto'
  }
});

function MakeHeaders(columnNames) {
  let columns = [];
  if (columnNames == null ||columnNames == undefined || columnNames.length == 0) return [];
  columnNames.forEach((col) => {
    columns.push({ id: col, label: col, align: 'center' });
  });
  return columns;
}


export default function Grid(props) {
  const attributes = GetOrDefault(props.attributes, {});
  const rowsPerPageOrDefault = props.rowsPerPage === null || props.rowsPerPage === undefined || props.rowsPerPage ? DEFAULT_ROWS_PER_PAGE : props.rowsPerPage;
  const classes = useStyle();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageOrDefault);
  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const columns = MakeHeaders(props.columns);
  const rows = GetOrDefault(props.rows, []);

  return (
    <Paper className={classes.root}>
      <div className={classes.tableWrapper}>
        <Table stickyHeader aria-label="sticky table">
          {GridHeader(columns, attributes)}
          <TableBody>
            {
              rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                return GridRows(columns, row, attributes)
              })
            }
          </TableBody>
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'previous page'
        }}
        nextIconButtonProps={{
          'aria-label': 'next page'
        }}
        onChangePage={handleChangePage}
      />
    </Paper>
  )
}

function GridHeader(columns, attributes) {
  const showID = GetOrDefault(attributes.showID, false);
  return (
    <TableHead>
      <TableRow>
        {
          columns.filter((e) => {
            if (!showID && e.id == "ID") return false;
            return true;
          }).map(column => (
            <TableCell key={column.id} align={column.align}>{column.label}</TableCell>
          ))
        }
      </TableRow>
    </TableHead>
  )
}

function GridRows(columns, row, attributes) {
  const showID = GetOrDefault(attributes.showID, false);
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={row["ID"]}>
      {columns.filter((e) => {
        if (!showID && e.id == "ID") return false;
        return true;
      }).map(column => {
        const value = row[column.id];
        return (
          <TableCell key={column.id} align={column.align}>
            {
              column.id.toUpperCase().includes("ACTION") ? <GroupedButtons buttons={value} attributes={GetOrDefault(attributes, {})}/> : value
            }
          </TableCell>
        )
      })}
    </TableRow>
  )
}
