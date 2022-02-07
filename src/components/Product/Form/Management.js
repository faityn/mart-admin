import React from "react";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import PageTitle from "../../../core/common/Partials/PageTitle";
import { Grid, TextField, Button, FormControl, Select, MenuItem, InputLabel, Table, TableBody, TableRow, TableCell, FormControlLabel, Checkbox, CardMedia,
        Dialog, DialogTitle, DialogActions, Divider, RadioGroup, Radio} from "@material-ui/core";
import { Link } from "react-router-dom";
import PaginationMaterial from "@material-ui/lab/Pagination";
import SubjectIcon from '@material-ui/icons/Subject';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import { GET_CATEGORIES, GET_All_PRODUCTS, ADD_MARKET_PRODUCT } from "../Queries";
import ProductList from './ProductList';
class ProductManagement extends React.Component {
    constructor(props) {
        super(props);

        let info = this.props.product ? this.props.product.info : {};

        this.state = {
            isOpenModal: false,
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

            type: null,
            keyword: null,
            page: 0,
            limit: 30,
            sort: "createdDate",
            order: "DESC",
            dateType: null,
            priceFrom: null,
            priceTo: null,
            marketId: null,
            categoryId: null,
            
            checkedItems: [],   
            products: [],
        };

        this.onOpenModal = this.onOpenModal.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);

        this.handleChange = this.handleChange.bind(this);  
        this.addProducts = this.addProducts.bind(this);  
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

    onFilter() {
        this.setState({
            limit: 30
        })
        

        console.log(this.state.limit);
    }

    handleChange(event) {  
        var array = [...this.state.checkedItems]; // make a separate copy of the array
        var index = array.indexOf(event.target.value)
        if (index !== -1) {
            array.splice(index, 1);
            this.setState({checkedItems: array});
        }

        var isChecked = event.target.checked;  
        if(isChecked === true){
        var item = event.target.value;  
        }else{
        var item = 0;      
        }
        if(item !== 0){
            this.setState(prevState => ({
                checkedItems: [...prevState.checkedItems, item]
            }))
        }
           
    }  

    addProducts(event) {  
        console.log(this.state.checkedItems);  
        event.preventDefault();  
        this.props.apolloClient.httpClient
        .query({
            query: ADD_MARKET_PRODUCT,
            variables: {
                productIds: this.state.checkedItems
            },
        })
        .then((result) => {
            this.props.enqueueSnackbar("Success", { variant: "success" });
            console.log('success');
            // update data
            
        })
        .catch((error) => {
            console.log("CATCH:");
            this.props.enqueueSnackbar(
                "Sorry, there is an error occurred while fetching data.",
                { variant: "error" }
            );
            });

      }  


    async componentDidMount() {
        // const { data } = await this.props.apolloClient.httpClient.query({
        //     query: GET_CATEGORIES,
        // });
    
        // if (data) {
        //     this.setState({
        //         categories: data.categories,
        //     });
        // }
        //console.log(this.state.request);
        
       this.fetchData();
    }

    fetchData() {
        this.props.apolloClient.httpClient
        .query({
            query: GET_All_PRODUCTS,
            variables: {
                request:{
                    type: this.state.type,
                    keyword: null,
                    page: 0,
                    limit: this.state.limit,
                    sort: "createdDate",
                    order: "DESC",
                    dateType: null,
                    priceFrom: null,
                    priceTo: null,
                    marketId: null,
                    categoryId: null,
                }
            },
        })
        .then((result) => {
            this.setState({
                products: result.data.findAllProduct.content,
            });
            console.log(this.state.products);
            
        })
        .catch((error) => {
            console.log("CATCH:");
            this.props.enqueueSnackbar(
                "Sorry, there is an error occurred while fetching data.",
                { variant: "error" }
            );
            });
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
                        menuName="상품 리스트"
                        title="상품 리스트"
                        icon={<SubjectIcon />}
                        />
                    </Grid>
                </Grid> 
                
                <div className="card mt-20">
                    <Grid container spacing={3} md={12} xs={12}>
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
                                    >6개월
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
                        </Grid>
                    </Grid>

                    <Grid container spacing={3} md={12} xs={12}>
                        <Grid item md={2} xs={12}>
                            <h5>검색</h5>
                        </Grid>
                        
                        <Grid item md={10} xs={12} className="align-items-center">
                            <Grid container>
                                <Grid item md={2} xs={12} className="align-items-center">
                                    <FormControl size="small" fullWidth variant="outlined">
                                        <InputLabel>전체</InputLabel>
                                        <Select>
                                            <MenuItem value="">전체</MenuItem>
                                            <MenuItem value="">상품명</MenuItem>
                                            <MenuItem value="">상품번호</MenuItem>
                                            <MenuItem value="">상품 바코드</MenuItem>
                                            <MenuItem value="">판매상태</MenuItem>
                                            <MenuItem value="">브랜드명</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={3} xs={12} className="align-items-center text-center" style={{marginLeft: "5px"}}>
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
                                        startIcon={<RefreshIcon/>}
                                    >초기화</Button>
                                </Grid>
                                {/*
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
                                */}
                            </Grid>
                        </Grid> 
                    </Grid>

                    <Grid container spacing={3} md={12} xs={12}>
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
                    

                    <Grid container spacing={3} md={10} xs={12} className="mt-20">
                        <Grid item md={12} xs={12} className="text-left" style={{paddingTop: "1.5vh", paddingBottom: "1.5vh"}}><InputLabel>전체 자료 : <i style={{color: "#ff0000", fontStyle: "normal"}}><strong>3</strong></i> 건 | 판매 가능 상품 : <i style={{color: "#ff0000", fontStyle: "normal"}}>3<strong></strong></i> 건</InputLabel></Grid>
                    </Grid>
                    <form onSubmit={this.addProducts} >
                    <Grid container spacing={3} md={12} xs={12} className="mt-20">
                        <Grid item md={2} xs={12} className="align-items-center">
                            <h5>자료 수 : 총<i style={{color: "#ff0000", fontStyle: "normal"}}><strong> 3 </strong></i>건</h5>
                        </Grid>
                            
                        <Grid item md={10} xs={12} className="align-items-center">
                            <Grid container>
                                <Grid item md={7}></Grid>
                                <Grid item md={2} xs={12} className="align-items-center">
                                    <Button
                                        fullWidth
                                        type="submit"
                                        size="medium"
                                        variant="contained"     
                                        color="primary" >판매 상품으로 선택 </Button>
                                </Grid>
                                <Grid item md={2} xs={12} className="align-items-center">
                                    <FormControl size="small" fullWidth variant="outlined">
                                        <InputLabel>상품등록일순</InputLabel>
                                        <Select>
                                            <MenuItem value="1">상품등록일순</MenuItem>
                                            <MenuItem value="2">성품명 순</MenuItem>
                                            <MenuItem value="3">상품 번호 순</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={1} xs={12} className="align-items-center" style={{paddingLeft: "10px"}}>
                                    <FormControl size="small" fullWidth variant="outlined">
                                        <InputLabel>10개</InputLabel>
                                        <Select >
                                            <MenuItem value="30" onClick={this.onFilter.bind(this, '30')}>30개</MenuItem>
                                            <MenuItem value="50" onClick={this.onFilter.bind(this, '50')}>50개</MenuItem>
                                            <MenuItem value="100" onClick={this.onFilter.bind(this, '100')}>100개</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </Grid>                                                        
                    </Grid>

                    <Grid container spacing={3} md={12} xs={12} className="mt-20">
                        <Grid item md={12} xs={12}>
                            
                            <Table className="order_table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="text-center" width="2%"><strong>No.</strong></TableCell>
                                        <TableCell className="text-center" width="2%"><strong>선택</strong></TableCell>
                                        <TableCell className="text-center" width="8%"><strong>상품번호</strong></TableCell>
                                        <TableCell className="text-center" width="8%"><strong>공급사 상품 바코드</strong></TableCell>
                                        <TableCell className="text-center" width=""><strong>카테고리</strong></TableCell>
                                        <TableCell className="text-center" width="8%"><strong>이미지</strong></TableCell>
                                        <TableCell className="text-center" width="15%"><strong>상품명</strong></TableCell>
                                        <TableCell className="text-center" width="10%"><strong>브랜드명</strong></TableCell>
                                        <TableCell className="text-center" width="5%"><strong>수수료(%)</strong></TableCell>
                                        <TableCell className="text-center" width="6%"><strong>판매가</strong></TableCell>
                                        <TableCell className="text-center" width="10%"><strong>가이드 등록일</strong></TableCell>
                                        <TableCell className="text-center" width="10%"><strong>최종수정일</strong></TableCell>
                                    </TableRow>
                                    { this.state.products.map((el, index) =>             
                                    <TableRow>
                                        <TableCell className="text-center">{index + 1 }</TableCell>
                                        <TableCell className="text-center">
                                            <FormControlLabel
                                                control={
                                                    <Checkbox

                                                        color="primary"
                                                        value={el.id}
                                                        onChange={this.handleChange}  
                                                    />
                                                }
                                                style={{marginLeft: "18%"}}
                                            />
                                        </TableCell>
                                        <TableCell className="text-center">{el.code}</TableCell>
                                        <TableCell className="text-center">{el.barcode}</TableCell>
                                        <TableCell className="text-center">{el.categoryName}</TableCell>
                                        <TableCell className="text-center">
                                            
                                            <CardMedia 
                                                component="img"
                                                height="50"
                                                src={`http://ahuyndoghxay9281829.cdn.ntruss.com/${el.images[0]}?type=m&w=100&h=100`}
                                                />
                                            
                                        </TableCell>
                                        <TableCell className="text-center"><Link to="/product-detail" className="text-blue" >{el.name}</Link></TableCell>
                                        <TableCell className="text-center">{el.brand}</TableCell>
                                        <TableCell className="text-center">fff</TableCell>
                                        <TableCell className="text-center">{el.defaultPrice}</TableCell>
                                        <TableCell className="text-center">2021.01.01</TableCell>
                                        <TableCell className="text-center">2021.02.01</TableCell>
                                    </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>
                    </form>
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
