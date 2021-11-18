import React from "react";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import PageTitle from "../../../core/common/Partials/PageTitle";
import SwipeableViews from "react-swipeable-views";
import {
    Grid, TextField, Button, FormControl, Select, MenuItem, InputLabel, Table, TableBody, TableRow, TableCell, FormControlLabel, Checkbox} from "@material-ui/core";
import PaginationMaterial from "@material-ui/lab/Pagination";
import SubjectIcon from '@material-ui/icons/Subject';
import SearchIcon from '@material-ui/icons/Search';
import MailIcon from '@material-ui/icons/Message';
import DownloadIcon from '@material-ui/icons/CloudDownload';

class Refund extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Grid container>
                    <Grid item>
                        <PageTitle
                            menuName="취소/반품/교환/환불 요청"
                            title="취소/반품/교환/환불 요청"
                            icon={<SubjectIcon />}
                        />
                    </Grid>
                </Grid>

                <div className="card mt-20">
                    <Grid container spacing={3} md={10} xs={12} className="align-items-center">
                        <Grid item md={10} xs={12} className="text-left"><InputLabel>취소, 반품, 교환관리 : 취소요청<i style={{ color: "#ff0000", fontStyle: "normal"}}><strong> 0 </strong></i>건 / 반품요청 <i style={{ color: "#ff0000", fontStyle: "normal"}}><strong> 0 </strong></i>건 / 교환요청<i style={{ color: "#ff0000", fontStyle: "normal"}}><strong> 0 </strong></i>건</InputLabel></Grid>
                    </Grid>

                    <Grid container spacing={3} md={10} xs={12}>
                        <Grid item md={2} xs={12} className="align-items-center">
                            <h5>조회기간</h5>
                        </Grid>

                        <Grid item md={10} xs={12} className="align-items-center">
                            <Grid item md={2} xs={12} className="align-items-center">
                                <FormControl size="small" fullWidth variant="outlined">
                                    <InputLabel>클레임 요청일</InputLabel>
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
                                <Grid item md={1} xs={12} className="text-center" className="align-items-center" style={{marginLeft: "2rem"}}>
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
                                        <MenuItem value="">수취인명</MenuItem>
                                        <MenuItem value="">구매자명</MenuItem>
                                        <MenuItem value="">구매자 ID</MenuItem>
                                        <MenuItem value="">주문번호</MenuItem>
                                        <MenuItem value="">상품주문번호</MenuItem>
                                        <MenuItem value="">상품번호</MenuItem>
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
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} md={10} xs={12}>
                        <Grid item md={2} xs={12}>
                            <h5>처리상태</h5>
                        </Grid>

                        <Grid item md={10} xs={12} className="align-items-center">
                            <Grid item md={2} xs={12} className="align-items-center">
                                <FormControl size="small" fullWidth variant="outlined">
                                    <InputLabel>전체</InputLabel>
                                    <Select>
                                        <MenuItem value="">반품요청</MenuItem>
                                        <MenuItem value="">수거 중</MenuItem>
                                        <MenuItem value="">수거완료</MenuItem>
                                        <MenuItem value="">반품완료</MenuItem>
                                        <MenuItem value="">반품철회</MenuItem>
                                    </Select>
                                </FormControl>
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
                        <Grid item md={10} xs={12}>
                            <Grid container>
                                <Grid item md={2} xs={12} className="align-items-center">
                                    <h5>목록 (총<i style={{ color: "#ff0000", fontStyle: "normal"}}><strong> 0 </strong></i>개)</h5>
                                </Grid>

                                <Grid item md={10} xs={12} className="align-items-center">
                                    {/*
                                    <Grid container>
                                        <Grid item md={2} xs={12} className="align-items-center">
                                            <Button
                                                fullWidth
                                                size="medium"
                                                variant="contained"
                                                style={{ border: "1px solid #cccbcb" }}>취소완료</Button>
                                        </Grid>
                                        <Grid item md={2} xs={12} className="align-items-center">
                                            <Button
                                                fullWidth
                                                size="medium"
                                                variant="contained"
                                                style={{ border: "1px solid #cccbcb" }}>취소거부</Button>
                                        </Grid>
                                        <Grid item md={2} xs={12} className="align-items-center">
                                            <Button
                                                fullWidth
                                                size="medium"
                                                variant="contained"
                                                style={{ border: "1px solid #cccbcb" }}>반품완료</Button>
                                        </Grid>
                                        <Grid item md={2} xs={12} className="align-items-center">
                                            <Button
                                                fullWidth
                                                size="medium"
                                                variant="contained"
                                                style={{ border: "1px solid #cccbcb" }}>반품거부</Button>
                                        </Grid>
                                        <Grid item md={2} xs={12} className="align-items-center">
                                            <Button
                                                fullWidth
                                                size="medium"
                                                variant="contained"
                                                style={{ border: "1px solid #cccbcb" }}>교환완료</Button>
                                        </Grid>
                                        <Grid item md={2} xs={12} className="align-items-center">
                                            <Button
                                                fullWidth
                                                size="medium"
                                                variant="contained"
                                                style={{ border: "1px solid #cccbcb" }}>교환 거부</Button>
                                        </Grid>
                                    </Grid>*/}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={2} xs={12} className="align-items-center text-right">
                            <Grid item md={6} xs={12}></Grid>
                            <Grid item md={6} xs={12}>
                                <Button
                                    fullWidth
                                    size="medium"
                                    variant="contained" 
                                    style={{backgroundColor: "#0eb906", color: "#fff"}}
                                    startIcon={<DownloadIcon/>}>엑셀다운</Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} md={12} xs={12} style={{ marginTop: "10px" }}>
                        <Grid item md={12} xs={12}>
                            <Table className="order_table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="text-center"><strong>선택</strong></TableCell>
                                        <TableCell className="text-center"><strong>상품주문번호</strong></TableCell>
                                        <TableCell className="text-center"><strong>상품 바코드</strong></TableCell>
                                        <TableCell className="text-center"><strong>주문상태</strong></TableCell>
                                        <TableCell className="text-center"><strong>처리상태</strong></TableCell>
                                        <TableCell className="text-center"><strong>결제일</strong></TableCell>
                                        <TableCell className="text-center"><strong>요청일</strong></TableCell>
                                        <TableCell className="text-center"><strong>사유</strong></TableCell>
                                        <TableCell className="text-center"><strong>승인일</strong></TableCell>
                                        <TableCell className="text-center"><strong>완료일</strong></TableCell>
                                        <TableCell className="text-center"><strong>환불처리자</strong></TableCell>
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
                                        <TableCell className="text-center">202109101313</TableCell>
                                        <TableCell className="text-center">8854545899</TableCell>
                                        <TableCell className="text-center">신규주문</TableCell>
                                        <TableCell className="text-center"><InputLabel style={{color: "#ff0000"}}>교환요청</InputLabel></TableCell>
                                        <TableCell className="text-center">2021.1.1 10:25:12</TableCell>
                                        <TableCell className="text-center">2021.1.1 12:00:00</TableCell>
                                        <TableCell className="text-center">고객 변심</TableCell>
                                        <TableCell className="text-center">2021.1.1 12:00:00</TableCell>
                                        <TableCell className="text-center">2021.1.1 12:00:00</TableCell>
                                        <TableCell className="text-center">아니벌써CS</TableCell>
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
                                        <TableCell className="text-center">202109105954</TableCell>
                                        <TableCell className="text-center">8877784854</TableCell>
                                        <TableCell className="text-center">신규주문</TableCell>
                                        <TableCell className="text-center"><InputLabel style={{color: "#0000FF"}}>취소요청</InputLabel></TableCell>
                                        <TableCell className="text-center">2021.1.1 10:25:12</TableCell>
                                        <TableCell className="text-center">2021.1.1 12:00:00</TableCell>
                                        <TableCell className="text-center">다른 상품배송</TableCell>
                                        <TableCell className="text-center">2021.1.1 12:00:00</TableCell>
                                        <TableCell className="text-center">2021.1.1 12:00:00</TableCell>
                                        <TableCell className="text-center">아니벌써CS</TableCell>
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
                                        <TableCell className="text-center">202109105954</TableCell>
                                        <TableCell className="text-center">8899541654</TableCell>
                                        <TableCell className="text-center">신규주문</TableCell>
                                        <TableCell className="text-center"><InputLabel style={{color: "#00FF00"}}>취소완료</InputLabel></TableCell>
                                        <TableCell className="text-center">2021.1.1 10:25:12</TableCell>
                                        <TableCell className="text-center">2021.1.1 12:00:00</TableCell>
                                        <TableCell className="text-center">고객 변심</TableCell>
                                        <TableCell className="text-center">2021.1.1 12:00:00</TableCell>
                                        <TableCell className="text-center">2021.1.1 12:00:00</TableCell>
                                        <TableCell className="text-center">아니벌써CS</TableCell>
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
                                        <TableCell className="text-center">202005061035</TableCell>
                                        <TableCell className="text-center">8812124578</TableCell>
                                        <TableCell className="text-center">신규주문</TableCell>
                                        <TableCell className="text-center">부분취소 완료</TableCell>
                                        <TableCell className="text-center">2021.1.1 10:25:12</TableCell>
                                        <TableCell className="text-center">2021.1.1 12:00:00</TableCell>
                                        <TableCell className="text-center">상품 파손</TableCell>
                                        <TableCell className="text-center">2021.1.1 12:00:00</TableCell>
                                        <TableCell className="text-center">2021.1.1 12:00:00</TableCell>
                                        <TableCell className="text-center">아니벌써CS</TableCell>
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

export default withSnackbar(connect(mapStateToProps, null)(Refund));
