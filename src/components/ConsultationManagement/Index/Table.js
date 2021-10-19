import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PaginationMaterial from "@material-ui/lab/Pagination";
import CheckIcon from "@material-ui/icons/Check";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import SettingsIcon from "@material-ui/icons/Settings";
import CreateIcon from "@material-ui/icons/Create";
import { cdnUrl } from "../../../core/common/variables";
import moment from 'moment';
import {
  Card,
  CardActions,
  CardContent,
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
import {Link} from 'react-router-dom';

/**
 * @summary Consult list table
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package ConsultationManagement
 */
class ConsultTable extends React.Component {
  /**
   * @override
   */
  render() {
    return (
      <React.Fragment>
        <Card className="customListTable mt-20">
          {/* List */}
          <CardContent>
            <PerfectScrollbar>
              <div>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>№</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {(this.props.data.getQnas.list || []).map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          {this.props.pagination.pageNumber *
                            this.props.pagination.rowsPerPage -
                            this.props.pagination.rowsPerPage +
                            index +
                            1}
                        </TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.title}</TableCell>
                        <TableCell>{moment(item.createdDate).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                        <TableCell>{item.username}</TableCell>
                        <TableCell>{item.status === "ANSWERING" ? "RESPONSE NEEDED" : item.status }</TableCell>
                        <TableCell>
                          <Link to={"/consult/edit/" + item.id}>
                            <IconButton
                              color="primary"
                              aria-label="User chat"
                              alt="User chat"
                              id={item.id}
                            >
                              <CreateIcon />
                            </IconButton>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </PerfectScrollbar>
          </CardContent>
        </Card>

        {/* Pagination  */}
        <Grid container className="mt-20">
          <Grid item xs={12}>
            <PaginationMaterial
              count={Math.ceil(
                this.props.data.getQnas.totalElements /
                  this.props.pagination.rowsPerPage
              )}
              page={this.props.pagination.pageNumber}
              onChange={this.props.handlePageNumber}
              color="primary"
              boundaryCount={100}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default ConsultTable;
