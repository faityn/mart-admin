import React from "react";
import PageTitle from "../../../core/common/Partials/PageTitle";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import SubjectIcon from '@material-ui/icons/Subject';
import SearchIcon from '@material-ui/icons/Search';
import FilterIcon from '@material-ui/icons/FilterList';
import { CircularProgress, Grid, Button, Table, TableBody, TableRow, TableCell, TextField} from "@material-ui/core";

class OperatorRole extends React.Component {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    // state
    this.state = {
      isProcessing: false,
      text: null,
    };

    // Events
    this.onHandleSubmit = this.onHandleSubmit.bind(this);

    this._isMounted = false;
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
              menuName="080 수신거부 리스트"
              title="080 수신거부 리스트"
              icon={<SubjectIcon />}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item md={12}>
            <div className="card mt-20">
            <Grid item spacing={2} md={12} xs={12}>
              <Grid container>
                <Grid container spacing={2} md={8} xs={12} className="align-items-center">
                  <Grid item md={2} xs={12}>
                      <h5>수신거부 번호</h5>
                  </Grid>
                  <Grid item md={6} sm={4} xs={12}>
                    <TextField
                        fullWidth
                        label="번호"
                        size="small"
                        variant="outlined"
                    />
                  </Grid>
                  <Grid item md={2} xs={12} style={{marginLeft: "10px"}}>
                    <Button
                        size="medium"
                        variant="contained"
                        color="primary"
                        startIcon={<SearchIcon/>}
                    >검색</Button>
                  </Grid>  
                </Grid> 
                <Grid item md={2} xs={12}></Grid>
                <Grid item md={2} xs={12} style={{textAlign: "right"}} className="align-items-center">
                  <Button
                      size="medium"
                      variant="contained"
                      color="primary"
                      startIcon={<FilterIcon/>}>수동동기화</Button>
                </Grid> 
              </Grid>
            </Grid>

            <Grid item md={12} xs={12} className="mt-20">
              <Table className="order_table">
                <TableBody>
                  <TableRow>
                    <TableCell align="center"><strong>번호</strong></TableCell>
                    <TableCell align="center"><strong>수신거부 번호</strong></TableCell>
                    <TableCell align="center"><strong>등록일</strong></TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell align="center" colspan={3}>검색결과가 없습니다.</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>
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

export default withSnackbar(connect(mapStateToProps, null)(OperatorRole));
