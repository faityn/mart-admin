import React from "react";
import PageTitle from "../../../core/common/Partials/PageTitle";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import SaveIcon from "@material-ui/icons/Save";
import SubjectIcon from '@material-ui/icons/Subject';
import { CircularProgress, Grid, Button, Table, TableBody, TableRow, TableCell, TextField, FormControlLabel, Checkbox, Select, MenuItem, FormControl} from "@material-ui/core";

class PassReset extends React.Component {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    // state
    this.state = {
      isProcessing: false,
      text: null,
    };

    // Events
    this.onHandleSubmit = this.onHandleSubmit.bind(this);

    this._isMounted = false;
  } 

  /**
   * @override
   */
  async componentDidMount() {
    this._isMounted = true;

    await this.props.apolloClient.httpClient
      .query({
        query: GET_PRIVACY,
      })
      .then((result) => {
        this.setState({
          text: result.data.getPrivacy,
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
   * @summary Handle submit form
   * @param {MouseEvent} event
   */
  async onHandleSubmit(event) {
    event.preventDefault();

    if (this.state.isProcessing) return;

    // Form data
    const formData = new FormData(event.target);

    // Form data to object
    let privacyInput = {
      text: formData.get("text"),
    };

    this.setState({
      isProcessing: true,
    });

    this.props.enqueueSnackbar("The saving process is being started ...", {
      variant: "info",
    });

    // Mutate
    await this.props.apolloClient.httpClient
      .mutate({
        mutation: SAVE_PRIVACY,
        variables: {
          privacyInput: privacyInput,
        },
      })
      .then((result) => {
        if (result.data.savePrivacy.statusCode === 200) {
          this.props.enqueueSnackbar(
            "Privacy Policy has been successfully updated.",
            { variant: "success" }
          );
        } else {
          this.props.enqueueSnackbar(
            "Sorry, there is an error occurred while saving data.",
            { variant: "error" }
          );
        }
      })
      .catch((error) => {
        this.props.enqueueSnackbar(
          "Sorry, there is an error occurred while saving data.",
          { variant: "error" }
        );
      });

    this._isMounted &&
      this.setState({
        isProcessing: false,
      });
  }

  render() {
    return (
      <React.Fragment>
        {/* Title section */}
        <Grid container>
          <Grid item>
            {/* Title */}
            <PageTitle
              menuName="비밀번호 변경안내 설정"
              title="비밀번호 변경안내 설정"
              icon={<SubjectIcon />}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item md={12}>
            <div className="card mt-20">
              <form id="form-submit" onSubmit={this.onHandleSubmit}>
              
                <Grid container spacing={2} md={12} xs={12}>
                    <Grid item md={12} xs={12}>
                      <h5>비밀번호 변경안내 설정</h5>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item md={12} xs={12}>
                        <Table className="mail_table">
                          <TableBody>
                            <TableRow>
                                <TableCell>관리자 사용설정</TableCell>
                                <TableCell>
                                  <Grid item md={12} xs={12}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          name="active"
                                          color="primary"
                                          value={true}
                                          defaultChecked={true}
                                        />
                                      }
                                      label="사용함"
                                    />
                                  </Grid>
                                  <Grid item md={12} xs={12}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          name="active"
                                          color="primary"
                                          value={false}
                                        />
                                      }
                                      label="사용 안함"
                                    />
                                  </Grid>
                                  <Grid spacing={2} item md={12} xs={12} className="mt-20">
                                    <Grid item md={12} xs={12}>
                                      <h5>+ 장기간 비밀번호를 변경하지 않은 관리자가 관리자 화면 로그인 시 비밀번호 변경을 안내.</h5>
                                    </Grid>
                                  </Grid>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>앱 쇼핑몰 사용설정</TableCell>
                                <TableCell>
                                  <Grid item md={12} xs={12}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          name="active"
                                          color="primary"
                                          value={true}
                                          defaultChecked={true}
                                        />
                                      }
                                      label="사용함"
                                    />
                                  </Grid>
                                  <Grid item md={12} xs={12}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          name="active"
                                          color="primary"
                                          value={false}
                                        />
                                      }
                                      label="사용 안함"
                                    />
                                  </Grid>
                                  <Grid spacing={2} item md={12} xs={12} className="mt-20">
                                    <Grid item md={12} xs={12}>
                                      <h5>+ 장기간 비밀번호를 변경하지 않은 회원이 쇼핑몰 화면 로그인 시 비밀번호 변경을 안내.</h5>
                                    </Grid>
                                  </Grid>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>비밀번호 변경 안내 주기</TableCell>
                                <TableCell>
                                  <Grid container md={12} xs={12}>
                                    <Grid item md={2} xs={12}>
                                      <h5>+ 비밀번호 최종 변경일 기준.</h5>
                                    </Grid>
                                    <Grid container md={2} xs={12} className="align-items-center">
                                      <Grid item md={6} xs={12} className="text-center">
                                        <FormControl
                                            size="small"
                                            fullWidth
                                            variant="outlined"
                                            defaultValue=""
                                        >
                                          <Select>
                                              <MenuItem value="1">1</MenuItem>
                                              <MenuItem value="2">2</MenuItem>
                                              <MenuItem value="3">3</MenuItem>
                                              <MenuItem value="4">4</MenuItem>
                                              <MenuItem value="5">5</MenuItem>
                                              <MenuItem value="6">6</MenuItem>
                                              <MenuItem value="7">7</MenuItem>
                                              <MenuItem value="8">8</MenuItem>
                                              <MenuItem value="9">9</MenuItem>
                                              <MenuItem value="10">10</MenuItem>
                                              <MenuItem value="11">11</MenuItem>
                                              <MenuItem value="12">12</MenuItem>
                                          </Select>
                                        </FormControl>
                                      </Grid>
                                      <Grid item md={6} xs={12} className="text-center">
                                        <TextField
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            label="12 개월"
                                        />
                                      </Grid>
                                    </Grid>
                                    <Grid item md={2} xs={12} className="text-center">
                                      <h5>+ 마다 로그인 시 안내.</h5>
                                    </Grid>
                                  </Grid>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>비밀번호 변경 재 안내 주기</TableCell>
                                <TableCell alignItems="center" >
                                  <Grid container md={12} xs={12}>
                                    <Grid container md={2} xs={12} className="align-items-center">
                                      <Grid item md={6} xs={12} className="text-center">
                                        <FormControl
                                            size="small"
                                            fullWidth
                                            variant="outlined"
                                            defaultValue=""
                                        >
                                          <Select>
                                              <MenuItem value="1">1</MenuItem>
                                              <MenuItem value="2">2</MenuItem>
                                              <MenuItem value="3">3</MenuItem>
                                              <MenuItem value="4">4</MenuItem>
                                              <MenuItem value="5">5</MenuItem>
                                              <MenuItem value="6">6</MenuItem>
                                              <MenuItem value="7">7</MenuItem>
                                              <MenuItem value="8">8</MenuItem>
                                              <MenuItem value="9">9</MenuItem>
                                              <MenuItem value="10">10</MenuItem>
                                              <MenuItem value="11">11</MenuItem>
                                              <MenuItem value="12">12</MenuItem>
                                          </Select>
                                        </FormControl>
                                      </Grid>
                                      <Grid item md={6} xs={12} className="text-center">
                                        <TextField
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            label="12 개월"
                                        />
                                      </Grid>
                                    </Grid>
                                    <Grid item md={2} xs={12} className="text-center">
                                        <h5> 마다 로그인 시 재 안내</h5>
                                    </Grid>
                                  </Grid>
                                  <Grid spacing={2} item md={12} xs={12} className="mt-20">
                                    <Grid item md={12} xs={12}>
                                      <h5>+ 비밀번호 변경안내 화면에서 [다음에 변경하기] 선택 시 다시 안내 할 기간을 설정.</h5>
                                    </Grid>
                                  </Grid>
                                </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </Grid>
                    </Grid>

                    <Grid item md={12} xs={12}>
                      <h5>[비밀번호변경 재안내주기] </h5>
                    </Grid>  
                    <Grid spacing={2} item md={12} xs={12}>
                        <Grid item md={12} xs={12}>
                          <h5>* 운영자 및 회원이 관리자화면 / 쇼핑몰의 비밀번호변경안내 화면에서 [다음에 변경하기] 클릭 시 비밀번호변경안내가 재 노출 되는 주기임.</h5>
                        </Grid>
                        <Grid item md={12} xs={12}>
                          <h5>* 방송통신위원회 고시 [개인정보의 기술적/관리적 보호조치 기준]에 따라, 정보통신서비스 제공자 등은 개인정보 취급자를 대상으로 비밀번호에 유효기간을 설정하여 6개월에 1회 이상 변경하도록 안내.</h5>
                        </Grid>
                      </Grid>
                </Grid>

                <Grid container spacing={3} className="mt-20">
                  <Grid item md={12} xs={12}>
                    <Button
                      form="form-submit"
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                      disabled={this.state.isProcessing}
                      startIcon={
                        this.state.isProcessing ? (
                          <CircularProgress color="white" size="1rem" />
                        ) : (
                          <SaveIcon fontSize="small" className="mr-10" />
                        )
                      }
                    >
                      저장
                    </Button>
                  </Grid>
                </Grid>
              </form>
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

export default withSnackbar(connect(mapStateToProps, null)(PassReset));