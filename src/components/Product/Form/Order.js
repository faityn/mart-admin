import React from "react";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import PageTitle from "../../../core/common/Partials/PageTitle";
import {Grid, TextField, Button, FormControl, Select, MenuItem, InputLabel, Table, TableBody, TableRow, TableCell, FormControlLabel, Checkbox,
    Dialog, DialogContent, Divider, DialogActions} from "@material-ui/core";
import PaginationMaterial from "@material-ui/lab/Pagination";
import SubjectIcon from '@material-ui/icons/Subject';
import SearchIcon from '@material-ui/icons/Search';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import CancelIcon from '@material-ui/icons/Cancel';
import PrintIcon from '@material-ui/icons/Print';
import ConfirmIcon from '@material-ui/icons/Check';

class Order extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tabIndex: 0,
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
                            menuName="주문통합리스트"
                            title="주문통합리스트"
                            icon={<SubjectIcon />}
                        />
                    </Grid>
                </Grid>

                <div className="card mt-20">
                    <Grid container spacing={3} md={10} xs={12} className="align-items-center">
                        <Grid item md={2} xs={12}><h5>배송진행</h5></Grid>
                        <Grid item md={10} xs={12} className="text-left"><InputLabel>오늘 출발 할 배송<i style={{ color: "#ff0000", fontStyle: "normal"}}><strong> 0 </strong></i>건 | 배송 중 문제<i style={{ color: "#ff0000", fontStyle: "normal"}}><strong> 0 </strong></i>건 | 교환<i style={{ color: "#ff0000", fontStyle: "normal"}}><strong> 0 </strong></i>건 | 반품<i style={{ color: "#ff0000", fontStyle: "normal"}}><strong> 0 </strong></i>건</InputLabel></Grid>
                    </Grid>

                    <Grid container spacing={3} md={10} xs={12}>
                        <Grid item md={2} xs={12} className="align-items-center">
                            <h5>조회기간</h5>
                        </Grid>

                        <Grid item md={10} xs={12} className="align-items-center">
                            <Grid item md={2} xs={12} className="align-items-center">
                                <FormControl size="small" fullWidth variant="outlined">
                                    <InputLabel>결제일</InputLabel>
                                    <Select>
                                        <MenuItem value="">...</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            
                            <Grid item md={1} xs={12} style={{ paddingLeft: "10px" }}>
                                <Button
                                    fullWidth
                                    size="medium"
                                    variant="contained"
                                    style={{ border: "1px solid #cccbcb" }}
                                >오늘
                                </Button>
                            </Grid>
                            <Grid item md={1} xs={12} style={{ paddingLeft: "5px" }}>
                                <Button
                                    fullWidth
                                    size="medium"
                                    variant="contained"
                                    style={{ border: "1px solid #cccbcb" }}
                                >1주일
                                </Button>
                            </Grid>
                            <Grid item md={2} xs={12} style={{ paddingLeft: "5px" }}>
                                <Button
                                    fullWidth
                                    size="medium"
                                    variant="contained"
                                    style={{ border: "1px solid #cccbcb" }}
                                >이번 달
                                </Button>
                            </Grid>
                            <Grid item md={1} xs={12} style={{ paddingLeft: "5px" }}>
                                <Button
                                    fullWidth
                                    size="medium"
                                    variant="contained"
                                    style={{ border: "1px solid #cccbcb" }}
                                >1개월
                                </Button>
                            </Grid>
                            <Grid item md={1} xs={12} style={{ paddingLeft: "5px" }}>
                                <Button
                                    fullWidth
                                    size="medium"
                                    variant="contained"
                                    style={{ border: "1px solid #cccbcb" }}
                                >3개월
                                </Button>
                            </Grid>
                            <Grid container md={4} xs={12}>
                                <Grid item md={5} xs={12} className="align-items-center" style={{ paddingLeft: "10px" }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        type="date"
                                        name="startDate"
                                    />
                                </Grid>
                                <Grid item md={1} xs={12} className="text-center" className="align-items-center" style={{ paddingLeft: "1rem" }}>
                                    <h5>~</h5>
                                </Grid>
                                <Grid item md={5} xs={12} className="align-items-center" style={{ paddingLeft: "5px" }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        type="date"
                                        name="endDate"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} md={10} xs={12}>
                        <Grid item md={2} xs={12}>
                            <h5>상세조건</h5>
                        </Grid>

                        <Grid item md={10} xs={12} className="align-items-center">
                            <Grid item md={2} xs={12} className="align-items-center">
                                <FormControl size="small" fullWidth variant="outlined">
                                    <InputLabel>전체</InputLabel>
                                    <Select>
                                        <MenuItem value="">...</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item md={8} xs={12} className="align-items-center text-center" style={{ paddingLeft: "10px" }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                    placeholder="배송한 마트 / 주문자명 / 수취인명"
                                />
                            </Grid>
                            <Grid container md={2} xs={12} style={{ paddingLeft: "10px" }}>
                                <Grid item md={10} xs={12} className="align-items-center text-center">
                                    <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained"
                                        color="primary"
                                        startIcon={<SearchIcon />}
                                    >검색</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} md={12} xs={12}>
                        <Grid item md={2} xs={12} className="align-items-center">
                            <h5>목록 (총<i style={{ color: "#ff0000", fontStyle: "normal"}}><strong> 0 </strong></i>개)</h5>
                        </Grid>

                        <Grid item md={10} xs={12} className="align-items-center">
                            <Grid container>
                                {/*
                                <Grid item md={2} xs={12} className="align-items-center">
                                    <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained" 
                                        style={{backgroundColor: "#0eb906", color: "#fff"}}>신규주문 건 배송 준비중 처리</Button>
                                </Grid>
                                <Grid item md={2} xs={12} className="align-items-center" style={{paddingLeft: "5px" }}>
                                    <FormControl size="small" fullWidth variant="outlined">
                                        <InputLabel>선택</InputLabel>
                                        <Select>
                                            <MenuItem value="1">신규주문</MenuItem>
                                            <MenuItem value="2">배송 준비중</MenuItem>
                                            <MenuItem value="3">재배송</MenuItem>
                                            <MenuItem value="4">재배송 완료</MenuItem>
                                            <MenuItem value="5">배송완료</MenuItem>
                                            <MenuItem value="6">취소요청</MenuItem>
                                            <MenuItem value="7">최소완료</MenuItem>
                                            <MenuItem value="8">배송보류</MenuItem>
                                            <MenuItem value="9">교환요청</MenuItem>
                                            <MenuItem value="10">교환완료</MenuItem>
                                            <MenuItem value="11">반품, 환불 요청</MenuItem>
                                            <MenuItem value="12">반품(환불완료)</MenuItem>
                                            <MenuItem value="13">부분반품</MenuItem>
                                            <MenuItem value="14">부분반품(환불완료)</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={1} xs={12} className="align-items-center" style={{paddingLeft: "5px" }}>
                                    <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained" 
                                        color="primary">일괄변경</Button>
                                </Grid> */}
                                <Grid item md={4}></Grid>
                                <Grid item md={2} xs={12} className="align-items-center">
                                    <FormControl size="small" fullWidth variant="outlined">
                                        <InputLabel>최근 신규주문</InputLabel>
                                        <Select>
                                            <MenuItem value="">...</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={2} xs={12} className="align-items-center" style={{paddingLeft: "5px" }}>
                                    <FormControl size="small" fullWidth variant="outlined">
                                        <InputLabel>20개씩</InputLabel>
                                        <Select>
                                            <MenuItem value="10">10개씩</MenuItem>
                                            <MenuItem value="20">20개씩</MenuItem>
                                            <MenuItem value="30">30개씩</MenuItem>
                                            <MenuItem value="40">40개씩</MenuItem>
                                            <MenuItem value="50">50개씩</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={2} xs={12} className="align-items-center" style={{paddingLeft: "5px" }}>
                                    <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained" 
                                        style={{backgroundColor: "#0eb906", color: "#fff"}}
                                        startIcon={<DownloadIcon/>}>엑셀다운</Button>
                                </Grid>
                                <Grid item md={2} xs={12} className="align-items-center" style={{paddingLeft: "5px" }}>
                                    <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained" 
                                        style={{backgroundColor: "#FF5733", color: "#fff"}}
                                        startIcon={<PrintIcon/>}
                                        onClick={this.onOpenModal.bind(this)}>피킹지 인쇄</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} md={12} xs={12} style={{ marginTop: "10px" }}>
                        <Grid item md={12} xs={12} style={{maxWidth: "100%", overflowX: "auto"}}>
                            <Table className="order_table">
                                <TableBody>
                                    <TableRow style={{backgroundColor: "#f2f2f2", border: "1px solid #cccccc"}}>
                                        <TableCell className="text-center"><strong>No.</strong></TableCell>
                                        <TableCell className="text-center"><strong>상태</strong></TableCell>
                                        <TableCell className="text-center"><strong>상태</strong></TableCell>
                                        <TableCell className="text-center"><strong>주문번호</strong></TableCell>
                                        <TableCell className="text-center"><strong>품목</strong></TableCell>
                                        <TableCell className="text-center"><strong>수량</strong></TableCell>
                                        <TableCell className="text-center"><strong>고객명</strong></TableCell>
                                        <TableCell className="text-center"><strong>받는 분</strong></TableCell>
                                        <TableCell className="text-center"><strong>주소</strong></TableCell>
                                        <TableCell className="text-center"><strong>받는 분 휴대폰</strong></TableCell>
                                        <TableCell className="text-center"><strong>결제상태</strong></TableCell>
                                        <TableCell className="text-center"><strong>배송메시지</strong></TableCell>
                                        <TableCell className="text-center"><strong>배송상태</strong></TableCell>
                                        <TableCell className="text-center"><strong>주문금액</strong></TableCell>
                                        <TableCell className="text-center"><strong>배송비</strong></TableCell>
                                        <TableCell className="text-center"><strong>취소</strong></TableCell>
                                        <TableCell className="text-center"><strong>교환</strong></TableCell>
                                        <TableCell className="text-center"><strong>반품</strong></TableCell>
                                        <TableCell className="text-center"><strong>환불</strong></TableCell>
                                        <TableCell className="text-center"><strong>관리자 메모</strong></TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell className="text-center">1</TableCell>
                                        <TableCell className="text-center">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        color="primary"
                                                        value={true}
                                                    />
                                                }
                                                style={{marginLeft: "18%"}}
                                            />
                                        </TableCell>
                                        <TableCell className="text-center">단품</TableCell>
                                        <TableCell className="text-center">2021091013130</TableCell>
                                        <TableCell className="text-center">맥심커피믹스 250T X 1박스</TableCell>
                                        <TableCell className="text-center">2</TableCell>
                                        <TableCell className="text-center">홍길동</TableCell>
                                        <TableCell className="text-center">향단이</TableCell>
                                        <TableCell className="text-center">서울 강남구 강남대로 12</TableCell>
                                        <TableCell className="text-center">010-0000-0000</TableCell>
                                        <TableCell className="text-center">결제완료</TableCell>
                                        <TableCell className="text-center">빨리요</TableCell>
                                        <TableCell className="text-center">신규주문</TableCell>
                                        <TableCell className="text-center">-</TableCell>
                                        <TableCell className="text-center">3,000</TableCell>
                                        <TableCell className="text-center">-</TableCell>
                                        <TableCell className="text-center">-</TableCell>
                                        <TableCell className="text-center">-</TableCell>
                                        <TableCell className="text-center">-</TableCell>
                                        <TableCell className="text-center">-</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell className="text-center">2</TableCell>
                                        <TableCell className="text-center">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        color="primary"
                                                        value={true}
                                                    />
                                                }
                                                style={{marginLeft: "18%"}}
                                            />
                                        </TableCell>
                                        <TableCell className="text-center" rowSpan={2}>묶음</TableCell>
                                        <TableCell className="text-center">2021091059540</TableCell>
                                        <TableCell className="text-center">맥심커피믹스 250T X 1박스</TableCell>
                                        <TableCell className="text-center">1</TableCell>
                                        <TableCell className="text-center" rowSpan={2}>이도령</TableCell>
                                        <TableCell className="text-center" rowSpan={2}>춘향이</TableCell>
                                        <TableCell className="text-center" rowSpan={2}>서울 강남구 서초대로 11</TableCell>
                                        <TableCell className="text-center" rowSpan={2}>010-0000-0000</TableCell>
                                        <TableCell className="text-center" rowSpan={2}>결제완료</TableCell>
                                        <TableCell className="text-center" rowSpan={2}>공동현관 비번 0000*</TableCell>
                                        <TableCell className="text-center" rowSpan={2}>신규주문</TableCell>
                                        <TableCell className="text-center">-</TableCell>
                                        <TableCell className="text-center">3,000</TableCell>
                                        <TableCell className="text-center">0</TableCell>
                                        <TableCell className="text-center">-</TableCell>
                                        <TableCell className="text-center">-</TableCell>
                                        <TableCell className="text-center">-</TableCell>
                                        <TableCell className="text-center">-</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell className="text-center">3</TableCell>
                                        <TableCell className="text-center">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        color="primary"
                                                        value={true}
                                                    />
                                                }
                                                style={{marginLeft: "18%"}}
                                            />
                                        </TableCell>
                                        <TableCell className="text-center">2021091059540</TableCell>
                                        <TableCell className="text-center">농심 신라면 4팩 X 1박스</TableCell>
                                        <TableCell className="text-center">1</TableCell>
                                        <TableCell className="text-center">-</TableCell>
                                        <TableCell className="text-center">0</TableCell>
                                        <TableCell className="text-center">-</TableCell>
                                        <TableCell className="text-center">-</TableCell>
                                        <TableCell className="text-center">-</TableCell>
                                        <TableCell className="text-center">-</TableCell>
                                        <TableCell className="text-center">-</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} md={12} xs={12} className="mt-20">
                        <Grid item md={12} xs={12} className="align-items-center text-center">
                            <PaginationMaterial count={10} color="primary" />
                        </Grid>
                    </Grid>

                    <Dialog open={this.state.isOpenModal} maxWidth="lg" fullWidth>
                        <DialogContent>
                            <Grid container spacing={3} md={12} xs={12}>
                                <Grid item md={12} xs={12}>
                                    <Table className="order_table">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell width="15%" className="text-center" style={{backgroundColor: "#f2f2f2", border: "1px solid #cccccc"}}><strong>주문자</strong></TableCell>
                                                <TableCell width="15%" className="text-center"><InputLabel>이도령</InputLabel></TableCell>
                                                <TableCell width="15%" className="text-center" style={{backgroundColor: "#f2f2f2", border: "1px solid #cccccc"}}><strong>연락처</strong></TableCell>
                                                <TableCell width="20%" className="text-center"><InputLabel>010-0000-0000</InputLabel></TableCell>
                                                <TableCell width="15%" className="text-center" style={{backgroundColor: "#f2f2f2", border: "1px solid #cccccc"}}><strong>주문일시</strong></TableCell>
                                                <TableCell width="20%" className="text-center" colSpan={2}><InputLabel>2021.02.25 13:00</InputLabel></TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell className="text-center" style={{backgroundColor: "#f2f2f2", border: "1px solid #cccccc"}}><strong>배달주소</strong></TableCell>
                                                <TableCell colSpan={6} style={{textAlign: "left"}}><InputLabel>서울 강남구 강남대로 112(우리 아파트 101동 1207호)</InputLabel></TableCell>
                                            </TableRow>

                                            <TableRow style={{backgroundColor: "#f2f2f2", border: "1px solid #cccccc"}}>
                                                <TableCell className="text-center"><strong>No.</strong></TableCell>
                                                <TableCell className="text-center"><strong>주문번호</strong></TableCell>
                                                <TableCell className="text-center"><strong>상품 바코드</strong></TableCell>
                                                <TableCell className="text-center"><strong>상품명</strong></TableCell>
                                                <TableCell className="text-center"><strong>수량</strong></TableCell>
                                                <TableCell className="text-center"><strong>과세</strong></TableCell>
                                                <TableCell className="text-center"><strong>수령인</strong></TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell className="text-center">001</TableCell>
                                                <TableCell className="text-center" rowSpan={5}>0021512</TableCell>
                                                <TableCell className="text-center">22208249</TableCell>
                                                <TableCell className="text-center">2.5kg 팩 귤(국내산) 2.5kg</TableCell>
                                                <TableCell className="text-center">1</TableCell>
                                                <TableCell className="text-center">면세</TableCell>
                                                <TableCell className="text-center" rowSpan={5}>춘향이</TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell className="text-center">002</TableCell>
                                                <TableCell className="text-center">8809345230019</TableCell>
                                                <TableCell className="text-center">정성 판란(특란)-1인1판 한정 30구</TableCell>
                                                <TableCell className="text-center">1</TableCell>
                                                <TableCell className="text-center">면세</TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell className="text-center">003</TableCell>
                                                <TableCell className="text-center">207972</TableCell>
                                                <TableCell className="text-center">흑 당근(국내산) 100g</TableCell>
                                                <TableCell className="text-center">1</TableCell>
                                                <TableCell className="text-center">면세</TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell className="text-center">004</TableCell>
                                                <TableCell className="text-center">8801391102227</TableCell>
                                                <TableCell className="text-center">하선정 멸치액젓 400g x 1개</TableCell>
                                                <TableCell className="text-center">1</TableCell>
                                                <TableCell className="text-center">면세</TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell className="text-center">005</TableCell>
                                                <TableCell className="text-center">8801308445386</TableCell>
                                                <TableCell className="text-center">허니 버터 오징어 35g x 1봉</TableCell>
                                                <TableCell className="text-center">1</TableCell>
                                                <TableCell className="text-center">면세</TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell className="text-center" style={{backgroundColor: "#f2f2f2", border: "1px solid #cccccc"}}><strong>메시지</strong></TableCell>
                                                <TableCell colSpan={6} style={{textAlign: "left"}}><InputLabel>중앙현관 비번 1024# 입니다. 문 앞에 놔 주세요</InputLabel></TableCell>
                                            </TableRow>
                                            
                                            <TableRow>
                                                <TableCell className="text-center"><strong>배달 예정시간</strong></TableCell>
                                                <TableCell className="text-center" colSpan={2}><InputLabel>오후 14:00</InputLabel></TableCell>
                                                <TableCell className="text-center"><strong>배달료</strong></TableCell>
                                                <TableCell className="text-center" colSpan={3}><InputLabel>3,000</InputLabel></TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell className="text-center" style={{backgroundColor: "#f2f2f2", border: "1px solid #cccccc"}} colSpan={7}><strong>주식회사 아니벌써</strong></TableCell>
                                            </TableRow>
                                            
                                            <TableRow>
                                                <TableCell colSpan={4} style={{textAlign: "left"}}><InputLabel>+ 전화 : 070-0000-0000</InputLabel></TableCell>
                                                <TableCell colSpan={3} style={{textAlign: "left"}}><InputLabel>+ 사업자등록번호 : 866-86-01489</InputLabel></TableCell>
                                            </TableRow>
                                            
                                            <TableRow>
                                                <TableCell colSpan={4} style={{textAlign: "left"}}><InputLabel>+ 운영시간 : 09:00~18:00</InputLabel></TableCell>
                                                <TableCell colSpan={3} style={{textAlign: "left"}}><InputLabel>+ 통신판매업신고 : 제 00-000-0000 호</InputLabel></TableCell>
                                            </TableRow>
                                            
                                            <TableRow>
                                                <TableCell colSpan={4} style={{textAlign: "left"}}><InputLabel>+ 사업장 주소 : (08514) 서울특별시 금천구 디지털로10길 9 현대아울렛 7층 G밸리테크플랫폼</InputLabel></TableCell>
                                                <TableCell colSpan={3} style={{textAlign: "left"}}><InputLabel>+ 이메일 : admin@anibeolsseo.com</InputLabel></TableCell>
                                            </TableRow>
                                            
                                            <TableRow>
                                                <TableCell colSpan={4} style={{textAlign: "left"}}><InputLabel>+ 대표자 : 변영일</InputLabel></TableCell>
                                                <TableCell colSpan={3} style={{textAlign: "left"}}><InputLabel>+ 홈페이지 : www.anibeolsseo.com</InputLabel></TableCell>
                                            </TableRow>
                                            
                                            <TableRow>
                                                <TableCell colSpan={7} style={{textAlign: "left"}}>
                                                    <InputLabel>+ 아니벌써 앱으로 검색하시면 즐거움이 두배가 됩니다<br/></InputLabel>
                                                    <InputLabel style={{marginTop: "2vh"}}>+ 주문가능 시간은 공급사(마트)별로 상이 합니다<br/></InputLabel>
                                                    <InputLabel style={{marginTop: "2vh"}}>+ (교환, 환불 안내) 상품의 교환, 환불은 7일 이내만 가능합니다<br/></InputLabel>
                                                    <InputLabel style={{marginTop: "2vh"}}>+ 최소 1만원 이상 부터 주문가능, 기본 배송비 3,000원, 3만원 이상 주문 시 무료배송.</InputLabel>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Grid>
                            </Grid>
                        </DialogContent>

                        <Divider />

                        <DialogActions>
                            <Button
                                size="medium"
                                variant="outlined"
                                style={{backgroundColor: "#0eb906", color: "#fff"}}
                                startIcon={<ConfirmIcon/>}
                                onClick={this.onCloseModal.bind(this)}
                            >확인하다</Button>
                            <Button
                                size="medium"
                                variant="outlined"
                                style={{backgroundColor: "#FF5733", color: "#fff"}}
                                startIcon={<PrintIcon/>}
                                onClick={this.onCloseModal.bind(this)}
                            >인쇄</Button>
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

export default withSnackbar(connect(mapStateToProps, null)(Order));
