import React from "react";
import PageTitle from "../../../core/common/Partials/PageTitle";

import {
    Grid,
} from "@material-ui/core";

import MenuIcon from '@material-ui/icons/Menu';

import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SwipeableViews from "react-swipeable-views";
import Ranking1 from "./021Ranking";
import Ranking2 from "./022Ranking";



class Statistics extends React.Component {
    /**
     * @constructor
     */

    constructor(props) {
        super(props);

        // Default state
        this.state = {
            value:0
        };

        this.handleChangeTab = this.handleChangeTab.bind(this);
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
                            menuName="상품&검색어 순위"
                            title="기타 통계 - 상품&검색어 순위"
                            icon={<MenuIcon />}
                        />
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item md={12}>
                        <div className="card mt-20">
                            <Paper>
                                <Tabs
                                    textColor="primary"
                                    value={this.state.value}
                                    onChange={this.handleChangeTab}
                                    variant="fullWidth"
                                >
                                    <Tab label="상품별 랭킹" {...this.tabProps(0)} />
                                    <Tab label="검색어 랭킹" {...this.tabProps(1)} />

                                </Tabs>
                            </Paper>

                            {/* SwipeableViews */}
                            <SwipeableViews
                                index={this.state.value}
                            >
                                {/* Basic content */}
                                <div value={this.state.value} index={0} className="mt-20">
                                    <Ranking1 />
                                </div>

                                {/* Price Reserve information content */}
                                <div value={this.state.value} index={1} className="mt-20">
                                    <Ranking2 />
                                </div>


                            </SwipeableViews>
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