import React from "react";
import PageTitle from "../../../core/common/Partials/PageTitle";

import {
    Grid,
} from "@material-ui/core";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuIcon from '@material-ui/icons/Menu';
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import SwipeableViews from "react-swipeable-views";
import GoogleAnalytics1 from "./01GoogleAnalytics"
import GoogleAnalytics2 from "./02GoogleAnalytics"
import GoogleAnalytics3 from "./03GoogleAnalytics"
import Loading from '../../../core/common/Partials/Loading';
class GoogleAnalytics extends React.Component {
    /**
     * @constructor
     */

    constructor(props) {
        super(props);

        // Default state
        this.state = {
            value:0,
            loading:true,
            ga_token:null,
            token_error:false

        };

        this.handleChangeTab = this.handleChangeTab.bind(this);
        this.setGATOKEN = this.setGATOKEN.bind(this);
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

        } else {
            let ga_token_with_expire = await this.getToken()

            if(ga_token_with_expire !== null){
                this.setCookie("ga_token", ga_token_with_expire.token, ga_token_with_expire.expire)
                window.gapi.client.setToken({access_token:ga_token_with_expire.token});
                this.setState({
                    ga_token:ga_token_with_expire.token,
                    loading:false
                });
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
    handleChangeTab(event, newValue) {
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
                            menuName="방문자 통계"
                            title="통계관리 - 방문자 통계"
                            icon={<MenuIcon />}
                        />
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item md={12}>
                        {!this.state.loading ? this.state.token_error ? <div><h1>Google Analytic error please contact sysadmin</h1></div> : <div className="card mt-20">
                            <Paper>
                                <Tabs
                                    textColor="primary"
                                    value={this.state.value}
                                    onChange={this.handleChangeTab}
                                    variant="fullWidth"
                                >
                                    <Tab label="일별 방문 통계" {...this.tabProps(0)} />
                                    <Tab label="월별 방문 통계" {...this.tabProps(1)} />
                                    <Tab label="시간대별 방문 통계" {...this.tabProps(2)} />
                                </Tabs>
                            </Paper>

                            {/* SwipeableViews */}
                            <SwipeableViews
                                index={this.state.value}
                            >
                                <div value={this.state.value} index={0} className="mt-20">

                                    <GoogleAnalytics1 ga_token={this.state.ga_token} viewID={"236971916"} />
                                </div>
                                <div value={this.state.value} index={1} className="mt-20">

                                    {this.state.value == 1 ? <GoogleAnalytics2 ga_token={this.state.ga_token} viewID={"236971916"} /> : null}
                                </div>
                                <div value={this.state.value}  index={2} className="mt-20">

                                    {this.state.value == 2 ? <GoogleAnalytics3 ga_token={this.state.ga_token} viewID={"236971916"}/> : null}
                                </div>

                            </SwipeableViews>
                        </div> : <Loading />}
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

export default withSnackbar(connect(mapStateToProps, null)(GoogleAnalytics));