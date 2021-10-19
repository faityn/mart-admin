import React from "react";


import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {
    Grid,
Radio,
    Button,
    Divider,
    Table,
    TableBody,
    TableRow,
    TableCell,
    FormControlLabel,
    Checkbox,
    TextField,
    FormControl,
    InputLabel,
    Select, MenuItem,
} from "@material-ui/core";

import MenuIcon from '@material-ui/icons/Menu';

import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import CKEditor from "ckeditor4-react";
import SaveIcon from "@material-ui/icons/Save";
import { GET_MAIL_MARKETS, SAVE_MARKET_MAIL_REQ} from "../Queries";



class SendMail extends React.Component {
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

            mails:[],
            "recipientType": "",
            "sender": "",
            "receiver": "",
            "mailType": "O",
            "mailMarketId": "",
            "marketTitle": "",
            "marketDescription": ""
        };

        this.setValue = this.setValue.bind(this)
        this.sendEMail = this.sendEMail.bind(this)

    }
    componentDidUpdate(prevProps, prevState, snapshot) {

        if(this.props.selectedSender != prevProps.selectedSender){
            this.setState({
                receiver:this.props.selectedSender
            })
        }
    }

    async sendEMail(){


        let data =  {
            "id": "",
            "recipientType": this.state.recipientType,
            "sender": this.state.sender,
            "receiver": this.state.receiver,
            "mailType": this.state.mailType,
            "mailMarketId": this.state.mailMarketId,
            "marketTitle": this.state.marketTitle,
            "marketDescription": this.state.marketDescription
        }


        if(data.recipientType == "" || data.sender == "" || data.receiver == "" || data.mailType == "" || data.mailMarketId == "" ||  data.marketTitle == "" ||  data.marketDescription == ""){
            this.props.enqueueSnackbar("Pleas fill form fields", {variant: "error"});
            return
        } else {
            await this.props.apolloClient.httpClient
                .mutate({
                    mutation: SAVE_MARKET_MAIL_REQ,
                    variables: {
                        "mailmarketreq": data
                    },
                })
                .then((result) => {
                    if (result.data.saveMailMarketReq.statusCode === 200) {
                        this.props.enqueueSnackbar("Successfully saved.", {variant: "success"});
                        this.props.hideModal();
                    } else {
                        this.props.enqueueSnackbar("Sorry, there is an error occurred while saving data.", {variant: "error"});
                    }
                })
                .catch((error) => {

                    this.props.enqueueSnackbar("Sorry, there is an error occurred while saving data.", {variant: "error"});
                });
            // this.props.hideModal();
        }


    }
    async componentDidMount() {

        await this.getData();


    }


    async getData() {



        await this.props.apolloClient.httpClient
            .query({
                query: GET_MAIL_MARKETS,
                variables: {
                    "search": {

                    },
                    "page": {
                        "limit": 300,
                        "pageNumber": 1,
                        "orderBy": "createdDate",
                        "type": "DESC"
                    }
                },
            })
            .then((result) => {

                this.setState({
                    mails: result.data.getMailMarkets.list,
                });
            });
    }
    setValue(value, key){

        if(key == "recipientType"){
            this.setState({
                recipientType:value
            })
        }
        if(key == "sender"){
            this.setState({
                sender:value
            })
        }
        if(key == "mailMarketId"){
            this.setState({
                mailMarketId:value
            })
        }
        if(key == "receiver"){
            this.setState({
                receiver:value
            })
        }
        if(key == "mailType"){
            this.setState({
                mailType:value
            })
        }
        if(key == "marketTitle"){
            this.setState({
                marketTitle:value
            })
        }
        if(key == "marketDescription"){
            this.setState({
                marketDescription:value
            })
        }

    }


    /**
     * @override
     */
    render() {
        return (
            <div style={{
                backgroundColor: "#fff",
                border: '2px solid #000',
                padding: "20px",
            }}>
                <Grid container spacing={2} className="align-items-center">
                    <Grid item md={12} xs={12}>
                        <h2 id="transition-modal-title">마케팅 메일 전송</h2>

                    </Grid>
                    <a href="https://docs.google.com/presentation/d/1Cz7nUAh6Y8p_uTsrGNYENnU9KAFWmZw0/edit#slide=id.p59" target="_blank">PPT загвар (Хийсний дараа устгах)</a>
                    <Grid item md={12} xs={12}>

                        <Table aria-label="simple table" className="mail_table">
                            <TableBody>
                                <TableRow>
                                    <TableCell >수신자 구분</TableCell>
                                    <TableCell>
                                        <Grid container spacing={1} className="align-items-center">
                                            {this.props.roles.map((role, index)=>
                                                <Grid item md={2} xs={3} key={index} className="align-items-right">
                                                    <FormControlLabel
                                                        control={
                                                            <Radio name="role"   checked={this.state.recipientType === role.name} onChange={()=>this.setValue(role.name, "recipientType")} />
                                                        }
                                                        label={role.name}
                                                    />
                                                </Grid>
                                            )}
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell >보내는 사람</TableCell>
                                    <TableCell >
                                        <Grid container spacing={1} className="align-items-center">
                                            <Grid item md={4} xs={12}>
                                                <Grid container spacing={1} className="align-items-center">
                                                    <Grid item md={3} xs={12}>
                                                        <h5>이름</h5>
                                                    </Grid>
                                                    <Grid item md={9} xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            id="name-basic"
                                                            label=""
                                                            size="small"
                                                            variant="outlined"
                                                            name="name"
                                                            onChange={(e)=>this.setValue(e.target.value, "sender")}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item md={4} xs={12}>
                                                <Grid container spacing={1} className="align-items-center">
                                                    <Grid item md={4} xs={12}>
                                                        <h5>이메일주소</h5>
                                                    </Grid>
                                                    <Grid item md={8} xs={12}>
                                                        <FormControl size="small" fullWidth variant="outlined">
                                                            <InputLabel id="demo-simple-select-outlined-label">발신전용</InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-outlined-label"
                                                                id="demo-simple-select-outlined"
                                                                label="발신전용"
                                                                defaultValue="O"
                                                                onChange={(e) => this.setValue(e.target.value, "mailType")}
                                                            >
                                                                <MenuItem value="O">
                                                                    <em>일반</em>
                                                                </MenuItem>
                                                                <MenuItem value="Y">
                                                                    <em>발신 전용</em>
                                                                </MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                        </Grid>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell >받는 사람 ID</TableCell>
                                    <TableCell >
                                        <Grid container spacing={1} className="align-items-center">
                                            <Grid item md={4} xs={4}>
                                                <TextField
                                                    fullWidth
                                                    id="name-basic"
                                                    label=""
                                                    size="small"
                                                    variant="outlined"
                                                    name="name"
                                                    defaultValue={this.state.receiver}
                                                    value={this.state.receiver}
                                                    onChange={(e)=>this.setValue(e.target.value, "receiver")}
                                                />
                                            </Grid>
                                            <Grid item md={8} xs={8}>
                                                <Button
                                                    variant="contained"
                                                    size="large"
                                                    color="primary"
                                                    // startIcon={<SaveIcon color="white" size="1rem" />}
                                                    onClick={this.props.showModalUser}
                                                >회원찾기
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell >제목</TableCell>
                                    <TableCell >
                                        <Grid container spacing={1} className="align-items-center">
                                            <Grid item md={12} xs={12}>
                                                <TextField
                                                    fullWidth
                                                    id="name-basic"
                                                    label=""
                                                    size="small"
                                                    variant="outlined"
                                                    name="name"
                                                    onChange={(e)=>this.setValue(e.target.value, "marketTitle")}
                                                />
                                            </Grid>
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell >메일양식 선택</TableCell>
                                    <TableCell >
                                        <Grid container spacing={1} className="align-items-center">
                                            <Grid item md={4} xs={12}>
                                                <FormControl size="small" fullWidth variant="outlined">
                                                    {/*<InputLabel id="demo-simple-select-outlined-label">발신전용</InputLabel>*/}
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="demo-simple-select-outlined"
                                                        label="발신전용"
                                                        onChange={(e)=>this.setValue(e.target.value, "mailMarketId")}
                                                    >
                                                        {
                                                            (this.state.mails || []).map((mail, index) =>

                                                                <MenuItem key={index}
                                                                          value={mail.id}>{mail.marketTitle}</MenuItem>
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
                <Grid container spacing={2} className="desc">
                    <Grid item md={12} xs={12}>
                        <FormControl fullWidth>
                            <CKEditor
                                type="classic"
                                name="description"
                                data={this.state.marketDescription}
                                onChange={({event, editor}) =>
                                    this.setValue(editor.getData(), "marketDescription")
                                }
                            />
                        </FormControl>
                    </Grid>
                </Grid>

                <div className="center">
                    <Button
                        variant="contained"
                        size="small"
                        color="primary"
                        startIcon={<SaveIcon color="white" size="1rem" />}
                        onClick={this.sendEMail}
                    >
                        발송
                    </Button>
                </div>

                {/*<Button*/}
                {/*    size="small"*/}
                {/*    variant="contained"*/}
                {/*    color="primary"*/}
                {/*    onClick={}*/}
                {/*    startIcon={<AddIcon fontSize="small" className="mr-10" />}*/}
                {/*> User ID search*/}
                {/*</Button>*/}
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

export default withSnackbar(connect(mapStateToProps, null)(SendMail));