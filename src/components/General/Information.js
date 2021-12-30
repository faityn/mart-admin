import React from "react";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import PageTitle from "../../core/common/Partials/PageTitle";
import { Grid, TextField, Button, InputLabel, Table, TableBody, TableRow, TableCell, Link, Dialog, DialogContent, DialogActions} from "@material-ui/core";
import SubjectIcon from '@material-ui/icons/Subject';
import ViewIcon from '@material-ui/icons/RemoveRedEye';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';

class GenralInformation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpenModal: false,
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
                            <h5>마트 정보</h5>
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
                                        <TableCell className="align-items-center text-center" width="10%"><strong>상호명</strong></TableCell>
                                        <TableCell width="40%">
                                            <Grid container md={8} xs={12} className="align-items-center">
                                                <Grid item md={3} xs={12}><InputLabel>모닝 마트</InputLabel></Grid>
                                                <Grid item md={4} xs={12} style={{textAlign: "center"}} className="align-items-center"><InputLabel style={{color: "#fff", marginLeft: "5px", padding: "10px", backgroundColor: "#72d4fb", borderRadius: "5px"}}>모닝 마트</InputLabel></Grid>
                                            </Grid>
                                        </TableCell>
                                        <TableCell className="align-items-center text-center" width="10%"><strong>사업자등록번호</strong></TableCell>
                                        <TableCell width="40%"><InputLabel>123-45-6789</InputLabel></TableCell>
                                    </TableRow>
                                    
                                    <TableRow>
                                        <TableCell className="align-items-center text-center" width="10%"><strong>업태</strong></TableCell>
                                        <TableCell width="40%"><InputLabel>도매 및 소매업</InputLabel></TableCell>
                                        <TableCell className="align-items-center text-center" width="10%"><strong>업종</strong></TableCell>
                                        <TableCell width="40%"><InputLabel>-</InputLabel></TableCell>
                                    </TableRow>
                                    
                                    <TableRow>
                                        <TableCell className="align-items-center text-center" width="10%"><strong>사업자 주소</strong></TableCell>
                                        <TableCell colSpan={3}><InputLabel>경기도 고양시 일산서 일현로 107</InputLabel></TableCell>
                                    </TableRow>
                                    
                                    <TableRow>
                                        <TableCell className="align-items-center text-center" width="10%"><strong>운영시간</strong></TableCell>
                                        <TableCell width="40%"><InputLabel>오전 9 : 00 ~ 오후 9 : 00</InputLabel></TableCell>
                                        <TableCell className="align-items-center text-center" width="10%"><strong>배달영업시간</strong></TableCell>
                                        <TableCell width="40%"><InputLabel>오전 9 : 00 ~ 오후 9 : 00</InputLabel></TableCell>
                                    </TableRow>
                                    
                                    <TableRow>
                                        <TableCell className="align-items-center text-center" width="10%"><strong>대표자명</strong></TableCell>
                                        <TableCell width="40%"><InputLabel>김모닝</InputLabel></TableCell>
                                        <TableCell className="align-items-center text-center" width="10%"><strong>대표번호</strong></TableCell>
                                        <TableCell width="40%"><InputLabel>000-0000-0000</InputLabel></TableCell>
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
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
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
                                                        <Grid item md={3} xs={12}><InputLabel>모닝 마트</InputLabel></Grid>
                                                        <Grid item md={4} xs={12} style={{textAlign: "center"}} className="align-items-center"><InputLabel style={{color: "#fff", marginLeft: "5px", padding: "10px", backgroundColor: "#72d4fb", borderRadius: "5px"}}>모닝 마트</InputLabel></Grid>
                                                    </Grid>
                                                </TableCell>
                                                <TableCell className="align-items-center text-center" width="15%"><strong>사업자등록번호</strong></TableCell>
                                                <TableCell width="35%"><InputLabel>123-45-6789</InputLabel></TableCell>
                                            </TableRow>
                                            
                                            <TableRow>
                                                <TableCell className="align-items-center text-center" width="15%"><strong>업태</strong></TableCell>
                                                <TableCell width="35%">
                                                    <Grid item md={10} xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            value="도매 및 소매업"
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
                                                            value="-"
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
                                                    <Grid item md={10} xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            value="오전 9 : 00 ~ 오후 9 : 00"
                                                            size="small"
                                                            variant="outlined"
                                                        />
                                                    </Grid>
                                                </TableCell>
                                                <TableCell className="align-items-center text-center" width="15%"><strong>배달영업시간</strong></TableCell>
                                                <TableCell width="35%">
                                                    <Grid item md={10} xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            value="오전 9 : 00 ~ 오후 9 : 00"
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
                                                            fullWidth
                                                            value="김모닝"
                                                            size="small"
                                                            variant="outlined"
                                                        />
                                                    </Grid>
                                                </TableCell>
                                                <TableCell className="align-items-center text-center" width="15%"><strong>대표번호</strong></TableCell>
                                                <TableCell width="35%">
                                                    <Grid item md={10} xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            value="000-0000-0000"
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
                                                            fullWidth
                                                            value="000-0000-0000"
                                                            size="small"
                                                            variant="outlined"
                                                        />
                                                    </Grid>
                                                </TableCell>
                                                <TableCell className="align-items-center text-center" width="15%"><strong>전화문의 시간</strong></TableCell>
                                                <TableCell width="35%">
                                                    <Grid item md={10} xs={12}>
                                                        <TextField
                                                            fullWidth
                                                            value="오전 9 : 00 ~ 오후 9 : 00"
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
                                                            <Button
                                                                fullWidth
                                                                size="medium"
                                                                variant="contained"  
                                                                color="primary"
                                                                style={{paddingLeft: "5px"}}
                                                                startIcon={<EditIcon/>}>변경</Button>    
                                                        </Grid>
                                                    </Grid>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <TextField
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

export default withSnackbar(connect(mapStateToProps, null)(GenralInformation));
