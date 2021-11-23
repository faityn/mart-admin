import React from "react";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import PageTitle from "../../../core/common/Partials/PageTitle";
import PaginationMaterial from "@material-ui/lab/Pagination";
import { Grid, TextField, Button, FormControl, Select, MenuItem, InputLabel, Table, TableBody, TableRow, TableCell, FormControlLabel,
        Dialog, DialogTitle, DialogContent, DialogActions, Checkbox, TextareaAutosize} from "@material-ui/core";
import SubjectIcon from '@material-ui/icons/Subject';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import AnswerIcon from '@material-ui/icons/QuestionAnswer';

class ProductQA extends React.Component {
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
                        menuName="Q&A 문의"
                        title="Q&A 문의"
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
                                        <TableCell width="90%">
                                            <Grid item md={10} xs={12} className="align-items-center">
                                                <InputLabel>Q&A 게시판</InputLabel>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell className="align-items-center text-center" width="10%">일자</TableCell>
                                        <TableCell>
                                            <Grid container md={10} xs={12} className="align-items-center">
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
                                                        >1주일</Button>
                                                    </Grid>
                                                    <Grid item md={2} xs={12} style={{paddingLeft: "5px"}}>
                                                        <Button
                                                            fullWidth
                                                            size="medium"
                                                            variant="contained"
                                                            style={{border: "1px solid #cccbcb"}}
                                                        >1개월</Button>
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
                                                        >6개월</Button>
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
                                        <TableCell className="align-items-center text-center" width="10%">답변상태</TableCell>
                                        <TableCell width="90%">
                                            <Grid container md={12} xs={12} className="align-items-center">
                                                <Grid item md={2} xs={12}>
                                                    <FormControl size="small" fullWidth variant="outlined">
                                                        <InputLabel>답변상태</InputLabel>
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
                                        <TableCell>
                                            <Grid container md={10} xs={12} className="align-items-center">
                                                <Grid item md={2} xs={12}>
                                                    <FormControl size="small" fullWidth variant="outlined">
                                                        <InputLabel>제목</InputLabel>
                                                        <Select>
                                                            <MenuItem value="1">닉네임</MenuItem>
                                                            <MenuItem value="2">이름</MenuItem>
                                                            <MenuItem value="3">아이디</MenuItem>
                                                            <MenuItem value="4">내용</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                
                                                <Grid item md={5} xs={12} style={{paddingLeft: "10px"}}>
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        variant="outlined" />
                                                </Grid>

                                                <Grid item md={2} xs={12}></Grid>

                                                <Grid item md={2} xs={12} className="align-items-center" style={{paddingLeft: "10px"}}>
                                                    <Button
                                                        fullWidth
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
                    
                    <Grid container spacing={3} md={12} xs={12} style={{marginTop: "15px"}} className="mt-20">
                        <Grid item md={12} xs={12} className="align-items-center">
                            <Grid container>
                                <Grid item md={2} xs={12} className="align-items-center">
                                    <InputLabel>검색 <i style={{color: "#FF0000", fontStyle: "normal"}}><strong>10</strong></i> 개 / 전체 <i style={{color: "#FF0000", fontStyle: "normal"}}><strong>100</strong></i> 개</InputLabel>
                                </Grid>

                                <Grid item md={7} xs={12} className="align-items-center"></Grid>

                                <Grid item md={1} xs={12} className="align-items-center">
                                    <FormControl size="small" fullWidth variant="outlined">
                                        <InputLabel>10개씩 보기</InputLabel>
                                        <Select>
                                            <MenuItem value="10">10개씩 보기</MenuItem>
                                            <MenuItem value="20">20개씩 보기</MenuItem>
                                            <MenuItem value="50">50개씩 보기</MenuItem>
                                            <MenuItem value="100">100개씩 보기</MenuItem>
                                            <MenuItem value="200">200개씩 보기</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item md={1} xs={12} className="align-items-center" style={{paddingLeft: "10px"}}>
                                    <FormControl size="small" fullWidth variant="outlined">
                                        <InputLabel>번호</InputLabel>
                                        <Select>
                                            <MenuItem value="1">번호</MenuItem>
                                            <MenuItem value="2">등록일</MenuItem>
                                            <MenuItem value="3">등록일</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item md={1} xs={12} className="align-items-center" style={{paddingLeft: "10px"}}>
                                    <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained" 
                                        color="primary" 
                                        startIcon={<AddIcon/>}
                                        onClick={this.onOpenModal.bind(this)}>등록</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} md={12} xs={12} className="mt-20">
                        <Grid item md={12} xs={12} style={{maxWidth: "100%", overflowX: "auto"}}>
                            <Table className="order_table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="text-center" width="5%"><strong>선택</strong></TableCell>
                                        <TableCell className="text-center" width="5%"><strong>번호</strong></TableCell>
                                        <TableCell className="text-center" width="25%"><strong>제목</strong></TableCell>
                                        <TableCell className="text-center" width="10%"><strong>작성자</strong></TableCell>
                                        <TableCell className="text-center" width="10%"><strong>작성 일시</strong></TableCell>
                                        <TableCell className="text-center" width="5%"><strong>조회</strong></TableCell>
                                        <TableCell className="text-center" width="10%"><strong>답변 상태</strong></TableCell>
                                        <TableCell className="text-center" width="10%"><strong>답변 일시</strong></TableCell>
                                        <TableCell className="text-center" width="20%"><strong>수정</strong></TableCell>
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
                                        <TableCell className="text-center">51</TableCell>
                                        <TableCell className="text-center">배송시간 최대한 지켜 주시기 바랍니다</TableCell>
                                        <TableCell className="text-center">아니벌써(admin)</TableCell>
                                        <TableCell className="text-center">2021.11.11 12:01</TableCell>
                                        <TableCell className="text-center">50</TableCell>
                                        <TableCell className="text-center">-</TableCell>
                                        <TableCell className="text-center">-</TableCell>
                                        <TableCell className="text-center">
                                            <Button
                                                size="medium"
                                                variant="contained"  
                                                color="primary"
                                                onClick={this.onOpenModal.bind(this)}
                                                startIcon={<EditIcon/>}>수정</Button>
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
                                                style={{marginLeft: "18%"}}
                                            />
                                        </TableCell>
                                        <TableCell className="text-center">228</TableCell>
                                        <TableCell className="text-center">막걸리 배송해줘도 되는 겁니까?</TableCell>
                                        <TableCell className="text-center">우리 마트(admin)</TableCell>
                                        <TableCell className="text-center">2021.11.11 12:01</TableCell>
                                        <TableCell className="text-center">1</TableCell>
                                        <TableCell className="text-center"><InputLabel color="error">접수</InputLabel></TableCell>
                                        <TableCell className="text-center">-</TableCell>
                                        <TableCell className="text-center">
                                            <Grid container md={12} xs={12} className="align-items-center">
                                                <Grid item md={6} xs={12}>
                                                    <Button
                                                        fullWidth
                                                        size="medium"
                                                        variant="contained"  
                                                        color="primary"
                                                        onClick={this.onOpenModal.bind(this)}
                                                        startIcon={<EditIcon/>}>수정</Button>
                                                </Grid>
                                                <Grid item md={6} xs={12} style={{paddingLeft: "10px"}}>
                                                    <Button
                                                        fullWidth
                                                        size="medium"
                                                        variant="contained"  
                                                        style={{backgroundColor: "#FF5733", color: "#fff"}}
                                                        onClick={this.onOpenModal.bind(this)}
                                                        startIcon={<AnswerIcon/>}>답변</Button>
                                                </Grid>
                                            </Grid>
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
                                                style={{marginLeft: "18%"}}
                                            />
                                        </TableCell>
                                        <TableCell className="text-center">227</TableCell>
                                        <TableCell className="text-center">호박 못 생긴 거 왔다고 교환요청 한 고객</TableCell>
                                        <TableCell className="text-center">다사줘 마트(admin)</TableCell>
                                        <TableCell className="text-center">2021.11.11 12:01</TableCell>
                                        <TableCell className="text-center">10</TableCell>
                                        <TableCell className="text-center"><InputLabel color="primary">답변대기</InputLabel></TableCell>
                                        <TableCell className="text-center">-</TableCell>
                                        <TableCell className="text-center">
                                            <Grid container md={12} xs={12} className="align-items-center">
                                                <Grid item md={6} xs={12}>
                                                    <Button
                                                        fullWidth
                                                        size="medium"
                                                        variant="contained"  
                                                        color="primary"
                                                        onClick={this.onOpenModal.bind(this)}
                                                        startIcon={<EditIcon/>}>수정</Button>
                                                </Grid>
                                                <Grid item md={6} xs={12} style={{paddingLeft: "10px"}}>
                                                    <Button
                                                        fullWidth
                                                        size="medium"
                                                        variant="contained"  
                                                        style={{backgroundColor: "#FF5733", color: "#fff"}}
                                                        onClick={this.onOpenModal.bind(this)}
                                                        startIcon={<AnswerIcon/>}>답변</Button>
                                                </Grid>
                                            </Grid>
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
                                                style={{marginLeft: "18%"}}
                                            />
                                        </TableCell>
                                        <TableCell className="text-center">226</TableCell>
                                        <TableCell className="text-center">당근에 있는 잎사귀 없어서 반품접수</TableCell>
                                        <TableCell className="text-center">다사줘 마트(admin)</TableCell>
                                        <TableCell className="text-center">2021.11.11 12:08</TableCell>
                                        <TableCell className="text-center">10</TableCell>
                                        <TableCell className="text-center"><InputLabel>답변완료</InputLabel></TableCell>
                                        <TableCell className="text-center">2021.11.11.12:09</TableCell>
                                        <TableCell className="text-center">
                                            <Grid container md={12} xs={12} className="align-items-center">
                                                <Grid item md={6} xs={12}>
                                                    <Button
                                                        fullWidth
                                                        size="medium"
                                                        variant="contained"  
                                                        color="primary"
                                                        onClick={this.onOpenModal.bind(this)}
                                                        startIcon={<EditIcon/>}>수정</Button>
                                                </Grid>
                                                <Grid item md={6} xs={12} style={{paddingLeft: "10px"}}>
                                                    <Button
                                                        fullWidth
                                                        size="medium"
                                                        variant="contained"  
                                                        style={{backgroundColor: "#FF5733", color: "#fff"}}
                                                        onClick={this.onOpenModal.bind(this)}
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

                    <Dialog open={this.state.isOpenModal} aria-labelledby="responsive-dialog-title" maxWidth="sm" fullWidth>
                        <DialogTitle id="responsive-dialog-title">
                            <h2>1:1 문의</h2>
                        </DialogTitle>
                        
                        <DialogContent>
                            <Grid spacing={2} container md={12} xs={12}> 
                                <Grid item md={3} xs={12} className="align-items-center">
                                    <h5>번호</h5>
                                </Grid>
                                <Grid item md={9} xs={12} className="align-items-center">
                                    <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        placeholder="00000000"
                                    />
                                </Grid>
                            </Grid>

                            <Grid spacing={2} container md={12} xs={12} className="mt-12"> 
                                <Grid item md={3} xs={12} className="align-items-center">
                                    <h5>(공지) 제목</h5>
                                </Grid>
                                <Grid item md={9} xs={12} className="align-items-center">
                                    <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        placeholder="우리마트"
                                    />
                                </Grid>
                            </Grid>

                            <Grid spacing={2} container md={12} xs={12} className="mt-12"> 
                                <Grid item md={3} xs={12} className="align-items-center">
                                    <h5>내용</h5>
                                </Grid>
                                <Grid item md={9} xs={12} className="align-items-center mt-12">
                                    <TextareaAutosize minRows={15} style={{width: "100%", borderRadius: "5px"}} placeholder="내용" />
                                </Grid>
                            </Grid>
                        </DialogContent>
                        
                        <DialogActions>
                            <Button
                                size="medium"
                                variant="contained"
                                color="primary"
                                startIcon={<SaveIcon/>}
                                style={{marginRight: "5px"}}
                            >저장</Button>
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

export default withSnackbar(connect(mapStateToProps, null)(ProductQA));
