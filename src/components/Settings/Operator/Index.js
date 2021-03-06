import React from "react";
import PageTitle from "../../../core/common/Partials/PageTitle";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import { Grid, Button, Table, TableBody, TableRow, TableCell, FormControl, TextField, Select, MenuItem, InputLabel, FormControlLabel, Checkbox, Switch,
  Dialog, DialogTitle, DialogContent, DialogActions, Divider} from "@material-ui/core";
import SubjectIcon from '@material-ui/icons/Subject';
import CreateIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';

class Operator extends React.Component {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    // state
    this.state = {
      isProcessing: false,
      text: null,
      isOpenModal: false,
    };

    // Events
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);

    this._isMounted = false;
  }

  /**
   * @summary Open box
   * @param {event}
   */
  onOpenModal(e) {
      this.setState({
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

  /**
   * @override
   */
  async componentDidMount() {
    this._isMounted = true;

    await this.props.apolloClient.httpClient
      .query({
        query: GET_PRIVACY,
      })
      .then((result) => {
        this.setState({
          text: result.data.getPrivacy,
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
   * @summary Handle submit form
   * @param {MouseEvent} event
   */
  async onHandleSubmit(event) {
    event.preventDefault();

    if (this.state.isProcessing) return;

    // Form data
    const formData = new FormData(event.target);

    // Form data to object
    let privacyInput = {
      text: formData.get("text"),
    };

    this.setState({
      isProcessing: true,
    });

    this.props.enqueueSnackbar("The saving process is being started ...", {
      variant: "info",
    });

    // Mutate
    await this.props.apolloClient.httpClient
      .mutate({
        mutation: SAVE_PRIVACY,
        variables: {
          privacyInput: privacyInput,
        },
      })
      .then((result) => {
        if (result.data.savePrivacy.statusCode === 200) {
          this.props.enqueueSnackbar(
            "Privacy Policy has been successfully updated.",
            { variant: "success" }
          );
        } else {
          this.props.enqueueSnackbar(
            "Sorry, there is an error occurred while saving data.",
            { variant: "error" }
          );
        }
      })
      .catch((error) => {
        this.props.enqueueSnackbar(
          "Sorry, there is an error occurred while saving data.",
          { variant: "error" }
        );
      });

    this._isMounted &&
      this.setState({
        isProcessing: false,
      });
  }

  render() {
    return (
      <React.Fragment>
        {/* Title section */}
        <Grid container>
          <Grid item>
            {/* Title */}
            <PageTitle
              menuName="????????? ??????"
              title="????????? ??????"
              icon={<SubjectIcon />}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item md={12}>
            <div className="card mt-20">
            <Grid container spacing={2} md={12} xs={12}>
              <Grid container spacing={3} alignItems="center" md={3} xs={12}>
                <Grid item md={3} xs={12} className="align-items-center">
                    <h5>????????????</h5>
                </Grid>
                <Grid item md={6} sm={4} xs={12}>
                  <FormControl
                      size="small"
                      fullWidth
                      variant="outlined"
                      defaultValue=""
                  >
                    <InputLabel>????????????</InputLabel>
                    <Select>
                        <MenuItem value="general">???????????????</MenuItem>
                        <MenuItem value="simple">???????????????</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>   
              
              <Grid container spacing={3} alignItems="center" md={3} xs={12}>
                <Grid item md={3} xs={12} className="align-items-center">
                    <h5>??????</h5>
                </Grid>
                <Grid item md={6} sm={4} xs={12}>
                  <FormControl
                      size="small"
                      fullWidth
                      variant="outlined"
                  >
                    <InputLabel>????????????</InputLabel>
                    <Select>
                        <MenuItem value="1">?????????</MenuItem>
                        <MenuItem value="0">?????? ??????</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid> 
              
              <Grid container spacing={3} alignItems="center" md={5} xs={12}>
                <Grid item md={2} xs={12} className="align-items-center">
                    <h5>??????</h5>
                </Grid>
                <Grid item md={3} sm={4} xs={12}>
                  <FormControl
                      size="small"
                      fullWidth
                      variant="outlined"
                      defaultValue=""
                  >
                    <InputLabel>?????????ID</InputLabel>
                    <Select>
                        <MenuItem value="id">?????????ID </MenuItem>
                        <MenuItem value="name">????????????</MenuItem>
                        <MenuItem value="region">??????</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={5} xs={12}>
                    <TextField
                        fullWidth
                        size="small"
                        variant="outlined"
                    />
                </Grid>
                <Grid item md={2} xs={12} style={{paddingLeft: "10px"}}>
                  <Button
                      fullWidth
                      size="medium"
                      variant="contained"
                      color="primary"
                      startIcon={<SearchIcon/>}
                  >??????</Button>
                </Grid>
              </Grid> 
            </Grid>

            <Grid item md={12} xs={12} alignItems="right" className="mt-20">
              <Button
                  size="medium"
                  variant="contained"
                  color="primary"
                  startIcon={<CreateIcon/>}
                  onClick={this.onOpenModal.bind(this)}
              >????????? ??????</Button>
            </Grid>

            <Grid item md={12} xs={12} className="mt-20">
              <Table className="order_table">
                <TableBody>
                  <TableRow>
                    <TableCell align="center" width="5%">No.</TableCell>
                    <TableCell align="center" width="5%">??????</TableCell>
                    <TableCell align="center">???????????????</TableCell>
                    <TableCell align="center">??????</TableCell>
                    <TableCell align="center">????????????</TableCell>
                    <TableCell align="center">?????????ID</TableCell>
                    <TableCell align="center">?????????</TableCell>
                    <TableCell align="center">?????????</TableCell>
                    <TableCell align="center">??????</TableCell>
                    <TableCell align="center" width="10%">??????</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell align="center">1</TableCell>
                    <TableCell align="center">
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="active"
                            color="primary"
                            value={true}
                          />
                        }
                        style={{marginLeft: "18%"}}
                      /></TableCell>
                    <TableCell align="center">???????????????</TableCell>
                    <TableCell align="center">????????????</TableCell>
                    <TableCell align="center">?????? ?????????</TableCell>
                    <TableCell align="center">Admin</TableCell>
                    <TableCell align="center">000-0000-0000</TableCell>
                    <TableCell align="center">010-0000-0000</TableCell>
                    <TableCell align="center">
                      <FormControlLabel
                        control={
                          <Switch
                            name="checkedB"
                            color="primary"
                          />
                        }
                        label="On/Off"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Button
                          size="small"
                          variant="contained"
                          color="primary"
                          startIcon={<EditIcon/>}
                          onClick={this.onOpenModal.bind(this)}
                      >??????</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
            
            <Dialog
                open={this.state.isOpenModal}
                aria-labelledby="responsive-dialog-title"
                maxWidth="lg"
            >
                {/* Title */}
                <DialogTitle id="responsive-dialog-title">
                    <h4>?????? ??????/??????</h4>
                </DialogTitle>
                <Divider />

                <DialogContent>
                  <form md={12} xs={12}>
                    <Grid spacing={2} alignItems="center">
                      <Grid container md={12} xs={12}>
                        <Grid md={2} xs={12} className="text-center">
                          <h5>????????? ID</h5>
                        </Grid>
                        <Grid md={4} xs={12}>
                          <TextField
                              fullWidth
                              size="small"
                              variant="outlined"
                          /></Grid>
                        <Grid md={3} xs={12} className="text-center">
                          <h5>????????????</h5>
                        </Grid>
                        <Grid md={3} xs={12}>
                          <FormControl
                              size="small"
                              fullWidth
                              variant="outlined"
                          >
                            <Select>
                                <MenuItem value="1">?????????</MenuItem>
                                <MenuItem value="0">?????? ??????</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                      
                      <Grid container md={12} xs={12} className="mt-12">
                        <Grid md={2} xs={12} className="text-center">
                          <h5>????????????</h5>
                        </Grid>
                        <Grid md={4} xs={12}>
                          <TextField
                              fullWidth
                              size="small"
                              variant="outlined"
                          />
                        </Grid>
                        <Grid md={3} xs={12} className="text-center">
                          <h5>???????????? ??????</h5>
                        </Grid>
                        <Grid md={3} xs={12}>
                          <TextField
                              fullWidth
                              size="small"
                              variant="outlined"
                          />
                        </Grid>
                      </Grid>
                      
                      <Grid container md={12} xs={12} className="mt-12">
                        <Grid md={2} xs={12} className="text-center">
                          <h5>????????????</h5>
                        </Grid>
                        <Grid md={4} xs={12}>
                          <TextField
                              fullWidth
                              size="small"
                              variant="outlined"
                          />
                        </Grid>
                        <Grid md={3} xs={12} className="text-center">
                          <h5>??????</h5>
                        </Grid>
                        <Grid md={3} xs={12}>
                          <TextField
                              fullWidth
                              size="small"
                              variant="outlined"
                          />
                        </Grid>
                      </Grid>
                      
                      <Grid container md={12} xs={12} className="mt-12">
                        <Grid md={2} xs={12} className="text-center">
                          <h5>????????????</h5>
                        </Grid>
                        <Grid md={4} xs={12}>
                          <TextField
                              fullWidth
                              size="small"
                              variant="outlined"
                          />
                        </Grid>
                        <Grid md={3} xs={12} className="text-center">
                          <h5>???????????????</h5>
                        </Grid>
                        <Grid md={3} xs={12}>
                          <TextField
                              fullWidth
                              size="small"
                              variant="outlined"
                          />
                        </Grid>
                      </Grid>
                      
                      <Grid container md={12} xs={12} className="mt-12">
                        <Grid md={2} xs={12} className="text-center">
                          <h5>?????????</h5>
                        </Grid>
                        <Grid md={10} xs={12}>
                          <TextField
                              fullWidth
                              size="small"
                              variant="outlined"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </form>
                </DialogContent>

                <Divider />

                <DialogActions>
                    <Button
                        autoFocus
                        size="small"
                        variant="contained"
                        color="primary"
                        form="product-form"
                        type="submit"
                        startIcon={<SaveIcon/>}
                    >
                        ??????
                    </Button>
                    <Button
                        autoFocus
                        size="small"
                        variant="contained"
                        style={{ border: "1px solid #cccbcb" }}
                        startIcon={<CancelIcon/>}
                        onClick={this.onCloseModal.bind(this)}
                    >
                        ??????
                    </Button>
                </DialogActions>
            </Dialog>
            </div>
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

export default withSnackbar(connect(mapStateToProps, null)(Operator));
