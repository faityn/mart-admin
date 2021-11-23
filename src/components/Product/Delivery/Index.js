import React from "react";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import PageTitle from "../../../core/common/Partials/PageTitle";
import PaginationMaterial from "@material-ui/lab/Pagination";
import { Grid, TextField, Button, FormControl, Select, MenuItem, InputLabel, Table, TableBody, TableRow, TableCell, FormControlLabel, Link,
        Dialog, DialogTitle, DialogContent, DialogActions, RadioGroup, Radio, Checkbox} from "@material-ui/core";
import SubjectIcon from '@material-ui/icons/Subject';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import EditIcon from '@material-ui/icons/Edit';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteIcon from '@material-ui/icons/Delete';
import ResetIcon from '@material-ui/icons/Refresh';

class ProductDelivery extends React.Component {
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
                        menuName="배송 지역"
                        title="배송 지역"
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
                                        <TableCell className="align-items-center text-center" width="10%">배송지역 설정</TableCell>
                                        <TableCell width="90%">
                                            <Grid container md={10} xs={12} className="align-items-center">
                                                <Grid container md={8} xs={12} className="align-items-center">
                                                    <Grid container md={4} xs={12} className="align-items-center">
                                                        <Grid item md={2} xs={12} style={{textAlign: "center"}}>
                                                            <InputLabel>1단위</InputLabel>
                                                        </Grid>
                                                        <Grid item md={10} xs={12}>
                                                            <FormControl size="small" fullWidth variant="outlined" style={{paddingLeft: "10px"}}>
                                                                <InputLabel>1단위</InputLabel>
                                                                <Select>
                                                                    <MenuItem value="1">서울특별시</MenuItem>
                                                                    <MenuItem value="2">경기도</MenuItem>
                                                                    <MenuItem value="3">충청북도</MenuItem>
                                                                    <MenuItem value="4">충청남도</MenuItem>
                                                                    <MenuItem value="5">경상북도</MenuItem>
                                                                    <MenuItem value="6">경상남도</MenuItem>
                                                                    <MenuItem value="7">제주도</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container md={4} xs={12} className="align-items-center" style={{paddingLeft: "10px"}}>
                                                        <Grid item md={2} xs={12} style={{textAlign: "center", paddingLeft: "3px"}}>
                                                            <InputLabel>2단위</InputLabel>  
                                                        </Grid>
                                                        <Grid item md={10} xs={12}>
                                                            <FormControl size="small" fullWidth variant="outlined" style={{paddingLeft: "10px"}}>
                                                                <InputLabel>2단위</InputLabel>
                                                                <Select>
                                                                    <MenuItem value="1">고양시</MenuItem>
                                                                    <MenuItem value="2">일산서구</MenuItem>
                                                                    <MenuItem value="3">일산동구</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container md={4} xs={12} className="align-items-center" style={{paddingLeft: "10px"}}>
                                                        <Grid item md={2} xs={12} style={{textAlign: "center", paddingLeft: "3px"}}>
                                                            <InputLabel>3단위</InputLabel>
                                                        </Grid>
                                                        <Grid item md={10} xs={12}>
                                                            <FormControl size="small" fullWidth variant="outlined" style={{paddingLeft: "10px"}}>
                                                                <InputLabel>3단위</InputLabel>
                                                                <Select>
                                                                    <MenuItem value="1">탄현1동</MenuItem>
                                                                    <MenuItem value="2">탄현2동</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid container md={4} xs={12} className="align-items-center" style={{paddingLeft: "10px"}}>
                                                    <Grid item md={6} xs={12} style={{paddingLeft: "10px"}}>
                                                        <Button
                                                            fullWidth
                                                            size="medium"
                                                            variant="contained"     
                                                            color="primary"
                                                            startIcon={<SettingsIcon/>}>설정</Button>
                                                    </Grid>
                                                    <Grid item md={6} xs={12} style={{paddingLeft: "10px"}}>
                                                        <Button
                                                            fullWidth
                                                            size="medium"
                                                            variant="contained"     
                                                            style={{backgroundColor: "#ff0000", color: "#fff"}}
                                                            startIcon={<DeleteIcon/>}>삭제</Button>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell className="align-items-center text-center" width="10%">일 자</TableCell>
                                        <TableCell>
                                            <Grid container md={10} xs={12} className="align-items-center">
                                                <Grid container md={1} xs={12}>
                                                    <Button
                                                        fullWidth
                                                        size="medium"
                                                        variant="contained"
                                                        style={{border: "1px solid #cccbcb"}}
                                                    >등록일</Button>
                                                </Grid>
                                                <Grid container md={5} xs={12} style={{paddingLeft: "15px"}}>
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
                                        <TableCell className="align-items-center text-center" width="10%">회원 구분</TableCell>
                                        <TableCell>
                                            <Grid container md={10} xs={12} className="align-items-center">
                                                <Grid item md={2} xs={12}>
                                                    <FormControl size="small" fullWidth variant="outlined">
                                                        <InputLabel>상태</InputLabel>
                                                        <Select>
                                                            <MenuItem value="1">...</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                
                                                <Grid item md={5} xs={12} style={{paddingLeft: "10px"}}>
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        variant="outlined" />
                                                </Grid>

                                                <Grid item md={1} xs={12}></Grid>

                                                <Grid item md={2} xs={12} className="align-items-center" style={{paddingLeft: "10px"}}>
                                                    <Button
                                                        fullWidth
                                                        size="medium"
                                                        variant="contained"     
                                                        color="primary"
                                                        startIcon={<SearchIcon/>}>검색</Button>
                                                </Grid>

                                                <Grid item md={2} xs={12} className="align-items-center" style={{paddingLeft: "10px"}}>
                                                    <Button
                                                        fullWidth
                                                        size="medium"
                                                        variant="contained"    
                                                        style={{border: "1px solid #cccbcb"}}
                                                        startIcon={<ResetIcon/>}>초기화</Button>
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
                                <Grid item md={1} xs={12} className="align-items-center">
                                    <FormControl size="small" fullWidth variant="outlined">
                                        <InputLabel>10개</InputLabel>
                                        <Select>
                                            <MenuItem value="10">10개</MenuItem>
                                            <MenuItem value="30">30개</MenuItem>
                                            <MenuItem value="50">50개</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={10} xs={12} className="align-items-center"></Grid>
                                <Grid item md={1} xs={12} className="align-items-center">
                                    <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained" 
                                        style={{backgroundColor: "#0eb906", color: "#fff"}}
                                        startIcon={<DownloadIcon/>}>엑셀다운</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} md={12} xs={12} className="mt-20">
                        <Grid item md={12} xs={12} style={{maxWidth: "100%", overflowX: "auto"}}>
                            <Table className="order_table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="text-center" width="3%"><strong>No.</strong></TableCell>
                                        <TableCell className="text-center" width="3%"><strong>선택</strong></TableCell>
                                        <TableCell className="text-center" width="5%"><strong>상태</strong></TableCell>
                                        <TableCell className="text-center" width="5%"><strong>마트ID</strong></TableCell>
                                        <TableCell className="text-center" width="5%"><strong>마트 명</strong></TableCell>
                                        <TableCell className="text-center" colSpan={2} width="45%"><strong>거점지역(시/군/구) 및 배송 가능 지역</strong></TableCell>
                                        <TableCell className="text-center" width="5%"><strong>형태</strong></TableCell>
                                        <TableCell className="text-center" width="10%"><strong>수정한 사람</strong></TableCell>
                                        <TableCell className="text-center" width="5%"><strong>최종수정</strong></TableCell>
                                        <TableCell className="text-center" width="5%"><strong>정지일</strong></TableCell>
                                        <TableCell className="text-center" width="9%"><strong>배송지역</strong></TableCell>
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
                                        <TableCell className="text-center"><InputLabel style={{color: "#0ba5cf"}}>운영</InputLabel></TableCell>
                                        <TableCell className="text-center">woori</TableCell>
                                        <TableCell className="text-center">우리마트</TableCell>
                                        <TableCell className="text-center">경기도 고양시 일산서구</TableCell>
                                        <TableCell className="text-center">탄현1동, 탄현2동</TableCell>
                                        <TableCell className="text-center">마트</TableCell>
                                        <TableCell className="text-center">정순진</TableCell>
                                        <TableCell className="text-center">2021.11.01</TableCell>
                                        <TableCell className="text-center">-</TableCell>
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
                                        <TableCell className="text-center"><InputLabel style={{color: "#0ba5cf"}}>운영</InputLabel></TableCell>
                                        <TableCell className="text-center">jergi</TableCell>
                                        <TableCell className="text-center">저기마트</TableCell>
                                        <TableCell className="text-center">경기도 고양시 일산서구</TableCell>
                                        <TableCell className="text-center">탄현1동, 탄현2동</TableCell>
                                        <TableCell className="text-center">지점</TableCell>
                                        <TableCell className="text-center">양희중</TableCell>
                                        <TableCell className="text-center">2021.10.25</TableCell>
                                        <TableCell className="text-center">-</TableCell>
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
                                        <TableCell className="text-center"><InputLabel style={{color: "#FFC300"}}>운영</InputLabel></TableCell>
                                        <TableCell className="text-center">gergi</TableCell>
                                        <TableCell className="text-center">거기마트</TableCell>
                                        <TableCell className="text-center">경기도 파주시</TableCell>
                                        <TableCell className="text-center">탄현1동, 탄현2동</TableCell>
                                        <TableCell className="text-center">본사</TableCell>
                                        <TableCell className="text-center">김선무</TableCell>
                                        <TableCell className="text-center">2019.03.06</TableCell>
                                        <TableCell className="text-center">2021.10.05</TableCell>
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

                                    <TableRow>
                                        <TableCell className="text-center">4</TableCell>
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
                                        <TableCell className="text-center"><InputLabel>퇴점</InputLabel></TableCell>
                                        <TableCell className="text-center">zipap</TableCell>
                                        <TableCell className="text-center">집앞마트</TableCell>
                                        <TableCell className="text-center">서울특별시 강남구 서초구</TableCell>
                                        <TableCell className="text-center">양재1동</TableCell>
                                        <TableCell className="text-center">마트</TableCell>
                                        <TableCell className="text-center">Mr. Bean</TableCell>
                                        <TableCell className="text-center">2019.02.28</TableCell>
                                        <TableCell className="text-center">2021.10.04</TableCell>
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
                        <Grid item md={12} xs={12} className="align-items-center text-center">
                            <PaginationMaterial count={10} color="primary" />
                        </Grid>
                    </Grid>

                    <Dialog open={this.state.isOpenModal} aria-labelledby="responsive-dialog-title" maxWidth="sm" fullWidth>
                        <DialogTitle id="responsive-dialog-title">
                            <h2>새 회원 추가</h2>
                        </DialogTitle>
                        
                        <DialogContent>
                            {/*
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
                            </Grid> */}
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

export default withSnackbar(connect(mapStateToProps, null)(ProductDelivery));
