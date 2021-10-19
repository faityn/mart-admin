import React from "react";
import PageTitle from "../../../core/common/Partials/PageTitle";
import {
  Grid,
  TextField,
  FormControlLabel,
  RadioGroup,
  Radio,
  Button,
  CircularProgress,
  Divider,
} from "@material-ui/core";
import FastfoodIcon from '@material-ui/icons/Fastfood';
import { SAVE_SETTINGS, GET_SETTINGS_PREFIX } from "../../Queries/Settings";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import SaveIcon from "@material-ui/icons/Save";

/**
 * @summary Product
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Settings/Product
 */
class ProductSetting extends React.Component {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    // state
    this.state = {
      isProcessing: false,
      settings: null,
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

    // Mutate
    await this.props.apolloClient.httpClient
      .query({
        query: GET_SETTINGS_PREFIX,
        variables: {
          codePrefix: "PS",
        },
      })
      .then((result) => {
        this._isMounted &&
          this.setState({
            settings: result.data.getSettingsByCodePrefix.list,
          });
      })
      .catch((error) => {});
  }

  /**
   * @override
   */
  componentWillUnmount() {
    this._isMounted = false;
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
    let settings = [
      {
        code: "PS100000",
        value: formData.get("page"),
        description: "Redirect after save",
      },
      {
        code: "PS200000",
        value: formData.get("code"),
        description: "Code generation",
      },
      {
        code: "PS300000",
        value: formData.get("description"),
        description: "Out of stock message",
      },
    ];

    this.setState({
      isProcessing: true,
    });

    this.props.enqueueSnackbar("The saving process is being started ...", {
      variant: "info",
    });

    // Mutate
    await this.props.apolloClient.httpClient
      .mutate({
        mutation: SAVE_SETTINGS,
        variables: {
          settings: settings,
        },
      })
      .then((result) => {
        this.props.enqueueSnackbar(
          "Product settings has been successfully updated.",
          { variant: "success" }
        );
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

  /**
   * @override
   */
  render() {
    if (!this.state.settings) return null;

    return (
      <React.Fragment>
        <form onSubmit={this.onHandleSubmit}>
          {/* Title section */}
          <Grid container>
            <Grid item>
              {/* Title */}
              <PageTitle
                menuName="Product basic information setting"
                title="Product basic information setting"
                icon={<FastfoodIcon />}
              />
            </Grid>
          </Grid>

          <Grid container>
            <Grid item md={8}>
              <div className="card mt-20">
                {/* registration/modification */}
                <Grid container spacing={2} className="align-items-center">
                  <Grid item md={4} xs={12}>
                    <h5>After product registration/modification Page move</h5>
                  </Grid>
                  <Grid item md={8} xs={12}>
                    <RadioGroup
                      aria-label="discount"
                      name="page"
                      defaultValue={
                        (
                          this.state.settings.find(
                            (f) => f.code === "PS100000"
                          ) || {}
                        ).value || "LIST"
                      }
                      onChange={this.onChangePage}
                    >
                      <FormControlLabel
                        value="LIST"
                        control={<Radio />}
                        label="Go to product list"
                      />
                      <FormControlLabel
                        value="EDIT"
                        control={<Radio />}
                        label="Go to product edit"
                      />
                    </RadioGroup>
                  </Grid>
                </Grid>

                {/* Product code generation method */}
                <Grid container spacing={2} className="align-items-center">
                  <Grid item md={4} xs={12}>
                    <h5>Product code generation method</h5>
                  </Grid>
                  <Grid item md={8} xs={12}>
                    <RadioGroup
                      aria-label="discount"
                      name="code"
                      defaultValue={
                        (
                          this.state.settings.find(
                            (f) => f.code === "PS200000"
                          ) || {}
                        ).value || "AUTOMATIC"
                      }
                      onChange={this.onChangePage}
                    >
                      <FormControlLabel
                        value="AUTOMATIC"
                        control={<Radio />}
                        label="Automatic"
                      />
                      <FormControlLabel
                        value="MANUAL"
                        control={<Radio />}
                        label="Manual"
                      />
                    </RadioGroup>
                  </Grid>
                </Grid>

                {/* Display when out of stock */}
                <Grid container spacing={2} className="align-items-center">
                  <Grid item md={4} xs={12}>
                    <h5>Display when the item is out of stock</h5>
                  </Grid>
                  <Grid item md={8} xs={12}>
                    <TextField
                      fullWidth
                      id="description-basic"
                      label="Out of stock description"
                      size="small"
                      variant="outlined"
                      name="description"
                      defaultValue={
                        (
                          this.state.settings.find(
                            (f) => f.code === "PS300000"
                          ) || {}
                        ).value || ""
                      }
                    />
                  </Grid>
                </Grid>

                <Divider className="mt-20" />

                <Grid container className="mt-20">
                  <Grid item>
                    {/* Save */}
                    <Button
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
              </div>
            </Grid>
          </Grid>
        </form>
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

export default withSnackbar(connect(mapStateToProps, null)(ProductSetting));
