import React from "react";
import PageTitle from "../../../core/common/Partials/PageTitle";

import {
    Button,
    Grid, Table, TableBody, TableCell, TableHead, TableRow, TextField,
} from "@material-ui/core";

import MenuIcon from '@material-ui/icons/Menu';

import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import SaveIcon from "@material-ui/core/SvgIcon/SvgIcon";
import {addDays} from "date-fns";
import moment from "moment";

import {GET_USER_REG} from "./Queries"

import {getDate} from "../utils";
import BarChart from "../common/BarChart";

class Statistics extends React.Component {
    /**
     * @constructor
     */

    constructor(props) {
        super(props);

        // Default state
        this.state = {
            startDate: addDays(new Date(), -60),
            endDate: new Date(),
            regData:[]

        };

        this.getData = this.getData.bind(this);
        this.setDate = this.setDate.bind(this);
        this.getOptions = this.getOptions.bind(this);
    }
    async componentDidMount() {

      await this.getData();
    }
    async getData(){
        await this.props.apolloClient.httpClient
            .query({
                query: GET_USER_REG,
                variables: {
                    "search": {
                        "startDate": getDate(this.state.startDate),
                        "endDate": getDate(this.state.endDate),
                    }
                },
            })
            .then((result) => {

                this.setState({
                    regData:result.data.getUserDailyRegistAgeAndSex
                });

            });
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
    getOptions() {
        let title = "일별 신규 통계";

        var data = this.state.regData.map(count=>count.registCount);
        var labels = this.state.regData.map(count=>count.registDate);

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
                            menuName="신규가입 통계"
                            title="회원 통계 - 신규가입 통계"
                            icon={<MenuIcon />}
                        />
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item md={12}>
                        <div className="card mt-20">
                            <Grid container className="align-items-center">
                                <Grid item md={12} xs={12}>
                                    <h2>회원 통계 관리</h2>
                                    <h4>신교 가입 통계</h4>
                                </Grid>
                                <Grid item md={12} xs={12}>
                                    <Table aria-label="simple table" className="mail_table">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>검색조건</TableCell>
                                                <TableCell>
                                                    <Grid container spacing={1} className="align-items-center">
                                                        <Grid item md={3} xs={3}>
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
                                                        <Grid item md={2} xs={2}>
                                                            <div className="text-center">~</div>
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
                                                                    this.state.endDate,
                                                                ).format("YYYY-MM-DD")}
                                                                onChange={(e) => this.setDate(e.target.value, "end")}
                                                            />
                                                        </Grid>
                                                        <Grid item md={4} xs={4}>
                                                            <Button
                                                                variant="contained"
                                                                size="small"
                                                                color="primary"

                                                                onClick={this.getData}
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

                            <Grid container className="mt-20">
                                <Grid item md={6} xs={6}>
                                    <h4>일별 신규 통계</h4>
                                </Grid>
                                <Grid item md={6} xs={6}>
                                    <div className="text-right"><p>선택 값의 함: {this.state.regData.reduce((n, {registCount}) => n + registCount, 0)}</p></div>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item md={12} xs={12}>
                                    <div style={{width: "100%", height: 400}}>
                                        <BarChart options={this.getOptions()}/>
                                    </div>

                                </Grid>
                            </Grid>

                            <Grid container className="align-items-center mt-20">
                                <Grid item md={12} xs={12}>
                                    <Table aria-label="simple table" className="analiz">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>년 월 일</TableCell>
                                                <TableCell>신규가입</TableCell>
                                                <TableCell>성별비율</TableCell>
                                                <TableCell>10대</TableCell>
                                                <TableCell>20대</TableCell>
                                                <TableCell>30대</TableCell>
                                                <TableCell>40대</TableCell>
                                                <TableCell>50대</TableCell>
                                                <TableCell>60대 이상</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {this.state.regData.map((row, index)=>    <TableRow key={index}>
                                                <TableCell>{row.registDate}</TableCell>
                                                <TableCell>{row.registCount}</TableCell>
                                                <TableCell>{row.maleCount}/{row.femaleCount}/{row.unknownSexCount}</TableCell>
                                                <TableCell>{row.teenAgerCount}</TableCell>
                                                <TableCell>{row.twentyAprxCount}</TableCell>
                                                <TableCell>{row.thirtyAprxCount}</TableCell>
                                                <TableCell>{row.fortyAprxCount}</TableCell>
                                                <TableCell>{row.fiftyAprxCount}</TableCell>
                                                <TableCell>{row.sixtyAboveCount}</TableCell>
                                            </TableRow>)}


                                        </TableBody>
                                    </Table>
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
