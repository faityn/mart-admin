import React from "react";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import PageTitle from "../../../core/common/Partials/PageTitle";
import { Grid, TextField, Button, FormControl, Select, MenuItem, InputLabel, InputAdornment, Table, TableBody, TableRow, TableCell, Link, FormControlLabel, Checkbox} from "@material-ui/core";
import PaginationMaterial from "@material-ui/lab/Pagination";
import SubjectIcon from '@material-ui/icons/Subject';
import SearchIcon from '@material-ui/icons/Search';
import DownIcon from '@material-ui/icons/ArrowDownward';
import UpIcon from '@material-ui/icons/ArrowUpward';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import EditIcon from '@material-ui/icons/Edit';
import CopyIcon from '@material-ui/icons/FileCopy';
import { GET_CATEGORIES } from "../Queries";

class Edit extends React.Component {
    constructor(props) {
        super(props);

        let info = this.props.product ? this.props.product.info : {};

        this.state = {
            isShowSearchPanel: false,
            isShowSearchPanel2: false,
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

        this.toggleSearchPanel = this.toggleSearchPanel.bind(this);
        this.toggleSearchPanel2 = this.toggleSearchPanel2.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
    }

    /**
     * @summary Toogle search panel
     */
    toggleSearchPanel() {
        this.setState({
            isShowSearchPanel: !this.state.isShowSearchPanel,
        });
    }

    toggleSearchPanel2() {
        this.setState({
            isShowSearchPanel2: !this.state.isShowSearchPanel2,
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
                        menuName="마스터 상품(조회/수정)"
                        title="마스터 상품(조회/수정)"
                        icon={<SubjectIcon />}
                        />
                    </Grid>
                </Grid> 
                
                <div className="card mt-20">
                    <Grid container spacing={3} md={10} xs={12}>
                        <Grid item md={2} xs={12} className="align-items-center">
                            <h5>등록일, 최종수정일</h5>
                        </Grid>

                        <Grid item md={10} xs={12} className="align-items-center">
                            <Grid container md={6} xs={12}>
                                <Grid item md={5} xs={12} className="align-items-center">
                                    <TextField
                                        fullWidth
                                        size="small"  
                                        variant="outlined"
                                        type="date"
                                        name="startDate"
                                    />
                                </Grid>
                                <Grid item md={1} xs={12} className="text-center" className="align-items-center">
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
                            <Grid container md={5} xs={12} className="align-items-center" style={{marginLeft: "10px"}}>
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
                                        <InputLabel> 전 체</InputLabel>
                                        <Select>
                                            <MenuItem value="">상품명</MenuItem>
                                            <MenuItem value="">상품번호</MenuItem>
                                            <MenuItem value="">상품 바코드</MenuItem>
                                            <MenuItem value="">최종수정일</MenuItem>
                                            <MenuItem value="">판매 중</MenuItem>
                                            <MenuItem value="">판매중지</MenuItem>
                                            <MenuItem value="">품절</MenuItem>
                                            <MenuItem value="">판매종료</MenuItem>
                                            <MenuItem value="">제조사명</MenuItem>
                                            <MenuItem value="">모델명</MenuItem>
                                            <MenuItem value="">브랜드명</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={5} xs={12} className="align-items-center text-center" style={{marginLeft: "5px"}}>
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
                                <Grid item md={1} xs={12} className="align-items-center text-center" style={{marginLeft: "5px"}}>
                                    <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained"
                                        style={{border: "1px solid #cccbcb"}}
                                    >처음</Button>
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
                                                        <em>None</em>
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
                                                        <em>None</em>
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
                                                        <em>None</em>
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
                                        <Grid item md={2} xs={12} className="align-items-center text-center" style={{marginLeft: "10px"}}>
                                            <Button
                                                size="medium"
                                                variant="contained"
                                                style={{border: "1px solid #008000"}}
                                                startIcon={
                                                    this.state.isShowSearchPanel2 ? (
                                                        <UpIcon />
                                                    ) : (
                                                        <DownIcon />
                                                    )
                                                }
                                                onClick={this.toggleSearchPanel2}
                                            >상세검색</Button>
                                        </Grid>
                                    </Grid>
                                </Grid> 
                            </Grid>
                    
                            {this.state.isShowSearchPanel2 === true ? (
                                <React.Fragment>
                                    <Grid container spacing={3} md={10} xs={12}>
                                        <Grid item md={2} xs={12} className="align-items-center">
                                            <h5>판매가</h5>
                                        </Grid>
                                        
                                        <Grid item md={10} xs={12} className="align-items-center">
                                            <Grid container md={5} xs={12}>
                                                <Grid item md={5} xs={12} className="align-items-center">
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        variant="outlined"
                                                        InputProps={{
                                                            endAdornment: 
                                                            <InputAdornment position="end">원</InputAdornment>,
                                                        }}/>
                                                </Grid>
                                                <Grid item md={1} xs={12} className="align-items-center" style={{paddingTop: "10px"}}><h5>~</h5></Grid>
                                                <Grid item md={5} xs={12} className="align-items-center text-center">
                                                    <TextField
                                                        fullWidth
                                                        size="small"
                                                        variant="outlined"
                                                        InputProps={{
                                                            endAdornment: 
                                                            <InputAdornment position="end">원</InputAdornment>,
                                                        }}/>
                                                </Grid>
                                            </Grid>
                                            <Grid container md={6} xs={12}>
                                                <Grid item md={1} xs={12} className="align-items-center text-center">
                                                    <h5>판매가</h5>
                                                </Grid>
                                                <Grid item md={5} xs={12} className="align-items-center text-center">
                                                    <FormControl size="small" fullWidth variant="outlined">
                                                        <InputLabel>등록일</InputLabel>
                                                        <Select>
                                                            <MenuItem value="">등록일</MenuItem>
                                                            <MenuItem value="">최종수정일</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item md={5} xs={12} className="align-items-center text-center" style={{marginLeft: "5px"}}>
                                                    <FormControl size="small" fullWidth variant="outlined">
                                                        <InputLabel>내림차순</InputLabel>
                                                        <Select>
                                                            <MenuItem value="">내림차순</MenuItem>
                                                            <MenuItem value="">올림차순</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                        </Grid> 
                                    </Grid>
                                </React.Fragment>) : null}
                        </React.Fragment>) : null}

                    <Grid container spacing={3} md={10} xs={12}>
                        <Grid item md={12} xs={12} className="text-left"><h5>전체 자료<i style={{color: "#ff0000"}}><strong>000 </strong></i>건</h5></Grid>
                    </Grid>

                    <Grid container spacing={3} md={12} xs={12}>
                        <Grid item md={1} xs={12} className="align-items-center">
                            <h5>자료 수 : 총<i style={{color: "#ff0000"}}><strong>0 </strong></i>건</h5>
                        </Grid>
                            
                        <Grid item md={11} xs={12} className="align-items-center">
                            <Grid container>
                                <Grid item md={2} xs={12} className="align-items-center">
                                    <FormControl size="small" fullWidth variant="outlined">
                                        <InputLabel>상품등록일순</InputLabel>
                                        <Select>
                                            <MenuItem value="">...</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={1} xs={12} className="align-items-center">
                                    <FormControl size="small" fullWidth variant="outlined">
                                        <InputLabel>100개</InputLabel>
                                        <Select>
                                            <MenuItem value="">...</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={1} xs={12} className="align-items-center">
                                    <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained" 
                                        style={{border: "1px solid #cccbcb"}}
                                        startIcon={<DownloadIcon/>}>엑셀다운</Button>
                                </Grid>
                                <Grid item md={1} xs={12} className="align-items-center">
                                    <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained" 
                                        style={{border: "1px solid #cccbcb"}}>선택삭제</Button>
                                </Grid>
                                <Grid item md={1} xs={12} className="align-items-center">
                                    <FormControl size="small" fullWidth variant="outlined">
                                        <InputLabel>판매변경</InputLabel>
                                        <Select>
                                            <MenuItem value="">...</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={2} xs={12} className="align-items-center">
                                    <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained"                                         
                                        style={{border: "1px solid #cccbcb"}}>즉시할인설정</Button>
                                </Grid>
                                <Grid item md={1} xs={12} className="align-items-center">
                                    <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained"
                                        style={{border: "1px solid #cccbcb"}}>판매가 변경</Button>
                                </Grid>
                                <Grid item md={1} xs={12} className="align-items-center">
                                    <FormControl size="small" fullWidth variant="outlined">
                                        <InputLabel>배송변경</InputLabel>
                                        <Select>
                                            <MenuItem value="">...</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={1} xs={12} className="align-items-center">
                                    <FormControl size="small" fullWidth variant="outlined">
                                        <InputLabel>일괄변경</InputLabel>
                                        <Select>
                                            <MenuItem value="">...</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={1} xs={12} className="align-items-center">
                                    <Button
                                        fullWidth
                                        size="medium"
                                        variant="contained" 
                                        color="primary">수정저장</Button>
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
                                        <TableCell className="text-center" width="3%"><strong>수정</strong></TableCell>
                                        <TableCell className="text-center" width="3%"><strong>복사</strong></TableCell>
                                        <TableCell className="text-center" width="4%"><strong>상품번호</strong></TableCell>
                                        <TableCell className="text-center" width="4%"><strong>상품 바코드</strong></TableCell>
                                        <TableCell className="text-center" width="4%"><strong>카테고리</strong></TableCell>
                                        <TableCell className="text-center" width="10%"><strong>상품명</strong></TableCell>
                                        <TableCell className="text-center" width="4%"><strong>판매상태</strong></TableCell>
                                        <TableCell className="text-center" width="4%"><strong>판매가</strong></TableCell>
                                        <TableCell className="text-center" width="4%"><strong>가이드판매가</strong></TableCell>
                                        <TableCell className="text-center" width="4%"><strong>할인가</strong></TableCell>
                                        <TableCell className="text-center" width="4%"><strong>수수료(%)</strong></TableCell>
                                        <TableCell className="text-center" width="4%"><strong>재고수량</strong></TableCell>
                                        <TableCell className="text-center" width="4%"><strong>상세설명</strong></TableCell>
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
                                        <TableCell className="text-center">
                                            <Button
                                                size="small"
                                                variant="contained"
                                                color="primary"
                                                startIcon={<EditIcon />}
                                            >수정</Button></TableCell>
                                        <TableCell className="text-center">
                                            <Button
                                                size="small"
                                                variant="contained"
                                                color="primary"
                                                startIcon={<CopyIcon />}
                                            >복사</Button></TableCell>
                                        <TableCell className="text-center">2020102548</TableCell>
                                        <TableCell className="text-center">8808945190</TableCell>
                                        <TableCell className="text-center">식품&gt;면류&gt;라면</TableCell>
                                        <TableCell className="text-center">신라면 20개입 1박스..</TableCell>
                                        <TableCell className="text-center">판매 중</TableCell>
                                        <TableCell className="text-center">20,000</TableCell>
                                        <TableCell className="text-center">17,500</TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center">9</TableCell>
                                        <TableCell className="text-center">50</TableCell>
                                        <TableCell className="text-center">
                                            <Link>상세보기</Link></TableCell>
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
                                        <TableCell className="text-center">
                                            <Button
                                                size="small"
                                                variant="contained"
                                                color="primary"
                                                startIcon={<EditIcon />}
                                            >수정</Button></TableCell>
                                        <TableCell className="text-center">
                                            <Button
                                                size="small"
                                                variant="contained"
                                                color="primary"
                                                startIcon={<CopyIcon />}
                                            >복사</Button></TableCell>
                                        <TableCell className="text-center">2020109488</TableCell>
                                        <TableCell className="text-center">8841414587</TableCell>
                                        <TableCell className="text-center">식품&gt;면류&gt;라면</TableCell>
                                        <TableCell className="text-center">신라면 50개입 1박스..</TableCell>
                                        <TableCell className="text-center">판매 중</TableCell>
                                        <TableCell className="text-center">20,000</TableCell>
                                        <TableCell className="text-center">18,500</TableCell>
                                        <TableCell className="text-center"></TableCell>
                                        <TableCell className="text-center">9</TableCell>
                                        <TableCell className="text-center">150</TableCell>
                                        <TableCell className="text-center">
                                            <Link>상세보기</Link></TableCell>
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

export default withSnackbar(connect(mapStateToProps, null)(Edit));
