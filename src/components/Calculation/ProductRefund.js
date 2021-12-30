import React from "react";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import PageTitle from "../../core/common/Partials/PageTitle";
import { Grid, TextField, Button, FormControl, Select, MenuItem, InputLabel, Table, TableBody, TableRow, TableCell, FormControlLabel, Checkbox} from "@material-ui/core";
import SubjectIcon from '@material-ui/icons/Subject';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import SendIcon from '@material-ui/icons/Check';

class ProRefund extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Grid container>
                    <Grid item>
                        <PageTitle
                        menuName="정산 후 주문 상품 환불 정산"
                        title="정산 후 환불"
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
                                        <TableCell className="align-items-center text-center" width="10%">검색어</TableCell>
                                        <TableCell className="align-items-center" width="90%">
                                            <Grid container md={8} xs={12} className="align-items-center">
                                                <Grid item md={3} xs={12}>
                                                    <FormControl size="small" fullWidth variant="outlined">
                                                        <InputLabel>주문번호</InputLabel>
                                                        <Select>
                                                            <MenuItem value="1">주문자명</MenuItem>
                                                            <MenuItem value="2">상품주문번호</MenuItem>
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
                                            </Grid>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="align-items-center text-center" width="10%">기간검색</TableCell>
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
                                                        >1주일
                                                        </Button>
                                                    </Grid>
                                                    <Grid item md={2} xs={12} style={{paddingLeft: "5px"}}>
                                                        <Button
                                                            fullWidth
                                                            size="medium"
                                                            variant="contained"
                                                            style={{border: "1px solid #cccbcb"}}
                                                        >이번 달</Button>
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
                                                <Grid item md={1} xs={12}></Grid>
                                                <Grid item md={1} xs={12}>
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
                        <Grid item md={6} xs={12} className="align-items-center"><InputLabel>검색<i style={{color: "#ff0000", fontStyle: "normal"}}><strong> 0 </strong></i>개 / 전체<i style={{color: "#ff0000", fontStyle: "normal"}}><strong> 0 </strong></i>개</InputLabel></Grid>
                        <Grid item md={4} xs={12}></Grid>
                        <Grid item md={2} xs={12} className="align-items-center">  
                            <FormControl size="small" fullWidth variant="outlined">
                                <InputLabel>10개 출력</InputLabel>
                                <Select>
                                    <MenuItem value="10">10개 출력</MenuItem>
                                    <MenuItem value="20">20개 출력</MenuItem>
                                    <MenuItem value="30">30개 출력</MenuItem>
                                    <MenuItem value="50">50개 출력</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} md={12} xs={12} className="mt-20">
                        <Grid item md={12} xs={12} style={{maxWidth: "100%", overflowX: "auto"}}>
                            <Table className="order_table">
                                <TableBody>
                                    <TableRow style={{backgroundColor: "#f2f2f2", border: "1px solid #cccccc"}}>
                                        <TableCell className="text-center"><strong>선택</strong></TableCell>
                                        <TableCell className="text-center"><strong>번호</strong></TableCell>
                                        <TableCell className="text-center"><strong>주문일시</strong></TableCell>
                                        <TableCell className="text-center"><strong>주문번호</strong></TableCell>
                                        <TableCell className="text-center"><strong>주문자</strong></TableCell>
                                        <TableCell className="text-center"><strong>상품주문번호</strong></TableCell>
                                        <TableCell className="text-center"><strong>주문상품</strong></TableCell>
                                        <TableCell className="text-center"><strong>수량</strong></TableCell>
                                        <TableCell className="text-center"><strong>금액</strong></TableCell>
                                        <TableCell className="text-center"><strong>수수료</strong></TableCell>
                                        <TableCell className="text-center"><strong>판매수수료</strong></TableCell>
                                        <TableCell className="text-center"><strong>정산금액</strong></TableCell>
                                        <TableCell className="text-center"><strong>총 정산금액</strong></TableCell>
                                        <TableCell className="text-center"><strong>처리상태</strong></TableCell>
                                        <TableCell className="text-center"><strong>공급사(마트)</strong></TableCell>
                                        <TableCell className="text-center"><strong>결제방법</strong></TableCell>
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
                                            <Button
                                                fullWidth
                                                size="small"
                                                variant="contained"  
                                                color="primary"
                                                startIcon={<EditIcon/>}>수량</Button>
                                        </TableCell>
                                        <TableCell className="text-center"></TableCell>
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

                    <Grid container spacing={3} md={12} xs={12} className="mt-20">
                        <Grid item md={4} xs={12}>
                            <Grid container>
                                <Grid item md={3} xs={12} className="align-items-center text-center">
                                    <InputLabel>선택한 주문상품을</InputLabel>
                                </Grid>
                                <Grid item md={3} xs={12} className="align-items-center text-center">
                                    <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained"     
                                        style={{backgroundColor: "#0eb906", color: "#fff"}}
                                        startIcon={<SendIcon/>}>정산요청</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={6} xs={12}></Grid>
                        <Grid item md={2} xs={12}>
                            <Grid container>
                                <Grid item md={6} xs={12}></Grid>
                                <Grid item md={6} xs={12} className="align-items-center text-center">
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

export default withSnackbar(connect(mapStateToProps, null)(ProRefund));
