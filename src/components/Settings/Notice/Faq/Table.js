import React from "react";
import { GET_FAQ_CATEGORIES } from "../Queries";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import PerfectScrollbar from "react-perfect-scrollbar";
import PaginationMaterial from "@material-ui/lab/Pagination";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { cdnUrl } from "../../../../core/common/variables";
import moment from "moment";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from "@material-ui/core";
import { Link } from "react-router-dom";

/**
 * @summary Notice list table
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Notice
 */
class NoticeTable extends React.Component {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    // Merge search states
    this.state = {
      notices: {
        list: [],
      },
      search: {},
      pagination: {
        rowsPerPage: 10,
        pageNumber: 1,
      },
      orderBy: "createdDate",
      type: "DESC",
    };
  }

  /**
   * @override
   */
  render() {

    return (
      <React.Fragment>
        <Card className="mt-20">
          {/* List */}
          <CardContent>
            <PerfectScrollbar>
              <div className="customListTable mt-20">
                {(this.props.data.getFaqs.list || []).map((item, index) => (
                  <Accordion key={item.id}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={"panel-content-" + index}
                      id={"panel-header-" + index}
                    >
                      <Typography>{item.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography>
                            <div
                              dangerouslySetInnerHTML={{
                                __html: item.description,
                              }}
                            ></div>
                          </Typography>
                        </Grid>
                        <Grid item xs={12} className="text-right">
                          <Link to={"/settings-faq/form/" + item.id}>
                            <Button
                              variant="contained"
                              color="default"
                              size="small"
                            >
                              Edit
                            </Button>
                          </Link>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </div>
            </PerfectScrollbar>
          </CardContent>
        </Card>

        {/* Pagination  */}
        <Grid container className="mt-20">
          <Grid item xs={12}>
            <PaginationMaterial
              count={Math.ceil(
                this.props.data.getFaqs.totalElements /
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

// Redux state to props
const mapStateToProps = (state) => {
  return {
    apolloClient: state.apolloClient,
  };
};

export default withSnackbar(connect(mapStateToProps, null)(NoticeTable));
