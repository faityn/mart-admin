import React from "react";


import {
    Button,
    FormControl,
    Grid,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell, TableHead,
    TableRow,
    TextField
} from "@material-ui/core";

import SaveIcon from "@material-ui/icons/Save";
import {queryReport} from "./queryReport";
import {addMonths} from "date-fns";
import {formatDate, formatMonth, getCSV} from "../utils";
import BarChart from "../common/BarChart"
import moment from "moment"
import {withSnackbar} from "notistack";
import Loading from '../../../core/common/Partials/Loading';

class GoogleAnalytics extends React.Component {
    /**
     * @constructor
     */

    constructor(props) {
        super(props);

        // Default state
        this.state = {
            average: 0,
            reportData: {
                values: [],
                labels: []
            },
            pagePaths: [],
            countries: [],
            startDate: addMonths(new Date(), -12),
            endDate: new Date(),
            allDays: [],
            dateBasedCountries: [],
            pageFilter: "",
            countryFilter: "",
        };
        this.getData = this.getData.bind(this);
        this.displayResults = this.displayResults.bind(this);
        this.parseResultByArray = this.parseResultByArray.bind(this);
        this.getOptions = this.getOptions.bind(this);
        this.createDailyRequestByCountry = this.createDailyRequestByCountry.bind(this);
        this.download = this.download.bind(this);
        this.setDate = this.setDate.bind(this);
        this.setPage = this.setPage.bind(this);
        this.setCountry = this.setCountry.bind(this);


    }

    setPage(value) {
        this.setState({
            pageFilter: value
        })
    }

    setCountry(value) {
        this.setState({
            countryFilter: value
        });
    }

    getOptions() {
        return {
            xAxis: {
                type: "category",
                data: this.state.reportData.labels,
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
                    data: this.state.reportData.values,
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
                        name: '월별 방문 통계',
                        pixelRatio: 2
                    }
                }
            },
            grid: {
                left: 50,
                right: 50,
                top: 30
            },

        }
    }

    componentDidMount() {
        this.getData();
    }

    getData() {


        let filter = "";
        if (this.state.countryFilter != "" && this.state.countryFilter != "all") {
            filter = "ga:country==" + this.state.countryFilter
        }
        if (this.state.pageFilter != "" && this.state.pageFilter != "all") {
            if (filter == "") {
                filter = "ga:pagePath==" + this.state.pageFilter
            } else {
                filter = filter + ";ga:pagePath==" + this.state.pageFilter
            }
        }

        var begin = moment(this.state.startDate).format("YYYY-MM-")+"01";
        var end = moment(this.state.endDate).format("YYYY-MM-") + moment().daysInMonth();

        const request = {
            viewID: this.props.viewID,
            startDate: new Date(begin),
            endDate: new Date(end),
            metrics: "ga:users",
            dimensions: ["ga:yearMonth"],
            filter: filter,
            token: this.props.ga_token
        };
        const requestPageViews = {
            viewID: this.props.viewID,
            startDate: new Date(begin),
            endDate: new Date(end),
            metrics: "ga:pageviews",
            dimensions: ["ga:pagePath"],
            orderBy: {
                fieldName: "ga:pageViews",
                order: "DESCENDING",
            },
            filter: "ga:pagePath!@localhost/",
            token: this.props.ga_token
        };


        queryReport(request).then((resp) => {
            this.displayResults(resp)
        }).catch((error) => console.error(error));

        queryReport(requestPageViews).then((resp) => {
            let data = this.parseResultByArray(resp)


            this.setState({
                pagePaths: data
            });

        }).catch((error) => console.error(error));




    }

    displayResultsCountry = (response) => {
        const queryResult = response.result.reports[0].data.rows;
        // setTotalUsers(response.result.reports[0].data.totals[0].values[0]);
        // setTotalCountries(queryResult.length);
        let labels = [];
        let values = [];
        let bgColors = [];
        queryResult.forEach((row, idx) => {
            if (idx < 5) {
                labels.push(row.dimensions[0]);
                values.push(row.metrics[0].values[0]);
                bgColors.push(colors[idx + 1]);
            }
        });
        console.log({
            labels,
            values,
            colors: bgColors,
        })
    }

    parseResultByArray = (response) => {
        const queryResult = response.result.reports[0].data.rows;

        const total = response.result.reports[0].data.totals[0].values[0];
        let newReportData = [];
        queryResult.forEach((row, idx) => {
            if (idx < 10) {
                let tempObj = {
                    title: row.dimensions[0],
                    views: row.metrics[0].values[0],
                };
                newReportData.push(tempObj);
            }
        });
        return newReportData
    }

    async createDailyRequestByCountry(countries, labels) {



        let allDays = [];


        let requestCountry = {
            viewID: this.props.viewID,
            startDate: null,
            endDate: null,
            metrics: "ga:users",
            dimensions: ["ga:country"],
            orderBy: {
                fieldName: "ga:users",
                order: "DESCENDING",
            },
        }

        for (var i = 0; i < labels.length; i++) {

            let month = labels[i];

            var begin = month+"-01";
            var end = moment(begin).format("YYYY-MM-") + moment().daysInMonth()

            allDays.push(month)
            let dailyCountries = await queryReport({
                ...requestCountry,
                startDate: new Date(begin),
                endDate: new Date(end),
            })

            dailyCountries = this.parseResultByArray(dailyCountries)

            dailyCountries.forEach(country => {
                let cIndex = countries.findIndex(cc => cc.title == country.title);
                if (cIndex >= 0) {
                    countries[cIndex][`${month}`] = country.views
                    countries[cIndex][`Nation`] = country.title
                }
                // else {
                //     let newCountry = {title:country.title, Nation:country.title, views:country.views}
                //     newCountry[`${month}`] = country.views
                //     countries.push(newCountry)
                // }
            })
        }


        this.setState({
            allDays: allDays,
            dateBasedCountries: countries
        });

    }

    displayResults(response) {

        const queryResult = response.result.reports[0].data.rows ? response.result.reports[0].data.rows : [];
        const total = response.result.reports[0].data.totals[0].values[0];
        let labels = [];
        let values = [];
        // let a = moment(this.state.endDate);
        // let b = moment(this.state.startDate);
        // let diff = a.diff(b, 'month');
        queryResult.forEach((row) => {
            labels.push(formatMonth(row.dimensions[0]));
            values.push(row.metrics[0].values[0] * 1);
        });

        this.setState({
            reportData: {
                labels,
                values,
            },
            average: parseInt(total / response.result.reports[0].data.rowCount)
        });

        var begin = moment(this.state.startDate).format("YYYY-MM-")+"01";
        var end = moment(this.state.endDate).format("YYYY-MM-") + moment().daysInMonth()

        const requestCountry = {
            viewID: this.props.viewID,
            startDate: new Date(begin),
            endDate: new Date(end),
            metrics: "ga:users",
            dimensions: ["ga:country"],
            orderBy: {
                fieldName: "ga:users",
                order: "DESCENDING",
            },
        }

        queryReport(requestCountry).then((resp) => {

            let data = this.parseResultByArray(resp)

           // let notsetIndex = data.findIndex(cc=>cc.title == "(not set)")
           //
           //  if(notsetIndex < 0){
           //      data = [...data, {"title":"(not set)", "Nation":"(not set)", views:0}]
           //  }

            this.setState({
                countries: data,
                allDays: [],
                dateBasedCountries: []

            });
            this.createDailyRequestByCountry(data, labels);


        }).catch((error) => console.error(error));
    }

    download() {

        getCSV(["Nation", ...this.state.allDays], this.state.dateBasedCountries, "report-by-nation-and-month.csv", [[], ["", ...this.state.reportData.labels], ["", ...this.state.reportData.values]]);


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
                                    <TableCell>페이지 선택</TableCell>
                                    <TableCell>
                                        <Grid item md={3} xs={12}>
                                            <FormControl size="small" fullWidth variant="outlined">
                                                <Select
                                                    labelId="demo-simple-select-outlined-label"
                                                    id="demo-simple-select-outlined"
                                                    label="Mail templates"
                                                    name="mail-templates"

                                                    onChange={(e) => this.setPage(e.target.value)}

                                                >
                                                    <MenuItem value="all">All</MenuItem>
                                                    {
                                                        (this.state.pagePaths || []).map((item, index) =>

                                                            <MenuItem key={index}
                                                                      value={item.title}>{item.title}, {item.views}</MenuItem>
                                                        )
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </TableCell>
                                </TableRow>
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
                                    <TableCell>국가</TableCell>
                                    <TableCell>
                                        <Grid item md={3} xs={12}>
                                            <FormControl size="small" fullWidth variant="outlined">
                                                <Select
                                                    labelId="demo-simple-select-outlined-label"
                                                    id="demo-simple-select-outlined"
                                                    label="Mail templates"
                                                    name="mail-templates"
                                                    onChange={(e) => this.setCountry(e.target.value)}
                                                >
                                                    <MenuItem value="all">All</MenuItem>
                                                    {
                                                        (this.state.countries || []).map((item, index) =>

                                                            <MenuItem key={index}
                                                                      value={item.title}>{item.title}, {item.views}</MenuItem>
                                                        )
                                                    }

                                                </Select>
                                            </FormControl>
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
                    <Grid item md={12} xs={12}>

                        <div style={{width: "100%", height: 400}}>
                            <BarChart options={this.getOptions()}/>
                        </div>
                    </Grid>
                </Grid>
                {this.state.allDays.length >= 1 || this.state.reportData.labels.length >= 1 ?
                    <div className="text-right mt-20">
                        <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            startIcon={<SaveIcon color="white" size="1rem"/>}
                            onClick={this.download}
                        >
                            엑셀파일다운
                        </Button>
                    </div> : null}

                {this.state.allDays.length >= 1 ? <Grid container className="align-items-center">
                    <Grid item md={12} xs={12}>
                        <h3>방문자 상위 {this.state.dateBasedCountries.length}개국</h3>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <div style={{height: "auto", width: "100%", overflowX: "auto"}}>
                            <Table aria-label="simple table" className="country_table table-striped">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nation</TableCell>
                                        {this.state.allDays.map((day, index) => <TableCell
                                            key={index}>{day}</TableCell>)}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.dateBasedCountries.map((country, cIndex) => <TableRow key={cIndex}>
                                        <TableCell>{country.title}</TableCell>
                                        {this.state.allDays.map((day, index) => <TableCell
                                            key={index}>{country[day] ? country[day] : ''}</TableCell>)}
                                    </TableRow>)}
                                </TableBody>
                            </Table>
                        </div>
                    </Grid>
                </Grid> : <div className="mt-20"><Loading/></div>}
            </div>
        );
    }
}


export default withSnackbar(GoogleAnalytics);
