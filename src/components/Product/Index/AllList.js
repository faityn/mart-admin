import React, { useState, useEffect, useCallback } from "react";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import PageTitle from "../../../core/common/Partials/PageTitle";
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
  TablePagination,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import PaginationMaterial from "@material-ui/lab/Pagination";
import SubjectIcon from "@material-ui/icons/Subject";
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/Refresh";
import {
  GET_TREE,
  GET_CATEGORY,
  GET_All_PRODUCTS,
  ADD_MARKET_PRODUCT,
} from "../Queries";
import AllProductItem from "./component/AllProductItem";
import Pagination from "./component/Pagination";
import DateFilter from "./component/DateFilter";
import KeywordFilter from "./component/KeywordFilter";
import CategoryFilter from "./component/CategoryFilter";
import SortRow from "./component/SortRow";
import dateFormat from "dateformat";
const ProductAllList = (props) => {
  let info = props.product ? props.product.info : {};
  const [checkedItems, setCheckedItems] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(30);
  const [totalCount, setTotalCount] = useState(0);
  const [limit, setLimit] = useState(30);
  const [type, setType] = useState(null);
  const [keyword, setKeyword] = useState(null);
  const [firstCategory, setFirstCategory] = useState([]);
  const [firstCategoryId, setFirstCategoryId] = useState();
  const [categoryCount, setCategoryCount] = useState();
  const [categoryId, setCategoryId] = useState(null);
  const [secondCategory, setSecondCategory] = useState([]);
  const [secondCategoryId, setSecondCategoryId] = useState();
  const [thirdCategory, setThirdCategory] = useState([]);
  const [thirdCategoryId, setThirdCategoryID] = useState();
  const [dateTypeSelect, setDateTypeSelect] = useState();
  const [dateFrom, setDateFrom] = useState();
  const [dateTo, setDateTo] = useState();
  const [listSort, setListSort] = useState();
  const [state, setState] = useState({
    isOpenModal: false,

    order: "DESC",
    priceFrom: null,
    priceTo: null,
    marketId: null,
    sProducts: [],
  });

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

  const handleChange = (event, id) => {
    console.log(event.target.checked);
    if (event.target.checked) {
      setCheckedItems([...checkedItems, +id]);
      console.log("added");
    } else {
      setCheckedItems(checkedItems.filter((item) => item !== +id));
      console.log("removed");
    }
  };

  const addProducts = (event, index) => {
    console.log(checkedItems);
    event.preventDefault();
    props.apolloClient.httpClient
      .query({
        query: ADD_MARKET_PRODUCT,
        variables: {
          productIds: checkedItems,
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
  };

  const handlePagination = (event, value) => {
    var p = value - 1;
    setPage(parseInt(p));
    fetchData(p, rowsPerPage, keyword, listSort);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log(event.target.value);
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
    var p = 0;
    fetchData(p, event.target.value, keyword, listSort);
  };
  const handleChangeSort = (event) => {
    console.log(event.target.value);
    const val = event.target.value;
    setListSort(val);
    setPage(0);
    var p = 0;
    fetchData(p, rowsPerPage, keyword, val);
  };

  const selectFilterType = (event) => {
    console.log(event.target.value);
    setType(event.target.value);
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

    // var date = dateFormat(new Date(), "yyyy-mm-dd");
    // console.log(date);
    // setType(event.target.value);
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

  const fetchData = (p, rpp, keywords, sort) => {
    getParentCategory();
    console.log(p);
    props.apolloClient.httpClient
      .query({
        query: GET_All_PRODUCTS,
        variables: {
          request: {
            page: 0,
            limit: 1000000000,
            type: type,
            keyword: keywords,
            sort: "createdDate",
            order: "DESC",
            categoryId: categoryId,
            dateType: "createdDate",
            dateFrom: dateFrom,
            dateTo: dateTo,
          },
        },
      })
      .then((result) => {
        setTotalCount(result.data.findAllProduct.content.length);
      })
      .catch((error) => {
        console.log("CATCH:");
      });
    props.apolloClient.httpClient
      .query({
        query: GET_All_PRODUCTS,
        variables: {
          request: {
            type: type,
            keyword: keywords,
            page: p,
            limit: rpp,
            sort: sort,
            order: "DESC",
            marketId: null,
            categoryId: categoryId,
            dateType: "createdDate",
            dateFrom: dateFrom,
            dateTo: dateTo,
          },
        },
      })
      .then((result) => {
        setState({
          ...state,
          sProducts: result.data.findAllProduct.content,
        });
        setCheckedItems([]);
        //setPage(1);
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

  /**
   * @summary On change category
   * @param {MouseEvent} event
   */

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
        <form onSubmit={addProducts.bind(this)}>
          <SortRow
            totalCount={totalCount}
            listSort={listSort}
            handleChangeSort={handleChangeSort}
            rowsPerPage={rowsPerPage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />

          <Grid container spacing={3} md={12} xs={12} className="mt-20">
            <Grid item md={12} xs={12}>
              <Table className="order_table">
                <TableBody>
                  <TableRow>
                    <TableCell className="text-center" width="2%">
                      <strong>No.</strong>
                    </TableCell>
                    <TableCell className="text-center" width="2%">
                      <strong>선택</strong>
                    </TableCell>
                    <TableCell className="text-center" width="8%">
                      <strong>상품번호</strong>
                    </TableCell>
                    <TableCell className="text-center" width="8%">
                      <strong>공급사 상품 바코드</strong>
                    </TableCell>
                    <TableCell className="text-center" width="">
                      <strong>카테고리</strong>
                    </TableCell>
                    <TableCell className="text-center" width="8%">
                      <strong>이미지</strong>
                    </TableCell>
                    <TableCell className="text-center" width="15%">
                      <strong>상품명</strong>
                    </TableCell>
                    <TableCell className="text-center" width="10%">
                      <strong>브랜드명</strong>
                    </TableCell>
                    <TableCell className="text-center" width="5%">
                      <strong>수수료(%)</strong>
                    </TableCell>
                    <TableCell className="text-center" width="6%">
                      <strong>판매가</strong>
                    </TableCell>
                    <TableCell className="text-center" width="10%">
                      <strong>가이드 등록일</strong>
                    </TableCell>
                    <TableCell className="text-center" width="10%">
                      <strong>최종수정일</strong>
                    </TableCell>
                  </TableRow>
                  {state.sProducts.map((el, index) => (
                    <AllProductItem
                      key={el.id}
                      el={el}
                      index={index}
                      checkedItems={checkedItems}
                      handleChange={handleChange}
                    />
                  ))}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </form>
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
      </div>
    </React.Fragment>
  );
};

// Redux state to props
const mapStateToProps = (state) => {
  return {
    apolloClient: state.apolloClient,
  };
};

export default withSnackbar(connect(mapStateToProps, null)(ProductAllList));
