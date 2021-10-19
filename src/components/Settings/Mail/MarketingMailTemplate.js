import React from "react";
import PageTitle from "../../../core/common/Partials/PageTitle";

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {
    Grid,

    Button,
    Divider, Table, TableHead, TableRow, TableCell, TableBody, TextField, FormControl,
} from "@material-ui/core";

import MenuIcon from '@material-ui/icons/Menu';

import {withSnackbar} from "notistack";
import {connect} from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import CKEditor from "ckeditor4-react";
import {DELETE_MARKET_MAIL, GET_MAIL_MARKETS, SAVE_MAREKT_MAIL} from "./Queries";


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
            total: 0,
            newMailTemplate: "",
            newMailTitle: "",
            newMail: "",
            newMailDesc: "",
            modifyID: "",
        };

        this.showModal = this.showModal.bind(this);
        this.showModalEdit = this.showModalEdit.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.hideModalEdit = this.hideModalEdit.bind(this);

        this.getData = this.getData.bind(this);

        this.setNewMailTemplate = this.setNewMailTemplate.bind(this);
        this.setNewMailDesc = this.setNewMailDesc.bind(this);
        this.setNewMail = this.setNewMail.bind(this);
        this.setNewMailTitle = this.setNewMailTitle.bind(this);
        this.saveNewMail = this.saveNewMail.bind(this);
        this.editMail = this.editMail.bind(this);
        this.deleteMailReq = this.deleteMailReq.bind(this);

    }

    async componentDidMount() {

        await this.getData();


    }

    async getData() {


        await this.props.apolloClient.httpClient
            .query({
                query: GET_MAIL_MARKETS,
                variables: {
                    "search": {},
                    "page": {
                        "limit": 100,
                        "pageNumber": 1,
                        "orderBy": "createdDate",
                        "type": "DESC"
                    }
                },
            })
            .then((result) => {


                this.setState({
                    mailList: result.data.getMailMarkets.list,
                    total: result.data.getMailMarkets.totalElements
                })


            });
    }

    showModal() {
        this.setState({
            showModal: true
        })
    }

    showModalEdit() {
        this.setState({
            showModal: true
        })
    }

    hideModalEdit() {
        this.setState({
            showModal: false
        })
    }

    hideModal() {
        this.setState({
            modifyID: "",
            newMailTemplate: "",
            newMailTitle: "",
            newMail: "",
            newMailDesc: "",
            showModal: false
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

    setNewMailTemplate(event) {
        this.setState({
            newMailTemplate: event.target.value
        })
    }

    editMail(mail) {

        this.setState({
            modifyID: mail.id,
            newMailTemplate: mail.marketTemplate,
            newMailTitle: mail.marketTitle,
            newMail: mail.marketEmail,
            newMailDesc: mail.marketDescription,
            showModal: true
        });
    }

    async saveNewMail() {
        await this.props.apolloClient.httpClient
            .mutate({
                mutation: SAVE_MAREKT_MAIL,
                variables: {
                    "mailreq": {
                        "id": this.state.modifyID ? this.state.modifyID : "",
                        "marketTemplate": this.state.newMailTemplate,
                        "marketTitle": this.state.newMailTitle,
                        "marketEmail": this.state.newMail,
                        "marketDescription": this.state.newMailDesc
                    }
                },
            })
            .then((result) => {
                if (result.data.saveMailMarket.statusCode === 200) {
                    this.props.enqueueSnackbar("Successfully saved.", {variant: "success"});
                    this.setState({
                        modifyID: "",
                        newMailTemplate: "",
                        newMailTitle: "",
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
                mutation: DELETE_MARKET_MAIL,
                variables: {
                    "id": id
                },
            })
            .then((result) => {
                this.getData()
            })
            .catch((error) => {
                this.props.enqueueSnackbar("Sorry, there is an error occurred while saving data.", {variant: "error"});
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
                            menuName="List of marketing mail template"
                            title="List of marketing mail template"
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
                                    <h5>List of marketing mail template</h5>
                                </Grid>
                                {/*<a href="https://docs.google.com/presentation/d/1Cz7nUAh6Y8p_uTsrGNYENnU9KAFWmZw0/edit#slide=id.p55" target="_blank">PPT загвар (Хийсний дараа устгах)</a>*/}
                                <Grid item md={12} xs={12}>
                                    <Table aria-label="simple table" className="marketing_mail_template">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Number</TableCell>
                                                <TableCell>Registration date</TableCell>
                                                <TableCell>Title of mail template</TableCell>
                                                <TableCell>Title of mail</TableCell>
                                                <TableCell>Sender</TableCell>
                                                <TableCell>Management</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>


                                            {
                                                (this.state.mailList || []).map((mail, index) =>

                                                    <TableRow key={index}>
                                                        <TableCell>{index + 1}</TableCell>
                                                        <TableCell>{mail.createdDate}</TableCell>
                                                        <TableCell>{mail.marketTemplate}</TableCell>
                                                        <TableCell>{mail.marketTitle}</TableCell>
                                                        <TableCell>{mail.marketEmail}</TableCell>
                                                        <TableCell>
                                                            <Grid container spacing={2} className="align-items-center">
                                                                <div className="_center">
                                                                    <Button
                                                                        size="small"
                                                                        variant="contained"
                                                                        color="primary"
                                                                        onClick={() => this.editMail(mail)}
                                                                    >
                                                                        Modify
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
                                                                        onClick={() => this.deleteMailReq(mail.id)}
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
                                            <Grid item md={12} xs={12}>
                                                <h5 id="transition-modal-title">마케팅 메일 양식 편집</h5>

                                            </Grid>
                                            {/*<a href="https://docs.google.com/presentation/d/1Cz7nUAh6Y8p_uTsrGNYENnU9KAFWmZw0/edit#slide=id.p57" target="_blank">PPT загвар (Хийсний дараа устгах)</a>*/}
                                            <Grid item md={12} xs={12}>
                                                <Table aria-label="simple table" className="mail_table">
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell>마케팅 메일 양식 제목</TableCell>
                                                            <TableCell>
                                                                <TextField
                                                                    fullWidth
                                                                    id="name-basic"
                                                                    label=""
                                                                    size="small"
                                                                    variant="outlined"
                                                                    name="name"
                                                                    defaultValue={this.state.newMailTemplate}
                                                                    onChange={this.setNewMailTemplate}

                                                                />
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell>마케팅 메일 제목</TableCell>
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
                                                        onChange={({event, editor}) =>

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
