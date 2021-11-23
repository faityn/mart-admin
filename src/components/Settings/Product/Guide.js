import React from "react";
import PageTitle from "../../../core/common/Partials/PageTitle";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import {Grid, Button, Table, TableBody, TableRow, TableCell, FormControl, TextField, Select, MenuItem, InputLabel, FormControlLabel, Checkbox,
  Dialog, DialogTitle, DialogContent, DialogActions, Divider, TextareaAutosize} from "@material-ui/core";
import SubjectIcon from '@material-ui/icons/Subject';
import CreateIcon from '@material-ui/icons/Add';
import CopyIcon from '@material-ui/icons/FileCopy';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

class ProductGuide extends React.Component {
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
              menuName="상품 상세 이용안내 관리"
              title="상품 상세 이용안내 관리"
              icon={<SubjectIcon />}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item md={12}>
            <div className="card mt-20">
              <Grid container spacing={2} md={12} xs={12}>
                <Grid item md={4} xs={12} className="align-items-center">
                    <h5>상품 상세 이용안내</h5>
                </Grid>
                <Grid item md={8} xs={12} className="align-items-center" style={{paddingLeft: "55%"}}>
                  <Button
                      fullWidth
                      size="width"
                      variant="contained"
                      color="primary"
                      onClick={this.onOpenModal.bind(this)}
                      startIcon={<CreateIcon/>}
                  >사용자 추가</Button>
                </Grid> 
              </Grid>            

              <Divider />
                    
              <Grid container spacing={2} md={12} xs={12} className="mt-20">
                  <Grid item md={2} xs={12}>
                      <InputLabel>전체 <i style={{color: "#FF0000", fontStyle: "normal"}}><strong>0</strong></i> 개</InputLabel>
                  </Grid>
                  <Grid item md={9} xs={12} className="align-items-center"></Grid>
                  <Grid item md={1} xs={12} className="align-items-center">
                      <FormControl size="small" fullWidth variant="outlined">
                          <InputLabel>10개</InputLabel>
                          <Select>
                              <MenuItem value="10">10개</MenuItem>
                              <MenuItem value="30">30개</MenuItem>
                              <MenuItem value="50">50개</MenuItem>
                          </Select>
                      </FormControl>
                  </Grid>
              </Grid>

              <Grid item md={12} xs={12} className="mt-20">
                <Table className="order_table">
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" width="5%">선택</TableCell>
                      <TableCell align="center" width="5%">번호</TableCell>
                      <TableCell align="center">이용안내 코드</TableCell>
                      <TableCell align="center">이용안내 종류</TableCell>
                      <TableCell align="center">이용안내 제목</TableCell>
                      <TableCell align="center">등록일</TableCell>
                      <TableCell align="center" width="10%">수정</TableCell>
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
                        /></TableCell>
                      <TableCell align="center">4</TableCell>
                      <TableCell align="center">002001</TableCell>
                      <TableCell align="center">[배송안내]</TableCell>
                      <TableCell align="center">배송안내 - 기본(기본설정)</TableCell>
                      <TableCell align="center">2021-03-01</TableCell>
                      <TableCell align="center">
                        <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            startIcon={<EditIcon/>}
                            onClick={this.onOpenModal.bind(this)}>수정</Button>
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
                        /></TableCell>
                      <TableCell align="center">3</TableCell>
                      <TableCell align="center">003001</TableCell>
                      <TableCell align="center">[AS안내]</TableCell>
                      <TableCell align="center">AS안내 - 기본(기본설정)</TableCell>
                      <TableCell align="center">2021-03-01</TableCell>
                      <TableCell align="center">
                        <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            startIcon={<EditIcon/>}
                            onClick={this.onOpenModal.bind(this)}>수정</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
              <Grid item spacing={2} md={12} xs={12}>
                <Grid container>
                  <Grid item md={3} xs={12} class="mt-20 align-items-center">
                    <Button
                        fullWidth
                        size="width"
                        variant="contained"
                        style={{backgroundColor: "#0eb906", color: "#fff"}}
                        startIcon={<CopyIcon/>}
                    >선택 이용안내 복사</Button>
                  </Grid>
                  <Grid item md={3} xs={12} class="mt-20 align-items-center" style={{marginLeft: "10px"}}>
                    <Button
                        size="width"
                        variant="contained"
                        style={{backgroundColor: "#ff0000", color: "#fff"}}
                        startIcon={<DeleteIcon/>}
                    >선택 이용안내 삭제</Button>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      
        <Dialog open={this.state.isOpenModal} maxWidth="sm">
            <DialogTitle>
                <h4>이용안내 등록</h4>
            </DialogTitle>

            <Divider />

            <DialogContent>
              <Grid container>
                <Grid container spacing={2} md={12} xs={12}>
                  <Grid item md={3} xs={12} className="align-items-center">
                    <h5>이용안내 코드</h5>
                  </Grid>
                  <Grid item md={9} xs={12} className="align-items-center">
                    <TextField
                        fullWidth
                        size="small"
                        variant="outlined"
                    />
                  </Grid>
                </Grid>

                <Grid spacing={2} container md={12} xs={12} className="mt-12"> 
                  <Grid item md={3} xs={12} className="align-items-center">
                    <h5>이용아내 종류</h5>
                  </Grid>
                  <Grid item md={9} xs={12} className="align-items-center">
                    <FormControl
                        size="small"
                        fullWidth
                        variant="outlined"
                    >
                      <InputLabel>이용아내 종류</InputLabel>
                      <Select>
                          <MenuItem value="">...</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid container spacing={2} md={12} xs={12} className="mt-12">
                  <Grid item md={3} xs={12} className="align-items-center">
                    <h5>이용안내 제목</h5>
                  </Grid>
                  <Grid item md={9} xs={12} className="align-items-center">
                    <TextField
                        fullWidth
                        size="small"
                        variant="outlined"
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2} md={12} xs={12} className="mt-12">
                  <Grid item md={2} xs={12} className="align-items-center">
                    <h5>내용</h5>
                  </Grid>
                  <Grid item md={12} xs={12} className="align-items-center">
                    <TextareaAutosize minRows={10} style={{width: "100%"}} placeholder="내용" />
                  </Grid>
                </Grid>
              </Grid>
            </DialogContent>

            <Divider />

            <DialogActions>
              <Button
                  size="medium"
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon/>}
                  style={{marginRight: "5px"}}
              >저장</Button>
              <Button
                  size="medium"
                  variant="outlined"
                  style={{backgroundColor: "#fff", color: "#000"}}
                  startIcon={<CancelIcon/>}
                  style={{marginLeft: "5px"}}
                  onClick={this.onCloseModal.bind(this)}
              >취소</Button>
            </DialogActions>
        </Dialog>
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

export default withSnackbar(connect(mapStateToProps, null)(ProductGuide));
