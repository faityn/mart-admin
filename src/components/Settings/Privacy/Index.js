import React from "react";
import { GET_PRIVACY, SAVE_PRIVACY } from "../../Queries/Queries";
import PageTitle from "../../../core/common/Partials/PageTitle";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import PrivacyForm from "./Form";
import SaveIcon from "@material-ui/icons/Save";
import SubjectIcon from '@material-ui/icons/Subject';
import { CircularProgress, Grid, Button, Table, TableBody, TableRow, TableCell, TextField, FormControlLabel, Checkbox} from "@material-ui/core";

class Privacy extends React.Component {
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
              menuName="부가세율 설정"
              title="부가세율 설정"
              icon={<SubjectIcon />}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item md={12}>
            <div className="card mt-20">
              <form id="form-submit" onSubmit={this.onHandleSubmit}>
              
                <Grid container spacing={2} className="mt-20" md={12} xs={12}>
                    <Grid item md={12} xs={12}>
                      <h5>상품 부가세 설정</h5>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item md={12} xs={12}>
                        <Table aria-label="상품 부가세 설정" className="mail_table">
                          <TableBody>
                            <TableRow>
                                <TableCell>부가세 세율</TableCell>
                                <TableCell>
                                  <Grid item md={12} xs={12}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          name="active"
                                          color="primary"
                                          value={false}
                                        />
                                      }
                                      label="10%"
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
                                      label="0%(면세)"
                                    />
                                  </Grid>
                                  <Grid spacing={2} item md={12} xs={12} className="mt-20">
                                    <Grid item md={12} xs={12}>
                                      <h5>+ 선택된 세율은 상품-상품관리-상품등록 에서 상품 등록 시 기본 세율로 적용.</h5>
                                    </Grid>
                                    <Grid item md={12} xs={12} className="mt-20">
                                      <h5>+ 세금계산서는 부가가치세율이 10% 또는 0%인 경우에만 발급할 수 있으며, 그 외 세율로 설정된 상품이 포함된 주문은 세금계산서가 발급되지 않으므로 유의.</h5>
                                    </Grid>
                                    <Grid item md={12} xs={12} className="mt-20">
                                      <h5>+ 신선식품의 경우 상품 등록 시 면세(0%) 별도 설정함.</h5>
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
                    <h5>배송비 부가세 설정</h5>
                  </Grid>
                  <Grid container spacing={3}>
                    <Grid item md={12} xs={12}>
                      <Table aria-label="배송비 부가세 설정" className="mail_table">
                        <TableBody>
                          <TableRow>
                              <TableCell>부가세 설정</TableCell>
                              <TableCell>
                                <Grid item md={12} xs={12}>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        name="active"
                                        color="primary"
                                        value={false}
                                      />
                                    }
                                    label="10%"
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
                                    label="0%(면세)"
                                  />
                                </Grid>
                                <Grid spacing={2} item md={12} xs={12} className="mt-20">
                                  <Grid item md={12} xs={12}>
                                    <h5>+ 선택된 세율은 기본설정-배송정책-배송비 조건 등록 에서 배송비 조건 등록 시 기본 세율로 적용.</h5>
                                  </Grid>
                                  <Grid item md={12} xs={12} className="mt-20">
                                    <h5>+ 세금계산서는 부가가치세율이 10% 또는 0%인 경우에만 발급할 수 있으며, 그 외 세율로 설정된 상품이 포함된 주문은 세금계산서가 발급되지 않으므로 유의.</h5>
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

export default withSnackbar(connect(mapStateToProps, null)(Privacy));
