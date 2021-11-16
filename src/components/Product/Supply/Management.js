import React from "react";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import PageTitle from "../../../core/common/Partials/PageTitle";
import {
    Grid, TextField, Button, FormControl, Select, MenuItem, InputLabel, Table, TableBody, TableRow, TableCell, FormControlLabel, Checkbox} from "@material-ui/core";
import PaginationMaterial from "@material-ui/lab/Pagination";
import SubjectIcon from '@material-ui/icons/Subject';
import SearchIcon from '@material-ui/icons/Search';
import DownloadIcon from '@material-ui/icons/CloudDownload';

class Management extends React.Component {
    constructor(props) {
        super(props);
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
                        <Grid item md={10} xs={12} className="text-left"><InputLabel>신규 마트<i style={{ color: "#ff0000", fontStyle: "normal"}}><strong> 0 </strong></i>건</InputLabel></Grid>
                    </Grid>

                    <Grid container spacing={3} md={10} xs={12}>
                        <Grid item md={2} xs={12} className="align-items-center">
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
                            <Grid item md={4} xs={12} className="align-items-center" style={{ marginLeft: "10px" }}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    variant="outlined"
                                />
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
                                        </Grid>
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
                                        <TableCell className="text-center"><strong>선택</strong></TableCell>
                                        <TableCell className="text-center" width="8%"><strong>아이디</strong></TableCell>
                                        <TableCell className="text-center" width="8%"><strong>상호명</strong></TableCell>
                                        <TableCell className="text-center" width="8%"><strong>수수료(%)</strong></TableCell>
                                        <TableCell className="text-center" width="8%"><strong>사업자등록번호</strong></TableCell>
                                        <TableCell className="text-center" width="8%"><strong>법인번호</strong></TableCell>
                                        <TableCell className="text-center" width="8%"><strong>업태</strong></TableCell>
                                        <TableCell className="text-center" width="8%"><strong>업종</strong></TableCell>
                                        <TableCell className="text-center" width="8%"><strong>주소</strong></TableCell>
                                        <TableCell className="text-center" width="8%"><strong>대표</strong></TableCell>
                                        <TableCell className="text-center" width="8%"><strong>대표 연락처</strong></TableCell>
                                        <TableCell className="text-center" width="8%"><strong>대표 휴대폰</strong></TableCell>
                                        <TableCell className="text-center" width="8%"><strong>담당자</strong></TableCell>
                                        <TableCell className="text-center" width="8%"><strong>담당자 휴대폰</strong></TableCell>
                                        <TableCell className="text-center" width="8%"><strong>이메일<br/>(세금계산서)</strong></TableCell>
                                        <TableCell className="text-center"><strong>통장사본</strong></TableCell>
                                        <TableCell className="text-center"><strong>계좌번호</strong></TableCell>
                                        <TableCell className="text-center" width="8%"><strong>계좌구분</strong></TableCell>
                                        <TableCell className="text-center" width="8%"><strong>예금주명</strong></TableCell>
                                        <TableCell className="text-center" width="8%"><strong>은행</strong></TableCell>
                                        <TableCell className="text-center" width="8%"><strong>유효성 여부</strong></TableCell>
                                        <TableCell className="text-center" width="8%"><strong>운영시간</strong></TableCell>
                                        <TableCell className="text-center"><strong>배송 시작/마감 시간</strong></TableCell>
                                        <TableCell className="text-center"><strong>전화문의 시간</strong></TableCell>
                                        <TableCell className="text-center"><strong>정산유형</strong></TableCell>
                                        <TableCell className="text-center" width="8%"><strong>정산 담당자</strong></TableCell>
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
                                            />
                                        </TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center">우리 마트</TableCell>
                                        <TableCell className="text-center">9</TableCell>
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

export default withSnackbar(connect(mapStateToProps, null)(Management));
