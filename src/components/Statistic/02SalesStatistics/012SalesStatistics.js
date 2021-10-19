import React from "react";

import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import {
    Button,
    FormControl,
    InputLabel,
    Grid,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import {GET_MONTHLY_SALES_COUNT, GET_MONTHLY_SALES_PRICE, GET_CATEGORIES, GET_NATIONS_BY_SALES_COUNT, GET_NATIONS_BY_SALES_PRICE} from "./Queries";
import {addMonths} from "date-fns";
import {getCSV, getDate} from "../utils";
import moment from "moment";
import BarChart from "../common/BarChart";



class SalesStatistics extends React.Component {
    /**
     * @constructor
     */

    constructor(props) {
        super(props);

        // Default state
        this.state = {
            startDate: addMonths(new Date(), -12),
            endDate: new Date(),
            salesCount: [],
            salesPrice: [],
            NationsBySaleCount: [],
            NationsBySalePrice: [],
            categories: {
                first: [],
                second: [],
                third: []
            },
            firstCategory: "",
            secondCategory: "",
            thirdCategory: "",
        };

        this.getData = this.getData.bind(this);
        this.handleCategory = this.handleCategory.bind(this);
        this.setDate = this.setDate.bind(this);
        this.getSum = this.getSum.bind(this);
        this.getOptions = this.getOptions.bind(this);
        this.download = this.download.bind(this);

    }
    async componentDidMount() {

        await this.getData();

    }
    setDate(value, type) {
        if (type == "start") {
            let date = new Date(value + "-01")
            this.setState({
                startDate: date
            });
        } else {
            var end = moment(new Date(value + "-01")).format("YYYY-MM-") + moment().daysInMonth()
            this.setState({
                endDate: new (end)
            });
        }

    }
    async getData() {

        await this.props.apolloClient.httpClient
            .query({
                query: GET_MONTHLY_SALES_COUNT,
                variables: {
                    "search": {
                        "startDate": getDate(this.state.startDate),
                        "endDate": getDate(this.state.endDate),
                        "firstCategory": this.state.firstCategory,
                        "secondCategory": this.state.secondCategory,
                        "thirdCategory": this.state.thirdCategory,
                    }
                },
            })
            .then((result) => {

                this.setState({
                    salesCount:result.data.getMonthlySalesCount
                });



            });

        await this.props.apolloClient.httpClient
            .query({
                query: GET_MONTHLY_SALES_PRICE,
                variables: {
                    "search": {
                        "startDate": getDate(this.state.startDate),
                        "endDate": getDate(this.state.endDate),
                        "firstCategory": this.state.firstCategory,
                        "secondCategory": this.state.secondCategory,
                        "thirdCategory": this.state.thirdCategory,
                    }
                },
            })
            .then((result) => {

                this.setState({
                    salesPrice:result.data.getMonthlySalesPrice
                });



            });


        await this.props.apolloClient.httpClient
            .query({
                query: GET_NATIONS_BY_SALES_COUNT,
                variables: {

                },
            })
            .then((result) => {

                this.setState({
                    NationsBySaleCount:result.data.getNationsBySaleCount
                });



            });


        await this.props.apolloClient.httpClient
            .query({
                query: GET_NATIONS_BY_SALES_PRICE,
                variables: {

                },
            })
            .then((result) => {

                this.setState({
                    NationsBySalePrice:result.data.getNationsBySalePrice
                });



            });

        const { data } = await this.props.apolloClient.httpClient
            .query({
                query: GET_CATEGORIES
            });
          
        if (data) {
            this.setState({
                categories: data.categories
            });
        }

    }

    /**
    * @summary SearchByCategory
    * @param {MouseEvent} event
    */
     handleCategory(event, level) {
        event.preventDefault();

        if (level === 1) {
            if (event.target.value) {
                this.setState({
                    firstCategory: this.state.firstCategory,
                    secondCategory: event.target.value,
                    thirdCategory: this.state.thirdCategory,
                });
            } else {
                this.setState({
                    firstCategory: this.state.firstCategory,
                    secondCategory: null,
                    thirdCategory: null,
                });
            }
        } else if (level === 2) {
            this.setState({
                firstCategory: this.state.firstCategory,
                secondCategory: this.state.secondCategory,
                thirdCategory: event.target.value,
            });
        } else {
            if (event.target.value) {
                this.setState({
                    firstCategory: event.target.value,
                    secondCategory: this.state.secondCategory,
                    thirdCategory: this.state.thirdCategory,
                });
            } else {
                this.setState({
                    firstCategory: null,
                    secondCategory: null,
                    thirdCategory: null,
                });
            }
        }
    }

    getOptions(type) {
        let title = "주문건수 통계";

        var data = this.state.salesCount.map(count=>count.count);
        var labels = this.state.salesCount.map(count=>count.registerDate);
        if(type == "amount"){
            title = "결제액 통계"

            data = this.state.salesPrice.map(count=>count.price);
            labels = this.state.salesPrice.map(count=>count.registerDate);
        }
        return {
            name:title,
            xAxis: {
                type: "category",
                data: labels,
            },
            yAxis: {
                type: "value",
            },
            tooltip: {
                trigger: 'axis'
            },
            series: [

                {

                    type: 'bar',
                    data: data,
                    showBackground: true,
                    backgroundStyle: {
                        color: "rgba(220, 220, 220, 0.8)",
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: 'Average'}
                        ]
                    }
                },

            ],
            toolbox: {
                feature: {
                    saveAsImage: {
                        name: title,
                        pixelRatio: 2
                    }
                }
            },


        }
    }

    getSum(type){
        let total = 0;
        if(type == "amount"){

            this.state.salesPrice.forEach(count=>{
                total = total+count.price
            })
            return  total
        } else {
            this.state.salesCount.forEach(count=>{
                total = total+count.count
            })
            return  total
        }
    }
    download() {
        let firstData = this.state.salesCount;
        let secodData = this.state.salesPrice;
        // let headers = ["registerDate", "price"];
        // let new_data = []
        // secodData.forEach((row, index)=>{


        //     let rowData = [];

        //     headers.forEach(header=>{
        //         rowData.push(row[header] ? row[header] : "")
        //     })

        //     new_data.push(rowData);


        // });
        // getCSV(["registerDate", "count"], this.state.salesCount, "sales-statistic.csv", [["registerDate", "price"], ...new_data]);

        let merged = [];

        for(let i=0; i<firstData.length; i++) {
            merged.push({
            ...firstData[i], 
            ...(secodData.find((itmInner) => itmInner.registerDate === firstData[i].registerDate))}
            );
        }

        getCSV(["registerDate", "count", "price"], merged, "sales-statistic.csv", []);
    }
    /**
     * @override
     */
    render() {
        return (
            <div>
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
                                                    type="month"
                                                    size="small"
                                                    variant="outlined"
                                                    name="startDate"
                                                    defaultValue={moment(
                                                        this.state.startDate,
                                                    ).format("YYYY-MM")}
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
                                                    type="month"
                                                    size="small"
                                                    variant="outlined"
                                                    name="endDate"
                                                    defaultValue={moment(
                                                        this.state.endDate,
                                                    ).format("YYYY-MM")}
                                                    onChange={(e) => this.setDate(e.target.value, "end")}
                                                />
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>상품분류</TableCell>
                                    <TableCell>
                                        <Grid container spacing={2} className="align-items-center">
                                            <Grid item md={3} xs={3}>
                                                <FormControl size="small" fullWidth variant="outlined">
                                                    <InputLabel id="demo-simple-select-outlined-label">First category</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="demo-simple-select-outlined"
                                                        label="Mail templates"
                                                        name="mail-templates"
                                                        onChange={(e) => this.handleCategory(e, 0)}
                                                        value={this.state.firstCategory}
                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        {
                                                            (this.state.categories.first || []).map((category, index) => 
                                                            <MenuItem key={index} value={category.id}>{category.name}</MenuItem>
                                                            ) 
                                                        }
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item md={3} xs={3}>
                                                <FormControl size="small" fullWidth variant="outlined">
                                                    <InputLabel id="demo-simple-select-outlined-label">Second category</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="demo-simple-select-outlined"
                                                        label="Mail templates"
                                                        name="mail-templates"
                                                        onChange={(e) => this.handleCategory(e, 1)}
                                                        value={this.state.secondCategory}
                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        {
                                                            (this.state.categories.second.filter(f => f.parentId === this.state.firstCategory) || []).map((category, index) => 
                                                            <MenuItem key={index} value={category.id}>{category.name}</MenuItem>
                                                            ) 
                                                        }
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item md={3} xs={3}>
                                                <FormControl size="small" fullWidth variant="outlined">
                                                    <InputLabel id="demo-simple-select-outlined-label">Third category</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="demo-simple-select-outlined"
                                                        label="Mail templates"
                                                        name="mail-templates"
                                                        onChange={(e) => this.handleCategory(e, 2)}
                                                        value={this.state.thirdCategory}
                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        {
                                                            (this.state.categories.third.filter(f => f.parentId === this.state.secondCategory) || []).map((category, index) => 
                                                            <MenuItem key={index} value={category.id}>{category.name}</MenuItem>
                                                            )
                                                        }
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <div className="center">
                            <Button
                                variant="contained"
                                size="small"
                                color="primary"
                                onClick={this.getData}
                            >
                                검색
                            </Button>
                        </div>
                    </Grid>


                </Grid>
                <Grid container className="mt-20">
                    <Grid item md={6} xs={6}>
                        <h4>주문건수통계</h4>
                    </Grid>
                    <Grid item md={6} xs={6}>
                        <div className="text-right"><p>선택 총합: {this.getSum("count")}</p></div>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item md={12} xs={12}>
                        <div style={{width: "100%", height: 400}}>
                            <BarChart options={this.getOptions("count")}/>
                        </div>
                    </Grid>
                </Grid>
                <Grid container className="mt-20">
                    <Grid item md={6} xs={6}>
                        <h4>결제액 통계</h4>
                    </Grid>
                    <Grid item md={6} xs={6}>
                        <div className="text-right"><p>선택 총합: {this.getSum("amount")}</p></div>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item md={12} xs={12}>
                        <div style={{width: "100%", height: 400}}>
                            <BarChart options={this.getOptions("amount")}/>
                        </div>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <div className="text-right mt-20">
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
                <Grid container>
                    <Grid item md={6} xs={6}>
                        <div>
                            <h4>주문건수 상위 10개국</h4>
                        </div>
                        <Table aria-label="simple table" className="country_table table-striped">
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>주문 건수</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.NationsBySaleCount.map((nation, index)=>
                                        <TableRow key={index}>
                                    <TableCell>{nation.nation}</TableCell>
                                    <TableCell>{nation.count}</TableCell>
                                </TableRow>
                                )}

                            </TableBody>
                        </Table>
                    </Grid>
                    <Grid item md={6} xs={6}>
                        <div>
                            <h4>매출 상위 10개국</h4>
                        </div>
                        <Table aria-label="simple table" className="country_table table-striped">
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>매출액</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.NationsBySalePrice.map((nation, index)=>
                                    <TableRow key={index}>
                                        <TableCell>{nation.nation}</TableCell>
                                        <TableCell>{nation.price}</TableCell>
                                    </TableRow>
                                )}

                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

// Redux state to props
const mapStateToProps = (state) => {
    return {
        apolloClient: state.apolloClient,
    };
};

export default withSnackbar(connect(mapStateToProps, null)(SalesStatistics));
