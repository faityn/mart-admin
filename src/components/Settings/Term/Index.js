import React from "react";
import SwipeableViews from 'react-swipeable-views';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { GET_TERM, SAVE_TERM } from "../../Queries/Queries";
import { withSnackbar } from "notistack";
import PageTitle from "../../../core/common/Partials/PageTitle";
import { connect } from "react-redux";
import SubjectIcon from '@material-ui/icons/Subject';
import SaveIcon from "@material-ui/icons/Save";
import { FormControlLabel, CircularProgress, Grid, Button, TextField, FormControl, Checkbox, InputAdornment, CardContent} from "@material-ui/core";
import CKEditor from "ckeditor4-react";

class Term extends React.Component {
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
   * @override
   */
  async componentDidMount() {
    this._isMounted = true;

    await this.props.apolloClient.httpClient
      .query({
        query: GET_TERM,
      })
      .then((result) => {
        this.setState({
          text: result.data.getTerm,
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
   * @summary Handle submit form
   * @param {MouseEvent} event
   */
  async onHandleSubmit(event) {
    event.preventDefault();

    if (this.state.isProcessing) return;

    // Form data
    const formData = new FormData(event.target);

    // Form data to object
    let termInput = {
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
        mutation: SAVE_TERM,
        variables: {
          termInput: termInput,
        },
      })
      .then((result) => {
        if (result.data.saveTerm.statusCode === 200) {
          this.props.enqueueSnackbar(
            "Terms and Conditions has been successfully updated.",
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
              menuName="약관 및 개인정보처리"
              title="약관 및 개인정보처리"
              icon={<SubjectIcon />}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item md={12}>
            <div className="card mt-20">
              <Paper>
                <Tabs
                  textColor="primary"
                  value={this.state.value}
                  onChange={this.handleChangeTab}
                  variant="fullWidth"
                >
                  <Tab label="이용약관" {...this.tabProps(0)} />
                  <Tab label="개인정보처리방침" {...this.tabProps(1)} />
                  <Tab label="개인정보 제3자 제공동의" {...this.tabProps(2)} />
                  <Tab label="위치기반 서비스 이용약관" {...this.tabProps(3)} />
                  <Tab label="전자금융거래 이용약관" {...this.tabProps(4)} />
                  <Tab label="개인정보수집 동의항목 설정" {...this.tabProps(5)} />
                  <Tab label="공급사-이용약관" {...this.tabProps(6)} />
                </Tabs> 
              </Paper>
              <SwipeableViews
                index={this.state.value}
              > 
                <div value={this.state.value} index={0} className="mt-20">
                  <CardContent>
                    <form id="form-submit" onSubmit={this.onHandleSubmit}>
                      <Grid container md={12} xs={12}> 
                        <Grid container spacing={2} className="align-items-center mt-20">
                            <Grid item md={2} xs={12}>
                              <h5>약관내용</h5>
                            </Grid>
                            <Grid item md={10} xs={12}>
                              <FormControl fullWidth>
                                <CKEditor
                                  type="classic"
                                  name="term"
                                />
                                <textarea
                                  name="term"
                                  style={{ display: "none" }}
                                />
                              </FormControl>
                            </Grid>  
                        </Grid>

                        <Grid container spacing={2} className="align-items-center mt-20">
                            <Grid item md={2} xs={12}>
                              <h5>약관적용일</h5>
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <Grid container spacing={2}>
                                <Grid item md={3} xs={6}>
                                  <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    name="year"
                                    placeholder="0"
                                    InputProps={{ endAdornment: (<InputAdornment position="end">년</InputAdornment>),}}
                                  />
                                </Grid>
                                <Grid item md={3} xs={6} style={{marginLeft: "10px"}}>
                                  <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    name="month"
                                    placeholder="0"
                                    InputProps={{ endAdornment: (<InputAdornment position="end">원</InputAdornment>),}}
                                  />
                                </Grid>
                                <Grid item md={3} xs={6} style={{marginLeft: "10px"}}>
                                  <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    name="day"
                                    placeholder="0"
                                    InputProps={{ endAdornment: (<InputAdornment position="end">원</InputAdornment>),}}
                                  />
                                </Grid>
                              </Grid>
                          </Grid>
                        </Grid>
                                          
                        <Grid container spacing={3} className="align-items-center mt-20">
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
                      </Grid>
                    </form>
                  </CardContent>
                </div>
                <div value={this.state.value} index={1} className="mt-20">
                  <CardContent>
                    <form id="form-submit" onSubmit={this.onHandleSubmit}>
                      <Grid container md={12} xs={12}> 
                        <Grid container spacing={2} className="align-items-center mt-20">
                            <Grid item md={2} xs={12}>
                              <h5>개인정보처리방침</h5>
                            </Grid>
                            <Grid item md={10} xs={12}>
                              <FormControl fullWidth>
                                <CKEditor
                                  type="classic"
                                  name="privacy_term"
                                />
                                <textarea
                                  name="privacy_term"
                                  style={{ display: "none" }}
                                />
                              </FormControl>
                            </Grid>  
                        </Grid>

                        <Grid container spacing={2} className="align-items-center mt-20">
                            <Grid item md={2} xs={12}>
                              <h5>보호 책임자 이름</h5>
                            </Grid>
                            <Grid item md={4} xs={12}>
                              <TextField
                                fullWidth
                                label="이름"
                                size="small"
                                variant="outlined"
                                name="privacy_user_name"
                              />
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} className="align-items-center mt-10">
                            <Grid item md={2} xs={12}>
                              <h5>보호 책임자 직책</h5>
                            </Grid>
                            <Grid item md={4} xs={12}>
                              <TextField
                                fullWidth
                                label="직책"
                                size="small"
                                variant="outlined"
                                name="privacy_user_role"
                              />
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} className="align-items-center mt-10">
                            <Grid item md={2} xs={12}>
                              <h5>보호 책임자 부서</h5>
                            </Grid>
                            <Grid item md={4} xs={12}>
                              <TextField
                                fullWidth
                                label="부서"
                                size="small"
                                variant="outlined"
                                name="privacy_user_department"
                              />
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} className="align-items-center mt-10">
                            <Grid item md={2} xs={12}>
                              <h5>보호 책임자 전화번호</h5>
                            </Grid>
                            <Grid item md={4} xs={12}>
                              <TextField
                                fullWidth
                                label="전화번호"
                                size="small"
                                variant="outlined"
                                name="privacy_user_phone"
                              />
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} className="align-items-center mt-10">
                            <Grid item md={2} xs={12}>
                              <h5>보호 책임자 이메일</h5>
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <Grid container spacing={2}>
                                <Grid item md={7} xs={6}>
                                  <TextField
                                    fullWidth
                                    label="이메일"
                                    size="small"
                                    variant="outlined"
                                    name="privacy_user_mail_1"
                                  />
                                </Grid>
                                <Grid item md={1} xs={6} className="align-items-center mt-20">
                                    <div className="text-center">@</div>
                                </Grid>
                                <Grid item md={4} xs={6}>
                                  <TextField
                                    fullWidth
                                    label="이메일"
                                    size="small"
                                    variant="outlined"
                                    name="privacy_user_mail_2"
                                  />
                                </Grid>
                              </Grid>
                          </Grid>
                        </Grid>
                                          
                        <Grid container spacing={3} className="align-items-center mt-20">
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
                      </Grid>
                    </form>
                  </CardContent>
                </div>  
                <div value={this.state.value} index={2} className="mt-20">
                  <CardContent>
                    <form id="form-submit" onSubmit={this.onHandleSubmit}>
                      <Grid container spacing={3} className="align-items-center mt-20">
                        <Grid item md={2} xs={12}>
                          <h5>약관내용</h5>
                        </Grid>
                        <Grid item md={10} xs={12}>
                          <FormControl fullWidth>
                            <CKEditor
                              type="classic"
                              name="priavacy_third_term"
                            />
                            <textarea
                              name="priavacy_third_term "
                              style={{ display: "none" }}
                            />
                          </FormControl>
                        </Grid>
                      </Grid>

                      <Grid container spacing={3} className="align-items-center mt-20">
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
                  </CardContent>
                </div>
                <div value={this.state.value} index={3} className="align-items-center mt-20">
                  <CardContent>
                    <form id="form-submit" onSubmit={this.onHandleSubmit}>
                      <Grid container spacing={3} className="align-items-center mt-20">
                        <Grid item md={2} xs={12}>
                          <h5>약관내용</h5>
                        </Grid>
                        <Grid item md={10} xs={12}>
                          <FormControl fullWidth>
                            <CKEditor
                              type="classic"
                              name="location_term"
                            />
                            <textarea
                              name="location_term"
                              style={{ display: "none" }}
                            />
                          </FormControl>
                        </Grid>
                      </Grid>

                      <Grid container spacing={3} className="align-items-center mt-20">
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
                  </CardContent>
                </div>
                <div value={this.state.value} index={4} className="mt-20">
                  <CardContent>
                    <form id="form-submit" onSubmit={this.onHandleSubmit}>
                      <Grid container spacing={3} className="align-items-center mt-20">
                        <Grid item md={2} xs={12}>
                          <h5>약관내용</h5>
                        </Grid>
                        <Grid item md={10} xs={12}>
                          <FormControl fullWidth>
                            <CKEditor
                              type="classic"
                              name="financial_term"
                            />
                            <textarea
                              name="financial_term"
                              style={{ display: "none" }}
                            />
                          </FormControl>
                        </Grid>
                      </Grid>

                      <Grid container spacing={3} className="align-items-center mt-20">
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
                  </CardContent>
                </div>
                <div value={this.state.value} index={5} className="mt-20">
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid container spacing={2} className="align-items-center mt-20" md={6} xs={12}>
                        <form id="form-submit" onSubmit={this.onHandleSubmit}>
                          <Grid item md={12} xs={12}>
                            <h5>[필수] 개인정보 수집, 이용 동의</h5>
                          </Grid>
                          <Grid container spacing={3} className="mt-20">
                            <Grid item md={2} xs={12}>
                              <h5>약관내용</h5>
                            </Grid>
                            <Grid item md={10} xs={12}>
                              <FormControl fullWidth>
                                <CKEditor
                                  type="classic"
                                  name="location_term"
                                />
                                <textarea
                                  name="location_term"
                                  style={{ display: "none" }}
                                />
                              </FormControl>
                            </Grid>
                          </Grid>

                          <Grid container spacing={3} className="align-items-center mt-20">
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
                      </Grid>

                      <Grid container spacing={2} className="align-items-center mt-20" md={6} xs={12}>
                        <form id="form-submit" onSubmit={this.onHandleSubmit}>
                          <Grid item md={12} xs={12}>
                            <h5>[필수] 개인정보 수집, 이용 동의</h5>
                          </Grid>
                          <Grid container spacing={3} className="mt-20">
                            <Grid item md={2} xs={12}>
                              <h5>사용여부</h5>
                            </Grid>
                            <Grid item md={10} xs={12}>
                              <Grid container spacing={2} className="mt-20">
                                <Grid item md={2} xs={12}>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        name="active"
                                        color="primary"
                                        value={false}
                                      />
                                    }
                                    label="사용"
                                  />
                                </Grid>
                                <Grid item md={4} xs={12}>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        name="active"
                                        color="primary"
                                        value={true}
                                      />
                                    }
                                    label="사용하지 않음"
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid container spacing={3} className="align-items-center mt-20">
                            <Grid item md={2} xs={12}>
                              <h5>약관내용</h5>
                            </Grid>
                            <Grid item md={10} xs={12}>
                              <FormControl fullWidth>
                                <CKEditor
                                  type="classic"
                                  name="location_term"
                                />
                                <textarea
                                  name="location_term"
                                  style={{ display: "none" }}
                                />
                              </FormControl>
                            </Grid>
                          </Grid>

                          <Grid container spacing={3} className="align-items-center mt-20">
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
                      </Grid>
                    </Grid>
                  </CardContent>
                </div>
                <div value={this.state.value} index={6} className="align-items-center mt-20">
                  <CardContent>
                    <form id="form-submit" onSubmit={this.onHandleSubmit}>
                      <Grid container md={12} xs={12}> 
                        <Grid container spacing={2} className="mt-20">
                            <Grid item md={2} xs={12}>
                              <h5>약관내용</h5>
                            </Grid>
                            <Grid item md={10} xs={12}>
                              <FormControl fullWidth>
                                <CKEditor
                                  type="classic"
                                  name="supply_term"
                                />
                                <textarea
                                  name="supply_term"
                                  style={{ display: "none" }}
                                />
                              </FormControl>
                            </Grid>  
                        </Grid>

                        <Grid container spacing={2} className="align-items-center mt-20">
                            <Grid item md={2} xs={12}>
                              <h5>약관적용일</h5>
                            </Grid>
                            <Grid item md={6} xs={12}>
                              <Grid container spacing={2}>
                                <Grid item md={3} xs={6}>
                                  <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    name="supply_year"
                                    placeholder="0"
                                    InputProps={{ endAdornment: (<InputAdornment position="end">년</InputAdornment>),}}
                                  />
                                </Grid>
                                <Grid item md={3} xs={6} style={{marginLeft: "10px"}}>
                                  <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    name="supply_month"
                                    placeholder="0"
                                    InputProps={{ endAdornment: (<InputAdornment position="end">월</InputAdornment>),}}
                                  />
                                </Grid>
                                <Grid item md={3} xs={6} style={{marginLeft: "10px"}}>
                                  <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    name="supply_day"
                                    placeholder="0"
                                    InputProps={{ endAdornment: (<InputAdornment position="end">일</InputAdornment>),}}
                                  />
                                </Grid>
                              </Grid>
                          </Grid>
                        </Grid>
                                          
                        <Grid container spacing={3} className="align-items-center mt-20">
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
                      </Grid>
                    </form>
                  </CardContent>
                </div>
              </SwipeableViews> 
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

export default withSnackbar(connect(mapStateToProps, null)(Term));
