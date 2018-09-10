import React from 'react';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
// import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';

class EnhancedTableHead extends React.Component {
  constructor() {
    super();
    this.columnData = [
      {
        id: 'productName', numeric: false, disablePadding: false, label: 'Product Name',
      },
      {
        id: 'email', numeric: false, disablePadding: false, label: 'Email',
      },
      {
        id: 'serialNumber', numeric: false, disablePadding: false, label: 'Serial Number',
      },
      {
        id: 'purchaseDate', numeric: false, disablePadding: false, label: 'Purchase Date',
      },
      {
        id: 'status', numeric: false, disablePadding: false, label: 'Status',
      },
      {
        id: 'comments', numeric: false, disablePadding: false, label: 'Comments',
      },
      {
        id: 'images', numeric: false, disablePadding: false, label: 'Images',
      },
    ];
  }

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      // onSelectAllClick, order, orderBy, numSelected, rowCount,
      order, orderBy,
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          {this.columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default EnhancedTableHead;
