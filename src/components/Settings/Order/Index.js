import React from "react";
import PageTitle from "../../../core/common/Partials/PageTitle";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import SaveIcon from "@material-ui/icons/Save";
import SubjectIcon from '@material-ui/icons/Subject';
import { CircularProgress, Grid, Button, Table, TableBody, TableRow, TableCell, TextField, FormControlLabel, Checkbox, Radio} from "@material-ui/core";

class OrderConfig extends React.Component {
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
              menuName="주문 기본 설정"
              title="주문 기본 설정"
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
                      <h5>주문 기본 설정</h5>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item md={12} xs={12}>
                        <Table className="mail_table">
                          <TableBody>
                            <TableRow>
                              <TableCell>결제페이지청약의사 재확인 설정</TableCell>
                              <TableCell>
                                <Grid container md={12} xs={12}>
                                  <Grid item md={3} xs={12}>
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
                                  <Grid item md={4} xs={12}>
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
                                </Grid>
                              </TableCell>
                            </TableRow>
                            
                            <TableRow>
                              <TableCell>자동배송완료</TableCell>
                              <TableCell>
                                <Grid container md={12} xs={12}>
                                  <Grid item md={6} xs={12}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          name="active"
                                          color="primary"
                                          value={true}
                                          defaultChecked={true}
                                        />
                                      }
                                      label="’배송 중’ 으로 주문상태 변경한 뒤  [ 1 ]일 후 ‘배송완료’로 자동 주문상태 변경"
                                    />
                                  </Grid>
                                  <Grid item md={4} xs={12}>
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
                                </Grid>
                              </TableCell>
                            </TableRow>
                            
                            <TableRow>
                              <TableCell>자동구매확정</TableCell>
                              <TableCell>
                                <Grid container md={12} xs={12}>
                                  <Grid item md={6} xs={12}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          name="active"
                                          color="primary"
                                          value={true}
                                          defaultChecked={true}
                                        />
                                      }
                                      label="’배송완료’로 주문상태 변경한 뒤  [ 3 ]일 후 '구매확인'으로 자동 주문상태 변경"
                                    />
                                  </Grid>
                                  <Grid item md={4} xs={12}>
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
                                </Grid>
                              </TableCell>
                            </TableRow>
                            
                            <TableRow>
                              <TableCell>환불 진행 재확인사용설정</TableCell>
                              <TableCell>
                                <Grid container md={12} xs={12}>
                                  <Grid item md={3} xs={12}>
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
                                  <Grid item md={4} xs={12}>
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
                                </Grid>
                                <Grid spacing={2} item md={12} xs={12} className="mt-20">
                                  <Grid item md={12} xs={12}>
                                    <h5>+ 환불 처리 시 환불 진행 여부를 한번 더 확인하여 안전하게 환불 처리.</h5>
                                  </Grid>
                                </Grid>
                              </TableCell>
                            </TableRow>
                            
                            <TableRow>
                              <TableCell>고객 교환/반품/환불신청기능 사용설정</TableCell>
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
                                      <Radio
                                        name="active"
                                        color="primary"
                                        value={true}
                                      />
                                    }
                                    label="고객 교환/반품/환불 신청 주문 표기 ( □ 공급사 관리자 동일적용 ) "
                                  />
                                </Grid>
                                <Grid spacing={2} item md={12} xs={12}>
                                  <Grid item md={12} xs={12}>
                                    <h5>+ 체크 시 주문리스트와 주문상세페이지에 고객 클레임 신청정보(고객 교환/반품/환불 신청정보)가 표기.</h5>
                                  </Grid>
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
                                <Grid spacing={2} item md={12} xs={12}>
                                  <Grid item md={12} xs={12}>
                                    <h5>+ 사용 안함 선택 시 쇼핑몰에서 구매자가 직접 교환/반품/환불 신청할 수 없음.</h5>
                                  </Grid>
                                </Grid>
                              </TableCell>
                            </TableRow>
                            
                            <TableRow>
                              <TableCell>자동환불 사용설정</TableCell>
                              <TableCell>
                                <Grid container md={12} xs={12}>
                                  <Grid item md={3} xs={12}>
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
                                  <Grid item md={4} xs={12}>
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
                                </Grid>
                                <Grid spacing={2} item md={12} xs={12} className="mt-20">
                                  <Grid item md={12} xs={12}>
                                    <h5>+ 사용함으로 설정 시 구매자가 환불을 요청하는 경우 별도의 승인없이 바로 환불완료 처리됨.</h5>
                                    <h5>+ 자동 환불 완료는 전체환불 요청 시에만 처리 되며, 주문상태가 ＂입금완료 상태의 그룹(결제완료)＂인 경우에만 자동 환불 처리됨.</h5>
                                  </Grid>
                                </Grid>
                              </TableCell>
                            </TableRow>
                            
                            <TableRow>
                              <TableCell>자동환불 상품범위</TableCell>
                              <TableCell>
                                <Grid container md={12} xs={12}>
                                  <Grid item md={3} xs={12}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          name="active"
                                          color="primary"
                                          value={true}
                                          defaultChecked={true}
                                        />
                                      }
                                      label="제한 없음"
                                    />
                                  </Grid>
                                  <Grid item md={4} xs={12}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          name="active"
                                          color="primary"
                                          value={false}
                                        />
                                      }
                                      label="공급사 상품 제외"
                                    />
                                  </Grid>
                                </Grid>
                                <Grid spacing={2} item md={12} xs={12} className="mt-20">
                                  <Grid item md={12} xs={12}>
                                    <h5>+ 공급사 상품 제외 선택 시, 환불 요청 주문 건에 공급사 상품이 포함된 경우 운영자 승인을 통한 환불로 처리해야 함.</h5>
                                  </Grid>
                                </Grid>
                              </TableCell>
                            </TableRow>
                            
                            <TableRow>
                              <TableCell>자동환불 결제수단</TableCell>
                              <TableCell>
                                <Grid container md={12} xs={12}>
                                  <Grid item md={3} xs={12}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          name="active"
                                          color="primary"
                                          value={true}
                                          defaultChecked={true}
                                        />
                                      }
                                      label="PG결제 (신용카드) 이니시스"
                                    />
                                  </Grid>
                                </Grid>
                                <Grid spacing={2} item md={12} xs={12} className="mt-20">
                                  <Grid item md={12} xs={12}>
                                    <h5>+ 무통장 입금/계좌이체/가상계좌/에스크로/휴대폰결제/네이버페이 로 결제한 주문은 자동 환불이 불가함.</h5>
                                  </Grid>
                                </Grid>
                              </TableCell>
                            </TableRow>
                            
                            <TableRow>
                              <TableCell>자동환불 추가설정</TableCell>
                              <TableCell>
                                <Grid container md={12} xs={12}>
                                  <Grid item md={2} xs={12} className="text-right">
                                    <h5>재고 수량 복원 설정: </h5>
                                  </Grid>
                                  <Grid item md={1} xs={12}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          name="active"
                                          color="primary"
                                          value={true}
                                          defaultChecked={true}
                                        />
                                      }
                                      label="복원함"
                                    />
                                  </Grid>
                                  <Grid item md={1} xs={12}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          name="active"
                                          color="primary"
                                          value={true}
                                        />
                                      }
                                      label="복원 안함"
                                    />
                                  </Grid>
                                </Grid>
                                <Grid container md={12} xs={12}>
                                  <Grid item md={2} xs={12} className="text-right">
                                    <h5>쿠폰 복원 설정: </h5>
                                  </Grid>
                                  <Grid item md={1} xs={12}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          name="active"
                                          color="primary"
                                          value={true}
                                          defaultChecked={true}
                                        />
                                      }
                                      label="복원함"
                                    />
                                  </Grid>
                                  <Grid item md={1} xs={12}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          name="active"
                                          color="primary"
                                          value={true}
                                        />
                                      }
                                      label="복원 안함"
                                    />
                                  </Grid>
                                </Grid>
                              </TableCell>
                            </TableRow>
                            
                            <TableRow>
                              <TableCell>관리자 주문취소 시</TableCell>
                              <TableCell>
                                <Grid container md={12} xs={12}>
                                  <Grid item md={2} xs={12} className="text-right">
                                    <h5>재고 수량 복원 설정: </h5>
                                  </Grid>
                                  <Grid item md={1} xs={12}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          name="active"
                                          color="primary"
                                          value={true}
                                          defaultChecked={true}
                                        />
                                      }
                                      label="복원함"
                                    />
                                  </Grid>
                                  <Grid item md={1} xs={12}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          name="active"
                                          color="primary"
                                          value={true}
                                        />
                                      }
                                      label="복원 안함"
                                    />
                                  </Grid>
                                </Grid>
                                <Grid container md={12} xs={12}>
                                  <Grid item md={2} xs={12} className="text-right">
                                    <h5>쿠폰 복원 설정: </h5>
                                  </Grid>
                                  <Grid item md={1} xs={12}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          name="active"
                                          color="primary"
                                          value={true}
                                          defaultChecked={true}
                                        />
                                      }
                                      label="복원함"
                                    />
                                  </Grid>
                                  <Grid item md={1} xs={12}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          name="active"
                                          color="primary"
                                          value={true}
                                        />
                                      }
                                      label="복원 안함"
                                    />
                                  </Grid>
                                </Grid>
                                <Grid container md={12} xs={12}>
                                  <Grid item md={2} xs={12} className="text-right">
                                    <h5>사은품 지급 설정: </h5>
                                  </Grid>
                                  <Grid item md={1} xs={12}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          name="active"
                                          color="primary"
                                          value={true}
                                          defaultChecked={true}
                                        />
                                      }
                                      label="복원함"
                                    />
                                  </Grid>
                                  <Grid item md={1} xs={12}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          name="active"
                                          color="primary"
                                          value={true}
                                        />
                                      }
                                      label="복원 안함"
                                    />
                                  </Grid>
                                </Grid>
                              </TableCell>
                            </TableRow>
                            
                            <TableRow>
                              <TableCell>관리자 교환접수 시</TableCell>
                              <TableCell>
                                <Grid container md={12} xs={12}>
                                  <Grid item md={4} xs={12} className="text-right">
                                    <h5>교환취소 상품에 사용한 쿠폰 복원 여부: </h5>
                                  </Grid>
                                  <Grid item md={1} xs={12}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          name="active"
                                          color="primary"
                                          value={true}
                                        />
                                      }
                                      label="복원함"
                                    />
                                  </Grid>
                                  <Grid item md={1} xs={12}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          name="active"
                                          color="primary"
                                          value={true}
                                          defaultChecked={true}
                                        />
                                      }
                                      label="복원 안함"
                                    />
                                  </Grid>
                                </Grid>
                                <Grid container md={12} xs={12}>
                                  <Grid item md={4} xs={12} className="text-right">
                                    <h5>교환취소 상품의 사은품 지급여부: </h5>
                                  </Grid>
                                  <Grid item md={1} xs={12}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          name="active"
                                          color="primary"
                                          value={true}
                                          defaultChecked={true}
                                        />
                                      }
                                      label="복원함"
                                    />
                                  </Grid>
                                  <Grid item md={1} xs={12}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          name="active"
                                          color="primary"
                                          value={true}
                                        />
                                      }
                                      label="복원 안함"
                                    />
                                  </Grid>
                                </Grid>
                                <Grid container md={12} xs={12}>
                                  <Grid item md={4} xs={12} className="text-right">
                                    <h5>교환추가 상품에 적용된 마일리지 지급 여부: </h5>
                                  </Grid>
                                  <Grid item md={1} xs={12}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          name="active"
                                          color="primary"
                                          value={true}
                                          defaultChecked={true}
                                        />
                                      }
                                      label="복원함"
                                    />
                                  </Grid>
                                  <Grid item md={1} xs={12}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          name="active"
                                          color="primary"
                                          value={true}
                                        />
                                      }
                                      label="복원 안함"
                                    />
                                  </Grid>
                                </Grid>
                                <Grid container md={12} xs={12}>
                                  <Grid item md={4} xs={12} className="text-right">
                                    <h5>교환추가 상품에 적용된 쿠폰 마일리지 지급 여부: </h5>
                                  </Grid>
                                  <Grid item md={1} xs={12}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          name="active"
                                          color="primary"
                                          value={true}
                                          defaultChecked={true}
                                        />
                                      }
                                      label="복원함"
                                    />
                                  </Grid>
                                  <Grid item md={1} xs={12}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          name="active"
                                          color="primary"
                                          value={true}
                                        />
                                      }
                                      label="복원 안함"
                                    />
                                  </Grid>
                                </Grid>
                              </TableCell>
                            </TableRow>
                            
                            <TableRow>
                              <TableCell>관리자 환불완료 시</TableCell>
                              <TableCell>
                                <Grid container md={12} xs={12}>
                                  <Grid item md={2} xs={12} className="text-right">
                                    <h5>재고 수량 복원 설정: </h5>
                                  </Grid>
                                  <Grid item md={1} xs={12}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          name="active"
                                          color="primary"
                                          value={true}
                                        />
                                      }
                                      label="복원함"
                                    />
                                  </Grid>
                                  <Grid item md={1} xs={12}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          name="active"
                                          color="primary"
                                          value={true}
                                          defaultChecked={true}
                                        />
                                      }
                                      label="복원 안함"
                                    />
                                  </Grid>
                                </Grid>
                                <Grid container md={12} xs={12}>
                                  <Grid item md={2} xs={12} className="text-right">
                                    <h5>쿠폰 복원 설정: </h5>
                                  </Grid>
                                  <Grid item md={1} xs={12}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          name="active"
                                          color="primary"
                                          value={true}
                                        />
                                      }
                                      label="복원함"
                                    />
                                  </Grid>
                                  <Grid item md={1} xs={12}>
                                    <FormControlLabel
                                      control={
                                        <Checkbox
                                          name="active"
                                          color="primary"
                                          value={true}
                                          defaultChecked={true}
                                        />
                                      }
                                      label="복원 안함"
                                    />
                                  </Grid>
                                </Grid>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                        <Grid spacing={2} item md={12} xs={12} className="mt-20">
                          <Grid item md={12} xs={12}>
                            <h5>* 주문 클레임 처리 시 재고, 쿠폰복원 등 처리방안의 기본 선택 값을 설정할 수 있으며, 클레임 처리 화면 접근 시 설정한 값이 기본으로 선택되어 노출.</h5>
                          </Grid>
                        </Grid>
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

export default withSnackbar(connect(mapStateToProps, null)(OrderConfig));