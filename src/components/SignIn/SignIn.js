import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import BaseSignIn from '../../core/Authentication/SignIn/SignIn';
import PropTypes from "prop-types";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import { setApolloClient, store, setLoggedUser, setToken } from "../../core/redux/Redux";

import { decodeToken } from 'react-jwt';
import { Alert } from "@material-ui/lab";
import {
  CREATE_NEW_MARKET,
  SAVE_SELLER,
  CHECK_MAIL,
  ACTIVATION,
} from "../Seller/Queries";
import {
    Grid,
    TextField,
    Button,
    InputLabel,
    Table,
    TableBody,
    TableRow,
    TableCell,
    InputAdornment,
    FormControlLabel,
    Checkbox,
    Dialog,
    DialogContent,
    DialogActions,
    Divider,
    Input,
    DialogTitle,
  } from "@material-ui/core";
  import axios from "axios";
  import CancelIcon from "@material-ui/icons/Cancel";
  import SaveIcon from "@material-ui/icons/Save";
  import CheckIcon from "@material-ui/icons/Check";
  import SendIcon from "@material-ui/icons/Send";
  import UploadIcon from "@material-ui/icons/CloudUpload";
  import SearchIcon from "@material-ui/icons/Search";
/**
 * @summary SignIn
 * @version 0.1
 * @author Tuguldur Unurtsetseg
 * @package src/components
 */
 const RegisterMart = (props) => {
    const { history } = props;

    const [formState, setFormState] = useState({
        isValid: false,
        values: {},
        touched: {},
        errors: {},
        isInvalidCredentials: false,
        isProcessing: false,
        isOpenModal: false,
        isCodeSent: false,
    });


  /**
   * @summary Open box
   * @param {event}
   */
   const onOpenModal = (e, index) => {
    setFormState({
        index: index,
        isOpenModal: true,
      });
    };
  

  /**
   * @summary Close box
   * @param {event}
   */
   const onCloseModal = () => {
        setFormState({ isOpenModal: false });
    };
  

  /**
   * @summary Close box
   * @param {event}
   */
    const onCodeSent = () => {
        setFormState({ isCodeSent: true });
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

    useEffect(() => {
      
        var raw = JSON.stringify({
            "username": process.env.REACT_ANONYMOUS_USERNAME,
            "password": process.env.REACT_ANONYMOUS_PASSWORD
          });
          let promise = new Promise((resolve) => {
            new axios({
                baseURL: process.env.REACT_APP_DOMAIN + "/authenticate",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                data: raw,
                method: "POST",
            })
            .then((response) => {
              
                if (
                    response.data &&
                    response.data.token
                ) {
                    
                    var decodedToken = decodeToken(response.data.token);
                    let apolloClient = createApolloClient(response.data.token);
                    store.dispatch(setApolloClient(apolloClient));
                    localStorage.setItem( process.env.REACT_ACCESS_TOKEN_NAME, response.data.token );
                    localStorage.setItem( process.env.REACT_LOGGED_USER_ID, response.data.id );
                    localStorage.setItem( process.env.REACT_LOGGED_MARKET_ID, response.data.marketId );
                    
                    var user = {
                      "userid": response.data.id,
                      "marketid": response.data.marketId,
                      "roleName": decodedToken.role 
                    };
                    store.dispatch(
                      setLoggedUser(user)
                    );
                    //resolve(true);
                } else {
                    //resolve(false);
                }
            })
            .catch((error) => {
                //resolve(false);
            });
        });
    }, []);
    
  
    const handleSignIn = async (event) => {
        event.preventDefault();

        setFormState((formState) => ({
            ...formState,
            isProcessing: true,
            isInvalidCredentials: false,
        }));

        var bodyFormData = new FormData();
        
        bodyFormData.append("username", formState.values.email);
        bodyFormData.append("password", formState.values.password);
        // console.log(formState);
        var raw = JSON.stringify({
            "username": formState.values.email,
            "password": formState.values.password
          });

        let promise = await new Promise((resolve) => {
            new axios({
                baseURL: process.env.REACT_APP_DOMAIN + "/authenticate",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                data: raw,
                method: "POST",
            })
                .then((response) => {
                    
                    if (
                        response.data &&
                        response.data.token
                    ) {
                        // store.dispatch(
                        //     setToken({
                        //         accessToken: response.data.token
                        //     })
                        // );
                        var decodedToken = decodeToken(response.data.token);
                        // let apolloClient = createApolloClient(response.data.access_token);
                        // store.dispatch(setApolloClient(apolloClient));
                        localStorage.setItem( process.env.REACT_ACCESS_TOKEN_NAME, response.data.token );
                        localStorage.setItem( process.env.REACT_LOGGED_USER_ID, response.data.id );
                        localStorage.setItem( process.env.REACT_LOGGED_USER_NAME, response.data.username );
                        localStorage.setItem( process.env.REACT_LOGGED_USER_EMAIL, response.data.email );
                        localStorage.setItem( process.env.REACT_LOGGED_MARKET_ID, response.data.marketId );
                        localStorage.setItem( process.env.REACT_LOGGED_USER_ROLE, decodedToken.role );
                        
                        var user = {
                          "userid": response.data.id,
                          "marketid": response.data.marketId,
                          "roleName": decodedToken.role 
                        };
                        store.dispatch(
                          setLoggedUser(user)
                        );
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                })
                .catch((error) => {
                    resolve(false);
                });
        });
        
        if (promise) {
          console.log("test")
            history.push("/");
        } else {
          console.log("false")
            setFormState((formState) => ({
                ...formState,
                isInvalidCredentials: true,
                isProcessing: false,
            }));
        }
    };
    const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;

    const onHandleSubmit = async (event) => {
      event.preventDefault();
      // setFormState((formState) => ({
      //     isLoading: true,
      // }));
      // console.log(props.apolloClient.httpClient);
      // Form data
      const formData = new FormData(event.target);

      // Form data to object
      let user = {
          market: {
            name: formData.get("companyName"),
            ceoName: formData.get("ceoName"),
            companyPhone: formData.get("companyPhone"),
            businessNumber: formData.get("businessNumber"),
            address1: formData.get("address"),
            address2: "99",
            address3: "999",
            postalCode: "999",
            openHour: formData.get("openHour"),
            closeHour: formData.get("closeHour"),
            deliveryFee: formData.get("deliveryFee"),
            deliveryFreePrice: formData.get("deliveryFreePrice"),
          },
          admin: {
            userId: formData.get("userId"),
            username: formData.get("username"),
            password: formData.get("password"),
            email: formData.get("email"),
            phoneNumber: "123456789",
            allowMarketingMail: false
          },
           businessCertificate: null,
           businessStamp: null,
          
      };

      // Validate
      //if (onValidateSubmit(user)) return;

      //delete user.repeatPassword;

      // Mutate
      let raw = JSON.stringify({
        
          "market": {
            "name": "aaaa",
            "ceoName": "aaa",
            "companyPhone": "123456789",
            "businessNumber": "123456789",
            "address1": "999",
            "address2": "99",
            "address3": "999",
            "postalCode": "999",
            "openHour": "10",
            "closeHour": "18",
            "deliveryFee": 200.00,
            "deliveryFreePrice": 300.00
          },
          "admin": {
            "userId": "aaaa",
            "username": "aaaaa",
            "password": "aaaaa",
            "email": "faitynb@gmail.com",
            "phoneNumber": "123456789",
            "allowMarketingMail": false
          },
          "businessCertificate": null,
          "businessStamp": null
        
      });

      let promise = await new Promise((resolve) => {
            new axios({
                baseURL: process.env.REACT_APP_DOMAIN + "/api/createMarket",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                data: raw,
                method: "POST",
            })
            .then((result) => {
              console.log(result);
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
        });

      if (promise) {
        setFormState({
              messageType: "success",
              isLoading: false,
          });
      } else {
        setFormState({
              messageType: "error",
              isLoading: false,
          });
      }
  }
    return (
      <React.Fragment>
        <div className="card mt-20">
        <form onSubmit={handleSignIn}>
        
          <Grid
            container
            spacing={3}
            md={12}
            xs={12}
            className="align-items-center"
          >
            <Grid item md={2} xs={12}></Grid>
            <Grid item md={8} xs={12} className="align-items-center">
              
                <Table style={{ border: "none" }}>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        className="text-center align-items-center"
                        width="10%"
                      >
                        아이디
                      </TableCell>
                      <TableCell
                        className="text-center align-items-center"
                        width="50%"
                      >
                        <TextField fullWidth size="small" name="email" variant="outlined" onChange={handleChange} />
                      </TableCell>
                      <TableCell
                        className="text-center align-items-center"
                        rowSpan={2}
                        width="20%"
                      >
                        <Button
                          fullWidth
                          size="large"
                          variant="contained"
                          color="primary"
                          type="submit"
                        >
                          로그인
                        </Button>
                      </TableCell>
                      <TableCell
                        className="text-center align-items-center"
                        rowSpan={2}
                        width="20%"
                      >
                        <Button
                          fullWidth
                          size="large"
                          variant="contained"
                          style={{ backgroundColor: "#FF5733", color: "#fff" }}
                          onClick={onOpenModal}
                        >
                          마트 등록
                        </Button>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell
                        className="text-center align-items-center"
                        width="10%"
                      >
                        비밀번호
                      </TableCell>
                      <TableCell
                        className="text-center align-items-center"
                        width="50%"
                      >
                        <TextField
                          fullWidth
                          size="small"
                          variant="outlined"
                          name="password"
                          type="password"
                          onChange={handleChange}
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell
                        className="text-center align-items-center"
                        width="10%"
                      >
                        
                      </TableCell>
                      <TableCell
                        className="text-center align-items-center"
                        width="50%"
                      >
                        {formState.isInvalidCredentials ? (
                            <Alert variant="outlined" severity="error">
                                이메일 또는 비밀번호가 일치하지
                                않습니다.
                            </Alert>
                        ) : (
                            ""
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                
            </Grid>
            <Grid item md={2} xs={12}></Grid>
          </Grid>
          
        </form>
          <Dialog open={formState.isOpenModal} maxWidth="md" fullWidth>
            <DialogTitle>
              (주)아니벌써와 함께 비즈니스를 시작하세요!
            </DialogTitle>
            <form onSubmit={onHandleSubmit}>
            <DialogContent>
              <Grid
                container
                spacing={3}
                md={12}
                xs={12}
                className="align-items-center"
              >
                <Grid
                  container
                  md={12}
                  xs={12}
                  className="align-items-center mt-20"
                >
                  <Grid item md={4} xs={12}>
                    <InputLabel>담당자 이름</InputLabel>
                  </Grid>
                  <Grid item md={8} xs={12}>
                    <TextField fullWidth size="small" variant="outlined" name="username" />
                  </Grid>
                </Grid>

                <Grid
                  container
                  md={12}
                  xs={12}
                  className="align-items-center mt-20"
                >
                  <Grid item md={4} xs={12}>
                    <InputLabel>아이디</InputLabel>
                  </Grid>
                  <Grid item md={5} xs={12}>
                    <TextField fullWidth size="small" variant="outlined" name="userId" />
                  </Grid>
                  <Grid item md={3} xs={12} style={{ paddingLeft: "10px" }}>
                    <Button
                      fullWidth
                      size="medium"
                      variant="contained"
                      style={{ backgroundColor: "#FF5733", color: "#fff" }}
                      startIcon={<CheckIcon />}
                    >
                      중복 확인
                    </Button>
                  </Grid>
                </Grid>

                <Grid
                  container
                  md={12}
                  xs={12}
                  className="align-items-center mt-20"
                >
                  <Grid item md={4} xs={12}>
                    <InputLabel>비밀번호</InputLabel>
                  </Grid>
                  <Grid item md={8} xs={12}>
                    <TextField type="password" fullWidth size="small" variant="outlined" name="password" />
                  </Grid>
                </Grid>

                <Grid
                  container
                  md={12}
                  xs={12}
                  className="align-items-center mt-20"
                >
                  <Grid item md={4} xs={12}>
                    <InputLabel>비밀번호 확인</InputLabel>
                  </Grid>
                  <Grid item md={8} xs={12}>
                    <TextField type="password" fullWidth size="small" variant="outlined" name="passwordConfirm"/>
                  </Grid>
                </Grid>

                <Grid
                  container
                  md={12}
                  xs={12}
                  className="align-items-center mt-20"
                >
                  <Grid item md={4} xs={12}>
                    <InputLabel>상호명</InputLabel>
                  </Grid>
                  <Grid item md={8} xs={12}>
                    <TextField fullWidth size="small" variant="outlined" name="companyName" />
                  </Grid>
                </Grid>

                <Grid
                  container
                  md={12}
                  xs={12}
                  className="align-items-center mt-20"
                >
                  <Grid item md={4} xs={12}>
                    <InputLabel>대표자명</InputLabel>
                  </Grid>
                  <Grid item md={8} xs={12}>
                    <TextField fullWidth size="small" variant="outlined" name="ceoName" />
                  </Grid>
                </Grid>

                <Grid
                  container
                  md={12}
                  xs={12}
                  className="align-items-center mt-20"
                >
                  <Grid item md={4} xs={12}>
                    <InputLabel>대표 전화번호</InputLabel>
                  </Grid>
                  <Grid item md={8} xs={12}>
                    <TextField fullWidth size="small" variant="outlined" name="companyPhone" />
                  </Grid>
                </Grid>

                <Grid
                  container
                  md={12}
                  xs={12}
                  className="align-items-center mt-20"
                >
                  <Grid item md={4} xs={12}>
                    <InputLabel>사업자등록번호</InputLabel>
                  </Grid>
                  <Grid item md={8} xs={12}>
                    <TextField fullWidth size="small" variant="outlined" name="businessNumber" />
                  </Grid>
                </Grid>

                <Grid
                  container
                  md={12}
                  xs={12}
                  className="align-items-center mt-20"
                >
                  <Grid item md={4} xs={12}>
                    <InputLabel>사업자등록증 사본(jpg, pdf) 등록</InputLabel>
                  </Grid>
                  <Grid item md={5} xs={12}>
                    <TextField fullWidth size="small" variant="outlined" />
                  </Grid>
                  <Grid item md={3} xs={12} style={{ paddingLeft: "10px" }}>
                    <label>
                      <Input
                        accept=".jpg, .pdf"
                        type="file"
                        style={{ display: "none" }}
                      />
                      <Button
                        fullWidth
                        component="span"
                        size="medium"
                        variant="contained"
                        style={{ border: "1px solid #cccbcb" }}
                        startIcon={<UploadIcon />}
                      >
                        찾아보기
                      </Button>
                    </label>
                  </Grid>
                </Grid>

                <Grid
                  container
                  md={12}
                  xs={12}
                  className="align-items-center mt-20"
                >
                  <Grid item md={4} xs={12}>
                    <InputLabel>사업자통장사본(jpg, jpeg, pdf) 등록</InputLabel>
                  </Grid>
                  <Grid item md={5} xs={12}>
                    <TextField fullWidth size="small" variant="outlined" />
                  </Grid>
                  <Grid item md={3} xs={12} style={{ paddingLeft: "10px" }}>
                    <label>
                      <Input
                        accept=".jpg, .jpeg, .pdf"
                        type="file"
                        style={{ display: "none" }}
                      />
                      <Button
                        fullWidth
                        component="span"
                        size="medium"
                        variant="contained"
                        style={{ border: "1px solid #cccbcb" }}
                        startIcon={<UploadIcon />}
                      >
                        찾아보기
                      </Button>
                    </label>
                  </Grid>
                </Grid>

                <Grid
                  container
                  md={12}
                  xs={12}
                  className="align-items-center mt-20"
                >
                  <Grid item md={4} xs={12}>
                    <InputLabel>주소</InputLabel>
                  </Grid>
                  <Grid item md={5} xs={12}>
                    <TextField fullWidth size="small" variant="outlined" name="address"  />
                  </Grid>
                  <Grid item md={3} xs={12} style={{ paddingLeft: "10px" }}>
                    <Button
                      fullWidth
                      component="span"
                      size="medium"
                      variant="contained"
                      style={{ border: "1px solid #cccbcb" }}
                      startIcon={<SearchIcon />}
                    >
                      주소 찾기
                    </Button>
                  </Grid>
                </Grid>

                <Grid
                  container
                  md={12}
                  xs={12}
                  className="align-items-center mt-20"
                >
                  <Grid item md={4} xs={12}>
                    <InputLabel>배달영업 시간(오전 00 ~ 오후 00)</InputLabel>
                  </Grid>
                  <Grid item md={8} xs={12}>
                    <Grid container>
                      <Grid item md={6} xs={12} className="align-items-center">
                        <Grid container>
                          <Grid item md={11}>
                            <TextField
                              fullWidth
                              size="small"
                              variant="outlined"
                              type="time"
                              name="openHour"
                            />
                          </Grid>
                          <Grid
                            item
                            md={1}
                            style={{ paddingLeft: "10px" }}
                            className="align-items-center"
                          >
                            <InputLabel>~</InputLabel>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item md={6} xs={12} className="align-items-center">
                        <TextField
                          fullWidth
                          size="small"
                          variant="outlined"
                          type="time"
                          name="closeHour"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid
                  container
                  md={12}
                  xs={12}
                  className="align-items-center mt-20"
                >
                  <Grid item md={4} xs={12}>
                    <InputLabel>기본 배송비</InputLabel>
                  </Grid>
                  <Grid item md={8} xs={12}>
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      type="number"
                      name="deliveryFee"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">원</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>

                <Grid
                  container
                  md={12}
                  xs={12}
                  className="align-items-center mt-20"
                >
                  <Grid item md={4} xs={12}>
                    <InputLabel>배송비 조건</InputLabel>
                  </Grid>
                  <Grid item md={7} xs={12}>
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      type="number"
                      name="deliveryFreePrice"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">원</InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item md={1} xs={12} style={{ textAlign: "center" }}>
                    <InputLabel>이상 무료</InputLabel>
                  </Grid>
                </Grid>

                <Grid
                  container
                  md={12}
                  xs={12}
                  className="align-items-center mt-20"
                >
                  <Grid item md={4} xs={12}>
                    <InputLabel>담당자 이메일</InputLabel>
                  </Grid>
                  <Grid item md={8} xs={12}>
                    <TextField fullWidth size="small" variant="outlined" name="email" />
                  </Grid>
                </Grid>

                <Grid
                  container
                  md={12}
                  xs={12}
                  className="align-items-center mt-20"
                >
                  <Grid item md={4} xs={12}>
                    <InputLabel>휴대폰 번호(인증요청)</InputLabel>
                  </Grid>
                  <Grid item md={5} xs={12}>
                    <TextField fullWidth size="small" variant="outlined" name="phoneNumber" />
                  </Grid>
                  <Grid item md={3} xs={12} style={{ paddingLeft: "10px" }}>
                    <Button
                      fullWidth
                      size="medium"
                      variant="contained"
                      style={{ backgroundColor: "#FFC300" }}
                      onClick={onCodeSent}
                      startIcon={<SendIcon />}
                    >
                      {formState.isCodeSent === false
                        ? "인증번호 요청"
                        : "인증번호 재요청"}
                    </Button>
                  </Grid>
                </Grid>

                <Grid
                  container
                  md={12}
                  xs={12}
                  className="align-items-center mt-20"
                >
                  <Grid item md={4} xs={12}>
                    <InputLabel>인증번호 입력</InputLabel>
                  </Grid>
                  <Grid item md={5} xs={12}>
                    <TextField fullWidth size="small" variant="outlined" name="activateNumber" />
                  </Grid>
                  <Grid item md={3} xs={12} style={{ paddingLeft: "10px" }}>
                    <Button
                      fullWidth
                      size="medium"
                      variant="contained"
                      color="primary"
                      startIcon={<CheckIcon />}
                    >
                      확인
                    </Button>
                  </Grid>
                </Grid>

                <Grid
                  container
                  md={12}
                  xs={12}
                  className="align-items-center mt-20"
                >
                  <Grid item md={4} xs={12}></Grid>
                  <Grid item md={8} xs={12}>
                    <FormControlLabel
                      control={<Checkbox color="primary" value={true} name="terms" />}
                      label="아니벌써 이용약관 동의"
                    />
                  </Grid>
                </Grid>

                <Grid container md={12} xs={12} className="align-items-center">
                  <Grid item md={4} xs={12}></Grid>
                  <Grid item md={8} xs={12}>
                    <FormControlLabel
                      control={<Checkbox color="primary" value={true} name="privacy"  />}
                      label="개인정보 수집 및 이용 동의"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>

            <Divider />

            <DialogActions>
              <Button
                type="submit"
                size="medium"
                variant="outlined"
                style={{ backgroundColor: "#0eb906", color: "#fff" }}
                startIcon={<SaveIcon />}
                //onClick={onCloseModal}
              >
                완료
              </Button>
              <Button
                size="medium"
                variant="outlined"
                style={{ backgroundColor: "#fff", color: "#000" }}
                startIcon={<CancelIcon />}
                onClick={onCloseModal}
              >
                취소
              </Button>
            </DialogActions>
            </form>
          </Dialog>
        </div>
      </React.Fragment>
    );
  
}

const mapStateToProps = (state) => {
  return {
      apolloClient: state.apolloClient,
  };
};

// RegisterMart.propTypes = {
//   history: PropTypes.object,
// };

export default withRouter(connect(mapStateToProps, { setApolloClient })(RegisterMart));
