import React from "react";

import PageTitle from "../../../core/common/Partials/PageTitle";

import PersonIcon from "@material-ui/icons/Person";
import SaveIcon from "@material-ui/icons/Save";
import BackupIcon from "@material-ui/icons/Backup";
import GetAppIcon from "@material-ui/icons/GetApp";
import { DropzoneArea } from "material-ui-dropzone";
import {
    Grid,
    Button,
    TextField,
    FormControl,
    Select,
    MenuItem,
    CircularProgress,
    Divider,
} from "@material-ui/core";
import { connect } from "react-redux";
import { setLoggedUser } from "../../../core/redux/Redux";
import { withSnackbar } from "notistack";
import validate from "validate.js";
import { GET_SELLER, SAVE_SELLER, UPLOAD_CERTIFICATE } from "../Queries";
import { Link } from "react-router-dom";

/**
 * @summary Seller Info
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Settings
 */
class PersonalInfo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            certificate: null,
            draft: "",
            processing: "",
            alert: {},
        };

        // Event
        this.hasError = this.hasError.bind(this);

        this._isMounted = false;
    }

    /**
     * @override
     */
    async componentDidMount() {
        this._isMounted = true;

        await this.props.apolloClient.httpClient
            .query({
                query: GET_SELLER,
            })
            .then((result) => {
                this.setState({
                    user: result.data.userLogged,
                    certificate: result.data.userLogged.agentCertificate,
                    business: result.data.userLogged.businessCopy,
                    passbook: result.data.userLogged.passbookCopy,
                });
            })
            .catch((error) => {
                this.props.enqueueSnackbar(
                    "Sorry, there is an error occurred while fetching data.",
                    { variant: "error" }
                );
            });
    }

    /**
     * @summary Check errors
     * @param {String} field
     */
    hasError(field) {
        return this.state.errors && this.state.errors[field] ? true : false;
    }

    /**
     * @summary Validate user
     * @param {Object} user
     */
    onValidateSubmit(user) {
        const schema = {
            password: {
                length: {
                    minimum: 8,
                    maximum: 20,
                    message: "^Password length should be 8-20 characters.",
                },
                format: {
                    pattern: "[A-Za-z0-9`~$&+,:;=?@#|'<>.^*()%!-/ ]+",
                    message: "^Should be alphanumeric only.",
                },
            },
            repeatPassword: {
                length: {
                    minimum: 8,
                    maximum: 20,
                    message: "^Password length should be 8-20 characters.",
                },
                format: {
                    pattern: "[A-Za-z0-9`~$&+,:;=?@#|'<>.^*()%!-/ ]+",
                    message: "^Should be alphanumeric only.",
                },
            },
            // firstName: {
            //     presence: {
            //         allowEmpty: false,
            //         message: "^Firstname field is required.",
            //     },
            //     length: {
            //         maximum: 64,
            //         message: "^Maximum length should be 64.",
            //     },
            //     format: {
            //         pattern: "[A-Za-z0-9]+",
            //         message: "^Only allow English characters for text input.",
            //     },
            // },
            // lastName: {
            //     presence: {
            //         allowEmpty: false,
            //         message: "^Lastname field is required.",
            //     },
            //     length: {
            //         maximum: 64,
            //         message: "^Maximum length should be 64.",
            //     },
            //     format: {
            //         pattern: "[A-Za-z0-9]+",
            //         message: "^Only allow English characters for text input.",
            //     },
            // },
            phoneNumber: {
                presence: {
                    allowEmpty: false,
                    message: "^Phone number field is required.",
                },
                length: {
                    maximum: 20,
                    message: "^Maximum length should be 20.",
                },
                format: {
                    pattern: "[0-9]+",
                    message: "^Only allow numbers for this input.",
                },
            },
            // email: {
            //   presence: { allowEmpty: false, message: "is required" },
            //   email: true,
            //   length: {
            //     maximum: 64,
            //   },
            // },
            postalCode: {
                presence: { allowEmpty: false, message: "is required" },
                length: {
                    maximum: 64,
                },
            },
            address1: {
                presence: { allowEmpty: false, message: "is required" },
            },
            // agentNumber: {
            //   presence: { allowEmpty: false, message: "is required" },
            //   length: {
            //     maximum: 64,
            //   },
            //   format: {
            //     pattern: "[0-9]+",
            //     message: '^Only allow numbers.'
            //   },
            // },
            accountNumber: {
                presence: { allowEmpty: false, message: "is required" },
                length: {
                    maximum: 20,
                },
                format: {
                    pattern: "[0-9]+",
                    message: "^Only allow numbers.",
                },
            },
            companyName: {
                presence: { allowEmpty: false, message: "is required" },
                length: {
                    maximum: 64,
                },
            },
        };

        // Validate
        const errors = validate(user, schema);

        this.setState({
            errors: errors,
        });

        return errors;
    }

    /**
     * @summary Handle submit form
     * @param {MouseEvent} event
     */
    async onHandleSubmit(event) {
        event.preventDefault();

        // Form data
        const formData = new FormData(event.target);

        // Form data to object
        let loggedUser = this.state.user;
        let user = {
            id: formData.get("id"),
            firstName: formData.get("firstName"),
            middleName: formData.get("middleName")
                ? formData.get("middleName")
                : null,
            lastName: formData.get("lastName"),
            role: "ROLE_SELLER",
            oldPassword: formData.get("oldPassword")
                ? formData.get("oldPassword")
                : null,
            password: formData.get("password")
                ? formData.get("password")
                : null,
            repeatPassword: formData.get("repeatPassword")
                ? formData.get("repeatPassword")
                : null,
            phoneNumber: formData.get("phoneNumber")
                ? formData.get("phoneNumber")
                : null,
            birthday: formData.get("birthday")
                ? formData.get("birthday")
                : null,
            gender: formData.get("gender") ? formData.get("gender") : null,
            nation: formData.get("nation") ? formData.get("nation") : null,
            agentCertificate: this.state.certificate,
            businessCopy: this.state.business,
            passbookCopy: this.state.passbook,
            // email: formData.get("email") ? formData.get("email") : null,
            address1: formData.get("address1"),
            address2: formData.get("address2"),
            address3: formData.get("address3"),
            postalCode: formData.get("postalCode"),
            companyName: formData.get("companyName"),
            // agentNumber: formData.get("agentNumber"),
            bank: formData.get("bank"),
            accountNumber: formData.get("accountNumber"),
            // "referrerCode": formData.get('referrerCode') ? formData.get('referrerCode') : null
        };

        // Validate
        if (this.onValidateSubmit(user)) return;

        if (user.oldPassword && user.password === null) {
            this.setState({
                errors: {
                    oldPassword: ["You need to fill new password"],
                    password: true,
                    repeatPassword: true,
                },
            });

            return;
        }

        if (user.password !== user.repeatPassword) {
            this.setState({
                errors: {
                    repeatPassword: [
                        "Password and confirm password does not match",
                    ],
                },
            });

            return;
        }

        if (user.password === null && user.oldPassword === null) {
            delete user.password;
            delete user.oldPassword;
        }

        delete user.repeatPassword;

        // Process
        this.setState({
            processing: "submit",
        });

        // Mutate
        await this.props.apolloClient.httpClient
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
                    // Form data to state
                    // loggedUser.firstName = user.firstName;
                    // loggedUser.middleName = user.middleName;
                    // loggedUser.lastName = user.lastName;
                    // loggedUser.gender = user.gender;
                    // loggedUser.nation = user.nation;

                    // this.props.setLoggedUser(JSON.parse(loggedUser));
                    // localStorage.setItem(
                    //   process.env.REACT_LOGGED_USER,
                    //   JSON.stringify(loggedUser)
                    // );

                    this.props.enqueueSnackbar("Sucessfully updated.", {
                        variant: "success",
                    });
                }
                if (result.data.saveUser.data === "NOTMATCH") {
                    this.props.enqueueSnackbar(
                        "Your old password doesnt match.",
                        {
                            variant: "error",
                        }
                    );
                }
            })
            .catch((error) => {
                this.props.enqueueSnackbar("Error occured!", {
                    variant: "error",
                });
            });

        this.setState({
            user: loggedUser,
            processing: "",
        });
    }

    /**
     * @summary Download
     */
    async onDownload() {
        if (this.state.processing === "download") return;

        this.setState({
            processing: "download",
        });

        const url = process.env.REACT_APP_DOMAIN + "/download/deliverConfig";

        // await axios({
        //   headers: {
        //     authorization: this.token ? `Bearer ${this.token}` : "",
        //   },
        //   method: "GET",
        //   url: url,
        //   responseType: "arraybuffer",
        // })
        //   .then((response) => {
        //     fileDownload(response.data, "DeliveryStatus.xlsx");
        //   })
        //   .catch((error) => {
        //     this._isMounted &&
        //       this.props.enqueueSnackbar(
        //         "Sorry, there is an error occurred while downloading.",
        //         { variant: "error" }
        //       );
        //   });

        this._isMounted &&
            this.setState({
                processing: "",
            });
    }

    /**
     * @summary Upload files
     * @param {!Array<Object>} files
     */
    async onDropFile(files, type) {
        let promises = await files.reduce(
            (accumulatorPromise, file) =>
                accumulatorPromise.then(
                    (prevResolve) =>
                        new Promise((resolve) => {
                            this.props.apolloClient.uploadClient
                                .mutate({
                                    mutation: UPLOAD_CERTIFICATE,
                                    variables: { file },
                                })
                                .then((result) => {
                                    if (
                                        result.data.uploadAgentCertificate
                                            .statusCode === 200
                                    ) {
                                        switch (type) {
                                            case "certificate":
                                                this.setState({
                                                    certificate:
                                                        result.data
                                                            .uploadAgentCertificate
                                                            .data,
                                                });
                                                break;
                                            case "business":
                                                this.setState({
                                                    business:
                                                        result.data
                                                            .uploadAgentCertificate
                                                            .data,
                                                });
                                                break;
                                            case "passbook":
                                                this.setState({
                                                    passbook:
                                                        result.data
                                                            .uploadAgentCertificate
                                                            .data,
                                                });
                                                break;
                                        }

                                        resolve([...prevResolve, ...[true]]);
                                    } else {
                                        resolve([...prevResolve, ...[false]]);
                                    }
                                })
                                .catch((error) => {
                                    resolve([...prevResolve, ...[false]]);
                                });
                        })
                ),
            Promise.resolve([])
        );

        let message = !promises.find((f) => f === false)
            ? "The uploading process has been completed successfully."
            : "The uploading process has been completed with errors.";
        let variant = !promises.find((f) => f === false)
            ? "success"
            : "warning";

        this.props.enqueueSnackbar(message, { variant: variant });
    }

    /**
     * @override
     */
    render() {
        if (!this.state.user) return "";

        let data = this.state.user ? this.state.user : null;

        return (
            <React.Fragment>
                {/* Title section */}
                <Grid container>
                    <Grid item>
                        {/* Title */}
                        <PageTitle
                            menuName="Partner 정보"
                            title="Partner information Setting"
                            icon={<PersonIcon />}
                        />
                    </Grid>
                </Grid>

                <Grid container>
                    <Grid item md={8} xs={12}>
                        <div className="card mt-20">
                            <form
                                id="seller-info-form"
                                onSubmit={this.onHandleSubmit.bind(this)}
                            >
                                {/* Seller id */}
                                <Grid
                                    container
                                    spacing={1}
                                    className="align-items-center"
                                >
                                    <input
                                        type="hidden"
                                        name="id"
                                        value={data.id}
                                    />
                                    <Grid item md={3} xs={12}>
                                        <h5>Partner ID</h5>
                                    </Grid>
                                    <Grid item md={9} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Seller ID"
                                            size="small"
                                            variant="outlined"
                                            name="id"
                                            value={data.id}
                                            disabled
                                        />
                                    </Grid>
                                </Grid>

                                {/* Email */}
                                <Grid
                                    container
                                    spacing={1}
                                    className="align-items-center"
                                >
                                    <Grid item md={3} xs={12}>
                                        <h5>
                                            이메일{" "}
                                            <span className="text-red">*</span>
                                        </h5>
                                    </Grid>
                                    <Grid item md={9} xs={12}>
                                        <TextField
                                            disabled
                                            fullWidth
                                            label="Email"
                                            size="small"
                                            variant="outlined"
                                            name="email"
                                            defaultValue={data.email}
                                            error={this.hasError("email")}
                                            helperText={
                                                this.hasError("email")
                                                    ? this.state.errors[
                                                          "email"
                                                      ][0]
                                                    : null
                                            }
                                        />
                                    </Grid>
                                </Grid>

                                {/* Password */}
                                <Grid
                                    container
                                    spacing={1}
                                    className="align-items-center"
                                >
                                    <Grid item md={3} xs={12}>
                                        <h5>비밀번호</h5>
                                    </Grid>
                                    <Grid item md={9} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="비밀번호"
                                            size="small"
                                            variant="outlined"
                                            type="password"
                                            name="oldPassword"
                                            error={this.hasError("oldPassword")}
                                            helperText={
                                                this.hasError("oldPassword")
                                                    ? this.state.errors[
                                                          "oldPassword"
                                                      ][0]
                                                    : null
                                            }
                                        />
                                    </Grid>
                                </Grid>

                                {/* New Password */}
                                <Grid
                                    container
                                    spacing={1}
                                    className="align-items-center"
                                >
                                    <Grid item md={3} xs={12}>
                                        <h5>변경 할 비밀번호</h5>
                                    </Grid>
                                    <Grid item md={9} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="변경 할 비밀번호"
                                            size="small"
                                            variant="outlined"
                                            type="password"
                                            name="password"
                                            error={this.hasError("password")}
                                            helperText={
                                                this.hasError("password")
                                                    ? this.state.errors[
                                                          "password"
                                                      ][0]
                                                    : null
                                            }
                                        />
                                    </Grid>
                                </Grid>

                                {/* Repeat Password */}
                                <Grid
                                    container
                                    spacing={1}
                                    className="align-items-center"
                                >
                                    <Grid item md={3} xs={12}>
                                        <h5>변경 할 비밀번호 확인</h5>
                                    </Grid>
                                    <Grid item md={9} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="변경 할 비밀번호 확인"
                                            size="small"
                                            variant="outlined"
                                            type="password"
                                            name="repeatPassword"
                                            error={this.hasError(
                                                "repeatPassword"
                                            )}
                                            helperText={
                                                this.hasError("repeatPassword")
                                                    ? this.state.errors[
                                                          "repeatPassword"
                                                      ][0]
                                                    : null
                                            }
                                        />
                                    </Grid>
                                </Grid>

                                {/* Bank account */}
                                <Grid
                                    container
                                    spacing={1}
                                    className="align-items-center"
                                >
                                    <Grid item md={3} xs={12}>
                                        <h5>
                                            정산 계좌{" "}
                                            <span className="text-red">*</span>
                                        </h5>
                                    </Grid>
                                    <Grid item md={3} xs={12}>
                                        <FormControl size="small" fullWidth>
                                            <Select
                                                variant="outlined"
                                                name="bank"
                                                defaultValue={data.bank}
                                            >
                                                <MenuItem value="Select bank">
                                                    은행을 선택해주세요.
                                                </MenuItem>
                                                <MenuItem value="KB Kookmin bank">
                                                    KB 국민은행
                                                </MenuItem>
                                                <MenuItem value="Shinhan bank">
                                                    신한은행
                                                </MenuItem>
                                                <MenuItem value="Woori bank">
                                                    우리은행
                                                </MenuItem>
                                                <MenuItem value="Hana bank">
                                                    하나은행
                                                </MenuItem>
                                                <MenuItem value="Kbank">
                                                    케이뱅크
                                                </MenuItem>
                                                <MenuItem value="Kakao bank">
                                                    카카오뱅크
                                                </MenuItem>
                                                <MenuItem value="KDB Korea Development bank">
                                                    한국산업은행
                                                </MenuItem>
                                                <MenuItem value="IBK Industrial bank of Korea">
                                                    IBK 기업은행
                                                </MenuItem>
                                                <MenuItem value="NH NongHyup, Suhyeop">
                                                    농협
                                                </MenuItem>
                                                <MenuItem value="Daegu bank">
                                                    대구은행
                                                </MenuItem>
                                                <MenuItem value="Busan bank">
                                                    부산은행
                                                </MenuItem>
                                                <MenuItem value="Kyungnam bank">
                                                    경남은행
                                                </MenuItem>
                                                <MenuItem value="Guangju bank">
                                                    광주은행
                                                </MenuItem>
                                                <MenuItem value="Jongbuk bank">
                                                    전북은행
                                                </MenuItem>
                                                <MenuItem value="Jeju bank, KFCC">
                                                    제주은행
                                                </MenuItem>
                                                <MenuItem value="Shinhyeop">
                                                    신협
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="정산 계좌"
                                            size="small"
                                            variant="outlined"
                                            name="accountNumber"
                                            defaultValue={data.accountNumber}
                                            error={this.hasError(
                                                "accountNumber"
                                            )}
                                            helperText={
                                                this.hasError("accountNumber")
                                                    ? this.state.errors[
                                                          "accountNumber"
                                                      ][0]
                                                    : null
                                            }
                                        />
                                    </Grid>
                                </Grid>

                                {/* <Divider /> */}

                                {/* Seller name */}
                                {/* <Grid
                                    container
                                    spacing={1}
                                    className="align-items-center"
                                >
                                    <Grid item md={3} xs={12}>
                                        <h5>
                                            Seller name{" "}
                                            <span className="text-red">*</span>
                                        </h5>
                                    </Grid>
                                    <Grid item md={3} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="First name"
                                            size="small"
                                            variant="outlined"
                                            name="firstName"
                                            defaultValue={data.firstName}
                                            error={this.hasError("firstName")}
                                            helperText={
                                                this.hasError("firstName")
                                                    ? this.state.errors[
                                                          "firstName"
                                                      ][0]
                                                    : null
                                            }
                                        />
                                    </Grid>
                                    <Grid item md={3} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Middle name"
                                            size="small"
                                            variant="outlined"
                                            name="middleName"
                                            defaultValue={data.middleName}
                                            error={this.hasError("middleName")}
                                            helperText={
                                                this.hasError("middleName")
                                                    ? this.state.errors[
                                                          "middleName"
                                                      ][0]
                                                    : null
                                            }
                                        />
                                    </Grid>
                                    <Grid item md={3} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="Last name"
                                            size="small"
                                            variant="outlined"
                                            name="lastName"
                                            defaultValue={data.lastName}
                                            error={this.hasError("lastName")}
                                            helperText={
                                                this.hasError("lastName")
                                                    ? this.state.errors[
                                                          "lastName"
                                                      ][0]
                                                    : null
                                            }
                                        />
                                    </Grid>
                                </Grid> */}
                                {/* Company Name */}
                                <Grid
                                    container
                                    spacing={1}
                                    className="align-items-center"
                                >
                                    <Grid item md={3} xs={12}>
                                        <h5>
                                            회사 이름{" "}
                                            <span className="text-red">*</span>
                                        </h5>
                                    </Grid>
                                    <Grid item md={9} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="회사 이름"
                                            size="small"
                                            variant="outlined"
                                            name="companyName"
                                            defaultValue={data.companyName}
                                            error={this.hasError("companyName")}
                                            helperText={
                                                this.hasError("companyName")
                                                    ? this.state.errors[
                                                          "companyName"
                                                      ][0]
                                                    : null
                                            }
                                        />
                                    </Grid>
                                </Grid>
                                {/* Postal code */}
                                <Grid
                                    container
                                    spacing={1}
                                    className="align-items-center"
                                >
                                    <Grid item md={3} xs={12}>
                                        <h5>
                                            우편번호{" "}
                                            <span className="text-red">*</span>
                                        </h5>
                                    </Grid>
                                    <Grid item md={9} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="우편번호"
                                            size="small"
                                            variant="outlined"
                                            name="postalCode"
                                            defaultValue={data.postalCode}
                                            error={this.hasError("postalCode")}
                                            helperText={
                                                this.hasError("postalCode")
                                                    ? this.state.errors[
                                                          "postalCode"
                                                      ][0]
                                                    : null
                                            }
                                        />
                                    </Grid>
                                </Grid>

                                {/* Address 1 */}
                                <Grid
                                    container
                                    spacing={1}
                                    className="align-items-center"
                                >
                                    <Grid item md={3} xs={12}>
                                        <h5>
                                            주소 1{" "}
                                            <span className="text-red">*</span>
                                        </h5>
                                    </Grid>
                                    <Grid item md={9} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="주소 1"
                                            size="small"
                                            variant="outlined"
                                            name="address1"
                                            defaultValue={data.address1}
                                            error={this.hasError("address1")}
                                            helperText={
                                                this.hasError("address1")
                                                    ? this.state.errors[
                                                          "address1"
                                                      ][0]
                                                    : null
                                            }
                                        />
                                    </Grid>
                                </Grid>

                                {/* Address 2 */}
                                <Grid
                                    container
                                    spacing={1}
                                    className="align-items-center"
                                >
                                    <Grid item md={3} xs={12}>
                                        <h5>주소 2</h5>
                                    </Grid>
                                    <Grid item md={9} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="주소 2"
                                            size="small"
                                            variant="outlined"
                                            name="address2"
                                            defaultValue={data.address2}
                                            error={this.hasError("address2")}
                                            helperText={
                                                this.hasError("address2")
                                                    ? this.state.errors[
                                                          "address2"
                                                      ][0]
                                                    : null
                                            }
                                        />
                                    </Grid>
                                </Grid>

                                {/* Address 3 */}
                                <Grid
                                    container
                                    spacing={1}
                                    className="align-items-center"
                                >
                                    <Grid item md={3} xs={12}>
                                        <h5>주소 3</h5>
                                    </Grid>
                                    <Grid item md={9} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="주소 3"
                                            size="small"
                                            variant="outlined"
                                            name="address3"
                                            defaultValue={data.address3}
                                            error={this.hasError("address3")}
                                            helperText={
                                                this.hasError("address3")
                                                    ? this.state.errors[
                                                          "address3"
                                                      ][0]
                                                    : null
                                            }
                                        />
                                    </Grid>
                                </Grid>

                                {/* Phone number */}
                                <Grid
                                    container
                                    spacing={1}
                                    className="align-items-center"
                                >
                                    <Grid item md={3} xs={12}>
                                        <h5>
                                            담당자 번호{" "}
                                            <span className="text-red">*</span>
                                        </h5>
                                    </Grid>
                                    <Grid item md={9} xs={12}>
                                        <TextField
                                            fullWidth
                                            label="담당자 번호"
                                            size="small"
                                            variant="outlined"
                                            name="phoneNumber"
                                            defaultValue={data.phoneNumber}
                                            error={this.hasError("phoneNumber")}
                                            helperText={
                                                this.hasError("phoneNumber")
                                                    ? this.state.errors[
                                                          "phoneNumber"
                                                      ][0]
                                                    : null
                                            }
                                        />
                                    </Grid>
                                </Grid>

                                <React.Fragment>
                                    {/* Download contract */}
                                    <Grid
                                        container
                                        spacing={1}
                                        className="align-items-center"
                                    >
                                        <Grid item md={3} xs={12}>
                                            <h5>계약서 다운로드</h5>
                                        </Grid>
                                        <Grid item md={9} xs={12}>
                                            <a
                                                target="_blank"
                                                href={
                                                    process.env
                                                        .REACT_APP_CDN_URL +
                                                    "user/agentcertificate/" +
                                                    this.state.draft
                                                }
                                            >
                                                <Button
                                                    variant="outlined"
                                                    color="default"
                                                    size="small"
                                                    startIcon={
                                                        this.state
                                                            .processing ===
                                                        "download" ? (
                                                            <CircularProgress
                                                                color="white"
                                                                size="1rem"
                                                            />
                                                        ) : (
                                                            <GetAppIcon />
                                                        )
                                                    }
                                                    // onClick={this.onDownload.bind(this)}
                                                    disabled={
                                                        this.state
                                                            .processing ===
                                                        "download"
                                                    }
                                                >
                                                    다운로드
                                                </Button>
                                            </a>
                                        </Grid>
                                    </Grid>

                                    {/* Certificate */}
                                    {this.state.certificate ? (
                                        <Grid
                                            container
                                            spacing={1}
                                            className="align-items-center"
                                        >
                                            <Grid item md={3} xs={12}>
                                                <h5>Seller contract</h5>
                                            </Grid>
                                            <Grid item md={9} xs={12}>
                                                <a
                                                    target="_blank"
                                                    href={
                                                        process.env
                                                            .REACT_APP_CDN_URL +
                                                        "user/agentcertificate/" +
                                                        this.state.certificate
                                                    }
                                                >
                                                    {this.state.certificate}
                                                </a>
                                            </Grid>
                                        </Grid>
                                    ) : null}

                                    {/* Upload contract */}
                                    <Grid
                                        container
                                        spacing={1}
                                        className="align-items-center"
                                    >
                                        <Grid item md={3} xs={12}>
                                            <h5>
                                                자료 업로드{" "}
                                                <span className="text-red">
                                                    *
                                                </span>
                                            </h5>
                                        </Grid>
                                        <Grid item md={9} xs={12}>
                                            <DropzoneArea
                                                maxFileSize={30000000}
                                                filesLimit={1}
                                                onDrop={(e) =>
                                                    this.onDropFile(
                                                        e,
                                                        "certificate"
                                                    )
                                                }
                                            />
                                        </Grid>
                                    </Grid>

                                    {this.state.business ? (
                                        <Grid
                                            container
                                            spacing={1}
                                            className="align-items-center"
                                        >
                                            <Grid item md={3} xs={12}>
                                                <h5>사업자 등록증 </h5>
                                            </Grid>
                                            <Grid item md={9} xs={12}>
                                                <a
                                                    target="_blank"
                                                    href={
                                                        process.env
                                                            .REACT_APP_CDN_URL +
                                                        "user/agentcertificate/" +
                                                        this.state.business
                                                    }
                                                >
                                                    {this.state.business}
                                                </a>
                                            </Grid>
                                        </Grid>
                                    ) : null}

                                    {/* Business Registration */}
                                    <Grid
                                        container
                                        spacing={1}
                                        className="align-items-center"
                                    >
                                        <Grid item md={3} xs={12}>
                                            <h5>사업자 등록증 업로드</h5>
                                        </Grid>
                                        <Grid item md={9} xs={12}>
                                            <DropzoneArea
                                                maxFileSize={30000000}
                                                filesLimit={1}
                                                onDrop={(e) =>
                                                    this.onDropFile(
                                                        e,
                                                        "business"
                                                    )
                                                }
                                            />
                                        </Grid>
                                    </Grid>

                                    {this.state.passbook ? (
                                        <Grid
                                            container
                                            spacing={1}
                                            className="align-items-center"
                                        >
                                            <Grid item md={3} xs={12}>
                                                <h5>통장사본</h5>
                                            </Grid>
                                            <Grid item md={9} xs={12}>
                                                <a
                                                    target="_blank"
                                                    href={
                                                        process.env
                                                            .REACT_APP_CDN_URL +
                                                        "user/agentcertificate/" +
                                                        this.state.passbook
                                                    }
                                                >
                                                    {this.state.passbook}
                                                </a>
                                            </Grid>
                                        </Grid>
                                    ) : null}

                                    {/* Upload contract */}
                                    <Grid
                                        container
                                        spacing={1}
                                        className="align-items-center"
                                    >
                                        <Grid item md={3} xs={12}>
                                            <h5>통장사본 업로드</h5>
                                        </Grid>
                                        <Grid item md={9} xs={12}>
                                            <DropzoneArea
                                                maxFileSize={30000000}
                                                filesLimit={1}
                                                onDrop={(e) =>
                                                    this.onDropFile(
                                                        e,
                                                        "passbook"
                                                    )
                                                }
                                            />
                                        </Grid>
                                    </Grid>
                                </React.Fragment>
                            </form>

                            <Divider className="mt-20" />

                            <Grid container spacing={1} className="mt-20">
                                <Grid item>
                                    <Button
                                        form="seller-info-form"
                                        variant="contained"
                                        size="small"
                                        color="primary"
                                        type="submit"
                                        disabled={
                                            this.state.processing !== ""
                                                ? true
                                                : false
                                        }
                                        startIcon={
                                            this.state.processing ===
                                            "submit" ? (
                                                <CircularProgress
                                                    color="white"
                                                    size="1rem"
                                                />
                                            ) : (
                                                <SaveIcon
                                                    fontSize="small"
                                                    className="mr-10"
                                                />
                                            )
                                        }
                                    >
                                        저장
                                    </Button>
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
        loggedUser: state.loggedUser,
    };
};

export default withSnackbar(
    connect(mapStateToProps, { setLoggedUser })(PersonalInfo)
);
