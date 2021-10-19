import React from "react";
import PageTitle from "../../../core/common/Partials/PageTitle";

import {
    Avatar,
    Box,
    Button, Checkbox,
    FormControl,
    Grid, MenuItem, Radio, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography,
} from "@material-ui/core";

import MenuIcon from '@material-ui/icons/Menu';

import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import PaginationMaterial from "@material-ui/lab/Pagination/Pagination";
import SaveIcon from "@material-ui/icons/Save";
import Paper from "@material-ui/core/Paper/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SwipeableViews from "react-swipeable-views";

import {addDays} from "date-fns";
import moment from "moment";
import {GET_SALE_PRODUCTS, GET_SALE_PRODUCT_BY_CODE, GET_SALE_PRODUCT_DAILY, GET_SALE_PRODUCT_MONTHLY} from "./Queries"
import {getCSV, getDate} from "../utils";
import BarChart from "../common/BarChart";


class Statistics extends React.Component {
    /**
     * @constructor
     */

    // constructor(props) {
    //     super(props);
    //
    //     // Default state
    //     this.state = {
    //
    //     };
    //
    // }


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
            selectedProducts:[],
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
            }

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
        this.setShow = this.setShow.bind(this);
        this.getStatistic = this.getStatistic.bind(this);
        this.download = this.download.bind(this);
        this.getOptions = this.getOptions.bind(this);
    }
    setShow(){
        this.setState({
            showSelected:true
        })
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

        await this.props.apolloClient.httpClient
            .query({
                query: GET_SALE_PRODUCT_DAILY,
                variables: {
                    "search": {
                        "startDate": getDate(this.state.startDate),
                        "endDate": getDate(this.state.endDate),
                    }
                },
            })
            .then((result) => {

                let dates = [];

                let series = [];

                result.data.getSaleProductDaily.forEach(product=>{
                    let index = dates.findIndex(date=>date == product.saleDate);
                    let pindex = series.findIndex(pp=>pp.sku == product.sku);
                    if(index < 0){
                        dates.push(product.saleDate)
                    }
                    if(pindex < 0){
                        series.push({
                            name:product.sku,
                            type: 'bar',
                            stack: 'total',
                            label: {
                                show: true,
                                formatter (name) {
                                    return (name.value*1) >= 1 ? name.value : "";
                                }
                            },
                            emphasis: {
                                focus: 'series'
                            },
                            data:[]
                        })
                    }
                });

                dates.forEach(date=>{
                    let dateProducts = result.data.getSaleProductDaily.filter(pp=>pp.saleDate == date);

                    series.forEach((serie, sindex)=>{
                        let products = dateProducts.filter(pp=>pp.sku == serie.name);

                        if(products.length >= 1){

                             let Total = 0
                            products.forEach((pro)=>{
                                Total = Total+pro.salePrice;
                            })
                            series[sindex].data.push(Total)
                        } else {
                            series[sindex].data.push(0)
                        }
                    })

                });

                // console.log({
                //     dates:dates,
                //     series:series,
                //     legends:series.map(s=>s.sku)
                // })

                this.setState({
                    salesPrice1: {
                        dates:dates,
                        series:series,
                        legends:series.map(s=>s.name)
                    }
                });



            });
        await this.props.apolloClient.httpClient
            .query({
                query: GET_SALE_PRODUCT_MONTHLY,
                variables: {
                    "search": {
                        "startDate": getDate(this.state.startDate),
                        "endDate": getDate(this.state.endDate),
                    }
                },
            })
            .then((result) => {


                let dates = [];

                let series = [];
                result.data.getSaleProductMonthly.forEach(product=>{
                    let index = dates.findIndex(date=>date == product.saleDate);
                    let pindex = series.findIndex(pp=>pp.sku == product.sku);
                    if(index < 0){
                        dates.push(product.saleDate)
                    }
                    if(pindex < 0){
                        series.push({
                            name:product.sku,
                            type: 'bar',
                            stack: 'total',
                            label: {
                                show: true,
                                formatter (name) {

                                    return (name.value*1) >= 1 ? name.value : "";
                                }
                            },
                            emphasis: {
                                focus: 'series'
                            },
                            data:[]
                        })
                    }
                });
                dates.forEach(date=>{
                    let dateProducts = result.data.getSaleProductMonthly.filter(pp=>pp.saleDate == date);

                    series.forEach((serie, sindex)=>{
                        let products = dateProducts.filter(pp=>pp.sku == serie.name);

                        if(products.length >= 1){

                            let Total = 0
                            products.forEach((pro)=>{
                                Total = Total+pro.salePrice;
                            })
                            series[sindex].data.push(Total)
                        } else {
                            series[sindex].data.push(0)
                        }
                    })

                })

                this.setState({
                    salesPrice2: {
                        dates:dates,
                        series:series,
                        legends:series.map(s=>s.name)
                    }
                });


            });

    }
    selectProduct(sku){
        if(sku == "all"){
            if(this.state.selectedProducts.length == this.state.products){
                this.setState({
                    selectedProducts:[],
                    showSelected:false
                })
            } else {
                this.setState({
                    selectedProducts:this.state.products.map(product=>product.sku),
                    showSelected:false
                })
            }
        } else {
            let selectedIndex = this.state.selectedProducts.findIndex(code=>code==sku);
            if(selectedIndex >= 0){
                this.setState({
                    selectedProducts:this.state.selectedProducts.findIndex(code=>code!=sku),
                    showSelected:false
                })
            } else {
                this.setState({
                    selectedProducts:[sku, ...this.state.selectedProducts],
                    showSelected:false
                })
            }

        }
    }
    async getStatistic(page){
        await this.props.apolloClient.httpClient
            .query({
                query: GET_SALE_PRODUCT_BY_CODE,
                variables: {
                    "search": {
                        "code": this.state.selectedProducts.join(","),
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
                    productSales: result.data.getSaleProductByCode.list,
                    total2: result.data.getSaleProductByCode.totalElements
                });

            });
    }
    download() {


        getCSV(["name", "saleDate", "count", "price", "salePrice"], this.state.productSales, "sales-product-statistic.csv", []);


    }
    getOptions(type) {
        let title = "일별 매출 통계";

        var data = this.state.salesPrice1.series;
        var labels = this.state.salesPrice1.dates;
        var legends = this.state.salesPrice1.legends;
        if(type == "2"){
            title = "월별 매출 통계"

            data = this.state.salesPrice2.series;
            labels = this.state.salesPrice2.dates;
            legends = this.state.salesPrice2.legends;
        }
        return {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: legends,
                type: 'scroll',
                orient: 'vertical',
                right: 0,
                top: 20,
                bottom: 20,
                width:100,

                textStyle:{
                    width:150,
                    fontSize:11
                },
                pageTextStyle:{
                    width:150,
                    fontSize:11
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                formatter (name) {
                    return name.substring(0,21);
                }
            },

            yAxis: {
                type: 'value'
            },
            xAxis: {
                type: 'category',
                data: labels
            },


            toolbox: {
                feature: {
                    saveAsImage: {
                        name: title,
                        pixelRatio: 2
                    }
                }
            },
            series: data,
            grid: {
                left: '3%',
                right: '160',
                bottom: '3%',
                containLabel: true
            },




        }
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
                            menuName="상품별 매출 통계"
                            title="매출 통계 관리 - 상품별 매출 통계"
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
                                                    <Checkbox
                                                        color="primary"
                                                        checked={this.state.selectedProducts.length == this.state.products.length}
                                                        onChange={() => this.selectProduct("all")}
                                                        name="selectedProducts"
                                                    />
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
                                                            <Checkbox
                                                                color="primary"
                                                                checked={this.state.selectedProducts.findIndex(pp=>pp== product.sku) >= 0}
                                                                onChange={() => this.selectProduct(product.sku)}
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

                                            onClick={this.setShow}
                                        >
                                            상품 선택
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>


                            <Grid container className="align-items-center mt-20">
                                <Grid item md={12} xs={12}>
                                    <Table aria-label="simple table" className="mail_table">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>상품코드</TableCell>
                                                {this.state.showSelected ? <TableCell >
                                                    {this.state.selectedProducts.map((sp, index)=><div key={index}>
                                                        <Grid item md={12} xs={12}>
                                                            <TextField
                                                                id="name-basic"
                                                                label="상품코드"
                                                                size="small"
                                                                variant="outlined"
                                                                name="name"
                                                                fullWidth
                                                                defaultValue={sp}
                                                            />
                                                        </Grid>
                                                        <br/>
                                                    </div>)}


                                                </TableCell> : <TableCell></TableCell>}
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Grid>
                            </Grid>
                            <Grid container className="mt-20">

                                <Grid item md={12} xs={12}>
                                    <div className="text-right">
                                        <Button
                                            variant="contained"
                                            size="small"
                                            color="primary"

                                            onClick={()=>this.getStatistic(1)}
                                        >
                                            통계 보기
                                        </Button>
                                    </div>
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
                                                <TableCell>상품명</TableCell>
                                                <TableCell>기간</TableCell>
                                                <TableCell>판매수량</TableCell>
                                                <TableCell>판매가</TableCell>
                                                <TableCell>매출액</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.state.productSales.map((product, index)=>  <TableRow key={index}>
                                                <TableCell>{product.name}</TableCell>
                                                <TableCell>{product.saleDate}</TableCell>
                                                <TableCell>{product.count}</TableCell>
                                                <TableCell>{product.price}</TableCell>
                                                <TableCell>{product.salePrice}</TableCell>

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

                            <Grid container className="mt-20">
                                <Grid item md={12}>
                                    <div style={{backgroundColor: '#2196f3'}}>
                                        <h4 className="text-center" style={{color: '#ffffff', padding: '10px'}}>상품별 매출 통계</h4>
                                    </div>
                                </Grid>
                                <Grid item md={12}>
                                        <Paper>
                                            <Tabs
                                                textColor="primary"
                                                value={this.state.value}
                                                onChange={this.handleChangeTab}
                                                variant="fullWidth"
                                            >
                                                <Tab label="일별 매출 통계" {...this.tabProps(0)} />
                                                <Tab label="월별 매출 통계" {...this.tabProps(1)} />

                                            </Tabs>
                                        </Paper>

                                        {/* SwipeableViews */}
                                        <SwipeableViews
                                            index={this.state.value}
                                        >
                                            {/* Basic content */}
                                            <div value={this.state.value} index={0} className="mt-20">
                                                <Grid item md={12} xs={12}>
                                                    <div style={{width: "100%", height: 600}}>
                                                        <BarChart options={this.getOptions("1")}/>
                                                    </div>
                                                </Grid>
                                            </div>

                                            {/* Price Reserve information content */}
                                            <div value={this.state.value} index={1} className="mt-20">
                                                <Grid container className="mt-20">
                                                    <Grid item md={12} xs={12}>
                                                        <div style={{width: "100%", height: 600}}>
                                                            <BarChart options={this.getOptions("2")}/>
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </div>


                                        </SwipeableViews>
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
