import React from "react";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import PageTitle from "../../../core/common/Partials/PageTitle";
import PaginationMaterial from "@material-ui/lab/Pagination";
import { Grid, TextField, Button, FormControl, Select, MenuItem, InputLabel, Table, TableBody, TableRow, TableCell, FormControlLabel, Link,
        Dialog, DialogTitle, DialogContent, DialogActions, RadioGroup, Radio, Checkbox, TextareaAutosize} from "@material-ui/core";
import SubjectIcon from '@material-ui/icons/Subject';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import ViewIcon from '@material-ui/icons/RemoveRedEye';
import ManageIcon from '@material-ui/icons/ListAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';

class NoticeList extends React.Component {
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
                        menuName="게시판 리스트"
                        title="게시판 리스트"
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
                                onClick={this.onOpenModal.bind(this)}
                            >게시판 만들기</Button>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} md={12} xs={12} className="mt-20">
                        <Grid item md={12} xs={12} className="align-items-center">  
                            <Table className="member_table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="align-items-center text-center" width="10%">검색어</TableCell>
                                        <TableCell>
                                            <Grid container md={8} xs={12} className="align-items-center">
                                                <Grid item md={2} xs={12}>
                                                    <FormControl size="small" fullWidth variant="outlined">
                                                        <InputLabel>아이디</InputLabel>
                                                        <Select>
                                                            <MenuItem value="1">아이디</MenuItem>
                                                            <MenuItem value="2">이름</MenuItem>
                                                            <MenuItem value="3">구분</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                
                                                <Grid item md={5} xs={12} style={{marginLeft: "10px"}}>
                                                    <TextField
                                                        fullWidth
                                                        size="small"  
                                                        variant="outlined"
                                                    />
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="align-items-center text-center" width="10%">유형</TableCell>
                                        <TableCell>
                                            <Grid container md={12} xs={12} className="align-items-center">
                                                <Grid item md={1} xs={12}>
                                                    <RadioGroup aria-label="noticeType" name="noticeType">
                                                        <FormControlLabel
                                                            value="true"
                                                            control={<Radio />}
                                                            label="전체"
                                                            checked={true}
                                                        />
                                                    </RadioGroup>
                                                </Grid>
                                                
                                                <Grid item md={1} xs={12}>
                                                    <RadioGroup aria-label="noticeType" name="noticeType">
                                                        <FormControlLabel
                                                            value="true"
                                                            control={<Radio />}
                                                            label="일반형"
                                                        />
                                                    </RadioGroup>
                                                </Grid>
                                                
                                                <Grid item md={1} xs={12}>
                                                    <RadioGroup aria-label="noticeType" name="noticeType">
                                                        <FormControlLabel
                                                            value="true"
                                                            control={<Radio />}
                                                            label="갤러리형"
                                                        />
                                                    </RadioGroup>
                                                </Grid>
                                                
                                                <Grid item md={1} xs={12}>
                                                    <RadioGroup aria-label="noticeType" name="noticeType">
                                                        <FormControlLabel
                                                            value="true"
                                                            control={<Radio />}
                                                            label="이벤트형"
                                                        />
                                                    </RadioGroup>
                                                </Grid>
                                                
                                                <Grid item md={6} xs={12}>
                                                    <RadioGroup aria-label="noticeType" name="noticeType">
                                                        <FormControlLabel
                                                            value="true"
                                                            control={<Radio />}
                                                            label="1:1문의형"
                                                        />
                                                    </RadioGroup>
                                                </Grid>
                                                <Grid item md={2} xs={12} className="align-items-center">
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

                    <Grid container spacing={3} md={12} xs={12} className="mt-20">
                        <Grid item md={12} xs={12} style={{maxWidth: "100%", overflowX: "auto"}}>
                            <Table className="order_table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="text-center"><strong>선택</strong></TableCell>
                                        <TableCell className="text-center"><strong>번호</strong></TableCell>
                                        <TableCell className="text-center"><strong>아이디</strong></TableCell>
                                        <TableCell className="text-center"><strong>이름</strong></TableCell>
                                        <TableCell className="text-center"><strong>구분</strong></TableCell>
                                        <TableCell className="text-center"><strong>신규게시글</strong></TableCell>
                                        <TableCell className="text-center"><strong>전체게시글</strong></TableCell>
                                        <TableCell className="text-center"><strong>미답변</strong></TableCell>
                                        <TableCell className="text-center"><strong>유형</strong></TableCell>
                                        <TableCell className="text-center"><strong>사용자 화면</strong></TableCell>
                                        <TableCell className="text-center"><strong>관리자 화면</strong></TableCell>
                                        <TableCell className="text-center"><strong>게시판 수정</strong></TableCell>
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
                                        <TableCell className="text-center"><Link>productreview</Link></TableCell>
                                        <TableCell className="text-center"><Link>구매후기</Link></TableCell>
                                        <TableCell className="text-center">고객용</TableCell>
                                        <TableCell className="text-center">0</TableCell>
                                        <TableCell className="text-center">0</TableCell>
                                        <TableCell className="text-center">1</TableCell>
                                        <TableCell className="text-center">갤러리형</TableCell>
                                        <TableCell className="text-center">
                                            <Button
                                                fullWidth
                                                size="medium"
                                                variant="contained"    
                                                style={{ border: "1px solid #cccbcb" }}
                                                startIcon={<ViewIcon/>}>보기</Button>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Button
                                                fullWidth
                                                size="medium"
                                                variant="contained"   
                                                color="primary"
                                                startIcon={<ManageIcon/>}>관리</Button>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Button
                                                fullWidth
                                                size="medium"
                                                variant="contained"  
                                                style={{ border: "1px solid #cccbcb" }}
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
                                        <TableCell className="text-center">2</TableCell>
                                        <TableCell className="text-center"><Link>productqa</Link></TableCell>
                                        <TableCell className="text-center"><Link>상품문의</Link></TableCell>
                                        <TableCell className="text-center">고객용</TableCell>
                                        <TableCell className="text-center">0</TableCell>
                                        <TableCell className="text-center">0</TableCell>
                                        <TableCell className="text-center">0</TableCell>
                                        <TableCell className="text-center">1:1 문의형</TableCell>
                                        <TableCell className="text-center">
                                            <Button
                                                fullWidth
                                                size="medium"
                                                variant="contained"    
                                                style={{ border: "1px solid #cccbcb" }}
                                                startIcon={<ViewIcon/>}>보기</Button>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Button
                                                fullWidth
                                                size="medium"
                                                variant="contained"   
                                                color="primary"
                                                startIcon={<ManageIcon/>}>관리</Button>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Button
                                                fullWidth
                                                size="medium"
                                                variant="contained"  
                                                style={{ border: "1px solid #cccbcb" }}
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
                                        <TableCell className="text-center">3</TableCell>
                                        <TableCell className="text-center"><Link>qna</Link></TableCell>
                                        <TableCell className="text-center"><Link>1:1문의</Link></TableCell>
                                        <TableCell className="text-center">공급사(마트)용</TableCell>
                                        <TableCell className="text-center">0</TableCell>
                                        <TableCell className="text-center">0</TableCell>
                                        <TableCell className="text-center">0</TableCell>
                                        <TableCell className="text-center">1:1 문의형</TableCell>
                                        <TableCell className="text-center">
                                            <Button
                                                fullWidth
                                                size="medium"
                                                variant="contained"    
                                                style={{ border: "1px solid #cccbcb" }}
                                                startIcon={<ViewIcon/>}>보기</Button>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Button
                                                fullWidth
                                                size="medium"
                                                variant="contained"   
                                                color="primary"
                                                startIcon={<ManageIcon/>}>관리</Button>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Button
                                                fullWidth
                                                size="medium"
                                                variant="contained"  
                                                style={{ border: "1px solid #cccbcb" }}
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
                                        <TableCell className="text-center">4</TableCell>
                                        <TableCell className="text-center"><Link>notice</Link></TableCell>
                                        <TableCell className="text-center"><Link>공지사항</Link></TableCell>
                                        <TableCell className="text-center">공급사(마트)용</TableCell>
                                        <TableCell className="text-center">0</TableCell>
                                        <TableCell className="text-center">0</TableCell>
                                        <TableCell className="text-center">-</TableCell>
                                        <TableCell className="text-center">일반형</TableCell>
                                        <TableCell className="text-center">
                                            <Button
                                                fullWidth
                                                size="medium"
                                                variant="contained"    
                                                style={{ border: "1px solid #cccbcb" }}
                                                startIcon={<ViewIcon/>}>보기</Button>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Button
                                                fullWidth
                                                size="medium"
                                                variant="contained"   
                                                color="primary"
                                                startIcon={<ManageIcon/>}>관리</Button>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Button
                                                fullWidth
                                                size="medium"
                                                variant="contained"  
                                                style={{ border: "1px solid #cccbcb" }}
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
                                        <TableCell className="text-center">5</TableCell>
                                        <TableCell className="text-center"><Link>event</Link></TableCell>
                                        <TableCell className="text-center"><Link>이벤트</Link></TableCell>
                                        <TableCell className="text-center">고객용</TableCell>
                                        <TableCell className="text-center">0</TableCell>
                                        <TableCell className="text-center">0</TableCell>
                                        <TableCell className="text-center">-</TableCell>
                                        <TableCell className="text-center">이벤트형</TableCell>
                                        <TableCell className="text-center">
                                            <Button
                                                fullWidth
                                                size="medium"
                                                variant="contained"    
                                                style={{ border: "1px solid #cccbcb" }}
                                                startIcon={<ViewIcon/>}>보기</Button>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Button
                                                fullWidth
                                                size="medium"
                                                variant="contained"   
                                                color="primary"
                                                startIcon={<ManageIcon/>}>관리</Button>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Button
                                                fullWidth
                                                size="medium"
                                                variant="contained"  
                                                style={{ border: "1px solid #cccbcb" }}
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
                                        <TableCell className="text-center">6</TableCell>
                                        <TableCell className="text-center"><Link>cooperation</Link></TableCell>
                                        <TableCell className="text-center"><Link>광고ㆍ제휴게시판</Link></TableCell>
                                        <TableCell className="text-center">고객용</TableCell>
                                        <TableCell className="text-center">0</TableCell>
                                        <TableCell className="text-center">0</TableCell>
                                        <TableCell className="text-center">0</TableCell>
                                        <TableCell className="text-center">1:1 문의형</TableCell>
                                        <TableCell className="text-center">
                                            <Button
                                                fullWidth
                                                size="medium"
                                                variant="contained"    
                                                style={{ border: "1px solid #cccbcb" }}
                                                startIcon={<ViewIcon/>}>보기</Button>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Button
                                                fullWidth
                                                size="medium"
                                                variant="contained"   
                                                color="primary"
                                                startIcon={<ManageIcon/>}>관리</Button>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Button
                                                fullWidth
                                                size="medium"
                                                variant="contained"  
                                                style={{ border: "1px solid #cccbcb" }}
                                                onClick={this.onOpenModal.bind(this)}
                                                startIcon={<EditIcon/>}>수정</Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <Grid container className="mt-20" md={1} xs={12}>
                                <Button 
                                    fullWidth
                                    size="medium"
                                    variant="contained"
                                    color="primary"
                                    startIcon={<DeleteIcon/>}
                                    style={{backgroundColor: "#FF0000", color: "#fff", fontStyle: "normal"}}>선택삭제</Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} md={12} xs={12} className="mt-20">
                        <Grid item md={12} xs={12} className="align-items-center text-center">
                            <PaginationMaterial count={10} color="primary" />
                        </Grid>
                    </Grid>

                    <Dialog open={this.state.isOpenModal} aria-labelledby="responsive-dialog-title" maxWidth="sm" fullWidth>
                        <DialogTitle id="responsive-dialog-title">
                            <h2>게시판 만들기</h2>
                        </DialogTitle>
                        
                        <DialogContent>
                            <Grid spacing={2} container md={12} xs={12}> 
                                <Grid item md={3} xs={12} className="align-items-center">
                                    <h5>아이디</h5>
                                </Grid>
                                <Grid item md={9} xs={12} className="align-items-center">
                                    <FormControl
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                    >
                                        <InputLabel>아이디</InputLabel>
                                        <Select>
                                            <MenuItem value="">...</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Grid spacing={2} container md={12} xs={12} className="mt-12"> 
                                <Grid item md={3} xs={12} className="align-items-center">
                                    <h5>분류(이름)</h5>
                                </Grid>
                                <Grid item md={9} xs={12} className="align-items-center">
                                    <FormControl
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                    >
                                        <InputLabel>분류(이름)</InputLabel>
                                        <Select>
                                            <MenuItem value="">...</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Grid spacing={2} container md={12} xs={12} className="mt-12"> 
                                <Grid item md={3} xs={12} className="align-items-center">
                                    <h5>구분</h5>
                                </Grid>
                                <Grid item md={9} xs={12} className="align-items-center">
                                    <FormControl
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                    >
                                        <InputLabel>고객용/ 마트용</InputLabel>
                                        <Select>
                                            <MenuItem value="">...</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Grid spacing={2} container md={12} xs={12} className="mt-12"> 
                                <Grid item md={3} xs={12} className="align-items-center">
                                    <h5>유형</h5>
                                </Grid>
                                <Grid item md={9} xs={12} className="align-items-center">
                                    <FormControl
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                    >
                                        <InputLabel>유형</InputLabel>
                                        <Select>
                                            <MenuItem value="">...</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} md={12} xs={12} className="mt-12">
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

export default withSnackbar(connect(mapStateToProps, null)(NoticeList));
