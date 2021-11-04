import React from "react";
import PageTitle from "../../../core/common/Partials/PageTitle";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import SubjectIcon from '@material-ui/icons/Subject';
import CreateIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import { CircularProgress, Grid, Button, Table, TableBody, TableRow, TableCell, FormControl, TextField, Select, MenuItem, InputLabel, FormControlLabel, Checkbox, Switch,
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
        {/* Title section */}
        <Grid container>
          <Grid item>
            {/* Title */}
            <PageTitle
              menuName="운영자 관리"
              title="운영자 관리"
              icon={<SubjectIcon />}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item md={12}>
            <div className="card mt-20">
            <Grid container spacing={2} md={12} xs={12}>
              <Grid container spacing={3} alignItems="center" md={3} xs={12}>
                <Grid item md={3} xs={12} className="align-items-center">
                    <h5>등급선택</h5>
                </Grid>
                <Grid item md={6} sm={4} xs={12}>
                  <FormControl
                      size="small"
                      fullWidth
                      variant="outlined"
                      defaultValue=""
                  >
                    <InputLabel>고른</InputLabel>
                    <Select>
                        <MenuItem value="general">최고운영자</MenuItem>
                        <MenuItem value="simple">일반운영자</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>   
              
              <Grid container spacing={3} alignItems="center" md={3} xs={12}>
                <Grid item md={3} xs={12} className="align-items-center">
                    <h5>사용여부</h5>
                </Grid>
                <Grid item md={6} sm={4} xs={12}>
                  <FormControl
                      size="small"
                      fullWidth
                      variant="outlined"
                      defaultValue=""
                  >
                    <InputLabel>고른</InputLabel>
                    <Select>
                        <MenuItem value="1">사용함</MenuItem>
                        <MenuItem value="0">사용 안함</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid> 
              
              <Grid container spacing={3} alignItems="center" md={5} xs={12}>
                <Grid item md={2} xs={12} className="align-items-center">
                    <h5>검색</h5>
                </Grid>
                <Grid item md={2} sm={4} xs={12}>
                  <FormControl
                      size="small"
                      fullWidth
                      variant="outlined"
                      defaultValue=""
                  >
                    <InputLabel>고른</InputLabel>
                    <Select>
                        <MenuItem value="id">사용자ID </MenuItem>
                        <MenuItem value="name">사용자명</MenuItem>
                        <MenuItem value="region">소속</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={5} xs={12}>
                    <TextField
                        fullWidth
                        size="small"
                        variant="outlined"
                    />
                </Grid>
                <Grid item md={2} xs={12} className="ml-20">
                  <Button
                      fullWidth
                      size="small"
                      variant="contained"
                      color="primary"
                      startIcon={<SearchIcon/>}
                  >검색</Button>
                </Grid>
              </Grid> 
            </Grid>

            <Grid item md={12} xs={12} alignItems="right" className="mt-20">
              <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  startIcon={<CreateIcon/>}
                  onClick={this.onOpenModal.bind(this)}
              >사용자 추가</Button>
            </Grid>

            <Grid item md={12} xs={12} className="mt-20">
              <Table className="order_table">
                <TableBody>
                  <TableRow>
                    <TableCell align="center">No.</TableCell>
                    <TableCell align="center">선택</TableCell>
                    <TableCell align="center">사용자등급</TableCell>
                    <TableCell align="center">소속</TableCell>
                    <TableCell align="center">사용자명</TableCell>
                    <TableCell align="center">사용자ID</TableCell>
                    <TableCell align="center">연락처</TableCell>
                    <TableCell align="center">휴대폰</TableCell>
                    <TableCell align="center">상태</TableCell>
                    <TableCell align="center">관리</TableCell>
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
                      /></TableCell>
                    <TableCell align="center">최고운영자</TableCell>
                    <TableCell align="center">아니벌써</TableCell>
                    <TableCell align="center">최고 관리자</TableCell>
                    <TableCell align="center">Admin</TableCell>
                    <TableCell align="center">000-0000-0000</TableCell>
                    <TableCell align="center">010-0000-0000</TableCell>
                    <TableCell align="center">
                      <FormControlLabel
                        control={
                          <Switch
                            name="checkedB"
                            color="primary"
                          />
                        }
                        label="On/Off"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Button
                          size="small"
                          variant="contained"
                          color="primary"
                          startIcon={<EditIcon/>}
                          onClick={this.onOpenModal.bind(this)}
                      >수정</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
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
