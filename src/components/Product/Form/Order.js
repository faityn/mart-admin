import React from "react";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import PageTitle from "../../../core/common/Partials/PageTitle";
import SwipeableViews from "react-swipeable-views";
import {
    Grid, TextField, Button, FormControl, Select, MenuItem, InputLabel, Table, TableBody, TableRow, TableCell, FormControlLabel, Checkbox,
    Dialog, DialogContent, Divider, DialogTitle, DialogActions, TextareaAutosize, Tabs, Tab, Link
} from "@material-ui/core";
import PaginationMaterial from "@material-ui/lab/Pagination";
import SubjectIcon from '@material-ui/icons/Subject';
import SearchIcon from '@material-ui/icons/Search';
import MailIcon from '@material-ui/icons/Message';

class Order extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tabIndex: 0,
            isOpenModal: false,
        };

        this.onOpenModal = this.onOpenModal.bind(this);
        this.onChangeTab = this.onChangeTab.bind(this);
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
     * @summary Change tab
     * @param {MouseEvent} event
     * @param {int} newValue
     */
    onChangeTab(event, index) {
        event.stopPropagation();

        this.setState({
            tabIndex: index,
        });
    }

    /**
     * @summary Tab attributes
     * @param {int} index
     */
    tabProps(index) {
        return {
            id: `full-width-tab-${index}`,
            "aria-controls": `full-width-tabpanel-${index}`,
        };
    }

    render() {
        return (
            <React.Fragment>
                <Grid container>
                    <Grid item>
                        <PageTitle
                            menuName="주문 / 배송현황 관리"
                            title="주문 / 배송현황 관리"
                            icon={<SubjectIcon />}
                        />
                    </Grid>
                </Grid>

                <div className="card mt-20">
                    <Grid container spacing={3} md={10} xs={12} className="align-items-center">
                        <Grid item md={2} xs={12}><h5>배송 진행</h5></Grid>
                        <Grid item md={10} xs={12} className="text-left"><InputLabel>배송 중 문제<i style={{ color: "#ff0000" }}><strong> 0 </strong></i>건 | 구매확정<i style={{ color: "#ff0000" }}><strong> 0 </strong></i>건 | 내일 출발 할 배송<i style={{ color: "#ff0000" }}><strong> 0 </strong></i>건</InputLabel></Grid>
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
                            <Grid container md={5} xs={12} className="align-items-center" style={{ marginLeft: "10px" }}>
                                <Grid item md={2} xs={12}>
                                    <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained"
                                        style={{ border: "1px solid #cccbcb" }}
                                    >오늘
                                    </Button>
                                </Grid>
                                <Grid item md={2} xs={12} style={{ marginLeft: "8px" }}>
                                    <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained"
                                        style={{ border: "1px solid #cccbcb" }}
                                    >1주일
                                    </Button>
                                </Grid>
                                <Grid item md={3} xs={12} style={{ marginLeft: "8px" }}>
                                    <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained"
                                        style={{ border: "1px solid #cccbcb" }}
                                    >이번 달
                                    </Button>
                                </Grid>
                                <Grid item md={2} xs={12} style={{ marginLeft: "8px" }}>
                                    <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained"
                                        style={{ border: "1px solid #cccbcb" }}
                                    >1개월
                                    </Button>
                                </Grid>
                                <Grid item md={2} xs={12} style={{ marginLeft: "8px" }}>
                                    <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained"
                                        style={{ border: "1px solid #cccbcb" }}
                                    >3개월
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid container md={5} xs={12} className="align-items-center" style={{ marginLeft: "10px" }}>
                                <Grid item md={5} xs={12} className="align-items-center">
                                    <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        type="date"
                                        name="startDate"
                                    />
                                </Grid>
                                <Grid item md={1} xs={12} className="text-center" className="align-items-center">
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
                            <Grid item md={5} xs={12} className="align-items-center text-center" style={{ marginLeft: "10px" }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item md={1} xs={12} className="align-items-center text-center" style={{ marginLeft: "10px" }}>
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

                    <Grid container spacing={3} md={12} xs={12}>
                        <Grid item md={1} xs={12} className="align-items-center">
                            <h5>목록 (총<i style={{ color: "#ff0000" }}><strong> 0 </strong></i>개)</h5>
                        </Grid>

                        <Grid item md={11} xs={12} className="align-items-center">
                            <Grid container>
                                <Grid item md={2} xs={12} className="align-items-center">
                                    <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained"
                                        style={{ backgroundColor: "#008000", color: "#fff" }}>마트로 배송/이관 처리</Button>
                                </Grid>
                                <Grid item md={1} xs={12} className="align-items-center" style={{ marginLeft: "30px" }}>
                                    <InputLabel>상태 일괄 입력</InputLabel>
                                </Grid>
                                <Grid item md={1} xs={12} className="align-items-center" style={{ marginLeft: "5px" }}>
                                    <FormControl size="small" fullWidth variant="outlined">
                                        <InputLabel>선택</InputLabel>
                                        <Select>
                                            <MenuItem value="">신규주문</MenuItem>
                                            <MenuItem value="">배송 준비중</MenuItem>
                                            <MenuItem value="">배송준비</MenuItem>
                                            <MenuItem value="">재배송 요청</MenuItem>
                                            <MenuItem value="">재배송 완료</MenuItem>
                                            <MenuItem value="">배송완료</MenuItem>
                                            <MenuItem value="">취소요청</MenuItem>
                                            <MenuItem value="">최소완료</MenuItem>
                                            <MenuItem value="">배송보류</MenuItem>
                                            <MenuItem value="">정보수정</MenuItem>
                                            <MenuItem value="">교환요청</MenuItem>
                                            <MenuItem value="">교환완료</MenuItem>
                                            <MenuItem value="">반품, 환불 요청</MenuItem>
                                            <MenuItem value="">반품, 환불 완료</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={1} xs={12} className="align-items-center" style={{ marginLeft: "5px" }}>
                                    <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained"
                                        color="primary">일괄변경</Button>
                                </Grid>
                                <Grid item md={2} xs={12} className="align-items-center" style={{ marginLeft: "30px" }}>
                                    <FormControl size="small" fullWidth variant="outlined">
                                        <InputLabel>최근 주문건부터</InputLabel>
                                        <Select>
                                            <MenuItem value="">...</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={1} xs={12} className="align-items-center" style={{ marginLeft: "5px" }}>
                                    <FormControl size="small" fullWidth variant="outlined">
                                        <InputLabel>50개씩 보기</InputLabel>
                                        <Select>
                                            <MenuItem value="">...</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={2} xs={12} className="align-items-center" style={{ marginLeft: "5px" }}>
                                    <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained"
                                        style={{ border: "1px solid #cccbcb" }}>조회항목 설정</Button>
                                </Grid>
                                <Grid item md={1} xs={12} className="align-items-center" style={{ marginLeft: "5px" }}>
                                    <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained"
                                        style={{ border: "1px solid #cccbcb" }}>엑셀다운</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} md={12} xs={12} style={{ marginTop: "10px" }}>
                        <Grid item md={12} xs={12}>
                            <Table className="order_table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="text-center" width="3%"><strong>No.</strong></TableCell>
                                        <TableCell className="text-center" width="3%"><strong>선택</strong></TableCell>
                                        <TableCell className="text-center" width="3%"><strong>상태</strong></TableCell>
                                        <TableCell className="text-center" width="4%"><strong>상품주문번호</strong></TableCell>
                                        <TableCell className="text-center" width="4%"><strong>상품 바코드</strong></TableCell>
                                        <TableCell className="text-center" width="10%"><strong>상품명</strong></TableCell>
                                        <TableCell className="text-center" width="3%"><strong>수량</strong></TableCell>
                                        <TableCell className="text-center" width="4%"><strong>배송할 마트</strong></TableCell>
                                        <TableCell className="text-center" width="4%"><strong>주문자명</strong></TableCell>
                                        <TableCell className="text-center" width="4%"><strong>수취인명</strong></TableCell>
                                        <TableCell className="text-center" width="4%"><strong>주문상태</strong></TableCell>
                                        <TableCell className="text-center" width="4%"><strong>배송상태</strong></TableCell>
                                        <TableCell className="text-center" width="4%"><strong>주문자 휴대폰</strong></TableCell>
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
                                            />
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Button
                                                size="small"
                                                variant="contained"
                                            >단품</Button>
                                        </TableCell>
                                        <TableCell className="text-center">2021091013130</TableCell>
                                        <TableCell className="text-center">88545458990</TableCell>
                                        <TableCell className="text-center">맥심커피믹스 250T X 1박스</TableCell>
                                        <TableCell className="text-center">2</TableCell>
                                        <TableCell className="text-center">영구 마트</TableCell>
                                        <TableCell className="text-center">홍길동</TableCell>
                                        <TableCell className="text-center">강동원</TableCell>
                                        <TableCell className="text-center">신규주문</TableCell>
                                        <TableCell className="text-center">마트 배송/이관</TableCell>
                                        <TableCell className="text-center">
                                            <Grid item md={12} xs={12} className="text-center">010-0000-0000</Grid>
                                            <Grid item md={12} xs={12} className="text-center">
                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={this.onOpenModal.bind(this)}
                                                    startIcon={<MailIcon />}
                                                >SMS</Button>
                                            </Grid>
                                        </TableCell>
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
                                            />
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Button
                                                size="small"
                                                variant="contained"
                                            >묶음</Button>
                                        </TableCell>
                                        <TableCell className="text-center">2021091059540</TableCell>
                                        <TableCell className="text-center">88777848540</TableCell>
                                        <TableCell className="text-center">맥심커피믹스 250T X 1박스</TableCell>
                                        <TableCell className="text-center">1</TableCell>
                                        <TableCell className="text-center">영구 마트</TableCell>
                                        <TableCell className="text-center">이도령</TableCell>
                                        <TableCell className="text-center">춘향이</TableCell>
                                        <TableCell className="text-center">신규주문</TableCell>
                                        <TableCell className="text-center">배송 준비중</TableCell>
                                        <TableCell className="text-center">
                                            <Grid item md={12} xs={12} className="text-center">010-0000-0000</Grid>
                                            <Grid item md={12} xs={12} className="text-center">
                                                <Button
                                                    size="small"
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={this.onOpenModal.bind(this)}
                                                    startIcon={<MailIcon />}
                                                >SMS</Button>
                                            </Grid>
                                        </TableCell>
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

                    <Dialog open={this.state.isOpenModal}
                        aria-labelledby="responsive-dialog-title"
                        maxWidth="lg">
                        <DialogTitle id="responsive-dialog-title">
                            <h2>SMS 발송 관리</h2>
                        </DialogTitle>
                        <Divider />

                        <DialogContent>
                            <Grid container spacing={3} md={12} xs={12}>
                                <Grid item md={12} xs={12}>
                                    <Table className="member_table" style={{ alignItems: "center", border: "none" }}>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell rowSpan={2} width="16%" className="text-center"><strong>발송가능 건수</strong></TableCell>
                                                <TableCell width="16%" className="text-center"><strong>잔여 포인트</strong></TableCell>
                                                <TableCell width="16%" className="text-center"><strong>단문 SMS</strong></TableCell>
                                                <TableCell width="16%" className="text-center"><strong>장문 SMS</strong></TableCell>
                                                <TableCell rowSpan={2} width="18%" className="text-center">
                                                    <Button
                                                        fullWidth
                                                        size="medium"
                                                        variant="contained"
                                                        color="primary">포인트<br />충전하기</Button>
                                                </TableCell>
                                                <TableCell rowSpan={2} width="18%" className="text-center">
                                                    <Button
                                                        fullWidth
                                                        size="medium"
                                                        variant="contained"
                                                        style={{ backgroundColor: "#008000", color: "#fff" }}>발송내역<br /></Button>
                                                </TableCell>
                                            </TableRow>

                                            <TableRow>
                                                <TableCell className="text-center">10,000 P</TableCell>
                                                <TableCell className="text-center">1,000 건</TableCell>
                                                <TableCell className="text-center">1,000 건</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Grid>
                            </Grid>

                            <Grid container spacing={3} md={12} xs={12} style={{ marginTop: "5px" }}>
                                <Grid item md={12} xs={12}><h5><strong>1. 수신자 정보 입력</strong></h5></Grid>
                                <Grid item md={12} xs={12}>
                                    <Table className="order_table" style={{ alignItems: "center", border: "none" }}>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className="text-center"><strong>선택</strong></TableCell>
                                                <TableCell className="text-center"><strong>구분</strong></TableCell>
                                                <TableCell className="text-center"><strong>이름</strong></TableCell>
                                                <TableCell className="text-center"><strong>수신번호</strong></TableCell>
                                                <TableCell className="text-right"><strong>이름</strong></TableCell>
                                                <TableCell>
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                </TableCell>
                                                <TableCell rowSpan={2}>
                                                    <Button
                                                        fullWidth
                                                        size="medium"
                                                        variant="contained"
                                                        color="primary">추가</Button>
                                                </TableCell>
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
                                                <TableCell className="text-center">주문자</TableCell>
                                                <TableCell className="text-center">홍길동</TableCell>
                                                <TableCell className="text-center">010-0000-12345</TableCell>
                                                <TableCell className="text-right"><strong>수신번호</strong></TableCell>
                                                <TableCell>
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

                            <Grid container spacing={3} md={12} xs={12} className="align-items-center" style={{ marginTop: "5px" }}>
                                <Grid item md={12} xs={12} className="align-items-center"><h5><strong>2. 발송 정보 입력</strong></h5></Grid>
                                <Grid item md={4} xs={12} className="align-items-center">
                                    <Grid container>
                                        <Grid item md={12} xs={12} className="align-items-center text-center">
                                            <Button
                                                fullWidth
                                                size="medium"
                                                variant="contained">SMS</Button>
                                        </Grid>
                                        <Grid container md={12} xs={12} className="align-items-center" style={{ marginTop: "10px" }}>
                                            <Grid item md={10} xs={12} className="text-left">
                                                <InputLabel>발신번호 : 070-0000-0000</InputLabel>
                                            </Grid>
                                            <Grid item md={1} xs={12}>
                                                <Button
                                                    fullWidth
                                                    size="medium"
                                                    variant="contained"
                                                    style={{ border: "1px solid #cccbcb" }}>설정</Button>
                                            </Grid>
                                        </Grid>
                                        <Grid item md={12} xs={12} className="align-items-center" style={{ marginTop: "10px" }}>
                                            <TextareaAutosize
                                                minRows={10}
                                                placeholder="90byte가 초과되면 장문 LMS(2,000byte)로 자동 전환됩니다."
                                                style={{ width: "100%" }}
                                            />
                                        </Grid>
                                        <Grid item md={12} xs={12} className="text-right align-items-center" style={{ marginTop: "10px", textAlign: "right" }}>
                                            <InputLabel>0 / 90 Bytes</InputLabel>
                                        </Grid>
                                        <Grid container md={12} xs={12} className="text-center align-items-center" style={{ marginTop: "10px" }}>
                                            <Grid item md={5} xs={12} style={{ marginLeft: "5px" }}>
                                                <Button
                                                    fullWidth
                                                    size="medium"
                                                    variant="contained"
                                                    color="primary">상용구 저장</Button>
                                            </Grid>
                                            <Grid item md={5} xs={12} style={{ marginLeft: "5px" }}>
                                                <Button
                                                    fullWidth
                                                    size="medium"
                                                    variant="contained"
                                                    color="primary">새로 쓰기</Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item md={8} xs={12} className="align-items-center">
                                    <Grid container>
                                        <Grid md={12} xs={12}>
                                            <Tabs
                                                textColor="primary"
                                                value={this.state.tabIndex}
                                                onChange={this.onChangeTab}
                                                variant="scrollable"
                                                indicatorColor="primary"
                                                scrollButtons="auto"
                                            >
                                                <Tab label="치환변수" {...this.tabProps(0)} />
                                                <Tab label="상용구" {...this.tabProps(1)} />
                                                <Tab label="특수문자" {...this.tabProps(2)} />
                                            </Tabs>
                                        </Grid>
                                        <Grid md={12} xs={12}>
                                            <SwipeableViews index={this.state.tabIndex}>
                                                <div index={0} className="mt-20">
                                                    <Grid container>
                                                        <Grid md={12} xs={12}>
                                                            <InputLabel>주문수집에 등록된 이름, 고객 정보 등의 문구를 자동으로 변환 입력하여 보낼 수 있습니다.</InputLabel>
                                                        </Grid>
                                                        <Grid md={12} xs={12} style={{ marginTop: "10px" }}>
                                                            <Table className="order_table" style={{ alignItems: "center" }}>
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell className="text-center" width="33%"><strong>선택</strong></TableCell>
                                                                        <TableCell className="text-center" width="33%"><strong>변수명</strong></TableCell>
                                                                        <TableCell className="text-center" width="33%"><strong>설명</strong></TableCell>
                                                                    </TableRow>

                                                                    <TableRow>
                                                                        <TableCell className="text-center"><Link>삽입</Link></TableCell>
                                                                        <TableCell className="text-center">[이름]</TableCell>
                                                                        <TableCell className="text-center">수신자 정보에 등록된 이름</TableCell>
                                                                    </TableRow>

                                                                    <TableRow>
                                                                        <TableCell className="text-center"><Link>삽입</Link></TableCell>
                                                                        <TableCell className="text-center">[상품명]</TableCell>
                                                                        <TableCell className="text-center">주문서의 상품명</TableCell>
                                                                    </TableRow>

                                                                    <TableRow>
                                                                        <TableCell className="text-center"><Link>삽입</Link></TableCell>
                                                                        <TableCell className="text-center">[수취인]</TableCell>
                                                                        <TableCell className="text-center">주문서의 수취인명</TableCell>
                                                                    </TableRow>

                                                                    <TableRow>
                                                                        <TableCell className="text-center"><Link>삽입</Link></TableCell>
                                                                        <TableCell className="text-center">[주문번호]</TableCell>
                                                                        <TableCell className="text-center">주문번호</TableCell>
                                                                    </TableRow>

                                                                    <TableRow>
                                                                        <TableCell className="text-center"><Link>삽입</Link></TableCell>
                                                                        <TableCell className="text-center">[주문일자]</TableCell>
                                                                        <TableCell className="text-center">주문서의 주문일자</TableCell>
                                                                    </TableRow>
                                                                </TableBody>
                                                            </Table>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                                <div index={1} className="mt-20">
                                                </div>
                                                <div index={2} className="mt-20">
                                                </div>
                                            </SwipeableViews>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid container spacing={3} md={12} xs={12} className="mt-20 align-items-center">
                                <Grid item md={12} xs={12}><h5><strong>3. 문자 발송</strong></h5></Grid>

                                <Grid item md={8} xs={12}>
                                    <Grid container>
                                        <Grid item md={2} xs={12} className="align-items-center">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        color="primary"
                                                        value={true}
                                                        defaultChecked={true}
                                                    />
                                                }
                                                label="즉시 발송"
                                            />
                                        </Grid>
                                        <Grid item md={2} xs={12} className="align-items-center">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        color="primary"
                                                        value={true}
                                                    />
                                                }
                                                label="예약 발송"
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                
                                <Grid item md={10} xs={12}>
                                    <Grid container>
                                        <Grid item md={1} xs={12} className="align-items-center">
                                            <FormControl size="small" fullWidth variant="outlined">
                                                <InputLabel>2021</InputLabel>
                                                <Select>
                                                    <MenuItem value="2030">2030</MenuItem>
                                                    <MenuItem value="2029">2029</MenuItem>
                                                    <MenuItem value="2028">2028</MenuItem>
                                                    <MenuItem value="2027">2027</MenuItem>
                                                    <MenuItem value="2026">2026</MenuItem>
                                                    <MenuItem value="2025">2025</MenuItem>
                                                    <MenuItem value="2024">2024</MenuItem>
                                                    <MenuItem value="2023">2023</MenuItem>
                                                    <MenuItem value="2022">2022</MenuItem>
                                                    <MenuItem value="2021">2021</MenuItem>
                                                    <MenuItem value="2020">2020</MenuItem>
                                                    <MenuItem value="2019">2019</MenuItem>
                                                    <MenuItem value="2018">2018</MenuItem>
                                                    <MenuItem value="2017">2017</MenuItem>
                                                    <MenuItem value="2016">2016</MenuItem>
                                                    <MenuItem value="2015">2015</MenuItem>
                                                    <MenuItem value="2014">2014</MenuItem>
                                                    <MenuItem value="2013">2013</MenuItem>
                                                    <MenuItem value="2012">2012</MenuItem>
                                                    <MenuItem value="2011">2011</MenuItem>
                                                    <MenuItem value="2010">2010</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item md={1} xs={12} className="align-items-center" style={{paddingLeft: "2.5rem"}}>
                                            <InputLabel>년</InputLabel>
                                        </Grid>
                                        <Grid item md={1} xs={12} className="align-items-center">
                                            <FormControl size="small" fullWidth variant="outlined">
                                                <InputLabel>1</InputLabel>
                                                <Select>
                                                    <MenuItem value="1">1</MenuItem>
                                                    <MenuItem value="2">2</MenuItem>
                                                    <MenuItem value="3">3</MenuItem>
                                                    <MenuItem value="4">4</MenuItem>
                                                    <MenuItem value="5">5</MenuItem>
                                                    <MenuItem value="6">6</MenuItem>
                                                    <MenuItem value="7">7</MenuItem>
                                                    <MenuItem value="8">8</MenuItem>
                                                    <MenuItem value="9">9</MenuItem>
                                                    <MenuItem value="10">10</MenuItem>
                                                    <MenuItem value="11">11</MenuItem>
                                                    <MenuItem value="12">12</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item md={1} xs={12} className="align-items-center" style={{paddingLeft: "2.5rem"}}>
                                            <InputLabel>월</InputLabel>
                                        </Grid>
                                        <Grid item md={1} xs={12} className="align-items-center">
                                            <FormControl size="small" fullWidth variant="outlined">
                                                <InputLabel>1</InputLabel>
                                                <Select>
                                                    <MenuItem value="1">1</MenuItem>
                                                    <MenuItem value="2">2</MenuItem>
                                                    <MenuItem value="3">3</MenuItem>
                                                    <MenuItem value="4">4</MenuItem>
                                                    <MenuItem value="5">5</MenuItem>
                                                    <MenuItem value="6">6</MenuItem>
                                                    <MenuItem value="7">7</MenuItem>
                                                    <MenuItem value="8">8</MenuItem>
                                                    <MenuItem value="9">9</MenuItem>
                                                    <MenuItem value="10">10</MenuItem>
                                                    <MenuItem value="11">11</MenuItem>
                                                    <MenuItem value="12">12</MenuItem>
                                                    <MenuItem value="13">13</MenuItem>
                                                    <MenuItem value="14">14</MenuItem>
                                                    <MenuItem value="15">15</MenuItem>
                                                    <MenuItem value="16">16</MenuItem>
                                                    <MenuItem value="17">17</MenuItem>
                                                    <MenuItem value="18">18</MenuItem>
                                                    <MenuItem value="19">19</MenuItem>
                                                    <MenuItem value="20">20</MenuItem>
                                                    <MenuItem value="21">21</MenuItem>
                                                    <MenuItem value="22">22</MenuItem>
                                                    <MenuItem value="23">23</MenuItem>
                                                    <MenuItem value="24">24</MenuItem>
                                                    <MenuItem value="25">25</MenuItem>
                                                    <MenuItem value="26">26</MenuItem>
                                                    <MenuItem value="27">27</MenuItem>
                                                    <MenuItem value="28">28</MenuItem>
                                                    <MenuItem value="29">29</MenuItem>
                                                    <MenuItem value="30">30</MenuItem>
                                                    <MenuItem value="31">31</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item md={1} xs={12} className="align-items-center" style={{paddingLeft: "2.5rem"}}>
                                            <InputLabel>일</InputLabel>
                                        </Grid>
                                        <Grid item md={1} xs={12} className="align-items-center">
                                            <FormControl size="small" fullWidth variant="outlined">
                                                <InputLabel>12</InputLabel>
                                                <Select>
                                                    <MenuItem value="1">1</MenuItem>
                                                    <MenuItem value="2">2</MenuItem>
                                                    <MenuItem value="3">3</MenuItem>
                                                    <MenuItem value="4">4</MenuItem>
                                                    <MenuItem value="5">5</MenuItem>
                                                    <MenuItem value="6">6</MenuItem>
                                                    <MenuItem value="7">7</MenuItem>
                                                    <MenuItem value="8">8</MenuItem>
                                                    <MenuItem value="9">9</MenuItem>
                                                    <MenuItem value="10">10</MenuItem>
                                                    <MenuItem value="11">11</MenuItem>
                                                    <MenuItem value="12">12</MenuItem>
                                                    <MenuItem value="13">13</MenuItem>
                                                    <MenuItem value="14">14</MenuItem>
                                                    <MenuItem value="15">15</MenuItem>
                                                    <MenuItem value="16">16</MenuItem>
                                                    <MenuItem value="17">17</MenuItem>
                                                    <MenuItem value="18">18</MenuItem>
                                                    <MenuItem value="19">19</MenuItem>
                                                    <MenuItem value="20">20</MenuItem>
                                                    <MenuItem value="21">21</MenuItem>
                                                    <MenuItem value="22">22</MenuItem>
                                                    <MenuItem value="23">23</MenuItem>
                                                    <MenuItem value="24">24</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item md={1} xs={12} className="align-items-center" style={{paddingLeft: "2.5rem"}}>
                                            <InputLabel>시</InputLabel>
                                        </Grid>
                                        <Grid item md={1} xs={12} className="align-items-center">
                                            <FormControl size="small" fullWidth variant="outlined">
                                                <InputLabel>30</InputLabel>
                                                <Select>
                                                    <MenuItem value="1">1</MenuItem>
                                                    <MenuItem value="2">2</MenuItem>
                                                    <MenuItem value="3">3</MenuItem>
                                                    <MenuItem value="4">4</MenuItem>
                                                    <MenuItem value="5">5</MenuItem>
                                                    <MenuItem value="6">6</MenuItem>
                                                    <MenuItem value="7">7</MenuItem>
                                                    <MenuItem value="8">8</MenuItem>
                                                    <MenuItem value="9">9</MenuItem>
                                                    <MenuItem value="10">10</MenuItem>
                                                    <MenuItem value="11">11</MenuItem>
                                                    <MenuItem value="12">12</MenuItem>
                                                    <MenuItem value="13">13</MenuItem>
                                                    <MenuItem value="14">14</MenuItem>
                                                    <MenuItem value="15">15</MenuItem>
                                                    <MenuItem value="16">16</MenuItem>
                                                    <MenuItem value="17">17</MenuItem>
                                                    <MenuItem value="18">18</MenuItem>
                                                    <MenuItem value="19">19</MenuItem>
                                                    <MenuItem value="20">20</MenuItem>
                                                    <MenuItem value="21">21</MenuItem>
                                                    <MenuItem value="22">22</MenuItem>
                                                    <MenuItem value="23">23</MenuItem>
                                                    <MenuItem value="24">24</MenuItem>
                                                    <MenuItem value="25">25</MenuItem>
                                                    <MenuItem value="26">26</MenuItem>
                                                    <MenuItem value="27">27</MenuItem>
                                                    <MenuItem value="28">28</MenuItem>
                                                    <MenuItem value="29">29</MenuItem>
                                                    <MenuItem value="30">30</MenuItem>
                                                    <MenuItem value="31">31</MenuItem>
                                                    <MenuItem value="32">32</MenuItem>
                                                    <MenuItem value="33">33</MenuItem>
                                                    <MenuItem value="34">34</MenuItem>
                                                    <MenuItem value="35">35</MenuItem>
                                                    <MenuItem value="36">36</MenuItem>
                                                    <MenuItem value="37">37</MenuItem>
                                                    <MenuItem value="38">38</MenuItem>
                                                    <MenuItem value="39">39</MenuItem>
                                                    <MenuItem value="40">40</MenuItem>
                                                    <MenuItem value="41">41</MenuItem>
                                                    <MenuItem value="42">42</MenuItem>
                                                    <MenuItem value="43">43</MenuItem>
                                                    <MenuItem value="44">44</MenuItem>
                                                    <MenuItem value="45">45</MenuItem>
                                                    <MenuItem value="46">46</MenuItem>
                                                    <MenuItem value="47">47</MenuItem>
                                                    <MenuItem value="48">48</MenuItem>
                                                    <MenuItem value="49">49</MenuItem>
                                                    <MenuItem value="50">50</MenuItem>
                                                    <MenuItem value="51">51</MenuItem>
                                                    <MenuItem value="52">52</MenuItem>
                                                    <MenuItem value="53">53</MenuItem>
                                                    <MenuItem value="54">54</MenuItem>
                                                    <MenuItem value="55">55</MenuItem>
                                                    <MenuItem value="56">56</MenuItem>
                                                    <MenuItem value="57">57</MenuItem>
                                                    <MenuItem value="58">58</MenuItem>
                                                    <MenuItem value="59">59</MenuItem>
                                                    <MenuItem value="60">60</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item md={1} xs={12} className="align-items-center" style={{paddingLeft: "2.5rem"}}>
                                            <InputLabel>분</InputLabel>
                                        </Grid>
                                        <Grid item md={1} xs={12} className="align-items-center">
                                            <Button
                                                fullWidth
                                                size="medium"
                                                variant="contained"
                                                color="primary">보내기</Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
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

export default withSnackbar(connect(mapStateToProps, null)(Order));
