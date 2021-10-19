import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import { withSnackbar } from "notistack";
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
    TextField,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { startOfMonth, subMonths, addMonths, format, differenceInMonths, formatISO } from "date-fns";

import { GET_PAGE_VISIT_ANALYSIS } from "./Queries";
import BarChart from "../common/BarChart"

import { getCSVStatistics } from "../utils";
import Loading from '../../../core/common/Partials/Loading';

const rangeLimitMonth = 12;
const rangeLimitMonthDefault = 6;

class TabMonthly extends React.Component {
    /**
     * @constructor
     */
    constructor(props) {
        super(props);

        this.state = {
            pageUrl: '-1',
            startDate: subMonths(new Date(formatISO(startOfMonth(new Date()), { representation: 'date' })), rangeLimitMonthDefault - 1),
            endDate: new Date(formatISO(startOfMonth(new Date()), { representation: 'date' })),
            country: '-1',
            dataChart: [],
            dataTopCountries: [],
            listTopCountries: [],
            loading: false,
            bLoaded: false,
        };

        this.initPage = this.initPage.bind(this);
        this.setPageUrl = this.setPageUrl.bind(this);
        this.setDate = this.setDate.bind(this);
        this.setCountry = this.setCountry.bind(this);
        this.getData = this.getData.bind(this);
        this.getOptions = this.getOptions.bind(this);
        this.download = this.download.bind(this);
    }

    componentDidMount() {
        this.initPage();
    }

    componentDidUpdate() {
        this.initPage();
    }

    initPage() {
        if (this.props.bLoad && this.state.bLoaded === false) {
            this.setState({
                bLoaded: true,
            }, () => {
                this.getData();
            });
        }
    }

    setPageUrl(value) {
        this.setState({
            pageUrl: value,
        });
    }

    setDate(value, type) {
        const date = new Date(value);
        if (type === "start") {
            const iDay = differenceInMonths(this.state.endDate, date) + 1;
            // console.log('differenceInMonths (start): ', iDay, date.toISOString(), this.state.endDate.toISOString());
            if (iDay <= rangeLimitMonth) {
                this.setState({
                    startDate: date,
                });
            } else {
                this.setState({
                    startDate: date,
                    endDate: addMonths(date, rangeLimitMonth - 1),
                });
            }
        } else {
            const iDay = differenceInMonths(date, this.state.startDate) + 1;
            // console.log('differenceInMonths (end): ', iDay, this.state.startDate.toISOString(), date.toISOString());
            if (iDay <= rangeLimitMonth) {
                this.setState({
                    endDate: date,
                });
            } else {
                this.setState({
                    endDate: date,
                    startDate: subMonths(date, rangeLimitMonth - 1),
                });
            }
        }
    }

    setCountry(value) {
        this.setState({
            country: value,
        });
    }

    getData() {
        this.setState({
            loading: true,
        }, () => {
            this.props.apolloClient.httpClient.query({
                query: GET_PAGE_VISIT_ANALYSIS,
                variables: {
                    search: {
                        timeframe: "month",
                        startDate: this.state.startDate.toISOString(),
                        endDate: this.state.endDate.toISOString(),
                        ...(this.state.country !== '-1' ? { country: this.state.country } : {}),
                        ...(this.state.pageUrl !== '-1' ? { pageUrl: this.state.pageUrl } : {}),
                    }
                }
            }).then((result) => {
                this.setState({
                    dataChart: [null, undefined].includes(result.data.getPageVisitAnalysis.list) === false ? [...result.data.getPageVisitAnalysis.list] : [],
                    dataTopCountries: [null, undefined].includes(result.data.getPageVisitAnalysis.list2) === false ? [...result.data.getPageVisitAnalysis.list2] : [],
                    listTopCountries: [null, undefined].includes(result.data.getPageVisitAnalysis.list3) === false ? [...result.data.getPageVisitAnalysis.list3] : [],
                    loading: false,
                });
            }).catch((error) => {
                this.setState({
                    dataChart: [],
                    dataTopCountries: [],
                    listTopCountries: [],
                    loading: false,
                });
                this.props.enqueueSnackbar(
                    "Sorry, there is an error occurred while fetching data.",
                    { variant: "error" }
                );
            });
        });
    }

    getOptions() {
        const label = [...this.state.dataChart.map(item => format(new Date(item.timeframe), "yyyy-MM"))];
        const value = [...this.state.dataChart.map(item => item.visits)];
        return {
            xAxis: {
                type: "category",
                data: label,
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
                    data: value,
                    // showBackground: true,
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
                        name: '일별 방문 통계',
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

    download() {
        const aData = [];
        this.state.listTopCountries.forEach(country => {
            const oDic = this.props.dictionaryCountry.find(dic => dic.dickey === country.country);
            let sCountryName = country.country;
            if (oDic !== undefined) {
                sCountryName = oDic.dicvalue;
            }
            const aDataOneCountry = [];
            aDataOneCountry.push(sCountryName);
            aDataOneCountry.push(country.average);
            this.state.dataTopCountries.filter(day => day.country === country.country).forEach(day => {
                aDataOneCountry.push(day.visits);
            });
            aData.push(aDataOneCountry);
        });
        getCSVStatistics(
            ["Country", "Average", ...(this.state.listTopCountries.length > 0 ? this.state.dataTopCountries.filter(day => day.country === this.state.listTopCountries[0].country).map(day => day.timeframe !== null ? format(new Date(day.timeframe), "yyyy-MM") : '') : [])],
            aData,
            "report-for-country-by-day.csv",
            [],
        );
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
                                        <Grid item md={6} xs={12}>
                                            <FormControl size="small" fullWidth variant="outlined">
                                                <Select
                                                    value={this.state.pageUrl}
                                                    onChange={(e) => this.setPageUrl(e.target.value)}
                                                >
                                                    <MenuItem value="-1">All</MenuItem>
                                                    {(this.props.aObPage || []).map(item =>
                                                        <MenuItem
                                                            key={item.id}
                                                            value={item.dickey}
                                                        >
                                                            {`${process.env.REACT_DOMAIN}${item.dickey}`} ({item.dicvalue})
                                                        </MenuItem>
                                                    )}
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
                                                    type="month"
                                                    size="small"
                                                    variant="outlined"
                                                    value={moment(
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
                                                    type="month"
                                                    size="small"
                                                    variant="outlined"
                                                    value={moment(
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
                                        <Grid item md={6} xs={12}>
                                            <FormControl size="small" fullWidth variant="outlined">
                                                <Select
                                                    value={this.state.country}
                                                    onChange={(e) => this.setCountry(e.target.value)}
                                                >
                                                    <MenuItem value="-1">All</MenuItem>
                                                    {(this.props.dictionaryCountry || []).sort((a, b) => {
                                                        const nameA = a.dicvalue.toUpperCase();
                                                        const nameB = b.dicvalue.toUpperCase();
                                                        if (nameA < nameB) {
                                                          return -1;
                                                        }
                                                        if (nameA > nameB) {
                                                          return 1;
                                                        }
                                                        return 0;
                                                    }).map(item =>
                                                        <MenuItem
                                                            key={item.id}
                                                            value={item.dickey}
                                                        >
                                                            {item.dicvalue} ({item.dickey})
                                                        </MenuItem>
                                                    )}
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
                {!this.state.loading ? <>
                <Grid container className="mt-20">
                    <Grid item md={12} xs={12}>
                        <div style={{width: "100%", height: 400}}>
                            <BarChart options={this.getOptions()}/>
                        </div>
                    </Grid>
                </Grid>
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
                </div>
                <Grid container className="align-items-center">
                    <Grid item md={12} xs={12}>
                        <h3>방문자 상위 {this.state.listTopCountries.length}개국</h3>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <div style={{height: "auto", width: "100%", overflowX: "auto"}}>
                            <Table aria-label="simple table" className="country_table table-striped">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Country</TableCell>
                                        <TableCell>Average</TableCell>
                                        {this.state.listTopCountries.length > 0 ? this.state.dataTopCountries.filter(day => day.country === this.state.listTopCountries[0].country).map(day => <TableCell
                                            key={day.timeframe}>{day.timeframe !== null ? format(new Date(day.timeframe), "yyyy-MM") : ''}</TableCell>) : <></>}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.listTopCountries.map(country => {
                                        const oDic = this.props.dictionaryCountry.find(dic => dic.dickey === country.country);
                                        let sCountryName = country.country;
                                        if (oDic !== undefined) {
                                            sCountryName = oDic.dicvalue;
                                        }
                                        return (<TableRow key={country.country}>
                                            <TableCell>{sCountryName}</TableCell>
                                            <TableCell>{country.average}</TableCell>
                                            {this.state.dataTopCountries.filter(day => day.country === country.country).map(day => <TableCell
                                                key={day.timeframe}>{day.visits !== null ? day.visits : ''}</TableCell>)}
                                        </TableRow>);
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    </Grid>
                </Grid>
                </> : <div className="mt-20"><Loading/></div>}
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

export default withSnackbar(connect(mapStateToProps, null)(TabMonthly));
