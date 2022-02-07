import React, { useState, useEffect, useCallback } from "react";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PageTitle from "../../../core/common/Partials/PageTitle";
import { store } from "../../../core/redux/Redux";
import {
  Grid,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Table,
  TableBody,
  TableRow,
  TableCell,
  FormControlLabel,
  Checkbox,
  CardMedia,
  Dialog,
  DialogTitle,
  DialogActions,
  Divider,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import PaginationMaterial from "@material-ui/lab/Pagination";
import SubjectIcon from "@material-ui/icons/Subject";
import SearchIcon from "@material-ui/icons/Search";
import DownIcon from "@material-ui/icons/ArrowDownward";
import UpIcon from "@material-ui/icons/ArrowUpward";
import RefreshIcon from "@material-ui/icons/Refresh";
import {
  GET_CATEGORIES,
  GET_MARKET_PRODUCTS,
  SET_PRODUCT,
  CHANGE_STATUS,
} from "../Queries";
import { Switch } from "react-switch-input";

import ProductItem from "./component/ProductItem";

const EditProduct = (props) => {
  const { history } = props;

  let info = props.product ? props.product.info : {};
  const [checkedItems, setCheckedItems] = useState([
    // {
    //   productId: 9,
    //   quantity: 0,
    //   price: 1,
    // },
  ]);
  const [state, setState] = useState({
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
    sProducts: [],
    saleStatus: true,
    showStatus: true,
    showLabel: "On",
    products: [],

    selectedIds: [],
    processing: "",
  });
  const forceUpdate = useCallback(() => setState({}), []);

  const [checkVal, setCheckVal] = useState("N");
  /**
   * @summary Open box
   * @param {event}
   */
  const onOpenModal = (e, index) => {
    setState({
      index: index,
      isOpenModal: true,
    });
  };
  /**
   * @summary Close box
   * @param {event}
   */
  const onCloseModal = (e, index) => {
    setState({ isOpenModal: false });
  };

  /**
   * @summary Toogle search panel
   */
  const toggleSearchPanel = () => {
    setState({
      isShowSearchPanel: !this.state.isShowSearchPanel,
    });
  };
  const fetchData = () => {
    props.apolloClient.httpClient
      .query({
        query: GET_MARKET_PRODUCTS,
        variables: {
          request: {
            type: null,
            keyword: null,
            page: 0,
            limit: 30,
            sort: "createdDate",
            order: "DESC",
            dateType: null,
            priceFrom: null,
            priceTo: null,
            marketId: props.loggedUser.marketid,
            categoryId: null,
          },
        },
      })
      .then((result) => {
        setState({
          ...state,
          sProducts: result.data.findProductByMarket.content,
        });
        setCheckedItems([]);
      })
      .catch((error) => {
        console.log("CATCH:");
        props.enqueueSnackbar(
          "Sorry, there is an error occurred while fetching data.",
          { variant: "error" }
        );
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const changeSaleStatus = (id) => {
    console.log("changeSaleStatus:", id);
    const currentEl = state.sProducts.find((item) => item.id === id);
    if (currentEl !== undefined) {
      props.apolloClient.httpClient
        .query({
          query: CHANGE_STATUS,
          variables: {
            change: {
              marketId: props.loggedUser.marketid,
              productId: id,
              saleYN: !currentEl.saleYN,
            },
          },
        })
        .then((result) => {
          props.enqueueSnackbar("Success", { variant: "success" });
          console.log("success");
          fetchData();
        })
        .catch((error) => {
          console.log("CATCH:");
          props.enqueueSnackbar(
            "Sorry, there is an error occurred while fetching data.",
            { variant: "error" }
          );
        });
    }
  };

  const changeShowStatus = (id) => {
    const currentEl = state.sProducts.find((item) => item.id === id);
    if (currentEl !== undefined) {
      props.apolloClient.httpClient
        .query({
          query: CHANGE_STATUS,
          variables: {
            change: {
              marketId: props.loggedUser.marketid,
              productId: id,
              showYN: !currentEl.showYN,
            },
          },
        })
        .then((result) => {
          props.enqueueSnackbar("Success", { variant: "success" });
          console.log("success");
          fetchData();
        })
        .catch((error) => {
          console.log("CATCH:");
          props.enqueueSnackbar(
            "Sorry, there is an error occurred while fetching data.",
            { variant: "error" }
          );
        });
    }
  };

  const priceChange = (e, index) => {};

  const qtyChange = (e, index) => {};

  const selectProduct = (event, index) => {
    // setCheckedItems([{ productId: 20 }]);
    // return;
    console.log(event.target.checked, checkedItems);

    var p = document.querySelector("#price" + event.target.value + "");
    var q = document.querySelector("#qty" + event.target.value + "");
    if (event.target.checked) {
      const product = {
        productId: +event.target.value,
        quantity: +q.value,
        price: +p.value,
      };

      setCheckedItems([...checkedItems, product]);
      console.log("added");

      // setState(prevState => ({
      //     ...state,
      //     checkedItems: [...prevState.checkedItems, products]
      // }))
      // setState(prevState => ({
      //     ...state,
      //     selectedIds: [...prevState.selectedIds, id]
      // }))
    } else {
      setCheckedItems(
        checkedItems.filter((item) => item.productId !== +event.target.value)
      );
      console.log("removed");
      // setState(prevState => ({
      //     ...state,
      //     checkedItems: [...prevState.checkedItems.filter(item => item.productId !== event.target.value)]
      //     // checkedItems: prevState.checkedItems.filter(item => item.productId !== event.target.value)
      //     // checkedItems: prevState.checkedItems
      // }))
    }
  };

  const updateProducts = (event) => {
    event.preventDefault();
    setState({
      ...state,
      processing: "submit",
    });
    //console.log(state.selectedIds);
    props.apolloClient.httpClient
      .query({
        query: SET_PRODUCT,
        variables: {
          products: checkedItems,
        },
      })
      .then((result) => {
        props.enqueueSnackbar("Success", { variant: "success" });

        // window.location.reload(false);
        // update data
        fetchData();
      })
      .catch((error) => {
        console.log("CATCH:");
        props.enqueueSnackbar(
          "Sorry, there is an error occurred while fetching data.",
          { variant: "error" }
        );
      });

    setState({
      ...state,
      processing: "",
    });
  };

  /**
   * @summary On change category
   * @param {MouseEvent} event
   */
  const onChangeCategory = (e, level) => {
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
  };

  console.log("PARENT: ", checkedItems);

  return (
    <React.Fragment>
      <Grid container>
        <Grid item>
          <PageTitle
            menuName="상품 불러오기 / 수정"
            title="상품 불러오기 / 수정"
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
                style={{ border: "1px solid #cccbcb" }}
              >
                등록일
              </Button>
            </Grid>
            <Grid container md={5} xs={12} style={{ marginLeft: "10px" }}>
              <Grid item md={5} xs={12} className="align-items-center">
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  type="date"
                  name="startDate"
                />
              </Grid>
              <Grid
                item
                md={1}
                xs={12}
                className="text-center"
                className="align-items-center"
                style={{ paddingTop: "8px", paddingLeft: "1rem" }}
              >
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
                  style={{ border: "1px solid #cccbcb" }}
                >
                  오늘
                </Button>
              </Grid>
              <Grid item md={2} xs={12} style={{ paddingLeft: "5px" }}>
                <Button
                  fullWidth
                  size="medium"
                  variant="contained"
                  style={{ border: "1px solid #cccbcb" }}
                >
                  1주일
                </Button>
              </Grid>
              <Grid item md={2} xs={12} style={{ paddingLeft: "5px" }}>
                <Button
                  fullWidth
                  size="medium"
                  variant="contained"
                  style={{ border: "1px solid #cccbcb" }}
                >
                  1개월
                </Button>
              </Grid>
              <Grid item md={2} xs={12} style={{ paddingLeft: "5px" }}>
                <Button
                  fullWidth
                  size="medium"
                  variant="contained"
                  style={{ border: "1px solid #cccbcb" }}
                >
                  3개월
                </Button>
              </Grid>
              <Grid item md={2} xs={12} style={{ paddingLeft: "5px" }}>
                <Button
                  fullWidth
                  size="medium"
                  variant="contained"
                  style={{ border: "1px solid #cccbcb" }}
                >
                  6개월
                </Button>
              </Grid>
              <Grid item md={2} xs={12} style={{ paddingLeft: "5px" }}>
                <Button
                  fullWidth
                  size="medium"
                  variant="contained"
                  style={{ border: "1px solid #cccbcb" }}
                >
                  1년
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
              <Grid
                item
                md={3}
                xs={12}
                className="align-items-center text-center"
                style={{ marginLeft: "5px" }}
              >
                <TextField fullWidth size="small" variant="outlined" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {state.isShowSearchPanel === true ? (
          <React.Fragment>
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
                            <MenuItem key={index} value={category.id}>
                              {category.name}
                            </MenuItem>
                          )
                        )}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid
                    item
                    md={3}
                    xs={12}
                    className="align-items-center"
                    style={{ marginLeft: "5px" }}
                  >
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
                              this.state.selectedCategories.firstId
                          ) || []
                        ).map((category, index) => (
                          <MenuItem key={index} value={category.id}>
                            {category.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid
                    item
                    md={3}
                    xs={12}
                    className="align-items-center"
                    style={{ marginLeft: "5px" }}
                  >
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
                        defaultValue={this.state.selectedCategories.thirdId}
                      >
                        <MenuItem value="">
                          <em>없음</em>
                        </MenuItem>
                        {(
                          this.state.categories.third.filter(
                            (f) =>
                              f.parentId ===
                              this.state.selectedCategories.secondId
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
          </React.Fragment>
        ) : null}

        <Grid container spacing={3} md={12} xs={12}>
          <Grid item md={2} xs={12}>
            <h5>판매상태</h5>
          </Grid>

          <Grid item md={10} xs={12}>
            <Grid container>
              <Grid item md={4} className="align-items-center">
                <Grid container>
                  <Grid item md={3} xs={12}>
                    <RadioGroup>
                      <FormControlLabel
                        value="true"
                        control={<Radio />}
                        label="전체"
                      />
                    </RadioGroup>
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <RadioGroup>
                      <FormControlLabel
                        value="false"
                        control={<Radio />}
                        label="판매가능"
                      />
                    </RadioGroup>
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <RadioGroup>
                      <FormControlLabel
                        value="false"
                        control={<Radio />}
                        label="판매불가"
                      />
                    </RadioGroup>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={4}>
                <Grid container className="align-items-center">
                  <Grid item md={3} xs={12}>
                    <h5>전시상태</h5>
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <RadioGroup>
                      <FormControlLabel
                        value="true"
                        control={<Radio />}
                        label="전체"
                      />
                    </RadioGroup>
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <RadioGroup>
                      <FormControlLabel
                        value="false"
                        control={<Radio />}
                        label="전시중"
                      />
                    </RadioGroup>
                  </Grid>
                  <Grid item md={3} xs={12}>
                    <RadioGroup>
                      <FormControlLabel
                        value="false"
                        control={<Radio />}
                        label="전시중지"
                      />
                    </RadioGroup>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={3} md={12} xs={12}>
          <Grid item md={10} xs={12}>
            <Grid container>
              <Grid
                item
                md={4}
                xs={12}
                className="align-items-center text-center"
                style={{ marginLeft: "5px" }}
              ></Grid>
              <Grid
                item
                md={4}
                xs={12}
                className="align-items-center text-center"
                style={{ marginLeft: "5px" }}
              >
                <Button
                  fullWidth
                  size="medium"
                  variant="contained"
                  color="primary"
                  startIcon={<SearchIcon />}
                >
                  검색
                </Button>
                <Button
                  fullWidth
                  size="medium"
                  variant="contained"
                  style={{ border: "1px solid #cccbcb" }}
                  startIcon={<RefreshIcon />}
                >
                  초기화
                </Button>
              </Grid>
              <Grid
                item
                md={4}
                xs={12}
                className="align-items-center text-center"
                style={{ marginLeft: "5px" }}
              ></Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={3} md={10} xs={12} className="mt-20">
          <Grid item md={12} xs={12} className="text-left">
            <InputLabel>
              전체 자료 :{" "}
              <i style={{ color: "#ff0000", fontStyle: "normal" }}>
                <strong>2,000</strong>
              </i>{" "}
              건 | 판매 가능 상품 :{" "}
              <i style={{ color: "#ff0000", fontStyle: "normal" }}>
                <strong>2,000</strong>
              </i>{" "}
              건
            </InputLabel>
          </Grid>
        </Grid>

        <Grid container spacing={3} md={12} xs={12} className="mt-20">
          <Grid item md={2} xs={12} className="align-items-center">
            <Button
              fullWidth
              size="medium"
              variant="contained"
              color="primary"
              onClick={updateProducts.bind(this)}
            >
              Update
            </Button>
          </Grid>

          <Grid item md={10} xs={12} className="align-items-center">
            <Grid container>
              <Grid item md={10}></Grid>
              <Grid item md={2} xs={12} className="align-items-center">
                <FormControl size="small" fullWidth variant="outlined">
                  <InputLabel>상품등록일순</InputLabel>
                  <Select>
                    <MenuItem value="1">상품등록일순</MenuItem>
                    <MenuItem value="2">성품명 순</MenuItem>
                    <MenuItem value="3">상품 번호 순</MenuItem>
                    <MenuItem value="4">온라인 재고수량 순</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container spacing={3} md={12} xs={12} className="mt-20">
          <Grid item md={12} xs={12}>
            <Table className="order_table" count={checkedItems.count}>
              <TableBody>
                <TableRow>
                  <TableCell className="text-center" width="3%">
                    <strong>No.</strong>
                  </TableCell>
                  <TableCell className="text-center" width="3%">
                    <strong>선택</strong>
                  </TableCell>
                  <TableCell className="text-center" width="4%">
                    <strong>상품번호</strong>
                  </TableCell>
                  <TableCell className="text-center" width="4%">
                    <strong>상품 바코드</strong>
                  </TableCell>
                  <TableCell className="text-center" width="9%">
                    <strong>카테고리</strong>
                  </TableCell>
                  <TableCell className="text-center" width="7%">
                    <strong>이미지</strong>
                  </TableCell>
                  <TableCell className="text-center" width="">
                    <strong>상품명</strong>
                  </TableCell>
                  <TableCell className="text-center" width="7%">
                    <strong>브랜드명</strong>
                  </TableCell>
                  <TableCell className="text-center" width="6%">
                    <strong>수수료(%)</strong>
                  </TableCell>

                  <TableCell className="text-center" width="6%">
                    <strong>판매가</strong>
                  </TableCell>
                  <TableCell className="text-center" width="7%">
                    <strong>가이드 가격</strong>
                  </TableCell>
                  <TableCell className="text-center" width="7%">
                    <strong>재고수량</strong>
                  </TableCell>
                  <TableCell className="text-center" width="7%">
                    <strong>판매상태</strong>
                  </TableCell>
                  <TableCell className="text-center" width="7%">
                    <strong>전시상태</strong>
                  </TableCell>
                </TableRow>
                {state.sProducts.map((el, index) => (
                  <ProductItem
                    key={el.id}
                    el={el}
                    index={index}
                    checkedItems={checkedItems}
                    selectProduct={selectProduct}
                    changeSaleStatus={changeSaleStatus}
                    changeShowStatus={changeShowStatus}
                  />
                ))}
              </TableBody>
            </Table>
          </Grid>
        </Grid>

        <Grid container className="mt-20">
          <Grid item xs={12}>
            <PaginationMaterial count={10} color="primary" />
          </Grid>
        </Grid>

        <Dialog
          open={state.isOpenModal}
          aria-labelledby="responsive-dialog-title"
          maxWidth="lg"
        >
          <DialogTitle id="responsive-dialog-title">
            <h2>제품 정보</h2>
          </DialogTitle>
          <Divider />
          <DialogActions>
            <Button autoFocus onClick={onCloseModal.bind(this)} color="primary">
              닫다
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </React.Fragment>
  );
};

// Redux state to props
const mapStateToProps = (state) => {
  return {
    apolloClient: state.apolloClient,
    loggedUser: state.loggedUser,
  };
};

export default withSnackbar(connect(mapStateToProps, null)(EditProduct));
