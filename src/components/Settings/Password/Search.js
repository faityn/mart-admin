import React from "react";
import PageTitle from "../../../core/common/Partials/PageTitle";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import SaveIcon from "@material-ui/icons/Save";
import SubjectIcon from '@material-ui/icons/Subject';
import { CircularProgress, Grid, Button, Table, TableBody, TableRow, TableCell, TextField, FormControlLabel, Checkbox} from "@material-ui/core";

class PassSearch extends React.Component {
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
              menuName="비밀번호 찾기 설정"
              title="비밀번호 찾기 설정"
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
                      <h5>이메일 인증</h5>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item md={12} xs={12}>
                        <Table className="mail_table">
                          <TableBody>
                            <TableRow>
                                <TableCell>사용설정</TableCell>
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
                                      <h5>+ 회원정보에 등록된 이메일 주소로 비밀번호 찾기 인증번호를 발송.</h5>
                                    </Grid>
                                  </Grid>
                                </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </Grid>
                    </Grid>
                </Grid>
              
              <Grid container spacing={2} className="mt-20" md={12} xs={12}>
                  <Grid item md={12} xs={12}>
                    <h5>휴대폰 인증</h5>
                  </Grid>
                  <Grid container spacing={3}>
                    <Grid item md={12} xs={12}>
                      <Table className="mail_table">
                        <TableBody>
                          <TableRow>
                              <TableCell>사용설정</TableCell>
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
                                    <h5>+ 회원정보에 등록된 휴대폰 번호로 비밀번호 찾기 인증번호를 발송.</h5>
                                  </Grid>
                                  <Grid item md={12} xs={12} className="mt-20">
                                    <h5>+ 자동 SMS 설정 또는 카카오 알림 톡 설정에서 ‘비밀번호 찾기 인증번호’ 항목을 자동발송으로 설정해야 인증번호가 발송.</h5>
                                  </Grid>
                                  <Grid item md={12} xs={12} className="mt-20">
                                    <h5>+ 회원정보에 휴대폰 정보가 등록되지 않은 회원에게는 노출되지 않음.</h5>
                                  </Grid>
                                </Grid>
                              </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
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

export default withSnackbar(connect(mapStateToProps, null)(PassSearch));