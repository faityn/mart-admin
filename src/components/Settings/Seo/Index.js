import React from "react";
import { GET_PRIVACY, SAVE_PRIVACY } from "../../Queries/Queries";
import PageTitle from "../../../core/common/Partials/PageTitle";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import SwipeableViews from 'react-swipeable-views';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SaveIcon from "@material-ui/icons/Save";
import SubjectIcon from '@material-ui/icons/Subject';
import { CircularProgress, Grid, Button, Table, TableBody, TableRow, TableCell, FormControl, FormControlLabel, TextField, Checkbox, Link} from "@material-ui/core";
import CKEditor from "ckeditor4-react";

class Seo extends React.Component {
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
              menuName="검색엔진 최적화(SEO) 설정"
              title="검색엔진 최적화(SEO) 설정"
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
                    <h4>검색로봇 정보수집 설정</h4>
                  </Grid>
                  <Table className="mail_table">
                    <TableBody>
                      <TableRow>
                          <TableCell>검색로봇 정보</TableCell>
                          <TableCell>검색로봇 접근제어상세설정(robots.txt)</TableCell>
                          <TableCell>
                            <Grid spacing={2} item md={12} xs={12} className="mt-20">
                              <Grid item md={12} xs={12}>
                                <FormControl fullWidth>
                                  <CKEditor
                                    type="classic"
                                    name="robot_txt"
                                    data="User-agent: *
                                    Disallow: /
                                    
                                    User-agent: Googlebot
                                    User-agent: Cowbot
                                    User-agent: NaverBot
                                    User-agent: Yeti
                                    User-agent: Daumoa
                                    Disallow: /admin/
                                    Disallow: /config/
                                    Disallow: /data/
                                    Disallow: /module/
                                    Disallow: /tmp/
                                    "
                                  />
                                  <textarea
                                    name="robot_txt"
                                    style={{ display: "none" }}
                                  />
                                </FormControl>
                              </Grid>
                            </Grid>
                          </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
              
                <Grid container spacing={2} className="mt-20" md={12} xs={12}>
                  <Grid item md={12} xs={12}>
                    <h4>주요 페이지 SEO 태그 설정</h4>
                    <p>※ 메인 페이지 및 기타페이지에 공통으로 적용. / “상품, 카테고리, 브랜드, 기획전, 게시판” 의 주요 페이지별 SEO 태그 설정을 하지 않았을 경우 공통 설정이 자동으로 적용.</p>
                  </Grid>
                  
                  <Grid spacing={2} md={12} xs={12} className="mt-20">
                    <Paper>
                      <Tabs
                        textColor="primary"
                        value={this.state.value}
                        onChange={this.handleChangeTab}
                        variant="fullWidth"
                      >
                        <Tab label="공통" {...this.tabProps(0)} />
                        <Tab label="상품" {...this.tabProps(1)} />
                        <Tab label="카테고리" {...this.tabProps(2)} />
                        <Tab label="브랜드" {...this.tabProps(3)} />
                        <Tab label="기획전" {...this.tabProps(4)} />
                        <Tab label="게시판" {...this.tabProps(5)} />
                      </Tabs> 
                    </Paper>
                    <SwipeableViews
                      index={this.state.value}
                    > 
                      <div value={this.state.value} index={0} className="mt-20">
                        <form id="form-submit" onSubmit={this.onHandleSubmit}>
                          <Grid container spacing={2} className="mt-20">
                            <Grid item md={2} xs={12}>
                              <h5>타이틀(Title)</h5>
                            </Grid>
                            <Grid item md={10} xs={12}>
                              <TextField
                                fullWidth
                                id="name-basic"
                                label="Title"
                                size="small"
                                variant="outlined"
                                name="title"/>
                            </Grid>
                          </Grid>
                          <Grid container spacing={2} className="mt-20">
                            <Grid item md={2} xs={12}>
                              <h5>메타태그 작성자(Author)</h5>
                            </Grid>
                            <Grid item md={10} xs={12}>
                              <TextField
                                fullWidth
                                id="name-basic"
                                label="Author"
                                size="small"
                                variant="outlined"
                                name="author"/>
                            </Grid>
                          </Grid>
                          <Grid container spacing={2} className="mt-20">
                            <Grid item md={2} xs={12}>
                              <h5>메타태그 설명(Description)</h5>
                            </Grid>
                            <Grid item md={10} xs={12}>
                              <TextField
                                fullWidth
                                id="name-basic"
                                label="Description"
                                size="small"
                                variant="outlined"
                                name="description"/>
                            </Grid>
                          </Grid>
                          <Grid container spacing={2} className="mt-20">
                            <Grid item md={2} xs={12}>
                              <h5>메타태그 키워드(Keywords)</h5>
                            </Grid>
                            <Grid item md={10} xs={12}>
                              <TextField
                                fullWidth
                                id="name-basic"
                                label="Keywords"
                                size="small"
                                variant="outlined"
                                name="keywords"/>
                            </Grid>
                          </Grid>
                        </form>
                      </div>
                      <div value={this.state.value} index={1} className="mt-20">
                        <form id="form-submit" onSubmit={this.onHandleSubmit}>
                          <Grid container spacing={3} className="mt-20">
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
                        </form>
                      </div>
                      <div value={this.state.value} index={2} className="mt-20">
                        <form id="form-submit" onSubmit={this.onHandleSubmit}>
                          <Grid container spacing={3} className="mt-20">
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
                        </form>
                      </div>
                      <div value={this.state.value} index={3} className="mt-20">
                        <form id="form-submit" onSubmit={this.onHandleSubmit}>
                          <Grid container spacing={3} className="mt-20">
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
                        </form>
                      </div>
                      <div value={this.state.value} index={4} className="mt-20">
                        <form id="form-submit" onSubmit={this.onHandleSubmit}>
                          <Grid container spacing={3} className="mt-20">
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
                        </form>
                      </div>
                      <div value={this.state.value} index={5} className="mt-20">
                        <form id="form-submit" onSubmit={this.onHandleSubmit}>
                          <Grid container spacing={3} className="mt-20">
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
                        </form>
                      </div>
                    </SwipeableViews>
                  </Grid>
                  
                  <Grid spacing={2} md={12} xs={12} className="mt-20">
                    <Grid item md={12} xs={12}>
                      <h5>오픈그래프/트위터 메타태그 기본설정</h5>
                    </Grid>
                    <Table className="mail_table">
                      <TableBody>
                        <TableRow>
                            <TableCell>대표 이미지</TableCell>
                            <TableCell>
                              <Grid container md={12} xs={12}>
                                <Grid item md={2} xs={12}>
                                  <Button
                                    variant="contained"
                                    size="small"
                                    color="primary"
                                  >
                                    찾아보기
                                  </Button>
                                </Grid>
                                <Grid item md={10} xs={12}>
                                  <TextField
                                    fullWidth
                                    label="이미지"
                                    size="small"
                                    variant="outlined"
                                    name="image"/>
                                </Grid>
                              </Grid>
                              <Grid item md={12} xs={12}>
                                <p>대표 이미지 사이즈는 최소 600pixel(픽셀) 이상, 파일형식은 jpg, gif, png만 등록. 페이스북에서 권장하는 미리보기 사이즈는 1200x627px이며 최소 권장 사이즈는 PC에서 400x209px, 모바일에서 560x292px</p>
                              </Grid>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>대표 제목(og:title, twitter:title)</TableCell>
                          <TableCell>
                            <Grid item md={12} xs={12}>
                                <TextField
                                  fullWidth
                                  label="제목"
                                  size="small"
                                  variant="outlined"
                                  name="title"/>
                            </Grid>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>대표 설명(og:description, twitter:description)</TableCell>
                          <TableCell>
                            <Grid item md={12} xs={12}>
                                <TextField
                                  fullWidth
                                  label="설명"
                                  size="small"
                                  variant="outlined"
                                  name="descritption"/>
                            </Grid>
                            <Grid item md={12} xs={12}>
                              <p>오픈그래프/트위터의 메타태그 설명으로 사용되며, 기본설정의 메타태그 설명과는 별개로 동작</p>
                            </Grid>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Grid>
                  
                  <Grid spacing={2} md={12} xs={12} className="mt-20">
                    <Grid item md={12} xs={12}>
                      <h5>페이지 경로 설정</h5>
                    </Grid>
                    <Table className="mail_table">
                      <TableBody>
                        <TableRow>
                            <TableCell>페이지 없음 경로설정</TableCell>
                            <TableCell>
                              <Grid container md={12} xs={12}>
                                <Grid item md={2} xs={12}>
                                  <p>오류페이지로 연결</p>
                                </Grid>
                                <Grid item md={2} xs={12}>
                                  <Button
                                    variant="contained"
                                    size="small"
                                    color="primary"
                                  >
                                    미리보기
                                  </Button>
                                </Grid>
                              </Grid>
                              <Grid item md={12} xs={12}>
                                <p>설정한 경로로 연결</p>
                              </Grid>
                              <Grid container md={12} xs={12}>
                                <Grid item md={2} xs={12}>
                                  <p>모바일 쇼핑몰</p>
                                </Grid>                        
                                <Grid item md={2} xs={12}>
                                  <p>https://xxxxxxxxxxx.com/</p>
                                </Grid>       
                                <Grid item md={8} xs={12}>                            
                                  <TextField
                                  fullWidth
                                  label="설명"
                                  size="small"
                                  variant="outlined"
                                  name="link"/>
                                </Grid>       
                              </Grid>
                            </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Grid>
                  
                  <Grid spacing={2} md={12} xs={12} className="mt-20">
                    <Grid item md={12} xs={12}>
                      <h5>연관채널 설정</h5>
                    </Grid>
                    <Table className="mail_table">
                      <TableBody>
                        <TableRow>
                            <TableCell>연관채널 1</TableCell>
                            <TableCell>
                              <Grid container md={12} xs={12}>
                                <Grid item md={10} xs={12}>                   
                                  <TextField
                                  fullWidth
                                  label="예: https://www.facebook.com"
                                  size="small"
                                  variant="outlined"
                                  name="url"/>
                                </Grid>
                                <Grid item md={2} xs={12}>
                                  <Button
                                    variant="contained"
                                    size="small"
                                    color="primary"
                                    className="ml-20"
                                  >
                                    + 추가
                                  </Button>
                                </Grid>
                              </Grid>
                            </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Grid>
                  
                  <Grid spacing={2} md={12} xs={12} className="mt-20">
                    <Grid item md={12} xs={12}>
                      <h5>기타 페이지 SEO 태그 설정</h5>
                    </Grid>
                    <Table className="mail_table">
                      <TableBody>
                        <TableRow>
                          <TableCell align="center">선택</TableCell>
                          <TableCell align="center">번호</TableCell>
                          <TableCell align="center">페이지 경로</TableCell>
                          <TableCell align="center">타이틀</TableCell>
                          <TableCell align="center">메타태그 설명</TableCell>
                          <TableCell align="center">수정</TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell align="center">
                            <FormControlLabel
                              control={
                                <Checkbox
                                  name="active"
                                  color="primary"
                                  value={false}
                                />
                              }
                            />
                          </TableCell>
                          <TableCell align="center">0000</TableCell>
                          <TableCell align="center"></TableCell>
                          <TableCell align="center"></TableCell>
                          <TableCell align="center"></TableCell>
                          <TableCell align="center"><Link>수정</Link></TableCell>
                        </TableRow>
                        
                        <TableRow>
                          <TableCell align="center">
                            <FormControlLabel
                              control={
                                <Checkbox
                                  name="active"
                                  color="primary"
                                  value={false}
                                />
                              }
                            />
                          </TableCell>
                          <TableCell align="center">1111</TableCell>
                          <TableCell align="center"></TableCell>
                          <TableCell align="center"></TableCell>
                          <TableCell align="center"></TableCell>
                          <TableCell align="center"><Link>수정</Link></TableCell>
                        </TableRow>
                        
                        <TableRow>
                          <TableCell align="center">
                            <FormControlLabel
                              control={
                                <Checkbox
                                  name="active"
                                  color="primary"
                                  value={false}
                                />
                              }
                            />
                          </TableCell>
                          <TableCell align="center">2222</TableCell>
                          <TableCell align="center"></TableCell>
                          <TableCell align="center"></TableCell>
                          <TableCell align="center"></TableCell>
                          <TableCell align="center"><Link>수정</Link></TableCell>
                        </TableRow>
                        
                        <TableRow>
                          <TableCell>
                            <Button
                              variant="contained"
                              size="small"
                              color="primary"
                            >
                              선택 삭제
                            </Button>
                          </TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              size="small"
                              color="primary"
                            >
                              페이지 추가
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
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

export default withSnackbar(connect(mapStateToProps, null)(Seo));
