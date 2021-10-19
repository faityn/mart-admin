import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PaginationMaterial from "@material-ui/lab/Pagination";
import CheckIcon from "@material-ui/icons/Check";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import SettingsIcon from "@material-ui/icons/Settings";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from 'moment';
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

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function Row(props) {
  const { item } = props;
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
        <TableCell>{moment(item.createdDate).format('YYYY-MM-DD')}</TableCell>
        <TableCell>{item.productName}</TableCell>
        <TableCell>{item.products[0].sku}</TableCell>
        <TableCell>{item.products[0].firstTheme}</TableCell>
        <TableCell>{item.products[0].secondTheme}</TableCell>
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
    const items = "";

    return (
      <React.Fragment>
        <Card className="customListTable mt-20">
          <CardActions>
            <Grid container>
              <Grid item xs={12}>
                <h2 style={{marginLeft: "15px"}}>Settlement</h2>
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
                    <TableCell style={{ width: "10%" }}>Date</TableCell>
                    <TableCell style={{ width: "40%" }}>Product</TableCell>
                    <TableCell style={{ width: "20%" }}>Summary</TableCell>
                    <TableCell style={{ width: "10%" }}>Sales</TableCell>
                    <TableCell style={{ width: "10%" }}>Balance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(this.props.data.getProductsOfSetAdmin.list || []).map(
                    (item, index) => (
                      <Row key={item.productName} item={item} />
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

export default ProductTable;
