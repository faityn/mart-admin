import React from "react";
import {
    Button,
    Box,
    FormControl,
    MenuItem,
    Select,
    Grid,
    TextField,
    InputLabel,
    IconButton,
} from "@material-ui/core";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";

/**
 * @summary Product search
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Product/index
 */
class ProductSearch extends React.Component {
    /**
     * @constructor
     */
    constructor() {
        super();
        // let loggedUser = this.props.loggedUser ? this.props.loggedUser : null;
        // Default state
        this.state = {
            search: {
                paymentStatus: true,
                sellerName: null,
                centerWarehouse: null,
                insideWarehouse: null,
                status: null,
                sku: null,
                brand: null,
                memo: null,
                startDate: null,
                endDate: null,
                supplyPrice: null,
                chooseStatus: [],
            },
        };

        // Events
        this.saveData = this.saveData.bind(this);
        this.searchWord = this.searchWord.bind(this);
        this.onReset = this.onReset.bind(this);
    }

    searchWord(e) {
        this.setState({
            searchWord: e.target.value,
        });
    }

    /**
     * @summary saveData
     * @param {String} e
     */
    saveData(e) {
        let search = this.state.search;
        let name = e.target.name;
        let value = e.target.value;
        search[name] = value;

        this.setState({ search });
    }

    /**
     * @summary onReset
     * @param {MouseEvent} event
     */
    onReset(event) {
        let loggedUser = this.props.loggedUser ? this.props.loggedUser : null;
        this.setState({
            search: {
                startDate: "",
                endDate: "",
                paymentStatus: null,
                sellerName:
                    loggedUser.roleName === "ROLE_SELLER"
                        ? loggedUser.email
                        : "",
                centerWarehouse: false,
                insideWarehouse: false,
                status: null,
                chooseStatus: [],
                supplyPrice: "",
                sku: "",
                brand: "",
                description: "",
            },
        });
    }

    /**
     * @override
     */
    render() {
        let loggedUser = this.props.loggedUser ? this.props.loggedUser : null;
        return (
            <React.Fragment>
                {/* Container */}
                {loggedUser.roleName === "ROLE_SELLER" ? null : (
                    <Grid container spacing={3} alignItems="center">
                        {/* Sellername */}
                        <Grid item md={2} xs={12}>
                            <h5>파트너 명</h5>
                        </Grid>
                        <Grid item md={4} xs={12}>
                            <TextField
                                fullWidth
                                size="small"
                                type="text"
                                variant="outlined"
                                name="sellerName"
                                onChange={(sellerName) =>
                                    this.saveData(sellerName)
                                }
                                value={this.state.search.sellerName}
                                m={20}
                            />
                        </Grid>
                        {/* End Select */}
                    </Grid>
                )}
                {/* End Container */}

                {/* Container */}
                <Grid container spacing={3} alignItems="center">
                    {/* Title */}
                    <Grid item md={2} xs={12} className="align-items-center">
                        <h5>날짜</h5>
                    </Grid>
                    {/* End Title */}

                    <Grid item md={3} xs={12}>
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            type="date"
                            name="startDate"
                            value={this.state.search.startDate}
                            onChange={(e) => this.saveData(e, "startDate")}
                        />
                    </Grid>

                    <Grid item md={3} xs={12}>
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            type="date"
                            name="endDate"
                            value={this.state.search.endDate}
                            onChange={(e) => this.saveData(e, "endDate")}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={3} alignItems="center">
                    {/* Button */}
                    <Grid item md={1} xs={12} className="align-items-center">
                        <Button
                            fullWidth
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={() =>
                                this.props.searchWord(
                                    "firstChildsState",
                                    this.state
                                )
                            }
                        >
                            검색
                        </Button>
                    </Grid>
                    <Grid item md={1} xs={12}>
                        <IconButton
                            color="primary"
                            aria-label="Reset"
                            onClick={(e) => this.onReset(e)}
                        >
                            <RotateLeftIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

// Redux state to props
const mapStateToProps = (state) => {
    return {
        apolloClient: state.apolloClient,
        loggedUser: state.loggedUser,
    };
};

export default connect(mapStateToProps, null)(ProductSearch);
