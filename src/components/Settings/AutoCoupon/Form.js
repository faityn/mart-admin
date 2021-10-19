import React from "react";
import PageTitle from "../../../core/common/Partials/PageTitle";
import {
  Grid,
  Button,
  FormControl,
  IconButton,
  CircularProgress,
  RadioGroup,
  Radio,
  FormControlLabel,
  ListItem,
  ListItemText,
  List,
  ListItemSecondaryAction,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from "@material-ui/core";
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import FindCoupon from "./FindCoupon";
import { SAVE_SETTINGS, GET_SETTINGS_PREFIX } from "../../Queries/Queries";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import { GET_AUTOCOUPON, SAVE_AUTOCOUPON } from "./Queries";

/**
 * @summary AutoCoupon
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Settings/Auto
 */
class AutoCoupon extends React.Component {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    // state
    this.state = {
      selection: null,
      isProcessing: false,
      isOpenModal: false,
      settings: null,
      autoCoupon: null,
    };

    // Event
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
  }

  /**
   * @override
   */
  async componentDidMount() {
    // Mutate
    await this.props.apolloClient.httpClient
      .query({
        query: GET_SETTINGS_PREFIX,
        variables: {
          codePrefix: "CP",
        },
      })
      .then((result) => {
        this.setState({
          settings: result.data.getSettingsByCodePrefix.list,
        });
      });

    await this.props.apolloClient.httpClient
      .query({
        query: GET_AUTOCOUPON,
        variables: {},
      })
      .then((result) => {
        this.setState({
          autoCoupon: result.data.getAutoCoupons,
        });
      });
  }

  /**
   * @summary Open box
   * @param {event}
   */
  onOpenModal(e, selection) {
    this.setState({
      isOpenModal: true,
      selection: selection,
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
   * @summary Coupon list form submit
   */
  onSubmitCouponForm(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    let couponId = formData.get("couponId");
    let name = formData.get(couponId);


    let couponSignUp = "";
    let couponLevelUp = "";
    let couponPurchase = "";
    let couponBirthday = "";

    for(var i=0; i < this.state.autoCoupon.length; i++) {
      if(this.state.autoCoupon[i].name === "SIGNUP") {
        couponSignUp = i;
      }
      if(this.state.autoCoupon[i].name === "LEVELUP") {
        couponLevelUp = i;
      }
      if(this.state.autoCoupon[i].name === "PURCHASE") {
        couponPurchase = i;
      }
      if(this.state.autoCoupon[i].name === "BIRTHDAY") {
        couponBirthday = i;
      }
    }

    if (this.state.selection === "signUp") {
      let signUp = {
        name: "SIGNUP",
        couponId: couponId 
      }
      this.state.autoCoupon.splice(couponSignUp, 1, signUp);
    } else if (this.state.selection === "levelUp") {
      let levelUp = {
        name: "LEVELUP",
        couponId: couponId 
      }
      this.state.autoCoupon.splice(couponLevelUp, 1, levelUp);
    } else if (this.state.selection === "firstPurchase") {
      let purchase = {
        name: "PURCHASE",
        couponId: couponId 
      }
      this.state.autoCoupon.splice(couponPurchase, 1, purchase);
    } else if (this.state.selection === "happyBirthday") {
      let birthday = {
        name: "BIRTHDAY",
        couponId: couponId 
      }
      this.state.autoCoupon.splice(couponBirthday, 1, birthday);
    }

    this.setState({
      isOpenModal: false,
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

    let couponSignUp  = "";
    let couponLevelUp  = "";
    let couponPurchase  = "";
    let couponBirthday  = "";

    for(var i=0; i < this.state.autoCoupon.length; i++) {
      if(this.state.autoCoupon[i].name === "SIGNUP") {
        couponSignUp = this.state.autoCoupon[i].couponId;
      }
      if(this.state.autoCoupon[i].name === "LEVELUP") {
        couponLevelUp = this.state.autoCoupon[i].couponId;
      }
      if(this.state.autoCoupon[i].name === "PURCHASE") {
        couponPurchase = this.state.autoCoupon[i].couponId;
      }
      if(this.state.autoCoupon[i].name === "BIRTHDAY") {
        couponBirthday = this.state.autoCoupon[i].couponId;
      }
    }

    // Form data to object
    let autoCoupon = [
      {
        "status": formData.get("signUpStatus") === "true" ? true : false,
        "name": "SIGNUP",
        "couponId": couponSignUp,
      },
      {
        "status": formData.get("levelUpStatus") === "true" ? true : false,
        "name": "LEVELUP",
        "couponId": couponLevelUp,
      },{
        "status": formData.get("firstPurchaseStatus") === "true" ? true : false,
        "name": "PURCHASE",
        "couponId": couponPurchase,
      },{
        "status": formData.get("happyBirthdayStatus") === "true" ? true : false,
        "name": "BIRTHDAY",
        "couponId": couponBirthday,
      },
    ];

    this.setState({
      isProcessing: true,
    });

    this.props.enqueueSnackbar("The saving process is being started ...", {
      variant: "info",
    });

    // // Mutate
    await this.props.apolloClient.httpClient
      .mutate({
        mutation: SAVE_AUTOCOUPON,
        variables: {
          coupons: autoCoupon,
        },
      })
      .then((result) => {
        if(result.data.saveAutoCoupon.statusCode === 200) {
          this.props.enqueueSnackbar(
            "Auto coupon has been successfully updated.",
            { variant: "success" }
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

  /**
   * @override
   */
  render() {
    if (!this.state.autoCoupon) return null;

    return (
      <React.Fragment>
        {/* Title section */}
        <Grid container>
          <Grid item>
            {/* Title */}
            <PageTitle
              menuName="Automatic coupon issuance"
              title="Automatic coupon issuance form"
              icon={<ConfirmationNumberIcon />}
            />
          </Grid>
        </Grid>

        <Grid container className="mt-20">
          <Grid item md={8}>
            <div className="card mt-20">
              <form id="my-form-managemnt" onSubmit={this.onHandleSubmit}>
                {/* Sign up Coupon */}
                <Grid container>
                  <Grid item md={12} xs={12}>
                    {/* Name */}
                    <h5>Greeting coupon</h5>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={4} xs={12}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        aria-label="signUp"
                        name="signUpStatus"
                        defaultValue={String((
                            this.state.autoCoupon.find(
                              (f) => f.name === "SIGNUP"
                            ) || {}
                          ).status)
                        }
                      >
                        <FormControlLabel
                          value="true"
                          control={<Radio />}
                          label="Used"
                        />
                        <FormControlLabel
                          value="false"
                          control={<Radio />}
                          label="Not used"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item md={8} xs={12}>
                    <List>
                      <ListItem>
                        <ListItemText
                          onClick={(e) => this.onOpenModal(e, "signUp")}
                          primary={(
                            this.state.autoCoupon.find(
                              (f) => f.name === "SIGNUP"
                              ) || {}
                            ).couponId || "SELECT COUPON"
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" aria-label="comments">
                            <DeleteIcon
                              onClick={(e) => this.onOpenModal(e, "signUp")}
                            />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>

                {/* Level Up Celebration Coupon */}
                <Grid container>
                  <Grid item md={12} xs={12}>
                    {/* Name */}
                    <h5>Level up celebration coupon</h5>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={4} xs={12}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        name="levelUpStatus"
                        defaultValue={String((
                            this.state.autoCoupon.find(
                              (f) => f.name === "LEVELUP"
                            ) || {}
                          ).status)
                        }
                      >
                        <FormControlLabel
                          value="true"
                          control={<Radio />}
                          label="Used"
                        />
                        <FormControlLabel
                          value="false"
                          control={<Radio />}
                          label="Not used"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item md={8} xs={12}>
                    <List>
                      <ListItem>
                        <ListItemText
                          onClick={(e) => this.onOpenModal(e, "levelUp")}
                          primary={(
                            this.state.autoCoupon.find(
                              (f) => f.name === "LEVELUP"
                              ) || {}
                            ).couponId || "SELECT COUPON"
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" aria-label="comments">
                            <DeleteIcon
                              onClick={(e) => this.onOpenModal(e, "levelUp")}
                            />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>

                {/* First purchase appreciation coupon */}
                <Grid container>
                  <Grid item md={12} xs={12}>
                    {/* Name */}
                    <h5>First order coupon</h5>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={4} xs={12}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        name="firstPurchaseStatus"
                        defaultValue={String((
                            this.state.autoCoupon.find(
                              (f) => f.name === "PURCHASE"
                            ) || {}
                          ).status)
                        }
                      >
                        <FormControlLabel
                          value="true"
                          control={<Radio />}
                          label="Used"
                        />
                        <FormControlLabel
                          value="false"
                          control={<Radio />}
                          label="Not used"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item md={8} xs={12}>
                    <List>
                      <ListItem>
                        <ListItemText
                          onClick={(e) => this.onOpenModal(e, "firstPurchase")}
                          primary={(
                            this.state.autoCoupon.find(
                              (f) => f.name === "PURCHASE"
                              ) || {}
                            ).couponId || "SELECT COUPON"
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" aria-label="comments">
                            <DeleteIcon
                              onClick={(e) =>
                                this.onOpenModal(e, "firstPurchase")
                              }
                            />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>

                {/* Happy birthday coupon */}
                <Grid container>
                  <Grid item md={12} xs={12}>
                    {/* Name */}
                    <h5>Birthday coupon</h5>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item md={4} xs={12}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        aria-label="signUp"
                        name="happyBirthdayStatus"
                        defaultValue={String((
                          this.state.autoCoupon.find(
                            (f) => f.name === "BIRTHDAY"
                            ) || {}
                          ).status)
                        }
                      >
                        <FormControlLabel
                          value="true"
                          control={<Radio />}
                          label="Used"
                        />
                        <FormControlLabel
                          value="false"
                          control={<Radio />}
                          label="Not used"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item md={8} xs={12}>
                    <List>
                      <ListItem>
                        <ListItemText
                          onClick={(e) => this.onOpenModal(e, "happyBirthday")}
                          primary={(
                            this.state.autoCoupon.find(
                              (f) => f.name === "BIRTHDAY"
                              ) || {}
                            ).couponId || "SELECT COUPON"
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" aria-label="comments">
                            <DeleteIcon
                              onClick={(e) =>
                                this.onOpenModal(e, "happyBirthday")
                              }
                            />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              </form>
              <Divider className="mt-20" />
              <Grid container className="mt-20">
                <Grid item>
                  <Button
                    form="my-form-managemnt"
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

        {/* Find coupon Popup */}
        <Dialog
          open={this.state.isOpenModal}
          aria-labelledby="responsive-dialog-title"
          maxWidth="lg"
        >
          {/* Title */}
          <DialogTitle id="responsive-dialog-title">
            <h2>Find coupon</h2>
          </DialogTitle>
          <Divider />

          {/* Content */}
          <DialogContent>
            <form
              id="coupon-form"
              onSubmit={this.onSubmitCouponForm.bind(this)}
            >
              <FindCoupon />
            </form>
          </DialogContent>

          <Divider />
          {/* Actions */}
          <DialogActions>
            <Button
              autoFocus
              onClick={this.onCloseModal.bind(this)}
              color="primary"
            >
              Cancel
            </Button>
            <Button autoFocus form="coupon-form" type="submit" color="primary">
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

export default withSnackbar(connect(mapStateToProps, null)(AutoCoupon));
