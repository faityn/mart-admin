import React from "react";
import { Grid, Button } from "@material-ui/core";

class Member extends BaseList {
    /**
     * @constructor
     */
    constructor(props) {
        super(props);
    }

    /**
     * @override
     */
    render() {
        return (
            <React.Fragment>
                <Grid container>
                    <Grid item xs={12} className="text-right">
                    </Grid>
                </Grid>
            </React.Fragment>
        );
    }
}

export default Member;
