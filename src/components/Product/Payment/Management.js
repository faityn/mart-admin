import React from "react";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import PageTitle from "../../../core/common/Partials/PageTitle";
import { Grid, TextField, Button, FormControl, Select, MenuItem, InputLabel, Table, TableBody, TableRow, TableCell, FormControlLabel, Checkbox, Link,
        Dialog, DialogTitle, DialogContent, DialogActions, Divider, RadioGroup, Radio} from "@material-ui/core";
import PaginationMaterial from "@material-ui/lab/Pagination";
import SubjectIcon from '@material-ui/icons/Subject';
import DownloadIcon from '@material-ui/icons/CloudDownload';

class PaymentManagement extends React.Component {
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
                        menuName="정산관리"
                        title="정산관리"
                        icon={<SubjectIcon />}
                        />
                    </Grid>
                </Grid> 
                
                <div className="card mt-20">
                    <Grid container spacing={3} md={10} xs={12}>
                        <Grid item md={2} xs={12} className="align-items-center">
                            <h5>정산 검색</h5>
                        </Grid>

                        <Grid item md={10} xs={12} className="align-items-center"> 
                            <Grid item md={1} xs={12}>
                                <FormControl size="small" fullWidth variant="outlined">
                                    <InputLabel>2021년</InputLabel>
                                    <Select>
                                        <MenuItem value="2015">2015년</MenuItem>
                                        <MenuItem value="2016">2016년</MenuItem>
                                        <MenuItem value="2017">2017년</MenuItem>
                                        <MenuItem value="2018">2018년</MenuItem>
                                        <MenuItem value="2019">2019년</MenuItem>
                                        <MenuItem value="2020">2020년</MenuItem>
                                        <MenuItem value="2021">2021년</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid container md={5} xs={12} style={{marginLeft: "10px"}}>
                                <Grid item md={5} xs={12} className="align-items-center">
                                    <TextField
                                        fullWidth
                                        size="small"  
                                        variant="outlined"
                                        type="date"
                                        name="startDate"
                                    />
                                </Grid>
                                <Grid item md={1} xs={12} className="text-center" className="align-items-center" style={{paddingTop: "6px", paddingLeft: "1rem"}}>
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
                            <Grid item md={5} xs={12} className="align-items-center">
                                <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    placeholder="검색어 입력"
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} md={12} xs={12}>
                        <Grid item md={12} xs={12} className="align-items-center">  
                            <Table className="member_table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="align-items-center text-center" width="10%">공급자(마트) 구분</TableCell>
                                        <TableCell>
                                            <Grid container md={6} xs={12} className="align-items-center">
                                                <Grid item md={2} xs={12} className="text-center">
                                                    <InputLabel>마트</InputLabel>
                                                </Grid>
                                                <Grid item md={3} xs={12}>
                                                    <Button
                                                        fullWidth
                                                        size="medium"
                                                        variant="contained"
                                                        color="primary" 
                                                        onClick={this.onOpenModal.bind(this)}
                                                    >마트 선택</Button>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="align-items-center text-center" width="5%">정산 형태</TableCell>
                                        <TableCell>
                                            <Grid container md={12} xs={12} className="align-items-center">
                                                <Grid item md={1} xs={12}>
                                                    <RadioGroup aria-label="paymentType" name="paymentType">
                                                        <FormControlLabel
                                                            value="true"
                                                            control={<Radio />}
                                                            label="전체"
                                                            checked={true}
                                                        />
                                                    </RadioGroup>
                                                </Grid>
                                                
                                                <Grid item md={1} xs={12}>
                                                    <RadioGroup aria-label="paymentType" name="paymentType">
                                                        <FormControlLabel
                                                            value="true"
                                                            control={<Radio />}
                                                            label="주문상품"
                                                        />
                                                    </RadioGroup>
                                                </Grid>
                                                
                                                <Grid item md={1} xs={12}>
                                                    <RadioGroup aria-label="paymentType" name="paymentType">
                                                        <FormControlLabel
                                                            value="true"
                                                            control={<Radio />}
                                                            label="배송비"
                                                        />
                                                    </RadioGroup>
                                                </Grid>
                                                
                                                <Grid item md={2} xs={12}>
                                                    <RadioGroup aria-label="paymentType" name="paymentType">
                                                        <FormControlLabel
                                                            value="true"
                                                            control={<Radio />}
                                                            label="정산 후 환불(주문상품)"
                                                        />
                                                    </RadioGroup>
                                                </Grid>
                                                
                                                <Grid item md={2} xs={12}>
                                                    <RadioGroup aria-label="paymentType" name="paymentType">
                                                        <FormControlLabel
                                                            value="true"
                                                            control={<Radio />}
                                                            label="정산 후 환불(배송비)"
                                                        />
                                                    </RadioGroup>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="align-items-center text-center" width="5%">요청 타입</TableCell>
                                        <TableCell>
                                            <Grid container md={12} xs={12} className="align-items-center">
                                                <Grid item md={1} xs={12}>
                                                    <RadioGroup aria-label="requestType" name="requestType">
                                                        <FormControlLabel
                                                            value="true"
                                                            control={<Radio />}
                                                            label="전체"
                                                            checked={true}
                                                        />
                                                    </RadioGroup>
                                                </Grid>
                                                
                                                <Grid item md={1} xs={12}>
                                                    <RadioGroup aria-label="requestType" name="requestType">
                                                        <FormControlLabel
                                                            value="true"
                                                            control={<Radio />}
                                                            label="일반"
                                                        />
                                                    </RadioGroup>
                                                </Grid>
                                                
                                                <Grid item md={1} xs={12}>
                                                    <RadioGroup aria-label="requestType" name="requestType">
                                                        <FormControlLabel
                                                            value="true"
                                                            control={<Radio />}
                                                            label="수기"
                                                        />
                                                    </RadioGroup>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="align-items-center text-center" width="5%">정산 상태</TableCell>
                                        <TableCell>
                                            <Grid container md={12} xs={12} className="align-items-center">
                                                <Grid item md={1} xs={12}>
                                                    <RadioGroup aria-label="paymentStatus" name="paymentStatus">
                                                        <FormControlLabel
                                                            value="true"
                                                            control={<Radio />}
                                                            label="전체"
                                                            checked={true}
                                                        />
                                                    </RadioGroup>
                                                </Grid>
                                                
                                                <Grid item md={1} xs={12}>
                                                    <RadioGroup aria-label="paymentStatus" name="paymentStatus">
                                                        <FormControlLabel
                                                            value="true"
                                                            control={<Radio />}
                                                            label="이월"
                                                        />
                                                    </RadioGroup>
                                                </Grid>
                                                
                                                <Grid item md={1} xs={12}>
                                                    <RadioGroup aria-label="paymentStatus" name="paymentStatus">
                                                        <FormControlLabel
                                                            value="true"
                                                            control={<Radio />}
                                                            label="보류"
                                                        />
                                                    </RadioGroup>
                                                </Grid>
                                                
                                                <Grid item md={1} xs={12}>
                                                    <RadioGroup aria-label="paymentStatus" name="paymentStatus">
                                                        <FormControlLabel
                                                            value="true"
                                                            control={<Radio />}
                                                            label="대기"
                                                        />
                                                    </RadioGroup>
                                                </Grid>
                                                
                                                <Grid item md={1} xs={12}>
                                                    <RadioGroup aria-label="paymentStatus" name="paymentStatus">
                                                        <FormControlLabel
                                                            value="true"
                                                            control={<Radio />}
                                                            label="반려"
                                                        />
                                                    </RadioGroup>
                                                </Grid>
                                                
                                                <Grid item md={1} xs={12}>
                                                    <RadioGroup aria-label="paymentStatus" name="paymentStatus">
                                                        <FormControlLabel
                                                            value="true"
                                                            control={<Radio />}
                                                            label="예정"
                                                        />
                                                    </RadioGroup>
                                                </Grid>
                                                
                                                <Grid item md={1} xs={12}>
                                                    <RadioGroup aria-label="paymentStatus" name="paymentStatus">
                                                        <FormControlLabel
                                                            value="true"
                                                            control={<Radio />}
                                                            label="지급완료"
                                                        />
                                                    </RadioGroup>
                                                </Grid>
                                                
                                                <Grid item md={1} xs={12}>
                                                    <RadioGroup aria-label="paymentStatus" name="paymentStatus">
                                                        <FormControlLabel
                                                            value="true"
                                                            control={<Radio />}
                                                            label="정산확정"
                                                        />
                                                    </RadioGroup>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="align-items-center text-center" width="5%">기간검색</TableCell>
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
                                                    <Grid item md={1} xs={12} className="text-center" className="align-items-center" style={{paddingTop: "5px", paddingLeft: "1.3rem"}}>
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
                                                <Grid container md={7} xs={12} className="align-items-center">
                                                    <Grid item md={1} xs={12}>
                                                        <Button
                                                            fullWidth
                                                            size="medium"
                                                            variant="contained"
                                                            style={{border: "1px solid #cccbcb"}}
                                                        >오늘
                                                        </Button>
                                                    </Grid>
                                                    <Grid item md={1} xs={12} style={{marginLeft: "5px"}}>
                                                        <Button
                                                            fullWidth
                                                            size="medium"
                                                            variant="contained"
                                                            style={{border: "1px solid #cccbcb"}}
                                                        >7일</Button>
                                                    </Grid>
                                                    <Grid item md={2} xs={12} style={{marginLeft: "5px"}}>
                                                        <Button
                                                            fullWidth
                                                            size="medium"
                                                            variant="contained"
                                                            style={{border: "1px solid #cccbcb"}}
                                                        >15일</Button>
                                                    </Grid>
                                                    <Grid item md={2} xs={12} style={{marginLeft: "5px"}}>
                                                        <Button
                                                            fullWidth
                                                            size="medium"
                                                            variant="contained"
                                                            style={{border: "1px solid #cccbcb"}}
                                                        >1개월</Button>
                                                    </Grid>
                                                    <Grid item md={2} xs={12} style={{marginLeft: "5px"}}>
                                                        <Button
                                                            fullWidth
                                                            size="medium"
                                                            variant="contained"
                                                            style={{border: "1px solid #cccbcb"}}
                                                        >3개월</Button>
                                                    </Grid>
                                                    <Grid item md={2} xs={12} style={{marginLeft: "5px"}}>
                                                        <Button
                                                            fullWidth
                                                            size="medium"
                                                            variant="contained"
                                                            style={{border: "1px solid #cccbcb"}}
                                                        >6개월</Button>
                                                    </Grid>
                                                    <Grid item md={1} xs={12} style={{marginLeft: "5px"}}>
                                                        <Button
                                                            fullWidth
                                                            size="medium"
                                                            variant="contained"
                                                            style={{border: "1px solid #cccbcb"}}
                                                        >1년</Button>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} md={12} xs={12} style={{marginTop: "10px"}}>
                        <Grid item md={10} xs={12} className="align-items-center">
                            <Grid container>
                                <Grid item md={2} xs={12}>
                                    <h5>선택한 정산을</h5>
                                </Grid>

                                <Grid item md={8} xs={12} className="align-items-center"> 
                                    <Grid item md={3} xs={12}>
                                        <FormControl size="small" fullWidth variant="outlined">
                                            <InputLabel>정산상태</InputLabel>
                                            <Select>
                                                <MenuItem value="1">이월</MenuItem>
                                                <MenuItem value="2">보류</MenuItem>
                                                <MenuItem value="3">대기</MenuItem>
                                                <MenuItem value="4">반려</MenuItem>
                                                <MenuItem value="5">정산예정</MenuItem>
                                                <MenuItem value="6">지급완료</MenuItem>
                                                <MenuItem value="7">정산확정</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item md={2} xs={12} className="align-items-center" style={{marginLeft: "10px"}}>
                                        <Button
                                            fullWidth
                                            size="medium"
                                            variant="contained"     
                                            color="primary">일괄처리</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={2} xs={12} className="align-items-center">
                            <Button
                                fullWidth
                                size="medium"
                                variant="contained"     
                                style={{backgroundColor: "#0eb906", color: "#fff"}}
                                startIcon={<DownloadIcon/>}>엑셀 다운로드</Button>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} md={12} xs={12} className="mt-12">
                        <Grid item md={12} xs={12} style={{maxWidth: "100%", overflowX: "auto"}}>
                            <Table className="order_table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="text-center" rowspan={2}><strong>주문번호</strong></TableCell>
                                        <TableCell className="text-center" rowspan={2}><strong>상품주문번호</strong></TableCell>
                                        <TableCell className="text-center" rowspan={2}><strong>구분</strong></TableCell>
                                        <TableCell className="text-center" rowspan={2}><strong>상품명</strong></TableCell>
                                        <TableCell className="text-center" rowspan={2}><strong>구매자명</strong></TableCell>
                                        <TableCell className="text-center" rowspan={2}><strong>정산기준일</strong></TableCell>
                                        <TableCell className="text-center" rowspan={2}><strong>정산예정일</strong></TableCell>
                                        <TableCell className="text-center" rowspan={2}><strong>정산완료일</strong></TableCell>
                                        <TableCell className="text-center" rowspan={2}><strong>결제금액</strong></TableCell>
                                        <TableCell className="text-center" rowspan={2}><strong>결제수수료</strong></TableCell>
                                        <TableCell className="text-center" colspan={2}><strong>수수료</strong></TableCell>
                                        <TableCell className="text-center" rowspan={2}><strong>무이자할부 수수료</strong></TableCell>
                                        <TableCell className="text-center" rowspan={2}><strong>정산구분</strong></TableCell>
                                        <TableCell className="text-center" colspan={4}><strong>주 결제 수단</strong></TableCell>
                                        <TableCell className="text-center" colspan={2}><strong>PAY</strong></TableCell>
                                        <TableCell className="text-center" colspan={3}><strong>보조 결제수단</strong></TableCell>
                                        <TableCell className="text-center" rowspan={2}><strong>기타</strong></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="text-center"><strong>a</strong></TableCell>
                                        <TableCell className="text-center"><strong>b</strong></TableCell>
                                        <TableCell className="text-center"><strong>신용카드</strong></TableCell>
                                        <TableCell className="text-center"><strong>계좌이체</strong></TableCell>
                                        <TableCell className="text-center"><strong>무통장 입금</strong></TableCell>
                                        <TableCell className="text-center"><strong>휴대폰 결제</strong></TableCell>
                                        <TableCell className="text-center"><strong>XX 페이</strong></TableCell>
                                        <TableCell className="text-center"><strong>카카오페이</strong></TableCell>
                                        <TableCell className="text-center"><strong>포인트 결제</strong></TableCell>
                                        <TableCell className="text-center"><strong>쿠폰</strong></TableCell>
                                        <TableCell className="text-center"><strong>이벤트</strong></TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell className="text-center">2019122442030911</TableCell>
                                        <TableCell className="text-center">20191224101604145216</TableCell>
                                        <TableCell className="text-center">배송비</TableCell>
                                        <TableCell className="text-center">샘표식품 매운탕찌개양념140g</TableCell>
                                        <TableCell className="text-center">박경숙</TableCell>
                                        <TableCell className="text-center">2020.01.05~2020.01.09</TableCell>
                                        <TableCell className="text-center">2020.01.06</TableCell>
                                        <TableCell className="text-center">2020.01.06</TableCell>
                                        <TableCell className="text-center">3,000</TableCell>
                                        <TableCell className="text-center">-112</TableCell>
                                        <TableCell className="text-center">9</TableCell>
                                        <TableCell className="text-center">0</TableCell>
                                        <TableCell className="text-center">0</TableCell>
                                        <TableCell className="text-center">예정</TableCell>
                                        <TableCell className="text-center">8,480</TableCell>
                                        <TableCell className="text-center">-</TableCell>
                                        <TableCell className="text-center">-</TableCell>
                                        <TableCell className="text-center">-</TableCell>
                                        <TableCell className="text-center">-</TableCell>
                                        <TableCell className="text-center">-</TableCell>
                                        <TableCell className="text-center">50</TableCell>
                                        <TableCell className="text-center">500</TableCell>
                                        <TableCell className="text-center">0</TableCell>
                                        <TableCell className="text-center">-</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>

                    <Grid container className="mt-20">
                        <Grid item xs={12}>
                            <PaginationMaterial
                                count={10}
                                color="primary"
                            />
                        </Grid>
                    </Grid>

                    <Dialog open={this.state.isOpenModal}
                        aria-labelledby="responsive-dialog-title"
                        maxWidth="lg">
                        <DialogTitle id="responsive-dialog-title">
                            <h2>마트 선택</h2>
                        </DialogTitle>
                        <Divider />
                        
                        <DialogContent>
                            <Grid item md={12} xs={12}>
                                <Table className="order_table">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="text-center"><strong>정산번호</strong></TableCell>
                                            <TableCell className="text-center"><strong>마트명</strong></TableCell>
                                            <TableCell className="text-center"><strong>예정입금일</strong></TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="text-center">012345</TableCell>
                                            <TableCell className="text-center">영구 마트 <br/><Link>(상세내역 보기)</Link></TableCell>
                                            <TableCell className="text-center">2021.02.08</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="text-center">012345</TableCell>
                                            <TableCell className="text-center">영구 마트 <br/><Link>(상세내역 보기)</Link></TableCell>
                                            <TableCell className="text-center">2021.02.08</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="text-center">012345</TableCell>
                                            <TableCell className="text-center">영구 마트 <br/><Link>(상세내역 보기)</Link></TableCell>
                                            <TableCell className="text-center">2021.02.08</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="text-center">012345</TableCell>
                                            <TableCell className="text-center">영구 마트 <br/><Link>(상세내역 보기)</Link></TableCell>
                                            <TableCell className="text-center">2021.02.08</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="text-center">012345</TableCell>
                                            <TableCell className="text-center">영구 마트 <br/><Link>(상세내역 보기)</Link></TableCell>
                                            <TableCell className="text-center">2021.02.08</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Grid>
                        </DialogContent>

                        <Divider />
                        <DialogActions>
                            <Button autoFocus onClick={this.onCloseModal.bind(this)} color="primary">닫다</Button>
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

export default withSnackbar(connect(mapStateToProps, null)(PaymentManagement));
