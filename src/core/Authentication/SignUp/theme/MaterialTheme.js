import React from "react";
import { Alert } from "@material-ui/lab";
import { Link as RouterLink } from "react-router-dom";
import validate from "validate.js";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import {
    Grid,
    Button,
    FormControl,
    TextField,
    Link,
    FormHelperText,
    Typography,
    Select,
    MenuItem,
} from "@material-ui/core";

import { connect } from "react-redux";
import {
    SAVE_SELLER,
    CHECK_MAIL,
    ACTIVATION,
} from "../../../../components/Seller/Queries";

const styles = (theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        height: "100%",
    },
    formControl: {
        paddingTop: 15,
        paddingRight: 5,
        minWidth: 140,
    },
    grid: {
        height: "100%",
    },
    quoteContainer: {
        [theme.breakpoints.down("md")]: {
            display: "none",
        },
    },
    quote: {
        backgroundColor: theme.palette.neutral,
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage:
            "url(" +
            process.env.REACT_APP_CDN_URL +
            "static/admin/img/auth.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
    },
    quoteInner: {
        textAlign: "center",
        flexBasis: "600px",
    },
    quoteText: {
        color: theme.palette.white,
        fontWeight: 300,
    },
    name: {
        marginTop: theme.spacing(3),
        color: theme.palette.white,
    },
    bio: {
        color: theme.palette.white,
    },
    contentContainer: {},
    content: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    logoImage: {
        marginLeft: theme.spacing(4),
    },
    contentBody: {
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        [theme.breakpoints.down("md")]: {
            justifyContent: "center",
        },
    },
    form: {
        paddingLeft: 100,
        paddingRight: 100,
        paddingBottom: 125,
        flexBasis: 700,
        [theme.breakpoints.down("sm")]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
        },
    },
    title: {
        marginTop: theme.spacing(3),
    },
    textField: {
        marginTop: theme.spacing(2),
    },
    policy: {
        marginTop: theme.spacing(1),
        display: "flex",
        alignItems: "center",
    },
    policyCheckbox: {
        marginLeft: "0px",
    },
    signUpButton: {
        margin: theme.spacing(2, 0),
    },
});

class SignUp extends React.Component {
    /**
     * @constructor
     */

    constructor(props) {
        super(props);

        // Default state
        this.state = {
            messageType: "",
            errors: {},
            isLoading: false,
        };

        // Events
        this.hasError = this.hasError.bind(this);
        this.onHandleSubmit = this.onHandleSubmit.bind(this);
    }

    /**
     * @override
     */
    async componentDidMount() {
        await this.props.apolloClient.httpClient
            .mutate({
                mutation: ACTIVATION,
                variables: {
                    token: this.props.token,
                },
            })
            .then((response) => {
                if (response.data.activation.statusCode === 200) {
                    this.setState({
                        activationAlert: "success",
                    });
                } else {
                    this.setState({
                        activationAlert: "error",
                    });
                }
            });
    }

    /**
     * @summary Check errors
     * @param {String} field
     */
    hasError(field) {
        return this.state.errors && this.state.errors[field] ? true : false;
    }

    validateEmail(email) {
        var re =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return re.test(email);
    }

    /**
     * @summary Check the email is duplicated
     */
    async onBlurEmail(e) {
        event.preventDefault();

        let email = e.target.value.replaceAll(/\s/g, "");
        if (this.validateEmail(email)) {
            // Mutate
            await this.props.apolloClient.httpClient
                .mutate({
                    mutation: CHECK_MAIL,
                    variables: {
                        email: email,
                    },
                })
                .then((result) => {
                    if (result.data.checkEmail === "NOTDUPLICATED") {
                        this.setState({
                            isValidEmail: true,
                            errors: Object.assign(this.state.errors, {
                                email: null,
                            }),
                        });
                    }

                    if (result.data.checkEmail === "DUPLICATED") {
                        this.setState({
                            isValidEmail: false,
                            errors: Object.assign(this.state.errors, {
                                email: [""],
                            }),
                        });
                    }
                })
                .catch((error) => {});
        } else {
            this.setState({
                errors: Object.assign(this.state.errors, {
                    // email: ["Please enter valid email address."],
                    email: ["????????? ???????????? ??????????????????."],
                }),
            });
        }
    }

    /**
     * @summary Validate data
     */
    onValidateSubmit(user) {
        const schema = {
            companyName: {
                presence: {
                    allowEmpty: false,
                    message: "^??????????????? ??????????????????.",
                },
                length: {
                    maximum: 64,
                },
            },
            password: {
                presence: {
                    allowEmpty: false,
                    message: "^??????????????? ??????????????????.",
                },
                length: {
                    maximum: 128,
                },
                format: {
                    pattern: "[A-Za-z0-9`~$&+,:;=?@#|'<>.^*()%!-/ ]+",
                    message: "^??????????????? ????????? ?????????????????????.",
                },
            },
            repeatPassword: {
                presence: {
                    allowEmpty: false,
                    message: "^??????????????? ??????????????????.",
                },
                equality: "password",
                length: {
                    maximum: 128,
                },
            },
            email: {
                presence: {
                    allowEmpty: false,
                    message: "^???????????? ??????????????????.",
                },
                email: true,
                length: {
                    maximum: 64,
                },
            },
            // postalCode: {
            //     presence: { allowEmpty: false, message: "is required" },
            //     length: {
            //         maximum: 64,
            //     },
            // },
            // address1: {
            //     presence: { allowEmpty: false, message: "is required" },
            // },
            agentNumber: {
                presence: {
                    allowEmpty: false,
                    message: "^?????? ??????????????? ??????????????????.",
                },
                length: {
                    maximum: 64,
                },
                format: {
                    pattern: "[0-9]+",
                    message: "^????????? ??????????????????.",
                },
            },
            phoneNumber: {
                presence: {
                    allowEmpty: false,
                    message: "^????????? ??????????????? ??????????????????.",
                },
                length: {
                    maximum: 64,
                },
                format: {
                    pattern: "[0-9]+",
                    message: "^????????? ??????????????????.",
                },
            },
            // bank: {
            //     presence: { allowEmpty: false, message: "is required" },
            // },
            // accountNumber: {
            //     presence: { allowEmpty: false, message: "is required" },
            //     length: {
            //         maximum: 20,
            //     },
            //     format: {
            //         pattern: "[0-9]+",
            //         message: "^Only allow numbers.",
            //     },
            // },
        };

        // Validate
        const errors = validate(user, schema);

        this.setState({
            errors: errors,
            // isLoading: false,
        });
        console.log(errors);
        if (errors) {
            this.setState({
                isLoading: false,
            });
        }
        return errors;
    }

    /**
     * @summary Handle submit form
     * @param {MouseEvent} event
     */
    async onHandleSubmit(event) {
        event.preventDefault();

        this.setState({
            isLoading: true,
        });

        // Form data
        const formData = new FormData(event.target);

        // Form data to object
        let user = {
            id: "",
            email: formData.get("email"),
            password: formData.get("password"),
            repeatPassword: formData.get("repeatPassword"),
            firstName: "",
            middleName: "",
            lastName: "",
            role: "ROLE_SELLER",
            birthday: "2021-01-01",
            gender: "",
            nation: "",
            nationCode: "",
            city: "",
            state: "",
            address1: formData.get("address1"),
            address2: formData.get("address2"),
            address3: "",
            postalCode: formData.get("postalCode"),
            phoneNumber: formData.get("phoneNumber"),
            status: "INACTIVE",
            referrerCode: null,
            allowMarketingMail: null,
            companyName: formData.get("companyName"),
            agentNumber: formData.get("agentNumber"),
            bank: formData.get("bank"),
            accountNumber: formData.get("accountNumber"),
            agentCertificate: "",
            agreement: "",
        };

        // Validate
        if (this.onValidateSubmit(user)) return;

        delete user.repeatPassword;

        // Mutate
        let promise = await new Promise((resolve) =>
            this.props.apolloClient.httpClient
                .mutate({
                    mutation: SAVE_SELLER,
                    variables: {
                        user: user,
                    },
                })
                .then((result) => {
                    if (
                        result &&
                        result.data &&
                        result.data.saveUser.statusCode === 200
                    ) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                })
                .catch((error) => {
                    resolve(false);
                })
        );

        if (promise) {
            this.setState({
                messageType: "success",
                isLoading: false,
            });
        } else {
            this.setState({
                messageType: "error",
                isLoading: false,
            });
        }
    }

    /**
     * Render form
     */
    renderForm() {
        const { classes } = this.props;

        return this.state.messageType === "success" ? (
            <form className={classes.form}>
                <Alert variant="outlined" severity="success">
                ???????????? ????????? ????????????! <br />
                    ?????? ????????? ????????? ????????????. ???????????? ????????? ????????? ??????
                    ????????? ???????????????. ?????? ??? ??????????????????.
                </Alert>
                <Link component={RouterLink} to="/signin">
                    <Button
                        className={classes.signUpButton}
                        color="primary"
                        fullWidth
                        size="large"
                        type="button"
                        variant="contained"
                    >
                        ?????????
                    </Button>
                </Link>
            </form>
        ) : (
            <form className={classes.form} onSubmit={this.onHandleSubmit}>
                {this.state.messageType === "error" ? (
                    <Alert variant="outlined" severity="error">
                        {/* Error occured. Please try again. */}
                        ????????? ?????????????????????. ????????? ?????? ??????????????????.
                    </Alert>
                ) : null}
                <Typography className={classes.title} variant="h2">
                    {/* Create new account */}
                    ????????????
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    {/* Use your email to create new account */}
                    ???????????? ???????????? ???????????? Partner ????????????
                </Typography>
                <TextField
                    className={classes.textField}
                    error={this.hasError("email")}
                    onBlur={this.onBlurEmail.bind(this)}
                    size="small"
                    fullWidth
                    helperText={
                        this.hasError("email")
                            ? this.state.errors.email[0]
                            : null
                    }
                    label="?????????"
                    name="email"
                    type="text"
                    variant="outlined"
                />
                <TextField
                    className={classes.textField}
                    error={this.hasError("password")}
                    size="small"
                    fullWidth
                    helperText={
                        this.hasError("password")
                            ? this.state.errors.password[0]
                            : null
                    }
                    label="????????????"
                    name="password"
                    type="password"
                    variant="outlined"
                />
                <TextField
                    className={classes.textField}
                    error={this.hasError("repeatPassword")}
                    size="small"
                    fullWidth
                    helperText={
                        this.hasError("repeatPassword")
                            ? this.state.errors.repeatPassword[0]
                            : null
                    }
                    label="???????????? ??????"
                    name="repeatPassword"
                    type="password"
                    variant="outlined"
                />
                <TextField
                    className={classes.textField}
                    error={this.hasError("companyName")}
                    size="small"
                    fullWidth
                    helperText={
                        this.hasError("companyName")
                            ? this.state.errors["companyName"][0]
                            : null
                    }
                    label="?????? ??????"
                    name="companyName"
                    type="text"
                    variant="outlined"
                />
                {/* <TextField
                    className={classes.textField}
                    error={this.hasError("postalCode")}
                    size="small"
                    fullWidth
                    helperText={
                        this.hasError("postalCode")
                            ? this.state.errors.postalCode[0]
                            : null
                    }
                    label="Zip code"
                    name="postalCode"
                    type="text"
                    variant="outlined"
                />
                <TextField
                    className={classes.textField}
                    error={this.hasError("address1")}
                    size="small"
                    fullWidth
                    helperText={
                        this.hasError("address1")
                            ? this.state.errors.address1[0]
                            : null
                    }
                    label="Address 1"
                    name="address1"
                    type="text"
                    variant="outlined"
                />
                <TextField
                    className={classes.textField}
                    error={this.hasError("address2")}
                    size="small"
                    fullWidth
                    helperText={
                        this.hasError("address2")
                            ? this.state.errors.address2[0]
                            : null
                    }
                    label="Address 2"
                    name="address2"
                    type="text"
                    variant="outlined"
                /> */}
                <TextField
                    className={classes.textField}
                    error={this.hasError("agentNumber")}
                    size="small"
                    fullWidth
                    helperText={
                        this.hasError("agentNumber")
                            ? this.state.errors.agentNumber[0]
                            : null
                    }
                    label="?????? ????????????"
                    name="agentNumber"
                    type="text"
                    variant="outlined"
                    placeholder="-?????? ??????????????????."
                />
                <TextField
                    className={classes.textField}
                    error={this.hasError("phoneNumber")}
                    size="small"
                    fullWidth
                    helperText={
                        this.hasError("phoneNumber")
                            ? this.state.errors.phoneNumber[0]
                            : null
                    }
                    label="????????? ????????????"
                    name="phoneNumber"
                    type="text"
                    variant="outlined"
                    placeholder="-?????? ??????????????????."
                />
                {/* <div className={classes.policy}>
                    <FormControl
                        className={classes.formControl}
                        size="small"
                        error={this.hasError("bank")}
                    >
                        <Select
                            variant="outlined"
                            name="bank"
                            defaultValue={null}
                        >
                            <MenuItem value={null}>
                                <em>Select bank</em>
                            </MenuItem>
                            <MenuItem value="KB Kookmin bank">
                                KB Kookmin bank
                            </MenuItem>
                            <MenuItem value="Shinhan bank">
                                Shinhan bank
                            </MenuItem>
                            <MenuItem value="Woori bank">Woori bank</MenuItem>
                            <MenuItem value="Hana bank">Hana bank</MenuItem>
                            <MenuItem value="Kbank">Kbank</MenuItem>
                            <MenuItem value="Kakao bank">Kakao bank</MenuItem>
                            <MenuItem value="KDB Korea Development bank">
                                KDB Korea Development bank
                            </MenuItem>
                            <MenuItem value="IBK Industrial bank of Korea">
                                IBK Industrial bank of Korea
                            </MenuItem>
                            <MenuItem value="NH NongHyup, Suhyeop">
                                NH NongHyup, Suhyeop
                            </MenuItem>
                            <MenuItem value="Daegu bank">Daegu bank</MenuItem>
                            <MenuItem value="Busan bank">Busan bank</MenuItem>
                            <MenuItem value="Kyungnam bank">
                                Kyungnam bank
                            </MenuItem>
                            <MenuItem value="Guangju bank">
                                Guangju bank
                            </MenuItem>
                            <MenuItem value="Jongbuk bank">
                                Jongbuk bank
                            </MenuItem>
                            <MenuItem value="Jeju bank, KFCC">
                                Jeju bank, KFCC
                            </MenuItem>
                            <MenuItem value="Shinhyeop">Shinhyeop</MenuItem>
                        </Select>
                        <FormHelperText>
                            {this.hasError("bank")
                                ? this.state.errors["bank"][0]
                                : null}
                        </FormHelperText>
                    </FormControl>
                    <TextField
                        className={classes.textField}
                        error={this.hasError("accountNumber")}
                        size="small"
                        fullWidth
                        helperText={
                            this.hasError("accountNumber")
                                ? this.state.errors.accountNumber[0]
                                : null
                        }
                        label="Account Number"
                        name="accountNumber"
                        type="text"
                        variant="outlined"
                    />
                </div> */}

                <Button
                    className={classes.signUpButton}
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    disabled={this.state.isLoading}
                >
                    ????????????
                </Button>
                <Typography color="textSecondary" variant="body1">
                    ?????? ???????????? ????????? ?????????????{" "}
                    <Link component={RouterLink} to="/signin" variant="h6">
                        ?????????
                    </Link>
                </Typography>
            </form>
        );
    }

    /**
     * Render activation alert
     */
    renderActivationAlert() {
        const { classes } = this.props;

        if (this.state.activationAlert === "success") {
            return (
                <form className={classes.form}>
                    <Alert variant="outlined" severity="success">
                        {/* Your account has been successfully activated. */}
                        ??????????????? ?????????????????????.
                    </Alert>
                    <Link component={RouterLink} to="/signin">
                        <Button
                            className={classes.signUpButton}
                            color="primary"
                            fullWidth
                            size="large"
                            type="button"
                            variant="contained"
                        >
                            ?????????
                        </Button>
                    </Link>
                </form>
            );
        } else if (this.state.activationAlert === "error") {
            return (
                <form className={classes.form}>
                    <Alert variant="outlined" severity="error">
                        {/* Sorry, activation failed. */}
                        ????????? ?????????????????????. ????????? ?????? ?????? ????????????.
                    </Alert>
                </form>
            );
        }
        return null;
    }

    /**
     * @override
     */
    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Grid className={classes.grid} container>
                    <Grid className={classes.quoteContainer} item lg={5}>
                        <div className={classes.quote}>
                            <div className={classes.quoteInner}>
                                <Typography
                                    className={classes.quoteText}
                                    variant="h1"
                                >
                                    ????????????
                                </Typography>
                            </div>
                        </div>
                    </Grid>
                    <Grid className={classes.content} item lg={7} xs={12}>
                        <div className={classes.content}>
                            <div className={classes.contentBody}>
                                {!this.props.token
                                    ? this.renderForm()
                                    : this.renderActivationAlert()}
                            </div>
                        </div>
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

SignUp.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps, null)(SignUp));
