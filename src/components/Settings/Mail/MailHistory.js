import React from "react";
import PageTitle from "../../../core/common/Partials/PageTitle";


import {
    Grid,

    Divider,
    Table,
    TableBody,
    TableRow,
    TableCell,
    TextField,
    Checkbox,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button, TableHead,
} from "@material-ui/core";

import MenuIcon from '@material-ui/icons/Menu';

import {withSnackbar} from "notistack";
import {connect} from "react-redux";
import moment from "moment";
import SaveIcon from "@material-ui/icons/Save";
import PaginationMaterial from "@material-ui/lab/Pagination/Pagination";

import {GET_MAIL_REQS} from "./Queries";

class MailHistory extends React.Component {
    /**
     * @constructor
     */
    /**
     * @constructor
     */
    constructor(props) {
        super(props);

        // Default state
        this.state = {
            mailTitle: "",
            mailType: "",
            mailList: [],
            total: 0,

            pagination: {
                rowsPerPage: 10,
                pageNumber: 1,
            },
            orderBy: "createdDate",
            type: "DESC",
            limits:[
                10,
                50,
                100,
            ]
        };


        this.handlePageNumber = this.handlePageNumber.bind(this);
        this.getData = this.getData.bind(this);
        this.setMail = this.setMail.bind(this);
        this.setPageLimit = this.setPageLimit.bind(this);

    }
    async setPageLimit(event){
        this.setState({
            pagination: {
                rowsPerPage: event.target.value,
                pageNumber: 1,
            }
        });
        await this.getData(1);

    }
    setMail(event){
        this.setState({
            mailTitle: event.target.value
        })
    }
    async handlePageNumber(e, page) {
        this.setState({
            pagination: {
                rowsPerPage: this.state.pagination.rowsPerPage,
                pageNumber: page,
            }
        });

        await this.getData(page);
    }

    async componentDidMount() {

        await this.getData(null);


    }

    async getData(page) {


        await this.props.apolloClient.httpClient
            .query({
                query: GET_MAIL_REQS,
                variables: {
                    "search": {
                        "title": this.state.mailTitle,
                        "mailType": this.state.mailType
                    },
                    page: {
                        limit: this.state.pagination.rowsPerPage,
                        pageNumber: page ? page :this.state.pagination.pageNumber,
                        orderBy: this.state.orderBy,
                        type: this.state.type,
                    },
                },
            })
            .then((result) => {


                this.setState({
                    mailList: result.data.getMailReqs.list,
                    total: result.data.getMailReqs.totalElements
                })


            });
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
                            menuName="Mail History"
                            title="Mail History"
                            icon={<MenuIcon/>}
                        />
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item md={8}>
                        <div className="card mt-20">
                            {/* Mail title */}
                            <Grid container spacing={2} className="align-items-center">
                                <Grid item md={12} xs={12}>
                                    <h5>Mailing List</h5>
                                </Grid>
                                {/*<a href="https://docs.google.com/presentation/d/16IZEAtu7MamV_I6WBt5YQ7xa1taO8oMs/edit#slide=id.p70" target="_blank">PPT загвар (Хийсний дараа устгах)</a>*/}
                                <Grid item md={12} xs={12}>
                                    <Table aria-label="simple table" className="mail_table">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>Mail</TableCell>
                                                <TableCell>
                                                    <TextField
                                                        id="name-basic"
                                                        label=""
                                                        size="small"
                                                        variant="outlined"
                                                        name="name"
                                                        onChange={this.setMail}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Mailing Date</TableCell>
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
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>

                                </Grid>
                            </Grid>
                            <div className="center">
                                <Button
                                    variant="contained"
                                    size="small"
                                    color="primary"
                                    // startIcon={<SaveIcon color="white" size="1rem" />}
                                    onClick={() => this.getData(null)}
                                >
                                    Search
                                </Button>
                            </div>
                            {/*<div className="but-right">*/}
                            {/*    <Button*/}
                            {/*        variant="contained"*/}
                            {/*        size="small"*/}
                            {/*        color="primary"*/}
                            {/*        // startIcon={<SaveIcon color="white" size="1rem" />}*/}
                            {/*        // onClick={() => this.props.search(this.state)}*/}
                            {/*    >*/}
                            {/*        메일 쓰기*/}
                            {/*    </Button>*/}
                            {/*</div>*/}


                            <Grid container spacing={2} className="align-items-center">
                                <Grid item md={12} xs={12}>
                                    <Table aria-label="simple table" className="mail_table">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>Details</TableCell>
                                                <TableCell>
                                                    <Grid container spacing={1} className="align-items-center">
                                                        <Grid item md={9} xs={9}>
                                                            <h5>* Searching Result : <span className="color-red">{this.state.total}</span></h5>
                                                        </Grid>
                                                        <Grid item md={3} xs={3}>
                                                            <FormControl size="small" fullWidth variant="outlined">


                                                                <Select
                                                                    labelId="demo-simple-select-outlined-label"
                                                                    id="demo-simple-select-outlined"

                                                                    defaultValue={this.state.pagination.rowsPerPage}
                                                                    onChange={(e) => this.setPageLimit(e)}
                                                                >

                                                                    {
                                                                        (this.state.limits || []).map((limit, index) =>

                                                                            <MenuItem key={index}
                                                                                      value={limit}>{limit}</MenuItem>
                                                                        )
                                                                    }
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} className="align-items-center">
                                <Grid item md={12} xs={12}>
                                    <Table aria-label="simple table" className="mail_history_table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Numbers</TableCell>
                                                <TableCell>Registration Date</TableCell>
                                                <TableCell>Title of Mail</TableCell>
                                                <TableCell>Mailing Date</TableCell>
                                                <TableCell>Success or Failure </TableCell>
                                                <TableCell>Sender</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                (this.state.mailList || []).map((mail, index) =>

                                                    <TableRow key={index}>
                                                        <TableCell>{index + 1}</TableCell>
                                                        <TableCell>{mail.createdDate}</TableCell>
                                                        <TableCell>{mail.mailTitle}</TableCell>
                                                        <TableCell>{mail.mailType}</TableCell>
                                                        <TableCell>1 / 0</TableCell>
                                                        <TableCell>{mail.mailEmail}</TableCell>
                                                    </TableRow>
                                                )
                                            }
                                        </TableBody>
                                    </Table>
                                </Grid>
                            </Grid>
                            <Grid container className="mt-20">
                                <Grid item xs={12}>
                                    <PaginationMaterial
                                        count={Math.ceil(
                                            this.state.total /
                                            this.state.pagination.rowsPerPage
                                        )}
                                        page={this.state.pagination.pageNumber}
                                        onChange={(e, page) => this.handlePageNumber(e, page)}
                                        color="primary"
                                    />
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

export default withSnackbar(connect(mapStateToProps, null)(MailHistory));
