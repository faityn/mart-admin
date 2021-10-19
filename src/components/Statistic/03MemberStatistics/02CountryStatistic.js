import React from "react";
import PageTitle from "../../../core/common/Partials/PageTitle";

import {
    Button, Checkbox, FormControlLabel,
    Grid, Table, TableBody, TableCell, TableRow, TextField,
} from "@material-ui/core";

import MenuIcon from '@material-ui/icons/Menu';

import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import BarChart from "../common/BarChart";
import {GET_SALE_COUNT_NATION} from "./Queries";
import {getDate} from "../utils";



class Statistics extends React.Component {
    /**
     * @constructor
     */

    constructor(props) {
        super(props);

        // Default state
        this.state = {
            data:[]
        };
        this.getOptions = this.getOptions.bind(this);
    }
    async componentDidMount() {

        await this.getData();
    }
    async getData(){
        await this.props.apolloClient.httpClient
            .query({
                query: GET_SALE_COUNT_NATION,
                variables: {

                },
            })
            .then((result) => {

                this.setState({
                    data:result.data.getNationsBySaleCount
                });

            });
    }
    getOptions() {
        let title = "회원 통계 관리";

        // var data = this.state.data.map(count=>count.count);
        var labels = this.state.data.map(count=>count.nation);

        var dataChart = this.state.data;
        return {
            toolbox: {
                feature: {
                    saveAsImage: {
                        name: title,
                        pixelRatio: 2
                    }
                }
            },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                type: 'scroll',
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                data: labels,
                formatter (name) {
                    let index = dataChart.findIndex(count=>count.nation == name);
                    if(index >= 0){
                        return name + `(${dataChart[index].count})`
                    }
                    return name;
                }
            },
            series: [
                {
                    name: title,
                    type: 'pie',
                    radius: '50%',
                    data: this.state.data.map(row=>{
                        return {
                            value:row.count,
                            name:row.nation,
                        }
                    }),
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        }
        // return {
        //     name:title,
        //     xAxis: {
        //         type: "category",
        //         data: labels,
        //     },
        //     yAxis: {
        //         type: "value",
        //     },
        //     legend:{
        //         data:labels,
        //         type: 'scroll',
        //         orient: 'vertical',
        //         right: 0,
        //         top: 20,
        //         bottom: 20,
        //         width:100,
        //
        //         textStyle:{
        //             width:150,
        //             fontSize:11
        //         },
        //         pageTextStyle:{
        //             width:150,
        //             fontSize:11
        //         },
        //         tooltip: {
        //             trigger: 'axis',
        //             axisPointer: {
        //                 type: 'shadow'
        //             }
        //         },
        //     },
        //     tooltip: {
        //         trigger: 'axis'
        //     },
        //     series: [
        //
        //         {
        //
        //             type: 'bar',
        //             data: data,
        //             showBackground: true,
        //             backgroundStyle: {
        //                 color: "rgba(220, 220, 220, 0.8)",
        //             },
        //             markLine: {
        //                 data: [
        //                     {type: 'average', name: 'Average'}
        //                 ]
        //             }
        //         },
        //
        //     ],
        //     toolbox: {
        //         feature: {
        //             saveAsImage: {
        //                 name: title,
        //                 pixelRatio: 2
        //             }
        //         }
        //     },
        //
        //
        // }
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
                            menuName="지역별 통계"
                            title="회원 통계 - 지역별 통계"
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
                                <Grid item md={2} xs={12}>
                                    <h4>선택 값의 합 : {this.state.data.reduce((n, {count}) => n + count, 0)}</h4>
                                </Grid>
                            </Grid>

                            <Grid container  spacing={2} className="mt-20">
                                <Grid item md={12} xs={12}>
                                    <div style={{width: "100%", height: 600}}>
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
