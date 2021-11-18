import React from "react";
import PageTitle from "../../../core/common/Partials/PageTitle";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import SubjectIcon from '@material-ui/icons/Subject';
import SearchIcon from '@material-ui/icons/Search';
import ViewIcon from '@material-ui/icons/RemoveRedEye';
import SwipeableViews from 'react-swipeable-views';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Grid, Button, Table, TableBody, TableRow, TableCell, TextField, CardContent} from "@material-ui/core";
import PaginationMaterial from '@material-ui/lab/Pagination';

class LoginHistory extends React.Component {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    // state
    this.state = {
      isProcessing: false,
      text: null,
      isOpenModal: false,
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
              menuName="개인정보접속기록 조회"
              title="개인정보접속기록 조회"
              icon={<SubjectIcon />}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item md={12} alignItems="center">
            <div className="card mt-20">
              <Grid container spacing={2} md={8} xs={12} className="align-items-center">
                <Grid item md={2} xs={12}>
                  <h5>운영자 아이디</h5>
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                      fullWidth
                      label="아이디"
                      size="small"
                      variant="outlined"
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2} md={12} xs={12}>
                <Grid container md={6} xs={12} style={{paddingLeft: "8px"}} className="align-items-center">
                  <Grid item md={2} xs={12}>
                    <h5>검색기간</h5>
                  </Grid>
                  <Grid item md={3} xs={12} style={{marginLeft: "3.1rem"}}>
                    <TextField
                      fullWidth
                      size="small"  
                      variant="outlined"
                      type="datetime-local"
                      name="startDate"
                    />
                  </Grid>
                  <Grid item md={1} xs={12} className="text-center" alignItems="center">
                      <h5>~</h5>
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <TextField
                      fullWidth
                      size="small"
                      variant="outlined"
                      type="datetime-local"
                      name="endDate"
                    />
                  </Grid>
                </Grid>

                <Grid container md={4} xs={12} className="align-items-center">
                  <Grid item md={2} xs={12}>
                    <Button
                        fullWidth
                        size="medium"
                        variant="contained"
                        style={{border: "1px solid #cccbcb"}}
                    >오늘
                    </Button>
                  </Grid>
                  <Grid item md={2} xs={12} style={{paddingLeft: "5px"}}>
                    <Button
                        fullWidth
                        size="medium"
                        variant="contained"
                        color="primary"
                    >1주일
                    </Button>
                  </Grid>
                  <Grid item md={2} xs={12} style={{paddingLeft: "5px"}}>
                    <Button
                        fullWidth
                        size="medium"
                        variant="contained"
                        style={{border: "1px solid #cccbcb"}}
                    >15일
                    </Button>
                  </Grid>
                  <Grid item md={2} xs={12} style={{paddingLeft: "5px"}}>
                    <Button
                        fullWidth
                        size="medium"
                        variant="contained"
                        style={{border: "1px solid #cccbcb"}}
                    >1개월
                    </Button>
                  </Grid>
                  <Grid item md={2} xs={12} style={{paddingLeft: "5px"}}>
                    <Button
                        fullWidth
                        size="medium"
                        variant="contained"
                        style={{border: "1px solid #cccbcb"}}
                    >3개월
                    </Button>
                  </Grid>
                  <Grid item md={2} xs={12} style={{paddingLeft: "5px"}}>
                    <Button
                        fullWidth
                        size="medium"
                        variant="contained"
                        style={{border: "1px solid #cccbcb"}}
                    >1년
                    </Button>
                  </Grid>
                </Grid>
                
                <Grid item md={2} xs={12} className="align-items-center text-center">
                    <Button
                      size="medium"
                      variant="contained"
                      color="primary"
                      startIcon={<SearchIcon/>}
                    >검색</Button>
                </Grid> 
              </Grid>

              <Grid item md={12} xs={12} className="mt-20">
                <Paper>
                  <Tabs
                    textColor="primary"
                    value={this.state.value}
                    onChange={this.handleChangeTab}
                    variant="fullWidth"
                  >
                    <Tab label="회원정보 접속기록" {...this.tabProps(0)} />
                    <Tab label="운영자 정보 접속기록" {...this.tabProps(1)} />
                    <Tab label="로그인, 인증 기록" {...this.tabProps(2)} />
                  </Tabs> 
                </Paper>
                <SwipeableViews index={this.state.value}> 
                  <div value={this.state.value} index={0}>
                    <CardContent>
                      <Grid container spacing={3} md={12} xs={12} className="mt-20">
                        <Table className="order_table">
                          <TableBody>
                            <TableRow>
                              <TableCell className="text-center">접속일시</TableCell>
                              <TableCell className="text-center">접속IP</TableCell>
                              <TableCell className="text-center">운영자 아이디</TableCell>
                              <TableCell className="text-center">메뉴구분</TableCell>
                              <TableCell className="text-center">접속페이지(개인정보관련)</TableCell>
                              <TableCell className="text-center" width="10%">수행업무</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>2021-02-18 16:10:22</TableCell>
                              <TableCell>000.000.00.000</TableCell>
                              <TableCell>ceo001</TableCell>
                              <TableCell>회원</TableCell>
                              <TableCell>회원리스트</TableCell>
                              <TableCell>
                                <Button
                                    fullWidth
                                    size="medium"
                                    variant="contained"  
                                    color="primary"
                                    startIcon={<ViewIcon/>}>조회</Button>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </Grid>

                      <Grid container spacing={3} md={12} xs={12} className="mt-20">
                          <Grid item md={12} xs={12} className="align-items-center text-center">
                              <PaginationMaterial count={10} color="primary" />
                          </Grid>
                      </Grid>
                    </CardContent>
                  </div>
                  <div value={this.state.value} index={1}>
                    <CardContent>
                      <Grid container spacing={3} md={12} xs={12} className="mt-20">
                        <Table className="order_table">
                          <TableBody>
                            <TableRow>
                              <TableCell className="text-center">접속일시</TableCell>
                              <TableCell className="text-center">접속IP</TableCell>
                              <TableCell className="text-center">운영자 아이디</TableCell>
                              <TableCell className="text-center">접속페이지(개인정보관련)</TableCell>
                              <TableCell className="text-center" width="10%">수행업무</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>2021-02-18 16:10:22</TableCell>
                              <TableCell>000.000.00.000</TableCell>
                              <TableCell>ceo002</TableCell>
                              <TableCell>회원리스트</TableCell>
                              <TableCell>
                                <Button
                                    fullWidth
                                    size="medium"
                                    variant="contained"  
                                    color="primary"
                                    startIcon={<ViewIcon/>}>조회</Button>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </Grid>

                      <Grid container spacing={3} md={12} xs={12} className="mt-20">
                          <Grid item md={12} xs={12} className="align-items-center text-center">
                              <PaginationMaterial count={10} color="primary" />
                          </Grid>
                      </Grid>
                    </CardContent>
                  </div>  
                  <div value={this.state.value} index={2}>
                    <CardContent>
                      <Grid container spacing={3} md={12} xs={12} className="mt-20">
                        <Table className="order_table">
                          <TableBody>
                            <TableRow>
                              <TableCell className="text-center">접속일시</TableCell>
                              <TableCell className="text-center">접속IP</TableCell>
                              <TableCell className="text-center">운영자 아이디</TableCell>
                              <TableCell className="text-center" width="10%">수행업무</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>2021-02-18 16:10:22</TableCell>
                              <TableCell>000.000.00.000</TableCell>
                              <TableCell>ceo002</TableCell>
                              <TableCell>
                                <Button
                                    fullWidth
                                    size="medium"
                                    variant="contained"  
                                    color="primary"
                                    startIcon={<ViewIcon/>}>조회</Button>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </Grid>

                      <Grid container spacing={3} md={12} xs={12} className="mt-20">
                          <Grid item md={12} xs={12} className="align-items-center text-center">
                              <PaginationMaterial count={10} color="primary" />
                          </Grid>
                      </Grid>
                    </CardContent>
                  </div>
                </SwipeableViews>
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
  };
};

export default withSnackbar(connect(mapStateToProps, null)(LoginHistory));
