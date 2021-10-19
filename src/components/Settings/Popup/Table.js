import React from "react";
import { GET_POPUPS, GET_POPUP, SAVE_POPUP, UPLOAD_POPUP, DELETE_POPUP } from "./Queries";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import PerfectScrollbar from "react-perfect-scrollbar";
import PaginationMaterial from "@material-ui/lab/Pagination";
import SaveIcon from "@material-ui/icons/Save";
import AddIcon from "@material-ui/icons/Add";
import moment from "moment";
import {
  Card,
  CardContent,
  Dialog,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  Button,
  IconButton,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Typography,
  DialogContent,
  FormHelperText 
} from "@material-ui/core";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import validate from "validate.js";
import { Delete } from "@material-ui/icons";

/**
 * @summary Popup list table
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Popup
 */
class PopupTable extends React.Component {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    // Merge search states
    this.state = {
      popups: {
        list: [],
      },
      search: {},
      pagination: {
        rowsPerPage: 10,
        pageNumber: 1,
      },
      orderBy: "createdDate",
      type: "DESC",
      checkedItems: [],
      isProcessing: false,
      isOpenModal: false,
      popup: {},
      attach: "",
      errors: null,
    };

    // Bind event
    
    this.inputReference = React.createRef();
    this.onProcessStart = this.onProcessStart.bind(this);
    this.onProcessEnd = this.onProcessEnd.bind(this);
    this.editPopup = this.editPopup.bind(this);
  }

  /**
     * @summary Check errors
     * @param {String} field
     */
   hasError(field) {
    return this.state.errors && this.state.errors[field] ? true : false;
}

/**
 * @summary Validate coupon
 * @param {Object} coupon
 */
onValidateSubmit(coupon) {
    const schema = {
        name: {
            presence: {
                allowEmpty: false,
                message: "^Name field is required.",
            },
        },
        url: {
            presence: {
                allowEmpty: false,
                message: "^Page url field is required.",
            },
        },
        imageUrl: {
          presence: {
            allowEmpty: true,
            message: "^Image url field is required.",
          },
        },
        startDate: {
            presence: {
                allowEmpty: false,
                message: "^Start date field is required.",
            },
        },
        endDate: {
            presence: {
                allowEmpty: false,
                message: "^End date field is required.",
            },
        },
        active: {
            presence: {
                allowEmpty: false,
                message: "^Choose type field is required.",
            },
        },
    };

    // Validate
    const errors = validate(coupon, schema);

    this.setState({
      errors: errors,
    });

    return errors;
}

  /**
   * @summary Load popups
   */
  async loadPopups() {
    await this.props.apolloClient.httpClient
      .query({
        query: GET_POPUPS,
        variables: {
          search: this.state.search,
          page: {
            limit: this.state.pagination.rowsPerPage,
            pageNumber: this.state.pagination.pageNumber,
            orderBy: this.state.orderBy,
            type: this.state.type,
          },
        },
      })
      .then((result) => {
        this.setState({
          popups: result.data.getPopups,
        });
      })
      .catch((error) => {
        this.props.enqueueSnackbar(
          "Sorry, there is an error occurred while fetching data.",
          { variant: "error" }
        );
      });
  }

  /**
   * @override
   */
  async componentDidMount() {
    // Get Popups
    this.loadPopups();
  }

  /**
   * @summary Process start
   */
  onProcessStart() {
    this.setState({
      isProcessing: true,
    });
  }


  /**
   * @summary Process end
   */
  onProcessEnd() {
    this.setState({
      isProcessing: false,
    });
  }

  /**
   * @summary toggleItem
   * @param {Boolean} toggleItem
   */
  async editPopup(e, id) {
    // Mutate
    await this.props.apolloClient.httpClient
      .mutate({
        mutation: GET_POPUP,
        variables: {
          "id": id
        },
      })
      .then((result) => {
        this.setState({
          popup: result.data.getPopup,
        });
      })
      .catch((error) => {
        this.props.enqueueSnackbar(
          "Sorry, there is an error occurred while saving data.",
          { variant: "error" }
        );
      });

      this.onModelOpen();
  }

  
  onModelOpen(e) {
    this.setState({
      isOpenModal: true,
    });
  }

  onModelClose(e) {
    this.setState({
      isOpenModal: false,
      popup: {},
      errors: null,
    });
  }

  async onHandleSubmit(event) {
    event.preventDefault();

    // Form data
    const formData = new FormData(event.target);
    let id = formData.get("id");
    let name = formData.get("name");
    let url = formData.get("url");
    let startDate = formData.get("startDate");
    let endDate = formData.get("endDate");
    let active = formData.get("use");

    let popup = {
      "id": id,
      "name" : name,
      "imageUrl": this.state.popup.imageUrl ? this.state.popup.imageUrl : null,
      "url": url,
      "startDate": startDate,
      "endDate": endDate + "T23:59:59Z",
      "active": active
    }

    // Validate
    if (this.onValidateSubmit(popup)) return;

    this.props.enqueueSnackbar(
      "The process is being started ...",
      {
        variant: "info",
      }
    );

    // Mutate
    await this.props.apolloClient.httpClient
      .mutate({
        mutation: SAVE_POPUP,
        variables: {
          popup: popup
        },
      })
      .then((result) => {
        if(result.data.savePopup.statusCode === 200) {
          this.props.enqueueSnackbar("Successfully updated.", { variant: "success" });
          this.loadPopups();
        }
      })
      .catch((error) => {
        this.props.enqueueSnackbar(
          "Sorry, there is an error occurred while saving data.",
          { variant: "error" }
        );
      });

      this.onModelClose();
  }

  /**
   * @summary File upload
   * @param {uploadClient} file
   */
   async onFileUpload(event) {
    event.preventDefault();

    this.onProcessStart();

    let image = event.target.files[0];

    // console.log(image)

    await this.props.apolloClient.uploadClient
      .mutate({
        mutation: UPLOAD_POPUP,
        variables: { image: image },
      })
      .then((result) => {
        if (result.data.uploadImagePopup.statusCode === 200) {
          this.onAddAttachment(result.data.uploadImagePopup.data);
          console.log(result.data.uploadImagePopup.data)
          this.props.enqueueSnackbar(
            "The uploading process has been completed successfully.",
            { variant: "success" }
          );
        }
      }).catch((error) => {
        this.props.enqueueSnackbar(
          "Sorry, there is an error occurred while upload file.",
          { variant: "error" }
        );
      });

      this.onProcessEnd();
  }

  /**
   * @summary Add attachment
   * @param {String} imageUrl
   */
  onAddAttachment(imageUrl) {
    this.setState({
      popup: {
        "id": this.state.popup.id,
        "name" : this.state.popup.name,
        "imageUrl": imageUrl,
        "url": this.state.popup.url,
        "startDate": this.state.popupstartDate,
        "endDate": this.state.popup.endDate,
        "active": this.state.popup.active
      },
    });
  }

  /**
   * @summary Add attachment
   * @param {String} imageUrl
   */
   onhandleChange(e) {
    this.setState({
      popup: {
        "id": this.state.popup.id,
        "name" : this.state.popup.name,
        "imageUrl": this.state.popup.imageUrl,
        "url": this.state.popup.url,
        "startDate": this.state.popupstartDate,
        "endDate": this.state.popup.endDate,
        "active": e.target.value
      },
    });
  }

  /**
   * @summary Delete
   * @param {String} imageUrl
   */
  async onhandleDelete(e, id) {
    e.preventDefault();

    this.onProcessStart();

    this.props.enqueueSnackbar(
      "The process is being started ...",
      {
        variant: "info",
      }
    );

    await this.props.apolloClient.uploadClient
      .mutate({
        mutation: DELETE_POPUP,
        variables: { id: id },
      })
      .then((result) => {
        if (result.data.deletePopup.statusCode === 200) {
          this.props.enqueueSnackbar(
            "The uploading process has been completed successfully deleted.",
            { variant: "success" }
          );
        }
      }).catch((error) => {
        this.props.enqueueSnackbar(
          "Sorry, there is an error occurred while upload file.",
          { variant: "error" }
        );
      });

      this.onProcessEnd();
  }

  fileUploadAction = () => this.inputReference.current.click();

  /**
   * @override
   */
  render() {
    return (
      <React.Fragment>
        <Card className="mt-20">
          {/* List */}
          <CardContent>
            <Grid container>
              {/* Button section */}
              <Grid item xs={12} className="text-right">
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<AddIcon />}
                  className="ml-20"
                  onClick={this.onModelOpen.bind(this)}
                >
                  New
                </Button>
              </Grid>
            </Grid>

            <PerfectScrollbar>
              <div className="customListTable mt-20">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Image</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Page URL</TableCell>
                      <TableCell>Whether to use</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {(this.state.popups.list || []).map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell><img
                            src={
                              process.env.REACT_APP_CDN_URL +
                              "ads/popup/" +
                              item.imageUrl
                            }
                            width="70px"
                          />
                        </TableCell>
                        <TableCell>{moment(item.startDate).format("YYYY-MM-DD")} ~ {moment(item.endDate).format("YYYY-MM-DD")}</TableCell>
                        <TableCell>{item.url}</TableCell>
                        <TableCell>{item.active === true ? "Use" : "Not use"}</TableCell>
                        <TableCell>
                          <IconButton aria-label="edit" onClick={(e) => this.editPopup(e, item.id)}>
                            <EditIcon fontSize="large" />
                          </IconButton>
                          <IconButton aria-label="delete" onClick={(e) => this.onhandleDelete(e, item.id)}>
                            <Delete fontSize="large" />
                          </IconButton>
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
                this.props.data.getPopups.totalElements /
                  this.props.pagination.rowsPerPage
              )}
              page={this.props.pagination.pageNumber}
              onChange={this.props.handlePageNumber}
              color="primary"
              boundaryCount={100}
            />
          </Grid>
        </Grid>


        {/* Popup */}
        <Dialog
          open={this.state.isOpenModal}
          aria-labelledby="responsive-dialog-title"
          fullWidth
          maxWidth="lg"
        >
          <DialogContent>
            {/* Content */}
            <form
              id="product-form"
              onSubmit={this.onHandleSubmit.bind(this)}
            >
              <input type="hidden" name="id" value={this.state.popup.id}/>
              <Grid container alignItems="center">
                <Grid item md={2} xs={12} className="align-items-center">
                  <Typography variant="caption" display="block" gutterBottom>
                    Name
                  </Typography>
                </Grid>
                <Grid item md={10} xs={12}>
                  <TextField fullwidth 
                    id="standard-basic" 
                    label="Enter name"
                    variant="outlined"
                    size="small"
                    name="name" 
                    defaultValue={this.state.popup.name}
                    error={this.hasError("name")}
                    helperText={
                      this.hasError("name")
                          ? this.state.errors["name"][0]
                          : null
                    }
                  />
                </Grid>
              </Grid>
              <Grid container alignItems="center" className="mt-20">
                <Grid item md={2} xs={12} className="align-items-center">
                  <Typography variant="caption" display="block" gutterBottom>
                    Page url
                  </Typography>
                </Grid>
                <Grid item md={10} xs={12}>
                  <TextField fullwidth 
                    id="standard-basic" 
                    variant="outlined"
                    size="small"
                    label="Enter url"
                    name="url" 
                    defaultValue={this.state.popup.url}
                    error={this.hasError("url")}
                    helperText={
                      this.hasError("url")
                          ? this.state.errors["url"][0]
                          : null
                    }
                  />
                </Grid>
              </Grid>
              <Grid container alignItems="center" className="mt-20">
                <Grid item md={2} xs={12} className="align-items-center">
                  <Typography variant="caption" display="block" gutterBottom>
                    Image
                  </Typography>
                </Grid>
                <Grid item md={10} xs={12}>
                  {
                    this.state.popup.imageUrl ? 
                    <img
                      src={
                        process.env.REACT_APP_CDN_URL +
                        "ads/popup/" +
                        this.state.popup.imageUrl
                      }
                      width="70px"
                    />
                    :
                      null
                  }
                  <input type="file" hidden ref={this.inputReference} onChange={this.onFileUpload.bind(this)} />
                  <Button onClick={this.fileUploadAction} disabled={this.state.isProcessing}>
                      Upload
                  </Button>
                  
                  {this.hasError("imageUrl") ? (
                    <FormHelperText>
                      {
                        this.state.errors[
                          "imageUrl"
                        ][0]
                      }
                    </FormHelperText>
                  ) : null}
                </Grid>
              </Grid>
              <Grid container alignItems="center" className="mt-20">
                <Grid item xs={2} className="align-items-center">
                  <Typography variant="caption" display="block" gutterBottom>
                    Whether to use
                  </Typography>
                </Grid>
                <Grid item xs={10}>
                  <FormControl variant="outlined" fullWidth size="small">
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      error={this.hasError("active")}
                      name="use"
                      value={this.state.popup.active}
                      onChange={this.onhandleChange.bind(this)}
                    >
                      <MenuItem value={true}>Use</MenuItem>
                      <MenuItem value={false}>Not use</MenuItem>
                    </Select>
                  </FormControl>
                  {this.hasError("active") ? (
                    <FormHelperText>
                      {
                        this.state.errors[
                          "active"
                        ][0]
                      }
                    </FormHelperText>
                  ) : null}
                </Grid>
              </Grid>
              <Grid container alignItems="center" className="mt-20">
                <Grid item xs={2} className="align-items-center">
                  <Typography variant="caption" display="block" gutterBottom>
                    Period
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    type="date"
                    name="startDate"
                    defaultValue={moment(this.state.popup.startDate).format(
                      "YYYY-MM-DD"
                    )}
                    error={this.hasError("startDate")}
                    helperText={
                      this.hasError("startDate")
                          ? this.state.errors["startDate"][0]
                          : null
                    }
                  />
                </Grid>
                <Grid item xs={2}>
                  <Typography align="center" variant="caption" display="block" gutterBottom>
                    ~
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    type="date"
                    name="endDate"
                    defaultValue={moment(this.state.popup.endDate, "YYYY-MM-DDTHH:mm:ssZ").format("YYYY-MM-DD")}
                    error={this.hasError("endDate")}
                    helperText={
                      this.hasError("endDate")
                          ? this.state.errors["endDate"][0]
                          : null
                    }
                  />
                </Grid>
              </Grid>
            </form>
          </DialogContent>
          {/* Actions */}
          <DialogActions>
            <Button
              color="primary"
              size="small"
              onClick={this.onModelClose.bind(this)}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              variant="contained"
              form="product-form"
              size="small"
              type="submit"
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
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

export default withSnackbar(connect(mapStateToProps, null)(PopupTable));