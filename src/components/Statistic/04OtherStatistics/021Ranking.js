import React from "react";

import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import {
    Button,
    FormControl,
    Grid,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell, TableHead,
    TableRow,
    TextField
} from "@material-ui/core";
import PaginationMaterial from "@material-ui/lab/Pagination/Pagination";
import SaveIcon from "@material-ui/core/SvgIcon/SvgIcon";




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
                <Grid container className="align-items-center mt-20">
                    <Grid item md={12} xs={12}>
                        <Table aria-label="simple table" className="mail_table">
                            <TableBody>
                                <TableRow>
                                    <TableCell>분류 선택</TableCell>
                                    <TableCell>
                                        <Grid container spacing={1} className="align-items-center">
                                            <Grid item md={3} xs={3}>
                                                <FormControl size="small" fullWidth variant="outlined">
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="demo-simple-select-outlined"
                                                        label="Mail templates"
                                                        name="mail-templates"

                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>

                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item md={2} xs={2}>
                                                <div className="text-center">~</div>
                                            </Grid>
                                            <Grid item md={3} xs={3}>
                                                <FormControl size="small" fullWidth variant="outlined">
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="demo-simple-select-outlined"
                                                        label="Mail templates"
                                                        name="mail-templates"

                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>

                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item md={4} xs={4}>
                                                <div className="text-center">
                                                    <Button
                                                        variant="contained"
                                                        size="bg"
                                                        color="primary"
                                                        // startIcon={<SaveIcon color="white" size="1rem" />}
                                                        //onClick={this.getData}
                                                    >
                                                        검색
                                                    </Button>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>기간 선택</TableCell>
                                    <TableCell>
                                        <Grid container spacing={1} className="align-items-center">
                                            <Grid item md={3} xs={3}>
                                                <TextField
                                                    fullWidth
                                                    id="startDate-basic"
                                                    type="date"
                                                    size="small"
                                                    variant="outlined"
                                                    name="startDate"
                                                    // defaultValue={moment(
                                                    //     data.startDate,
                                                    //     "YYYY-MM-DDTHH:mm:ssZ"
                                                    // ).format("YYYY-MM-DD")}
                                                    // error={this.hasError("startDate")}
                                                    // helperText={
                                                    //     this.hasError("startDate")
                                                    //         ? this.state.errors["startDate"][0]
                                                    //         : null
                                                    // }
                                                    // style={{ width: "187px", marginLeft: "28px" }}
                                                />
                                            </Grid>
                                            <Grid item md={2} xs={2}>
                                                <div className="text-center">~</div>
                                            </Grid>
                                            <Grid item md={3} xs={3}>
                                                <TextField
                                                    fullWidth
                                                    id="startDate-basic"
                                                    type="date"
                                                    size="small"
                                                    variant="outlined"
                                                    name="endDate"
                                                    // defaultValue={moment(
                                                    //     data.endDate,
                                                    //     "YYYY-MM-DDTHH:mm:ssZ"
                                                    // ).format("YYYY-MM-DD")}
                                                    // helperText={
                                                    //     this.hasError("endDate")
                                                    //         ? this.state.errors["endDate"][0]
                                                    //         : null
                                                    // }
                                                    // style={{ paddingLeft: "45px", width: "187px" }}
                                                />
                                            </Grid>
                                            <Grid item md={4} xs={4}>
                                                <div className="text-center">
                                                    <Button
                                                        variant="contained"
                                                        size="bg"
                                                        color="primary"
                                                        // startIcon={<SaveIcon color="white" size="1rem" />}
                                                        //onClick={this.getData}
                                                    >
                                                        검색
                                                    </Button>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>

                <Grid container  className="align-items-center mt-20">
                    <Grid item md={12} xs={12}>
                        <Table aria-label="simple table" className="statistic_table table-striped">
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>상품명</TableCell>
                                    <TableCell>상품코드</TableCell>
                                    <TableCell>판매수</TableCell>
                                    <TableCell>조회수</TableCell>
                                    <TableCell>위시리스트</TableCell>
                                    <TableCell>매출액</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>1</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>2</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>3</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>4</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>5</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>6</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>7</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>8</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>9</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
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
