import React from "react";
import PageTitle from "../../../core/common/Partials/PageTitle";
import {
	Button,
	Card,
	CardContent,
	Grid,
	FormControl,
	FormControlLabel,
	RadioGroup,
	Radio,
	TextField,
	Select,
	MenuItem
} from "@material-ui/core";
import { withSnackbar } from "notistack";
import { connect } from "react-redux";
import { Settings } from "@material-ui/icons";
import { gql } from "apollo-boost";
import validate from "validate.js";

class MembershipManagement extends React.Component {
    
	/**
	 * @constructor
	 */
	constructor(props) {
		super(props);

		// Default state
		this.state = {
			settings: {
				registration: true,
				type: null,
				point: 0,
				captcha: false
			},
			memberTypes: []
		};

		this.save = this.save.bind(this)
	}

	/**
 * @summary Validate settings
 * @param {Object} settings
 */
onValidateSubmit(settings) {
	const schema = {
			// point: {
			// 	presence: {
      //     allowEmpty: false,
      //     message: "^This field is required.",
      //   },
      //   format: {
      //     pattern: "^[0-9]+\.[0-9]{1,2}$",
      //     message: '^Should be number only. Format: 0.00' 
      //   },
			// },
			
	};

	// Validate
	const errors = validate(settings, schema);

	this.setState({
		errors: errors,
	});

	return errors;
}

	async save() {

		if (this.onValidateSubmit(this.state.settings)) return;

		this.props.enqueueSnackbar(
      "The process is being started ...",
      {
        variant: "info",
      }
    );

    // Mutate
    await this.props.apolloClient.httpClient
      .mutate({
        mutation: gql`
				mutation saveMemberSettings($settings: MemberSettingsInput) {
					saveMemberSettings(settings: $settings) {
							statusCode
							data
					}
			}
			`,
        variables: {
          settings: {
						registration: this.state.settings.registration,
						type: this.state.settings.type,
						point: this.state.settings.point,
						captcha: this.state.settings.captcha
					}
        },
      })
      .then((result) => {
        if(result.data.saveMemberSettings.statusCode === 200) {
          this.props.enqueueSnackbar("Successfully updated.", { variant: "success" });
        }
      })
      .catch((error) => {
        this.props.enqueueSnackbar(
          "Sorry, there is an error occurred while saving data.",
          { variant: "error" }
        );
      });

      
	}

	/**
   * @override
   */
	 async componentDidMount() {

    await this.props.apolloClient.httpClient
      .query({
        query: gql`
					query getMemberSettings {
						getMemberSettings {
								registration
								type
								point
								captcha
						}
						getMemberType {
							id
							type
						}
				}
				`,
        variables:null,
      })
      .then((result) => {
        this.setState({
          settings: result.data.getMemberSettings,
					memberTypes: result.data.getMemberType
        });
      })
      .catch((error) => {
        this.props.enqueueSnackbar(
          "Sorry, there is an error occurred while fetching data.",
          { variant: "error" }
        );
      });
  }

	hasError(field) {
    return this.state.errors && this.state.errors[field] ? true : false;
	}

	/**
	 * @override
	 */
    render() {
			return <React.Fragment>
      	{/* Title section */}
				<Grid container>
					<Grid item xs={6}>
						{/* Title */}
						<PageTitle 
							menuName="Membership"  
							title="Membership Management" 
							icon={<Settings />} 
						/>
					</Grid>
				</Grid>

				<Card>
					<CardContent>
						<Grid container spacing={3}>
							<Grid item md={2}>
								<h5>Allow or deny membership</h5>
							</Grid>
							<Grid item md={10}>
								<FormControl component="fieldset">
									<RadioGroup aria-label="registration" name="registration" value={this.state.settings.registration} onChange={(e) => {
										let settings = this.state.settings;
										settings.registration = e.target.value === "true";
										this.setState({
											settings: settings
										})
									}}>
										<FormControlLabel value={true} control={<Radio />} label="Permission to join" />
										<FormControlLabel value={false} control={<Radio />} label="Pause membership" />
									</RadioGroup>
								</FormControl>
							</Grid>
						</Grid>
						<Grid container spacing={3}>
							<Grid item md={2}>
								<h5>Level of newly registered users</h5>
							</Grid>
							<Grid item md={4}>
							<FormControl size="small" fullWidth variant="outlined">
								<Select
									id="category-select"
									name="type"
									variant="outlined"
									value={this.state.settings.type}
									onChange={(e) => {
										let settings = this.state.settings;
										settings.type = e.target.value;
										this.setState({
											settings: settings
										})
									}}
								>
									<MenuItem value="">
										None
									</MenuItem>
									{(this.state.memberTypes || []).map((item, index) => <MenuItem key={index} value={item.id}>
										{item.type}
									</MenuItem>) }
								</Select>
								</FormControl>
							</Grid>
						</Grid>
						
						<Grid container spacing={3}>
							<Grid item md={12}>
								<h4>Other subscription settings</h4>
							</Grid>
						</Grid>
						{/* <Grid container spacing={3}>
							<Grid item md={2}>
								<h4>New member points</h4>
							</Grid>
							<Grid item md={4}>
								<TextField
									fullWidth
									size="small"
									name="point"
									multiline
									id="point"
									variant="outlined"
									value={this.state.settings.point}
									onChange={(e) => {
										let settings = this.state.settings;
										settings.point = e.target.value;
										this.setState({
											settings: settings
										})
									}}
									error={this.hasError("point")}
									helperText={
										this.hasError("point")
												? this.state.errors["point"][0]
												: null
									}
								/>
							</Grid>
						</Grid> */}
						<Grid container spacing={3}>
							<Grid item md={2}>
								<h4>Automatic registration protection code</h4>
							</Grid>
							<Grid item md={10}>
								<FormControl component="fieldset">
									<RadioGroup aria-label="captcha" name="captcha" value={this.state.settings.captcha} onChange={(e) => {
										let settings = this.state.settings;
										settings.captcha = e.target.value === "true";
										this.setState({
											settings: settings
										})
									}}>
										<FormControlLabel value={true} control={<Radio />} label="Use" />
										<FormControlLabel value={false} control={<Radio />} label="Not use" />
									</RadioGroup>
								</FormControl>
							</Grid>
						</Grid>

						<Grid container spacing={3}>
							<Grid item md={12}>
								<Button size="small"
              variant="contained"
              color="primary"
							onClick={this.save}
							>Save</Button>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
				
			</React.Fragment>
    }
}

// Redux state to props
const mapStateToProps = (state) => {
	return {
		apolloClient: state.apolloClient,
	};
};

export default withSnackbar(connect(mapStateToProps, null)(MembershipManagement));