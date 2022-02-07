import React, { useState, useEffect } from "react";
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
import dateFormat from "dateformat";
const ProductItem = (props) => {
  //   const [isChecked, setChecked] = useState(false);
  //console.log("CHILD: ", props.checkedItems);
  const fetchData = (p, rpp) => {
    console.log(p);
    props.apolloClient.httpClient
      .query({
        query: GET_All_PRODUCTS,
        variables: {
          request: {
            page: 0,
            limit: 1000000000,
            type: state.type,
            keyword: state.keyword,
            sort: "createdDate",
            order: "DESC",
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
            type: state.type,
            keyword: state.keyword,
            page: p,
            limit: rpp,
            sort: "id",
            order: "DESC",
            dateType: null,
            marketId: null,
            categoryId: null,
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
  return (
    <TableRow>
      <TableCell className="text-center">{props.el.id}</TableCell>
      <TableCell className="text-center">
        <Checkbox
          color="primary"
          value={props.el.id}
          checked={
            props.checkedItems.find((item) => item === props.el.id) !==
            undefined
          }
          onChange={() => props.handleChange(event, props.el.id)}
        />
      </TableCell>
      <TableCell className="text-center">{props.el.code}</TableCell>
      <TableCell className="text-center">{props.el.barcode}</TableCell>
      <TableCell className="text-center">{props.el.categoryName}</TableCell>
      <TableCell className="text-center">
        <CardMedia
          component="img"
          height="50"
          src={`http://ahuyndoghxay9281829.cdn.ntruss.com/${props.el.images[0]}?type=m&w=100&h=100`}
        />
      </TableCell>
      <TableCell className="text-center">
        <Link to="/product-detail" className="text-blue">
          {props.el.name}
        </Link>
      </TableCell>
      <TableCell className="text-center">{props.el.brand}</TableCell>
      <TableCell className="text-center">{props.el.tax}</TableCell>
      <TableCell className="text-center">{props.el.defaultPrice}</TableCell>
      <TableCell className="text-center">
        {dateFormat(props.el.createdDate, "yyyy-mm-dd HH:MM:ss")}
      </TableCell>
      <TableCell className="text-center">
        {dateFormat(props.el.updatedDate, "yyyy-mm-dd HH:MM:ss")}
      </TableCell>
    </TableRow>
  );
};

export default ProductItem;
