import React from "react";
import {
    Button,
    FormControl,
    FormControlLabel,
    MenuItem,
    Select,
    Grid,
    TextField,
    InputLabel,
    Checkbox,
    IconButton,
    RadioGroup,
    Radio,
} from "@material-ui/core";
import { GET_CATEGORIES_FOR_SEARCH } from "../../Settings/Seller/Queries";
import { connect } from "react-redux";
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

        // Default state
        this.state = {
            search: {
                paymentStatus: null,
                sellerName: JSON.parse(
                    localStorage.getItem(process.env.REACT_LOGGED_USER)
                ).email,
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
        this.checkPaymentStatus = this.checkPaymentStatus.bind(this);
        this.chooseWarehouse = this.chooseWarehouse.bind(this);
        this.onReset = this.onReset.bind(this);
    }

    /**
     * @summary checkPaymentStatus
     * @param {String} e
     */
    checkPaymentStatus(e) {
        this.setState({
            search: {
                startDate: this.state.search.startDate,
                endDate: this.state.search.endDate,
                paymentStatus: e.target.value,
                sellerName: this.state.search.sellerName,
                centerWarehouse: this.state.search.centerWarehouse,
                insideWarehouse: this.state.search.insideWarehouse,
                status: this.state.search.status,
                chooseStatus: this.state.search.chooseStatus,
                supplyPrice: this.state.search.supplyPrice,
                sku: this.state.search.sku,
                brand: this.state.search.brand,
                description: this.state.search.description,
            },
        });
    }

    /**
     * @summary chooseWarehouse
     * @param {String} e
     */
    chooseWarehouse(e, type) {
        if (type === "center") {
            this.setState({
                search: {
                    startDate: this.state.search.startDate,
                    endDate: this.state.search.endDate,
                    paymentStatus: this.state.search.paymentStatus,
                    sellerName: this.state.search.sellerName,
                    centerWarehouse: !this.state.search.centerWarehouse,
                    insideWarehouse: this.state.search.insideWarehouse,
                    status: this.state.search.status,
                    chooseStatus: this.state.search.chooseStatus,
                    supplyPrice: this.state.search.supplyPrice,
                    sku: this.state.search.sku,
                    brand: this.state.search.brand,
                    description: this.state.search.description,
                },
            });
        }

        if (type === "inside") {
            this.setState({
                search: {
                    startDate: this.state.search.startDate,
                    endDate: this.state.search.endDate,
                    paymentStatus: this.state.search.paymentStatus,
                    sellerName: this.state.search.sellerName,
                    centerWarehouse: this.state.search.centerWarehouse,
                    insideWarehouse: !this.state.search.insideWarehouse,
                    status: this.state.search.status,
                    chooseStatus: this.state.search.chooseStatus,
                    supplyPrice: this.state.search.supplyPrice,
                    sku: this.state.search.sku,
                    brand: this.state.search.brand,
                    description: this.state.search.description,
                },
            });
        }
    }

    /**
     * @summary chooseStatus
     * @param {String} e
     */
    checkStatus(e) {
        let newArray = [...this.state.search.chooseStatus, e.target.id];

        if (this.state.search.chooseStatus.includes(e.target.id)) {
            newArray = newArray.filter(
                (chooseStatus) => chooseStatus !== e.target.id
            );
        }

        this.setState({
            search: {
                startDate: this.state.search.startDate,
                endDate: this.state.search.endDate,
                paymentStatus: this.state.search.paymentStatus,
                sellerName: this.state.search.sellerName,
                centerWarehouse: this.state.search.centerWarehouse,
                insideWarehouse: this.state.search.insideWarehouse,
                status: this.state.search.status,
                chooseStatus: newArray,
                supplyPrice: this.state.search.supplyPrice,
                sku: this.state.search.sku,
                brand: this.state.search.brand,
                description: this.state.search.description,
            },
        });
    }

    /**
     * @summary onReset
     * @param {MouseEvent} event
     */
    onReset(event) {
        this.setState({
            search: {
                startDate: "",
                endDate: "",
                paymentStatus: null,
                sellerName: JSON.parse(
                    localStorage.getItem(process.env.REACT_LOGGED_USER)
                ).email,
                centerWarehouse: null,
                insideWarehouse: null,
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
     * @override
     */
    async componentDidMount() {
        const { data } = await this.props.apolloClient.httpClient.query({
            query: GET_CATEGORIES_FOR_SEARCH,
        });

        if (data) {
            this.setState({
                categories: data.categories,
            });
        }

        if (data) {
            this.setState({
                sticker: data.getStickers,
            });
        }
    }

    searchWord(e) {
        this.setState({
            searchWord: e.target.value,
        });
    }

    /**
     * @override
     */
    render() {
        return (
            <React.Fragment>
                <Grid container>
                    <Grid item md={11} xs={12}>
                        <Grid container spacing={3} alignItems="center">
                            <Grid
                                item
                                md={2}
                                xs={12}
                                className="align-items-center"
                            >
                                <h5>날짜</h5>
                            </Grid>
                            <Grid item md={3} xs={5}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    type="date"
                                    name="startDate"
                                    // onBlur={(startDate) => this.saveData(startDate)}
                                    value={this.state.search.startDate}
                                    onChange={(e) =>
                                        this.saveData(e, "startDate")
                                    }
                                />
                            </Grid>
                            <Grid item md={1} xs={1} className="text-center">
                                <h5>~</h5>
                            </Grid>
                            <Grid item md={3} xs={5}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    type="date"
                                    name="endDate"
                                    // onBlur={(endDate) => this.saveData(endDate)}
                                    value={this.state.search.endDate}
                                    onChange={(e) =>
                                        this.saveData(e, "endDate")
                                    }
                                />
                            </Grid>
                        </Grid>

                        {/* Payment status */}
                        <Grid container spacing={3} alignItems="center">
                            <Grid
                                item
                                md={2}
                                xs={12}
                                className="align-items-center"
                            >
                                <h5>정산 상태</h5>
                            </Grid>
                            <Grid item md={4} xs={12}>
                                <FormControl component="fieldset">
                                    <RadioGroup
                                        aria-label="paymentStatus"
                                        name="paymentStatus"
                                        onChange={this.checkPaymentStatus.bind(
                                            this
                                        )}
                                    >
                                        <FormControlLabel
                                            value="true"
                                            control={<Radio />}
                                            label="정산 완료"
                                            checked={
                                                this.state.search
                                                    .paymentStatus === "true"
                                            }
                                        />
                                        <FormControlLabel
                                            value="false"
                                            control={<Radio />}
                                            label="정산 미완"
                                            checked={
                                                this.state.search
                                                    .paymentStatus === "false"
                                            }
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                        {/* End Payment status */}

                        {/* Choose warehouse */}
                        <Grid container spacing={3} alignItems="center">
                            <Grid
                                item
                                md={2}
                                xs={12}
                                className="align-items-center"
                            >
                                <h5>창고 구분</h5>
                            </Grid>
                            <Grid item md={4} xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="chooseWarehouse"
                                            color="primary"
                                            id="center"
                                            value={true}
                                            checked={
                                                this.state.search
                                                    .centerWarehouse === true
                                            }
                                            onChange={(e) =>
                                                this.chooseWarehouse(
                                                    e,
                                                    "center"
                                                )
                                            }
                                        />
                                    }
                                    label="본사창고"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="chooseWarehouse"
                                            color="primary"
                                            id="inside"
                                            value={true}
                                            checked={
                                                this.state.search
                                                    .insideWarehouse === true
                                            }
                                            onChange={(e) =>
                                                this.chooseWarehouse(
                                                    e,
                                                    "inside"
                                                )
                                            }
                                        />
                                    }
                                    label="기타창고"
                                />
                            </Grid>
                        </Grid>
                        {/* End Product status */}

                        {/* status */}
                        <Grid container spacing={3} alignItems="center">
                            <Grid
                                item
                                md={2}
                                xs={12}
                                className="align-items-center"
                            >
                                <h5>속성</h5>
                            </Grid>
                            <Grid item md={10} xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="chooseStatus"
                                            color="primary"
                                            id="Warehousing"
                                            value="Warehousing"
                                            onChange={this.checkStatus.bind(
                                                this
                                            )}
                                            checked={
                                                this.state.search.chooseStatus.findIndex(
                                                    (f) => f === "Warehousing"
                                                ) !== -1
                                            }
                                        />
                                    }
                                    label="입고"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="chooseStatus"
                                            color="primary"
                                            id="SALES"
                                            value="SALES"
                                            onChange={this.checkStatus.bind(
                                                this
                                            )}
                                            checked={
                                                this.state.search.chooseStatus.findIndex(
                                                    (f) => f === "SALES"
                                                ) !== -1
                                            }
                                        />
                                    }
                                    label="판매"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="chooseStatus"
                                            color="primary"
                                            id="MARKETING"
                                            value="MARKETING"
                                            onChange={this.checkStatus.bind(
                                                this
                                            )}
                                            checked={
                                                this.state.search.chooseStatus.findIndex(
                                                    (f) => f === "MARKETING"
                                                ) !== -1
                                            }
                                        />
                                    }
                                    label="마케팅"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="chooseStatus"
                                            color="primary"
                                            id="RETURN"
                                            value="RETURN"
                                            onChange={this.checkStatus.bind(
                                                this
                                            )}
                                            checked={
                                                this.state.search.chooseStatus.findIndex(
                                                    (f) => f === "RETURN"
                                                ) !== -1
                                            }
                                        />
                                    }
                                    label="반품"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            name="chooseStatus"
                                            color="primary"
                                            id="DELETED"
                                            value="DELETED"
                                            onChange={this.checkStatus.bind(
                                                this
                                            )}
                                            checked={
                                                this.state.search.chooseStatus.findIndex(
                                                    (f) => f === "DELETED"
                                                ) !== -1
                                            }
                                        />
                                    }
                                    label="폐기"
                                />
                            </Grid>
                        </Grid>
                        {/* End Product status */}

                        {/* Seller name */}
                        <Grid container spacing={3} alignItems="center">
                            <Grid
                                item
                                md={2}
                                xs={12}
                                className="align-items-center"
                            >
                                <h5>SKU</h5>
                            </Grid>

                            <Grid item md={5} sm={6} xs={12}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    type="text"
                                    variant="outlined"
                                    name="sku"
                                    onChange={(sku) => this.saveData(sku)}
                                    value={this.state.search.sku}
                                    m={20}
                                />
                            </Grid>
                        </Grid>
                        {/* Seller name */}
                        <Grid container spacing={3} alignItems="center">
                            <Grid
                                item
                                md={2}
                                xs={12}
                                className="align-items-center"
                            >
                                <h5>브랜드</h5>
                            </Grid>

                            <Grid item md={5} sm={6} xs={12}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    type="text"
                                    variant="outlined"
                                    name="brand"
                                    onChange={(brand) => this.saveData(brand)}
                                    value={this.state.search.brand}
                                    m={20}
                                />
                            </Grid>
                        </Grid>

                        {/* Seller name */}
                        <Grid container spacing={3} alignItems="center">
                            <Grid
                                item
                                md={2}
                                xs={12}
                                className="align-items-center"
                            >
                                <h5>메모</h5>
                            </Grid>

                            <Grid item md={5} sm={6} xs={12}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    type="text"
                                    variant="outlined"
                                    name="description"
                                    onChange={(description) =>
                                        this.saveData(description)
                                    }
                                    value={this.state.search.description}
                                    m={20}
                                />
                            </Grid>
                            <Grid item md={5} xs={12} className="text-right">
                                <Button
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
                        </Grid>
                    </Grid>
                    <Grid item md={1} xs={12} className="text-right">
                        <IconButton
                            color="primary"
                            aria-label="Reset"
                            onClick={(e) => this.onReset(e)}
                        >
                            <RotateLeftIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                {/* End Seller name */}
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
