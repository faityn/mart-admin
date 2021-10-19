import React from "react";
import PageTitle from "../../../core/common/Partials/PageTitle";

import {
    Button,
    FormControl,
    Grid, MenuItem, Select, Table, TableBody, TableCell, TableRow, TextField,
} from "@material-ui/core";

import MenuIcon from '@material-ui/icons/Menu';

import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import Loading from '../../../core/common/Partials/Loading';
import {addDays} from "date-fns";
import moment from "moment";
import {queryReport} from "../01GoogleAnalytics/queryReport";
import BarChart from "../common/BarChart";

class Statistics extends React.Component {
    /**
     * @constructor
     */

    constructor(props) {
        super(props);

        // Default state
        this.state = {
            loading:true,
            ga_token:null,
            token_error:false,
            startDate: addDays(new Date(), -365),
            endDate: new Date(),
            browser:[],
            screen:[],
            os:[],
            language:[],
            source:[],
            device:[],
        };
        this.setGATOKEN = this.setGATOKEN.bind(this);
        this.getData = this.getData.bind(this);
        this.setDate = this.setDate.bind(this);
        this.displayResults = this.displayResults.bind(this);
        this.getOptions = this.getOptions.bind(this);
    }
    async componentDidMount() {

        await this.setGATOKEN()

    }
    async getToken(){

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");


        var urlencoded = new URLSearchParams();
        urlencoded.append("client_id", "1090381398441-12m8mvfa55stjvp8hfq1dlp5bd3iacbp.apps.googleusercontent.com");
        urlencoded.append("client_secret", "EZ3Q6I6G0GTIEuevEd4Ipe1d");
        urlencoded.append("refresh_token", "1//0eN3MbVeGODkDCgYIARAAGA4SNwF-L9Ir1LmGIVM-GbJhVmr4yfVeRzI4-SVt72vXBPVVteU-ayLdIkAZ4cF6yRx4Gqozl69Ubkk");
        urlencoded.append("grant_type", "refresh_token");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        try {
            const response = await fetch("https://accounts.google.com/o/oauth2/token", requestOptions);
            let data = await response.json();

            if(data.access_token){
                return {token:data.access_token, expire:data.expires_in};
            } else {
                return null
            }
        } catch (err) {
            return null
        }
    }
    async setGATOKEN(){
        this.setState({
            loading:true
        })
        let ga_token = this.getCookie("ga_token");

        if(ga_token){
            window.gapi.client.setToken({access_token:ga_token})
            this.setState({
                ga_token:ga_token,
                loading:false
            });
            this.getData();

        } else {
            let ga_token_with_expire = await this.getToken()

            if(ga_token_with_expire !== null){
                this.setCookie("ga_token", ga_token_with_expire.token, ga_token_with_expire.expire)
                window.gapi.client.setToken({access_token:ga_token_with_expire.token});
                this.setState({
                    ga_token:ga_token_with_expire.token,
                    loading:false
                });
                this.getData();
            } else {
                this.setState({
                    token_error:true,
                    loading:false
                })
            }
        }

    }

    setCookie(name,value,expire) {
        var expires = "";
        if (expire) {
            var date = new Date();
            date.setTime(date.getTime() + ((expire-500)*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }
    getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
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
    getData() {

        const request = {
            viewID: "236971916",
            startDate:this.state.startDate,
            endDate:this.state.endDate,
            metrics: "ga:users",
            dimensions: ["ga:browser"],
            orderBy: {
                fieldName: "ga:users",
                order: "DESCENDING",
            },
        };



        const requestScreen = {
            viewID: "236971916",
            startDate:this.state.startDate,
            endDate:this.state.endDate,
            metrics: "ga:users",
            dimensions: ["ga:screenResolution"],
            orderBy: {
                fieldName: "ga:users",
                order: "DESCENDING",
            },
        };



        const requestOs = {
            viewID: "236971916",
            startDate:this.state.startDate,
            endDate:this.state.endDate,
            metrics: "ga:users",
            dimensions: ["ga:operatingSystem"],
            orderBy: {
                fieldName: "ga:users",
                order: "DESCENDING",
            },
        };
        const requestLanguage = {
            viewID: "236971916",
            startDate:this.state.startDate,
            endDate:this.state.endDate,
            metrics: "ga:users",
            dimensions: ["ga:language"],
            orderBy: {
                fieldName: "ga:users",
                order: "DESCENDING",
            },
        };
        const requestSource = {
            viewID: "236971916",
            startDate:this.state.startDate,
            endDate:this.state.endDate,
            metrics: "ga:users",
            dimensions: ["ga:source"],
            orderBy: {
                fieldName: "ga:users",
                order: "DESCENDING",
            },
        };
        const requestDevice = {
            viewID: "236971916",
            startDate:this.state.startDate,
            endDate:this.state.endDate,
            metrics: "ga:users",
            dimensions: ["ga:deviceCategory"],
            orderBy: {
                fieldName: "ga:users",
                order: "DESCENDING",
            },
        };

        queryReport(request)
            .then((resp) => {
                this.displayResults(resp, "browser");


                queryReport(requestScreen)
                    .then((resp) => {
                        this.displayResults(resp, "screen")
                    })
                    .catch((error) => console.error(error))
                queryReport(requestOs)
                    .then((resp) => {
                        this.displayResults(resp, "os")
                    })
                    .catch((error) => console.error(error))
                queryReport(requestLanguage)
                    .then((resp) => {
                        this.displayResults(resp, "language")
                    })
                    .catch((error) => console.error(error))


            })
            .catch((error) => console.error(error))

        queryReport(requestDevice)
            .then((resp) => {
                this.displayResults(resp, "device")
            })
            .catch((error) => console.error(error))

        queryReport(requestSource)
            .then((resp) => {
                this.displayResults(resp, "source")
            })
            .catch((error) => console.error(error))

    }
    displayResults(response, type){
        const queryResult = response.result.reports[0].data.rows;


        let data = [];


        queryResult.forEach((row, id) => {
            data.push({
                name:row.dimensions[0],
                value: row.metrics[0].values[0]
            })
        });

        if(type == "browser"){
            this.setState({
                browser:data
            })
        }else if(type == "screen"){
            this.setState({
                screen:data
            })
        }else if(type == "os"){
            this.setState({
                os:data
            })
        }else if(type == "language"){
            this.setState({
                language:data
            })
        }else if(type == "source"){
            this.setState({
                source:data
            })
        }else if(type == "device"){
            this.setState({
                device:data
            })
        }

    };
    getOptions(type) {
        let data = [];
        if(type == "browser")
            data = this.state.browser
        else if(type == "screen")
            data = this.state.screen
        else if(type == "os")
            data = this.state.os
        else if(type == "language")
            data = this.state.language
        else if(type == "source")
            data = this.state.source
        else if(type == "device")
            data = this.state.device
        return {

            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',

                type: 'scroll',
                right: 10,
                top: 20,
                bottom: 20,
            },
            series: [

                {

                    type: 'pie',
                    data: data,
                    radius: '50%',
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                },

            ],


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
                            menuName="방문자 환경 통계"
                            title="기타 통계 - 방문자 환경 통계"
                            icon={<MenuIcon />}
                        />
                    </Grid>
                </Grid>

                {!this.state.loading ? this.state.token_error ? <div><h1>Google Analytic error please contact sysadmin</h1></div> :  <Grid container>
                    <Grid item md={12}>
                        <div className="card mt-20">
                            {/*2 huudas niileed scrolltoi neg tom huudas boloh <br/>*/}
                            {/*<a href="https://docs.google.com/presentation/d/1-10Vadqq9RfFowKImHfBc990cCj74bVd/edit#slide=id.p44" target="_blank">PPT загвар (Хийсний дараа устгах)</a> <br/>*/}
                            {/*<a href="https://docs.google.com/presentation/d/1-10Vadqq9RfFowKImHfBc990cCj74bVd/edit#slide=id.p45" target="_blank">PPT загвар (Хийсний дараа устгах)</a>*/}
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

                            <Grid container  spacing={2} className="align-items-center mt-20">
                                <Grid item md={6} xs={12}>
                                    <div style={{backgroundColor: '#2196f3'}}>
                                        <h4 className="text-center" style={{color: '#ffffff', padding: '10px'}}>모니터해상도</h4>
                                    </div>
                                    <div style={{width: "100%", height: 400}}>
                                        <BarChart options={this.getOptions("screen")}/>
                                    </div>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <div style={{backgroundColor: '#2196f3'}}>
                                        <h4 className="text-center" style={{color: '#ffffff', padding: '10px'}}>O/S</h4>
                                    </div>
                                    <div style={{width: "100%", height: 400}}>
                                        <BarChart options={this.getOptions("os")}/>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid container  spacing={2} className="align-items-center">
                                <Grid item md={6} xs={12}>
                                    <div style={{backgroundColor: '#2196f3'}}>
                                        <h4 className="text-center" style={{color: '#ffffff', padding: '10px'}}>언어</h4>
                                    </div>
                                    <div style={{width: "100%", height: 400}}>
                                        <BarChart options={this.getOptions("language")}/>
                                    </div>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <div style={{backgroundColor: '#2196f3'}}>
                                        <h4 className="text-center" style={{color: '#ffffff', padding: '10px'}}>Browser</h4>
                                    </div>
                                    <div style={{width: "100%", height: 400}}>
                                        <BarChart options={this.getOptions("browser")}/>
                                    </div>
                                </Grid>
                            </Grid>

                            <Grid  container  spacing={2} className="align-items-center">
                                <Grid item md={6} xs={12}>
                                    <div style={{backgroundColor: '#2196f3'}}>
                                        <h4 className="text-center" style={{color: '#ffffff', padding: '10px'}}>방문자 유입경로</h4>
                                    </div>
                                    <div style={{width: "100%", height: 500}}>
                                        <BarChart options={this.getOptions("source")}/>
                                    </div>
                                </Grid>
                                <Grid item md={6} xs={12}>
                                    <div style={{backgroundColor: '#2196f3'}}>
                                        <h4 className="text-center" style={{color: '#ffffff', padding: '10px'}}>Device</h4>
                                    </div>
                                    <div style={{width: "100%", height: 500}}>
                                        <BarChart options={this.getOptions("device")}/>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid> : <Loading />}
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
