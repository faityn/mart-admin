import React from "react";
import PageTitle from "../../../core/common/Partials/PageTitle";

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {
    Grid,
    Button,
    Divider,
    Table,
    TableBody,
    TableRow,
    TableCell,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TableHead,
    Checkbox, FormControlLabel,
} from "@material-ui/core";

import MenuIcon from '@material-ui/icons/Menu';

import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import CKEditor from "ckeditor4-react";
import SaveIcon from "@material-ui/icons/Save";
import PaginationMaterial from "@material-ui/lab/Pagination/Pagination";

import {GET_MAIL_MARKETS, GET_ROLES} from "./Queries";
import SendMail from "./marketingMail/SendMail";
import SearchID from "./marketingMail/SearchID";

class MailTemplateList extends React.Component {
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
            showModal:false,
            showModalUser:false,
            mailList: [],
            total: 0,
            marketTitle:"",
            startDate:"",
            endDate:"",
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
            ],
            roles:[],
            selectedSender:""
        };

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.hideModalUser = this.hideModalUser.bind(this);
        this.showModalUser = this.showModalUser.bind(this);
        this.getData = this.getData.bind(this);
        this.setStartDate = this.setStartDate.bind(this);
        this.setEndDate = this.setEndDate.bind(this);
        this.setMail = this.setMail.bind(this);
        this.setPageLimit = this.setPageLimit.bind(this);
        this.handlePageNumber = this.handlePageNumber.bind(this);
        this.selectSender = this.selectSender.bind(this);
        this.sendMailRef = React.createRef();

    }
    setMail(event){
        this.setState({
            marketTitle: event.target.value
        })
    }
    setStartDate(event){
        this.setState({
            startDate: event.target.value
        })
    }
    setEndDate(event){
        this.setState({
            endDate: event.target.value
        })
    }
    selectSender(value){
        console.log(value)
        this.setState({
            selectedSender:value
        })
    }
    async setPageLimit(event){
        this.setState({
            pagination: {
                rowsPerPage: event.target.value,
                pageNumber: this.state.pagination.pageNumber,
            }
        });
        await this.getData(null);

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
        await this.getRoles();


    }
    async getRoles(){
        await this.props.apolloClient.httpClient
            .query({
                query: GET_ROLES,
                variables: {

                },
            })
            .then((result) => {
                this.setState({
                    roles: result.data.getRoles,
                });
            });
    }
    async getData(page) {


        await this.props.apolloClient.httpClient
            .query({
                query: GET_MAIL_MARKETS,
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
                    mailList: result.data.getMailMarkets.list,
                    total: result.data.getMailMarkets.totalElements
                })


            });
    }
    showModal(){
        this.setState({
            showModal:true
        })
    }


    showModalUser(){
        this.setState({
            showModalUser:true
        })
    }

    hideModal(){
        this.setState({
            showModal:false
        })
    }


    hideModalUser(){
        this.setState({
            showModalUser:false
        });
        // if(this.state.selectedSender != ""){
        //     console.log(this.sendMailRef)
        //     this.sendMailRef.current.setValue(this.state.selectedSender, "receiver")
        // }
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
                            menuName="List of marketing mail"
                            title="List of marketing mail"
                            icon={<MenuIcon />}
                        />
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item md={8}>
                        <div className="card mt-20">
                            {/* Mail title */}
                            <Grid container spacing={2} className="align-items-center">
                                <Grid item md={12} xs={12}>
                                    <h5>Marketing Mail Template Lists</h5>
                                </Grid>
                                {/*<a href="https://docs.google.com/presentation/d/1Cz7nUAh6Y8p_uTsrGNYENnU9KAFWmZw0/edit#slide=id.p56" target="_blank">PPT загвар (Хийсний дараа устгах)</a>*/}
                                <Grid item md={12} xs={12}>
                                    <Table aria-label="simple table" className="mail_table">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell >Title of Mail</TableCell>
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
                                                <TableCell >Mailing Date</TableCell>
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
                                                                onChange={this.setStartDate}
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
                                                                onChange={this.setEndDate}
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
                            <div className="but-right">
                                <Button
                                    variant="contained"
                                    size="small"
                                    color="primary"
                                    onClick={this.showModal}
                                    startIcon={<AddIcon fontSize="small" className="mr-10" />}
                                >
                                    Write Mail
                                </Button>
                            </div>

                            <Grid container spacing={2} className="align-items-center">
                                <Grid item md={12} xs={12}>
                                    <Table aria-label="simple table" className="mail_table">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell >Mail Details</TableCell>
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
                                                <TableCell>Success or Failure</TableCell>
                                                <TableCell>Sender</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                (this.state.mailList || []).map((mail, index) =>
                                                        <TableRow key={index}>
                                                <TableCell >{index+1}</TableCell>
                                                <TableCell >{mail.createdDate}</TableCell>
                                                <TableCell >{mail.marketTitle}</TableCell>
                                                <TableCell >2020.5.30</TableCell>
                                                <TableCell >1 / 0</TableCell>
                                                <TableCell >{mail.marketEmail}</TableCell>
                                            </TableRow>)
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

                            <Modal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                open={this.state.showModal}
                                onClose={this.hideModal}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 500,
                                }}
                            >
                                <Fade in={this.state.showModal}>
                                    <SendMail
                                        ref={this.sendMailRef}
                                        hideModal={this.hideModal}
                                        showModalUser={this.showModalUser}
                                        hideModalUser={this.hideModalUser}
                                        selectedSender={this.state.selectedSender}
                                        roles={this.state.roles}
                                    />
                                </Fade>
                            </Modal>
                            <Modal
                                aria-labelledby="transition-modal-title"
                                aria-describedby="transition-modal-description"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                open={this.state.showModalUser}
                                onClose={this.hideModalUser}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 500,
                                }}
                            >
                                <Fade in={this.state.showModalUser}>
                                    <SearchID
                                        hideModalUser={this.hideModalUser}
                                        selectSender={this.selectSender}
                                        selectedSender={this.state.selectedSender}
                                        roles={this.state.roles}

                                    />
                                </Fade>
                            </Modal>

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

export default withSnackbar(connect(mapStateToProps, null)(MailTemplateList));
