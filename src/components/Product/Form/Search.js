import React from "react";
import {
    Grid,
    CardContent,
    TextField,
    InputLabel,
} from "@material-ui/core";
/**
 * @summary Detail
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Product
 */
class Search extends React.Component {
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
            <CardContent>
                <Grid container spacing={3} className="align-items-center">
                    <Grid item md={2} xs={12}>
                        <h5>태그</h5>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <InputLabel>태그 입력(구분은 , ...)</InputLabel>
                        <TextField
                            fullWidth
                            placeholder="태그 입력"
                            size="small"
                            style={{marginTop: "10px"}}
                            variant="outlined"
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={3} className="align-items-center">
                    <Grid item md={2} xs={12}>
                        <h5>Page Title</h5>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            fullWidth
                            placeholder="페이지 타이틀 입력"
                            size="small"
                            variant="outlined"
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={3} className="align-items-center">
                    <Grid item md={2} xs={12}>
                        <h5>Meta description</h5>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            fullWidth
                            placeholder="메타 디스크립션 입력"
                            size="small"
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
            </CardContent>
        );
    }
}

export default Search;
