import React from "react";

import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import {Grid, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import PaginationMaterial from "@material-ui/lab/Pagination/Pagination";




class Ranking extends React.Component {
    /**
     * @constructor
     */

    constructor(props) {
        super(props);

        // Default state
        this.state = {

        };


    }


    /**
     * @override
     */
    render() {
        return (
            <div>
                <Grid container  className="align-items-center mt-20">
                    <Grid item md={12} xs={12}>
                        <Table aria-label="simple table" className="statistic_table table-striped">
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>검색어</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell style={{width: '100px'}}>1</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{width: '100px'}}>2</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{width: '100px'}}>3</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{width: '100px'}}>4</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{width: '100px'}}>5</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{width: '100px'}}>6</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{width: '100px'}}>7</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{width: '100px'}}>8</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{width: '100px'}}>9</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell style={{width: '100px'}}>10</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>

                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>

                <Grid container className="mt-20">
                    <Grid item md={12} xs={12}>
                        <PaginationMaterial
                            // count={Math.ceil(
                            //     this.state.total /
                            //     this.state.pagination.rowsPerPage
                            // )}
                            // page={this.state.pagination.pageNumber}
                            // onChange={(e, page) => this.handlePageNumber(e, page)}
                            color="primary"
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

// Redux state to props
const mapStateToProps = (state) => {
    return {
        apolloClient: state.apolloClient,
    };
};

export default withSnackbar(connect(mapStateToProps, null)(Ranking));
