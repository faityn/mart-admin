import React from "react";
import PageTitle from "../../../core/common/Partials/PageTitle";
import {
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Divider, Table, TableBody, TableRow, TableCell, TextField, Checkbox, RadioGroup, FormControlLabel, Radio,
} from "@material-ui/core";

import MenuIcon from '@material-ui/icons/Menu';

import {withSnackbar} from "notistack";
import {connect} from "react-redux";
import SaveIcon from "@material-ui/icons/Save";
import {GET_MAIL_CONF, SAVE_MAIL_CONFIG, GET_MAIL_REQ_BY_TYPE} from "./Queries";


class AutoMailSetting extends React.Component {
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
            mailConfig: {
                id:"",
                dormantMailId: "",
                dormantUseYn: true,
                levelMailId: "",
                levelUseYn: true,
                notifyMailId: "",
                notifyUseYn: true,
                purchaseMailId: "",
                purchaseUseYn: true,
                registerMailId: "",
                registerUseYn: true,
                shipmentMailId: "",
                shipmentUseYn: true,
                withdrawMailId: "",
                withdrawUseYn: true
            },
            mailList: [],
            mailTypes: [
                {
                    title: "Registration",
                    type: "register",
                },
                {
                    title: "Level-Up",
                    type: "level",
                },
                {
                    title: "Pre-Dormancy Notification",
                    type: "notify",
                },
                {
                    title: "Dormant Account Letters",
                    type: "dorman",
                },

                {
                    title: "Order Notification",
                    type: "purchase",
                },
                {
                    title: "Notification of Withdrawal from SAZAXA Membership",
                    type: "withdraw",
                },
                {
                    title: "Shipment Notification",
                    type: "shipment",
                },
            ],
            loading:true
        };

        this.getData = this.getData.bind(this);
        this.getUse = this.getUse.bind(this);
        this.getMailID = this.getMailID.bind(this);
        this.setUse = this.setUse.bind(this);
        this.setMail = this.setMail.bind(this);
        this.saveConfig = this.saveConfig.bind(this);
    }

    getUse(mailType) {

        if (mailType == "register") {
            return this.state.mailConfig.registerUseYn
        } else if (mailType == "level") {
            return this.state.mailConfig.levelUseYn
        } else if (mailType == "notify") {
            return this.state.mailConfig.notifyUseYn
        } else if (mailType == "dorman") {
            return this.state.mailConfig.dormantUseYn
        } else if (mailType == "purchase") {
            return this.state.mailConfig.purchaseUseYn
        } else if (mailType == "withdraw") {
            return this.state.mailConfig.withdrawUseYn
        } else if (mailType == "shipment") {
            return this.state.mailConfig.shipmentUseYn
        }
        return false
    }

    getMailID(mailType) {

        if (mailType == "register") {
            return this.state.mailConfig.registerMailId
        } else if (mailType == "level") {
            return this.state.mailConfig.levelMailId
        } else if (mailType == "notify") {
            return this.state.mailConfig.notifyMailId
        } else if (mailType == "dorman") {
            return this.state.mailConfig.dormantMailId
        } else if (mailType == "purchase") {
            return this.state.mailConfig.purchaseMailId
        } else if (mailType == "withdraw") {
            return this.state.mailConfig.withdrawMailId
        } else if (mailType == "shipment") {
            return this.state.mailConfig.shipmentMailId
        }
        return false
    }

    setUse(event, value, mailType) {

        if (mailType == "register") {
            this.setState({
                mailConfig: {
                    ...this.state.mailConfig,
                    registerUseYn: value == "yes"
                }
            })
        } else if (mailType == "level") {
            this.setState({
                mailConfig: {
                    ...this.state.mailConfig,
                    levelUseYn: value == "yes"
                }
            })
        } else if (mailType == "notify") {
            this.setState({
                mailConfig: {
                    ...this.state.mailConfig,
                    notifyUseYn: value == "yes"
                }
            })
        } else if (mailType == "dorman") {
            this.setState({
                mailConfig: {
                    ...this.state.mailConfig,
                    dormantUseYn: value == "yes"
                }
            })
        } else if (mailType == "purchase") {
            this.setState({
                mailConfig: {
                    ...this.state.mailConfig,
                    purchaseUseYn: value == "yes"
                }
            })
        } else if (mailType == "withdraw") {
            this.setState({
                mailConfig: {
                    ...this.state.mailConfig,
                    withdrawUseYn: value == "yes"
                }
            })
        } else if (mailType == "shipment") {
            this.setState({
                mailConfig: {
                    ...this.state.mailConfig,
                    shipmentUseYn: value == "yes"
                }
            })
        }
    }

    setMail(event, mailType) {
        if (mailType == "register") {
            this.setState({
                mailConfig: {
                    ...this.state.mailConfig,
                    registerMailId: event.target.value
                }
            })
        } else if (mailType == "level") {
            this.setState({
                mailConfig: {
                    ...this.state.mailConfig,
                    levelMailId: event.target.value
                }
            })
        } else if (mailType == "notify") {
            this.setState({
                mailConfig: {
                    ...this.state.mailConfig,
                    notifyMailId: event.target.value
                }
            })
        } else if (mailType == "dorman") {
            this.setState({
                mailConfig: {
                    ...this.state.mailConfig,
                    dormantMailId: event.target.value
                }
            })
        } else if (mailType == "purchase") {
            this.setState({
                mailConfig: {
                    ...this.state.mailConfig,
                    purchaseMailId: event.target.value
                }
            })
        } else if (mailType == "withdraw") {
            this.setState({
                mailConfig: {
                    ...this.state.mailConfig,
                    withdrawMailId: event.target.value
                }
            })
        } else if (mailType == "shipment") {
            this.setState({
                mailConfig: {
                    ...this.state.mailConfig,
                    shipmentMailId: event.target.value
                }
            })
        }
    }

    async getData() {

        await this.props.apolloClient.httpClient
            .query({
                query: GET_MAIL_CONF,
                variables: {
                    id: "",
                },
            })
            .then((result) => {

                console.log(result.data.getMailConf)

                this.setState({
                    mailConfig: {
                        ...result.data.getMailConf
                    }
                });

            });

        // await this.props.apolloClient.httpClient
        //     .query({
        //         query: GET_MAIL_REQS,
        //         variables: {
        //             "search": {
        //                 "title": "",
        //                 "mailType": ""
        //             },
        //             "page": {
        //                 "limit": 3000,
        //                 "pageNumber": 1,
        //                 "orderBy": "createdDate",
        //                 "type": "DESC"
        //             }
        //         },
        //     })
        //     .then((result) => {
        //
        //         this.setState({
        //             mailList: result.data.getMailReqs.list,
        //             loading: false,
        //         })
        //
        //
        //     });

        await this.props.apolloClient.httpClient
            .query({
                query: GET_MAIL_REQ_BY_TYPE,
                variables: {
                    "mailType": "",
                    "mailEmail": "",
                    "startDate": "",
                    "endDate": ""
                },
            })
            .then((result) => {

                console.log(result.data)
                this.setState({
                    mailList: result.data.getMailReqByMailType,
                    loading: false,
                })


            });

    }

    async saveConfig() {
        await this.props.apolloClient.httpClient
            .mutate({
                mutation: SAVE_MAIL_CONFIG,
                variables: {
                    mailconf: {
                        "id": this.state.mailConfig.id,
                        "registerUseYn": this.state.mailConfig.registerUseYn,
                        "registerMailId": this.state.mailConfig.registerMailId,
                        "levelUseYn": this.state.mailConfig.levelUseYn,
                        "levelMailId": this.state.mailConfig.levelMailId,
                        "notifyUseYn": this.state.mailConfig.notifyUseYn,
                        "notifyMailId": this.state.mailConfig.notifyMailId,
                        "dormantUseYn": this.state.mailConfig.dormantUseYn,
                        "dormantMailId": this.state.mailConfig.dormantMailId,
                        "purchaseUseYn": this.state.mailConfig.purchaseUseYn,
                        "purchaseMailId": this.state.mailConfig.purchaseMailId,
                        "shipmentUseYn": this.state.mailConfig.shipmentUseYn,
                        "shipmentMailId": this.state.mailConfig.shipmentMailId,
                        "withdrawUseYn": this.state.mailConfig.withdrawUseYn,
                        "withdrawMailId": this.state.mailConfig.withdrawMailId
                    },
                },
            })
            .then((result) => {
                if (result.data.saveMailConf.statusCode === 200) {
                    this.props.enqueueSnackbar("Mail config successfully updated.", {variant: "success"});
                } else {
                    this.props.enqueueSnackbar("Sorry, there is an error occurred while saving data.", {variant: "error"});
                }
            })
            .catch((error) => {
                this.props.enqueueSnackbar("Sorry, there is an error occurred while saving data.", {variant: "error"});
            });
    }

    async componentDidMount() {

        await this.getData();

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
                            menuName="Mail Setting"
                            title="Mail Setting"
                            icon={<MenuIcon/>}
                        />
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item md={8}>
                        <div className="card mt-20">
                            {/* Mail title */}
                            {/*<Grid container spacing={2} className="align-items-center">*/}
                            {/*    <Grid item md={4} xs={12}>*/}
                            {/*        <h5>Mail title</h5>*/}
                            {/*    </Grid>*/}
                            {/*    <Grid item md={8} xs={12}>*/}
                            {/*        <FormControl size="small" fullWidth variant="outlined">*/}
                            {/*            <InputLabel id="demo-simple-select-outlined-label">*/}
                            {/*                Mail templates*/}
                            {/*            </InputLabel>*/}
                            {/*            <Select*/}
                            {/*                labelId="demo-simple-select-outlined-label"*/}
                            {/*                id="demo-simple-select-outlined"*/}
                            {/*                label="Mail templates"*/}
                            {/*                name="mail-templates"*/}
                            {/*                onChange={undefined}*/}
                            {/*                value={undefined}*/}
                            {/*            >*/}
                            {/*                <MenuItem value="">*/}
                            {/*                    <em>None</em>*/}
                            {/*                </MenuItem>*/}

                            {/*            </Select>*/}
                            {/*        </FormControl>*/}
                            {/*    </Grid>*/}

                            {/*</Grid>*/}

                            {/*<a href="https://docs.google.com/presentation/d/16IZEAtu7MamV_I6WBt5YQ7xa1taO8oMs/edit#slide=id.p67" target="_blank">PPT загвар (Хийсний дараа устгах)</a>*/}

                            {/*<Divider className="mt-20" />*/}

                            <Grid container spacing={2} className="align-items-center">
                                <Grid item md={12} xs={12}>
                                    <h5>Mail Setting</h5>
                                </Grid>
                                <Grid item xs={12}>
                                    {!this.state.loading ?  <Table aria-label="simple table" className="mail_table">
                                        <TableBody>
                                            {
                                                this.state.mailTypes.map((mailType, typeIndex) =>
                                                    <TableRow key={typeIndex}>
                                                        <TableCell>{mailType.title}</TableCell>
                                                        <TableCell>
                                                            <Grid container spacing={1} className="align-items-center">
                                                                <Grid item md={3} xs={12}>
                                                                    <RadioGroup
                                                                        aria-label={mailType.type}
                                                                        name="page"
                                                                        defaultValue={
                                                                            this.getUse(mailType.type) ? "yes" : "no"
                                                                        }
                                                                        onChange={(e, value) => this.setUse(e, value, mailType.type)}
                                                                    >
                                                                        <FormControlLabel
                                                                            value="yes"
                                                                            control={<Radio/>}
                                                                            label="Send"
                                                                        />
                                                                        <FormControlLabel
                                                                            value="no"
                                                                            control={<Radio/>}
                                                                            label="Not send"
                                                                        />
                                                                    </RadioGroup>
                                                                </Grid>
                                                                <Grid item md={9} xs={12} className="align-items-right">
                                                                    <FormControl size="small" fullWidth
                                                                                 variant="outlined">
                                                                        {/*<InputLabel id="demo-simple-select-outlined-label">발신전용</InputLabel>*/}
                                                                        <Select
                                                                            labelId="demo-simple-select-outlined-label"
                                                                            id="demo-simple-select-outlined"
                                                                            label="발신전용"
                                                                            defaultValue={this.getMailID(mailType.type)}
                                                                            onChange={(e) => this.setMail(e, mailType.type)}
                                                                        >

                                                                            {
                                                                                (this.state.mailList || []).map((mail, index) =>

                                                                                    <MenuItem key={index}
                                                                                              value={mail.id}>{mail.mailTitle}</MenuItem>
                                                                                )
                                                                            }
                                                                        </Select>
                                                                    </FormControl>
                                                                </Grid>
                                                            </Grid>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            }
                                        </TableBody>
                                    </Table> : null}
                                </Grid>


                            </Grid>
                            <div className="but-right">
                                <Button
                                    size="small"
                                    variant="contained"
                                    color="primary"
                                    startIcon={<SaveIcon fontSize="small" className="mr-10"/>}
                                    onClick={this.saveConfig}
                                >
                                    Save
                                </Button>
                            </div>
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

export default withSnackbar(connect(mapStateToProps, null)(AutoMailSetting));
