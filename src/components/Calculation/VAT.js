import React from "react";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import PageTitle from "../../core/common/Partials/PageTitle";
import PaginationMaterial from "@material-ui/lab/Pagination";
import { Grid, TextField, Button, InputLabel, Table, TableBody, TableRow, TableCell} from "@material-ui/core";
import SubjectIcon from '@material-ui/icons/Subject';
import ResetIcon from '@material-ui/icons/Refresh';
import SearchIcon from '@material-ui/icons/Search';
import DownloadIcon from '@material-ui/icons/CloudDownload';

class TaxInvoice extends React.Component {    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Grid container>
                    <Grid item>
                        <PageTitle
                        menuName="부가세신고 내역"
                        title="정산관리"
                        icon={<SubjectIcon />}
                        />
                    </Grid>
                </Grid> 
                
                <div className="card mt-20">
                    <Grid container spacing={3} md={12} xs={12} className="mt-20">
                        <Grid item md={12} xs={12} className="align-items-center">  
                            <Table className="order_table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="align-items-center text-center" width="10%" style={{backgroundColor: "#f2f2f2", border: "1px solid #cccccc"}}>조회하기</TableCell>
                                        <TableCell>
                                            <Grid container md={12} xs={12} className="align-items-center">
                                                <Grid container md={5} xs={12}>
                                                    <Grid item md={5} xs={12} className="align-items-center">
                                                        <TextField
                                                            fullWidth
                                                            size="small"  
                                                            variant="outlined"
                                                            type="date"
                                                            name="startDate"
                                                        />
                                                    </Grid>
                                                    <Grid item md={1} xs={12} className="text-center" className="align-items-center" style={{paddingTop: "8px", paddingLeft: "1rem"}}>
                                                        <h5>~</h5>
                                                    </Grid>
                                                    <Grid item md={5} xs={12} className="align-items-center">
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            variant="outlined"
                                                            type="date"
                                                            name="endDate"
                                                        />
                                                    </Grid>
                                                </Grid>

                                                <Grid item md={5} xs={12} style={{paddingLeft: "10px", textAlign: "left"}}>
                                                    <InputLabel>+ 구매확정일 기준. 정산일(=구매확정일 +1영업일) 기준의 매출자료와는 금액 차이가 있을 수 있음</InputLabel>
                                                    <InputLabel className="mt-20">+ 최대 12개월 이내에서 조회만 가능</InputLabel>
                                                </Grid>

                                                <Grid item md={1} xs={12} style={{paddingLeft: "10px"}}>
                                                    <Button
                                                        fullWidth
                                                        size="medium"
                                                        variant="contained"     
                                                        color="primary"
                                                        startIcon={<SearchIcon/>}>검색</Button>
                                                </Grid>

                                                <Grid item md={1} xs={12} style={{paddingLeft: "10px"}}>
                                                    <Button
                                                        fullWidth
                                                        size="medium"
                                                        variant="contained"     
                                                        style={{border: "1px solid #cccbcb"}}
                                                        startIcon={<ResetIcon/>}>초기화</Button>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                    
                                    <TableRow>
                                        <TableCell colSpan={2} className="align-items-center" style={{textAlign: "left"}}>
                                            <InputLabel>+ 스마트스토어 매출집계일 기준은 구매확정 기준으로 실제 정산지급 일자와는 차이가 있음. (정산지급 = 구매확정 건만 해당)</InputLabel>
                                            <InputLabel className="mt-20">+ 기타' 항목은 휴대폰 결제 및 기타 포인트 아니벌써에서 발행한 쿠폰에 대한 매출 금액은 부가세신고 시 해당 금액은 '기타매출'로 포함하여 신고</InputLabel>
                                            <InputLabel className="mt-20">+ 제공한 자료는 부가세가 포함된 금액임</InputLabel>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} md={12} xs={12} className="mt-20">
                        <Grid item md={1} xs={12} className="align-items-center"><InputLabel>월별 내역</InputLabel></Grid>
                        <Grid item md={9} xs={12}></Grid>
                        <Grid item md={2} xs={12} className="align-items-center">  
                            <Button
                                fullWidth
                                size="medium"
                                variant="contained"     
                                style={{backgroundColor: "#0eb906", color: "#fff"}}
                                startIcon={<DownloadIcon/>}>엑셀다운</Button>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} md={12} xs={12} className="mt-20">
                        <Grid item md={12} xs={12}>
                            <Table className="order_table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell colSpan={7} className="align-items-center" style={{textAlign: "left"}}><InputLabel>부가세신고 월별 내역 결과표</InputLabel></TableCell>
                                    </TableRow>
                                    
                                    <TableRow style={{backgroundColor: "#f2f2f2", border: "1px solid #cccccc"}}>
                                        <TableCell className="text-center" rowSpan={3}><InputLabel><strong>부가세 신고기간</strong></InputLabel></TableCell>
                                        <TableCell className="text-center" colSpan={2}><InputLabel><strong>과세 / 면세 구분</strong></InputLabel></TableCell>
                                        <TableCell className="text-center" colSpan={4}><InputLabel><strong>상세내역</strong></InputLabel></TableCell>
                                    </TableRow>
                                    
                                    <TableRow style={{backgroundColor: "#f2f2f2", border: "1px solid #cccccc"}}>
                                        <TableCell className="text-center" rowSpan={2}><InputLabel><strong>과세매출금액</strong></InputLabel></TableCell>
                                        <TableCell className="text-center" rowSpan={2}><InputLabel><strong>면세매출금액</strong></InputLabel></TableCell>
                                        <TableCell className="text-center" rowSpan={2}><InputLabel><strong>신용카드 매출전표</strong></InputLabel></TableCell>
                                        <TableCell className="text-center" colSpan={2}><InputLabel><strong>현금영수증</strong></InputLabel></TableCell>
                                        <TableCell className="text-center" rowSpan={2}><InputLabel><strong>기타</strong></InputLabel></TableCell>
                                    </TableRow>
                                    
                                    <TableRow style={{backgroundColor: "#f2f2f2", border: "1px solid #cccccc"}}>
                                        <TableCell className="text-center"><InputLabel><strong>소득공제</strong></InputLabel></TableCell>
                                        <TableCell className="text-center"><InputLabel><strong>지출 증빙</strong></InputLabel></TableCell>
                                    </TableRow>
                                    
                                    <TableRow>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
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

                    <Grid container spacing={3} md={12} xs={12} className="mt-20">
                        <Grid item md={1} xs={12} className="align-items-center"><InputLabel>월간 상세 내역</InputLabel></Grid>
                        <Grid item md={5} xs={12}></Grid>
                        <Grid item md={2} xs={12} className="align-items-center">  
                            <Button
                                fullWidth
                                size="medium"
                                variant="contained"     
                                style={{backgroundColor: "#0eb906", color: "#fff"}}
                                startIcon={<DownloadIcon/>}>일별내역 다운</Button>
                        </Grid>
                        <Grid item md={2} xs={12} className="align-items-center" style={{paddingLeft: "10px"}}>  
                            <Button
                                fullWidth
                                size="medium"
                                variant="contained"     
                                style={{backgroundColor: "#0eb906", color: "#fff"}}
                                startIcon={<DownloadIcon/>}>건별 내역 다운</Button>
                        </Grid>
                        <Grid item md={2} xs={12} className="align-items-center" style={{paddingLeft: "10px"}}>  
                            <Button
                                fullWidth
                                size="medium"
                                variant="contained"     
                                style={{backgroundColor: "#0eb906", color: "#fff"}}
                                startIcon={<DownloadIcon/>}>대용량 다운</Button>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} md={12} xs={12} className="mt-20">
                        <Grid item md={12} xs={12}>
                            <Table className="order_table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell colSpan={8} className="align-items-center" style={{textAlign: "left"}}><InputLabel>정산내역 조회 결과표</InputLabel></TableCell>
                                    </TableRow>
                                    
                                    <TableRow style={{backgroundColor: "#f2f2f2", border: "1px solid #cccccc"}}>
                                        <TableCell className="text-center" rowSpan={2}><InputLabel><strong>정산 기준일</strong></InputLabel></TableCell>
                                        <TableCell className="text-center" rowSpan={2}><InputLabel><strong>총 매출금액</strong></InputLabel></TableCell>
                                        <TableCell className="text-center" rowSpan={2}><InputLabel><strong>과세매출금액</strong></InputLabel></TableCell>
                                        <TableCell className="text-center" rowSpan={2}><InputLabel><strong>면세매출금액</strong></InputLabel></TableCell>
                                        <TableCell className="text-center" rowSpan={2}><InputLabel><strong>신용카드 매출전표</strong></InputLabel></TableCell>
                                        <TableCell className="text-center" colSpan={2}><InputLabel><strong>현금영수증</strong></InputLabel></TableCell>
                                        <TableCell className="text-center" rowSpan={2}><InputLabel><strong>기타</strong></InputLabel></TableCell>
                                    </TableRow>
                                    
                                    <TableRow style={{backgroundColor: "#f2f2f2", border: "1px solid #cccccc"}}>
                                        <TableCell className="text-center"><InputLabel><strong>소득공제</strong></InputLabel></TableCell>
                                        <TableCell className="text-center"><InputLabel><strong>지출 증빙</strong></InputLabel></TableCell>
                                    </TableRow>
                                    
                                    <TableRow>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
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

                    <Grid container className="align-items-center mt-20">
                        <Grid item md={12} xs={12}>
                            <PaginationMaterial count={10} color="primary" />
                        </Grid>
                    </Grid>
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

export default withSnackbar(connect(mapStateToProps, null)(TaxInvoice));
