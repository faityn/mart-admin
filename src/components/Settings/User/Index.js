import React from "react";
import { GET_PRIVACY, SAVE_PRIVACY } from "../../Queries/Queries";
import PageTitle from "../../../core/common/Partials/PageTitle";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import SaveIcon from "@material-ui/icons/Save";
import SubjectIcon from '@material-ui/icons/Subject';
import { CircularProgress, Grid, Button, Table, TableBody, TableRow, TableCell, FormControl} from "@material-ui/core";
import CKEditor from "ckeditor4-react";

class User extends React.Component {
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
              menuName="이용/탈퇴 안내"
              title="이용/탈퇴 안내"
              icon={<SubjectIcon />}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item md={12}>
            <div className="card mt-20">
              <form id="form-submit" onSubmit={this.onHandleSubmit}>
              
                <Grid container spacing={2} className="mt-20" md={12} xs={12}>
                    <Table className="mail_table">
                      <TableBody>
                        <TableRow>
                            <TableCell>이용안내</TableCell>
                            <TableCell>
                              <Grid spacing={2} item md={12} xs={12} className="mt-20">
                                <Grid item md={12} xs={12}>
                                  <FormControl fullWidth>
                                    <CKEditor
                                      type="classic"
                                      name="user_register"
                                      data="이용안내

                                      ■ 회원가입안내
                                        ① 저희 주식회사 아니벌써는 기본적으로는 회원제로 운영하고 있습니다. 
                                        ② 회원가입비나 월회비, 연회비등 어떠한 비용도 청구하지 않는 100% 무료 입니다. 
                                        ③ 회원 가입시 기본 가입 축하금으로 1,000원 의 마일리지가 지급됩니다. 
                                        ④ 구매 시 상품별로 적용된 마일리지는 10,000원 이상이면 사용하실 수가 있습니다. 
                                      
                                        ■ 마일리지 제도
                                        ① 저희 주식회사 아니벌써는 마일리지를 사용할 수 있습니다. 
                                        ② 마일리지 100점은 현금 100원과 같습니다. 
                                        ③ 마일리지는 10,000원 이상 되어야 사용하실 수가 있고 10,000원 이 넘는 금액의 적립금은 사용하실 수가 없습니다.
                                      "
                                    />
                                    <textarea
                                      name="user_register"
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
                  <Table className="mail_table">
                    <TableBody>
                      <TableRow>
                          <TableCell>회원 탈퇴 안내</TableCell>
                            <TableCell>
                              <Grid spacing={2} item md={12} xs={12} className="mt-20">
                                <Grid item md={12} xs={12}>
                                  <FormControl fullWidth>
                                    <CKEditor
                                      type="classic"
                                      name="user_delete"
                                      data="탈퇴안내

                                      회원님께서 회원 탈퇴를 원하신다니 저희 쇼핑몰의 서비스가 많이 부족하고 미흡했나 봅니다.
                                      불편하셨던 점이나 불만사항을 알려주시면 적극 반영해서 고객님의 불편함을 해결해 드리도록 노력하겠습니다.
                                      
                                      ■ 아울러 회원 탈퇴시의 아래 사항을 숙지하시기 바랍니다.
                                      1. 회원 탈퇴 시 회원님의 정보는 상품 반품 및 A/S를 위해 전자상거래 등에서의 소비자 보호에 관한 법률에 의거한 
                                          고객정보 보호정책에 따라 관리 됩니다.
                                      2. 탈퇴 시 회원님께서 보유하셨던 마일리지는 삭제 됩니다
                                      
                                      "
                                    />
                                    <textarea
                                      name="user_delete"
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

export default withSnackbar(connect(mapStateToProps, null)(User));
