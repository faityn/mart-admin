import React from "react";
import PageTitle from "../../../core/common/Partials/PageTitle";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import SaveIcon from "@material-ui/icons/Save";
import SubjectIcon from '@material-ui/icons/Subject';
import SwipeableViews from 'react-swipeable-views';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { CircularProgress, Grid, Button, Table, TableBody, TableRow, TableCell, TextField, FormControlLabel, Select, MenuItem, FormControl, Checkbox, Radio, InputLabel, Link} from "@material-ui/core";

class SMSConfig extends React.Component {
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
    this.handleChangeTab = this.handleChangeTab.bind(this);

    this._isMounted = false;
  } 

  /**
   * @summary Handle tabs on change
   * @param {int} newValue 
   */
  handleChangeTab(event, newValue) {
    this.setState({
      value: newValue
    });
  };

  /**
   * @summary Tab attributes
   * @param {int} index 
   */
  tabProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
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
              menuName="SMS 설정"
              title="SMS 설정"
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
                    <h5>SMS 설정</h5>
                  </Grid>
                  <Grid container spacing={3}>
                    <Grid item md={12} xs={12}>
                      <Table className="mail_table">
                        <TableBody>
                          <TableRow>
                            <TableCell>SMS 잔여 포인트</TableCell>
                            <TableCell>
                              <Grid container md={10} xs={12}>
                                <Grid item md={1} xs={12}>
                                  <InputLabel>000.0 포인트</InputLabel>
                                </Grid>
                                <Grid item md={2} xs={12}>
                                  <Button
                                    variant="contained"
                                    size="small"
                                    color="primary">
                                    충전하기
                                  </Button>
                                </Grid>
                              </Grid>
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell>SMS 인증번호</TableCell>
                            <TableCell>
                              <Grid container md={6} xs={12}>
                                <Grid item md={2} xs={12}>
                                  <Button
                                    variant="contained"
                                    size="small"
                                    color="primary">
                                    계정 설정 저장
                                  </Button>
                                </Grid>
                                <Grid item md={2} xs={12}>
                                  <Button
                                    variant="contained"
                                    size="small"
                                    color="primary">
                                    XX톡 바로가기
                                  </Button>
                                </Grid>
                              </Grid>
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell>SMS 발신번호</TableCell>
                            <TableCell>
                              <Grid container md={8} xs={12}>
                                <Grid item md={2} xs={12}>
                                  <InputLabel>SMS 발신번호를 선택.</InputLabel>
                                </Grid>
                                <Grid md={4} xs={12}>
                                  <Link>발신번호 선택하기</Link>
                                </Grid>
                              </Grid>
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell>90 Byte 초과시메시지 전송 방법</TableCell>
                            <TableCell>
                              <Grid container md={10} xs={12}>
                                <Grid item md={3} xs={12}>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        name="active"
                                        color="primary"
                                        value={true}
                                      />
                                    }
                                    label="90byte 까지만 SMS 발송"
                                  />
                                </Grid>
                                <Grid item md={2} xs={12}>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        name="active"
                                        color="primary"
                                        value={true}
                                      />
                                    }
                                    label="분할 SMS 발송"
                                  />
                                </Grid>
                                <Grid item md={2} xs={12}>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        name="active"
                                        color="primary"
                                        value={true}
                                      />
                                    }
                                    label="LMS 발송"
                                  />
                                </Grid>
                              </Grid>
                            </TableCell>
                          </TableRow>

                          <TableRow>
                            <TableCell>080 수신거부 번호</TableCell>
                            <TableCell>
                              <Grid item md={12} xs={12}>
                                <h5>광고성 문자의 경우 메시지가 시작되는 부분에 (광고) 표시, 메시지가 끝나는 부분에 무료수신거부가 포함되어야 함</h5>
                              </Grid>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </Grid>
                  </Grid>

                  <Grid item md={12} xs={12}>
                    <h5>SMS 발송 조건 / 문구 설정</h5>
                  </Grid>
                  
                  <Grid item md={12} xs={12}>
                    <Paper>
                      <Tabs
                        textColor="primary"
                        value={this.state.value}
                        onChange={this.handleChangeTab}
                        variant="fullWidth"
                      >
                        <Tab label="주문배송관련" {...this.tabProps(0)} />
                        <Tab label="회원관련" {...this.tabProps(1)} />
                        <Tab label="쿠폰/프로모션관련" {...this.tabProps(2)} />
                        <Tab label="게시물등록 알림" {...this.tabProps(3)} />
                      </Tabs> 
                    </Paper>
                    
                    <SwipeableViews index={this.state.value}> 
                      <div value={this.state.value} index={0} className="mt-12">
                        <Table className="order_table">
                          <TableBody>
                            <TableRow>
                              <TableCell rowSpan={2} width="20%">발송항목</TableCell>
                              <TableCell rowSpan={2} width="20%">발송종류</TableCell>
                              <TableCell className="text-center" colSpan={3}>발송대상 및 SMS 문구설정</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell className="text-center" width="20%">회원</TableCell>
                              <TableCell className="text-center" width="20%">본사 운영자</TableCell>
                              <TableCell className="text-center" width="20%">공급사 운영자</TableCell>
                            </TableRow>

                            <TableRow>
                              <TableCell style={{textAlign: "left"}}><strong>주문접수</strong><br/>(무통장 입금 주문 건의 주문접수 시)</TableCell>
                              <TableCell></TableCell>
                              <TableCell>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      name="active"
                                      color="primary"
                                      value={true}
                                      defaultChecked={true}
                                    />
                                  }
                                  label="자동발송"
                                />
                                <textarea value="{(rc_mailnum)}{orderName}발송{orderNo}발송"></textarea>
                              </TableCell>
                              <TableCell>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      name="active"
                                      color="primary"
                                      value={true}
                                    />
                                  }
                                  label="자동발송"
                                />
                                <textarea value="{(rc_mailnum)}{orderName}발송{orderNo}발송"></textarea>
                              </TableCell>
                              <TableCell style={{color: "#FF0000"}}><strong>회원 전용</strong></TableCell>
                            </TableRow>

                            <TableRow>
                              <TableCell style={{textAlign: "left"}}><strong>입금확인</strong><br/>(무통장 입금 주문 건의 입금확인 및 카드결제 시)</TableCell>
                              <TableCell>
                                <Grid container md={12} xs={12} style={{textAlign: "center"}}>
                                  <Grid item md={3} xs={12} style={{textAlign: "center"}}>최근</Grid>
                                  <Grid item md={4} xs={12} style={{textAlign: "center"}}>
                                    <FormControl
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                    >
                                      <Select>
                                        <MenuItem value="1">1일</MenuItem>
                                        <MenuItem value="2">2일</MenuItem>
                                        <MenuItem value="3" selected={true}>3일</MenuItem>
                                        <MenuItem value="4">4일</MenuItem>
                                        <MenuItem value="5">5일</MenuItem>
                                        <MenuItem value="6">6일</MenuItem>
                                        <MenuItem value="7">7일</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </Grid>
                                  <Grid item md={4} xs={12} style={{textAlign: "center"}}>주문건만 발송</Grid>
                                </Grid>
                              </TableCell>
                              <TableCell>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      name="active"
                                      color="primary"
                                      value={true}
                                      defaultChecked={true}
                                    />
                                  }
                                  label="자동발송"
                                />
                                <textarea value="{(rc_mailnum)}{orderName}발송{orderNo}발송"></textarea>
                              </TableCell>
                              <TableCell>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      name="active"
                                      color="primary"
                                      value={true}
                                    />
                                  }
                                  label="자동발송"
                                />
                                <textarea value="{(rc_mailnum)}{orderName}발송{orderNo}발송"></textarea>
                              </TableCell>
                              <TableCell>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      name="active"
                                      color="primary"
                                      value={true}
                                    />
                                  }
                                  label="자동발송"
                                />
                                <textarea value="{(rc_mailnum)}{orderName}발송{orderNo}발송"></textarea>
                              </TableCell>
                            </TableRow>

                            <TableRow>
                              <TableCell style={{textAlign: "left"}}><strong>입금요청</strong><br/>(무통장 입금 주문 건의 주문접수 시)</TableCell>
                              <TableCell>
                                <Grid container md={12} xs={12} style={{textAlign: "center"}}>
                                  <Grid item md={3} xs={12} style={{textAlign: "center"}}>최근</Grid>
                                  <Grid item md={4} xs={12} style={{textAlign: "center"}}>
                                    <FormControl
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                    >
                                      <Select>
                                        <MenuItem value="1">1일</MenuItem>
                                        <MenuItem value="2">2일</MenuItem>
                                        <MenuItem value="3" selected={true}>3일</MenuItem>
                                        <MenuItem value="4">4일</MenuItem>
                                        <MenuItem value="5">5일</MenuItem>
                                        <MenuItem value="6">6일</MenuItem>
                                        <MenuItem value="7">7일</MenuItem>
                                      </Select>
                                    </FormControl>
                                  </Grid>
                                  <Grid item md={4} xs={12} style={{textAlign: "center"}}>주문건만 발송</Grid>
                                </Grid>
                                <Grid item md={12} xs={12} style={{textAlign: "center"}}>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        name="active"
                                        color="primary"
                                        value={true}
                                      />
                                    }
                                    label="주문  후 재 발송"
                                  />
                                </Grid>
                              </TableCell>
                              <TableCell>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      name="active"
                                      color="primary"
                                      value={true}
                                      defaultChecked={true}
                                    />
                                  }
                                  label="자동발송"
                                />
                                <textarea value="{(rc_mailnum)}{orderName}발송{orderNo}발송"></textarea>
                              </TableCell>
                              <TableCell style={{color: "#FF0000"}}><strong>회원 전용</strong></TableCell>
                              <TableCell style={{color: "#FF0000"}}><strong>회원 전용</strong></TableCell>
                            </TableRow>

                            <TableRow>
                              <TableCell style={{textAlign: "left"}}><strong>상품배송 안내</strong><br/>(배송중으로 배송상태 변경 시)</TableCell>
                              <TableCell><strong>최근  주문건만 발송 야간시간에도 발송</strong><br/>(정보통신망법에 의해 08:00 ~ 21:00 에만 발송)</TableCell>
                              <TableCell>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      name="active"
                                      color="primary"
                                      value={true}
                                      defaultChecked={true}
                                    />
                                  }
                                  label="자동발송"
                                />
                                <textarea value="{(rc_mailnum)}{orderName}발송{orderNo}발송"></textarea>
                              </TableCell>
                              <TableCell>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      name="active"
                                      color="primary"
                                      value={true}
                                    />
                                  }
                                  label="자동발송"
                                />
                                <textarea value="{(rc_mailnum)}{orderName}발송{orderNo}발송"></textarea>
                              </TableCell>
                              <TableCell>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      name="active"
                                      color="primary"
                                      value={true}
                                    />
                                  }
                                  label="자동발송"
                                />
                                <textarea value="{(rc_mailnum)}{orderName}발송{orderNo}발송"></textarea>
                              </TableCell>
                            </TableRow>

                            <TableRow>
                              <TableCell style={{textAlign: "left"}}><strong>송장번호 안내</strong><br/>(배송중으로 배송상태 변경 시)</TableCell>
                              <TableCell><strong>최근  주문건만 발송 야간시간에도 발송</strong><br/>(정보통신망법에 의해 08:00 ~ 21:00 에만 발송)</TableCell>
                              <TableCell>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      name="active"
                                      color="primary"
                                      value={true}
                                      defaultChecked={true}
                                    />
                                  }
                                  label="자동발송"
                                />
                                <textarea value="{(rc_mailnum)}{orderName}발송{orderNo}발송"></textarea>
                              </TableCell>
                              <TableCell>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      name="active"
                                      color="primary"
                                      value={true}
                                    />
                                  }
                                  label="자동발송"
                                />
                                <textarea value="{(rc_mailnum)}{orderName}발송{orderNo}발송"></textarea>
                              </TableCell>
                              <TableCell>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      name="active"
                                      color="primary"
                                      value={true}
                                    />
                                  }
                                  label="자동발송"
                                />
                                <textarea value="{(rc_mailnum)}{orderName}발송{orderNo}발송"></textarea>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                      <div value={this.state.value} index={1} className="mt-20">
                      </div>
                      <div value={this.state.value} index={2} className="mt-20">
                      </div>
                      <div value={this.state.value} index={3} className="mt-20">
                      </div>
                    </SwipeableViews>
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

export default withSnackbar(connect(mapStateToProps, null)(SMSConfig));