import React from "react";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import PageTitle from "../../core/common/Partials/PageTitle";
import PaginationMaterial from "@material-ui/lab/Pagination";
import { Grid, RadioGroup, FormControlLabel, Radio, TextField, Button, FormControl, Select, MenuItem, InputLabel, Table, TableBody, TableRow, TableCell} from "@material-ui/core";
import SubjectIcon from '@material-ui/icons/Subject';
import ResetIcon from '@material-ui/icons/Refresh';
import PrintIcon from '@material-ui/icons/Print';
import SearchIcon from '@material-ui/icons/Search';
import DownloadIcon from '@material-ui/icons/CloudDownload';

class TaxInvoice extends React.Component {    
    constructor(props) {
        super(props);

        this.state = {
            isHistory: true,
            isScheduled: false,
        };

        this.onChangeToHistory = this.onChangeToHistory.bind(this);    
        this.onChangeToScheduled = this.onChangeToScheduled.bind(this);   
    }

    onChangeToHistory() {
        this.setState({isHistory: true});
        this.setState({isScheduled: false});
    }

    onChangeToScheduled() {
        this.setState({isScheduled: true});
        this.setState({isHistory: false});
    }

    render() {
        return (
            <React.Fragment>
                <Grid container>
                    <Grid item>
                        <PageTitle
                        menuName="발행내역"
                        title="정산"
                        icon={<SubjectIcon />}
                        />
                    </Grid>
                </Grid> 
                
                <div className="card mt-20">
                    <Grid container spacing={3} md={12} xs={12}>
                        <Grid item md={1} xs={12}>
                            <RadioGroup>
                                <FormControlLabel
                                    value="true"
                                    control={<Radio />}
                                    label="발행내역"
                                    checked={this.state.isHistory === true}
                                    onChange={this.onChangeToHistory.bind(this)}
                                />
                            </RadioGroup>
                        </Grid>
                        <Grid item md={2} xs={12}>
                            <RadioGroup>
                                <FormControlLabel
                                    value="false"
                                    control={<Radio />}
                                    label="발행예정내역"
                                    checked={this.state.isScheduled === true}
                                    onChange={this.onChangeToScheduled.bind(this)}
                                />
                            </RadioGroup>
                        </Grid>
                    </Grid>
                    
                    {this.state.isHistory === true ? (
                        <React.Fragment>
                            <Grid container spacing={3} md={12} xs={12} className="mt-20">
                                <Grid item md={12} xs={12} className="align-items-center">  
                                    <Table className="member_table">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className="align-items-center text-center" width="10%">발행상태</TableCell>
                                                <TableCell className="align-items-center" width="90%">
                                                    <Grid container md={8} xs={12} className="align-items-center">
                                                        <Grid item md={4} xs={12}>
                                                            <FormControl size="small" fullWidth variant="outlined">
                                                                <InputLabel>전체</InputLabel>
                                                                <Select>
                                                                    <MenuItem value="1">교부</MenuItem>
                                                                    <MenuItem value="2">교부확인</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="align-items-center text-center" width="10%">신고상태</TableCell>
                                                <TableCell className="align-items-center" width="90%">
                                                    <Grid container md={8} xs={12} className="align-items-center">
                                                        <Grid item md={4} xs={12}>
                                                            <FormControl size="small" fullWidth variant="outlined">
                                                                <InputLabel>전체</InputLabel>
                                                                <Select>
                                                                    <MenuItem value="1">미신고</MenuItem>
                                                                    <MenuItem value="2">접수완료</MenuItem>
                                                                    <MenuItem value="3">신고완료</MenuItem>
                                                                    <MenuItem value="4">신고실패</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="align-items-center text-center" width="10%">조회기간</TableCell>
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

                                                        <Grid item md={2} xs={12} style={{marginLeft: "10px"}}>
                                                            <FormControl size="small" fullWidth variant="outlined">
                                                                <InputLabel>분기선택</InputLabel>
                                                                <Select>
                                                                    <MenuItem value="1">1분기</MenuItem>
                                                                    <MenuItem value="2">2분기</MenuItem>
                                                                    <MenuItem value="3">3분기</MenuItem>
                                                                    <MenuItem value="4">4분기</MenuItem>
                                                                    <MenuItem value="5">상반기</MenuItem>
                                                                    <MenuItem value="6">하반기</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>

                                                        <Grid item md={1} xs={12} style={{marginLeft: "10px"}}>
                                                            <Button
                                                                fullWidth
                                                                size="medium"
                                                                variant="contained"     
                                                                color="primary"
                                                                startIcon={<SearchIcon/>}>검색</Button>
                                                        </Grid>

                                                        <Grid item md={2} xs={12} style={{marginLeft: "10px"}}>
                                                            <Grid container>
                                                                <Grid item md={7} xs={12}>
                                                                    <Button
                                                                        fullWidth
                                                                        size="medium"
                                                                        variant="contained"     
                                                                        style={{border: "1px solid #cccbcb"}}
                                                                        startIcon={<ResetIcon/>}>초기화</Button>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Grid>
                            </Grid>

                            <Grid container spacing={3} md={12} xs={12} className="mt-20">
                                <Grid item md={8} xs={12}></Grid>
                                <Grid item md={4} xs={12}>
                                    <Grid container>
                                        <Grid item md={4} xs={12}></Grid>
                                        <Grid item md={4} xs={12} className="align-items-center">  
                                            <Button
                                                fullWidth
                                                size="medium"
                                                variant="contained" 
                                                style={{backgroundColor: "#FF5733", color: "#fff"}}
                                                startIcon={<PrintIcon/>}>피킹 인쇄</Button>
                                        </Grid>
                                        <Grid item md={4} xs={12} className="align-items-center" style={{paddingLeft: "10px"}}>  
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
                                <Grid item md={12} xs={12}>
                                    <Table className="order_table">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell colSpan={6} className="align-items-center" style={{textAlign: "left"}}><InputLabel>조회결과</InputLabel></TableCell>
                                            </TableRow>
                                            
                                            <TableRow>
                                                <TableCell className="text-center"><InputLabel><strong>건수</strong></InputLabel></TableCell>
                                                <TableCell className="text-center"><InputLabel><strong>0</strong> 건</InputLabel></TableCell>
                                                <TableCell className="text-center"><InputLabel><strong>공급가액</strong></InputLabel></TableCell>
                                                <TableCell className="text-center"><InputLabel><strong>0</strong> 원</InputLabel></TableCell>
                                                <TableCell className="text-center"><InputLabel><strong>세액</strong></InputLabel></TableCell>
                                                <TableCell className="text-center"><InputLabel><strong>0</strong> 원</InputLabel></TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Grid>
                            </Grid>

                            <Grid container spacing={3} md={12} xs={12} className="mt-20">
                                <Grid item md={12} xs={12}>
                                    <Table className="order_table">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell colSpan={8} className="align-items-center" style={{textAlign: "left"}}><InputLabel>부가세신고 월별 내역 결과표</InputLabel></TableCell>
                                            </TableRow>
                                            
                                            <TableRow style={{backgroundColor: "#f2f2f2", border: "1px solid #cccccc"}}>
                                                <TableCell className="text-center"><InputLabel><strong>선택</strong></InputLabel></TableCell>
                                                <TableCell className="text-center"><InputLabel><strong>작성일자</strong></InputLabel></TableCell>
                                                <TableCell className="text-center"><InputLabel><strong>공급자</strong></InputLabel></TableCell>
                                                <TableCell className="text-center"><InputLabel><strong>품목</strong></InputLabel></TableCell>
                                                <TableCell className="text-center"><InputLabel><strong>공급가액</strong></InputLabel></TableCell>
                                                <TableCell className="text-center"><InputLabel><strong>세액</strong></InputLabel></TableCell>
                                                <TableCell className="text-center"><InputLabel><strong>발행상태</strong></InputLabel></TableCell>
                                                <TableCell className="text-center"><InputLabel><strong>신고상태</strong></InputLabel></TableCell>
                                            </TableRow>

                                            <TableRow>
                                            <TableCell colSpan={8} className="align-items-center"><InputLabel>데이터가 존재하지 않습니다</InputLabel></TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Grid>
                            </Grid>

                            <Grid container className="align-items-center mt-20">
                                <Grid item md={12} xs={12}>
                                    <PaginationMaterial count={10} color="primary" />
                                </Grid>
                            </Grid>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <Grid container spacing={3} md={12} xs={12} className="mt-20">
                                <Grid item md={12} xs={12} className="align-items-center">    
                                    <Table className="member_table">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className="align-items-center text-center" width="10%">조회기간</TableCell>
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

                                                        <Grid item md={2} xs={12}>
                                                            <FormControl size="small" fullWidth variant="outlined">
                                                                <InputLabel>분기선택</InputLabel>
                                                                <Select>
                                                                    <MenuItem value="1">1분기</MenuItem>
                                                                    <MenuItem value="2">2분기</MenuItem>
                                                                    <MenuItem value="3">3분기</MenuItem>
                                                                    <MenuItem value="4">4분기</MenuItem>
                                                                    <MenuItem value="5">상반기</MenuItem>
                                                                    <MenuItem value="6">하반기</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>

                                                        <Grid item md={1} xs={12} style={{marginLeft: "10px"}}>
                                                            <Button
                                                                fullWidth
                                                                size="medium"
                                                                variant="contained"     
                                                                color="primary"
                                                                startIcon={<SearchIcon/>}>검색</Button>
                                                        </Grid>

                                                        <Grid item md={2} xs={12} style={{marginLeft: "10px"}}>
                                                            <Grid container>
                                                                <Grid item md={7} xs={12}>
                                                                    <Button
                                                                        size="medium"
                                                                        variant="contained"     
                                                                        style={{border: "1px solid #cccbcb"}}
                                                                        startIcon={<ResetIcon/>}>초기화</Button>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Grid>
                            </Grid>

                            <Grid container spacing={3} md={12} xs={12} className="mt-20">
                                <Grid item md={12} xs={12}>
                                    <Table className="order_table">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell colSpan={6} className="align-items-center" style={{textAlign: "left"}}><InputLabel>조회결과</InputLabel></TableCell>
                                            </TableRow>
                                            
                                            <TableRow>
                                                <TableCell className="text-center"><InputLabel><strong>건수</strong></InputLabel></TableCell>
                                                <TableCell className="text-center"><InputLabel><strong>0</strong> 건</InputLabel></TableCell>
                                                <TableCell className="text-center"><InputLabel><strong>공급가액</strong></InputLabel></TableCell>
                                                <TableCell className="text-center"><InputLabel><strong>0</strong> 원</InputLabel></TableCell>
                                                <TableCell className="text-center"><InputLabel><strong>세액</strong></InputLabel></TableCell>
                                                <TableCell className="text-center"><InputLabel><strong>0</strong> 원</InputLabel></TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Grid>
                            </Grid>

                            <Grid container spacing={3} md={12} xs={12} className="mt-20">
                                <Grid item md={12} xs={12}>
                                    <Table className="order_table">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell colSpan={5} className="align-items-center" style={{textAlign: "left"}}><InputLabel>부가세신고 월별 내역 결과표</InputLabel></TableCell>
                                            </TableRow>
                                            
                                            <TableRow style={{backgroundColor: "#f2f2f2", border: "1px solid #cccccc"}}>
                                                <TableCell className="text-center"><InputLabel><strong>작성일자</strong></InputLabel></TableCell>
                                                <TableCell className="text-center"><InputLabel><strong>공급자</strong></InputLabel></TableCell>
                                                <TableCell className="text-center"><InputLabel><strong>공급대가</strong></InputLabel></TableCell>
                                                <TableCell className="text-center"><InputLabel><strong>공급가액</strong></InputLabel></TableCell>
                                                <TableCell className="text-center"><InputLabel><strong>세액</strong></InputLabel></TableCell>
                                            </TableRow>

                                            <TableRow>
                                            <TableCell colSpan={5} className="align-items-center"><InputLabel>데이터가 존재하지 않습니다</InputLabel></TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </Grid>
                            </Grid>

                            <Grid container className="align-items-center mt-20">
                                <Grid item md={12} xs={12}>
                                    <PaginationMaterial count={10} color="primary" />
                                </Grid>
                            </Grid>
                        </React.Fragment>
                    )}
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

export default withSnackbar(connect(mapStateToProps, null)(TaxInvoice));
