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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import PaginationMaterial from "@material-ui/lab/Pagination";
import SubjectIcon from "@material-ui/icons/Subject";
import SearchIcon from "@material-ui/icons/Search";
import DownIcon from "@material-ui/icons/ArrowDownward";
import UpIcon from "@material-ui/icons/ArrowUpward";
import RefreshIcon from "@material-ui/icons/Refresh";
import {
  GET_TREE,
  GET_CATEGORY,
  GET_MARKET_PRODUCTS,
  SET_PRODUCT,
  CHANGE_STATUS,
} from "../Queries";
import { Switch } from "react-switch-input";
import dateFormat from "dateformat";
import ProductItem from "./component/ProductItem";
import Pagination from "./component/Pagination";
import DateFilter from "./component/DateFilter";
import KeywordFilter from "./component/KeywordFilter";
import SaleShowFilter from "./component/SaleShowFilter";
import CategoryFilter from "./component/CategoryFilter";
import SortRow from "./component/MartSortRow";
import SelectedProductItem from "./component/SelectedProductItem";
const MarketList = (props) => {
  const { history } = props;

  let info = props.product ? props.product.info : {};
  const [checkedItems, setCheckedItems] = useState([
    // {
    //   productId: 9,
    //   quantity: 0,
    //   price: 1,
    // },
  ]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [dateTypeSelect, setDateTypeSelect] = useState();
  const [type, setType] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const [keyword, setKeyword] = useState(null);
  const [listSort, setListSort] = useState();
  const [firstCategory, setFirstCategory] = useState([]);
  const [firstCategoryId, setFirstCategoryId] = useState();
  const [categoryCount, setCategoryCount] = useState();
  const [categoryId, setCategoryId] = useState(null);
  const [secondCategory, setSecondCategory] = useState([]);
  const [secondCategoryId, setSecondCategoryId] = useState();
  const [thirdCategory, setThirdCategory] = useState([]);
  const [thirdCategoryId, setThirdCategoryID] = useState();
  const [saleFilterStatus, setSaleFilterStatus] = useState();
  const [showFilterStatus, setShowFilterStatus] = useState();
  const [priceChangePopup, setPriceChangePopup] = useState(false);
  const [state, setState] = useState({
    isOpenModal: false,
    isShowSearchPanel: false,
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

  const selectDateType = (event, val) => {
    setDateTypeSelect(val);
    if (val === "today") {
      var dateFrom = dateFormat(new Date(), "yyyy-mm-dd");
      var dateTo = dateFormat(new Date(), "yyyy-mm-dd");
      setDateFrom(dateFrom);
      setDateTo(dateTo);
    }
    if (val === "week") {
      var date = new Date();
      date.setDate(date.getDate() - 7);
      var dateFrom = dateFormat(date, "yyyy-mm-dd");
      var dateTo = dateFormat(new Date(), "yyyy-mm-dd");
      setDateFrom(dateFrom);
      setDateTo(dateTo);
      console.log(dateFrom);
    }
    if (val === "month") {
      var date = new Date();
      date.setMonth(date.getMonth() - 1);
      var dateFrom = dateFormat(date, "yyyy-mm-dd");
      var dateTo = dateFormat(new Date(), "yyyy-mm-dd");
      setDateFrom(dateFrom);
      setDateTo(dateTo);
      console.log(dateFrom);
    }
    if (val === "3month") {
      var date = new Date();
      date.setMonth(date.getMonth() - 3);
      var dateFrom = dateFormat(date, "yyyy-mm-dd");
      var dateTo = dateFormat(new Date(), "yyyy-mm-dd");
      setDateFrom(dateFrom);
      setDateTo(dateTo);
      console.log(dateFrom);
    }

    if (val === "6month") {
      var date = new Date();
      date.setMonth(date.getMonth() - 6);
      var dateFrom = dateFormat(date, "yyyy-mm-dd");
      var dateTo = dateFormat(new Date(), "yyyy-mm-dd");
      setDateFrom(dateFrom);
      setDateTo(dateTo);
      console.log(dateFrom);
    }

    if (val === "year") {
      var date = new Date();
      date.setFullYear(date.getFullYear() - 1);
      var dateFrom = dateFormat(date, "yyyy-mm-dd");
      var dateTo = dateFormat(new Date(), "yyyy-mm-dd");
      setDateFrom(dateFrom);
      setDateTo(dateTo);
      console.log(dateFrom);
    }
  };

  const selectFilterType = (event) => {
    console.log(event.target.value);
    setType(event.target.value);
  };

  const selectSaleStatus = (event) => {
    console.log(event.target.value);
    setSaleFilterStatus(event.target.value);
  };

  const selectShowStatus = (event) => {
    console.log(event.target.value);
    setShowFilterStatus(event.target.value);
    //setType(event.target.value);
  };

  const onFilter = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    setKeyword(formData.get("keywords"));
    var keywords = formData.get("keywords");
    // setState(0);
    // state.type;
    console.log(keyword);
    fetchData(page, rowsPerPage, keywords, listSort);
  };

  const getParentCategory = () => {
    props.apolloClient.httpClient
      .query({
        query: GET_TREE,
      })
      .then((result) => {
        console.log(result.data.getTree);
        setFirstCategory(result.data.getTree);
        //setCategoryCount(result.data.getTree.length);
      })
      .catch((error) => {
        console.log("CATCH:");
      });
  };

  const fetchData = (p, rpp, keywords, sort) => {
    getParentCategory();
    props.apolloClient.httpClient
      .query({
        query: GET_MARKET_PRODUCTS,
        variables: {
          request: {
            page: 0,
            limit: 10000000,
            type: type,
            keyword: keywords,
            marketId: props.loggedUser.marketid,
            sort: "createdDate",
            order: "DESC",
            dateType: "createdDate",
            dateFrom: dateFrom,
            dateTo: dateTo,
            categoryId: categoryId,
          },
        },
      })
      .then((result) => {
        setTotalCount(result.data.findProductByMarket.content.length);
      })
      .catch((error) => {
        console.log("CATCH:");
      });
    props.apolloClient.httpClient
      .query({
        query: GET_MARKET_PRODUCTS,
        variables: {
          request: {
            type: type,
            keyword: keywords,
            page: p,
            limit: rpp,
            sort: sort,
            order: "DESC",
            dateType: "createdDate",
            dateFrom: dateFrom,
            dateTo: dateTo,
            marketId: props.loggedUser.marketid,
            categoryId: categoryId,
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
    fetchData(page, rowsPerPage, keyword, listSort);
  }, []);

  const changeSaleStatus = (id) => {
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
          fetchData(page, rowsPerPage, keyword, listSort);
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
          fetchData(page, rowsPerPage, keyword, listSort);
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

  const priceChange = (e, index) => {
    setCheckedItems(checkedItems.filter((item) => item.productId !== +index));
  };

  const qtyChange = (e, index) => {
    //console.log(index);
    setCheckedItems(checkedItems.filter((item) => item.productId !== +index));
  };

  const selectProduct = (event, index) => {
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
    } else {
      setCheckedItems(
        checkedItems.filter((item) => item.productId !== +event.target.value)
      );
      console.log("removed");
    }
  };

  const updateProducts = (event) => {
    event.preventDefault();

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
        fetchData(page, rowsPerPage, keyword, listSort);
      })
      .catch((error) => {
        console.log("CATCH:");
        props.enqueueSnackbar(
          "Sorry, there is an error occurred while fetching data.",
          { variant: "error" }
        );
      });
  };

  const pChangePopup = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    setPriceChangePopup(true);
  };

  const onClosePriceChangeModal = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    setPriceChangePopup(false);
  };

  const handlePagination = (event, value) => {
    var p = value - 1;
    setPage(parseInt(p));
    fetchData(p, rowsPerPage, keyword, listSort);
  };

  const handleChangeSort = (event) => {
    console.log(event.target.value);
    const val = event.target.value;
    setListSort(val);
    setPage(0);
    var p = 0;
    fetchData(p, rowsPerPage, keyword, val);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log(event.target.value);
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
    var p = 0;
    fetchData(p, event.target.value, keyword, listSort);
  };
  /**
   * @summary On change category
   * @param {MouseEvent} event
   */
  const onChangeCategory = (e, level) => {
    e.preventDefault();
    var val = e.target.value;

    if (level === 1) {
      if (val !== "") {
        setCategoryId(val);
        setFirstCategoryId(val);
        setSecondCategoryId(null);
        setSecondCategory([]);
        // setThirdCategory([]);
        props.apolloClient.httpClient
          .query({
            query: GET_CATEGORY,
            variables: {
              id: val,
            },
          })
          .then((result) => {
            setSecondCategory(result.data.getCategory.childCategories);
            setCategoryCount(result.data.getCategory.childCategories.length);
          })
          .catch((error) => {
            console.log("Category select catch:");
          });
      } else {
        setCategoryId(null);
        setFirstCategoryId(null);
        setSecondCategory([]);
      }
    } else if (level === 2) {
      if (val !== "") {
        setCategoryId(val);
        setSecondCategoryId(val);
        props.apolloClient.httpClient
          .query({
            query: GET_CATEGORY,
            variables: {
              id: val,
            },
          })
          .then((result) => {
            setThirdCategory(result.data.getCategory.childCategories);
            setCategoryCount(result.data.getCategory.childCategories.length);
          })
          .catch((error) => {
            console.log("Category select catch:");
          });
      } else {
        setCategoryId(firstCategoryId);
        setSecondCategoryId(null);
      }
    } else if (level === 3) {
      if (val !== "") {
        setCategoryId(val);
        //setThirdCategoryId(val);
      } else {
        setCategoryId(secondCategoryId);
        //setThirdCategoryId(null);
      }
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
        <form onSubmit={onFilter}>
          <DateFilter
            dateFrom={dateFrom}
            dateTo={dateTo}
            selectDateType={selectDateType}
            dateTypeSelect={dateTypeSelect}
          />
          <KeywordFilter type={type} selectFilterType={selectFilterType} />

          <CategoryFilter
            firstCategory={firstCategory}
            secondCategory={secondCategory}
            thirdCategory={thirdCategory}
            secondCategoryId={secondCategoryId}
            thirdCategoryId={thirdCategoryId}
            onChangeCategory={onChangeCategory}
          />
        </form>
        <SortRow
          totalCount={totalCount}
          listSort={listSort}
          handleChangeSort={handleChangeSort}
          rowsPerPage={rowsPerPage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          updateProducts={updateProducts}
          pChangePopup={pChangePopup}
        />

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

                  <TableCell className="text-center" width="7%">
                    <strong>가이드 가격 </strong>
                  </TableCell>
                  <TableCell className="text-center" width="7%">
                    <strong>판매가 </strong>
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
                    priceChange={priceChange}
                    qtyChange={qtyChange}
                  />
                ))}
              </TableBody>
            </Table>
          </Grid>
        </Grid>

        <Grid container className="mt-20">
          <Grid item xs={12}>
            <Pagination
              page={page}
              totalCount={totalCount}
              rowsPerPage={rowsPerPage}
              handlePagination={handlePagination}
            />
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

        <Dialog
          open={priceChangePopup}
          aria-labelledby="responsive-dialog-title"
          maxWidth="md"
          fullWidth={true}
        >
          <DialogTitle id="responsive-dialog-title">
            <h2>상품 판매가 변경 요청하기</h2>
          </DialogTitle>
          <DialogContent maxWidth="xl">
            <Table className="order_table">
              <TableBody>
                <TableRow>
                  <TableCell className="text-center" width="20%">
                    <strong>상품번호</strong>
                  </TableCell>
                  <TableCell className="text-center" width="25%">
                    <strong>상품 바코드</strong>
                  </TableCell>

                  <TableCell className="text-center" width="">
                    <strong>상품명</strong>
                  </TableCell>

                  <TableCell className="text-center" width="25%">
                    <strong>판매가</strong>
                  </TableCell>
                </TableRow>

                {checkedItems.map((a, index) =>
                  state.sProducts
                    .filter((b) => b.id === a.productId)
                    .map((el, index) => (
                      <SelectedProductItem
                        el={el}
                        priceChange={priceChange}
                        checkedItems={checkedItems}
                      />
                    ))
                )}
              </TableBody>
            </Table>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button
              autoFocus
              onClick={onClosePriceChangeModal.bind(this)}
              color="primary"
            >
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

export default withSnackbar(connect(mapStateToProps, null)(MarketList));
