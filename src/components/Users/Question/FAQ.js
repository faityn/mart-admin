import React from "react";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import PageTitle from "../../../core/common/Partials/PageTitle";
import PaginationMaterial from '@material-ui/lab/Pagination';
import { Grid, TextField, Button, FormControl, Select, MenuItem, InputLabel, Table, TableBody, TableRow, TableCell, FormControlLabel, Link,
        Dialog, DialogTitle, DialogContent, DialogActions, Divider, RadioGroup, Radio, Checkbox, TextareaAutosize} from "@material-ui/core";
import SubjectIcon from '@material-ui/icons/Subject';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/Add';

class FAQuestionList extends React.Component {
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
                        menuName="게시판 FAQ 관리"
                        title="게시판 FAQ 관리"
                        icon={<SubjectIcon />}
                        />
                    </Grid>
                </Grid> 
                
                <div className="card mt-20">
                    <Grid container spacing={3} md={12} xs={12}> 
                        <Grid item md={10} xs={12}></Grid>
                        <Grid item md={2} xs={12} className="align-items-center">
                            <Grid container>
                                <Grid item md={7} xs={12}></Grid>
                                <Grid item md={5} xs={12}>
                                    <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained"
                                        style={{backgroundColor: "#FF5733", color: "#fff"}}
                                        startIcon={<AddIcon/>}
                                        onClick={this.onOpenModal.bind(this)}
                                    >등록</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    
                    <Grid container spacing={3} md={12} xs={12} className="mt-20">
                        <Grid item md={12} xs={12} className="align-items-center">  
                            <Table className="member_table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="align-items-center text-center" width="10%">카테고리</TableCell>
                                        <TableCell width="40%">
                                            <Grid container md={10} xs={12} className="align-items-center">
                                                <Grid item md={12} xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        size="small"  
                                                        variant="outlined"
                                                    />
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                        <TableCell className="align-items-center text-center" width="10%">유형</TableCell>
                                        <TableCell width="40%"> 
                                            <Grid container md={10} xs={12} className="align-items-center">
                                                <Grid item md={2} xs={12}>
                                                    <RadioGroup aria-label="noticeType" name="noticeType">
                                                        <FormControlLabel
                                                            value="true"
                                                            control={<Radio />}
                                                            label="전체"
                                                            checked={true}
                                                        />
                                                    </RadioGroup>
                                                </Grid>
                                                
                                                <Grid item md={2} xs={12}>
                                                    <RadioGroup aria-label="noticeType" name="noticeType">
                                                        <FormControlLabel
                                                            value="true"
                                                            control={<Radio />}
                                                            label="일반"
                                                        />
                                                    </RadioGroup>
                                                </Grid>
                                                
                                                <Grid item md={3} xs={12}>
                                                    <RadioGroup aria-label="noticeType" name="noticeType">
                                                        <FormControlLabel
                                                            value="true"
                                                            control={<Radio />}
                                                            label="베스트"
                                                        />
                                                    </RadioGroup>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell className="align-items-center text-center" width="10%">등록일</TableCell>
                                        <TableCell colspan={3}>
                                            <Grid container md={12} xs={12} className="align-items-center">
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
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                    
                                    <TableRow>
                                        <TableCell className="align-items-center text-center" width="10%">검색</TableCell>
                                        <TableCell colspan={3}>
                                            <Grid container md={12} xs={12} className="align-items-center">
                                                <Grid item md={2} xs={12}>
                                                    <FormControl size="small" fullWidth variant="outlined">
                                                        <InputLabel>통합검색</InputLabel>
                                                        <Select>
                                                            <MenuItem value="1">전체</MenuItem>
                                                            <MenuItem value="2">회원가입/정보</MenuItem>
                                                            <MenuItem value="3">결제/배송</MenuItem>
                                                            <MenuItem value="4">교환/반품/환불</MenuItem>
                                                            <MenuItem value="5">포인트 적립</MenuItem>
                                                            <MenuItem value="6">포인트 적립</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item md={4} xs={12} style={{paddingLeft: "10px"}}>
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        variant="outlined"
                                                    />
                                                </Grid>
                                                <Grid item md={5} xs={12} className="align-items-center"></Grid>
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
                    
                    <Grid container spacing={3} md={12} xs={12} className="mt-20">
                        <Grid item md={12} xs={12} className="align-items-center">
                            <Grid container>
                                <Grid item md={2} xs={12}>
                                    <InputLabel>검색 <i style={{color: "#FF0000", fontStyle: "normal"}}><strong>0</strong></i> / 전체 <i style={{color: "#FF0000", fontStyle: "normal"}}><strong>0</strong></i></InputLabel>
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
                                        <TableCell className="text-center" width="10%"><strong>구분</strong></TableCell>
                                        <TableCell className="text-center" width="10%"><strong>카테고리</strong></TableCell>
                                        <TableCell className="text-center" width="40%"><strong>제목</strong></TableCell>
                                        <TableCell className="text-center" width="10%"><strong>유형</strong></TableCell>
                                        <TableCell className="text-center" width="10%"><strong>등록일</strong></TableCell>
                                        <TableCell className="text-center" width="10%"><strong>수정</strong></TableCell>
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
                                                onClick={this.onOpenModal.bind(this)}
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

                    <Dialog open={this.state.isOpenModal} aria-labelledby="responsive-dialog-title" maxWidth="sm" fullWidth>
                        <DialogTitle id="responsive-dialog-title">
                            <h2>게시판 FAQ 등록</h2>
                        </DialogTitle>
                        
                        <DialogContent>
                            <Grid spacing={2} container md={12} xs={12}> 
                                <Grid item md={3} xs={12} className="align-items-center">
                                    <h5>번호</h5>
                                </Grid>
                                <Grid item md={9} xs={12} className="align-items-center">
                                    <FormControl
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                    >
                                        <InputLabel>번호</InputLabel>
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
                                        <InputLabel>구분</InputLabel>
                                        <Select>
                                            <MenuItem value="">...</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>

                            <Grid spacing={2} container md={12} xs={12} className="mt-12"> 
                                <Grid item md={3} xs={12} className="align-items-center">
                                    <h5>카테고리</h5>
                                </Grid>
                                <Grid item md={9} xs={12} className="align-items-center">
                                    <FormControl
                                        size="small"
                                        fullWidth
                                        variant="outlined"
                                    >
                                        <InputLabel>카테고리</InputLabel>
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

                            <Grid spacing={2} container md={12} xs={12} className="mt-12"> 
                                <Grid item md={3} xs={12} className="align-items-center">
                                    <h5>제목</h5>
                                </Grid>
                                <Grid item md={9} xs={12} className="align-items-center">
                                    <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        placeholder="제목"
                                    />
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

export default withSnackbar(connect(mapStateToProps, null)(FAQuestionList));
