import React from "react";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import PageTitle from "../../../core/common/Partials/PageTitle";
import { Grid, TextField, Button, FormControl, Select, MenuItem, InputLabel, Table, TableBody, TableRow, TableCell, FormControlLabel, Checkbox, Link,
        Dialog, DialogTitle, DialogContent, DialogActions, Divider, RadioGroup, Radio, TextareaAutosize, InputAdornment} from "@material-ui/core";
import PaginationMaterial from "@material-ui/lab/Pagination";
import SubjectIcon from '@material-ui/icons/Subject';
import AddIcon from '@material-ui/icons/Add';
import DownloadIcon from '@material-ui/icons/CloudDownload';

class AllPaymentManagement extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpenModal: false,
            isOpenModal1: false,
        };

        this.onOpenModal = this.onOpenModal.bind(this);
        this.onOpenModal1 = this.onOpenModal1.bind(this);
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
     * @summary Open box
     * @param {event}
     */
    onOpenModal1(e, index) {
        this.setState({
            index: index,
            isOpenModal1: true,
        });
    }

    /**
     * @summary Close box
     * @param {event}
     */
    onCloseModal1() {
        this.setState({ isOpenModal1: false });
    }

    render() {
        return (
            <React.Fragment>
                <Grid container>
                    <Grid item>
                        <PageTitle
                        menuName="통합정산관리"
                        title="통합정산관리"
                        icon={<SubjectIcon />}
                        />
                    </Grid>
                </Grid> 
                
                <div className="card mt-20">
                    <Grid container spacing={3} md={12} xs={12} className="text-right">
                        <Grid item md={2} xs={12} className="align-items-center text-center" style={{marginLeft: "auto"}}>
                            <Button
                                fullWidth
                                size="medium"
                                variant="contained"
                                color="primary"
                                startIcon={<AddIcon/>}
                                onClick={this.onOpenModal1.bind(this)}
                            >수기등록</Button>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} md={10} xs={12} className="mt-12">
                        <Grid item md={12} xs={12} className="text-left" style={{paddingTop: "1vh", paddingBottom: "1vh"}}>
                            <InputLabel>금일 공급자(마트)에 입금해야 할 정산 예정금액 : 총 <i style={{color: "#ff0000", fontStyle: "normal"}}><strong>1,576,000</strong></i> 원 | 금일 정산할 마트 : <i style={{color: "#ff0000", fontStyle: "normal"}}><strong>2</strong></i> 개 업체</InputLabel></Grid>
                    </Grid>

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
                                        <TableCell className="text-center" width="3vh" rowspan={2}><strong>선택</strong></TableCell>
                                        <TableCell className="text-center" width="3vh" rowspan={2}><strong>정산번호</strong></TableCell>
                                        <TableCell className="text-center" width="3vh" rowspan={2}><strong>마트명</strong></TableCell>
                                        <TableCell className="text-center" width="5vh" rowspan={2}><strong>예정 입금일</strong></TableCell>
                                        <TableCell className="text-center" width="5vh" rowspan={2}><strong>거래기간</strong></TableCell>
                                        <TableCell className="text-center" width="3vh" rowspan={2}><strong>합계</strong></TableCell>
                                        <TableCell className="text-center" colSpan={2}><strong>거래기간 매출금액</strong></TableCell>
                                        <TableCell className="text-center" width="3vh" rowspan={2}><strong>(A)<br/>배송완료금액</strong></TableCell>
                                        <TableCell className="text-center" width="3vh" rowspan={2}><strong>(B)<br/>배송비</strong></TableCell>
                                        <TableCell className="text-center" colspan={7}><strong>(C)<br/>차감내역</strong></TableCell>
                                        <TableCell className="text-center" width="4vh"><strong>(D) 조정금액</strong></TableCell>
                                        <TableCell className="text-center" width="10vh" rowspan={2}><strong>마트로 입금할 금액<br/>(주문금액+배송비)-차감금액</strong></TableCell>
                                        <TableCell className="text-center" width="4vh" rowspan={2}><strong>정산상태</strong></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="text-center" width="3vh"><strong>배송완료</strong></TableCell>
                                        <TableCell className="text-center" width="3vh"><strong>배송완료 전</strong></TableCell>
                                        <TableCell className="text-center" width="8vh"><strong>(C-1)<br/>혜택비용</strong></TableCell>
                                        <TableCell className="text-center" width="8vh"><strong>(C-2)<br/>할인 이벤트 금액<br/>(쿠폰 등)</strong></TableCell>
                                        <TableCell className="text-center" width="8vh"><strong>(C-3)<br/>아니벌써<br/>기본 수수료</strong></TableCell>
                                        <TableCell className="text-center" width="8vh"><strong>(C-4)<br/>마트 자체 할인</strong></TableCell>
                                        <TableCell className="text-center" width="8vh"><strong>(C-5)<br/>아니벌써<br/>할인비용</strong></TableCell>
                                        <TableCell className="text-center" width="8vh"><strong>(C-6)<br/>소비자<br/>포인트 비용</strong></TableCell>
                                        <TableCell className="text-center" width="8vh"><strong>(C-7)<br/>기타비용</strong></TableCell>
                                        <TableCell className="text-center" width="10vh"><strong>(배송완료+배송비) – 차감 내액</strong></TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell className="text-center">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        color="primary"
                                                        value={true}
                                                    />
                                                }
                                            />
                                        </TableCell>
                                        <TableCell className="text-center">12344567</TableCell>
                                        <TableCell className="text-center">모닝 마트<br/><Link>(상세보기)</Link></TableCell>
                                        <TableCell className="text-center">2021.02.08</TableCell>
                                        <TableCell className="text-center">2021.02.01~2021.02.07</TableCell>
                                        <TableCell className="text-center">1,000,000</TableCell>
                                        <TableCell className="text-center">900,000</TableCell>
                                        <TableCell className="text-center">100,000</TableCell>
                                        <TableCell className="text-center">900,000</TableCell>
                                        <TableCell className="text-center">100,000</TableCell>
                                        <TableCell className="text-center">30,000</TableCell>
                                        <TableCell className="text-center">0</TableCell>
                                        <TableCell className="text-center">81,000</TableCell>
                                        <TableCell className="text-center">0</TableCell>
                                        <TableCell className="text-center">0</TableCell>
                                        <TableCell className="text-center">1,000</TableCell>
                                        <TableCell className="text-center">0</TableCell>
                                        <TableCell className="text-center">900,000-(30,000+9%(81,000)+1,000)= 112,000원</TableCell>
                                        <TableCell className="text-center">788,000</TableCell>
                                        <TableCell className="text-center"><i style={{color: "#a4069b"}}>정산확정</i></TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell className="text-center">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        color="primary"
                                                        value={true}
                                                    />
                                                }
                                            />
                                        </TableCell>
                                        <TableCell className="text-center">12344567</TableCell>
                                        <TableCell className="text-center">모닝 마트<br/><Link>(상세보기)</Link></TableCell>
                                        <TableCell className="text-center">2021.02.08</TableCell>
                                        <TableCell className="text-center">2021.02.01~2021.02.07</TableCell>
                                        <TableCell className="text-center">1,000,000</TableCell>
                                        <TableCell className="text-center">900,000</TableCell>
                                        <TableCell className="text-center">100,000</TableCell>
                                        <TableCell className="text-center">900,000</TableCell>
                                        <TableCell className="text-center">100,000</TableCell>
                                        <TableCell className="text-center">30,000</TableCell>
                                        <TableCell className="text-center">0</TableCell>
                                        <TableCell className="text-center">81,000</TableCell>
                                        <TableCell className="text-center">0</TableCell>
                                        <TableCell className="text-center">0</TableCell>
                                        <TableCell className="text-center">1,000</TableCell>
                                        <TableCell className="text-center">0</TableCell>
                                        <TableCell className="text-center">900,000-(30,000+9%(81,000)+1,000)= 112,000원</TableCell>
                                        <TableCell className="text-center">788,000</TableCell>
                                        <TableCell className="text-center"><i style={{color: "#0ab1da"}}>정산예정</i></TableCell>
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

                    <Dialog open={this.state.isOpenModal1}
                        aria-labelledby="responsive-dialog-title"
                        maxWidth="lg">
                        <DialogTitle id="responsive-dialog-title" style={{textAlign: "center"}}>
                            <h2>수기 정산 등록<br/>(정산 후 상품, 배송비, 기타 목록 환불)</h2>
                        </DialogTitle>
                        <Divider />
                        
                        <DialogContent>
                            <Grid item md={12} xs={12}>
                                <Table className="member_table">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="text-center" width="25%"><strong>공급사(마트)</strong></TableCell>
                                            <TableCell className="text-center" width="75%">
                                                <Grid item md={12} xs={12}>
                                                    <Button
                                                        fullWidth
                                                        size="medium"
                                                        variant="contained" 
                                                        color="primary">공급사  선택</Button>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="text-center" width="25%"><strong>정산타입</strong></TableCell>
                                            <TableCell className="text-center" width="75%">
                                                <Grid item md={12} xs={12}>
                                                    <FormControl size="small" fullWidth variant="outlined">
                                                        <InputLabel>주문상품</InputLabel>
                                                        <Select>
                                                            <MenuItem value="1">환불금액</MenuItem>
                                                            <MenuItem value="2">혜택비용</MenuItem>
                                                            <MenuItem value="3">할인 이벤트 금액(쿠폰 등)</MenuItem>
                                                            <MenuItem value="4">기본 수수료(9%)</MenuItem>
                                                            <MenuItem value="5">마트 자체 할인</MenuItem>
                                                            <MenuItem value="6">아니벌써 할인비용</MenuItem>
                                                            <MenuItem value="7">소비자 포인트 비용</MenuItem>
                                                            <MenuItem value="8">정산 후 환불(주문상품)</MenuItem>
                                                            <MenuItem value="9">정산 후 환불(배송비)</MenuItem>
                                                            <MenuItem value="10">기타비용</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="text-center" width="25%"><strong>수정금액</strong></TableCell>
                                            <TableCell className="text-center" width="75%">
                                                <Grid container md={12} xs={12}>
                                                    <Grid item md={4} xs={12}>
                                                        <FormControl size="small" fullWidth variant="outlined">
                                                            <InputLabel>+</InputLabel>
                                                            <Select>
                                                                <MenuItem value="0">+</MenuItem>
                                                                <MenuItem value="1">-</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item md={8} xs={12} style={{paddingLeft: "5px"}}>
                                                        <TextField
                                                            fullWidth
                                                            size="small"
                                                            variant="outlined"
                                                            InputProps={{
                                                                endAdornment: 
                                                                <InputAdornment position="end">원</InputAdornment>,
                                                            }}/>
                                                    </Grid>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="text-center" width="25%"><strong>수수료</strong></TableCell>
                                            <TableCell className="text-center" width="75%">
                                                <Grid item md={12} xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        variant="outlined"
                                                        InputProps={{
                                                            endAdornment: 
                                                            <InputAdornment position="end">%</InputAdornment>,
                                                        }}/>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="text-center" width="25%"><strong>수수료액</strong></TableCell>
                                            <TableCell className="text-center" width="75%">
                                                <Grid item md={12} xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        variant="outlined"
                                                        InputProps={{
                                                            endAdornment: 
                                                            <InputAdornment position="end">원</InputAdornment>,
                                                        }}/>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="text-center" width="25%"><strong>정산금액</strong></TableCell>
                                            <TableCell className="text-center" width="75%">
                                                <Grid item md={12} xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        variant="outlined"
                                                        InputProps={{
                                                            endAdornment: 
                                                            <InputAdornment position="end">원</InputAdornment>,
                                                        }}/>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="text-center" width="25%"><strong>메모</strong></TableCell>
                                            <TableCell className="text-center" width="75%">
                                                <Grid item md={12} xs={12}>
                                                    <TextareaAutosize minRows={3} placeholder="1. 직원 이름 : 2. 사유 : " style={{width: "98%", borderRadius: "5px"}}></TextareaAutosize>
                                                </Grid>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Grid>
                        </DialogContent>

                        <Divider />
                        <DialogActions>
                            <Button autoFocus onClick={this.onCloseModal1.bind(this)} color="primary">닫다</Button>
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

export default withSnackbar(connect(mapStateToProps, null)(AllPaymentManagement));
