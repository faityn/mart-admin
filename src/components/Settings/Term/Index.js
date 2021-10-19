import React from "react";
import { GET_TERM, SAVE_TERM } from "../../Queries/Queries";
import { withSnackbar } from "notistack";
import PageTitle from "../../../core/common/Partials/PageTitle";
import { connect } from "react-redux";
import TermForm from "./Form";
import SubjectIcon from '@material-ui/icons/Subject';
import SaveIcon from "@material-ui/icons/Save";
import { CircularProgress, Grid, Button, Divider } from "@material-ui/core";

class Term extends React.Component {
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
        query: GET_TERM,
      })
      .then((result) => {
        this.setState({
          text: result.data.getTerm,
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
    let termInput = {
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
        mutation: SAVE_TERM,
        variables: {
          termInput: termInput,
        },
      })
      .then((result) => {
        if (result.data.saveTerm.statusCode === 200) {
          this.props.enqueueSnackbar(
            "Terms and Conditions has been successfully updated.",
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
              menuName="Terms and Conditions setting"
              title="Terms and Conditions setting"
              icon={<SubjectIcon />}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item md={8}>
            <div className="card mt-20">
              <form id="form-submit" onSubmit={this.onHandleSubmit}>
                <TermForm data={this.state.text} />

                <Grid container spacing={3} className="mt-20">
                  <Grid item md={12} xs={12}>
                    <Button
                      form="form-submit"
                      variant="contained"
                      size="small"
                      color="primary"
                      type="submit"
                      disabled={this.state.isProcessing}
                      startIcon={
                        this.state.isProcessing ? (
                          <CircularProgress color="white" size="1rem" />
                        ) : (
                          <SaveIcon fontSize="small" className="mr-10" />
                        )
                      }
                    >
                      SAVE
                    </Button>
                  </Grid>
                </Grid>
              </form>
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

export default withSnackbar(connect(mapStateToProps, null)(Term));
