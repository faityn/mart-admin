import React from "react";
import PageTitle from "../../../../core/common/Partials/PageTitle";
import { Button, Grid, CircularProgress, Divider } from "@material-ui/core";
import MoneyIcon from '@material-ui/icons/Money';
import SaveIcon from "@material-ui/icons/Save";
import { GET_POINT, SAVE_POINT } from "../../../Queries/Queries";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import PointForm from "./Form";

/**
 * @summary Points
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Settings/Member/Points
 */
class Points extends React.Component {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    // state
    this.state = {
      point: null,
      isProcessing: false,
      errors: null,
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
        query: GET_POINT,
      })
      .then((result) => {
        this.setState({
          point: result.data.point,
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

    let id = this.state.point ? this.state.point.id : null;

    // Form data to object
    let point = {
      id: id,
      status: formData.get("status") === "Used" ? true : false,
      name: formData.get("name"),
      signup: formData.get("signup"),
      taken: formData.get("taken"),
      given: formData.get("given"),
      spend: formData.get("spend") === "true",
      photoReview: formData.get("photoReview"),
      textReview: formData.get("textReview"),
      isRegisterActive: formData.get("isRegisterActive"),
    };

    console.log("status : ", status);
    console.log("isRegisterActive : ", isRegisterActive);

    // let point = {
    //   id: id,
    //   status: formData.get("status"),
    //   name: formData.get("name"),
    //   signup: formData.get("signup"),
    //   taken: formData.get("taken"),
    //   given: formData.get("given"),
    //   spend: formData.get("spend"),
    //   photoReview: formData.get("photoReview"),
    //   textReview: formData.get("textReview"),
    // };

    this.setState({
      isProcessing: true,
    });

    this.props.enqueueSnackbar("The saving process is being started ...", {
      variant: "info",
    });

    // Mutate
    await this.props.apolloClient.httpClient
      .mutate({
        mutation: SAVE_POINT,
        variables: {
          point: point,
        },
      })
      .then((result) => {
        if (result.data.savePoint.statusCode === 200) {
          const message = id
            ? "Point has been successfully updated."
            : "Point has been successfully created.";
          this.props.enqueueSnackbar(message, { variant: "success" });
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
        id: id,
      });
  }

  /**
   * @override
   */
  render() {
    return (
      <React.Fragment>
        {/* Title section */}
        <Grid container>
          <Grid item>
            {/* Title */}
            <PageTitle
              menuName="Basic setting of points"
              title="Basic setting of points"
              icon={<MoneyIcon />}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item md={8}>
            <div className="card mt-20">
              <form id="form-submit" onSubmit={this.onHandleSubmit}>
                <PointForm data={this.state.point} />

                <Divider className="mt-20" />

                <Grid container spacing={3} className="mt-20">
                  <Grid item md={12} xs={12}>
                    {/* Save */}
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
                      Save
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

export default withSnackbar(connect(mapStateToProps, null)(Points));
