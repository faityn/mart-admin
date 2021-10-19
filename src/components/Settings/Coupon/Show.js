import React from "react";
import PageTitle from "../../../core/common/Partials/PageTitle";
import {
  Grid,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
  LinearProgress,
  Divider,
} from "@material-ui/core";
import ConfirmationNumberIcon from "@material-ui/icons/ConfirmationNumber";
import { withSnackbar } from "notistack";
import SaveIcon from "@material-ui/icons/Save";
import { Link } from "react-router-dom";
import Fade from "@material-ui/core/Fade";
import { GET_COUPON } from "../../Queries/Queries";
import { connect } from "react-redux";

/**
 * @summary Show Coupon
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Settings/Coupon
 */
class ShowCoupon extends React.Component {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    // state
    this.state = {
      id: this.props.match.params.id,
      coupon: null,
    };
  }

  /**
   * @override
   */
  async componentDidMount() {
    if (this.state.id) {
      await this.props.apolloClient.httpClient
        .query({
          query: GET_COUPON,
          variables: { id: this.state.id },
        })
        .then((result) => {
          this.setState({
            coupon: result.data.coupon,
          });
        })
        .catch((error) => {
          this.props.enqueueSnackbar(
            "Sorry, there is an error occurred while fetching data.",
            { variant: "error" }
          );
        });
    }
    console.log(this.state.coupon);
  }

  /**
   * @override
   */
  render() {
    let isShowForm = !this.state.id || this.state.coupon;
    let data = this.state.coupon;

    if (!isShowForm) return "";

    return (
      <React.Fragment>
        {/* Title section */}
        <Grid container>
          <Grid item xs={6}>
            {/* Title */}
            <PageTitle
              menuName="Coupon"
              title="Coupon show"
              icon={<ConfirmationNumberIcon />}
            />
          </Grid>
        </Grid>

        {/* Loading */}
        <Fade
          in={this.state.id && !this.state.coupon}
          style={{
            transitionDelay: "0ms",
          }}
          unmountOnExit
        >
          <LinearProgress />
        </Fade>

        {/* Form section */}
        <Fade
          in={isShowForm}
          style={{
            transitionDelay: this.state.product ? "400ms" : "0ms",
          }}
          unmountOnExit
        >
          <div className="card mt-20">
            {/* Use coupon */}
            <Grid container spacing={3} className="align-items-center">
              <Grid item md={2} xs={12}>
                <h5>Status</h5>
              </Grid>
              <Grid item md={5} xs={12}>
                <RadioGroup
                  row
                  aria-label="status"
                  name="status"
                  defaultValue={data.status}
                >
                  <FormControlLabel
                    value={true}
                    control={<Radio />}
                    label="Use"
                  />
                  <FormControlLabel
                    value={false}
                    control={<Radio />}
                    label="Not use"
                  />
                </RadioGroup>
              </Grid>
            </Grid>

            {/* Coupon name */}
            <Grid container spacing={3} className="align-items-center">
              <Grid item md={2} xs={12}>
                <h5>Coupon name</h5>
              </Grid>
              <Grid item md={5} xs={12}>
                <span>{data.name}</span>
              </Grid>
            </Grid>

            {/* Description */}
            <Grid container spacing={3} className="align-items-center">
              <Grid item md={2} xs={12}>
                <h5>Description</h5>
              </Grid>
              <Grid item md={5} xs={12}>
                <span>{data.description}</span>
              </Grid>
            </Grid>

            {/* Category */}
            <Grid container spacing={3} className="align-items-center">
              <Grid item md={2} xs={12}>
                <h5>Category</h5>
              </Grid>
              <Grid item md={5} xs={12}>
                <span>{data.categoryId}</span>
              </Grid>
            </Grid>

            {/* Product */}
            <Grid container spacing={3} className="align-items-center">
              <Grid item md={2} xs={12}>
                <h5>Product</h5>
              </Grid>
              <Grid item md={5} xs={12}>
                <span>{data.productName}</span>
              </Grid>
            </Grid>

            {/* Period */}
            <Grid container spacing={3} className="align-items-center">
              <Grid item md={2} xs={12}>
                <h5>Period</h5>
              </Grid>
              <Grid item md={10} xs={12}>
                <span>{data.startDate}</span>
                <span> ~ </span>
                <span>{data.endDate}</span>
              </Grid>
            </Grid>

            {/* Description */}
            <Grid container spacing={3} className="align-items-center">
              <Grid item md={2} xs={12}>
                <h5>Coupon type</h5>
              </Grid>
              <Grid item md={10} xs={12}>
                <span>
                  {data.discountType === "Price"
                    ? data.discount + "$ sale"
                    : null}
                  {data.discountType === "Percent"
                    ? data.discount + "% sale"
                    : null}
                  {data.discountType === "Free" ? "Free Shipping" : null}
                </span>
              </Grid>
            </Grid>

            {/* Choice */}
            <Grid container spacing={3} className="align-items-center">
              <Grid item md={2} xs={12}>
                <h5>Choice</h5>
              </Grid>
              <Grid item md={10} xs={12}>
                <span>
                  {data.moreThanType === "Price" ? data.moreThan + "$" : null}
                  {data.moreThanType === "Weight" ? data.moreThan + "G" : null}
                </span>
              </Grid>
            </Grid>

            {/* Target */}
            <Grid container spacing={3} className="align-items-center">
              <Grid item md={2} xs={12}>
                <h5>Target</h5>
              </Grid>
              <Grid item md={10} xs={12}>
                <Grid container spacing={3} className="align-items-center">
                  <Grid item md={3}>
                    <span>User type: {data.userType}</span>
                    <br />
                    <span>Gender: {data.gender}</span>
                  </Grid>
                  <Grid item md={9}>
                    <span>Age: {data.age}</span>
                    <br />
                    <span>Purchased product: {data.purchaseProductName}</span>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/* Member */}
            <Grid container spacing={3} className="align-items-center">
              <Grid item md={2} xs={12}>
                <h5>Member</h5>
              </Grid>
              <Grid item md={2} xs={12}>
                <span>{data.userName}</span>
              </Grid>
            </Grid>

            {/* Code */}
            <Grid container spacing={3} className="align-items-center">
              <Grid item md={2} xs={12}>
                <h5>Code</h5>
              </Grid>
              <Grid item md={2} xs={12}>
                <span>{data.code}</span>
              </Grid>
            </Grid>

            {/* Button section */}
            <Divider />

            <Grid container spacing={3} className="align-items-center mt-20">
              <Grid item md={4}>
                {/* <Link to="/settings/operation/coupon/create">
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    startIcon={<SaveIcon fontSize="small" className="mr-10" />}
                  >
                    CREATE
                  </Button>
                </Link> */}
                <Link to="/settings/operation/coupon">
                  <Button variant="contained" size="small" color="primary">
                    BACK
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </div>
        </Fade>
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

export default withSnackbar(connect(mapStateToProps, null)(ShowCoupon));
