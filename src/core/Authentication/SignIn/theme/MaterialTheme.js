import React, { useState, useEffect } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import validate from "validate.js";
import { makeStyles } from "@material-ui/core/styles";
import {
    Grid,
    Button,
    TextField,
    Typography,
    Checkbox,
    CircularProgress,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { store, setLoggedUser, setToken } from "../../../../core/redux/Redux";
import axios from "axios";
// import { Facebook as FacebookIcon, Google as GoogleIcon } from '../../../icons';
import { gql } from "apollo-boost";
import { Link } from "react-router-dom";

const schema = {
    email: {
        presence: {
            allowEmpty: false,
            message: "^이메일을 입력해주세요.",
        },
        email: {
            message: "^이메일 형식으로 입력해주세요.",
        },
        length: {
            maximum: 64,
        },
    },
    password: {
        presence: { allowEmpty: false, message: "^패스워드 입력해주세요." },
        length: {
            maximum: 128,
        },
    },
};

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        height: "100%",
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
    contentHeader: {
        display: "flex",
        alignItems: "center",
        paddingTop: theme.spacing(5),
        paddingBototm: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
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
    socialButtons: {
        marginTop: theme.spacing(3),
    },
    socialIcon: {
        marginRight: theme.spacing(1),
    },
    sugestion: {
        marginTop: theme.spacing(2),
    },
    textField: {
        marginTop: theme.spacing(2),
    },
    signInButton: {
        margin: theme.spacing(2, 0),
    },
    remember: {
        marginTop: theme.spacing(1),
        display: "flex",
        alignItems: "center",
    },
    rememberCheckbox: {
        marginLeft: "0px",
    },
    forgetPassword: {
        marginLeft: "39%",
    },
}));

/**
 *
 */
const SignIn = (props) => {
    const { history } = props;

    const classes = useStyles();

    const [formState, setFormState] = useState({
        isValid: false,
        values: {},
        touched: {},
        errors: {},
        isInvalidCredentials: false,
        isProcessing: false,
    });

    useEffect(() => {
        // create anonymious token
        const token = localStorage.getItem(process.env.REACT_ACCESS_TOKEN_NAME);

        if (!token) {
            const fetchData = async () => {
                let bodyFormData = new FormData();
                bodyFormData.append("grant_type", "password");
                bodyFormData.append(
                    "username",
                    process.env.REACT_ANONYMOUS_USERNAME
                );
                bodyFormData.append(
                    "password",
                    process.env.REACT_ANONYMOUS_PASSWORD
                );

                await new Promise((resolve) => {
                    new axios({
                        baseURL: process.env.REACT_APP_DOMAIN + "/oauth/token",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        auth: {
                            username: process.env.REACT_APP_OAUTH_ID,
                            password: process.env.REACT_APP_OAUTH_PASS,
                        },
                        data: bodyFormData,
                        method: "POST",
                    })
                        .then((response) => {
                            if (
                                response.data &&
                                response.data.access_token &&
                                response.data.refresh_token
                            ) {
                                store.dispatch(
                                    setToken({
                                        accessToken: response.data.access_token,
                                        refreshToken:
                                            response.data.refresh_token,
                                    })
                                );

                                localStorage.setItem(
                                    process.env.REACT_ACCESS_TOKEN_NAME,
                                    response.data.access_token
                                );
                                localStorage.setItem(
                                    process.env.REACT_REFRESH_TOKEN_NAME,
                                    response.data.refresh_token
                                );
                            }
                            resolve(true);
                        })
                        .catch((error) => {
                            resolve(false);
                        });
                });
            };

            fetchData();
        }

        const errors = validate(formState.values, schema);

        setFormState((formState) => ({
            ...formState,
            isValid: errors ? false : true,
            errors: errors || {},
        }));
    }, [formState.values]);

    const handleBack = () => {
        history.goBack();
    };

    const handleChange = (event) => {
        event.persist();

        setFormState((formState) => ({
            ...formState,
            values: {
                ...formState.values,
                [event.target.name]:
                    event.target.type === "checkbox"
                        ? event.target.checked
                        : event.target.value,
            },
            touched: {
                ...formState.touched,
                [event.target.name]: true,
            },
        }));
    };

    /**
     * @summary On sign in
     * @param {MouseEvent} event
     */
    const handleSignIn = async (event) => {
        event.preventDefault();

        setFormState((formState) => ({
            ...formState,
            isProcessing: true,
            isInvalidCredentials: false,
        }));

        var bodyFormData = new FormData();
        bodyFormData.append("grant_type", "password");
        bodyFormData.append("username", formState.values.email);
        bodyFormData.append("password", formState.values.password);

        let promise = await new Promise((resolve) => {
            new axios({
                baseURL: process.env.REACT_APP_DOMAIN + "/oauth/token",
                headers: {
                    "Content-Type": "application/json",
                },
                auth: {
                    username: process.env.REACT_APP_OAUTH_ID,
                    password: process.env.REACT_APP_OAUTH_PASS,
                },
                data: bodyFormData,
                method: "POST",
            })
                .then((response) => {
                    if (
                        response.data &&
                        response.data.access_token &&
                        response.data.refresh_token
                    ) {
                        store.dispatch(
                            setToken({
                                accessToken: response.data.access_token,
                                refreshToken: response.data.refresh_token,
                            })
                        );
                        // let apolloClient = createApolloClient(response.data.access_token);
                        // store.dispatch(setApolloClient(apolloClient));
                        localStorage.setItem(
                            process.env.REACT_ACCESS_TOKEN_NAME,
                            response.data.access_token
                        );
                        localStorage.setItem(
                            process.env.REACT_REFRESH_TOKEN_NAME,
                            response.data.refresh_token
                        );

                        store
                            .getState()
                            .apolloClient.httpClient.query({
                                query: gql`
                                    query getUserLoggedIn {
                                        userLogged {
                                            id
                                            email
                                            firstName
                                            middleName
                                            lastName
                                            birthday
                                            gender
                                            nation
                                            city
                                            state
                                            address1
                                            address2
                                            address3
                                            postalCode
                                            phoneNumber
                                            status
                                            referrerCode
                                            memberType
                                            roleName
                                            companyName
                                        }
                                    }
                                `,
                            })
                            .then((response) => {
                                store.dispatch(
                                    setLoggedUser(response.data.userLogged)
                                );
                                localStorage.setItem(
                                    process.env.REACT_LOGGED_USER,
                                    JSON.stringify(response.data.userLogged)
                                );
                                resolve(true);
                            })
                            .catch((error) => {
                                resolve(false);
                            });
                    } else {
                        resolve(false);
                    }
                })
                .catch((error) => {
                    resolve(false);
                });
        });

        if (promise) {
            history.push("/");
        } else {
            setFormState((formState) => ({
                ...formState,
                isInvalidCredentials: true,
                isProcessing: false,
            }));
        }
    };

    const hasError = (field) =>
        formState.touched[field] && formState.errors[field] ? true : false;

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
                                로그인
                            </Typography>
                        </div>
                    </div>
                </Grid>
                <Grid className={classes.content} item lg={7} xs={12}>
                    <div className={classes.content}>
                        <div className={classes.contentBody}>
                            <form
                                className={classes.form}
                                onSubmit={handleSignIn}
                            >
                                {formState.isInvalidCredentials ? (
                                    <Alert variant="outlined" severity="error">
                                        이메일 또는 비밀번호가 일치하지
                                        않습니다.
                                    </Alert>
                                ) : (
                                    ""
                                )}

                                <Typography
                                    className={classes.title}
                                    variant="h2"
                                >
                                    로그인
                                </Typography>
                                {/* <Typography
                  color="textSecondary"
                  gutterBottom
                >
                  Sign in with social media
                </Typography> */}
                                {/* <Grid
                  className={classes.socialButtons}
                  container
                  spacing={2}
                >
                  <Grid item>
                    <Button
                      color="primary"
                      onClick={handleSignIn}
                      size="large"
                      variant="contained"
                    >
                      <FacebookIcon className={classes.socialIcon} />
                      Login with Facebook
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={handleSignIn}
                      size="large"
                      variant="contained"
                    >
                      <GoogleIcon className={classes.socialIcon} />
                      Login with Google
                    </Button>
                  </Grid>
                </Grid> */}
                                {/* <Typography
                  align="center"
                  className={classes.sugestion}
                  color="textSecondary"
                  variant="body1"
                >
                  or login with email address
                </Typography> */}

                                <TextField
                                    className={classes.textField}
                                    error={hasError("email")}
                                    fullWidth
                                    helperText={
                                        hasError("email")
                                            ? formState.errors.email[0]
                                            : null
                                    }
                                    label="이메일 주소"
                                    name="email"
                                    onChange={handleChange}
                                    type="text"
                                    value={formState.values.email || ""}
                                    variant="outlined"
                                />

                                <TextField
                                    className={classes.textField}
                                    error={hasError("password")}
                                    fullWidth
                                    helperText={
                                        hasError("password")
                                            ? formState.errors.password[0]
                                            : null
                                    }
                                    label="비밀번호"
                                    name="password"
                                    onChange={handleChange}
                                    type="password"
                                    value={formState.values.password || ""}
                                    variant="outlined"
                                />
                                <div className={classes.remember}>
                                    <Checkbox
                                        checked={
                                            formState.values.remember || false
                                        }
                                        className={classes.rememberCheckbox}
                                        color="primary"
                                        name="remember"
                                        onChange={handleChange}
                                    />
                                    <Typography
                                        className={classes.rememberText}
                                        color="textSecondary"
                                        variant="body1"
                                    >
                                        저장하기
                                    </Typography>
                                </div>
                                <Button
                                    className={classes.signInButton}
                                    color="primary"
                                    disabled={
                                        !formState.isValid ||
                                        formState.isProcessing
                                    }
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    startIcon={
                                        formState.isProcessing ? (
                                            <CircularProgress
                                                color="white"
                                                size="1rem"
                                            />
                                        ) : (
                                            ""
                                        )
                                    }
                                >
                                    로그인
                                </Button>
                                <Typography
                                    color="textSecondary"
                                    variant="body1"
                                >
                                    Khandid 계정이 없으세요?{" "}
                                    <Link to="/signup" variant="h6">
                                        회원가입
                                    </Link>
                                    <Link
                                        to="/forget-password"
                                        variant="h6"
                                        className={classes.forgetPassword}
                                    >
                                        비밀번호를 잃어버리셨나요?
                                    </Link>
                                </Typography>
                            </form>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};

SignIn.propTypes = {
    history: PropTypes.object,
};

export default withRouter(SignIn);
