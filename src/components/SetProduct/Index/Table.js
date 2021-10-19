import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PaginationMaterial from "@material-ui/lab/Pagination";
import CheckIcon from "@material-ui/icons/Check";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import SettingsIcon from "@material-ui/icons/Settings";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  Card,
  CardActions,
  CardContent,
  Collapse,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  FormControl,
  IconButton,
  TextField,
  Grid,
  Select,
  MenuItem,
  Box,
  Avatar,
  Typography,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { DELETE_SET_PRODUCT } from "../Queries";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function deleteSetProduct(e, apolloClient, enqueueSnackbar, code, refetch) {
  
  apolloClient.httpClient
    .mutate({
        mutation: DELETE_SET_PRODUCT,
        variables: {
            code: code,
        },
    })
    .then((result) => {
        if (result.data.deleteSetProduct.statusCode === 200) {
          enqueueSnackbar(
            "Set product has been successfully deleted.",
            {
                variant: "success",
            }
          );

          refetch();
        } 
    })
    .catch((error) => {
      enqueueSnackbar(
        "Error to delete.",
        {
            variant: "error",
        }
      );
    })
}

function Row(props) {
  const { item, apolloClient, enqueueSnackbar } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow key={item.code}>
        <TableCell>
          {item.products.length > 1 ? (
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          ) : null}
        </TableCell>
        <TableCell>
          {item.productName}
          <br />
          {item.firstCategoryName +
            ">" +
            item.secondCategoryName +
            ">" +
            item.thirdCategoryName}
        </TableCell>
        <TableCell>{item.products[0].sku}</TableCell>
        <TableCell>{item.products[0].firstTheme}</TableCell>
        <TableCell>{item.products[0].secondTheme}</TableCell>
        <TableCell>
          <IconButton
            color="primary"
            aria-label="Product modification"
            alt="Product modification"
            id={item.code}
            href={"/setproduct/form/" + item.code}
          >
            <CreateIcon />
          </IconButton>
          
          <IconButton
            color="primary"
            aria-label="delete set product"
            alt="delete set product"
            onClick={(e) => deleteSetProduct(e, apolloClient, enqueueSnackbar, item.code, props.refetch)}
          >
            <DeleteIcon/>
          </IconButton>
        
        </TableCell>
      </TableRow>

      {item.products.length > 1 ? (
        <TableRow>
          <TableCell
            colSpan={6}
            className="customCell"
            style={{ padding: "0 !important" }}
          >
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Table>
                <TableBody>
                  {(item.products || [])
                    .slice(1)
                    .map((product, productIindex) => (
                      <TableRow key={product.productId}>
                        <TableCell style={{ width: "10%" }}></TableCell>
                        <TableCell style={{ width: "40%" }}></TableCell>
                        <TableCell style={{ width: "20%" }}>
                          {product.sku}
                        </TableCell>
                        <TableCell style={{ width: "10%" }}>
                          {" " + product.firstTheme}
                        </TableCell>
                        <TableCell style={{ width: "10%" }}>
                          {" " + product.secondTheme}
                        </TableCell>
                        <TableCell style={{ width: "10%" }}></TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Collapse>
          </TableCell>
        </TableRow>
      ) : null}
    </React.Fragment>
  );
}

/**
 * @summary Set Product list table
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Set Product
 */
class ProductTable extends React.Component {
  /**
   * @override
   */
  render() {
    return (
      <React.Fragment>
        <Card className="customListTable mt-20">
          {/* Rows per page */}
          <CardActions>
            <Grid container>
              <Grid item xs={12} className="text-right">
                {/* <span className="sort-by-product">Sort by: </span>
                <FormControl size="small" variant="outlined">
                  <Select
                    labelId="sort-simple-select-label"
                    id="sort-simple-select"
                    onChange={this.props.handleOrderByProduct} 
                    value={this.props.orderBy}>
                    <MenuItem value="createdDate">Date</MenuItem>
                    <MenuItem value="code">Code</MenuItem>
                  </Select>
                </FormControl> 
                <span className="rows-per-page">Rows per page: </span>
                <FormControl size="small" variant="outlined">
                  <Select
                    labelId="rows-simple-select-label"
                    id="rows-simple-select"
                    onChange={this.props.handleRowsPerPage}
                    value={this.props.pagination.rowsPerPage}
                  >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                  </Select>
                </FormControl>*/}
              </Grid>
            </Grid>
          </CardActions>

          {/* List */}
          <CardContent>
            <PerfectScrollbar>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: "10%" }}></TableCell>
                    <TableCell style={{ width: "40%" }}>
                      Product name, Category
                    </TableCell>
                    <TableCell style={{ width: "20%" }}>SKU</TableCell>
                    <TableCell style={{ width: "10%" }}>Theme 1</TableCell>
                    <TableCell style={{ width: "10%" }}>Theme 2</TableCell>
                    <TableCell style={{ width: "10%" }} className="action-cell">
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(this.props.data.getProductsOfSetAdmin.list || []).map(
                    (item, index) => (
                      <Row key={item.productName} item={item} apolloClient={this.props.apolloClient} enqueueSnackbar={this.props.enqueueSnackbar} refetch={this.props.refetch} />
                    )
                  )}
                </TableBody>
              </Table>
            </PerfectScrollbar>
          </CardContent>
        </Card>

        {/* Pagination  */}

        <Grid container className="mt-20">
          <Grid item xs={12}>
            <PaginationMaterial
              count={Math.ceil(
                this.props.data.getProductsOfSetAdmin.totalElements /
                  this.props.pagination.rowsPerPage
              )}
              page={this.props.pagination.pageNumber}
              onChange={this.props.handlePageNumber}
              color="primary"
            />
          </Grid>
        </Grid>
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

export default withSnackbar(connect(mapStateToProps, null)(ProductTable));