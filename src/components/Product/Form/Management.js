import React from "react";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import PageTitle from "../../../core/common/Partials/PageTitle";
import { Grid, TextField, Button, FormControl, Select, MenuItem, InputLabel, Table, TableBody, TableRow, TableCell, FormControlLabel, Checkbox, CardMedia, Link,
        Dialog, DialogTitle, DialogActions, Divider} from "@material-ui/core";
import PaginationMaterial from "@material-ui/lab/Pagination";
import SubjectIcon from '@material-ui/icons/Subject';
import SearchIcon from '@material-ui/icons/Search';
import DownIcon from '@material-ui/icons/ArrowDownward';
import UpIcon from '@material-ui/icons/ArrowUpward';
import RefreshIcon from '@material-ui/icons/Refresh';
import { GET_CATEGORIES } from "../Queries";

class ProductManagement extends React.Component {
    constructor(props) {
        super(props);

        let info = this.props.product ? this.props.product.info : {};

        this.state = {
            isOpenModal: false,
            isShowSearchPanel: false,
            selectedCategories: {
                firstId: info ? info.firstCategory : "",
                secondId: info ? info.secondCategory : "",
                thirdId: info ? info.thirdCategory : "",
            },
            categories: {
                first: [],
                second: [],
                third: [],
            },
        };

        this.onOpenModal = this.onOpenModal.bind(this);
        this.toggleSearchPanel = this.toggleSearchPanel.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
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
     * @summary Toogle search panel
     */
    toggleSearchPanel() {
        this.setState({
            isShowSearchPanel: !this.state.isShowSearchPanel,
        });
    }
    async componentDidMount() {
        const { data } = await this.props.apolloClient.httpClient.query({
            query: GET_CATEGORIES,
        });
    
        if (data) {
            this.setState({
                categories: data.categories,
            });
        }
    }

    /**
    * @summary On change category
    * @param {MouseEvent} event
    */
    onChangeCategory(event, level) {
        event.preventDefault();
        const val = event.target.value;
    
        if (level === 1) {
            this.setState({
                selectedCategories: {
                    firstId: val,
                    secondId: "",
                    thirdId: "",
                },
            });
        } else if (level === 2) {
            this.setState({
                selectedCategories: {
                    firstId: this.state.selectedCategories.firstId,
                    secondId: val,
                    thirdId: "",
                },
            });
        } else if (level === 3) {
            this.setState({
                selectedCategories: {
                    firstId: this.state.selectedCategories.firstId,
                    secondId: this.state.selectedCategories.secondId,
                    thirdId: val,
                },
            });
        }
    }
    

    render() {
        return (
            <React.Fragment>
                <Grid container>
                    <Grid item>
                        <PageTitle
                        menuName="상품관리"
                        title="상품관리"
                        icon={<SubjectIcon />}
                        />
                    </Grid>
                </Grid> 
                
                <div className="card mt-20">
                    <Grid container spacing={3} md={10} xs={12}>
                        <Grid item md={2} xs={12} className="align-items-center">
                            <h5>일자</h5>
                        </Grid>

                        <Grid item md={10} xs={12} className="align-items-center"> 
                            <Grid item md={1} xs={12}>
                                <Button
                                    fullWidth
                                    size="medium"
                                    variant="contained"
                                    style={{border: "1px solid #cccbcb"}}
                                >등록일
                                </Button>
                            </Grid>
                            <Grid container md={5} xs={12} style={{marginLeft: "10px"}}>
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
                            <Grid container md={5} xs={12} className="align-items-center">
                                <Grid item md={2} xs={12}>
                                    <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained"
                                        style={{border: "1px solid #cccbcb"}}
                                    >오늘
                                    </Button>
                                </Grid>
                                <Grid item md={2} xs={12} style={{marginLeft: "5px"}}>
                                    <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained"
                                        style={{border: "1px solid #cccbcb"}}
                                    >1주일
                                    </Button>
                                </Grid>
                                <Grid item md={2} xs={12} style={{marginLeft: "5px"}}>
                                    <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained"
                                        style={{border: "1px solid #cccbcb"}}
                                    >3주일
                                    </Button>
                                </Grid>
                                <Grid item md={2} xs={12} style={{marginLeft: "5px"}}>
                                    <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained"
                                        style={{border: "1px solid #cccbcb"}}
                                    >1년
                                    </Button>
                                </Grid>
                                <Grid item md={2} xs={12} style={{marginLeft: "5px"}}>
                                    <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained"
                                        style={{border: "1px solid #cccbcb"}}
                                    >2년
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} md={10} xs={12}>
                        <Grid item md={2} xs={12}>
                            <h5>검색</h5>
                        </Grid>
                        
                        <Grid item md={10} xs={12} className="align-items-center">
                            <Grid container>
                                <Grid item md={2} xs={12} className="align-items-center">
                                    <FormControl size="small" fullWidth variant="outlined">
                                        <InputLabel>전체</InputLabel>
                                        <Select>
                                            <MenuItem value="">...</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={4} xs={12} className="align-items-center text-center" style={{marginLeft: "5px"}}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                    />
                                </Grid>
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
                                <Grid item md={2} xs={12} className="align-items-center text-center" style={{marginLeft: "5px"}}>
                                    <Button
                                        size="medium"
                                        variant="contained"
                                        style={{border: "1px solid #008000"}}
                                        startIcon={
                                            this.state.isShowSearchPanel ? (
                                                <UpIcon />
                                            ) : (
                                                <DownIcon />
                                            )
                                        }
                                        onClick={this.toggleSearchPanel}
                                    >상세검색</Button>
                                </Grid>
                            </Grid>
                        </Grid> 
                    </Grid>

                    {this.state.isShowSearchPanel === true ? (
                        <React.Fragment>
                            <Grid container spacing={3} md={10} xs={12}>
                                <Grid item md={2} xs={12}>
                                    <h5>카테고리</h5>
                                </Grid>
                                
                                <Grid item md={10} xs={12} className="align-items-center">
                                    <Grid container>
                                        <Grid item md={3} xs={12} className="align-items-center">
                                            <FormControl size="small" fullWidth variant="outlined">
                                                <InputLabel id="demo-simple-select-outlined-label">
                                                    1차 카테고리
                                                </InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-outlined-label"
                                                    id="demo-simple-select-outlined"
                                                    label="1차 카테고리"
                                                    name="firstCategory"
                                                    onChange={(e) => this.onChangeCategory(e, 1)}
                                                    value={this.state.selectedCategories.firstId}
                                                >
                                                    <MenuItem value="">
                                                        <em>없음</em>
                                                    </MenuItem>
                                                    {(this.state.categories.first || []).map(
                                                        (category, index) => (
                                                            <MenuItem
                                                                key={index}
                                                                value={category.id}
                                                            >
                                                                {category.name}
                                                            </MenuItem>
                                                        )
                                                    )}
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        <Grid item md={3} xs={12} className="align-items-center" style={{marginLeft: "5px"}}>
                                            <FormControl fullWidth size="small" variant="outlined">
                                                <InputLabel id="demo-simple-select-outlined-label">
                                                    2차 카테고리
                                                </InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-outlined-label"
                                                    id="demo-simple-select-outlined"
                                                    label="2차 카테고리"
                                                    name="secondCategory"
                                                    inputProps={{
                                                        className: "white-label",
                                                    }}
                                                    onChange={(e) => this.onChangeCategory(e, 2)}
                                                    value={this.state.selectedCategories.secondId}
                                                >
                                                    <MenuItem value="">
                                                        <em>없음</em>
                                                    </MenuItem>
                                                    {(
                                                        this.state.categories.second.filter(
                                                            (f) =>
                                                                f.parentId ===
                                                                this.state.selectedCategories
                                                                    .firstId
                                                        ) || []
                                                    ).map((category, index) => (
                                                        <MenuItem key={index} value={category.id}>
                                                            {category.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>

                                        <Grid item md={3} xs={12} className="align-items-center" style={{marginLeft: "5px"}}>
                                            <FormControl fullWidth size="small" variant="outlined">
                                                <InputLabel id="demo-simple-select-outlined-label">
                                                    3차 카테고리
                                                </InputLabel>
                                                <input
                                                    name="thirdCategory"
                                                    type="hidden"
                                                    value={this.state.selectedCategories.thirdId}
                                                />
                                                <Select
                                                    labelId="demo-simple-select-outlined-label"
                                                    id="demo-simple-select-outlined"
                                                    label="3차 카테고리"
                                                    onChange={(e) => this.onChangeCategory(e, 3)}
                                                    defaultValue={
                                                        this.state.selectedCategories.thirdId
                                                    }
                                                >
                                                    <MenuItem value="">
                                                        <em>없음</em>
                                                    </MenuItem>
                                                    {(
                                                        this.state.categories.third.filter(
                                                            (f) =>
                                                                f.parentId ===
                                                                this.state.selectedCategories
                                                                    .secondId
                                                        ) || []
                                                    ).map((category, index) => (
                                                        <MenuItem key={index} value={category.id}>
                                                            {category.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </Grid> 
                            </Grid>
                        </React.Fragment>) : null}

                    <Grid container spacing={3} md={10} xs={12}>
                        <Grid item md={12} xs={12} className="text-left" style={{paddingTop: "1vh", paddingBottom: "1vh"}}><InputLabel>전체 자료 : <i style={{color: "#ff0000", fontStyle: "normal"}}><strong>2,000</strong></i> 건 | 판매 가능 상품 : <i style={{color: "#ff0000", fontStyle: "normal"}}><strong>1,500</strong></i> 건</InputLabel></Grid>
                    </Grid>

                    <Grid container spacing={3} md={12} xs={12}>
                        <Grid item md={2} xs={12} className="align-items-center">
                            <h5>자료 수 : 총<i style={{color: "#ff0000", fontStyle: "normal"}}><strong> 3 </strong></i>건</h5>
                        </Grid>
                            
                        <Grid item md={10} xs={12} className="align-items-center">
                            <Grid container>
                                <Grid item md={2} xs={12} className="align-items-center">
                                    <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained" 
                                        style={{backgroundColor: "#ff0000", color: "#fff"}}>판매가능 상품 불러오기</Button>
                                </Grid>
                                <Grid item md={2} xs={12} className="align-items-center" style={{marginLeft: "5px"}}>
                                    <FormControl size="small" fullWidth variant="outlined">
                                        <InputLabel>상품등록일순</InputLabel>
                                        <Select>
                                            <MenuItem value="">...</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={1} xs={12} className="align-items-center" style={{marginLeft: "5px"}}>
                                    <FormControl size="small" fullWidth variant="outlined">
                                        <InputLabel>50개</InputLabel>
                                        <Select>
                                            <MenuItem value="">...</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={2} xs={12} className="align-items-center" style={{marginLeft: "5px"}}>
                                    <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained" 
                                        style={{backgroundColor: "#33c4ff", color: "#fff"}}>체크상품 판매전시 활성화</Button>
                                </Grid>
                                <Grid item md={2} xs={12} className="align-items-center" style={{marginLeft: "5px"}}>
                                    <FormControl size="small" fullWidth variant="outlined">
                                        <InputLabel>일괄변경</InputLabel>
                                        <Select>
                                            <MenuItem value="">...</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={1} xs={12} className="align-items-center" style={{marginLeft: "5px"}}>
                                    <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained"     
                                        color="primary">적용</Button>
                                </Grid>
                            </Grid>
                        </Grid>                                                        
                    </Grid>

                    <Grid container spacing={3} md={12} xs={12}>
                        <Grid item md={12} xs={12}>
                            <Table className="order_table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="text-center" width="3%"><strong>No.</strong></TableCell>
                                        <TableCell className="text-center" width="3%"><strong>선택</strong></TableCell>
                                        <TableCell className="text-center" width="3%"><strong>상품번호</strong></TableCell>
                                        <TableCell className="text-center" width="3%"><strong>상품 바코드</strong></TableCell>
                                        <TableCell className="text-center" width="4%"><strong>이미지</strong></TableCell>
                                        <TableCell className="text-center" width="10%"><strong>상품명</strong></TableCell>
                                        <TableCell className="text-center" width="4%"><strong>수수료(%)</strong></TableCell>
                                        <TableCell className="text-center" width="4%"><strong>제조사명</strong></TableCell>
                                        <TableCell className="text-center" width="4%"><strong>모델명</strong></TableCell>
                                        <TableCell className="text-center" width="4%"><strong>브랜드명</strong></TableCell>
                                        <TableCell className="text-center" width="4%"><strong>상태</strong></TableCell>
                                        <TableCell className="text-center" width="4%"><strong>시중가</strong></TableCell>
                                        <TableCell className="text-center" width="4%"><strong>판매가</strong></TableCell>
                                        <TableCell className="text-center" width="4%"><strong>전시상태</strong></TableCell>
                                        <TableCell className="text-center" width="4%"><strong>등록일</strong></TableCell>
                                        <TableCell className="text-center" width="4%"><strong>최종수정일</strong></TableCell>
                                        <TableCell className="text-center" width="4%"><strong>재고수량</strong></TableCell>
                                        <TableCell className="text-center" width="10%"><strong>수수료 협의 적용일</strong></TableCell>
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
                                            />
                                        </TableCell>
                                        <TableCell className="text-center">2020102548</TableCell>
                                        <TableCell className="text-center">8808945190</TableCell>
                                        <TableCell className="text-center">
                                            <CardMedia
                                                component="img"
                                                height="50"
                                                src="https://source.unsplash.com/user/c_v_r/100x100"
                                                />
                                        </TableCell>
                                        <TableCell className="text-center"><Link onClick={this.onOpenModal.bind(this)}>신라면 20개입 1박스..</Link></TableCell>
                                        <TableCell className="text-center">5</TableCell>
                                        <TableCell className="text-center">농심</TableCell>
                                        <TableCell className="text-center">-</TableCell>
                                        <TableCell className="text-center">신라면</TableCell>
                                        <TableCell className="text-center">판매가능</TableCell>
                                        <TableCell className="text-center">20,000</TableCell>
                                        <TableCell className="text-center">17,500</TableCell>
                                        <TableCell className="text-center">전시중</TableCell>
                                        <TableCell className="text-center">2021.1.1</TableCell>
                                        <TableCell className="text-center">2021.1.1</TableCell>
                                        <TableCell className="text-center">100</TableCell>
                                        <TableCell className="text-center">2021.03.01 18:00 - 2021.03.05 18:00</TableCell>
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
                                            />
                                        </TableCell>
                                        <TableCell className="text-center">2020109488</TableCell>
                                        <TableCell className="text-center">8841414587</TableCell>
                                        <TableCell className="text-center">
                                            <CardMedia
                                                component="img"
                                                height="50"
                                                src="https://source.unsplash.com/user/c_v_r/100x100"
                                                />
                                        </TableCell>
                                        <TableCell className="text-center"><Link onClick={this.onOpenModal.bind(this)}>카누커피 15T X 30개입..</Link></TableCell>
                                        <TableCell className="text-center">6</TableCell>
                                        <TableCell className="text-center">맥심</TableCell>
                                        <TableCell className="text-center">맥심</TableCell>
                                        <TableCell className="text-center">카누</TableCell>
                                        <TableCell className="text-center">판매가능</TableCell>
                                        <TableCell className="text-center">25,000</TableCell>
                                        <TableCell className="text-center">18,500</TableCell>
                                        <TableCell className="text-center">전시중</TableCell>
                                        <TableCell className="text-center">2021.1.1</TableCell>
                                        <TableCell className="text-center">2021.1.1</TableCell>
                                        <TableCell className="text-center">100</TableCell>
                                        <TableCell className="text-center">-</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>

                    <Grid container className="mt-20">
                        <Grid item xs={12}>
                            <PaginationMaterial
                                count={10}
                                color="primary"
                            />
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

export default withSnackbar(connect(mapStateToProps, null)(ProductManagement));
