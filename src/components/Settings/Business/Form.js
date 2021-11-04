import React from "react";
import PageTitle from "../../../core/common/Partials/PageTitle";
import BusinessIcon from "@material-ui/icons/Business";
import SaveIcon from "@material-ui/icons/Save";
import SearchIcon from "@material-ui/icons/Search";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import {
  Grid,
  Button,
  TextField,
  CircularProgress,
  Divider,
  IconButton,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";
import { withSnackbar } from "notistack";
import validate from "validate.js";
import { connect } from "react-redux";
import { GET_COMPANY, SAVE_COMPANY } from "../../Queries/Queries";  

/**
 * @summary Form
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Settings
 */
class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      company: null,
      isProcessing: false,
    };

    // Event
    this.hasError = this.hasError.bind(this);

    this._isMounted = false;
  }

  /**
   * @override
   */
  async componentDidMount() {
    this._isMounted = true;

    await this.props.apolloClient.httpClient
      .query({
        query: GET_COMPANY,
        variables: {
          search: {
            name: "",
            representativeName: "",
            postalCode: "",
            zipCode: "",
            detailedAddress: "",
            businessType: "",
          },
          page: {
            limit: 10,
            pageNumber: 1,
            orderBy: "id",
            type: "ASC",
          },
        },
      })
      .then((result) => {
        this.setState({
          company: result.data.getCompanies.list,
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
   * @summary Check errors
   * @param {String} field
   */
  hasError(field) {
    return this.state.errors && this.state.errors[field] ? true : false;
  }

  /**
   * @summary Validate company
   * @param {Object} company
   */
  onValidateSubmit(company) {
    const schema = {
      registrationNumber: {
        presence: {
          allowEmpty: false,
          message: "^Registration number field is required.",
        },
      },
      name: {
        presence: {
          allowEmpty: false,
          message: "^Name field is required.",
        },
      },
      representativeName: {
        presence: {
          allowEmpty: false,
          message: "^Representative name field is required.",
        },
      },
      // postalCode: {
      //   presence: {
      //     allowEmpty: false,
      //     message: "^Postal code field is required.",
      //   },
      // },
      zipCode: {
        presence: {
          allowEmpty: false,
          message: "^Zip code field is required.",
        },
      },
      detailedAddress: {
        presence: {
          allowEmpty: false,
          message: "^Detailed address field is required.",
        },
      },
      // businessType: {
      //   presence: {
      //     allowEmpty: false,
      //     message: "^Business type field is required.",
      //   },
      // },
      event: {
        presence: {
          allowEmpty: false,
          message: "^Email field is required.",
        },
      },
    };

    // Validate
    const errors = validate(company, schema);

    this.setState({
      errors: errors,
    });

    return errors;
  }

  /**
   * @summary Handle submit form
   * @param {MouseEvent} event
   */
  async onHandleSubmit(event) {
    event.preventDefault();
    // Form data
    const formData = new FormData(event.target);

    // Form data to object
    let company = {
      id: formData.get("id"),
      registrationNumber: formData.get("registrationNumber"),
      name: formData.get("name"),
      representativeName: formData.get("representativeName"),
      postalCode: formData.get("postalCode"),
      zipCode: formData.get("zipCode"),
      detailedAddress: formData.get("detailedAddress"),
      businessType: formData.get("businessType"),
      event: formData.get("event"),
      instagramLink: formData.get("instagramLink"),
      instagramLinkIsHidden: formData.get("instagramLinkIsHidden") === "true",
      facebookLink: formData.get("facebookLink"),
      facebookLinkIsHidden: formData.get("facebookLinkIsHidden") === "true",
      twitterLink: formData.get("twitterLink"),
      twitterLinkIsHidden: formData.get("twitterLinkIsHidden") === "true",
      youtubeLink: formData.get("youtubeLink"),
      youtubeLinkIsHidden: formData.get("youtubeLinkIsHidden") === "true",
    };

    // Validate
    if (this.onValidateSubmit(company)) return;

    this.setState({ isProcessing: true });

    // Toast process started
    this.props.enqueueSnackbar("The saving process is being started ...", {
      variant: "info",
    });

    // Mutate
    await this.props.apolloClient.httpClient
      .mutate({
        mutation: SAVE_COMPANY,
        variables: {
          company: company,
        },
      })
      .then((result) => {
        this.props.enqueueSnackbar(
          "Business information has been successfully updated.",
          { variant: "success" }
        );
      })
      .catch((error) => {
        this.props.enqueueSnackbar(
          "Sorry, there is an error occurred while saving data.",
          { variant: "error" }
        );
      });

    this.setState({ isProcessing: false });
  }

  /**
   * @override
   */
  render() {
    if (!this.state.company) 
      return "";

    let data = this.state.company ? this.state.company[0] : null;

    return (
      <React.Fragment>
        {/* Title section */}
        <Grid container>
          <Grid item>
            {/* Title */}
            <PageTitle
              menuName="아니벌써 기본정보"
              title="아니벌써 기본정보"
              icon={<BusinessIcon />}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item md={12} xs={12}>
            <div className="card mt-20">
              <form
                id="my-form-managemnt"
                onSubmit={this.onHandleSubmit.bind(this)}
              >
                <Grid
                  container
                  spacing={2}
                  className="align-items-center"
                >
                  <input type="hidden" name="id" value={data.id} />
                  <Grid item md={2} xs={12}>
                    <h5>상호(회사명)</h5>
                  </Grid>
                  <Grid item md={8} xs={12}>
                    <TextField
                      fullWidth
                      label="회사명"
                      size="small"
                      variant="outlined"
                      name="businessName"
                    />
                  </Grid>
                </Grid>
                
                <Grid container spacing={2} className="align-items-center">                
                  <Grid item md={2} xs={12}>
                    <h5>사업자등록번호</h5>
                  </Grid>
                  <Grid container md={5} xs={12} spacing={2} style={{paddingLeft: "8px"}}>
                    <Grid item md={2} xs={12}>
                      <TextField
                        fullWidth
                        label="등록번호"
                        size="small"
                        variant="outlined"
                        name="registrationNumber1"
                      />
                    </Grid>
                    <Grid item md={1} xs={12} className="text-center"><h4>-</h4></Grid>
                    <Grid item md={2} xs={12}>
                      <TextField
                        fullWidth
                        label="등록번호"
                        size="small"
                        variant="outlined"
                        name="registrationNumber2"
                      />
                    </Grid>
                    <Grid item md={1} xs={12} className="text-center"><h4>-</h4></Grid>
                    <Grid item md={2} xs={12}>
                      <TextField
                        fullWidth
                        label="등록번호"
                        size="small"
                        variant="outlined"
                        name="registrationNumber3"
                      />
                    </Grid>
                  </Grid>
                </Grid>
                
                <Grid container spacing={2} className="align-items-center">
                  <Grid item md={2} xs={12}>
                    <h5>대표자명</h5>
                  </Grid>
                  <Grid item md={8} xs={12}>
                    <TextField
                      fullWidth
                      label="대표자명"
                      size="small"
                      variant="outlined"
                      name="ceoName"
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2} className="align-items-center">
                  <Grid item md={2} xs={12}>
                    <h5>업태</h5>
                  </Grid>
                  <Grid item md={8} xs={12}>
                    <TextField
                      fullWidth
                      label="업태"
                      size="small"
                      variant="outlined"
                      name="businessStatus"
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2} className="align-items-center">
                  <Grid item md={2} xs={12}>
                    <h5>종목</h5>
                  </Grid>
                  <Grid item md={8} xs={12}>
                    <TextField
                      fullWidth
                      label="종목"
                      size="small"
                      variant="outlined"
                      name="businessType"                    
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2} className="align-items-center">
                  <Grid item md={2} xs={12}>
                    <h5>대표 이메일</h5>
                  </Grid>

                  <Grid container spacing={2} md={8} xs={12} style={{paddingLeft: "8px"}}>
                    <Grid item md={5} xs={12}>
                      <TextField
                        fullWidth
                        label="이메일"
                        size="small"
                        variant="outlined"
                        name="representativeEmail1"
                      />
                    </Grid>
                    <Grid item md={1} xs={12} className="text-center"><h4>@</h4></Grid>
                    <Grid item md={3} xs={12}>
                      <TextField
                        fullWidth
                        size="small"s
                        variant="outlined"
                        name="representativeEmail2"
                      />
                    </Grid>
                    {/*<Grid item md={3} xs={12}><h5>대표 이메일은 쇼핑몰에서 메일 발송 시 기본 발송자 이메일 정보로 사용.</h5></Grid>*/}
                  </Grid>
                </Grid>
               
                <Grid container spacing={2} className="align-items-center">
                  <Grid item md={2} xs={12}>
                    <h5>사업장 주소</h5>
                  </Grid>

                  <Grid container spacing={2} md={8} xs={12} style={{paddingLeft: "8px"}}>
                    <Grid item md={8} xs={12}>
                      <Grid>
                        <TextField
                          fullWidth
                          label="우편 번호"
                          size="small"
                          variant="outlined"
                          name="zipCode"                    
                        />
                        <TextField
                          fullWidth
                          label="주소"
                          size="small"
                          variant="outlined"
                          name="address1"      
                        />
                      </Grid>
                    </Grid>                    
                    <Grid item md={4} xs={12}>
                      <Button
                        variant="contained"
                        size="medium"
                        color="primary"
                        startIcon={<SearchIcon/>}
                      >
                        우편번호 찾기
                      </Button>
                      <TextField
                        fullWidth
                        label="주소우편 번호"
                        size="small"
                        variant="outlined"
                        name="address2"     
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid container spacing={2} className="align-items-center">
                  <Grid item md={2} xs={12}>
                    <h5>대표전화</h5>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="대표전화"
                      size="small"
                      variant="outlined"
                      name="representativeNumber"                    
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2} className="align-items-center">
                  <Grid item md={2} xs={12}>
                    <h5>팩스번호</h5>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="팩스번호"
                      size="small"
                      variant="outlined"
                      name="representativeFaxNumber"                    
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2} className="align-items-center">
                  <Grid item md={2} xs={12}>
                    <h5>통신판매신고번호</h5>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="번호"
                      size="small"
                      variant="outlined"
                      name="salesNumber"                    
                    />
                  </Grid>
                </Grid>
                
                <Grid container spacing={2} className="align-items-center">
                  <Grid item md={2} xs={12}>
                    <h5>인감 이미지 등록</h5>
                  </Grid>
                  
                  <Grid container spacing={2} md={10} xs={12} style={{paddingLeft: "8px"}}>
                    <Grid item md={2} xs={12} >      
                      <input
                        type="file"
                        accept="image/*"
                        id="icon-button-file"
                        className="displayNone"
                      />
                      <label htmlFor="icon-button-file">
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                        >
                          <PhotoLibraryIcon />
                        </IconButton>
                      </label>
                    </Grid>
                    <Grid item md={8} xs={12}>
                      <h5>가로x세로 74픽셀, jpg/png/gif만 가능  등록된 인감 이미지는 "일반 세금계산서, 간이영수증, 거래명세서" 등에 사용.</h5>
                    </Grid>
                  </Grid>
                </Grid>
                
                <Grid container spacing={2} className="align-items-center">
                  <Grid item md={2} xs={12}>
                    <h5>현금영수증 가맹점로고 하단 footer노출여부</h5>
                  </Grid>
                  
                  <Grid container spacing={2} md={10} xs={12} style={{paddingLeft: "8px"}}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="active"
                          color="primary"
                          value={false}
                        />
                      }
                      label="현금영수증 가맹점"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="active"
                          color="primary"
                          value={false}
                        />
                      }
                      label="현금영수증 의무발행 가맹점 노출"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="active"
                          color="primary"
                          value={false}
                        />
                      }
                      label="이미지 직접등록"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="active"
                          color="primary"
                          value={false}
                          defaultChecked={true}
                        />
                      }
                      label="노출 안함"
                    />
                  </Grid>
                </Grid>
                
                <Grid container spacing={2} className="align-items-center">
                  <Grid item md={2} xs={12}>
                    <h5>전화번호</h5>
                  </Grid>
                  
                  <Grid container spacing={2} md={6} xs={12} style={{paddingLeft: "8px"}}>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="번호"
                        size="small"
                        variant="outlined"
                        name="phoneNumber1"                    
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <TextField
                        fullWidth
                        label="번호"
                        size="small"
                        variant="outlined"
                        name="phoneNumber2"                    
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid container spacing={2} className="align-items-center">
                  <Grid item md={2} xs={12}>
                    <h5>팩스번호</h5>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="팩스번호"
                      size="small"
                      variant="outlined"
                      name="faxNumber"                    
                    />
                  </Grid>
                </Grid>                

                <Grid container spacing={2} className="align-items-center">
                  <Grid item md={2} xs={12}>
                    <h5>이메일</h5>
                  </Grid>

                  <Grid container spacing={2} md={8} xs={12} style={{paddingLeft: "8px"}}>
                    <Grid item md={5} xs={12}>
                      <TextField
                        fullWidth
                        label="이메일"
                        size="small"
                        variant="outlined"
                        name="email1"
                      />
                    </Grid>
                    <Grid item md={1} xs={12} className="text-center"><h4>@</h4></Grid>
                    <Grid item md={3} xs={12}>
                      <TextField
                        fullWidth
                        size="small"
                        variant="outlined"
                        name="email2"
                      />
                    </Grid>
                    {/*<Grid item md={3} xs={12}><h5>대표 이메일은 쇼핑몰에서 메일 발송 시 기본 발송자 이메일 정보로 사용.</h5></Grid>*/}
                  </Grid>
                </Grid>

                <Grid container spacing={2} className="align-items-center">
                  <Grid item md={2} xs={12}>
                    <h5>운영시간</h5>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="운영시간"
                      size="small"
                      variant="outlined"
                      name="timeTable"                    
                    />
                  </Grid>
                </Grid>    
              </form>
              

              <Divider className="mt-20" />

              <Grid container spacing={2} className="mt-20">
                <Grid item>
                  <Button
                    form="my-form-managemnt"
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

export default withSnackbar(connect(mapStateToProps, null)(Form));
