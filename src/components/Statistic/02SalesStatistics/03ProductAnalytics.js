import React from "react";
import PageTitle from "../../../core/common/Partials/PageTitle";

import {
    Avatar,
    Box,
    Button, Radio, FormControl,
    Grid, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography,
} from "@material-ui/core";

import MenuIcon from '@material-ui/icons/Menu';

import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import PaginationMaterial from "@material-ui/lab/Pagination/Pagination";
import SaveIcon from "@material-ui/icons/Save";
import {addDays} from "date-fns";
import { GET_SALE_PRODUCTS, GET_PRODUCT_VIEW, GET_PRODUCT_VIEW_COUNT} from "./Queries";
import {getCSV, getDate} from "../utils";
import moment from "moment";



class Statistics extends React.Component {
    /**
     * @constructor
     */


    constructor(props) {
        super(props);

        // Default state
        this.state = {
            value:0,
            startDate: addDays(new Date(), -60),
            endDate: new Date(),
            products:[],
            sku:"",
            total: 0,
            pagination: {
                rowsPerPage: 10,
                pageNumber: 1,
            },
            orderBy: "registerDate",
            type: "DESC",
            selectedProducts:'',
            showSelected:false,
            productSales:[],
            total2: 0,
            pagination2: {
                rowsPerPage: 10,
                pageNumber: 1,
            },
            limits:[
                10,
                50,
                100,
            ],
            salesPrice1: {
                dates:[],
                series:[],
                legends:[]
            },
            salesPrice2:{
                dates:[],
                series:[],
                legends:[]
            },
            view1:[],


        };

        this.handleChangeTab = this.handleChangeTab.bind(this);
        this.handleChangeTab2 = this.handleChangeTab2.bind(this);
        this.getData = this.getData.bind(this);
        this.setDate = this.setDate.bind(this);
        this.setSku = this.setSku.bind(this);
        this.setPageLimit = this.setPageLimit.bind(this);
        this.handlePageNumber = this.handlePageNumber.bind(this);
        this.handlePageNumber2 = this.handlePageNumber2.bind(this);
        this.selectProduct = this.selectProduct.bind(this);

        this.getStatistic = this.getStatistic.bind(this);
        this.download = this.download.bind(this);

    }

    async setPageLimit(event){
        this.setState({
            pagination2: {
                rowsPerPage: event.target.value,
                pageNumber: 1,
            }
        });
        await this.getData(1);

    }
    async handlePageNumber(e, page) {
        this.setState({
            pagination: {
                rowsPerPage: this.state.pagination.rowsPerPage,
                pageNumber: page,
            }
        });

        await this.getData(page);
    }
    async handlePageNumber2(e, page) {
        this.setState({
            pagination2: {
                rowsPerPage: this.state.pagination2.rowsPerPage,
                pageNumber: page,
            }
        });

        await this.getStatistic(page);
    }
    setSku(value) {
        this.setState({
            sku: value
        });
    };
    handleChangeTab(event, newValue) {
        this.setState({
            value: newValue
        });
    };
    handleChangeTab2(event, newValue) {
        this.setState({
            value: newValue
        });
    };
    tabProps(index) {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    }
    async componentDidMount() {

        await this.getData(null);

    }
    setDate(value, type) {
        let date = new Date(value)
        if (type == "start") {
            this.setState({
                startDate: date
            });
        } else {
            this.setState({
                endDate: date
            });
        }
    }
    async getData(page) {
        await this.props.apolloClient.httpClient
            .query({
                query: GET_SALE_PRODUCTS,
                variables: {
                    "search": {
                        "startDate": getDate(this.state.startDate),
                        "endDate": getDate(this.state.endDate),
                        "code": this.state.sku,
                    },
                    page: {
                        limit: this.state.pagination.rowsPerPage,
                        pageNumber: page ? page :this.state.pagination.pageNumber,
                        orderBy: this.state.orderBy,
                        type: this.state.type,
                    },
                },
            })
            .then((result) => {
                this.setState({
                    products: result.data.getProductsForStatistics.list,
                    total: result.data.getProductsForStatistics.totalElements
                });

            });



    }
    selectProduct(sku){
        this.setState({
            selectedProducts:sku,
            showSelected:false
        })
    }
    async getStatistic(page){
        await this.props.apolloClient.httpClient
            .query({
                query: GET_PRODUCT_VIEW,
                variables: {
                    "search": {
                        "productId": this.state.selectedProducts,
                    },
                    page: {
                        limit: this.state.pagination2.rowsPerPage,
                        pageNumber: page ? page :this.state.pagination2.pageNumber,
                        orderBy: "saleDate",
                        type: "DESC",
                    },
                },
            })
            .then((result) => {

                this.setState({
                    productSales: result.data.getProductAllViewCount.list,
                    total2: result.data.getProductAllViewCount.totalElements,
                });

            });
        await this.props.apolloClient.httpClient
            .query({
                query: GET_PRODUCT_VIEW_COUNT,
                variables: {
                    "search": {
                        "productId": this.state.selectedProducts,
                        "startDate": getDate(this.state.startDate),
                        "endDate": getDate(this.state.endDate),
                    },

                },
            })
            .then((result) => {

                this.setState({
                    view1: result.data.getProductViewTotalCount

                });

            });
    }
    download() {


        getCSV(["saleDate", "viewCount", "wishCount", "cartCount"], this.state.productSales, "sales-product-statistic.csv", []);


    }


    /**
     * @override
     */
    render() {
        return (
            <React.Fragment>
                {/* Title section */}
                <Grid container>
                    <Grid item>
                        {/* Title */}
                        <PageTitle
                            menuName="상품 분석"
                            title="매출 통계 관리 - 상품 분석"
                            icon={<MenuIcon />}
                        />
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item md={12}>
                        <div className="card mt-20">
                            <Grid container className="align-items-center mt-20">
                                <Grid item md={12} xs={12}>
                                    <Table aria-label="simple table" className="mail_table">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>기간선택</TableCell>
                                                <TableCell>
                                                    <Grid container spacing={1} className="align-items-center">
                                                        <Grid item md={5} xs={6}>
                                                            <TextField
                                                                fullWidth
                                                                id="startDate-basic"
                                                                type="date"
                                                                size="small"
                                                                variant="outlined"
                                                                name="startDate"
                                                                defaultValue={moment(
                                                                    this.state.startDate,
                                                                ).format("YYYY-MM-DD")}
                                                                onChange={(e) => this.setDate(e.target.value, "start")}
                                                            />
                                                        </Grid>
                                                        <Grid item md={2} xs={6}>
                                                            <div className="text-center">~</div>
                                                        </Grid>
                                                        <Grid item md={5} xs={6}>
                                                            <TextField
                                                                fullWidth
                                                                id="startDate-basic"
                                                                type="date"
                                                                size="small"
                                                                variant="outlined"
                                                                name="endDate"
                                                                defaultValue={moment(
                                                                    this.state.endDate,
                                                                ).format("YYYY-MM-DD")}
                                                                onChange={(e) => this.setDate(e.target.value, "end")}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Grid>
                                <Grid item md={12} xs={12} className="mt-20">
                                    <Table aria-label="simple table" className="mail_table">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>상품코드 SKU</TableCell>
                                                <TableCell>
                                                    <TextField
                                                        id="name-basic"
                                                        label="검색어를 입력하세요"
                                                        size="small"
                                                        variant="outlined"
                                                        name="name"
                                                        fullWidth

                                                        onChange={(e)=>this.setSku(e.target.value)}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Grid>
                            </Grid>
                            <div className="text-right mt-20">
                                <Button
                                    variant="contained"
                                    size="small"
                                    color="primary"
                                    onClick={()=>this.getData(1)}
                                >
                                    검색
                                </Button>
                            </div>

                            <Grid container className="align-items-center mt-20">
                                <div>총 {this.state.total} 건</div>
                                <Grid item md={12} xs={12} className="mt-20">
                                    <Table className="order_table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell padding="checkbox">

                                                </TableCell>
                                                <TableCell>번호</TableCell>
                                                <TableCell colSpan={2}>재품명 카테고리</TableCell>
                                                <TableCell>브랜드</TableCell>
                                                <TableCell>출시일</TableCell>
                                                <TableCell>수량</TableCell>
                                                <TableCell>SKU</TableCell>
                                                <TableCell>판매가</TableCell>
                                                <TableCell>등록자</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                (this.state.products || []).map((product, index) =>{

                                                        let imageUrl = undefined
                                                        if(product.imageUrl){
                                                            imageUrl = product.imageUrl.substring(0, 4) !== "http" ?
                                                                process.env.REACT_APP_CDN_URL + "product/medium/" + product.imageUrl :
                                                                product.imageUrl;
                                                        }
                                                        return <TableRow key={index}>
                                                            <TableCell padding="checkbox">
                                                                <Radio
                                                                    color="primary"
                                                                    checked={this.state.selectedProducts == product.id}
                                                                    onChange={() => this.selectProduct(product.id)}
                                                                    name="selectedProducts"
                                                                />
                                                            </TableCell>
                                                            <TableCell>{index+1}</TableCell>
                                                            <TableCell>
                                                                <Box
                                                                    alignItems="center"
                                                                    display="flex"
                                                                >
                                                                    <Avatar
                                                                        src={imageUrl}
                                                                        variant="square"
                                                                    >
                                                                    </Avatar>
                                                                </Box>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Box
                                                                    alignItems="center"
                                                                    display="flex"
                                                                >
                                                                    <Typography
                                                                        color="textPrimary"
                                                                        variant="body1"
                                                                        className="item-title"
                                                                    >
                                                                        <span className="product-name">{product.name}</span> <br/>
                                                                        {product.firstCategory} > {product.secondCategory} > {product.thirdCategory}
                                                                    </Typography>
                                                                </Box>
                                                            </TableCell>
                                                            <TableCell>{product.brand}</TableCell>
                                                            <TableCell>{getDate(product.registerDate)}</TableCell>
                                                            <TableCell>{product.inventory}</TableCell>
                                                            <TableCell>{product.sku}</TableCell>
                                                            <TableCell>{product.price}</TableCell>
                                                            <TableCell>{product.registerUser}</TableCell>
                                                        </TableRow>
                                                    }


                                                )
                                            }

                                        </TableBody>
                                    </Table>
                                </Grid>
                            </Grid>
                            <Grid container className="mt-20">
                                <Grid item md={6} xs={6}>
                                    <PaginationMaterial
                                        count={Math.ceil(
                                            this.state.total /
                                            this.state.pagination.rowsPerPage
                                        )}
                                        page={this.state.pagination.pageNumber}
                                        onChange={(e, page) => this.handlePageNumber(e, page)}
                                        color="primary"
                                    />
                                </Grid>
                                <Grid item md={6} xs={6}>
                                    <div className="text-right">
                                        <Button
                                            variant="contained"
                                            size="small"
                                            color="primary"

                                            onClick={()=>this.getStatistic(1)}
                                        >
                                            상품 선택
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>





                            <Grid container className="mt-20">
                                <Grid item md={12} xs={12}>
                                     <h2>매출 통계 관리</h2>
                                     <p>상품 분석</p>
                                </Grid>
                            </Grid>
                            <Grid container className="align-items-center">
                                <Grid item md={12} xs={12}>
                                    <Table aria-label="simple table" className="analiz">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>기간</TableCell>
                                                <TableCell>조회수</TableCell>
                                                <TableCell>위시리스트</TableCell>
                                                <TableCell>카드</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.state.view1.map((row, index)=><TableRow kye={index}>
                                                <TableCell>{row.saleDate}</TableCell>
                                                <TableCell>{row.viewCount}</TableCell>
                                                <TableCell>{row.wishCount}</TableCell>
                                                <TableCell>{row.cartCount}</TableCell>
                                            </TableRow>)}

                                        </TableBody>
                                    </Table>
                                </Grid>
                            </Grid>



                            <Grid container className="align-items-center mt-20">
                                <Grid item xs={10}></Grid>
                                <Grid item xs={2}>
                                    <FormControl size="small" fullWidth variant="outlined">
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"

                                            defaultValue={this.state.pagination.rowsPerPage}
                                            onChange={(e) => this.setPageLimit(e)}
                                        >

                                            {
                                                (this.state.limits || []).map((limit, index) =>

                                                    <MenuItem key={index}
                                                              value={limit}>{limit}개</MenuItem>
                                                )
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Grid container className="align-items-center">
                                <Grid item md={12} xs={12}>
                                    <Table aria-label="simple table" className="mail_history_table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>년월</TableCell>
                                                <TableCell>조회수</TableCell>
                                                <TableCell>위시리스트</TableCell>
                                                <TableCell>카드</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.state.productSales.map((product, index)=>  <TableRow key={index}>
                                                <TableCell>{product.saleDate}</TableCell>
                                                <TableCell>{product.viewCount}</TableCell>
                                                <TableCell>{product.wishCount}</TableCell>
                                                <TableCell>{product.cartCount}</TableCell>
                                            </TableRow>)}

                                        </TableBody>

                                    </Table>
                                </Grid>
                            </Grid>

                            <Grid container className="mt-20">
                                <Grid item md={10} xs={10}>
                                    <PaginationMaterial
                                        count={Math.ceil(
                                            this.state.total2 /
                                            this.state.pagination2.rowsPerPage
                                        )}
                                        page={this.state.pagination2.pageNumber}
                                        onChange={(e, page) => this.handlePageNumber2(e, page)}
                                        color="primary"
                                    />
                                </Grid>
                                <Grid item md={2} xs={2}>
                                    <div className="text-right">
                                        <Button
                                            variant="contained"
                                            size="small"
                                            color="primary"
                                            startIcon={<SaveIcon color="white" size="1rem" />}
                                            onClick={this.download}
                                        >
                                            엑셀파일다운
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>



                        </div>
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

export default withSnackbar(connect(mapStateToProps, null)(Statistics));
