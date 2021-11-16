import React from "react";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import PageTitle from "../../../core/common/Partials/PageTitle";
import SwipeableViews from "react-swipeable-views";
import { Grid, TextField, Button, FormControl, Select, MenuItem, InputLabel, Table, TableBody, TableRow, TableCell, FormControlLabel, Checkbox, Link,
        Dialog, DialogTitle, DialogActions, Divider, Tabs, Tab} from "@material-ui/core";
import SubjectIcon from '@material-ui/icons/Subject';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

class ProductNotice extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tabIndex: 0,
            isOpenModal: false,
        };

        this.onChangeTab = this.onChangeTab.bind(this);
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

    /**
     * @summary Change tab
     * @param {MouseEvent} event
     * @param {int} newValue
     */
    onChangeTab(event, index) {
        event.stopPropagation();

        this.setState({
            tabIndex: index,
        });
    }

    /**
     * @summary Tab attributes
     * @param {int} index
     */
    tabProps(index) {
        return {
            id: `full-width-tab-${index}`,
            "aria-controls": `full-width-tabpanel-${index}`,
        };
    }

    render() {
        return (
            <React.Fragment>
                <Grid container>
                    <Grid item>
                        <PageTitle
                        menuName="상품문의"
                        title="상품문의"
                        icon={<SubjectIcon />}
                        />
                    </Grid>
                </Grid> 
                
                <div className="card mt-20">
                    <Grid container spacing={3} md={10} xs={12}>
                        <Grid item md={2} xs={12} className="align-items-center">
                            <h5>검색어</h5>
                        </Grid>

                        <Grid item md={10} xs={12} className="align-items-center"> 
                            <Grid item md={2} xs={12}>
                                <FormControl size="small" fullWidth variant="outlined">
                                    <InputLabel>제목</InputLabel>
                                    <Select>
                                        <MenuItem value="">...</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item md={5} xs={12} className="align-items-center">
                                <TextField
                                    fullWidth
                                    size="small"  
                                    variant="outlined"
                                    placeholder="제목을 입력하세요"
                                />
                            </Grid>
                            <Grid item md={3} xs={12} className="align-items-center"></Grid>
                            <Grid item md={2} xs={12}>
                                <Button
                                    fullWidth
                                    size="medium"
                                    variant="contained"
                                    style={{backgroundColor: "#30b10d", color: "#fff"}}
                                    startIcon={<AddIcon/>}
                                >새 공지사항 등록</Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} md={10} xs={12}>
                        <Grid item md={2} xs={12} className="align-items-center">
                            <h5>상세검색</h5>
                        </Grid>

                        <Grid item md={10} xs={12} className="align-items-center"> 
                            <Grid item md={3} xs={12}>
                                <FormControl size="small" fullWidth variant="outlined">
                                    <InputLabel>분류전체</InputLabel>
                                    <Select>
                                        <MenuItem value="1">일반</MenuItem>
                                        <MenuItem value="2">이벤트</MenuItem>
                                        <MenuItem value="3">배송지연</MenuItem>
                                        <MenuItem value="4">상품</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item md={3} xs={12} style={{marginLeft: "10px"}}>
                                <FormControl size="small" fullWidth variant="outlined">
                                    <InputLabel>전시상태 전채</InputLabel>
                                    <Select>
                                        <MenuItem value="1">전시중</MenuItem>
                                        <MenuItem value="2">전시중지</MenuItem>
                                        <MenuItem value="3">전시대기</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item md={3} xs={12}></Grid>
                            <Grid item md={1} xs={12} className="align-items-center text-center" style={{marginLeft: "5px"}}>
                                <Button
                                    fullWidth
                                    size="medium"
                                    variant="contained"
                                    color="primary"
                                    startIcon={<SearchIcon/>}
                                >검색</Button>
                            </Grid>
                            <Grid item md={2} xs={12} className="align-items-center text-center" style={{marginLeft: "5px"}}>
                                <Button
                                    fullWidth
                                    size="medium"
                                    variant="contained"
                                    style={{border: "1px solid #cccbcb"}}
                                    startIcon={<RefreshIcon/>}
                                >초기화</Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} md={10} xs={12}>
                        <Grid item md={2} xs={12} className="align-items-center">
                        </Grid>

                        <Grid item md={10} xs={12} className="align-items-center"> 
                            <Grid container className="align-items-center">
                                <Grid item md={1} xs={12}>
                                    <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained"
                                        style={{border: "1px solid #cccbcb"}}
                                    >오늘
                                    </Button>
                                </Grid>
                                <Grid item md={1} xs={12} style={{marginLeft: "5px"}}>
                                    <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained"
                                        style={{border: "1px solid #cccbcb"}}
                                    >1주일
                                    </Button>
                                </Grid>
                                <Grid item md={1} xs={12} style={{marginLeft: "5px"}}>
                                    <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained"
                                        style={{border: "1px solid #cccbcb"}}
                                    >1개월
                                    </Button>
                                </Grid>
                                <Grid item md={1} xs={12} style={{marginLeft: "5px"}}>
                                    <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained"
                                        style={{border: "1px solid #cccbcb"}}
                                    >3개월
                                    </Button>
                                </Grid>
                                <Grid container md={6} xs={12} className="align-items-center">
                                    <Grid item md={5} xs={12} style={{marginLeft: "25px"}}>
                                        <TextField
                                            fullWidth
                                            size="small"  
                                            variant="outlined"
                                            type="date"
                                            name="startDate"
                                        />
                                    </Grid>
                                    <Grid item md={1} xs={12} className="text-center" style={{paddingTop: "7px", paddingLeft: "0.6rem"}}>
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
                            </Grid>
                        </Grid>
                    </Grid>                 

                    <Grid container spacing={3} md={12} xs={12}>
                        <Grid item md={12} xs={12}>
                            <Tabs
                                textColor="primary"
                                value={this.state.tabIndex}
                                onChange={this.onChangeTab}
                                variant="scrollable"
                                indicatorColor="primary"
                                scrollButtons="auto"
                                style={{marginTop: "5px"}}
                            >
                                <Tab label="공지사항" {...this.tabProps(0)} />
                                <Tab label="1:1 문의" {...this.tabProps(1)} />
                            </Tabs>
                            <SwipeableViews index={this.state.tabIndex}>
                                <div index={0} className="mt-20">
                                    <Table className="order_table">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className="text-center" width="5%"><strong>선택</strong></TableCell>
                                                <TableCell className="text-center"><strong>수정</strong></TableCell>
                                                <TableCell className="text-center"><strong>번호</strong></TableCell>
                                                <TableCell className="text-center"><strong>분류</strong></TableCell>
                                                <TableCell className="text-center"><strong>전시상태</strong></TableCell>
                                                <TableCell className="text-center" width="15%"><strong>제목</strong></TableCell>
                                                <TableCell className="text-center" width="15%"><strong>시작일</strong></TableCell>
                                                <TableCell className="text-center" width="15%"><strong>종료일</strong></TableCell>
                                                <TableCell className="text-center" width="15%"><strong>등록일</strong></TableCell>
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
                                                <TableCell className="text-center">
                                                    <Button 
                                                        fullWidth
                                                        size="medium"
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={this.onOpenModal.bind(this)}
                                                        startIcon={<EditIcon/>}>수정</Button>
                                                </TableCell>
                                                <TableCell className="text-center">0000000000</TableCell>
                                                <TableCell className="text-center">배송지연</TableCell>
                                                <TableCell className="text-center"><InputLabel style={{color: "#09c6dd"}}><strong>전시중</strong></InputLabel></TableCell>
                                                <TableCell className="text-center">정시배송에 주의 바랍니다...</TableCell>
                                                <TableCell className="text-center">2021.05.05 10:00:00</TableCell>
                                                <TableCell className="text-center">2021.05.05 10:00:00</TableCell>
                                                <TableCell className="text-center">2021.05.05 10:00:00</TableCell>
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
                                                <TableCell className="text-center">
                                                    <Button 
                                                        fullWidth
                                                        size="medium"
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={this.onOpenModal.bind(this)}
                                                        startIcon={<EditIcon/>}>수정</Button>
                                                </TableCell>
                                                <TableCell className="text-center">0000000000</TableCell>
                                                <TableCell className="text-center">이벤트</TableCell>
                                                <TableCell className="text-center"><InputLabel style={{color: "#ff0000"}}><strong>전시중지</strong></InputLabel></TableCell>
                                                <TableCell className="text-center">신규회원가입 포인트 이벤트...</TableCell>
                                                <TableCell className="text-center">2021.05.05 10:00:00</TableCell>
                                                <TableCell className="text-center">2021.05.05 10:00:00</TableCell>
                                                <TableCell className="text-center">2021.05.05 10:00:00</TableCell>
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
                                                <TableCell className="text-center">
                                                    <Button 
                                                        fullWidth
                                                        size="medium"
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={this.onOpenModal.bind(this)}
                                                        startIcon={<EditIcon/>}>수정</Button>
                                                </TableCell>
                                                <TableCell className="text-center">0000000000</TableCell>
                                                <TableCell className="text-center">일반</TableCell>
                                                <TableCell className="text-center"><InputLabel><strong>전시대기</strong></InputLabel></TableCell>
                                                <TableCell className="text-center">시스템 업데이트를 위한 서버점검...</TableCell>
                                                <TableCell className="text-center">2021.05.05 10:00:00</TableCell>
                                                <TableCell className="text-center">2021.05.05 10:00:00</TableCell>
                                                <TableCell className="text-center">2021.05.05 10:00:00</TableCell>
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
                                            style={{backgroundColor: "#FF0000", color: "#fff"}}>선택삭제</Button>
                                    </Grid>
                                </div>

                                <div index={1} className="mt-20">
                                    <Table className="order_table">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className="text-center" width="5%"><strong>선택</strong></TableCell>
                                                <TableCell className="text-center"><strong>수정</strong></TableCell>
                                                <TableCell className="text-center"><strong>번호</strong></TableCell>
                                                <TableCell className="text-center"><strong>분류</strong></TableCell>
                                                <TableCell className="text-center"><strong>제목</strong></TableCell>
                                                <TableCell className="text-center" width="15%"><strong>시작일</strong></TableCell>
                                                <TableCell className="text-center" width="15%"><strong>종료일</strong></TableCell>
                                                <TableCell className="text-center" width="15%"><strong>등록일</strong></TableCell>
                                                <TableCell className="text-center" width="5%"><strong>답변</strong></TableCell>
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
                                                <TableCell className="text-center">
                                                    <Button 
                                                        fullWidth
                                                        size="medium"
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={this.onOpenModal.bind(this)}
                                                        startIcon={<EditIcon/>}>수정</Button>
                                                </TableCell>
                                                <TableCell className="text-center">0000000000</TableCell>
                                                <TableCell className="text-center">1:1 문의</TableCell>
                                                <TableCell className="text-center">정시배송에 주의 바랍니다...</TableCell>
                                                <TableCell className="text-center">2021.05.05 10:00:00</TableCell>
                                                <TableCell className="text-center">2021.05.05 10:00:00</TableCell>
                                                <TableCell className="text-center">2021.05.05 10:00:00</TableCell>
                                                <TableCell className="text-center"><Link>답변</Link></TableCell>
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
                                                <TableCell className="text-center">
                                                    <Button 
                                                        fullWidth
                                                        size="medium"
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={this.onOpenModal.bind(this)}
                                                        startIcon={<EditIcon/>}>수정</Button>
                                                </TableCell>
                                                <TableCell className="text-center">0000000000</TableCell>
                                                <TableCell className="text-center">1:1 문의</TableCell>
                                                <TableCell className="text-center">신규회원가입 포인트 이벤트...</TableCell>
                                                <TableCell className="text-center">2021.05.05 10:00:00</TableCell>
                                                <TableCell className="text-center">2021.05.05 10:00:00</TableCell>
                                                <TableCell className="text-center">2021.05.05 10:00:00</TableCell>
                                                <TableCell className="text-center"><Link>답변</Link></TableCell>
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
                                                <TableCell className="text-center">
                                                    <Button 
                                                        fullWidth
                                                        size="medium"
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={this.onOpenModal.bind(this)}
                                                        startIcon={<EditIcon/>}>수정</Button>
                                                </TableCell>
                                                <TableCell className="text-center">0000000000</TableCell>
                                                <TableCell className="text-center">1:1 문의</TableCell>
                                                <TableCell className="text-center">시스템 업데이트를 위한 서버점검...</TableCell>
                                                <TableCell className="text-center">2021.05.05 10:00:00</TableCell>
                                                <TableCell className="text-center">2021.05.05 10:00:00</TableCell>
                                                <TableCell className="text-center">2021.05.05 10:00:00</TableCell>
                                                <TableCell className="text-center"><Link>답변</Link></TableCell>
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
                                            style={{backgroundColor: "#FF0000", color: "#fff"}}>선택삭제</Button>
                                    </Grid>
                                </div>
                            </SwipeableViews>
                        </Grid>
                    </Grid>

                    <Dialog open={this.state.isOpenModal}
                        aria-labelledby="responsive-dialog-title"
                        maxWidth="lg">
                        <DialogTitle id="responsive-dialog-title">
                            <h2>제품 정보</h2>
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

export default withSnackbar(connect(mapStateToProps, null)(ProductNotice));
