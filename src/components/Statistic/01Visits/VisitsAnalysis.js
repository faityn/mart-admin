import React from "react";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import {
    Grid,
} from "@material-ui/core";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuIcon from '@material-ui/icons/Menu';
import Paper from "@material-ui/core/Paper";
import SwipeableViews from "react-swipeable-views";

import PageTitle from "../../../core/common/Partials/PageTitle";
import Loading from '../../../core/common/Partials/Loading';
import { GET_DATA } from "./Queries";
import TabDaily from "./TabDaily";
import TabMonthly from "./TabMonthly";
import TabHourly from "./TabHourly";

class VisitsAnalysis extends React.Component {
    /**
     * @constructor
     */
    constructor(props) {
        super(props);

        // Default state
        this.state = {
            value: 0,
            loading: true,
            dictionaryCountry: [],
            aObPage: [],
        };

        this.handleChangeTab = this.handleChangeTab.bind(this);
        this.loadData = this.loadData.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        this.props.apolloClient.httpClient.query({
            query: GET_DATA,
            variables: {
                search: {
                    dictype: 'country',
                }
            }
        }).then((result) => {
            this.setState({
                dictionaryCountry: [null, undefined].includes(result.data.getDictionaryByType.list) === false ? [...result.data.getDictionaryByType.list] : [],
                aObPage: [null, undefined].includes(result.data.getObservablePage.list) === false ? [...result.data.getObservablePage.list.filter(item => item.enabled)] : [],
                loading: false,
            });
        }).catch((error) => {
            this.setState({
                dictionaryCountry: [],
                aObPage: [],
                loading: false,
            });
            this.props.enqueueSnackbar(
                "Sorry, there is an error occurred while fetching data.",
                { variant: "error" }
            );
        });
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
                        {!this.state.loading ? <div className="card mt-20">
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
                            <SwipeableViews index={this.state.value}>
                                <div value={this.state.value} index={0} className="mt-20">
                                    <TabDaily
                                        aObPage={this.state.aObPage}
                                        dictionaryCountry={this.state.dictionaryCountry}
                                        bLoad={this.state.value === 0}
                                    />
                                </div>
                                <div value={this.state.value} index={1} className="mt-20">
                                    <TabMonthly
                                        aObPage={this.state.aObPage}
                                        dictionaryCountry={this.state.dictionaryCountry}
                                        bLoad={this.state.value === 1}
                                    />
                                </div>
                                <div value={this.state.value}  index={2} className="mt-20">
                                    <TabHourly
                                        aObPage={this.state.aObPage}
                                        dictionaryCountry={this.state.dictionaryCountry}
                                        bLoad={this.state.value === 2}
                                    />
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

export default withSnackbar(connect(mapStateToProps, null)(VisitsAnalysis));