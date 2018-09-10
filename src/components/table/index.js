import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import EnhancedTableHead from './EnhancedTableHead';
import WarrantyRequestEditor from './../Editable/WarrantyRequestEditor';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import _ from 'lodash';

function getNumericSortFunc(a, b, orderBy) {
  return a[orderBy] - b[orderBy];
}

function getStringSortFunc(a, b, orderBy) {
  return a[orderBy] && b[orderBy] && a[orderBy].localeCompare(b[orderBy]);
}

function getDateSortFunc(a, b, orderBy) {
  return a[orderBy] < b[orderBy];
}

function getSortFunction(a, orderBy) {
  const type = typeof a[orderBy];

  let sortFunc = getNumericSortFunc;
  switch (type) {
    case 'string':
      return getStringSortFunc;
    case 'date':
      return getDateSortFunc;
    default:
      return getNumericSortFunc;
  }
}

function getSorting(order, orderBy) {
  // const sortFunc = getSortFunction(a, orderBy);
  console.log('sorting ', orderBy);
  return order === 'desc' ? (a, b) => getSortFunction(a, orderBy)(a, b, orderBy) : (a, b) => getSortFunction(a, orderBy)(b, a, orderBy);
}


const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
     <Toolbar
      className={classNames(classes.root)}
    >
      <div className={classes.title}>
          <Typography variant="title" id="tableTitle">
            Warranty registrations
          </Typography>
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class OfflineWarranties extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      order: 'desc',
      orderBy: '_created_at',
      selected: [],
      data: this.loadData(),
      page: 0,
      rowsPerPage: 5,
      isOpen: false,
      source:'',
    };
  }

    loadData() {
        return [{
            "_id": "12",
            "productName": "SKULL WATCH X",
            "email": "moshe@kogan.com",
            "serialNumber": "123456",
            "imagesData": [
                {
                    "name": "warrantyOffline/ltinfziiahbzjqhnpohb",
                    "url": "https://res.cloudinary.com/volletoimages/image/upload/v1533249352/warrantyOffline/ltinfziiahbzjqhnpohb.png",
                    "height": 205,
                    "width": 691
                },
                {
                    "name": "warrantyOffline/qxp7fqq6qbapksxjbljr",
                    "url": "https://res.cloudinary.com/volletoimages/image/upload/v1533249852/warrantyOffline/qxp7fqq6qbapksxjbljr.png",
                    "height": 1800,
                    "width": 2880
                },
            ],
            "brandId": "BRAND_22123",
            "_created_at": "2018-08-01T13:47:16.560Z",
            "_updated_at": "2018-08-01T13:47:16.560Z"
        },

            /* 2 */
            {
                "_id": "13",
                "purchaseDate": "2018-05-24T00:00:00.000Z",
                "productName": "SKULL X",
                "email": "moshe@asher.com",
                "serialNumber": "12121212",
                "imagesData": [

                ],
                "codename": "BRAND_codename",
                "_created_at": "2018-08-02T06:33:04.018Z",
                "_updated_at": "2018-08-02T06:33:04.018Z",
                "comments": "Some very good comment here explaning the real reason behind the decision",
                "brandId": "BRAND_22123"
            },

            /* 3 */
            {
                "_id": "14",
                "productName": "SKULL X",
                "imagesData": [
                    {
                        "name": "warrantyOffline/qxp7fqq6qbapksxjbljr",
                        "url": "https://res.cloudinary.com/volletoimages/image/upload/v1533249852/warrantyOffline/qxp7fqq6qbapksxjbljr.png",
                        "height": 1800,
                        "width": 2880
                    },
                ],
                "email": "ahe@fdf.com",
                "serialNumber": "1324234",
                "codename": "BRAND_codename",
                "type": "offlineActivation",
                "status": "pending",
                "_created_at": "2018-08-02T22:36:13.857Z",
                "_updated_at": "2018-08-02T22:36:13.857Z",
                "brandId": "BRAND_22123"
            },

            /* 4 */
            {
                "_id": "15",
                "purchaseDate": "2015-05-24T00:00:00.000Z",
                "imagesData": [
                    {
                        "name": "warrantyOffline/p8agjhqjoelvnjqb1eqe",
                        "url": "https://res.cloudinary.com/volletoimages/image/upload/v1533249844/warrantyOffline/p8agjhqjoelvnjqb1eqe.png",
                        "height": 426,
                        "width": 906
                    },
                ],
                "productName": "SKULL X",
                "email": "ahe@fdf.com",
                "serialNumber": "1324234",
                "codename": "BRAND_codename",
                "type": "offlineActivation",
                "status": "pending",
                "_created_at": "2018-08-02T22:43:41.243Z",
                "_updated_at": "2018-08-02T22:43:41.243Z",
                "brandId": "BRAND_22123"
            },

            /* 5 */
            {
                "_id": "16",
                "purchaseDate": "2015-04-24T00:00:00.000Z",
                "imagesData": [
                    {
                        "name": "warrantyOffline/p8agjhqjoelvnjqb1eqe",
                        "url": "https://res.cloudinary.com/volletoimages/image/upload/v1533249844/warrantyOffline/p8agjhqjoelvnjqb1eqe.png",
                        "height": 426,
                        "width": 906
                    },
                    {
                        "name": "warrantyOffline/ltinfziiahbzjqhnpohb",
                        "url": "https://res.cloudinary.com/volletoimages/image/upload/v1533249352/warrantyOffline/ltinfziiahbzjqhnpohb.png",
                        "height": 205,
                        "width": 691
                    },
                    {
                        "name": "warrantyOffline/qxp7fqq6qbapksxjbljr",
                        "url": "https://res.cloudinary.com/volletoimages/image/upload/v1533249852/warrantyOffline/qxp7fqq6qbapksxjbljr.png",
                        "height": 1800,
                        "width": 2880
                    },
                    {
                        "name": "warrantyOffline/ltinfziiahbzjqhnpohb",
                        "url": "https://res.cloudinary.com/volletoimages/image/upload/v1533249352/warrantyOffline/ltinfziiahbzjqhnpohb.png",
                        "height": 205,
                        "width": 691
                    }
                ],
                "productName": "ewewewe",
                "email": "oleg@dsd.com",
                "serialNumber": "2323123",
                "codename": "BRAND_codename",
                "type": "offlineActivation",
                "status": "pending",
                "_created_at": "2018-08-02T22:44:25.800Z",
                "_updated_at": "2018-08-02T22:44:25.800Z",
                "brandId": "BRAND_22123"
            }];
    }

    handleSubmit = (nextState) => {
        const dataSource = this.state.data;
        let selectedItem = _.findIndex(dataSource,((data)=>data._id === nextState._id));

        dataSource[selectedItem].serialNumber = nextState.serialNumber;
        dataSource[selectedItem].productName = nextState.productName;
        this.setState({
           data:dataSource,
           isOpen:false,
        });
    }

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({order, orderBy});
    };

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState(state => ({selected: state.data.map(n => n.id)}));
            return;
        }
        this.setState({selected: []});
    };

    handleClick = (event, id) => {
        const {selected} = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({selected: newSelected});
    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    handleModalClick=(id)=>{
        this.setState({
           isOpen:true,
           source:this.state.data[_.findIndex(this.state.data,((d)=>d._id===id))]
        });
    }

    render() {
        const {classes} = this.props;
        const {data, order, orderBy, selected, rowsPerPage, page} = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
        return (
            <Paper className={classes.root}>
                <EnhancedTableToolbar numSelected={selected.length}/>
                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={data.length}
                        />
                        <TableBody>
                            {data
                                .sort(getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(n => {
                                    const isSelected = this.isSelected(n.id);
                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => this.handleClick(event, n.id)}
                                            role=""
                                            aria-checked={isSelected}
                                            tabIndex={-1}
                                            key={n.id}
                                            selected={isSelected}
                                        >
                                            <TableCell component="string">
                                                <Button variant="contained" color="primary" className={classes.button} onClick={()=>this.handleModalClick(n._id)}>
                                                    Edit
                                                </Button>
                                            </TableCell>
                                            <TableCell>{n.status}</TableCell>
                                            <TableCell component="string">{n.productName}</TableCell>
                                            <TableCell component="th" scope="row" padding="none">
                                                {n.email}
                                            </TableCell>
                                            <TableCell component="th" scope="row"
                                                       padding="none">{n.serialNumber}</TableCell>
                                            <TableCell>{n.purchaseDate && moment(n.purchaseDate).format('LLLL')}</TableCell>
                                            <TableCell>
                                                <div style={{flexGrow: 1, marginTop: "50px"}}>
                                                    <Grid container spacing={24}>
                                                        {n.imagesData &&
                                                        n.imagesData.map((file, index) =>
                                                            index<3 &&
                                                            <Grid key={index} item xs>
                                                                <img src={file.url}
                                                                     style={{maxWidth: "100px", maxHeight: "100px"}}
                                                                     key={file.name}/>
                                                            </Grid>)
                                                        }
                                                    </Grid>
                                                </div>
                                            </TableCell>
                                            <TableCell>{n._created_at && moment(n._created_at).format('LLLL')}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow key="emptyrow" style={{height: 49 * emptyRows}}>
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page',
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
                {
                this.state.isOpen &&
                <WarrantyRequestEditor
                    open={this.state.isOpen}
                    data={this.state.source}
                    handleSubmit={this.handleSubmit}/>
                }
            </Paper>
        );
    }
}

OfflineWarranties.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OfflineWarranties);
