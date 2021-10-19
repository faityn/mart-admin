import React from "react";

import {
    Button,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@material-ui/core";

import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import { addDays } from "date-fns";
import moment from "moment";

import {
    GET_PRODUCTS_SOLD,
    GET_PRODUCTS_SOLD_DETAIL,
    GET_USER_REG,
} from "../../Queries";

import { getDate } from "./utils";
import BarChart from "./common/BarChart";

class Statistics extends React.Component {
    /**
     * @constructor
     */

    constructor(props) {
        super(props);

        // Default state
        this.state = {
            productId: "",
            products: [],
            startDate: addDays(new Date(), -30),
            endDate: new Date(),
            chartOneData: [],
            chartTwoData: [],
        };

        this.getData = this.getData.bind(this);
        this.setFilter = this.setFilter.bind(this);
        this.search = this.search.bind(this);
        this.getOptions = this.getOptions.bind(this);
        this.getOptionsByProduct = this.getOptionsByProduct.bind(this);
    }

    async componentDidMount() {
        await this.getData();
    }

    async getData() {
        await this.props.apolloClient.httpClient
            .query({
                query: GET_PRODUCTS_SOLD,
            })
            .then((result) => {
                let products = [];
                result.data.getProductSold.map((product) => {
                    let p = {};
                    p["id"] = product.productId;
                    p["sku"] = product.sku;
                    products.push(p);
                });
                this.setState({
                    chartOneData: result.data.getProductSold,
                    products: products,
                });
            });
    }

    setFilter(value, type) {
        let date = new Date(value);
        if (type == "start") {
            this.setState({
                startDate: date,
            });
        } else if (type == "end") {
            this.setState({
                endDate: date,
            });
        } else {
            this.setState({
                productId: value,
            });
        }
    }

    async search(e) {
        await this.props.apolloClient.httpClient
            .query({
                query: GET_PRODUCTS_SOLD_DETAIL,
                variables: {
                    productId: this.state.productId,
                    startDate: getDate(this.state.startDate),
                    endDate: getDate(this.state.endDate),
                },
            })
            .then((result) => {
                this.setState({
                    chartTwoData: result.data.getProductSoldDetail,
                });
            });
    }

    getOptions() {
        // let title = "Sales summary";
        let title = "판매 현황";

        var data = this.state.chartOneData.map((count) => count.totalPrice);
        var labels = this.state.chartOneData.map((count) => count.sku);
        // var labels1 = [
        //   "1 product",
        //   "2 product",
        //   "3 product",
        //   "4 product",
        //   "5 product",
        //   "6 product",
        // ];
        // var data1 = [23.2, 25.6, 76.7, 135.6, 162.2, 32.6];

        return {
            name: title,
            legend: {
                // data: ["Amount"],
                data: ["금액"],
            },
            xAxis: {
                type: "category",
                data: labels,
            },
            yAxis: {
                type: "value",
            },
            tooltip: {
                trigger: "axis",
            },
            series: [
                {
                    // name: "Amount",
                    name: "금액",
                    type: "bar",
                    data: data,
                },
            ],
            toolbox: {
                feature: {
                    saveAsImage: {
                        name: title,
                        pixelRatio: 2,
                    },
                },
            },
        };
    }

    getOptionsByProduct() {
        // let title = "Sales amount";
        let title = "판매 금액";

        let data1 = [];
        let data2 = [];
        let labels = [];

        if (this.state.chartTwoData) {
            data1 = this.state.chartTwoData.map((item) => item.totalPrice);
            data2 = this.state.chartTwoData.map((item) => item.count);
            labels = this.state.chartTwoData.map((item) =>
                moment(item.registerDate).format("YYYY-MM-DD")
            );
        }

        return {
            name: title,
            legend: {
                // data: ["Amount", "Count"],
                data: ["판매 금액", "판매 갯수"],
            },
            xAxis: {
                type: "category",
                data: labels,
            },
            yAxis: {
                type: "value",
            },
            tooltip: {
                trigger: "axis",
            },
            series: [
                {
                    name: "판매 금액",
                    type: "bar",
                    data: data1,
                },
                {
                    name: "판매 갯수",
                    type: "line",
                    data: data2,
                },
            ],
            toolbox: {
                feature: {
                    saveAsImage: {
                        name: title,
                        pixelRatio: 2,
                    },
                },
            },
        };
    }

    /**
     * @override
     */
    render() {
        return (
            <React.Fragment>
                <div className="card mt-20">
                    <Grid container>
                        <Grid item md={12} xs={12}>
                            {/* <h2>Sales summary</h2> */}
                            <h2>판매 현황</h2>
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <div
                                style={{
                                    width: "100%",
                                    height: 400,
                                    marginTop: "20px",
                                }}
                            >
                                <BarChart options={this.getOptions()} />
                            </div>
                        </Grid>
                    </Grid>
                </div>

                <div className="card mt-20">
                    <Grid container className="align-items-center">
                        <Grid item md={12} xs={12}>
                            {/* <h2>Sales amount by product</h2> */}
                            <h2>품목별 따른 판매실적</h2>
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <Table
                                aria-label="simple table"
                                className="mail_table"
                            >
                                <TableBody>
                                    <TableRow>
                                        <TableCell>검색조건</TableCell>
                                        <TableCell>
                                            <Grid
                                                container
                                                spacing={1}
                                                className="align-items-center"
                                            >
                                                <Grid item md={3} xs={3}>
                                                    <FormControl
                                                        fullWidth
                                                        size="small"
                                                        variant="outlined"
                                                    >
                                                        <InputLabel id="select-product">
                                                            상품을 선택해주세요.
                                                        </InputLabel>
                                                        <Select
                                                            labelId="select-product"
                                                            label="Product"
                                                            name="select-product"
                                                            defaultValue=""
                                                            onChange={(e) =>
                                                                this.setFilter(
                                                                    e.target
                                                                        .value,
                                                                    "product"
                                                                )
                                                            }
                                                        >
                                                            <MenuItem value="">
                                                                <em>None</em>
                                                            </MenuItem>
                                                            {this.state.products.map(
                                                                (product) => (
                                                                    <MenuItem
                                                                        value={
                                                                            product.id
                                                                        }
                                                                    >
                                                                        {
                                                                            product.sku
                                                                        }
                                                                    </MenuItem>
                                                                )
                                                            )}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item md={1} xs={1}></Grid>
                                                <Grid item md={3} xs={3}>
                                                    <TextField
                                                        fullWidth
                                                        id="startDate-basic"
                                                        type="date"
                                                        size="small"
                                                        variant="outlined"
                                                        name="startDate"
                                                        defaultValue={moment(
                                                            this.state.startDate
                                                        ).format("YYYY-MM-DD")}
                                                        onChange={(e) =>
                                                            this.setFilter(
                                                                e.target.value,
                                                                "start"
                                                            )
                                                        }
                                                    />
                                                </Grid>
                                                <Grid item md={1} xs={1}>
                                                    <div className="text-center">
                                                        ~
                                                    </div>
                                                </Grid>
                                                <Grid item md={3} xs={3}>
                                                    <TextField
                                                        fullWidth
                                                        id="startDate-basic"
                                                        type="date"
                                                        size="small"
                                                        variant="outlined"
                                                        name="endDate"
                                                        defaultValue={moment(
                                                            this.state.endDate
                                                        ).format("YYYY-MM-DD")}
                                                        onChange={(e) =>
                                                            this.setFilter(
                                                                e.target.value,
                                                                "end"
                                                            )
                                                        }
                                                    />
                                                </Grid>
                                                <Grid item md={1} xs={1}>
                                                    <Button
                                                        variant="contained"
                                                        size="small"
                                                        color="primary"
                                                        onClick={(e) =>
                                                            this.search(e)
                                                        }
                                                    >
                                                        검색
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>

                    {this.state.productId !== "" ? (
                        <Grid container>
                            <Grid item md={12} xs={12}>
                                <div
                                    style={{
                                        width: "100%",
                                        height: 400,
                                        marginTop: "20px",
                                    }}
                                >
                                    <BarChart
                                        options={this.getOptionsByProduct()}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    ) : null}
                </div>
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

export default withSnackbar(connect(mapStateToProps, null)(Statistics));
