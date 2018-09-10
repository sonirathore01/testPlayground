import React from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import GridListTile from '@material-ui/core/GridListTile';


function getModalStyle() {
    return {
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    };
}

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
    },
    subheader: {
        width: '100%',
    },
    images: {
        display: 'inline-block',
        float: 'left',
        margin: '0px',
        padding: '0px',
    }
});

class WarrantyRequestEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: props.open,
            _id:props.data._id,
            productName: props.data.productName,
            email: props.data.email,
            serialNumber: props.data.serialNumber,
            purchaseDate: props.data.purchaseDate,
            imagesData: props.data.imagesData,
            _created_at: props.data._created_at,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.open,
            _id:nextProps.data._id,
            productName: nextProps.data.productName,
            email: nextProps.data.email,
            serialNumber: nextProps.data.serialNumber,
            purchaseDate: nextProps.data.purchaseDate,
            imagesData: nextProps.data.imagesData,
            _created_at: nextProps.data._created_at,
        })
    }

    handleChange = (e) => {
        let key = e.target.id;
        this.setState({[key]: e.target.value});
    }

    handleClose = () => {
        this.setState({open: false});
    };

    handleSubmit = () => {
        this.props.handleSubmit(this.state);
    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <div style={getModalStyle()} className={classes.paper}>
                        <h2>Update Information</h2>
                        <form className={classes.container} noValidate autoComplete="off">
                            <TextField
                                id="productName"
                                label="Product Name"
                                value={this.state.productName}
                                fullWidth
                                onChange={this.handleChange}
                                margin="normal"
                            />
                            <TextField
                                id="serialNumber"
                                label="Serial Number"
                                value={this.state.serialNumber}
                                fullWidth
                                onChange={this.handleChange}
                                margin="normal"
                            />
                            <TextField
                                id="email"
                                label="Email"
                                value={this.state.email}
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                                margin="normal"
                            />
                            <TextField
                                id="purchaseDate"
                                label="Purchase Date"
                                value={this.state.purchaseDate}
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                                margin="normal"
                            />


                            {this.state.imagesData && this.state.imagesData.map((tile, index) => {

                                    return (index < 3 && <GridListTile className={classes.images} key={tile.img} cols={3}>
                                        <img src={tile.url} alt={tile.name} height="100px" width="150px"/>
                                    </GridListTile>)

                                }
                            )
                            }
                            <TextField
                                id="_created_at"
                                label="Created At"
                                value={this.state._created_at}
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                                margin="normal"
                            />

                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                onClick={this.handleSubmit}>
                                Approve
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                className={classes.button}
                                onClick={this.handleClose}>
                                Cancel
                            </Button>
                        </form>
                    </div>
                </Modal>
            </div>
        )
    }
}

WarrantyRequestEditor.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default WarrantyRequestEditor = withStyles(styles)(WarrantyRequestEditor);
