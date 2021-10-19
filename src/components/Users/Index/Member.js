import React from "react";
import { GET_USERS } from "../Queries";
import BaseList from "../../../core/common/List";
import MemberTable from "./MemberTable";
import ZoomInIcon from "@material-ui/icons/ZoomIn";
import ZoomOutIcon from "@material-ui/icons/ZoomOut";
import AddIcon from "@material-ui/icons/Add";
import MemberSearch from "./MemberSearch";
import { Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

class Member extends BaseList {
    /**
     * @constructor
     */
    constructor(props) {
        super(props);

        // Merge search states
        this.state = Object.assign(this.state, {
            search: {
                "status": "ACTIVE",
                "memberType": null,
                "age": null,
                "gender": null,
                "agreeEmail": false,
                "nation": null,
                "keyword": null
            },
            orderBy: "createdDate",
        });

        // Override
        this.query = GET_USERS;
        this.table = MemberTable;
    }

    /**
     * @summary Search
     * @param {String} childrenName
     * @param {String} childrenState
     */
    search(childrenState) {
        this.setState({
            search: {
                "status": "ACTIVE",
                "memberType": childrenState.memberType.length > 0 ? childrenState.memberType : null,
                "age": childrenState.age.length > 0 ? childrenState.age : null,
                "gender": childrenState.gender.length > 0 ? childrenState.gender : null,
                "agreeEmail": childrenState.agreeEmail,
                "nation": childrenState.nation ? childrenState.nation : null,
                "keyword": childrenState.name ? childrenState.name : null
            },
        });
    }

    /**
     * @override
     */
    render() {
        return (
            <React.Fragment>
                <Grid container>
                    {/* Button section */}
                    <Grid item xs={12} className="text-right">
                        {/* Search */}
                        <Button
                            variant="contained"
                            color="default"
                            size="small"
                            startIcon={
                                this.state.isShowSearchPanel ? (
                                    <ZoomOutIcon />
                                ) : (
                                    <ZoomInIcon />
                                )
                            }
                            onClick={this.toggleSearchPanel}
                        >
                            Search
                        </Button>

                        {/* Create */}
                        <Link to="/member/create">
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                startIcon={<AddIcon />}
                                className="ml-20"
                            >
                                New Member
                            </Button>
                        </Link>
                    </Grid>
                </Grid>

                {/* List section */}
                <div className="mt-20">
                    {/* Search div */}
                    {this.state.isShowSearchPanel ? (
                        <div className="card">
                            <MemberSearch search={this.search} />
                        </div>
                    ) : null}

                    {/* List */}
                    {this.executeQuery()}
                </div>
            </React.Fragment>
        );
    }
}

export default Member;
