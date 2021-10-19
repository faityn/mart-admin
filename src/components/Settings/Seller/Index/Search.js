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
} from "@material-ui/core";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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

        // Default state
        this.state = {
            search: {
                code: "",
            },
            categories: {
                first: [],
                second: [],
                third: [],
            },
            sticker: "",
            searchWord: "name",
        };

        // Events
        this.saveData = this.saveData.bind(this);
        this.searchWord = this.searchWord.bind(this);
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

        if (name === "name") search.brand = null;
        else if (name === "brand") search.name = null;

        search[name] = value;

        this.setState({ search });
    }

    /**
     * @override
     */
    render() {
        return (
            <React.Fragment>
                {/* Container */}
                <Grid container spacing={3} alignItems="center">
                    {/* Title */}
                    <Grid item md={2} xs={12} className="align-items-center">
                        <h5>Search word</h5>
                    </Grid>
                    {/* End Title */}

                    {/* Select */}
                    <Grid item md={2} sm={4} xs={12}>
                        <FormControl
                            size="small"
                            fullWidth
                            variant="outlined"
                            defaultValue=""
                        >
                            <InputLabel id="demo-simple-select-outlined-label">
                                Select
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                onChange={this.searchWord}
                                defaultValue={this.state.searchWord}
                            >
                                <MenuItem value="name">Seller name</MenuItem>
                                <MenuItem value="brand">Brand name</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    {/* End Select */}

                    {/* TextField */}
                    <Grid item md={6} sm={8} xs={12}>
                        {this.state.searchWord === "name" ? (
                            <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                name="name"
                                onBlur={(name) => this.saveData(name)}
                                m={20}
                            />
                        ) : (
                            <TextField
                                fullWidth
                                size="small"
                                variant="outlined"
                                name="brand"
                                onBlur={(brand) => this.saveData(brand)}
                                m={20}
                            />
                        )}
                    </Grid>
                    {/* End TextField */}

                    {/* Button */}
                    <Grid item md={1} xs={12}>
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
                            Search
                        </Button>
                    </Grid>
                </Grid>
                {/* End Container */}

                {/* Container */}
                <Grid container spacing={3} alignItems="center">
                    {/* Title */}
                    <Grid item md={2} xs={12} className="align-items-center">
                        <h5>Date</h5>
                    </Grid>
                    {/* End Title */}

                    <Grid item md={3} xs={12}>
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            type="date"
                            name="dateFrom"
                            onChange={(dateFrom) => this.saveData(dateFrom)}
                        />
                    </Grid>

                    <Grid item md={3} xs={12}>
                        <TextField
                            fullWidth
                            size="small"
                            variant="outlined"
                            type="date"
                            name="dateTo"
                            onChange={(dateTo) => this.saveData(dateTo)}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Box display="flex" alignItems="right">
                            <Link to="/partners/create">
                                <Button
                                    fullWidth
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                >
                                    Create
                                </Button>
                            </Link>
                        </Box>
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
    };
};

export default connect(mapStateToProps, null)(ProductSearch);
