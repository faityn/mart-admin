import React from "react";
import PageTitle from "../../../core/common/Partials/PageTitle";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import SubjectIcon from '@material-ui/icons/Subject';
import ViewIcon from '@material-ui/icons/RemoveRedEye';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import ResetIcon from '@material-ui/icons/Refresh';
import SaveIcon from '@material-ui/icons/Save';
import {Grid, Button, Table, TableBody, TableRow, TableCell, FormControl, TextField, Select, MenuItem, InputLabel, FormControlLabel, Checkbox, RadioGroup, Radio,
  Dialog, DialogTitle, DialogContent, DialogActions, Divider} from "@material-ui/core";

class OperatorRole extends React.Component {
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
    this.onOpenModal = this.onOpenModal.bind(this);

    this._isMounted = false;
  }

  /**
   * @summary Open box
   * @param {event}
   */
  onOpenModal(e) {
      this.setState({
          isOpenModal: true,
      });
  }

  /**
   * @summary Close box
   * @param {event}
   */
  onCloseModal() {
      this.setState({ isOpenModal: false });
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
        <Grid container>
          <Grid item>
            <PageTitle
              menuName="운영자 권한 설정"
              title="운영자 권한 설정"
              icon={<SubjectIcon />}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item md={12}>
            <div className="card mt-20">
            <Grid container spacing={3} md={12} xs={12}>
              <Grid container md={6} xs={12}>
                <Grid container md={12} xs={12}>
                  <Grid item md={2} xs={12} className="align-items-center">
                      <h5>운영자 검색</h5>
                  </Grid>
                </Grid>
                <Grid container md={12} xs={12}>
                  <Table className="member_table">
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" width="10%"><strong>검색어</strong></TableCell>
                        <TableCell align="center">
                          <Grid container md={12} xs={12}>
                            <Grid item md={3} sm={4} xs={12} className="align-items-center">
                              <FormControl
                                  size="small"
                                  fullWidth
                                  variant="outlined"
                                  defaultValue=""
                              >
                                <InputLabel>통합검색</InputLabel>
                                <Select>
                                    <MenuItem value="name">관리자명</MenuItem>
                                    <MenuItem value="id">사용자ID </MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item md={6} xs={12} className="align-items-center" style={{paddingLeft: "10px"}}> 
                                <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item md={3} xs={12} style={{paddingLeft: "10px"}} className="align-items-center">
                              <Button
                                  fullWidth
                                  size="medium"
                                  variant="contained"
                                  color="primary"
                                  startIcon={<SearchIcon/>}
                              >검색</Button>
                            </Grid>
                          </Grid>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
                <Grid container md={12} xs={12} className="mt-20">
                  <Table className="order_table">
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" width="10%"><strong>번호</strong></TableCell>
                        <TableCell align="center" width="10%"><strong>선택</strong></TableCell>
                        <TableCell align="center"><strong>관리자구분</strong></TableCell>
                        <TableCell align="center"><strong>관리자명</strong></TableCell>
                        <TableCell align="center"><strong>사용자ID</strong></TableCell>
                        <TableCell align="center" width="20%"><strong>개별수정</strong></TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell align="center">1</TableCell>
                        <TableCell align="center">
                          <FormControlLabel
                            control={
                              <Checkbox
                                name="active"
                                color="primary"
                                value={true}
                              />
                            }
                            style={{marginLeft: "18%"}}
                          /></TableCell>
                        <TableCell align="center">총괄책임자</TableCell>
                        <TableCell align="center">ceo</TableCell>
                        <TableCell align="center">홍길동</TableCell>
                        <TableCell align="center">
                          <Button
                              size="small"
                              variant="contained"
                              color="primary"
                              startIcon={<EditIcon/>}
                          >권한보기</Button>
                        </TableCell>
                      </TableRow>
                      
                      <TableRow>
                        <TableCell align="center">2</TableCell>
                        <TableCell align="center">
                          <FormControlLabel
                            control={
                              <Checkbox
                                name="active"
                                color="primary"
                                value={true}
                              />
                            }
                            style={{marginLeft: "18%"}}
                          /></TableCell>
                        <TableCell align="center">총괄책임자</TableCell>
                        <TableCell align="center">ceo</TableCell>
                        <TableCell align="center">홍길동</TableCell>
                        <TableCell align="center">
                          <Button
                              size="small"
                              variant="contained"
                              color="primary"
                              startIcon={<EditIcon/>}
                          >권한보기</Button>
                        </TableCell>
                      </TableRow>
                      
                      <TableRow>
                        <TableCell align="center">3</TableCell>
                        <TableCell align="center">
                          <FormControlLabel
                            control={
                              <Checkbox
                                name="active"
                                color="primary"
                                value={true}
                              />
                            }
                            style={{marginLeft: "18%"}}
                          /></TableCell>
                        <TableCell align="center">총괄책임자</TableCell>
                        <TableCell align="center">ceo</TableCell>
                        <TableCell align="center">홍길동</TableCell>
                        <TableCell align="center">
                          <Button
                              size="small"
                              variant="contained"
                              color="primary"
                              startIcon={<EditIcon/>}
                          >권한보기</Button>
                        </TableCell>
                      </TableRow>
                      
                      <TableRow>
                        <TableCell align="center">4</TableCell>
                        <TableCell align="center">
                          <FormControlLabel
                            control={
                              <Checkbox
                                name="active"
                                color="primary"
                                value={true}
                              />
                            }
                            style={{marginLeft: "18%"}}
                          /></TableCell>
                        <TableCell align="center">총괄책임자</TableCell>
                        <TableCell align="center">ceo</TableCell>
                        <TableCell align="center">홍길동</TableCell>
                        <TableCell align="center">
                          <Button
                              size="small"
                              variant="contained"
                              color="primary"
                              startIcon={<EditIcon/>}
                          >권한보기</Button>
                        </TableCell>
                      </TableRow>
                      
                      <TableRow>
                        <TableCell align="center">5</TableCell>
                        <TableCell align="center">
                          <FormControlLabel
                            control={
                              <Checkbox
                                name="active"
                                color="primary"
                                value={true}
                              />
                            }
                            style={{marginLeft: "18%"}}
                          /></TableCell>
                        <TableCell align="center">총괄책임자</TableCell>
                        <TableCell align="center">ceo</TableCell>
                        <TableCell align="center">홍길동</TableCell>
                        <TableCell align="center">
                          <Button
                              size="small"
                              variant="contained"
                              color="primary"
                              startIcon={<EditIcon/>}
                          >권한보기</Button>
                        </TableCell>
                      </TableRow>
                      
                      <TableRow>
                        <TableCell align="center">6</TableCell>
                        <TableCell align="center">
                          <FormControlLabel
                            control={
                              <Checkbox
                                name="active"
                                color="primary"
                                value={true}
                              />
                            }
                            style={{marginLeft: "18%"}}
                          /></TableCell>
                        <TableCell align="center">총괄책임자</TableCell>
                        <TableCell align="center">ceo</TableCell>
                        <TableCell align="center">홍길동</TableCell>
                        <TableCell align="center">
                          <Button
                              size="small"
                              variant="contained"
                              color="primary"
                              startIcon={<EditIcon/>}
                          >권한보기</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
              </Grid> 
              <Grid container md={6} xs={12} style={{paddingLeft: "10px"}}>
                <Grid container md={12} xs={12}>
                  <Grid item md={2} xs={12} className="align-items-center">
                      <h5>메뉴 권한 설정</h5>
                  </Grid>
                </Grid>
                <Grid container md={12} xs={12}>
                  <Table className="member_table">
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" width="10%"><strong>권한 범위</strong></TableCell>
                        <TableCell align="center">
                          <Grid container md={12} xs={12}>
                            <Grid item md={3} xs={12}>
                                <RadioGroup aria-label="file" name="file">
                                    <FormControlLabel
                                        value="true"
                                        control={<Radio />}
                                        label="전체권한"
                                    />
                                </RadioGroup>
                            </Grid>
                            <Grid item md={3} xs={12}>
                                <RadioGroup aria-label="file" name="file">
                                    <FormControlLabel
                                        value="false"
                                        control={<Radio />}
                                        label="선택권한"
                                    />
                                </RadioGroup>
                            </Grid>
                          </Grid>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
                <Grid container md={12} xs={12} className="mt-20">
                  <Grid item md={3} xs={12}>
                    <Button
                        size="medium"
                        variant="contained"
                        color="primary"
                        startIcon={<ResetIcon/>}
                    >권한 초기화</Button>
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <FormControl
                        size="small"
                        fullWidth
                        variant="outlined"
                        defaultValue=""
                    >
                      <InputLabel>노출 메뉴 선택</InputLabel>
                      <Select>
                        <MenuItem value="1">전체 메뉴</MenuItem>
                        <MenuItem value="2">환경설정</MenuItem>
                        <MenuItem value="3">기본정보</MenuItem>
                        <MenuItem value="4">상품관리</MenuItem>
                        <MenuItem value="5">주문관리</MenuItem>
                        <MenuItem value="6">공급자(마트)관리</MenuItem>
                        <MenuItem value="7">앱 상점</MenuItem>
                        <MenuItem value="8">회원관리</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={5} xs={12} style={{paddingLeft: "10px"}}>
                    <FormControl
                        size="small"
                        fullWidth
                        variant="outlined"
                        defaultValue=""
                    >
                      <InputLabel>1차 메뉴 기준으로 보기</InputLabel>
                      <Select>
                        <MenuItem value="1">1차 메뉴 기준으로 보기</MenuItem>
                        <MenuItem value="2">2차 메뉴 기준으로 보기</MenuItem>
                        <MenuItem value="3">3차 메뉴 기준으로 보기</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid container md={12} xs={12} className="mt-20">
                  <Table className="order_table">
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" width="10%"><strong>선택</strong></TableCell>
                        <TableCell align="center" width="40%"><strong>메뉴명</strong></TableCell>
                        <TableCell align="center" width="30%"><strong>권한설정</strong></TableCell>
                        <TableCell align="center" width="20%"><strong>추가설정</strong></TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell align="center">
                          <FormControlLabel
                            control={
                              <Checkbox
                                name="active"
                                color="primary"
                                value={true}
                              />
                            }
                            style={{marginLeft: "18%"}}
                          />
                        </TableCell>
                        <TableCell align="center">환경설정</TableCell>
                        <TableCell align="center">
                          <FormControl
                              size="small"
                              fullWidth
                              variant="outlined"
                              defaultValue=""
                          >
                            <InputLabel>권한 없음</InputLabel>
                            <Select>
                              <MenuItem value="1">권한 없음</MenuItem>
                              <MenuItem value="2">보기</MenuItem>
                              <MenuItem value="3">보기 + 작성</MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                        <TableCell align="center">
                          <Button
                              size="small"
                              variant="contained"
                              color="primary"
                              startIcon={<ViewIcon/>}
                          >보기</Button>
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell align="center">
                          <FormControlLabel
                            control={
                              <Checkbox
                                name="active"
                                color="primary"
                                value={true}
                              />
                            }
                            style={{marginLeft: "18%"}}
                          />
                        </TableCell>
                        <TableCell align="left">기본정보</TableCell>
                        <TableCell align="center">
                          <FormControl
                              size="small"
                              fullWidth
                              variant="outlined"
                              defaultValue=""
                          >
                            <InputLabel>권한 없음</InputLabel>
                            <Select>
                              <MenuItem value="1">권한 없음</MenuItem>
                              <MenuItem value="2">보기</MenuItem>
                              <MenuItem value="3">보기 + 작성</MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                        <TableCell align="center"></TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell align="center">
                          <FormControlLabel
                            control={
                              <Checkbox
                                name="active"
                                color="primary"
                                value={true}
                              />
                            }
                            style={{marginLeft: "18%"}}
                          />
                        </TableCell>
                        <TableCell align="left">아니벌써 기본정보</TableCell>
                        <TableCell align="center">
                          <FormControl
                              size="small"
                              fullWidth
                              variant="outlined"
                              defaultValue=""
                          >
                            <InputLabel>권한 없음</InputLabel>
                            <Select>
                              <MenuItem value="1">권한 없음</MenuItem>
                              <MenuItem value="2">보기</MenuItem>
                              <MenuItem value="3">보기 + 작성</MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                        <TableCell align="center"></TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell align="center">
                          <FormControlLabel
                            control={
                              <Checkbox
                                name="active"
                                color="primary"
                                value={true}
                              />
                            }
                            style={{marginLeft: "18%"}}
                          />
                        </TableCell>
                        <TableCell align="left">상품관리</TableCell>
                        <TableCell align="center">
                          <FormControl
                              size="small"
                              fullWidth
                              variant="outlined"
                              defaultValue=""
                          >
                            <InputLabel>권한 없음</InputLabel>
                            <Select>
                              <MenuItem value="1">권한 없음</MenuItem>
                              <MenuItem value="2">보기</MenuItem>
                              <MenuItem value="3">보기 + 작성</MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                        <TableCell align="center">
                          <Button
                              size="small"
                              variant="contained"
                              color="primary"
                              startIcon={<ViewIcon/>}
                          >보기</Button>
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell align="center">
                          <FormControlLabel
                            control={
                              <Checkbox
                                name="active"
                                color="primary"
                                value={true}
                              />
                            }
                            style={{marginLeft: "18%"}}
                          />
                        </TableCell>
                        <TableCell align="left">주문관리</TableCell>
                        <TableCell align="center">
                          <FormControl
                              size="small"
                              fullWidth
                              variant="outlined"
                              defaultValue=""
                          >
                            <InputLabel>권한 없음</InputLabel>
                            <Select>
                              <MenuItem value="1">권한 없음</MenuItem>
                              <MenuItem value="2">보기</MenuItem>
                              <MenuItem value="3">보기 + 작성</MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                        <TableCell align="center">
                          <Button
                              size="small"
                              variant="contained"
                              color="primary"
                              startIcon={<ViewIcon/>}
                          >보기</Button>
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell align="center">
                          <FormControlLabel
                            control={
                              <Checkbox
                                name="active"
                                color="primary"
                                value={true}
                              />
                            }
                            style={{marginLeft: "18%"}}
                          />
                        </TableCell>
                        <TableCell align="left">공급자(마트) 관리</TableCell>
                        <TableCell align="center">
                          <FormControl
                              size="small"
                              fullWidth
                              variant="outlined"
                              defaultValue=""
                          >
                            <InputLabel>권한 없음</InputLabel>
                            <Select>
                              <MenuItem value="1">권한 없음</MenuItem>
                              <MenuItem value="2">보기</MenuItem>
                              <MenuItem value="3">보기 + 작성</MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                        <TableCell align="center">
                          <Button
                              size="small"
                              variant="contained"
                              color="primary"
                              startIcon={<ViewIcon/>}
                          >보기</Button>
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell align="center">
                          <FormControlLabel
                            control={
                              <Checkbox
                                name="active"
                                color="primary"
                                value={true}
                              />
                            }
                            style={{marginLeft: "18%"}}
                          />
                        </TableCell>
                        <TableCell align="left">앱 상점</TableCell>
                        <TableCell align="center">
                          <FormControl
                              size="small"
                              fullWidth
                              variant="outlined"
                              defaultValue=""
                          >
                            <InputLabel>권한 없음</InputLabel>
                            <Select>
                              <MenuItem value="1">권한 없음</MenuItem>
                              <MenuItem value="2">보기</MenuItem>
                              <MenuItem value="3">보기 + 작성</MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                        <TableCell align="center">
                          <Button
                              size="small"
                              variant="contained"
                              color="primary"
                              startIcon={<ViewIcon/>}
                          >보기</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
              <Grid item md={12} xs={12} className="mt-20" style={{textAlign: "center"}}>
                <Button
                    size="medium"
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon/>}
                >저장</Button>
              </Grid>
            </Grid>

            <Dialog
                open={this.state.isOpenModal}
                aria-labelledby="responsive-dialog-title"
                maxWidth="lg"
            >
                {/* Title */}
                <DialogTitle id="responsive-dialog-title">
                    <h4>제품 추가/수정</h4>
                </DialogTitle>
                <Divider />

                <DialogContent>
                  <form md={12} xs={12}>
                    <Grid spacing={2} alignItems="center">
                      <Grid container md={12} xs={12}>
                        <Grid md={2} xs={12} className="text-center">
                          <h5>사용자 ID</h5>
                        </Grid>
                        <Grid md={4} xs={12}>
                          <TextField
                              fullWidth
                              size="small"
                              variant="outlined"
                          /></Grid>
                        <Grid md={3} xs={12} className="text-center">
                          <h5>사용여부</h5>
                        </Grid>
                        <Grid md={3} xs={12}>
                          <FormControl
                              size="small"
                              fullWidth
                              variant="outlined"
                          >
                            <Select>
                                <MenuItem value="1">사용함</MenuItem>
                                <MenuItem value="0">사용 안함</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                      
                      <Grid container md={12} xs={12} className="mt-12">
                        <Grid md={2} xs={12} className="text-center">
                          <h5>비밀번호</h5>
                        </Grid>
                        <Grid md={4} xs={12}>
                          <TextField
                              fullWidth
                              size="small"
                              variant="outlined"
                          />
                        </Grid>
                        <Grid md={3} xs={12} className="text-center">
                          <h5>비밀번호 확인</h5>
                        </Grid>
                        <Grid md={3} xs={12}>
                          <TextField
                              fullWidth
                              size="small"
                              variant="outlined"
                          />
                        </Grid>
                      </Grid>
                      
                      <Grid container md={12} xs={12} className="mt-12">
                        <Grid md={2} xs={12} className="text-center">
                          <h5>사용자명</h5>
                        </Grid>
                        <Grid md={4} xs={12}>
                          <TextField
                              fullWidth
                              size="small"
                              variant="outlined"
                          />
                        </Grid>
                        <Grid md={3} xs={12} className="text-center">
                          <h5>소속</h5>
                        </Grid>
                        <Grid md={3} xs={12}>
                          <TextField
                              fullWidth
                              size="small"
                              variant="outlined"
                          />
                        </Grid>
                      </Grid>
                      
                      <Grid container md={12} xs={12} className="mt-12">
                        <Grid md={2} xs={12} className="text-center">
                          <h5>전화번호</h5>
                        </Grid>
                        <Grid md={4} xs={12}>
                          <TextField
                              fullWidth
                              size="small"
                              variant="outlined"
                          />
                        </Grid>
                        <Grid md={3} xs={12} className="text-center">
                          <h5>휴대폰번호</h5>
                        </Grid>
                        <Grid md={3} xs={12}>
                          <TextField
                              fullWidth
                              size="small"
                              variant="outlined"
                          />
                        </Grid>
                      </Grid>
                      
                      <Grid container md={12} xs={12} className="mt-12">
                        <Grid md={2} xs={12} className="text-center">
                          <h5>이메일</h5>
                        </Grid>
                        <Grid md={10} xs={12}>
                          <TextField
                              fullWidth
                              size="small"
                              variant="outlined"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </form>
                </DialogContent>

                <Divider />

                <DialogActions>
                    <Button
                        autoFocus
                        onClick={this.onCloseModal.bind(this)}
                    >
                        닫기
                    </Button>
                    <Button
                        autoFocus
                        form="product-form"
                        type="submit"
                        color="primary"
                    >
                        저장
                    </Button>
                </DialogActions>
            </Dialog>
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

export default withSnackbar(connect(mapStateToProps, null)(OperatorRole));
