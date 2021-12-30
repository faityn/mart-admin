import React from "react";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import { Grid, TextField, Button, InputLabel, Table, TableBody, TableRow, TableCell, InputAdornment, FormControlLabel, Checkbox,
        Dialog, DialogContent, DialogActions, Divider, Input, DialogTitle} from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import CheckIcon from '@material-ui/icons/Check';
import SendIcon from '@material-ui/icons/Send';
import UploadIcon from '@material-ui/icons/CloudUpload';
import SearchIcon from '@material-ui/icons/Search';

class RegisterMart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpenModal: false,
            isCodeSent: false,
        };

        this.onOpenModal = this.onOpenModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.onCodeSent = this.onCodeSent.bind(this);
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

    /**
     * @summary Close box
     * @param {event}
     */
    onCodeSent() {
        this.setState({ isCodeSent: true });
    }
    
    render() {
        return (
            <React.Fragment>                
                <div className="card mt-20">
                    <Grid container spacing={3} md={12} xs={12} className="align-items-center">
                        <Grid item md={2} xs={12}></Grid>
                        <Grid item md={8} xs={12} className="align-items-center">
                            <Table style={{border: "none"}}>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="text-center align-items-center" width="10%">아이디</TableCell>
                                        <TableCell className="text-center align-items-center" width="50%">
                                            <TextField
                                                fullWidth
                                                size="small"  
                                                variant="outlined"
                                            />
                                        </TableCell>
                                        <TableCell className="text-center align-items-center" rowSpan={2} width="20%">
                                            <Button
                                                fullWidth
                                                size="large"
                                                variant="contained"
                                                color="primary"
                                            >로그인
                                            </Button>
                                        </TableCell>
                                        <TableCell className="text-center align-items-center" rowSpan={2} width="20%">
                                            <Button
                                                fullWidth
                                                size="large"
                                                variant="contained"
                                                style={{backgroundColor: "#FF5733", color: "#fff"}}
                                                onClick={this.onOpenModal.bind(this)}
                                            >마트 등록
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                    
                                    <TableRow>
                                        <TableCell className="text-center align-items-center" width="10%">비밀번호</TableCell>
                                        <TableCell className="text-center align-items-center" width="50%">
                                            <TextField
                                                fullWidth
                                                size="small"  
                                                variant="outlined"
                                                type="password"
                                            />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>
                        <Grid item md={2} xs={12}></Grid>
                    </Grid>                   

                    <Dialog open={this.state.isOpenModal} maxWidth="md" fullWidth>
                        <DialogTitle>(주)아니벌써와 함께 비즈니스를 시작하세요!</DialogTitle>

                        <DialogContent>
                            <Grid container spacing={3} md={12} xs={12} className="align-items-center">
                                <Grid container md={12} xs={12} className="align-items-center mt-20">
                                    <Grid item md={4} xs={12}>
                                        <InputLabel>담당자 이름</InputLabel>
                                    </Grid>
                                    <Grid item md={8} xs={12}>
                                        <TextField
                                            fullWidth
                                            size="small"  
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container md={12} xs={12} className="align-items-center mt-20">
                                    <Grid item md={4} xs={12}>
                                        <InputLabel>아이디</InputLabel>
                                    </Grid>
                                    <Grid item md={5} xs={12}>
                                        <TextField
                                            fullWidth
                                            size="small"  
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={3} xs={12} style={{paddingLeft: "10px"}}>
                                        <Button
                                            fullWidth
                                            size="medium"
                                            variant="contained"
                                            style={{backgroundColor: "#FF5733", color: "#fff"}}
                                            startIcon={<CheckIcon/>}>중복 확인</Button>
                                    </Grid>
                                </Grid>

                                <Grid container md={12} xs={12} className="align-items-center mt-20">
                                    <Grid item md={4} xs={12}>
                                        <InputLabel>비밀번호</InputLabel>
                                    </Grid>
                                    <Grid item md={8} xs={12}>
                                        <TextField
                                            fullWidth
                                            size="small"  
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container md={12} xs={12} className="align-items-center mt-20">
                                    <Grid item md={4} xs={12}>
                                        <InputLabel>비밀번호 확인</InputLabel>
                                    </Grid>
                                    <Grid item md={8} xs={12}>
                                        <TextField
                                            fullWidth
                                            size="small"  
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container md={12} xs={12} className="align-items-center mt-20">
                                    <Grid item md={4} xs={12}>
                                        <InputLabel>상호명</InputLabel>
                                    </Grid>
                                    <Grid item md={8} xs={12}>
                                        <TextField
                                            fullWidth
                                            size="small"  
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container md={12} xs={12} className="align-items-center mt-20">
                                    <Grid item md={4} xs={12}>
                                        <InputLabel>대표자명</InputLabel>
                                    </Grid>
                                    <Grid item md={8} xs={12}>
                                        <TextField
                                            fullWidth
                                            size="small"  
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container md={12} xs={12} className="align-items-center mt-20">
                                    <Grid item md={4} xs={12}>
                                        <InputLabel>대표 전화번호</InputLabel>
                                    </Grid>
                                    <Grid item md={8} xs={12}>
                                        <TextField
                                            fullWidth
                                            size="small"  
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container md={12} xs={12} className="align-items-center mt-20">
                                    <Grid item md={4} xs={12}>
                                        <InputLabel>사업자등록번호</InputLabel>
                                    </Grid>
                                    <Grid item md={8} xs={12}>
                                        <TextField
                                            fullWidth
                                            size="small"  
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container md={12} xs={12} className="align-items-center mt-20">
                                    <Grid item md={4} xs={12}>
                                        <InputLabel>사업자등록증 사본(jpg, pdf) 등록</InputLabel>
                                    </Grid>
                                    <Grid item md={5} xs={12}>
                                        <TextField
                                            fullWidth
                                            size="small"  
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={3} xs={12} style={{paddingLeft: "10px"}}>
                                        <label>
                                            <Input accept=".jpg, .pdf" type="file" style={{display: "none"}} />
                                            <Button
                                                fullWidth
                                                component="span"
                                                size="medium"
                                                variant="contained"
                                                style={{border: "1px solid #cccbcb"}}
                                                startIcon={<UploadIcon/>}>찾아보기</Button>
                                        </label>
                                    </Grid>
                                </Grid>

                                <Grid container md={12} xs={12} className="align-items-center mt-20">
                                    <Grid item md={4} xs={12}>
                                        <InputLabel>사업자통장사본(jpg, jpeg, pdf) 등록</InputLabel>
                                    </Grid>
                                    <Grid item md={5} xs={12}>
                                        <TextField
                                            fullWidth
                                            size="small"  
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={3} xs={12} style={{paddingLeft: "10px"}}>
                                        <label>
                                            <Input accept=".jpg, .jpeg, .pdf" type="file" style={{display: "none"}} />
                                            <Button
                                                fullWidth
                                                component="span"
                                                size="medium"
                                                variant="contained"
                                                style={{border: "1px solid #cccbcb"}}
                                                startIcon={<UploadIcon/>}>찾아보기</Button>
                                        </label>
                                    </Grid>
                                </Grid>

                                <Grid container md={12} xs={12} className="align-items-center mt-20">
                                    <Grid item md={4} xs={12}>
                                        <InputLabel>주소</InputLabel>
                                    </Grid>
                                    <Grid item md={5} xs={12}>
                                        <TextField
                                            fullWidth
                                            size="small"  
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={3} xs={12} style={{paddingLeft: "10px"}}>
                                        <Button
                                            fullWidth
                                            component="span"
                                            size="medium"
                                            variant="contained"
                                            style={{border: "1px solid #cccbcb"}}
                                            startIcon={<SearchIcon/>}>주소 찾기</Button>
                                    </Grid>
                                </Grid>

                                <Grid container md={12} xs={12} className="align-items-center mt-20">
                                    <Grid item md={4} xs={12}>
                                        <InputLabel>배달영업 시간(오전 00 ~ 오후 00)</InputLabel>
                                    </Grid>
                                    <Grid item md={8} xs={12}>
                                        <Grid container>
                                            <Grid item md={6} xs={12} className="align-items-center">
                                                <Grid container>
                                                    <Grid item md={11}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"  
                                                            variant="outlined"
                                                            type="time"
                                                        />
                                                    </Grid>
                                                    <Grid item md={1} style={{paddingLeft: "10px"}} className="align-items-center">
                                                        <InputLabel>~</InputLabel>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item md={6} xs={12} className="align-items-center">
                                                <TextField
                                                    fullWidth
                                                    size="small"  
                                                    variant="outlined"
                                                    type="time"
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid container md={12} xs={12} className="align-items-center mt-20">
                                    <Grid item md={4} xs={12}>
                                        <InputLabel>기본 배송비</InputLabel>
                                    </Grid>
                                    <Grid item md={8} xs={12}>
                                        <TextField
                                            fullWidth
                                            size="small"  
                                            variant="outlined"
                                            type="number"
                                            InputProps={{ endAdornment: (<InputAdornment position="end">원</InputAdornment>),}}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container md={12} xs={12} className="align-items-center mt-20">
                                    <Grid item md={4} xs={12}>
                                        <InputLabel>배송비 조건</InputLabel>
                                    </Grid>
                                    <Grid item md={7} xs={12}>
                                        <TextField
                                            fullWidth
                                            size="small"  
                                            variant="outlined"
                                            type="number"
                                            InputProps={{ endAdornment: (<InputAdornment position="end">원</InputAdornment>),}}
                                        />
                                    </Grid>
                                    <Grid item md={1} xs={12} style={{textAlign: "center"}}><InputLabel>이상 무료</InputLabel></Grid>
                                </Grid>
                                
                                <Grid container md={12} xs={12} className="align-items-center mt-20">
                                    <Grid item md={4} xs={12}>
                                        <InputLabel>담당자 이메일</InputLabel>
                                    </Grid>
                                    <Grid item md={8} xs={12}>
                                        <TextField
                                            fullWidth
                                            size="small"  
                                            variant="outlined"
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container md={12} xs={12} className="align-items-center mt-20">
                                    <Grid item md={4} xs={12}>
                                        <InputLabel>휴대폰 번호(인증요청)</InputLabel>
                                    </Grid> 
                                    <Grid item md={5} xs={12}>
                                        <TextField
                                            fullWidth
                                            size="small"  
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={3} xs={12} style={{paddingLeft: "10px"}}>
                                        <Button
                                            fullWidth
                                            size="medium"
                                            variant="contained"
                                            style={{backgroundColor: "#FFC300"}}
                                            onClick={this.onCodeSent.bind(this)}
                                            startIcon={<SendIcon/>}>{this.state.isCodeSent === false ? "인증번호 요청" : "인증번호 재요청"}</Button>
                                    </Grid>
                                </Grid>

                                <Grid container md={12} xs={12} className="align-items-center mt-20">
                                    <Grid item md={4} xs={12}>
                                        <InputLabel>인증번호 입력</InputLabel>
                                    </Grid>
                                    <Grid item md={5} xs={12}>
                                        <TextField
                                            fullWidth
                                            size="small"  
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={3} xs={12} style={{paddingLeft: "10px"}}>
                                        <Button
                                            fullWidth
                                            size="medium"
                                            variant="contained"
                                            color="primary"
                                            startIcon={<CheckIcon/>}>확인</Button>
                                    </Grid>
                                </Grid>

                                <Grid container md={12} xs={12} className="align-items-center mt-20">
                                    <Grid item md={4} xs={12}></Grid>
                                    <Grid item md={8} xs={12}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    color="primary"
                                                    value={true}
                                                />
                                            }
                                            label="아니벌써 이용약관 동의"
                                        />
                                    </Grid>
                                </Grid>

                                <Grid container md={12} xs={12} className="align-items-center">
                                    <Grid item md={4} xs={12}></Grid>
                                    <Grid item md={8} xs={12}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    color="primary"
                                                    value={true}
                                                />
                                            }
                                            label="개인정보 수집 및 이용 동의"
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </DialogContent>

                        <Divider />

                        <DialogActions>
                            <Button
                                size="medium"
                                variant="outlined"
                                style={{backgroundColor: "#0eb906", color: "#fff"}}
                                startIcon={<SaveIcon/>}
                                onClick={this.onCloseModal.bind(this)}
                            >완료</Button>
                            <Button
                                size="medium"
                                variant="outlined"
                                style={{backgroundColor: "#fff", color: "#000"}}
                                startIcon={<CancelIcon/>}
                                onClick={this.onCloseModal.bind(this)}
                            >취소</Button>
                        </DialogActions>
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
    };
};

export default withSnackbar(connect(mapStateToProps, null)(RegisterMart));
