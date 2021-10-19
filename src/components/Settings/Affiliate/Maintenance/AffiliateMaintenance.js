import React from "react";
import { withSnackbar } from "notistack";
import PageTitle from "../../../../core/common/Partials/PageTitle";
import { connect } from "react-redux";
import SubjectIcon from '@material-ui/icons/Subject';
import SaveIcon from "@material-ui/icons/Save";
import { CircularProgress, Grid, Button, Radio, RadioGroup, FormControlLabel } from "@material-ui/core";
import { GET_SETTINGS_PREFIX, SAVE_SETTINGS } from "../../../Queries/Settings";

class AffiliateMaintenance extends React.Component {
  /**
   * @constructor
   */
  constructor(props) {
    super(props);

    // state
    this.state = {
      isProcessing: false,
      maintenanceMode: false,
      radioValue: '',
    };

    // Events
    this.loadData = this.loadData.bind(this);
    this.save = this.save.bind(this);
  }

  /**
   * @override
   */
  async componentDidMount() {
    this.loadData();
  }

  loadData() {
    this.setState({
      isProcessing: true,
    }, () => {
      this.props.apolloClient.httpClient.query({
        query: GET_SETTINGS_PREFIX,
        variables: {
					codePrefix: 'AF00001',
				}
      })
      .then((result) => {
        this.setState({
          maintenanceMode: [null, undefined].includes(result.data.getSettingsByCodePrefix.list) === false && result.data.getSettingsByCodePrefix.list.length > 0 && result.data.getSettingsByCodePrefix.list[0].code === 'AF00001' && result.data.getSettingsByCodePrefix.list[0].value === 'true',
          radioValue: ([null, undefined].includes(result.data.getSettingsByCodePrefix.list) === false && result.data.getSettingsByCodePrefix.list.length > 0 && result.data.getSettingsByCodePrefix.list[0].code === 'AF00001' && result.data.getSettingsByCodePrefix.list[0].value === 'true') ? 'true' : 'false',
          isProcessing: false,
        });
      })
      .catch((error) => {
        this.setState({
          isProcessing: false,
        });
        this.props.enqueueSnackbar(
          "Sorry, there is an error occurred while fetching data.",
          { variant: "error" }
        );
      });
    });
  }

  save() {
    if (this.state.isProcessing) return;
    
    this.props.enqueueSnackbar("The saving process is being started ...", {
      variant: "info",
    });

    this.setState({
      isProcessing: true,
    }, () => {
      this.props.apolloClient.httpClient.mutate({
        mutation: SAVE_SETTINGS,
        variables: {
          settings: [{
            code: 'AF00001',
            value: this.state.maintenanceMode.toString(),
            description: 'Maintenance mode for affiliate',
          }],
        },
      })
      .then((result) => {
        if (result.data.saveSettings.statusCode === 200) {
          this.props.enqueueSnackbar(
            "Successfully saved.",
            { variant: "success" }
          );
          this.setState({
            isProcessing: false,
          });
        } else {
          this.props.enqueueSnackbar(
            "Sorry, there is an error occurred while saving data.",
            { variant: "error" }
          );
          this.setState({
            isProcessing: false,
          });
        }
      })
      .catch((error) => {
        this.props.enqueueSnackbar(
          "Sorry, there is an error occurred while saving data.",
          { variant: "error" }
        );
        this.setState({
          isProcessing: false,
        });
      });
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
              menuName="Turn ON/OFF Affiliate feature"
              title="Turn ON/OFF Affiliate feature"
              icon={<SubjectIcon />}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item md={10}>
            <div className="card mt-20" >
              <div>
                <RadioGroup row value={this.state.radioValue} onChange={e => this.setState({ radioValue: e.target.value, maintenanceMode: e.target.value === 'true' })}>
                  <FormControlLabel value="true" control={<Radio />} label="OFF" />
                  <FormControlLabel value="false" control={<Radio />} label="ON" />
                </RadioGroup>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: 30 }}>
                <Button
                  form="form-submit"
                  variant="contained"
                  size="small"
                  color="primary"
                  type="submit"
                  disabled={this.state.isProcessing}
                  startIcon={
                    this.state.isProcessing ? (
                      <CircularProgress color="primary" size="1rem" />
                    ) : (
                      <SaveIcon fontSize="small" className="mr-10" />
                    )
                  }
                  onClick={this.save}
                >
                  SAVE
                </Button>
              </div>
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

export default withSnackbar(connect(mapStateToProps, null)(AffiliateMaintenance));
