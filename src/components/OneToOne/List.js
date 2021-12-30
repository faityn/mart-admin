import React from "react";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import PageTitle from "../../core/common/Partials/PageTitle";
import PaginationMaterial from "@material-ui/lab/Pagination";
import { Grid, TextField, Button, FormControl, Select, MenuItem, InputLabel, Table, TableBody, TableRow, TableCell, FormControlLabel, Checkbox} from "@material-ui/core";
import SubjectIcon from '@material-ui/icons/Subject';
import EditIcon from '@material-ui/icons/Edit';
import AnswerIcon from '@material-ui/icons/QuestionAnswer';
import SearchIcon from '@material-ui/icons/Search';

class OneToOneList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Grid container>
                    <Grid item>
                        <PageTitle
                        menuName="1:1 문의하기"
                        title="게시글"
                        icon={<SubjectIcon />}
                        />
                    </Grid>
                </Grid> 
                
                <div className="card mt-20">
                    <Grid container spacing={3} md={12} xs={12} className="mt-20">
                        <Grid item md={12} xs={12} className="align-items-center">  
                            <Table className="member_table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="align-items-center text-center" width="10%">게시판</TableCell>
                                        <TableCell className="align-items-center" width="90%">
                                            <InputLabel><strong>1:1 문의하기</strong></InputLabel>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="align-items-center text-center" width="10%">일자</TableCell>
                                        <TableCell className="align-items-center" width="90%">
                                            <Grid container md={12} xs={12} className="align-items-center">
                                                <Grid container md={4} xs={12}>
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
                                                <Grid container md={6} xs={12} className="align-items-center">
                                                    <Grid item md={2} xs={12} style={{paddingLeft: "10px"}}>
                                                        <Button
                                                            fullWidth
                                                            size="medium"
                                                            variant="contained"
                                                            style={{border: "1px solid #cccbcb"}}
                                                        >오늘
                                                        </Button>
                                                    </Grid>
                                                    <Grid item md={2} xs={12} style={{paddingLeft: "5px"}}>
                                                        <Button
                                                            fullWidth
                                                            size="medium"
                                                            variant="contained"
                                                            color="primary"
                                                        >1주일
                                                        </Button>
                                                    </Grid>
                                                    <Grid item md={2} xs={12} style={{paddingLeft: "5px"}}>
                                                        <Button
                                                            fullWidth
                                                            size="medium"
                                                            variant="contained"
                                                            style={{border: "1px solid #cccbcb"}}
                                                        >15일</Button>
                                                    </Grid>
                                                    <Grid item md={2} xs={12} style={{paddingLeft: "5px"}}>
                                                        <Button
                                                            fullWidth
                                                            size="medium"
                                                            variant="contained"
                                                            style={{border: "1px solid #cccbcb"}}
                                                        >1개월
                                                        </Button>
                                                    </Grid>
                                                    <Grid item md={2} xs={12} style={{paddingLeft: "5px"}}>
                                                        <Button
                                                            fullWidth
                                                            size="medium"
                                                            variant="contained"
                                                            style={{border: "1px solid #cccbcb"}}
                                                        >3개월
                                                        </Button>
                                                    </Grid>
                                                    <Grid item md={2} xs={12} style={{paddingLeft: "5px"}}>
                                                        <Button
                                                            fullWidth
                                                            size="medium"
                                                            variant="contained"
                                                            style={{border: "1px solid #cccbcb"}}
                                                        >1년
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="align-items-center text-center" width="10%">답변상태</TableCell>
                                        <TableCell className="align-items-center" width="90%">
                                            <Grid container md={8} xs={12} className="align-items-center">
                                                <Grid item md={3} xs={12}>
                                                    <FormControl size="small" fullWidth variant="outlined">
                                                        <InputLabel>전체</InputLabel>
                                                        <Select>
                                                            <MenuItem value="1">접수</MenuItem>
                                                            <MenuItem value="2">답변대기</MenuItem>
                                                            <MenuItem value="3">답변완료</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="align-items-center text-center" width="10%">검색어</TableCell>
                                        <TableCell className="align-items-center" width="90%">
                                            <Grid container md={8} xs={12} className="align-items-center">
                                                <Grid item md={3} xs={12}>
                                                    <FormControl size="small" fullWidth variant="outlined">
                                                        <InputLabel>제목</InputLabel>
                                                        <Select>
                                                            <MenuItem value="1">이름</MenuItem>
                                                            <MenuItem value="2">아이디</MenuItem>
                                                            <MenuItem value="3">내용</MenuItem>
                                                            <MenuItem value="4">제목+내용</MenuItem>
                                                            <MenuItem value="5">상품명</MenuItem>
                                                            <MenuItem value="6">상품코드</MenuItem>
                                                            <MenuItem value="7">자체상품코드</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                
                                                <Grid item md={6} xs={12} style={{marginLeft: "10px"}}>
                                                    <TextField
                                                        fullWidth
                                                        size="small"  
                                                        variant="outlined"
                                                    />
                                                </Grid>

                                                <Grid item md={2} xs={12} style={{marginLeft: "10px"}}>
                                                    <Button
                                                        size="medium"
                                                        variant="contained"     
                                                        color="primary"
                                                        startIcon={<SearchIcon/>}>검색</Button>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} md={12} xs={12} className="mt-20">
                        <Grid item md={11} xs={12}></Grid>
                        <Grid item md={1} xs={12} className="align-items-center">  
                            <FormControl size="small" fullWidth variant="outlined">
                                <InputLabel>10개씩</InputLabel>
                                <Select>
                                    <MenuItem value="10">10개씩</MenuItem>
                                    <MenuItem value="20">20개씩</MenuItem>
                                    <MenuItem value="30">30개씩</MenuItem>
                                    <MenuItem value="50">50개씩</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} md={12} xs={12} className="mt-20">
                        <Grid item md={12} xs={12} style={{maxWidth: "100%", overflowX: "auto"}}>
                            <Table className="order_table">
                                <TableBody>
                                    <TableRow style={{backgroundColor: "#f2f2f2", border: "1px solid #cccccc"}}>
                                        <TableCell className="text-center" width="5%"><strong>선택</strong></TableCell>
                                        <TableCell className="text-center" width="5%"><strong>번호</strong></TableCell>
                                        <TableCell className="text-center" width="35%"><strong>제목</strong></TableCell>
                                        <TableCell className="text-center" width="10%"><strong>작성자</strong></TableCell>
                                        <TableCell className="text-center" width="10%"><strong>작성일</strong></TableCell>
                                        <TableCell className="text-center" width="10%"><strong>조회</strong></TableCell>
                                        <TableCell className="text-center" width="10%"><strong>답변상태</strong></TableCell>
                                        <TableCell className="text-center" width="15%"><strong>수정/답변</strong></TableCell>
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
                                        <TableCell className="text-center">1</TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center">
                                            <Grid container md={12} xs={12} className="align-items-center">
                                                <Grid item md={6} xs={12}>
                                                    <Button
                                                        size="medium"
                                                        variant="contained"  
                                                        color="primary"
                                                        startIcon={<EditIcon/>}>수정</Button>
                                                </Grid>
                                                <Grid item md={6} xs={12} style={{paddingLeft: "5px"}}>
                                                    <Button
                                                        size="medium"
                                                        variant="contained"  
                                                        style={{border: "1px solid #cccbcb"}}
                                                        startIcon={<AnswerIcon/>}>답변</Button>
                                                </Grid>
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

export default withSnackbar(connect(mapStateToProps, null)(OneToOneList));
