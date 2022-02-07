import React from "react";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import PageTitle from "../../core/common/Partials/PageTitle";
import { Grid, TextField, Button, InputLabel, Table, TableBody, TableRow, TableCell, Link, Dialog, DialogContent, DialogActions, Input,} from "@material-ui/core";
import { setLoggedUser } from "../../core/redux/Redux";
import SubjectIcon from '@material-ui/icons/Subject';
import ViewIcon from '@material-ui/icons/RemoveRedEye';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import { GET_USER, MARKET_INFO, UPDATE_MARKET, UPLOAD_CERTIFICATE, UPLOAD_FILE, UPLOAD_IMAGE} from "./Queries";
import { DropzoneArea } from "material-ui-dropzone";

class GenralInformation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            
            isOpenModal: false,
            id: null,
            marketName: null,
            ceoName: null,
            companyPhone: null,
            businessNumber: null,
            address1: null,
            address2: null,
            address3: null,
            postalCode: null,
            status: null,
            openHour: null,
            closeHour: null,
            deliveryFee: null,
            deliveryFreePrice: null,
            certificate: null,
            
            user: {
                userId: null,
                username: null,
                email: null,
                phoneNumber: null,
                allowMarketingMail: null,
            },
            processing: "",
        };

        this.onOpenModal = this.onOpenModal.bind(this);
        
    }   

    /**
     * @summary Open box
     * @param {event}
     */
    onOpenModal(e, index) {
        this.setState({
            index: index,
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

    componentDidMount() {
        
        // console.log('TEST', this.state.user);
        //this._isMounted = true;
        // fetch("http://api.anibeolsseo.com/graphql");

        this.props.apolloClient.httpClient
            .query({
                query: MARKET_INFO,
                variables: {
                    id: this.props.loggedUser.marketid,
                },
            })
            .then((result) => {
                //console.log(result.data.marketInfo)
                this.setState({
                    id: result.data.marketInfo.id,
                    marketName: result.data.marketInfo.name,
                    ceoName: result.data.marketInfo.ceoName,
                    companyPhone: result.data.marketInfo.companyPhone,
                    businessNumber: result.data.marketInfo.businessNumber,
                    address1: result.data.marketInfo.address1,
                    address2: result.data.marketInfo.address2,
                    address3: result.data.marketInfo.address3,
                    postalCode: result.data.marketInfo.postalCode,
                    status: result.data.marketInfo.status,
                    openHour: result.data.marketInfo.openHour,
                    closeHour: result.data.marketInfo.closeHour,
                    deliveryFee: result.data.marketInfo.deliveryFee,
                    deliveryFreePrice: result.data.marketInfo.deliveryFreePrice,
                });
            })
            .catch((error) => {
                console.log("CATCH:");
                this.props.enqueueSnackbar(
                    "Sorry, there is an error occurred while fetching data.",
                    { variant: "error" }
                );
            });
        this.props.apolloClient.httpClient
            .query({
                query: GET_USER,
                variables: {
                    id: this.props.loggedUser.userid,
                },
            })
            .then((result) => {
                this.setState({
                    user: result.data.getUser,
                });
                
            })
            .catch((error) => {
                console.log("CATCH:");
                this.props.enqueueSnackbar(
                    "Sorry, there is an error occurred while fetching data.",
                    { variant: "error" }
                );
            });
    }

    async onAttachUpload(event) {
        console.log(event.target.files[0]);
        //let file = new File(event.target.files[0]);
        this.setState({ certificate: event.target.files[0] });
        
      }
    /**
     * @summary Handle submit form
     * @param {MouseEvent} event
     */
     async onHandleSubmit(event) {
        event.preventDefault();
        console.log(this.state.certificate);
        // Form data
        
        const formData = new FormData(event.target);
        //formData.append("file", file);
        // Form data to object
        let loggedUser = this.state.user;
        let update = {
            id: this.state.id,
            openHour: formData.get("openHour"),
            closeHour: formData.get("closeHour"),
            ceoName: formData.get("ceoName"),
            //role: "ROLE_SELLER",
            companyPhone: formData.get("companyPhone"),
            bankName: formData.get("bankName"),
            bankAccountHolder: formData.get("bankAccountHolder"),
            bankAccountNumber: formData.get("bankAccountNumber"),
            deliveryTime: formData.get("deliveryTime"),
            customerCenterPhone: formData.get("customerCenterPhone"),
            customerCenterTime: formData.get("customerCenterTime"),
        };


        // Process
        this.setState({
            processing: "submit",
        });
        console.log(update);
        // Mutate
        await this.props.apolloClient.uploadClient
            .mutate({
                mutation: UPDATE_MARKET,
                variables: {
                    update:update,
                    businessCertificate: this.state.certificate,
                },
            })
            .then((result) => {
                
                if (
                    result &&
                    result.data &&
                    result.data.updateMarket.statusCode === 200
                ) {

                    this.props.enqueueSnackbar("Successfully updated.", {
                        variant: "success",
                    });
                    this.setState({
                        processing: "done",
                    });
                }
            })
            .catch((error) => {
                this.props.enqueueSnackbar("Error occured!", {
                    variant: "error",
                });
            });

        this.setState({
            user: loggedUser,
            processing: "",
        });
    }

    

    render() {
        return (
            <React.Fragment>
                <Grid container>
                    <Grid item>
                        <PageTitle
                        menuName="기본 정보 설정"
                        title="기본 정보 설정"
                        icon={<SubjectIcon />}
                        />
                    </Grid>
                </Grid> 
                
                <div className="card mt-20">
                    <Grid container spacing={3} md={12} xs={12}>
                        <Grid item md={2} xs={12} className="align-items-center">
                            <h5>마트 정보 </h5>
                        </Grid>
                        <Grid item md={9} xs={12} className="align-items-center"></Grid>
                        <Grid item md={1} xs={12} className="align-items-center">
                            <Button
                                fullWidth
                                size="medium"
                                variant="contained"  
                                style={{backgroundColor: "#FF5733", color: "#fff"}}
                                startIcon={<EditIcon/>}
                                onClick={this.onOpenModal.bind(this)}>수정</Button>    
                        </Grid>
                    </Grid>
                    
                    <Grid container spacing={3} md={12} xs={12}>
                        <Grid item md={12} xs={12} className="align-items-center">  
                            <Table className="member_table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="align-items-center text-center" width="10%"><strong>상호명 </strong></TableCell>
                                        <TableCell width="40%">
                                            <Grid container md={8} xs={12} className="align-items-center">
                                                <Grid item md={3} xs={12}><InputLabel>{this.state.marketName} </InputLabel></Grid>
                                                <Grid item md={4} xs={12} style={{textAlign: "center"}} className="align-items-center"><InputLabel style={{color: "#fff", marginLeft: "5px", padding: "10px", backgroundColor: "#72d4fb", borderRadius: "5px"}}>{this.state.marketName}</InputLabel></Grid>
                                            </Grid>
                                        </TableCell>
                                        <TableCell className="align-items-center text-center" width="10%"><strong>사업자등록번호</strong></TableCell>
                                        <TableCell width="40%"><InputLabel>{this.state.businessNumber}</InputLabel></TableCell>
                                    </TableRow>
                                    
                                    <TableRow>
                                        <TableCell className="align-items-center text-center" width="10%"><strong>업태</strong></TableCell>
                                        <TableCell width="40%"><InputLabel>{this.state.status}</InputLabel></TableCell>
                                        <TableCell className="align-items-center text-center" width="10%"><strong>업종</strong></TableCell>
                                        <TableCell width="40%"><InputLabel>-</InputLabel></TableCell>
                                    </TableRow>
                                    
                                    <TableRow>
                                        <TableCell className="align-items-center text-center" width="10%"><strong>사업자 주소</strong></TableCell>
                                        <TableCell colSpan={3}><InputLabel>{this.state.address1} {this.state.address2} {this.state.address3}</InputLabel></TableCell>
                                    </TableRow>
                                    
                                    <TableRow>
                                        <TableCell className="align-items-center text-center" width="10%"><strong>운영시간</strong></TableCell>
                                        <TableCell width="40%"><InputLabel>오전 {this.state.openHour} ~ 오후 {this.state.closeHour}</InputLabel></TableCell>
                                        <TableCell className="align-items-center text-center" width="10%"><strong>배달영업시간</strong></TableCell>
                                        <TableCell width="40%"><InputLabel>오전 9 : 00 ~ 오후 9 : 00</InputLabel></TableCell>
                                    </TableRow>
                                    
                                    <TableRow>
                                        <TableCell className="align-items-center text-center" width="10%"><strong>대표자명</strong></TableCell>
                                        <TableCell width="40%"><InputLabel>{this.state.ceoName}</InputLabel></TableCell>
                                        <TableCell className="align-items-center text-center" width="10%"><strong>대표번호</strong></TableCell>
                                        <TableCell width="40%"><InputLabel>{this.state.companyPhone}</InputLabel></TableCell>
                                    </TableRow>
                                    
                                    <TableRow>
                                        <TableCell className="align-items-center text-center" width="10%"><strong>고객센터</strong></TableCell>
                                        <TableCell width="40%"><InputLabel>000-0000-0000</InputLabel></TableCell>
                                        <TableCell className="align-items-center text-center" width="10%"><strong>전화문의 시간</strong></TableCell>
                                        <TableCell width="40%"><InputLabel>오전 9 : 00 ~ 오후 9 : 00</InputLabel></TableCell>
                                    </TableRow>
                                    
                                    <TableRow>
                                        <TableCell className="align-items-center text-center" width="10%"><strong>사업자 사본 이미지</strong></TableCell>
                                        <TableCell width="40%">
                                            <Grid container md={10} xs={12} className="align-items-center">
                                                <Grid item md={6} xs={12}><Link>모닝마트 사업자 사본.pdf</Link></Grid>
                                                <Grid item md={3} xs={12}>
                                                    <Button
                                                        fullWidth
                                                        size="medium"
                                                        variant="contained"  
                                                        color="primary"
                                                        style={{marginLeft: "5px"}}
                                                        startIcon={<ViewIcon/>}>보기</Button>    
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                        <TableCell className="align-items-center text-center" width="10%"><strong>정산유형</strong></TableCell>
                                        <TableCell width="40%"><InputLabel>주 정산(7X7)</InputLabel></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid> 

                    <Grid container spacing={3} md={12} xs={12} className="mt-20">
                        <Grid item md={12} xs={12} className="align-items-center">
                            <h5>대표 담당자 정보</h5>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} md={12} xs={12}>
                        <Grid item md={12} xs={12}>
                            <Table className="order_table">
                                <TableBody>
                                    <TableRow style={{backgroundColor: "#f2f2f2", border: "1px solid #cccccc"}}>
                                        <TableCell className="text-center" width="25%"><strong>이름</strong></TableCell>
                                        <TableCell className="text-center" width="25%"><strong>아이디</strong></TableCell>
                                        <TableCell className="text-center" width="25%"><strong>휴대폰 번호</strong></TableCell>
                                        <TableCell className="text-center" width="25%"><strong>이메일</strong></TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell className="text-center">{this.state.user.username}</TableCell>
                                        <TableCell className="text-center">{this.state.user.userId}</TableCell>
                                        <TableCell className="text-center">{this.state.user.phoneNumber}</TableCell>
                                        <TableCell className="text-center">{this.state.user.email}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} md={12} xs={12} className="mt-20">
                        <Grid item md={12} xs={12} className="align-items-center">
                            <h5>은행 정보</h5>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} md={12} xs={12}>
                        <Grid item md={12} xs={12}>
                            <Table className="order_table">
                                <TableBody>
                                    <TableRow style={{backgroundColor: "#f2f2f2", border: "1px solid #cccccc"}}>
                                        <TableCell className="text-center" width="20%"><strong>통장사본</strong></TableCell>
                                        <TableCell className="text-center" width="16%"><strong>은행</strong></TableCell>
                                        <TableCell className="text-center" width="16%"><strong>계좌번호</strong></TableCell>
                                        <TableCell className="text-center" width="16%"><strong>예금주</strong></TableCell>
                                        <TableCell className="text-center" width="16%"><strong>통장사본 이미지</strong></TableCell>
                                        <TableCell className="text-center" width="16%"><strong>메모</strong></TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell className="text-center">
                                            <Grid container md={12} xs={12} className="align-items-center">
                                                <Grid item md={8} xs={12} style={{textAlign: "left"}}><Link>모닝마트 통장.pdf</Link></Grid>
                                                <Grid item md={4} xs={12}>
                                                    <Button
                                                        fullWidth
                                                        size="medium"
                                                        variant="contained"  
                                                        color="primary"
                                                        style={{paddingLeft: "5px"}}
                                                        startIcon={<ViewIcon/>}>보기</Button>    
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>

                    <Dialog open={this.state.isOpenModal} aria-labelledby="responsive-dialog-title" maxWidth="lg" fullWidth>
                        <form onSubmit={this.onHandleSubmit.bind(this)}  >
                        <DialogContent>
                            <Grid container spacing={3} md={12} xs={12}>
                                <Grid item md={4} xs={12} className="align-items-center">
                                    <h5>마트 정보</h5>
                                </Grid>
                            </Grid>
                            
                            <Grid container spacing={3} md={12} xs={12}>
                                <Grid item md={12} xs={12} className="align-items-center">  
                                    <Table className="member_table">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className="align-items-center text-center" width="15%"><strong>상호명</strong></TableCell>
                                                <TableCell width="35%">
                                                    <Grid container md={8} xs={12} className="align-items-center">
                                                        <Grid item md={3} xs={12}><InputLabel>{this.state.marketName} </InputLabel></Grid>
                                                        <Grid item md={4} xs={12} style={{textAlign: "center"}} className="align-items-center"><InputLabel style={{color: "#fff", marginLeft: "5px", padding: "10px", backgroundColor: "#72d4fb", borderRadius: "5px"}}>{this.state.marketName} </InputLabel></Grid>
                                                    </Grid>
                                                </TableCell>
                                                <TableCell className="align-items-center text-center" width="15%"><strong>사업자등록번호</strong></TableCell>
                                                <TableCell width="35%"><InputLabel>{this.state.businessNumber} </InputLabel></TableCell>
                                            </TableRow>
                                            
                                            <TableRow>
                                                <TableCell className="align-items-center text-center" width="15%"><strong>업태</strong></TableCell>
                                                <TableCell width="35%">
                                                    
                                                    <Grid item md={10} xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            defaultValue={this.state.status}
                                                            size="small"
                                                            variant="outlined"
                                                        />
                                                    </Grid>
                                                </TableCell>
                                                <TableCell className="align-items-center text-center" width="15%"><strong>업종</strong></TableCell>
                                                <TableCell width="35%">
                                                    <Grid item md={10} xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            defaultValue="-"
                                                            size="small"
                                                            variant="outlined"
                                                        />
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                            
                                            <TableRow>
                                                <TableCell className="align-items-center text-center" width="15%"><strong>사업자 주소</strong></TableCell>
                                                <TableCell colSpan={3}><InputLabel>경기도 고양시 일산서 일현로 107</InputLabel></TableCell>
                                            </TableRow>
                                            
                                            <TableRow>
                                                <TableCell className="align-items-center text-center" width="15%"><strong>운영시간</strong></TableCell>
                                                <TableCell width="35%">
                                                    <Grid container md={12} xs={12} className="align-items-center">
                                                        <Grid item md={6} xs={12} style={{textAlign: "left"}}>
                                                            오전 <TextField
                                                            name="openHour"
                                                            fullWidth
                                                            defaultValue={this.state.openHour}
                                                            size="small"
                                                            variant="outlined"/>
                                                        </Grid>
                                                        <Grid item md={6} xs={12}>
                                                            오후 <TextField
                                                            name="closeHour"
                                                            fullWidth
                                                            defaultValue={this.state.closeHour}
                                                            size="small"
                                                            variant="outlined"/>
                                                        </Grid>
                                                    </Grid>
                                                    
                                                    
                                                </TableCell>
                                                <TableCell className="align-items-center text-center" width="15%"><strong>배달영업시간</strong></TableCell>
                                                <TableCell width="35%">
                                                    <Grid item md={10} xs={12}>
                                                        <TextField
                                                            name="deliveryTime"
                                                            medium
                                                            defaultValue="오전 9 : 00 ~ 오후 9 : 00"
                                                            size="small"
                                                            variant="outlined"
                                                        />
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                            
                                            <TableRow>
                                                <TableCell className="align-items-center text-center" width="15%"><strong>대표자명</strong></TableCell>
                                                <TableCell width="35%">
                                                    <Grid item md={10} xs={12}>
                                                        <TextField
                                                            name="ceoName"
                                                            fullWidth
                                                            defaultValue={this.state.ceoName}
                                                            size="small"
                                                            variant="outlined"
                                                        />
                                                    </Grid>
                                                </TableCell>
                                                <TableCell className="align-items-center text-center" width="15%"><strong>대표번호</strong></TableCell>
                                                <TableCell width="35%">
                                                    <Grid item md={10} xs={12}>
                                                        <TextField
                                                            name="companyPhone"
                                                            fullWidth
                                                            defaultValue={this.state.companyPhone}
                                                            size="small"
                                                            variant="outlined"
                                                        />
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                            
                                            <TableRow>
                                                <TableCell className="align-items-center text-center" width="15%"><strong>고객센터</strong></TableCell>
                                                <TableCell width="35%">
                                                    <Grid item md={10} xs={12}>
                                                        <TextField
                                                            name="customerCenterPhone"
                                                            fullWidth
                                                            defaultValue="000-0000-0000"
                                                            size="small"
                                                            variant="outlined"
                                                        />
                                                    </Grid>
                                                </TableCell>
                                                <TableCell className="align-items-center text-center" width="15%"><strong>전화문의 시간</strong></TableCell>
                                                <TableCell width="35%">
                                                    <Grid item md={10} xs={12}>
                                                        <TextField
                                                            name="customerCenterTime"
                                                            fullWidth
                                                            defaultValue="오전 9 : 00 ~ 오후 9 : 00"
                                                            size="small"
                                                            variant="outlined"
                                                        />
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                            
                                            <TableRow>
                                                <TableCell className="align-items-center text-center" width="15%"><strong>사업자 사본 이미지</strong></TableCell>
                                                <TableCell width="35%">
                                                    <Grid container md={10} xs={12} className="align-items-center">
                                                        <Grid item md={6} xs={12}><Link>모닝마트 사업자 사본.pdf</Link></Grid>
                                                        <Grid item md={4} xs={12}>
                                                            <Button
                                                                fullWidth
                                                                size="medium"
                                                                variant="contained"  
                                                                color="primary"
                                                                style={{marginLeft: "5px"}}
                                                                startIcon={<EditIcon/>}>변경</Button>    
                                                        </Grid>
                                                    </Grid>
                                                </TableCell>
                                                <TableCell className="align-items-center text-center" width="15%"><strong>정산유형</strong></TableCell>
                                                <TableCell width="35%"><InputLabel>주 정산(7X7)</InputLabel></TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Grid>
                            </Grid> 

                            <Grid container spacing={3} md={12} xs={12}>
                                <Grid item md={12} xs={12} className="align-items-center">
                                    <h5>은행 정보</h5>
                                </Grid>
                            </Grid>
                            
                            <Grid container spacing={3} md={12} xs={12}>
                                <Grid item md={12} xs={12}>
                                    <Table className="order_table">
                                        <TableBody>
                                            <TableRow style={{backgroundColor: "#f2f2f2", border: "1px solid #cccccc"}}>
                                                <TableCell className="text-center" width="24%"><strong>통장사본 이미지</strong></TableCell>
                                                <TableCell className="text-center" width="17%"><strong>은행</strong></TableCell>
                                                <TableCell className="text-center" width="17%"><strong>계좌번호</strong></TableCell>
                                                <TableCell className="text-center" width="17%"><strong>예금주</strong></TableCell>
                                                <TableCell className="text-center" width="25%"><strong>메모</strong></TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell className="text-center">
                                                    <Grid container md={12} xs={12} className="align-items-center">
                                                        <Grid item md={8} xs={12} style={{textAlign: "left"}}><Link>모닝마트 사업자 사본.pdf</Link></Grid>
                                                        <Grid item md={4} xs={12}>
                                                            <label>
                                                                <Input
                                                                    id="fileInput"
                                                                    onChange={this.onAttachUpload.bind(this)}
                                                                    name="file"
                                                                    accept=".jpg, .pdf"
                                                                    type="file"
                                                                    style={{ display: "none" }}
                                                                />
                                                                <Button
                                                                    fullWidth
                                                                    component="span"
                                                                    size="medium"
                                                                    variant="contained"
                                                                    color="primary"
                                                                    style={{paddingLeft: "5px"}}
                                                                    startIcon={<EditIcon />}
                                                                >
                                                                    변경
                                                                </Button>
                                                                </label>   

                                                                {/* <DropzoneArea
                                                                    maxFileSize={30000000}
                                                                    acceptedFiles={["image/jpeg", "image/png"]}
                                                                    filesLimit={10}
                                                                    onDrop={this.onDrop.bind(this)}
                                                                />    */}
                                                        </Grid>
                                                    </Grid>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <TextField
                                                        name="bankName"
                                                        fullWidth
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <TextField
                                                        name="bankAccountNumber"
                                                        fullWidth
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <TextField
                                                        name="bankAccountHolder"
                                                        fullWidth
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <TextField
                                                        name="note"
                                                        fullWidth
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Grid>
                            </Grid>
                            
                        </DialogContent>
                        
                        <DialogActions>
                            <Button
                                type="submit"
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
                        </form>
                    </Dialog>
                </div>
            </React.Fragment>
        );
    }
}

// Redux state to props
const mapStateToProps = (state) => {
    return {
        apolloClient: state.apolloClient,
        loggedUser: state.loggedUser,
    };
};

export default withSnackbar(connect(mapStateToProps, { setLoggedUser })(GenralInformation));
