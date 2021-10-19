import React from "react";
import {
  Grid,
  FormControlLabel,
  RadioGroup,
  Radio,
  TextField,
  Checkbox,
  LinearProgress,
  Switch 
} from "@material-ui/core";
import { FlareSharp } from "@material-ui/icons";

/**
 * @summary Form
 * @version 1.0
 * @author Batbayar Tuuchintav <coder.batbayar@gmail.com>
 * @package Settings/Member/Form
 */
class Form extends React.Component {

  /**
   * @override
   */
  render() {
    if (!this.props.data) return <LinearProgress />;

    let data = this.props.data;

    return (
      <React.Fragment>
        {/* Use coupon */}
        <Grid container spacing={3} className="align-items-center">
          <Grid item md={3} xs={12}>
            <h5>Whether to use points</h5>
          </Grid>
          <Grid item md={9} xs={12}>
            <RadioGroup
              row
              aria-label="status"
              name="status"
              defaultValue={data.status ? "Used" : "Not used"}
            >
              <FormControlLabel 
                value="Used" 
                control={<Radio />} 
                label="Used" />
              <FormControlLabel
                value="Not used"
                control={<Radio />}
                label="Not used"
              />
            </RadioGroup>
          </Grid>
        </Grid>

        {/* display */}
        <Grid container spacing={3} className="align-items-center">
          <Grid item md={3} xs={12}>
            <h5>Point display unit</h5>
          </Grid>
          <Grid item md={9} xs={12}>
            <TextField
              fullWidth
              label="Please enter the unit to be displayed after the reserve"
              size="small"
              variant="outlined"
              name="name"
              defaultValue={data.name}
            />
          </Grid>
        </Grid>

        {/* display */}
        <Grid container spacing={3} className="align-items-center">
          <Grid item md={3} xs={12}>
            <h5>Congratulations on signing up</h5>
          </Grid>
          <Grid item md={8} xs={12}>
            <TextField
              fullWidth
              label="Additional points are paid for new subscriptions"
              size="small"
              variant="outlined"
              name="signup"
              defaultValue={data.signup}
            />
          </Grid>
          <Grid item md={1} xs={12}>
            {/* <Switch
              color="primary"
              name="isRegisterActive"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            /> */}
          </Grid>
        </Grid>

        {/* Referral points */}
        <Grid container spacing={3} className="align-items-center">
          <Grid item md={3} xs={12}>
            <h5>Referral points</h5>
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControlLabel
              control={<Checkbox name="checkedB" color="primary" />}
              label="Use the referral system"
            />
          </Grid>

          <Grid item md={5} xs={12}>
            <TextField
              fullWidth
              label="Given"
              size="small"
              variant="outlined"
              name="given"
              defaultValue={data.given}
              className="mt-20"
            />
            <TextField
              fullWidth
              label="Taken"
              size="small"
              variant="outlined"
              name="taken"
              defaultValue={data.taken}
              className="mt-20"
            />
          </Grid>
        </Grid>

        {/* Points for purchasing products */}
        <Grid container spacing={3} className="align-items-center mt-20">
          <Grid item md={3} xs={12}>
            <h5>Points for purchasing products</h5>
          </Grid>
          <Grid item md={9} xs={12}>
            <RadioGroup
              row
              aria-label="spend"
              name="spend"
              defaultValue={data.spend}
            >
              <FormControlLabel
                value={true}
                control={<Radio />}
                label="Points are paid even if you use points at the time of payment"
              />
              <FormControlLabel
                value={false}
                control={<Radio />}
                label="If you use the points at the time of payment, you do not pay the points."
              />
            </RadioGroup>
          </Grid>
        </Grid>

        {/* Referral points */}
        <Grid container spacing={3} className="align-items-center">
          <Grid item md={3} xs={12}>
            <h5>Referral points</h5>
          </Grid>
          <Grid item md={4} xs={12}>
            <TextField
              fullWidth
              label="Photo review"
              size="small"
              variant="outlined"
              name="photoReview"
              defaultValue={data.photoReview}
            />
          </Grid>

          <Grid item md={5} xs={12}>
            <TextField
              fullWidth
              label="Text review"
              size="small"
              variant="outlined"
              name="textReview"
              defaultValue={data.textReview}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Form;
