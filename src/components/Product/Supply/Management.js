import React from "react";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import PageTitle from "../../../core/common/Partials/PageTitle";
import PaginationMaterial from "@material-ui/lab/Pagination";
import {Grid, TextField, Button, FormControl, Select, MenuItem, InputLabel, Table, TableBody, TableRow, TableCell, FormControlLabel, 
        Checkbox, Dialog, DialogActions, DialogTitle, DialogContent, Link} from "@material-ui/core";
import SubjectIcon from '@material-ui/icons/Subject';
import SearchIcon from '@material-ui/icons/Search';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import CancelIcon from '@material-ui/icons/Cancel';

class Management extends React.Component {
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
                            menuName="공급사(마트) 관리"
                            title="공급사(마트) 관리"
                            icon={<SubjectIcon />}
                        />
                    </Grid>
                </Grid>

                <div className="card mt-20">
                    <Grid container spacing={3} md={10} xs={12} className="align-items-center">
                        <Grid item md={10} xs={12} className="text-left"><h5>신규 마트<i style={{ color: "#ff0000", fontStyle: "normal"}}><strong> 0 </strong></i>건</h5></Grid>
                    </Grid>

                    <Grid container spacing={3} md={10} xs={12} className="align-items-center">
                        <Grid item md={2} xs={12}>
                            <h5>조회기간</h5>
                        </Grid>

                        <Grid item md={10} xs={12} className="align-items-center">
                            <Grid item md={2} xs={12} className="align-items-center">
                                <FormControl size="small" fullWidth variant="outlined">
                                    <InputLabel>공급자(마트) 조회</InputLabel>
                                    <Select>
                                        <MenuItem value="">...</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item md={4} xs={12} style={{ marginLeft: "10px" }} className="align-items-center">
                                <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid container md={5} xs={12} style={{ marginLeft: "10px" }} className="align-items-center">
                                <Grid item md={5} xs={12}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        type="date"
                                        name="startDate"
                                    />
                                </Grid>
                                <Grid item md={1} xs={12} className="text-center">
                                    <h5>~</h5>
                                </Grid>
                                <Grid item md={5} xs={12}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        type="date"
                                        name="endDate"
                                    />
                                </Grid>
                            </Grid>
                            <Grid item md={1} xs={12} className="align-items-center">
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
                                    <h5>마트 목록 (총<i style={{ color: "#ff0000", fontStyle: "normal"}}><strong> 0 </strong></i>개)</h5>
                                </Grid>

                                <Grid item md={10} xs={12} className="align-items-center">
                                    <Grid container>
                                        <Grid item md={1} xs={12} className="align-items-center">
                                            <Button
                                                fullWidth
                                                size="medium"
                                                variant="contained"
                                                style={{ border: "1px solid #cccbcb" }}>입 점</Button>
                                        </Grid>
                                        <Grid item md={1} xs={12} className="align-items-center" style={{marginLeft: "10px"}}>
                                            <Button
                                                fullWidth
                                                size="medium"
                                                variant="contained"
                                                style={{ border: "1px solid #cccbcb" }}>퇴 점</Button>
                                        </Grid>
                                        {/*
                                        <Grid item md={2} xs={12} className="align-items-center" style={{marginLeft: "10px"}}>
                                            <Button
                                                fullWidth
                                                size="medium"
                                                variant="contained"
                                                style={{ border: "1px solid #cccbcb" }}>정보수정</Button>
                                        </Grid>
                                        <Grid item md={2} xs={12} className="align-items-center" style={{marginLeft: "10px"}}>
                                            <Button
                                                fullWidth
                                                size="medium"
                                                variant="contained"
                                                color="primary">변경 확인</Button>
                                        </Grid> */}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={2} xs={12} className="align-items-center text-right">
                            <Grid item md={8} xs={12} style={{marginLeft: "5.5rem"}}>
                                <Button
                                    fullWidth
                                    size="medium"
                                    variant="contained"
                                    startIcon={<DownloadIcon/>}
                                    style={{backgroundColor: "#3aad38", color: "#fff"}}>엑셀 다운로드</Button>
                            </Grid>     
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} md={12} xs={12} style={{ marginTop: "10px" }}>
                        <Grid item md={12} xs={12} style={{maxWidth: "100%", overflowX: "auto"}}>
                            <Table className="order_table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="text-center" width="3%"><strong>선택</strong></TableCell>
                                        <TableCell className="text-center" width="3%"><strong>상태</strong></TableCell>
                                        <TableCell className="text-center" width="10%"><strong>상호명</strong></TableCell>
                                        <TableCell className="text-center"><strong>사업자등록번호</strong></TableCell>
                                        <TableCell className="text-center"><strong>법인번호</strong></TableCell>
                                        <TableCell className="text-center"><strong>업태</strong></TableCell>
                                        <TableCell className="text-center"><strong>업종</strong></TableCell>
                                        <TableCell className="text-center"><strong>주소</strong></TableCell>
                                        <TableCell className="text-center"><strong>대표</strong></TableCell>
                                        <TableCell className="text-center"><strong>대표 연락처</strong></TableCell>
                                        <TableCell className="text-center"><strong>대표 휴대폰</strong></TableCell>
                                        <TableCell className="text-center"><strong>담당자</strong></TableCell>
                                        <TableCell className="text-center"><strong>담당자 휴대폰</strong></TableCell>
                                        <TableCell className="text-center"><strong>이메일<br/>(세금계산서)</strong></TableCell>
                                        <TableCell className="text-center"><strong>통장사본</strong></TableCell>
                                        <TableCell className="text-center"><strong>계좌번호</strong></TableCell>
                                        <TableCell className="text-center"><strong>계좌구분</strong></TableCell>
                                        <TableCell className="text-center"><strong>예금주명</strong></TableCell>
                                        <TableCell className="text-center"><strong>은행</strong></TableCell>
                                        <TableCell className="text-center"><strong>유효성 여부</strong></TableCell>
                                        <TableCell className="text-center"><strong>운영시간</strong></TableCell>
                                        <TableCell className="text-center"><strong>배송 시작/마감 시간</strong></TableCell>
                                        <TableCell className="text-center"><strong>전화문의 시간</strong></TableCell>
                                        <TableCell className="text-center"><strong>정산유형</strong></TableCell>
                                        <TableCell className="text-center"><strong>정산 담당자</strong></TableCell>
                                        <TableCell className="text-center"><strong>정산 담당 연락처</strong></TableCell>
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
                                                style={{marginLeft: "18%"}}
                                            />
                                        </TableCell>
                                        <TableCell className="text-center"><InputLabel style={{backroundColor: "#9eecf7", padding: "5px", borderRadius: "5px"}}>신규</InputLabel></TableCell>
                                        <TableCell className="text-center"><Link component="button" onClick={this.onOpenModal.bind(this)}>우리 마트</Link></TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center">이미지<br/>(JPG/PDF/PNG)</TableCell>
                                        <TableCell className="text-center">000-000-0000</TableCell>
                                        <TableCell className="text-center">일반</TableCell>
                                        <TableCell className="text-center">우리 마트</TableCell>
                                        <TableCell className="text-center">KB은행</TableCell>
                                        <TableCell className="text-center">Y</TableCell>
                                        <TableCell className="text-center">24시간</TableCell>
                                        <TableCell className="text-center">09:00~21:00</TableCell>
                                        <TableCell className="text-center">09:00~18:00</TableCell>
                                        <TableCell className="text-center">주 정산(7X7)</TableCell>
                                        <TableCell className="text-center">김우리</TableCell>
                                        <TableCell className="text-center">010-0000-0000</TableCell>
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
                                                style={{marginLeft: "18%"}}
                                            />
                                        </TableCell>
                                        <TableCell className="text-center"><InputLabel style={{backroundColor: "#DAF7A6", padding: "5px", borderRadius: "5px"}}>입점</InputLabel></TableCell>
                                        <TableCell className="text-center"><Link>꼬끼오</Link></TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center">이미지<br/>(JPG/PDF/PNG)</TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center">일반</TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center">기업은행</TableCell>
                                        <TableCell className="text-center">Y</TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center">주 정산(7X7)</TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
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

                <Dialog open={this.state.isOpenModal} maxWidth="lg" fullWidth>
                    <DialogTitle>우리 마트</DialogTitle>

                    <DialogContent>
                        <Grid container spacing={3} className="align-items-center" md={12} xs={12}>
                            <Grid item md={12} xs={12}>
                                <Table className="order_table">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="text-center" width="14%"><strong>아이디</strong></TableCell>
                                            <TableCell className="text-center" width="14%"><strong>비밀번호</strong></TableCell>
                                            <TableCell className="text-center" width="14%"><strong>이름</strong></TableCell>
                                            <TableCell className="text-center" width="14%"><strong>연락처</strong></TableCell>
                                            <TableCell className="text-center" width="14%"><strong>이메일</strong></TableCell>
                                            <TableCell className="text-center" width="14%"><strong>직원여부</strong></TableCell>
                                            <TableCell className="text-center" width="16%"><strong>직원/부서/직급/직책</strong></TableCell>
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
                    </DialogContent>

                    <DialogActions>
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

export default withSnackbar(connect(mapStateToProps, null)(Management));
