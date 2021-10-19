import React from "react";
import {
    CardContent,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Card,
    LinearProgress,
    Fade,
} from "@material-ui/core";
import PerfectScrollbar from "react-perfect-scrollbar";
import FlipCameraAndroidIcon from "@material-ui/icons/FlipCameraAndroid";

// Table
import OrderTable from "./Table";

// Icons
import SearchIcon from "@material-ui/icons/Search";

/**
 * @summary Pending
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Order
 */
class Pending extends React.Component {
    /**
     * @constructor
     */
    constructor(props) {
        super(props);

        // Merge search states
        this.state = {
            firstCategory: "",
            shippingCountry: "",
            shippingOptions: "",
            checkedOrders: true,
        };

        this.token = localStorage.getItem(process.env.REACT_ACCESS_TOKEN_NAME);

        // Bind
        this.handleChange = this.handleChange.bind(this);
    }

    /**
     * @summary handleChange
     * @param {MouseEvent} event
     */
    handleChange(event, type) {
        if (type === "category") {
            this.setState({
                firstCategory: event.target.value,
            });
        } else if (type === "country") {
            this.setState({
                shippingCountry: event.target.value,
            });
        } else if (type === "options") {
            this.setState({
                shippingOptions: event.target.value,
            });
        }
    }

    /**
     * @override
     */
    render() {
        if (!this.props.isShowForm) return <LinearProgress />;

        if (
            this.props.isShowForm.totalElements === 0 &&
            this.props.isShowForm.list.length === 0
        )
            return (
                <Grid container spacing={2} className="text-center mt-20">
                    <Grid item md={12} xs={12}>
                        <Button
                            size="small"
                            variant="contained"
                            color="default"
                            startIcon={<FlipCameraAndroidIcon />}
                            onClick={this.props.onChangeRefresh}
                        >
                            Refresh
                        </Button>
                        <div>There is no result</div>
                    </Grid>
                </Grid>
            );

        return (
            <CardContent>
                <Grid container spacing={3}>
                    {/* Search filter */}
                    <Grid item md={2} xs={3}>
                        <Grid container spacing={12}>
                            {/* 1st category */}
                            <Grid item md={12} xs={12} className="mt-20">
                                <FormControl
                                    size="small"
                                    fullWidth
                                    variant="outlined"
                                >
                                    <InputLabel id="demo-simple-select-outlined-label">
                                        1st category
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        label="1st category"
                                        onChange={(e) =>
                                            this.handleChange(e, "category")
                                        }
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        {(
                                            this.props.categories.first || []
                                        ).map((category, index) => (
                                            <MenuItem
                                                key={index}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            {/* End 1st category */}

                            {/* 배송 국가 */}
                            <Grid item md={12} xs={12} className="mt-20">
                                <FormControl
                                    size="small"
                                    fullWidth
                                    variant="outlined"
                                >
                                    <InputLabel id="demo-simple-select-outlined-label">
                                        Shipping country
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        label="Third category selection"
                                        onChange={(e) =>
                                            this.handleChange(e, "country")
                                        }
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="Mongolia">
                                            Mongolia
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            {/* End 배송 국가 */}

                            {/* 배송 옵션 */}
                            <Grid item md={12} xs={12} className="mt-20">
                                <FormControl
                                    size="small"
                                    fullWidth
                                    variant="outlined"
                                >
                                    <InputLabel id="demo-simple-select-outlined-label">
                                        Shipping options
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        label="Third category selection"
                                        onChange={(e) =>
                                            this.handleChange(e, "options")
                                        }
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="dhl">DHL</MenuItem>
                                        <MenuItem value="standard">
                                            Standard
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            {/* End 배송 옵션 */}

                            {/* Button */}
                            <Grid
                                item
                                md={12}
                                xs={12}
                                className="mt-20 text-center"
                            >
                                <Button
                                    variant="contained"
                                    size="small"
                                    color="primary"
                                    startIcon={
                                        <SearchIcon color="white" size="1rem" />
                                    }
                                    onClick={() =>
                                        this.props.search(this.state)
                                    }
                                >
                                    Search
                                </Button>
                            </Grid>
                            {/* End Button */}
                        </Grid>
                    </Grid>
                    {/* End Search filter */}

                    {/* Table */}
                    <Grid item md={10} xs={9}>
                        <Card className="customListTable">
                            {/* List */}
                            <CardContent>
                                <PerfectScrollbar>
                                    {/* Table */}
                                    <OrderTable
                                        data={this.props.data}
                                        status={this.props.status}
                                        pagination={this.props.pagination}
                                        orderBy={this.props.orderBy}
                                        handleRowsPerPage={
                                            this.props.handleRowsPerPage
                                        }
                                        handlePageNumber={
                                            this.props.handlePageNumber
                                        }
                                        handleOrderByProduct={
                                            this.props.handleOrderByProduct
                                        }
                                        onChangeRefresh={
                                            this.props.onChangeRefresh
                                        }
                                        handleChangeLoad={
                                            this.props.handleChangeLoad
                                        }
                                        handlePaging={this.props.handlePaging}
                                    />
                                </PerfectScrollbar>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </CardContent>
        );
    }
}

export default Pending;
