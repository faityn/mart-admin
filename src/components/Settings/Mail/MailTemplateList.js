import React from "react";
import PageTitle from "../../../core/common/Partials/PageTitle";

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {
    Grid,

    Button,
    Divider, Table, TableBody, TableRow, TableCell, TextField, FormControl, InputLabel, Select, MenuItem, TableHead,
} from "@material-ui/core";

import MenuIcon from '@material-ui/icons/Menu';

import {withSnackbar} from "notistack";
import {connect} from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import CKEditor from "ckeditor4-react";
import NoteAddIcon from "@material-ui/core/SvgIcon/SvgIcon";
import {GET_MAIL_REQ, SAVE_MAIL_REQ, GET_MAIL_REQ_BY_TYPE, DELETE_MAIL_REQ} from "./Queries";


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
            showModal: false,
            mailList: [],
            mailType: "",
            mailTitle: "",
            newMailType:"",
            newMailTitle:"",
            newMail:"",
            newMailDesc:"",
            modifyID:"",
            total: 0
        };

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.setMailTitle = this.setMailTitle.bind(this);
        this.setMailType = this.setMailType.bind(this);
        this.getData = this.getData.bind(this);
        this.setNewMailType = this.setNewMailType.bind(this);
        this.setNewMailDesc = this.setNewMailDesc.bind(this);
        this.setNewMail = this.setNewMail.bind(this);
        this.setNewMailTitle = this.setNewMailTitle.bind(this);
        this.saveNewMail = this.saveNewMail.bind(this);
        this.editMail = this.editMail.bind(this);
        this.deleteMailReq = this.deleteMailReq.bind(this);

    }

    editMail(mail){
        console.log(mail)
        this.setState({
            modifyID: mail.id,
            newMailType: mail.mailType,
            newMailTitle:mail.mailTitle,
            newMail: mail.mailEmail,
            newMailDesc: mail.mailDescription,
            showModal: true
        });
    }
    async saveNewMail() {


        await this.props.apolloClient.httpClient
            .mutate({
                mutation: SAVE_MAIL_REQ,
                variables: {
                    "mailreq": {
                        "id": this.state.modifyID ? this.state.modifyID : "",
                        "mailType": this.state.newMailType,
                        "mailTitle":this.state.newMailTitle,
                        "mailEmail": this.state.newMail,
                        "mailDescription":this.state.newMailDesc
                    }
                },
            })
            .then((result) => {
                if (result.data.saveMailReq.statusCode === 200) {
                    this.props.enqueueSnackbar("Successfully saved.", {variant: "success"});
                    this.setState({
                        modifyID: "",
                        newMailType: "",
                        newMailTitle:"",
                        newMail: "",
                        newMailDesc: "",
                        showModal: false
                    })
                    this.getData();
                } else {
                    this.props.enqueueSnackbar("Sorry, there is an error occurred while saving data.", {variant: "error"});
                }
            })
            .catch((error) => {
                this.props.enqueueSnackbar("Sorry, there is an error occurred while saving data.", {variant: "error"});
            });
    }
    async deleteMailReq(id) {


        await this.props.apolloClient.httpClient
            .mutate({
                mutation: DELETE_MAIL_REQ,
                variables: {
                    "id":id
                },
            })
            .then((result) => {
               this.getData()
            })
            .catch((error) => {
                this.props.enqueueSnackbar("Sorry, there is an error occurred while saving data.", {variant: "error"});
            });
    }

    showModal() {
        this.setState({
            showModal: true
        })
    }

    hideModal() {
        this.setState({
            modifyID: "",
            newMailType: "",
            newMailTitle:"",
            newMail: "",
            newMailDesc: "",
            showModal: false
        })
    }

    setMailTitle(event) {
        this.setState({
            mailTitle: event.target.value
        })
    }

    setNewMailTitle(event) {
        this.setState({
            newMailTitle: event.target.value
        })
    }

    setNewMail(event) {
        this.setState({
            newMail: event.target.value
        })
    }

    setNewMailDesc(event, editor) {
        this.setState({
            newMailDesc: editor.getData(),
        })
    }

    setMailType(event) {
        this.setState({
            mailType: event.target.value
        })
    }

    setNewMailType(event) {
        this.setState({
            newMailType: event.target.value
        })
    }

    async componentDidMount() {

        await this.getData();
        /*API aas hooson medeelel irj bgaa tul ashilglalgui uldeelel*/
        // await this.getMailReq();

    }


    async getData() {


        // await this.props.apolloClient.httpClient
        //     .query({
        //         query: GET_MAIL_REQS,
        //         variables: {
        //             "search": {
        //                 "title": this.state.mailTitle,
        //                 "mailType": this.state.mailType
        //             },
        //             "page": {
        //                 "limit": 100,
        //                 "pageNumber": 1,
        //                 "orderBy": "createdDate",
        //                 "type": "DESC"
        //             }
        //         },
        //     })
        //     .then((result) => {
        //
        //
        //
        //         this.setState({
        //             mailList: result.data.getMailReqs.list,
        //             total: result.data.getMailReqs.totalElements
        //         })
        //
        //
        //     });

        await this.props.apolloClient.httpClient
            .query({
                query: GET_MAIL_REQ_BY_TYPE,
                variables: {
                    "mailType": this.state.mailTitle,
                    "mailEmail": this.state.mailType,
                    "startDate": "",
                    "endDate": ""
                },
            })
            .then((result) => {


                this.setState({
                    mailList: result.data.getMailReqByMailType,
                    total: result.data.getMailReqByMailType.length,
                })



            });

    }

    /*API aas hooson medeelel irj bgaa tul ashilglalgui uldeelel*/
    async getMailReq() {


        await this.props.apolloClient.httpClient
            .query({
                query: GET_MAIL_REQ,
                variables: {
                    "id": ""
                },
            })
            .then((result) => {


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
                            menuName="Mail templates"
                            title="Mail templates"
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
                                    <h5>Mail Template Lists</h5>
                                </Grid>
                                {/*<a href="https://docs.google.com/presentation/d/16IZEAtu7MamV_I6WBt5YQ7xa1taO8oMs/edit#slide=id.p68" target="_blank">PPT загвар (Хийсний дараа устгах)</a>*/}
                                <Grid item md={12} xs={12}>
                                    <Table aria-label="simple table" className="mail_table">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>Title of Mail Template</TableCell>
                                                <TableCell>
                                                    <TextField
                                                        id="name-basic"
                                                        label=""
                                                        size="small"
                                                        variant="outlined"
                                                        onChange={this.setMailType}
                                                        name="name"

                                                    />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Title of Mail</TableCell>
                                                <TableCell>
                                                    <TextField
                                                        id="name-basic"
                                                        label=""
                                                        size="small"
                                                        variant="outlined"
                                                        onChange={this.setMailTitle}
                                                        name="name"

                                                    />
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
                                    onClick={this.getData}
                                >
                                    SEARCH
                                </Button>
                            </div>

                            <br/>
                            <br/>

                            <Grid container spacing={2} className="align-items-center">
                                <Grid item md={12} xs={12}>
                                    <Table aria-label="simple table" className="mail_table">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell>Mail Details</TableCell>
                                                <TableCell>
                                                    <h5>* Searching Result : <span className="color-red">{this.state.total}</span>
                                                    </h5>
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
                                                <TableCell>Title of Mail Template</TableCell>
                                                <TableCell>Conditions for Mailing</TableCell>
                                                <TableCell>Sender</TableCell>
                                                <TableCell>Management(Edit / Delete)</TableCell>
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
                                                        <TableCell>{mail.mailEmail}</TableCell>
                                                        <TableCell>
                                                            <Grid container spacing={2} className="align-items-center">
                                                                <div className="_center">
                                                                    <Button
                                                                        variant="contained"
                                                                        size="small"
                                                                        color="primary"
                                                                        // startIcon={<SaveIcon color="white" size="1rem" />}
                                                                        onClick={() => this.editMail(mail)}
                                                                    >
                                                                        Edit
                                                                    </Button>
                                                                </div>
                                                            </Grid>
                                                            <Grid container spacing={2} className="align-items-center">
                                                                <div className="center">
                                                                    <Button
                                                                        className="bordered"
                                                                        variant="contained"
                                                                        size="small"
                                                                        color="default"
                                                                        onClick={()=>this.deleteMailReq(mail.id)}
                                                                        // startIcon={
                                                                        //     <NoteAddIcon />
                                                                        // }
                                                                    >
                                                                        Delete
                                                                    </Button>
                                                                </div>
                                                            </Grid>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            }
                                        </TableBody>
                                    </Table>
                                </Grid>
                            </Grid>

                            <div className="but-right">
                                <Button
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                    onClick={this.showModal}
                                    startIcon={<AddIcon fontSize="small" className="mr-10"/>}
                                >
                                    Add
                                </Button>
                            </div>

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
                                    <div style={{
                                        backgroundColor: "#fff",
                                        border: '2px solid #000',
                                        padding: "20px",
                                    }}>
                                        <Grid container spacing={2} className="align-items-center">
                                            {/*<a href="https://docs.google.com/presentation/d/16IZEAtu7MamV_I6WBt5YQ7xa1taO8oMs/edit#slide=id.p69" target="_blank">PPT загвар (Хийсний дараа устгах)</a>*/}
                                            <Grid item md={12} xs={12}>
                                                <h2 id="transition-modal-title">메일 양식 편집</h2>
                                            </Grid>
                                            <Grid item md={12} xs={12}>
                                                <Table aria-label="simple table" className="mail_table">
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell>메일 양식 제목</TableCell>
                                                            <TableCell>
                                                                <FormControl size="small" fullWidth variant="outlined">
                                                                    {/*<InputLabel id="demo-simple-select-outlined-label">발신전용</InputLabel>*/}

                                                                    <Select
                                                                        labelId="demo-simple-select-outlined-label"
                                                                        id="demo-simple-select-outlined"
                                                                        label="발신전용"
                                                                        defaultValue={this.state.newMailType}
                                                                        onChange={(e) => this.setNewMailType(e)}
                                                                    >

                                                                        {
                                                                            (this.state.mailList || []).map((mail, index) =>

                                                                                <MenuItem key={index}
                                                                                          value={mail.id}>{mail.mailTitle}</MenuItem>
                                                                            )
                                                                        }
                                                                    </Select>
                                                                </FormControl>
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>메일 제목</TableCell>
                                                            <TableCell>
                                                                <TextField
                                                                    fullWidth
                                                                    id="name-basic"
                                                                    label=""
                                                                    size="small"
                                                                    variant="outlined"
                                                                    name="name"
                                                                    defaultValue={this.state.newMailTitle}
                                                                    onChange={this.setNewMailTitle}

                                                                />
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>발신자</TableCell>
                                                            <TableCell>
                                                                <TextField
                                                                    fullWidth
                                                                    id="name-basic"
                                                                    label=""
                                                                    size="small"
                                                                    variant="outlined"
                                                                    name="name"
                                                                    defaultValue={this.state.newMail}
                                                                    onChange={this.setNewMail}

                                                                />
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={2} className="align-items-center">
                                            <Grid item md={12} xs={12}>
                                                <h5 id="transition-modal-title">양식 내용 편집</h5>
                                            </Grid>
                                            <Grid item md={12} xs={12}>
                                                <FormControl fullWidth>
                                                    <CKEditor
                                                        type="classic"
                                                        name="description"
                                                        data={this.state.newMailDesc}
                                                        onChange={({ event, editor }) =>

                                                            this.setNewMailDesc(event, editor)
                                                        }
                                                    />
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                        <div className="but-right">
                                            <Button
                                                variant="contained"
                                                size="small"
                                                color="primary"
                                                // startIcon={<SaveIcon color="white" size="1rem" />}
                                                onClick={this.saveNewMail}
                                            >
                                                >저장
                                            </Button>
                                        </div>

                                    </div>
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
