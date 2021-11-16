import React from "react";
import PageTitle from "../../../core/common/Partials/PageTitle";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import SubjectIcon from '@material-ui/icons/Subject';
import CreateIcon from '@material-ui/icons/Add';
import CopyIcon from '@material-ui/icons/FileCopy';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { CircularProgress, Grid, Button, Table, TableBody, TableRow, TableCell, FormControl, TextField, Select, MenuItem, InputLabel, FormControlLabel, Checkbox, Switch,
  Dialog, DialogTitle, DialogContent, DialogActions, Divider, TableFooter} from "@material-ui/core";

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
                      startIcon={<CreateIcon/>}
                  >사용자 추가</Button>
                </Grid> 
              </Grid>

              <Divider />

              <Grid item md={12} xs={12} className="mt-20">
                <Table className="order_table">
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" width="5%">선택</TableCell>
                      <TableCell align="center">번호</TableCell>
                      <TableCell align="center">이용안내 코드</TableCell>
                      <TableCell align="center">이용안내 종류</TableCell>
                      <TableCell align="center">이용안내 제목</TableCell>
                      <TableCell align="center">등록일</TableCell>
                      <TableCell align="center">수정</TableCell>
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
                        >수정</Button>
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
                        >수정</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
              <Grid item spacing={2} md={12} xs={12}>
                <Grid container>
                  <Grid item md={3} xs={12} class="mt-20">
                    <Button
                        fullWidth
                        size="width"
                        variant="contained"
                        color="primary"
                        startIcon={<CopyIcon/>}
                        style={{marginTop: "10px"}}
                    >선택 이용안내 복사</Button>
                  </Grid>
                  <Grid item md={3} xs={12} class="mt-20" style={{marginLeft: "10px"}}>
                    <Button
                        size="width"
                        variant="contained"
                        color="primary"
                        style={{marginTop: "10px", marginLeft: "10px"}}
                        startIcon={<DeleteIcon/>}
                    >선택 이용안내 삭제</Button>
                  </Grid>
                </Grid>
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

export default withSnackbar(connect(mapStateToProps, null)(ProductGuide));
