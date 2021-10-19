import React from "react";
import PageTitle from "../../../core/common/Partials/PageTitle";

import {
    Grid,
} from "@material-ui/core";

import MenuIcon from '@material-ui/icons/Menu';

import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import {GET_USER_REG} from "./Queries";
import {getDate} from "../utils";
import {addDays} from "date-fns";
import BarChart from "../common/BarChart";



class Statistics extends React.Component {
    /**
     * @constructor
     */

    constructor(props) {
        super(props);

        // Default state
        this.state = {
            startDate: "2019-01-01",
            endDate: new Date(),
            regData:[]
        };

        this.getData = this.getData.bind(this);
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
                        "startDate": this.state.startDate,
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
    getOptions() {
        let title = "연령별 통계";

        var labels = ["10대", "20대", "30대", "40대", "50대", "60대 이상"];


        let teenAgerCount=  0;
        let twentyAprxCount=  0;
        let thirtyAprxCount=  0;
        let fortyAprxCount=  0;
        let fiftyAprxCount=  0;
        let sixtyAboveCount=  0;
        this.state.regData.forEach(count=>{
            teenAgerCount = teenAgerCount + count.teenAgerCount;
            twentyAprxCount = twentyAprxCount + count.twentyAprxCount;
            thirtyAprxCount = thirtyAprxCount + count.thirtyAprxCount;
            fortyAprxCount = fortyAprxCount + count.fortyAprxCount;
            fiftyAprxCount = fiftyAprxCount + count.fiftyAprxCount;
            sixtyAboveCount = sixtyAboveCount + count.sixtyAboveCount;
        })

        var data = [teenAgerCount, twentyAprxCount, thirtyAprxCount, fortyAprxCount, fiftyAprxCount, sixtyAboveCount];
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
                            menuName="연령별 통계"
                            title="회원 통계 - 연령별 통계"
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
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item md={6} xs={6}>
                                    <h4>연령별 통계</h4>
                                </Grid>
                                <Grid item md={6} xs={6}>
                                    <div className="text-right"><p>선택 값의 함: {this.state.regData.reduce((n, {registCount}) => n + registCount, 0)}</p></div>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item md={12} xs={12}>
                                    <div style={{width: "100%", height: 500}}>
                                        <BarChart options={this.getOptions()}/>
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
