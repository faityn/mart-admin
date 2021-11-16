import React from "react";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import PageTitle from "../../../core/common/Partials/PageTitle";
import { Grid, TextField, Button, FormControl, Select, MenuItem, InputLabel, Table, TableBody, TableRow, TableCell, FormControlLabel,
        Dialog, DialogTitle, DialogActions, Divider, Checkbox} from "@material-ui/core";
import SubjectIcon from '@material-ui/icons/Subject';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import PaginationMaterial from '@material-ui/lab/Pagination';

class ReviewList extends React.Component {
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
                        menuName="리뷰관리"
                        title="리뷰관리"
                        icon={<SubjectIcon />}
                        />
                    </Grid>
                </Grid> 
                
                <div className="card mt-20">
                    <Grid container spacing={3} md={12} xs={12}>
                        <Grid item md={12} xs={12} className="align-items-center">  
                            <Table className="member_table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="align-items-center text-center" width="10%">일자</TableCell>
                                        <TableCell>
                                            <Grid container md={12} xs={12} className="align-items-center">
                                                <Grid item md={1} xs={12}>
                                                    <FormControl size="small" fullWidth variant="outlined">
                                                        <InputLabel>등록일</InputLabel>
                                                        <Select>
                                                            <MenuItem value="1">등록일</MenuItem>
                                                            <MenuItem value="2">수정일</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid container md={5} xs={12} style={{paddingLeft: "5px"}}>
                                                    <Grid item md={5} xs={12} className="align-items-center">
                                                        <TextField
                                                            fullWidth
                                                            size="small"  
                                                            variant="outlined"
                                                            type="date"
                                                            name="startDate"
                                                        />
                                                    </Grid>
                                                    <Grid item md={1} xs={12} className="text-center" className="align-items-center" style={{paddingTop: "6px", paddingLeft: "1.5rem"}}>
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
                                                    <Grid item md={2} xs={12}>
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
                                                            style={{border: "1px solid #cccbcb"}}
                                                        >7일</Button>
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
                                                        >30일</Button>
                                                    </Grid>
                                                    <Grid item md={2} xs={12} style={{paddingLeft: "5px"}}>
                                                        <Button
                                                            fullWidth
                                                            size="medium"
                                                            variant="contained"
                                                            style={{border: "1px solid #cccbcb"}}
                                                        >3개월</Button>
                                                    </Grid>
                                                    <Grid item md={2} xs={12} style={{paddingLeft: "5px"}}>
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
                                    
                                    <TableRow>
                                        <TableCell className="align-items-center text-center" width="10%">평점</TableCell>
                                        <TableCell>
                                            <Grid container md={12} xs={12} className="align-items-center">
                                                <Grid item md={3} xs={12}>
                                                    <FormControl size="small" fullWidth variant="outlined">
                                                        <InputLabel>1점</InputLabel>
                                                        <Select>
                                                            <MenuItem value="1">1점</MenuItem>
                                                            <MenuItem value="2">2점</MenuItem>
                                                            <MenuItem value="3">3점</MenuItem>
                                                            <MenuItem value="4">4점</MenuItem>
                                                            <MenuItem value="5">5점</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                    
                                    <TableRow>
                                        <TableCell className="align-items-center text-center" width="10%">검색어</TableCell>
                                        <TableCell>
                                            <Grid container md={12} xs={12} className="align-items-center">
                                                <Grid item md={2} xs={12}>
                                                    <FormControl size="small" fullWidth variant="outlined">
                                                        <InputLabel>제목</InputLabel>
                                                        <Select>
                                                            <MenuItem value="1">제목</MenuItem>
                                                            <MenuItem value="2">닉네임</MenuItem>
                                                            <MenuItem value="3">이름</MenuItem>
                                                            <MenuItem value="4">아이디</MenuItem>
                                                            <MenuItem value="5">내용</MenuItem>
                                                            <MenuItem value="6">제목+내용</MenuItem>
                                                            <MenuItem value="7">상품명</MenuItem>
                                                            <MenuItem value="8">상품코드</MenuItem>
                                                            <MenuItem value="9">바코드 상품코드</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item md={6} xs={12} style={{paddingLeft: "10px"}}>
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                </Grid>
                                                <Grid item md={3} xs={12} className="align-items-center"></Grid>
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
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid> 
                    
                    <Grid container spacing={3} md={12} xs={12} style={{marginTop: "15px"}}>
                        <Grid item md={12} xs={12} className="align-items-center">
                            <Grid container>
                                <Grid item md={2} xs={12}>
                                    <InputLabel>검색 <i style={{color: "#FF0000", fontStyle: "normal"}}><strong>0</strong></i> / 전체 <i style={{color: "#FF0000", fontStyle: "normal"}}><strong>0</strong></i></InputLabel>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} md={12} xs={12} style={{marginTop: "15px"}}>
                        <Grid item md={12} xs={12} style={{maxWidth: "100%", overflowX: "auto"}}>
                            <Table className="order_table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="text-center" width="5%"><strong>선택</strong></TableCell>
                                        <TableCell className="text-center" width="5%"><strong>번호</strong></TableCell>
                                        <TableCell className="text-center" width="40%"><strong>제목</strong></TableCell>
                                        <TableCell className="text-center" width="10%"><strong>작성자</strong></TableCell>
                                        <TableCell className="text-center" width="10%"><strong>작성일</strong></TableCell>
                                        <TableCell className="text-center" width="5%"><strong>조회</strong></TableCell>
                                        <TableCell className="text-center" width="5%"><strong>평점</strong></TableCell>
                                        <TableCell className="text-center" width="10%"><strong>수정/답변</strong></TableCell>
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
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center">
                                            <Button
                                                fullWidth
                                                size="medium"
                                                variant="contained"  
                                                color="primary"
                                                startIcon={<EditIcon/>}>수정</Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>
                    
                    <Grid container spacing={3} md={12} xs={12} className="mt-20">
                        <Grid item md={1} xs={12}>
                            <Button 
                                fullWidth
                                size="medium"
                                variant="contained"
                                color="primary"
                                startIcon={<DeleteIcon/>}
                                style={{backgroundColor: "#FF0000", color: "#fff", fontStyle: "normal"}}>선택삭제</Button>
                        </Grid>
                        <Grid item md={9} xs={12} className="align-items-center"></Grid>
                        <Grid item md={2} xs={12} className="align-items-center">
                            <Button
                                fullWidth
                                size="medium"
                                variant="contained"     
                                style={{backgroundColor: "#0eb906", color: "#fff"}}
                                startIcon={<DownloadIcon/>}>엑셀 다운로드</Button>
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
                            <h2>게시판 만들기</h2>
                        </DialogTitle>
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

export default withSnackbar(connect(mapStateToProps, null)(ReviewList));
